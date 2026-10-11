import {createServer} from 'node:http';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,join,extname} from 'node:path';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium}=await import('../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const {default:AxeBuilder}=await import('../../../../../_design/.tooling/node_modules/@axe-core/playwright/dist/index.mjs');
const root=resolve('web/product/giao-dien-web'),versions={shirtline:'1.2.0',novatrend:'1.2.0',diginest:'1.3.0',soniq:'1.1.0','astra-interior':'2.1.0',vybe:'1.1.0',solenne:'2.1.0',auralis:'1.3.0',aeris:'1.4.0',watchroom:'1.3.0',velora:'1.3.0'};
const adds={shirtline:'.add',novatrend:'[data-cart-add]',diginest:'[data-add]',soniq:'[data-product]','astra-interior':'[data-product]',vybe:'[data-add]'};
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp'};
const server=createServer((req,res)=>{try{const file=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://x').pathname));if(!file.startsWith(root))throw Error();res.setHeader('Content-Type',mime[extname(file)]||'application/octet-stream');res.end(readFileSync(file));}catch{res.writeHead(404).end();}});
await new Promise(done=>server.listen(0,'127.0.0.1',done));const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true});const results=[];
const fill=async page=>{for(const [name,value] of Object.entries({name:'COD Test',email:'test@example.com',phone:'+12025550123',address:'1 Test Street',city:'Test City',country:'United States'}))await page.locator(`.fz-commerce-form [name="${name}"]`).fill(value);};
async function test(name,fn){try{await fn();results.push({name,status:'PASS'});console.log('PASS '+name);}catch(error){results.push({name,status:'FAIL',message:error.message});console.log('FAIL '+name+': '+error.message.split('\n')[0]);}}
async function shop(slug,init){const context=await browser.newContext(),page=await context.newPage();if(init)await context.addInitScript(init);await page.goto(`${base}/${slug}/source/index.html`,{waitUntil:'domcontentloaded'});return {context,page};}
async function addAndOpen(page,slug){await page.locator(adds[slug]||'.fz-commerce-collection button').first().click({force:true});await page.evaluate(()=>window.ForgeCommerce.open());await page.locator('.fz-commerce-form').waitFor();}
try{
  for(const [slug,version] of Object.entries(versions)){
    const dir=join(root,slug,'reviews',version,'screenshots');mkdirSync(dir,{recursive:true});const {context,page}=await shop(slug);
    await test(slug+' checkout responsive and accessibility',async()=>{
      assert.equal(await page.locator('[aria-controls]').evaluateAll(nodes=>nodes.filter(node=>!document.getElementById(node.getAttribute('aria-controls'))).length),0,'initial aria-controls targets exist');
      for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){
        await page.setViewportSize({width,height});await page.reload({waitUntil:'domcontentloaded'});
        // A fresh screenshot from the source, using the established preview dimensions.
        if(width===1440){await page.setViewportSize({width:1396,height:1047});await page.waitForTimeout(500);const png=join(dir,'preview-source.png');await page.screenshot({path:png});execFileSync('ffmpeg',['-y','-loglevel','error','-i',png,'-vf','scale=698:-2','-quality','80',resolve('web/public/previews',slug+'.webp')]);await page.setViewportSize({width,height});}
        await addAndOpen(page,slug);await fill(page);const overflow=await page.locator('.fz-commerce-dialog').evaluate(node=>node.scrollWidth>node.clientWidth+1);assert.equal(overflow,false,'checkout horizontal overflow');await page.screenshot({path:join(dir,`checkout-chromium-${width}.png`)});
        const axe=await new AxeBuilder({page}).include('.fz-commerce-dialog').analyze();assert.deepEqual(axe.violations.map(item=>item.id),[],'checkout axe violations');
        await page.keyboard.press('Escape');assert.equal(await page.locator('.fz-commerce-dialog').evaluate(node=>node.open),false);assert.equal(await page.evaluate(()=>document.activeElement===document.body),false,'focus restored');
      }
    });await context.close();
  }
  await test('malformed and forged persisted carts',async()=>{
    for(const slug of ['solenne','novatrend']){
      const {context,page}=await shop(slug,()=>{localStorage.setItem('solenne-commerce-v1','not-json');localStorage.setItem('novatrend-cart-v1',JSON.stringify({'essential-hoodie':{qty:1,price:1,name:'Forged'},unknown:{qty:9}}));localStorage.setItem('novatrend-wishlist-v1','{}');});
      if(slug==='novatrend'){await page.evaluate(()=>window.ForgeCommerce.open());assert((await page.locator('.fz-commerce-lines').innerText()).includes('$59.99'));assert(!(await page.locator('.fz-commerce-lines').innerText()).includes('Forged'));}else{await page.evaluate(()=>window.ForgeCommerce.open());await page.getByText('Your bag is empty. Choose something you love.').waitFor();}await context.close();
    }
  });
  await test('blocked localStorage retains in-memory bag',async()=>{const {context,page}=await shop('solenne',()=>{Object.defineProperty(window,'localStorage',{get(){throw Error('Blocked');}});});await addAndOpen(page,'solenne');assert.equal(await page.locator('.fz-commerce-lines li').count(),1);await context.close();});
  await test('file protocol offline bag and preview',async()=>{const context=await browser.newContext({offline:true}),page=await context.newPage();await page.goto(pathToFileURL(join(root,'solenne/source/index.html')).href);await addAndOpen(page,'solenne');await fill(page);await page.locator('button[type=submit]').click();await page.getByRole('heading',{name:'Order preview',exact:true}).waitFor();await context.close();});
  await test('quantity keyboard focus, remove and shipping thresholds',async()=>{
    const {context,page}=await shop('solenne');await addAndOpen(page,'solenne');await page.getByRole('button',{name:'← Edit your bag'}).click();
    await page.getByRole('button',{name:/Increase.*quantity/}).first().click();assert((await page.evaluate(()=>document.activeElement.getAttribute('aria-label'))).startsWith('Increase'));
    await page.evaluate(()=>{ForgeShopConfig.shippingCents=499;ForgeShopConfig.freeShippingAt=7601;ForgeCommerce.openBag();});assert((await page.locator('.fz-commerce-totals').innerText()).includes('$4.99'));
    await page.evaluate(()=>{ForgeShopConfig.freeShippingAt=7600;ForgeCommerce.openBag();});assert((await page.locator('.fz-commerce-totals').innerText()).includes('$0.00'));
    await page.getByRole('button',{name:/Remove Glow/}).click();await page.getByText('Your bag is empty. Choose something you love.').waitFor();await context.close();
  });
  await test('shirt sizes persist as separate lines',async()=>{const {context,page}=await shop('shirtline');await page.locator('.shirtline-size select').first().selectOption('S');await page.locator('.add').first().click({force:true});await page.locator('.shirtline-size select').first().selectOption('M');await page.locator('.add').first().click({force:true});await page.reload();await page.evaluate(()=>ForgeCommerce.openBag());assert.equal(await page.locator('.fz-commerce-lines li').count(),2);assert((await page.locator('.fz-commerce-lines').innerText()).includes('Size M'));await context.close();});
  await test('shirtline mobile menu opens, escapes, selects and resizes',async()=>{const {context,page}=await shop('shirtline');await page.setViewportSize({width:320,height:740});await page.locator('#menu').click();assert(await page.locator('#shirtline-navigation').isVisible());assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('#shirtline-navigation').isVisible(),false);await page.locator('#menu').click();await page.locator('#shirtline-navigation a').first().click();assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'false');await page.locator('#menu').click();await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(100);assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'false');await context.close();});
  await test('network, invalid acknowledgement, duplicate submits, timeout and privacy',async()=>{
    const {context,page}=await shop('solenne');await addAndOpen(page,'solenne');await page.locator('.fz-commerce-close').click();await page.evaluate(()=>{ForgeShopConfig.orderEndpoint='https://orders.example.test/cod';ForgeCommerce.open();});await fill(page);let requests=0;
    const target='https://orders.example.test/cod';await page.route(target,route=>route.abort());await page.locator('button[type=submit]').click();await page.getByText(/We could not confirm/).waitFor();await page.unroute(target);
    await page.route(target,route=>route.fulfill({status:200,contentType:'application/json',body:'{"ok":false}'}));await page.locator('button[type=submit]').click();await page.getByText(/We could not confirm/).waitFor();assert.equal(await page.locator('.fz-commerce-form').count(),1);await page.unroute(target);
    await page.route(target,async route=>{requests++;await new Promise(done=>setTimeout(done,16000));try{await route.fulfill({status:200,contentType:'application/json',body:'{"ok":true}'});}catch{}});
    await page.locator('button[type=submit]').click();await page.evaluate(()=>{document.querySelector('.fz-commerce-form').dispatchEvent(new Event('submit',{cancelable:true}));});assert(await page.locator('button[type=submit]').isDisabled());await page.getByText(/We could not confirm/).waitFor({timeout:20000});assert.equal(requests,1);assert.equal(await page.locator('.fz-commerce-lines li').count(),1);
    const storage=await page.evaluate(()=>JSON.stringify({...localStorage}));assert(!storage.includes('test@example.com'));assert(!storage.includes('Test Street'));await context.close();
  });
  await test('unsafe online redirect rejected and bag preserved',async()=>{const {context,page}=await shop('solenne');await addAndOpen(page,'solenne');await page.locator('.fz-commerce-close').click();await page.evaluate(()=>{ForgeShopConfig.onlineCheckoutEndpoint='https://orders.example.test/online';ForgeShopConfig.checkoutHosts=['checkout.example.test'];ForgeCommerce.open();});await fill(page);await page.route('https://orders.example.test/online',route=>route.fulfill({status:200,contentType:'application/json',body:'{"ok":true,"checkoutUrl":"https://untrusted.example.test/pay"}'}));await page.getByRole('button',{name:'Pay online securely'}).click();await page.getByText(/We could not confirm/).waitFor();assert(page.url().startsWith(base));assert.equal(await page.locator('.fz-commerce-lines li').count(),1);await context.close();});
}finally{await browser.close();server.close();writeFileSync(join(root,'tools/commerce-kit/detail-results.json'),JSON.stringify({date:new Date().toISOString(),mockOnly:true,results},null,2));}
process.exitCode=results.some(item=>item.status==='FAIL')?1:0;
