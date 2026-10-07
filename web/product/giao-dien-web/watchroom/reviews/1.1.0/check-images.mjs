import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out = resolve('web/product/giao-dien-web/watchroom/reviews/1.1.0');
const url = pathToFileURL(resolve('_design/.qa-extracted/watchroom/index.html')).href;
const results = {};
const cases = [
  ['chromium', chromium, {}], ['firefox', firefox, {}],
  ['edge', chromium, { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' }],
  ['coccoc', chromium, { executablePath: 'C:/Program Files/CocCoc/Browser/Application/browser.exe' }],
];
for (const [name, engine, options] of cases) {
  const browser = await engine.launch({ headless: true, ...options });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(url);
  await page.waitForTimeout(6500);
  await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => null))));
  const info = { version: browser.version(), errors, sizes: [], transitions: [] };
  for (const [width, height] of [[1440,900],[820,1180],[375,812],[320,740]]) {
    await page.setViewportSize({ width, height });
    await page.screenshot({ path: `${out}/screenshots/photos-${name}-${width}.png`, fullPage: true });
    info.sizes.push(await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
      images: [...document.images].map(img => ({ src: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0, width: img.naturalWidth, height: img.naturalHeight })),
      cards: [...document.querySelectorAll('.product__art')].map(e => ({ box: e.getBoundingClientRect().height, image: e.querySelector('img').getBoundingClientRect().height })) })));
  }
  for (const step of [-1, 1, 1, 1, 1, -1]) {
    await page.locator(`[data-step="${step}"]`).click();
    await page.waitForTimeout(500);
    info.transitions.push(await page.evaluate(() => {
      const image = document.querySelector('.watch-stack .is-active');
      return { title: document.querySelector('h1').textContent, image: image.getAttribute('src'), loaded: image.complete && image.naturalWidth > 0, activeCount: document.querySelectorAll('.watch-stack .is-active').length, visibleImages: [...document.querySelectorAll('.watch-stack img')].filter(i => getComputedStyle(i).visibility === 'visible').length, scrollWidth: document.documentElement.scrollWidth, width: innerWidth };
    }));
    await page.waitForTimeout(500);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  if (name === 'edge') await page.screenshot({ path: `${out}/screenshots/hero-photos.png` });
  await browser.close();
  results[name] = info;
}
// Deliberate missing-image condition keeps real copy and enquiry links usable.
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const page = await browser.newPage({ viewport: { width: 320, height: 740 } });
await page.route('**/assets/img/**', route => route.abort());
await page.goto(url);
await page.waitForTimeout(6500);
results.missingImages = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
  headline: document.querySelector('h1').textContent, names: [...document.querySelectorAll('.product h3')].map(e => e.textContent), enquiryCount: [...document.querySelectorAll('a[href^="mailto:"]')].length }));
await browser.close();
writeFileSync(out + '/images.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify({ browsers: Object.fromEntries(Object.entries(results).filter(([k]) => k !== 'missingImages').map(([k,v]) => [k, { version: v.version, errors: v.errors, sizes: v.sizes.map(s => [s.width, s.scrollWidth]), imageFailures: v.sizes.flatMap(s => s.images.filter(i => !i.loaded)), transitions: v.transitions }])), missingImages: results.missingImages }, null, 2));
