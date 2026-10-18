const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('_design/.browsers');
const {chromium,firefox}=require('../../../../../../_design/.tooling/node_modules/playwright');
const origin='https://forgezone.store',source=path.resolve(__dirname,'../../source');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const report={origin,date:new Date().toISOString(),resources:[],browsers:[]};
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
async function run(){
  const files=walk(source).filter(f=>!['README.md','CUSTOMISE.md','LICENCE.txt'].includes(path.basename(f))).map(f=>({file:f,url:'/demos/chronoform/'+path.relative(source,f).replaceAll('\\','/')}));
  for(const name of ['chronoform.webp','chronoform.mp4'])files.push({file:path.resolve('web/public/previews',name),url:'/previews/'+name});
  report.resources=await Promise.all(files.map(async({file,url})=>{const response=await fetch(origin+url+'?qa=hero101');assert(response.ok,url);const actual=hash(Buffer.from(await response.arrayBuffer()));assert.equal(actual,hash(fs.readFileSync(file)),url);return{url,status:response.status,sha256:actual};}));
  for(const[name,engine,options]of [['chromium',chromium,{args:['--enable-unsafe-swiftshader']}],['firefox',firefox,{}],['edge',chromium,{channel:'msedge',args:['--enable-unsafe-swiftshader']}],['coccoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe',args:['--enable-unsafe-swiftshader']}]] ){
    const browser=await engine.launch({headless:true,...options});try{
      const page=await browser.newPage({viewport:{width:1440,height:900}}),row={name,version:browser.version(),models:[],errors:[]};page.on('pageerror',e=>row.errors.push(e.message));
      await page.goto(origin+'/demos/chronoform/index.html');
      for(let i=0;i<4;i++){await page.locator(`[data-feature="${i}"]`).click();await page.waitForTimeout(1200);const art=await page.locator('#watch-stage .hero-watch-photo').evaluate(e=>({src:e.getAttribute('src'),loaded:e.complete&&e.naturalWidth>0,visible:getComputedStyle(e).display==='block'}));assert(art.loaded&&art.visible);row.models.push(art);}
      assert.deepEqual(row.errors,[]);report.browsers.push(row);console.log('PASS online',name);
      if(name==='chromium'){
        await page.goto(origin+'/?mau=t31');await page.waitForTimeout(900);assert((await page.locator('body').innerText()).includes('Chronoform'));
        const video=page.locator('[data-recorded-preview] video').first();await video.scrollIntoViewIfNeeded();await page.waitForTimeout(1200);report.store=await video.evaluate(e=>({src:e.currentSrc,playing:!e.paused&&e.currentTime>0,muted:e.muted,loop:e.loop}));assert(report.store.src.includes('984baf4e10c6'));assert(report.store.playing&&report.store.muted&&report.store.loop);
        report.anonymousDownload=(await page.request.get(origin+'/api/download?id=t31')).status();assert.equal(report.anonymousDownload,401);
        report.directZip=(await page.request.get(origin+'/product/giao-dien-web/chronoform/chronoform.zip')).status();assert.equal(report.directZip,404);
      }
    }finally{await browser.close();}
  }
  fs.writeFileSync(path.join(__dirname,'online-checks.json'),JSON.stringify(report,null,2));
}
run().catch(e=>{console.error(e);process.exitCode=1;});
