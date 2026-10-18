const {chromium,firefox}=require(process.cwd()+'/_design/.tooling/node_modules/playwright');
const fs=require('fs');const path=require('path');
(async()=>{
 const output='web/product/giao-dien-web/spaceedu/reviews/1.0.0';
 const results=[];
 for(const [name,engine] of [['chromium',chromium],['firefox',firefox]]){
 const browser=await engine.launch({headless:true}); const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 for(const [w,h] of [[1440,900],[820,1180],[375,812],[320,740],[1353,1163],[2560,1440],[844,390]]){
 await page.setViewportSize({width:w,height:h});await page.goto('http://127.0.0.1:4387/web/product/giao-dien-web/spaceedu/source/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(3000);
 const state=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,title:document.querySelector('h1').textContent,classes:document.documentElement.className,images:[...document.querySelectorAll('.planet img.is-shown')].map(i=>({planet:i.dataset.planet,loaded:i.complete&&i.naturalWidth>0})),planetStyle:getComputedStyle(document.querySelector('.planet')).position,bodyText:getComputedStyle(document.querySelector('.lede')).fontSize}));
 await page.screenshot({path:output+'/'+name+'-'+w+'.png'});
 const cycle=[];for(const planet of ['venus','mars','earth']){await page.locator('.planet[data-planet="'+planet+'"]').click();cycle.push(await page.locator('h1').innerText());}
 const burger=page.locator('.burger');let menu=null;
 if(await burger.isVisible()){await burger.click();menu=await burger.getAttribute('aria-expanded');await page.keyboard.press('Escape');menu+=' -> '+await burger.getAttribute('aria-expanded');}
 results.push({browser:name,version:browser.version(),viewport:[w,h],state,cycle,menu,errors:[...errors]});
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(500);results.push({browser:name,reduced:await page.evaluate(()=>({classes:document.documentElement.className,video:getComputedStyle(document.querySelector('video')).display}))});
 await browser.close();
 }
 fs.writeFileSync(output+'/checks.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));
})();
