const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('_design/.browsers');
const {chromium,firefox}=require(require('node:path').resolve('_design/.tooling/node_modules/playwright'));
const origin=process.env.ASTRO_STORE_URL||'http://127.0.0.1:4477';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const report={origin,date:new Date().toISOString(),assets:[],locales:[],browsers:[]};
(async()=>{
  fs.mkdirSync(path.join(__dirname,'store-evidence'),{recursive:true});
  for(const file of ['demos/astro-armor/index.html','demos/astro-armor/assets/css/style.css','demos/astro-armor/assets/js/main.js','demos/astro-armor/assets/img/armor-reference.jpg','demos/astro-armor/assets/img/armor-beige.webp','demos/astro-armor/assets/img/armor-red.webp','previews/astro-armor.mp4','previews/astro-armor.webp']){
    const response=await fetch(`${origin}/${file}`);assert.equal(response.status,200,file);
    const bytes=Buffer.from(await response.arrayBuffer());assert.equal(hash(bytes),hash(fs.readFileSync('web/public/'+file)),file);
    report.assets.push({file,bytes:bytes.length,sha256:hash(bytes)});
  }
  report.anonymous=(await fetch(origin+'/api/download?id=t47')).status;assert.equal(report.anonymous,401);
  report.directZip=(await fetch(origin+'/product/giao-dien-web/astro-armor/astro-armor.zip')).status;assert.equal(report.directZip,404);
  for(const [id,slug]of [['t22','kinetiq'],['t1','japan-trails']]){
    const response=await fetch(origin+'/api/download?id='+id);assert.equal(response.status,200);
    assert.equal(hash(Buffer.from(await response.arrayBuffer())),hash(fs.readFileSync(`web/product/giao-dien-web/${slug}/${slug}.zip`)));
  }
  report.existingFree='t22/t1 anonymous 200, exact ZIP bytes';
  const browser=await chromium.launch();
  try{
    for(const locale of ['vi-VN','en-US','zh-CN'])for(const width of [1440,375]){
      const context=await browser.newContext({locale,viewport:{width,height:900}}),page=await context.newPage();
      await page.goto(origin+'/?mau=t47');
      await page.getByRole('heading',{name:/^ASTRO Armor/}).waitFor();
      await page.locator('button.hv10').waitFor();
      const text=await page.locator('body').innerText();assert(text.includes('Premium'));
      assert(/9\s*(file|个)/.test(text),text.slice(-2000));
      assert.equal(await page.locator('.cart-detail-button').count(),0);
      const [popup]=await Promise.all([page.waitForEvent('popup'),page.locator('button.hv10').click()]);
      await popup.waitForLoadState();assert(popup.url().includes('/demos/astro-armor/'));await popup.close();
      assert(await page.locator('a[href*="template=astro-armor"]').count()>0);
      await page.screenshot({path:path.join(__dirname,'store-evidence',`store-${locale}-${width}.png`)});
      await page.goto(origin+'/huong-dan?template=astro-armor&view=template');
      assert((await page.locator('body').innerText()).includes('ASTRO Armor'));
      await page.goto(origin+'/?tab=library');await page.waitForTimeout(1000);
      const card=page.locator('a.product-card[href="?mau=t47"]');await card.waitFor();await card.scrollIntoViewIfNeeded();
      assert((await card.innerText()).includes('Premium'));assert.equal(await card.locator('button').count(),0);
      await card.click();await page.getByRole('heading',{name:/^ASTRO Armor/}).waitFor();
      report.locales.push({locale,width,detail:true,guide:true,library:true});await context.close();
    }
  }finally{await browser.close();}
  for(const [name,engine,options]of [['chromium',chromium,{}],['firefox',firefox,{}],['edge',chromium,{channel:'msedge'}],['coccoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]]){
    const browser=await engine.launch({headless:true,...options});
    try{
      const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
      await page.goto(origin+'/?tab=library');await page.waitForTimeout(1000);
      const card=page.locator('a.product-card[href="?mau=t47"]');await card.scrollIntoViewIfNeeded();
      try { await page.waitForFunction(video=>video.readyState>=2&&!video.paused&&video.currentTime>.1,await card.locator('video').elementHandle(),{timeout:20000}); }
      catch(error) { console.log(name,await card.locator('video').evaluate(e=>({paused:e.paused,time:e.currentTime,readyState:e.readyState,networkState:e.networkState,src:e.currentSrc,error:e.error?.message,rect:e.getBoundingClientRect().toJSON()})));throw error; }
      const status=await card.locator('video').evaluate(e=>({paused:e.paused,time:e.currentTime,muted:e.muted,src:e.currentSrc}));
      assert(!status.paused&&status.time>0&&status.muted);assert(status.src.includes('astro-armor.mp4'));
      await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await page.waitForTimeout(500);
      const offscreenPaused=await card.locator('video').evaluate(e=>e.paused);assert(offscreenPaused);
      report.browsers.push({name,version:browser.version(),status,offscreenPaused});console.log(name,'live preview autoplay and offscreen pause PASS');
    }finally{await browser.close();}
  }
  fs.writeFileSync(path.join(__dirname,process.env.ASTRO_STORE_URL?'online-store.json':'local-store.json'),JSON.stringify(report,null,2));
  console.log('PASS exact public assets, 6 locale/viewports, 4 browser video autoplay/pause, download guards and existing free samples.');
})().catch(e=>{console.error(e);process.exitCode=1;});
