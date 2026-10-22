const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/gridwork-co');
const OUT_DIR = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
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
  { name: '1440x960', width: 1440, height: 960, shot: 'acceptance-1440x960.png' },
  { name: '1440', width: 1440, height: 900 },
  { name: '1024', width: 1024, height: 768 },
  { name: '820', width: 820, height: 1180, shot: 'tablet-820x1180.png' },
  { name: '768', width: 768, height: 1024 },
  { name: '740x360', width: 740, height: 360 },
  { name: '375', width: 375, height: 812, shot: 'phone-375x812.png' },
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

      const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
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
          const v = document.getElementById('greenhouseVideo');
          return v && v.readyState >= 2 && v.classList.contains('is-ready');
        },
        null,
        { timeout: 60000 }
      );
      // Wait for ~2s entrance animation to finish
      await page.waitForTimeout(2100);

      for (const vp of VIEWPORTS) {
        const vpErrors = [];
        const onConsole = (m) => {
          if (m.type() === 'error' && !m.text().includes('__cf_bm')) vpErrors.push(m.text());
        };
        page.on('console', onConsole);

        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(250);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const shell = document.getElementById('onboardingShell');
          const photoCard = document.querySelector('.photo-card');
          const frostedTiles = document.querySelectorAll('.tile-frosted');
          const cutoutOrigin = document.querySelector('.tile-cutout-origin');
          const video = document.getElementById('greenhouseVideo');
          const selectedCards = Array.from(document.querySelectorAll('.tool-card.is-selected')).map((el) =>
            el.getAttribute('data-tool')
          );
          const allCards = document.querySelectorAll('.tool-card');
          const createBtn = document.getElementById('createAccountBtn');
          const shellRect = shell.getBoundingClientRect();
          const photoRect = photoCard.getBoundingClientRect();

          return {
            vw: window.innerWidth,
            vh: window.innerHeight,
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            scrollHeight: doc.scrollHeight,
            clientHeight: doc.clientHeight,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            verticalOverflow: doc.scrollHeight > doc.clientHeight,
            frostedTileCount: frostedTiles.length,
            hasCutoutOrigin: Boolean(cutoutOrigin),
            videoReady: video ? video.readyState >= 2 : false,
            videoFadedIn: video ? video.classList.contains('is-ready') : false,
            toolCardCount: allCards.length,
            selectedTools: selectedCards,
            photoWidthRatio: Number((photoRect.width / shellRect.width).toFixed(3)),
            createBtnBg: createBtn ? getComputedStyle(createBtn).backgroundColor : null,
          };
        });

        page.off('console', onConsole);
        metrics.consoleErrors = vpErrors.length;

        assert.equal(metrics.horizontalOverflow, false, `${b.id} @ ${vp.name}: horizontal overflow`);
        assert.equal(metrics.verticalOverflow, false, `${b.id} @ ${vp.name}: vertical overflow (must fit one screen)`);
        assert.equal(metrics.frostedTileCount, 6, `${b.id} @ ${vp.name}: expected 6 frosted tiles`);
        assert.equal(metrics.hasCutoutOrigin, true, `${b.id} @ ${vp.name}: expected (0,0) cutout cell`);
        assert.equal(metrics.videoReady, true, `${b.id} @ ${vp.name}: greenhouse video ready`);
        assert.equal(metrics.videoFadedIn, true, `${b.id} @ ${vp.name}: greenhouse video faded in`);
        assert.equal(metrics.toolCardCount, 6, `${b.id} @ ${vp.name}: expected 6 tool cards`);
        assert.deepEqual(
          metrics.selectedTools,
          ['Figma', 'Webflow', 'Relume'],
          `${b.id} @ ${vp.name}: Figma, Webflow and Relume start selected`
        );

        if (b.id === 'chromium' && vp.shot) {
          await page.screenshot({ path: path.join(OUT_DIR, vp.shot), type: 'png' });
        }

        entry.viewports[vp.name] = metrics;
      }

      // Test interactive card toggle, testimonial arrows, and modal at 1440x960
      await page.setViewportSize({ width: 1440, height: 960 });
      await page.waitForTimeout(200);

      // Toggle Framer card on and back off
      await page.click('[data-tool="Framer"]');
      const framerSelected = await page.evaluate(() =>
        document.querySelector('[data-tool="Framer"]').classList.contains('is-selected')
      );
      assert.equal(framerSelected, true, `${b.id}: clicking Framer selects it`);
      await page.click('[data-tool="Framer"]');
      const framerUnselected = await page.evaluate(
        () => !document.querySelector('[data-tool="Framer"]').classList.contains('is-selected')
      );
      assert.equal(framerUnselected, true, `${b.id}: clicking Framer again unselects it`);

      // Test testimonial arrow buttons
      await page.click('#nextTestimonialBtn');
      await page.waitForTimeout(150);
      const nextAuthor = await page.evaluate(() => document.getElementById('testimonialName').textContent);
      assert.notEqual(nextAuthor, 'Sofia Hernández', `${b.id}: next arrow advances testimonial`);
      await page.click('#prevTestimonialBtn');
      await page.waitForTimeout(150);
      const restoredAuthor = await page.evaluate(() => document.getElementById('testimonialName').textContent);
      assert.equal(restoredAuthor, 'Sofia Hernández', `${b.id}: prev arrow returns to Sofia Hernández`);

      // Test Create account modal open & close
      await page.click('#createAccountBtn');
      await page.waitForTimeout(200);
      const modalOpened = await page.evaluate(() =>
        document.getElementById('onboardingModal').classList.contains('is-open')
      );
      assert.equal(modalOpened, true, `${b.id}: Create account opens confirmation modal`);
      await page.click('#modalCloseBtn');
      await page.waitForTimeout(200);
      const modalClosed = await page.evaluate(
        () => !document.getElementById('onboardingModal').classList.contains('is-open')
      );
      assert.equal(modalClosed, true, `${b.id}: Modal closes cleanly`);

      assert.equal(allConsoleErrors.length, 0, `${b.id}: console errors: ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: page errors: ${allPageErrors.join('; ')}`);

      entry.interactions = {
        framerSelected,
        framerUnselected,
        nextAuthor,
        restoredAuthor,
        modalOpened,
        modalClosed,
        totalConsoleErrors: allConsoleErrors.length,
        totalPageErrors: allPageErrors.length,
      };

      report.browsers[b.id] = entry;
      await browser.close();
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2));
    console.log('ALL 4 BROWSERS & 8 VIEWPORTS PASSED. Screenshots and checks.json saved.');
  } finally {
    server.close();
  }
})();
