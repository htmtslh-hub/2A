// Read-only production verification. Never edits accounts, payments or orders.
import 'dotenv/config';
import assert from 'node:assert/strict';
import pg from 'pg';
import { encode } from 'next-auth/jwt';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('../_design/.browsers');
const {chromium}=await import('../../_design/.tooling/node_modules/playwright/index.mjs');
const email=process.env.ADMIN_CHECK_EMAIL;
assert.ok(email,'Set ADMIN_CHECK_EMAIL to the owner-authorized administrator.');
const base='https://forgezone.store';
const client=new pg.Client({connectionString:process.env.DATABASE_URL_UNPOOLED||process.env.DATABASE_URL});
await client.connect();
try {
  const user=(await client.query('SELECT id,email,name,"sessionVersion","suspendedAt" FROM "User" WHERE LOWER(email)=$1',[email.toLowerCase()])).rows[0];
  assert.ok(user&&!user.suspendedAt);
  const salt='__Secure-authjs.session-token';
  const token=await encode({secret:process.env.AUTH_SECRET,salt,maxAge:600,token:{uid:user.id,sub:user.id,email:user.email,name:user.name,sessionVersion:user.sessionVersion}});
  const headers={Cookie:`${salt}=${token}`};
  assert.equal((await fetch(`${base}/api/admin`)).status,403);
  assert.equal((await fetch(`${base}/api/admin`,{method:'PATCH',headers:{Origin:base,'Content-Type':'application/json'},body:'{}'})).status,403);
  const response=await fetch(`${base}/api/admin?section=overview&days=30`,{headers});
  assert.equal(response.status,200); assert.equal(response.headers.get('cache-control'),'private, no-store');
  const summary=await response.json();
  const accounts=(await client.query('SELECT COUNT(*)::int AS n FROM "User"')).rows[0].n;
  assert.equal(summary.accounts,accounts); assert.equal(summary.tracking,true);
  const orders=await fetch(`${base}/api/admin?section=orders&days=90`,{headers}); assert.equal(orders.status,200);
  const list=await orders.json();
  assert.equal(list.total,(await client.query('SELECT COUNT(*)::int AS n FROM "Order" WHERE "createdAt">=$1',[new Date(new Date().setUTCHours(0,0,0,0)-89*86400000)])).rows[0].n);
  assert.equal((await fetch(`${base}/api/profile`,{headers})).status,200);
  const browsers=[];
  for(const [name,executablePath,width] of [['Edge','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',1440],['CocCoc','C:/Program Files/CocCoc/Browser/Application/browser.exe',375]]) {
    const browser=await chromium.launch({headless:true,executablePath});
    const context=await browser.newContext({viewport:{width,height:1000},userAgent:`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/${browser.version()} Safari/537.36`,reducedMotion:'reduce'});
    await context.addCookies([{name:salt,value:token,domain:'forgezone.store',path:'/',secure:true,httpOnly:true,sameSite:'Lax'}]);
    const page=await context.newPage(); const errors=[]; page.on('pageerror',e=>errors.push(e.message));
    try {
      await page.goto(`${base}/admin`); await page.getByRole('heading',{name:'Tổng quan',exact:true}).waitFor();
      await page.getByText('Tự đồng bộ mỗi 5 giây',{exact:false}).waitFor();
      const firstViews=(await (await context.request.get(`${base}/api/admin?section=overview`)).json()).views;
      const visitor=await context.newPage(); const event=visitor.waitForResponse(r=>r.url().endsWith('/api/traffic')&&r.request().method()==='POST');
      await visitor.goto(base); assert.equal((await event).status(),204);
      await page.waitForFunction(expected=>[...document.querySelectorAll('section')].some(e=>e.querySelector('h2')?.textContent==='Lượt xem trang'&&Number(e.querySelector('[class*="animatedValue"] span')?.textContent.replace(/\D/g,''))>expected),firstViews,{timeout:15000});
      await visitor.close();
      await page.getByRole('button',{name:'Tài khoản',exact:true}).click(); await page.getByRole('heading',{name:'Tài khoản',exact:true}).waitFor();
      await page.getByRole('button',{name:`Quản lý ${email}`}).click(); await page.getByRole('dialog').waitFor();
      await page.keyboard.press('Escape'); await page.getByRole('dialog').waitFor({state:'hidden'});
      await page.getByRole('button',{name:'Tổng quan',exact:true}).click();
      await page.waitForFunction(()=>document.querySelector('[data-chart-line]')&&!document.querySelector('[data-chart-line]').style.strokeDashoffset);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      await page.screenshot({path:`reviews/admin/production-${name.toLowerCase()}.png`,fullPage:true});
      assert.deepEqual(errors,[]);
      browsers.push({browser:name,version:browser.version(),width,result:'PASS',checks:'Authorized page/API, live storefront pageview appears without reload, account dialog/Escape, responsive layout, current production resources, no runtime errors'});
      console.log(`PASS production ${name}: live pageview and admin UI`);
    } finally {await browser.close();}
  }
  await writeFile('reviews/admin/production-checks.json',JSON.stringify({checkedAt:new Date().toISOString(),url:base+'/admin',accounts,orders:list.total,tracking:true,anonymousDenied:true,readOnlyAccountAndOrderChecks:true,browsers},null,2));
} finally {await client.end();}
