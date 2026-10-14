const fs=require('node:fs');const path=require('node:path');const {pathToFileURL}=require('node:url');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('_design/.browsers');
const {chromium,firefox}=require(path.resolve('_design/.tooling/node_modules/playwright'));
const root=path.resolve('web/product/giao-dien-web/ais-folio');const out=path.join(root,'reviews/1.0.0');const url=process.argv[2]||pathToFileURL(path.join(root,'source/index.html')).href;
(async()=>{const report=[];for(const [name,engine,options] of [['chromium',chromium,{}],['firefox',firefox,{}],['edge',chromium,{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}],['coccoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]]){
 const browser=await engine.launch({headless:true,...options});const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 await page.addInitScript(()=>{try{localStorage.setItem('motion','off')}catch{}});await page.goto(url);await page.waitForTimeout(750);
 // Disable smooth scroll in the harness so frame timing tests entrance, not scroll interpolation.
 await page.addStyleTag({content:'html { scroll-behavior: auto !important; }'});
 const target=page.locator('#contact');await target.evaluate(el=>el.scrollIntoView({block:'center'}));
 const sample=()=>target.evaluate(el=>({opacity:+getComputedStyle(el).opacity,transform:getComputedStyle(el).transform}));
 await page.waitForTimeout(110);const middle=await sample();await page.waitForTimeout(700);const end=await sample();
 await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(50);await page.setViewportSize({width:320,height:740});await page.waitForTimeout(50);
 const resized=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth);
 await page.route('**/assets/img/**',r=>r.abort());await page.reload();await page.waitForTimeout(700);
 const missingArtUsable=await page.locator('#about').isVisible()&&await page.locator('#contact a').getAttribute('href')==='mailto:hello@aisfolio.example';
 report.push({name,version:browser.version(),middle,end,resized,missingArtUsable,finite:middle.opacity<1&&middle.opacity>.4&&end.opacity===1&&end.transform==='none'});
 await browser.close();}fs.writeFileSync(path.join(out,process.argv[2]?'online-motion-checks.json':'motion-checks.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));})();
