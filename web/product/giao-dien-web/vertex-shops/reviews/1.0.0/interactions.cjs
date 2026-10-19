const {chromium}=require('C:/Users/Lenovo/AppData/Local/npm-cache/_npx/6bcb61ec6d5aea22/node_modules/playwright');
const fs=require('fs'),path=require('path'),assert=require('assert');
const dir=path.resolve('web/product/giao-dien-web/vertex-shops/reviews/1.0.0');
async function run(name,executablePath){
 const b=await chromium.launch({headless:true,...(executablePath?{executablePath}:{})});
 console.log(name+' launched');
 const context=await b.newContext({viewport:{width:1440,height:900}});const p=await context.newPage(),errors=[],network=[];
 p.setDefaultTimeout(5000);
 p.on('pageerror',e=>errors.push(e.message));p.on('requestfailed',r=>network.push({url:r.url(),error:r.failure()}));
 await p.goto('http://127.0.0.1:8765',{waitUntil:'domcontentloaded'});await p.waitForTimeout(4200);
 const pixel=await p.evaluate(()=>{
 const q=s=>document.querySelector(s),cs=s=>getComputedStyle(q(s));const k=+cs('.canvas').getPropertyValue('--k');
 return {badge:[q('.badge').offsetWidth,q('.badge').offsetHeight,cs('.badge').borderRadius],tileRight:q('.badge i').getBoundingClientRect().right,labelLeft:q('#badgeTxt').getBoundingClientRect().left,widths:['h1a','h1b','sub1','sub2','badgeTxt','wmName','ctaLabel','vpLabel'].map(id=>[id,q('#'+id).getBoundingClientRect().width/k]),overflow:cs('.btn').overflow,heroTopStreak:getComputedStyle(q('.cta2'),'::before').display,navTopStreak:getComputedStyle(q('.nav .btn'),'::before').content,cards:q('.ring').children.length,intro:document.documentElement.classList.contains('intro'),animations:document.getAnimations().filter(a=>a.id.startsWith('intro:')).length,images:[...document.images].every(i=>i.naturalWidth>0),h1:document.querySelectorAll('h1').length};});
 assert.deepEqual(pixel.badge,[250,39,'12px']);assert(pixel.labelLeft>pixel.tileRight);assert.equal(pixel.cards,37);assert.equal(pixel.intro,false);assert.equal(pixel.animations,0);assert(pixel.images);assert.equal(pixel.h1,1);
 const transform=await p.locator('.card').first().evaluate(e=>e.style.transform);await p.waitForTimeout(180);assert.notEqual(await p.locator('.card').first().evaluate(e=>e.style.transform),transform);
 console.log(name+' pixel/rotation passed');const sizes=[];
 for(const [w,h] of [[1440,900],[820,1180],[375,812],[320,740],[700,800],[701,800],[1080,800],[1081,800],[2560,1440]]){
  await p.setViewportSize({width:w,height:h});await p.waitForTimeout(70);
  const v=await p.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth,heading:document.querySelector('#h1a').getBoundingClientRect().toJSON(),grid:getComputedStyle(document.querySelector('.pggrid')).gridTemplateColumns}));assert.equal(v.w,v.scroll);sizes.push(v);
  if(w<=1080){const burger=p.locator('.burger');await burger.click();assert.equal(await burger.getAttribute('aria-expanded'),'true');await p.keyboard.press('Escape');assert.equal(await burger.getAttribute('aria-expanded'),'false');assert(await burger.evaluate(e=>e===document.activeElement));await burger.click();await p.locator('#links a').first().click();assert.equal(await burger.getAttribute('aria-expanded'),'false');await burger.click();await p.mouse.click(5, h-5);assert.equal(await burger.getAttribute('aria-expanded'),'false');}
 }
 await p.setViewportSize({width:375,height:812});
 assert.equal(await p.locator('#h1a').evaluate(e=>e.style.transform),'');
 console.log(name+' menu/sizes passed');await p.emulateMedia({reducedMotion:'reduce'});await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(600);
 const before=await p.locator('.card').first().evaluate(e=>e.style.transform);await p.waitForTimeout(180);assert.equal(await p.locator('.card').first().evaluate(e=>e.style.transform),before);
 assert.equal(await p.locator('html').evaluate(e=>e.classList.contains('intro')),false);
 const pulse=await p.locator('.wa').evaluate(e=>getComputedStyle(e,'::after').animationName);assert.equal(pulse,'none');
 await p.screenshot({path:path.join(dir,name+'-reduced-375.png')});
 // Exercise the same registered error listener as a failed image request.
 await p.locator('.card img').first().dispatchEvent('error');assert(await p.locator('.card').first().evaluate(e=>e.classList.contains('broken')));
 assert.equal(errors.length,0);
 console.log(name+' all passed');const report={browser:name,version:b.version(),errors,network,pixel,sizes,menu:'Escape + focus, link, outside click: PASS',resizeReset:'PASS',rotation:'PASS',reducedMotion:'ring frozen, pulse off, intro skipped: PASS',imageFallback:'PASS'};
 await b.close();return report;
}
(async()=>{const all=await Promise.allSettled([run('Chromium'),run('Edge','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'),run('CocCoc','C:/Program Files/CocCoc/Browser/Application/browser.exe')]);fs.writeFileSync(path.join(dir,'interaction-checks.json'),JSON.stringify(all,null,2));console.log(JSON.stringify(all.map(x=>x.status==='fulfilled'?{browser:x.value.browser,version:x.value.version,errors:x.value.errors,network:x.value.network,status:'PASS'}:{status:'FAIL',message:String(x.reason)})));process.exit(all.every(x=>x.status==='fulfilled')?0:1);})();

