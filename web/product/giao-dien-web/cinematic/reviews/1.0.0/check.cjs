const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/cinematic');
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
  { name: '1440', width: 1440, height: 900 },
  { name: '820', width: 820, height: 1180 },
  { name: '375', width: 375, height: 812 },
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
        if (m.type() === 'error') allConsoleErrors.push(m.text());
      });
      page.on('pageerror', (e) => allPageErrors.push(e.message));

      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(
        () => {
          const video = document.getElementById('hero-video');
          const nextBtn = document.getElementById('next-btn');
          return video && video.readyState >= 2 && nextBtn;
        },
        null,
        { timeout: 45000 }
      );
      // Wait for 900ms delay + 1000ms blurFadeUp animation to finish
      await page.waitForTimeout(2100);

      for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(450);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const video = document.getElementById('hero-video');
          const blurOverlay = document.getElementById('bottom-blur-overlay');
          const desktopNav = document.getElementById('desktop-nav');
          const searchBtn = document.getElementById('desktop-search-btn');
          const userBtn = document.getElementById('desktop-user-btn');
          const mobileBtn = document.getElementById('mobile-menu-btn');
          const title = document.getElementById('hero-title');
          const watchNow = document.getElementById('watch-now-btn');
          const learnMore = document.getElementById('learn-more-btn');
          const prevBtn = document.getElementById('prev-btn');
          const nextBtn = document.getElementById('next-btn');

          const glassStyle = learnMore ? getComputedStyle(learnMore) : null;
          const overlayStyle = blurOverlay ? getComputedStyle(blurOverlay) : null;

          return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollWidth: doc.scrollWidth,
            scrollHeight: doc.scrollHeight,
            horizontalOverflow: doc.scrollWidth > window.innerWidth,
            verticalOverflow: doc.scrollHeight > window.innerHeight,
            videoReadyState: video ? video.readyState : 0,
            videoZIndex: video ? getComputedStyle(video).zIndex : '',
            overlayZIndex: overlayStyle ? overlayStyle.zIndex : '',
            desktopNavVisible: desktopNav ? getComputedStyle(desktopNav).display !== 'none' : false,
            searchBtnVisible: searchBtn ? getComputedStyle(searchBtn).display !== 'none' : false,
            userBtnVisible: userBtn ? getComputedStyle(userBtn).display !== 'none' : false,
            mobileBtnVisible: mobileBtn ? getComputedStyle(mobileBtn).display !== 'none' : false,
            titleText: title ? title.textContent?.trim() : '',
            titleOpacity: title ? Number(getComputedStyle(title).opacity) : 0,
            glassBlendMode: glassStyle ? glassStyle.backgroundBlendMode : '',
            watchNowDelay: watchNow ? watchNow.style.animationDelay : '',
            learnMoreDelay: learnMore ? learnMore.style.animationDelay : '',
            prevDelay: prevBtn ? prevBtn.style.animationDelay : '',
            nextDelay: nextBtn ? nextBtn.style.animationDelay : '',
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id} ${vp.name} horizontal overflow`);
        assert.equal(metrics.verticalOverflow, false, `${b.id} ${vp.name} vertical overflow`);
        assert.equal(metrics.videoZIndex, '0', `${b.id} ${vp.name} video z-index 0`);
        assert.equal(metrics.overlayZIndex, '1', `${b.id} ${vp.name} overlay z-index 1`);
        assert.equal(metrics.glassBlendMode, 'luminosity', `${b.id} ${vp.name} liquid-glass blend`);
        assert.equal(metrics.watchNowDelay, '600ms', `${b.id} ${vp.name} watchNowDelay`);
        assert.equal(metrics.learnMoreDelay, '700ms', `${b.id} ${vp.name} learnMoreDelay`);
        assert.equal(metrics.prevDelay, '800ms', `${b.id} ${vp.name} prevDelay`);
        assert.equal(metrics.nextDelay, '900ms', `${b.id} ${vp.name} nextDelay`);

        if (b.id === 'chromium' || vp.name === '1440') {
          await page.screenshot({ path: path.join(OUT_DIR, `${b.id}-${vp.name}.png`) });
        }

        if (vp.name === '1440') {
          // Test Next and Previous slide buttons
          await page.locator('#next-btn').click();
          await page.waitForTimeout(200);
          const secondTitle = await page.locator('#hero-title').textContent();
          assert.equal(secondTitle?.trim(), 'Beyond The Horizon Line.');

          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, 'chromium-1440-next.png') });
          }

          await page.locator('#prev-btn').click();
          await page.waitForTimeout(200);
          const restoredTitle = await page.locator('#hero-title').textContent();
          assert.equal(restoredTitle?.trim(), 'Step Through. Work Smarter.');

          entry.interactions.desktop = {
            secondTitle: secondTitle?.trim(),
            restoredTitle: restoredTitle?.trim(),
          };
        }

        if (vp.name === '375') {
          // Test mobile menu dropdown toggle
          await page.locator('#mobile-menu-btn').click();
          await page.waitForTimeout(550);
          const menuState = await page.evaluate(() => {
            const menu = document.getElementById('mobile-menu');
            return {
              ariaHidden: menu?.getAttribute('aria-hidden'),
              opacity: menu ? Number(getComputedStyle(menu).opacity) : 0,
              links: menu ? menu.querySelectorAll('nav a').length : 0,
            };
          });
          assert.equal(menuState.ariaHidden, 'false');
          assert.equal(menuState.opacity, 1);
          assert.equal(menuState.links, 5);

          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, 'chromium-375-menu.png') });
          }

          await page.locator('#mobile-menu-btn').click();
          await page.waitForTimeout(550);

          entry.interactions.mobile = menuState;
        }

        entry.viewports[vp.name] = {
          ...metrics,
          consoleErrors: [...allConsoleErrors],
          pageErrors: [...allPageErrors],
        };
      }

      assert.equal(allPageErrors.length, 0, `${b.id} pageErrors: ${allPageErrors.join('; ')}`);
      report.browsers[b.id] = entry;
      await context.close();
      await browser.close();
      console.log(`Verified ${b.id} (${version})`);
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2) + '\n');

    await sharp(path.join(OUT_DIR, 'chromium-1440.png'))
      .resize(698, 524, { fit: 'cover', position: 'center' })
      .webp({ quality: 88 })
      .toFile(path.join(PREVIEW_DIR, 'cinematic.webp'));

    await sharp(path.join(OUT_DIR, 'chromium-820.png'))
      .resize(698, 1004, { fit: 'cover', position: 'center' })
      .webp({ quality: 88 })
      .toFile(path.join(PREVIEW_DIR, 'cinematic-tablet.webp'));

    await sharp(path.join(OUT_DIR, 'chromium-375.png'))
      .resize(698, 1511, { fit: 'cover', position: 'center' })
      .webp({ quality: 88 })
      .toFile(path.join(PREVIEW_DIR, 'cinematic-mobile.webp'));

    console.log('Saved checks.json and generated cinematic preview WebP posters');
  } finally {
    server.close();
  }
})();
