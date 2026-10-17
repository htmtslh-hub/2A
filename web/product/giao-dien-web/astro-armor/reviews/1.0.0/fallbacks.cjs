const fs=require('fs'),path=require('path'),http=require('http');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('_design/.browsers');
const {chromium}=require(path.resolve('_design/.tooling/node_modules/playwright'));
const base=path.resolve('web/product/giao-dien-web/astro-armor/source');
(async()=>{
  const server=http.createServer((req,res)=>{
    const name=decodeURIComponent(req.url.split('?')[0]);
    const file=path.join(base,name==='/'?'index.html':name);
    try{res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript','.jpg':'image/jpeg','.webp':'image/webp'})[path.extname(file)]);res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}
  }).listen(0,'127.0.0.1');
  await new Promise(resolve=>server.on('listening',resolve));
  const url=`http://127.0.0.1:${server.address().port}`;
  const browser=await chromium.launch(),report={date:new Date().toISOString()};
  const missing=await browser.newContext({viewport:{width:320,height:740}});
  await missing.route(/\.(?:jpg|webp)$/,route=>route.abort());
  const page=await missing.newPage();await page.goto(url);await page.waitForTimeout(800);
  report.missingImages={titleVisible:await page.locator('h1').isVisible(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)};
  await page.locator('#add-bag').click();report.missingImages.bagWorks=await page.locator('#bag-dialog').isVisible();
  await page.screenshot({path:path.join(__dirname,'fallback-missing-images.png')});await missing.close();
  const old=await browser.newContext({viewport:{width:320,height:740}});await old.addInitScript(()=>{delete window.IntersectionObserver;});
  const p=await old.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(url);await p.waitForTimeout(800);
  report.noObserver={errors,contentVisible:await p.locator('[data-reveal]').evaluateAll(els=>els.every(e=>getComputedStyle(e).opacity==='1'))};
  await old.close();await browser.close();server.close();
  fs.writeFileSync(path.join(__dirname,'fallbacks.json'),JSON.stringify(report,null,2));
  if(!report.missingImages.titleVisible||report.missingImages.overflow||!report.missingImages.bagWorks||errors.length||!report.noObserver.contentVisible)throw Error('Fallback failed');
  console.log('PASS missing-image reading/bag and no-IntersectionObserver fallback');
})().catch(e=>{console.error(e);process.exit(1);});
