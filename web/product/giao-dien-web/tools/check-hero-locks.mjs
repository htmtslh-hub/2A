/* Read-only browser checks: no accounts, orders, checkout or downloads. */
import { resolve } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../_design/.tooling/node_modules/playwright/index.mjs');
const origin = process.argv[2] || 'http://127.0.0.1:3007';
const requestedEngine = process.argv[3];
const output = resolve('web/product/giao-dien-web/reviews/hero-locks');
mkdirSync(output, { recursive: true });
const report = { origin, date: new Date().toISOString(), cases: [], errors: [], failures: [] };
const widths = [1440, 820, 375, 320];
const labels = { vi: ['Sắp ra mắt', 'Sản Phẩm Mới'], en: ['Coming soon', 'New Product'], zh: ['即将上线', '新产品'] };
function assert(value, label) { if (!value) report.failures.push(label); }
for (const [name, engine] of [['chromium', chromium], ['firefox', firefox]]) {
  if (requestedEngine && requestedEngine !== name) continue;
  const browser = await engine.launch({ headless: true });
  try {
    for (const lang of ['vi', 'en', 'zh']) for (const width of widths) {
      const key = `${name}/${lang}/${width}`;
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      try {
        await context.addCookies([{ name: 'agentic-lang', value: lang, url: origin }]);
        const page = await context.newPage();
        page.on('pageerror', error => report.errors.push({ key, message: error.message }));
        await page.goto(`${origin}/`, { waitUntil: 'domcontentloaded' });
        const cards = page.locator('[data-hero-card]');
        await page.waitForFunction(() => document.querySelectorAll('[data-hero-card]').length === 5 && document.querySelector('[data-hero-card]')?.style.flexBasis);
        const active = () => page.locator('[data-hero-bg]').evaluateAll(elements => elements.findIndex(el => el.style.opacity === '1'));
        const result = { key, count: await cards.count(), locks: [], next: [], prev: [] };
        assert(result.count === 5, `${key}: five hero cards`);
        assert(await active() === 0, `${key}: initial active card`);
        for (let i = 0; i < 3; i++) assert(await cards.nth(i).locator('svg').count() === 0, `${key}/${i + 1}: available card incorrectly locked`);
        for (const i of [3, 4]) {
          const card = cards.nth(i);
          const text = await card.innerText();
          // Firefox innerText applies CSS text-transform; compare copy case-insensitively.
          assert(text.includes(String(i + 1).padStart(2, '0')) && labels[lang].every(label => text.toLocaleLowerCase().includes(label.toLocaleLowerCase())), `${key}/${i + 1}: coming-soon copy`);
          assert(await card.locator('svg').count() === 1, `${key}/${i + 1}: lock icon missing`);
          await card.dispatchEvent('click');
          assert(await active() === 0, `${key}/${i + 1}: programmatic click selected locked card`);
          await card.hover();
          assert(await active() === 0, `${key}/${i + 1}: hover selected locked card`);
          await card.click();
          assert(await active() === 0, `${key}/${i + 1}: click selected locked card`);
          const bounds = await card.boundingBox();
          assert(bounds && bounds.width >= 46 && bounds.x >= 0 && bounds.x + bounds.width <= width + 1, `${key}/${i + 1}: locked card not reachable`);
          const media = await card.locator('video').evaluate(el => ({ poster: el.poster, src: el.getAttribute('src'), paused: el.paused }));
          assert(media.paused && !media.src, `${key}/${i + 1}: locked video loaded or played`);
          const poster = await page.request.get(media.poster);
          assert(poster.ok(), `${key}/${i + 1}: original poster unavailable`);
          result.locks.push({ number: i + 1, text, bounds, media, posterStatus: poster.status() });
        }
        for (const expected of [1, 2, 0, 1, 2, 0]) {
          await page.getByRole('button', { name: 'Next', exact: true }).click();
          const actual = await active();
          result.next.push(actual);
          assert(actual === expected, `${key}: next expected ${expected}, got ${actual}`);
        }
        for (const expected of [2, 1, 0]) {
          await page.getByRole('button', { name: 'Prev', exact: true }).click();
          const actual = await active();
          result.prev.push(actual);
          assert(actual === expected, `${key}: prev expected ${expected}, got ${actual}`);
        }
        result.pageWidth = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
        assert(result.pageWidth.scrollWidth <= result.pageWidth.clientWidth, `${key}: document horizontal overflow`);
        if (name === 'chromium' && lang === 'vi' && [1440, 375].includes(width)) {
          await page.locator('[data-herostrip]').evaluate(el => { el.scrollLeft = el.scrollWidth; });
          await page.screenshot({ path: resolve(output, `hero-${width}.png`), fullPage: false });
          await page.locator('[data-herostrip]').screenshot({ path: resolve(output, `cards-${width}.png`) });
        }
        report.cases.push(result);
        console.log(`${key}: five cards; two locks; arrows skip locks`);
      } finally { await context.close(); }
    }
  } finally { await browser.close(); }
}
const reportName = `${origin.includes('127.0.0.1') ? 'local' : 'deployment'}-${requestedEngine || 'both'}-checks.json`;
writeFileSync(resolve(output, reportName), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ cases: report.cases.length, errors: report.errors, failures: report.failures }, null, 2));
if (report.failures.length || report.errors.length) process.exitCode = 1;
