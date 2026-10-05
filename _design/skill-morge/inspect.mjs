import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(resolve('_design/.tooling/node_modules/playwright/index.mjs')).href);
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'});
const page=await browser.newPage({viewport:{width:1440,height:900}});
await page.goto(pathToFileURL(resolve('skill/skill-morge/assets/demo.html')).href+'?motion=on');
await page.evaluate(()=>scrollTo({top:document.querySelector('[data-morge-story]').offsetTop,behavior:'instant'}));
await page.waitForTimeout(200);
console.log(await page.evaluate(()=>{
 const selectors=['[data-morge]','[data-morge-story]','.morge-stage','[data-morge-scene]','[data-morge-scene-to="1"]'];
 return selectors.map(selector=>{const el=document.querySelector(selector),r=el.getBoundingClientRect(),s=getComputedStyle(el);return{selector,rect:r.toJSON(),inert:el.inert,opacity:s.opacity,position:s.position,overflow:s.overflow,transform:s.transform,scrollY:window.scrollY,hit:document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.outerHTML.slice(0,200)}});
}));
await page.screenshot({path:resolve('_design/skill-morge/debug.png')});
await browser.close();
