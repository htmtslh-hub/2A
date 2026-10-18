import {chromium,firefox} from '../../../../../../_design/.tooling/node_modules/playwright/index.mjs';
import {resolve} from 'node:path';import {pathToFileURL} from 'node:url';import {writeFileSync} from 'node:fs';
const root=resolve('web/product/giao-dien-web/nourish-bowl');const results={};
for(const [name,engine] of Object.entries({chromium,firefox})){
 const browser=await engine.launch();const page=await browser.newPage({viewport:{width:1440,height:900}});await page.goto(pathToFileURL(resolve(root,'source/index.html')).href);await page.waitForTimeout(1200);await page.locator('#bowls').scrollIntoViewIfNeeded();await page.waitForTimeout(110);const mid=await page.locator('#bowls .section-heading').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));await page.waitForTimeout(900);const end=await page.locator('#bowls .section-heading').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));results[name]={mid,end};await browser.close();}
writeFileSync(resolve(root,'reviews/1.0.0/motion-checks.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results));
