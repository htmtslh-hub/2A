const fs = require('node:fs');
const path = require('node:path');
const {createServer} = require('node:http');
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve('_design/.browsers');
const {chromium, firefox} = require('../../../../../../_design/.tooling/node_modules/playwright');
const source = path.resolve(__dirname,'../../source');
const out = path.join(__dirname,'candidate');
fs.mkdirSync(out,{recursive:true});
const server=createServer((req,res)=>{const name=decodeURIComponent(new URL(req.url,'http://local').pathname);const file=path.join(source,name==='/'?'index.html':name);try{res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.statusCode=404;res.end()}});
const assert=(ok,message)=>{if(!ok)throw Error(message)};
async function main(){
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const url=`http://127.0.0.1:${server.address().port}`;
 const report={browsers:{}};
 for(const [name,engine,opts] of [['chromium',chromium,{}],['firefox',firefox,{}],['edge',chromium,{channel:'msedge'}],['coccoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]]){
  const browser=await engine.launch({headless:true,...opts});
  const result={version:browser.version(),viewports:[],errors:[],motion:[]};
  for(const [width,height] of [[1448,984],[1440,900],[820,1180],[375,812],[320,740]]){
   const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
   page.on('pageerror',e=>result.errors.push(e.message));
   await page.goto(url);await page.waitForTimeout(900);
   await page.screenshot({path:path.join(out,`${name}-${width}-hero.png`)});
   const dims=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth}));
   assert(dims.scrollWidth<=dims.clientWidth,`${name} overflow ${width}`);
   result.viewports.push({width,height,...dims});
   if(width<760){await page.locator('.nav-toggle').click();assert(await page.locator('.nav-toggle').getAttribute('aria-expanded')==='true','menu open');await page.keyboard.press('Escape');assert(await page.locator('.nav-toggle').getAttribute('aria-expanded')==='false','menu escape');}
   const before=await page.locator('.hero__cup').evaluate(e=>({transform:getComputedStyle(e).transform,opacity:getComputedStyle(e).opacity}));
   await page.locator('#hero-next').click();await page.waitForTimeout(170);
   const mid=await page.locator('.hero__cup').evaluate(e=>({transform:getComputedStyle(e).transform,opacity:getComputedStyle(e).opacity}));
   assert(mid.transform!==before.transform && Number(mid.opacity)<1,'motion missing');
   await page.screenshot({path:path.join(out,`${name}-${width}-motion.png`)});
   await page.waitForTimeout(900);assert(await page.locator('[data-product="1"]').getAttribute('aria-pressed')==='true','next failed');
   await page.locator('[data-product="2"]').click();await page.waitForTimeout(900);await page.locator('#hero-next').click();await page.waitForTimeout(900);assert(await page.locator('[data-product="0"]').getAttribute('aria-pressed')==='true','forward wrap');
   await page.locator('[data-direction="-1"]').click();await page.waitForTimeout(900);assert(await page.locator('[data-product="2"]').getAttribute('aria-pressed')==='true','backward wrap');
   await page.locator('#hero-next').click();await page.waitForTimeout(100);await page.locator('[data-product="1"]').click();await page.waitForTimeout(900);assert(await page.locator('[data-product="1"]').getAttribute('aria-pressed')==='true','rapid switch');
   await page.locator('[data-details="0"]').click();assert(await page.locator('dialog').isVisible(),'dialog');await page.keyboard.press('Escape');assert(!(await page.locator('dialog').isVisible()),'dialog escape');
   const positions=[];
   for(const fraction of [0,.5,1,.2]){
    await page.evaluate(f=>{const e=document.querySelector('.craft');scrollTo(0,e.offsetTop+(e.offsetHeight-innerHeight)*f)},fraction);await page.waitForTimeout(200);
    positions.push({fraction,transform:await page.locator('.craft__cup').evaluate(e=>getComputedStyle(e).transform)});
   }
   assert(positions[0].transform!==positions[1].transform,'scroll missing');
   await page.screenshot({path:path.join(out,`${name}-${width}-scroll.png`)});
   result.motion.push({width,before,mid,positions});
   const fullHeight=await page.evaluate(()=>document.documentElement.scrollHeight);
   for(let y=0;y<fullHeight;y+=300){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(60)}
   await page.waitForTimeout(800);
   await page.screenshot({path:path.join(out,`${name}-${width}-full.png`),fullPage:true});
   await page.locator('.motion-toggle').click();assert(await page.locator('.motion-toggle').textContent()==='Resume motion','pause');
   await page.reload();assert(await page.locator('.motion-toggle').textContent()==='Pause motion','reload motion default');
   await page.close();
  }
  const nojs=await browser.newPage({viewport:{width:320,height:740},javaScriptEnabled:false});await nojs.goto(url);assert(await nojs.locator('.collection h3').count()===3,'nojs content');assert(await nojs.locator('.collection').isVisible(),'nojs visibility');await nojs.close();
  const file=await browser.newPage();await file.goto(require('node:url').pathToFileURL(path.join(source,'index.html')).href);assert(await file.locator('#hero-image').evaluate(e=>e.complete&&e.naturalWidth>0),'file image');await file.close();
  report.browsers[name]=result;await browser.close();
 }
 fs.writeFileSync(path.join(__dirname,'candidate-checks.json'),JSON.stringify(report,null,2));console.log('Candidate responsive, carousel, dialogs, scroll and fallback PASS');
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
