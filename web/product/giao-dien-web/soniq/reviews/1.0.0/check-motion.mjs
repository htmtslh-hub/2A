import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out=resolve('web/product/giao-dien-web/soniq/reviews/1.0.0');mkdirSync(out+'/screenshots',{recursive:true});const report={};
for(const [name,engine,options] of [['edge',chromium,{channel:'msedge'}],['chromium',chromium,{}],['firefox',firefox,{}]]) {
 const b=await engine.launch({headless:true,...options});const p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:4330/demos/soniq/');await p.waitForTimeout(1300);await p.evaluate(()=>localStorage.setItem('motion','off'));await p.reload();await p.waitForTimeout(1300);
 const r={version:b.version(),motion:[],viewports:[]};await p.mouse.move(1100,350);await p.waitForTimeout(450);r.hover=await p.locator('.hero__product.is-active').evaluate(e=>({translate:e.style.translate,rotate:e.style.rotate}));await p.mouse.move(0,0);await p.waitForTimeout(450);r.hoverRest=await p.locator('.hero__product.is-active').evaluate(e=>parseFloat(e.style.translate)===0);
 await p.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});
 for(const step of [-1,1,1,1,-1,-1]) {
  const before=await p.locator('[data-go][aria-pressed="true"]').getAttribute('data-go');await p.locator('[data-step="'+step+'"]').click();await p.waitForTimeout(120);
  const mid=await p.locator('.hero__product.is-active').evaluate(e=>({opacity:+getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));await p.waitForTimeout(1000);
  const after=await p.locator('[data-go][aria-pressed="true"]').getAttribute('data-go');r.motion.push({before,step,after,mid,final:await p.locator('.hero__product.is-active').evaluate(e=>+getComputedStyle(e).opacity>.99)});
 }
 await p.evaluate(()=>{for(let i=0;i<12;i++)document.querySelector('[data-step="1"]').click()});await p.waitForTimeout(1100);r.rapid=await p.locator('.hero__product').evaluateAll(es=>es.filter(e=>+getComputedStyle(e).opacity>.99).length===1);
 await p.locator('[data-go="1"]').click();await p.locator('[data-buy-current]').click();await p.locator('.bag-toggle').click();r.currentColour=await p.locator('.bag__items strong').textContent();r.total=await p.locator('.bag__total b').textContent();await p.locator('[data-bag-key="ivory"][data-delta="1"]').click();r.plusTotal=await p.locator('.bag__total b').textContent();await p.keyboard.press('Escape');r.escape=await p.locator('.bag-toggle').evaluate(e=>e===document.activeElement);await p.reload();r.persistence=await p.locator('.bag-count').textContent();
 await p.locator('.motion-toggle').click();await p.reload();r.fresh=await p.locator('.motion-toggle').getAttribute('aria-pressed')==='false';await p.waitForTimeout(1300);
 for(const [w,h] of [[1440,900],[820,1180],[375,812],[320,740]]) {await p.setViewportSize({width:w,height:h});await p.waitForTimeout(450);r.viewports.push(await p.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth)})));await p.screenshot({path:out+'/screenshots/'+name+'-'+w+'.png',fullPage:true});}
 await p.locator('.nav-toggle').click();r.mobileOpen=await p.locator('.nav-toggle').getAttribute('aria-expanded')==='true';await p.keyboard.press('Escape');r.mobileEscape=await p.locator('.nav-toggle').evaluate(e=>e===document.activeElement);
 r.errors=errors;r.pass=r.rapid&&r.hoverRest&&r.fresh&&r.escape&&r.currentColour.includes('Ivory')&&r.total==='$149.00'&&r.plusTotal==='$298.00'&&r.persistence==='2'&&r.mobileOpen&&r.mobileEscape&&!errors.length&&r.viewports.every(v=>!v.overflow&&v.images)&&r.motion.every(m=>m.final&&m.mid.opacity>0&&m.mid.opacity<1);report[name]=r;await b.close();console.log(name,r.pass);
}
writeFileSync(out+'/motion-checks.json',JSON.stringify(report,null,2));if(Object.values(report).some(r=>!r.pass))process.exitCode=1;
