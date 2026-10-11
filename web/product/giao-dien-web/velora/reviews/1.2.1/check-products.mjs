import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const { default: AxeBuilder } = await import('../../../../../../_design/.tooling/node_modules/@axe-core/playwright/dist/index.mjs');
const output = resolve('web/product/giao-dien-web/velora/reviews/1.2.1/' + (process.env.VELORA_BASE ? 'online-products' : 'products'));
mkdirSync(output, { recursive: true });
const file = process.env.VELORA_BASE ? process.env.VELORA_BASE + '/demos/velora/index.html?v=1.2.1' : pathToFileURL(resolve('_design/.qa-extracted/velora/index.html')).href;
const report = { date: new Date().toISOString(), browsers: {}, failures: [] };
const specs = ['26 inches', '24 inches', '20 inches'];
const names = ['Metro', 'Onyx', 'Loop'];
const prices = ['$2,850', '$2,450', '$2,650'];
function assert(ok, message) { if (!ok) report.failures.push(message); }
async function sample(page) {
  return page.evaluate(() => {
    const root = document.querySelector('.showroom');
    const nodes = [...root.querySelectorAll('[data-product]')];
    return {
      selected: +root.dataset.selected, model: root.dataset.model, view: root.dataset.view,
      scene: +root.dataset.sceneProgress, price: root.querySelector('[data-price]').textContent,
      summary: root.querySelector('[data-summary]').textContent,
      spec: root.querySelector('[data-spec-wheel]').textContent,
      enquiry: root.querySelector('[data-enquiry]').getAttribute('href'),
      activeFrames: window.__pendingFrames?.size,
      width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth,
      slides: nodes.map(node => {
        const cs = getComputedStyle(node), matrix = new DOMMatrix(cs.transform);
        return { index: +node.dataset.product, x: matrix.m41, scale: matrix.a, opacity: +cs.opacity, wheels: node.dataset.wheels, saddle: node.dataset.saddle, handle: node.dataset.handle, paint: node.querySelector('linearGradient[id$="-paint"] stop').getAttribute('stop-color') };
      })
    };
  });
}
async function record(page, action, duration = 1000) {
  await page.evaluate(duration => {
    window.__samples = [];
    const started = performance.now();
    const loop = now => {
      const root = document.querySelector('.showroom');
      window.__samples.push({ t: now - started, selected: +root.dataset.selected, scene: +root.dataset.sceneProgress, nodes: [...root.querySelectorAll('[data-product]')].map(el => {
        const cs = getComputedStyle(el), m = new DOMMatrix(cs.transform);
        return { x: m.m41, scale: m.a, opacity: +cs.opacity };
      }) });
      if (now - started < duration) requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }, duration);
  await action();
  await page.waitForTimeout(duration + 120);
  return page.evaluate(() => window.__samples);
}
const engines = [
  ['chromium', chromium, {}], ['firefox', firefox, {}],
  ['edge', chromium, { channel: 'msedge' }],
  ['coccoc', chromium, { executablePath: 'C:/Program Files/CocCoc/Browser/Application/browser.exe' }]
];
for (const [name, engine, launchOptions] of engines.filter(([name]) => !process.env.VELORA_BROWSERS || process.env.VELORA_BROWSERS.split(',').includes(name))) {
  let browser;
  try {
    browser = await engine.launch({ headless: true, ...launchOptions });
    const evidence = report.browsers[name] = { version: browser.version(), method: process.env.VELORA_BASE || 'file:// from packaged ZIP; isolated temporary browser context', cases: [] };
    for (const reducedMotion of ['no-preference', 'reduce']) {
      const context = await browser.newContext({ reducedMotion, viewport: { width: 1440, height: 900 } });
      await context.addInitScript(() => {
        try { localStorage.setItem('velora-motion', 'off'); localStorage.setItem('motion', 'off'); } catch { }
        const pending = window.__pendingFrames = new Set(), request = window.requestAnimationFrame.bind(window), cancel = window.cancelAnimationFrame.bind(window);
        window.requestAnimationFrame = callback => {
          let handle;
          handle = request(time => { pending.delete(handle); callback(time); }); pending.add(handle); return handle;
        };
        window.cancelAnimationFrame = handle => { pending.delete(handle); cancel(handle); };
      });
      const page = await context.newPage(), errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(file); await page.waitForTimeout(100);
      const c = { reducedMotion, oldOffStates: true, wraps: [], detail: {}, configuration: {}, viewports: [] };
      evidence.cases.push(c);
      const initial = await sample(page);
      assert(initial.selected === 0, `${name}/${reducedMotion}: initial model`);
      // Previous 0→2 and next 2→0 are both direct wraps.
      for (const [control, outgoing, incoming, direction] of [['prev', 0, 2, -1], ['next', 2, 0, 1]]) {
        const frames = await record(page, () => page.locator(`[data-${control}]`).click());
        const changing = frames.filter(frame => frame.selected === incoming && Math.abs(frame.nodes[incoming].x) > .1);
        const third = [0, 1, 2].find(index => index !== outgoing && index !== incoming);
        const result = {
          control, outgoing, incoming, direction, frames,
          intermediate: changing.length > 4,
          incomingSide: changing.every(frame => frame.nodes[incoming].x * direction > 0),
          outgoingDirection: changing.every(frame => frame.nodes[outgoing].x * direction <= 0),
          thirdNeverCentres: changing.every(frame => !(Math.abs(frame.nodes[third].x) < 50 && frame.nodes[third].opacity > .8))
        };
        c.wraps.push(result);
        assert(result.intermediate && result.incomingSide && result.outgoingDirection && result.thirdNeverCentres, `${name}/${reducedMotion}: ${control} wrap choreography`);
        const final = await sample(page);
        assert(final.selected === incoming && Math.abs(final.slides[incoming].x) < .1 && final.model === names[incoming], `${name}: wrap settled model`);
      }
      // Fast input must cancel old work and settle to the final requested model.
      for (const control of ['next', 'next', 'prev', 'next']) { await page.locator(`[data-${control}]`).click({ force: true }); await page.waitForTimeout(65); }
      await page.waitForTimeout(1000); c.rapid = await sample(page);
      assert(c.rapid.selected === 2 && c.rapid.model === 'Loop' && c.rapid.price === prices[2] && Math.abs(c.rapid.slides[2].x) < .1, `${name}: rapid input final state`);
      // Same DOM object must remain during the gallery/detail scene.
      await page.evaluate(() => { document.querySelector('[data-product="2"] .bike').dataset.identityProof = 'same-node'; });
      const sceneFrames = await record(page, () => page.locator('[data-open]').click(), 1150);
      c.detail.frames = sceneFrames;
      c.detail.intermediate = sceneFrames.filter(frame => frame.scene > .02 && frame.scene < .98).length;
      c.detail.sameNode = await page.locator('[data-product="2"] .bike').getAttribute('data-identity-proof') === 'same-node';
      c.detail.focus = await page.locator('[data-back]').evaluate(el => el === document.activeElement);
      assert(c.detail.intermediate > 4 && c.detail.sameNode && c.detail.focus, `${name}: gallery→detail continuity/focus`);
      await page.locator('[data-info="specs"]').click();
      c.detail.specifications = await sample(page);
      assert(c.detail.specifications.spec === specs[2] && c.detail.specifications.model === 'Loop', `${name}: selected specifications`);
      await page.locator('[data-category="frame"]').click();
      await page.locator('#frame-panel label').filter({ has: page.locator('input[value="graphite"]') }).click();
      await page.locator('[data-category="wheels"]').click();
      await page.locator('#wheels-panel label').filter({ has: page.locator('input[value="disc"]') }).click();
      await page.locator('[data-category="saddle"]').click();
      await page.locator('#saddle-panel label').filter({ has: page.locator('input[value="city"]') }).click();
      await page.locator('[data-category="handle"]').click();
      await page.locator('#handle-panel label').filter({ has: page.locator('input[value="rise"]') }).click();
      await page.waitForTimeout(550); c.configuration.custom = await sample(page);
      const custom = c.configuration.custom;
      assert(custom.summary === 'Loop / Graphite / Disc / City / Rise' && custom.slides[2].wheels === 'disc' && custom.slides[2].paint === '#42454c' && custom.slides[2].saddle === 'city' && custom.slides[2].handle === 'rise' && decodeURIComponent(custom.enquiry).includes(custom.summary), `${name}: configured art/summary/enquiry agreement`);
      const disc = await page.locator('[data-product="2"] .bike__disc').first().evaluate(el => getComputedStyle(el).display);
      assert(disc !== 'none', `${name}: visual disc wheels`);
      await page.locator('[data-next]').click(); await page.waitForTimeout(900);
      c.configuration.otherModel = await sample(page);
      assert(c.configuration.otherModel.model === 'Metro' && c.configuration.otherModel.summary === 'Metro / Chalk / Three-spoke / Slim / Flat', `${name}: per-model defaults`);
      await page.locator('[data-prev]').click(); await page.waitForTimeout(900);
      c.configuration.restored = await sample(page);
      assert(c.configuration.restored.summary === custom.summary && c.configuration.restored.spec === specs[2], `${name}: per-model configuration persistence`);
      // Tabs implement roving focus and arrow keys.
      await page.locator('[data-category="handle"]').focus(); await page.keyboard.press('ArrowRight');
      c.tabKeyboard = await page.locator('[data-category="wheels"]').evaluate(el => el === document.activeElement && el.getAttribute('aria-selected') === 'true');
      assert(c.tabKeyboard, `${name}: tab arrow keyboard`);
      c.detail.axe = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }));
      assert(!c.detail.axe.length, `${name}: detail axe ${JSON.stringify(c.detail.axe)}`);
      for (const [width, height] of [[1440, 900], [820, 1180], [375, 812], [320, 740], [414, 582], [1180, 820]]) {
        await page.setViewportSize({ width, height }); await page.waitForTimeout(80);
        const dimensions = await sample(page);
        const geometry = await page.locator('.product-info').evaluate(el => {
          const button = el.querySelector('[data-enquiry]').getBoundingClientRect();
          const controls = document.querySelector('.carousel-controls').getBoundingClientRect();
          return { infoBottom: button.bottom, controlsTop: controls.top, overlaps: button.right > controls.left && button.left < controls.right && button.bottom > controls.top && button.top < controls.bottom };
        });
        c.viewports.push({ width, height, scrollWidth: dimensions.scrollWidth, geometry });
        assert(dimensions.scrollWidth <= width && !geometry.overlaps, `${name}/${width}: detail layout/controls`);
        if (reducedMotion === 'no-preference') await page.screenshot({ path: resolve(output, `${name}-detail-${width}.png`), fullPage: true });
      }
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.keyboard.press('Escape'); await page.waitForTimeout(1000);
      c.detail.back = await sample(page);
      assert(c.detail.back.view === 'gallery' && c.detail.back.model === 'Loop' && c.detail.back.scene === 0, `${name}: Escape same-bike return`);
      await page.locator('[data-prev]').click(); await page.waitForTimeout(100);
      await page.locator('[data-motion]').click(); await page.waitForTimeout(100);
      c.pause = await sample(page);
      assert(c.pause.activeFrames === 0 && Math.abs(c.pause.slides[c.pause.selected].x) < .1, `${name}: pause cancels immediately`);
      await page.reload();
      const enabled = await page.locator('[data-motion]').getAttribute('aria-pressed');
      assert(enabled === 'true', `${name}: reload defaults motion on`);
      await page.locator('[data-select="1"]').click(); await page.waitForTimeout(900);
      c.previewSelect = (await sample(page)).model === 'Onyx';
      await page.locator('[data-select="1"]').click(); await page.waitForTimeout(1000);
      c.previewOpen = (await sample(page)).view === 'detail';
      assert(c.previewSelect && c.previewOpen, `${name}: preview selection and selected bike opens details`);
      // Each collection link must open its own model, including direct selection.
      c.explore = [];
      for (const index of [0, 1, 2]) {
        await page.locator(`[data-explore="${index}"]`).click(); await page.waitForTimeout(1200);
        const state = await sample(page); c.explore.push(state);
        assert(state.selected === index && state.model === names[index] && state.price === prices[index] && state.spec === specs[index] && state.view === 'detail', `${name}: Explore ${names[index]}`);
      }
      await page.waitForTimeout(150); c.idle = await sample(page);
      assert(c.idle.activeFrames === 0, `${name}: no idle rAF loop`);
      await page.locator('[data-back]').click(); await page.waitForTimeout(1000);
      // Synthetic touch sequence tests handler direction, not a physical phone.
      const swipe = async (dx, dy) => page.evaluate(({ dx, dy }) => {
        const visual = document.querySelector('.product-visual');
        const start = new Event('touchstart', { bubbles: true });
        Object.defineProperty(start, 'touches', { value: [{ clientX: 250, clientY: 200 }] });
        visual.dispatchEvent(start);
        const end = new Event('touchend', { bubbles: true, cancelable: true });
        Object.defineProperty(end, 'changedTouches', { value: [{ clientX: 250 + dx, clientY: 200 + dy }] });
        return visual.dispatchEvent(end);
      }, { dx, dy });
      await swipe(-130, 5); await page.waitForTimeout(900);
      c.swipeHorizontal = (await sample(page)).selected === 0;
      const notPrevented = await swipe(-5, 150); await page.waitForTimeout(900);
      c.swipeVertical = (await sample(page)).selected === 0 && notPrevented;
      assert(c.swipeHorizontal && c.swipeVertical, `${name}: simulated swipe direction and vertical passthrough`);
      await page.setViewportSize({ width: 720, height: 450 });
      await page.locator('[data-open]').click(); await page.waitForTimeout(1000);
      c.zoomLayout = await sample(page);
      assert(c.zoomLayout.scrollWidth <= 720, `${name}: 200-percent equivalent detail layout`);
      c.errors = errors; assert(!errors.length, `${name}: JavaScript errors ${errors}`);
      await context.close();
    }
    // No CSS/WAAPI + blocked localStorage must still animate using finite rAF.
    const fallbackContext = await browser.newContext();
    await fallbackContext.addInitScript(() => { Element.prototype.animate = undefined; Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } }); });
    const fp = await fallbackContext.newPage(); await fp.goto(file);
    await fp.addStyleTag({ content: '*,*::before,*::after { transition: none !important; animation: none !important; }' });
    const fallbackFrames = await record(fp, () => fp.locator('[data-next]').click());
    evidence.noCssNoWaapi = { intermediate: fallbackFrames.filter(frame => frame.selected === 1 && frame.nodes[1].x > 1 && frame.nodes[1].x < 400).length, final: await sample(fp) };
    assert(evidence.noCssNoWaapi.intermediate > 4 && evidence.noCssNoWaapi.final.selected === 1, `${name}: fallback animation`);
    await fallbackContext.close();
    console.log(`${name} ${browser.version()}: product flows finished`);
  } catch (error) {
    report.failures.push(`${name}: ${error.stack}`);
  } finally { if (browser) await browser.close(); }
}
writeFileSync(resolve(output, 'checks.json'), JSON.stringify(report, null, 2));
console.log('Failures:', JSON.stringify(report.failures));
process.exitCode = report.failures.length ? 1 : 0;
