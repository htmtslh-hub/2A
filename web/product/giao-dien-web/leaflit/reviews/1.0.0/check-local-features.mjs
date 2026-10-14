import { createServer } from 'node:http';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync } from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const { default: AxeBuilder } = await import('../../../../../../_design/.tooling/node_modules/@axe-core/playwright/dist/index.mjs');
const out=dirname(fileURLToPath(import.meta.url));
const source=resolve(out,'../../source');
const server=createServer((req,res)=>{
  const path=resolve(source,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname === '/' ? '/index.html' : new URL(req.url,'http://localhost').pathname));
  if(!path.startsWith(source)){res.writeHead(403).end();return;}
  try{const bytes=readFileSync(path);res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp'})[extname(path)]||'application/octet-stream');res.end(bytes);}catch{res.writeHead(404).end();}
});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
const url=`http://127.0.0.1:${server.address().port}`;
const report={date:new Date().toISOString(),browsers:{},failures:[]};
const assert=(condition,label)=>{if(!condition)report.failures.push(label);};
try{
for(const [name,engine] of Object.entries({chromium,firefox})){
  const browser=await engine.launch();
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url);
  await page.locator('#collection-grid').scrollIntoViewIfNeeded();
  await page.evaluate(async () => {
    await Promise.all([...document.querySelectorAll('img.book-cover')].map(async image => {
      image.loading = 'eager';
      await image.decode();
    }));
  });
  const covers=await page.locator('img.book-cover').evaluateAll(images=>images.map(image=>({src:image.getAttribute('src'),width:image.naturalWidth,height:image.naturalHeight,alt:image.alt})));
  assert(covers.length===16&&new Set(covers.map(c=>c.src)).size===8&&covers.every(c=>c.width===600&&c.height===900&&c.alt),`${name}: eight covers load across all 16 placements`);
  assert(await page.locator('svg.book-cover').count()===0,`${name}: all SVG covers replaced`);
  const visible=()=>page.locator('#collection-grid .collection-book:visible').count();
  assert(await visible()===8,`${name}: initial 8 books`);
  await page.locator('#book-search').fill('theo');
  assert(await visible()===1,`${name}: search author`);
  await page.locator('#book-search').fill('GLASS');
  assert(await visible()===1,`${name}: case insensitive title`);
  await page.locator('#book-search').fill('zzzz-no-match');
  assert(await visible()===0&&await page.locator('#empty-results').isVisible(),`${name}: empty state`);
  await page.locator('#clear-filters').click();
  await page.locator('#genre-filter').selectOption('Mystery');
  assert(await visible()===2,`${name}: genre filter`);
  await page.locator('#clear-filters').click();
  const save=page.locator('#collection-grid [data-book-id="book-3"] button');
  await save.click();
  assert(await save.getAttribute('aria-pressed')==='true',`${name}: pressed state`);
  assert(await page.locator('[data-saved-count]').textContent()==='1',`${name}: count sync`);
  assert(await page.locator('#book-3 .save-book').getAttribute('aria-pressed')==='true',`${name}: duplicate button sync`);
  await page.reload();
  assert(await page.locator('[data-saved-count]').textContent()==='1',`${name}: saved survives reload`);
  await page.locator('[data-saved-view]').click();
  assert(await visible()===1,`${name}: saved navigation filter`);
  await save.click();
  assert(await visible()===0&&await page.locator('#empty-results').isVisible(),`${name}: remove last saved book`);
  assert(await page.locator('#view-filter').evaluate(e=>e===document.activeElement),`${name}: focus after hidden card`);
  await page.locator('#clear-filters').click();
  await save.click();
  await page.locator('#profile-name').fill('<b>Reader</b>');
  await page.locator('#profile-form button').click();
  assert(await page.locator('[data-profile-name]').first().textContent()==='<b>Reader</b>',`${name}: profile escaped`);
  await page.reload();
  assert(await page.locator('#profile-name').inputValue()==='<b>Reader</b>',`${name}: profile reload`);
  const second=await context.newPage();
  await second.goto(url);
  await second.locator('#collection-grid [data-book-id="book-4"] button').click();
  await page.waitForFunction(()=>document.querySelector('[data-saved-count]').textContent==='2');
  await second.evaluate(()=>localStorage.removeItem('leaflit.library.v1'));
  await page.waitForFunction(()=>document.querySelector('[data-saved-count]').textContent==='0');
  assert(await page.locator('#profile-name').inputValue()==='Sarah',`${name}: other tab reset`);
  const sizes=[];
  for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){
    await page.setViewportSize({width,height});
    await page.goto(url);
    await page.waitForTimeout(450);
    const geometry=await page.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth}));
    assert(geometry.width===geometry.scrollWidth,`${name}: overflow ${width}`);
    const axe=await new AxeBuilder({page}).analyze();
    assert(!axe.violations.length,`${name}: axe ${width}: ${axe.violations.map(v=>v.id).join(',')}`);
    await page.screenshot({path:resolve(out,`screenshots/${name}-local-${width}.png`),fullPage:true});
    sizes.push({width,height,geometry,violations:axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});
  }
  const blocked=await browser.newContext();
  await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}});});
  const blockedPage=await blocked.newPage();
  await blockedPage.goto(url);
  await blockedPage.locator('#collection-grid [data-book-id="book-0"] button').click();
  assert(await blockedPage.locator('[data-saved-count]').textContent()==='1',`${name}: memory save while blocked`);
  assert((await blockedPage.locator('#local-feedback').textContent()).includes('session'),`${name}: blocked storage warning`);
  const corrupt=await browser.newContext();
  await corrupt.addInitScript(()=>localStorage.setItem('leaflit.library.v1','{invalid'));
  const corruptPage=await corrupt.newPage();
  await corruptPage.goto(url);
  assert(await corruptPage.locator('#collection-grid .collection-book').count()===8,`${name}: corrupted storage fallback`);
  assert(!errors.length,`${name}: pageerrors ${errors.join(',')}`);
  report.browsers[name]={version:browser.version(),sizes,errors,covers,storageReload:true,crossTab:true,blockedStorage:true,corruptStorage:true};
  await browser.close();
}
const custom=readFileSync(resolve(source,'CUSTOMISE.md'),'utf8');
report.docs={steps:(custom.match(/^## Step \d+/gm)||[]).length,prompts:(custom.match(/\*\*Prompt \d+/g)||[]).length,countErrors:[]};
for(const row of custom.split('\n').filter(l=>/^\| `index\.html`/.test(l))){const [,file,needle,count]=row.split('|').map(c=>c.trim().replace(/^`|`$/g,''));const actual=readFileSync(resolve(source,file),'utf8').split(needle).length-1;if(actual!==Number(count))report.docs.countErrors.push({needle,count,actual});}
assert(report.docs.steps===10&&report.docs.prompts===12&&!report.docs.countErrors.length,'docs steps/prompts/counts');
}finally{server.close();writeFileSync(resolve(out,'local-checks.json'),JSON.stringify(report,null,2));}
console.log(JSON.stringify(report));
if(report.failures.length)process.exitCode=1;
