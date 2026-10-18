const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const {createServer} = require('node:http');
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve('_design/.browsers');
const {chromium, firefox} = require('../../../../../../_design/.tooling/node_modules/playwright');
const source = path.resolve(process.env.CHRONO_SOURCE || 'web/product/giao-dien-web/chronoform/source');
const output = __dirname;
const server = createServer((req,res) => {
  let file = path.join(source, decodeURIComponent(new URL(req.url,'http://local').pathname));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  try { res.setHeader('Content-Type', ({'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp'})[path.extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); }
  catch { res.statusCode=404; res.end(); }
});
const ids = ['paraiba','jupiter','cowboy','opus-orange'];
const report = {source, browsers:[]};
async function run() {
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const url=`http://127.0.0.1:${server.address().port}`;
  for (const [name,engine,options] of [
    ['chromium',chromium,{args:['--enable-unsafe-swiftshader']}],
    ['firefox',firefox,{}],
    ['edge',chromium,{channel:'msedge',args:['--enable-unsafe-swiftshader']}],
    ['coccoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe',args:['--enable-unsafe-swiftshader']}]
  ]) {
    const browser=await engine.launch({headless:true,...options});
    try {
      const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
      const row={name,version:browser.version(),errors:[],missing:[],models:[],widths:[]};
      page.on('pageerror',e=>row.errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400) row.missing.push(r.url());});
      await page.goto(url);
      const stage=page.locator('#watch-stage');
      async function selected(index) {
        await page.locator(`[data-feature="${index}"]`).click();
        await page.waitForTimeout(1150);
        assert.equal(await stage.evaluate(e=>e.watchController.model.id),ids[index]);
        const art=await stage.locator('.hero-watch-photo').evaluate(e=>({src:e.getAttribute('src'),loaded:e.complete&&e.naturalWidth>0,display:getComputedStyle(e).display}));
        assert(art.loaded); assert.equal(art.display,'block'); assert(art.src.endsWith(`hero-${ids[index]}.webp`));
        return art;
      }
      for(let i=0;i<4;i++) {
        row.models.push({id:ids[i],...await selected(i)});
        if(name==='chromium') await page.screenshot({path:path.join(output,`hero-${ids[i]}.png`)});
      }
      for(const [selector,expected] of [['#hero-next','paraiba'],['#previous-model','opus-orange']]) {
        await page.locator(selector).click(); await page.waitForTimeout(180);
        const opacity=await stage.evaluate(e=>Number(e.style.opacity)); assert(opacity>0&&opacity<1);
        await page.waitForTimeout(1000); assert.equal(await stage.evaluate(e=>e.watchController.model.id),expected);
      }
      await page.locator('#hero-next').click(); await page.waitForTimeout(90);
      await page.locator('#hero-next').click(); await page.waitForTimeout(90);
      await page.locator('#previous-model').click(); await page.waitForTimeout(1200);
      assert.equal(await stage.evaluate(e=>e.watchController.model.id),'paraiba');
      await stage.evaluate(e=>{window.inspectionStates=[];new MutationObserver(()=>window.inspectionStates.push({inspecting:e.classList.contains('is-inspecting'),photo:getComputedStyle(e.querySelector('.hero-watch-photo')).display})).observe(e,{attributes:true,attributeFilter:['class']});});
      await page.locator('#movement-preview').click(); await page.waitForTimeout(3500);
      row.inspectionStates=await page.evaluate(()=>window.inspectionStates);
      assert(row.inspectionStates.some(s=>s.inspecting&&s.photo==='none'));
      assert(!(await stage.evaluate(e=>e.classList.contains('is-inspecting'))));
      await page.locator('#find-out').click(); await page.waitForTimeout(750);
      assert.equal(await stage.locator('.hero-watch-photo').evaluate(e=>getComputedStyle(e).display),'none');
      await page.locator('#back-view').click(); assert((await stage.evaluate(e=>e.watchController.angle.y))>3);
      await page.locator('#front-view').click();
      await page.locator('.brand').click(); await page.waitForTimeout(750);
      for (const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]) {
        await page.setViewportSize({width,height});
        for(let i=0;i<4;i++) {
          await selected(i);
          const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
          assert(size.scroll<=size.client);row.widths.push({width,id:ids[i],...size});
          if(name==='chromium'&&i===0) await page.screenshot({path:path.join(output,`hero-${width}.png`),fullPage:width<500});
        }
      }
      await page.goto('file:///'+path.join(source,'index.html').replaceAll('\\','/'));
      await page.waitForTimeout(800);
      assert(await stage.locator('.hero-watch-photo').evaluate(e=>e.complete&&e.naturalWidth>0));
      row.filePhoto=true;
      assert.deepEqual(row.errors,[]);assert.deepEqual(row.missing,[]);
      report.browsers.push(row);
      console.log('PASS',name,browser.version());
    } finally {await browser.close();}
  }
  fs.writeFileSync(path.join(output,'hero-checks.json'),JSON.stringify(report,null,2));
}
run().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
