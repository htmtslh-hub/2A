const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('_design/.browsers');
const{chromium,firefox}=require('../../../../../../_design/.tooling/node_modules/playwright');
(async()=>{
 const report={date:new Date().toISOString(),url:'https://forgezone.store/demos/beetbuh/index.html?v=1.0.0',browsers:[]};
 for(const[name,engine,options]of[['chromium',chromium,{}],['firefox',firefox,{}],['edge',chromium,{channel:'msedge'}],['coccoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]]){
  const browser=await engine.launch({headless:true,...options});try{
   const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
   await context.addInitScript(()=>{localStorage.setItem('motion','off');localStorage.setItem('beetbuh-motion','off');});
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(report.url);await page.waitForTimeout(1100);
   await page.locator('[data-step="-1"]').click();assert.equal(await page.locator('[data-view-count]').innerText(),'03');
   await page.locator('[data-step="1"]').click();assert.equal(await page.locator('[data-view-count]').innerText(),'01');
   await page.waitForTimeout(100);
   const middle=await page.locator('[data-hero-image]').evaluate(e=>({opacity:+getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));assert(middle.opacity<1&&middle.transform!=='none');
   await page.screenshot({path:path.join(__dirname,'evidence',`online-${name}-motion.png`)});
   await page.evaluate(()=>{for(let i=0;i<8;i++)document.querySelector('[data-step="1"]').click();});await page.waitForTimeout(800);assert.equal(await page.locator('[data-view-count]').innerText(),'03');
   await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.reload();await page.waitForTimeout(1100);
   await page.evaluate(()=>scrollTo({top:850,behavior:'instant'}));await page.waitForTimeout(100);
   const scroll=await page.locator('.feel__portrait').evaluate(e=>({revealed:e.dataset.revealed,opacity:+getComputedStyle(e).opacity}));assert(scroll.revealed==='true'&&scroll.opacity<1);await page.waitForTimeout(800);
   await page.locator('.expand-button').click();assert(await page.locator('dialog').evaluate(e=>e.open));await page.keyboard.press('Escape');
   await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
   const sizes=[];for(const[width,height]of[[820,1180],[375,812],[320,740]]){
    await page.setViewportSize({width,height});const sw=await page.evaluate(()=>document.documentElement.scrollWidth);assert(sw<=width);sizes.push({width,height,scrollWidth:sw});
   }
   await page.locator('.nav-toggle').click();await page.keyboard.press('Escape');assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'),'false');
   assert.equal(errors.length,0);report.browsers.push({name,version:browser.version(),middle,scroll,sizes,errors,bothWraps:true,rapidInput:true,mobileMenu:true});
  }finally{await browser.close();}
 }
 fs.writeFileSync(path.join(__dirname,'online-motion.json'),JSON.stringify(report,null,2));console.log('PASS online motion, both wraps, rapid input, scroll, mobile and menu in four actual browsers.');
})().catch(e=>{console.error(e);process.exitCode=1;});
