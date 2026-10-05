const fs=require('node:fs');
const path=require('node:path');
const {createHash}=require('node:crypto');
const {chromium}=require('C:/Users/htmts/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin=process.env.CRIMSON_DEPLOY_URL||'https://forgezone.store';
const publicRoot=path.resolve(__dirname,'../../../../../public/demos/crimson-folio');
const hash=data=>createHash('sha256').update(data).digest('hex');
const assert=(value,message)=>{if(!value)throw new Error(message)};
(async()=>{
  const record={origin,date:new Date().toISOString(),resources:[],browsers:[]};
  for(const item of ['index.html','assets/css/style.css','assets/js/main.js','assets/img/mira-portrait.webp','assets/img/mira-avatar.webp']){
    const response=await fetch(origin+'/demos/crimson-folio/'+item+'?v=1.0.1',{headers:{'Cache-Control':'no-cache'}});
    const data=Buffer.from(await response.arrayBuffer());
    const match=hash(data)===hash(fs.readFileSync(path.join(publicRoot,item)));
    record.resources.push({item,status:response.status,match,sha256:hash(data)});
    assert(response.status===200&&match,'Remote resource mismatch '+item);
  }
  for(const [name,executablePath] of [
    ['edge','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],
    ['coccoc','C:/Program Files/CocCoc/Browser/Application/browser.exe']
  ]){
    const browser=await chromium.launch({executablePath});
    const state={name,version:browser.version(),viewports:[],errors:[],motion:[]};
    const context=await browser.newContext({reducedMotion:'reduce'});
    const page=await context.newPage();
    page.on('pageerror',e=>state.errors.push(e.message));
    for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){
      await page.setViewportSize({width,height});
      await page.goto(origin+'/demos/crimson-folio/index.html?v=1.0.1');
      for(const img of await page.locator('img').all()){
        await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.decode());
      }
      const screen=await page.evaluate(()=>({client:innerWidth,scroll:document.documentElement.scrollWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0)}));
      assert(screen.client===screen.scroll&&screen.images,'Live layout/images');
      if(width<650){await page.locator('.menu-toggle').click();await page.locator('.navigation a[href="#about"]').click();assert(await page.locator('.menu-toggle').getAttribute('aria-expanded')==='false','Live menu');}
      await page.evaluate(()=>scrollTo(0,0));
      await page.screenshot({path:path.join(__dirname,'screenshots/deployed-'+name+'-'+width+'.png'),fullPage:true});
      state.viewports.push({width,height,...screen});
    }
    await page.goto(origin+'/demos/crimson-folio?v=1.0.1');
    assert(await page.locator('.hero__portrait img').evaluate(i=>i.complete&&i.naturalWidth>0),'Short URL');
    await page.waitForTimeout(650);await page.locator('#project-lumen').scrollIntoViewIfNeeded();
    for(let n=0;n<4;n++){await page.waitForTimeout(80);state.motion.push(await page.locator('#project-lumen').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform})));}
    assert(state.motion.some(s=>Number(s.opacity)<1),'Live motion under reduce');
    await page.waitForTimeout(650);
    assert(await page.locator('#project-lumen').evaluate(e=>getComputedStyle(e).opacity)==='1','Live motion finish');
    assert(state.errors.length===0,'Live errors');
    record.browsers.push(state);await browser.close();
  }
  fs.writeFileSync(path.join(__dirname,'deployment-checks.json'),JSON.stringify(record,null,2));
  console.log('Deployment resource hashes, Edge and Coc Coc: PASS');
})().catch(e=>{console.error(e);process.exit(1)});
