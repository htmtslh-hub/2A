const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('C:/Users/htmts/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '../..');
const url = pathToFileURL(path.join(root, 'source/index.html')).href;
const shots = path.join(__dirname, 'screenshots');
const browsers = [
  ['chrome', 'C:/Program Files/Google/Chrome/Application/chrome.exe'],
  ['edge', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],
  ['coccoc', 'C:/Program Files/CocCoc/Browser/Application/browser.exe']
];
const sizes = [[1440,900],[820,1180],[375,812],[320,740]];
const results = [];
const assert = (condition, message) => { if (!condition) throw new Error(message); };
(async () => {
  for (const [name, executablePath] of browsers) {
    const browser = await chromium.launch({executablePath, headless:true});
    const record = {browser:name, version:browser.version(), views:[], errors:[], motion:[]};
    for (const [width,height] of sizes) {
      const context = await browser.newContext({viewport:{width,height}});
      const page = await context.newPage();
      page.on('pageerror', error => record.errors.push(error.message));
      page.on('console', event => { if(event.type()==='error') record.errors.push(event.text()); });
      await page.goto(url);
      for (let y=0; y<await page.evaluate(()=>document.body.scrollHeight);y+=600) {
        await page.evaluate(y=>window.scrollTo(0,y),y);
        await page.waitForTimeout(80);
      }
      await page.waitForTimeout(600);
      await page.evaluate(()=>window.scrollTo(0,0));
      await page.screenshot({path:path.join(shots,name+'-'+width+'.png'),fullPage:true});
      const state = await page.evaluate(() => ({
        width:document.documentElement.scrollWidth,
        client:document.documentElement.clientWidth,
        images:[...document.images].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})),
        invisible:[...document.querySelectorAll('[data-reveal]')].filter(e=>Number(getComputedStyle(e).opacity)<1).length,
        h1:document.querySelectorAll('h1').length,
        duplicateIds:[...document.querySelectorAll('[id]')].map(e=>e.id).filter((id,i,a)=>a.indexOf(id)!==i),
        badLinks:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.querySelector(a.getAttribute('href'))).length
      }));
      assert(state.width===state.client, name+' overflow '+width);
      assert(state.images.every(i=>i.loaded)&&state.invisible===0&&state.h1===1&&state.duplicateIds.length===0&&state.badLinks===0,'content '+name);
      if(width<650) {
        const toggle=page.locator('.menu-toggle');
        await toggle.focus(); await page.keyboard.press('Enter');
        assert(await toggle.getAttribute('aria-expanded')==='true','open');
        assert(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth),'open menu overflow');
        await page.screenshot({path:path.join(shots,name+'-'+width+'-menu.png')});
        await page.keyboard.press('Tab');
        assert(await page.evaluate(()=>document.activeElement.getAttribute('href'))==='#work','menu tab');
        await page.keyboard.press('Shift+Tab');
        assert(await toggle.evaluate(e=>e===document.activeElement),'reverse tab');
        await page.keyboard.press('Escape');
        assert(await toggle.getAttribute('aria-expanded')==='false','escape');
        assert(await toggle.evaluate(e=>e===document.activeElement),'focus restored');
        await page.keyboard.press('Tab');
        assert(await page.evaluate(()=>!document.activeElement.closest('.navigation')),'hidden menu tab');
        await toggle.click(); await page.locator('.navigation a[href="#about"]').click();
        assert(await toggle.getAttribute('aria-expanded')==='false','close anchor');
        await toggle.click(); await page.setViewportSize({width:700,height});
        assert(await toggle.getAttribute('aria-expanded')==='false','resize');
        await page.setViewportSize({width,height});
        for(let n=0;n<6;n++) await toggle.click();
        assert(await toggle.getAttribute('aria-expanded')==='false','rapid toggle');
      }
      await page.goto(url);
      await page.keyboard.press('Tab');
      assert(await page.evaluate(()=>document.activeElement.className)==='skip-link','skip focus');
      await page.keyboard.press('Enter');
      assert(await page.evaluate(()=>document.activeElement.id)==='main','skip destination');
      record.views.push({viewport:[width,height],...state,interaction:'PASS'});
      await context.close();
      const nojs=await browser.newContext({viewport:{width,height},javaScriptEnabled:false,offline:true});
      const np=await nojs.newPage(); await np.goto(url);
      assert(await np.locator('.navigation').isVisible(),'nojs navigation');
      assert(await np.evaluate(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0)),'offline images');
      assert(await np.evaluate(()=>document.documentElement.scrollWidth===innerWidth),'nojs overflow');
      await np.screenshot({path:path.join(shots,name+'-'+width+'-nojs.png'),fullPage:true});
      await nojs.close();
    }
    for(const reducedMotion of ['reduce','no-preference']) {
      const context=await browser.newContext({viewport:{width:375,height:812},reducedMotion});
      await context.addInitScript(()=>{localStorage.setItem('motion','off'); localStorage.setItem('motionEnabled','false');});
      const page=await context.newPage(); await page.goto(url); await page.waitForTimeout(650);
      await page.locator('#project-lumen').scrollIntoViewIfNeeded();
      const samples=[];
      for(let n=0;n<4;n++){await page.waitForTimeout(80);samples.push(await page.locator('#project-lumen').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform})));}
      await page.waitForTimeout(600);
      const final=await page.locator('#project-lumen').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));
      assert(samples.some(s=>Number(s.opacity)<1),'motion frame '+name+' '+reducedMotion);
      assert(final.opacity==='1'&&final.transform==='none','finite reveal');
      record.motion.push({reducedMotion,staleOff:true,samples,final});
      await context.close();
    }
    const zoom=await browser.newContext({viewport:{width:1440,height:900}});
    const zp=await zoom.newPage(); await zp.goto(url);
    // A 720 CSS-pixel viewport models desktop browser reflow at 200%.
    await zp.setViewportSize({width:720,height:450});
    assert(await zp.evaluate(()=>document.documentElement.scrollWidth===innerWidth),'zoom reflow');
    await zp.screenshot({path:path.join(shots,name+'-reflow-200.png'),fullPage:true});
    await zoom.close();
    assert(record.errors.length===0,'browser errors');
    results.push(record); await browser.close();
    console.log(name,record.version,'PASS');
  }
  fs.writeFileSync(path.join(__dirname,'checks.json'),JSON.stringify(results,null,2));
})().catch(error=>{console.error(error);process.exit(1)});
