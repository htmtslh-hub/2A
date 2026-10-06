(() => {
  'use strict';
  const FREE_SHIPPING = 9900;
  const SHIPPING = 599;
  const STORAGE_KEY = 'diginest-cart-v1';
  const money = cents => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
  const cards = [...document.querySelectorAll('.product')];
  const catalog = new Map(cards.map(card => [card.dataset.id, {
    id: card.dataset.id, name: card.dataset.name, type: card.dataset.type,
    price: Number(card.dataset.price), category: card.dataset.category,
    sprite: Number(card.dataset.sprite)
  }]));
  const cartDialog = document.getElementById('cart');
  const cartToggle = document.querySelector('.cart-toggle');
  const cartLines = document.getElementById('cart-lines');
  const summary = document.querySelector('.cart-summary');
  const review = document.getElementById('checkout-review');
  const status = document.getElementById('cart-status');
  let cart = {};
  let category = 'all';
  let toastTimer;
  let returnFocus;
  let storageAvailable = true;
  let flightFrame = 0;
  let flyingCard;
  const motionJobs = new Map();
  let drawerProgress = 0;

  function tween(key, duration, draw, complete = () => {}) {
    cancelAnimationFrame(motionJobs.get(key));
    const started = performance.now();
    function frame(now) {
      const t = Math.min((now - started) / duration, 1);
      draw(1 - Math.pow(1 - t, 3));
      if (t < 1) motionJobs.set(key, requestAnimationFrame(frame));
      else { motionJobs.delete(key); complete(); }
    }
    frame(started);
  }

  function moveDrawer(open) {
    const from = drawerProgress;
    const to = open ? 1 : 0;
    tween(cartDialog, 340, t => {
      drawerProgress = from + (to - from) * t;
      cartDialog.style.transform = `translateX(${(1 - drawerProgress) * 100}%)`;
      cartDialog.style.setProperty('--cart-backdrop-opacity', String(drawerProgress * .8));
    }, () => {
      cartDialog.style.removeProperty('transform');
      if (!open) cartDialog.close();
    });
  }

  // Hover properties are separate from filtering transforms.
  cards.forEach(card => {
    const art = card.querySelector('.device');
    let amount = 0;
    function hover(active) {
      const from = amount;
      tween(art, 200, t => {
        amount = from + ((active ? 1 : 0) - from) * t;
        card.style.translate = `0 ${-5 * amount}px`;
        art.style.scale = String(1 + .045 * amount);
      }, () => {
        if (!active) { card.style.removeProperty('translate'); art.style.removeProperty('scale'); }
      });
    }
    card.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') hover(true); });
    card.addEventListener('pointerleave', () => hover(card.contains(document.activeElement)));
    card.addEventListener('focusin', () => hover(true));
    card.addEventListener('focusout', event => { if (!card.contains(event.relatedTarget)) hover(false); });
  });

  function stopFlight() {
    cancelAnimationFrame(flightFrame);
    flightFrame = 0;
    flyingCard?.remove();
    flyingCard = null;
    cartToggle.style.removeProperty('transform');
  }

  // Finite rAF motion also works when CSS/WAAPI animation is unavailable.
  function flyToCart(id, source, isBundle = false) {
    stopFlight();
    const item = catalog.get(id);
    const origin = source.closest('.product')?.querySelector('.product-art') || source;
    const rect = origin.getBoundingClientRect();
    const width = 124;
    const height = 156;
    const startX = Math.max(width / 2 + 8, Math.min(innerWidth - width / 2 - 8, rect.left + rect.width / 2));
    const startY = Math.max(height / 2 + 90, Math.min(innerHeight - height / 2 - 8, rect.top + rect.height / 2));
    const card = document.createElement('div');
    card.className = 'cart-flight';
    card.setAttribute('aria-hidden', 'true');
    const art = document.createElement('div');
    art.className = `device device-${item.sprite}`;
    const title = document.createElement('strong');
    title.textContent = isBundle ? 'Audio Duo' : item.name;
    const price = document.createElement('span');
    price.textContent = money(isBundle ? catalog.get('wave').price + catalog.get('sound').price : item.price);
    card.append(art, title, price);
    document.body.append(card);
    flyingCard = card;
    const started = performance.now();
    const duration = 850;
    function frame(now) {
      const t = Math.min((now - started) / duration, 1);
      const eased = t * t * (3 - 2 * t);
      const target = cartToggle.getBoundingClientRect();
      const endX = target.left + target.width / 2;
      const endY = target.top + target.height / 2;
      const x = startX + (endX - startX) * eased;
      const y = startY + (endY - startY) * eased - Math.sin(t * Math.PI) * Math.min(130, Math.abs(startY - endY) * .25);
      const scale = 1 - .87 * eased;
      card.style.transform = `translate3d(${x - width / 2}px, ${y - height / 2}px, 0) scale(${scale}) rotate(${-8 * Math.sin(t * Math.PI)}deg)`;
      card.style.opacity = String(t < .86 ? 1 : (1 - t) / .14);
      if (t < 1) { flightFrame = requestAnimationFrame(frame); return; }
      card.remove();
      flyingCard = null;
      const landed = performance.now();
      function pulse(time) {
        const p = Math.min((time - landed) / 240, 1);
        cartToggle.style.transform = `scale(${1 + Math.sin(p * Math.PI) * .18})`;
        if (p < 1) flightFrame = requestAnimationFrame(pulse);
        else { cartToggle.style.removeProperty('transform'); flightFrame = 0; }
      }
      flightFrame = requestAnimationFrame(pulse);
    }
    frame(started);
  }

  function notify(message) {
    const toast = document.getElementById('toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toastTimer = setTimeout(() => { toast.textContent = ''; }, 3200);
  }

  function cleanCart(value) {
    const clean = {};
    if (!value || typeof value !== 'object' || Array.isArray(value)) return clean;
    for (const [id, qty] of Object.entries(value)) {
      if (catalog.has(id) && Number.isInteger(qty) && qty > 0 && qty <= 99) clean[id] = qty;
    }
    return clean;
  }

  try { cart = cleanCart(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
  catch { storageAvailable = false; }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); storageAvailable = true; }
    catch { storageAvailable = false; }
  }

  function totals() {
    const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => sum + catalog.get(id).price * qty, 0);
    const shipping = count && subtotal < FREE_SHIPPING ? SHIPPING : 0;
    return { count, subtotal, shipping, total: subtotal + shipping };
  }

  function makeButton(text, label, action, id) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.setAttribute('aria-label', label);
    button.dataset.action = action;
    button.dataset.id = id;
    return button;
  }

  function render() {
    const { count, subtotal, shipping, total } = totals();
    document.getElementById('cart-count').textContent = count;
    document.getElementById('cart-title-count').textContent = `(${count})`;
    cartToggle.setAttribute('aria-label', `Open cart, ${count} ${count === 1 ? 'item' : 'items'}`);
    document.getElementById('cart-empty').hidden = count > 0;
    summary.hidden = count === 0;
    cartLines.replaceChildren();
    for (const [id, qty] of Object.entries(cart)) {
      const item = catalog.get(id);
      const line = document.createElement('div');
      line.className = 'cart-line';
      const art = document.createElement('div');
      art.className = `device device-${item.sprite}`;
      art.setAttribute('aria-hidden', 'true');
      const info = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = item.name;
      const price = document.createElement('p');
      price.textContent = `${money(item.price)} each`;
      const controls = document.createElement('div');
      controls.className = 'line-controls';
      const quantity = document.createElement('div');
      quantity.className = 'quantity';
      quantity.setAttribute('aria-label', `Quantity for ${item.name}`);
      const minus = makeButton('−', `Decrease ${item.name} quantity`, 'minus', id);
      minus.disabled = qty === 1;
      const number = document.createElement('span');
      number.textContent = qty;
      const plus = makeButton('+', `Increase ${item.name} quantity`, 'plus', id);
      plus.disabled = qty === 99;
      quantity.append(minus, number, plus);
      const remove = makeButton('Remove', `Remove ${item.name} from cart`, 'remove', id);
      remove.className = 'remove-item';
      controls.append(quantity, remove);
      const lineTotal = document.createElement('strong');
      lineTotal.className = 'line-total';
      lineTotal.textContent = money(item.price * qty);
      info.append(title, price, controls, lineTotal);
      line.append(art, info);
      cartLines.append(line);
    }
    document.getElementById('subtotal').textContent = money(subtotal);
    document.getElementById('shipping-total').textContent = shipping ? money(shipping) : 'Free';
    document.getElementById('total').textContent = money(total);
    document.getElementById('shipping-message').textContent = subtotal >= FREE_SHIPPING
      ? 'Your order qualifies for free shipping.' : `${money(FREE_SHIPPING - subtotal)} away from free shipping.`;
    if (!storageAvailable) status.textContent = 'Cart works for this visit. Browser storage is unavailable.';
  }

  function resetReview() {
    review.hidden = true;
    cartLines.hidden = false;
    document.getElementById('checkout').hidden = false;
  }

  function add(id, source) {
    if (!catalog.has(id)) return;
    if ((cart[id] || 0) >= 99) { notify('Maximum 99 of each product.'); return; }
    cart[id] = (cart[id] || 0) + 1;
    save();
    resetReview();
    render();
    flyToCart(id, source);
    notify(`${catalog.get(id).name} added to cart.${storageAvailable ? '' : ' Saved for this visit only.'}`);
  }

  document.querySelectorAll('[data-add]').forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => add(button.dataset.add, button));
  });
  const bundle = document.getElementById('add-bundle');
  bundle.disabled = false;
  bundle.addEventListener('click', () => {
    if ((cart.wave || 0) >= 99 || (cart.sound || 0) >= 99) { notify('Maximum quantity reached. Adjust your cart first.'); return; }
    cart.wave = (cart.wave || 0) + 1;
    cart.sound = (cart.sound || 0) + 1;
    save(); resetReview(); render();
    flyToCart('wave', bundle, true);
    notify('Audio duo added to your cart.');
  });
  cartToggle.disabled = false;
  cartToggle.addEventListener('click', () => {
    stopFlight();
    returnFocus = document.activeElement;
    resetReview(); render();
    cartDialog.showModal();
    drawerProgress = 0;
    moveDrawer(true);
    document.body.classList.add('cart-open');
    document.getElementById('close-cart').focus();
  });
  function closeCart() { if (cartDialog.open) moveDrawer(false); }
  cartDialog.addEventListener('cancel', event => { event.preventDefault(); closeCart(); });
  document.getElementById('close-cart').addEventListener('click', closeCart);
  document.getElementById('continue-shopping').addEventListener('click', closeCart);
  cartDialog.addEventListener('close', () => {
    cancelAnimationFrame(motionJobs.get(cartDialog));
    motionJobs.delete(cartDialog);
    drawerProgress = 0;
    cartDialog.style.removeProperty('transform');
    document.body.classList.remove('cart-open');
    if (returnFocus?.isConnected) returnFocus.focus();
  });
  cartDialog.addEventListener('click', event => {
    if (event.target !== cartDialog) return;
    const rect = cartDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right) closeCart();
  });
  cartLines.addEventListener('click', event => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const { id, action } = button.dataset;
    if (!cart[id]) return;
    if (action === 'plus' && cart[id] < 99) cart[id]++;
    if (action === 'minus' && cart[id] > 1) cart[id]--;
    if (action === 'remove') delete cart[id];
    save(); resetReview(); render();
    status.textContent = `${catalog.get(id).name} ${action === 'remove' ? 'removed' : `quantity ${cart[id]}`}. Total ${money(totals().total)}.`;
    const replacement = [...cartLines.querySelectorAll('button')].find(b => b.dataset.id === id && b.dataset.action === action && !b.disabled);
    (replacement || cartLines.querySelector('button:not(:disabled)') || document.getElementById('continue-shopping')).focus();
  });
  document.getElementById('checkout').addEventListener('click', () => {
    if (!totals().count) return;
    const t = totals();
    document.getElementById('review-summary').textContent = `${t.count} ${t.count === 1 ? 'item' : 'items'} · Subtotal ${money(t.subtotal)} · Shipping ${t.shipping ? money(t.shipping) : 'free'} · Total ${money(t.total)}. Taxes are not calculated in this demo.`;
    cartLines.hidden = true; review.hidden = false;
    document.getElementById('checkout').hidden = true;
    review.focus();
  });
  document.getElementById('back-to-cart').addEventListener('click', () => {
    resetReview(); document.getElementById('checkout').focus();
  });
  window.addEventListener('storage', event => {
    if (event.key !== STORAGE_KEY) return;
    try { cart = cleanCart(JSON.parse(event.newValue)); } catch { cart = {}; }
    resetReview(); render();
  });

  const search = document.getElementById('search');
  const filterBar = document.querySelector('.filter-bar');
  function filter() {
    const previous = new Map();
    cards.forEach(card => {
      cancelAnimationFrame(motionJobs.get(card));
      motionJobs.delete(card);
      card.style.removeProperty('transform');
      card.style.removeProperty('opacity');
      if (!card.hidden) previous.set(card, card.getBoundingClientRect());
    });
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const match = (category === 'all' || card.dataset.category === category)
        && `${card.dataset.name} ${card.dataset.type}`.toLowerCase().includes(query);
      card.hidden = !match;
      if (match) visible++;
    });
    filterBar.hidden = category === 'all' && !query;
    document.getElementById('filter-description').textContent = `${visible} ${visible === 1 ? 'product' : 'products'}${category === 'all' ? '' : ` · ${category}`}${query ? ` matching “${search.value.trim()}”` : ''}`;
    document.getElementById('no-results').hidden = visible > 0;
    document.querySelectorAll('.category').forEach(link => {
      if (link.dataset.filter === category) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    cards.filter(card => !card.hidden).forEach(card => {
      const after = card.getBoundingClientRect();
      const before = previous.get(card);
      const dx = before ? before.left - after.left : 0;
      const dy = before ? before.top - after.top : 22;
      tween(card, 320, t => {
        card.style.transform = `translate(${dx * (1 - t)}px, ${dy * (1 - t)}px)`;
        card.style.opacity = String(before ? 1 : .25 + .75 * t);
      }, () => {
        card.style.removeProperty('transform');
        card.style.removeProperty('opacity');
      });
    });
  }
  document.querySelectorAll('[data-filter]').forEach(link => link.addEventListener('click', () => {
    category = link.dataset.filter; search.value = ''; filter();
  }));
  search.addEventListener('input', filter);
  document.getElementById('clear-filter').addEventListener('click', () => { category = 'all'; search.value = ''; filter(); });
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target?.tagName === 'DETAILS') target.open = true;
  }));

  const header = document.querySelector('.header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('navigation');
  const mobile = matchMedia('(max-width: 850px)');
  header.classList.add('js-ready');
  function closeMenu(focus = false) {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    if (focus) menuButton.focus();
  }
  menuButton.hidden = false;
  function syncMenu() { closeMenu(); }
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) closeMenu(true);
  });
  mobile.addEventListener('change', syncMenu);
  window.addEventListener('pagehide', () => {
    stopFlight();
    motionJobs.forEach(frame => cancelAnimationFrame(frame));
    motionJobs.clear();
  });
  syncMenu(); render();
})();
