const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/prmpt');
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
  { name: '1440', width: 1440, height: 900 },
  { name: '820', width: 820, height: 1180 },
  { name: '375', width: 375, height: 812 },
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
        if (m.type() === 'error') allConsoleErrors.push(m.text());
      });
      page.on('pageerror', (e) => allPageErrors.push(e.message));

      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(
        () => {
          const lv = document.getElementById('left-video');
          const rv = document.getElementById('right-video');
          const imgs = Array.from(document.querySelectorAll('.bp-card img'));
          return (
            lv &&
            rv &&
            lv.readyState >= 2 &&
            rv.readyState >= 2 &&
            imgs.length === 10 &&
            imgs.every((i) => i.complete && i.naturalWidth > 0)
          );
        },
        null,
        { timeout: 60000 }
      );
      await page.waitForTimeout(900);

      for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.waitForTimeout(500);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const logo = document.getElementById('hero-logo');
          const info = document.getElementById('outro-info');
          const canvas = document.getElementById('main-canvas');
          const cards = document.querySelectorAll('.bp-card');
          return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollWidth: doc.scrollWidth,
            scrollHeight: doc.scrollHeight,
            horizontalOverflow: doc.scrollWidth > window.innerWidth,
            logoWidth: logo ? Math.round(logo.getBoundingClientRect().width) : 0,
            outroOffset: info ? Number(info.dataset.outroOffset) : 0,
            canvasOpacity: canvas ? Number(getComputedStyle(canvas).opacity) : 0,
            cardCount: cards.length,
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id} ${vp.name} horizontal overflow`);
        assert.equal(metrics.cardCount, 10, `${b.id} ${vp.name} expected 10 cards`);

        if (b.id === 'chromium' || vp.name === '1440') {
          await page.screenshot({ path: path.join(OUT_DIR, `${b.id}-${vp.name}.png`) });
        }

        if (vp.name === '1440') {
          // 1. Move cursor left of dead zone -> right video active
          await page.mouse.move(220, 450);
          await page.waitForTimeout(250);
          const leftHover = await page.evaluate(() => ({
            cursorLeft: document.getElementById('custom-cursor')?.style.left,
            cursorTop: document.getElementById('custom-cursor')?.style.top,
            leftDisplay: document.getElementById('left-video')?.style.display,
            rightDisplay: document.getElementById('right-video')?.style.display,
            rightTime: Number(document.getElementById('right-video')?.currentTime.toFixed(2)),
          }));

          // 2. Move cursor into dead zone -> keeps right video & resets currentTime to 0
          await page.mouse.move(720, 450);
          await page.waitForTimeout(250);
          const deadZoneHover = await page.evaluate(() => ({
            leftDisplay: document.getElementById('left-video')?.style.display,
            rightDisplay: document.getElementById('right-video')?.style.display,
            rightTime: Number(document.getElementById('right-video')?.currentTime.toFixed(2)),
          }));

          // 3. Move cursor right of dead zone -> left video active
          await page.mouse.move(1220, 450);
          await page.waitForTimeout(250);
          const rightHover = await page.evaluate(() => ({
            leftDisplay: document.getElementById('left-video')?.style.display,
            rightDisplay: document.getElementById('right-video')?.style.display,
            leftTime: Number(document.getElementById('left-video')?.currentTime.toFixed(2)),
          }));

          // 4. Scroll into Gallery Phase 2
          await page.evaluate(() => window.scrollTo({ top: 1450, behavior: 'instant' }));
          await page.waitForTimeout(450);
          const galleryState = await page.evaluate(() => {
            const panel = document.getElementById('black-panel');
            const canvas = document.getElementById('main-canvas');
            const scales = Array.from(document.querySelectorAll('.bp-card')).map((el) => {
              const m = el.style.transform.match(/scale\(([^)]+)\)/);
              return m ? Number(Number(m[1]).toFixed(3)) : 0;
            });
            return {
              panelTransform: panel?.style.transform,
              canvasVisibility: canvas?.style.visibility,
              symbol: document.getElementById('circle-symbol')?.textContent,
              maxCardScale: Math.max(...scales),
              visibleCards: scales.filter((s) => s > 0.1).length,
            };
          });
          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, `chromium-1440-gallery.png`) });
          }

          // 5. Scroll to Outro Phase
          await page.evaluate(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight - window.innerHeight,
              behavior: 'instant',
            });
          });
          await page.waitForTimeout(450);
          const outroState = await page.evaluate(() => ({
            overlayOpacity: Number(document.getElementById('outro-overlay')?.style.opacity),
            infoTransform: document.getElementById('outro-info')?.style.transform,
            buyTransform: document.getElementById('outro-buy')?.style.transform,
            footerOpacity: Number(document.getElementById('outro-footer')?.style.opacity),
          }));
          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, `chromium-1440-outro.png`) });
          }

          await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
          await page.waitForTimeout(300);

          assert.equal(leftHover.rightDisplay, 'block', `${b.id} left hover rightDisplay`);
          assert.equal(rightHover.leftDisplay, 'block', `${b.id} right hover leftDisplay`);
          assert.equal(galleryState.canvasVisibility, 'hidden', `${b.id} gallery canvas hidden`);
          assert(galleryState.maxCardScale > 0.4, `${b.id} gallery cards scaled in`);
          assert.equal(outroState.overlayOpacity, 1, `${b.id} outro overlay opacity 1`);
          assert.equal(outroState.buyTransform, 'scale(1)', `${b.id} outro buy scale(1)`);
          assert.equal(outroState.infoTransform, 'translateY(-166px)', `${b.id} outro info offset`);

          entry.interactions = {
            leftHover,
            deadZoneHover,
            rightHover,
            galleryState,
            outroState,
          };
        }

        entry.viewports[vp.name] = {
          ...metrics,
          consoleErrors: [...allConsoleErrors],
          pageErrors: [...allPageErrors],
        };
      }

      await context.close();
      report.browsers[b.id] = entry;
      await browser.close();
      console.log(`Verified ${b.id} (${version})`);
    }

    // Generate store preview WebP images from Chromium screenshots
    await sharp(path.join(OUT_DIR, 'chromium-1440.png'))
      .resize(698, 524, { fit: 'cover', position: 'center' })
      .webp({ quality: 84 })
      .toFile(path.join(PREVIEW_DIR, 'prmpt.webp'));

    await sharp(path.join(OUT_DIR, 'chromium-820.png'))
      .resize(698, 1004, { fit: 'cover', position: 'top' })
      .webp({ quality: 84 })
      .toFile(path.join(PREVIEW_DIR, 'prmpt-tablet.webp'));

    await sharp(path.join(OUT_DIR, 'chromium-375.png'))
      .resize(698, 1511, { fit: 'cover', position: 'top' })
      .webp({ quality: 84 })
      .toFile(path.join(PREVIEW_DIR, 'prmpt-mobile.webp'));

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2));
    console.log('Saved checks.json and generated prmpt preview WebP posters');
  } finally {
    server.close();
  }
})();
