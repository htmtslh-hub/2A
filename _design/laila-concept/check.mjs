import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve('_design/.browsers');
const { chromium, firefox } = await import('../.tooling/node_modules/playwright/index.mjs');
const root = path.resolve('_design/laila-concept');
const url = pathToFileURL(path.join(root, 'index.html')).href;
const results = [];
for (const [name, engine, launch] of [
  ['chromium', chromium, {}], ['firefox', firefox, {}],
  ['edge', chromium, {channel:'msedge'}],
  ['coccoc', chromium, {executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]
]) {
 const browser = await engine.launch({headless:true,...launch});
 for (const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]) {
  const context = await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
  const page = await context.newPage();
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(url);
  await page.waitForTimeout(750);
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=550){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,90))}});
  await page.waitForTimeout(700);
  await page.evaluate(()=>window.scrollTo(0,0));
  const geometry=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,h1:document.querySelectorAll('h1').length,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0)}));
  await page.screenshot({path:path.join(root,`${name}-${width}.png`),fullPage:true});
  let menu='desktop';
  if(width<=950){await page.locator('.menu').click();const open=await page.locator('.menu').getAttribute('aria-expanded');await page.keyboard.press('Escape');const closed=await page.locator('.menu').getAttribute('aria-expanded');await page.locator('.menu').click();await page.locator('nav a[href="#about"]').click();menu={open,closed,linkClose:await page.locator('.menu').getAttribute('aria-expanded')};}
  await page.locator('.project summary').first().click();
  const detail=await page.locator('.project').first().getAttribute('open');
  results.push({browser:name,version:browser.version(),width,height,geometry,menu,detailOpen:detail!==null,errors});
  await context.close();
 }
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 const page=await context.newPage();await page.goto(url);results.push({browser:name,noJS:await page.locator('nav a').first().isVisible()});await context.close();await browser.close();
}
await fs.writeFile(path.join(root,'checks.json'),JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
