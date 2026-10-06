import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const origin=process.argv[2] || 'https://forgezone.store';
const out=resolve('web/product/giao-dien-web/diginest/reviews/1.2.0');await mkdir(out+'/screenshots',{recursive:true});
const hash=b=>createHash('sha256').update(b).digest('hex');
const files=['index.html','assets/css/style.css','assets/js/main.js','assets/img/hero-desk.webp','assets/img/entertainment.webp','assets/img/products.webp'];
const assets=[];
for(const file of files){const url=origin+'/demos/diginest/'+file+'?v=1.2.0';const response=await fetch(url);assert.equal(response.status,200,url);const body=Buffer.from(await response.arrayBuffer());const local=await readFile(resolve('web/public/demos/diginest/'+file));const text=/\.(html|css|js)$/.test(file);const comparable=b=>text?Buffer.from(b.toString('utf8').replace(/\r\n/g,'\n')):b;assert.equal(hash(comparable(body)),hash(comparable(local)),file+' deployed content differs');assets.push({file,status:response.status,sha256:hash(body),normalisedSha256:hash(comparable(body)),bytes:body.length,comparison:text?'Equal after CRLF/LF normalisation for Git Windows checkout':'Exact binary bytes'});}
const browsers=[];
for(const [name,engine,executablePath] of [['Chromium',chromium],['Firefox',firefox],['Edge',chromium,'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],['CocCoc',chromium,'C:/Program Files/CocCoc/Browser/Application/browser.exe']]){
 const browser=await engine.launch(executablePath?{executablePath}:{});const context=await browser.newContext({viewport:{width:375,height:812},reducedMotion:'reduce'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/demos/diginest/index.html?v=1.2.0');await page.locator('[data-add="sound"]').click();await page.waitForTimeout(150);assert.equal(await page.locator('.cart-flight').count(),1);await page.waitForTimeout(1100);assert.equal(await page.locator('.cart-flight').count(),0);
 await page.locator('.cart-toggle').focus();await page.locator('.cart-toggle').evaluate(e=>e.click());await page.waitForTimeout(100);const incoming=await page.locator('#cart').evaluate(e=>e.style.transform);assert.match(incoming,/translateX/);await page.waitForTimeout(350);assert.equal(await page.locator('#total').textContent(),'$55.98');
 await page.locator('[data-action="plus"]').click();assert.equal(await page.locator('#total').textContent(),'$99.98');await page.locator('#checkout').click();assert.match(await page.locator('#checkout-review').textContent(),/No payment will be taken/);
 await page.keyboard.press('Escape');await page.waitForTimeout(430);assert.equal(await page.locator('#cart').evaluate(e=>e.open),false);
 await page.reload();assert.equal(await page.locator('#cart-count').textContent(),'2');
 await page.locator('[data-filter="gaming"]').first().evaluate(e=>e.click());await page.waitForTimeout(80);assert.match(await page.locator('.product:visible').evaluate(e=>e.style.transform),/translate/);await page.waitForTimeout(350);assert.equal(await page.locator('.product:visible').count(),1);
 await page.locator('[data-filter="all"]').first().evaluate(e=>e.click());await page.waitForTimeout(400);await page.locator('[data-id="wave"]').hover();await page.waitForTimeout(250);assert.equal(await page.locator('[data-id="wave"] .device').evaluate(e=>e.style.scale),'1.045');await page.mouse.move(0,0);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);assert.deepEqual(errors,[]);await page.screenshot({path:out+`/screenshots/deployed-${name}.png`});
 browsers.push({browser:name,version:browser.version(),status:'PASS',scope:'375px live HTTP: flying card, drawer middle frame, Escape, exact totals, persistence, demo review, filter motion, hover, overflow',errors});await browser.close();
}
const home=await fetch(origin);assert.equal(home.status,200);
const report={date:new Date().toISOString(),origin,url:origin+'/demos/diginest/index.html?v=1.2.0',assets,browsers,storeHomeStatus:home.status,sourceCommit:'9011a41',checkout:'Demo only; no real payment/order submission',catalog:'Not added for commercial sale'};
await writeFile(out+'/deployment-checks.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
