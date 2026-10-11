const { chromium } = require('../../../../../../_design/.tooling/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const assert = require('node:assert/strict');
const folder = __dirname;
const url = pathToFileURL(path.resolve(folder, '../../source/index.html')).href;
const snapshot = page => page.evaluate(() => ({
  position: Number(document.querySelector('.shirt-orbit').dataset.position),
  selected: Number(document.querySelector('.shirt-orbit').dataset.selected),
  running: document.querySelector('.shirt-orbit').dataset.animating,
  images: [...document.querySelectorAll('.shirt-orbit img')].map(img => ({src: img.getAttribute('src'), transform: getComputedStyle(img).transform, opacity: Number(getComputedStyle(img).opacity), loaded: img.complete && img.naturalWidth > 0})),
  counter: document.querySelector('#hero-no').textContent,
  width: document.documentElement.scrollWidth,
  viewport: document.documentElement.clientWidth
}));
(async () => {
  fs.mkdirSync(path.join(folder, 'screenshots'), {recursive: true});
  const results = [];
  const configurations = [{name:'Edge', channel:'msedge'}];
  const coc = ['C:/Program Files/CocCoc/Browser/Application/browser.exe','C:/Program Files (x86)/CocCoc/Browser/Application/browser.exe','C:/Users/Lenovo/AppData/Local/CocCoc/Browser/Application/browser.exe'];
  const exe = coc.find(fs.existsSync);
  if (exe) configurations.push({name:'CocCoc', executablePath:exe});
  for (const config of configurations) {
    const {name, ...launch} = config;
    const browser = await chromium.launch({...launch, headless:true});
    const page = await browser.newPage({viewport:{width:1440,height:900}, reducedMotion:'reduce'});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => { localStorage.setItem('shirtline-motion','off'); localStorage.setItem('morge-motion','off'); });
    await page.goto(url);
    const initial = await snapshot(page);
    assert.equal(initial.images.length,5);
    assert(initial.images.every(img => img.loaded && img.opacity > 0));
    await page.screenshot({path:path.join(folder,'screenshots',name+'-desktop.png')});
    // Reverse wrap 0 -> 4 must keep the same five image nodes moving.
    await page.locator('#hero-prev').click();
    await page.waitForTimeout(500);
    const reverse = await snapshot(page);
    assert(reverse.position < 0 && reverse.position > -1);
    assert.notEqual(reverse.images[0].transform,initial.images[0].transform);
    assert.deepEqual(reverse.images.map(i=>i.src),initial.images.map(i=>i.src));
    await page.screenshot({path:path.join(folder,'screenshots',name+'-mid-orbit.png')});
    await page.waitForTimeout(1250);
    assert.equal((await snapshot(page)).selected,4);
    await page.locator('#hero-next').click();
    await page.waitForTimeout(500);
    const forward = await snapshot(page);
    assert(forward.position > 4 && forward.position < 5);
    await page.waitForTimeout(1250);
    assert.equal((await snapshot(page)).counter,'01');
    for(const id of ['hero-next','hero-next','hero-prev','hero-next']) {
      await page.locator('#'+id).click(); await page.waitForTimeout(90);
    }
    await page.waitForTimeout(1750);
    assert.equal((await snapshot(page)).selected,2);
    assert.equal((await snapshot(page)).running,'false');
    await page.addStyleTag({content:'*{animation:none!important;transition:none!important}'});
    await page.locator('#hero-next').click();
    await page.waitForTimeout(500);
    const fallback = await snapshot(page);
    assert(fallback.position > 2 && fallback.position < 3);
    await page.waitForTimeout(1250);
    await page.locator('#hero-next').focus();
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(1750);
    assert.equal((await snapshot(page)).selected,2);
    await page.locator('.add').first().click();
    assert.equal(await page.locator('#bag-count').textContent(),'1');
    await page.locator('#bag').click();
    assert.equal(await page.locator('#bag-panel').getAttribute('aria-hidden'),'false');
    await page.locator('#close-bag').click();
    const sizes=[];
    for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]) {
      await page.setViewportSize({width,height});
      const state=await snapshot(page);
      assert(state.width<=width);
      await page.screenshot({path:path.join(folder,'screenshots',name+'-'+width+'.png'),fullPage:true});
      sizes.push({width,height,scrollWidth:state.width});
    }
    await page.setViewportSize({width:1440,height:900});
    await page.goto(url);
    await page.mouse.move(0,0);
    await page.waitForTimeout(6250);
    const auto=await snapshot(page);
    assert(auto.position > 0 && auto.position < 1);
    await page.waitForTimeout(1500);
    await page.locator('.orbit-pause').click();
    const paused=await snapshot(page);
    await page.mouse.move(0,0); await page.locator('.orbit-pause').evaluate(el=>el.blur());
    await page.waitForTimeout(6100);
    assert.equal((await snapshot(page)).position,paused.position);
    const noJs=await browser.newPage({javaScriptEnabled:false});
    await noJs.goto(url);
    assert(await noJs.locator('#hero-shirt').isVisible());
    assert.equal(await noJs.locator('.product').count(),5);
    assert.deepEqual(errors,[]);
    results.push({browser:name,version:browser.version(),initial,reverse,forward,fallback,auto,sizes,errors,noJs:true,rapid:true,pause:true});
    await browser.close();
  }
  fs.writeFileSync(path.join(folder,'orbit-checks.json'),JSON.stringify({results,cocCocAvailable:Boolean(exe)},null,2));
  console.log(JSON.stringify(results.map(r=>({browser:r.browser,version:r.version,sizes:r.sizes,errors:r.errors,passed:true}))));
})().catch(error=>{console.error(error);process.exitCode=1});
