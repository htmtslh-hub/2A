import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium } = await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const base = process.argv[2] || 'https://forgezone.store';
const releaseRoot = process.argv[3] || '.';
const result = { base, date: new Date().toISOString(), resources: [], browsers: {} };
const hash = data => createHash('sha256').update(data).digest('hex');
for (const file of ['index.html','assets/css/style.css','assets/js/main.js','assets/img/quantum-adg.webp','assets/img/onyx-gmt.webp','assets/img/solaris-38.webp']) {
  const response = await fetch(base + '/demos/watchroom/' + file + '?v=1.2.0');
  assert.equal(response.status, 200);
  const onlineHash = hash(Buffer.from(await response.arrayBuffer()));
  const localHash = hash(readFileSync(resolve(releaseRoot, 'web/public/demos/watchroom/' + file)));
  assert.equal(onlineHash, localHash, file + ' served version');
  result.resources.push({ file, status: response.status, sha256: onlineHash });
}
for (const [name, options] of [
  ['chromium', {}],
  ['edge', { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' }],
  ['coccoc', { executablePath: 'C:/Program Files/CocCoc/Browser/Application/browser.exe' }],
]) {
  const browser = await chromium.launch({ headless: true, ...options });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + '/demos/watchroom/?v=1.2.0');
  await page.waitForFunction(() => document.documentElement.classList.contains('js'));
  const mid = await page.evaluate(() => new Promise(resolve => {
    const samples = [];
    const start = performance.now();
    document.querySelector('[data-step="1"]').click();
    function sample(now) {
      const e = document.querySelector('[data-watch="1"]');
      samples.push({ elapsed: now - start, opacity: +e.style.opacity, transform: e.style.transform });
      if (now - start < 650) requestAnimationFrame(sample);
      else resolve(samples);
    }
    requestAnimationFrame(sample);
  }));
  if (!mid.some(frame => frame.opacity > 0 && frame.opacity < 1)) console.log(name, errors, mid, await page.locator('h1').textContent());
  assert(mid.some(frame => frame.opacity > 0 && frame.opacity < 1), name + ' intermediate frames');
  await page.waitForTimeout(1100);
  const title = await page.locator('h1').textContent(); assert.equal(title, 'ONYX GMT');
  await page.locator('.motion-toggle').click();
  assert.equal(await page.locator('.motion-toggle').getAttribute('aria-pressed'), 'true');
  await page.setViewportSize({ width: 375, height: 812 });
  const width = await page.evaluate(() => ({ client: innerWidth, scroll: document.documentElement.scrollWidth }));
  assert.equal(width.client, width.scroll); assert.equal(errors.length, 0);
  result.browsers[name] = { version: browser.version(), mid, title, width, errors };
  await browser.close();
}
for (const path of ['/', '/demos/crimson-folio/', '/demos/diginest/', '/previews/watchroom.webp']) {
  const response = await fetch(base + path);
  result.resources.push({ file: path, status: response.status }); assert.equal(response.status, 200);
}
writeFileSync('web/product/giao-dien-web/watchroom/reviews/1.2.0/deployment.json', JSON.stringify(result, null, 2));
console.log('Production assets and animation PASS', base);
