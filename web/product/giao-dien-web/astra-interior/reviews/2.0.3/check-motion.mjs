
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out=resolve('web/product/giao-dien-web/astra-interior/reviews/2.0.3');
mkdirSync(out+'/screenshots',{recursive:true});
const report={};
for(const [name,engine,options] of [['edge',chromium,{channel:'msedge'}],['chromium',chromium,{}],['firefox',firefox,{}]]) {
 const browser=await engine.launch({headless:true,...options});
 report[name]={version:browser.version(),viewports:[],motion:[]};
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4330/demos/astra-interior/');await page.waitForTimeout(1600);
 await page.evaluate(()=>localStorage.setItem('motion','off'));await page.reload();await page.waitForTimeout(1500);
 await page.mouse.move(1050,320);await page.waitForTimeout(100);
 report[name].cosmic=await page.locator('.cosmic-aura').evaluate(e=>({opacity:+e.style.opacity,translate:e.style.translate,pointer:getComputedStyle(e).pointerEvents}));
 await page.screenshot({path:out+'/screenshots/'+name+'-cosmic.png'});
 await page.waitForTimeout(1700);
 report[name].cosmicIdle=await page.locator('.cosmic-aura').evaluate(e=>+e.style.opacity===0);
 await page.mouse.move(1100,350);await page.waitForTimeout(420);
 report[name].hover=await page.locator('.hero__product.is-active').evaluate(e=>({translate:e.style.translate,rotate:e.style.rotate,scale:e.style.scale}));
 report[name].beans=await page.locator('.bean').evaluateAll(es=>es.map(e=>e.style.translate));
 await page.mouse.move(100,700);await page.waitForTimeout(420);
 report[name].hoverOtherSide=await page.locator('.hero__product.is-active').evaluate(e=>e.style.translate);
 await page.mouse.move(0,1000);await page.waitForTimeout(420);
 report[name].hoverRest=await page.locator('.hero__product.is-active').evaluate(e=>parseFloat(e.style.translate)===0);
 await page.locator('.menu-item__image').first().hover({position:{x:250,y:150}});await page.waitForTimeout(420);
 report[name].menuHover=await page.locator('.menu-item__image img').first().evaluate(e=>({translate:e.style.translate,scale:e.style.scale}));
 await page.locator('.motion-toggle').click();
 report[name].cosmicPaused=await page.locator('.cosmic-aura').evaluate(e=>+e.style.opacity===0);
 report[name].hoverPaused=await page.locator('.menu-item__image img').first().evaluate(e=>parseFloat(e.style.translate)===0&&e.style.scale==='1');
 await page.locator('.motion-toggle').click();await page.mouse.move(0,0);
 for(const [w,h] of [[1440,900],[820,1180],[375,812],[320,740]]) {
  await page.setViewportSize({width:w,height:h});await page.waitForTimeout(1200);
  await page.screenshot({path:out+'/screenshots/'+name+'-'+w+'-hero.png'});
  report[name].viewports.push(await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0)})));
 }
 await page.setViewportSize({width:1440,height:900});
 await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});
 for(const step of [-1,1,1,1,-1,-1]) {
  const before=await page.locator('[aria-pressed="true"][data-go]').getAttribute('data-go');
  await page.locator('[data-step="'+step+'"]').click();
  await page.waitForTimeout(120);
  const mid=await page.locator('.hero__product.is-active').evaluate(e=>({opacity:parseFloat(getComputedStyle(e).opacity),transform:getComputedStyle(e).transform}));
  await page.waitForTimeout(1000);
  const after=await page.locator('[aria-pressed="true"][data-go]').getAttribute('data-go');
  report[name].motion.push({before,step,after,mid,finite:await page.locator('.hero__product.is-active').evaluate(e=>parseFloat(getComputedStyle(e).opacity)>.99)});
 }
 await page.evaluate(()=>{for(let i=0;i<12;i++)document.querySelector('[data-step="1"]').click()});await page.waitForTimeout(1100);
 report[name].rapid=await page.locator('.hero__product').evaluateAll(es=>es.filter(e=>+getComputedStyle(e).opacity>.99).length===1);
 await page.locator('.motion-toggle').click();await page.reload();await page.waitForTimeout(1500);
 report[name].freshMotion=await page.locator('.motion-toggle').getAttribute('aria-pressed')==='false';
 await page.locator('[data-product="espresso"]').click();await page.locator('[data-product="matcha"]').click();await page.locator('.bag-toggle').click();
 report[name].total=await page.locator('.bag__total b').textContent();
 await page.locator('[data-bag-key="espresso"][data-delta="1"]').click();
 report[name].plusTotal=await page.locator('.bag__total b').textContent();
 await page.locator('[data-bag-key="matcha"][data-delta="-1"]').click();
 report[name].removeTotal=await page.locator('.bag__total b').textContent();
 await page.keyboard.press('Escape');
 report[name].escape=await page.locator('.bag-toggle').evaluate(e=>e===document.activeElement);
 await page.reload();report[name].persistent=await page.locator('.bag-count').textContent();
 await page.locator('[data-filter="tea"]').click();report[name].filter=await page.locator('.menu-item:visible').count();
 await page.setViewportSize({width:320,height:740});await page.locator('.nav-toggle').click();
 report[name].mobileExpanded=await page.locator('.nav-toggle').getAttribute('aria-expanded');await page.keyboard.press('Escape');
 report[name].mobileEscape=await page.locator('.nav-toggle').evaluate(e=>e===document.activeElement);
 report[name].errors=errors;
 await page.close();
 const offline=await browser.newPage({javaScriptEnabled:false,viewport:{width:320,height:740}});
 await offline.goto(pathToFileURL(resolve('web/product/giao-dien-web/astra-interior/source/index.html')).href);
 report[name].noJS=await offline.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,hero:document.getElementById('hero-title').innerText,images:[...document.images].every(i=>i.complete&&i.naturalWidth)}));
 await offline.screenshot({path:out+'/screenshots/'+name+'-nojs.png',fullPage:true});
 await browser.close();
 console.log(name,JSON.stringify(report[name]));
}
writeFileSync(out+'/motion-checks.json',JSON.stringify(report,null,2));
// Preview and video are rendered from the actual customer source, never a mockup.
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:900}});
await page.goto(pathToFileURL(resolve('web/product/giao-dien-web/astra-interior/source/index.html')).href);await page.waitForTimeout(1600);
await page.mouse.move(0,0);
for(const [label,w,h] of [['',1440,900],['-tablet',820,1180],['-mobile',375,812]]) {
 await page.setViewportSize({width:w,height:h});await page.waitForTimeout(1000);
 const png=out+'/screenshots/preview'+label+'.png';await page.screenshot({path:png});
 execFileSync('ffmpeg',['-y','-loglevel','error','-i',png,'-vf','scale=1200:-2','-quality','88','web/public/previews/astra-interior'+label+'.webp']);
}
await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(1500);await page.screenshot({path:out+'/screenshots/full-page.png',fullPage:true});
mkdirSync(out+'/video-frames',{recursive:true});
for(let i=0;i<72;i++) {
 await page.mouse.move(720+Math.sin(i/8)*480,390+Math.cos(i/9)*150);
 if(i===8||i===30||i===52)await page.evaluate(()=>document.querySelector('[data-step="1"]').click());
 await page.screenshot({path:out+'/video-frames/'+String(i).padStart(3,'0')+'.png'});await page.waitForTimeout(45);
}
execFileSync('ffmpeg',['-y','-loglevel','error','-framerate','12','-i',out+'/video-frames/%03d.png','-c:v','libx264','-pix_fmt','yuv420p','-crf','24','-movflags','+faststart','web/public/previews/astra-interior.mp4']);
await browser.close();
