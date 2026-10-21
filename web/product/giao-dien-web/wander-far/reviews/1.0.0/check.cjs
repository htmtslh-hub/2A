const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/wander-far');
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
  { name: '1440', width: 1440, height: 900, preview: 'wander-far.webp', previewSize: [1280, 800] },
  { name: '1024', width: 1024, height: 768 },
  { name: '820', width: 820, height: 1180, preview: 'wander-far-tablet.webp', previewSize: [820, 1180] },
  { name: '768', width: 768, height: 1024 },
  { name: '740x360', width: 740, height: 360 },
  { name: '375', width: 375, height: 812, preview: 'wander-far-mobile.webp', previewSize: [375, 812] },
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
        if (m.type() === 'error' && !m.text().includes('__cf_bm')) allConsoleErrors.push(m.text());
      });
      page.on('pageerror', (e) => allPageErrors.push(e.message));

      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(
        () => {
          const still = document.getElementById('fjordImage');
          const video = document.getElementById('fjordVideo');
          return (
            still &&
            still.complete &&
            still.naturalWidth > 0 &&
            video &&
            video.readyState >= 2 &&
            video.classList.contains('is-ready')
          );
        },
        null,
        { timeout: 60000 }
      );
      await page.waitForTimeout(1000);

      for (const vp of VIEWPORTS) {
        const vpErrors = [];
        const onConsole = (m) => {
          if (m.type() === 'error' && !m.text().includes('__cf_bm')) vpErrors.push(m.text());
        };
        const onPageErr = (e) => vpErrors.push(e.message);
        page.on('console', onConsole);
        page.on('pageerror', onPageErr);

        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(b.id === 'chromium' && vp.preview ? 600 : 300);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const heroShell = document.getElementById('main-content');
          const headline = document.getElementById('heroHeadline');
          const lede = document.getElementById('heroLede');
          const tabsRow = document.getElementById('tabsRow');
          const tabs = document.querySelectorAll('.tab-btn');
          const searchBar = document.getElementById('searchBar');
          const cellWhere = document.getElementById('cellWhere');
          const cellDates = document.getElementById('cellDates');
          const cellTrav = document.getElementById('cellTravelers');
          const searchBtn = document.getElementById('searchSubmitBtn');
          const photoPanel = document.getElementById('photoPanel');
          const still = document.getElementById('fjordImage');
          const video = document.getElementById('fjordVideo');
          const chip = document.getElementById('locationChip');
          const chipPlace = document.querySelector('.location-chip__place');
          const chipCoord = document.querySelector('.location-chip__coord');

          const r = (el) => {
            if (!el) return null;
            const b = el.getBoundingClientRect();
            return {
              x: Math.round(b.left),
              y: Math.round(b.top),
              w: Math.round(b.width),
              h: Math.round(b.height),
              right: Math.round(b.right),
              bottom: Math.round(b.bottom),
            };
          };

          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            scrollHeight: doc.scrollHeight,
            clientHeight: doc.clientHeight,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            heroShellRect: r(heroShell),
            headlineRect: r(headline),
            ledeRect: r(lede),
            tabsRowRect: r(tabsRow),
            tabCount: tabs.length,
            searchBarRect: r(searchBar),
            cellWhereRect: r(cellWhere),
            cellDatesRect: r(cellDates),
            cellTravRect: r(cellTrav),
            searchBtnRect: r(searchBtn),
            photoPanelRect: r(photoPanel),
            photoPanelRadius: photoPanel ? getComputedStyle(photoPanel).borderRadius : null,
            stillObjectFit: still ? getComputedStyle(still).objectFit : null,
            stillObjectPosition: still ? getComputedStyle(still).objectPosition : null,
            videoObjectFit: video ? getComputedStyle(video).objectFit : null,
            videoObjectPosition: video ? getComputedStyle(video).objectPosition : null,
            videoReady: video ? video.classList.contains('is-ready') : false,
            chipRect: r(chip),
            chipPlaceText: chipPlace ? chipPlace.textContent : null,
            chipCoordText: chipCoord ? chipCoord.textContent : null,
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow (${metrics.scrollWidth} > ${metrics.clientWidth})`);
        assert.equal(vpErrors.length, 0, `${b.id}@${vp.name}: console/page errors: ${vpErrors.join('; ')}`);
        assert.equal(metrics.tabCount, 3, `${b.id}@${vp.name}: must render 3 tabs`);
        assert.equal(metrics.photoPanelRadius, '0px', `${b.id}@${vp.name}: photo panel must have square corners`);
        assert.equal(metrics.stillObjectFit, 'cover');
        assert.equal(metrics.videoObjectFit, 'cover');
        assert.equal(metrics.videoReady, true);
        assert.equal(metrics.chipPlaceText, 'Geirangerfjord, Norge');
        assert.equal(metrics.chipCoordText, '62.10° N');

        if (vp.width > 820) {
          assert.equal(metrics.scrollHeight, metrics.clientHeight, `${b.id}@${vp.name}: desktop must be exactly one viewport tall`);
          assert.equal(metrics.stillObjectPosition, '50% 50%');
          assert.equal(metrics.videoObjectPosition, '50% 50%');
        } else {
          assert.equal(metrics.photoPanelRect.h >= 240, true, `${b.id}@${vp.name}: photo panel must be at least 240px tall on <=820px`);
          assert.equal(metrics.stillObjectPosition, '74% 50%');
          assert.equal(metrics.videoObjectPosition, '74% 50%');
        }

        if (b.id === 'chromium' && vp.preview) {
          const pngPath = path.join(OUT_DIR, `chromium-${vp.name}.png`);
          await page.screenshot({ path: pngPath });
          await sharp(pngPath)
            .resize(vp.previewSize[0], vp.previewSize[1], { fit: 'cover', position: 'top' })
            .webp({ quality: 86 })
            .toFile(path.join(PREVIEW_DIR, vp.preview));
        }

        page.off('console', onConsole);
        page.off('pageerror', onPageErr);
        entry.viewports[vp.name] = { ...metrics, consoleErrors: vpErrors.length };
      }

      // Test interactive Tab switching & Search Modal at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);

      await page.click('[data-tab="experiences"]');
      await page.waitForTimeout(150);
      const expSelected = await page.evaluate(() => document.querySelector('[data-tab="experiences"]').getAttribute('aria-selected'));
      const expKicker = await page.evaluate(() => document.getElementById('modalCategoryKicker').textContent);
      assert.equal(expSelected, 'true');
      assert.equal(expKicker, 'EXPERIENCES · KAYAK, GLACIER & WATERFALL TRAILS');

      await page.click('[data-tab="stays"]');
      await page.waitForTimeout(150);
      const staysKicker = await page.evaluate(() => document.getElementById('modalCategoryKicker').textContent);
      assert.equal(staysKicker, 'STAYS · NORWEGIAN FJORD COLLECTION');

      await page.click('#searchSubmitBtn');
      await page.waitForTimeout(250);
      const modalOpen = await page.evaluate(() => document.getElementById('searchModal').classList.contains('is-open'));
      assert.equal(modalOpen, true);

      await page.selectOption('#selectWhere', 'Geirangerfjord');
      await page.click('#applySearchBtn');
      await page.waitForTimeout(250);
      const updatedDest = await page.evaluate(() => document.getElementById('valueWhere').textContent);
      const modalClosed = await page.evaluate(() => !document.getElementById('searchModal').classList.contains('is-open'));
      assert.equal(updatedDest, 'Geirangerfjord');
      assert.equal(modalClosed, true);

      // Reset to Molde
      await page.click('#searchSubmitBtn');
      await page.waitForTimeout(200);
      await page.selectOption('#selectWhere', 'Molde');
      await page.click('#applySearchBtn');
      await page.waitForTimeout(200);

      assert.equal(allConsoleErrors.length, 0, `${b.id}: total console errors: ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: total page errors: ${allPageErrors.join('; ')}`);

      entry.interactions = {
        expSelected,
        expKicker,
        staysKicker,
        modalOpen,
        updatedDest,
        modalClosed,
        totalConsoleErrors: allConsoleErrors.length,
        totalPageErrors: allPageErrors.length,
      };

      report.browsers[b.id] = entry;
      await browser.close();
      console.log(`PASS ${b.id} (${version})`);
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2));
    console.log('ALL 4 BROWSERS & 7 VIEWPORTS PASSED');
  } finally {
    server.close();
  }
})();
