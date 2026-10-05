const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('C:/Users/htmts/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const AxeBuilder=require('./.tooling/node_modules/@axe-core/playwright').default;
const sharp=require('C:/Users/htmts/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const url='file:///D:/2A/web/product/giao-dien-web/crimson-folio/source/index.html';
const linear=v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4};
const luminance=c=>c.map(linear).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const colour=s=>s.match(/\d+/g).slice(0,3).map(Number);
(async()=>{
  const browser=await chromium.launch();
  const context=await browser.newContext();
  const page=await context.newPage();
  const results={axe:[],contrast:[],fontIssues:[],headingClips:[],imagesUnchanged:false};
  for(const width of [1440,820,375,320]){
    await page.setViewportSize({width,height:900});
    await page.goto(url);
    const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    results.axe.push({width,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))});
    const fontIssues=await page.evaluate(()=>[...document.querySelectorAll('p,li,h1,h2,h3,a,span')].filter(e=>!e.closest('[aria-hidden="true"],[role="img"],.hero__watermark,.hero__brand-tag,.project__caption,.section-heading,.site-footer,figcaption,.wordmark,.qr-link,.step-badge')&&e.childNodes.length===1&&e.textContent.trim()&&e.offsetWidth>0&&parseFloat(getComputedStyle(e).fontSize)<14).map(e=>({selector:e.className,text:e.textContent,font:getComputedStyle(e).fontSize})));
    results.fontIssues.push({width,issues:fontIssues});
    // Sample the exact backgrounds beneath the hero's cream lettering.
    const targets=await page.evaluate(()=>[...document.querySelectorAll('.hero__discipline span,.hero__designer-title>span:not(.hero__brand-tag)')].map(e=>{const range=document.createRange();range.selectNodeContents(e);const b=range.getBoundingClientRect(),cs=getComputedStyle(e);return {selector:e.className||e.parentElement.className,box:{x:b.x,y:b.y,width:b.width,height:b.height},colour:cs.color}}));
    await page.addStyleTag({content:'.hero__discipline,.hero__discipline *,.hero__designer-title,.hero__designer-title *{color:transparent!important;-webkit-text-stroke-color:transparent!important}'});
    const png=await page.screenshot();
    const {data,info}=await sharp(png).removeAlpha().raw().toBuffer({resolveWithObject:true});
    for(const target of targets){
      let minimum=100;
      const b=target.box;
      for(let y=Math.max(0,Math.ceil(b.y));y<Math.min(info.height,b.y+b.height);y+=3){
        for(let x=Math.max(0,Math.ceil(b.x));x<Math.min(info.width,b.x+b.width);x+=3){
          const index=(y*info.width+x)*3;
          minimum=Math.min(minimum,ratio(colour(target.colour),[data[index],data[index+1],data[index+2]]));
        }
      }
      results.contrast.push({width,target:target.selector,minimumOverEntireTextBox:+minimum.toFixed(2),required:3});
    }
  }
  for(const width of [320,350,375,400,401,450,650,651,720,721,820,821,900,901,1100,1101,1250,1251,1440]){
    await page.setViewportSize({width,height:900});await page.goto(url);
    const state=await page.evaluate(()=>{const e=document.querySelector('.hero__watermark'),r=document.createRange();r.selectNodeContents(e);return {word:r.getBoundingClientRect().width,available:e.parentElement.clientWidth}});
    if(state.word>state.available)results.headingClips.push({width,...state});
  }
  for(const image of ['mira-avatar.webp','mira-portrait.webp']){
    const a=fs.readFileSync(path.resolve(__dirname,'../../source/assets/img',image));
    const b=fs.readFileSync(path.resolve(__dirname,'before-source/assets/img',image));
    if(!a.equals(b))throw new Error('Image changed '+image);
  }
  results.imagesUnchanged=true;
  await page.route('**/*.webp',route=>route.abort());
  await page.setViewportSize({width:320,height:740});await page.goto(url);
  results.missingImages={nav:await page.locator('.menu-toggle').isVisible(),email:await page.locator('.contact__email').textContent(),width:await page.evaluate(()=>document.documentElement.scrollWidth)};
  await page.screenshot({path:path.join(__dirname,'screenshots/missing-images-320.png'),fullPage:true});
  await browser.close();
  fs.writeFileSync(path.join(__dirname,'audit.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
