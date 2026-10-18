const fs=require('fs'),path=require('path'),http=require('http');
const {chromium}=require(process.cwd()+'/_design/.tooling/node_modules/playwright');
const sharp=require(process.cwd()+'/_design/.tooling/node_modules/sharp');
const base=path.resolve('web/public'),out=path.resolve('web/product/giao-dien-web/jack-3d/reviews/1.0.0');
(async()=>{
 const screenshot=await sharp('web/product/giao-dien-web/reviews/video-previews/screenshots/jack-3d-hero.jpg').resize(586,366).toBuffer();
 const shadow=Buffer.from('<svg width="698" height="524"><rect x="48" y="86" width="602" height="382" rx="12" fill="#000" opacity=".4"/></svg>');
 await sharp({create:{width:698,height:524,channels:3,background:'#30323f'}}).composite([{input:shadow},{input:screenshot,left:56,top:72}]).webp({quality:90}).toFile(base+'/previews/jack-3d.webp');
 const server=http.createServer((req,res)=>{let f=path.join(base,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(base+path.sep))return res.writeHead(403).end();if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');try{res.writeHead(200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css'})[path.extname(f)]||'application/octet-stream'});res.end(fs.readFileSync(f))}catch{res.writeHead(404).end()}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 try{const p=await b.newPage();await p.goto('http://127.0.0.1:'+server.address().port+'/demos/jack-3d/index.html');await p.waitForFunction(()=>document.querySelector('.hero-portrait img').naturalWidth>0);await p.waitForTimeout(1800);for(const [device,width,height] of [['tablet',820,1180],['mobile',375,812]]){await p.setViewportSize({width,height});await p.waitForTimeout(300);const buf=await p.screenshot({path:out+'/'+device+'.png'});await sharp(buf).resize({width:698}).webp({quality:85}).toFile(base+'/previews/jack-3d-'+device+'.webp')}}finally{await b.close();server.close()}
})();
