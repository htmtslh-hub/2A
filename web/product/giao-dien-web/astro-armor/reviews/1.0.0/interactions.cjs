const fs = require('fs');
const path = require('path');
const http = require('http');
const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium, firefox } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const base = path.join(root, 'web/product/giao-dien-web/astro-armor/source');
const out = path.join(root, 'web/product/giao-dien-web/astro-armor/reviews/1.0.0');
const failures = [];
const check = (ok, message) => { if (!ok) failures.push(message); return ok; };
(async () => {
  const server = http.createServer((req, res) => {
    const name = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(base, name === '/' ? 'index.html' : name);
    try { res.setHeader('Content-Type', ({'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp'})[path.extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); }
    catch { res.writeHead(404).end(); }
  }).listen(0, '127.0.0.1');
  await new Promise(resolve => server.on('listening', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const report = { date:new Date().toISOString(), browsers:{}, failures };
  const engines = [
    ['chromium',chromium,{}], ['firefox',firefox,{}],
    ['edge',chromium,{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}],
    ['coccoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]
  ];
  for (const [name,engine,options] of engines) {
    const browser = await engine.launch({headless:true,...options});
    const context = await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
    await context.addInitScript(() => { localStorage.setItem('motion','off'); localStorage.setItem('astro-motion','off'); });
    const page = await context.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(origin);
    await page.waitForTimeout(800);
    await page.addStyleTag({content:'* { animation:none!important; transition:none!important; }'});
    const result = report.browsers[name] = {version:browser.version(), errors, osReduce:true, savedOffKeysIgnored:true, cssAnimationAndTransitionDisabled:true};
    await page.locator('[data-size="L"]').click();
    result.size = check(await page.locator('[data-size="L"]').getAttribute('aria-pressed') === 'true', `${name}: size`);
    await page.locator('[data-colour="red"]').click();
    await page.waitForTimeout(90);
    result.midColour = await page.locator('#jacket').evaluate(e=>({opacity:+getComputedStyle(e).opacity,transform:getComputedStyle(e).transform,src:e.src}));
    await page.screenshot({path:path.join(out,`${name}-colour-mid.png`)});
    check(result.midColour.opacity > .45 && result.midColour.opacity < 1, `${name}: finite mid-frame under OS reduce`);
    await page.waitForTimeout(450);
    result.endColour = await page.locator('#jacket').evaluate(e=>({opacity:+getComputedStyle(e).opacity,src:e.src,complete:e.complete&&e.naturalWidth>0}));
    check(result.endColour.opacity === 1 && result.endColour.src.endsWith('armor-red.webp') && result.endColour.complete, `${name}: final colour`);
    for (const colour of ['black','white','beige','red','beige']) await page.locator(`[data-colour="${colour}"]`).click({noWaitAfter:true});
    await page.waitForTimeout(450);
    result.rapid = check(await page.locator('#jacket').getAttribute('class') === 'jacket jacket--beige jacket--reference',`${name}: rapid colour changes`);
    await page.locator('#favourite').click();
    result.favourite = check(await page.locator('#favourite').getAttribute('aria-pressed') === 'true',`${name}: favourite`);
    await page.locator('#add-bag').click();
    result.bag = check(await page.locator('#bag-total').innerText() === '$560' && (await page.locator('#bag-items').innerText()).includes('/ L'),`${name}: bag summary`);
    await page.locator('#bag-items button').click();
    result.remove = check(await page.locator('#bag-total').innerText() === '$0', `${name}: removal`);
    await page.keyboard.press('Escape');
    result.dialogFocus = check(await page.locator('#add-bag').evaluate(e=>e===document.activeElement), `${name}: dialog focus restored`);
    await page.locator('[data-open="size-dialog"]').click();
    result.sizeGuide = check(await page.locator('#size-dialog').isVisible() && await page.locator('#size-dialog tbody tr').count() === 4,`${name}: size guide`);
    await page.keyboard.press('Escape');
    await page.locator('[data-open="search-dialog"]').click();
    await page.locator('#product-search').fill('snowzz');
    check((await page.locator('#search-result').innerText()).includes('No matching'),`${name}: search no match`);
    await page.locator('#product-search').fill('winter');
    check(await page.locator('#search-result a').count()===1,`${name}: search match`);
    await page.keyboard.press('Escape');
    await page.mouse.wheel(0,400);
    await page.waitForTimeout(500);
    result.scrollMid = await page.locator('.jacket-wrap').evaluate(e=>getComputedStyle(e).transform);
    await page.screenshot({path:path.join(out,`${name}-scroll-mid.png`)});
    await page.mouse.wheel(0,700);
    await page.waitForTimeout(600);
    result.scrollEnd = await page.locator('.jacket-wrap').evaluate(e=>getComputedStyle(e).transform);
    check(result.scrollMid !== result.scrollEnd,`${name}: scroll progress`);
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    await page.waitForTimeout(400);
    result.scrollReverse = await page.locator('.jacket-wrap').evaluate(e=>getComputedStyle(e).transform);
    check(result.scrollReverse==='matrix(1, 0, 0, 1, 0, 0)',`${name}: reverse scroll`);
    await page.locator('[data-motion-toggle]').click();
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    await page.locator('[data-colour="red"]').click();
    result.pause = check(await page.locator('#jacket').evaluate(e=>+getComputedStyle(e).opacity===1),`${name}: session pause`);
    await page.reload(); await page.waitForTimeout(800);
    check(await page.locator('[data-motion-toggle]').getAttribute('aria-pressed')==='false',`${name}: reload enables motion`);
    check(errors.length===0, `${name}: console`);
    await context.close(); await browser.close();
  }
  fs.writeFileSync(path.join(out,'interactions.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  server.close(); if(failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1);});
