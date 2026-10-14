import { resolve, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out=dirname(fileURLToPath(import.meta.url));
const remote=process.env.LEAFLIT_STORE_URL;
const demo=remote ? `${remote}/demos/leaflit/index.html?v=1.0.0` : pathToFileURL(resolve('_design/.qa-extracted/leaflit/index.html')).href;
const report={demo,date:new Date().toISOString(),browsers:[],store:[],hashes:[],failures:[]};
const assert=(ok,message)=>{if(!ok)report.failures.push(message);};
for(const[name,engine,options]of(process.env.LEAFLIT_ONLY_STORE ? [] : [['Chromium',chromium,{}],['Firefox',firefox,{}],['Edge',chromium,{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}],['CocCoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]])){
  const browser=await engine.launch({headless:true,...options});
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const sizes=[];
  for(const[width,height]of[[1440,900],[820,1180],[375,812],[320,740]]){
    await page.setViewportSize({width,height});await page.goto(demo);await page.waitForTimeout(450);
    const geometry=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
    assert(geometry.width===geometry.scroll,`${name} overflow ${width}`);
    sizes.push({width,height,...geometry});
    if(width<=650){await page.locator('.menu-toggle').click();await page.keyboard.press('Escape');assert(await page.locator('.menu-toggle').getAttribute('aria-expanded')==='false',`${name} Escape ${width}`);}
  }
  await page.locator('#book-search').fill('glass');assert(await page.locator('#collection-grid .collection-book:visible').count()===1,`${name} search`);
  await page.locator('#clear-filters').click();await page.locator('#genre-filter').selectOption('Mystery');assert(await page.locator('#collection-grid .collection-book:visible').count()===2,`${name} genres`);
  await page.locator('#clear-filters').click();
  const savedButton=page.locator('#collection-grid [data-book-id="book-3"] button');await savedButton.click();
  assert(await savedButton.getAttribute('aria-pressed')==='true',`${name} save`);await page.reload();
  assert(await page.locator('#collection-grid [data-book-id="book-3"] button').getAttribute('aria-pressed')==='true',`${name} persistent saved`);
  await page.locator('#profile-name').fill('Library reader');await page.locator('#profile-form button').click();await page.reload();
  assert(await page.locator('#profile-name').inputValue()==='Library reader',`${name} persistent profile`);
  await page.locator('#profile').scrollIntoViewIfNeeded();await page.waitForTimeout(70);
  const mid=await page.locator('#profile').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));
  await page.waitForTimeout(450);const end=await page.locator('#profile').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));
  assert(end.opacity==='1'&&end.transform==='none',`${name} finite reveal terminal`);
  await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(450);await page.locator('#profile').scrollIntoViewIfNeeded();
  assert(await page.locator('#profile').evaluate(e=>getComputedStyle(e).opacity==='1'),`${name} reverse scroll remains visible`);
  await page.evaluate(async()=>{await Promise.all([...document.querySelectorAll('img.book-cover')].map(async e=>{e.loading='eager';await e.decode();}));});
  assert(await page.locator('img.book-cover').evaluateAll(es=>es.length===16&&es.every(e=>e.naturalWidth===600&&e.naturalHeight===900)),`${name} all covers`);
  assert(!errors.length,`${name} pageerrors ${errors.join(';')}`);
  report.browsers.push({name,version:browser.version(),sizes,errors,mid,end,search:true,saveReload:true,profileReload:true,covers:true});
  await browser.close();console.log(`${name} release interactions PASS`);
}
if(remote){
  for(const locale of ['vi-VN','en-US','zh-CN']){
    const browser=await chromium.launch();const context=await browser.newContext({locale,viewport:{width:1440,height:900}});
    await context.route('**/api/traffic**',route=>route.abort());const page=await context.newPage();
    await page.goto(`${remote}/?mau=t32`);await page.waitForTimeout(2000);
    assert(await page.getByText('Leaflit',{exact:true}).filter({visible:true}).count()>0,`${locale} detail title`);
    const video=page.locator('[data-recorded-preview] video').first();await video.scrollIntoViewIfNeeded();
    await page.waitForFunction(e=>!e.paused&&e.currentTime>0.2,await video.elementHandle());
    assert((await video.getAttribute('src')).includes('leaflit.mp4'),`${locale} correct preview`);
    const pause=page.locator('[data-preview-actions] button').first();await pause.click();assert(await video.evaluate(e=>e.paused),`${locale} detail pause`);
    await page.goto(`${remote}/?tab=library`);await page.waitForTimeout(1500);
    const card=page.locator('a[href*="mau=t32"]').first();assert(await card.count()>0,`${locale} library card`);
    await card.scrollIntoViewIfNeeded();await page.screenshot({path:resolve(out,`screenshots/store-${locale}.png`)});
    report.store.push({locale,detail:true,video:true,pause:true,library:true});await browser.close();
  }
  const publicFiles=['demos/leaflit/index.html','demos/leaflit/assets/css/style.css','demos/leaflit/assets/js/main.js',...JSON.parse(readFileSync(resolve(out,'generated-covers.json'),'utf8')).map(a=>'demos/leaflit/'+a.file),'previews/leaflit.webp','previews/leaflit.mp4','demos/chronoform/index.html','demos/dualplay/index.html'];
  for(const file of publicFiles){const response=await fetch(remote+'/'+file);const bytes=Buffer.from(await response.arrayBuffer());const local=readFileSync(resolve('web/public',file));const matches=response.ok&&bytes.equals(local);assert(matches,`public hash ${file}`);report.hashes.push({file,status:response.status,matches,sha256:createHash('sha256').update(bytes).digest('hex')});}
  report.downloadAnonymous=(await fetch(remote+'/api/download?id=t32')).status;assert(report.downloadAnonymous===401,'anonymous download guard');
  report.directZip=(await fetch(remote+'/product/giao-dien-web/leaflit/leaflit.zip')).status;assert(report.directZip===404,'private ZIP inaccessible directly');
}
writeFileSync(resolve(out,remote?'online-release.json':'local-release.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({browsers:report.browsers.map(b=>({name:b.name,version:b.version})),store:report.store,failures:report.failures}));
if(report.failures.length)process.exitCode=1;
