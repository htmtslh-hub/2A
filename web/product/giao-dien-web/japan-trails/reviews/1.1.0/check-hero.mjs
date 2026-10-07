import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('D:/3. Dự án/2A/_design/.browsers');
const { chromium, firefox } = await import(pathToFileURL('D:/3. Dự án/2A/_design/.tooling/node_modules/playwright/index.mjs').href);
const root = resolve('web/product/giao-dien-web/japan-trails');
const png = await import('node:fs/promises').then(fs=>fs.readFile(root + '/source/assets/img/model-samurai.png'));
assert.equal(png.subarray(25,26)[0], 6, 'PNG must have RGBA color type');
const results=[];
for (const [name, engine] of [['Chromium',chromium],['Firefox',firefox]]) {
  const browser=await engine.launch(); const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.goto(pathToFileURL(root+'/source/index.html').href); await page.waitForTimeout(200);
  const values=await page.locator('.hero__model').evaluate(img=>({loaded:img.complete&&img.naturalWidth>0, alt:img.alt, rect:img.getBoundingClientRect().toJSON()}));
  assert.equal(values.loaded,true); assert(values.alt.length>10);
  const dims=[]; for(const [w,h] of [[1440,900],[820,1180],[375,812],[320,740]]){await page.setViewportSize({width:w,height:h});await page.waitForTimeout(100);dims.push({w,h,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)});assert.equal(dims.at(-1).overflow,false)}
  await browser.close(); results.push({name,version:browser.version(),values,dims}); console.log(name,'PASS');
}
console.log(JSON.stringify({alpha:true,results}));
