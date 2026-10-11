import {resolve} from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
for(const [name,engine,executablePath]of [['chromium',chromium],['firefox',firefox],['edge',chromium,'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],['coccoc',chromium,'C:/Program Files/CocCoc/Browser/Application/browser.exe']]){
 const browser=await engine.launch({headless:true,...(executablePath?{executablePath}:{})});
 const page=await browser.newPage({viewport:{width:920,height:1288}});await page.goto('http://127.0.0.1:5133');
 await page.waitForTimeout(500);await page.locator('#play').click();await page.waitForFunction(()=>document.querySelector('#audio').currentTime>.1);await page.locator('#seek').fill('105');await page.waitForFunction(()=>document.querySelector('#elapsed').textContent==='01:45');
 await page.screenshot({path:resolve(`web/product/giao-dien-web/music-app/reviews/1.0.0/screenshots/${name}-reference-view.png`)});
 console.log(name,await page.locator('#elapsed').textContent(),await page.locator('#playing-state').textContent());await browser.close();
}
