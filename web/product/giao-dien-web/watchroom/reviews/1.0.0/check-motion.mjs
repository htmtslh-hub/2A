import { chromium } from '../../../../../../_design/.tooling/node_modules/playwright/index.mjs';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const out = resolve('web/product/giao-dien-web/watchroom/reviews/1.0.0');
mkdirSync(out + '/screenshots', { recursive: true });
const engines = [['chromium', {}], ['edge', { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' }]];
const coc = ['C:/Users/Lenovo/AppData/Local/CocCoc/Browser/Application/browser.exe', 'C:/Program Files/CocCoc/Browser/Application/browser.exe'].find(existsSync);
if (coc) engines.push(['coccoc', { executablePath: coc }]);
const results = {};
for (const [name, options] of engines) {
  const browser = await chromium.launch({ headless: true, ...options });
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  await context.addInitScript(() => { localStorage.setItem('motion', 'off'); localStorage.setItem('watchroom-motion', 'off'); });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const data = { version: browser.version(), errors, screens: [], frames: [] };
  await page.goto(pathToFileURL(resolve('web/product/giao-dien-web/watchroom/source/index.html')).href);
  await page.waitForTimeout(6500);
  for (const [width, height] of [[1440,900],[820,1180],[375,812],[320,740]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(600);
    const path = `${out}/screenshots/${name}-${width}.png`;
    await page.screenshot({ path, fullPage: true });
    data.screens.push(await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth })));
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const step of [-1, 1, 1, 1, 1, -1]) {
    await page.locator(`[data-step="${step}"]`).click();
    await page.waitForTimeout(170);
    data.frames.push(await page.locator('.watch-wrap').evaluate(e => ({ transform: e.style.transform, opacity: e.style.opacity })));
    await page.waitForTimeout(800);
    data.frames.push({ title: await page.locator('h1').textContent() });
  }
  for (let i = 0; i < 7; i++) await page.locator('[data-step="1"]').click();
  await page.waitForTimeout(1000);
  data.rapidFinal = await page.locator('.watch-wrap').evaluate(e => ({ transform: e.style.transform, opacity: e.style.opacity }));
  await page.locator('[data-save]').click();
  await page.locator('[data-open-saved]').click();
  data.savedCount = await page.locator('.saved-items li').count();
  await page.keyboard.press('Escape');
  data.dialogClosed = !(await page.locator('dialog').evaluate(e => e.open));
  await page.locator('.search input').fill('unknown-product');
  data.emptySearch = await page.locator('.empty-state').isVisible();
  await page.locator('.search input').fill('');
  await page.locator('[data-filter="women"]').click();
  data.womenCount = await page.locator('.product:visible').count();
  await page.locator('.motion-toggle').click();
  data.pause = await page.locator('.motion-toggle').getAttribute('aria-pressed');
  await page.reload();
  data.reloadPause = await page.locator('.motion-toggle').getAttribute('aria-pressed');
  results[name] = data;
  await browser.close();
}
writeFileSync(out + '/motion.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
