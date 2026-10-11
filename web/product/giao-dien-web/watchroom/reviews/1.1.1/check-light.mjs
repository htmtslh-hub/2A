import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out = resolve('web/product/giao-dien-web/watchroom/reviews/1.1.1');
const report = {};
for (const [name, engine, options] of [
  ['chromium', chromium, {}], ['firefox', firefox, {}],
  ['edge', chromium, { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' }],
  ['coccoc', chromium, { executablePath: 'C:/Program Files/CocCoc/Browser/Application/browser.exe' }],
]) {
  const browser = await engine.launch({ headless: true, ...options });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(pathToFileURL(resolve('web/product/giao-dien-web/watchroom/source/index.html')).href);
  const sample = () => page.locator('.stage__light').evaluate(e => ({
    before: { opacity: getComputedStyle(e, '::before').opacity, transform: getComputedStyle(e, '::before').transform },
    after: { opacity: getComputedStyle(e, '::after').opacity, transform: getComputedStyle(e, '::after').transform },
    states: e.getAnimations({ subtree: true }).map(a => a.playState),
    fallbackOpacity: e.style.getPropertyValue('--glow-opacity'),
  }));
  const data = { version: browser.version(), errors, frames: [] };
  data.frames.push(await sample());
  await page.waitForTimeout(1700);
  data.frames.push(await sample());
  for (const [width, height] of [[1440,900],[820,1180],[375,812],[320,740]]) {
    await page.setViewportSize({ width, height });
    (data.sizes ||= []).push(await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth })));
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator('.motion-toggle').click();
  data.paused = await sample();
  await page.waitForTimeout(400);
  data.pausedLater = await sample();
  await page.locator('.motion-toggle').click();
  data.resumed = await sample();
  await page.locator('[data-step="1"]').click();
  await page.waitForTimeout(950);
  data.carousel = await page.locator('h1').textContent();
  await page.reload();
  await page.waitForTimeout(2800);
  if (name === 'edge') await page.screenshot({ path: out + '/screenshots/center-light.png' });
  await page.addStyleTag({ content: '.stage__light::before,.stage__light::after{animation:none!important}' });
  await page.locator('[data-step="1"]').click();
  data.fallbackStart = await sample();
  await page.waitForTimeout(1000);
  data.fallbackMid = await sample();
  await page.waitForTimeout(4000);
  data.fallbackEnd = await sample();
  report[name] = data;
  await browser.close();
}
writeFileSync(out + '/light.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
