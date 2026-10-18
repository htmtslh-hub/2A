const fs=require('fs'),path=require('path'),http=require('http');
const {chromium}=require(process.cwd()+'/_design/.tooling/node_modules/playwright');
const sharp=require(process.cwd()+'/_design/.tooling/node_modules/sharp');
const base=path.resolve('web/public'),evidence=path.resolve('web/product/giao-dien-web/reviews/2026-10-18-six-templates');
const products=[['spaceedu','#102132'],['mostar-city','#9ab0ad'],['fennec','#b96c36'],['riverine-ai','#173a35'],['freight-axis','#292c2d'],['meridian','#dbe1d4']];
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.mp4':'video/mp4'};
(async()=>{
 const server=http.createServer((req,res)=>{let f=path.join(base,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(base+path.sep)){res.writeHead(403).end();return;}if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');try{const bytes=fs.readFileSync(f);res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream'});res.end(bytes);}catch{res.writeHead(404).end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 const b=await chromium.launch();const checks=[];
 try{for(const [slug,color] of products){
  const hero=path.resolve('web/product/giao-dien-web/reviews/video-previews/screenshots/'+slug+'-hero.jpg');
  const screenshot=await sharp(hero).resize(586,366,{fit:'cover'}).toBuffer();
  const shadow=Buffer.from('<svg width="698" height="524"><rect x="48" y="86" width="602" height="382" rx="12" fill="#000" opacity=".18"/></svg>');
  await sharp({create:{width:698,height:524,channels:3,background:color}}).composite([{input:shadow},{input:screenshot,left:56,top:72}]).webp({quality:88}).toFile(path.resolve('web/public/previews/'+slug+'.webp'));
  const p=await b.newPage();const errors=[];p.on('pageerror',e=>errors.push(String(e)));
  await p.goto(origin+'/demos/'+slug+'/index.html',{waitUntil:'domcontentloaded'});
  await p.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,5000))]));
  if(slug==='fennec')await p.waitForFunction(()=>document.querySelector('#fox')?.dataset.model==='ready',null,{timeout:60000});
  if(['fennec','meridian'].includes(slug))await p.waitForFunction(()=>document.querySelector('video').readyState>=2,null,{timeout:20000});
  await p.waitForTimeout(2400);
  for(const [device,w,h] of [['tablet',820,1180],['mobile',375,812]]){
   await p.setViewportSize({width:w,height:h});await p.waitForTimeout(350);
   await p.screenshot({path:path.join(evidence,slug+'-'+device+'.png')});
   await sharp(path.join(evidence,slug+'-'+device+'.png')).resize({width:698}).webp({quality:85}).toFile(path.resolve('web/public/previews/'+slug+'-'+device+'.webp'));
  }
  const state=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,fonts:[...document.fonts].filter(f=>f.family.includes('Ogg')).map(f=>({family:f.family,status:f.status})),videos:[...document.querySelectorAll('video')].map(v=>({time:v.currentTime,ready:v.readyState,paused:v.paused})),copyBottom:document.querySelector('.footer__copy')?.getBoundingClientRect().bottom}));
  checks.push({slug,errors,state});await p.close();console.log('Poster/device stills:',slug);
 }}finally{await b.close();server.close();}
 fs.writeFileSync(path.join(evidence,'compatibility-checks.json'),JSON.stringify(checks,null,2));
})();
