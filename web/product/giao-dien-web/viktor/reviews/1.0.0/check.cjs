const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/viktor');
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
          const v0 = document.getElementById('hero-video-0');
          const btn1 = document.getElementById('switcher-btn-1');
          return v0 && v0.readyState >= 2 && btn1;
        },
        null,
        { timeout: 45000 }
      );
      await page.waitForTimeout(1100);

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
          const v0 = document.getElementById('hero-video-0');
          const v1 = document.getElementById('hero-video-1');
          const v2 = document.getElementById('hero-video-2');
          const title = document.getElementById('hero-title');
          const period = document.getElementById('hero-period');
          const dot = document.getElementById('availability-dot');
          const clock = document.getElementById('live-clock');
          const cta = document.getElementById('start-project-btn');
          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            videosReady: Boolean(v0 && v1 && v2 && v0.readyState >= 2),
            titleText: title ? title.textContent.trim() : '',
            periodColor: period ? getComputedStyle(period).color : '',
            dotBg: dot ? getComputedStyle(dot).backgroundColor : '',
            clockText: clock ? clock.textContent.trim() : '',
            ctaText: cta ? cta.textContent.trim() : '',
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow`);
        assert.equal(metrics.videosReady, true, `${b.id}@${vp.name}: video 0 not ready`);
        assert.equal(metrics.titleText, 'Viktor.', `${b.id}@${vp.name}: title mismatch`);
        assert.match(metrics.clockText, /^CUP \d{2}:\d{2}:\d{2}$/, `${b.id}@${vp.name}: invalid clock`);
        assert.equal(metrics.ctaText, 'start a project', `${b.id}@${vp.name}: CTA text mismatch`);
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
          .toFile(path.join(PREVIEW_DIR, 'viktor.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-820.png'))
          .resize(698, 1004, { fit: 'cover', position: 'center' })
          .webp({ quality: 86 })
          .toFile(path.join(PREVIEW_DIR, 'viktor-tablet.webp'));

        await sharp(path.join(OUT_DIR, 'chromium-375.png'))
          .resize(698, 1511, { fit: 'cover', position: 'center' })
          .webp({ quality: 86 })
          .toFile(path.join(PREVIEW_DIR, 'viktor-mobile.webp'));
      }

      // Desktop interaction: switch between 01 / WATER WAVE, 02 / GRIDWAVE, 03 / LIGHT TUNNEL
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(250);

      const slide1State = await page.evaluate(() => ({
        v0Opacity: document.getElementById('hero-video-0').className.includes('opacity-100'),
        periodColor: getComputedStyle(document.getElementById('hero-period')).color,
      }));
      assert.equal(slide1State.v0Opacity, true);

      await page.locator('#switcher-btn-1').click();
      await page.waitForTimeout(250);
      const slide2State = await page.evaluate(() => ({
        v1Opacity: document.getElementById('hero-video-1').className.includes('opacity-100'),
        periodColor: getComputedStyle(document.getElementById('hero-period')).color,
      }));
      assert.equal(slide2State.v1Opacity, true);
      assert.notEqual(slide2State.periodColor, slide1State.periodColor);

      await page.locator('#switcher-btn-2').click();
      await page.waitForTimeout(250);
      const slide3State = await page.evaluate(() => ({
        v2Opacity: document.getElementById('hero-video-2').className.includes('opacity-100'),
      }));
      assert.equal(slide3State.v2Opacity, true);

      await page.locator('#switcher-btn-0').click();
      await page.waitForTimeout(250);

      // Mobile menu interaction at 375x812
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(250);
      const toggleBtn = page.locator('#mobile-menu-toggle');
      assert.equal(await toggleBtn.textContent(), 'Menu');
      await toggleBtn.click();
      await page.waitForTimeout(250);
      assert.equal(await toggleBtn.textContent(), 'Close');
      const mobileExpanded = await toggleBtn.getAttribute('aria-expanded');
      assert.equal(mobileExpanded, 'true');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(250);
      assert.equal(await toggleBtn.textContent(), 'Menu');

      // Reduced motion check
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(200);
      const reducedAnimName = await page.evaluate(
        () => getComputedStyle(document.getElementById('hero-title')).animationName
      );
      assert.equal(reducedAnimName, 'none');

      assert.equal(allConsoleErrors.length, 0, `${b.id}: console errors ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: page errors ${allPageErrors.join('; ')}`);

      entry.interactions = {
        slide1Active: slide1State.v0Opacity,
        slide2Active: slide2State.v1Opacity,
        slide3Active: slide3State.v2Opacity,
        accentPeriodChangedOnSlide2: slide2State.periodColor !== slide1State.periodColor,
        mobileMenuToggle: mobileExpanded === 'true',
        reducedMotionAnimationName: reducedAnimName,
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
