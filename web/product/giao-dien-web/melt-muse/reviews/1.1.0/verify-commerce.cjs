const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const ts = require('../../../../../../web/node_modules/typescript');
const root = process.argv[2];
if (!root) throw new Error('Pass isolated repository root');
const web = path.join(root, 'web');
function load(file, imports) {
  const code = ts.transpileModule(fs.readFileSync(path.join(web, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const mod = { exports: {} };
  new Function('require', 'module', 'exports', code)(name => imports[name] ?? require(name), mod, mod.exports);
  return mod.exports;
}
const real = load('src/lib/real-templates.ts', {});
const catalog = load('src/lib/catalog.ts', { './real-templates': real });
const guides = load('src/lib/template-guides.ts', {});
assert.equal(real.REAL_TEMPLATES.t17.slug, 'melt-muse');
assert.equal(real.REAL_TEMPLATES.t17.version, '1.1.0');
assert.equal(catalog.templateExists('t17'), true);
assert.equal(catalog.templateFile('t17'), 'melt-muse');
for (const lang of ['vi', 'en', 'zh']) {
  assert.equal(catalog.templateName('t17', lang), 'Melt Muse');
  assert.ok(real.REAL_TEMPLATES.t17.copy[lang].desc.length > 50);
  assert.ok(guides.TEMPLATE_GUIDES['melt-muse'][lang].notes.length > 100);
}
let session = null;
let purchase = null;
let receivedWhere;
class NextResponse extends Response { static json(data, init) { return new Response(JSON.stringify(data), { ...init, headers: { 'Content-Type': 'application/json' } }); } }
process.chdir(web);
const handler = load('src/app/api/download/route.ts', {
  'next/server': { NextResponse },
  '@/lib/db': { prisma: { purchase: { findFirst: async query => { receivedWhere = query.where; return purchase; } } } },
  '@/auth': { auth: async () => session },
  '@/lib/catalog': catalog,
});
async function run() {
  const req = () => new Request('https://example.test/api/download?id=t17');
  assert.equal((await handler.GET(req())).status, 401);
  session = { user: { id: 'isolated-test-user' } };
  assert.equal((await handler.GET(req())).status, 403);
  assert.deepEqual(receivedWhere, { userId: 'isolated-test-user', OR: [{ templateId: 't17' }, { templateId: null }] });
  purchase = { templateId: 't17' };
  const res = await handler.GET(req());
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('content-type'), 'application/zip');
  assert.equal(res.headers.get('cache-control'), 'private, no-store');
  const zip = fs.readFileSync(path.join(web, 'product/giao-dien-web/melt-muse/melt-muse.zip'));
  const delivered = Buffer.from(await res.arrayBuffer());
  assert.deepEqual(delivered, zip);
  purchase = { templateId: null };
  assert.equal((await handler.GET(req())).status, 200);
  const report = { method: 'Actual download handler with isolated auth/purchase fixtures; no database reads or writes', anonymous: 401, unowned: 403, owned: 200, bundle: 200, bytes: zip.length, sha256: crypto.createHash('sha256').update(zip).digest('hex'), catalogLanguages: ['vi','en','zh'], priceVND: catalog.priceOf('TEMPLATE','VND','t17'), priceUSD: catalog.priceOf('TEMPLATE','USD','t17'), tracing: fs.readFileSync(path.join(web,'next.config.ts'),'utf8').includes("'./product/giao-dien-web/*/*.zip'"), livePaidCheckout: 'NOT TESTED', liveEntitledDownload: 'NOT TESTED' };
  fs.writeFileSync(path.join(__dirname, 'commerce-checks.json'), JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
}
run().catch(err => { console.error(err); process.exitCode = 1; });
