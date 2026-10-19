const {chromium}=require('C:/Users/Lenovo/AppData/Local/npm-cache/_npx/6bcb61ec6d5aea22/node_modules/playwright');
const fs=require('fs'),path=require('path');
(async()=>{
 const dir=path.resolve('web/product/giao-dien-web/vertex-shops/reviews/1.0.0');
 const b=await chromium.launch({headless:true});const p=await b.newPage();const errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.goto('file:///'+path.resolve('web/product/giao-dien-web/vertex-shops/source/index.html').replaceAll('\\','/'));
 await p.waitForTimeout(4500);
 const results=[];
 for(const [w,h] of [[1440,900],[820,1180],[375,812],[320,740],[1080,800],[1081,800],[2560,1440]]){
 await p.setViewportSize({width:w,height:h});await p.waitForTimeout(200);
 results.push(await p.evaluate(()=>({w:innerWidth,h:innerHeight,scroll:document.documentElement.scrollWidth,cards:document.querySelectorAll('.card').length,visible:[...document.querySelectorAll('.card')].filter(x=>getComputedStyle(x).visibility==='visible').length,images:[...document.images].filter(x=>!x.naturalWidth).length,k:getComputedStyle(document.querySelector('.canvas')).getPropertyValue('--k'),badge:document.querySelector('.badge').getBoundingClientRect().toJSON(),h1:document.querySelector('#h1a').getBoundingClientRect().toJSON(),cssRules:[...document.styleSheets].find(s=>s.ownerNode.tagName==='STYLE').cssRules.length})));
 await p.screenshot({path:path.join(dir,`${w}.png`)});
 if(w<=1080){await p.locator('.burger').click();results.at(-1).menuOpen=await p.locator('.burger').getAttribute('aria-expanded');await p.keyboard.press('Escape');results.at(-1).menuClosed=await p.locator('.burger').getAttribute('aria-expanded');}
 }
 fs.writeFileSync(path.join(dir,'checks.json'),JSON.stringify({browser:b.version(),errors,results},null,2));console.log(JSON.stringify({browser:b.version(),errors,results}));await b.close();
})();

