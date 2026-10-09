import {chromium} from '../../../../../../_design/.tooling/node_modules/playwright/index.mjs';
import {createServer} from 'node:http';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {dirname,resolve,extname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const here=dirname(fileURLToPath(import.meta.url));
const source=resolve(here,'../../source');
const report={date:new Date().toISOString(),browser:'Microsoft Edge',sizes:[],tests:[],errors:[]};
const server=createServer((req,res)=>{const path=new URL(req.url,'http://localhost').pathname;const file=resolve(source,'.'+(path==='/'?'/index.html':path));if(!file.startsWith(source)){res.writeHead(403).end();return;}try{res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp'})[extname(file)]||'application/octet-stream');res.end(readFileSync(file));}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const url=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
report.version=browser.version();
const context=await browser.newContext({reducedMotion:'reduce'});
const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
mkdirSync(resolve(here,'screenshots'),{recursive:true});
for(const [width,height] of [[1440,900],[1024,900],[820,1180],[768,1024],[375,812],[320,740]]){
 await page.setViewportSize({width,height});await page.goto(url);
 await page.locator('img').evaluateAll(async imgs=>{for(const img of imgs)img.loading='eager';await Promise.all(imgs.map(i=>i.decode()));});
 const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0)}));assert.equal(state.scrollWidth,width);assert.ok(state.images);
 if(width<=950){await page.locator('.nav-toggle').click();assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'),'false');assert.ok(await page.locator('.nav-toggle').evaluate(e=>e===document.activeElement));}
 await page.screenshot({path:resolve(here,`screenshots/edge-${width}.png`),fullPage:true});report.sizes.push(state);
}
await page.setViewportSize({width:1440,height:900});await page.goto(url);
await page.locator('.ability summary').first().click();assert.equal(await page.locator('.ability').first().getAttribute('open'),'');await page.locator('.ability summary').first().click();assert.equal(await page.locator('.ability').first().getAttribute('open'),null);report.tests.push('native ability open/close');
await page.locator('.read-link').click();assert.ok(page.url().endsWith('#story'));report.tests.push('hero story anchor');
await page.locator('.art-card').first().click();assert.ok(page.url().endsWith('/assets/img/glasshouse.webp'));await page.goBack();report.tests.push('full local artwork and browser Back');
const hover=page.locator('.art-card img').first();await page.locator('.art-card').first().hover();await page.waitForTimeout(150);const matrix=await hover.evaluate(e=>getComputedStyle(e).transform);assert.notEqual(matrix,'none');report.tests.push('finite hover active with reduced preference');
await page.route('**/assets/img/**',r=>r.abort());await page.goto(url);assert.ok(await page.locator('h1').isVisible());assert.ok(await page.locator('a[href^="mailto:"]').isVisible());report.tests.push('missing images keeps title/contact');
const offline=await browser.newContext({javaScriptEnabled:false,offline:true,viewport:{width:375,height:812}});const file=await offline.newPage();await file.goto(pathToFileURL(resolve(source,'index.html')).href);assert.ok(await file.locator('#site-menu').isVisible());await file.locator('.ability summary').first().click();assert.equal(await file.locator('.ability').first().getAttribute('open'),'');report.tests.push('offline file noJS navigation/native abilities');
const previewContext=await browser.newContext({viewport:{width:1396,height:1047}});const preview=await previewContext.newPage();await preview.goto(url);await preview.locator('img').evaluateAll(async imgs=>{for(const i of imgs)i.loading='eager';await Promise.all(imgs.map(i=>i.decode()));});await preview.screenshot({path:resolve(here,'../../design/preview.png')});
assert.equal(report.errors.length,0);report.failures=[];writeFileSync(resolve(here,'interactions.json'),JSON.stringify(report,null,2));await browser.close();server.close();console.log(JSON.stringify(report,null,2));
