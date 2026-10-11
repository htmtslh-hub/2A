import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('../_design/.browsers');
const { chromium } = await import('../../_design/.tooling/node_modules/playwright/index.mjs');
const browser = await chromium.launch({ headless: true });
const output = resolve('reviews/2026-10-11-lingoglass');
await mkdir(output, { recursive: true });
let checks = 0;
try {
  const trace = JSON.parse(await readFile('.next/server/app/api/download/route.js.nft.json', 'utf8'));
  assert.ok(trace.files.some(file => file.endsWith('/product/agent/lingoglass/lingoglass.zip'))); checks++;
  for (const locale of ['vi-VN', 'en-US', 'zh-CN']) for (const width of [1440, 390]) {
    const context = await browser.newContext({ locale, viewport: { width, height: 900 } });
    await context.route('**/api/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(route.request().url().includes('/auth/session') ? null : { ids: [], counts: {} }) }));
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4371/?tab=library');
    await page.locator('[data-product-group="agent-tool"]').click();
    const product = page.locator('a[href="?mau=t14"]');
    await product.waitFor();
    assert.equal(await product.count(), 1); checks++;
    assert.match(await product.textContent(), /LingoGlass/); checks++;
    assert.match(await product.textContent(), /20/); checks++;
    assert.equal(await page.locator('a[href="?mau=t23"]').count(), 0); checks++;
    assert.equal(await page.locator('.product-placeholder-card').count(), 0); checks++;
    assert.ok(await product.locator('img').evaluate(image => image.complete && image.naturalWidth > 0)); checks++;
    await page.screenshot({ path: resolve(output, `agent-${locale}-${width}.png`), fullPage: true });
    await product.click();
    await page.waitForURL('**/?mau=t14');
    assert.match(await page.locator('h1').allTextContents().then(text => text.join(' ')), /LingoGlass/); checks++;
    const demo = await context.request.get('http://127.0.0.1:4371/demos/lingoglass/index.html');
    assert.equal(demo.status(), 200); checks++;
    await page.goto('http://127.0.0.1:4371/?tab=library');
    await page.locator('[data-product-group="web"]').click();
    await page.locator('a[href="?mau=t23"]').waitFor();
    assert.equal(await page.locator('a[href="?mau=t14"]').count(), 0); checks++;
    assert.match(await page.locator('a[href="?mau=t23"]').textContent(), /Watchroom/); checks++;
    await context.close();
    console.log(`PASS ${locale}, ${width}px: LingoGlass Agent card, preview, detail, demo and Watchroom isolation.`);
  }
  console.log(`PASS ${checks} restoration checks; Chromium with mocked browser APIs.`);
} finally { await browser.close(); }
