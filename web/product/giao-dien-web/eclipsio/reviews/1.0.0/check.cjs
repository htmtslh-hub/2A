const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/eclipsio');
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
  { name: '1448x1086', width: 1448, height: 1086 },
  { name: '1440', width: 1440, height: 900, preview: 'eclipsio.webp', previewSize: [1280, 800] },
  { name: '1024', width: 1024, height: 768 },
  { name: '820', width: 820, height: 1180, preview: 'eclipsio-tablet.webp', previewSize: [820, 1180] },
  { name: '768', width: 768, height: 1024 },
  { name: '740x360', width: 740, height: 360 },
  { name: '375', width: 375, height: 812, preview: 'eclipsio-mobile.webp', previewSize: [375, 812] },
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

      const context = await browser.newContext({ viewport: { width: 1448, height: 1086 } });
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
          const plate = document.querySelector('.eclipse-plate');
          const video = document.querySelector('.eclipse-video');
          return (
            plate &&
            plate.complete &&
            plate.naturalWidth > 0 &&
            video &&
            video.readyState >= 2 &&
            video.classList.contains('is-playing')
          );
        },
        null,
        { timeout: 60000 }
      );
      // Wait for the one-shot CSS entrance sequence to complete
      await page.waitForTimeout(1900);

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
        await page.waitForTimeout(b.id === 'chromium' && (vp.preview || vp.name === '1448x1086') ? 600 : 300);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const hero = document.querySelector('.hero');
          const plate = document.querySelector('.eclipse-plate');
          const video = document.querySelector('.eclipse-video');
          const navZone = document.querySelector('.nav-zone');
          const navBar = document.querySelector('.nav-bar');
          const brand = document.getElementById('navBrand');
          const navLinks = document.getElementById('navLinks');
          const navCta = document.getElementById('navCreateBtn');
          const menuBtn = document.getElementById('menuBtn');
          const badge = document.getElementById('heroBadge');
          const headline = document.getElementById('heroHeadline');
          const subline = document.getElementById('heroSubline');
          const btnPrimary = document.getElementById('heroCreateBtn');
          const btnOutline = document.getElementById('heroSamplesBtn');
          const logoStrip = document.getElementById('logoStrip');

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
            verticalOverflow: doc.scrollHeight > doc.clientHeight,
            heroRect: r(hero),
            plateRect: r(plate),
            videoRect: r(video),
            videoPlaying: video ? video.classList.contains('is-playing') : false,
            navZoneRect: r(navZone),
            navBarRect: r(navBar),
            brandRect: r(brand),
            navLinksVisible: navLinks ? getComputedStyle(navLinks).display !== 'none' : false,
            navCtaRect: r(navCta),
            menuBtnVisible: menuBtn ? getComputedStyle(menuBtn).display !== 'none' : false,
            badgeRect: r(badge),
            headlineRect: r(headline),
            sublineRect: r(subline),
            btnPrimaryRect: r(btnPrimary),
            btnOutlineRect: r(btnOutline),
            logoStripRect: r(logoStrip),
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow (${metrics.scrollWidth} > ${metrics.clientWidth})`);
        assert.equal(metrics.verticalOverflow, false, `${b.id}@${vp.name}: vertical overflow (${metrics.scrollHeight} > ${metrics.clientHeight})`);
        assert.equal(vpErrors.length, 0, `${b.id}@${vp.name}: console/page errors: ${vpErrors.join('; ')}`);
        assert.equal(metrics.videoPlaying, true, `${b.id}@${vp.name}: eclipse video should be playing and faded in`);

        if (vp.name === '1448x1086') {
          assert.equal(metrics.heroRect.w, 1448);
          assert.equal(metrics.heroRect.h, 1086);
          assert.equal(metrics.plateRect.w, 1448);
          assert.equal(metrics.plateRect.h, 1086);
          assert.equal(metrics.videoRect.w, 1930);
          assert.equal(metrics.videoRect.h, 1086);
          assert.equal(metrics.navZoneRect.h, 125);
          assert.equal(metrics.navBarRect.y, 34);
          assert.equal(metrics.navBarRect.h, 38);
          assert.equal(metrics.brandRect.x, 68);
          assert.equal(metrics.navCtaRect.right, 1386);
          assert.equal(metrics.badgeRect.h, 44);
          assert.equal(metrics.btnPrimaryRect.h, 55);
          assert.equal(metrics.btnOutlineRect.h, 55);
          assert.equal(metrics.logoStripRect.w, 892);
          assert.equal(metrics.logoStripRect.h, 56);
          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, 'chromium-1448x1086.png') });
          }
        }

        if (vp.name === '1440') {
          assert.equal(metrics.plateRect.h, 900);
          assert.equal(metrics.videoRect.h, 900);
          assert.equal(metrics.plateRect.bottom, 900);
          assert.equal(metrics.videoRect.bottom, 900);
        }

        if (vp.width <= 820) {
          assert.equal(metrics.navLinksVisible, false, `${b.id}@${vp.name}: navLinks must hide on phones <= 820px`);
          assert.equal(metrics.menuBtnVisible, true, `${b.id}@${vp.name}: menuBtn must show on phones <= 820px`);
          assert.equal(metrics.btnPrimaryRect.y, metrics.btnOutlineRect.y, `${b.id}@${vp.name}: buttons must sit side by side on phones`);
          assert.equal(metrics.logoStripRect.w, vp.width, `${b.id}@${vp.name}: logo strip must be full width on phones`);
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

      // Test interactive Samples Modal, Create Modal & Mobile Menu Dropdown
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(250);

      await page.click('#heroSamplesBtn');
      await page.waitForTimeout(300);
      const samplesModalOpen = await page.evaluate(() => {
        const m = document.getElementById('samplesModal');
        const n = document.getElementById('sampleName');
        return {
          isOpen: m.classList.contains('is-open'),
          name: n ? n.textContent : '',
        };
      });
      assert.equal(samplesModalOpen.isOpen, true);
      assert.equal(samplesModalOpen.name, 'Soren Lindqvist — Spatial Interface Monograph');

      await page.click('[data-select-sample="1"]');
      await page.waitForTimeout(200);
      const switchedSample = await page.evaluate(() => document.getElementById('sampleName').textContent);
      assert.equal(switchedSample, 'Mireia Valls — Real-Time Shader & WebGL Studio');

      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const samplesModalClosed = await page.evaluate(() => !document.getElementById('samplesModal').classList.contains('is-open'));
      assert.equal(samplesModalClosed, true);

      await page.click('#heroCreateBtn');
      await page.waitForTimeout(300);
      await page.fill('#createHandleInput', 'eclipsio.site/soren');
      await page.click('#createForm button[type="submit"]');
      await page.waitForTimeout(200);
      const createStatus = await page.evaluate(() => document.getElementById('createStatus').textContent);
      assert.equal(createStatus.includes('Reserved eclipsio.site/soren'), true);

      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);

      // Test mobile menu dropdown at 375x812
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(250);
      await page.click('#menuBtn');
      await page.waitForTimeout(250);
      const mobileDropdownOpen = await page.evaluate(() => document.getElementById('mobileDropdown').classList.contains('is-open'));
      assert.equal(mobileDropdownOpen, true);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(250);
      const mobileDropdownClosed = await page.evaluate(() => !document.getElementById('mobileDropdown').classList.contains('is-open'));
      assert.equal(mobileDropdownClosed, true);

      assert.equal(allConsoleErrors.length, 0, `${b.id}: total console errors: ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: total page errors: ${allPageErrors.join('; ')}`);

      entry.interactions = {
        samplesModalOpen,
        switchedSample,
        samplesModalClosed,
        createStatus,
        mobileDropdownOpen,
        mobileDropdownClosed,
        totalConsoleErrors: allConsoleErrors.length,
        totalPageErrors: allPageErrors.length,
      };

      report.browsers[b.id] = entry;
      await browser.close();
      console.log(`PASS ${b.id} (${version})`);
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2));
    console.log('ALL 4 BROWSERS & 8 VIEWPORTS PASSED');
  } finally {
    server.close();
  }
})();
