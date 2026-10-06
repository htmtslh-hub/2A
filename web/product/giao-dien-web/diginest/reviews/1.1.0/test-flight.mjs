import {resolve} from 'node:path';
import {writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out=resolve('web/product/giao-dien-web/diginest/reviews/1.1.0');await mkdir(out+'/screenshots',{recursive:true});
const results=[];
for(const [name,engine,executablePath] of [['Chromium',chromium],['Firefox',firefox],['Edge',chromium,'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],['CocCoc',chromium,'C:/Program Files/CocCoc/Browser/Application/browser.exe']]){
 const browser=await engine.launch(executablePath?{executablePath}:{});const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 // CSS animation and WAAPI unavailable: the rAF path still animates.
 await page.addInitScript(()=>{Element.prototype.animate=()=>{throw new Error('WAAPI unavailable');};localStorage.setItem('motion','off');});
 const samples=[];
 for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){
  await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4350/?v=1.1.0');
  await page.addStyleTag({content:'*{animation:none!important;transition:none!important;}'});
  await page.locator('[data-add="wave"]').scrollIntoViewIfNeeded();await page.locator('[data-add="wave"]').click();
  const before=await page.locator('.cart-flight').evaluate(e=>({transform:e.style.transform,rect:JSON.stringify(e.getBoundingClientRect())}));
  await page.waitForTimeout(260);
  const during=await page.locator('.cart-flight').evaluate(e=>({transform:e.style.transform,rect:JSON.stringify(e.getBoundingClientRect())}));
  assert.notEqual(before.transform,during.transform);
  assert.equal(await page.locator('.cart-toggle').evaluate(e=>e.getBoundingClientRect().top>=0),true);
  if(width===375)await page.screenshot({path:out+`/screenshots/${name}-flying-card.png`});
  await page.waitForTimeout(950);assert.equal(await page.locator('.cart-flight').count(),0);
  assert.equal(await page.locator('.cart-toggle').evaluate(e=>e.style.transform),'');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  samples.push({width,before,during,cleanup:'PASS'});
 }
 const initial=Number(await page.locator('#cart-count').textContent());
 await page.locator('[data-add="sound"]').scrollIntoViewIfNeeded();
 await page.locator('[data-add="sound"]').evaluate(button=>{for(let i=0;i<8;i++)button.click();});
 assert.equal(await page.locator('.cart-flight').count(),1);assert.equal(Number(await page.locator('#cart-count').textContent()),initial+8);
 await page.waitForTimeout(1200);assert.equal(await page.locator('.cart-flight').count(),0);
 await page.locator('[data-add="sound"]').click();await page.locator('.cart-toggle').click();assert.equal(await page.locator('.cart-flight').count(),0);await page.keyboard.press('Escape');
 await page.locator('#add-bundle').click();assert.equal(await page.locator('.cart-flight strong').textContent(),'Audio Duo');await page.waitForTimeout(1200);
 assert.deepEqual(errors,[]);
 results.push({browser:name,version:browser.version(),samples,rapidClicks:'PASS 8 additions, one flight, cleanup',openCartDuringFlight:'PASS',bundle:'PASS',reducedMotionAndLegacyOff:'PASS enabled',cssAndWAAPIDisabled:'PASS rAF motion',errors});
 await browser.close();
}
await writeFile(out+'/flight-checks.json',JSON.stringify(results,null,2));console.log(results.map(({samples,...r})=>r));
