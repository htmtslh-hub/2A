/**
 * Generates static WebP previews (<slug>.webp, <slug>-tablet.webp, <slug>-mobile.webp)
 * and records 15s H.264 MP4 preview video via quay-preview.mjs.
 * Usage: node web/tools/agent-motionsites/generate-previews.mjs <slug> [slug2 ...]
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const require = createRequire(import.meta.url);
const sharp = require(path.resolve(root, '_design/.tooling/node_modules/sharp'));
process.env.PLAYWRIGHT_BROWSERS_PATH ??= path.resolve(root, '_design/.browsers');
const { chromium } = await import(pathToFileURL(path.resolve(root, '_design/.tooling/node_modules/playwright/index.mjs')).href);

const slugs = process.argv.slice(2).filter(a => !a.startsWith('--'));
if (!slugs.length) {
  console.error('Usage: node web/tools/agent-motionsites/generate-previews.mjs <slug>');
  process.exit(1);
}

const publicRoot = path.resolve(root, 'web/public');
const previewsDir = path.resolve(publicRoot, 'previews');
fs.mkdirSync(previewsDir, { recursive: true });

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4'
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(new URL(req.url, 'http://local').pathname);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const file = path.resolve(publicRoot, '.' + urlPath);
  if (!file.startsWith(publicRoot) || !fs.existsSync(file)) {
    res.writeHead(404).end('Not found');
    return;
  }
  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(file));
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true });

try {
  for (const slug of slugs) {
    console.log(`[Previews] Capturing responsive WebP stills for ${slug}...`);
    const demoUrl = `${origin}/demos/${slug}/index.html`;

    const targets = [
      { file: `${slug}.webp`, width: 1280, height: 800 },
      { file: `${slug}-tablet.webp`, width: 820, height: 1180 },
      { file: `${slug}-mobile.webp`, width: 375, height: 812 }
    ];

    for (const t of targets) {
      const context = await browser.newContext({ viewport: { width: t.width, height: t.height } });
      const page = await context.newPage();
      await page.goto(demoUrl, { waitUntil: 'load', timeout: 45000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => {
        const v = document.querySelector('video');
        return !v || v.readyState >= 2;
      }, null, { timeout: 30000 }).catch(() => {});
      await page.waitForTimeout(2200);
      const buf = await page.screenshot({ type: 'png' });
      await sharp(buf).webp({ quality: 86 }).toFile(path.resolve(previewsDir, t.file));
      await context.close();
      console.log(`  -> web/public/previews/${t.file} (${t.width}x${t.height})`);
    }
  }
} finally {
  await browser.close();
  server.close();
}

for (const slug of slugs) {
  console.log(`[Previews] Recording 15s MP4 preview via quay-preview.mjs for ${slug}...`);
  execFileSync('node', ['web/product/giao-dien-web/tools/quay-preview.mjs', slug], {
    cwd: root,
    stdio: 'inherit'
  });
}
