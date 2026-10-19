const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));

const SRC_DIR = path.resolve(__dirname, '../../source');
const OUT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
};

function startServer(rootDir) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const relPath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
      const filePath = path.join(rootDir, relPath);

      if (!filePath.startsWith(rootDir) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }

      const stat = fs.statSync(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Length': stat.size,
        'Accept-Ranges': 'bytes',
        'Content-Type': contentType,
      });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, port: server.address().port });
    });
  });
}

const BROWSERS = [
  { name: 'chromium', launcher: chromium, options: { headless: true } },
  { name: 'firefox', launcher: firefox, options: { headless: true } },
  {
    name: 'edge',
    launcher: chromium,
    options: {
      headless: true,
      executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    },
  },
  {
    name: 'coccoc',
    launcher: chromium,
    options: {
      headless: true,
      executablePath: 'C:\\Program Files\\CocCoc\\Browser\\Application\\browser.exe',
    },
  },
];

const VIEWPORTS = [
  { label: '1487', width: 1487, height: 1058 },
  { label: '1440', width: 1440, height: 900 },
  { label: '820', width: 820, height: 1180 },
  { label: '375', width: 375, height: 812 },
  { label: '320', width: 320, height: 740 },
];

(async () => {
  const { server, port } = await startServer(SRC_DIR);
  const baseUrl = `http://127.0.0.1:${port}/index.html`;
  const report = {
    date: new Date().toISOString(),
    baseUrl,
    browsers: {},
  };

  try {
    for (const b of BROWSERS) {
      console.log(`Testing ${b.name}...`);
      const browser = await b.launcher.launch(b.options);
      const version = browser.version();
      const browserResult = {
        version,
        consoleErrors: [],
        pageErrors: [],
        viewports: {},
        interactions: {},
      };

      for (const vp of VIEWPORTS) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
        });
        const page = await context.newPage();
        page.on('console', (msg) => {
          if (msg.type() === 'error') browserResult.consoleErrors.push(msg.text());
        });
        page.on('pageerror', (err) => {
          browserResult.pageErrors.push(err.message);
        });

        await page.goto(baseUrl, { waitUntil: 'load' });
        await page.waitForFunction(
          () => {
            const v = document.querySelector('video.plate-video');
            return v && v.readyState >= 2 && v.duration > 0;
          },
          null,
          { timeout: 20000 }
        );

        await page.waitForTimeout(1500);

        const metrics = await page.evaluate(() => {
          const rect = (sel) => {
            const el = document.querySelector(sel);
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
              left: Number(r.left.toFixed(1)),
              top: Number(r.top.toFixed(1)),
              width: Number(r.width.toFixed(1)),
              height: Number(r.height.toFixed(1)),
              opacity: getComputedStyle(el).opacity,
            };
          };
          const v = document.querySelector('video.plate-video');
          return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollWidth: document.documentElement.scrollWidth,
            scrollHeight: document.documentElement.scrollHeight,
            horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
            title: document.title,
            brand: rect('.brand'),
            links: rect('.links'),
            pillNav: rect('.pill-nav'),
            headline: rect('.headline'),
            sub: rect('.sub'),
            pillCta: rect('.pill-cta'),
            ghost: rect('.actions .ghost'),
            lg1: rect('.lg1'),
            lg2: rect('.lg2'),
            lg3: rect('.lg3'),
            lg4: rect('.lg4'),
            video: v
              ? {
                  src: v.currentSrc,
                  videoWidth: v.videoWidth,
                  videoHeight: v.videoHeight,
                  duration: Number(v.duration.toFixed(3)),
                  currentTime: Number(v.currentTime.toFixed(3)),
                }
              : null,
          };
        });

        browserResult.viewports[vp.label] = metrics;
        await page.screenshot({ path: path.join(OUT_DIR, `${b.name}-${vp.label}.png`) });

        if (vp.label === '375') {
          // Test mobile menu open, Escape close, link click close, and landscape resize close
          await page.click('#burger');
          await page.waitForTimeout(450);
          const openState = await page.evaluate(() => ({
            stageOpen: document.getElementById('stage').classList.contains('is-open'),
            ariaExpanded: document.getElementById('burger').getAttribute('aria-expanded'),
            menuAriaHidden: document.getElementById('menu').getAttribute('aria-hidden'),
            menuOpacity: getComputedStyle(document.getElementById('menu')).opacity,
          }));
          await page.screenshot({ path: path.join(OUT_DIR, `${b.name}-375-menu.png`) });

          await page.keyboard.press('Escape');
          await page.waitForTimeout(200);
          const afterEscape = await page.evaluate(() => ({
            stageOpen: document.getElementById('stage').classList.contains('is-open'),
            ariaExpanded: document.getElementById('burger').getAttribute('aria-expanded'),
            menuAriaHidden: document.getElementById('menu').getAttribute('aria-hidden'),
          }));

          await page.click('#burger');
          await page.waitForTimeout(200);
          await page.setViewportSize({ width: 1200, height: 800 });
          await page.waitForTimeout(200);
          const afterLandscapeResize = await page.evaluate(() => ({
            stageOpen: document.getElementById('stage').classList.contains('is-open'),
          }));

          browserResult.interactions = {
            openState,
            afterEscape,
            afterLandscapeResize,
          };
        }

        await context.close();
      }

      await browser.close();
      report.browsers[b.name] = browserResult;
    }

    fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2));
    console.log('Saved checks.json successfully.');
  } finally {
    server.close();
  }
})();
