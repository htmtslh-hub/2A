const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));

const ROOT_DIR = path.resolve(__dirname, '../../source');
const OUT_DIR = __dirname;

const VIEWPORTS = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'laptop-1024x768', width: 1024, height: 768 },
  { name: 'tablet-820x1180', width: 820, height: 1180 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'landscape-740x360', width: 740, height: 360 },
  { name: 'phone-375x812', width: 375, height: 812 },
  { name: 'phone-320x740', width: 320, height: 740 }
];

const BROWSERS = [
  { key: 'chromium', launch: () => chromium.launch({ headless: true }) },
  { key: 'firefox', launch: () => firefox.launch({ headless: true }) },
  { key: 'msedge', launch: () => chromium.launch({ channel: 'msedge', headless: true }) },
  {
    key: 'coccoc',
    launch: () =>
      chromium.launch({
        executablePath: 'C:\\Program Files\\CocCoc\\Browser\\Application\\browser.exe',
        headless: true
      })
  }
];

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
      const filePath = path.join(ROOT_DIR, urlPath);
      if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(filePath));
    });
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, port: server.address().port });
    });
  });
}

(async () => {
  const { server, port } = await startServer();
  const baseUrl = `http://127.0.0.1:${port}/index.html`;
  const report = {
    slug: 'digital-epoch',
    version: '1.0.0',
    testedAt: new Date().toISOString(),
    browsers: {}
  };

  try {
    for (const b of BROWSERS) {
      const browser = await b.launch();
      report.browsers[b.key] = { version: browser.version(), viewports: {} };

      for (const vp of VIEWPORTS) {
        const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
        const page = await context.newPage();
        const consoleErrors = [];
        const pageErrors = [];

        page.on('console', (msg) => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        });
        page.on('pageerror', (err) => pageErrors.push(err.message));

        await page.goto(baseUrl, { waitUntil: 'load', timeout: 45000 });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(1200);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const horizOverflow = doc.scrollWidth > doc.clientWidth + 1;
          const marqueeCards = document.querySelectorAll('.marquee-card').length;
          const archTabs = document.querySelectorAll('.arch-tab').length;
          return { horizOverflow, marqueeCards, archTabs };
        });

        if (vp.name === 'desktop-1440x900') {
          await page.locator('[data-layer="sdk"]').click();
          const tps = await page.locator('#archTps').textContent();
          if (tps.trim() !== '0 Gas UI') throw new Error(`${b.key}: SDK tab switch failed`);
          await page.locator('#contactHeroBtn').click();
          await page.locator('#epochModal.is-open').waitFor({ state: 'visible' });
          await page.keyboard.press('Escape');
        }

        if (metrics.horizOverflow || metrics.marqueeCards !== 16 || metrics.archTabs !== 3) {
          throw new Error(`${b.key} ${vp.name} failed metrics: ${JSON.stringify(metrics)}`);
        }
        if (consoleErrors.length || pageErrors.length) {
          throw new Error(`${b.key} ${vp.name} errors: ${consoleErrors.join(';')} / ${pageErrors.join(';')}`);
        }

        report.browsers[b.key].viewports[vp.name] = {
          pass: true,
          consoleErrors: 0,
          pageErrors: 0,
          ...metrics
        };
        await context.close();
      }
      await browser.close();
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2) + '\n');
    console.log('ALL 4 BROWSERS & 7 VIEWPORTS PASSED FOR DIGITAL-EPOCH.');
  } finally {
    server.close();
  }
})();
