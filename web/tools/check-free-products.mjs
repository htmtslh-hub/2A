import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium}=await import('../../_design/.tooling/node_modules/playwright/index.mjs');
const origin=process.env.STORE_URL||'http://127.0.0.1:4374';
const hash=b=>createHash('sha256').update(b).digest('hex');
const rows=[];
for(const [id,slug] of [['t22','kinetiq'],['t1','japan-trails']]){
  const r=await fetch(`${origin}/api/download?id=${id}`);
  assert.equal(r.status,200);assert.match(r.headers.get('content-type'),/application\/zip/);
  const bytes=Buffer.from(await r.arrayBuffer()),sha256=hash(bytes);
  assert.equal(sha256,hash(readFileSync(`web/product/giao-dien-web/${slug}/${slug}.zip`)));
  rows.push({id,slug,status:r.status,bytes:bytes.length,sha256});
}
assert.equal((await fetch(`${origin}/api/download?id=t31`)).status,401);
const browser=await chromium.launch({headless:true});
try{
  for(const [locale,label,free]of [['vi-VN','Tải miễn phí','Miễn phí'],['en-US','Download free','Free'],['zh-CN','免费下载','免费']]){
    const context=await browser.newContext({locale,viewport:{width:390,height:900}});
    const page=await context.newPage();
    for(const row of rows){
      await page.goto(`${origin}/?mau=${row.id}`);
      const button=page.getByRole('button',{name:label});await button.waitFor();
      assert.equal(await page.locator('.cart-detail-button').count(),0);
      const [download]=await Promise.all([page.waitForEvent('download'),button.click()]);
      assert(download.url().includes(`id=${row.id}`));
      assert.equal(await download.failure(),null);
    }
    await page.goto(`${origin}/?tab=library`);
    for(const row of rows)assert((await page.locator(`a.product-card[href="?mau=${row.id}"]`).innerText()).includes(free));
    await context.close();console.log('PASS anonymous free download + card labels',locale);
  }
}finally{await browser.close();}
mkdirSync('web/reviews/2026-10-15-free-products',{recursive:true});
writeFileSync('web/reviews/2026-10-15-free-products/checks.json',JSON.stringify({origin,browser:'Chromium',rows,premiumAnonymous:401,locales:['vi-VN','en-US','zh-CN']},null,2));
console.log('PASS exact ZIP downloads without account',rows);
