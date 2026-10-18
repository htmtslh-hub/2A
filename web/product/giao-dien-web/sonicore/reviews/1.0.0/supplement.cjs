const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve('_design/.browsers');
const { chromium } = require('../../../../../../_design/.tooling/node_modules/playwright');

const sourceDir = path.resolve(__dirname, '../../source');
const luminance = (hex) => {
  const c = hex
    .match(/../g)
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
};

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.webp': 'image/webp'
};

function startStaticServer(rootDir) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const reqPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const relPath = reqPath === '/' ? 'index.html' : reqPath.replace(/^\/+/, '');
      const fullPath = path.join(rootDir, relPath);
      if (!fullPath.startsWith(rootDir) || !fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }
      const ext = path.extname(fullPath).toLowerCase();
      res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
      res.end(fs.readFileSync(fullPath));
    });
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, url: `http://127.0.0.1:${port}` });
    });
  });
}

(async () => {
  const report = { date: new Date().toISOString(), contrast: [], checks: [] };
  for (const [role, fg, bg, min] of [
    ['body', 'b8b4c9', '050508', 4.5],
    ['muted', '9e99b3', '050508', 4.5],
    ['heading', 'f5f4fa', '050508', 3],
    ['accent text', 'c4b5fd', '050508', 4.5],
    ['card quote', 'f5f4fa', '120f1d', 4.5],
    ['outline', 'd8b4fe', '050508', 3]
  ]) {
    const ratio = (Math.max(luminance(fg), luminance(bg)) + 0.05) / (Math.min(luminance(fg), luminance(bg)) + 0.05);
    if (ratio < min) {
      throw Error(role + ' contrast ' + ratio);
    }
    report.contrast.push({ role, fg, bg, min, ratio: +ratio.toFixed(3) });
  }

  const { server, url } = await startStaticServer(sourceDir);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(450);
    const dims = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      heading: document.querySelector('h1').getBoundingClientRect().width
    }));
    if (dims.scrollWidth > dims.width) {
      throw Error('Zoom overflow');
    }
    report.zoom200Equivalent = {
      ...dims,
      method: '720×450 viewport at DPR 2, equivalent layout area to 1440×900 at 200%; not a physical browser zoom command'
    };
    fs.mkdirSync(path.join(__dirname, 'evidence'), { recursive: true });
    await page.screenshot({ path: path.join(__dirname, 'evidence/zoom200-equivalent.png'), fullPage: true });

    await page.setViewportSize({ width: 820, height: 1180 });
    await page.locator('.nav-toggle').click();
    await page.setViewportSize({ width: 951, height: 900 });
    await page.waitForTimeout(100);
    if ((await page.locator('.nav-toggle').getAttribute('aria-expanded')) !== 'false') {
      throw Error('Resize ARIA');
    }
    report.checks.push('menu resets on desktop breakpoint');

    await page.setViewportSize({ width: 375, height: 812 });
    if (await page.locator('#navigation').isVisible()) {
      throw Error('Mobile menu unexpectedly open');
    }
    report.checks.push('menu remains closed on mobile return');

    await page.locator('.nav-toggle').click();
    const focus = await page.locator('.nav-toggle').evaluate((e) => {
      e.focus();
      return { outline: getComputedStyle(e).outlineStyle, width: getComputedStyle(e).outlineWidth };
    });
    report.focus = focus;

    const structure = await page.evaluate(() => ({
      h1: document.querySelectorAll('h1').length,
      ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
      anchors: [...document.querySelectorAll('a[href^="#"]')].map((a) => ({
        href: a.getAttribute('href'),
        exists: !!document.querySelector(a.getAttribute('href'))
      }))
    }));
    if (
      structure.h1 !== 1 ||
      new Set(structure.ids).size !== structure.ids.length ||
      structure.anchors.some((a) => !a.exists)
    ) {
      throw Error('Structure/anchors');
    }
    report.structure = structure;

    const images = await page.evaluate(() =>
      Promise.all(
        [
          'assets/img/hero-headphone.webp',
          'assets/img/exploded-view.webp',
          'assets/img/spatial-bust.webp',
          'assets/img/design-closeup.webp'
        ].map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.onload = () => resolve({ src, width: img.naturalWidth, height: img.naturalHeight });
              img.onerror = () => resolve(false);
              img.src = src;
            })
        )
      )
    );
    if (images.some((img) => !img)) {
      throw Error('Asset failed');
    }
    report.images = images;

    fs.writeFileSync(path.join(__dirname, 'supplement.json'), JSON.stringify(report, null, 2));
    console.log('PASS contrast, zoom equivalent, menu resize, anchors and 4 local images.');
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
