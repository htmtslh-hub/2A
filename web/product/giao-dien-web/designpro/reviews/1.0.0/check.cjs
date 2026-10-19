const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const sharp = require(path.join(root, 'web/node_modules/sharp'));

const DEMO_DIR = path.resolve(__dirname, '../../../../../public/demos/designpro');
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
          const video = document.getElementById('hero-video');
          const shiny = document.getElementById('shiny-heading-text');
          return video && video.readyState >= 2 && shiny;
        },
        null,
        { timeout: 45000 }
      );
      await page.waitForTimeout(800);

      for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(450);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const video = document.getElementById('hero-video');
          const desktopNav = document.getElementById('desktop-nav');
          const mobileBtn = document.getElementById('mobile-menu-button');
          const shiny = document.getElementById('shiny-heading-text');
          const heading = document.getElementById('hero-heading');
          const navLinks = desktopNav ? desktopNav.querySelectorAll('a').length : 0;

          return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollWidth: doc.scrollWidth,
            scrollHeight: doc.scrollHeight,
            horizontalOverflow: doc.scrollWidth > window.innerWidth,
            videoReadyState: video ? video.readyState : 0,
            desktopNavVisible: desktopNav ? getComputedStyle(desktopNav).display !== 'none' : false,
            mobileBtnVisible: mobileBtn ? getComputedStyle(mobileBtn).display !== 'none' : false,
            navLinks,
            headingFontSize: heading ? getComputedStyle(heading).fontSize : '',
            shinyBaseColor: shiny ? shiny.dataset.baseColor : '',
            shinyShineColor: shiny ? shiny.dataset.shineColor : '',
            shinySpeed: shiny ? Number(shiny.dataset.speed) : 0,
            shinySpread: shiny ? Number(shiny.dataset.spread) : 0,
            shinyBgPosition: shiny ? shiny.style.backgroundPosition : '',
          };
        });

        assert.equal(metrics.horizontalOverflow, false, `${b.id} ${vp.name} horizontal overflow`);
        assert.equal(metrics.navLinks, 7, `${b.id} ${vp.name} expected 7 nav links`);
        assert.equal(metrics.shinyBaseColor, '#64CEFB', `${b.id} ${vp.name} shiny base color`);
        assert.equal(metrics.shinyShineColor, '#ffffff', `${b.id} ${vp.name} shiny shine color`);
        assert.equal(metrics.shinySpeed, 3, `${b.id} ${vp.name} shiny speed`);
        assert.equal(metrics.shinySpread, 100, `${b.id} ${vp.name} shiny spread`);

        if (b.id === 'chromium' || vp.name === '1440') {
          await page.screenshot({ path: path.join(OUT_DIR, `${b.id}-${vp.name}.png`) });
        }

        if (vp.name === '1440') {
          // Verify ShinyText continuous animation changes backgroundPosition over 350ms
          const pos1 = await page.evaluate(
            () => document.getElementById('shiny-heading-text')?.style.backgroundPosition
          );
          await page.waitForTimeout(350);
          const pos2 = await page.evaluate(
            () => document.getElementById('shiny-heading-text')?.style.backgroundPosition
          );
          assert.notEqual(pos1, pos2, `${b.id} ShinyText backgroundPosition should animate`);

          // Hover CTA button and click to open enrollment modal
          await page.locator('#hero-cta').hover();
          await page.waitForTimeout(200);
          await page.locator('#hero-cta').click();
          await page.locator('#enrollment-modal').waitFor({ state: 'visible' });
          await page.waitForTimeout(250);

          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, 'chromium-1440-modal.png') });
          }

          await page.fill('#applicant-name', 'Alex Rivera');
          await page.fill('#applicant-email', 'alex@designpro.studio');
          await page.locator('#enrollment-modal button[type="submit"]').click();
          await page.waitForTimeout(250);
          const submittedHeading = await page.locator('#enrollment-modal h2').textContent();
          assert.equal(submittedHeading?.trim(), 'Application Reserved');

          await page.keyboard.press('Escape');
          await page.locator('#enrollment-modal').waitFor({ state: 'detached' });

          entry.interactions.desktop = {
            shinyPos1: pos1,
            shinyPos2: pos2,
            modalSubmittedHeading: submittedHeading?.trim(),
          };
        }

        if (vp.name === '375') {
          // Test mobile menu button toggle
          await page.locator('#mobile-menu-button').click();
          await page.locator('#mobile-nav-drawer').waitFor({ state: 'visible' });
          await page.waitForTimeout(250);

          if (b.id === 'chromium') {
            await page.screenshot({ path: path.join(OUT_DIR, 'chromium-375-menu.png') });
          }

          const mobileItems = await page.locator('#mobile-nav-drawer a').count();
          assert.equal(mobileItems, 7, `${b.id} 375 mobile menu should have 7 items`);

          await page.keyboard.press('Escape');
          await page.locator('#mobile-nav-drawer').waitFor({ state: 'detached' });

          entry.interactions.mobile = {
            mobileItems,
          };
        }

        entry.viewports[vp.name] = {
          ...metrics,
          consoleErrors: [...allConsoleErrors],
          pageErrors: [...allPageErrors],
        };
      }

      assert.equal(allPageErrors.length, 0, `${b.id} pageErrors: ${allPageErrors.join('; ')}`);
      report.browsers[b.id] = entry;
      await context.close();
      await browser.close();
      console.log(`Verified ${b.id} (${version})`);
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2) + '\n');

    await sharp(path.join(OUT_DIR, 'chromium-1440.png'))
      .resize(698, 524, { fit: 'cover', position: 'center' })
      .webp({ quality: 88 })
      .toFile(path.join(PREVIEW_DIR, 'designpro.webp'));

    await sharp(path.join(OUT_DIR, 'chromium-820.png'))
      .resize(698, 1004, { fit: 'cover', position: 'center' })
      .webp({ quality: 88 })
      .toFile(path.join(PREVIEW_DIR, 'designpro-tablet.webp'));

    await sharp(path.join(OUT_DIR, 'chromium-375.png'))
      .resize(698, 1511, { fit: 'cover', position: 'center' })
      .webp({ quality: 88 })
      .toFile(path.join(PREVIEW_DIR, 'designpro-mobile.webp'));

    console.log('Saved checks.json and generated designpro preview WebP posters');
  } finally {
    server.close();
  }
})();
