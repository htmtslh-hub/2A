const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/camper');
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
  { name: '1440', width: 1440, height: 900, expectedMode: 'exact' },
  { name: '820', width: 820, height: 1180, expectedMode: 'tablet' },
  { name: '375', width: 375, height: 812, expectedMode: 'compact' },
  { name: '320', width: 320, height: 740, expectedMode: 'compact' },
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
          const bg = document.getElementById('bg');
          const explore = document.querySelector('#hero .explore');
          return bg && bg.readyState >= 2 && explore && !explore.style.clipPath;
        },
        null,
        { timeout: 45000 }
      );
      await page.waitForTimeout(400);

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
          const app = document.getElementById('app');
          const bg = document.getElementById('bg');
          const h1Lines = Array.from(document.querySelectorAll('#hero h1 .ln > span')).map((s) =>
            s.textContent.trim()
          );
          const explore = document.querySelector('#hero .explore');
          const logo = document.querySelector('#masthead .logo');
          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            mode: app ? app.dataset.mode : '',
            menu: app ? app.dataset.menu : '',
            videoReady: Boolean(bg && bg.readyState >= 2),
            h1Lines,
            logoText: logo ? logo.textContent.trim() : '',
            exploreText: explore ? explore.textContent.trim() : '',
            exploreBg: explore ? getComputedStyle(explore).backgroundColor : '',
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow`);
        assert.equal(metrics.mode, vp.expectedMode, `${b.id}@${vp.name}: expected mode ${vp.expectedMode}, got ${metrics.mode}`);
        assert.equal(metrics.videoReady, true, `${b.id}@${vp.name}: video not ready`);
        assert.deepEqual(metrics.h1Lines, ['Overnight', 'Camp'], `${b.id}@${vp.name}: h1 lines mismatch`);
        assert.equal(metrics.logoText, 'Camper', `${b.id}@${vp.name}: logo mismatch`);
        assert.equal(metrics.exploreText, 'Explore', `${b.id}@${vp.name}: explore mismatch`);
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
        await sharp(path.join(OUT_DIR, 'chromium-1440.png'))
          .resize(698, 524, { fit: 'cover', position: 'center' })
          .webp({ quality: 86 })
          .toFile(path.join(PREVIEW_DIR, 'camper.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-820.png'))
          .resize(698, 1004, { fit: 'cover', position: 'center' })
          .webp({ quality: 86 })
          .toFile(path.join(PREVIEW_DIR, 'camper-tablet.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-375.png'))
          .resize(698, 1511, { fit: 'cover', position: 'center' })
          .webp({ quality: 86 })
          .toFile(path.join(PREVIEW_DIR, 'camper-mobile.webp'));
      }

      // Desktop interaction: click nav link "Travel" -> becomes .is-active, then back to "Home"
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(250);
      await page.locator('#links a', { hasText: 'Travel' }).click();
      const travelActive = await page.evaluate(() =>
        document.querySelectorAll('#links a')[1].classList.contains('is-active')
      );
      assert.equal(travelActive, true);
      await page.locator('#links a', { hasText: 'Home' }).click();

      // Tablet/Compact drawer interaction at 820x1180
      await page.setViewportSize({ width: 820, height: 1180 });
      await page.waitForTimeout(250);
      await page.locator('#menu-btn').click();
      await page.waitForTimeout(250);
      const menuOpenState = await page.evaluate(() => ({
        menu: document.getElementById('app').dataset.menu,
        expanded: document.getElementById('menu-btn').getAttribute('aria-expanded'),
      }));
      assert.equal(menuOpenState.menu, 'open');
      assert.equal(menuOpenState.expanded, 'true');

      await page.keyboard.press('Escape');
      await page.waitForTimeout(250);
      const menuClosedState = await page.evaluate(() => ({
        menu: document.getElementById('app').dataset.menu,
        expanded: document.getElementById('menu-btn').getAttribute('aria-expanded'),
      }));
      assert.equal(menuClosedState.menu, 'closed');
      assert.equal(menuClosedState.expanded, 'false');

      // Reduced motion check
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(150);
      const reducedTransitionDuration = await page.evaluate(
        () => getComputedStyle(document.getElementById('scrim')).transitionDuration
      );

      assert.equal(allConsoleErrors.length, 0, `${b.id}: console errors ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: page errors ${allPageErrors.join('; ')}`);

      entry.interactions = {
        navActiveSwitch: travelActive,
        drawerOpened: menuOpenState.menu === 'open',
        drawerClosedOnEscape: menuClosedState.menu === 'closed',
        reducedMotionTransitionDuration: reducedTransitionDuration,
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
