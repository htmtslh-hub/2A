import { chromium } from '../../../../../../_design/.tooling/node_modules/playwright/index.mjs';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const here=dirname(fileURLToPath(import.meta.url));
const source=resolve(here,'../../source');
const report={date:new Date().toISOString(),browser:'Microsoft Edge',sizes:[],errors:[],tests:[]};
const server=createServer((req,res)=>{
  const name=new URL(req.url,'http://localhost').pathname;
  const file=resolve(source,'.'+(name==='/'?'/index.html':name));
  if(!file.startsWith(source)){res.writeHead(403).end();return;}
  try{const bytes=readFileSync(file);res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp'})[extname(file)]||'application/octet-stream');res.end(bytes);}catch{res.writeHead(404).end();}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const url=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
report.version=browser.version();
mkdirSync(resolve(here,'screenshots'),{recursive:true});
const context=await browser.newContext({reducedMotion:'reduce'});
const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
for(const [width,height] of [[1440,900],[1024,900],[820,1180],[768,1024],[375,812],[320,740]]){
  await page.setViewportSize({width,height});await page.goto(url);await page.waitForTimeout(400);
  await page.locator('img').evaluateAll(async imgs=>{for(const img of imgs){img.loading='eager';}await Promise.all(imgs.map(img=>img.decode().catch(()=>{})));}); const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0)}));
  assert.equal(state.scrollWidth,width);assert.ok(state.images);
  if(width<=950){await page.locator('.nav-toggle').click();assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'),'false');assert.ok(await page.locator('.nav-toggle').evaluate(e=>e===document.activeElement));}
  await page.screenshot({path:resolve(here,`screenshots/edge-${width}.png`),fullPage:true});report.sizes.push(state);
}
await page.setViewportSize({width:1440,height:900});await page.goto(url);
await page.locator('#game-search').fill('moon');assert.equal(await page.locator('.game-card:visible').count(),1);assert.ok(await page.locator('#game-moon').isVisible());
await page.locator('#game-search').fill('not-a-world');assert.equal(await page.locator('.game-card:visible').count(),0);assert.ok(await page.locator('#empty-library').isVisible());
await page.keyboard.press('Escape');assert.equal(await page.locator('.game-card:visible').count(),2);report.tests.push('search,title,tags,empty,Escape');
await page.locator('[data-save="moon"]').click();assert.equal(await page.locator('[data-save="moon"]').getAttribute('aria-pressed'),'true');await page.reload();assert.equal(await page.locator('[data-save="moon"]').getAttribute('aria-pressed'),'true');await page.locator('[data-save="moon"]').click();report.tests.push('favourites save/reload/remove');
await page.locator('.hero .button').click();assert.equal(await page.locator('#game-rift').getAttribute('open'),'');report.tests.push('feature notes/hash');
await page.locator('summary').first().click();assert.equal(await page.locator('#game-rift').getAttribute('open'),null);report.tests.push('native notes close');
await page.goto(url);await page.keyboard.press('/');assert.ok(await page.locator('#game-search').evaluate(e=>e===document.activeElement));report.tests.push('slash shortcut');
await page.addInitScript(()=>{Storage.prototype.setItem=function(){throw new Error('blocked')};Storage.prototype.getItem=function(){throw new Error('blocked')};});await page.reload();await page.locator('[data-save="moon"]').click();assert.ok((await page.locator('#search-result').textContent()).includes('Device storage'));report.tests.push('blocked storage fallback');
await page.route('**/assets/img/**',r=>r.abort());await page.reload();assert.ok(await page.locator('#hero-title').isVisible());assert.ok(await page.locator('a[href^="mailto:"]').isVisible());report.tests.push('missing images content/navigation');
const offline=await browser.newContext({javaScriptEnabled:false,offline:true,viewport:{width:375,height:812}});const filePage=await offline.newPage();await filePage.goto(pathToFileURL(resolve(source,'index.html')).href);assert.ok(await filePage.locator('h1').isVisible());assert.equal(await filePage.locator('#game-search').isDisabled(),true);await filePage.locator('#moon-info summary').click();assert.equal(await filePage.locator('#moon-info').getAttribute('open'),'');report.tests.push('file:// offline noJS native notes');
const previewContext=await browser.newContext({viewport:{width:1396,height:1047}});
const preview=await previewContext.newPage();await preview.goto(url);await preview.waitForTimeout(450);
await preview.screenshot({path:resolve(here,'../../design/preview.png')});
assert.equal(report.errors.length,0);await browser.close();server.close();report.failures=[];writeFileSync(resolve(here,'interactions.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
