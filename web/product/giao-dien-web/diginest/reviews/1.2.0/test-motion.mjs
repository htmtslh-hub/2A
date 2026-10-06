import {resolve} from 'node:path';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out=resolve('web/product/giao-dien-web/diginest/reviews/1.2.0');await mkdir(out+'/screenshots',{recursive:true});
const results=[];
for(const [name,engine,executablePath] of [['Chromium',chromium],['Firefox',firefox],['Edge',chromium,'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],['CocCoc',chromium,'C:/Program Files/CocCoc/Browser/Application/browser.exe']]){
 const browser=await engine.launch(executablePath?{executablePath}:{});const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{Element.prototype.animate=()=>{throw new Error('WAAPI unavailable');};localStorage.setItem('motion','off');});
 const viewports=[];
 for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){
  await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4350/?v=1.2.0');await page.addStyleTag({content:'*{animation:none!important;transition:none!important;}'});
  await page.locator('[data-add="sound"]').click();
  await page.locator('.cart-toggle').focus();await page.locator('.cart-toggle').evaluate(e=>e.click());await page.waitForTimeout(100);
  const incoming=await page.locator('#cart').evaluate(e=>({transform:e.style.transform,backdrop:e.style.getPropertyValue('--cart-backdrop-opacity')}));assert.match(incoming.transform,/translateX/);assert.ok(Number(incoming.backdrop)>0&&Number(incoming.backdrop)<.8);
  if(width===375)await page.screenshot({path:out+`/screenshots/${name}-drawer-in.png`});
  await page.waitForTimeout(350);assert.equal(await page.locator('#cart').evaluate(e=>e.style.transform),'');
  await page.locator('[data-action="plus"]').click();
  const count=Number(await page.locator('#cart-count').textContent());
  await page.keyboard.press('Escape');await page.waitForTimeout(80);assert.equal(await page.locator('#cart').evaluate(e=>e.open),true);
  await page.waitForTimeout(350);assert.equal(await page.locator('#cart').evaluate(e=>e.open),false);assert.equal(await page.evaluate(()=>document.activeElement.classList.contains('cart-toggle')),true);
  await page.locator('[data-filter="gaming"]').first().evaluate(e=>e.click());await page.waitForTimeout(90);
  const rearrange=await page.locator('.product:visible').evaluate(e=>e.style.transform);assert.match(rearrange,/translate/);
  await page.waitForTimeout(350);assert.equal(await page.locator('.product:visible').count(),1);
  await page.locator('[data-filter="all"]').first().evaluate(e=>e.click());await page.waitForTimeout(70);
  const appear=await page.locator('[data-id="wave"]').evaluate(e=>e.style.opacity);assert.ok(Number(appear)<1&&Number(appear)>.25);
  await page.waitForTimeout(350);assert.equal(await page.locator('.product:visible').count(),6);
  assert.equal(await page.locator('[data-id="wave"]').evaluate(e=>e.style.opacity),'');
  const product=page.locator('[data-id="wave"]');await product.hover();await page.waitForTimeout(260);assert.equal(await product.evaluate(e=>e.style.translate),'0px -5px');assert.equal(await product.locator('.device').evaluate(e=>e.style.scale),'1.045');
  await page.mouse.move(0,0);await page.waitForTimeout(260);assert.equal(await product.evaluate(e=>e.style.translate),'');
  assert.equal(Number(await page.locator('#cart-count').textContent()),count);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  viewports.push({width,incoming,rearrange,appear,status:'PASS'});
 }
 // Rapid opposite operations cancel stale motion and leave the final selection correct.
 await page.locator('[data-filter="all"]').first().evaluate(e=>{const q=k=>document.querySelector(`[data-filter="${k}"]`).click();q('gaming');q('audio');q('all');});
 await page.waitForTimeout(450);assert.equal(await page.locator('.product:visible').count(),6);
 await page.locator('.cart-toggle').evaluate(e=>e.click());await page.waitForTimeout(70);await page.keyboard.press('Escape');await page.waitForTimeout(400);assert.equal(await page.locator('#cart').evaluate(e=>e.open),false);
 assert.equal(await page.locator('.product').evaluateAll(es=>es.every(e=>!e.style.transform&&!e.style.opacity)),true);assert.deepEqual(errors,[]);
 results.push({browser:name,version:browser.version(),viewports,rapidOppositeActions:'PASS',cssWAAPIDisabled:'PASS',reducedMotionLegacyOff:'PASS animation enabled',cartData:'PASS quantities preserved',errors});await browser.close();
}
await writeFile(out+'/motion-checks.json',JSON.stringify(results,null,2));console.log(results.map(({viewports,...r})=>r));
