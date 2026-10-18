const fs = require('fs');
const path = require('path');
const http = require('http');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));

const baseDir = path.join(root, 'web/product/giao-dien-web/solaris-gate/source');
const outDir = path.join(root, 'web/product/giao-dien-web/solaris-gate/reviews/1.0.0');

(async () => {
  const server = http.createServer((req, res) => {
    const reqPath = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(baseDir, reqPath === '/' ? 'index.html' : reqPath);
    try {
      const data = fs.readFileSync(file);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(data);
    } catch {
      res.writeHead(404).end();
    }
  }).listen(0, '127.0.0.1');

  await new Promise(resolve => server.on('listening', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;

  const engines = [
    ['chromium', chromium, {}],
    ['firefox', firefox, {}],
    ['edge', chromium, { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' }],
    ['coccoc', chromium, { executablePath: 'C:/Program Files/CocCoc/Browser/Application/browser.exe' }]
  ];

  const report = {
    date: new Date().toISOString(),
    browsers: {}
  };

  for (const [name, engine, launchOpts] of engines) {
    const browser = await engine.launch({ headless: true, ...launchOpts });
    const browserReport = {
      version: browser.version(),
      viewports: {},
      flow: null,
      errors: []
    };
    report.browsers[name] = browserReport;

    // 1. Viewport layout checks
    for (const [w, h] of [[1440, 900], [820, 1180], [768, 1024], [375, 812], [320, 740]]) {
      const context = await browser.newContext({ viewport: { width: w, height: h } });
      const page = await context.newPage();
      const pageErrors = [];
      page.on('pageerror', err => pageErrors.push(String(err)));
      page.on('console', msg => {
        if (msg.type() === 'error') pageErrors.push(msg.text());
      });

      await page.goto(origin, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.body.classList.contains('intro-ready'), null, { timeout: 12000 });
      await page.waitForFunction(
        () => {
          const v = document.getElementById('portal-video');
          return v && (v.readyState >= 2 || v.error);
        },
        null,
        { timeout: 8000 }
      ).catch(() => {});
      await page.waitForTimeout(2700);

      const metrics = await page.evaluate(() => {
        const doc = document.documentElement;
        const exp = document.querySelector('.experience');
        const portal = document.getElementById('portal');
        const pRect = portal.getBoundingClientRect();
        const hRect = document.getElementById('planet-title').getBoundingClientRect();
        return {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          scrollHeight: doc.scrollHeight,
          clientHeight: doc.clientHeight,
          planet: exp.dataset.planet,
          title: document.getElementById('planet-title').textContent,
          titleLeft: Math.round(hRect.left),
          nextNumber: document.getElementById('next-number').textContent,
          nextName: document.getElementById('next-name').textContent,
          factsCount: document.querySelectorAll('#facts .fact').length,
          planetItemsCount: document.querySelectorAll('.planet-list .planet-item').length,
          activePlanetItem: document.querySelector('.planet-list .planet-item.active')?.textContent || null,
          logoDocked: document.getElementById('floating-logo').classList.contains('is-docked'),
          logoAlt: document.getElementById('floating-logo').getAttribute('alt'),
          portalRect: {
            left: Math.round(pRect.left),
            top: Math.round(pRect.top),
            width: Math.round(pRect.width),
            height: Math.round(pRect.height)
          }
        };
      });

      if (name === 'chromium' || name === 'firefox') {
        await page.screenshot({ path: path.join(outDir, `${name}-${w}.png`) });
      }

      browserReport.viewports[`${w}x${h}`] = {
        ...metrics,
        overflowX: metrics.scrollWidth > metrics.clientWidth,
        overflowY: metrics.scrollHeight > metrics.clientHeight,
        errors: pageErrors
      };
      browserReport.errors.push(...pageErrors);
      await context.close();
    }

    // 2. Interactive flow check at 1440x900 (cursor, hover, Mars -> Earth -> Venus -> terminal click)
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const flowErrors = [];
    page.on('pageerror', err => flowErrors.push(String(err)));
    page.on('console', msg => {
      if (msg.type() === 'error') flowErrors.push(msg.text());
    });

    await page.goto(origin, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.body.classList.contains('intro-ready'), null, { timeout: 12000 });
    await page.waitForTimeout(2700);

    // Move mouse over portal to test custom cursor + .is-enter
    const portalBox = await page.locator('#portal').boundingBox();
    const cx = portalBox.x + portalBox.width / 2;
    const cy = portalBox.y + portalBox.height / 2;
    await page.mouse.move(200, 200);
    await page.waitForTimeout(150);
    await page.mouse.move(cx, cy);
    await page.waitForTimeout(200);

    const cursorState = await page.evaluate(() => {
      const c = document.querySelector('.custom-cursor');
      return {
        visible: c.classList.contains('is-visible'),
        enter: c.classList.contains('is-enter'),
        transform: c.style.transform
      };
    });

    // Click portal: Mars -> Earth
    await page.locator('#portal').click();
    await page.waitForFunction(
      () => document.querySelector('.experience').dataset.planet === 'earth' &&
            !document.querySelector('.experience').classList.contains('is-transitioning'),
      null,
      { timeout: 15000 }
    );
    await page.waitForTimeout(2200);

    const earthState = await page.evaluate(() => ({
      planet: document.querySelector('.experience').dataset.planet,
      title: document.getElementById('planet-title').textContent,
      nextNumber: document.getElementById('next-number').textContent,
      nextName: document.getElementById('next-name').textContent,
      portalAria: document.getElementById('portal').getAttribute('aria-label'),
      activeItem: document.querySelector('.planet-list .planet-item.active')?.textContent,
      isSwitching: document.querySelector('.planet-list').classList.contains('is-switching')
    }));

    if (name === 'chromium') {
      await page.screenshot({ path: path.join(outDir, 'chromium-earth-1440.png') });
    }

    // Click portal: Earth -> Venus
    await page.locator('#portal').click();
    await page.waitForFunction(
      () => document.querySelector('.experience').dataset.planet === 'venus' &&
            !document.querySelector('.experience').classList.contains('is-transitioning'),
      null,
      { timeout: 15000 }
    );
    await page.waitForTimeout(2200);

    const venusState = await page.evaluate(() => ({
      planet: document.querySelector('.experience').dataset.planet,
      title: document.getElementById('planet-title').textContent,
      nextNumber: document.getElementById('next-number').textContent,
      nextName: document.getElementById('next-name').textContent,
      portalAria: document.getElementById('portal').getAttribute('aria-label'),
      activeItem: document.querySelector('.planet-list .planet-item.active')?.textContent,
      portalImageDisplay: document.getElementById('portal-image').style.display,
      portalVideoDisplay: document.getElementById('portal-video').style.display,
      mercuryLoaded: document.getElementById('portal-image').complete && document.getElementById('portal-image').naturalWidth > 0
    }));

    if (name === 'chromium') {
      await page.screenshot({ path: path.join(outDir, 'chromium-venus-1440.png') });
    }

    // Click portal at Venus (terminal: should be ignored)
    await page.locator('#portal').click();
    await page.waitForTimeout(400);
    const afterTerminalClick = await page.evaluate(() => ({
      planet: document.querySelector('.experience').dataset.planet,
      isTransitioning: document.querySelector('.experience').classList.contains('is-transitioning'),
      isLoading: document.querySelector('.experience').classList.contains('is-loading')
    }));

    browserReport.flow = {
      cursorState,
      earthState,
      venusState,
      afterTerminalClick,
      errors: flowErrors
    };
    browserReport.errors.push(...flowErrors);

    await context.close();
    await browser.close();
  }

  fs.writeFileSync(path.join(outDir, 'checks.json'), JSON.stringify(report, null, 2));
  console.log('Done! Summary:');
  for (const [bName, bData] of Object.entries(report.browsers)) {
    console.log(bName, bData.version, 'errors:', bData.errors.length, 'earth:', bData.flow.earthState.title, 'venus:', bData.flow.venusState.title);
  }
  server.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
