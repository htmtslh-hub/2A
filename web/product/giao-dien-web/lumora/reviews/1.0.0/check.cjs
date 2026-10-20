const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/lumora');
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
        if (m.type() === 'error' && !m.text().includes('__cf_bm')) allConsoleErrors.push(m.text());
      });
      page.on('pageerror', (e) => allPageErrors.push(e.message));

      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(
        () => {
          const v0 = document.getElementById('lumora-video-0');
          const overlay = document.getElementById('lumora-png-overlay');
          return v0 && v0.readyState >= 2 && overlay && overlay.complete && overlay.naturalWidth > 0;
        },
        null,
        { timeout: 60000 }
      );
      await page.waitForTimeout(800);

      for (const vp of VIEWPORTS) {
        const vpErrors = [];
        const onConsole = (m) => {
          if (m.type() === 'error') vpErrors.push(m.text());
        };
        const onPageErr = (e) => vpErrors.push(e.message);
        page.on('console', onConsole);
        page.on('pageerror', onPageErr);

        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(350);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const v0 = document.getElementById('lumora-video-0');
          const overlay = document.getElementById('lumora-png-overlay');
          const desktopNav = document.getElementById('lumora-desktop-nav');
          const mobileToggle = document.getElementById('lumora-mobile-toggle');
          const heading = document.getElementById('lumora-heading');
          const badge = document.getElementById('lumora-badge');
          const stats = document.getElementById('lumora-bottom-stats');

          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            video0Ready: Boolean(v0 && v0.readyState >= 2),
            overlayLoaded: Boolean(overlay && overlay.complete && overlay.naturalWidth > 0),
            overlayAnimName: overlay ? getComputedStyle(overlay).animationName : '',
            desktopNavVisible: desktopNav ? getComputedStyle(desktopNav).display !== 'none' : false,
            mobileToggleVisible: mobileToggle
              ? getComputedStyle(mobileToggle).display !== 'none'
              : false,
            headingColor: heading ? getComputedStyle(heading).color : '',
            badgeText: badge ? badge.textContent.trim() : '',
            statsCount: stats ? stats.querySelectorAll('span:not([aria-hidden="true"])').length : 0,
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow`);
        assert.equal(metrics.video0Ready, true, `${b.id}@${vp.name}: video 0 not ready`);
        assert.equal(metrics.overlayLoaded, true, `${b.id}@${vp.name}: overlay PNG not loaded`);
        assert.equal(metrics.overlayAnimName, 'train-bob', `${b.id}@${vp.name}: train-bob missing`);
        assert.equal(
          metrics.desktopNavVisible,
          vp.isDesktop,
          `${b.id}@${vp.name}: desktopNavVisible`
        );
        assert.equal(
          metrics.mobileToggleVisible,
          !vp.isDesktop,
          `${b.id}@${vp.name}: mobileToggleVisible`
        );
        assert.equal(metrics.statsCount, 4, `${b.id}@${vp.name}: expected 4 stats`);
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
          .toFile(path.join(PREVIEW_DIR, 'lumora.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-820.png'))
          .resize(698, 1004, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'lumora-tablet.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-375.png'))
          .resize(698, 1511, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'lumora-mobile.webp'));
      }

      // Interactive checks at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(250);

      // 1. Switch to Deep Woods (index 2) and verify #182C41 dark text mode + 1000ms cooldown
      await page.locator('#lumora-scene-btn-2').click();
      // Click index 3 immediately during cooldown — should be ignored!
      await page.locator('#lumora-scene-btn-3').click();
      await page.waitForTimeout(800);

      const deepWoodsState = await page.evaluate(() => ({
        v2Active: document.getElementById('lumora-video-2').className.includes('opacity-100'),
        v3Active: document.getElementById('lumora-video-3').className.includes('opacity-100'),
        headingColor: getComputedStyle(document.getElementById('lumora-heading')).color,
        logoColor: getComputedStyle(document.getElementById('lumora-logo')).color,
      }));
      assert.equal(deepWoodsState.v2Active, true, `${b.id}: Deep Woods should be active`);
      assert.equal(deepWoodsState.v3Active, false, `${b.id}: Cooldown should block immediate click`);
      assert.equal(
        deepWoodsState.headingColor,
        'rgb(24, 44, 65)',
        `${b.id}: Deep Woods heading should be #182C41`
      );
      assert.equal(
        deepWoodsState.logoColor,
        'rgb(255, 255, 255)',
        `${b.id}: Logo must stay white on Deep Woods`
      );

      // Wait for cooldown to finish, then switch back to Golden Hour (index 0)
      await page.waitForTimeout(350);
      await page.locator('#lumora-scene-btn-0').click();
      await page.waitForTimeout(1050);

      // 2. Email input submission
      await page.fill('#lumora-email-input', 'focus@lumora.app');
      await page.locator('#lumora-early-access-btn').click();
      await page.waitForTimeout(150);
      const btnText = await page.locator('#lumora-early-access-btn').textContent();
      assert.equal(btnText.trim(), 'Joined');

      // 3. Mobile menu overlay at 375x812
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(250);
      await page.locator('#lumora-mobile-toggle').click();
      await page.waitForTimeout(300);
      const mobileExpanded = await page.locator('#lumora-mobile-toggle').getAttribute('aria-expanded');
      assert.equal(mobileExpanded, 'true');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const mobileClosed = await page.locator('#lumora-mobile-toggle').getAttribute('aria-expanded');
      assert.equal(mobileClosed, 'false');

      assert.equal(
        allConsoleErrors.length,
        0,
        `${b.id}: console errors ${allConsoleErrors.join('; ')}`
      );
      assert.equal(allPageErrors.length, 0, `${b.id}: page errors ${allPageErrors.join('; ')}`);

      entry.interactions = {
        deepWoodsActive: deepWoodsState.v2Active,
        cooldownBlockedImmediateClick: !deepWoodsState.v3Active,
        deepWoodsHeadingColor: deepWoodsState.headingColor,
        navbarLogoStayedWhite: deepWoodsState.logoColor === 'rgb(255, 255, 255)',
        earlyAccessSubmitted: btnText.trim() === 'Joined',
        mobileMenuOpenAndEscape: mobileExpanded === 'true' && mobileClosed === 'false',
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
