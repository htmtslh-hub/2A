const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve('_design/.browsers');
const {chromium, firefox} = require(path.resolve('_design/.tooling/node_modules/playwright'));
const root = path.resolve('web/product/giao-dien-web/ais-folio');
const out = path.join(root,'reviews/1.0.0');
const url = pathToFileURL(path.join(root,'source/index.html')).href;
fs.mkdirSync(path.join(out,'candidate'),{recursive:true});
(async()=>{
 const results=[];
 for(const [name,engine,opts] of [['chromium',chromium,{}],['firefox',firefox,{}],['edge',chromium,{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}],['coccoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]]) {
  if(opts.executablePath && !fs.existsSync(opts.executablePath)){results.push({name,status:'NOT TESTED',reason:'Browser executable unavailable'});continue;}
  const browser=await engine.launch({headless:true,...opts});
  for(const [w,h] of [[1440,900],[820,1180],[720,1278],[375,812],[320,740]]) {
   const page=await browser.newPage({viewport:{width:w,height:h},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(url);await page.waitForTimeout(800);
   const max=await page.evaluate(()=>document.documentElement.scrollHeight);
   for(let y=0;y<max;y+=400){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(100);}
   await page.waitForTimeout(700);await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(200);
   const dimensions=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})),h1:document.querySelectorAll('h1').length}));
   await page.screenshot({path:path.join(out,`candidate/${name}-${w}.png`),fullPage:true});
   if(w<=650){await page.locator('.menu-toggle').click();await page.keyboard.press('Escape');}
   const escape=await page.locator('.menu-toggle').getAttribute('aria-expanded')==='false';
   await page.locator('.project summary').first().click();const details=await page.locator('.project').first().getAttribute('open')!==null;
   results.push({name,version:browser.version(),w,h,...dimensions,escape,details,errors});await page.close();
  }
  const page=await browser.newPage({viewport:{width:375,height:812},javaScriptEnabled:false});await page.goto(url);results.push({name,noJS:await page.locator('#navigation').isVisible(),content:await page.locator('#about').isVisible()});await page.close();
  await browser.close();
 }
 fs.writeFileSync(path.join(out,'source-checks.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
})();
