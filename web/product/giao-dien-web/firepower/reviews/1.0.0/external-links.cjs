const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('_design/.browsers');
const {chromium,firefox}=require('../../../../../../_design/.tooling/node_modules/playwright');
(async()=>{
 const report={limitation:'Official checker sets external HTTPS ok=null and subsequently treats null as failure without requesting the URL (check-template.mjs lines 157, 298–300). This test checks actual target/new-tab behavior; third-party authenticated availability is not claimed.',browsers:[]};
 for(const [name,engine]of [['chromium',chromium],['firefox',firefox]]){
  const browser=await engine.launch();try{
   const context=await browser.newContext({viewport:{width:1440,height:900}});
   await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.fulfill({status:200,body:'External navigation destination observed; network availability not tested.'}));
   const page=await context.newPage();await page.goto('http://127.0.0.1:4409');
   const targets=[];for(const link of await page.locator('.social-rail a').all()){
    const href=await link.getAttribute('href'),label=await link.getAttribute('aria-label');
    assert(href.startsWith('https://')&&label&&await link.getAttribute('target')==='_blank');
    assert((await link.getAttribute('rel')).includes('noopener'));
    const [popup]=await Promise.all([context.waitForEvent('page'),link.click()]);await popup.waitForLoadState();assert.equal(popup.url(),href);await popup.close();targets.push({href,label,newTab:true});
   }
   assert.equal(targets.length,4);report.browsers.push({name,version:browser.version(),targets});
  }finally{await browser.close();}
 }
 fs.writeFileSync(path.join(__dirname,'external-links.json'),JSON.stringify(report,null,2));console.log('PASS four external HTTPS targets, accessible names and new-tab behavior in Chromium/Firefox.');
})().catch(e=>{console.error(e);process.exitCode=1;});
