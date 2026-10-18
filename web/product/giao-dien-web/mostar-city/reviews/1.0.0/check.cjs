const {chromium,firefox}=require(process.cwd()+'/_design/.tooling/node_modules/playwright');
const fs=require('fs');
const output='web/product/giao-dien-web/mostar-city/reviews/1.0.0';
(async()=>{
 const results=[];
 for(const [name,engine] of [['chromium',chromium],['firefox',firefox]]){
  const b=await engine.launch();const p=await b.newPage();const errors=[],failed=[];
  p.on('pageerror',e=>errors.push(String(e)));p.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
  await p.setViewportSize({width:1440,height:900});
  await p.goto('http://127.0.0.1:4388/',{waitUntil:'domcontentloaded'});
  await p.waitForFunction(()=>document.querySelectorAll('.sight-card').length===15);
  await p.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
  const assets=await p.evaluate(()=>[...document.querySelectorAll('.scene-img')].map(i=>({role:i.className,loaded:i.complete&&i.naturalWidth>0,width:i.naturalWidth})));
  for(const [w,h] of [[1440,900],[820,1180],[375,812],[320,740]]){
   await p.setViewportSize({width:w,height:h});
   const frames=[];
   for(const y of [0,1060,2320,3700]){
    await p.evaluate(y=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,y);},y);
    await p.waitForTimeout(1200);
    frames.push(await p.evaluate(()=>({scrollY,scrollWidth:document.documentElement.scrollWidth,width:innerWidth,titleOpacity:getComputedStyle(document.querySelector('.hero-title')).opacity,panel2:getComputedStyle(document.querySelector('.story-panel-bridge')).opacity,panel3:getComputedStyle(document.querySelector('.story-panel-bazaar')).opacity,slider:getComputedStyle(document.querySelector('.sights-slider')).visibility,controls:document.querySelector('.sights-controls').classList.contains('is-ready'),split:getComputedStyle(document.querySelector('.splitframe-left')).transform})));
    await p.screenshot({path:output+'/'+name+'-'+w+'-'+y+'.png'});
   }
   results.push({browser:name,version:b.version(),viewport:[w,h],frames});
  }
  const loops=[];
  for(const dir of ['next','prev']){
   for(let i=0;i<6;i++){await p.locator('.sight-'+dir).click();await p.waitForTimeout(730);}
   loops.push({dir,active:await p.locator('.sight-card.is-active').getAttribute('data-sight-index')});
  }
  await p.evaluate(()=>{for(let i=0;i<35;i++)document.querySelector('.sight-next').click();});await p.waitForTimeout(750);
  const rapid=await p.locator('.sight-card.is-active').getAttribute('data-sight-index');
  await p.evaluate(()=>window.scrollTo(0,2320));await p.waitForTimeout(1200);
  await p.locator('.note-button').click();const notes=await p.locator('dialog').evaluate(d=>d.open);await p.keyboard.press('Escape');
  await p.emulateMedia({reducedMotion:'reduce'});await p.evaluate(()=>window.scrollTo(0,1060));await p.waitForTimeout(100);
  const reduced=await p.evaluate(()=>({panel:getComputedStyle(document.querySelector('.story-panel-bridge')).opacity,split:getComputedStyle(document.querySelector('.splitframe-left')).transform,mx:getComputedStyle(document.documentElement).getPropertyValue('--mx')}));
  results.push({browser:name,assets,loops,rapid,notes,reduced,errors,failed});
  fs.writeFileSync(output+'/checks.json',JSON.stringify(results,null,2));await b.close();
 }
 console.log(JSON.stringify(results.map(r=>r.viewport?{browser:r.browser,viewport:r.viewport,overflow:r.frames.some(f=>f.scrollWidth>f.width),frames:r.frames.map(f=>[f.scrollY,f.panel2,f.panel3,f.slider])}:r)));
})();
