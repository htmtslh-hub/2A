const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/iris');
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
  { name: '1440', width: 1440, height: 900, preview: 'iris.webp', previewSize: [1280, 800] },
  { name: '1024', width: 1024, height: 768 },
  { name: '820', width: 820, height: 1180, preview: 'iris-tablet.webp', previewSize: [820, 1180] },
  { name: '768', width: 768, height: 1024 },
  { name: '740x360', width: 740, height: 360 },
  { name: '375', width: 375, height: 812, preview: 'iris-mobile.webp', previewSize: [375, 812] },
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
          const stage = document.getElementById('stage');
          const loader = document.getElementById('loader');
          return (
            stage &&
            stage.dataset.ready === 'true' &&
            loader &&
            loader.classList.contains('hide')
          );
        },
        null,
        { timeout: 60000 }
      );
      // Wait for the intro ease-out-back pop and CSS reveal animations to finish
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
        await page.waitForTimeout(b.id === 'chromium' && vp.preview ? 650 : 300);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const nav = document.getElementById('nav');
          const brandOrb = document.querySelector('.brand-orb');
          const navLinks = document.querySelector('.nav-links');
          const navLinkItems = document.querySelectorAll('.nav-links a');
          const btnOpen = document.querySelector('.btn-open');
          const menuBtn = document.getElementById('menuBtn');
          const mobilePanel = document.getElementById('mobilePanel');
          const hero = document.getElementById('hero');
          const heroInner = document.querySelector('.hero-inner');
          const stage = document.getElementById('stage');
          const loader = document.getElementById('loader');
          const h1 = document.querySelector('h1');
          const sub = document.querySelector('.sub');
          const btnTry = document.querySelector('.btn-try');

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
            brandOrbRect: r(brandOrb),
            navLinksDisplay: navLinks ? getComputedStyle(navLinks).display : null,
            navLinkCount: navLinkItems.length,
            btnOpenRect: r(btnOpen),
            menuBtnDisplay: menuBtn ? getComputedStyle(menuBtn).display : null,
            mobilePanelDisplay: mobilePanel ? getComputedStyle(mobilePanel).display : null,
            heroRect: r(hero),
            heroInnerJustify: heroInner ? getComputedStyle(heroInner).justifyContent : null,
            heroInnerAlign: heroInner ? getComputedStyle(heroInner). textAlign : null,
            stageRect: r(stage),
            stageReady: stage ? stage.dataset.ready === 'true' : false,
            loaderHidden: loader ? loader.classList.contains('hide') : false,
            loaderLeft: loader ? parseFloat(loader.style.left) : null,
            h1Rect: r(h1),
            subRect: r(sub),
            btnTryRect: r(btnTry),
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow (${metrics.scrollWidth} > ${metrics.clientWidth})`);
        assert.equal(vpErrors.length, 0, `${b.id}@${vp.name}: console/page errors: ${vpErrors.join('; ')}`);
        assert.equal(metrics.navRect.h, 62);
        assert.equal(metrics.brandOrbRect.w, 26);
        assert.equal(metrics.brandOrbRect.h, 26);
        assert.equal(metrics.navLinkCount, 4);
        assert.equal(metrics.stageReady, true);
        assert.equal(metrics.loaderHidden, true);

        if (vp.width > 860) {
          assert.equal(metrics.navLinksDisplay, 'flex');
          assert.equal(metrics.menuBtnDisplay, 'none');
          assert.equal(Math.abs(metrics.loaderLeft - vp.width * 0.695) <= 2, true);
          assert.equal(metrics.btnTryRect.h, 59);
        } else {
          assert.equal(metrics.navLinksDisplay, 'none');
          assert.equal(metrics.menuBtnDisplay, 'flex');
          assert.equal(metrics.heroInnerJustify, 'flex-end');
          assert.equal(metrics.heroInnerAlign, 'center');
          assert.equal(Math.abs(metrics.loaderLeft - vp.width * 0.5) <= 2, true);
          assert.equal(metrics.btnTryRect.h, vp.width <= 480 ? 54 : 59);
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

      // Test mobile menu toggle at 375x812
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(200);
      await page.click('#menuBtn');
      await page.waitForTimeout(200);
      const mobileOpen = await page.evaluate(() => {
        const nav = document.getElementById('nav');
        const btn = document.getElementById('menuBtn');
        const panel = document.getElementById('mobilePanel');
        return {
          hasOpenClass: nav.classList.contains('open'),
          ariaExpanded: btn.getAttribute('aria-expanded'),
          panelDisplay: getComputedStyle(panel).display,
        };
      });
      assert.equal(mobileOpen.hasOpenClass, true);
      assert.equal(mobileOpen.ariaExpanded, 'true');
      assert.equal(mobileOpen.panelDisplay, 'flex');

      await page.click('#menuBtn');
      await page.waitForTimeout(200);
      const mobileClosed = await page.evaluate(() => {
        const nav = document.getElementById('nav');
        const btn = document.getElementById('menuBtn');
        const panel = document.getElementById('mobilePanel');
        return {
          hasOpenClass: nav.classList.contains('open'),
          ariaExpanded: btn.getAttribute('aria-expanded'),
          panelDisplay: getComputedStyle(panel).display,
        };
      });
      assert.equal(mobileClosed.hasOpenClass, false);
      assert.equal(mobileClosed.ariaExpanded, 'false');
      assert.equal(mobileClosed.panelDisplay, 'none');

      // Test pointer tracking at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(200);
      await page.mouse.move(280, 260, { steps: 12 });
      await page.waitForTimeout(250);
      await page.mouse.move(1220, 620, { steps: 12 });
      await page.waitForTimeout(250);

      assert.equal(allConsoleErrors.length, 0, `${b.id}: total console errors: ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: total page errors: ${allPageErrors.join('; ')}`);

      entry.interactions = {
        mobileOpen,
        mobileClosed,
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
