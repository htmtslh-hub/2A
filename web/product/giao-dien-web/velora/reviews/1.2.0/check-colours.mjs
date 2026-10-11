import { mkdirSync,writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out=resolve('web/product/giao-dien-web/velora/reviews/1.2.0/colours');mkdirSync(out,{recursive:true});
const file=pathToFileURL(resolve('_design/.qa-extracted/velora/index.html')).href;
const paints={chalk:'#f4f4f1',graphite:'#42454c',lavender:'#b7b5ce',coral:'#e46d65',ocean:'#5e9fbd',sage:'#95ad8d'};
const report={browsers:{},failures:[]};
function check(ok,msg){if(!ok)report.failures.push(msg);}
for(const [name,engine,opts] of [['chromium',chromium,{}],['firefox',firefox,{}],['edge',chromium,{channel:'msedge'}],['coccoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]]){
 const browser=await engine.launch({headless:true,...opts});const page=await browser.newPage({viewport:{width:1440,height:900}});let errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(file);await page.locator('[data-open]').click();await page.waitForTimeout(1000);await page.locator('[data-category="frame"]').click();
 for(let model=0;model<3;model++){
  for(const [key,paint] of Object.entries(paints)){
   await page.locator(`input[name="finish"][value="${key}"]`).check();
   const state=await page.evaluate(()=>{let r=document.querySelector('.showroom'),s=r.querySelector(`[data-product="${r.dataset.selected}"]`);return{paint:[...s.querySelectorAll('linearGradient[id$="-paint"] stop')].slice(0,2).map(n=>n.getAttribute('stop-color')),summary:r.querySelector('[data-summary]').textContent,mail:decodeURIComponent(r.querySelector('[data-enquiry]').href),label:s.querySelector('.bike').getAttribute('aria-label'),checked:r.querySelector('input[name="finish"]:checked').value}});
   const label=key[0].toUpperCase()+key.slice(1);check(state.paint.every(v=>v===paint)&&state.summary.includes(label)&&state.mail.includes(label)&&state.label.includes(label)&&state.checked===key,`${name}/${model}/${key}: sync`);
  }
  if(model<2){await page.locator('[data-next]').click();await page.waitForTimeout(950);}
 }
 await page.locator('[data-next]').click();await page.waitForTimeout(950);check(await page.locator('input[name="finish"][value="sage"]').isChecked(),name+': restore Metro');
 await page.locator('input[name="finish"][value="coral"]').check();await page.waitForTimeout(500);await page.screenshot({path:resolve(out,name+'-coral.png')});
 for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){
  await page.setViewportSize({width,height});await page.waitForTimeout(100);await page.locator('[data-category="frame"]').click();await page.locator('input[name="finish"][value="ocean"]').check();await page.waitForTimeout(500);
  const layout=await page.evaluate(()=>{const e=document.documentElement,p=document.querySelector('#frame-panel'),a=document.querySelector('[data-enquiry]');const labels=[...p.querySelectorAll('label')].map(x=>x.getBoundingClientRect());return{overflow:e.scrollWidth>e.clientWidth,minTarget:Math.min(...labels.map(x=>Math.min(x.width,x.height))),overlap:p.getBoundingClientRect().bottom>a.getBoundingClientRect().top}});check(!layout.overflow&&!layout.overlap&&layout.minTarget>=44,`${name}/${width}: layout ${JSON.stringify(layout)}`);await page.screenshot({path:resolve(out,`${name}-${width}.png`)});
 }
 await page.locator('input[name="finish"][value="ocean"]').focus();await page.keyboard.press('ArrowRight');check(await page.locator('input[name="finish"][value="sage"]').isChecked(),name+': keyboard');
 check(errors.length===0,name+': console');report.browsers[name]={version:browser.version(),coloursPerModel:6,models:3,widths:[1440,820,375,320],errors};await browser.close();
}
writeFileSync(resolve(out,'checks.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));if(report.failures.length)process.exitCode=1;
