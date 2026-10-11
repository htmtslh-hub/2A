import {chromium} from 'file:///D:/3.%20Dự%20án/2A/_design/.tooling/node_modules/playwright/index.mjs';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const here=dirname(fileURLToPath(import.meta.url));
const base=process.argv[2]||'http://127.0.0.1:4362';
const live=base.startsWith('https:');
const report={date:new Date().toISOString(),base,browser:'Microsoft Edge',locales:[],assets:[],tests:[],errors:[]};
const digest=b=>createHash('sha256').update(b).digest('hex');
const web=resolve(here,'../../../../..');
for(const path of ['demos/mint-atlas/index.html','demos/mint-atlas/assets/css/style.css','demos/mint-atlas/assets/js/main.js','demos/mint-atlas/assets/img/mira.webp','demos/mint-atlas/assets/img/glasshouse.webp','demos/mint-atlas/assets/img/starlight.webp','previews/mint-atlas.webp']){
 const r=await fetch(base+'/'+path+'?release=1.0.0');assert.equal(r.status,200);
 const bytes=Buffer.from(await r.arrayBuffer());assert.equal(digest(bytes),digest(readFileSync(resolve(web,'public',path))));report.assets.push({path,status:r.status,bytes:bytes.length,sha256:digest(bytes)});
}
const noAuth=await fetch(base+'/api/download?id=t16');assert.equal(noAuth.status,401);report.tests.push('download requires authentication:401');
const publicZip=await fetch(base+'/product/giao-dien-web/mint-atlas/mint-atlas.zip');assert.equal(publicZip.status,404);report.tests.push('commercial ZIP not publicly exposed:404');
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});report.version=browser.version();
mkdirSync(resolve(here,'store-screenshots'),{recursive:true});
for(const locale of ['vi-VN','en-US','zh-CN']){
 const context=await browser.newContext({locale,viewport:{width:1440,height:900}});const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto(base+'/?mau=t16');await page.locator('h1').filter({hasText:'Mint Atlas'}).waitFor();await page.waitForTimeout(700);
 assert.ok((await page.locator('body').innerText()).includes('WebP'));
 const guide=page.locator('a[href="/huong-dan?template=mint-atlas&view=template"]');assert.ok(await guide.isVisible());
 const state=await page.evaluate(()=>({lang:document.documentElement.lang,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,preview:[...document.querySelectorAll('img')].some(i=>i.src.includes('/previews/mint-atlas.webp')&&i.naturalWidth>0)}));assert.ok(state.scrollWidth<=state.width);assert.ok(state.preview);
 await page.screenshot({path:resolve(here,`store-screenshots/${live?'live':'local'}-${locale}.png`),fullPage:true});report.locales.push({locale,...state});
 await guide.click();await page.getByRole('heading',{name:'Mint Atlas',exact:true}).waitFor();const content=await page.locator('main').innerText();assert.ok(content.includes('mira.webp'));assert.ok(content.includes('80/92/68/75'));
 await context.close();
}
const context=await browser.newContext({locale:'en-US',viewport:{width:375,height:812}});const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
await page.goto(base+'/?mau=t16');await page.getByRole('button',{name:'Buy this template'}).click();await page.locator('input[type="password"]').waitFor({state:'visible'});report.tests.push('purchase entry opens sign-in gate; no order submitted');
await page.goto(base+'/demos/mint-atlas/index.html?v=1.0.0');await page.locator('.ability summary').first().click();assert.equal(await page.locator('.ability').first().getAttribute('open'),'');assert.ok(await page.locator('h1').isVisible());assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));report.tests.push('live mobile demo ability and overflow');
await page.screenshot({path:resolve(here,`store-screenshots/${live?'live':'local'}-mobile-demo.png`),fullPage:true});
await browser.close();assert.equal(report.errors.length,0);report.failures=[];writeFileSync(resolve(here,live?'deployment-checks.json':'store-checks.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
