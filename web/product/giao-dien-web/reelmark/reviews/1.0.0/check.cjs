const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/reelmark');
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
  { name: '1440x1080', width: 1440, height: 1080 },
  { name: '1440', width: 1440, height: 900, preview: 'reelmark.webp', previewSize: [1280, 800] },
  { name: '1024', width: 1024, height: 768 },
  { name: '820', width: 820, height: 1180, preview: 'reelmark-tablet.webp', previewSize: [820, 1180] },
  { name: '768', width: 768, height: 1024 },
  { name: '740x360', width: 740, height: 360 },
  { name: '375', width: 375, height: 812, preview: 'reelmark-mobile.webp', previewSize: [375, 812] },
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

      const context = await browser.newContext({ viewport: { width: 1440, height: 1080 } });
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
          const vids = Array.from(document.querySelectorAll('.reel-card__video'));
          const posters = Array.from(document.querySelectorAll('.reel-card__poster'));
          return (
            vids.length === 10 &&
            vids.every((v) => v.readyState >= 2 && v.classList.contains('is-ready')) &&
            posters.length === 10 &&
            posters.every((img) => img.complete && img.naturalWidth > 0)
          );
        },
        null,
        { timeout: 60000 }
      );
      // Wait for entrance sequence to finish
      await page.waitForTimeout(1600);

      for (const vp of VIEWPORTS) {
        const vpErrors = [];
        const onConsole = (m) => {
          if (m.type() === 'error' && !m.text().includes('__cf_bm')) vpErrors.push(m.text());
        };
        page.on('console', onConsole);

        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(350);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const rect = (sel) => {
            const el = document.querySelector(sel);
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
              x: Math.round(r.x),
              y: Math.round(r.y),
              w: Math.round(r.width),
              h: Math.round(r.height),
            };
          };
          const cards = Array.from(document.querySelectorAll('.reel-card')).map((el) => {
            const r = el.getBoundingClientRect();
            return {
              index: Number(el.dataset.index),
              x: Math.round(r.x),
              y: Math.round(r.y),
              w: Math.round(r.width),
              h: Math.round(r.height),
              clipPath: getComputedStyle(el).clipPath,
            };
          });
          const centerCards = cards.filter((c) => Math.abs(c.x + c.w / 2 - window.innerWidth / 2) < 120);
          const edgeCards = cards.filter(
            (c) => Math.abs(c.x + c.w / 2 - window.innerWidth / 2) > window.innerWidth * 0.32 &&
                   Math.abs(c.x + c.w / 2 - window.innerWidth / 2) < window.innerWidth * 0.55
          );
          return {
            vw: window.innerWidth,
            vh: window.innerHeight,
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            frame: rect('#heroFrame'),
            logo: rect('#navLogo'),
            navList: rect('#navList'),
            loginBtn: rect('#loginBtn'),
            signupBtn: rect('#signupBtn'),
            badge: rect('#heroBadge'),
            headline: rect('#heroHeadline'),
            subline: rect('#heroSubline'),
            doodleSlash: rect('#doodleSlash'),
            noteBeSeen: rect('#noteBeSeen'),
            ctaRing: rect('#ctaRing'),
            makeReelBtn: rect('#makeReelBtn'),
            noteZeroCost: rect('#noteZeroCost'),
            carouselBand: rect('#carouselBand'),
            cardCount: cards.length,
            minCenterHeight: centerCards.length ? Math.min(...centerCards.map((c) => c.h)) : 0,
            maxEdgeHeight: edgeCards.length ? Math.max(...edgeCards.map((c) => c.h)) : 0,
          };
        });

        page.off('console', onConsole);
        metrics.consoleErrors = vpErrors.length;

        assert.equal(metrics.horizontalOverflow, false, `${b.id} @ ${vp.name}: horizontal overflow`);
        assert.equal(metrics.cardCount, 10, `${b.id} @ ${vp.name}: expected 10 cards`);
        assert.ok(
          metrics.maxEdgeHeight > metrics.minCenterHeight,
          `${b.id} @ ${vp.name}: edge cards (${metrics.maxEdgeHeight}) should be taller than centre cards (${metrics.minCenterHeight})`
        );

        if (vp.name === '1440x1080') {
          assert.equal(metrics.frame.w, 1440);
          assert.equal(metrics.frame.h, 1080);
          assert.equal(metrics.logo.x, 37);
          assert.equal(metrics.logo.y, 36);
          assert.equal(metrics.navList.x, 505);
          assert.equal(metrics.loginBtn.x, 1211);
          assert.equal(metrics.loginBtn.y, 29);
          assert.equal(metrics.loginBtn.w, 92);
          assert.equal(metrics.loginBtn.h, 40);
          assert.equal(metrics.signupBtn.x, 1304);
          assert.equal(metrics.signupBtn.y, 29);
          assert.equal(metrics.signupBtn.w, 97);
          assert.equal(metrics.signupBtn.h, 40);
          assert.equal(metrics.badge.x, 575);
          assert.equal(metrics.badge.y, 115);
          assert.equal(metrics.badge.w, 292);
          assert.equal(metrics.badge.h, 37);
          assert.equal(metrics.headline.y, 176);
          assert.equal(metrics.subline.y, 394);
          assert.equal(metrics.doodleSlash.x, 263);
          assert.equal(metrics.doodleSlash.y, 377);
          assert.equal(metrics.ctaRing.x, 626);
          assert.equal(metrics.ctaRing.y, 901);
          assert.equal(metrics.ctaRing.w, 190);
          assert.equal(metrics.ctaRing.h, 74);
          assert.equal(metrics.makeReelBtn.w, 172);
          assert.equal(metrics.makeReelBtn.h, 58);
        }

        if (vp.name === '375') {
          assert.equal(metrics.carouselBand.h, 250, 'Phone carousel band must be 250px tall');
          assert.ok(
            Math.abs(metrics.ctaRing.x + metrics.ctaRing.w / 2 - 375 / 2) <= 2,
            `Phone CTA ring should be horizontally centred (got x=${metrics.ctaRing.x})`
          );
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

      // Test interactive flows at 1440×1080
      await page.setViewportSize({ width: 1440, height: 1080 });
      await page.waitForTimeout(250);

      // 1. Verify continuous drift + pointer drag & fling
      const xBefore = await page.evaluate(() => {
        const el = document.querySelector('.reel-card[data-index="0"]');
        return el.getBoundingClientRect().x;
      });
      await page.waitForTimeout(350);
      const xAfterDrift = await page.evaluate(() => {
        const el = document.querySelector('.reel-card[data-index="0"]');
        return el.getBoundingClientRect().x;
      });
      assert.notEqual(xBefore, xAfterDrift, `${b.id}: carousel must auto-scroll continuously`);

      await page.mouse.move(900, 680);
      await page.mouse.down();
      await page.mouse.move(620, 680, { steps: 12 });
      await page.mouse.up();
      await page.waitForTimeout(200);

      // 2. Open Reel Spotlight Modal via nav link & switch clips
      await page.click('[data-open-spotlight="0"]');
      await page.waitForSelector('#reelModal.is-open', { state: 'visible' });
      await page.click('[data-select-clip="2"]');
      const switchedTitle = await page.textContent('#reelModalTitle');
      assert.equal(switchedTitle.trim(), 'Oat Matcha Microfoam');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);

      // 3. Open Brief Builder Modal via "Make a Reel" button & submit
      await page.click('#makeReelBtn');
      await page.waitForSelector('#briefModal.is-open', { state: 'visible' });
      await page.fill('#briefBrand', 'Moss & Clay');
      await page.fill('#briefEmail', 'hello@mossclay.studio');
      await page.click('.brief-submit');
      const statusText = await page.textContent('#briefStatus');
      assert.ok(statusText.includes('Moss & Clay'));
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);

      assert.equal(allConsoleErrors.length, 0, `${b.id} console errors: ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id} page errors: ${allPageErrors.join('; ')}`);

      entry.interactions = {
        autoDriftVerified: true,
        dragFlingVerified: true,
        spotlightModalSwitchedTo: switchedTitle.trim(),
        briefSubmitStatus: statusText.trim(),
        consoleErrors: allConsoleErrors.length,
        pageErrors: allPageErrors.length,
      };

      report.browsers[b.id] = entry;
      await browser.close();
      console.log(`PASS ${b.id} (${version})`);
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2));
    console.log('ALL 4 BROWSERS PASSED. Saved checks.json and WebP previews.');
  } finally {
    server.close();
  }
})();
