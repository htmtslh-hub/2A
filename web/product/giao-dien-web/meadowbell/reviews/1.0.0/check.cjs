const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/meadowbell');
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
  { name: '1440x1280', width: 1440, height: 1280 },
  { name: '1440', width: 1440, height: 900, preview: 'meadowbell.webp', previewSize: [1280, 800] },
  { name: '1024', width: 1024, height: 768 },
  { name: '820', width: 820, height: 1180, preview: 'meadowbell-tablet.webp', previewSize: [820, 1180] },
  { name: '768', width: 768, height: 1024 },
  { name: '740x360', width: 740, height: 360 },
  { name: '375', width: 375, height: 812, preview: 'meadowbell-mobile.webp', previewSize: [375, 812] },
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

      const context = await browser.newContext({ viewport: { width: 1440, height: 1280 } });
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
          const plate = document.querySelector('.scene__plate');
          const video = document.querySelector('.scene__video');
          const cards = Array.from(document.querySelectorAll('.chapter-card__img'));
          return (
            plate &&
            plate.complete &&
            plate.naturalWidth > 0 &&
            video &&
            video.readyState >= 2 &&
            cards.length === 3 &&
            cards.every((c) => c.complete && c.naturalWidth > 0)
          );
        },
        null,
        { timeout: 60000 }
      );
      // Wait for the Web Animations entrance sequence to settle
      await page.waitForTimeout(1800);

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
        await page.waitForTimeout(b.id === 'chromium' && (vp.preview || vp.name === '1440x1280') ? 600 : 300);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const hero = document.querySelector('.hero');
          const plate = document.querySelector('.scene__plate');
          const video = document.querySelector('.scene__video');
          const logo = document.getElementById('navLogo');
          const navPill = document.getElementById('navPill');
          const navJoin = document.getElementById('navJoin');
          const kicker = document.getElementById('heroKicker');
          const headline = document.getElementById('heroHeadline');
          const heroJoin = document.getElementById('heroJoin');
          const heroPreview = document.getElementById('heroPreview');
          const chapTitle = document.getElementById('chaptersTitle');
          const chapBrowse = document.getElementById('chaptersBrowse');
          const cards = Array.from(document.querySelectorAll('.chapter-card'));

          const r = (el) => {
            if (!el) return null;
            const b = el.getBoundingClientRect();
            return {
              x: Math.round(b.left),
              y: Math.round(b.top),
              w: Math.round(b.width),
              h: Math.round(b.height),
              right: Math.round(b.right),
            };
          };

          const heroRect = r(hero);
          const videoRect = r(video);

          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            heroRect,
            plateRect: r(plate),
            videoRect,
            videoRatioToHeroHeight: heroRect && videoRect ? Number((videoRect.h / heroRect.h).toFixed(4)) : null,
            videoTopRatioToHeroHeight: heroRect && videoRect ? Number((videoRect.y / heroRect.h).toFixed(4)) : null,
            logoRect: r(logo),
            navPillRect: r(navPill),
            navPillVisible: navPill ? getComputedStyle(navPill).display !== 'none' : false,
            navJoinRect: r(navJoin),
            kickerRect: r(kicker),
            headlineRect: r(headline),
            headlineFontSize: headline ? Math.round(parseFloat(getComputedStyle(headline).fontSize)) : null,
            heroJoinRect: r(heroJoin),
            heroPreviewRect: r(heroPreview),
            chapTitleRect: r(chapTitle),
            chapBrowseRect: r(chapBrowse),
            cardRects: cards.map(r),
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow (${metrics.scrollWidth} > ${metrics.clientWidth})`);
        assert.equal(vpErrors.length, 0, `${b.id}@${vp.name}: console/page errors: ${vpErrors.join('; ')}`);

        if (vp.name === '1440x1280') {
          assert.equal(metrics.heroRect.w, 1440);
          assert.equal(metrics.heroRect.h, 1280);
          assert.equal(metrics.videoRatioToHeroHeight, 1.125, `${b.id}: video height must be 112.5% of hero plate`);
          assert.equal(metrics.videoTopRatioToHeroHeight, -0.0625, `${b.id}: video top must be -6.25% of hero plate`);
          assert.equal(metrics.logoRect.x, 31);
          assert.equal(metrics.logoRect.y, 23);
          assert.equal(metrics.navPillRect.x, 443);
          assert.equal(metrics.navPillRect.y, 13);
          assert.equal(metrics.navPillRect.w, 546);
          assert.equal(metrics.navPillRect.h, 50);
          assert.equal(metrics.navJoinRect.x, 1311);
          assert.equal(metrics.navJoinRect.y, 14);
          assert.equal(metrics.navJoinRect.w, 105);
          assert.equal(metrics.navJoinRect.h, 45);
          assert.equal(metrics.kickerRect.y, 203);
          assert.equal(metrics.headlineRect.y, 261);
          assert.equal(metrics.heroJoinRect.x, 550);
          assert.equal(metrics.heroJoinRect.y, 617);
          assert.equal(metrics.heroJoinRect.w, 144);
          assert.equal(metrics.heroJoinRect.h, 59);
          assert.equal(metrics.heroPreviewRect.x, 707);
          assert.equal(metrics.heroPreviewRect.y, 619);
          assert.equal(metrics.heroPreviewRect.w, 184);
          assert.equal(metrics.heroPreviewRect.h, 58);
          assert.equal(metrics.chapTitleRect.x, 137);
          assert.equal(metrics.chapTitleRect.y, 866);
          assert.equal(metrics.chapBrowseRect.right, 1308);
          assert.deepEqual(
            metrics.cardRects.map((c) => ({ x: c.x, y: c.y, w: c.w, h: c.h })),
            [
              { x: 133, y: 913, w: 378, h: 273 },
              { x: 531, y: 913, w: 378, h: 273 },
              { x: 929, y: 913, w: 378, h: 273 },
            ]
          );
          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, 'chromium-1440x1280.png') });
          }
        }

        if (vp.width <= 820) {
          assert.equal(metrics.navPillVisible, false, `${b.id}@${vp.name}: nav-pill must hide on phones <= 820px`);
        }
        if (vp.width === 820 || vp.width === 768 || vp.width === 375) {
          assert.equal(metrics.headlineFontSize, 51, `${b.id}@${vp.name}: phone headline should be 51px`);
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

      // Test interactive Chapter Preview modal & Join modal at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(250);

      await page.click('#heroPreview');
      await page.waitForTimeout(350);
      const previewModalOpen = await page.evaluate(() => {
        const m = document.getElementById('chapterModal');
        const t = document.getElementById('modalTitle');
        return {
          isOpen: m.classList.contains('is-open'),
          title: t ? t.textContent : '',
        };
      });
      assert.equal(previewModalOpen.isOpen, true);
      assert.equal(previewModalOpen.title, 'The Heirloom Tomato Stakeout');

      await page.click('[data-select-chapter="2"]');
      await page.waitForTimeout(200);
      const switchedChapter = await page.evaluate(() => document.getElementById('modalTitle').textContent);
      assert.equal(switchedChapter, 'Kite-String Weather at Clover Hill');

      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const previewModalClosed = await page.evaluate(() => !document.getElementById('chapterModal').classList.contains('is-open'));
      assert.equal(previewModalClosed, true);

      await page.click('#heroJoin');
      await page.waitForTimeout(350);
      await page.fill('#joinEmail', 'sprout@meadowbell.studio');
      await page.click('#joinForm button[type="submit"]');
      await page.waitForTimeout(200);
      const joinStatus = await page.evaluate(() => document.getElementById('joinStatus').textContent);
      assert.equal(joinStatus.includes('Welcome to the Sprout Squad'), true);

      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);

      assert.equal(allConsoleErrors.length, 0, `${b.id}: total console errors: ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: total page errors: ${allPageErrors.join('; ')}`);

      entry.interactions = {
        previewModalOpen,
        switchedChapter,
        previewModalClosed,
        joinStatus,
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
