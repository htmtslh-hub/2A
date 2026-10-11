import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import pg from 'pg';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('../_design/.browsers');
const { chromium } = await import('../../_design/.tooling/node_modules/playwright/index.mjs');
const base = 'http://127.0.0.1:4360';
const results = [];
for (const [name, executablePath] of [ ['Edge','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'], ['CocCoc','C:/Program Files/CocCoc/Browser/Application/browser.exe'] ]) {
  const browser = await chromium.launch({ headless:true, executablePath });
  const context = await browser.newContext(); const page = await context.newPage();
  let calls = 0; let fail = false; let denied = false;
  await page.route('**/api/admin?**', async route => {
    calls++;
    if (denied) return route.fulfill({ status:403, json:{error:'Revoked'} });
    if (fail) return route.fulfill({ status:503, json:{error:'Unavailable'} });
    return route.continue();
  });
  try {
    await page.goto(`${base}/admin`);
    await page.getByLabel('Email', {exact:true}).fill('admin@example.test');
    await page.getByLabel('Mật khẩu', {exact:true}).fill('AdminTestOnly-2026');
    await page.getByRole('button', {name:'Đăng nhập',exact:true}).click();
    await page.getByRole('heading', {name:'Tổng quan',exact:true}).waitFor();
    await page.getByText('Tự đồng bộ mỗi 5 giây', {exact:false}).waitFor();
    const original = (await context.request.get(`${base}/api/admin?section=traffic`)).json();
    const summary = await original;
    const event = {id:crypto.randomUUID(),sessionId:crypto.randomUUID(),path:'/?mau=t11',referrer:'',device:'desktop'};
    assert.equal((await context.request.post(`${base}/api/traffic`,{headers:{Origin:base,'User-Agent':'Mozilla/5.0'},data:event})).status(),204);
    await page.waitForFunction(expected => [...document.querySelectorAll('section')].some(e=>e.querySelector('h2')?.textContent==='Lượt xem trang' && e.querySelector('[class*="animatedValue"] span')?.textContent===new Intl.NumberFormat('vi-VN').format(expected)),summary.views+1,{timeout:12000});
    fail = true;
    await page.getByText('Kết nối gián đoạn', {exact:false}).waitFor({timeout:12000});
    assert.equal(await page.getByRole('heading',{name:'Không thể tải dữ liệu'}).count(),0);
    fail = false;
    await context.setOffline(true); await page.getByText('Mất mạng', {exact:false}).waitFor();
    const stoppedCalls = calls; await page.waitForTimeout(5500); assert.equal(calls,stoppedCalls);
    await context.setOffline(false); await page.getByText('Tự đồng bộ mỗi 5 giây', {exact:false}).waitFor();
    await page.getByRole('button',{name:'Tài khoản',exact:true}).click();
    await page.getByLabel('Tìm tài khoản',{exact:true}).fill('customer2@example.test');
    await page.getByRole('button',{name:'Tìm kiếm',exact:true}).click();
    await page.waitForFunction(()=>document.querySelectorAll('tbody tr').length===1);
    const row=await context.request.get(`${base}/api/admin?section=users&q=customer2@example.test`); const user=(await row.json()).rows[0];
    const liveName = `Live ${name} ${Date.now()}`;
    assert.equal((await context.request.patch(`${base}/api/admin`,{headers:{Origin:base},data:{action:'user-name',id:user.id,name:liveName}})).status(),200);
    await page.getByText(liveName,{exact:true}).waitFor({timeout:12000});
    assert.equal(await page.getByLabel('Tìm tài khoản',{exact:true}).inputValue(),'customer2@example.test');
    await page.getByRole('button',{name:'Quản lý customer2@example.test'}).click();
    await page.getByRole('dialog').waitFor();
    await page.waitForTimeout(1000); const modalCalls=calls;
    await page.waitForTimeout(5500); assert.equal(calls,modalCalls);
    await page.keyboard.press('Escape'); await page.getByRole('dialog').waitFor({state:'hidden'});
    await page.getByRole('button',{name:'Đơn hàng',exact:true}).click();
    await page.getByRole('heading',{name:'Đơn hàng',exact:true}).waitFor();
    await page.getByLabel('Tìm đơn hàng',{exact:true}).fill('test-order-1');
    await page.getByRole('button',{name:'Tìm kiếm',exact:true}).click();
    await page.getByRole('button',{name:'Xem đơn test-order-1',exact:true}).waitFor();
    // Simulate a provider status change ONLY on the hardcoded loopback fixture.
    const fixture = new pg.Client({connectionString:'postgresql://postgres:postgres@127.0.0.1:55438/postgres'});
    await fixture.connect();
    const old=(await fixture.query('SELECT status FROM "Order" WHERE id=$1',['test-order-1'])).rows[0].status;
    const next=old==='FAILED'?'CANCELLED':'FAILED';
    try {
      await fixture.query('UPDATE "Order" SET status=$1 WHERE id=$2',[next,'test-order-1']);
      await page.locator('tbody tr').filter({has:page.getByRole('button',{name:'Xem đơn test-order-1',exact:true})}).getByText(next==='FAILED'?'Thất bại':'Đã hủy',{exact:true}).waitFor({timeout:12000});
    } finally {await fixture.query('UPDATE "Order" SET status=$1 WHERE id=$2',[old,'test-order-1']);await fixture.end();}
    await page.evaluate(()=>Object.defineProperty(document,'hidden',{configurable:true,get:()=>true}));
    await page.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));
    const hiddenCalls=calls; await page.waitForTimeout(5500); assert.equal(calls,hiddenCalls);
    await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});document.dispatchEvent(new Event('visibilitychange'));});
    denied=true;
    await page.waitForFunction(()=>document.querySelector('[role="alert"]')?.textContent.includes('hết hiệu lực'),{},{timeout:12000});
    assert.equal(await page.locator('tbody tr').count(),0);
    const revokedCalls=calls; await page.waitForTimeout(5500); assert.equal(calls,revokedCalls);
    results.push({browser:name,version:browser.version(),result:'PASS',checks:'Traffic, cross-client user changes and external order status visible within 5s; filters retained; stale data on transient error; offline/hidden/modal pause; resume; revoked access clears data and stops polling'});
    console.log(`PASS ${name}: live sync, recovery, filters, modal, hidden tab, revocation`);
  } finally { await browser.close(); }
}
await writeFile('reviews/admin/live-checks.json',JSON.stringify({checkedAt:new Date().toISOString(),environment:'Isolated loopback PGlite fixtures only',results},null,2));
