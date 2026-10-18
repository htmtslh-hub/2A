const {chromium}=require(process.cwd()+'/_design/.tooling/node_modules/playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('http://127.0.0.1:4390/',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>document.querySelector('video').readyState>=2,{timeout:45000});
const samples=[];for(let i=0;i<2;i++){samples.push(await p.locator('video').evaluate(v=>({time:v.currentTime,ready:v.readyState,paused:v.paused})));await p.waitForTimeout(800);}
await p.waitForTimeout(2300);const clean=await p.evaluate(()=>({classes:document.documentElement.className,inline:document.querySelectorAll('[style]').length,animations:document.getAnimations().length}));
const result={browser:b.version(),samples,clean};fs.writeFileSync('web/product/giao-dien-web/riverine-ai/reviews/1.0.0/video-check.json',JSON.stringify(result,null,2));console.log(result);await b.close();})();
