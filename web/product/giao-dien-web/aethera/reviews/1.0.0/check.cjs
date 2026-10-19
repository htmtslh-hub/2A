const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));

const BUILT_DIR = path.resolve(__dirname, '../../source/built');
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
  { label: '1440', width: 1440, height: 900 },
  { label: '820', width: 820, height: 1180 },
  { label: '375', width: 375, height: 812 },
  { label: '320', width: 320, height: 740 },
];

(async () => {
  const { server, port } = await startServer(BUILT_DIR);
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
          reducedMotion: 'reduce',
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
            const v = document.querySelector('video');
            return v && v.readyState >= 2 && v.duration > 0;
          },
          null,
          { timeout: 20000 }
        );

        // Wait until entrance animations complete and video reaches mid-playback (opacity ~ 1)
        await page.waitForTimeout(1500);
        await page.evaluate(() => {
          const v = document.querySelector('video');
          if (v && v.currentTime < 1.0) {
            v.currentTime = 2.0;
          }
        });
        await page.waitForTimeout(200);

        const metrics = await page.evaluate(() => {
          const v = document.querySelector('video');
          const vParent = v ? v.parentElement : null;
          const vParentStyle = vParent ? getComputedStyle(vParent) : null;
          const h1 = document.querySelector('main h1');
          const h1Style = h1 ? getComputedStyle(h1) : null;
          const ems = h1 ? Array.from(h1.querySelectorAll('em')) : [];
          const p = document.querySelector('main p');
          const pStyle = p ? getComputedStyle(p) : null;
          const cta = document.querySelector('main button');
          const ctaStyle = cta ? getComputedStyle(cta) : null;
          const navLinks = Array.from(document.querySelectorAll('header nav a')).map((a) => ({
            text: a.textContent.trim(),
            color: getComputedStyle(a).color,
          }));

          return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollWidth: document.documentElement.scrollWidth,
            scrollHeight: document.documentElement.scrollHeight,
            horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
            videoLayer: vParentStyle
              ? {
                  top: vParentStyle.top,
                  bottom: vParentStyle.bottom,
                  left: vParentStyle.left,
                  right: vParentStyle.right,
                  zIndex: vParentStyle.zIndex,
                }
              : null,
            video: v
              ? {
                  src: v.currentSrc,
                  opacity: Number(parseFloat(getComputedStyle(v).opacity).toFixed(2)),
                  duration: Number(v.duration.toFixed(3)),
                  videoWidth: v.videoWidth,
                  videoHeight: v.videoHeight,
                  currentTime: Number(v.currentTime.toFixed(3)),
                }
              : null,
            headline: h1
              ? {
                  text: h1.textContent.replace(/\s+/g, ' ').trim(),
                  opacity: h1Style.opacity,
                  letterSpacing: h1Style.letterSpacing,
                  color: h1Style.color,
                  italicSpans: ems.map((em) => ({
                    text: em.textContent,
                    fontStyle: getComputedStyle(em).fontStyle,
                    color: getComputedStyle(em).color,
                  })),
                }
              : null,
            description: p
              ? {
                  text: p.textContent.replace(/\s+/g, ' ').trim(),
                  opacity: pStyle.opacity,
                  color: pStyle.color,
                }
              : null,
            heroCta: cta
              ? {
                  text: cta.textContent.trim(),
                  opacity: ctaStyle.opacity,
                  bg: ctaStyle.backgroundColor,
                  color: ctaStyle.color,
                }
              : null,
            navLinks,
          };
        });

        browserResult.viewports[vp.label] = metrics;
        await page.screenshot({ path: path.join(OUT_DIR, `${b.name}-${vp.label}.png`) });

        if (vp.label === '1440') {
          // Test video fade-out near end and ended loop restart
          const loopMetrics = await page.evaluate(async () => {
            const v = document.querySelector('video');
            if (!v) return null;

            v.currentTime = 0.25;
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            const startMidFadeOpacity = Number(parseFloat(v.style.opacity).toFixed(2));

            v.currentTime = v.duration - 0.25;
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            const endMidFadeOpacity = Number(parseFloat(v.style.opacity).toFixed(2));

            v.dispatchEvent(new Event('ended'));
            const endedImmediateOpacity = Number(parseFloat(v.style.opacity).toFixed(2));

            await new Promise((r) => setTimeout(r, 150));
            return {
              startMidFadeOpacity,
              endMidFadeOpacity,
              endedImmediateOpacity,
              restartedTime: Number(v.currentTime.toFixed(2)),
            };
          });

          // Test opening and closing the "Begin Journey" inquiry modal
          await page.click('main button');
          await page.waitForSelector('[role="dialog"]');
          await page.screenshot({ path: path.join(OUT_DIR, `${b.name}-modal.png`) });
          await page.fill('#journey-name', 'Clara Vance');
          await page.fill('#journey-email', 'clara@aethera.studio');
          await page.click('[role="dialog"] button[type="submit"]');
          const submittedText = await page.textContent('[role="dialog"]');
          await page.keyboard.press('Escape');
          const modalClosed = (await page.$('[role="dialog"]')) === null;

          browserResult.interactions = {
            loopMetrics,
            modalSubmitted: submittedText.includes('Your note has been received.'),
            modalClosedOnEscape: modalClosed,
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
