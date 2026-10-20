const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/oceanpulse');
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
  { name: '1440', width: 1440, height: 900, preview: 'oceanpulse.webp', previewSize: [1280, 800] },
  { name: '1024', width: 1024, height: 768 },
  { name: '820', width: 820, height: 1180, preview: 'oceanpulse-tablet.webp', previewSize: [820, 1180] },
  { name: '768', width: 768, height: 1024 },
  { name: '740x360', width: 740, height: 360 },
  { name: '375', width: 375, height: 812, preview: 'oceanpulse-mobile.webp', previewSize: [375, 812] },
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
          const v = document.querySelector('.hero__video');
          return v && v.readyState >= 2;
        },
        null,
        { timeout: 60000 }
      );
      // Wait for all staggered entrance animations (--d:19 * 72ms + 820ms = ~2.2s) to finish
      await page.waitForTimeout(2400);

      for (const vp of VIEWPORTS) {
        const vpErrors = [];
        const onConsole = (m) => {
          if (m.type() === 'error' && !m.text().includes('__cf_bm')) vpErrors.push(m.text());
        };
        const onPageErr = (e) => vpErrors.push(e.message);
        page.on('console', onConsole);
        page.on('pageerror', onPageErr);

        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(b.id === 'chromium' && vp.preview ? 700 : 350);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const hero = document.querySelector('.hero');
          const media = document.querySelector('.hero__media');
          const left = document.querySelector('.hero__left');
          const navLinks = document.querySelector('.nav__links');
          const markers = Array.from(document.querySelectorAll('.marker'));
          const mobileSocials = document.querySelector('.socials--mobile');
          const video = document.querySelector('.hero__video');

          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            scrollHeight: doc.scrollHeight,
            innerHeight: window.innerHeight,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            verticalOverflow: doc.scrollHeight > window.innerHeight,
            domOrderMediaFirst: hero ? hero.children[0] === media && hero.children[1] === left : false,
            leftZIndex: left ? getComputedStyle(left).zIndex : null,
            leftOrder: left ? getComputedStyle(left).order : null,
            mediaOrder: media ? getComputedStyle(media).order : null,
            navLinksVisible: navLinks ? getComputedStyle(navLinks).display !== 'none' : false,
            markersVisible: markers.every((m) => getComputedStyle(m).display !== 'none'),
            mobileSocialsVisible: mobileSocials ? getComputedStyle(mobileSocials).display !== 'none' : false,
            videoReadyState: video ? video.readyState : 0,
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow (${metrics.scrollWidth} > ${metrics.clientWidth})`);
        assert.equal(metrics.verticalOverflow, false, `${b.id}@${vp.name}: vertical overflow (${metrics.scrollHeight} > ${metrics.innerHeight})`);
        assert.equal(metrics.domOrderMediaFirst, true, `${b.id}@${vp.name}: .hero__media must be first in DOM`);
        assert.equal(metrics.leftZIndex, 'auto', `${b.id}@${vp.name}: .hero__left must not have a z-index`);
        assert.equal(metrics.navLinksVisible, vp.width > 1024, `${b.id}@${vp.name}: nav__links visibility mismatch`);
        assert.equal(metrics.markersVisible, vp.width > 768, `${b.id}@${vp.name}: markers visibility mismatch`);
        assert.equal(metrics.mobileSocialsVisible, vp.width <= 768, `${b.id}@${vp.name}: socials--mobile visibility mismatch`);
        assert.equal(vpErrors.length, 0, `${b.id}@${vp.name}: console/page errors: ${vpErrors.join('; ')}`);

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

      // Test interactive slide-in nav sheet & syncBurgerContrast at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(300);
      await page.click('#navToggle');
      await page.waitForTimeout(750);

      const desktopSheetOpen = await page.evaluate(() => {
        const btn = document.getElementById('navToggle');
        const sheet = document.getElementById('navSheet');
        return {
          isOpen: sheet.classList.contains('is-open'),
          hasInert: sheet.hasAttribute('inert'),
          btnActive: btn.classList.contains('is-active'),
          onPanel: btn.classList.contains('burger--on-panel'),
          bodyNavOpen: document.body.classList.contains('nav-open'),
          ariaExpanded: btn.getAttribute('aria-expanded'),
          ariaLabel: btn.getAttribute('aria-label'),
        };
      });

      assert.equal(desktopSheetOpen.isOpen, true, `${b.id}: sheet should open at 1440`);
      assert.equal(desktopSheetOpen.hasInert, false, `${b.id}: inert should be removed when open`);
      assert.equal(desktopSheetOpen.btnActive, true, `${b.id}: burger should have is-active`);
      assert.equal(desktopSheetOpen.onPanel, false, `${b.id}: at 1440px burger is in left column, not over right panel`);
      assert.equal(desktopSheetOpen.ariaExpanded, 'true');
      assert.equal(desktopSheetOpen.ariaLabel, 'Close menu');

      if (b.id === 'chromium') {
        await page.screenshot({ path: path.join(OUT_DIR, 'chromium-1440-menu.png') });
      }

      // Close via Escape key
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      const desktopSheetClosed = await page.evaluate(() => {
        const btn = document.getElementById('navToggle');
        const sheet = document.getElementById('navSheet');
        return {
          isOpen: sheet.classList.contains('is-open'),
          hasInert: sheet.hasAttribute('inert'),
          ariaExpanded: btn.getAttribute('aria-expanded'),
          focusedId: document.activeElement ? document.activeElement.id : null,
        };
      });
      assert.equal(desktopSheetClosed.isOpen, false, `${b.id}: Escape should close sheet`);
      assert.equal(desktopSheetClosed.hasInert, true, `${b.id}: inert should be restored when closed`);
      assert.equal(desktopSheetClosed.focusedId, 'navToggle', `${b.id}: Escape should return focus to #navToggle`);

      // Test at 375x812 where panel covers 100% width and burger lands on dark panel
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(300);
      await page.click('#navToggle');
      await page.waitForTimeout(750);

      const mobileSheetOpen = await page.evaluate(() => {
        const btn = document.getElementById('navToggle');
        return {
          onPanel: btn.classList.contains('burger--on-panel'),
          computedColor: getComputedStyle(btn).color,
        };
      });
      assert.equal(mobileSheetOpen.onPanel, true, `${b.id}: at 375px burger lands on dark panel`);
      assert.equal(mobileSheetOpen.computedColor, 'rgb(255, 255, 255)', `${b.id}: burger on dark panel must be white`);

      // Close via clicking a menu link
      await page.click('.navsheet__link');
      await page.waitForTimeout(500);
      const mobileSheetClosed = await page.evaluate(() => {
        const sheet = document.getElementById('navSheet');
        return !sheet.classList.contains('is-open');
      });
      assert.equal(mobileSheetClosed, true, `${b.id}: clicking menu link should close sheet`);

      assert.equal(allConsoleErrors.length, 0, `${b.id}: total console errors: ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: total page errors: ${allPageErrors.join('; ')}`);

      entry.interactions = {
        desktopSheetOpen,
        desktopSheetClosed,
        mobileSheetOpen,
        mobileSheetClosed,
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
