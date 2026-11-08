const { chromium, firefox } = require('C:/Users/htmts/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const evidence = __dirname;
const source = path.resolve(__dirname, '../../source');
const sizes = [[1440,900],[820,1180],[375,812],[320,740]];
(async () => {
  fs.mkdirSync(path.join(evidence, 'screenshots'), { recursive: true });
  const results = {};
  const engines = {
    chromium: { engine: chromium, options: { executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true } },
    edge: { engine: chromium, options: { executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', headless: true } },
    coccoc: { engine: chromium, options: { executablePath: 'C:\\Program Files\\CocCoc\\Browser\\Application\\browser.exe', headless: true } }
  };
  for (const [name, cfg] of Object.entries(engines)) {
    let browser;
    try { browser = await cfg.engine.launch(cfg.options); }
    catch (error) { results[name] = { unavailable: error.message }; continue; }
    results[name] = { version: browser.version(), sizes: [], errors: [] };
    for (const [width, height] of sizes) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
      page.on('pageerror', error => results[name].errors.push(error.message));
      await page.goto(pathToFileURL(path.join(source, 'index.html')).href);
      await page.waitForTimeout(650);
      const facts = await page.evaluate(() => ({
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        headings: document.querySelectorAll('h1').length,
        images: [...document.images].map(image => ({ src: image.getAttribute('src'), loaded: image.complete && image.naturalWidth > 0 })),
        links: [...document.querySelectorAll('a')].every(a => a.textContent.trim() && (!a.hash || document.querySelector(a.hash))),
      }));
      if (width <= 650) {
        await page.locator('.menu-toggle').click();
        facts.menuOpened = await page.locator('.menu-toggle').getAttribute('aria-expanded') === 'true';
        facts.menuScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        await page.screenshot({ path: path.join(evidence, `screenshots/${name}-${width}-menu.png`) });
        await page.keyboard.press('Escape');
        facts.escapeFocus = await page.locator('.menu-toggle').evaluate(el => document.activeElement === el && el.getAttribute('aria-expanded') === 'false');
        await page.locator('.menu-toggle').click();
        await page.locator('.navigation a').first().click();
        facts.linkClosesMenu = await page.locator('.menu-toggle').getAttribute('aria-expanded') === 'false';
      }
      await page.evaluate(() => scrollTo(0,0));
      await page.screenshot({ path: path.join(evidence, `screenshots/${name}-${width}.png`), fullPage: true });
      facts.images = await page.evaluate(() => [...document.images].map(image => ({ src: image.getAttribute('src'), loaded: image.naturalWidth > 0 || (image.complete && image.naturalWidth > 0) })));
      await page.close();
      const noJS = await browser.newPage({ viewport: { width, height }, javaScriptEnabled: false });
      await noJS.goto(pathToFileURL(path.join(source,'index.html')).href);
      facts.noJSNavigation = await noJS.locator('.navigation').isVisible();
      facts.noJSScrollWidth = await noJS.evaluate(() => document.documentElement.scrollWidth);
      await noJS.close();
      results[name].sizes.push(facts);
    }
    await browser.close();
  }
  const luminance = hex => {
    const c = hex.match(/\w\w/g).map(v => parseInt(v,16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
    return c[0]*.2126+c[1]*.7152+c[2]*.0722;
  };
  results.contrast = ['250609','490c13','9d1925'].flatMap(bg => ['fff1d3','dfc3b5'].map(fg => ({ bg, fg, ratio: (luminance(fg)+.05)/(luminance(bg)+.05) })));
  fs.writeFileSync(path.join(evidence, 'draft-checks.json'), JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
})().catch(error => { console.error(error); process.exitCode = 1; });
