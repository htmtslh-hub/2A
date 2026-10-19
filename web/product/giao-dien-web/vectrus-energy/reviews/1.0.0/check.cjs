const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/vectrus-energy');
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
      if (cleanPath === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
      }
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
      const entry = { version, viewports: {}, scrollSections: {}, mobileMenu: {} };

      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      const allConsoleErrors = [];
      const allPageErrors = [];
      page.on('console', (m) => {
        if (m.type() === 'error') allConsoleErrors.push(m.text());
      });
      page.on('pageerror', (e) => allPageErrors.push(e.message));

      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(
        () => {
          const v = document.querySelector('video');
          return v && v.readyState >= 2;
        },
        null,
        { timeout: 60000 }
      );
      await page
        .waitForFunction(
          () => {
            const c = document.querySelector('canvas');
            return c && c.classList.contains('opacity-100');
          },
          null,
          { timeout: 8000 }
        )
        .catch(() => {});
      await page.waitForTimeout(500);

      for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.waitForTimeout(450);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const v = document.querySelector('video');
          const c = document.querySelector('canvas');
          const sections = Array.from(document.querySelectorAll('section')).map((s) => ({
            label: s.getAttribute('aria-label'),
            opacity: Number(s.style.opacity),
          }));
          return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollWidth: doc.scrollWidth,
            scrollHeight: doc.scrollHeight,
            horizontalOverflow: doc.scrollWidth > window.innerWidth,
            trackRatio: Math.round((doc.scrollHeight / window.innerHeight) * 10) / 10,
            title: document.title,
            h1Text: document.querySelector('h1')?.textContent?.trim(),
            videoPaused: v ? v.paused : null,
            videoReadyState: v ? v.readyState : 0,
            canvasWidth: c ? c.width : 0,
            canvasHeight: c ? c.height : 0,
            canvasLive: c ? c.classList.contains('opacity-100') : false,
            navColor: getComputedStyle(document.querySelector('header')).color,
            sections,
          };
        });

        if (b.id === 'chromium' || vp.name === '1440') {
          await page.screenshot({ path: path.join(OUT_DIR, `${b.id}-${vp.name}.png`) });
        }

        if (vp.name === '1440') {
          // Scroll to Section 2 (p = 0.45)
          await page.evaluate(() => {
            const span = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({ top: span * 0.45, behavior: 'instant' });
          });
          await page.waitForTimeout(700);
          const s2State = await page.evaluate(() => ({
            progress: document.querySelector('[data-scroll-progress]')?.getAttribute('data-scroll-progress'),
            navColor: getComputedStyle(document.querySelector('header')).color,
            sections: Array.from(document.querySelectorAll('section')).map((s) => Number(s.style.opacity)),
          }));
          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, `chromium-1440-s2.png`) });
          }

          // Scroll to Section 3 (p = 0.85, where p > 0.55 flips navColor to white)
          await page.evaluate(() => {
            const span = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({ top: span * 0.85, behavior: 'instant' });
          });
          await page.waitForTimeout(700);
          const s3State = await page.evaluate(() => ({
            progress: document.querySelector('[data-scroll-progress]')?.getAttribute('data-scroll-progress'),
            navColor: getComputedStyle(document.querySelector('header')).color,
            sections: Array.from(document.querySelectorAll('section')).map((s) => Number(s.style.opacity)),
            videoTime: document.querySelector('video')?.currentTime || 0,
          }));
          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, `chromium-1440-s3.png`) });
          }

          await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
          await page.waitForTimeout(500);
          entry.scrollSections = { s2State, s3State };
        }

        if (vp.name === '375') {
          await page.click('#mobile-menu-trigger');
          await page.waitForTimeout(550);
          const openState = await page.evaluate(() => ({
            ariaHidden: document.getElementById('mobile-menu-overlay')?.getAttribute('aria-hidden'),
            bodyOverflow: document.body.style.overflow,
          }));
          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, `chromium-375-menu.png`) });
          }
          await page.click('#mobile-menu-close');
          await page.waitForTimeout(550);
          const closeState = await page.evaluate(() => ({
            ariaHidden: document.getElementById('mobile-menu-overlay')?.getAttribute('aria-hidden'),
            bodyOverflow: document.body.style.overflow,
          }));
          entry.mobileMenu = { openState, closeState };
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
