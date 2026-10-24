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
  try {
    const bytes = await readFile(file);
    const contentType = mime[extname(file)] ?? 'application/octet-stream';
    const range = req.headers.range;
    if (range && extname(file) === '.mp4') {
      const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
      const start = Number.parseInt(startStr, 10);
      const end = endStr ? Number.parseInt(endStr, 10) : bytes.length - 1;
      const chunk = bytes.subarray(start, end + 1);
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${bytes.length}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunk.length,
        'Content-Type': contentType,
      });
      res.end(chunk);
    } else {
      res.writeHead(200, {
        'Accept-Ranges': 'bytes',
        'Content-Length': bytes.length,
        'Content-Type': contentType,
      });
      res.end(bytes);
    }
  }
  catch { res.writeHead(404).end(); }
});
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true });
const nextSelector = '#hero-next, #hero-arrow-next, #next, [data-step="1"], [data-direction="1"], [data-next], [data-next-preview]';
const remoteBriefProducts = new Set(['spaceedu','mostar-city','fennec','riverine-ai','freight-axis','meridian','solaris-gate','monoframe','cyber-ronin','vertex-shops','nexlayer','halden','sellix']);
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
    const allowedBriefHosts = new Set();
    if (slug === 'jack-3d') {
      for (const host of ['shrug-person-78902957.figma.site','motionsites.ai','images.higgs.ai','d8j0ntlcm91z4.cloudfront.net']) allowedBriefHosts.add(host);
    }
    if (slug === 'monoframe' || slug === 'aethera' || slug === 'nexlayer' || slug === 'vectrus-energy' || slug === 'halden' || slug === 'prmpt' || slug === 'designpro' || slug === 'cinematic' || slug === 'viktor' || slug === 'camper' || slug === 'sellix' || slug === 'neuralkinetics' || slug === 'lumora' || slug === 'securify' || slug === 'cozypaws' || slug === 'synapsex' || slug === 'oceanpulse' || slug === 'meadowbell' || slug === 'eclipsio' || slug === 'murmur' || slug === 'wander-far' || slug === 'iris' || slug === 'melli' || slug === 'reelmark' || slug === 'cast-and-render' || slug === 'vanguard' || slug === 'targo' || slug === 'gridwork-co' || slug === 'vaultra' || slug === 'lauberhorn-ridge') {
      for (const host of ['db.onlinewebfonts.com','d8j0ntlcm91z4.cloudfront.net','d2ol7oe51mr4n9.cloudfront.net','images.higgs.ai','soft-zoom-63098134.figma.site','polo-pecan-73837341.figma.site','cdn.jsdelivr.net']) allowedBriefHosts.add(host);
    }
    if (slug === 'toonhub') {
      allowedBriefHosts.add('fifth-gentle-45902158.figma.site');
    }
    if (remoteBriefProducts.has(slug)) {
      const html = await readFile(resolve(publicRoot, `demos/${slug}/index.html`), 'utf8');
      for (const match of html.matchAll(/https:\/\/[^\s"'<>]+/g)) {
        try { allowedBriefHosts.add(new URL(match[0]).hostname); } catch {}
      }
    }
    // Capture only public demo activity. No submissions, checkout or analytics.
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin === origin || ['fonts.googleapis.com','fonts.gstatic.com'].includes(url.hostname)) return route.continue();
      if (allowedBriefHosts.has(url.hostname)) return route.continue();
      return route.abort();
    });
    const page = await context.newPage();
    const errors = [], missing = [], actions = [], frames = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => {
      if (r.status() < 400 || !r.url().startsWith(origin)) return;
      const path = r.url().replace(origin,'');
      // The Riverine brief explicitly requests these absent font declarations
      // and their exact fallback stacks until the owner supplies the fonts.
      if (slug === 'riverine-ai' && /\/assets\/fonts\/rv-(display|brand|text)\.woff2$/.test(path)) return;
      missing.push(path);
    });
    await page.goto(`${origin}/demos/${slug}/index.html`, { waitUntil: 'load' });
    await page.waitForTimeout(1800);
    await page.evaluate(() => document.fonts.ready);
    if (slug === 'jack-3d') await page.waitForFunction(() => document.querySelector('.hero-portrait img')?.naturalWidth > 0, null, {timeout:30000});
    if (slug === 'toonhub') await page.waitForFunction(() => { const imgs = Array.from(document.querySelectorAll('[data-carousel-item] img')); return imgs.length === 4 && imgs.every(i => i.complete && i.naturalWidth > 0); }, null, {timeout:45000});
    if (slug === 'halden') await page.waitForFunction(() => { const imgs = Array.from(document.querySelectorAll('#dd img')); return imgs.length === 6 && imgs.every(i => i.complete && i.naturalWidth > 0); }, null, {timeout:45000});
    if (slug === 'prmpt') await page.waitForFunction(() => { const lv = document.getElementById('left-video'); const rv = document.getElementById('right-video'); const imgs = Array.from(document.querySelectorAll('.bp-card img')); return lv && rv && lv.readyState >= 2 && rv.readyState >= 2 && imgs.length === 10 && imgs.every(i => i.complete && i.naturalWidth > 0); }, null, {timeout:60000});
    if (slug === 'viktor') await page.waitForFunction(() => { const videos = Array.from(document.querySelectorAll('video')); return videos.length === 3 && videos.every(v => v.readyState >= 2); }, null, {timeout:60000});
    if (slug === 'lumora') await page.waitForFunction(() => { const v0 = document.getElementById('lumora-video-0'); const v2 = document.getElementById('lumora-video-2'); const ov = document.getElementById('lumora-png-overlay'); return v0 && v2 && v0.readyState >= 2 && v2.readyState >= 2 && ov && ov.complete && ov.naturalWidth > 0; }, null, {timeout:60000});
    if (slug === 'cozypaws') await page.waitForFunction(() => { const imgs = Array.from(document.querySelectorAll('img')); return imgs.length >= 7 && imgs.every(i => i.complete && i.naturalWidth > 0); }, null, {timeout:60000});
    if (slug === 'fennec') await page.waitForFunction(() => document.querySelector('#fox')?.dataset.model === 'ready', null, {timeout:60000});
    if (slug === 'iris') {
      await page.waitForFunction(() => document.getElementById('stage')?.dataset.ready === 'true', null, {timeout:60000});
      await page.waitForTimeout(1600);
    }
    if (slug === 'melli') {
      await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; }));
      await page.waitForFunction(() => {
        const bee = document.getElementById('bee');
        const imgs = Array.from(document.querySelectorAll('.flower'));
        return bee?.classList.contains('ready') && document.body.classList.contains('loaded') && imgs.length === 4 && imgs.every(i => i.complete && i.naturalWidth > 0);
      }, null, {timeout:60000});
      await page.waitForTimeout(1500);
    }
    if (slug === 'cast-and-render') {
      await page.waitForFunction(() => document.getElementById('boot')?.classList.contains('done') && document.getElementById('clip')?.readyState >= 2, null, {timeout:60000});
      await page.waitForTimeout(1000);
    }
    if (['meridian','freight-axis','riverine-ai','monoframe','nexlayer','vectrus-energy','designpro','cinematic','camper','sellix','neuralkinetics','securify','synapsex','oceanpulse','meadowbell','eclipsio','murmur','wander-far','reelmark','vanguard','targo','gridwork-co','vaultra','lauberhorn-ridge'].includes(slug)) await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2, null, {timeout:30000});
    if (slug === 'monoframe' || slug === 'cinematic' || slug === 'camper' || slug === 'sellix' || slug === 'neuralkinetics' || slug === 'synapsex' || slug === 'oceanpulse' || slug === 'meadowbell' || slug === 'eclipsio' || slug === 'murmur' || slug === 'wander-far' || slug === 'reelmark' || slug === 'vanguard' || slug === 'gridwork-co' || slug === 'vaultra' || slug === 'lauberhorn-ridge') {
      await page.waitForTimeout(2000);
    }
    if (slug === 'solaris-gate') {
      await page.waitForFunction(() => document.body.classList.contains('intro-ready'), null, { timeout: 30000 });
      await page.waitForTimeout(2200);
    }
    const start = Date.now();
    const at = async seconds => { const remaining = seconds * 1000 - (Date.now() - start); if (remaining > 0) await page.waitForTimeout(remaining); };
    const shot = async name => {
      const file = resolve(evidence, `screenshots/${slug}-${name}.jpg`);
      await page.screenshot({ path: file, type:'jpeg', quality:82 }); frames.push(file);
    };
    const next = async () => {
      if (slug === 'atlas') {
        const step = actions.filter(a => a.action.startsWith('atlas-')).length;
        if (step === 0) {
          await page.locator('[data-depth-stop="1000"]').click();
          await page.waitForTimeout(350);
          await page.locator('[data-open-dialog="map-dialog"]').first().click();
          await page.locator('#map-dialog[open]').waitFor({ state: 'visible' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'atlas-depth-1000m-and-open-map' });
        } else if (step === 1) {
          await page.locator('[data-dialog-scene="1"]').click();
          await page.waitForTimeout(350);
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'atlas-switch-log-02-twilight' });
        } else {
          await page.locator('[data-morge-next]').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'atlas-morge-next-slide' });
        }
        return;
      }
      if (slug === 'lauberhorn-ridge') {
        const step = actions.filter(a => a.action.startsWith('lauberhorn-ridge-')).length;
        if (step === 0) {
          await page.locator('[data-tab="seasons"]').click();
          await page.waitForTimeout(300);
          await page.locator('#photoPlayBtn').click();
          await page.locator('#trailModalBackdrop.is-open').waitFor({ state: 'visible' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'lauberhorn-ridge-switch-seasons-and-open-reel' });
        } else if (step === 1) {
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
          await page.locator('[data-tab="slopes"]').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'lauberhorn-ridge-close-modal-and-switch-slopes' });
        } else {
          await page.locator('[data-tab="altitude"]').click();
          await page.locator('#photoPlayBtn').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'lauberhorn-ridge-restore-altitude-and-hover-play' });
        }
        return;
      }
      if (slug === 'vaultra') {
        const step = actions.filter(a => a.action.startsWith('vaultra-')).length;
        if (step === 0) {
          await page.locator('#langSelectorBtn').click();
          await page.waitForTimeout(280);
          await page.locator('[data-lang="EU"]').click();
          await page.waitForTimeout(250);
          await page.locator('[data-asset="ETH"]').click();
          await page.locator('#vaultraModal.is-open').waitFor({ state: 'visible' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'vaultra-switch-eur-and-inspect-eth' });
        } else if (step === 1) {
          await page.locator('[data-modal-tab="auth"]').click();
          await page.waitForTimeout(450);
          await page.keyboard.press('Escape');
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'vaultra-switch-auth-and-close' });
        } else {
          await page.locator('#getStartedBtn').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'vaultra-hover-get-started' });
        }
        return;
      }
      if (slug === 'gridwork-co') {
        const step = actions.filter(a => a.action.startsWith('gridwork-co-')).length;
        if (step === 0) {
          await page.locator('[data-tool="Framer"]').click();
          await page.waitForTimeout(300);
          await page.locator('#nextTestimonialBtn').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'gridwork-co-toggle-framer-and-next-testimonial' });
        } else if (step === 1) {
          await page.locator('#prevTestimonialBtn').click();
          await page.waitForTimeout(300);
          await page.locator('#createAccountBtn').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'gridwork-co-prev-testimonial-and-hover-create' });
        } else {
          await page.locator('[data-tool="Framer"]').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'gridwork-co-restore-selected-tools' });
        }
        return;
      }
      if (slug === 'targo') {
        const step = actions.filter(a => a.action.startsWith('targo-')).length;
        if (step === 0) {
          await page.locator('#heroGetStartedBtn').hover();
          await page.waitForTimeout(300);
          await page.locator('#desktopContactBtn').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'targo-hover-hero-cta-and-contact' });
        } else if (step === 1) {
          await page.locator('#about').scrollIntoViewIfNeeded();
          await page.waitForTimeout(350);
          await page.locator('#aboutLearnMoreBtn').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'targo-scroll-about-and-hover-learn-more' });
        } else {
          await page.locator('#heroGetStartedBtn').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'targo-return-hero-cta-hover' });
        }
        return;
      }
      if (slug === 'vanguard') {
        const step = actions.filter(a => a.action.startsWith('vanguard-')).length;
        if (step === 0) {
          await page.locator('#see-our-work-btn').click();
          await page.locator('#vanguard-dossier-modal').waitFor({ state: 'visible' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'vanguard-open-selected-works' });
        } else if (step === 1) {
          await page.locator('#switch-inquire-tab').click();
          await page.waitForTimeout(450);
          await page.keyboard.press('Escape');
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'vanguard-switch-inquire-and-close' });
        } else {
          await page.locator('#desktop-inquire-btn').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'vanguard-hover-get-in-touch' });
        }
        return;
      }
      if (slug === 'cast-and-render') {
        const step = actions.filter(a => a.action.startsWith('cast-and-render-')).length;
        if (step === 0) {
          await page.locator('.scrub-step[data-scrub-target="0.49"]').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'cast-and-render-jump-chapter-02-mesh' });
        } else if (step === 1) {
          await page.locator('header.chrome a[href="#board"]').click();
          await page.locator('#studioModal.is-open').waitFor({ state: 'visible' });
          await page.waitForTimeout(350);
          await page.locator('.studio-tab[data-sheet-tab="order"]').click();
          await page.waitForTimeout(450);
          await page.keyboard.press('Escape');
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'cast-and-render-open-studio-sheet-and-close' });
        } else {
          await page.locator('.scrub-step[data-scrub-target="0.92"]').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'cast-and-render-hover-chapter-03' });
        }
        return;
      }
      if (slug === 'reelmark') {
        const step = actions.filter(a => a.action.startsWith('reelmark-')).length;
        if (step === 0) {
          await page.mouse.move(920, 620);
          await page.mouse.down();
          await page.mouse.move(580, 620, { steps: 12 });
          await page.mouse.up();
          await page.waitForTimeout(250);
          await page.locator('[data-open-spotlight="0"]').click();
          await page.locator('#reelModal.is-open').waitFor({ state: 'visible' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'reelmark-drag-carousel-and-open-spotlight' });
        } else if (step === 1) {
          await page.locator('[data-select-clip="2"]').click();
          await page.waitForTimeout(400);
          await page.keyboard.press('Escape');
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'reelmark-switch-clip-and-close' });
        } else {
          await page.locator('#makeReelBtn').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'reelmark-hover-cta' });
        }
        return;
      }
      if (slug === 'melli') {
        const step = actions.filter(a => a.action.startsWith('melli-')).length;
        if (step === 0) {
          await page.mouse.move(1020, 360, { steps: 18 });
          await page.locator('.hero .join').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'melli-hover-hero-cta-and-tilt-bee' });
        } else if (step === 1) {
          await page.locator('#about').scrollIntoViewIfNeeded();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'melli-scroll-section-01' });
        } else {
          await page.locator('#contact .join').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'melli-hover-contact-cta' });
        }
        return;
      }
      if (slug === 'iris') {
        const step = actions.filter(a => a.action.startsWith('iris-')).length;
        if (step === 0) {
          await page.mouse.move(320, 260, { steps: 18 });
          await page.locator('#robotHud').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'iris-look-left-and-wave-emote' });
        } else if (step === 1) {
          await page.locator('.btn-try').click();
          await page.locator('#irisModalBackdrop.is-open').waitFor({ state: 'visible' });
          await page.locator('[data-iris-prompt="Optimize our Three.js WebGL shader pipeline"]').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'iris-open-modal-and-test-prompt' });
        } else {
          await page.keyboard.press('Escape');
          await page.mouse.move(1220, 320, { steps: 18 });
          await page.locator('.btn-open').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'iris-close-modal-and-track-right' });
        }
        return;
      }
      if (slug === 'wander-far') {
        const step = actions.filter(a => a.action.startsWith('wander-far-')).length;
        if (step === 0) {
          await page.locator('[data-tab="experiences"]').click();
          await page.waitForTimeout(250);
          await page.locator('[data-tab="stays"]').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'wander-far-switch-tabs' });
        } else if (step === 1) {
          await page.locator('#searchSubmitBtn').click();
          await page.locator('#searchModal.is-open').waitFor({ state: 'visible' });
          await page.locator('#selectWhere').selectOption('Geirangerfjord');
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'wander-far-open-modal-and-select-geiranger' });
        } else {
          await page.locator('#applySearchBtn').click();
          await page.locator('#locationChip').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'wander-far-apply-search-and-hover-chip' });
        }
        return;
      }
      if (slug === 'murmur') {
        const step = actions.filter(a => a.action.startsWith('murmur-')).length;
        if (step === 0) {
          await page.locator('#playBtn').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'murmur-toggle-play' });
        } else if (step === 1) {
          await page.locator('[data-platform="0"]').click();
          await page.locator('#platformModal.is-open').waitFor({ state: 'visible' });
          await page.locator('[data-episode="1"]').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'murmur-open-platform-and-switch-episode' });
        } else {
          await page.keyboard.press('Escape');
          await page.locator('[data-platform="2"]').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'murmur-close-modal-and-hover-icon' });
        }
        return;
      }
      if (slug === 'eclipsio') {
        const step = actions.filter(a => a.action.startsWith('eclipsio-')).length;
        if (step === 0) {
          await page.locator('#heroSamplesBtn').click();
          await page.locator('#samplesModal.is-open').waitFor({ state: 'visible' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'eclipsio-open-samples-modal' });
        } else if (step === 1) {
          await page.locator('[data-select-sample="1"]').click();
          await page.waitForTimeout(350);
          await page.keyboard.press('Escape');
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'eclipsio-switch-sample-and-close' });
        } else {
          await page.locator('#heroCreateBtn').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'eclipsio-hover-primary-cta' });
        }
        return;
      }
      if (slug === 'meadowbell') {
        const step = actions.filter(a => a.action.startsWith('meadowbell-')).length;
        if (step === 0) {
          await page.locator('#heroPreview').click();
          await page.locator('#chapterModal.is-open').waitFor({ state: 'visible' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'meadowbell-open-preview-modal' });
        } else if (step === 1) {
          await page.locator('[data-select-chapter="1"]').click();
          await page.waitForTimeout(350);
          await page.keyboard.press('Escape');
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'meadowbell-switch-chapter-and-close' });
        } else {
          await page.locator('.chapter-card--2').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'meadowbell-hover-chapter-card' });
        }
        return;
      }
      if (slug === 'oceanpulse') {
        const step = actions.filter(a => a.action.startsWith('oceanpulse-')).length;
        if (step === 0) {
          await page.locator('#navToggle').click();
          await page.waitForTimeout(450);
          await page.locator('.navsheet__link').first().hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'oceanpulse-open-navsheet-and-hover-mission' });
        } else if (step === 1) {
          await page.locator('.navsheet__link').nth(1).hover();
          await page.waitForTimeout(300);
          await page.locator('.navsheet__cta').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'oceanpulse-hover-programs-and-cta' });
        } else {
          await page.locator('#navToggle').click();
          await page.waitForTimeout(500);
          await page.locator('.cta').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'oceanpulse-close-navsheet-and-hover-hero-cta' });
        }
        return;
      }
      if (slug === 'synapsex') {
        const step = actions.filter(a => a.action.startsWith('synapsex-')).length;
        if (step === 0) {
          await page.mouse.move(120, 450);
          await page.mouse.move(1280, 450, { steps: 24 });
          await page.locator('#synapsex-desktop-menu-btn').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'synapsex-scrub-hero-and-open-menu' });
        } else if (step === 1) {
          await page.locator('#synapsex-nav-about').hover();
          await page.waitForTimeout(300);
          await page.locator('#synapsex-desktop-menu-btn').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'synapsex-scramble-hover-and-close-menu' });
        } else {
          await page.mouse.move(1100, 450);
          await page.mouse.move(240, 450, { steps: 18 });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'synapsex-scrub-return' });
        }
        return;
      }
      if (slug === 'cozypaws') {
        const step = actions.filter(a => a.action.startsWith('cozypaws-')).length;
        if (step === 0) {
          await page.locator('#cozypaws-cat-house-btn').click();
          await page.locator('#cozypaws-modal').waitFor({ state: 'visible' });
          await page.locator('#cozypaws-add-to-cart-btn').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'cozypaws-inspect-and-add-cat-house' });
        } else if (step === 1) {
          await page.keyboard.press('Escape');
          await page.locator('#cozypaws-modal').waitFor({ state: 'detached' });
          await page.locator('#cozypaws-video-play-btn').click();
          await page.locator('#cozypaws-modal').waitFor({ state: 'visible' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'cozypaws-open-video-reviews' });
        } else {
          await page.keyboard.press('Escape');
          await page.locator('#cozypaws-modal').waitFor({ state: 'detached' });
          await page.locator('#cozypaws-favorites-btn').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'cozypaws-return-hero' });
        }
        return;
      }
      if (slug === 'securify') {
        const step = actions.filter(a => a.action.startsWith('securify-')).length;
        if (step === 0) {
          await page.locator('#securify-nav-platform').click();
          await page.locator('#securify-modal').waitFor({ state: 'visible' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'securify-open-platform' });
        } else if (step === 1) {
          await page.keyboard.press('Escape');
          await page.locator('#securify-modal').waitFor({ state: 'detached' });
          await page.locator('#securify-get-started-btn').click();
          await page.locator('#securify-modal').waitFor({ state: 'visible' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'securify-open-get-started' });
        } else {
          await page.keyboard.press('Escape');
          await page.locator('#securify-modal').waitFor({ state: 'detached' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'securify-return-hero' });
        }
        return;
      }
      if (slug === 'lumora') {
        const step = actions.filter(a => a.action.startsWith('lumora-')).length;
        if (step === 0) {
          await page.locator('#lumora-scene-btn-2').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'lumora-switch-deep-woods' });
        } else if (step === 1) {
          await page.locator('#lumora-scene-btn-1').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'lumora-switch-still-water' });
        } else {
          await page.locator('#lumora-scene-btn-0').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'lumora-switch-golden-hour' });
        }
        return;
      }
      if (slug === 'neuralkinetics') {
        const step = actions.filter(a => a.action.startsWith('neuralkinetics-')).length;
        if (step === 0) {
          await page.locator('#nk-tag-agi').click();
          await page.locator('#nk-see-features-btn').click();
          await page.locator('#nk-features-modal').waitFor({ state: 'visible' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'neuralkinetics-open-features-modal' });
        } else if (step === 1) {
          await page.locator('.nk-fx-chip', { hasText: 'JPY' }).click();
          await page.waitForTimeout(450);
          await page.keyboard.press('Escape');
          await page.locator('#nk-features-modal').waitFor({ state: 'detached' });
          await page.locator('#nk-menu-btn').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'neuralkinetics-switch-jpy-and-open-menu' });
        } else {
          await page.keyboard.press('Escape');
          await page.locator('#nk-tag-cybernetics').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'neuralkinetics-select-cybernetics' });
        }
        return;
      }
      if (slug === 'sellix') {
        const step = actions.filter(a => a.action.startsWith('sellix-')).length;
        if (step === 0) {
          await page.locator('.ctas .btn-primary').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'sellix-hover-primary-cta' });
        } else if (step === 1) {
          await page.locator('.ctas .btn-ghost').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'sellix-hover-ghost-cta' });
        } else {
          await page.locator('.btn-nav-start').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'sellix-hover-nav-start' });
        }
        return;
      }
      if (slug === 'camper') {
        const step = actions.filter(a => a.action.startsWith('camper-')).length;
        if (step === 0) {
          await page.locator('#links a', { hasText: 'Travel' }).click();
          await page.locator('a.explore').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'camper-select-travel-and-hover-explore' });
        } else if (step === 1) {
          await page.locator('#links a', { hasText: 'Location' }).click();
          await page.locator('a.signup').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'camper-select-location-and-hover-signup' });
        } else {
          await page.locator('#links a', { hasText: 'Home' }).click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'camper-return-home' });
        }
        return;
      }
      if (slug === 'viktor') {
        const step = actions.filter(a => a.action.startsWith('viktor-')).length;
        if (step === 0) {
          await page.locator('#switcher-btn-1').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'viktor-switch-gridwave' });
        } else if (step === 1) {
          await page.locator('#switcher-btn-2').click();
          await page.locator('#start-project-btn').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'viktor-switch-light-tunnel-and-hover-cta' });
        } else {
          await page.locator('#switcher-btn-0').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'viktor-switch-water-wave' });
        }
        return;
      }
      if (slug === 'cinematic') {
        const step = actions.filter(a => a.action.startsWith('cinematic-')).length;
        if (step === 0) {
          await page.locator('#next-btn').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'cinematic-next-slide' });
        } else {
          await page.locator('#prev-btn').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'cinematic-prev-slide' });
        }
        return;
      }
      if (slug === 'designpro') {
        if (!actions.some(a => a.action === 'designpro-open-enroll')) {
          await page.locator('#hero-cta').hover();
          await page.waitForTimeout(250);
          await page.locator('#hero-cta').click();
          await page.locator('#enrollment-modal').waitFor({ state: 'visible' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'designpro-open-enroll' });
        } else if (await page.locator('#enrollment-modal').count()) {
          await page.fill('#applicant-name', 'Alex Rivera');
          await page.fill('#applicant-email', 'alex@designpro.studio');
          await page.locator('#enrollment-modal button[type="submit"]').click();
          await page.waitForTimeout(700);
          await page.keyboard.press('Escape');
          await page.locator('#enrollment-modal').waitFor({ state: 'detached' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'designpro-submit-and-close' });
        } else {
          await page.locator('#hero-cta').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'designpro-hover-cta' });
        }
        return;
      }
      if (slug === 'prmpt') {
        const step = actions.filter(a => a.action.startsWith('prmpt-')).length;
        if (step === 0) {
          await page.mouse.move(220, 450, { steps: 18 });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'prmpt-scrub-left' });
        } else {
          await page.mouse.move(1220, 450, { steps: 24 });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'prmpt-scrub-right' });
        }
        return;
      }
      if (slug === 'halden') {
        const step = actions.filter(a => a.action.startsWith('halden-')).length;
        if (step === 0) {
          await page.locator('.trigger[data-menu="discover"]').hover();
          await page.waitForTimeout(500);
          await page.locator('.d-item[data-img="1"]').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'halden-open-discover-volcanoes' });
        } else if (step === 1) {
          await page.locator('.trigger[data-menu="journeys"]').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'halden-morph-journeys' });
        } else {
          await page.locator('.trigger[data-menu="regions"]').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'halden-morph-regions' });
        }
        return;
      }
      if (slug === 'cyber-ronin') {
        const back = actions.some(a => a.action === 'spotlight-right');
        await page.mouse.move(back ? 1100 : 220, 340);
        await page.mouse.move(back ? 400 : 1100, 460, { steps: 40 });
        actions.push({seconds:(Date.now()-start)/1000,action:back ? 'spotlight-left' : 'spotlight-right'});
        return;
      }
      if (slug === 'nexlayer') {
        const step = actions.filter(a => a.action.startsWith('nexlayer-')).length;
        if (step === 0) {
          await page.locator('.pill-cta').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'nexlayer-hover-hero-cta' });
        } else if (step === 1) {
          await page.locator('.links a').nth(1).hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'nexlayer-hover-nav-features' });
        } else {
          await page.locator('.pill-nav').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'nexlayer-hover-header-cta' });
        }
        return;
      }
      if (slug === 'vectrus-energy') {
        const step = actions.filter(a => a.action.startsWith('vectrus-')).length;
        if (step === 0) {
          await page.locator('#hero-next').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'vectrus-scroll-section-2' });
        } else if (step === 1) {
          await page.locator('button[aria-label="Scroll to next section"]').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'vectrus-scroll-section-3' });
        } else {
          await page.locator('button[aria-label="Contact Nordvik"]').click();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'vectrus-scroll-top' });
        }
        return;
      }
      if (slug === 'aethera') {
        if (!actions.some(a => a.action === 'open-journey')) {
          await page.locator('main button').click();
          await page.locator('[role="dialog"]').waitFor({ state: 'visible' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'open-journey', selector: 'main button' });
        } else if (await page.locator('[role="dialog"]').count()) {
          await page.fill('#journey-name', 'Clara Vance');
          await page.fill('#journey-email', 'clara@aethera.studio');
          await page.locator('[role="dialog"] button[type="submit"]').click();
          await page.waitForTimeout(600);
          await page.keyboard.press('Escape');
          await page.locator('[role="dialog"]').waitFor({ state: 'detached' });
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'submit-and-close-journey' });
        } else {
          await page.locator('main button').hover();
          actions.push({ seconds: (Date.now() - start) / 1000, action: 'hover-cta' });
        }
        return;
      }
      if (slug === 'vertex-shops') {
        await page.locator('.cta2').hover();
        actions.push({seconds:(Date.now()-start)/1000,action:'hover CTA; 37-card ring rotates'});
        return;
      }
      if (slug === 'veyra') {
        if (!actions.some(a => a.action === 'select-paint')) {
          await page.getByRole('button',{name:'Body colour',exact:true}).click();
          await page.getByRole('button',{name:'Electric Green',exact:true}).click();
          actions.push({seconds:(Date.now()-start)/1000,action:'select-paint',value:'Electric Green'});
        } else if (await page.locator('#appearance-paint').count()) {
          await page.keyboard.press('Escape');
          await page.locator('#appearance-paint').waitFor({state:'detached'});
          await page.waitForTimeout(300);
          await page.getByRole('button',{name:'Explore the drive unit',exact:true}).click();
          await page.waitForFunction(()=>document.querySelector('.phase-detail'));
          actions.push({seconds:(Date.now()-start)/1000,action:'click',selector:'Explore the drive unit'});
        } else if (await page.locator('.phase-detail').count()) {
          await page.getByRole('button',{name:'Back to vehicle',exact:true}).click();
          await page.waitForFunction(()=>document.querySelector('.phase-overview'));
          actions.push({seconds:(Date.now()-start)/1000,action:'click',selector:'Back to vehicle'});
        }
        return;
      }

      if (slug === 'jack-3d') {
        const selector = actions.some(a=>a.action==='chapter') ? '#about' : '.marquee';
        await page.locator(selector).scrollIntoViewIfNeeded();
        actions.push({seconds:(Date.now()-start)/1000,action:'chapter',selector}); return;
      }
      if (slug === 'mostar-city') {
        const y = actions.some(a=>a.action==='chapter') ? 2320 : 1060;
        await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);
        actions.push({seconds:(Date.now()-start)/1000,action:'chapter',y}); return;
      }
      if (slug === 'spaceedu' || slug === 'fennec') {
        const selector = slug === 'spaceedu' ? '.planet-r' : '.brand__menu';
        await page.locator(selector).click();
        actions.push({seconds:(Date.now()-start)/1000,action:'click',selector}); return;
      }
      if (slug === 'monoframe') {
        if (!actions.some(a => a.action === 'scrub-right')) {
          await page.mouse.move(140, 450);
          await page.mouse.move(1320, 450, { steps: 24 });
          actions.push({seconds:(Date.now()-start)/1000,action:'scrub-right'});
        } else if (!actions.some(a => a.action === 'click')) {
          await page.locator('main button').nth(4).click();
          actions.push({seconds:(Date.now()-start)/1000,action:'click',selector:'main button:nth-of-type(5)'});
        } else {
          await page.mouse.move(320, 450);
          await page.mouse.move(1180, 450, { steps: 20 });
          actions.push({seconds:(Date.now()-start)/1000,action:'scrub-return'});
        }
        return;
      }
      if (slug === 'solaris-gate') {
        if (!actions.some(a => a.action === 'click')) {
          await page.mouse.move(720, 450, { steps: 10 });
          await page.locator('#portal').click();
          actions.push({seconds:(Date.now()-start)/1000,action:'click',selector:'#portal'});
        } else {
          await page.mouse.move(880, 360, { steps: 12 });
          await page.mouse.move(560, 520, { steps: 12 });
          await page.mouse.move(720, 450, { steps: 10 });
          actions.push({seconds:(Date.now()-start)/1000,action:'tilt portal'});
        }
        return;
      }
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
    const target = slug === 'jack-3d'
      ? await page.locator('#projects').evaluate(e=>Math.max(0,e.getBoundingClientRect().top+220))
      : Math.min(scrollHeight-900, slug === 'prmpt' || slug === 'melli' || slug === 'cast-and-render' ? scrollHeight - 900 : slug === 'mostar-city' ? 3700 : slug === 'apartment-flow' ? 2400 : 1650);
    for (let step=1; step<=5; step++) {
      await page.mouse.wheel(0, Math.max(0,target)/5); await page.waitForTimeout(450);
    }
    actions.push({ seconds:6.7, action:'scroll', target });
    await at(10); await shot('scroll');
    if (['solaris-gate', 'monoframe', 'cyber-ronin', 'veyra', 'lumora', 'securify', 'cozypaws', 'oceanpulse', 'meadowbell', 'wander-far', 'iris', 'melli', 'cast-and-render', 'vaultra', 'lauberhorn-ridge'].includes(slug)) {
      await next();
    }
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
