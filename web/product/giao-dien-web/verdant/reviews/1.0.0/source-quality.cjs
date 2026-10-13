const fs=require('node:fs');const path=require('node:path');const {createServer}=require('node:http');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('_design/.browsers');
const {chromium}=require('../../../../../../_design/.tooling/node_modules/playwright');
const AxeBuilder=require('../../../../../../_design/.tooling/node_modules/@axe-core/playwright').default;
const source=path.resolve(__dirname,'../../source');const out=path.join(__dirname,'quality');fs.mkdirSync(out,{recursive:true});
const server=createServer((req,res)=>{let file=path.join(source,new URL(req.url,'http://x').pathname);if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');try{res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.statusCode=404;res.end()}});
async function run(){await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=`http://127.0.0.1:${server.address().port}`;const report={views:[],motion:[],failures:[]};
const browser=await chromium.launch({headless:true});
for(const [w,h] of [[1448,984],[1440,900],[820,1180],[375,812],[320,740]]){const context=await browser.newContext({viewport:{width:w,height:h},reducedMotion:'reduce'});const page=await context.newPage();await page.goto(url);
const height=await page.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<height;y+=300){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(40)}await page.waitForTimeout(800);await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(500);
await page.screenshot({path:path.join(out,`${w}-hero.png`)});await page.screenshot({path:path.join(out,`${w}-full.png`),fullPage:true});
const axe=await new AxeBuilder({page}).analyze();
const dimensions=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth}));
const targets=await page.evaluate(()=>[...document.querySelectorAll('a,button')].filter(e=>e.getClientRects().length&&!e.closest('dialog')&&!e.closest('.product__info p')).map(e=>({label:e.getAttribute('aria-label')||e.textContent.trim(),width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})).filter(e=>e.width<43.9||e.height<43.9));
report.views.push({w,h,dimensions,targets,violations:axe.violations.map(e=>({id:e.id,impact:e.impact,nodes:e.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
await context.close();}
await browser.close();
// Installed Cốc Cốc: final stylesheet, rapid/wrap and reduced-motion state.
const coc=await chromium.launch({headless:true,executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'});const p=await coc.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});await p.goto(url);await p.evaluate(()=>{localStorage.setItem('motion','off');localStorage.setItem('verdant-motion','off')});await p.reload();
for(const d of [1,1,1,-1,-1,-1]){await p.locator(`[data-direction="${d}"]`).click();await p.waitForTimeout(170);report.motion.push({d,transform:await p.locator('.hero__cup').evaluate(e=>getComputedStyle(e).transform),opacity:await p.locator('.hero__cup').evaluate(e=>getComputedStyle(e).opacity)});await p.waitForTimeout(800)}
report.coccoc={version:coc.version(),finalSelection:await p.locator('[data-product="0"]').getAttribute('aria-pressed')};await p.evaluate(()=>{const e=document.querySelector('.craft');scrollTo(0,e.offsetTop+300)});await p.waitForTimeout(500);await p.screenshot({path:path.join(out,'coccoc-scroll.png')});await coc.close();
fs.writeFileSync(path.join(__dirname,'source-quality.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report.views.map(v=>({width:v.w,axe:v.violations,targets:v.targets})),null,2));}
run().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
