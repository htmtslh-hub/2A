import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const origin='https://forgezone.store';
const report={date:new Date().toISOString(),version:'1.0.0',origin,resources:[],browsers:[],failures:[]};
const sha=b=>createHash('sha256').update(b).digest('hex');
for(const path of ['demos/soniq/index.html','demos/soniq/assets/js/main.js','demos/soniq/assets/css/style.css','demos/soniq/assets/img/graphite.webp','demos/soniq/assets/img/ivory.webp','demos/soniq/assets/img/cobalt.webp','previews/soniq.webp','previews/soniq-mobile.webp','previews/soniq-tablet.webp','previews/soniq.mp4']) {
 const response=await fetch(origin+'/'+path+'?v=1.0.0');const bytes=Buffer.from(await response.arrayBuffer());const match=sha(bytes)===sha(readFileSync(resolve('web/public/'+path)));
 report.resources.push({path,status:response.status,bytes:bytes.length,match});if(!response.ok||!match)report.failures.push(path);
}
for(const [name,engine,options] of [['edge',chromium,{channel:'msedge'}],['chromium',chromium,{}],['firefox',firefox,{}]]) {
 const b=await engine.launch({headless:true,...options});const p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(origin+'/demos/soniq/?v=1.0.0');await p.waitForTimeout(1600);await p.mouse.move(420,420);await p.waitForTimeout(350);
 const r={name,version:b.version(),hover:await p.locator('.hero__product.is-active').evaluate(e=>Math.abs(parseFloat(e.style.translate))>0),edge:await p.locator('.hero__visual').evaluate(e=>e.getBoundingClientRect().top<document.querySelector('.showcase').getBoundingClientRect().top)};
 await p.locator('[data-step="-1"]').click();await p.waitForTimeout(120);r.mid=await p.locator('.hero__product.is-active').evaluate(e=>+getComputedStyle(e).opacity);await p.waitForTimeout(1000);r.wrap=await p.locator('[data-go="2"]').getAttribute('aria-pressed')==='true';
 await p.locator('[data-step="1"]').click();await p.waitForTimeout(1000);r.wrapBack=await p.locator('[data-go="0"]').getAttribute('aria-pressed')==='true';
 await p.screenshot({path:resolve('web/product/giao-dien-web/soniq/reviews/1.0.0/screenshots/deployed-'+name+'.png')});
 await p.setViewportSize({width:375,height:812});r.noOverflow=await p.evaluate(()=>document.documentElement.scrollWidth===document.documentElement.clientWidth);r.errors=errors;
 if(!r.edge||!r.hover||!r.wrap||!r.wrapBack||!r.noOverflow||errors.length||r.mid<=0||r.mid>=1)report.failures.push(name);report.browsers.push(r);await b.close();
}
const home=await fetch(origin);const html=await home.text();report.home={status:home.status,soniq:html.includes('Soniq'),oldName:html.includes('Astra Interior')};if(!home.ok||!report.home.soniq)report.failures.push('catalog');
const dl=await fetch(origin+'/api/download?id=t10');report.anonymousDownload=dl.status;if(dl.status!==401)report.failures.push('download permission');
writeFileSync(resolve('web/product/giao-dien-web/soniq/reviews/1.0.0/deployment-checks.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.failures.length)process.exitCode=1;
