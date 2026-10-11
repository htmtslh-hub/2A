const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { deflateRawSync } = require('node:zlib');
const { chromium } = require('../../../../../../_design/.tooling/node_modules/playwright');
const sharp = require('C:/Users/htmts/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const product = path.resolve(__dirname, '../..');
const source = path.join(product, 'source');
const entries = fs.readdirSync(source, { recursive: true })
  .filter(file => fs.statSync(path.join(source, file)).isFile())
  .map(file => {
    const data = fs.readFileSync(path.join(source, file));
    const name = 'crimson-folio/' + file.replaceAll('\\', '/');
    return { name, bytes: data.length, packedBytes: Math.min(data.length, deflateRawSync(data, { level: 9 }).length) };
  });
const manifest = { entries, estimatedZipBytes: 22 + entries.reduce((sum, file) => sum + 76 + 2 * Buffer.byteLength(file.name) + file.packedBytes, 0), approval: 'Owner accepted eight files and 128 KiB on 2026-10-06; see QA.md' };
fs.writeFileSync(path.join(__dirname, 'package-plan.json'), JSON.stringify(manifest, null, 2));
console.log(JSON.stringify(manifest));
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1396, height: 1048 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(path.join(source, 'index.html')).href);
    await page.waitForTimeout(700);
    const png = await page.screenshot();
    await sharp(png).resize(698, 524).webp({ quality: 88 }).toFile(path.resolve(product, '../../../public/previews/crimson-folio.webp'));
  } finally { await browser.close(); }
})();
