const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/securify');
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
          const video = document.querySelector('video');
          return video && video.readyState >= 2;
        },
        null,
        { timeout: 60000 }
      );
      await page.waitForTimeout(800);

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
          const video = document.querySelector('video');
          const headlines = Array.from(document.querySelectorAll('h1.hero-title')).map((el) =>
            el.textContent.trim()
          );
          const navLinksPill = document.querySelector('#securify-nav-platform')?.parentElement;
          const navLinksVisible = navLinksPill
            ? getComputedStyle(navLinksPill).display !== 'none'
            : false;
          const dividers = Array.from(document.querySelectorAll('span.h-px.w-24'));
          const dividersVisible = dividers.every((d) => getComputedStyle(d).display !== 'none');
          const bodyBg = getComputedStyle(document.body).backgroundColor;
          const bodyFont = getComputedStyle(document.body).fontFamily;

          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            videoReady: Boolean(video && video.readyState >= 2),
            headlines,
            navLinksVisible,
            dividersVisible,
            bodyBg,
            bodyFont,
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow`);
        assert.equal(metrics.videoReady, true, `${b.id}@${vp.name}: video not ready`);
        assert.deepEqual(
          metrics.headlines,
          ['protect', 'your', 'data'],
          `${b.id}@${vp.name}: headlines mismatch`
        );
        assert.equal(
          metrics.navLinksVisible,
          vp.isDesktop,
          `${b.id}@${vp.name}: navLinksVisible mismatch`
        );
        assert.equal(
          metrics.dividersVisible,
          vp.isDesktop,
          `${b.id}@${vp.name}: dividersVisible mismatch`
        );
        assert.equal(metrics.bodyBg, 'rgb(0, 0, 0)', `${b.id}@${vp.name}: body background not #000`);
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
          .toFile(path.join(PREVIEW_DIR, 'securify.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-820.png'))
          .resize(698, 1004, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'securify-tablet.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-375.png'))
          .resize(698, 1511, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'securify-mobile.webp'));
      }

      // Interactive checks at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(250);

      // 1. Click "platform" nav link -> opens monochrome modal
      await page.locator('#securify-nav-platform').click();
      await page.locator('#securify-modal').waitFor({ state: 'visible' });
      const modalHeading = await page.locator('#securify-modal h2').textContent();
      assert.equal(modalHeading.trim(), 'zero-knowledge data vault platform');

      // 2. Close with Escape
      await page.keyboard.press('Escape');
      await page.locator('#securify-modal').waitFor({ state: 'detached' });

      // 3. Click "get started" button -> provision vault flow
      await page.locator('#securify-get-started-btn').click();
      await page.locator('#securify-modal').waitFor({ state: 'visible' });
      await page.fill('#securify-email-input', 'ops@securify.io');
      await page.locator('#securify-provision-submit').click();
      await page.locator('#securify-provision-success').waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await page.locator('#securify-modal').waitFor({ state: 'detached' });

      assert.equal(
        allConsoleErrors.length,
        0,
        `${b.id}: console errors ${allConsoleErrors.join('; ')}`
      );
      assert.equal(allPageErrors.length, 0, `${b.id}: page errors ${allPageErrors.join('; ')}`);

      entry.interactions = {
        platformModalOpened: modalHeading.trim() === 'zero-knowledge data vault platform',
        getStartedVaultProvisioned: true,
        escapeClosesModal: true,
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
