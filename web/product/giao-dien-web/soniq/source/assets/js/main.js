(function () {
  'use strict';
  var root = document.documentElement;
  var menu = document.getElementById('site-nav');
  var menuButton = document.querySelector('.nav-toggle');
  var mobile = window.matchMedia('(max-width: 950px)');
  var paused = false;
  root.classList.add('js');
  function closeMenu(restore) {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (restore) menuButton.focus();
  }
  menuButton.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', function (event) { if (event.target.closest('a')) closeMenu(false); });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && menu.classList.contains('is-open')) closeMenu(true); });
  mobile.addEventListener('change', function () { closeMenu(false); });
  var hero = document.querySelector('.hero');
  var products = Array.from(document.querySelectorAll('.hero__product'));
  var picks = Array.from(document.querySelectorAll('[data-go]'));
  var current = 0;
  var jobs = new Map();
  /* Finite RAF fallback; new input cancels old work at its current position. */
  function move(element, from, to, duration, done) {
    if (jobs.has(element)) cancelAnimationFrame(jobs.get(element));
    var started = performance.now();
    function frame(now) {
      var progress = paused ? 1 : Math.min(1, (now - started) / duration);
      var ease = 1 - Math.pow(1 - progress, 4);
      var state = from.map(function (value, i) { return value + (to[i] - value) * ease; });
      element._motion = state;
      element.style.opacity = state[0];
      element.style.transform = 'translate3d(' + state[1] + 'px,' + state[2] + 'px,0) rotate(' + state[3] + 'deg) scale(' + state[4] + ')';
      if (progress < 1) jobs.set(element, requestAnimationFrame(frame));
      else { jobs.delete(element); if (done) done(); }
    }
    jobs.set(element, requestAnimationFrame(frame));
  }
  var colours = ['Graphite', 'Ivory', 'Cobalt'];
  var keys = ['graphite', 'ivory', 'cobalt'];
  products.forEach(function (product, i) { product._motion = i === 0 ? [1, 0, 0, 0, 1] : [0, 100, 0, 9, .94]; });
  var copy = document.querySelector('.hero__copy');
  function select(index, direction) {
    var next = (index + products.length) % products.length;
    if (next === current) return;
    current = next;
    products.forEach(function (product, i) {
      product.classList.toggle('is-active', i === next);
      if (i === next) {
        var start = product._motion[0] > .01 ? product._motion : [0, 190 * direction, 16, 12 * direction, .9];
        move(product, start, [1, 0, 0, 0, 1], 950);
      } else if (product._motion[0] > 0 || jobs.has(product)) {
        move(product, product._motion, [0, -160 * direction, -20, -10 * direction, .9], 650);
      }
    });
    picks.forEach(function (pick, i) { pick.setAttribute('aria-pressed', String(i === next)); });
    document.querySelector('.hero__count').textContent = '0' + (next + 1) + ' / 03';
    document.getElementById('colour-name').textContent = colours[next].toUpperCase();
    document.getElementById('slide-status').textContent = 'Selected colour: ' + colours[next];
    document.querySelector('[data-buy-current]').dataset.product = keys[next];
    move(document.querySelector('.hero__label'), [1, 0, 12, 0, 1], [1, 0, 0, 0, 1], 600);
    schedule();
  }
  picks.forEach(function (pick) { pick.addEventListener('click', function () { var next = Number(pick.dataset.go); select(next, next > current ? 1 : -1); }); });
  document.querySelectorAll('[data-step]').forEach(function (button) { button.addEventListener('click', function () { var step = Number(button.dataset.step); select(current + step, step); }); });
  hero.addEventListener('keydown', function (event) {
    if (event.target !== hero) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); var step = event.key === 'ArrowRight' ? 1 : -1; select(current + step, step); }
  });
  var touchX = null;
  hero.addEventListener('touchstart', function (event) { touchX = event.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', function (event) {
    if (touchX === null) return;
    var delta = event.changedTouches[0].clientX - touchX;
    if (Math.abs(delta) > 55) select(current + (delta < 0 ? 1 : -1), delta < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });
  var timer = 0;
  var visible = true;
  var hovering = false;
  function schedule() {
    clearTimeout(timer);
    if (!paused && visible && !hovering && !hero.contains(document.activeElement) && !document.hidden) timer = setTimeout(function () { select(current + 1, 1); }, 6500);
  }
  hero.addEventListener('mouseenter', function () { hovering = true; schedule(); });
  hero.addEventListener('mouseleave', function () { hovering = false; schedule(); });
  hero.addEventListener('focusin', schedule);
  hero.addEventListener('focusout', function () { setTimeout(schedule, 0); });
  document.addEventListener('visibilitychange', schedule);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; schedule(); }).observe(hero);
  // Independent hover transforms cannot overwrite the carousel transform.
  var hoverFrame = 0;
  var hoverState = [0, 0, 0];
  function tilt(x, y, instant) {
    cancelAnimationFrame(hoverFrame);
    var from = hoverState.slice();
    var to = [x * 40, y * 25, x * 7];
    var start = performance.now();
    function tick(now) {
      var p = instant ? 1 : Math.min(1, (now - start) / 400);
      var ease = 1 - Math.pow(1 - p, 3);
      hoverState = from.map(function (value, i) { return value + (to[i] - value) * ease; });
      products.forEach(function (product) { product.style.translate = hoverState[0] + 'px ' + hoverState[1] + 'px'; product.style.rotate = hoverState[2] + 'deg'; });
      hoverFrame = p < 1 ? requestAnimationFrame(tick) : 0;
    }
    if (instant) tick(start); else hoverFrame = requestAnimationFrame(tick);
  }
  hero.addEventListener('pointermove', function (event) {
    if (paused || event.pointerType !== 'mouse') return;
    var box = hero.getBoundingClientRect();
    tilt((event.clientX - box.left) / box.width - .5, (event.clientY - box.top) / box.height - .5, false);
  });
  hero.addEventListener('pointerleave', function () { tilt(0, 0, paused); });
  var motionButton = document.querySelector('.motion-toggle');
  motionButton.addEventListener('click', function () {
    paused = !paused;
    root.classList.toggle('motion-paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.textContent = paused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
    if (paused) {
      jobs.forEach(function (id) { cancelAnimationFrame(id); }); jobs.clear();
      products.forEach(function (product, i) { product._motion = [i === current ? 1 : 0, 0, 0, 0, 1]; product.style.opacity = i === current ? 1 : 0; product.style.transform = 'none'; });
      tilt(0, 0, true);
      document.querySelectorAll('.is-waiting').forEach(function (item) { item.classList.remove('is-waiting'); });
    }
    schedule();
  });
  move(products[0], [0, 80, 25, 9, .94], [1, 0, 0, 0, 1], 1200);
  move(copy, [1, 0, 20, 0, 1], [1, 0, 0, 0, 1], 900);
  schedule();
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.remove('is-waiting'); observer.unobserve(entry.target); } }); }, { threshold: .08 });
    reveals.forEach(function (item) { item.classList.add('is-waiting'); observer.observe(item); });
    setTimeout(function () { reveals.forEach(function (item) { item.classList.remove('is-waiting'); }); }, 4500);
  }
  var catalogue = { graphite: { name: 'Soniq One — Graphite', price: 14900 }, ivory: { name: 'Soniq One — Ivory', price: 14900 }, cobalt: { name: 'Soniq One — Cobalt', price: 14900 } };
  var bag = {};
  try {
    var stored = JSON.parse(localStorage.getItem('soniq-bag') || '{}');
    Object.keys(catalogue).forEach(function (key) { if (Number.isInteger(stored[key]) && stored[key] > 0) bag[key] = Math.min(99, stored[key]); });
  } catch (error) { /* Storage unavailable: memory-only fallback. */ }
  var dialog = document.getElementById('bag');
  var bagButton = document.querySelector('.bag-toggle');
  var list = document.querySelector('.bag__items');
  function money(cents) { return '$' + (cents / 100).toFixed(2); }
  function updateBag() {
    var quantity = 0;
    var total = 0;
    var lines = [];
    list.replaceChildren();
    Object.keys(bag).forEach(function (key) {
      var product = catalogue[key];
      quantity += bag[key]; total += product.price * bag[key];
      lines.push(bag[key] + ' × ' + product.name + ' (' + money(product.price * bag[key]) + ')');
      var row = document.createElement('li');
      var name = document.createElement('strong'); name.textContent = product.name;
      var price = document.createElement('span'); price.textContent = money(product.price * bag[key]);
      var controls = document.createElement('div'); controls.className = 'bag__quantity';
      [-1, 1].forEach(function (delta) {
        var button = document.createElement('button'); button.type = 'button'; button.textContent = delta < 0 ? '−' : '+';
        button.setAttribute('aria-label', (delta < 0 ? 'Remove one ' : 'Add one ') + product.name);
        button.dataset.bagKey = key; button.dataset.delta = delta;
        controls.appendChild(button);
        if (delta < 0) { var count = document.createElement('span'); count.textContent = bag[key]; controls.appendChild(count); }
      });
      row.append(name, price, controls); list.appendChild(row);
    });
    document.querySelector('.bag-count').textContent = quantity;
    bagButton.setAttribute('aria-label', 'Open bag, ' + quantity + ' items');
    document.querySelector('.bag__total b').textContent = money(total);
    document.querySelector('.bag__empty').hidden = quantity > 0;
    document.querySelector('.bag__total').hidden = !quantity;
    var enquiry = document.querySelector('.bag__enquiry'); enquiry.hidden = !quantity;
    enquiry.href = 'mailto:hello@soniq.example?subject=' + encodeURIComponent('Soniq headphone enquiry') + '&body=' + encodeURIComponent('Hello! I would like to enquire about:\n' + lines.join('\n') + '\nSample total: ' + money(total) + '\nPlease confirm availability and ordering details.');
    try { localStorage.setItem('soniq-bag', JSON.stringify(bag)); } catch (error) { /* Memory-only fallback. */ }
  }
  var toastTimer;
  var heroBuy = document.querySelector('[data-buy-current]');
  heroBuy.dataset.product = 'graphite';
  document.querySelectorAll('[data-product]').forEach(function (button) {
    button.addEventListener('click', function () {
      var key = button.dataset.product;
      bag[key] = Math.min(99, (bag[key] || 0) + 1); updateBag();
      var toast = document.querySelector('.toast'); toast.textContent = catalogue[key].name + ' added to your bag'; toast.classList.add('is-visible');
      clearTimeout(toastTimer); toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2200);
    });
  });
  list.addEventListener('click', function (event) {
    var button = event.target.closest('[data-bag-key]'); if (!button) return;
    var key = button.dataset.bagKey; var delta = Number(button.dataset.delta);
    bag[key] = Math.min(99, bag[key] + delta); if (!bag[key]) delete bag[key]; updateBag();
    var replacement = list.querySelector('[data-bag-key="' + key + '"][data-delta="' + delta + '"]');
    (replacement || document.querySelector('.bag-close')).focus();
  });
  bagButton.addEventListener('click', function () {
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
    move(dialog, [0, 70, 0, 0, 1], [1, 0, 0, 0, 1], 500);
  });
  function closeBag() { if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open'); bagButton.focus(); }
  document.querySelector('.bag-close').addEventListener('click', closeBag);
  dialog.addEventListener('click', function (event) { if (event.target === dialog) { var box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right) closeBag(); } });
  dialog.addEventListener('cancel', function () { bagButton.focus(); });
  window.addEventListener('storage', function (event) {
    if (event.key !== 'soniq-bag') return;
    try { var data = JSON.parse(event.newValue || '{}'); bag = {}; Object.keys(catalogue).forEach(function (key) { if (Number.isInteger(data[key]) && data[key] > 0) bag[key] = Math.min(99, data[key]); }); updateBag(); } catch (error) { /* Ignore malformed entries. */ }
  });
  updateBag();
}());
