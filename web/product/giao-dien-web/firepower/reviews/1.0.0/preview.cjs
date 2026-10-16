const fs = require('node:fs');
const path = require('node:path');
const { createServer } = require('node:http');
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve('_design/.browsers');
const { chromium } = require('../../../../../../_design/.tooling/node_modules/playwright');
const source = path.resolve(__dirname, '../../source');
const server = createServer((req, res) => {
  let file = path.join(source, new URL(req.url, 'http://local').pathname);
  if (!file.startsWith(source)) return res.writeHead(403).end();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  try {
    res.setHeader('Content-Type', ({ '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp' })[path.extname(file)] || 'application/octet-stream');
    res.end(fs.readFileSync(file));
  } catch { res.writeHead(404).end(); }
});
(async () => {
  await new Promise(r => server.listen(4409, '127.0.0.1', r));
  console.log('Firepower preview http://127.0.0.1:4409');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:4409');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(__dirname, 'candidate.png'), fullPage: true });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: path.join(__dirname, 'mobile.png'), fullPage: true });
  console.log(await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, width: innerWidth })));
  await browser.close();
  if (!process.argv.includes('--serve')) server.close();
})().catch(e => { console.error(e); process.exitCode = 1; server.close(); });
