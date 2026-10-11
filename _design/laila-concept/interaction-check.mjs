import path from 'node:path';
import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('_design/.browsers');
const {chromium}=await import('../.tooling/node_modules/playwright/index.mjs');
const {default:AxeBuilder}=await import('../.tooling/node_modules/@axe-core/playwright/dist/index.mjs');
const results=[];
for(const [name,launch] of [['edge',{channel:'msedge'}],['coccoc',{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]]){
 const browser=await chromium.launch({headless:true,...launch});
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 const page=await context.newPage();
 await page.addInitScript(()=>{localStorage.setItem('motion','off');Element.prototype.animate=undefined;});
 await page.goto(pathToFileURL(path.resolve('_design/laila-concept/index.html')).href);
 await page.addStyleTag({content:'*{animation:none!important;transition:none!important}'});
 const frames=[];
 for(const wait of [60,150,250,300]){await page.waitForTimeout(wait);frames.push(await page.locator('.hero__copy').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform})));}
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 results.push({browser:name,version:browser.version(),motionFrames:frames,violations:axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});
 await browser.close();
}
await fs.writeFile('_design/laila-concept/interaction-checks.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
