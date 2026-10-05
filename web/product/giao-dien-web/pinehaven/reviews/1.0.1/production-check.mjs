import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium } = await import(pathToFileURL(resolve('_design/.tooling/node_modules/playwright/index.mjs')).href);
const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const [width, height] of [[1440, 900], [375, 812]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto('https://forgezone.store/demos/pinehaven/index.html', { waitUntil: 'load' });
    const state = await page.evaluate(() => {
      const frame = document.querySelector('.hero__frame');
      const style = getComputedStyle(frame);
      return {
        borderTopWidth: style.borderTopWidth,
        borderTopStyle: style.borderTopStyle,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        heroBackground: style.backgroundImage.includes('forest-cabin.webp'),
      };
    });
    await page.screenshot({ path: resolve(`web/product/giao-dien-web/pinehaven/reviews/1.0.1/screenshots/production-${width}.png`) });
    results.push({ viewport: `${width}x${height}`, status: response.status(), ...state, errors });
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
if (results.some((item) => item.status !== 200 || item.borderTopWidth !== '0px' || item.scrollWidth > item.clientWidth || !item.heroBackground || item.errors.length)) process.exitCode = 1;
