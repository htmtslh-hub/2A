const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/vaultra');
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
  { name: '1440', width: 1440, height: 900, shot: 'desktop-1440x900.png' },
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
          const img = document.getElementById('globeStill');
          const vid = document.getElementById('globeVideo');
          return img && img.complete && img.naturalWidth === 1672 && vid && vid.readyState >= 2 && vid.classList.contains('is-ready');
        },
        null,
        { timeout: 60000 }
      );
      // Wait for ~1.6s CSS entrance animation to complete
      await page.waitForTimeout(1750);

      for (const vp of VIEWPORTS) {
        const vpErrors = [];
        const onConsole = (m) => {
          if (m.type() === 'error' && !m.text().includes('__cf_bm')) vpErrors.push(m.text());
        };
        page.on('console', onConsole);

        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(220);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const still = document.getElementById('globeStill');
          const video = document.getElementById('globeVideo');
          const brand = document.getElementById('brandLogo');
          const signup = document.getElementById('navSignupBtn');
          const login = document.getElementById('navLoginBtn');
          const lang = document.getElementById('langLabel');
          const badge = document.getElementById('heroBadge');
          const h1 = document.getElementById('heroHeadline');
          const cta = document.getElementById('getStartedBtn');
          const chips = Array.from(document.querySelectorAll('.coin-chip')).map((c) => c.getAttribute('data-asset'));
          const scrollHint = document.getElementById('scrollHintBtn');
          const stillRect = still.getBoundingClientRect();
          const videoRect = video.getBoundingClientRect();

          return {
            vw: window.innerWidth,
            vh: window.innerHeight,
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            scrollHeight: doc.scrollHeight,
            clientHeight: doc.clientHeight,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            verticalOverflow: doc.scrollHeight > doc.clientHeight,
            stillLoaded: still ? still.complete && still.naturalWidth === 1672 : false,
            videoReady: video ? video.readyState >= 2 : false,
            videoFadedIn: video ? video.classList.contains('is-ready') : false,
            identicalGeometry:
              Math.abs(stillRect.width - videoRect.width) < 1 &&
              Math.abs(stillRect.height - videoRect.height) < 1 &&
              Math.abs(stillRect.top - videoRect.top) < 1 &&
              Math.abs(stillRect.left - videoRect.left) < 1,
            brandText: brand ? brand.textContent.trim() : '',
            signupText: signup ? signup.textContent.trim() : '',
            loginText: login ? login.textContent.trim() : '',
            langText: lang ? lang.textContent.trim() : '',
            badgeText: badge ? badge.textContent.replace(/\s+/g, ' ').trim() : '',
            h1Text: h1 ? h1.textContent.replace(/\s+/g, ' ').trim() : '',
            ctaText: cta ? cta.textContent.replace(/\s+/g, ' ').trim() : '',
            chips,
            scrollHintText: scrollHint ? scrollHint.textContent.replace(/\s+/g, ' ').trim() : '',
          };
        });

        page.off('console', onConsole);
        metrics.consoleErrors = vpErrors.length;

        assert.equal(metrics.horizontalOverflow, false, `${b.id} @ ${vp.name}: horizontal overflow`);
        assert.equal(metrics.verticalOverflow, false, `${b.id} @ ${vp.name}: vertical overflow (must fit one screen)`);
        assert.equal(metrics.stillLoaded, true, `${b.id} @ ${vp.name}: globe still loaded (1672x941)`);
        assert.equal(metrics.videoReady, true, `${b.id} @ ${vp.name}: globe video ready`);
        assert.equal(metrics.videoFadedIn, true, `${b.id} @ ${vp.name}: globe video faded in`);
        assert.equal(metrics.identicalGeometry, true, `${b.id} @ ${vp.name}: still & video share identical geometry`);
        assert.equal(metrics.brandText, 'Vaultra', `${b.id} @ ${vp.name}: Brand is Vaultra`);
        assert.equal(metrics.signupText, 'Sign up', `${b.id} @ ${vp.name}: Sign up typo is fixed`);
        assert.equal(metrics.loginText, 'Log In', `${b.id} @ ${vp.name}: Log In pill present`);
        assert.deepEqual(metrics.chips, ['BTC', 'ETH', 'USDT', 'VLT'], `${b.id} @ ${vp.name}: 4 coin chips present`);
        assert.ok(metrics.scrollHintText.includes('USDT') && metrics.scrollHintText.includes('ETH'), `${b.id} @ ${vp.name}: scroll hint has USDT and ETH`);

        if (b.id === 'chromium' && vp.shot) {
          await page.screenshot({ path: path.join(OUT_DIR, vp.shot), type: 'png' });
        }

        entry.viewports[vp.name] = metrics;
      }

      // Test interactive language selector, coin chip modal, and reduced motion at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(200);

      // Verify video advances forward continuously
      const t1 = await page.evaluate(() => document.getElementById('globeVideo').currentTime);
      await page.waitForTimeout(450);
      const t2 = await page.evaluate(() => document.getElementById('globeVideo').currentTime);
      assert.notEqual(t1, t2, `${b.id}: globe video currentTime advances`);

      // Language selector
      await page.click('#langSelectorBtn');
      await page.waitForTimeout(120);
      await page.click('.lang-option[data-lang="EU"]');
      const updatedLang = await page.evaluate(() => document.getElementById('langLabel').textContent.trim());
      assert.equal(updatedLang, 'EU ⌄', `${b.id}: language selector switches to EU`);
      // Restore EN
      await page.click('#langSelectorBtn');
      await page.waitForTimeout(100);
      await page.click('.lang-option[data-lang="EN"]');

      // Coin chip click opens modal for ETH
      await page.click('.coin-chip--eth');
      await page.waitForTimeout(200);
      const modalOpen = await page.evaluate(() => document.getElementById('vaultraModal').classList.contains('is-open'));
      assert.equal(modalOpen, true, `${b.id}: clicking ETH coin chip opens ecosystem modal`);
      await page.click('#modalCloseBtn');
      await page.waitForTimeout(200);
      const modalClosed = await page.evaluate(() => !document.getElementById('vaultraModal').classList.contains('is-open'));
      assert.equal(modalClosed, true, `${b.id}: modal closes cleanly`);

      assert.equal(allConsoleErrors.length, 0, `${b.id}: console errors: ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: page errors: ${allPageErrors.join('; ')}`);

      entry.interactions = {
        videoAdvances: t1 !== t2,
        updatedLang,
        modalOpen,
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
