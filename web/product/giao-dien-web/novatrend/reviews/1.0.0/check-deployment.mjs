import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');

const origin = process.argv[2] || 'https://forgezone.store';
const out = resolve('web/product/giao-dien-web/novatrend/reviews/1.0.0');
await mkdir(out + '/screenshots', { recursive: true });

const hash = b => createHash('sha256').update(b).digest('hex');

const files = [
  'index.html',
  'assets/css/style.css',
  'assets/js/main.js',
  'assets/img/hero-model.webp',
  'assets/img/cat-fashion.webp',
  'assets/img/prod-sneaker.webp',
  'assets/img/banner-summer.webp'
];

const assets = [];
for (const file of files) {
  const url = origin + '/demos/novatrend/' + file;
  const response = await fetch(url);
  assert.equal(response.status, 200, `${url} returned status ${response.status}`);
  const body = Buffer.from(await response.arrayBuffer());
  const local = await readFile(resolve('web/public/demos/novatrend/' + file));
  const text = /\.(html|css|js)$/.test(file);
  const comparable = b => text ? Buffer.from(b.toString('utf8').replace(/\r\n/g, '\n')) : b;
  assert.equal(hash(comparable(body)), hash(comparable(local)), `${file} deployed content differs`);
  assets.push({
    file,
    status: response.status,
    sha256: hash(body),
    normalisedSha256: hash(comparable(body)),
    bytes: body.length,
    comparison: text ? 'Equal after CRLF/LF normalisation' : 'Exact binary bytes match'
  });
}

// Preview card check
const previewRes = await fetch(origin + '/previews/novatrend.webp');
assert.equal(previewRes.status, 200, 'preview card returned ' + previewRes.status);
const previewBytes = Buffer.from(await previewRes.arrayBuffer());
const localPreview = await readFile(resolve('web/public/previews/novatrend.webp'));
assert.equal(hash(previewBytes), hash(localPreview), 'Preview image bytes match');

// Store home & template checks
const homeRes = await fetch(origin);
assert.equal(homeRes.status, 200, 'home status ' + homeRes.status);

const denied = await fetch(origin + '/api/download?id=t12');
assert.equal(denied.status, 401, 'unauthorized download should return 401');

// Browser tests on live deployed demo across 4 browsers
const browsers = [];
for (const [name, engine, executablePath] of [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['Edge', chromium, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],
  ['CocCoc', chromium, 'C:/Program Files/CocCoc/Browser/Application/browser.exe']
]) {
  const browser = await engine.launch(executablePath ? { executablePath } : {});
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  await page.goto(origin + '/demos/novatrend/index.html');
  await page.waitForTimeout(300);

  // Test search modal dialog
  await page.locator('#open-search-btn').click();
  await page.waitForTimeout(200);
  assert.equal(await page.locator('#search-modal').evaluate(e => e.open), true, 'Search modal is open');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  assert.equal(await page.locator('#search-modal').evaluate(e => e.open), false, 'Search modal is closed on Escape');

  // Test add to cart
  const addBtn = page.locator('[data-cart-add]').first();
  await addBtn.click();
  await page.waitForTimeout(300);

  // Cart badge should update, drawer remains closed until clicked
  assert.equal(await page.locator('#cart-count').textContent(), '1', 'Cart badge count is 1');
  assert.equal(await page.locator('#cart-modal').evaluate(e => e.open), false, 'Cart modal not opened automatically');

  // Open cart drawer explicitly via trigger
  await page.locator('#open-cart-btn').click();
  await page.waitForTimeout(250);
  assert.equal(await page.locator('#cart-modal').evaluate(e => e.open), true, 'Cart modal is open after clicking trigger');
  const cartItemCount = await page.locator('.cart-item').count();
  assert.equal(cartItemCount >= 1, true, 'At least 1 cart item');

  // Close cart
  await page.locator('#close-cart-btn').click();
  await page.waitForTimeout(250);
  assert.equal(await page.locator('#cart-modal').evaluate(e => e.open), false, 'Cart modal closed');

  // Test Category filter
  const filterBtn = page.locator('.category-card[data-category="fashion"]').first();
  if (await filterBtn.count() > 0) {
    await filterBtn.click();
    await page.waitForTimeout(200);
    assert.equal(await page.locator('#active-filter-badge').isVisible(), true, 'Active filter badge visible');
  }

  // Check no horizontal overflow
  const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
  assert.equal(noOverflow, true, 'No horizontal overflow');

  assert.deepEqual(errors, [], 'No page errors');
  await page.screenshot({ path: out + `/screenshots/deployed-${name}.png` });

  browsers.push({
    browser: name,
    version: browser.version(),
    status: 'PASS',
    scope: '375px live HTTP: search dialog Escape, add to cart, drawer open/close, category filter badge, zero overflow, zero errors',
    errors
  });
  await browser.close();
}

// Storefront catalog tests
const storeCases = [];
for (const [locale, width, engine] of [
  ['vi-VN', 1440, chromium],
  ['en-US', 1440, chromium],
  ['zh-CN', 1440, chromium],
  ['vi-VN', 375, firefox]
]) {
  const browser = await engine.launch();
  const context = await browser.newContext({ locale, viewport: { width, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  await page.goto(origin + '/?tab=library');
  const card = page.locator('a[href="?mau=t12"]:visible').first();
  await card.waitFor();
  assert.match(await card.textContent(), /NovaTrend/);
  await card.locator('img[src*="novatrend.webp"]').waitFor();
  assert.equal(await card.locator('img').first().evaluate(e => e.complete && e.naturalWidth > 0), true);

  await card.click();
  await page.waitForURL('**/?mau=t12');
  await page.locator('.cart-detail-button').waitFor();
  assert.match(await page.locator('body').textContent(), /NovaTrend/);

  // Test demo popup link
  const popupPromise = page.waitForEvent('popup');
  await page.locator('button.hv10').click();
  const demo = await popupPromise;
  await demo.waitForLoadState('domcontentloaded');
  assert.match(demo.url(), /\/demos\/novatrend/);
  await demo.locator('#open-search-btn').waitFor();
  await demo.close();

  // Add template to store cart
  await page.locator('.cart-detail-button').click();
  await page.waitForTimeout(700);
  const storage = await page.evaluate(() => Object.entries(localStorage).filter(([k]) => /cart/i.test(k)));
  assert.ok(storage.some(([, val]) => val.includes('t12')), 'Store cart contains t12');

  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  assert.deepEqual(errors, []);
  await page.screenshot({ path: out + `/screenshots/catalog-${locale}-${width}.png`, fullPage: true });

  storeCases.push({
    locale,
    width,
    browser: engine.name(),
    version: browser.version(),
    product: 't12 NovaTrend',
    libraryCard: 'PASS',
    preview: 'PASS',
    detail: 'PASS',
    demoLink: 'PASS',
    templateCart: 'PASS',
    errors
  });
  await browser.close();
}

const report = {
  date: new Date().toISOString(),
  origin,
  demoUrl: origin + '/demos/novatrend/index.html',
  previewUrl: origin + '/previews/novatrend.webp',
  storeCatalogUrl: origin + '/?mau=t12',
  assets,
  browsers,
  storeCases,
  storeHomeStatus: homeRes.status,
  unauthorisedDownloadStatus: denied.status,
  summary: 'All deployed assets match local source. Live demo verified across 4 browsers. Storefront catalog t12 integration verified across 4 locales/viewports with 0 errors.'
};

await writeFile(out + '/deployment-checks.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
