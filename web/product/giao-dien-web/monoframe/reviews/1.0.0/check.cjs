const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));

const DIST_DIR = path.resolve(__dirname, '../../source/dist');
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

      const range = req.headers.range;
      if (range && ext === '.mp4') {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        const chunkSize = end - start + 1;
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': contentType,
        });
        fs.createReadStream(filePath, { start, end }).pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': stat.size,
          'Accept-Ranges': 'bytes',
          'Content-Type': contentType,
        });
        fs.createReadStream(filePath).pipe(res);
      }
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
  { label: '1440', width: 1440, height: 900 },
  { label: '820', width: 820, height: 1180 },
  { label: '768', width: 768, height: 1024 },
  { label: '375', width: 375, height: 812 },
  { label: '320', width: 320, height: 740 },
];

(async () => {
  const { server, port } = await startServer(DIST_DIR);
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
        await page.waitForFunction(() => {
          const v = document.querySelector('video');
          return v && v.readyState >= 2 && v.duration > 0;
        }, null, { timeout: 15000 });

        if (vp.label === '1440') {
          // Wait ~1100ms so pills are visible (400ms) and typewriter is mid-sentence (started at 600ms)
          await page.waitForTimeout(1150);
          const typingState = await page.evaluate(() => {
            const p = document.querySelector('main p');
            const cursor = p ? p.querySelector('span[aria-hidden="true"]') : null;
            const pillContainer = document.querySelector('main p + div');
            return {
              textLength: p ? p.textContent.length : 0,
              cursorPresent: Boolean(cursor),
              pillsOpacity: pillContainer ? getComputedStyle(pillContainer).opacity : '0',
            };
          });
          browserResult.interactions.midTyping = typingState;
          await page.screenshot({ path: path.join(OUT_DIR, `${b.name}-typing.png`) });
        }

        // Wait until typewriter finishes ("Glad you stopped in. Good taste tends to find us. Now, what are we building?")
        await page.waitForFunction(
          () => {
            const p = document.querySelector('main p');
            return (
              p &&
              p.textContent ===
                'Glad you stopped in. Good taste tends to find us. Now, what are we building?' &&
              !p.querySelector('span[aria-hidden="true"]')
            );
          },
          null,
          { timeout: 10000 }
        );

        const metrics = await page.evaluate(() => {
          const v = document.querySelector('video');
          const vStyle = v ? getComputedStyle(v) : null;
          const h1 = document.querySelector('main h1');
          const h1Style = h1 ? getComputedStyle(h1) : null;
          const p = document.querySelector('main p');
          const pills = Array.from(document.querySelectorAll('main button')).map((btn) => {
            const r = btn.getBoundingClientRect();
            return {
              text: btn.textContent.trim(),
              left: Math.round(r.left),
              right: Math.round(r.right),
              top: Math.round(r.top),
              bottom: Math.round(r.bottom),
            };
          });
          return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollWidth: document.documentElement.scrollWidth,
            scrollHeight: document.documentElement.scrollHeight,
            horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
            video: v
              ? {
                  position: vStyle.position,
                  zIndex: vStyle.zIndex,
                  objectFit: vStyle.objectFit,
                  objectPosition: vStyle.objectPosition,
                  muted: v.muted,
                  playsInline: v.playsInline,
                  preload: v.preload,
                  autoplay: v.autoplay,
                  duration: Number(v.duration.toFixed(3)),
                  videoWidth: v.videoWidth,
                  videoHeight: v.videoHeight,
                  currentTime: Number(v.currentTime.toFixed(3)),
                }
              : null,
            introFilter: h1Style ? h1Style.filter : null,
            introText: h1 ? h1.innerText : null,
            typewriterText: p ? p.textContent : null,
            cursorAfterDone: Boolean(p && p.querySelector('span[aria-hidden="true"]')),
            pillsCount: pills.length,
            pillsWithinViewport: pills.every(
              (pill) => pill.left >= 0 && pill.right <= window.innerWidth
            ),
          };
        });

        browserResult.viewports[vp.label] = metrics;
        await page.screenshot({ path: path.join(OUT_DIR, `${b.name}-${vp.label}.png`) });

        if (vp.label === '1440') {
          // Test clipboard copy via spy and click on the outline pill button first
          await page.evaluate(() => {
            window.__copiedText = null;
            try {
              navigator.clipboard.writeText = async (txt) => {
                window.__copiedText = txt;
              };
            } catch {
              Object.defineProperty(navigator, 'clipboard', {
                configurable: true,
                value: {
                  writeText: async (txt) => {
                    window.__copiedText = txt;
                  },
                },
              });
            }
          });
          const outlineBtn = page.locator('main button').nth(4);
          await outlineBtn.click();

          // Then test horizontal mouse-scrubbing across the viewport (left -> right)
          await page.mouse.move(120, 450);
          await page.mouse.move(1320, 450, { steps: 20 });
          await page.waitForTimeout(350);

          const scrubAndCopy = await page.evaluate(() => {
            const v = document.querySelector('video');
            return {
              scrubbedTime: v ? Number(v.currentTime.toFixed(3)) : 0,
              copiedText: window.__copiedText,
            };
          });
          browserResult.interactions.scrubAndCopy = scrubAndCopy;
          await page.screenshot({ path: path.join(OUT_DIR, `${b.name}-scrubbed.png`) });
        }

        if (vp.label === '375') {
          // Test mobile hamburger menu open and Escape close
          const burger = page.locator('header button');
          await burger.click();
          await page.waitForTimeout(350);
          const menuOpenState = await page.evaluate(() => {
            const burgerBtn = document.querySelector('header button');
            const overlay = document.querySelector('header + div');
            const st = overlay ? getComputedStyle(overlay) : null;
            return {
              ariaExpanded: burgerBtn ? burgerBtn.getAttribute('aria-expanded') : null,
              overlayOpacity: st ? st.opacity : null,
              overlayPointerEvents: st ? st.pointerEvents : null,
            };
          });
          await page.screenshot({ path: path.join(OUT_DIR, `${b.name}-375-menu.png`) });
          await page.keyboard.press('Escape');
          await page.waitForTimeout(350);
          const menuClosedState = await page.evaluate(() => {
            const burgerBtn = document.querySelector('header button');
            const overlay = document.querySelector('header + div');
            const st = overlay ? getComputedStyle(overlay) : null;
            return {
              ariaExpanded: burgerBtn ? burgerBtn.getAttribute('aria-expanded') : null,
              overlayOpacity: st ? st.opacity : null,
              overlayPointerEvents: st ? st.pointerEvents : null,
            };
          });
          browserResult.interactions.mobileMenu = {
            open: menuOpenState,
            closedAfterEscape: menuClosedState,
          };
        }

        await context.close();
      }

      report.browsers[b.name] = browserResult;
      await browser.close();
    }
  } finally {
    server.close();
  }

  fs.writeFileSync(path.join(OUT_DIR, 'checks.json'), JSON.stringify(report, null, 2));
  console.log('Saved checks.json successfully.');
})();
