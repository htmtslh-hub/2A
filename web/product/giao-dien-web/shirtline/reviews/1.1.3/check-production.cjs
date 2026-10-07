const {chromium}=require(process.argv[2]);
const fs=require('node:fs'), path=require('node:path'), assert=require('node:assert/strict'), crypto=require('node:crypto');
const base='https://forgezone.store';
const sample=page=>page.evaluate(()=>({position:Number(document.querySelector('.shirt-orbit').dataset.position),selected:document.querySelector('.shirt-orbit').dataset.selected,shadows:[...document.querySelectorAll('.shirt-ground-shadow')].map(e=>e.style.transform),images:document.querySelectorAll('.shirt-orbit img').length,width:document.documentElement.scrollWidth,viewport:innerWidth}));
(async()=>{
  const evidence={date:new Date().toISOString(),assets:[],browsers:[],routes:[]};
  for(const file of ['index.html','assets/js/main.js','assets/css/motion.css','assets/css/theme.css']){
    const response=await fetch(base+'/demos/shirtline/'+file+'?v=1.1.3'); assert.equal(response.status,200);
    const bytes=Buffer.from(await response.arrayBuffer()); const local=fs.readFileSync(path.resolve(__dirname,'../../../../../public/demos/shirtline',file));
    assert.equal(bytes.toString().replace(/\r\n/g,'\n'),local.toString().replace(/\r\n/g,'\n'));
    evidence.assets.push({file,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});
  }
  for(const config of [{name:'Edge',channel:'msedge'},{name:'CocCoc',executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]){
    const {name,...launch}=config; const browser=await chromium.launch({...launch,headless:true});
    const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.addInitScript(()=>localStorage.setItem('shirtline-motion','off'));
    await page.goto(base+'/demos/shirtline/index.html?v=1.1.3');
    assert.equal(await page.locator('.shirt-ground-shadow').count(),5);
    await page.locator('#hero-prev').click();await page.waitForTimeout(450);const reverse=await sample(page);assert(reverse.position<0&&reverse.position>-1);
    await page.waitForTimeout(1350);assert.equal((await sample(page)).selected,'4');
    await page.addStyleTag({content:'*{animation:none!important;transition:none!important}'});
    await page.locator('#hero-next').click();await page.waitForTimeout(450);const forward=await sample(page);assert(forward.position>4&&forward.position<5);assert.notDeepEqual(forward.shadows,reverse.shadows);
    await page.waitForTimeout(1350);assert.equal((await sample(page)).selected,'0');
    for(const id of ['hero-next','hero-next','hero-prev','hero-next']){await page.locator('#'+id).click();await page.waitForTimeout(75)}
    await page.waitForTimeout(1750);assert.equal((await sample(page)).selected,'2');
    const sizes=[];for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){await page.setViewportSize({width,height});const state=await sample(page);assert(state.width<=width);sizes.push(state)}
    assert.deepEqual(errors,[]);evidence.browsers.push({name,version:browser.version(),reverse,forward,sizes,errors});await browser.close();
  }
  for(const route of ['/','/demos/novatrend/index.html','/demos/watchroom/index.html','/demos/japan-trails/index.html']){const r=await fetch(base+route);evidence.routes.push({route,status:r.status});assert.equal(r.status,200)}
  assert((await (await fetch(base)).text()).includes('Shirtline'));
  fs.writeFileSync(path.join(__dirname,'production-checks.json'),JSON.stringify(evidence,null,2));console.log(JSON.stringify(evidence));
})().catch(e=>{console.error(e);process.exitCode=1});
