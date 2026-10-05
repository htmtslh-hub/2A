// Internal release check. Run from the repository root with Node.js.
import { createServer } from 'node:http';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, join, extname, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import(pathToFileURL(resolve('_design/.tooling/node_modules/playwright/index.mjs')).href);
const review = resolve('web/product/giao-dien-web/pinehaven/reviews/1.0.1');
const root = join(review, 'unpacked-ship/pinehaven');
const fileUrl = pathToFileURL(join(root, 'index.html')).href;
const contentType = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp' };
const server = createServer((request, response) => {
  const target = resolve(root, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
  if (target !== root && !target.startsWith(root + sep)) return response.writeHead(403).end();
  try {
    response.setHeader('Content-Type', contentType[extname(target)] || 'application/octet-stream');
    response.end(readFileSync(target));
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const httpUrl = `http://127.0.0.1:${server.address().port}/index.html`;
const result = { testedAt: new Date().toISOString(), browsers: {}, checks: [], interactions: {} };

try {
  for (const [name, engine] of [['chromium', chromium], ['firefox', firefox]]) {
    const browser = await engine.launch({ headless: true });
    result.browsers[name] = browser.version();
    for (const [width, height] of [[1440, 900], [820, 1180], [375, 812], [320, 740], [720, 450]]) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
      const errors = [];
      const failed = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('requestfailed', (request) => failed.push(request.url()));
      await page.goto(fileUrl, { waitUntil: 'load' });
      await page.locator('#cabin').scrollIntoViewIfNeeded();
      await page.locator('#setting').scrollIntoViewIfNeeded();
      await page.locator('#experiences').scrollIntoViewIfNeeded();
      await page.locator('#top').scrollIntoViewIfNeeded();
      const data = await page.evaluate(() => {
        const ids = [...document.querySelectorAll('[id]')].map((item) => item.id);
        return {
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          images: [...document.images].map((image) => ({ loaded: image.complete && image.naturalWidth > 0, alt: image.alt })),
          h1Count: document.querySelectorAll('h1').length,
          idsUnique: ids.length === new Set(ids).size,
          reducedMotionScroll: getComputedStyle(document.documentElement).scrollBehavior,
        };
      });
      result.checks.push({ browser: name, viewport: `${width}x${height}`, ...data, errors, failed });
      if (name === 'chromium' && width !== 720) {
        await page.screenshot({ path: join(review, 'screenshots', `${name}-${width}-release.png`), fullPage: true });
      }
      if (width === 375) {
        await page.locator('.nav__toggle').click();
        const opened = await page.locator('.nav__toggle').getAttribute('aria-expanded');
        const shown = await page.locator('.nav__links').isVisible();
        if (name === 'chromium') await page.screenshot({ path: join(review, 'screenshots', 'menu-open-375.png') });
        await page.keyboard.press('Escape');
        const closed = await page.locator('.nav__toggle').getAttribute('aria-expanded');
        const focusReturned = await page.evaluate(() => document.activeElement === document.querySelector('.nav__toggle'));
        result.interactions[`${name}Menu`] = { opened, shown, closed, focusReturned };
        await page.locator('.nav__toggle').click();
        await page.locator('.nav__links a[href="#setting"]').click();
        result.interactions[`${name}Link`] = {
          hash: new URL(page.url()).hash,
          closed: await page.locator('.nav__toggle').getAttribute('aria-expanded'),
        };
      }
      await page.close();
    }
    const noJs = await browser.newPage({ viewport: { width: 375, height: 812 }, javaScriptEnabled: false });
    await noJs.goto(fileUrl);
    result.interactions[`${name}NoJs`] = {
      menuLinksVisible: await noJs.locator('.nav__links').isVisible(),
      inertToggleHidden: !(await noJs.locator('.nav__toggle').isVisible()),
      contentVisible: await noJs.locator('h1').isVisible(),
    };
    await noJs.close();
    const http = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const response = await http.goto(httpUrl, { waitUntil: 'load' });
    await http.locator('#cabin').scrollIntoViewIfNeeded();
    await http.locator('#setting').scrollIntoViewIfNeeded();
    result.interactions[`${name}Http`] = {
      status: response.status(),
      images: await http.evaluate(() => [...document.images].map((image) => image.complete && image.naturalWidth > 0)),
      heroBackground: await http.evaluate(() => getComputedStyle(document.querySelector('.hero__frame')).backgroundImage.includes('forest-cabin.webp')),
    };
    await http.close();
    await browser.close();
  }
} finally {
  server.close();
}

writeFileSync(join(review, 'checks.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify({ browsers: result.browsers, checks: result.checks.map(({ browser, viewport, clientWidth, scrollWidth, images, errors, failed }) => ({ browser, viewport, overflow: scrollWidth > clientWidth, images: images.map((image) => image.loaded), errors, failed })), interactions: result.interactions }, null, 2));
