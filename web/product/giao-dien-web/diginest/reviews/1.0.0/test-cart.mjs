import {resolve} from 'node:path';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out=resolve('web/product/giao-dien-web/diginest/reviews/1.0.0');
await mkdir(out+'/screenshots',{recursive:true});
const results=[];
for(const [name,engine] of [['chromium',chromium],['firefox',firefox]]){
 const browser=await engine.launch();
 const context=await browser.newContext({viewport:{width:1440,height:900}});
 const page=await context.newPage(); const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4350');
 await page.locator('[data-add="sound"]').click();
 assert.equal(await page.locator('#cart-count').textContent(),'1');
 await page.locator('.cart-toggle').click();
 assert.equal(await page.locator('#subtotal').textContent(),'$49.99');
 assert.equal(await page.locator('#total').textContent(),'$55.98');
 await page.locator('[data-action="plus"]').click();
 assert.equal(await page.locator('#total').textContent(),'$99.98');
 assert.equal(await page.locator('#shipping-total').textContent(),'Free');
 await page.locator('#checkout').click();
 assert.match(await page.locator('#checkout-review').textContent(),/No payment will be taken/);
 await page.locator('#back-to-cart').click();
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('#cart').evaluate(e=>e.open),false);
 assert.equal(await page.evaluate(()=>document.activeElement.classList.contains('cart-toggle')),true);
 await page.reload(); assert.equal(await page.locator('#cart-count').textContent(),'2');
 await page.locator('.cart-toggle').click();
 await page.locator('[data-action="remove"]').click();
 assert.equal(await page.locator('#cart-count').textContent(),'0');
 assert.equal(await page.locator('#cart-empty').isVisible(),true);
 await page.keyboard.press('Escape');
 await page.locator('#add-bundle').click(); assert.equal(await page.locator('#cart-count').textContent(),'2');
 await page.locator('.cart-toggle').click();assert.equal(await page.locator('#total').textContent(),'$179.98');
 await page.screenshot({path:out+`/screenshots/${name}-cart.png`});await page.keyboard.press('Escape');
 await page.locator('#search').fill('mouse');assert.equal(await page.locator('.product:visible').count(),1);
 await page.locator('#search').fill('no match');assert.equal(await page.locator('#no-results').isVisible(),true);
 await page.locator('#clear-filter').click();assert.equal(await page.locator('.product:visible').count(),6);
 for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){
  await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4350');
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth),true,`${name} ${width} overflow`);
  await page.screenshot({path:out+`/screenshots/${name}-${width}.png`,fullPage:true});
  if(width<=820){await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');}
 }
 await page.evaluate(()=>localStorage.setItem('diginest-cart-v1','{"evil":2,"sound":-3,"wave":1000}'));
 await page.reload();assert.equal(await page.locator('#cart-count').textContent(),'0');
 assert.deepEqual(errors,[]);
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 const np=await nojs.newPage();await np.goto('http://127.0.0.1:4350');assert.equal(await np.locator('.product:visible').count(),6);assert.equal(await np.locator('#navigation').isVisible(),true);assert.equal(await np.locator('[data-add="wave"]').isDisabled(),true);
 await nojs.close();
 results.push({browser:name,version:browser.version(),cart:'PASS: add, quantity, remove, threshold, persistence, bundle, demo review, Escape/focus',filters:'PASS',invalidStorage:'PASS',noJS:'PASS',responsive:'PASS: 1440,820,375,320',errors});
 await context.close();await browser.close();
}
await writeFile(out+'/cart-checks.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
const src=resolve('web/product/giao-dien-web/diginest/source');
const maps=JSON.parse(await readFile(out+'/doc-map.json','utf8'));
const rows=[];for(const [file,literal,change] of maps){const content=await readFile(src+'/'+file,'utf8');rows.push(`| \`${file}\` | \`${literal}\` | ${content.split(literal).length-1} | ${change} |`);}
const doc=await readFile(src+'/CUSTOMISE.md','utf8');await writeFile(src+'/CUSTOMISE.md',doc.replace('MAP_PENDING','| File | Find literally | Count | Change |\n|---|---|---|---|\n'+rows.join('\n')));
