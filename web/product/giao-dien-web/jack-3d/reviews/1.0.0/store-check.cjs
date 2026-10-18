process.env.PLAYWRIGHT_BROWSERS_PATH=process.cwd()+'/_design/.browsers';
const {chromium,firefox}=require(process.cwd()+'/_design/.tooling/node_modules/playwright');
const fs=require('fs');
const origin=process.env.RELEASE_URL||'http://127.0.0.1:4395',out='web/product/giao-dien-web/jack-3d/reviews/1.0.0';
(async()=>{
 const result=[];
 for(const [name,engine,options] of [['Chromium',chromium,{}],['Firefox',firefox,{}],['Edge',chromium,{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}],['CocCoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]]){
  const b=await engine.launch({headless:true,...options}),p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));await p.route('**/api/traffic**',r=>r.abort());
  let r=await p.goto(origin+'/?mau=t60',{waitUntil:'domcontentloaded'});
  await p.waitForFunction(()=>document.body.innerText.includes('Jack'));
  await p.waitForFunction(()=>[...document.querySelectorAll('[data-recorded-preview] video')].some(v=>v.currentSrc.includes('/jack-3d.mp4')&&!v.paused&&v.currentTime>.1),null,{timeout:30000});
  const video=await p.locator('[data-recorded-preview] video[src*="/jack-3d.mp4"]').first().evaluate(v=>({src:v.currentSrc,time:v.currentTime,paused:v.paused}));
  const zip=await p.request.get(origin+'/api/download?id=t60');if(zip.status()!==401)throw Error('Guest download not protected');
  const widths=[];for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){await p.setViewportSize({width,height});await p.waitForTimeout(100);const scroll=await p.evaluate(()=>document.documentElement.scrollWidth);if(scroll>width)throw Error('overflow');widths.push({width,scroll});}
  await p.screenshot({path:out+'/'+(origin.includes('127.0.0.1')?'local':'online')+'-'+name+'.png'});
  await p.goto(origin+'/demos/jack-3d/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>document.querySelector('.hero-portrait img')?.naturalWidth>0);
  await p.getByRole('button',{name:'Contact Me'}).first().click();await p.waitForFunction(()=>document.querySelector('dialog')?.open);await p.keyboard.press('Escape');await p.waitForFunction(()=>!document.querySelector('dialog')?.open);await p.waitForTimeout(100);
  await p.locator('.live-button').first().evaluate(e=>e.click());await p.waitForFunction(()=>document.querySelector('dialog h2')?.textContent==='Nextlevel Studio');
  result.push({name,version:b.version(),status:r.status(),video,guestZip:zip.status(),widths,dialogs:true,errors});await b.close();console.log(name,'PASS');
 }
 fs.writeFileSync(out+'/'+(origin.includes('127.0.0.1')?'local-store':origin.includes('forgezone.store')?'production-store':'online-store')+'.json',JSON.stringify({origin,result},null,2));if(result.some(r=>r.errors.length))throw Error('page errors');
})().catch(e=>{console.error(e);process.exit(1)});
