const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/sellix');
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
  { name: '1440', width: 1440, height: 900, expectBurger: false },
  { name: '1280', width: 1280, height: 800, expectBurger: false },
  { name: '820', width: 820, height: 1180, expectBurger: true },
  { name: '375', width: 375, height: 812, expectBurger: true },
  { name: '320', width: 320, height: 740, expectBurger: true },
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
          const rootEl = document.documentElement;
          const vA = document.getElementById('bgVideoA');
          const vB = document.getElementById('bgVideoB');
          return (
            vA &&
            vB &&
            vA.readyState >= 2 &&
            !rootEl.classList.contains('anim') &&
            !rootEl.classList.contains('go')
          );
        },
        null,
        { timeout: 45000 }
      );
      await page.waitForTimeout(300);

      for (const vp of VIEWPORTS) {
        const vpErrors = [];
        const onConsole = (m) => {
          if (m.type() === 'error') vpErrors.push(m.text());
        };
        const onPageErr = (e) => vpErrors.push(e.message);
        page.on('console', onConsole);
        page.on('pageerror', onPageErr);

        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(300);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const body = document.body;
          const vA = document.getElementById('bgVideoA');
          const vB = document.getElementById('bgVideoB');
          const h1 = document.querySelector('h1');
          const lnEls = Array.from(document.querySelectorAll('h1 .ln-i'));
          const h1Lh = parseFloat(getComputedStyle(h1).lineHeight) || 1;
          const ln1Height = lnEls[0] ? lnEls[0].getBoundingClientRect().height : 0;
          const ln2Height = lnEls[1] ? lnEls[1].getBoundingClientRect().height : 0;
          const burger = document.getElementById('burger');
          const navLinks = document.querySelector('.nav-links');
          const ctas = Array.from(document.querySelectorAll('.ctas .btn')).map((el) =>
            el.textContent.trim()
          );
          return {
            title: document.title,
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            htmlOverflow: getComputedStyle(doc).overflow,
            bodyOverflow: getComputedStyle(body).overflow,
            animDetached: !doc.classList.contains('anim') && !doc.classList.contains('go'),
            videoAReady: Boolean(vA && vA.readyState >= 2),
            videoBExists: Boolean(vB),
            activeVideosCount: document.querySelectorAll('.bg-video.is-active').length,
            logoText: document.querySelector('.logo')?.textContent?.trim() || '',
            h1Lines: lnEls.map((s) => s.textContent.trim()),
            line1SingleLine: ln1Height <= h1Lh * 1.2,
            line2SingleLine: ln2Height <= h1Lh * 1.2,
            burgerVisible: getComputedStyle(burger).display !== 'none',
            navLinksVisible: getComputedStyle(navLinks).display !== 'none',
            ctas,
          };
        });

        assert.equal(metrics.title, 'Sellix — Cross-border finance', `${b.id}@${vp.name}: title mismatch`);
        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow`);
        assert.equal(metrics.htmlOverflow, 'hidden', `${b.id}@${vp.name}: html overflow not hidden`);
        assert.equal(metrics.bodyOverflow, 'hidden', `${b.id}@${vp.name}: body overflow not hidden`);
        assert.equal(metrics.animDetached, true, `${b.id}@${vp.name}: entrance classes not detached`);
        assert.equal(metrics.videoAReady, true, `${b.id}@${vp.name}: video A not ready`);
        assert.equal(metrics.videoBExists, true, `${b.id}@${vp.name}: video B missing`);
        assert.equal(metrics.activeVideosCount, 1, `${b.id}@${vp.name}: active video count != 1`);
        assert.equal(metrics.logoText, 'Sellix', `${b.id}@${vp.name}: logo mismatch`);
        assert.deepEqual(metrics.h1Lines, ['Cross-border', 'finance'], `${b.id}@${vp.name}: h1 lines mismatch`);
        assert.equal(metrics.line1SingleLine, true, `${b.id}@${vp.name}: 'Cross-border' wrapped onto multiple lines`);
        assert.equal(metrics.line2SingleLine, true, `${b.id}@${vp.name}: 'finance' wrapped onto multiple lines`);
        assert.equal(metrics.burgerVisible, vp.expectBurger, `${b.id}@${vp.name}: burger visibility mismatch`);
        assert.equal(metrics.navLinksVisible, !vp.expectBurger, `${b.id}@${vp.name}: navLinks visibility mismatch`);
        assert.deepEqual(metrics.ctas, ['Get Started', 'Contact Sales'], `${b.id}@${vp.name}: CTA labels mismatch`);
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

      // Generate store WebP previews from Chromium screenshots
      if (b.id === 'chromium') {
        await page.setViewportSize({ width: 1396, height: 1048 });
        await page.waitForTimeout(250);
        const thumbBuf = await page.screenshot({ fullPage: false });
        await sharp(thumbBuf)
          .resize(698, 524, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'sellix.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-820.png'))
          .resize(698, 1004, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'sellix-tablet.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-375.png'))
          .resize(698, 1511, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'sellix-mobile.webp'));
      }

      // Tablet/Mobile menu interaction at 820x1180
      await page.setViewportSize({ width: 820, height: 1180 });
      await page.waitForTimeout(200);
      await page.click('#burger');
      await page.waitForTimeout(250);
      const menuOpenState = await page.evaluate(() => ({
        open: document.getElementById('menu').classList.contains('open'),
        expanded: document.getElementById('burger').getAttribute('aria-expanded'),
        label: document.getElementById('burger').getAttribute('aria-label'),
      }));
      assert.equal(menuOpenState.open, true);
      assert.equal(menuOpenState.expanded, 'true');
      assert.equal(menuOpenState.label, 'Close menu');

      if (b.id === 'chromium') {
        await page.screenshot({ path: path.join(OUT_DIR, 'chromium-820-menu.png'), fullPage: false });
      }

      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
      const menuClosedState = await page.evaluate(() => ({
        open: document.getElementById('menu').classList.contains('open'),
        expanded: document.getElementById('burger').getAttribute('aria-expanded'),
        label: document.getElementById('burger').getAttribute('aria-label'),
        focusedId: document.activeElement ? document.activeElement.id : '',
      }));
      assert.equal(menuClosedState.open, false);
      assert.equal(menuClosedState.expanded, 'false');
      assert.equal(menuClosedState.label, 'Open menu');
      assert.equal(menuClosedState.focusedId, 'burger');

      // Dual-video crossfade verification: seek active video near end (duration - 0.5s) and verify swap
      await page.setViewportSize({ width: 1280, height: 800 });
      const swapResult = await page.evaluate(async () => {
        const A = document.getElementById('bgVideoA');
        const B = document.getElementById('bgVideoB');
        const beforeActive = A.classList.contains('is-active') ? 'bgVideoA' : 'bgVideoB';
        const activeVid = beforeActive === 'bgVideoA' ? A : B;
        if (activeVid.duration > 2) {
          activeVid.currentTime = activeVid.duration - 0.5;
          activeVid.dispatchEvent(new Event('timeupdate'));
        }
        await new Promise((r) => setTimeout(r, 150));
        const afterActive = A.classList.contains('is-active') ? 'bgVideoA' : 'bgVideoB';
        return { beforeActive, afterActive, swapped: beforeActive !== afterActive };
      });
      assert.equal(swapResult.swapped, true, `${b.id}: dual-video crossfade did not swap`);

      await context.close();

      // Reduced motion context check (fresh page load with reducedMotion: 'reduce')
      const rmContext = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        reducedMotion: 'reduce',
      });
      const rmPage = await rmContext.newPage();
      await rmPage.goto(url, { waitUntil: 'load', timeout: 60000 });
      await rmPage.waitForTimeout(300);
      const rmState = await rmPage.evaluate(() => {
        const doc = document.documentElement;
        const A = document.getElementById('bgVideoA');
        const B = document.getElementById('bgVideoB');
        return {
          hasAnim: doc.classList.contains('anim'),
          hasGo: doc.classList.contains('go'),
          videoAPaused: A.paused,
          videoBPaused: B.paused,
          videoATime: A.currentTime,
        };
      });
      assert.equal(rmState.hasAnim, false, `${b.id}: reduced-motion should not set html.anim`);
      assert.equal(rmState.hasGo, false, `${b.id}: reduced-motion should not set html.go`);
      assert.equal(rmState.videoAPaused, true, `${b.id}: reduced-motion should pause video A`);
      assert.equal(rmState.videoBPaused, true, `${b.id}: reduced-motion should pause video B`);
      assert.equal(rmState.videoATime, 0, `${b.id}: reduced-motion should hold video A at t=0`);
      await rmContext.close();

      assert.equal(allConsoleErrors.length, 0, `${b.id}: console errors ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: page errors ${allPageErrors.join('; ')}`);

      entry.interactions = {
        menuOpened: menuOpenState.open,
        menuClosedOnEscape: !menuClosedState.open && menuClosedState.focusedId === 'burger',
        dualVideoCrossfadeSwapped: swapResult.swapped,
        reducedMotionStatic: rmState,
        totalConsoleErrors: allConsoleErrors.length,
        totalPageErrors: allPageErrors.length,
      };

      report.browsers[b.id] = entry;
      await browser.close();
      console.log(`PASS ${b.id} (${version})`);
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2));
    console.log('ALL 4 BROWSERS PASSED');
  } finally {
    server.close();
  }
})();
