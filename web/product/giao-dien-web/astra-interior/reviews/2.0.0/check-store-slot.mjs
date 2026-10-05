import { chromium } from '../../../../../../_design/.tooling/node_modules/playwright/index.mjs';
import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';
const b=await chromium.launch({headless:true});const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto('http://127.0.0.1:4331');await p.waitForTimeout(1500);
const report=await p.evaluate(()=>({name:document.body.textContent.includes('Mellow Coffee'),oldName:document.body.textContent.includes('Astra Interior'),preview:[...document.querySelectorAll('img,video,source')].map(e=>e.src).filter(v=>v.includes('astra-interior')),title:document.title}));
await p.screenshot({path:resolve('web/product/giao-dien-web/astra-interior/reviews/2.0.0/screenshots/store-home.png'),fullPage:true});
writeFileSync(resolve('web/product/giao-dien-web/astra-interior/reviews/2.0.0/store-check.json'),JSON.stringify(report,null,2));console.log(report);await b.close();
