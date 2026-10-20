const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/synapsex');
const PREVIEW_DIR = path.resolve(__dirname, '../../../../../public/previews');
const OUT_DIR = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
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
  { name: '1440', width: 1440, height: 900, isDesktopSm: true },
  { name: '820', width: 820, height: 1180, isDesktopSm: true },
  { name: '375', width: 375, height: 812, isDesktopSm: false },
  { name: '320', width: 320, height: 740, isDesktopSm: false },
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
        if (m.type() === 'error' && !m.text().includes('__cf_bm')) allConsoleErrors.push(m.text());
      });
      page.on('pageerror', (e) => allPageErrors.push(e.message));

      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(
        () => {
          const heroVid = document.getElementById('synapsex-hero-video');
          return heroVid && heroVid.readyState >= 2;
        },
        null,
        { timeout: 60000 }
      );
      // Wait for 800ms entrance + 1000ms ScrambleIn delay + 450ms scramble decode
      await page.waitForTimeout(2600);

      for (const vp of VIEWPORTS) {
        const vpErrors = [];
        const onConsole = (m) => {
          if (m.type() === 'error' && !m.text().includes('__cf_bm')) vpErrors.push(m.text());
        };
        const onPageErr = (e) => vpErrors.push(e.message);
        page.on('console', onConsole);
        page.on('pageerror', onPageErr);

        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(350);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const heroVid = document.getElementById('synapsex-hero-video');
          const watermark = document.getElementById('synapsex-watermark');
          const allVideos = Array.from(document.querySelectorAll('video'));
          const h1s = Array.from(document.querySelectorAll('#synapsex-hero h1')).map((el) =>
            el.textContent.replace(/\s+/g, ' ').trim()
          );
          const appleIcon = document.querySelector('i.bi.bi-apple');

          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            heroVideoPaused: Boolean(heroVid && heroVid.paused),
            heroVideoReady: Boolean(heroVid && heroVid.readyState >= 2),
            videoCount: allVideos.length,
            watermarkText: watermark ? watermark.textContent.trim() : '',
            heroHeadlines: h1s,
            hasAppleIcon: Boolean(appleIcon),
            bodyBg: getComputedStyle(document.body).backgroundColor,
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow`);
        assert.equal(metrics.heroVideoPaused, true, `${b.id}@${vp.name}: hero video must be paused`);
        assert.equal(metrics.heroVideoReady, true, `${b.id}@${vp.name}: hero video not ready`);
        assert.equal(metrics.videoCount, 5, `${b.id}@${vp.name}: expected 5 videos`);
        assert.equal(metrics.watermarkText, 'TRANSCENDENCE', `${b.id}@${vp.name}: watermark mismatch`);
        assert.equal(metrics.hasAppleIcon, true, `${b.id}@${vp.name}: missing bi-apple icon`);
        assert.equal(metrics.bodyBg, 'rgb(0, 0, 0)', `${b.id}@${vp.name}: bodyBg not black`);
        assert.equal(vpErrors.length, 0, `${b.id}@${vp.name}: errors ${vpErrors.join('; ')}`);

        const shotName = `${b.id}-${vp.name}.png`;
        await page.screenshot({ path: path.join(OUT_DIR, shotName), fullPage: false });

        entry.viewports[vp.name] = {
          width: vp.width,
          height: vp.height,
          ...metrics,
          consoleErrors: vpErrors.length,
          screenshot: shotName,
        };

        page.off('console', onConsole);
        page.off('pageerror', onPageErr);
      }

      if (b.id === 'chromium') {
        await sharp(path.join(OUT_DIR, 'chromium-1440.png'))
          .resize(698, 524, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'synapsex.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-820.png'))
          .resize(698, 1004, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'synapsex-tablet.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-375.png'))
          .resize(698, 1511, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'synapsex-mobile.webp'));
      }

      // Interactive checks at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(250);

      // 1. Mouse-scrub across hero -> video currentTime advances
      const timeBefore = await page.evaluate(
        () => document.getElementById('synapsex-hero-video').currentTime
      );
      await page.mouse.move(100, 450);
      await page.mouse.move(1200, 450, { steps: 20 });
      await page.waitForTimeout(350);
      const timeAfter = await page.evaluate(
        () => document.getElementById('synapsex-hero-video').currentTime
      );
      assert.equal(timeAfter > timeBefore, true, `${b.id}: hero mouse-scrub did not advance video`);

      // 2. Click desktop menu button -> expands pill to ~290px and reveals About & Metrics links
      await page.locator('#synapsex-desktop-menu-btn').click();
      await page.locator('#synapsex-nav-about').waitFor({ state: 'visible' });
      await page.waitForTimeout(450);
      const expandedWidth = await page.evaluate(
        () => document.getElementById('synapsex-desktop-menu-pill').getBoundingClientRect().width
      );
      assert.equal(expandedWidth > 200, true, `${b.id}: menu pill did not expand (${expandedWidth})`);

      // 3. Close menu
      await page.locator('#synapsex-desktop-menu-btn').click();
      await page.waitForTimeout(350);

      assert.equal(
        allConsoleErrors.length,
        0,
        `${b.id}: console errors ${allConsoleErrors.join('; ')}`
      );
      assert.equal(allPageErrors.length, 0, `${b.id}: page errors ${allPageErrors.join('; ')}`);

      entry.interactions = {
        heroScrubbedFrom: Number(timeBefore.toFixed(3)),
        heroScrubbedTo: Number(timeAfter.toFixed(3)),
        menuExpandedWidth: Math.round(expandedWidth),
        totalConsoleErrors: allConsoleErrors.length,
        totalPageErrors: allPageErrors.length,
      };

      report.browsers[b.id] = entry;
      await browser.close();
      console.log(`PASS ${b.id} (${version})`);
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2) + '\n');
    console.log('ALL 4 BROWSERS PASSED');
  } finally {
    server.close();
  }
})();
