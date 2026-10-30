#!/usr/bin/env node
/**
 * Đồng bộ các gói sản phẩm (.zip) lên Google Drive theo Phương án A (Hybrid):
 * - Mẫu Miễn phí (access === 'free'): đưa lên thư mục `ForgeZone-Free-Products` (chia sẻ công khai `anyone` -> `reader`).
 * - Mẫu Premium / Mua lẻ: đưa lên thư mục `ForgeZone-Premium-Products` (thư mục Private).
 * - Ghi toàn bộ `fileId`, `tier`, `sizeBytes`, `sha256` vào `web/src/lib/drive-manifest.json`.
 *
 * Cách dùng:
 *   node web/tools/sync-gdrive.mjs                # Đồng bộ tất cả sản phẩm mới hoặc thay đổi
 *   node web/tools/sync-gdrive.mjs --slug auralis # Đồng bộ 1 sản phẩm cụ thể
 *   node web/tools/sync-gdrive.mjs --dry-run      # Kiểm tra danh sách sẽ đồng bộ mà không gọi Drive
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(WEB_ROOT, '..');
const MANIFEST_PATH = path.join(WEB_ROOT, 'src', 'lib', 'drive-manifest.json');

const require = createRequire(import.meta.url);
const esbuild = require(path.resolve(REPO_ROOT, '_design/.tooling/node_modules/esbuild'));

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const force = args.includes('--force');
const slugIdx = args.indexOf('--slug');
const onlySlug = slugIdx >= 0 ? args[slugIdx + 1] : null;

function resolveGdriveBin() {
  const appData = process.env.ANTIGRAVITY_APP_DATA_DIR || path.join(os.homedir(), '.gemini', 'antigravity');
  const binDir = path.join(appData, 'plugin_data', 'gdrive', 'bin');
  if (fs.existsSync(binDir)) {
    const exe = fs.readdirSync(binDir).find((f) => f.startsWith('gdrive-') && f.endsWith('.exe'));
    if (exe) return path.join(binDir, exe);
  }
  return 'gdrive';
}

const GDRIVE_BIN = resolveGdriveBin();

function loadCatalog() {
  const result = esbuild.buildSync({
    entryPoints: [path.join(WEB_ROOT, 'src/lib/real-templates.ts')],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    write: false,
  });
  const mod = { exports: {} };
  new Function('module', 'exports', result.outputFiles[0].text)(mod, mod.exports);
  return mod.exports.REAL_TEMPLATES;
}

function runGdriveSync(cmdArgs) {
  return execFileSync(GDRIVE_BIN, cmdArgs, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

async function runGdriveAsync(cmdArgs) {
  const { stdout } = await execFileAsync(GDRIVE_BIN, cmdArgs, {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
  return stdout.trim();
}

function sha256File(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function extractId(rawOutput) {
  if (!rawOutput) return '';
  if (typeof rawOutput === 'string') {
    const m = rawOutput.match(/\(ID:\s*([A-Za-z0-9_-]+)\)/i);
    if (m) return m[1];
    try {
      const parsed = JSON.parse(rawOutput);
      return extractId(parsed);
    } catch {
      return '';
    }
  }
  if (typeof rawOutput.id === 'string') return rawOutput.id;
  if (typeof rawOutput.fileId === 'string') return rawOutput.fileId;
  if (rawOutput.file && typeof rawOutput.file.id === 'string') return rawOutput.file.id;
  if (Array.isArray(rawOutput.files) && rawOutput.files[0]?.id) return rawOutput.files[0].id;
  return '';
}

function ensureFolder(folderName, existingId, isPublic) {
  if (existingId) return existingId;
  console.log(`[sync-gdrive] Đang tạo thư mục Google Drive: ${folderName}...`);
  const created = runGdriveSync(['mutate', 'mkdir', folderName]);
  const folderId = extractId(created);
  if (!folderId) {
    throw new Error(`Không lấy được folderId sau khi tạo ${folderName}: ${created}`);
  }
  if (isPublic) {
    console.log(`[sync-gdrive] Mở quyền xem công khai (anyone -> reader) cho thư mục Free: ${folderId}`);
    runGdriveSync(['mutate', 'share', folderId, '--type', 'anyone', '--role', 'reader', '--ignore-sharing-checks']);
  }
  return folderId;
}

async function main() {
  const catalog = loadCatalog();
  const manifest = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
    : { freeFolderId: '', premiumFolderId: '', updatedAt: null, files: {} };

  manifest.files ||= {};

  // Gom danh sách sản phẩm theo slug duy nhất (kể cả mẫu dùng thử free-sample)
  const itemsBySlug = new Map();
  const freeSampleZip = path.join(WEB_ROOT, 'product', 'giao-dien-web', 'free-sample', 'free-sample.zip');
  if (fs.existsSync(freeSampleZip) && (!onlySlug || onlySlug === 'free-sample')) {
    itemsBySlug.set('free-sample', {
      id: 'free-sample',
      slug: 'free-sample',
      tier: 'free',
      zipPath: freeSampleZip,
    });
  }

  for (const [id, tpl] of Object.entries(catalog)) {
    if (tpl.previewOnly) continue;
    const slug = tpl.slug;
    if (onlySlug && slug !== onlySlug && id !== onlySlug) continue;

    const zipPath =
      tpl.group === 'agent'
        ? path.join(WEB_ROOT, 'product', 'agent', slug, `${slug}.zip`)
        : path.join(WEB_ROOT, 'product', 'giao-dien-web', slug, `${slug}.zip`);

    if (!fs.existsSync(zipPath)) continue;

    const tier = tpl.access === 'free' ? 'free' : tpl.group === 'agent' ? 'individual' : 'premium';
    itemsBySlug.set(slug, { id, slug, tier, zipPath });
  }

  console.log(`[sync-gdrive] Tìm thấy ${itemsBySlug.size} gói .zip cần kiểm tra.`);

  if (dryRun) {
    let freeCount = 0;
    let paidCount = 0;
    for (const item of itemsBySlug.values()) {
      if (item.tier === 'free') freeCount++;
      else paidCount++;
    }
    console.log(`[sync-gdrive] Dry-run hoàn tất: ${freeCount} gói Free, ${paidCount} gói Premium/Individual.`);
    return;
  }

  manifest.freeFolderId = ensureFolder('ForgeZone-Free-Products', manifest.freeFolderId, true);
  manifest.premiumFolderId = ensureFolder('ForgeZone-Premium-Products', manifest.premiumFolderId, false);
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  const toUpload = [];
  let skipped = 0;

  for (const item of itemsBySlug.values()) {
    const stat = fs.statSync(item.zipPath);
    const sha256 = sha256File(item.zipPath);
    const prev = manifest.files[item.slug];

    if (!force && prev?.fileId && prev.sha256 === sha256 && prev.tier === item.tier) {
      skipped++;
      continue;
    }
    toUpload.push({ ...item, sizeBytes: stat.size, sha256, prevFileId: prev?.fileId || '' });
  }

  console.log(`[sync-gdrive] Cần tải lên/cập nhật: ${toUpload.length} gói (giữ nguyên: ${skipped} gói).`);

  const concurrency = 8;
  let uploaded = 0;
  let cursor = 0;

  async function worker() {
    while (cursor < toUpload.length) {
      const idx = cursor++;
      const item = toUpload[idx];
      const parentFolderId = item.tier === 'free' ? manifest.freeFolderId : manifest.premiumFolderId;
      let fileId = item.prevFileId;

      if (fileId) {
        console.log(`[sync-gdrive] [${idx + 1}/${toUpload.length}] Cập nhật (${item.tier}): ${item.slug}.zip...`);
        const updated = await runGdriveAsync(['mutate', 'update', fileId, item.zipPath]);
        fileId = extractId(updated) || fileId;
      } else {
        console.log(`[sync-gdrive] [${idx + 1}/${toUpload.length}] Tải lên (${item.tier}): ${item.slug}.zip...`);
        const res = await runGdriveAsync(['mutate', 'upload', item.zipPath, '--parent', parentFolderId]);
        fileId = extractId(res);
        if (!fileId) {
          throw new Error(`Không lấy được fileId cho ${item.slug}: ${res}`);
        }
      }

      manifest.files[item.slug] = {
        fileId,
        tier: item.tier,
        publicUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
        webViewUrl: `https://drive.google.com/file/d/${fileId}/view`,
        sizeBytes: item.sizeBytes,
        sha256: item.sha256,
        updatedAt: new Date().toISOString(),
      };
      manifest.updatedAt = new Date().toISOString();
      uploaded++;

      if (uploaded % 8 === 0 || uploaded === toUpload.length) {
        fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, toUpload.length) }, () => worker()));
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  console.log(`[sync-gdrive] Hoàn tất: Đã tải lên/cập nhật ${uploaded} gói, giữ nguyên ${skipped} gói.`);
}

main().catch((err) => {
  console.error('[sync-gdrive] Lỗi:', err.message || err);
  process.exit(1);
});
