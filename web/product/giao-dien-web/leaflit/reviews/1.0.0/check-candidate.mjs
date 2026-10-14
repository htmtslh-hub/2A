import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const { default: AxeBuilder } = await import('../../../../../../_design/.tooling/node_modules/@axe-core/playwright/dist/index.mjs');
const dir = dirname(fileURLToPath(import.meta.url));
const source = resolve(dir, '../../source');
const url = pathToFileURL(resolve(source, 'index.html')).href;
mkdirSync(resolve(dir, 'screenshots'), { recursive: true });
const results = { date: new Date().toISOString(), source, browsers: {} };
for (const [name, engine] of Object.entries({ chromium, firefox })) {
  const browser = await engine.launch({ headless: true });
  const record = { version: browser.version(), sizes: [], errors: [] };
  for (const [width, height] of [[1440,900],[820,1180],[375,812],[320,740],[822,490]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', error => record.errors.push(error.message));
    await page.goto(url);
    await page.waitForTimeout(450);
    const geometry = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, h1: document.querySelectorAll('h1').length }));
    await page.screenshot({ path: resolve(dir, `screenshots/${name}-${width}.png`), fullPage: true });
    const axe = await new AxeBuilder({ page }).analyze();
    const item = { width, height, geometry, violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) })) };
    if (width <= 650) {
      const button = page.locator('.menu-toggle');
      await button.click();
      item.menuOpen = await button.getAttribute('aria-expanded') === 'true';
      await page.keyboard.press('Escape');
      item.escapeClosed = await button.getAttribute('aria-expanded') === 'false';
      item.focusReturned = await button.evaluate(e => e === document.activeElement);
      await button.click();
      await page.locator('#library-nav a[href="#collections"]').first().click();
      item.linkClosed = await button.getAttribute('aria-expanded') === 'false';
      await page.screenshot({ path: resolve(dir, `screenshots/${name}-${width}-scrolled.png`), fullPage: true });
    }
    await page.locator('#book-3 summary').click();
    item.bookExpanded = await page.locator('#book-3').getAttribute('open') !== null;
    await page.locator('#profile').scrollIntoViewIfNeeded();
    await page.waitForTimeout(50);
    item.motionDuring = await page.locator('#profile').evaluate(e => ({ opacity: getComputedStyle(e).opacity, transform: getComputedStyle(e).transform }));
    await page.waitForTimeout(450);
    item.motionAfter = await page.locator('#profile').evaluate(e => ({ opacity: getComputedStyle(e).opacity, transform: getComputedStyle(e).transform }));
    record.sizes.push(item);
    await context.close();
  }
  const offline = await browser.newContext({ javaScriptEnabled: false, offline: true, viewport: { width: 320, height: 740 } });
  const page = await offline.newPage();
  await page.goto(url);
  record.noJsOffline = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, navVisible: getComputedStyle(document.querySelector('#library-nav')).display !== 'none', books: document.querySelectorAll('.book-cover').length }));
  await page.screenshot({ path: resolve(dir, `screenshots/${name}-nojs-offline.png`), fullPage: true });
  await offline.close();
  results.browsers[name] = record;
  await browser.close();
}
const html = readFileSync(resolve(source, 'index.html'),'utf8');
results.structure = { inlineStyle: /style=/.test(html), externalRequests: /https?:\/\//.test(html), placeholderLinks: /href="#"/.test(html) };
writeFileSync(resolve(dir, 'candidate-checks.json'), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results));
