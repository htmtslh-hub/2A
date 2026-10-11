import { readFileSync, writeFileSync, cpSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const definitions = {
  shirtline: { name: 'Shirtline', version: '1.2.0', shipping: 0, free: 0, native: true, products: [
    {id:'noir',name:'Noir Oxford',price:14800,variants:['S','M','L','XL']},
    {id:'cabernet',name:'Cabernet Camp',price:14200,variants:['S','M','L','XL']},
    {id:'linen',name:'Linen Sand',price:15600,variants:['S','M','L','XL']},
    {id:'olive',name:'Olive Utility',price:16400,variants:['S','M','L','XL']},
    {id:'white',name:'White Mandarin',price:15200,variants:['S','M','L','XL']}
  ] },
  novatrend: { name: 'NovaTrend', version: '1.2.0', selector: '#checkout-btn', shipping: 499, free: 5000,
    adapter: `items: () => Object.entries(cart).filter(([id, item]) => PRODUCTS[id] && Number.isInteger(item.qty) && item.qty > 0 && item.qty <= 99).map(([id, item]) => ({ ...PRODUCTS[id], key: id, quantity: item.qty })),
    quantity: (id, quantity) => { if (!PRODUCTS[id]) return; if (quantity) cart[id] = { ...PRODUCTS[id], qty: quantity }; else delete cart[id]; saveStorage(CART_STORAGE_KEY, cart); updateCartUI(); },
    clear: () => { cart = {}; saveStorage(CART_STORAGE_KEY, cart); updateCartUI(); }` },
  diginest: { name: 'DigiNest', version: '1.3.0', selector: '#checkout', shipping: 599, free: 9900,
    adapter: `items: () => Object.entries(cart).filter(([id, quantity]) => catalog.has(id) && Number.isInteger(quantity) && quantity > 0 && quantity <= 99).map(([id, quantity]) => ({ ...catalog.get(id), key: id, quantity })),
    quantity: (id, quantity) => { if (!catalog.has(id)) return; if (quantity) cart[id] = quantity; else delete cart[id]; save(); resetReview(); render(); },
    clear: () => { cart = {}; save(); resetReview(); render(); }` },
  soniq: { name: 'Soniq', version: '1.1.0', selector: '.bag__enquiry', shipping: 0, free: 0 },
  'astra-interior': { name: 'Mellow Coffee', version: '2.1.0', selector: '.bag__enquiry', shipping: 0, free: 0 },
  vybe: { name: 'VYBE', version: '1.1.0', selector: '[data-enquire]', shipping: 0, free: 0,
    adapter: `items: () => bag.map(item => { const p = products.find(p => p.id === item.id); return { id: p.id, key: item.id + ':' + item.size, name: p.name, price: Math.round(p.price * 100), variant: 'Size ' + item.size, quantity: item.quantity }; }),
    quantity: (key, quantity) => { const index = bag.findIndex(item => item.id + ':' + item.size === key); if (index < 0) return; if (quantity) bag[index].quantity = quantity; else bag.splice(index, 1); save('vybe-bag', bag); renderBag(); },
    clear: () => { bag = []; save('vybe-bag', bag); renderBag(); }` },
  solenne: { name: 'Solenne', version: '2.1.0', shipping: 0, free: 0, products: [
    { id: 'glow-serum', name: 'Glow Serum', price: 3800 }, { id: 'daily-cream', name: 'Daily Cream', price: 4600 }
  ] },
  auralis: { name: 'Auralis', version: '1.3.0', shipping: 0, free: 0, products: [
    { id: 'evobuds-one', name: 'EvoBuds One', price: 14900 }, { id: 'studiobuds-pro', name: 'StudioBuds Pro', price: 14900 }, { id: 'airbuds-lite', name: 'AirBuds Lite', price: 14900 }
  ] },
  aeris: { name: 'Aeris', version: '1.4.0', shipping: 0, free: 0, products: [
    { id: 'pearl', name: 'Aeris One — Pearl White', price: 17900 }, { id: 'midnight', name: 'Aeris One — Midnight Navy', price: 17900 }, { id: 'blush', name: 'Aeris One — Blush Rose', price: 17900 }
  ] },
  watchroom: { name: 'Watchroom', version: '1.3.0', shipping: 0, free: 0, products: [
    { id: 'quantum', name: 'QUANTUM ADG', price: 89900 }, { id: 'onyx', name: 'ONYX GMT', price: 74900 }, { id: 'solaris', name: 'SOLARIS 38', price: 82900 }
  ] },
  velora: { name: 'Velora', version: '1.3.0', shipping: 0, free: 0, selection: '[data-summary]', products: [
    { id: 'metro', name: 'Metro', price: 285000 }, { id: 'onyx', name: 'Onyx', price: 245000 }, { id: 'loop', name: 'Loop', price: 265000 }
  ] }
};
const bagAdapter = slug => `items: () => Object.keys(bag).filter(id => catalogue[id] && Number.isInteger(bag[id]) && bag[id] > 0 && bag[id] <= 99).map(id => ({ id, key: id, ...catalogue[id], quantity: bag[id] })),
    quantity: (id, quantity) => { if (!catalogue[id]) return; if (quantity) bag[id] = quantity; else delete bag[id]; updateBag(); },
    clear: () => { bag = {}; updateBag(); }`;

const guide = readFileSync(join(here, 'SETUP.md'), 'utf8');
const slugs = process.argv.slice(2);
if (!slugs.length || slugs.some(slug => !definitions[slug])) throw new Error('Pass explicit supported product slugs.');
for (const slug of slugs) {
  const d = definitions[slug], base = join(root, slug), source = join(base, 'source');
  for (const file of ['README.md', 'source/README.md', 'source/CUSTOMISE.md', 'source/LICENCE.txt']) {
    if (!existsSync(join(base, file))) throw new Error('Required documentation missing: ' + join(base, file));
  }
  let html = readFileSync(join(source, 'index.html'), 'utf8');
  let js = readFileSync(join(source, 'assets/js/main.js'), 'utf8');
  if (html.includes('assets/js/commerce.js')) throw new Error('Already installed: ' + slug);
  const match = html.match(/<script\b[^>]*\bsrc=["']assets\/js\/main\.js[^"']*["'][^>]*>/);
  if (!match) throw new Error('Cannot locate original script: ' + slug);
  const deferred = /\bdefer\b/.test(match[0]) ? ' defer' : '';
  html = html.replace(match[0], `<script src="assets/js/shop-config.js?v=${d.version}"${deferred}></script>\n<script src="assets/js/commerce.js?v=${d.version}"${deferred}></script>\n${match[0]}`);
  html = html.replace('</head>', `<link rel="stylesheet" href="assets/css/commerce.css?v=${d.version}">\n</head>`);
  // The new checkout replaces the old review/enquiry step, keeping the original bag and motion.
  if (['soniq', 'astra-interior'].includes(slug)) d.adapter = bagAdapter(slug);
  if (d.adapter) {
    const index = js.lastIndexOf('})();') >= 0 ? js.lastIndexOf('})();') : js.lastIndexOf('}());');
    if (index < 0) throw new Error('Cannot locate closure: ' + slug);
    js = js.slice(0, index) + `\n  // Portable COD checkout reads this cart's canonical product data.\n  window.ForgeCommerce?.register({\n    ${d.adapter}\n  });\n` + js.slice(index);
  }
  if (slug === 'novatrend') {
    js = js.replace('const FREE_SHIPPING_THRESHOLD = 5000;', 'const FREE_SHIPPING_THRESHOLD = window.ForgeShopConfig.freeShippingAt;')
      .replace('const STANDARD_SHIPPING_FEE = 499;', 'const STANDARD_SHIPPING_FEE = window.ForgeShopConfig.shippingCents;');
    html = html.replace('Proceed to Checkout', 'Delivery & payment').replace('>Checkout<', '>Delivery & payment<');
  }
  if (slug === 'diginest') {
    js = js.replace('const FREE_SHIPPING = 9900;', 'const FREE_SHIPPING = window.ForgeShopConfig.freeShippingAt;')
      .replace('const SHIPPING = 599;', 'const SHIPPING = window.ForgeShopConfig.shippingCents;');
    html = html.replace('Review Order', 'Delivery & payment').replace('Demo checkout · no payment required', 'COD checkout · setup required for live orders');
  }
  if (d.selector) {
    const selector = JSON.stringify(d.selector);
    const index = js.lastIndexOf('})();') >= 0 ? js.lastIndexOf('})();') : js.lastIndexOf('}());');
    js = js.slice(0, index) + `\n  const codAction = document.querySelector(${selector});\n  if (codAction) codAction.textContent = 'Delivery & payment';\n` + js.slice(index);
  }
  html = html.replace(/No online payment\./g, 'COD checkout available after shop setup.')
    .replace(/Enquiries only; no online payment\./g, 'Continue to delivery for COD checkout.')
    .replace(/no payments or inventory backend/gi, 'COD checkout requires shop setup; inventory is not connected');
  const config = {
    slug, name: d.name, shippingCents: d.shipping, freeShippingAt: d.free,
    orderEndpoint: '', onlineCheckoutEndpoint: '', checkoutHosts: [],
    ...(d.selector ? { checkoutSelector: d.selector } : { collectionSelector: '#collection', products: d.products }),
    ...(d.selection ? { selectionSelector: d.selection } : {})
    ,...(d.native ? { nativeCollection: true } : {})
  };
  writeFileSync(join(source, 'assets/js/shop-config.js'), `/* Edit only these public settings. Read CUSTOMISE.md > COD setup first.\n * Empty orderEndpoint keeps checkout in preview mode. Never put secret keys here.\n * USD amounts are integer cents; shippingCents: 499 means $4.99.\n */\nwindow.ForgeShopConfig = ${JSON.stringify(config, null, 2)};\n`);
  cpSync(join(here, 'commerce.js'), join(source, 'assets/js/commerce.js'));
  cpSync(join(here, 'commerce.css'), join(source, 'assets/css/commerce.css'));
  writeFileSync(join(source, 'index.html'), html);
  if (d.adapter) writeFileSync(join(source, 'assets/js/main.js'), js);
  const customisePath = join(source, 'CUSTOMISE.md');
  let customise = readFileSync(customisePath, 'utf8');
  customise = customise.replace(/all six (current )?files/g, 'the complete current ZIP')
    .replace(/all six files/g, 'the complete current ZIP');
  customise = `## COD checkout quick start — ${d.version}\n\nRead the **COD setup** section below before accepting orders. The package now includes assets/js/shop-config.js, assets/js/commerce.js and assets/css/commerce.css. Attach the whole current ZIP when asking AI to edit it.\n\n` + customise + '\n\n' + guide;
  writeFileSync(customisePath, customise);
  const readmePath = join(source, 'README.md');
  let readme = readFileSync(readmePath, 'utf8');
  // Retain visual/customisation documentation, explicitly mark prior checkout limitations as historical.
  readme = `# ${d.name} ${d.version}\n\nStart with CUSTOMISE.md → **COD setup**. This update adds delivery details, editable order summary and cash-on-delivery checkout. The original visual design, cart and motion remain.\n\nExtract the whole ZIP and open index.html. No build or framework is needed. Checkout uses three additional local files: assets/js/shop-config.js (public settings), assets/js/commerce.js, assets/css/commerce.css.\n\n**Before setup:** checkout previews an order only, makes no request and leaves the bag intact. **After setup:** POST to your configured order service on explicit submission; clear the bag only after JSON {"ok":true}. Failed/timeout requests preserve the bag. Delivery fields are not persisted in browser storage. Order confirmation and inventory checks are the shop's responsibility. No online gateway account, hosting subscription or stock backend is bundled.\n\nProducts, prices and delivery fees are illustrative. New sample prices for skincare are demonstration data. Keep source pricing, HTML copy and your order-service catalogue in sync. The template download price is separate from the sample goods' prices.\n\nOnline payment is an optional documented integration using the merchant's own account and a server that validates product IDs/prices, creates checkout and verifies signed webhooks. No secret keys belong in the browser. Read LICENCE.txt; its existing terms are unchanged.\n\nCurrent checkout checks are recorded in ../reviews/${d.version}/QA.md. Earlier compatibility claims below refer to the original design, not live COD delivery or online payments.\n\n## Original design documentation (before the COD update)\n\n` + readme;
  writeFileSync(readmePath, readme);
  const rootReadme = join(base, 'README.md');
  writeFileSync(rootReadme, `## Current version: ${d.version} — COD checkout\nSource: source/. Setup: source/CUSTOMISE.md > COD setup. Explicit owner request on 11/10/2026 authorises expanded checkout JS and three extra portable assets (W01/W05/W06 exceptions). No licence modification. QA: reviews/${d.version}/QA.md.\n\n` + readFileSync(rootReadme, 'utf8'));
  mkdirSync(join(base, 'reviews', d.version), { recursive: true });
  writeFileSync(join(base, 'reviews', d.version, 'BRIEF.md'), `# ${d.name} ${d.version}\n\nNgày 11/10/2026. Chủ sản phẩm yêu cầu giá mua template chung $20 USD và hoàn thiện giỏ/COD, hướng dẫn nối thanh toán online. Phạm vi mẫu này: giữ thiết kế/motion, thêm checkout portable và cấu hình nhận đơn, đồng bộ demo/ZIP/catalog.\n\nNgoại lệ W01: thêm shop-config.js, commerce.js, commerce.css. W05: giỏ, dữ liệu giao hàng và POST nhận COD khi chủ shop cấu hình. W06: giữ ngoại lệ tài sản/dung lượng hiện có; không nén/rối mã. Mở file:// để xem thử; gửi đơn cần mạng và endpoint do người mua sở hữu. Không thêm backend/database của Forge Zone cho đơn hàng của template. Không thay LICENCE.\n\nEndpoint mặc định trống; không thu/gửi thông tin khi chỉ duyệt trang. Không lưu địa chỉ/email/điện thoại vào localStorage. Mặc định USD cho hàng demo. Phí giao hàng mới ở shop-config; các mẫu trước không có phí giữ 0. Solenne thêm hai giá demo $38/$46, không phải báo giá sản phẩm thật.\n`);
  console.log('Installed ' + slug + ' ' + d.version);
}
