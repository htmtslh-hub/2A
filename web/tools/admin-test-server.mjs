// Isolated test database, never reads .env or connects to Neon.
// Install test-only packages in a temporary directory (see docs/admin.md).
import { createRequire } from 'node:module';
import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
const runtime = process.env.ADMIN_TEST_RUNTIME;
if (!runtime) throw new Error('Set ADMIN_TEST_RUNTIME to the temporary test dependency directory.');
const requireTest = createRequire(resolve(runtime, 'package.json'));
const { PGlite } = requireTest('@electric-sql/pglite');
const { PGLiteSocketServer } = requireTest('@electric-sql/pglite-socket');
const requireWeb = createRequire(resolve('package.json'));
const bcrypt = requireWeb('bcryptjs');
const db = await PGlite.create();
for (const folder of (await readdir('prisma/migrations')).filter(n => /^\d/.test(n)).sort()) {
  await db.exec(await readFile(`prisma/migrations/${folder}/migration.sql`, 'utf8'));
}
const hash = await bcrypt.hash('AdminTestOnly-2026', 4);
for (let i = 0; i < 26; i++) {
  await db.query('INSERT INTO "User" (id,name,email,"passwordHash") VALUES ($1,$2,$3,$4)', [`test-user-${i}`, i === 0 ? 'Forge Zone Admin' : `Khách hàng ${i}`, i === 0 ? 'admin@example.test' : `customer${i}@example.test`, hash]);
}
const now = new Date();
for (let i = 0; i < 28; i++) {
  const usd = i % 3 === 0;
  const status = ['PAID', 'PENDING', 'FAILED', 'CANCELLED', 'REFUNDED'][i % 5];
  const time = new Date(now.getTime() - i * 86400000);
  await db.query(`INSERT INTO "Order" (id,provider,status,kind,"templateId",amount,currency,description,"buyerEmail","buyerName","userId","paidAt","createdAt","updatedAt") VALUES ($1,$2,$3,'TEMPLATE','t11',$4,$5,'DigiNest',$6,$7,$8,$9,$10,$10)`, [`test-order-${i}`, usd ? 'PADDLE' : 'PAYOS', status, usd ? 7900 : 1900000, usd ? 'USD' : 'VND', 'customer1@example.test', 'Khách hàng 1', 'test-user-1', status === 'PAID' ? time : null, time]);
  await db.query(`UPDATE "Order" SET "payosOrderCode"=$1, "paddleTxnId"=$2 WHERE id=$3`, [usd ? null : String(9007199254740993n + BigInt(i)), usd ? `txn_test_${i}` : null, `test-order-${i}`]);
  if (status === 'PAID') await db.query(`INSERT INTO "Purchase" (id,"userId","orderId",kind,"templateId") VALUES ($1,'test-user-1',$2,'TEMPLATE','t11')`, [`test-purchase-${i}`, `test-order-${i}`]);
}
await db.query(`INSERT INTO "DownloadToken" (id,token,"userId","templateId","expiresAt") VALUES ('test-download','admin-test-download','test-user-1','t11', NOW() + INTERVAL '1 day')`);
for (let day = 0; day < 30; day++) {
  const count = 6 + (day * 13 % 37);
  for (let j = 0; j < count; j++) {
    await db.query(`INSERT INTO "PageView" (id,"sessionId",path,referrer,device,"createdAt") VALUES ($1,$2,$3,$4,$5,$6)`, [`seed-${day}-${j}`, `seed-session-${day}-${Math.floor(j / 2)}`, ['/', '/?mau=t11', '/?tab=library', '/huong-dan'][j % 4], ['direct', 'google.com', 'facebook.com'][j % 3], ['desktop', 'mobile', 'tablet'][j % 3], new Date(now.getTime() - day * 86400000)]);
  }
}
// A snapshot helper for assertions is restricted to this local fixture process.
const { createServer } = await import('node:http');
const inspect = createServer(async (req, res) => {
  if (req.url !== '/snapshot') { res.writeHead(404).end(); return; }
  const tables = {};
  for (const table of ['User', 'Order', 'Purchase', 'DownloadToken', 'AdminAuditLog', 'PageView']) {
    tables[table] = (await db.query(`SELECT * FROM "${table}"`)).rows;
  }
  res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(tables, (_key, value) => typeof value === 'bigint' ? value.toString() : value));
});
await new Promise(r => inspect.listen(55439, '127.0.0.1', r));
const server = new PGLiteSocketServer({ db, host: '127.0.0.1', port: 55438, maxConnections: 50 });
await server.start();
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '4360', '--hostname', '127.0.0.1'], {
  stdio: 'inherit', windowsHide: true,
  env: { ...process.env, DATABASE_URL: 'postgresql://postgres:postgres@127.0.0.1:55438/postgres?connection_limit=1', DATABASE_URL_UNPOOLED: '',
    AUTH_SECRET: 'isolated-admin-test-secret-not-for-production', AUTH_TRUST_HOST: 'true', ADMIN_EMAILS: 'admin@example.test', ANALYTICS_ENABLED: 'true',
    AUTH_GOOGLE_ID: '', AUTH_GOOGLE_SECRET: '', PAYOS_CLIENT_ID: '', PAYOS_API_KEY: '', PAYOS_CHECKSUM_KEY: '',
    PADDLE_API_KEY: '', PADDLE_WEBHOOK_SECRET: '', NEXT_PUBLIC_SITE_URL: 'http://127.0.0.1:4360', RESEND_API_KEY: '',
  },
});
let closing = false;
async function close() { if (closing) return; closing = true; child.kill(); inspect.close(); await server.stop(); await db.close(); process.exit(0); }
process.on('SIGINT', close); process.on('SIGTERM', close); child.on('exit', close);
console.log('Isolated admin fixture: http://127.0.0.1:4360/admin · admin@example.test / AdminTestOnly-2026');
