// Restore only the previously configured owner allowlist and analytics switch.
// No secret values are read; configuration values are never printed.
import { readFileSync } from 'node:fs';
import { parse } from 'dotenv';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { join } from 'node:path';
const env = parse(readFileSync('.env'));
assert(env.ADMIN_EMAILS?.trim(), 'Existing local owner configuration is missing');
assert.equal(env.ANALYTICS_ENABLED, 'true');
const cli = join(process.env.APPDATA, 'npm/node_modules/vercel/dist/vc.js');
for (const key of ['ADMIN_EMAILS', 'ANALYTICS_ENABLED']) {
  const result = spawnSync(process.execPath, [cli, 'env', 'update', key, 'production', '--yes', '--value', env[key].trim()], { encoding: 'utf8', windowsHide: true });
  assert.equal(result.status, 0, 'Vercel configuration update failed for ' + key);
  console.log((result.stdout + result.stderr).replaceAll(env[key].trim(), '[redacted]').slice(-2500));
  console.log('Updated production configuration: ' + key);
}
