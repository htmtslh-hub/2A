import {chromium} from '../../../../../../_design/.tooling/node_modules/playwright/index.mjs';
import AxeBuilder from '../../../../../../_design/.tooling/node_modules/@axe-core/playwright/dist/index.mjs';
import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve('web/product/giao-dien-web/puro-amor/reviews/1.0.0');
const browser=await chromium.launch();const context=await browser.newContext();const page=await context.newPage();await page.goto('http://127.0.0.1:4319');await page.waitForTimeout(1300);
await page.locator('.manifesto-trigger').click();
await page.locator('#manifesto-title').waitFor({state:'visible'});await page.screenshot({path:resolve(root,'screenshots/manifesto-open.png')});await page.keyboard.press('Escape');
const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
const report={axe:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))};
await page.reload();await page.keyboard.press('Tab');report.skipFocus=await page.evaluate(()=>document.activeElement.className);await page.keyboard.press('Enter');report.skipTarget=await page.evaluate(()=>document.activeElement.id);
await page.setViewportSize({width:720,height:450});report.zoomEquivalent=await page.evaluate(()=>({width:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
await page.setViewportSize({width:375,height:812});await page.locator('.menu-toggle').click();await page.locator('#navigation a[href="#cafe"]').click();report.menuLinkCloses=await page.locator('.menu-toggle').getAttribute('aria-expanded');await page.locator('.menu-toggle').click();await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(100);report.resizeClearsMenu=await page.locator('.menu-toggle').getAttribute('aria-expanded');
await page.context().setOffline(true);await page.goto(new URL('../../source/index.html',import.meta.url).href);await page.waitForTimeout(1200);report.offlineTitle=await page.title();await page.context().setOffline(false);
writeFileSync(resolve(root,'supplemental.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser.close();

