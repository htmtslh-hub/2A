const fs=require('node:fs');const path=require('node:path');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('_design/.browsers');
const {chromium,firefox}=require(path.resolve('_design/.tooling/node_modules/playwright'));
const origin=process.argv[2]||'http://localhost:4371';const online=origin.startsWith('https');
const out=path.resolve('web/product/giao-dien-web/semaan/reviews/1.0.0');
(async()=>{const report={origin,views:[],failures:[]};
 for(const [name,engine] of [['chromium',chromium],['firefox',firefox]]){
  const browser=await engine.launch({headless:true});
  for(const [locale,packageText] of [['vi-VN','9 file · 3 ảnh WebP tự tạo'],['en-US','9 files · 3 original WebP images'],['zh-CN','9 个文件 · 3 张原创 WebP']]){
   const context=await browser.newContext({locale});await context.route('**/api/traffic**',r=>r.abort());const page=await context.newPage();
   await page.goto(origin+'/?mau=t34');await page.getByText(packageText,{exact:true}).waitFor({state:'visible'});
   for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){
    await page.setViewportSize({width,height});await page.waitForTimeout(200);const geometry=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
    const specs=await page.getByText(packageText,{exact:true}).isVisible();report.views.push({name,version:browser.version(),locale,width,height,geometry,specs});if(geometry.scroll>geometry.client||!specs)report.failures.push({locale,width,geometry,specs});
   }
   await page.screenshot({path:path.join(out,`candidate/${online?'online':'local'}-${name}-${locale}-detail.png`),fullPage:true});
   await page.goto(origin+'/?tab=library');const card=page.locator('a[href="?mau=t34"]').first();await card.waitFor();await card.scrollIntoViewIfNeeded();await page.waitForTimeout(800);
   const nameVisible=await card.innerText();const video=page.locator('video[src*="semaan"],video[data-src*="semaan"]');
   let playing=null;if(await video.count()){playing=await video.first().evaluate(v=>({paused:v.paused,muted:v.muted,loop:v.loop,currentTime:v.currentTime}));}
   report.views.push({name,locale,library:true,label:nameVisible,playing});
   await page.goto(origin+'/huong-dan?template=semaan&view=template');await page.locator('select').first().waitFor();const guide=await page.locator('body').innerText();if(!guide.includes('portrait.webp'))report.failures.push({name,locale,guide:'Missing product image instructions'});report.views.push({name,locale,guide:true});
   await context.close();
  }
  await browser.close();
 }
 report.anonymousDownload=(await fetch(origin+'/api/download?id=t34')).status;report.directZip=(await fetch(origin+'/product/giao-dien-web/semaan/semaan.zip')).status;
 if(report.anonymousDownload!==401||report.directZip!==404)report.failures.push({download:report.anonymousDownload,direct:report.directZip});
 fs.writeFileSync(path.join(out,online?'store-online.json':'store-local.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({origin,views:report.views.length,failures:report.failures,anonymousDownload:report.anonymousDownload,directZip:report.directZip}));if(report.failures.length)process.exitCode=1;
})();
