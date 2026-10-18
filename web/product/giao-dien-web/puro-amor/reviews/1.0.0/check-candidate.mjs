import { chromium, firefox } from '../../../../../../_design/.tooling/node_modules/playwright/index.mjs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { writeFileSync } from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const root=resolve('web/product/giao-dien-web/puro-amor');
const url=pathToFileURL(resolve(root,'source/index.html')).href;
const report={};
for (const [name,engine] of Object.entries({chromium,firefox})) {
 const browser=await engine.launch(); const page=await browser.newPage(); const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 report[name]={version:browser.version(),sizes:[],errors};
 for (const [width,height] of [[864,508],[1440,900],[820,1180],[375,812],[320,740]]) {
  await page.setViewportSize({width,height});await page.goto(url); await page.waitForTimeout(1300);
  await page.screenshot({path:resolve(root,`reviews/1.0.0/screenshots/${name}-${width}.png`),fullPage:width!==864});
  const dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,h1:document.querySelectorAll('h1').length, imageLoaded:document.querySelector('.hero__product').complete && document.querySelector('.hero__product').naturalWidth>0,brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.querySelector(a.getAttribute('href'))).map(a=>a.outerHTML)}));
  if(width<821) { await page.locator('.menu-toggle').click(); dimensions.menuOpen=await page.locator('.menu-toggle').getAttribute('aria-expanded');await page.keyboard.press('Escape'); dimensions.menuClosed=await page.locator('.menu-toggle').getAttribute('aria-expanded');dimensions.escapeFocus=await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement); }
  report[name].sizes.push({width,height,...dimensions});
 }
 await page.setViewportSize({width:1440,height:900});await page.goto(url);await page.waitForTimeout(1200);
 await page.locator('#cardapio').scrollIntoViewIfNeeded();await page.waitForTimeout(110);
 report[name].midReveal=await page.locator('#cardapio h2').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));
 await page.screenshot({path:resolve(root,`reviews/1.0.0/screenshots/${name}-scroll-mid.png`)});await page.waitForTimeout(900);
 report[name].endReveal=await page.locator('#cardapio h2').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);await page.waitForTimeout(100);report[name].reducedMotion=await page.locator('.hero__product').evaluate(e=>getComputedStyle(e).transform);
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:320,height:740}});await nojs.goto(url);report[name].noJS=await nojs.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,links:[...document.querySelectorAll('header nav a')].every(a=>a.getBoundingClientRect().height>0)}));await nojs.close();
 await browser.close();
}
writeFileSync(resolve(root,'reviews/1.0.0/candidate-checks.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
