const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/neuralkinetics');
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
  { name: '1440', width: 1440, height: 900, isDesktop: true },
  { name: '820', width: 820, height: 1180, isDesktop: true },
  { name: '375', width: 375, height: 812, isDesktop: false },
  { name: '320', width: 320, height: 740, isDesktop: false },
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

      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(
        () => {
          const video = document.getElementById('nk-bg-video');
          const heading = document.getElementById('nk-heading');
          return video && video.readyState >= 2 && heading;
        },
        null,
        { timeout: 45000 }
      );
      await page.waitForTimeout(1900);

      for (const vp of VIEWPORTS) {
        const vpErrors = [];
        const onConsole = (m) => {
          if (m.type() === 'error') vpErrors.push(m.text());
        };
        const onPageErr = (e) => vpErrors.push(e.message);
        page.on('console', onConsole);
        page.on('pageerror', onPageErr);

        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(400);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const navbar = document.getElementById('nk-navbar');
          const brandText = document.getElementById('nk-brand-text');
          const navTags = document.getElementById('nk-nav-tags');
          const adaptiveLabel = document.getElementById('nk-adaptive-label');
          const circleWhite = document.querySelector('.nk-circle-white');
          const videoWrapper = document.getElementById('nk-video-wrapper');
          const video = document.getElementById('nk-bg-video');
          const footerInner = document.querySelector('.nk-footer-inner');
          const heading = document.getElementById('nk-heading');
          const subtitle = document.getElementById('nk-subtitle');

          const navCs = getComputedStyle(navbar);
          const wrapperRect = videoWrapper.getBoundingClientRect();

          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            navPaddingTop: navCs.paddingTop,
            navPaddingLeft: navCs.paddingLeft,
            circleWidth: circleWhite ? getComputedStyle(circleWhite).width : '',
            brandTextVisible: brandText ? getComputedStyle(brandText).display !== 'none' : false,
            navTagsVisible: navTags ? getComputedStyle(navTags).display !== 'none' : false,
            adaptiveLabelVisible: adaptiveLabel
              ? getComputedStyle(adaptiveLabel).display !== 'none'
              : false,
            videoReady: Boolean(video && video.readyState >= 2),
            videoWrapperRatioW: Math.round((wrapperRect.width / window.innerWidth) * 100),
            videoWrapperRatioH: Math.round((wrapperRect.height / window.innerHeight) * 100),
            footerDirection: footerInner ? getComputedStyle(footerInner).flexDirection : '',
            headingText: heading ? heading.textContent.trim() : '',
            subtitleText: subtitle ? subtitle.textContent.trim() : '',
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow`);
        assert.equal(metrics.videoReady, true, `${b.id}@${vp.name}: video not ready`);
        assert.equal(metrics.brandTextVisible, vp.isDesktop, `${b.id}@${vp.name}: brandTextVisible`);
        assert.equal(metrics.navTagsVisible, vp.isDesktop, `${b.id}@${vp.name}: navTagsVisible`);
        assert.equal(
          metrics.adaptiveLabelVisible,
          vp.isDesktop,
          `${b.id}@${vp.name}: adaptiveLabelVisible`
        );
        assert.equal(
          metrics.circleWidth,
          vp.isDesktop ? '32px' : '28px',
          `${b.id}@${vp.name}: circle size`
        );
        assert.equal(
          metrics.footerDirection,
          vp.isDesktop ? 'row' : 'column',
          `${b.id}@${vp.name}: footerDirection`
        );
        assert.equal(
          metrics.videoWrapperRatioW,
          vp.isDesktop ? 100 : 80,
          `${b.id}@${vp.name}: videoWrapperRatioW`
        );
        assert.equal(
          metrics.subtitleText,
          'Best digital banking card 2026',
          `${b.id}@${vp.name}: subtitle mismatch`
        );
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
          .toFile(path.join(PREVIEW_DIR, 'neuralkinetics.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-820.png'))
          .resize(698, 1004, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'neuralkinetics-tablet.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-375.png'))
          .resize(698, 1511, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'neuralkinetics-mobile.webp'));
      }

      // Interactive checks at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(250);

      // 1. Tag pill switching updates telemetry readout
      await page.locator('#nk-tag-agi').click();
      await page.waitForTimeout(200);
      const telemetryAgi = await page.locator('#nk-telemetry-readout').textContent();
      assert.equal(telemetryAgi.includes('AGI-02'), true);

      await page.locator('#nk-tag-cybernetics').click();
      await page.waitForTimeout(200);
      const telemetryCyb = await page.locator('#nk-telemetry-readout').textContent();
      assert.equal(telemetryCyb.includes('CYB-03'), true);

      // 2. Menu button opens directory drawer & Escape closes it
      await page.locator('#nk-menu-btn').click();
      await page.locator('#nk-menu-panel').waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await page.locator('#nk-menu-panel').waitFor({ state: 'detached' });

      // 3. Adaptive Systems button opens HUD & Escape closes it
      await page.locator('#nk-adaptive-btn').click();
      await page.locator('#nk-systems-panel').waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await page.locator('#nk-systems-panel').waitFor({ state: 'detached' });

      // 4. See Features modal opens, switches currency, & closes
      await page.locator('#nk-see-features-btn').click();
      await page.locator('#nk-features-modal').waitFor({ state: 'visible' });
      await page.locator('.nk-fx-chip', { hasText: 'JPY' }).click();
      await page.waitForTimeout(150);
      const fxText = await page.locator('.nk-fx-result').textContent();
      assert.equal(fxText.includes('JPY'), true);
      await page.keyboard.press('Escape');
      await page.locator('#nk-features-modal').waitFor({ state: 'detached' });

      // 5. How It Works modal opens, submits reservation, & closes
      await page.locator('#nk-how-it-works-btn').click();
      await page.locator('#nk-how-modal').waitFor({ state: 'visible' });
      await page.fill('#nk-reserve-email', 'alex@neuralkinetics.io');
      await page.locator('#nk-how-modal button[type="submit"]').click();
      await page.waitForTimeout(150);
      const modalText = await page.locator('#nk-how-modal').textContent();
      assert.equal(modalText.includes('Priority Allocation Confirmed'), true);
      await page.keyboard.press('Escape');
      await page.locator('#nk-how-modal').waitFor({ state: 'detached' });

      assert.equal(
        allConsoleErrors.length,
        0,
        `${b.id}: console errors ${allConsoleErrors.join('; ')}`
      );
      assert.equal(allPageErrors.length, 0, `${b.id}: page errors ${allPageErrors.join('; ')}`);

      entry.interactions = {
        telemetryAgiSwitched: telemetryAgi.includes('AGI-02'),
        telemetryCyberneticsSwitched: telemetryCyb.includes('CYB-03'),
        menuDrawerToggleAndEscape: true,
        adaptiveSystemsHudAndEscape: true,
        featuresModalCurrencyJpy: fxText.includes('JPY'),
        howModalReservationConfirmed: modalText.includes('Priority Allocation Confirmed'),
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
