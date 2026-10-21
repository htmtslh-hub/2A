const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/melli');
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
  { name: '1440', width: 1440, height: 900, preview: 'melli.webp', previewSize: [1280, 800] },
  { name: '1024', width: 1024, height: 768 },
  { name: '820', width: 820, height: 1180, preview: 'melli-tablet.webp', previewSize: [820, 1180] },
  { name: '768', width: 768, height: 1024 },
  { name: '740x360', width: 740, height: 360 },
  { name: '375', width: 375, height: 812, preview: 'melli-mobile.webp', previewSize: [375, 812] },
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
          const bee = document.getElementById('bee');
          const flowers = Array.from(document.querySelectorAll('.flower'));
          return (
            bee &&
            bee.classList.contains('ready') &&
            document.body.classList.contains('loaded') &&
            flowers.length === 4 &&
            flowers.every((f) => f.complete && f.naturalWidth > 0)
          );
        },
        null,
        { timeout: 60000 }
      );
      await page.waitForTimeout(1600);

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
        await page.waitForTimeout(b.id === 'chromium' && vp.preview ? 750 : 350);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const nav = document.querySelector('.nav');
          const logo = document.querySelector('.nav .logo');
          const navLinks = document.querySelectorAll('.nav__links a');
          const navCta = document.querySelector('.nav__cta');
          const badge = document.querySelector('.badge');
          const bee = document.getElementById('bee');
          const hero = document.getElementById('top');
          const s1 = document.getElementById('about');
          const s2 = document.getElementById('access');
          const s3 = document.querySelector('.s3');
          const s4 = document.getElementById('contact');
          const flowers = Array.from(document.querySelectorAll('.flower'));
          const joins = Array.from(document.querySelectorAll('.join'));
          const footBrand = document.querySelector('.foot .brand strong');
          const h1 = document.querySelector('h1');

          const r = (el) => {
            if (!el) return null;
            const b = el.getBoundingClientRect();
            return {
              x: Math.round(b.left),
              y: Math.round(b.top),
              w: Math.round(b.width),
              h: Math.round(b.height),
              right: Math.round(b.right),
              bottom: Math.round(b.bottom),
            };
          };

          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            navRect: r(nav),
            hasLogo: Boolean(logo),
            navLinkCount: navLinks.length,
            navCtaText: navCta ? navCta.textContent.trim() : null,
            badgeText: badge ? badge.textContent.replace(/\s+/g, ' ').trim() : null,
            beeReady: bee ? bee.classList.contains('ready') : false,
            beeOpacity: bee ? getComputedStyle(bee).opacity : null,
            beeRect: r(bee),
            bodyLoaded: document.body.classList.contains('loaded'),
            sectionsPresent: Boolean(hero && s1 && s2 && s3 && s4),
            flowerCount: flowers.length,
            flowersLoaded: flowers.every((f) => f.complete && f.naturalWidth > 0),
            joinCount: joins.length,
            footBrandText: footBrand ? footBrand.textContent.trim() : null,
            h1Text: h1 ? h1.textContent.replace(/\s+/g, ' ').trim() : null,
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `Horizontal overflow on ${b.id} @ ${vp.name}`);
        assert.equal(metrics.hasLogo, true);
        assert.equal(metrics.navLinkCount, 2);
        assert.equal(metrics.navCtaText, 'Buzz in!');
        assert.equal(metrics.badgeText, 'Made by Melli');
        assert.equal(metrics.beeReady, true);
        assert.equal(metrics.beeOpacity, '1');
        assert.equal(metrics.bodyLoaded, true);
        assert.equal(metrics.sectionsPresent, true);
        assert.equal(metrics.flowerCount, 4);
        assert.equal(metrics.flowersLoaded, true);
        assert.equal(metrics.joinCount, 2);
        assert.equal(metrics.footBrandText, 'Melli_Motion');
        assert.equal(metrics.h1Text, 'Imagine your next site built just like this');
        assert.equal(vpErrors.length, 0, `Console/page errors on ${b.id} @ ${vp.name}: ${vpErrors.join('; ')}`);

        if (b.id === 'chromium' && vp.preview) {
          const buf = await page.screenshot({ type: 'png' });
          const outFile = path.join(PREVIEW_DIR, vp.preview);
          await sharp(buf)
            .resize(vp.previewSize[0], vp.previewSize[1], { fit: 'cover', position: 'center' })
            .webp({ quality: 88 })
            .toFile(outFile);
        }

        page.off('console', onConsole);
        page.off('pageerror', onPageErr);
        entry.viewports[vp.name] = { ...metrics, consoleErrors: vpErrors.length };
      }

      // Test scroll-driven flight, parallax flowers, and dark-section nav/badge inversion at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.evaluate(() => {
        const s2 = document.getElementById('access');
        s2.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await page.waitForTimeout(650);

      const s2State = await page.evaluate(() => {
        const navColor = getComputedStyle(document.querySelector('.nav')).color;
        const badgeColor = getComputedStyle(document.querySelector('.badge')).color;
        const cosmosTransform = document.querySelector('.flower--cosmos')?.style.transform || '';
        return {
          onDark: document.body.classList.contains('on-dark'),
          navColor,
          badgeColor,
          cosmosMoved: cosmosTransform.includes('translate3d'),
        };
      });
      assert.equal(s2State.onDark, true, `Expected body.on-dark in Section 02 on ${b.id}`);
      assert.equal(s2State.navColor, 'rgb(255, 255, 255)');
      assert.equal(s2State.badgeColor, 'rgb(255, 255, 255)');
      assert.equal(s2State.cosmosMoved, true);

      // Scroll to Section 04 (#contact) and verify no horizontal overflow and on-dark turns off
      await page.evaluate(() => {
        const s4 = document.getElementById('contact');
        s4.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await page.waitForTimeout(450);
      const s4State = await page.evaluate(() => ({
        onDark: document.body.classList.contains('on-dark'),
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      }));
      assert.equal(s4State.onDark, false, `Expected body.on-dark false in Section 04 on ${b.id}`);
      assert.equal(s4State.horizontalOverflow, false);

      // Return to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      assert.equal(allConsoleErrors.length, 0, `Total console errors on ${b.id}: ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `Total page errors on ${b.id}: ${allPageErrors.join('; ')}`);

      entry.interactions = {
        s2DarkInversionPassed: s2State.onDark,
        s2NavColor: s2State.navColor,
        s4LightRestorePassed: !s4State.onDark,
        parallaxTransformActive: s2State.cosmosMoved,
        totalConsoleErrors: allConsoleErrors.length,
        totalPageErrors: allPageErrors.length,
      };
      report.browsers[b.id] = entry;
      await browser.close();
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2) + '\n', 'utf8');
    console.log('ALL 4 BROWSERS AND 7 VIEWPORTS PASSED ZERO ERRORS!');
  } finally {
    server.close();
  }
})();
