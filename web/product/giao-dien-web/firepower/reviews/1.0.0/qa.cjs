const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve('_design/.browsers');
const { chromium, firefox } = require('../../../../../../_design/.tooling/node_modules/playwright');
const { default: AxeBuilder } = require('../../../../../../_design/.tooling/node_modules/@axe-core/playwright');
const out = path.join(__dirname, 'evidence');
fs.mkdirSync(out, { recursive: true });
const url = process.env.FIREPOWER_URL || 'http://127.0.0.1:4409';
const report = { date: new Date().toISOString(), url, browsers: {}, failures: [] };
const check = (ok, name, data) => { if (!ok) report.failures.push({ name, data }); };
const sleep = ms => new Promise(r => setTimeout(r,ms));
(async () => {
  for (const [name, engine, options] of [
    ['chromium', chromium, {}], ['firefox', firefox, {}],
    ['edge', chromium, { channel: 'msedge' }],
    ['coccoc', chromium, { executablePath: 'C:/Program Files/CocCoc/Browser/Application/browser.exe' }]
  ]) {
    const browser = await engine.launch({ headless: true, ...options });
    const row = report.browsers[name] = { version: browser.version(), sizes: [], motion: {} };
    try {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
      await context.addInitScript(() => {
        try { localStorage.setItem('motion', 'off'); localStorage.setItem('firepower-motion', 'off'); } catch {}
        window.__frameCount = 0;
        const raf = window.requestAnimationFrame;
        window.requestAnimationFrame = callback => raf.call(window, now => { window.__frameCount++; callback(now); });
      });
      const page = await context.newPage();
      const errors = [], missing = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('favicon.ico')) missing.push(r.url()); });
      await page.goto(url);
      await page.waitForTimeout(1100);
      await page.keyboard.press('Tab');
      row.skip = await page.locator('.skip-link').evaluate(e => document.activeElement === e && e.getBoundingClientRect().top >= 0);
      check(row.skip, `${name} skip link`);
      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      check(await page.evaluate(() => !!document.activeElement.closest('main')), `${name} skip main`);
      for (const [width, height] of [[1440,900],[820,1180],[375,812],[320,740],[950,900],[951,900]]) {
        await page.setViewportSize({ width, height });
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        const dims = await page.evaluate(() => ({
          sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
          small: [...document.querySelectorAll('button,a,summary')].filter(e => {
            const b = e.getBoundingClientRect();
            return b.width && b.height && getComputedStyle(e).visibility !== 'hidden' && !e.classList.contains('skip-link');
          }).filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.getAttribute('aria-label') || e.textContent.trim())
        }));
        check(dims.sw <= dims.cw, `${name} overflow ${width}`, dims);
        check(!dims.small.length, `${name} touch targets ${width}`, dims.small);
        if (width <= 950) {
          await page.locator('.nav-toggle').click();
          check(await page.locator('#navigation').isVisible(), `${name} menu open ${width}`);
          if (width === 375) await page.screenshot({ path: path.join(out, `${name}-375-menu.png`) });
          await page.keyboard.press('Escape');
          check(await page.locator('.nav-toggle').evaluate(e => document.activeElement === e && e.getAttribute('aria-expanded') === 'false'), `${name} menu Escape ${width}`);
          await page.keyboard.press('Tab');
          check(await page.evaluate(() => !document.activeElement.closest('#navigation')), `${name} hidden nav skipped ${width}`);
          await page.locator('.nav-toggle').click();
          await page.locator('#navigation a').first().click();
          check(await page.locator('.nav-toggle').getAttribute('aria-expanded') === 'false', `${name} menu link closes`);
        }
        for (let top = 0; top < 5000; top += 600) { await page.evaluate(top => scrollTo({ top, behavior:'instant' }), top); await sleep(30); }
        await page.waitForTimeout(750);
        await page.evaluate(() => { document.activeElement.blur(); scrollTo({ top: 0, behavior: 'instant' }); });
        if ([1440,820,375,320].includes(width)) await page.screenshot({ path: path.join(out, `${name}-${width}.png`), fullPage: true });
        row.sizes.push({ width, height, ...dims });
      }
      await page.setViewportSize({ width:1440, height:900 });
      await page.evaluate(() => scrollTo({ top:0, behavior:'instant' }));
      await page.locator('[data-hero-step="1"]').click();
      await page.waitForTimeout(100);
      row.motion.middle = await page.locator('[data-hero-main]').evaluate(e => ({ transform: getComputedStyle(e).transform, opacity: +getComputedStyle(e).opacity }));
      check(row.motion.middle.transform !== 'none' && row.motion.middle.opacity < 1, `${name} actual middle frame OS reduce/saved off`, row.motion.middle);
      await page.screenshot({ path: path.join(out, `${name}-motion-mid.png`) });
      await page.waitForTimeout(650);
      check(await page.locator('[data-view-count]').innerText() === '02', `${name} hero next`);
      await page.locator('[data-hero-step="-1"]').click();
      await page.locator('[data-hero-step="-1"]').click();
      check(await page.locator('[data-view-count]').innerText() === '05', `${name} backward wrap`);
      await page.locator('[data-hero-step="1"]').click();
      check(await page.locator('[data-view-count]').innerText() === '01', `${name} forward wrap`);
      await page.evaluate(() => { for (let i=0;i<12;i++) document.querySelector('[data-hero-step="1"]').click(); });
      await page.waitForTimeout(750);
      check(await page.locator('[data-view-count]').innerText() === '03', `${name} rapid clicks final state`);
      await page.locator('[data-carousel="hero"]').focus();
      await page.keyboard.press('ArrowLeft');
      check(await page.locator('[data-view-count]').innerText() === '02', `${name} hero keyboard`);
      await page.locator('[data-gallery-step="-1"]').click();
      check(await page.locator('[data-view="4"]').getAttribute('aria-pressed') === 'true', `${name} gallery backward wrap`);
      await page.locator('[data-gallery-step="1"]').click();
      check(await page.locator('[data-view="0"]').getAttribute('aria-pressed') === 'true', `${name} gallery forward wrap`);
      for(let i=0;i<5;i++) {
        await page.locator(`[data-view="${i}"]`).click();
        check(await page.locator('.gallery__item--center').getAttribute('data-current-view') === String(i), `${name} gallery selection ${i}`);
      }
      await page.locator('[data-carousel="gallery"]').focus();
      await page.keyboard.press('ArrowRight');
      check(await page.locator('[data-view="0"]').getAttribute('aria-pressed') === 'true', `${name} gallery keyboard`);
      const box = await page.locator('[data-carousel="gallery"]').boundingBox();
      await page.mouse.move(box.x + box.width*.6, box.y + 100);
      await page.mouse.down(); await page.mouse.move(box.x + box.width*.4, box.y + 102, { steps:5 }); await page.mouse.up();
      check(await page.locator('[data-view="1"]').getAttribute('aria-pressed') === 'true', `${name} swipe`);
      await page.locator('.motion-toggle').click();
      await page.locator('[data-hero-step="1"]').click();
      row.motion.paused = await page.locator('[data-hero-main]').evaluate(e => getComputedStyle(e).transform === 'none');
      check(row.motion.paused, `${name} motion pause`);
      await page.reload(); await page.waitForTimeout(1100);
      check(await page.locator('.motion-toggle').innerText() === 'Pause motion', `${name} motion resets`);
      // Reveal is triggered by a real scroll; it stays visible on return.
      await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
      await page.reload(); await page.waitForTimeout(1100);
      await page.evaluate(() => scrollTo({top:760,behavior:'instant'}));
      await page.waitForTimeout(100);
      row.scroll = await page.locator('.play__image').evaluate(e => ({ revealed:e.dataset.revealed, opacity:+getComputedStyle(e).opacity, transform:getComputedStyle(e).transform }));
      check(row.scroll.revealed === 'true' && row.scroll.opacity < 1, `${name} scroll middle frame`, row.scroll);
      await page.waitForTimeout(800);
      await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
      check(await page.locator('.play__image').evaluate(e=>getComputedStyle(e).opacity==='1'), `${name} scroll return visible`);
      await page.waitForTimeout(800);
      const before = await page.evaluate(()=>window.__frameCount);
      await page.waitForTimeout(300);
      row.idleFrames = (await page.evaluate(()=>window.__frameCount))-before;
      check(row.idleFrames === 0, `${name} no idle RAF`, row.idleFrames);
      await page.addStyleTag({ content:'*{animation:none!important;transition:none!important}' });
      await page.locator('[data-hero-step="1"]').click(); await page.waitForTimeout(90);
      row.motion.cssDisabled = await page.locator('[data-hero-main]').evaluate(e => getComputedStyle(e).transform !== 'none');
      check(row.motion.cssDisabled, `${name} RAF fallback`);
      await page.waitForTimeout(1000);
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
      row.axe = axe.violations.map(v => ({id:v.id,nodes:v.nodes.map(n=>n.target)}));
      check(!row.axe.length, `${name} axe`,row.axe);
      row.errors = errors; row.missing = missing;
      check(!errors.length && !missing.length, `${name} console/network`, {errors,missing});
      const fallback = await browser.newContext({ javaScriptEnabled:false, viewport:{width:320,height:740} });
      const nojs = await fallback.newPage(); await nojs.goto(url);
      row.nojs = await nojs.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:innerWidth,nav:getComputedStyle(document.querySelector('#navigation')).display,h1:document.querySelectorAll('h1').length,href:document.querySelector('.enquire a').getAttribute('href')}));
      check(row.nojs.sw <= 320 && row.nojs.nav !== 'none' && row.nojs.h1===1 && row.nojs.href.startsWith('mailto:'),`${name} no JS fallback`,row.nojs);
      await nojs.locator('#specifications summary').click();
      check(await nojs.locator('#specifications').getAttribute('open') !== null,`${name} native details`);
      await nojs.screenshot({path:path.join(out,`${name}-nojs.png`),fullPage:true});
      const offline = await browser.newContext({ offline:true });
      const filePage = await offline.newPage();
      await filePage.goto(pathToFileURL(path.resolve(__dirname,'../../source/index.html')).href);
      check(await filePage.locator('h1').innerText() === 'Forge your\nfirepower', `${name} offline file`);
      const blocked = await browser.newContext({ viewport:{width:320,height:740} });
      await blocked.route('**/*.webp',r=>r.abort());
      const broken = await blocked.newPage(); await broken.goto(url);
      check(await broken.locator('h1').isVisible() && await broken.locator('.button').first().isVisible(),`${name} missing image content`);
      await context.close(); await fallback.close(); await offline.close(); await blocked.close();
    } catch(e) { report.failures.push({name,error:e.stack}); }
    finally { await browser.close(); }
    console.log(name, browser.version(), 'checked');
  }
  fs.writeFileSync(path.join(__dirname, process.env.FIREPOWER_URL?'online-source-checks.json':'source-checks.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({failures:report.failures},null,2));
  process.exitCode = report.failures.length ? 1 : 0;
})().catch(e=>{ console.error(e); process.exitCode=1; });
