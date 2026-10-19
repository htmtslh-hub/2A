const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/toonhub');
const OUT_DIR = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const cleanPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const rel = cleanPath === '/' ? 'index.html' : cleanPath.replace(/^\/+/, '');
      const full = path.join(DEMO_DIR, rel);
      if (!full.startsWith(DEMO_DIR) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' });
      res.end(fs.readFileSync(full));
    });
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, url: `http://127.0.0.1:${server.address().port}/` });
    });
  });
}

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '820', width: 820, height: 1180 },
  { name: '375', width: 375, height: 812 },
  { name: '320', width: 320, height: 740 },
];

const BROWSERS = [
  { id: 'chromium', launch: () => chromium.launch({ headless: true }) },
  { id: 'firefox', launch: () => firefox.launch({ headless: true }) },
  {
    id: 'edge',
    launch: () =>
      chromium.launch({
        headless: true,
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      }),
  },
  {
    id: 'coccoc',
    launch: () =>
      chromium.launch({
        headless: true,
        executablePath: 'C:\\Program Files\\CocCoc\\Browser\\Application\\browser.exe',
      }),
  },
];

(async () => {
  const { server, url } = await startServer();
  const report = { date: new Date().toISOString(), url, browsers: {} };

  try {
    for (const b of BROWSERS) {
      const browser = await b.launch();
      const version = browser.version();
      const entry = { version, viewports: {}, interactions: {} };

      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      const allConsoleErrors = [];
      const allPageErrors = [];
      page.on('console', (m) => {
        if (m.type() === 'error') allConsoleErrors.push(m.text());
      });
      page.on('pageerror', (e) => allPageErrors.push(e.message));

      await page.goto(url, { waitUntil: 'load', timeout: 90000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(
        () => {
          const imgs = Array.from(document.querySelectorAll('[data-carousel-item] img'));
          return imgs.length === 4 && imgs.every((img) => img.complete && img.naturalWidth > 0);
        },
        null,
        { timeout: 90000 }
      );

      for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(350);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const items = Array.from(document.querySelectorAll('[data-carousel-item]')).map((el) => ({
            index: Number(el.getAttribute('data-carousel-item')),
            role: el.getAttribute('data-role'),
            styleLeft: el.style.left,
            styleHeight: el.style.height,
            styleBottom: el.style.bottom,
            styleFilter: el.style.filter,
            naturalWidth: el.querySelector('img')?.naturalWidth || 0,
          }));
          const desc = document.querySelector('p.hidden.sm\\:block');
          return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollWidth: doc.scrollWidth,
            scrollHeight: doc.scrollHeight,
            horizontalOverflow: doc.scrollWidth > window.innerWidth,
            verticalOverflow: doc.scrollHeight > window.innerHeight,
            activeIndex: document.querySelector('[data-active-index]')?.getAttribute('data-active-index'),
            bgColor: getComputedStyle(document.querySelector('[data-active-index]')).backgroundColor,
            ghostText: document.querySelector('h1')?.textContent?.trim(),
            brandText: document.querySelector('header span')?.textContent?.trim(),
            discoverText: document.querySelector('.toonhub-discover-link span')?.textContent?.trim(),
            descriptionVisible: desc ? getComputedStyle(desc).display !== 'none' : false,
            items,
          };
        });

        if (b.id === 'chromium' || vp.name === '1440') {
          await page.screenshot({ path: path.join(OUT_DIR, `${b.id}-${vp.name}.png`) });
        }

        if (vp.name === '1440') {
          // Test navigation & 650ms animation lock
          await page.click('#next');
          // Immediately click again while lock is active — should remain at index 1
          await page.click('#next');
          const lockedIndex = await page.evaluate(() =>
            document.querySelector('[data-active-index]')?.getAttribute('data-active-index')
          );
          await page.waitForTimeout(700);
          const afterNext = await page.evaluate(() => ({
            activeIndex: document.querySelector('[data-active-index]')?.getAttribute('data-active-index'),
            bgColor: getComputedStyle(document.querySelector('[data-active-index]')).backgroundColor,
            roles: Array.from(document.querySelectorAll('[data-carousel-item]')).map((el) => el.getAttribute('data-role')),
          }));
          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, `chromium-1440-slide2.png`) });
          }
          await page.click('#prev');
          await page.waitForTimeout(700);
          const afterPrev = await page.evaluate(() => ({
            activeIndex: document.querySelector('[data-active-index]')?.getAttribute('data-active-index'),
            bgColor: getComputedStyle(document.querySelector('[data-active-index]')).backgroundColor,
          }));
          entry.interactions = {
            lockedIndexDuringAnimation: lockedIndex,
            afterNext,
            afterPrev,
          };
        }

        entry.viewports[vp.name] = {
          ...metrics,
          consoleErrors: [...allConsoleErrors],
          pageErrors: [...allPageErrors],
        };
      }

      await context.close();
      report.browsers[b.id] = entry;
      await browser.close();
      console.log(`Verified ${b.id} (${version})`);
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2));
    console.log('Saved checks.json');
  } finally {
    server.close();
  }
})();
