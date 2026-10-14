import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {writeFileSync} from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const report={origin:'https://forgezone.store',views:[],failures:[]};
const browser=await chromium.launch();
for(const[locale,packageText]of[['vi-VN','14 file · 8 bìa WebP tự tạo'],['en-US','14 files · 8 original WebP covers'],['zh-CN','14 个文件 · 8 张原创 WebP 封面']]){
  const context=await browser.newContext({locale});await context.route('**/api/traffic**',r=>r.abort());const page=await context.newPage();
  await page.goto(report.origin+'/?mau=t32');await page.getByText(packageText,{exact:true}).waitFor({state:'visible'});
  for(const[width,height]of[[1440,900],[820,1180],[375,812],[320,740]]){
    await page.setViewportSize({width,height});await page.waitForTimeout(250);
    const geometry=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
    const specs=await page.getByText(packageText,{exact:true}).isVisible();
    if(geometry.scroll>geometry.client||!specs)report.failures.push({locale,width,geometry,specs});
    report.views.push({locale,width,height,geometry,specs});
  }
  await page.screenshot({path:resolve(dirname(fileURLToPath(import.meta.url)),`screenshots/online-detail-${locale}-320.png`),fullPage:true});
  await context.close();
}
await browser.close();writeFileSync(resolve(dirname(fileURLToPath(import.meta.url)),'online-responsive.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report));if(report.failures.length)process.exitCode=1;
