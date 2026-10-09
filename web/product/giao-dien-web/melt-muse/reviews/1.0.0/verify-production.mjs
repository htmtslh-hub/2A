import { chromium } from '../../../../../../_design/.tooling/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const base = 'https://forgezone.store';
const demo = '/demos/melt-muse';
const report = { date: new Date().toISOString(), base, deployedCommit: '4f57913', assets: [], smoke: [], browsers: [], failures: [] };
const sha = b => createHash('sha256').update(b).digest('hex');
for (const file of ['index.html','assets/css/style.css','assets/js/main.js','assets/img/soft-focus.webp','assets/img/damn-right.webp','assets/img/heart-pose.webp']) {
  const response = await fetch(`${base}${demo}/${file}?rev=4f57913`, { headers: { 'Cache-Control': 'no-cache' } });
  const actual = Buffer.from(await response.arrayBuffer());
  const expected = readFileSync(resolve(here, '../../../../../public/demos/melt-muse', file));
  const entry = { file, status: response.status, matches: actual.equals(expected), expectedSha256: sha(expected), actualSha256: sha(actual) };
  report.assets.push(entry);
  if (!response.ok || !entry.matches) report.failures.push(`Asset mismatch: ${file}`);
}
for (const path of ['/', '/admin', '/api/admin', '/dich-vu', '/tai-khoan', '/demos/apartment-flow/index.html', '/demos/shirtline/index.html', '/demos/watchroom/index.html', '/demos/novatrend/index.html', '/previews/melt-muse.webp']) {
  const response = await fetch(base + path, { redirect: 'manual' });
  report.smoke.push({ path, status: response.status, location: response.headers.get('location') });
  const ok = path === '/api/admin' ? response.status === 403 : path === '/dich-vu' ? response.status === 410 : [200,301,302,303,307,308].includes(response.status);
  if (!ok) report.failures.push(`Smoke: ${path} ${response.status}`);
}
mkdirSync(resolve(here,'screenshots'), { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
for (const [width,height] of [[1440,900],[375,812]]) {
  await page.setViewportSize({width,height});
  const response = await page.goto(`${base}${demo}/index.html?rev=4f57913`);
  await page.waitForTimeout(800);
  await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));
  await page.waitForTimeout(350);
  await page.evaluate(()=>scrollTo(0,0));
  const result = await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].every(i=>i.complete && i.naturalWidth>0),title:document.title}));
  result.status=response.status();
  if(width===375){await page.locator('.nav-toggle').click();result.menu=await page.locator('#site-menu').isVisible();await page.keyboard.press('Escape');result.escape=await page.locator('.nav-toggle').getAttribute('aria-expanded')==='false';}
  await page.screenshot({path:resolve(here,`screenshots/production-edge-${width}.png`),fullPage:true});
  report.browsers.push({name:'Microsoft Edge',version:browser.version(),...result});
  if(result.scrollWidth>width || !result.images || result.status!==200 || result.menu===false || result.escape===false) report.failures.push(`Browser: ${width}`);
}
report.errors=errors;
if(errors.length) report.failures.push('Runtime errors');
await browser.close();
writeFileSync(resolve(here,'production-checks.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(report.failures.length) process.exitCode=1;
