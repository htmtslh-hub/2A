import {resolve} from 'node:path';
import {mkdirSync,writeFileSync} from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const base=process.env.VELORA_BASE||'http://127.0.0.1:4341';const out=resolve('web/product/giao-dien-web/velora/reviews/1.2.1/'+(base.includes('127.0.0.1')?'store-local':'store-online'));mkdirSync(out,{recursive:true});const browser=await chromium.launch();const report={base,version:browser.version(),cases:[],failures:[]};
for(const locale of ['vi-VN','en-US','zh-CN']){
 const context=await browser.newContext({locale,viewport:{width:1440,height:1000}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/?mau=t19');await page.waitForTimeout(1400);
 const detail=await page.evaluate(()=>({text:document.body.innerText,images:[...document.images].filter(i=>i.src.includes('velora')).map(i=>({src:i.src,ok:i.complete&&i.naturalWidth>0})),links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')),width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
 if(!detail.text.includes('Velora')||!detail.text.includes('HTML')||!detail.images.length||detail.images.some(i=>!i.ok)||detail.scroll>detail.width)report.failures.push(locale+': detail');
 for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=700){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(100);}await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(600);
 await page.screenshot({path:resolve(out,locale+'-detail.png'),fullPage:true});await page.goto(base+'/?tab=library');await page.waitForTimeout(900);
 const links=await page.locator('a[href="?mau=t19"]').count();if(!links)report.failures.push(locale+': library card');
 report.cases.push({locale,detailImages:detail.images,libraryLinks:links,errors});if(errors.length)report.failures.push(locale+': runtime '+errors.join());
 await page.goto(base+'/?mau=t19');await page.setViewportSize({width:375,height:812});await page.waitForTimeout(500);const widths=await page.evaluate(()=>[document.documentElement.clientWidth,document.documentElement.scrollWidth]);if(widths[1]>widths[0])report.failures.push(locale+': mobile overflow');await page.screenshot({path:resolve(out,locale+'-mobile.png'),fullPage:true});await context.close();
}
for(const path of ['/demos/velora/index.html?v=1.2.1','/demos/velora/assets/css/style.css','/demos/velora/assets/js/main.js','/previews/velora.webp?v=1.2.1']){const r=await fetch(base+path);if(r.status!==200)report.failures.push(path+': '+r.status);}
await browser.close();writeFileSync(resolve(out,'checks.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));if(report.failures.length)process.exitCode=1;
