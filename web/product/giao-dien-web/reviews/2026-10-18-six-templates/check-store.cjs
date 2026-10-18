const {chromium,firefox}=require(process.cwd()+'/_design/.tooling/node_modules/playwright');const fs=require('fs');
const out='web/product/giao-dien-web/reviews/2026-10-18-six-templates',origin=process.env.RELEASE_URL||'http://127.0.0.1:4395';
const products=JSON.parse(fs.readFileSync(out+'/catalog.json','utf8'));
(async()=>{
 const results=[];
 for(const [name,engine,options] of [['Chromium',chromium,{}],['Firefox',firefox,{}],['Edge',chromium,{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}],['CocCoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]]){
  if(process.env.RELEASE_BROWSER && process.env.RELEASE_BROWSER!==name)continue;
  const b=await engine.launch({headless:true,...options});const context=await b.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  await context.route('**/api/traffic**',route=>route.abort());const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(String(e)));
  const checks=[];
  for(const product of products){
   const response=await p.goto(origin+'/?mau='+product.id,{waitUntil:'domcontentloaded'});
   await p.waitForFunction(name=>document.body.innerText.includes(name),product.name,{timeout:15000});
   // Hydration/language detection may replace the initial server-rendered video.
   // Poll the live DOM rather than holding a detached element handle.
   await p.waitForFunction(slug=>[...document.querySelectorAll('[data-recorded-preview] video')].some(v=>v.currentSrc.includes('/'+slug+'.mp4')&&!v.paused&&v.currentTime>.1),product.slug,{timeout:20000});
   const clip=p.locator('[data-recorded-preview] video[src*="/'+product.slug+'.mp4"]').first();
   const info=await clip.evaluate(v=>({src:v.currentSrc,playing:!v.paused,time:v.currentTime}));
   if(!info.src.includes('/'+product.slug+'.mp4'))throw Error('Wrong clip for '+product.id);
   const responseZip=await p.request.get(origin+'/api/download?id='+product.id);
   if(responseZip.status()!==401)throw Error('Unauthenticated ZIP access changed: '+responseZip.status());
   checks.push({...product,status:response.status(),video:info,unauthenticatedDownload:responseZip.status()});
  }
  const sizes=[];
  for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){
   await p.setViewportSize({width,height});await p.waitForTimeout(150);
   const dims=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
   if(dims.scroll>dims.width)throw Error(name+' store overflow at '+width);sizes.push(dims);
  }
  await p.screenshot({path:out+'/'+(origin.includes('127.0.0.1')?'local':'online')+'-'+name+'-detail.png'});
  results.push({name,version:b.version(),checks,sizes,errors});
  fs.writeFileSync(out+'/'+(origin.includes('127.0.0.1')?'local-store':origin.includes('forgezone.store')?'production-store':'online-store')+'.json',JSON.stringify({origin,results},null,2));
  if(errors.length)throw Error(name+' pageerrors: '+errors.join(';'));
  await b.close();console.log(name+' six detail pages, autoplay, protected downloads and layout PASS');
 }
})();
