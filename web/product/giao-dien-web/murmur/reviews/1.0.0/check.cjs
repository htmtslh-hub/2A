const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/murmur');
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
  { name: '1440', width: 1440, height: 900, preview: 'murmur.webp', previewSize: [1280, 800] },
  { name: '1024', width: 1024, height: 768 },
  { name: '820', width: 820, height: 1180, preview: 'murmur-tablet.webp', previewSize: [820, 1180] },
  { name: '768', width: 768, height: 1024 },
  { name: '740x360', width: 740, height: 360 },
  { name: '375', width: 375, height: 812, preview: 'murmur-mobile.webp', previewSize: [375, 812] },
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
          const plate = document.getElementById('scenePlate');
          const video = document.getElementById('sceneVideo');
          const cover = document.getElementById('cardCoverImg');
          const bars = document.querySelectorAll('.waveform__bar');
          return (
            plate &&
            plate.complete &&
            plate.naturalWidth > 0 &&
            video &&
            video.readyState >= 2 &&
            cover &&
            cover.complete &&
            cover.naturalWidth > 0 &&
            bars.length === 62
          );
        },
        null,
        { timeout: 60000 }
      );
      // Wait for the Web Animations entrance sequence to complete
      await page.waitForTimeout(2000);

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
        await page.waitForTimeout(b.id === 'chromium' && vp.preview ? 600 : 300);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const heroFrame = document.querySelector('.hero-frame');
          const plate = document.getElementById('scenePlate');
          const video = document.getElementById('sceneVideo');
          const bloom = document.getElementById('sceneBloom');
          const sweep = document.getElementById('sceneSweep');
          const wordmark = document.getElementById('wordmark');
          const subtitle = document.getElementById('subtitle');
          const episodeLabel = document.getElementById('episodeLabel');
          const playerCard = document.getElementById('playerCard');
          const cardCover = document.getElementById('cardCover');
          const cardTitle = document.getElementById('cardTitle');
          const cardDate = document.getElementById('cardDate');
          const waveform = document.getElementById('waveform');
          const bars = document.querySelectorAll('.waveform__bar');
          const playBtn = document.getElementById('playBtn');
          const aboutTitle = document.getElementById('aboutTitle');
          const platformLabel = document.getElementById('platformLabel');
          const platformIcons = document.getElementById('platformIcons');
          const iconBtns = document.querySelectorAll('.platform-icon');

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
            heroFrameRect: r(heroFrame),
            plateRect: r(plate),
            videoRect: r(video),
            bloomBlendMode: bloom ? getComputedStyle(bloom).mixBlendMode : null,
            sweepBlendMode: sweep ? getComputedStyle(sweep).mixBlendMode : null,
            wordmarkRect: r(wordmark),
            subtitleRect: r(subtitle),
            episodeLabelRect: r(episodeLabel),
            playerCardRect: r(playerCard),
            cardCoverRect: r(cardCover),
            cardTitleRect: r(cardTitle),
            cardDateRect: r(cardDate),
            waveformRect: r(waveform),
            barCount: bars.length,
            playBtnRect: r(playBtn),
            aboutTitleRect: r(aboutTitle),
            platformLabelRect: r(platformLabel),
            platformIconsRect: r(platformIcons),
            iconCount: iconBtns.length,
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id}@${vp.name}: horizontal overflow (${metrics.scrollWidth} > ${metrics.clientWidth})`);
        assert.equal(vpErrors.length, 0, `${b.id}@${vp.name}: console/page errors: ${vpErrors.join('; ')}`);
        assert.equal(metrics.barCount, 62, `${b.id}@${vp.name}: must render 62 waveform bars`);
        assert.equal(metrics.iconCount, 4, `${b.id}@${vp.name}: must render 4 generic platform icons`);
        assert.equal(metrics.bloomBlendMode, 'screen');
        assert.equal(metrics.sweepBlendMode, 'screen');

        if (vp.name === '1440') {
          assert.equal(metrics.heroFrameRect.w, 1440);
          assert.equal(metrics.heroFrameRect.h, 900);
          assert.equal(metrics.plateRect.w, 1440);
          assert.equal(metrics.plateRect.h, 900);
          assert.equal(metrics.videoRect.w, 1600);
          assert.equal(metrics.videoRect.h, 900);
          assert.equal(metrics.videoRect.x, -80);
          assert.equal(metrics.wordmarkRect.y, 133);
          assert.equal(metrics.subtitleRect.y, 225);
          assert.equal(metrics.episodeLabelRect.y, 319);
          assert.equal(Math.abs(metrics.episodeLabelRect.x + metrics.episodeLabelRect.w / 2 - 730) <= 1, true, 'episodeLabel centred 10px right of centre');
          assert.equal(metrics.playerCardRect.x, 413);
          assert.equal(metrics.playerCardRect.y, 350);
          assert.equal(metrics.playerCardRect.w, 624);
          assert.equal(metrics.playerCardRect.h, 190);
          assert.equal(metrics.cardCoverRect.x, 431);
          assert.equal(metrics.cardCoverRect.y, 366);
          assert.equal(metrics.cardCoverRect.w, 158);
          assert.equal(metrics.cardCoverRect.h, 156);
          assert.equal(metrics.cardTitleRect.x, 615);
          assert.equal(metrics.cardTitleRect.y, 383);
          assert.equal(metrics.cardDateRect.x, 615);
          assert.equal(metrics.cardDateRect.y, 450);
          assert.equal(metrics.waveformRect.x, 616);
          assert.equal(metrics.waveformRect.y, 488);
          assert.equal(metrics.waveformRect.w, 335);
          assert.equal(metrics.waveformRect.h, 34);
          assert.equal(metrics.playBtnRect.x, 979);
          assert.equal(metrics.playBtnRect.y, 487);
          assert.equal(metrics.playBtnRect.w, 37);
          assert.equal(metrics.playBtnRect.h, 37);
          assert.equal(metrics.aboutTitleRect.x, 414);
          assert.equal(metrics.aboutTitleRect.y, 595);
          assert.equal(metrics.platformLabelRect.x, 414);
          assert.equal(metrics.platformLabelRect.y, 760);
          assert.equal(metrics.platformIconsRect.x, 710);
          assert.equal(metrics.platformIconsRect.y, 755);
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

      // Test interactive Play toggle & Podcast Directory Modal at 1440x900
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(250);

      await page.click('#playBtn');
      await page.waitForTimeout(200);
      const playPressed = await page.evaluate(() => document.getElementById('playBtn').getAttribute('aria-pressed'));
      assert.equal(playPressed, 'true');

      await page.click('#playBtn');
      await page.waitForTimeout(200);
      const playUnpressed = await page.evaluate(() => document.getElementById('playBtn').getAttribute('aria-pressed'));
      assert.equal(playUnpressed, 'false');

      await page.click('[data-platform="0"]');
      await page.waitForTimeout(300);
      const modalOpen = await page.evaluate(() => document.getElementById('platformModal').classList.contains('is-open'));
      assert.equal(modalOpen, true);

      await page.click('[data-episode="1"]');
      await page.waitForTimeout(200);
      const switchedEpisode = await page.evaluate(() => document.getElementById('modalTitle').textContent);
      assert.equal(switchedEpisode, 'The Quiet Physics of Rain-Streaked Glass');

      await page.click('[data-episode="0"]');
      await page.waitForTimeout(150);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const modalClosed = await page.evaluate(() => !document.getElementById('platformModal').classList.contains('is-open'));
      assert.equal(modalClosed, true);

      assert.equal(allConsoleErrors.length, 0, `${b.id}: total console errors: ${allConsoleErrors.join('; ')}`);
      assert.equal(allPageErrors.length, 0, `${b.id}: total page errors: ${allPageErrors.join('; ')}`);

      entry.interactions = {
        playPressed,
        playUnpressed,
        modalOpen,
        switchedEpisode,
        modalClosed,
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
