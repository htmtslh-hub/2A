import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('_design/.browsers');
const {chromium}=await import('../.tooling/node_modules/playwright/index.mjs');
const {default:AxeBuilder}=await import('../.tooling/node_modules/@axe-core/playwright/dist/index.mjs');
const evidence=path.resolve('web/product/giao-dien-web/laila/reviews/1.0.0');
const site=path.resolve('_design/.qa-extracted/laila');
const online=process.argv.includes('--online');
const url=online?'https://forgezone.store/demos/laila/index.html?v=1.0.0':pathToFileURL(path.join(site,'index.html')).href;
const results=[];
for(const [name,launch] of [['edge',{channel:'msedge'}],['coccoc',{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]]){
 const browser=await chromium.launch({headless:true,...launch});
 const record={browser:name,version:browser.version(),url,viewports:[],motion:[],errors:[]};
 for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
  const page=await context.newPage();
  page.on('pageerror',e=>record.errors.push(e.message));
  await page.addInitScript(()=>{localStorage.setItem('motion','off');Element.prototype.animate=undefined});
  await page.goto(url);await page.addStyleTag({content:'*{animation:none!important;transition:none!important}'});
  if(width===1440){for(const wait of [60,150,250,300]){await page.waitForTimeout(wait);record.motion.push(await page.locator('.hero__copy').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform})));}}
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=450){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}});await page.waitForTimeout(700);
  await page.screenshot({path:path.join(evidence,'screenshots',`${online?'online-':''}${name}-${width}.png`),fullPage:true});
  const geometry=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,portraitLoaded:document.images[0].naturalWidth>0}));
  let menu=null;
  if(width<=950){await page.locator('.nav-toggle').click();const open=await page.locator('.nav-toggle').getAttribute('aria-expanded');await page.keyboard.press('Escape');const focusReturn=await page.locator('.nav-toggle').evaluate(e=>e===document.activeElement&&e.getAttribute('aria-expanded')==='false');await page.locator('.nav-toggle').click();await page.locator('nav a[href="#about"]').click();menu={open,focusReturn,linkCloses:await page.locator('.nav-toggle').getAttribute('aria-expanded')==='false'};}
  const project=page.locator('.project').first();await project.locator('summary').focus();await page.keyboard.press('Enter');const enterOpens=await project.getAttribute('open')!==null;await page.keyboard.press('Space');const spaceCloses=await project.getAttribute('open')===null;
  await page.locator('.learning details').first().locator('summary').click();
  const learningOpens=await page.locator('.learning details').first().getAttribute('open')!==null;
  const axe=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}));
  record.viewports.push({width,height,geometry,menu,enterOpens,spaceCloses,learningOpens,axe});
  await context.close();
 }
 const missingContext=await browser.newContext({viewport:{width:320,height:740}});const mp=await missingContext.newPage();await mp.route('**/portrait.webp*',r=>r.abort());await mp.goto(url);await mp.waitForTimeout(750);record.missingPortrait={headingVisible:await mp.locator('h1').isVisible(),contactVisible:await mp.locator('a[href^="mailto:"]').isVisible(),overflow:await mp.evaluate(()=>document.documentElement.scrollWidth>320)};await missingContext.close();
 results.push(record);await browser.close();
}
const bad=results.flatMap(r=>r.viewports.filter(v=>v.geometry.scrollWidth>v.width||!v.geometry.portraitLoaded||v.axe.length||!v.enterOpens||!v.spaceCloses||!v.learningOpens||(v.menu&&(!v.menu.focusReturn||!v.menu.linkCloses))));
await fs.writeFile(path.join(evidence,online?'online-browsers.json':'additional-browsers.json'),JSON.stringify({results,bad},null,2));console.log(JSON.stringify({browserCount:results.length,bad},null,2));if(bad.length)process.exitCode=1;
