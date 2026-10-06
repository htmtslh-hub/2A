import {resolve} from 'node:path';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const results=[];
for(const [name,path] of [['Edge','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],['CocCoc','C:/Program Files/CocCoc/Browser/Application/browser.exe']]){
 const browser=await chromium.launch({executablePath:path});
 const context=await browser.newContext({viewport:{width:375,height:812},reducedMotion:'reduce'});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4350');
 await page.locator('[data-add="wave"]').click();await page.locator('.cart-toggle').click();
 assert.equal(await page.locator('#total').textContent(),'$129.99');
 await page.locator('[data-action="plus"]').click();assert.equal(await page.locator('#total').textContent(),'$259.98');
 await page.screenshot({path:resolve(`web/product/giao-dien-web/diginest/reviews/1.0.0/screenshots/${name}-cart-mobile.png`)});
 await page.keyboard.press('Escape');await page.reload();assert.equal(await page.locator('#cart-count').textContent(),'2');
 const other=await context.newPage();await other.goto('http://127.0.0.1:4350');await other.locator('[data-add="sound"]').click();
 await page.waitForFunction(()=>document.getElementById('cart-count').textContent==='3');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=375),true);
 await page.locator('.menu-toggle').click();await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
 assert.deepEqual(errors,[]);
 results.push({browser:name,version:browser.version(),status:'PASS',scope:'375px cart, add, quantities, persistence, cross-tab synchronisation, menu, Escape, reduced-motion setting',errors});
 await browser.close();
}
// Browser storage can be denied; the cart must remain usable.
const browser=await chromium.launch();const context=await browser.newContext();
await context.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('Storage denied');}}));
const page=await context.newPage();await page.goto('http://127.0.0.1:4350');await page.locator('[data-add="sound"]').click();await page.locator('.cart-toggle').click();assert.equal(await page.locator('#total').textContent(),'$55.98');
results.push({browser:'Chromium',storageDenied:'PASS: cart remains functional'});await browser.close();
await writeFile(resolve('web/product/giao-dien-web/diginest/reviews/1.0.0/desktop-browser-checks.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
