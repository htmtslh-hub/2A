/** Record actual shipped demos, never animate a still image. Run from repo root:
 * node web/product/giao-dien-web/tools/quay-preview.mjs [slug] [--check]
 * Requires Playwright, esbuild and ffmpeg/ffprobe. No runtime dependencies added. */
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
const root = process.cwd();
const require = createRequire(import.meta.url);
const esbuild = require(resolve(root, '_design/.tooling/node_modules/esbuild'));
const sharp = require(existsSync(resolve(root, '_design/.tooling/node_modules/sharp'))
  ? resolve(root, '_design/.tooling/node_modules/sharp')
  : resolve(root, 'web/node_modules/sharp'));
process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve(root, '_design/.browsers');
const { chromium } = await import(pathToFileURL(resolve(root, '_design/.tooling/node_modules/playwright/index.mjs')).href);
const result = esbuild.buildSync({ entryPoints: ['web/src/lib/real-templates.ts'], bundle: true, platform: 'node', format: 'cjs', write: false });
const mod = { exports: {} };
new Function('module', 'exports', result.outputFiles[0].text)(mod, mod.exports);
const catalog = Object.entries(mod.exports.REAL_TEMPLATES);
const only = process.argv.slice(2).find(a => !a.startsWith('--'));
const check = process.argv.includes('--check');
const resume = process.argv.includes('--resume');
const selected = only ? catalog.filter(([, t]) => t.slug === only) : catalog;
if (!selected.length) throw Error('Unknown catalog slug');
const publicRoot = resolve(root, 'web/public');
const out = resolve(publicRoot, 'previews');
const evidence = resolve(root, 'web/product/giao-dien-web/reviews/video-previews');
const manifestPath = resolve(root, 'web/src/lib/preview-recordings.json');
let manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')) : {};
const hash = b => createHash('sha256').update(b).digest('hex');
async function demoHash(slug) {
  const base = resolve(publicRoot, `demos/${slug}`);
  const digest = createHash('sha256');
  async function walk(dir) {
    const files = (await readdir(dir, {withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name));
    for (const file of files) {
      const path = resolve(dir,file.name);
      if (file.isDirectory()) await walk(path);
      else { digest.update(path.slice(base.length).replaceAll('\\','/')); digest.update(await readFile(path)); }
    }
  }
  await walk(base); return digest.digest('hex');
}
if (check) {
  for (const [id, t] of selected) {
    const row = manifest[t.slug];
    if (!row || row.productVersion !== (t.version ?? 'unversioned') || row.status !== 'recorded') throw Error(`${id}: stale/missing/failed recording`);
    const bytes = await readFile(resolve(out, `${t.slug}.mp4`));
    if (hash(bytes) !== row.sha256) throw Error(`${id}: video hash differs`);
    if (hash(await readFile(resolve(publicRoot, `demos/${t.slug}/index.html`))) !== row.demoHtmlSha256) throw Error(`${id}: demo changed; re-record`);
    if (await demoHash(t.slug) !== row.demoSha256) throw Error(`${id}: demo assets changed; re-record`);
    if (row.duration < 12 || row.duration > 18) throw Error(`${id}: invalid clip duration`);
  }
  console.log(`PASS ${selected.length} catalog recordings, revisions and hashes`);
  process.exit(0);
}
await mkdir(evidence, { recursive: true });
await mkdir(resolve(evidence, 'recordings'), { recursive: true });
await mkdir(resolve(evidence, 'screenshots'), { recursive: true });
const mime = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.webp':'image/webp', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.mp4':'video/mp4', '.json':'application/json', '.woff2':'font/woff2' };
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://local').pathname);
  if (path.endsWith('/')) path += 'index.html';
  const file = resolve(publicRoot, '.' + path);
  if (!file.startsWith(publicRoot + sep)) return res.writeHead(403).end();
  try { const bytes = await readFile(file); res.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' }); res.end(bytes); }
  catch { res.writeHead(404).end(); }
});
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true });
const nextSelector = '#hero-next, #hero-arrow-next, #next, [data-step="1"], [data-direction="1"], [data-next], [data-next-preview]';
try {
  for (const [id, product] of selected) {
    const slug = product.slug;
    if (resume && manifest[slug]?.duration >= 12 && manifest[slug]?.productVersion === (product.version ?? 'unversioned') &&
      existsSync(resolve(out, `${slug}.mp4`)) && manifest[slug].demoSha256 === await demoHash(slug) &&
      manifest[slug].sha256 === hash(await readFile(resolve(out, `${slug}.mp4`)))) {
      console.log(`${slug}: retained verified completed recording`); continue;
    }
    if (!existsSync(resolve(publicRoot, `demos/${slug}/index.html`))) throw Error(`${slug}: no released demo`);
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: resolve(evidence, 'recordings'), size: { width: 1440, height: 900 } } });
    // Capture only public demo activity. No submissions, checkout or analytics.
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin === origin || ['fonts.googleapis.com','fonts.gstatic.com'].includes(url.hostname)) return route.continue();
      return route.abort();
    });
    const page = await context.newPage();
    const errors = [], missing = [], actions = [], frames = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400 && r.url().startsWith(origin)) missing.push(r.url().replace(origin,'')); });
    await page.goto(`${origin}/demos/${slug}/index.html`, { waitUntil: 'load' });
    await page.waitForTimeout(1800);
    await page.evaluate(() => document.fonts.ready);
    const start = Date.now();
    const at = async seconds => { const remaining = seconds * 1000 - (Date.now() - start); if (remaining > 0) await page.waitForTimeout(remaining); };
    const shot = async name => {
      const file = resolve(evidence, `screenshots/${slug}-${name}.jpg`);
      await page.screenshot({ path: file, type:'jpeg', quality:82 }); frames.push(file);
    };
    const next = async () => {
      if (slug === 'leaflit') {
        const query = actions.some(a => a.action === 'search') ? '' : 'glass';
        await page.locator('#book-search').fill(query);
        actions.push({seconds:(Date.now()-start)/1000,action:'search',query});
        return;
      }
      if (slug === 'lingoglass') {
        const name = actions.some(a=>a.action==='click') ? 'Cài đặt' : 'Xem kịch bản mẫu (Demo)';
        await page.getByRole('button',{name,exact:true}).click();
        actions.push({seconds:(Date.now()-start)/1000,action:'click',selector:`button named ${name}`}); return;
      }
      const candidates = page.locator(nextSelector);
      for (let i = 0; i < await candidates.count(); i++) {
        const button = candidates.nth(i);
        if (await button.isVisible() && await button.isEnabled()) {
          await button.click(); actions.push({ seconds: (Date.now()-start)/1000, action:'click', selector:await button.evaluate(e => e.id ? '#'+e.id : e.outerHTML.slice(0,180)) }); return;
        }
      }
    };
    await shot('hero');
    await at(1); await page.mouse.move(380, 480, { steps: 12 }); actions.push({ seconds:1, action:'hover hero' });
    await at(2.4); await next();
    await at(4.2); await shot('interaction');
    await at(4.8); await next();
    await at(6.7);
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const target = Math.min(scrollHeight-900, slug === 'apartment-flow' ? 2400 : 1650);
    for (let step=1; step<=5; step++) {
      await page.mouse.wheel(0, Math.max(0,target)/5); await page.waitForTimeout(450);
    }
    actions.push({ seconds:6.7, action:'scroll', target });
    await at(10); await shot('scroll');
    await at(11.5); await page.evaluate(() => window.scrollTo({ top:0, behavior:'smooth' }));
    await at(14); await shot('return');
    await at(15.5);
    const raw = await page.video().path();
    await context.close();
    // Browser screencast can start after page creation under GPU load. Derive
    // trim from recorded timestamps rather than wall-clock startup time.
    const rawDuration = Number(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',raw],{encoding:'utf8'}));
    const trim = Math.max(0, rawDuration - 15.5);
    const destination = resolve(out, `${slug}.mp4`);
    execFileSync('ffmpeg', ['-y','-loglevel','error','-ss',trim.toFixed(3),'-i',raw,'-t','15','-vf','scale=960:600,fps=30','-an','-c:v','libx264','-preset','fast','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart',destination]);
    const metadata = JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',destination],{encoding:'utf8'}));
    if (Number(metadata.format.duration) < 12) throw Error(`${slug}: clip too short; inspect raw capture`);
    const bytes = await readFile(destination);
    manifest[slug] = { status:errors.length || missing.length ? 'failed' : 'recorded', productVersion:product.version ?? 'unversioned', revision:hash(bytes).slice(0,12), sha256:hash(bytes), demoHtmlSha256:hash(await readFile(resolve(publicRoot,`demos/${slug}/index.html`))), demoSha256:await demoHash(slug), bytes:bytes.length, duration:Number(metadata.format.duration), width:960,height:600, fps:30, audio:false };
    await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
    const thumbs = await Promise.all(frames.map(async file => ({ input:await sharp(file).resize(360,225).toBuffer() })));
    await sharp({create:{width:1440,height:225,channels:3,background:'#111'}}).composite(thumbs.map((item,i)=>({...item,left:i*360,top:0}))).jpeg({quality:85}).toFile(resolve(evidence,`screenshots/${slug}-contact.jpg`));
    await writeFile(resolve(evidence,`${slug}.json`),JSON.stringify({id,slug,browser:browser.version(),date:new Date().toISOString(),demo:`/demos/${slug}/index.html`,...manifest[slug],actions,errors,missing,frames:frames.map(f=>f.replace(root+sep,''))},null,2)+'\n');
    console.log(`${slug}: ${bytes.length} bytes, ${metadata.format.duration}s, ${actions.filter(a=>a.action==='click').length} real clicks, errors=${errors.length}, missing=${missing.length}`);
    if (errors.length || missing.length) throw Error(`${slug}: recording has demo errors; inspect evidence`);
  }
} finally { await browser.close(); server.close(); }
