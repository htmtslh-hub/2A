import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out=resolve('web/product/giao-dien-web/diginest/reviews/1.2.0');await mkdir(out+'/screenshots',{recursive:true});
const preview=await fetch('https://forgezone.store/previews/diginest.webp?v=1.2.0');assert.equal(preview.status,200);const bytes=Buffer.from(await preview.arrayBuffer());const local=await readFile(resolve('web/public/previews/diginest.webp'));assert.equal(createHash('sha256').update(bytes).digest('hex'),createHash('sha256').update(local).digest('hex'));
const denied=await fetch('https://forgezone.store/api/download?id=t11');assert.equal(denied.status,401);
const cases=[];
for(const [locale,width,engine] of [['vi-VN',1440,chromium],['en-US',1440,chromium],['zh-CN',1440,chromium],['vi-VN',375,firefox]]){
 const browser=await engine.launch();const context=await browser.newContext({locale,viewport:{width,height:900}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('https://forgezone.store/?tab=library');const card=page.locator('a[href="?mau=t11"]:visible').first();await card.waitFor();assert.match(await card.textContent(),/DigiNest/);await card.locator('img[src*="diginest.webp"]').waitFor();assert.equal(await card.locator('img').first().evaluate(e=>e.complete&&e.naturalWidth>0),true);
 await card.click();await page.waitForURL('**/?mau=t11');await page.locator('.cart-detail-button').waitFor();assert.match(await page.locator('body').textContent(),/DigiNest/);
 const popupPromise=page.waitForEvent('popup');await page.locator('button.hv10').click();const demo=await popupPromise;await demo.waitForLoadState('domcontentloaded');assert.match(demo.url(),/\/demos\/diginest\/index.html\?v=1.2.0/);await demo.locator('#hero-title').waitFor();await demo.close();
 await page.locator('.cart-detail-button').click();await page.waitForTimeout(700);
 const storage=await page.evaluate(()=>Object.entries(localStorage).filter(([key])=>/cart/i.test(key)));assert.ok(storage.some(([,value])=>value.includes('t11')));
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);assert.deepEqual(errors,[]);await page.screenshot({path:out+`/screenshots/catalog-${locale}-${width}.png`,fullPage:true});
 cases.push({locale,width,browser:engine.name(),version:browser.version(),product:'t11 DigiNest',libraryCard:'PASS',preview:'PASS',detail:'PASS',demoLink:'PASS',templateCart:'PASS',errors});await browser.close();
}
const report={date:new Date().toISOString(),sourceCommit:'a3f3724',deployment:'dpl_9dmF7EvYpfDqDJFjgA48yfnRzg1Q',url:'https://forgezone.store/?mau=t11',previewStatus:200,unauthorisedDownload:401,cases,paidDownload:'NOT TESTED: no payment made or entitlement created. Existing t11 -> diginest.zip mapping and output tracing verified by code; production build passed.'};await writeFile(out+'/catalog-checks.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
