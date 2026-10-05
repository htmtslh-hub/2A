import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const origin='https://forgezone.store';
const report={date:new Date().toISOString(),version:'2.0.3',origin,resources:[],browsers:[],failures:[]};
const sha=b=>createHash('sha256').update(b).digest('hex');
for(const path of ['demos/astra-interior/index.html','demos/astra-interior/assets/js/main.js','demos/astra-interior/assets/css/style.css','demos/astra-interior/assets/img/coffee.webp','demos/astra-interior/assets/img/matcha.webp','demos/astra-interior/assets/img/croissant.webp','previews/astra-interior.webp','previews/astra-interior-mobile.webp','previews/astra-interior-tablet.webp','previews/astra-interior.mp4']) {
 const response=await fetch(origin+'/'+path+'?v=2.0.3');const bytes=Buffer.from(await response.arrayBuffer());const match=sha(bytes)===sha(readFileSync(resolve('web/public/'+path)));
 report.resources.push({path,status:response.status,bytes:bytes.length,match});if(!response.ok||!match)report.failures.push(path);
}
for(const [name,engine,options] of [['edge',chromium,{channel:'msedge'}],['chromium',chromium,{}],['firefox',firefox,{}]]) {
 const b=await engine.launch({headless:true,...options});const p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(origin+'/demos/astra-interior/?v=2.0.3');await p.waitForTimeout(1600);await p.mouse.move(420,420);await p.waitForTimeout(350);
 const r={name,version:b.version(),hover:await p.locator('.cosmic-aura').evaluate(e=>+e.style.opacity>0),particles:await p.locator('canvas.cosmic-stars').count()};
 await p.locator('[data-step="-1"]').click();await p.waitForTimeout(120);r.mid=await p.locator('.hero__product.is-active').evaluate(e=>+getComputedStyle(e).opacity);await p.waitForTimeout(1000);r.wrap=await p.locator('[data-go="2"]').getAttribute('aria-pressed')==='true';
 await p.locator('[data-step="1"]').click();await p.waitForTimeout(1000);r.wrapBack=await p.locator('[data-go="0"]').getAttribute('aria-pressed')==='true';
 await p.screenshot({path:resolve('web/product/giao-dien-web/astra-interior/reviews/2.0.3/screenshots/deployed-'+name+'.png')});
 await p.setViewportSize({width:375,height:812});r.noOverflow=await p.evaluate(()=>document.documentElement.scrollWidth===document.documentElement.clientWidth);r.errors=errors;
 if(!r.hover||!r.wrap||!r.wrapBack||!r.noOverflow||errors.length||r.mid<=0||r.mid>=1)report.failures.push(name);report.browsers.push(r);await b.close();
}
const home=await fetch(origin);const html=await home.text();report.home={status:home.status,mellow:html.includes('Mellow Coffee'),oldName:html.includes('Astra Interior')};if(!home.ok||!report.home.mellow)report.failures.push('catalog');
const dl=await fetch(origin+'/api/download?id=t7');report.anonymousDownload=dl.status;if(dl.status!==401)report.failures.push('download permission');
writeFileSync(resolve('web/product/giao-dien-web/astra-interior/reviews/2.0.3/deployment-checks.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.failures.length)process.exitCode=1;
