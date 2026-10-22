const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/targo');
const PREVIEW_DIR = path.resolve(__dirname, '../../../../../public/previews');
const OUT_DIR = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
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
  { name: '1440', width: 1440, height: 900, preview: 'targo.webp', previewSize: [1280, 800] },
  { name: '1024', width: 1024, height: 768 },
  { name: '820', width: 820, height: 1180, preview: 'targo-tablet.webp', previewSize: [820, 1180] },
  { name: '768', width: 768, height: 1024 },
  { name: '740x360', width: 740, height: 360 },
  { name: '375', width: 375, height: 812, preview: 'targo-mobile.webp', previewSize: [375, 812] },
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
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
        window.scrollTo(0, 0);
      });
      await page.waitForFunction(
        () => {
          const hv = document.getElementById('heroVideo');
          const av = document.getElementById('aboutVideo');
          return hv && av && hv.readyState >= 1 && av.readyState >= 1;
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
        page.on('console', onConsole);

        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(300);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const sections = document.querySelectorAll('body > section');
          const footers = document.querySelectorAll('footer');
          const hv = document.getElementById('heroVideo');
          const av = document.getElementById('aboutVideo');
          const scrim = document.getElementById('heroScrim');
          const tint = document.getElementById('aboutVideoTint');
          const desktopContact = document.getElementById('desktopContactBtn');
          const mobileBurger = document.getElementById('mobileBurgerBtn');
          const aboutRect = document.getElementById('about').getBoundingClientRect();
          const aboutRightRect = av.getBoundingClientRect();
          return {
            vw: window.innerWidth,
            vh: window.innerHeight,
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            sectionCount: sections.length,
            footerCount: footers.length,
            heroVideoReady: hv ? hv.readyState >= 1 : false,
            aboutVideoReady: av ? av.readyState >= 1 : false,
            heroVideoFit: hv ? getComputedStyle(hv).objectFit : null,
            scrimDisplay: scrim ? getComputedStyle(scrim).display : null,
            desktopContactDisplay: desktopContact ? getComputedStyle(desktopContact).display : null,
            mobileBurgerDisplay: mobileBurger ? getComputedStyle(mobileBurger).display : null,
            tintMixBlendMode: tint ? getComputedStyle(tint).mixBlendMode : null,
            aboutRightFlushGap: Math.abs(Math.round(aboutRect.right - aboutRightRect.right)),
          };
        });

        page.off('console', onConsole);
        metrics.consoleErrors = vpErrors.length;

        assert.equal(metrics.horizontalOverflow, false, `${b.id} @ ${vp.name}: horizontal overflow`);
        assert.equal(metrics.sectionCount, 2, `${b.id} @ ${vp.name}: expected exactly 2 sections`);
        assert.equal(metrics.footerCount, 0, `${b.id} @ ${vp.name}: expected 0 footers`);
        assert.equal(metrics.heroVideoReady, true, `${b.id} @ ${vp.name}: hero video ready`);
        assert.equal(metrics.aboutVideoReady, true, `${b.id} @ ${vp.name}: about video ready`);
        assert.equal(metrics.heroVideoFit, 'contain', `${b.id} @ ${vp.name}: hero video must be object-fit contain`);
        assert.equal(metrics.tintMixBlendMode, 'hue', `${b.id} @ ${vp.name}: about tint must have mix-blend-mode hue`);
        assert.ok(metrics.aboutRightFlushGap <= 1, `${b.id} @ ${vp.name}: about video must touch right edge`);

        if (vp.width <= 700) {
          assert.equal(metrics.scrimDisplay, 'none', `${b.id} @ ${vp.name}: scrim hidden <= 700px`);
          assert.equal(metrics.desktopContactDisplay, 'none', `${b.id} @ ${vp.name}: desktop contact hidden <= 700px`);
          assert.notEqual(metrics.mobileBurgerDisplay, 'none', `${b.id} @ ${vp.name}: mobile burger visible <= 700px`);
        } else {
          assert.notEqual(metrics.scrimDisplay, 'none', `${b.id} @ ${vp.name}: scrim visible > 700px`);
          assert.notEqual(metrics.desktopContactDisplay, 'none', `${b.id} @ ${vp.name}: desktop contact visible > 700px`);
          assert.equal(metrics.mobileBurgerDisplay, 'none', `${b.id} @ ${vp.name}: mobile burger hidden > 700px`);
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

      // Test mobile menu at 375x812 (<= 700px)
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(200);
      await page.click('#mobileBurgerBtn');
      await page.waitForTimeout(200);
      const mobileMenuOpened = await page.evaluate(() =>
        document.getElementById('mobileNavMenu').classList.contains('is-open')
      );
      assert.equal(mobileMenuOpened, true, `${b.id}: mobile menu should open on burger click`);

      await page.click('#mobileBurgerBtn');
      await page.waitForTimeout(200);
      const mobileMenuClosed = await page.evaluate(
        () => !document.getElementById('mobileNavMenu').classList.contains('is-open')
      );
      assert.equal(mobileMenuClosed, true, `${b.id}: mobile menu should close on second burger click`);

      // Test 15% Creative QA Pipeline & Audit Modal at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(250);
      await page.click('#heroGetStartedBtn');
      await page.waitForTimeout(250);
      const modalOpen = await page.evaluate(() =>
        document.getElementById('targoModal').classList.contains('is-open')
      );
      assert.equal(modalOpen, true, `${b.id}: clicking GET STARTED should open #targoModal`);

      await page.click('#runSuiteBtn');
      await page.waitForTimeout(200);
      const suiteVerified = await page.evaluate(() =>
        document.getElementById('suiteRunStatus').textContent.includes('VERIFIED SUITE #805')
      );
      assert.equal(suiteVerified, true, `${b.id}: clicking RUN VERIFICATION should update suite telemetry`);

      await page.click('[data-tab-target="contact"]');
      await page.waitForTimeout(200);
      await page.fill('#auditRepoInput', 'targo-core');
      await page.fill('#auditEmailInput', 'qa@targo.dev');
      await page.click('#submitAuditBtn');
      await page.waitForTimeout(200);
      const auditLocked = await page.evaluate(() =>
        document.getElementById('auditStatus').textContent.includes('AUDIT SLOT LOCKED FOR TARGO-CORE')
      );
      assert.equal(auditLocked, true, `${b.id}: submitting audit form should lock audit slot`);

      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
      const modalClosed = await page.evaluate(
        () => !document.getElementById('targoModal').classList.contains('is-open')
      );
      assert.equal(modalClosed, true, `${b.id}: Escape should close #targoModal`);

      assert.equal(allConsoleErrors.length, 0, `${b.id}: console errors: ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: page errors: ${allPageErrors.join('; ')}`);

      entry.interactions = {
        mobileMenuOpened,
        mobileMenuClosed,
        modalOpen,
        suiteVerified,
        auditLocked,
        modalClosed,
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
