import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('../_design/.browsers');
const { chromium, firefox } = await import('../../_design/.tooling/node_modules/playwright/index.mjs');
const { default: AxeBuilder } = await import('../../_design/.tooling/node_modules/@axe-core/playwright/dist/index.mjs');
const base = 'http://127.0.0.1:4360';
const dir = 'reviews/admin';
await mkdir(dir, { recursive: true });
const checks = [];
const record = (name, detail) => { checks.push({ name, result: 'PASS', detail }); console.log(`PASS ${name}`); };
async function login(page, email = 'admin@example.test') {
  await page.goto(`${base}/admin`);
  await page.getByLabel('Email', { exact: true }).fill(email);
  await page.getByLabel('Mật khẩu', { exact: true }).fill('AdminTestOnly-2026');
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
}
async function loaded(page, title) {
  await page.getByRole('heading', { name: title, exact: true }).waitFor();
  await page.waitForFunction(() => !Array.from(document.querySelectorAll('[role="alert"]')).some(e => e.textContent.trim()));
  await page.getByText(/Đang tải dữ liệu/).waitFor({ state: 'hidden' });
  await page.waitForFunction(() => Array.from(document.querySelectorAll('[data-reveal]')).every(e => !e.style.opacity && !e.style.transform) && Array.from(document.querySelectorAll('[data-chart-line]')).every(e => !e.style.strokeDashoffset));
  assert.deepEqual((await page.getByRole('alert').allTextContents()).filter(s => s.trim()), []);
}
async function snapshot() { return fetch('http://127.0.0.1:55439/snapshot').then(r => r.json()); }
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const pageErrors = []; page.on('pageerror', e => pageErrors.push(e.message));
page.on('response', async r => { if (r.url().endsWith('/api/admin') && r.request().method() === 'PATCH') console.log('Mutation', r.status(), await r.text()); });
try {
  let response = await context.request.get(`${base}/api/admin?section=users`);
  assert.equal(response.status(), 403); assert.equal(response.headers()['cache-control'], 'private, no-store');
  response = await context.request.patch(`${base}/api/admin`, { data: { action: 'user-lock', id: 'test-user-1', locked: true } });
  assert.equal(response.status(), 403); record('Anonymous GET/PATCH denied');
  await login(page); await loaded(page, 'Tổng quan');
  const summaryResponse = await context.request.get(`${base}/api/admin?days=30`);
  assert.equal(summaryResponse.status(), 200);
  const summary = await summaryResponse.json(); const before = await snapshot();
  assert.equal(summary.accounts, before.User.length);
  for (const currency of ['VND', 'USD']) {
    assert.equal(summary.revenue.find(r => r.currency === currency)._sum.amount,
      before.Order.filter(o => o.status === 'PAID' && o.currency === currency).reduce((n, o) => n + o.amount, 0));
  }
  assert.equal(summary.chart.length, 30); assert.equal(summary.views, summary.chart.reduce((n, d) => n + d.views, 0));
  assert.equal(summary.tracking, true); record('Real SQL summary, independent currencies, zero-filled chart');
  const ordersResponse = await context.request.get(`${base}/api/admin?section=orders&days=30`);
  assert.equal(ordersResponse.status(), 200);
  assert.equal((await ordersResponse.json()).rows.find(o => o.id === 'test-order-1').payosOrderCode, '9007199254740994');
  record('BigInt payment reference serialized without precision loss');
  await page.screenshot({ path: `${dir}/overview-desktop.png`, fullPage: true });
  const axe = await new AxeBuilder({ page }).analyze();
  assert.deepEqual(axe.violations.map(v => ({ id: v.id, nodes: v.nodes.length })), []); record('Overview axe accessibility');

  await page.getByRole('button', { name: 'Tài khoản', exact: true }).click(); await loaded(page, 'Tài khoản');
  assert.equal(await page.locator('tbody tr').count(), 20);
  await page.getByRole('button', { name: 'Sau →', exact: true }).click();
  await page.waitForFunction(() => document.querySelectorAll('tbody tr').length === 6);
  assert.equal(await page.locator('tbody tr').count(), 6);
  await page.getByLabel('Tìm tài khoản', { exact: true }).fill('customer1@example.test'); await page.getByRole('button', { name: 'Tìm kiếm', exact: true }).click();
  await page.waitForFunction(() => document.querySelectorAll('tbody tr').length === 1);
  await page.getByRole('button', { name: 'Quản lý customer1@example.test' }).waitFor();
  assert.equal(await page.locator('tbody tr').count(), 1); record('Account pagination and server search');
  await page.getByRole('button', { name: 'Quản lý customer1@example.test' }).click();
  await page.getByLabel('Tên hiển thị').fill('Khách hàng đã cập nhật'); await page.getByRole('button', { name: 'Lưu tên', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  assert.equal((await snapshot()).User.find(u => u.id === 'test-user-1').name, 'Khách hàng đã cập nhật'); record('Account edit persisted and audited');
  response = await context.request.patch(`${base}/api/admin`, { headers: { Origin: 'https://attacker.invalid' }, data: { action: 'user-name', id: 'test-user-1', name: 'Bad' } });
  assert.equal(response.status(), 403);
  response = await context.request.patch(`${base}/api/admin`, { headers: { Origin: base }, data: { action: 'user-lock', id: 'test-user-0', locked: true } });
  assert.equal(response.status(), 409);
  response = await context.request.patch(`${base}/api/admin`, { headers: { Origin: base }, data: { action: 'user-name', id: 'test-user-1', name: '' } });
  assert.equal(response.status(), 400); record('CSRF, self-admin lock, invalid mutation rejected');

  const customerContext = await browser.newContext(); const customer = await customerContext.newPage();
  await login(customer, 'customer1@example.test');
  await customer.getByRole('heading', { name: 'Tài khoản chưa có quyền admin' }).waitFor();
  assert.equal((await customerContext.request.get(`${base}/api/admin?section=orders`)).status(), 403);
  assert.equal((await customerContext.request.patch(`${base}/api/admin`, { headers: { Origin: base }, data: { action: 'order-note', id: 'test-order-0', note: 'Unauthorized' } })).status(), 403);
  assert.equal((await customerContext.request.get(`${base}/api/profile`)).status(), 200); record('Normal account denied admin, ordinary profile preserved');
  await page.getByRole('button', { name: 'Quản lý customer1@example.test' }).click();
  await page.getByRole('checkbox').check(); await page.getByRole('button', { name: 'Khóa tài khoản', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  assert.equal((await customerContext.request.get(`${base}/api/profile`)).status(), 401);
  assert.equal((await customerContext.request.get(`${base}/api/download?token=admin-test-download`)).status(), 403);
  let snap = await snapshot();
  assert.ok(snap.User.find(u => u.id === 'test-user-1').suspendedAt);
  assert.ok(new Date(snap.DownloadToken[0].expiresAt).getTime() <= Date.now());
  assert.equal(snap.Purchase.length, before.Purchase.length); assert.equal(snap.Order.length, before.Order.length);
  record('Lock revokes old JWT/token, retains orders/purchases');
  await page.getByRole('button', { name: 'Quản lý customer1@example.test' }).click();
  await page.getByRole('checkbox').check(); await page.getByRole('button', { name: 'Mở khóa tài khoản', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  assert.equal((await customerContext.request.get(`${base}/api/profile`)).status(), 401);
  await login(customer, 'customer1@example.test'); await customer.getByRole('heading', { name: 'Tài khoản chưa có quyền admin' }).waitFor();
  assert.equal((await customerContext.request.get(`${base}/api/profile`)).status(), 200);
  const downloaded = await customerContext.request.get(`${base}/api/download?id=t11`);
  assert.equal(downloaded.status(), 200); assert.equal(downloaded.headers()['content-type'], 'application/zip');
  record('Unlock restores login and existing purchased ZIP download'); await customerContext.close();

  await page.getByRole('button', { name: 'Đơn hàng', exact: true }).click(); await loaded(page, 'Đơn hàng');
  await page.getByLabel('Trạng thái', { exact: true }).selectOption('PAID');
  await page.waitForFunction(() => Array.from(document.querySelectorAll('tbody tr')).every(r => r.textContent.includes('Đã thanh toán')));
  await page.getByLabel('Cổng thanh toán').selectOption('PADDLE');
  await page.waitForFunction(() => Array.from(document.querySelectorAll('tbody tr')).every(r => r.textContent.includes('PADDLE')));
  await page.getByRole('button', { name: 'Xem đơn test-order-0', exact: true }).click();
  await page.getByLabel('Ghi chú nội bộ').fill('Đã kiểm tra quyền tải'); await page.getByRole('button', { name: 'Lưu ghi chú', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  snap = await snapshot(); assert.equal(snap.Order.find(o => o.id === 'test-order-0').adminNote, 'Đã kiểm tra quyền tải');
  assert.equal(snap.Order.find(o => o.id === 'test-order-0').status, 'PAID');
  assert.equal(snap.AdminAuditLog.length, 4); record('Order provider/status filters, notes and immutable payment state');
  await page.getByRole('button', { name: 'Nhật ký', exact: true }).click(); await loaded(page, 'Nhật ký');
  assert.equal(await page.locator('tbody tr').count(), 4); record('Mutation audit log visible');

  const event = { id: crypto.randomUUID(), sessionId: crypto.randomUUID(), path: '/?mau=t11&token=private-secret', referrer: 'https://google.com/search?q=private', device: 'mobile' };
  const trafficCount = (await snapshot()).PageView.length;
  for (let i = 0; i < 2; i++) assert.equal((await context.request.post(`${base}/api/traffic`, { headers: { Origin: base, 'User-Agent': 'Mozilla/5.0' }, data: event })).status(), 204);
  snap = await snapshot(); assert.equal(snap.PageView.length, trafficCount + 1);
  const saved = snap.PageView.find(p => p.id === event.id); assert.equal(saved.path, '/?mau=t11'); assert.equal(saved.referrer, 'google.com');
  assert.equal((await context.request.post(`${base}/api/traffic`, { headers: { Origin: base, 'User-Agent': 'Mozilla/5.0' }, data: { ...event, id: crypto.randomUUID(), path: '/tai-khoan?token=secret' } })).status(), 400);
  assert.equal((await context.request.post(`${base}/api/traffic`, { headers: { Origin: 'https://attacker.invalid' }, data: event })).status(), 403);
  assert.equal((await context.request.post(`${base}/api/traffic`, { headers: { Origin: base, DNT: '1' }, data: { ...event, id: crypto.randomUUID() } })).status(), 204);
  assert.equal((await snapshot()).PageView.length, trafficCount + 1); record('Telemetry deduplication, query redaction, private-route exclusion, DNT/CSRF');

  const normalAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/154.0.0.0 Safari/537.36';
  const visitorContext = await browser.newContext({ userAgent: normalAgent }); const visitor = await visitorContext.newPage();
  const trafficResponse = visitor.waitForResponse(r => r.url().endsWith('/api/traffic') && r.request().method() === 'POST');
  await visitor.goto(`${base}/?mau=t11&token=do-not-store`);
  assert.equal((await trafficResponse).status(), 204);
  const visitorSession = await visitor.evaluate(() => sessionStorage.getItem('forge-traffic-session'));
  assert.ok(visitorSession);
  await visitor.goto(`${base}/tai-khoan`); await visitor.waitForTimeout(450);
  const visitorViews = (await snapshot()).PageView.filter(v => v.sessionId === visitorSession);
  assert.equal(visitorViews.length, 1); assert.equal(visitorViews[0].path, '/?mau=t11'); await visitorContext.close();
  const privateContext = await browser.newContext({ userAgent: normalAgent, extraHTTPHeaders: { DNT: '1' } });
  await privateContext.addInitScript(() => Object.defineProperty(navigator, 'doNotTrack', { get: () => '1' }));
  const privatePage = await privateContext.newPage(); const beforePrivate = (await snapshot()).PageView.length;
  await privatePage.goto(base); await privatePage.waitForTimeout(450);
  assert.equal((await snapshot()).PageView.length, beforePrivate); await privateContext.close();
  record('Storefront tracker integration and client-side DNT exclusion');
  const burstSession = crypto.randomUUID();
  for (let i = 0; i < 30; i++) assert.equal((await context.request.post(`${base}/api/traffic`, { headers: { Origin: base, 'User-Agent': normalAgent }, data: { ...event, id: crypto.randomUUID(), sessionId: burstSession } })).status(), 204);
  assert.equal((await context.request.post(`${base}/api/traffic`, { headers: { Origin: base, 'User-Agent': normalAgent }, data: { ...event, id: crypto.randomUUID(), sessionId: burstSession } })).status(), 429);
  record('Telemetry per-session burst bound');

  await page.getByRole('button', { name: 'Tổng quan', exact: true }).click(); await loaded(page, 'Tổng quan');
  await page.route('**/api/admin?**', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Test unavailable' }) }));
  await page.getByRole('button', { name: '↻ Làm mới', exact: true }).click(); await page.getByRole('heading', { name: 'Không thể tải dữ liệu' }).waitFor();
  await page.unroute('**/api/admin?**'); await page.getByRole('button', { name: 'Thử lại', exact: true }).click(); await loaded(page, 'Tổng quan'); record('Failure/retry state');
  const browserSpecs = [
    ['Chromium', chromium, null, 375], ['Firefox', firefox, null, 820],
    ['Edge', chromium, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 1440],
    ['CocCoc', chromium, 'C:/Program Files/CocCoc/Browser/Application/browser.exe', 320],
  ];
  for (const [name, engine, executablePath, width] of browserSpecs) {
    const b = await engine.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
    const c = await b.newContext({ viewport: { width, height: 900 } }); const p = await c.newPage();
    await login(p); await loaded(p, 'Tổng quan');
    assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await p.getByRole('button', { name: 'Tài khoản', exact: true }).click(); await loaded(p, 'Tài khoản');
    await p.getByLabel('Tìm tài khoản', { exact: true }).fill('customer1@example.test'); await p.getByRole('button', { name: 'Tìm kiếm', exact: true }).click();
    await p.waitForFunction(() => document.querySelectorAll('tbody tr').length === 1);
    await p.getByRole('button', { name: 'Quản lý customer1@example.test' }).click();
    await p.getByRole('dialog').waitFor(); await p.keyboard.press('Escape'); await p.getByRole('dialog').waitFor({ state: 'hidden' });
    assert.equal(await p.getByRole('button', { name: 'Quản lý customer1@example.test' }).evaluate(e => e === document.activeElement), true);
    await p.getByRole('button', { name: 'Truy cập', exact: true }).click(); await loaded(p, 'Truy cập');
    await p.getByLabel('Khoảng thời gian').selectOption('7');
    await p.getByText(/\/ 7 ngày/).waitFor();
    await loaded(p, 'Truy cập');
    assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await p.screenshot({ path: `${dir}/${name.toLowerCase()}-${width}.png`, fullPage: true });
    const accessibility = await new AxeBuilder({ page: p }).analyze(); assert.deepEqual(accessibility.violations.map(v => v.id), []);
    record(`${name} ${b.version()} ${width}px: navigation, modal focus, filters, layout, axe`);
    await b.close();
  }
  assert.deepEqual(pageErrors, []); record('No client runtime errors');
  await writeFile(`${dir}/checks.json`, JSON.stringify({ checkedAt: new Date().toISOString(), environment: 'Isolated PGlite PostgreSQL, production Next build, test fixtures only', checks }, null, 2));
} finally { await browser.close(); }
