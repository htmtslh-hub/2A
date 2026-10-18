const {chromium,firefox}=require(process.cwd()+'/_design/.tooling/node_modules/playwright');
const fs=require('fs');const out='web/product/giao-dien-web/fennec/reviews/1.0.0';
(async()=>{
 const results=[];
 for(const [name,engine] of [['chromium',chromium],['firefox',firefox]]){
  const b=await engine.launch();const p=await b.newPage({viewport:{width:1440,height:900}});
  const errors=[],failed=[];p.on('pageerror',e=>errors.push(String(e)));p.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
  await p.goto('http://127.0.0.1:4389/',{waitUntil:'domcontentloaded'});
  try{await p.waitForFunction(()=>document.querySelector('#fox').dataset.model,{timeout:60000});}catch{}
  await p.waitForTimeout(1800);
  const model=await p.locator('#fox').getAttribute('data-model');
  const video=[];for(let i=0;i<2;i++){video.push(await p.locator('video').evaluate(v=>({time:v.currentTime,ready:v.readyState,paused:v.paused})));await p.waitForTimeout(700);}
  const viewports=[];
  for(const [w,h] of [[1440,900],[820,1180],[375,812],[320,740]]){
   await p.setViewportSize({width:w,height:h});await p.waitForTimeout(900);
   await p.screenshot({path:out+'/'+name+'-'+w+'.png'});
   const state=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,links:document.querySelector('.nav__links').getBoundingClientRect().toJSON(),brand:document.querySelector('.brand').getBoundingClientRect().toJSON(),canvas:getComputedStyle(document.querySelector('#fox')).opacity}));
   await p.locator('.brand__menu').click();await p.waitForTimeout(1100);
   await p.screenshot({path:out+'/'+name+'-'+w+'-menu.png'});
   const opened=await p.locator('.brand__menu').getAttribute('aria-expanded');await p.keyboard.press('Escape');
   const closed=await p.locator('.brand__menu').getAttribute('aria-expanded');
   viewports.push({viewport:[w,h],state,opened,closed});
  }
  await p.locator('.toggle').click();const theme=await p.locator('.toggle').getAttribute('aria-pressed');
  await p.locator('.brand__menu').click();await p.waitForTimeout(1100);await p.locator('.menu__link').first().click();
  const info=await p.locator('dialog').evaluate(d=>d.open);await p.keyboard.press('Escape');
  await p.emulateMedia({reducedMotion:'reduce'});const reduced=await p.locator('.headline span').first().evaluate(e=>getComputedStyle(e).animationName);
  results.push({browser:name,version:b.version(),model,video,viewports,theme,info,reduced,errors,failed});
  fs.writeFileSync(out+'/checks.json',JSON.stringify(results,null,2));await b.close();
 }
 console.log(JSON.stringify(results));
})();
