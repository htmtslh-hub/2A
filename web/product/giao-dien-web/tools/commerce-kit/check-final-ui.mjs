import {createServer} from 'node:http';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,join,extname} from 'node:path';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const root=resolve('web/product/giao-dien-web'),slugs=['shirtline','novatrend','diginest','soniq','astra-interior','vybe','solenne','auralis','aeris','watchroom','velora'];
const versions={shirtline:'1.2.0',novatrend:'1.2.0',diginest:'1.3.0',soniq:'1.1.0','astra-interior':'2.1.0',vybe:'1.1.0',solenne:'2.1.0',auralis:'1.3.0',aeris:'1.4.0',watchroom:'1.3.0',velora:'1.3.0'};
const server=createServer((req,res)=>{try{const file=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://x').pathname));if(!file.startsWith(root))throw Error();res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp'})[extname(file)]||'application/octet-stream');res.end(readFileSync(file));}catch{res.writeHead(404).end();}});
await new Promise(done=>server.listen(0,'127.0.0.1',done));const base=`http://127.0.0.1:${server.address().port}`,results=[];
try{for(const [name,engine,options] of [['chromium',chromium,{}],['firefox',firefox,{}],['edge',chromium,{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}],['coccoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]]){
  const browser=await engine.launch({headless:true,...options});try{
    for(const slug of slugs){const context=await browser.newContext({viewport:{width:320,height:740}}),page=await context.newPage();await page.goto(`${base}/${slug}/source/index.html`,{waitUntil:'domcontentloaded'});assert.equal(await page.locator('[aria-controls]').evaluateAll(nodes=>nodes.filter(node=>!document.getElementById(node.getAttribute('aria-controls'))).length),0,slug+' initial controls');if(slug==='shirtline'){
      await page.locator('#menu').click();assert(await page.locator('#shirtline-navigation').isVisible());await page.keyboard.press('Escape');assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'false');
      await page.keyboard.press('Control+Home');await page.reload();await page.keyboard.press('Tab');assert(await page.locator('.shirtline-skip').evaluate(node=>node===document.activeElement));
      await page.keyboard.press('Enter');assert(await page.locator('main').evaluate(node=>node===document.activeElement));
    }
    if(slug==='velora'){await page.locator('[data-open]').click();const selection=await page.locator('[data-summary]').innerText();await page.locator('.fz-commerce-current').click();await page.evaluate(()=>ForgeCommerce.openBag());assert((await page.locator('.fz-commerce-lines').innerText()).includes(selection),'bike configuration preserved');}
    results.push({browser:name,version:browser.version(),slug,status:'PASS'});
    if(name==='chromium'){
      await page.goto(`${base}/${slug}/source/index.html`,{waitUntil:'domcontentloaded'});await page.setViewportSize({width:1396,height:1047});await page.waitForTimeout(400);const dir=join(root,slug,'reviews',versions[slug],'screenshots'),png=join(dir,'preview-source.png');mkdirSync(dir,{recursive:true});await page.screenshot({path:png});execFileSync('ffmpeg',['-y','-loglevel','error','-i',png,'-vf','scale=698:-2','-quality','80',resolve('web/public/previews',slug+'.webp')]);
      if(['soniq','auralis','aeris','astra-interior'].includes(slug))for(const [suffix,width,height]of [['tablet',820,1180],['mobile',375,812]]){await page.setViewportSize({width,height});const small=join(dir,`preview-${suffix}.png`);await page.screenshot({path:small});execFileSync('ffmpeg',['-y','-loglevel','error','-i',small,'-quality','80',resolve('web/public/previews',slug+'-'+suffix+'.webp')]);}
    }
    await context.close();}
    const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740},offline:true}),page=await context.newPage();await page.goto(pathToFileURL(join(root,'shirtline/source/index.html')).href);assert(await page.locator('nav a').first().isVisible());assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>320),false);await context.close();results.push({browser:name,slug:'shirtline',check:'offline no-JS navigation',status:'PASS'});console.log(name+' final UI PASS');
  }finally{await browser.close();}
}}finally{server.close();writeFileSync(join(root,'tools/commerce-kit/final-ui-results.json'),JSON.stringify({date:new Date().toISOString(),results},null,2));}
