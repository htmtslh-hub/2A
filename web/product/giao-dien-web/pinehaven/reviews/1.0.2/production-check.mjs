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
      const hero = document.querySelector('.hero');
      const frame = document.querySelector('.hero__frame');
      const heroStyle = getComputedStyle(hero);
      const frameStyle = getComputedStyle(frame);
      const bounds = hero.getBoundingClientRect();
      return {
        heroLeft: bounds.left,
        heroWidth: bounds.width,
        viewportWidth: innerWidth,
        heroPhoto: heroStyle.backgroundImage.includes('forest-cabin.webp'),
        frameBackground: frameStyle.backgroundImage,
        frameRadius: frameStyle.borderRadius,
        frameShadow: frameStyle.boxShadow,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });
    await page.screenshot({ path: resolve(`web/product/giao-dien-web/pinehaven/reviews/1.0.2/screenshots/production-${width}.png`) });
    results.push({ viewport: `${width}x${height}`, status: response.status(), ...state, errors });
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
if (results.some((item) => item.status !== 200 || item.heroLeft !== 0 || item.heroWidth !== item.viewportWidth || !item.heroPhoto || item.frameBackground !== 'none' || item.frameRadius !== '0px' || item.frameShadow !== 'none' || item.scrollWidth > item.clientWidth || item.errors.length)) process.exitCode = 1;
