import path from 'node:path';
import {pathToFileURL} from 'node:url';
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('_design/.browsers');
const {chromium}=await import('../.tooling/node_modules/playwright/index.mjs');
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1396,height:1047}});
await page.goto(pathToFileURL(path.resolve('_design/.qa-extracted/laila/index.html')).href);await page.waitForTimeout(850);
await page.screenshot({path:'web/product/giao-dien-web/laila/reviews/1.0.0/preview.png'});
await browser.close();
