const {chromium,firefox}=require(process.cwd()+'/_design/.tooling/node_modules/playwright');const fs=require('fs');const out='web/product/giao-dien-web/freight-axis/reviews/1.0.0';
(async()=>{const results=[];
for(const [name,engine] of [['chromium',chromium],['firefox',firefox]]){
const b=await engine.launch();const p=await b.newPage();const errors=[];p.on('pageerror',e=>errors.push(String(e)));await p.goto('http://127.0.0.1:4391/',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2000);
const views=[];for(const [w,h] of [[1280,800],[1440,900],[820,1180],[768,1024],[375,812],[320,740],[844,390]]){
await p.setViewportSize({width:w,height:h});await p.waitForTimeout(200);await p.screenshot({path:out+'/'+name+'-'+w+'.png'});
views.push(await p.evaluate(()=>({viewport:[innerWidth,innerHeight],scroll:[document.documentElement.scrollWidth,document.documentElement.scrollHeight],stage:getComputedStyle(document.querySelector('.stage')).display,align:[...document.querySelectorAll('.feature')].map(e=>getComputedStyle(e).textAlign),animations:document.getAnimations().map(a=>({state:a.playState,iterations:a.effect.getTiming().iterations})),transforms:[...document.querySelectorAll('.eyebrow,.headline span,.mark,.feature')].map(e=>getComputedStyle(e).transform),fonts:[document.fonts.check('800 60px Display'),document.fonts.check('700 20px UI'),document.fonts.check('400 12px UI')],video:{time:document.querySelector('video').currentTime,ready:document.querySelector('video').readyState}})));
}
await p.emulateMedia({reducedMotion:'reduce'});const reduced=await p.evaluate(()=>document.getAnimations().length);
results.push({browser:name,version:b.version(),views,reduced,errors});fs.writeFileSync(out+'/checks.json',JSON.stringify(results,null,2));await b.close();}
console.log(JSON.stringify(results.map(r=>({browser:r.browser,views:r.views.map(v=>({size:v.viewport,scroll:v.scroll,align:v.align,video:v.video})),errors:r.errors,reduced:r.reduced}))));})();
