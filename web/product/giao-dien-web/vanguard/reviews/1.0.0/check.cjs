const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/vanguard');
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
  { name: '1440', width: 1440, height: 900, preview: 'vanguard.webp', previewSize: [1280, 800] },
  { name: '1024', width: 1024, height: 768 },
  { name: '820', width: 820, height: 1180, preview: 'vanguard-tablet.webp', previewSize: [820, 1180] },
  { name: '768', width: 768, height: 1024 },
  { name: '740x360', width: 740, height: 360 },
  { name: '375', width: 375, height: 812, preview: 'vanguard-mobile.webp', previewSize: [375, 812] },
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
          const v = document.getElementById('vanguard-bg-video');
          const h1 = document.querySelector('h1');
          return v && v.readyState >= 2 && h1 && getComputedStyle(h1).opacity === '1';
        },
        null,
        { timeout: 60000 }
      );
      await page.waitForTimeout(1800);

      for (const vp of VIEWPORTS) {
        const vpErrors = [];
        const onConsole = (m) => {
          if (m.type() === 'error' && !m.text().includes('__cf_bm')) vpErrors.push(m.text());
        };
        page.on('console', onConsole);

        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(300);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const v = document.getElementById('vanguard-bg-video');
          const h1 = document.querySelector('h1');
          const desktopInquire = document.getElementById('desktop-inquire-btn');
          const mobileTrigger = document.getElementById('mobile-menu-trigger');
          const stats = Array.from(document.querySelectorAll('.animate-fade-up-delay-4 > div')).map(
            (el) => el.textContent.trim()
          );
          return {
            vw: window.innerWidth,
            vh: window.innerHeight,
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            videoReadyState: v ? v.readyState : 0,
            videoObjectFit: v ? getComputedStyle(v).objectFit : null,
            headingText: h1 ? h1.innerText.replace(/\s+/g, ' ').trim() : '',
            headingOpacity: h1 ? getComputedStyle(h1).opacity : '0',
            desktopInquireDisplay: desktopInquire ? getComputedStyle(desktopInquire).display : null,
            mobileTriggerDisplay: mobileTrigger ? getComputedStyle(mobileTrigger).display : null,
            statsCount: stats.length,
          };
        });

        page.off('console', onConsole);
        metrics.consoleErrors = vpErrors.length;

        assert.equal(metrics.horizontalOverflow, false, `${b.id} @ ${vp.name}: horizontal overflow`);
        assert.ok(metrics.videoReadyState >= 2, `${b.id} @ ${vp.name}: background video not ready`);
        assert.equal(metrics.videoObjectFit, 'cover', `${b.id} @ ${vp.name}: video must be object-cover`);
        assert.equal(metrics.headingOpacity, '1', `${b.id} @ ${vp.name}: h1 should reach opacity 1`);
        assert.equal(metrics.statsCount, 3, `${b.id} @ ${vp.name}: expected 3 telemetry stats`);

        if (vp.width >= 768) {
          assert.notEqual(metrics.desktopInquireDisplay, 'none', `${b.id} @ ${vp.name}: desktop CTA must be visible >=768px`);
          assert.equal(metrics.mobileTriggerDisplay, 'none', `${b.id} @ ${vp.name}: mobile hamburger must be hidden >=768px`);
        } else {
          assert.equal(metrics.desktopInquireDisplay, 'none', `${b.id} @ ${vp.name}: desktop CTA must be hidden <768px`);
          assert.notEqual(metrics.mobileTriggerDisplay, 'none', `${b.id} @ ${vp.name}: mobile hamburger must be visible <768px`);
        }

        if (b.id === 'chromium' && vp.preview) {
          const rawBuf = await page.screenshot({ type: 'png' });
          await sharp(rawBuf)
            .resize(vp.previewSize[0], vp.previewSize[1], { fit: 'cover', position: 'centre' })
            .webp({ quality: 90 })
            .toFile(path.join(PREVIEW_DIR, vp.preview));
        }

        entry.viewports[vp.name] = metrics;
      }

      // Test mobile menu overlay at 375x812
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(250);
      await page.click('#mobile-menu-trigger');
      await page.waitForTimeout(600);
      const mobileMenuOpen = await page.evaluate(() => {
        const el = document.getElementById('mobile-menu-overlay');
        return {
          visible: el.classList.contains('opacity-100') && el.classList.contains('visible'),
          ariaHidden: el.getAttribute('aria-hidden'),
        };
      });
      assert.equal(mobileMenuOpen.visible, true, `${b.id}: mobile menu should open on trigger click`);
      assert.equal(mobileMenuOpen.ariaHidden, 'false', `${b.id}: mobile menu aria-hidden should be false`);

      await page.click('#mobile-menu-close');
      await page.waitForTimeout(550);
      const mobileMenuClosed = await page.evaluate(() => {
        const el = document.getElementById('mobile-menu-overlay');
        return el.classList.contains('opacity-0') && el.classList.contains('invisible');
      });
      assert.equal(mobileMenuClosed, true, `${b.id}: mobile menu should close on X click`);

      // Test 15% creative Agency Dossier & Brief Modal at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(250);
      await page.click('#see-our-work-btn');
      await page.waitForTimeout(250);
      const dossierOpen = await page.evaluate(() => !!document.getElementById('vanguard-dossier-modal'));
      assert.equal(dossierOpen, true, `${b.id}: clicking SEE OUR WORK should open #vanguard-dossier-modal`);

      await page.click('#switch-inquire-tab');
      await page.waitForTimeout(200);
      await page.fill('#vanguard-email-input', 'creative@vanguard.agency');
      await page.click('#submit-brief-btn');
      await page.waitForTimeout(200);
      const briefConfirmed = await page.evaluate(
        () => !!document.getElementById('vanguard-brief-confirmation')
      );
      assert.equal(briefConfirmed, true, `${b.id}: submitting brief should render #vanguard-brief-confirmation`);

      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
      const dossierClosed = await page.evaluate(() => !document.getElementById('vanguard-dossier-modal'));
      assert.equal(dossierClosed, true, `${b.id}: Escape should close #vanguard-dossier-modal`);

      assert.equal(allConsoleErrors.length, 0, `${b.id}: console errors: ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: page errors: ${allPageErrors.join('; ')}`);

      entry.interactions = {
        mobileMenuOpen,
        mobileMenuClosed,
        dossierOpen,
        briefConfirmed,
        dossierClosed,
        totalConsoleErrors: allConsoleErrors.length,
        totalPageErrors: allPageErrors.length,
      };

      report.browsers[b.id] = entry;
      await browser.close();
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2));
    console.log('ALL 4 BROWSERS & 7 VIEWPORTS PASSED. Previews written and checks.json saved.');
  } finally {
    server.close();
  }
})();
