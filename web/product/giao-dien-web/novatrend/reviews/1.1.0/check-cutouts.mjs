import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const online = process.argv[2];
const root = resolve('web/product/giao-dien-web/novatrend');
const out = root + '/reviews/1.1.0';
mkdirSync(out + '/screenshots', { recursive: true });
const results = [];
for (const [name, engine, executablePath] of [
  ['chromium', chromium], ['firefox', firefox],
  ['edge', chromium, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],
  ['coccoc', chromium, 'C:/Program Files/CocCoc/Browser/Application/browser.exe']
]) {
  const browser = await engine.launch({ executablePath, headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(online || pathToFileURL(root + '/source/index.html').href);
  await page.waitForFunction(() => document.querySelectorAll('.hero__model-img').length === 2 && Array.from(document.querySelectorAll('.hero__model-img')).every(i => i.complete && i.naturalWidth === 900));
  const dots = page.locator('.hero__dot');
  const models = page.locator('.hero__model-img');
  const opacity = () => models.evaluateAll(imgs => imgs.map(i => Number(getComputedStyle(i).opacity)));
  await dots.nth(1).click();
  await page.waitForTimeout(90);
  const middle = await opacity();
  assert(middle.every(value => value > 0 && value < 1), 'Both subjects must be fading in the middle');
  await page.waitForTimeout(650);
  assert.deepEqual(await opacity(), [0, 1]);
  await dots.nth(1).press('ArrowRight');
  await page.waitForTimeout(700);
  assert.deepEqual(await opacity(), [1, 0]);
  await dots.nth(0).press('ArrowLeft');
  await page.waitForTimeout(700);
  assert.deepEqual(await opacity(), [0, 1]);
  await dots.nth(0).click();
  await page.waitForTimeout(40);
  await dots.nth(1).click();
  await page.waitForTimeout(40);
  await dots.nth(0).click();
  await page.waitForTimeout(700);
  assert.deepEqual(await opacity(), [1, 0]);
  const sizes = [];
  for (const [width, height] of [[1440, 900], [820, 1180], [375, 812], [320, 740]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(120);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), 'Overflow ' + width);
    await page.locator('.hero__visual').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${out}/screenshots/${name}-${online ? 'online-' : ''}${width}.png`, fullPage: width === 320 });
    sizes.push({ width, height, overflow: false });
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator('.hero__visual').scrollIntoViewIfNeeded();
  await dots.nth(1).click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${out}/screenshots/${name}-${online ? 'online-' : ''}casual.png` });
  await page.addStyleTag({ content: '* { animation:none!important; transition:none!important; }' });
  await dots.nth(0).click();
  await page.waitForTimeout(90);
  const fallback = await opacity();
  assert(fallback.every(v => v > 0 && v < 1));
  await page.waitForTimeout(700);
  assert.deepEqual(await opacity(), [1, 0]);
  await page.locator('#open-search-btn').click();
  assert(await page.locator('#search-modal').evaluate(el => el.open));
  await page.keyboard.press('Escape');
  await page.locator('.floating-badge').first().click();
  assert.equal(await page.locator('#cart-count').textContent(), '1');
  assert.deepEqual(errors, []);
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 740 } });
  const staticPage = await nojs.newPage();
  await staticPage.goto(online || pathToFileURL(root + '/source/index.html').href);
  assert.equal(await staticPage.locator('.hero__model-img--active').count(), 1);
  assert(await staticPage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth));
  results.push({ name, version: browser.version(), sizes, middle, fallback, rapidClicks: 'PASS', keyboardBothWraps: 'PASS', searchAndCart: 'PASS', noJS: 'PASS', errors });
  await browser.close();
  console.log(name, 'PASS');
}
const assets = [];
if (online) {
  const base = new URL('.', online).href;
  for (const file of ['index.html', 'assets/css/style.css', 'assets/js/main.js', 'assets/img/hero-fashion.webp', 'assets/img/hero-casual.webp']) {
    const response = await fetch(base + file + '?v=1.1.0');
    assert.equal(response.status, 200);
    const bytes = Buffer.from(await response.arrayBuffer());
    const local = readFileSync(resolve('web/public/demos/novatrend', file));
    const normalize = b => /webp$/.test(file) ? b : Buffer.from(b.toString().replaceAll('\r\n', '\n'));
    const hash = b => createHash('sha256').update(b).digest('hex');
    assert.equal(hash(normalize(bytes)), hash(normalize(local)), file + ' differs');
    assets.push({ file, bytes: bytes.length, sha256: hash(bytes) });
  }
}
writeFileSync(out + (online ? '/online-checks.json' : '/local-checks.json'), JSON.stringify({ results, assets }, null, 2));
