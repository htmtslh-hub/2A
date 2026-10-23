const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));

const ROOT_DIR = path.resolve(__dirname, '../../source');
const OUT_DIR = __dirname;

const VIEWPORTS = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'acceptance-1440x960', width: 1440, height: 960 },
  { name: 'laptop-1024x768', width: 1024, height: 768 },
  { name: 'tablet-820x1180', width: 820, height: 1180 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'landscape-740x360', width: 740, height: 360 },
  { name: 'phone-375x812', width: 375, height: 812 },
  { name: 'phone-320x740', width: 320, height: 740 }
];

const BROWSERS = [
  { key: 'chromium', launch: () => chromium.launch({ headless: true }) },
  { key: 'firefox', launch: () => firefox.launch({ headless: true }) },
  { key: 'msedge', launch: () => chromium.launch({ channel: 'msedge', headless: true }) },
  {
    key: 'coccoc',
    launch: () =>
      chromium.launch({
        executablePath: 'C:\\Program Files\\CocCoc\\Browser\\Application\\browser.exe',
        headless: true
      })
  }
];

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
      const filePath = path.join(ROOT_DIR, urlPath);
      if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      const types = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8'
      };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      res.end(fs.readFileSync(filePath));
    });
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, port: server.address().port });
    });
  });
}

