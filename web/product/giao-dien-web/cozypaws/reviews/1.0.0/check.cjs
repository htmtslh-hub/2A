const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/cozypaws');
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
  { name: '1440', width: 1440, height: 900, tier: 'desktop' },
  { name: '820', width: 820, height: 1180, tier: 'tablet' },
  { name: '375', width: 375, height: 812, tier: 'mobile' },
  { name: '320', width: 320, height: 740, tier: 'mobile' },
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
          const imgs = Array.from(document.querySelectorAll('img'));
          return imgs.length >= 7 && imgs.every((img) => img.complete && img.naturalWidth > 0);
        },
        null,
        { timeout: 60000 }
      );
      await page.waitForTimeout(1400);

      for (const vp of VIEWPORTS) {
        const vpErrors = [];
        const onConsole = (m) => {
          if (m.type() === 'error' && !m.text().includes('__cf_bm')) vpErrors.push(m.text());
        };
        const onPageErr = (e) => vpErrors.push(e.message);
        page.on('console', onConsole);
        page.on('pageerror', onPageErr);

        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(b.id === 'chromium' ? 2400 : 600);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const desktopHero = document.getElementById('cozypaws-desktop-hero');
          const tabletHero = document.getElementById('cozypaws-tablet-hero');
          const mobileHero = document.getElementById('cozypaws-mobile-hero');
          const centerNav = document.getElementById('cozypaws-center-nav');
          const imgs = Array.from(document.querySelectorAll('img'));

          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            allImagesLoaded: imgs.every((img) => img.complete && img.naturalWidth > 0),
            desktopVisible: desktopHero ? getComputedStyle(desktopHero).display !== 'none' : false,
            tabletVisible: tabletHero ? getComputedStyle(tabletHero).display !== 'none' : false,
            mobileVisible: mobileHero ? getComputedStyle(mobileHero).display !== 'none' : false,
            centerNavVisible: centerNav ? getComputedStyle(centerNav).display !== 'none' : false,
            bodyBg: getComputedStyle(document.body).backgroundColor,
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow`);
        assert.equal(metrics.allImagesLoaded, true, `${b.id}@${vp.name}: not all images loaded`);
        assert.equal(
          metrics.desktopVisible,
          vp.tier === 'desktop',
          `${b.id}@${vp.name}: desktopVisible mismatch`
        );
        assert.equal(
          metrics.tabletVisible,
          vp.tier === 'tablet',
          `${b.id}@${vp.name}: tabletVisible mismatch`
        );
        assert.equal(
          metrics.mobileVisible,
          vp.tier === 'mobile',
          `${b.id}@${vp.name}: mobileVisible mismatch`
        );
        assert.equal(
          metrics.centerNavVisible,
          vp.tier !== 'mobile',
          `${b.id}@${vp.name}: centerNavVisible mismatch`
        );
        assert.equal(
          metrics.bodyBg,
          'rgb(239, 253, 240)',
          `${b.id}@${vp.name}: body background not #EFFDF0`
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
          .toFile(path.join(PREVIEW_DIR, 'cozypaws.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-820.png'))
          .resize(698, 1004, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'cozypaws-tablet.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-375.png'))
          .resize(698, 1511, { fit: 'cover', position: 'center' })
          .webp({ quality: 88 })
          .toFile(path.join(PREVIEW_DIR, 'cozypaws-mobile.webp'));
      }

      // Interactive checks at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(250);

      // 1. Click Favorites button -> badge changes from 4 to 5
      await page.locator('#cozypaws-favorites-btn').click();
      const favBadge = await page.locator('#cozypaws-favorites-badge').textContent();
      assert.equal(favBadge.trim(), '5');

      // 2. Click Cozy Cat House arrow button -> opens product modal -> Add to Cart -> Cart badge becomes 2
      await page.locator('#cozypaws-cat-house-btn').click();
      await page.locator('#cozypaws-modal').waitFor({ state: 'visible' });
      await page.locator('#cozypaws-add-to-cart-btn').click();
      const cartBadge = await page.locator('#cozypaws-cart-badge').textContent();
      assert.equal(cartBadge.trim(), '2');
      await page.keyboard.press('Escape');
      await page.locator('#cozypaws-modal').waitFor({ state: 'detached' });

      // 3. Click Video play button -> opens video review modal -> close with Escape
      await page.locator('#cozypaws-video-play-btn').click();
      await page.locator('#cozypaws-modal').waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await page.locator('#cozypaws-modal').waitFor({ state: 'detached' });

      assert.equal(
        allConsoleErrors.length,
        0,
        `${b.id}: console errors ${allConsoleErrors.join('; ')}`
      );
      assert.equal(allPageErrors.length, 0, `${b.id}: page errors ${allPageErrors.join('; ')}`);

      entry.interactions = {
        favoritesToggledTo5: favBadge.trim() === '5',
        catHouseAddedToCart2: cartBadge.trim() === '2',
        videoModalOpenedAndClosed: true,
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
