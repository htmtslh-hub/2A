// Read-only production readiness. Never logs configuration values or account data.
import { readFileSync } from 'node:fs';
import { parse } from 'dotenv';
import pg from 'pg';
import assert from 'node:assert/strict';
// The CLI may redact all pulled production values. Use the existing local
// production configuration and verify runtime authorization after deployment.
const env = parse(readFileSync(process.argv[2] || '.env'));
const emails = (env.ADMIN_EMAILS || '').split(',').map(v => v.trim().toLowerCase()).filter(Boolean);
assert(emails.length > 0, 'Production administrator allowlist is missing');
assert(env.AUTH_SECRET, 'Production auth secret is missing');
assert.equal(env.ANALYTICS_ENABLED, 'true');
const client = new pg.Client({ connectionString: env.DATABASE_URL_UNPOOLED || env.DATABASE_URL });
await client.connect();
try {
  const migration = await client.query('SELECT finished_at FROM "_prisma_migrations" WHERE migration_name = $1 AND rolled_back_at IS NULL', ['20261006180000_admin_dashboard']);
  assert(migration.rows.some(row => row.finished_at), 'Admin migration has not been applied');
  const count = await client.query('SELECT COUNT(*)::int AS count FROM "User" WHERE LOWER(email) = ANY($1) AND "suspendedAt" IS NULL', [emails]);
  assert(count.rows[0].count > 0, 'No active authorized administrator exists');
  await client.query('SELECT "adminNote" FROM "Order" LIMIT 0');
  await client.query('SELECT "sessionVersion" FROM "User" LIMIT 0');
  console.log('PASS production migration, active configured admin, auth and analytics; no database writes');
} finally { await client.end(); }
