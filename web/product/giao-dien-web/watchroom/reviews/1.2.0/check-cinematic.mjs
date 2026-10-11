import { resolve } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out = resolve('web/product/giao-dien-web/watchroom/reviews/1.2.0');
mkdirSync(out + '/screenshots', { recursive: true });
const report = {};
for (const [name, engine, options] of [
  ['chromium', chromium, {}], ['firefox', firefox, {}],
  ['edge', chromium, { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' }],
  ['coccoc', chromium, { executablePath: 'C:/Program Files/CocCoc/Browser/Application/browser.exe' }],
]) {
  const browser = await engine.launch({ headless: true, ...options });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await context.addInitScript(() => { localStorage.setItem('watchroom-motion', 'off'); });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const url = pathToFileURL(resolve('web/product/giao-dien-web/watchroom/source/index.html')).href;
  await page.goto(url);
  await page.waitForTimeout(5100);
  const data = { version: browser.version(), errors, sizes: [], transitions: [] };
  const sample = () => page.evaluate(() => ({ title: document.querySelector('h1').textContent, tone: document.querySelector('.showroom').dataset.tone, images: [...document.querySelectorAll('[data-watch]')].map(e => ({ index: e.dataset.watch, opacity: +getComputedStyle(e).opacity, x: new DOMMatrix(getComputedStyle(e).transform).m41, active: e.classList.contains('is-active'), visible: getComputedStyle(e).visibility, aria: e.getAttribute('aria-hidden') })) }));
  for (const [width, height] of [[1440,900],[820,1180],[375,812],[320,740]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(300);
    const size = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, loaded: [...document.querySelectorAll('[data-watch]')].every(e => e.complete && e.naturalWidth === 1024) }));
    assert.equal(size.width, size.scrollWidth); assert(size.loaded);
    data.sizes.push(size);
    if (name === 'edge') await page.screenshot({ path: `${out}/screenshots/${name}-${width}.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  let expected = 0;
  for (const step of [-1,1,1,1,1,-1]) {
    const old = expected;
    expected = (expected + step + 3) % 3;
    await page.locator(`[data-step="${step}"]`).click();
    await page.waitForTimeout(450);
    const mid = await sample();
    assert(mid.images[old].x * step < 0, `${name}: outgoing direction`);
    assert(mid.images[expected].x * step > 0, `${name}: incoming direction`);
    assert(mid.images[expected].opacity > 0 && mid.images[expected].opacity < 1);
    if (name === 'edge' && data.transitions.length === 0) await page.screenshot({ path: `${out}/screenshots/transition-mid.png` });
    await page.waitForTimeout(1000);
    const final = await sample();
    assert.equal(final.tone, String(expected));
    assert.equal(final.images.filter(e => e.visible === 'visible').length, 1);
    assert.equal(final.images[expected].opacity, 1);
    data.transitions.push({ step, old, expected, mid, final });
  }
  for (const step of [1,1,-1,1]) { expected = (expected + step + 3) % 3; await page.locator(`[data-step="${step}"]`).click(); await page.waitForTimeout(80); }
  await page.waitForTimeout(1400);
  data.rapid = await sample(); assert.equal(data.rapid.tone, String(expected));
  await page.locator('[data-step="1"]').click();
  expected = (expected + 1) % 3;
  await page.waitForTimeout(180);
  await page.locator('.motion-toggle').click();
  data.pause = await sample(); assert.equal(data.pause.tone, String(expected));
  assert.equal(data.pause.images.filter(e => e.visible === 'visible').length, 1);
  data.lightStates = await page.locator('.stage__light').evaluate(e => e.getAnimations({ subtree: true }).map(a => a.playState));
  assert(data.lightStates.every(s => s === 'paused'));
  await page.locator('.motion-toggle').click();
  await page.addStyleTag({ content: '*{transition:none!important;animation:none!important}' });
  await page.locator('[data-step="1"]').click();
  await page.waitForTimeout(450);
  data.fallbackMid = await sample(); assert(data.fallbackMid.images.some(e => e.opacity > 0 && e.opacity < 1));
  await page.waitForTimeout(1100);
  await page.evaluate(() => scrollTo({ top: 250, behavior: 'instant' }));
  await page.waitForTimeout(350);
  data.scrollTransform = await page.locator('.watch-stack').evaluate(e => e.style.transform);
  assert(!data.scrollTransform.includes('scale(1)'));
  await page.locator('[data-save]').click();
  await page.locator('[data-open-saved]').click();
  data.saved = await page.locator('.saved-items li').count(); assert.equal(data.saved, 1);
  await page.keyboard.press('Escape');
  await page.locator('.search input').fill('nothing-matches');
  assert(await page.locator('.empty-state').isVisible());
  await page.locator('.search input').fill('');
  await page.locator('[data-filter="women"]').click();
  data.women = await page.locator('.product:visible').count(); assert.equal(data.women, 1);
  await page.reload();
  assert.equal(await page.locator('.motion-toggle').getAttribute('aria-pressed'), 'false');
  assert.equal(errors.length, 0);
  const staticPage = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  await staticPage.goto(url);
  data.noJS = await staticPage.locator('h1').isVisible(); assert(data.noJS);
  report[name] = data;
  console.log(name + ' PASS ' + browser.version());
  await browser.close();
}
writeFileSync(out + '/cinematic.json', JSON.stringify(report, null, 2));
