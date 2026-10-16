const fs = require('node:fs'), path = require('node:path');
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve('_design/.browsers');
const {chromium} = require('../../../../../../_design/.tooling/node_modules/playwright');
const luminance = hex => {
  const c=hex.match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  return c[0]*.2126+c[1]*.7152+c[2]*.0722;
};
(async()=>{
  const report={date:new Date().toISOString(),contrast:[],checks:[]};
  for(const [role,fg,bg,min]of [['body','1c1d17','f8f0ea',4.5],['muted','565750','f8f0ea',4.5],['heading','f8f0ea','1c1d17',3],['accent text','b9310c','f8f0ea',4.5],['brush','ff6539','1c1d17',3],['focus','9a290b','f8f0ea',3],['large orange','ef5a28','f8f0ea',3],['panel copy','f0eee7','1c1e15',4.5],['body secondary','454640','f8f0ea',4.5],['CTA hover','f8f0ea','1c1d17',4.5]]){
    const ratio=(Math.max(luminance(fg),luminance(bg))+.05)/(Math.min(luminance(fg),luminance(bg))+.05);
    if(ratio<min)throw Error(role+' contrast '+ratio);
    report.contrast.push({role,fg,bg,min,ratio:+ratio.toFixed(3)});
  }
  const browser=await chromium.launch();
  try{
    const page=await browser.newPage({viewport:{width:720,height:450},deviceScaleFactor:2});
    await page.goto('http://127.0.0.1:4411'); await page.waitForTimeout(1100);
    const dims=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,heading:document.querySelector('h1').getBoundingClientRect().width}));
    if(dims.scrollWidth>dims.width)throw Error('Zoom overflow');
    report.zoom200Equivalent={...dims,method:'720×450 viewport at DPR 2, equivalent layout area to 1440×900 at 200%; not a physical browser zoom command'};
    await page.screenshot({path:path.join(__dirname,'evidence/zoom200-equivalent.png'),fullPage:true});
    await page.setViewportSize({width:820,height:1180});
    await page.locator('.nav-toggle').click(); await page.setViewportSize({width:951,height:900}); await page.waitForTimeout(100);
    if(await page.locator('.nav-toggle').getAttribute('aria-expanded')!=='false')throw Error('Resize ARIA');
    report.checks.push('menu resets on desktop breakpoint');
    await page.setViewportSize({width:375,height:812});
    if(await page.locator('#navigation').isVisible())throw Error('Mobile menu unexpectedly open');
    report.checks.push('menu remains closed on mobile return');
    await page.locator('.nav-toggle').click();
    const focus=await page.locator('.nav-toggle').evaluate(e=>{e.focus();return {outline:getComputedStyle(e).outlineStyle,width:getComputedStyle(e).outlineWidth};});
    report.focus=focus;
    const structure=await page.evaluate(()=>({h1:document.querySelectorAll('h1').length,ids:[...document.querySelectorAll('[id]')].map(e=>e.id),anchors:[...document.querySelectorAll('a[href^="#"]')].map(a=>({href:a.getAttribute('href'),exists:!!document.querySelector(a.getAttribute('href'))}))}));
    if(structure.h1!==1||new Set(structure.ids).size!==structure.ids.length||structure.anchors.some(a=>!a.exists))throw Error('Structure/anchors');
    report.structure=structure;
    const image=await page.evaluate(()=>new Promise(resolve=>{const image=new Image();image.onload=()=>resolve({width:image.naturalWidth,height:image.naturalHeight});image.onerror=()=>resolve(false);image.src='assets/img/headphone-hero.webp';}));
    if(!image)throw Error('Asset failed');report.image=image;
    fs.writeFileSync(path.join(__dirname,'supplement.json'),JSON.stringify(report,null,2));
    console.log('PASS contrast, zoom equivalent, menu resize, anchors and local image.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
