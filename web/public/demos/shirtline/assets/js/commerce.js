/* Portable COD checkout. No dependencies, secrets or automatic background requests. */
(() => {
  'use strict';
  const config = window.ForgeShopConfig;
  if (!config) return;
  const storageKey = config.slug + '-commerce-v1';
  const $ = selector => document.querySelector(selector);
  const money = cents => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const button = (text, action, className = 'fz-commerce-button') => {
    const node = el('button', text, className);
    node.type = 'button'; node.addEventListener('click', action); return node;
  };
  let adapter, dialog, content, opener, busy = false, pendingOrder = null, toastTimer;
  let localCart = [];
  const products = config.products || [];
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(saved)) localCart = saved.filter(item => products.some(p => p.id === item.id) &&
      Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99 &&
      typeof item.variant === 'string' && item.variant.length <= 180);
  } catch { /* A blocked or malformed store falls back to memory. */ }
  function save() { try { localStorage.setItem(storageKey, JSON.stringify(localCart)); } catch { /* Optional persistence. */ } }
  const internal = {
    items: () => localCart.map(item => {
      const product = products.find(p => p.id === item.id);
      return { ...product, key: item.id + '|' + item.variant, variant: item.variant, quantity: item.quantity };
    }),
    quantity: (key, quantity) => {
      localCart = localCart.flatMap(item => item.id + '|' + item.variant !== key ? [item] : quantity ? [{ ...item, quantity }] : []);
      save(); updateCount();
    },
    clear: () => { localCart = []; save(); updateCount(); }
  };
  function items() {
    return (adapter || internal).items().filter(item => typeof item.key === 'string' && typeof item.name === 'string' &&
      Number.isSafeInteger(item.price) && item.price >= 0 && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99);
  }
  function totals() {
    const lines = items();
    const subtotal = lines.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = lines.length && subtotal < config.freeShippingAt ? config.shippingCents : 0;
    return { lines, subtotal, shipping, total: subtotal + shipping };
  }
  function updateCount() {
    const count = items().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('[data-fz-count]').forEach(node => node.textContent = String(count));
  }
  function announce(message) {
    let status = $('[data-fz-status]');
    if (!status) {
      status = el('p', '', 'fz-commerce-toast'); status.dataset.fzStatus = '';
      status.setAttribute('role', 'status'); document.body.append(status);
    }
    status.textContent = message; status.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => status.hidden = true, 3000);
  }
  function add(id, variant = '') {
    const product = products.find(p => p.id === id); if (!product) return;
    const existing = localCart.find(item => item.id === id && item.variant === variant);
    if (existing) existing.quantity = Math.min(99, existing.quantity + 1);
    else localCart.push({ id, variant, quantity: 1 });
    pendingOrder = null; save(); updateCount(); announce(product.name + ' added to your bag.');
  }
  function initDialog() {
    if (dialog) return;
    dialog = el('dialog', undefined, 'fz-commerce-dialog'); dialog.id = 'fz-commerce-dialog';
    dialog.setAttribute('aria-labelledby', 'fz-commerce-title');
    const header = el('header', undefined, 'fz-commerce-header');
    const title = el('h2', 'Your bag', 'fz-commerce-title'); title.id = 'fz-commerce-title';
    const close = button('Close', () => { if (!busy) dialog.close(); }, 'fz-commerce-close');
    header.append(title, close); content = el('div', undefined, 'fz-commerce-content');
    dialog.append(header, content); document.body.append(dialog);
    dialog.addEventListener('cancel', event => { if (busy) event.preventDefault(); });
    dialog.addEventListener('close', () => {
      if (opener?.isConnected && opener.getClientRects().length) opener.focus();
      else document.querySelector('dialog[open] button:not(:disabled)')?.focus();
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog || busy) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  }
  function open(checkout = false) {
    initDialog(); opener = document.activeElement;
    if (checkout && items().length) showCheckout(); else showBag();
    if (!dialog.open) dialog.showModal();
  }
  function reset(title) {
    $('#fz-commerce-title').textContent = title; content.replaceChildren(); dialog.scrollTop = 0;
  }
  function summary(parent, editable) {
    const { lines, subtotal, shipping, total } = totals();
    const list = el('ul', undefined, 'fz-commerce-lines');
    lines.forEach(item => {
      const row = el('li', undefined, 'fz-commerce-line');
      const text = el('div'); text.append(el('strong', item.name), el('p', [item.variant, money(item.price) + ' each'].filter(Boolean).join(' · ')));
      const controls = el('div', undefined, 'fz-commerce-quantity');
      if (editable) {
        const change = (quantity, action) => {
          (adapter || internal).quantity(item.key, Math.min(99, Math.max(0, quantity)));
          pendingOrder = null; showBag();
          const replacement = [...content.querySelectorAll('[data-fz-key]')].find(node => node.dataset.fzKey === item.key && node.dataset.fzAction === action && !node.disabled);
          (replacement || content.querySelector('button:not(:disabled)')).focus();
        };
        const decrease = button('−', () => change(item.quantity - 1, 'minus'), 'fz-commerce-small');
        decrease.setAttribute('aria-label', 'Decrease ' + item.name + ' quantity');
        const increase = button('+', () => change(item.quantity + 1, 'plus'), 'fz-commerce-small');
        increase.setAttribute('aria-label', 'Increase ' + item.name + ' quantity'); increase.disabled = item.quantity >= 99;
        const remove = button('Remove', () => change(0, 'remove'), 'fz-commerce-remove');
        remove.setAttribute('aria-label', 'Remove ' + item.name + (item.variant ? ' ' + item.variant : ''));
        [[decrease, 'minus'], [increase, 'plus'], [remove, 'remove']].forEach(([node, action]) => { node.dataset.fzKey = item.key; node.dataset.fzAction = action; });
        controls.append(decrease, el('span', String(item.quantity)), increase, remove);
      } else controls.append(el('span', 'Qty ' + item.quantity));
      text.append(controls); row.append(text, el('strong', money(item.price * item.quantity))); list.append(row);
    });
    parent.append(list);
    const prices = el('dl', undefined, 'fz-commerce-totals');
    [['Subtotal', subtotal], ['Delivery', shipping], ['Total · USD', total]].forEach(([label, value]) => {
      const row = el('div'); row.append(el('dt', label), el('dd', money(value))); prices.append(row);
    });
    parent.append(prices);
    if (config.freeShippingAt > 0 && subtotal < config.freeShippingAt) parent.append(el('p', 'Free delivery from ' + money(config.freeShippingAt) + '.', 'fz-commerce-note'));
  }
  function showBag() {
    reset('Your bag'); pendingOrder = null;
    if (!items().length) {
      content.append(el('p', 'Your bag is empty. Choose something you love.'));
      if (!adapter) productShelf(content);
    } else {
      summary(content, true);
      content.append(button('Continue to delivery', showCheckout));
    }
    content.append(button('Keep shopping', () => dialog.close(), 'fz-commerce-secondary'));
  }
  function field(form, label, name, type, required, autocomplete, maxLength = 160) {
    const wrap = el('label', undefined, 'fz-commerce-field'); wrap.append(el('span', label));
    const input = el(type === 'textarea' ? 'textarea' : 'input');
    if (type !== 'textarea') input.type = type;
    input.name = name; input.required = required; input.maxLength = maxLength;
    if (autocomplete) input.autocomplete = autocomplete;
    wrap.append(input); form.append(wrap); return input;
  }
  function endpoint(value) {
    if (!value) return null;
    try {
      const url = new URL(value, location.href);
      if (url.username || url.password) return null;
      if (url.protocol === 'https:' || (url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname))) return url.href;
    } catch { /* A malformed endpoint must never be used. */ }
    return null;
  }
  function orderFrom(form) {
    const data = new FormData(form), current = totals();
    const fingerprint = JSON.stringify(current.lines.map(item => [item.key, item.quantity, item.price]));
    if (!pendingOrder || pendingOrder.fingerprint !== fingerprint) {
      const random = window.crypto?.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2);
      pendingOrder = { id: config.slug + '-' + random, fingerprint };
    }
    return {
      orderId: pendingOrder.id, store: config.name, paymentMethod: 'COD', currency: 'USD',
      name: String(data.get('name')).trim(), email: String(data.get('email')).trim(), phone: String(data.get('phone')).trim(),
      address: String(data.get('address')).trim(), city: String(data.get('city')).trim(), country: String(data.get('country')).trim(),
      notes: String(data.get('notes')).trim(), items: current.lines.map(({ id, key, name, price, quantity, variant }) => ({ id, key, name, price, quantity, variant: variant || '' })),
      subtotal: current.subtotal, shipping: current.shipping, total: current.total
    };
  }
  function orderText(order) {
    return [config.name + ' · COD order', 'Reference: ' + order.orderId,
      ...order.items.map(item => item.name + (item.variant ? ' / ' + item.variant : '') + ' × ' + item.quantity + ' — ' + money(item.price * item.quantity)),
      'Subtotal: ' + money(order.subtotal), 'Delivery: ' + money(order.shipping), 'Total: ' + money(order.total) + ' USD',
      'Pay on delivery; subject to shop confirmation.', 'Name: ' + order.name, 'Email: ' + order.email, 'Phone: ' + order.phone,
      'Deliver to: ' + [order.address, order.city, order.country].join(', '), 'Notes: ' + order.notes].join('\n');
  }
  function showCheckout() {
    if (!items().length) { showBag(); return; }
    reset('Delivery & payment');
    content.append(button('← Edit your bag', showBag, 'fz-commerce-secondary'));
    summary(content, false);
    const reviewedCart = JSON.stringify(totals());
    const form = el('form', undefined, 'fz-commerce-form');
    field(form, 'Full name', 'name', 'text', true, 'name');
    field(form, 'Email', 'email', 'email', true, 'email');
    const phone = field(form, 'Phone', 'phone', 'tel', true, 'tel', 32);
    phone.pattern = '[+0-9() .-]{6,32}';
    field(form, 'Street address', 'address', 'text', true, 'street-address', 240);
    field(form, 'City / province', 'city', 'text', true, 'address-level2');
    field(form, 'Country', 'country', 'text', true, 'country-name');
    field(form, 'Delivery notes (optional)', 'notes', 'textarea', false, '', 600);
    const cod = endpoint(config.orderEndpoint), online = endpoint(config.onlineCheckoutEndpoint);
    form.append(el('p', cod ? 'Cash on delivery. Pay when your order arrives. The shop will confirm availability and delivery.' :
      'Demo checkout. Preview your order here; nothing is sent and no payment is taken.', 'fz-commerce-note'));
    if (cod || online) form.append(el('p', 'By submitting, you share these delivery details with ' + config.name + ' and its order service to process this order.', 'fz-commerce-note'));
    const status = el('p', '', 'fz-commerce-message'); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    const submit = el('button', cod ? 'Place COD order' : 'Preview COD order', 'fz-commerce-button'); submit.type = 'submit';
    form.append(status, submit);
    async function send(mode) {
      if (busy || !form.reportValidity() || !items().length) return;
      if (JSON.stringify(totals()) !== reviewedCart) {
        status.textContent = 'Your bag changed. Use Edit your bag to review the updated total before submitting.';
        return;
      }
      if ([...form.querySelectorAll('[required]')].some(input => !input.value.trim())) { status.textContent = 'Please complete every delivery field.'; return; }
      const order = orderFrom(form), target = mode === 'online' ? online : cod;
      if (!target) { showResult(order, false); return; }
      order.paymentMethod = mode === 'online' ? 'ONLINE' : 'COD';
      busy = true;
      dialog.querySelectorAll('button,input,textarea').forEach(node => node.disabled = true);
      status.textContent = mode === 'online' ? 'Opening secure payment…' : 'Sending your order…';
      const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 15000);
      try {
        // Only an explicit customer submission sends delivery data. Never store it in localStorage.
        const payload = mode === 'cod' && new URL(target).hostname === 'formspree.io'
          ? { email: order.email, name: order.name, phone: order.phone, message: orderText(order), orderId: order.orderId, _subject: config.name + ' COD ' + order.orderId }
          : order;
        const response = await fetch(target, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload), signal: controller.signal });
        const result = await response.json();
        if (!response.ok || result.ok !== true) throw new Error('Order service did not confirm receipt.');
        if (mode === 'online') {
          const destination = new URL(result.checkoutUrl);
          if (destination.protocol !== 'https:' || destination.username || destination.password || !(config.checkoutHosts || []).includes(destination.hostname)) throw new Error('Invalid payment destination.');
          // The server must price the order and verify a signed payment webhook. Never clear on redirect.
          location.assign(destination.href);
        } else {
          (adapter || internal).clear(); pendingOrder = null; showResult(order, true);
        }
      } catch {
        status.textContent = 'We could not confirm your order. Your bag is safe. Check with the shop using reference ' + order.orderId + ' before retrying.';
      } finally {
        clearTimeout(timeout); busy = false;
        dialog.querySelectorAll('button,input,textarea').forEach(node => node.disabled = false);
      }
    }
    form.addEventListener('submit', event => { event.preventDefault(); send('cod'); });
    if (online) form.append(button('Pay online securely', () => send('online'), 'fz-commerce-secondary'));
    content.append(form);
  }
  function showResult(order, submitted) {
    reset(submitted ? 'Order received' : 'Order preview');
    content.append(el('p', submitted ? 'Your COD request was received. The shop will confirm availability and delivery. No online payment was taken.' :
      'This is a preview. No order has been sent. Your items remain in the bag.'));
    const receipt = el('pre', orderText(order), 'fz-commerce-receipt'); content.append(receipt);
    content.append(button('Download order summary', () => {
      const url = URL.createObjectURL(new Blob([orderText(order)], { type: 'text/plain;charset=utf-8' }));
      const link = el('a'); link.href = url; link.download = order.orderId + '.txt'; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'fz-commerce-secondary'));
    content.append(button(submitted ? 'Continue shopping' : 'Back to your bag', submitted ? () => dialog.close() : showBag));
  }
  function productShelf(parent) {
    const shelf = el('div', undefined, 'fz-commerce-products');
    products.forEach(product => {
      const card = el('article', undefined, 'fz-commerce-product');
      card.append(el('h3', product.name), el('p', money(product.price)));
      let variant;
      if (product.variants?.length) {
        const label = el('label', 'Choose an option', 'fz-commerce-field'); variant = el('select');
        variant.setAttribute('aria-label', product.name + ' option');
        product.variants.forEach(value => { const option = el('option', value); option.value = value; variant.append(option); });
        label.append(variant); card.append(label);
      }
      card.append(button('Add to bag', () => add(product.id, variant?.value || ''), 'fz-commerce-button'));
      shelf.append(card);
    });
    parent.append(shelf);
  }
  function ready() {
    // aria-controls must resolve even before the first bag click.
    initDialog();
    if (adapter || config.nativeCollection) return;
    const target = $(config.collectionSelector || '#collection') || $('main');
    if (!target || !products.length) return;
    const section = el('section', undefined, 'fz-commerce-collection');
    section.setAttribute('aria-label', 'Shop the collection'); section.append(el('h2', 'Shop the collection'));
    productShelf(section); section.append(el('p', 'Sample products and prices. COD ordering becomes available when this shop connects its order service.', 'fz-commerce-note'));
    target.append(section);
    const fab = button('Bag ', () => open(), 'fz-commerce-fab');
    const count = el('b', '0'); count.dataset.fzCount = ''; fab.append(count); fab.setAttribute('aria-controls', 'fz-commerce-dialog'); document.body.append(fab);
    // A configured bike preserves the exact finish/wheels/saddle/handlebar selection.
    if (config.selectionSelector && $(config.selectionSelector)) {
      const current = button('Add this configuration to bag', () => {
        const selection = $(config.selectionSelector).textContent.trim();
        const product = products.find(p => selection.startsWith(p.name)); if (product) add(product.id, selection);
      }, 'fz-commerce-button fz-commerce-current');
      $(config.selectionSelector).after(current);
    }
    updateCount();
  }
  window.ForgeCommerce = {
    register: value => { adapter = value; },
    open: () => open(true),
    openBag: () => open(false),
    add,
    money
  };
  // Capture only checkout actions; existing cart, carousel, filters and animations stay active.
  window.addEventListener('click', event => {
    const action = event.target.closest(config.checkoutSelector || '[data-fz-checkout]');
    if (!action || busy) return;
    event.preventDefault(); event.stopImmediatePropagation(); open(true);
  }, true);
  window.addEventListener('storage', event => {
    if (adapter || event.key !== storageKey) return;
    try {
      const saved = JSON.parse(event.newValue || '[]');
      if (!Array.isArray(saved)) return;
      localCart = saved.filter(item => products.some(p => p.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99 && typeof item.variant === 'string' && item.variant.length <= 180);
      updateCount(); if (dialog?.open && !busy) showBag();
    } catch { /* Ignore malformed writes from another tab. */ }
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true }); else ready();
})();
