// Offline checks: no live database, mail or payment requests.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
let checks = 0;
function eq(actual, expected) { assert.equal(actual, expected); checks++; }
function load(file, mocks = {}, globals = {}) {
  const exports = {};
  const absolute = path.resolve(root, file);
  const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(code, { exports, require: name => {
    if (name in mocks) return mocks[name];
    if (name.startsWith('.') || name.startsWith('@/')) {
      const target = name.startsWith('@/') ? path.join(root, 'src', name.slice(2)) : path.resolve(path.dirname(absolute), name);
      if (target.endsWith('.json')) return JSON.parse(fs.readFileSync(target, 'utf8'));
      return load(path.relative(root, fs.existsSync(target + '.ts') ? target + '.ts' : target + '.tsx'), mocks, globals);
    }
    return require(name);
  }, URL, URLSearchParams, Request, Response, Date, Intl, console, Buffer, process: { env: { NEXT_PUBLIC_SITE_URL: 'https://shop.example.test', PADDLE_API_KEY: 'test-only' }, cwd: () => root }, ...globals }, { filename: absolute });
  return exports;
}
const policy = load('src/lib/membership-policy.ts');
const catalog = load('src/lib/catalog.ts');
const products = load('src/lib/real-templates.ts').REAL_TEMPLATES;
const productPolicy = load('src/lib/product-policy.ts');
const record = (plan, start, end, status = 'PAID') => ({ id: `${plan}-${start}`, plan, createdAt: new Date(start), startsAt: new Date(start), expiresAt: new Date(end), order: { status } });
async function main() {
  eq(productPolicy.productAccessTier({}), 'premium');
  eq(productPolicy.productAccessTier({ group: 'web' }), 'premium');
  eq(productPolicy.productAccessTier({ group: 'skill-prompt' }), 'premium');
  eq(productPolicy.productAccessTier({ group: 'agent' }), 'individual');
  eq(productPolicy.productAccessTier({ access: 'free' }), 'free');
  const freeIds = ['t1', 't22', 't50', 't53', 't54', 't55', 't56', 't57', 't58', 't59', 't60', 't61', 't62', 't63', 't64', 't65', 't66', 't67', 't68', 't69', 't70', 't71', 't72', 't73', 't74', 't75', 't76', 't77', 't78', 't79', 't80', 't81', 't82', 't83', 't84', 't85', 't86', 't87', 't88', 't89', 't90', 't91', 't92'];
  eq(Object.keys(products).filter(productPolicy.isFreeProduct).sort().join(','), freeIds.join(','));
  for (const id of freeIds) {
    eq(productPolicy.requiresPremium(id), false);
    eq(productPolicy.canBuyIndividually(id), false);
  }
  eq(productPolicy.requiresPremium('unknown'), false);
  eq(policy.membershipName('PRO'), 'Premium');
  eq(catalog.productName('PRO', null, 'en'), 'Premium upgrade · 1 month');
  for (const [start, plan, end] of [
    ['2026-01-31T12:34:56.789Z', 'PRO', '2026-02-28T12:34:56.789Z'],
    ['2028-01-31T00:00:00Z', 'PRO', '2028-02-29T00:00:00.000Z'],
    ['2028-02-29T00:00:00Z', 'ULTRA', '2029-02-28T00:00:00.000Z'],
    ['2026-12-31T00:00:00Z', 'PRO', '2027-01-31T00:00:00.000Z'],
    ['2026-10-11T06:00:00Z', 'ULTRA', '2027-10-11T06:00:00.000Z'],
  ]) eq(policy.membershipExpiry(new Date(start), plan).toISOString(), end);
  const now = new Date('2026-10-11T06:00:00Z');
  const active = record('PRO', '2026-10-01', '2026-11-01');
  eq(policy.activeMembership([active], now), active);
  for (const row of [record('PRO', now, now), record('PRO', '2026-11-01', '2026-12-01'), record('PRO', '2026-10-01', '2026-11-01', 'REFUNDED'), record('ULTRA', '2026-10-01', '2027-10-01', 'PENDING'), record('BUNDLE', '2026-10-01', '2027-10-01')]) eq(policy.activeMembership([row], now), null);
  const ultra = record('ULTRA', '2026-10-01', '2027-10-01');
  eq(policy.activeMembership([active, ultra], now), ultra);
  for (const lang of ['vi', 'en', 'zh']) {
    eq(catalog.providerForLang(lang), 'PADDLE');
    eq(catalog.priceOf('PRO', 'USD'), 2000);
    eq(catalog.priceOf('ULTRA', 'USD'), 20000);
    for (const id of Object.keys(load('src/lib/real-templates.ts').REAL_TEMPLATES)) eq(catalog.priceOf('TEMPLATE', 'USD', id), 2000);
  }
  assert.throws(() => catalog.priceOf('PRO', 'VND')); checks++;

  let session = null, suspended = false, created = [], adapterInput;
  const checkout = load('src/app/api/checkout/route.ts', {
    '@/auth': { auth: async () => session },
    '@/lib/db': { prisma: { user: { findUnique: async () => ({ suspendedAt: suspended ? now : null }) }, order: { create: async ({ data }) => { created.push(data); return { ...data, id: 'order-test' }; }, update: async () => ({}) } } },
    '@/lib/payments': { adapterFor: () => ({ configured: () => true, createCheckout: async input => { adapterInput = input; return { checkoutUrl: 'https://shop.example.test/thanh-toan/paddle?_ptxn=test', reference: 'test' }; } }) },
  });
  const post = data => checkout.POST(new Request('https://shop.example.test/api/checkout', { method: 'POST', body: JSON.stringify({ email: 'buyer@example.test', ...data }) }));
  eq((await post({ kind: 'PRO' })).status, 401);
  eq(created.length, 0);
  session = { user: { id: 'user-1', email: 'buyer@example.test' } };
  eq((await post({ kind: 'ULTRA', email: 'other@example.test' })).status, 401);
  eq((await post({ kind: 'BUNDLE' })).status, 400);
  eq((await post({ kind: 'PRO', provider: 'PAYOS' })).status, 400);
  suspended = true;
  eq((await post({ kind: 'PRO' })).status, 403);
  suspended = false;
  for (const kind of ['PRO', 'ULTRA']) {
    eq((await post({ kind, amount: 1, currency: 'VND' })).status, 200);
    eq(adapterInput.amount, kind === 'PRO' ? 2000 : 20000);
    eq(adapterInput.currency, 'USD');
    eq(created.at(-1).userId, 'user-1');
    eq(created.at(-1).templateId, null);
  }
  const beforeBlocked = created.length;
  for (const id of freeIds) {
    eq((await post({ kind: 'TEMPLATE', templateId: id })).status, 400);
    eq((await post({ kind: 'CART', templateIds: [id] })).status, 400);
  }
  for (const id of Object.keys(products).filter(productPolicy.requiresPremium)) {
    eq((await post({ kind: 'TEMPLATE', templateId: id })).status, 403);
    eq((await post({ kind: 'CART', templateIds: [id] })).status, 403);
  }
  const premiumId = Object.keys(products).find(productPolicy.requiresPremium);
  const agentId = Object.keys(products).find(id => products[id].group === 'agent');
  eq((await post({ kind: 'CART', templateIds: [premiumId, agentId] })).status, 403);
  eq(created.length, beforeBlocked);
  eq((await post({ kind: 'TEMPLATE', templateId: agentId })).status, 200);
  eq(adapterInput.amount, 2000);
  session = null;
  eq((await post({ kind: 'TEMPLATE', templateId: premiumId })).status, 403);
  session = { user: { id: 'user-1', email: 'buyer@example.test' } };

  const orders = new Map(), memberships = [], purchases = [], tokens = [], emails = [];
  const tx = {
    $queryRaw: async () => [],
    order: { updateMany: async ({ where, data }) => {
      const row = orders.get(where.id);
      const match = typeof where.status === 'string' ? row.status === where.status : !where.status.notIn.includes(row.status);
      if (!match) return { count: 0 };
      Object.assign(row, data); return { count: 1 };
    } },
    membership: {
      findFirst: async ({ where }) => memberships.filter(m => m.userId === where.userId && m.plan === where.plan && m.expiresAt > where.expiresAt.gt && orders.get(m.orderId).status === 'PAID').sort((a,b) => b.expiresAt - a.expiresAt)[0] ?? null,
      create: async ({ data }) => { memberships.push(data); return data; },
      deleteMany: async ({ where }) => { for (let i = memberships.length - 1; i >= 0; i--) if (memberships[i].orderId === where.orderId) memberships.splice(i, 1); },
    },
    purchase: { create: async ({ data }) => { purchases.push(data); }, createMany: async ({ data }) => { purchases.push(...data); }, deleteMany: async ({ where }) => { for (let i = purchases.length - 1; i >= 0; i--) if (purchases[i].orderId === where.orderId) purchases.splice(i, 1); } },
    downloadToken: { updateMany: async () => ({ count: 0 }) },
  };
  let queue = Promise.resolve();
  const db = { ...tx, user: { findUnique: async () => ({ id: 'user-1' }) }, orderItem: { findMany: async () => [] }, order: { ...tx.order, update: async ({ where, data }) => Object.assign(orders.get(where.id), data) }, downloadToken: { create: async ({ data }) => { tokens.push(data); } }, $transaction: callback => { const job = queue.then(() => callback(tx)); queue = job.catch(() => {}); return job; } };
  const fulfil = load('src/lib/fulfil.ts', { '@/lib/db': { prisma: db }, '@/lib/mail': { sendMail: async email => emails.push(email), orderPaidEmail: options => options } });
  function order(id, kind, amount) { const row = { id, kind, amount, currency: 'USD', status: 'PENDING', userId: 'user-1', buyerEmail: 'buyer@example.test', lang: 'en', templateId: kind === 'TEMPLATE' ? 't31' : null }; orders.set(id, row); return { ...row }; }
  const first = order('pro-first', 'PRO', 2000);
  const results = await Promise.all([fulfil.fulfilOrder(first, { amount: 2000, currency: 'USD' }, 'https://shop.example.test'), fulfil.fulfilOrder(first, { amount: 2000, currency: 'USD' }, 'https://shop.example.test')]);
  eq(results.filter(result => result === 'ok').length, 1);
  eq(memberships.length, 1); eq(purchases.length, 0); eq(tokens.length, 0); eq(emails.length, 1);
  eq(emails[0].membership, true); eq(emails[0].downloadUrl, 'https://shop.example.test/tai-khoan');
  const previousEnd = memberships[0].expiresAt;
  const renewal = order('pro-renew', 'PRO', 2000);
  eq(await fulfil.fulfilOrder(renewal, { amount: 2000, currency: 'USD' }, 'https://shop.example.test'), 'ok');
  eq(memberships[1].startsAt.getTime(), previousEnd.getTime());
  eq(memberships[1].expiresAt.toISOString(), policy.membershipExpiry(previousEnd, 'PRO').toISOString());
  const annual = order('annual', 'ULTRA', 20000);
  eq(await fulfil.fulfilOrder(annual, { amount: 20000, currency: 'USD' }, 'https://shop.example.test'), 'ok');
  eq(memberships[2].expiresAt.toISOString(), policy.membershipExpiry(memberships[2].startsAt, 'ULTRA').toISOString());
  eq(await fulfil.revokeOrder({ ...orders.get('annual') }), 'ok');
  eq(memberships.some(m => m.orderId === 'annual'), false);
  eq(await fulfil.revokeOrder({ ...orders.get('annual') }), 'not-paid');
  eq(await fulfil.fulfilOrder({ ...orders.get('annual') }, { amount: 20000, currency: 'USD' }, 'https://shop.example.test'), 'already-paid');
  const bad = order('wrong-amount', 'ULTRA', 20000);
  eq(await fulfil.fulfilOrder(bad, { amount: 99, currency: 'USD' }, 'https://shop.example.test'), 'amount-mismatch');
  eq(memberships.length, 2);
  const single = order('single', 'TEMPLATE', 2000);
  eq(await fulfil.fulfilOrder(single, { amount: 2000, currency: 'USD' }, 'https://shop.example.test'), 'ok');
  eq(purchases[0].templateId, 't31'); eq(tokens.length, 1); eq(emails.at(-1).membership, false);
  const bundle = order('legacy', 'BUNDLE', 39900);
  eq(await fulfil.fulfilOrder(bundle, { amount: 39900, currency: 'USD' }, 'https://shop.example.test'), 'ok');
  eq(purchases.at(-1).kind, 'BUNDLE'); eq(purchases.at(-1).templateId, null);

  let accessRows = [active], owned = null, ownedRows = [];
  const access = load('src/lib/memberships.ts', { '@/lib/db': { prisma: { user: { findUnique: async () => ({ suspendedAt: suspended ? now : null }) }, purchase: { findMany: async ({where}) => { eq(where.order.status, 'PAID'); return ownedRows; }, findFirst: async ({ where }) => { eq(where.userId, 'user-1'); eq(where.order.status, 'PAID'); return owned; } }, membership: { findMany: async () => accessRows } } } });
  eq((await access.accessibleProductIds('user-1', now)).includes('t31'), true);
  eq(await access.hasProductAccess('user-1', 't31', now), true);
  accessRows = [record('PRO', '2026-09-11', now)];
  eq(await access.hasProductAccess('user-1', 't31', now), false);
  eq((await access.accessibleProductIds('user-1', now)).length, 0);
  accessRows = [record('ULTRA', '2026-10-01', '2027-10-01', 'REFUNDED')];
  eq(await access.hasProductAccess('user-1', 't31', now), false);
  eq((await access.accessibleProductIds('user-1', now)).length, 0);
  ownedRows = [{kind:'TEMPLATE', templateId:'t31'}];
  eq((await access.accessibleProductIds('user-1', now)).join(','), 't31');
  owned = { kind: 'TEMPLATE' };
  eq(await access.hasProductAccess('user-1', 't31', now), true);
  suspended = true;
  eq(await access.hasProductAccess('user-1', 't31', now), false);
  eq((await access.accessibleProductIds('user-1', now)).length, 0);
  const mail = load('src/lib/mail.ts', { resend: { Resend: class {} } });
  for (const lang of ['vi', 'en', 'zh']) {
    const html = mail.orderPaidEmail({ productName: 'Premium', amountLabel: '$20', downloadUrl: '/tai-khoan', lang, membership: true }).html;
    eq(/7 days|7 ngày|7 天/.test(html), false);
    eq(html.includes('/tai-khoan'), true);
  }
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const css = { __esModule: true, default: new Proxy({}, { get: (_, key) => String(key) }) };
  const Link = { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) };
  const pageMocks = {
    '@/auth': { auth: async () => ({ user: { id: 'user-1', email: 'buyer@example.test' } }) },
    '@/lib/server-lang': { readLang: async () => 'en' },
    '@/lib/admin-access': { isAdminEmail: () => false },
    '@/app/don-hang/actions': { SignOutButton: () => null },
    './actions': { SignOutButton: () => null },
    './profile-editor': { __esModule: true, default: () => null },
    './remove-saved-button': { RemoveSavedButton: () => null },
    './account.module.css': css,
    '@/components/guide/guide.module.css': css,
    'next/link': Link,
    'next/image': { __esModule: true, default: () => null },
    '@/lib/db': { prisma: {
      user: { findUnique: async () => ({ name: 'Buyer', email: 'buyer@example.test', image: null, createdAt: now }) },
      purchase: { findMany: async () => [] }, savedTemplate: { findMany: async () => [] },
      membership: { findMany: async () => accessRows },
    } },
  };
  const current = new Date();
  accessRows = [record('ULTRA', new Date(current.getTime() - 1000), policy.membershipExpiry(current, 'ULTRA'))];
  const accountPage = load('src/app/tai-khoan/page.tsx', pageMocks);
  let markup = renderToStaticMarkup(await accountPage.default());
  eq(markup.includes('Ultra'), true); eq(markup.includes('Download products'), true); eq(markup.includes('Download access until'), true);
  const ordersPage = load('src/app/don-hang/page.tsx', pageMocks);
  markup = renderToStaticMarkup(await ordersPage.default());
  for (const id of Object.keys(load('src/lib/real-templates.ts').REAL_TEMPLATES)) eq(markup.includes(`/api/download?id=${id}`), true);
  accessRows = [record('PRO', new Date(current.getTime() - 10000), new Date(current.getTime() - 1000))];
  markup = renderToStaticMarkup(await accountPage.default());
  eq(markup.includes('Expired'), true); eq(markup.includes('Download products'), false);
  markup = renderToStaticMarkup(await ordersPage.default());
  eq(markup.includes('/api/download?id='), false);
  session = null; suspended = false; owned = null;
  accessRows = [record('ULTRA', new Date(current.getTime() - 1000), policy.membershipExpiry(current, 'ULTRA'))];
  const download = load('src/app/api/download/route.ts', {
    '@/auth': { auth: async () => session },
    '@/lib/memberships': access,
    '@/lib/db': { prisma: { downloadToken: { create: async () => ({}) } } },
    'node:fs': { existsSync: () => true, statSync: () => ({ size: 4 }), createReadStream: () => require('node:stream').Readable.from([Buffer.from('PKxx')]) },
  });
  const get = id => download.GET(new Request(`https://shop.example.test/api/download?id=${id}`));
  for (const id of freeIds) {
    const free = await get(id);
    eq(free.status, 200);
    eq(free.headers.get('Content-Type'), 'application/zip');
    eq(await free.text(), 'PKxx');
  }
  eq((await get('t31')).status, 401);
  session = { user: { id: 'user-1', email: 'buyer@example.test' } };
  let response = await get('t31');
  eq(response.status, 200); eq(response.headers.get('Cache-Control'), 'private, no-store'); eq(await response.text(), 'PKxx');
  accessRows = [record('PRO', new Date(current.getTime() - 10000), new Date(current.getTime() - 1000))];
  eq((await get('t31')).status, 403);
  eq((await get('unknown')).status, 404);
  owned = { kind: 'TEMPLATE' };
  response = await get('t31'); eq(response.status, 200); await response.text();
  suspended = true;
  eq((await get('t31')).status, 403);
  let payload;
  const paddle = load('src/lib/payments/paddle.ts', {}, { fetch: async (_, options) => { payload = JSON.parse(options.body); return { ok: true, json: async () => ({ data: { id: 'test', checkout: { url: 'https://shop.example.test/checkout' } } }) }; } });
  for (const kind of ['PRO', 'ULTRA']) {
    await paddle.paddleAdapter.createCheckout({ orderId: kind, kind, amount: catalog.priceOf(kind, 'USD'), currency: 'USD', productName: kind, buyerEmail: 'buyer@example.test', lang: 'en', baseUrl: 'https://shop.example.test' });
    eq(payload.items[0].price.unit_price.amount, kind === 'PRO' ? '2000' : '20000');
    eq('billing_cycle' in payload.items[0].price, false);
  }
  // Orders created at the former prices still reconcile against their recorded amount.
  const oldPremium = order('legacy-pro-price', 'PRO', 9900);
  eq(await fulfil.fulfilOrder(oldPremium, { amount: 9900, currency: 'USD' }, 'https://shop.example.test'), 'ok');
  console.log(`PASS ${checks} offline membership checks: calendar expiry, prices, authenticated checkout, payment idempotency, renewal, refunds, permanent purchases, access control, mail and one-time Paddle payload.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
