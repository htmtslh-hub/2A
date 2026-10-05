import {chromium} from '../../../../../../_design/.tooling/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const b=await chromium.launch({channel:'msedge',headless:true});const p=await b.newPage({viewport:{width:1440,height:900}});
await p.addInitScript(()=>{window.rafCalls=0;const original=requestAnimationFrame;window.requestAnimationFrame=fn=>original(t=>{window.rafCalls++;fn(t)})});
await p.goto('http://127.0.0.1:4330/demos/astra-interior/');await p.waitForTimeout(1500);
for(let i=0;i<12;i++){await p.mouse.move(850+i*28,300+i*8);await p.waitForTimeout(30)}
const active=await p.evaluate(()=>({calls:window.rafCalls,opacity:document.querySelector('.cosmic-aura').style.opacity}));
await p.waitForTimeout(2000);const before=await p.evaluate(()=>window.rafCalls);await p.waitForTimeout(250);const after=await p.evaluate(()=>window.rafCalls);
const report={browser:b.version(),active,idleCallbacks:after-before,pass:after===before};
writeFileSync(resolve('web/product/giao-dien-web/astra-interior/reviews/2.0.2/cosmic-idle.json'),JSON.stringify(report,null,2));console.log(report);await b.close();if(!report.pass)process.exitCode=1;
