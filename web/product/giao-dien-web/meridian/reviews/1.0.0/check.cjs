const {chromium,firefox}=require(process.cwd()+'/_design/.tooling/node_modules/playwright');const fs=require('fs'),out='web/product/giao-dien-web/meridian/reviews/1.0.0';
(async()=>{const results=[];
for(const [name,engine] of [['chromium',chromium],['firefox',firefox]]){
const b=await engine.launch();const p=await b.newPage();const errors=[];p.on('pageerror',e=>errors.push(String(e)));await p.goto('http://127.0.0.1:4392/',{waitUntil:'domcontentloaded'});await p.evaluate(()=>document.fonts.ready);try{await p.waitForFunction(()=>document.querySelector('video').readyState>=2,{timeout:5000});}catch{}
const views=[];for(const [w,h] of [[1280,720],[1920,1080],[2560,1080],[768,1024],[390,844],[375,812],[360,640]]){
await p.setViewportSize({width:w,height:h});await p.locator('video').evaluate(async v=>{if(v.readyState<2)return;const seek=new Promise(resolve=>{v.addEventListener('seeked',resolve,{once:true});setTimeout(resolve,2000);});v.currentTime=4;await seek;});
await p.screenshot({path:out+'/'+name+'-'+w+'.png'});
views.push(await p.evaluate(()=>({size:[innerWidth,innerHeight],scroll:[document.documentElement.scrollWidth,document.documentElement.scrollHeight],year:document.querySelector('#year').textContent,copyBottom:document.querySelector('.footer__copy').getBoundingClientRect().bottom,video:document.querySelector('video').getBoundingClientRect().toJSON(),columns:getComputedStyle(document.querySelector('ul')).gridTemplateColumns,blend:getComputedStyle(document.querySelector('video')).mixBlendMode})));
}
const samples=[];for(let i=0;i<2;i++){samples.push(await p.locator('video').evaluate(v=>({time:v.currentTime,paused:v.paused,ready:v.readyState})));await p.waitForTimeout(700);}
await p.emulateMedia({reducedMotion:'reduce'});await p.reload({waitUntil:'domcontentloaded'});const reduced=await p.locator('video').evaluate(v=>({paused:v.paused,autoplay:v.hasAttribute('autoplay')}));
results.push({browser:name,version:b.version(),views,samples,reduced,errors});fs.writeFileSync(out+'/checks.json',JSON.stringify(results,null,2));await b.close();}
console.log(JSON.stringify(results.map(r=>({browser:r.browser,overflow:r.views.filter(v=>v.size[0]!==v.scroll[0]||v.size[1]!==v.scroll[1]),samples:r.samples,reduced:r.reduced,errors:r.errors}))));})();
