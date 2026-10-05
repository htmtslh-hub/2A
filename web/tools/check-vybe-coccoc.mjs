import {resolve} from 'node:path';
import {writeFileSync} from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium}=await import('../../_design/.tooling/node_modules/playwright/index.mjs');
const b=await chromium.launch({executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe',headless:true});
const p=await b.newPage({viewport:{width:1440,height:900}});const errors=[];p.on('pageerror',e=>errors.push(e.message));const results=[];
for(const suffix of ['', '?motion=on']){
 await p.goto('https://forgezone.store/demos/vybe/'+suffix);
 const initial=await p.evaluate(()=>({url:location.href,reduce:matchMedia('(prefers-reduced-motion: reduce)').matches,button:document.querySelector('.motion-toggle').textContent,userAgent:navigator.userAgent}));
 await p.locator('[data-next]').click();await p.waitForTimeout(200);
 const during=await p.evaluate(()=>({running:document.getAnimations().map(a=>({state:a.playState,time:a.currentTime})),slides:[...document.querySelectorAll('[data-slide]')].map(s=>({opacity:getComputedStyle(s).opacity,transform:getComputedStyle(s).transform}))}));
 await p.waitForTimeout(900);results.push({initial,during,after:await p.locator('[data-name]').textContent()});
}
console.log(JSON.stringify({version:b.version(),results,errors},null,2));writeFileSync('web/product/giao-dien-web/vybe/reviews/1.0.0/coccoc-before.json',JSON.stringify({version:b.version(),results,errors},null,2));await b.close();
