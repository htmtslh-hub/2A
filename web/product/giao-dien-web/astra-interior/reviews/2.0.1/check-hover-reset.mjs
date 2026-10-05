import {resolve} from 'node:path';
import {writeFileSync} from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const report={};
for(const [name,engine,options] of [['edge',chromium,{channel:'msedge'}],['chromium',chromium,{}],['firefox',firefox,{}]]) {
 const b=await engine.launch({headless:true,...options});const p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 await p.goto('http://127.0.0.1:4330/demos/astra-interior/');await p.waitForTimeout(1500);
 await p.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});
 await p.mouse.move(1100,350);await p.waitForTimeout(420);
 const hover=await p.locator('.hero__product.is-active').evaluate(e=>({translate:e.style.translate,rotate:e.style.rotate,scale:e.style.scale}));
 await p.screenshot({path:resolve('web/product/giao-dien-web/astra-interior/reviews/2.0.1/screenshots/'+name+'-hover.png')});
 await p.mouse.move(0,1000);await p.waitForTimeout(420);
 const rest=await p.locator('.hero__product.is-active').evaluate(e=>({translate:e.style.translate,rotate:e.style.rotate,scale:e.style.scale}));
 await p.locator('.menu-item__image').first().hover();await p.waitForTimeout(420);
 await p.locator('.motion-toggle').click();const pause=await p.locator('.menu-item__image img').first().evaluate(e=>({translate:e.style.translate,rotate:e.style.rotate,scale:e.style.scale}));
 report[name]={version:b.version(),hover,rest,pause,pass:parseFloat(hover.translate)!==0&&parseFloat(rest.translate)===0&&rest.scale==='1'&&parseFloat(pause.translate)===0&&pause.scale==='1'};
 console.log(name,report[name]);await b.close();
}
writeFileSync(resolve('web/product/giao-dien-web/astra-interior/reviews/2.0.1/hover-checks.json'),JSON.stringify(report,null,2));
if(Object.values(report).some(r=>!r.pass))process.exitCode=1;
