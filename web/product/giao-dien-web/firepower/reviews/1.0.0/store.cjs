const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('_design/.browsers');
const {chromium,firefox}=require('../../../../../../_design/.tooling/node_modules/playwright');
const origin=process.env.FIREPOWER_STORE_URL||'http://127.0.0.1:4410';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const report={origin,date:new Date().toISOString(),assets:[],locales:[],browsers:[]};
(async()=>{
  for(const file of ['demos/firepower/index.html','demos/firepower/assets/css/style.css','demos/firepower/assets/js/main.js','demos/firepower/assets/img/mouse-views.webp','previews/firepower.mp4','previews/firepower.webp']){
    const response=await fetch(`${origin}/${file}`);assert.equal(response.status,200,file);
    const bytes=Buffer.from(await response.arrayBuffer());assert.equal(hash(bytes),hash(fs.readFileSync('web/public/'+file)),file);
    report.assets.push({file,bytes:bytes.length,sha256:hash(bytes)});
  }
  report.anonymous=(await fetch(origin+'/api/download?id=t39')).status;assert.equal(report.anonymous,401);
  report.directZip=(await fetch(origin+'/product/giao-dien-web/firepower/firepower.zip')).status;assert.equal(report.directZip,404);
  for(const [id,slug]of [['t22','kinetiq'],['t1','japan-trails']]){
    const response=await fetch(origin+'/api/download?id='+id);assert.equal(response.status,200);
    assert.equal(hash(Buffer.from(await response.arrayBuffer())),hash(fs.readFileSync(`web/product/giao-dien-web/${slug}/${slug}.zip`)));
  }
  report.existingFree='t22/t1 anonymous 200, exact ZIP bytes';
  const browser=await chromium.launch();
  try{
    for(const locale of ['vi-VN','en-US','zh-CN'])for(const width of [1440,375]){
      const context=await browser.newContext({locale,viewport:{width,height:900}}),page=await context.newPage();
      await page.goto(origin+'/?mau=t39');
      await page.getByRole('heading',{name:/^Firepower/}).waitFor();
      await page.locator('button.hv10').waitFor();
      const text=await page.locator('body').innerText();assert(text.includes('Premium'));
      assert(/7\s*(file|个)/.test(text),text.slice(-2000));
      assert.equal(await page.locator('.cart-detail-button').count(),0);
      const [popup]=await Promise.all([page.waitForEvent('popup'),page.locator('button.hv10').click()]);
      await popup.waitForLoadState();assert(popup.url().includes('/demos/firepower/'));await popup.close();
      assert(await page.locator('a[href*="template=firepower"]').count()>0);
      await page.screenshot({path:path.join(__dirname,'evidence',`store-${locale}-${width}.png`)});
      await page.goto(origin+'/huong-dan?template=firepower&view=template');
      assert((await page.locator('body').innerText()).includes('Firepower'));
      await page.goto(origin+'/?tab=library');await page.waitForTimeout(1000);
      const card=page.locator('a.product-card[href="?mau=t39"]');await card.waitFor();await card.scrollIntoViewIfNeeded();
      assert((await card.innerText()).includes('Premium'));assert.equal(await card.locator('button').count(),0);
      await card.click();await page.getByRole('heading',{name:/^Firepower/}).waitFor();
      report.locales.push({locale,width,detail:true,guide:true,library:true});await context.close();
    }
  }finally{await browser.close();}
  for(const [name,engine,options]of [['chromium',chromium,{}],['firefox',firefox,{}],['edge',chromium,{channel:'msedge'}],['coccoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]]){
    const browser=await engine.launch({headless:true,...options});
    try{
      const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
      await page.goto(origin+'/?tab=library');await page.waitForTimeout(1000);
      const card=page.locator('a.product-card[href="?mau=t39"]');await card.scrollIntoViewIfNeeded();await page.waitForTimeout(1300);
      const status=await card.locator('video').evaluate(e=>({paused:e.paused,time:e.currentTime,muted:e.muted,src:e.currentSrc}));
      assert(!status.paused&&status.time>0&&status.muted);assert(status.src.includes('firepower.mp4'));
      await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await page.waitForTimeout(500);
      const offscreenPaused=await card.locator('video').evaluate(e=>e.paused);assert(offscreenPaused);
      report.browsers.push({name,version:browser.version(),status,offscreenPaused});
    }finally{await browser.close();}
  }
  fs.writeFileSync(path.join(__dirname,process.env.FIREPOWER_STORE_URL?'online-store.json':'local-store.json'),JSON.stringify(report,null,2));
  console.log('PASS exact public assets, 6 locale/viewports, 4 browser video autoplay/pause, download guards and existing free samples.');
})().catch(e=>{console.error(e);process.exitCode=1;});
