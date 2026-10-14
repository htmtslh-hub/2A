const fs=require('node:fs');const path=require('node:path');process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('_design/.browsers');
const {chromium,firefox}=require(path.resolve('_design/.tooling/node_modules/playwright'));
(async()=>{const report=[];for(const [name,engine,options] of [['chromium',chromium,{}],['firefox',firefox,{}],['edge',chromium,{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}],['coccoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]]){
 const browser=await engine.launch({headless:true,...options});for(const width of [1440,375]){const page=await browser.newPage({viewport:{width,height:900},locale:'en-US',reducedMotion:'reduce'});await page.route('**/api/traffic**',r=>r.abort());await page.goto('https://forgezone.store/?tab=library');
 const card=page.locator('a[href="?mau=t34"]').first();await card.waitFor();await page.waitForTimeout(800);await card.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));await page.waitForTimeout(1000);
 const video=page.locator('video[src*="semaan"]');const playing=await video.first().evaluate(v=>({paused:v.paused,muted:v.muted,loop:v.loop,time:v.currentTime}));
 await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await page.waitForTimeout(600);const offscreen=await video.first().evaluate(v=>v.paused);
 report.push({name,version:browser.version(),width,playing,offscreen,pass:!playing.paused&&playing.muted&&playing.loop&&playing.time>0&&offscreen});await page.close();}await browser.close();}
 fs.writeFileSync('web/product/giao-dien-web/semaan/reviews/1.0.0/online-video-checks.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));if(report.some(r=>!r.pass))process.exitCode=1;})();
