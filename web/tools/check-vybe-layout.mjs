
import {resolve} from 'node:path';
import {writeFileSync} from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {firefox}=await import('../../_design/.tooling/node_modules/playwright/index.mjs');const b=await firefox.launch();const p=await b.newPage();const result=[];
for(const [width,height] of [[820,1180],[375,812],[320,740]]){await p.setViewportSize({width,height});await p.goto('http://127.0.0.1:4173/demos/vybe/');result.push(await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})));await p.screenshot({path:resolve(`web/product/giao-dien-web/vybe/reviews/1.0.0/screenshots/latest-firefox-${width}.png`),fullPage:true});}
writeFileSync('web/product/giao-dien-web/vybe/reviews/1.0.0/layout-followup.json',JSON.stringify(result,null,2));console.log(result);await b.close();
