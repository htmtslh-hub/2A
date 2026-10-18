const {chromium,firefox}=require(process.cwd()+'/_design/.tooling/node_modules/playwright');
const fs=require('fs'),out='web/product/giao-dien-web/riverine-ai/reviews/1.0.0';
(async()=>{
 const result=[];
 for(const [name,engine] of [['chromium',chromium],['firefox',firefox]]){
  const b=await engine.launch();const p=await b.newPage({viewport:{width:1280,height:960}});const errors=[],failed=[];
  p.on('pageerror',e=>errors.push(String(e)));p.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()});});
  await p.goto('http://127.0.0.1:4390/',{waitUntil:'domcontentloaded'});await p.waitForTimeout(6000);
  const video=[];for(let i=0;i<2;i++){video.push(await p.locator('video').evaluate(v=>({time:v.currentTime,ready:v.readyState,paused:v.paused})));await p.waitForTimeout(700);}
  const frames=[];
  for(const [w,h] of [[1280,960],[1440,900],[820,1180],[375,812],[320,740],[844,390],[600,400],[650,960]]){
   await p.setViewportSize({width:w,height:h});await p.waitForTimeout(150);
   const state=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,stage:document.querySelector('.stage').getBoundingClientRect().height,classes:document.documentElement.className,animations:document.getAnimations().length,inline:document.querySelectorAll('[style]').length,title:[...document.querySelectorAll('.title__line')].map(e=>({text:e.textContent,right:e.getBoundingClientRect().right,bottom:e.getBoundingClientRect().bottom})),actions:document.querySelector('.actions').getBoundingClientRect().toJSON()}));
   await p.screenshot({path:out+'/'+name+'-'+w+'.png'});
   let menu=null;const button=p.locator('.menu-button');
   if(await button.isVisible()){
    await button.click();menu={open:await button.getAttribute('aria-expanded'),focus:await p.evaluate(()=>document.activeElement.textContent)};
    await p.screenshot({path:out+'/'+name+'-'+w+'-menu.png'});await p.keyboard.press('Escape');menu.closed=await button.getAttribute('aria-expanded');menu.focusBack=await button.evaluate(e=>document.activeElement===e);
   }
   frames.push({viewport:[w,h],state,menu});
  }
  await p.locator('.sound').click();const sound=await p.locator('.sound').getAttribute('aria-pressed');
  await p.emulateMedia({reducedMotion:'reduce'});await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(200);
  const reduced=await p.evaluate(()=>({classes:document.documentElement.className,animations:document.getAnimations().length,title:getComputedStyle(document.querySelector('.title')).opacity}));
  result.push({browser:name,version:b.version(),video,frames,sound,reduced,errors,failed});fs.writeFileSync(out+'/checks.json',JSON.stringify(result,null,2));await b.close();
 }
 console.log(JSON.stringify(result.map(r=>({browser:r.browser,video:r.video,errors:r.errors,frames:r.frames.map(f=>({size:f.viewport,overflow:f.state.scroll>f.state.width,clip:f.state.title.some(t=>t.right>f.state.width),menu:f.menu})),sound:r.sound,reduced:r.reduced}))));
})();
