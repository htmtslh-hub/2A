import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {writeFile,mkdir} from 'node:fs/promises';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import(pathToFileURL(resolve('_design/.tooling/node_modules/playwright/index.mjs')));
const out=resolve('web/product/giao-dien-web/reviews/video-previews');
await mkdir(out+'/screenshots',{recursive:true});
const origin=process.env.PREVIEW_QA_URL||'http://localhost:4351';
const results=[];
for(const [name,engine,options] of [
 ['Chromium',chromium,{}],['Firefox',firefox,{}],
 ['Edge',chromium,{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}],
 ['CocCoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]
]){
 const browser=await engine.launch({headless:true,...options});
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 await context.route('**/api/traffic**',r=>r.abort());
 const page=await context.newPage(); const media=[]; const errors=[];
 page.on('request',r=>{if(r.url().includes('/previews/') && r.url().includes('.mp4'))media.push(r.url());});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/?tab=library',{waitUntil:'networkidle',timeout:60000});
 await page.mouse.move(0,0); await page.waitForTimeout(600);
 if(media.length)throw Error(name+': preloads untouched library videos');
 const cards=page.locator('.product-card-wrap');
 const count=await cards.count();
 const targets=name==='Chromium'?Array.from({length:count},(_,i)=>i):[0];
 for(const index of targets){
  const card=cards.nth(index);await card.scrollIntoViewIfNeeded();await page.mouse.move(0,0);
  const video=card.locator('video'); if(!await video.count()) throw Error(name+': missing video card '+index);
  const button=card.locator('[data-preview-actions] button').first();
  if(await button.evaluate(e=>!!e.closest('a')))throw Error('Nested playback button');
  await card.locator('a.product-card').hover();
  await page.waitForFunction(e=>!e.paused&&e.currentTime>0.12,await video.elementHandle(),{timeout:12000});
  const before=await video.evaluate(e=>e.currentTime);await page.waitForTimeout(220);
  if(await video.evaluate(e=>e.currentTime)<=before)throw Error('Video has no progression');
  await button.click();if(!await video.evaluate(e=>e.paused))throw Error('Pause failed');
  await button.click();await page.waitForFunction(e=>!e.paused,await video.elementHandle());
  if(!page.url().includes('tab=library'))throw Error('Playback navigated');
  await page.mouse.move(0,0);await video.evaluate(e=>window.scrollTo(0,e.getBoundingClientRect().top+window.scrollY < window.innerHeight ? document.body.scrollHeight : 0));
  await page.waitForTimeout(250);
  if(!await video.evaluate(e=>e.paused))throw Error('Offscreen cleanup failed');
 }
 const sizes=[];
 for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){
  await page.setViewportSize({width,height});await page.goto(origin+'/?mau=t27',{waitUntil:'networkidle'});
  const video=page.locator('[data-recorded-preview] video').first();
  const button=page.locator('[data-preview-actions] button').first();await button.scrollIntoViewIfNeeded();
  await button.click();await page.waitForFunction(e=>!e.paused&&e.currentTime>0.1,await video.elementHandle());
  const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  sizes.push({width,...dims});if(dims.scroll>dims.client)throw Error(name+': overflow '+width);
  await page.screenshot({path:out+'/screenshots/store-'+name+'-'+width+'.jpg',type:'jpeg',quality:85});
  await button.click();if(!await video.evaluate(e=>e.paused))throw Error('Detail pause failed');
 }
 results.push({name,version:browser.version(),catalogCards:count,testedCards:targets.length,sizes,errors,requests:media.length});
 await browser.close();console.log(name+' PASS '+targets.length+' cards / four widths / reduced motion');
}
await writeFile(out+'/store-checks.json',JSON.stringify({origin,date:new Date().toISOString(),results},null,2));
