import {resolve} from 'node:path';
import {mkdirSync,writeFileSync} from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium}=await import('../../_design/.tooling/node_modules/playwright/index.mjs');
const base=process.argv[2]||'http://127.0.0.1:4173';
const root='web/product/giao-dien-web/vybe/reviews/1.0.2';mkdirSync(root,{recursive:true});
const reports=[];
for(const [name,executablePath] of [['coccoc','C:/Program Files/CocCoc/Browser/Application/browser.exe'],['edge','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe']]){
 const browser=await chromium.launch({executablePath,headless:true});const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 await context.addInitScript(()=>{try{localStorage.setItem('vybe-motion','false');}catch{}Element.prototype.animate=undefined;});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/demos/vybe/?v=1.0.2');
 const r={name,version:browser.version(),base,defaultEnabled:await page.locator('.motion-toggle').textContent()==='Pause motion'};
 await page.addStyleTag({content:'*{animation:none!important;transition:none!important}'});
 await page.locator('[data-next]').click();await page.waitForTimeout(160);
 const sample=()=>page.locator('[data-slide="1"]').evaluate(el=>({transform:getComputedStyle(el).transform,opacity:Number(getComputedStyle(el).opacity),running:document.querySelector('.model-stage').dataset.motionState}));
 r.frame1=await sample();await page.waitForTimeout(200);r.frame2=await sample();r.visiblyMoving=r.frame1.transform!==r.frame2.transform&&r.frame1.opacity>0&&r.frame1.opacity<1;
 await page.screenshot({path:resolve(root,`${name}-${base.startsWith('https:')?'online':'local'}-moving.png`)});await page.waitForTimeout(700);
 r.settled=await page.evaluate(()=>({visible:[...document.querySelectorAll('[data-slide]')].filter(s=>getComputedStyle(s).opacity==='1').length,state:document.querySelector('.model-stage').dataset.motionState}));
 await page.locator('[data-next]').click();await page.waitForTimeout(100);await page.locator('.motion-toggle').click();r.pause=await page.locator('.model-stage').getAttribute('data-motion-state');await page.reload();r.reloadEnabled=await page.locator('.motion-toggle').textContent()==='Pause motion';
 await page.locator('[data-prev]').click();await page.waitForTimeout(1050);r.previousWrap=await page.locator('[data-counter]').textContent();await page.locator('[data-next]').click();await page.waitForTimeout(1050);r.nextWrap=await page.locator('[data-counter]').textContent();
 for(let i=0;i<7;i++)await page.locator('[data-next]').click({force:true});await page.waitForTimeout(1050);r.rapid=await page.evaluate(()=>({visible:[...document.querySelectorAll('[data-slide]')].filter(s=>getComputedStyle(s).opacity==='1').length,state:document.querySelector('.model-stage').dataset.motionState}));
 r.sizes=[];for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){await page.setViewportSize({width,height});r.sizes.push(await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})));}
 r.errors=errors;reports.push(r);await browser.close();
}
writeFileSync(resolve(root,base.startsWith('https:')?'online-browser-checks.json':'local-browser-checks.json'),JSON.stringify(reports,null,2));console.log(JSON.stringify(reports,null,2));if(reports.some(r=>!r.defaultEnabled||!r.visiblyMoving||!r.reloadEnabled||r.settled.visible!==1||r.settled.state!=='idle'||r.pause!=='idle'||r.rapid.visible!==1||r.errors.length||r.sizes.some(s=>s.width!==s.scrollWidth)))process.exitCode=1;
