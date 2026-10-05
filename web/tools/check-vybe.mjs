import { chromium } from '../../_design/.tooling/node_modules/playwright/index.mjs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {writeFileSync} from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:1440,height:900}});
const evidence=resolve('web/product/giao-dien-web/vybe/reviews/1.0.0');
const report={};
await page.goto(pathToFileURL(resolve('web/product/giao-dien-web/vybe/source/index.html')).href);
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.locator('[data-prev]').click();
await page.waitForTimeout(250);
await page.screenshot({path:resolve(evidence,'screenshots/morge-wrap-mid.png')});
await page.waitForTimeout(700);report.previousWrap=await page.locator('[data-counter]').textContent();
await page.locator('[data-next]').click();await page.waitForTimeout(950);report.nextWrap=await page.locator('[data-counter]').textContent();
for(let i=0;i<8;i++){await page.locator('[data-next]').click({force:true});await page.waitForTimeout(45);}
await page.waitForTimeout(1000);report.rapid=await page.evaluate(()=>({visible:[...document.querySelectorAll('[data-slide]')].filter(x=>getComputedStyle(x).opacity==='1').length,running:document.getAnimations().filter(a=>a.playState==='running').length,name:document.querySelector('[data-name]').textContent,counter:document.querySelector('[data-counter]').textContent}));
await page.locator('[data-size="0"]').selectOption('L');await page.locator('[data-add="0"]').click();report.bagCount=await page.locator('[data-bag-count]').textContent();await page.locator('.bag-toggle').click();report.bagText=await page.locator('[data-bag-items]').textContent();report.total=await page.locator('[data-total]').textContent();await page.screenshot({path:resolve(evidence,'screenshots/bag.png')});await page.keyboard.press('Escape');
await page.reload();report.persisted=await page.locator('[data-bag-count]').textContent();
report.sizes=[];
for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){await page.setViewportSize({width,height});await page.screenshot({path:resolve(evidence,`screenshots/final-${width}.png`),fullPage:true});report.sizes.push(await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})));}
await page.emulateMedia({reducedMotion:'reduce'});await page.locator('[data-next]').click();report.reducedRunning=await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length);
report.errors=errors;
writeFileSync(resolve(evidence,'interaction-checks.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
await browser.close();
