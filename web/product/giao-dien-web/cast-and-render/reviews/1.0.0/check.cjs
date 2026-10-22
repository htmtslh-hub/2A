const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/cast-and-render');
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
  { name: '1440', width: 1440, height: 900, preview: 'cast-and-render.webp', previewSize: [1280, 800] },
  { name: '1024', width: 1024, height: 768 },
  { name: '820', width: 820, height: 1180, preview: 'cast-and-render-tablet.webp', previewSize: [820, 1180] },
  { name: '768', width: 768, height: 1024 },
  { name: '740x360', width: 740, height: 360 },
  { name: '375', width: 375, height: 812, preview: 'cast-and-render-mobile.webp', previewSize: [375, 812] },
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
          const boot = document.getElementById('boot');
          const clip = document.getElementById('clip');
          return (
            boot &&
            boot.classList.contains('done') &&
            clip &&
            clip.readyState >= 2 &&
            clip.duration > 0
          );
        },
        null,
        { timeout: 60000 }
      );
      await page.waitForTimeout(500);

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
          const bodyChildren = Array.from(document.body.children).map(
            (el) => `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className.trim().split(/\s+/).join('.') : ''}`
          );
          const panels = Array.from(document.querySelectorAll('.panel')).map((el, idx) => ({
            index: idx,
            opacity: Number(el.style.opacity || getComputedStyle(el).opacity),
            pointerEvents: el.style.pointerEvents || getComputedStyle(el).pointerEvents,
          }));
          const navLinkEl = document.querySelector('.nav a:not(.pill)');
          const clip = document.getElementById('clip');
          const track = document.querySelector('.track');
          return {
            vw: window.innerWidth,
            vh: window.innerHeight,
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            bodyChildrenCount: document.body.children.length,
            bodyChildren,
            bootDone: document.getElementById('boot').classList.contains('done'),
            clipBlobSrc: clip.src.startsWith('blob:') || clip.src.includes('.mp4'),
            clipDuration: Number(clip.duration.toFixed(2)),
            trackHeightPx: track.offsetHeight,
            navLinkDisplay: navLinkEl ? getComputedStyle(navLinkEl).display : null,
            chrome: rect('header.chrome'),
            panel0: rect('.panel:nth-child(1)'),
            foot: rect('footer.foot'),
            scrubHud: rect('.scrub-hud'),
            panels,
          };
        });

        page.off('console', onConsole);
        metrics.consoleErrors = vpErrors.length;

        assert.equal(metrics.horizontalOverflow, false, `${b.id} @ ${vp.name}: horizontal overflow`);
        assert.equal(metrics.bodyChildrenCount, 8, `${b.id} @ ${vp.name}: expected 8 direct body children`);
        assert.equal(metrics.bootDone, true, `${b.id} @ ${vp.name}: #boot should have .done`);
        assert.equal(metrics.clipBlobSrc, true, `${b.id} @ ${vp.name}: #clip should have blob/mp4 src`);
        assert.equal(metrics.panels.length, 3, `${b.id} @ ${vp.name}: expected 3 panels`);
        assert.equal(metrics.panels[0].opacity, 1, `${b.id} @ ${vp.name}: panel 0 should have opacity 1 at top`);
        assert.equal(metrics.panels[1].opacity, 0, `${b.id} @ ${vp.name}: panel 1 should have opacity 0 at top`);
        assert.equal(metrics.panels[2].opacity, 0, `${b.id} @ ${vp.name}: panel 2 should have opacity 0 at top`);

        if (vp.width <= 720) {
          assert.equal(metrics.navLinkDisplay, 'none', `${b.id} @ ${vp.name}: .nav a:not(.pill) must be hidden <= 720px`);
        } else {
          assert.notEqual(metrics.navLinkDisplay, 'none', `${b.id} @ ${vp.name}: .nav a:not(.pill) must be visible > 720px`);
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

      // Interactive scroll-scrubbing + 15% creative tests at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(350);

      async function scrollToRatio(p, waitMs = 600) {
        await page.evaluate((ratio) => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo(0, max * ratio);
        }, p);
        await page.waitForTimeout(waitMs);
        return page.evaluate(() => {
          const panels = Array.from(document.querySelectorAll('.panel')).map((el) => ({
            opacity: Number(parseFloat(el.style.opacity || '0').toFixed(3)),
            pointerEvents: el.style.pointerEvents,
          }));
          const clip = document.getElementById('clip');
          const meter = document.getElementById('meter');
          const readout = document.getElementById('scrubReadout');
          return {
            panels,
            currentTime: Number(clip.currentTime.toFixed(3)),
            meterTransform: meter.style.transform,
            readoutText: readout ? readout.textContent.trim() : '',
          };
        });
      }

      // 1. Dead zone 1 (p = 0.29 in [0.23, 0.35])
      const deadZone1 = await scrollToRatio(0.29, 650);
      assert.equal(deadZone1.panels[0].opacity, 0, `${b.id}: panel 0 should be 0 in deadZone1`);
      assert.equal(deadZone1.panels[1].opacity, 0, `${b.id}: panel 1 should be 0 in deadZone1`);
      assert.equal(deadZone1.panels[2].opacity, 0, `${b.id}: panel 2 should be 0 in deadZone1`);
      assert.ok(deadZone1.currentTime > 0.3, `${b.id}: video currentTime should scrub forward in deadZone1`);

      // 2. Panel 1 plateau (p = 0.49 in [0.43, 0.57])
      const cue1 = await scrollToRatio(0.49, 700);
      assert.equal(cue1.panels[0].opacity, 0, `${b.id}: panel 0 should be 0 at p=0.49`);
      assert.equal(cue1.panels[1].opacity, 1, `${b.id}: panel 1 should be 1 at p=0.49`);
      assert.equal(cue1.panels[1].pointerEvents, 'auto', `${b.id}: panel 1 pointerEvents auto at p=0.49`);
      assert.equal(cue1.panels[2].opacity, 0, `${b.id}: panel 2 should be 0 at p=0.49`);
      assert.ok(cue1.currentTime > deadZone1.currentTime, `${b.id}: video currentTime should advance at p=0.49`);

      // 3. Dead zone 2 (p = 0.71 in [0.65, 0.77])
      const deadZone2 = await scrollToRatio(0.71, 650);
      assert.equal(deadZone2.panels[0].opacity, 0, `${b.id}: panel 0 should be 0 in deadZone2`);
      assert.equal(deadZone2.panels[1].opacity, 0, `${b.id}: panel 1 should be 0 in deadZone2`);
      assert.equal(deadZone2.panels[2].opacity, 0, `${b.id}: panel 2 should be 0 in deadZone2`);

      // 4. Panel 2 plateau (p = 0.92 in [0.85, 1.00])
      const cue2 = await scrollToRatio(0.92, 800);
      assert.equal(cue2.panels[0].opacity, 0, `${b.id}: panel 0 should be 0 at p=0.92`);
      assert.equal(cue2.panels[1].opacity, 0, `${b.id}: panel 1 should be 0 at p=0.92`);
      assert.equal(cue2.panels[2].opacity, 1, `${b.id}: panel 2 should be 1 at p=0.92`);
      assert.ok(cue2.currentTime > cue1.currentTime, `${b.id}: video currentTime should advance at p=0.92`);

      // 5. Creative 15%: HUD chapter jump button
      await page.click('.scrub-step[data-scrub-target="0"]');
      await page.waitForTimeout(1000);
      const afterJump0 = await page.evaluate(() => ({
        scrollY: Math.round(window.scrollY),
        panel0Opacity: Number(document.querySelectorAll('.panel')[0].style.opacity),
        btn0Active: document.querySelector('.scrub-step[data-scrub-target="0"]').classList.contains('is-active'),
      }));
      assert.equal(afterJump0.panel0Opacity, 1, `${b.id}: jumping to chapter 0 should restore panel 0`);
      assert.equal(afterJump0.btn0Active, true, `${b.id}: chapter 0 button should have .is-active`);

      // 6. Creative 15%: Studio Sheet modal (#board, #visit, #order + brief submission)
      await page.click('header.chrome a[href="#board"]');
      await page.waitForTimeout(250);
      const modalBoard = await page.evaluate(() => {
        const m = document.getElementById('studioModal');
        const p = document.querySelector('[data-sheet-pane="board"]');
        return {
          open: m.classList.contains('is-open'),
          boardActive: p.classList.contains('is-active'),
        };
      });
      assert.equal(modalBoard.open, true, `${b.id}: clicking Works (#board) should open #studioModal`);
      assert.equal(modalBoard.boardActive, true, `${b.id}: board tab pane should be active`);

      await page.click('.studio-tab[data-sheet-tab="order"]');
      await page.waitForTimeout(200);
      await page.fill('#briefEmail', 'studio@ateliersolis.eu');
      await page.click('#briefForm button[type="submit"]');
      await page.waitForTimeout(250);
      const statusText = await page.evaluate(() =>
        document.getElementById('briefStatus').textContent.trim()
      );
      assert.ok(statusText.includes('Queued Batch #CR-112'), `${b.id}: submitting brief form should update #briefStatus`);

      await page.keyboard.press('Escape');
      await page.waitForTimeout(250);
      const modalClosed = await page.evaluate(() =>
        !document.getElementById('studioModal').classList.contains('is-open')
      );
      assert.equal(modalClosed, true, `${b.id}: Escape should close #studioModal`);

      assert.equal(allConsoleErrors.length, 0, `${b.id}: console errors: ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: page errors: ${allPageErrors.join('; ')}`);

      entry.interactions = {
        deadZone1,
        cue1,
        deadZone2,
        cue2,
        afterJump0,
        modalBoard,
        statusText,
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