(async () => {
  const { server, port } = await startServer();
  const baseUrl = `http://127.0.0.1:${port}/index.html`;
  const report = {
    slug: 'lauberhorn-ridge',
    version: '1.0.0',
    testedAt: new Date().toISOString(),
    browsers: {}
  };

  try {
    for (const b of BROWSERS) {
      const browser = await b.launch();
      const version = browser.version();
      report.browsers[b.key] = { version, viewports: {}, reducedMotion: null };

      for (const vp of VIEWPORTS) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height }
        });
        const page = await context.newPage();
        const consoleErrors = [];
        const pageErrors = [];

        page.on('console', (msg) => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        });
        page.on('pageerror', (err) => pageErrors.push(err.message));

        await page.goto(baseUrl, { waitUntil: 'load', timeout: 45000 });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForFunction(
          () => {
            const img1 = document.getElementById('scenePlate');
            const img2 = document.querySelector('.photo-card__img');
            const vid = document.getElementById('sceneVideo');
            return (
              img1 && img1.complete && img1.naturalWidth > 0 &&
              img2 && img2.complete && img2.naturalWidth > 0 &&
              vid && vid.readyState >= 2
            );
          },
          null,
          { timeout: 45000 }
        );
        await page.waitForTimeout(3000);

        const metrics = await page.evaluate((vpWidth) => {
          const doc = document.documentElement;
          const horizOverflow = doc.scrollWidth > doc.clientWidth + 1;
          const vertOverflow = vpWidth > 820 ? doc.scrollHeight > doc.clientHeight + 1 : false;

          const frameRect = document.getElementById('uiFrame').getBoundingClientRect();
          const relRect = (id) => {
            const r = document.getElementById(id).getBoundingClientRect();
            return {
              x: Math.round(r.left - frameRect.left),
              y: Math.round(r.top - frameRect.top),
              w: Math.round(r.width),
              h: Math.round(r.height)
            };
          };

          const vid = document.getElementById('sceneVideo');
          const tempText = document.getElementById('weatherTempValue').textContent.trim();
          const contours = document.querySelectorAll('.poi-map-svg g path').length;
          const cardShadows = Array.from(document.querySelectorAll('.glass-card, .photo-card')).every(
            (el) => getComputedStyle(el).boxShadow === 'none'
          );

          return {
            horizOverflow,
            vertOverflow,
            videoReady: vid.readyState >= 2 && vid.classList.contains('is-ready'),
            tempText,
            contours,
            cardShadowsNone: cardShadows,
            coords: {
              logoTile: relRect('logoTile'),
              userPill: relRect('userPill'),
              breadcrumb: relRect('breadcrumb'),
              trailTitle: relRect('trailTitle'),
              heroChips: relRect('heroChips'),
              searchCard: relRect('searchCard'),
              poiCard: relRect('poiCard'),
              photoCard: relRect('photoCard'),
              altitudeCard: relRect('altitudeCard'),
              weatherCard: relRect('weatherCard'),
              trailInfoCard: relRect('trailInfoCard')
            }
          };
        }, vp.width);

        if (vp.name === 'desktop-1440x900') {
          const c = metrics.coords;
          const checks = [
            ['logoTile', c.logoTile.x === 15 && c.logoTile.y === 14 && c.logoTile.w === 41 && c.logoTile.h === 38],
            ['userPill', c.userPill.x === 62 && c.userPill.y === 14 && c.userPill.h === 38],
            ['breadcrumb', c.breadcrumb.x === 15 && c.breadcrumb.y === 73],
            ['trailTitle', c.trailTitle.x === 20 && c.trailTitle.y === 86],
            ['heroChips', c.heroChips.x === 15 && c.heroChips.y === 198],
            ['searchCard', c.searchCard.x === 15 && c.searchCard.y === 462 && c.searchCard.w === 359 && c.searchCard.h === 137],
            ['poiCard', c.poiCard.x === 15 && c.poiCard.y === 612 && c.poiCard.w === 358 && c.poiCard.h === 215],
            ['photoCard', c.photoCard.x === 383 && c.photoCard.y === 612 && c.photoCard.w === 336 && c.photoCard.h === 215],
            ['altitudeCard', c.altitudeCard.x === 728 && c.altitudeCard.y === 612 && c.altitudeCard.w === 387 && c.altitudeCard.h === 215],
            ['weatherCard', c.weatherCard.x === 1126 && c.weatherCard.y === 12 && c.weatherCard.w === 303 && c.weatherCard.h === 380],
            ['trailInfoCard', c.trailInfoCard.x === 1126 && c.trailInfoCard.y === 402 && c.trailInfoCard.w === 303 && c.trailInfoCard.h === 425]
          ];
          for (const [name, ok] of checks) {
            if (!ok) {
              throw new Error(`${b.key} 1440x900 coordinate mismatch on ${name}: ${JSON.stringify(c[name])}`);
            }
          }

          /* Test tab switching and modal interaction on desktop-1440x900 */
          if (b.key === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, 'desktop-1440x900.png') });
          }

          await page.locator('[data-tab="seasons"]').click();
          const seasonActive = await page.locator('[data-tab="seasons"]').evaluate((el) => el.classList.contains('is-active'));
          if (!seasonActive) throw new Error(`${b.key}: SEASONS tab did not activate`);
          await page.locator('[data-tab="altitude"]').click();

          await page.locator('#photoPlayBtn').click();
          await page.locator('#trailModalBackdrop.is-open').waitFor({ state: 'visible' });
          await page.keyboard.press('Escape');
        }

        if (b.key === 'chromium' && ['acceptance-1440x960', 'tablet-820x1180', 'phone-375x812'].includes(vp.name)) {
          await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}.png`) });
        }

        if (metrics.horizOverflow || metrics.vertOverflow) {
          throw new Error(`${b.key} ${vp.name} overflow: horiz=${metrics.horizOverflow} vert=${metrics.vertOverflow}`);
        }
        if (consoleErrors.length || pageErrors.length) {
          throw new Error(`${b.key} ${vp.name} errors: console=${consoleErrors.join(';')} page=${pageErrors.join(';')}`);
        }
        if (metrics.contours !== 16 || !metrics.cardShadowsNone || metrics.tempText !== '19°') {
          throw new Error(`${b.key} ${vp.name} spec check failed: contours=${metrics.contours}, shadowsNone=${metrics.cardShadowsNone}, temp=${metrics.tempText}`);
        }

        report.browsers[b.key].viewports[vp.name] = {
          pass: true,
          consoleErrors: consoleErrors.length,
          pageErrors: pageErrors.length,
          ...metrics
        };

        await context.close();
      }

      /* Reduced motion check */
      const rmContext = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        reducedMotion: 'reduce'
      });
      const rmPage = await rmContext.newPage();
      await rmPage.goto(baseUrl, { waitUntil: 'load', timeout: 45000 });
      const rmData = await rmPage.evaluate(() => {
        const v = document.getElementById('sceneVideo');
        const cs = getComputedStyle(v);
        const temp = document.getElementById('weatherTempValue').textContent.trim();
        return {
          videoHidden: cs.display === 'none' || cs.opacity === '0',
          tempImmediate: temp === '19°'
        };
      });
      if (!rmData.videoHidden || !rmData.tempImmediate) {
        throw new Error(`${b.key} reduced motion check failed: ${JSON.stringify(rmData)}`);
      }
      report.browsers[b.key].reducedMotion = { pass: true, ...rmData };
      await rmContext.close();
      await browser.close();
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2) + '\n');
    console.log('ALL 4 BROWSERS & 8 VIEWPORTS PASSED FOR LAUBERHORN-RIDGE.');
  } finally {
    server.close();
  }
})();
