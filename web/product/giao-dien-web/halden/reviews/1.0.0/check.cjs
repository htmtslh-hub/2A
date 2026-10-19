const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/halden');
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
      const entry = { version, viewports: {}, dropdownMorph: {}, mobileSheet: {} };

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
      await page.waitForTimeout(2600); // allow heroIn 2.4s & entrance animations to settle

      for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(300);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollWidth: doc.scrollWidth,
            scrollHeight: doc.scrollHeight,
            horizontalOverflow: doc.scrollWidth > window.innerWidth,
            title: document.title,
            scrollCueText: document.querySelector('.scroll-cue')?.textContent?.replace(/\s+/g, ' ').trim(),
            desktopNavVisible: getComputedStyle(document.getElementById('nav')).display !== 'none',
            menuBtnVisible: getComputedStyle(document.querySelector('.menu-btn')).display !== 'none',
          };
        });

        if (b.id === 'chromium' || vp.name === '1440') {
          await page.screenshot({ path: path.join(OUT_DIR, `${b.id}-${vp.name}.png`) });
        }

        if (vp.name === '1440') {
          // 1. Open Discover
          await page.click('.trigger[data-menu="discover"]');
          await page.waitForTimeout(450);
          await page.hover('.d-item[data-img="1"]');
          await page.waitForTimeout(350);
          const discoverState = await page.evaluate(() => {
            const dd = document.getElementById('dd');
            return {
              open: dd.classList.contains('open'),
              w: dd.style.getPropertyValue('--w'),
              h: dd.style.getPropertyValue('--h'),
              panelState: document.getElementById('p-discover').getAttribute('data-state'),
              activeImgIndex: Array.from(document.querySelectorAll('.d-media img')).findIndex((img) =>
                img.classList.contains('is-active')
              ),
            };
          });
          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, 'chromium-1440-discover.png') });
          }

          // 2. Morph to Journeys
          await page.click('.trigger[data-menu="journeys"]');
          await page.waitForTimeout(550);
          const journeysState = await page.evaluate(() => {
            const dd = document.getElementById('dd');
            return {
              open: dd.classList.contains('open'),
              w: dd.style.getPropertyValue('--w'),
              h: dd.style.getPropertyValue('--h'),
              discoverPanelState: document.getElementById('p-discover').getAttribute('data-state'),
              journeysPanelState: document.getElementById('p-journeys').getAttribute('data-state'),
            };
          });
          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, 'chromium-1440-journeys.png') });
          }

          // 3. Morph to Regions & close via Escape
          await page.click('.trigger[data-menu="regions"]');
          await page.waitForTimeout(550);
          const regionsState = await page.evaluate(() => {
            const dd = document.getElementById('dd');
            return {
              w: dd.style.getPropertyValue('--w'),
              h: dd.style.getPropertyValue('--h'),
              regionsPanelState: document.getElementById('p-regions').getAttribute('data-state'),
            };
          });
          await page.keyboard.press('Escape');
          await page.waitForTimeout(350);
          const afterEscape = await page.evaluate(() => ({
            open: document.getElementById('dd').classList.contains('open'),
            focusedMenu: document.activeElement?.getAttribute('data-menu') || null,
          }));

          entry.dropdownMorph = {
            discoverState,
            journeysState,
            regionsState,
            afterEscape,
          };
        }

        if (vp.name === '375') {
          await page.click('.menu-btn');
          await page.waitForTimeout(500);
          const sheetOpen = await page.evaluate(() => ({
            open: document.getElementById('sheet').classList.contains('open'),
            ariaExpanded: document.querySelector('.menu-btn').getAttribute('aria-expanded'),
          }));
          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, 'chromium-375-sheet.png') });
          }
          await page.click('#sheet a[href="#glaciers"]');
          await page.waitForTimeout(500);
          const sheetClosed = await page.evaluate(() => ({
            open: document.getElementById('sheet').classList.contains('open'),
            ariaExpanded: document.querySelector('.menu-btn').getAttribute('aria-expanded'),
          }));
          entry.mobileSheet = { sheetOpen, sheetClosed };
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
