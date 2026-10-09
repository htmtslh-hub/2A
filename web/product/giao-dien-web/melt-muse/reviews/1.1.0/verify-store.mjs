import { chromium } from '../../../../../../_design/.tooling/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const here = dirname(fileURLToPath(import.meta.url));
const base = 'https://forgezone.store';
const report = { date: new Date().toISOString(), deployment: 'dpl_GQQt2JZQN5bcpxgQNmF2pT9EenJs', smoke: [], store: [], failures: [] };
for (const [path, expected] of [['/',200],['/?mau=t17',200],['/api/download?id=t17',401],['/product/giao-dien-web/melt-muse/melt-muse.zip',404],['/demos/melt-muse/index.html?v=1.1.0',200],['/previews/melt-muse.webp?v=1.1.0',200],['/admin',200],['/api/admin',403],['/tai-khoan',200],['/dich-vu',410],['/demos/apartment-flow/index.html',200],['/demos/shirtline/index.html',200],['/demos/watchroom/index.html',200]]) {
  const response = await fetch(base+path);
  report.smoke.push({ path, status: response.status, expected });
  assert.equal(response.status, expected, path);
}
for (const file of ['index.html','assets/css/style.css','assets/js/main.js','assets/img/soft-focus.webp','assets/img/damn-right.webp','assets/img/heart-pose.webp']) {
  const res = await fetch(`${base}/demos/melt-muse/${file}?v=1.1.0`);
  const bytes = Buffer.from(await res.arrayBuffer());
  assert.deepEqual(bytes, readFileSync(resolve(here,'../../../../../public/demos/melt-muse',file)),file);
}
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
report.browser = { name:'Microsoft Edge',version:browser.version() };
mkdirSync(resolve(here,'screenshots'),{recursive:true});
for (const lang of ['vi-VN','en-US','zh-CN']) {
  const context = await browser.newContext({ locale:lang, viewport:{width:1440,height:900} });
  const page = await context.newPage();
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${base}/?mau=t17`);
  await page.waitForTimeout(2500);
  console.log(lang, (await page.locator('body').innerText()).slice(0,1600));
  const state = await page.evaluate(()=>({ lang:document.documentElement.lang, text:document.body.innerText, images:[...document.images].filter(i=>i.src.includes('melt-muse')).map(i=>({src:i.src,loaded:i.complete&&i.naturalWidth>0})), buttons:[...document.querySelectorAll('button')].map(b=>({text:b.textContent.trim(),class:b.className,disabled:b.disabled})),width:innerWidth,scrollWidth:document.documentElement.scrollWidth }));
  assert.ok(state.text.includes('Melt Muse'));
  assert.ok(state.images.length>0 && state.images.every(i=>i.loaded));
  assert.ok(state.buttons.some(b=>b.class.includes('hv9')&&!b.disabled),'buy button');
  assert.ok(state.buttons.some(b=>b.class==='cart-detail-button'&&!b.disabled),'cart button');
  assert.equal(errors.length,0);
  const entry={locale:lang,lang:state.lang,images:state.images,buy:true,cart:true,width:state.width,scrollWidth:state.scrollWidth,errors};
  if(lang==='en-US') {
    await page.locator('.cart-detail-button').click();
    entry.cartAdded=(await page.locator('.cart-detail-button').innerText());
    await page.screenshot({path:resolve(here,'screenshots/store-detail-en.png'),fullPage:true});
    await page.setViewportSize({width:375,height:812});
    await page.waitForTimeout(600);
    entry.mobile=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
    assert.equal(entry.mobile.scrollWidth,375);
    await page.screenshot({path:resolve(here,'screenshots/store-detail-mobile.png'),fullPage:true});
  }
  report.store.push(entry);
  await context.close();
}
const context=await browser.newContext({locale:'en-US',viewport:{width:1440,height:900}});
const page=await context.newPage();
await page.goto(base);
const card=page.locator('a.product-card[href="?mau=t17"]').first();
await card.waitFor();
report.homeCard={text:await card.innerText(),href:await card.getAttribute('href')};
assert.ok(report.homeCard.text.includes('Melt Muse'));
await card.scrollIntoViewIfNeeded();
await page.screenshot({path:resolve(here,'screenshots/store-card.png')});
await browser.close();
writeFileSync(resolve(here,'production-checks.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
