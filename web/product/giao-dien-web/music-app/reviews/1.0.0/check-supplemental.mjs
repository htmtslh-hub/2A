import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const review=resolve('web/product/giao-dien-web/music-app/reviews/1.0.0');
const report={};
for(const [name,engine] of [['chromium',chromium],['firefox',firefox]]){
  const browser=await engine.launch();const context=await browser.newContext();const page=await context.newPage();
  await page.goto('http://127.0.0.1:5133');
  const structure=await page.evaluate(()=>({idsUnique:new Set([...document.querySelectorAll('[id]')].map(e=>e.id)).size===document.querySelectorAll('[id]').length,landmarks:['header','main','footer','nav'].every(s=>document.querySelector(s)),h1:document.querySelectorAll('h1').length,badSvg:[...document.querySelectorAll('svg')].filter(e=>!e.hasAttribute('viewBox')||e.getAttribute('focusable')!=='false'||e.getAttribute('aria-hidden')!=='true').length,emptyLabels:[...document.querySelectorAll('button,a')].filter(e=>!e.textContent.trim()&&!e.getAttribute('aria-label')).length}));
  const targets={};
  for(const width of [1440,820,375,320]){await page.setViewportSize({width,height:900});targets[width]=await page.evaluate(()=>[...document.querySelectorAll('button,a,input')].filter(e=>e.getClientRects().length&&!e.classList.contains('skip-link')).map(e=>{const r=e.getBoundingClientRect();const p=getComputedStyle(e,'::after');const hitWidth=p.content!=='none'?r.width-parseFloat(p.left||0)-parseFloat(p.right||0):r.width;const hitHeight=p.content!=='none'?r.height-parseFloat(p.top||0)-parseFloat(p.bottom||0):r.height;return {name:e.getAttribute('aria-label')||e.textContent.trim().slice(0,30),width:r.width,height:r.height,hitWidth,hitHeight};}).filter(e=>e.hitWidth<43.9||e.hitHeight<43.9));}
  await page.setViewportSize({width:920,height:700});
  await page.evaluate(()=>{localStorage.setItem('motion','off');localStorage.setItem('animation','off');});await page.reload();await page.evaluate(()=>scrollTo({top:450,behavior:'instant'}));await page.waitForTimeout(100);const oldOff=await page.locator('#library').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));
  await context.route('**/*.webp',route=>route.abort());await page.reload();await page.locator('#follow').click();const missingAssets=await page.evaluate(()=>({title:document.querySelector('h1').textContent,follow:document.querySelector('#follow').getAttribute('aria-pressed'),width:document.documentElement.scrollWidth}));
  const html=readFileSync(resolve('web/product/giao-dien-web/music-app/source/index.html'),'utf8');
  const luminance=hex=>{const c=hex.match(/\w\w/g).map(s=>parseInt(s,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2];};
  const pairs=[['ink/background','1d282e','f5f2e7'],['muted/surface','64665f','faf9f5'],['white/blue','ffffff','344acb'],['playlist title/coral','362b27','ff7965'],['playlist label/coral','512d27','ff7965'],['ink/lavender','1d282e','c3b4ee'],['focus/surface','344acb','faf9f5'],['white focus/album','ffffff','344acb'],['Luna label','ffffff','4e58a5']].map(([label,a,b])=>{const l1=luminance(a),l2=luminance(b);return {label,foreground:'#'+a,background:'#'+b,ratio:(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05)};});
  report[name]={version:browser.version(),structure,targets,oldOff,missingAssets,contrast:pairs,staticPaths:!/(?:src|href)="https?:/.test(html)};
  await browser.close();
}
writeFileSync(resolve(review,'supplemental-checks.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
