(function () {
  'use strict';
  var root = document.documentElement;
  var menu = document.getElementById('site-nav');
  var menuButton = document.querySelector('.nav-toggle');
  var mobile = window.matchMedia('(max-width: 650px)');
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
  var slides = [
    { word: 'coffee.', ghost: 'coffee', description: 'Freshly roasted. Lovingly brewed.\nYour daily pause, made a little better.' },
    { word: 'matcha.', ghost: 'matcha', description: 'A little green. A little calm.\nMeet your cool afternoon companion.' },
    { word: 'a treat.', ghost: 'bakes', description: 'Golden layers. Buttery goodness.\nA little happiness, fresh from the oven.' }
  ];
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
  products.forEach(function (product, i) { product._motion = i === 0 ? [1, 0, 0, 0, 1] : [0, 70, 0, 8, .92]; });
  var copy = document.querySelector('.hero__copy');
  function showSlide(index, direction) {
    var next = (index + slides.length) % slides.length;
    if (next === current) return;
    current = next;
    products.forEach(function (product, i) {
      product.classList.toggle('is-active', i === next);
      if (i === next) {
        var start = product._motion[0] > .01 ? product._motion : [0, 130 * direction, 25, 10 * direction, .9];
        move(product, start, [1, 0, 0, 0, 1], 950);
      } else if (product._motion[0] > 0 || jobs.has(product)) {
        move(product, product._motion, [0, -110 * direction, -20, -8 * direction, .93], 650);
      }
    });
    document.getElementById('hero-word').textContent = slides[next].word;
    var description = document.getElementById('hero-description'); description.replaceChildren();
    slides[next].description.split('\n').forEach(function (line, i) {
      if (i) description.appendChild(document.createElement('br'));
      description.appendChild(document.createTextNode(line));
    });
    document.querySelector('.hero__ghost').textContent = slides[next].ghost;
    document.getElementById('slide-status').textContent = 'Featured: ' + slides[next].ghost;
    picks.forEach(function (pick, i) { pick.setAttribute('aria-pressed', String(i === next)); });
    move(copy, [1, 0, 18, 0, 1], [1, 0, 0, 0, 1], 700);
    schedule();
  }
  picks.forEach(function (pick) { pick.addEventListener('click', function () { var next = Number(pick.dataset.go); showSlide(next, next > current ? 1 : -1); }); });
  document.querySelectorAll('[data-step]').forEach(function (button) { button.addEventListener('click', function () { var direction = Number(button.dataset.step); showSlide(current + direction, direction); }); });
  hero.addEventListener('keydown', function (event) {
    if (event.target !== hero) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); var direction = event.key === 'ArrowRight' ? 1 : -1; showSlide(current + direction, direction); }
  });
  var touchX = null;
  hero.addEventListener('touchstart', function (event) { touchX = event.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', function (event) {
    if (touchX === null) return;
    var delta = event.changedTouches[0].clientX - touchX;
    if (Math.abs(delta) > 55) showSlide(current + (delta < 0 ? 1 : -1), delta < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });
  var timer = 0;
  var visible = true;
  var hovering = false;
  function schedule() {
    clearTimeout(timer);
    if (!paused && visible && !hovering && !hero.contains(document.activeElement) && !document.hidden) timer = setTimeout(function () { showSlide(current + 1, 1); }, 6500);
  }
  hero.addEventListener('mouseenter', function () { hovering = true; schedule(); });
  hero.addEventListener('mouseleave', function () { hovering = false; schedule(); });
  hero.addEventListener('focusin', schedule);
  hero.addEventListener('focusout', function () { setTimeout(schedule, 0); });
  document.addEventListener('visibilitychange', schedule);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; schedule(); }).observe(hero);
  var motionButton = document.querySelector('.motion-toggle');
  motionButton.addEventListener('click', function () {
    paused = !paused;
    root.classList.toggle('motion-paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.textContent = paused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
    if (paused) {
      resetHover();
      stopCosmos();
      jobs.forEach(function (id) { cancelAnimationFrame(id); }); jobs.clear();
      products.forEach(function (product, i) { product._motion = [i === current ? 1 : 0, 0, 0, 0, 1]; product.style.opacity = i === current ? 1 : 0; product.style.transform = 'none'; });
      copy.style.opacity = 1; copy.style.transform = 'none';
      document.querySelectorAll('.is-waiting').forEach(function (item) { item.classList.remove('is-waiting'); });
    }
    schedule();
  });
  // Hover uses individual transform properties, independent of slide transforms.
  // Retarget from the current position on every input, then stop at the endpoint.
  var hoverItems = [];
  function hoverItem(element, depth, turn, zoom) {
    var item = { element: element, depth: depth, turn: turn, zoom: zoom, state: [0, 0, 0, 1], frame: 0 };
    hoverItems.push(item);
    return item;
  }
  function hoverTo(item, x, y, active, instant) {
    cancelAnimationFrame(item.frame);
    var from = item.state.slice();
    var to = active ? [x * item.depth, y * item.depth * .65 - 7, x * item.turn, item.zoom] : [0, 0, 0, 1];
    var start = performance.now();
    function tick(now) {
      var progress = instant ? 1 : Math.min(1, (now - start) / 360);
      var ease = 1 - Math.pow(1 - progress, 3);
      item.state = from.map(function (value, i) { return value + (to[i] - value) * ease; });
      item.element.style.translate = item.state[0] + 'px ' + item.state[1] + 'px';
      item.element.style.rotate = item.state[2] + 'deg';
      item.element.style.scale = item.state[3];
      item.frame = progress < 1 ? requestAnimationFrame(tick) : 0;
    }
    if (instant) tick(start); else item.frame = requestAnimationFrame(tick);
  }
  function resetHover() { hoverItems.forEach(function (item) { hoverTo(item, 0, 0, false, true); }); }
  var heroHover = products.map(function (product) { return hoverItem(product, 52, 7, 1.025); });
  document.querySelectorAll('.bean').forEach(function (bean, i) { heroHover.push(hoverItem(bean, [90, -70, 110][i], [24, -20, 30][i], 1.08)); });
  heroHover.push(hoverItem(document.querySelector('.hero__orbit'), -22, -9, 1));
  hero.addEventListener('pointermove', function (event) {
    if (paused || event.pointerType !== 'mouse') return;
    var box = hero.getBoundingClientRect();
    var x = Math.max(-.5, Math.min(.5, (event.clientX - box.left) / box.width - .5));
    var y = Math.max(-.5, Math.min(.5, (event.clientY - box.top) / box.height - .5));
    heroHover.forEach(function (item) { hoverTo(item, x, y, true, false); });
  });
  hero.addEventListener('pointerleave', function () { heroHover.forEach(function (item) { hoverTo(item, 0, 0, false, paused); }); });
  document.querySelectorAll('.menu-item__image, .story__art').forEach(function (surface) {
    var item = hoverItem(surface.querySelector('img'), 32, 9, 1.065);
    surface.addEventListener('pointermove', function (event) {
      if (paused || event.pointerType !== 'mouse') return;
      var box = surface.getBoundingClientRect();
      hoverTo(item, (event.clientX - box.left) / box.width - .5, (event.clientY - box.top) / box.height - .5, true, false);
    });
    surface.addEventListener('pointerleave', function () { hoverTo(item, 0, 0, false, paused); });
  });
  // Antigravity-inspired field: coloured dashes repel and curl around the pointer.
  // Each particle has a spring home. Rendering stops after a finite settling window.
  var starCanvas = document.createElement('canvas');
  starCanvas.className = 'cosmic-stars';
  starCanvas.setAttribute('aria-hidden', 'true');
  var aura = document.createElement('div');
  aura.className = 'cosmic-aura';
  aura.setAttribute('aria-hidden', 'true');
  hero.prepend(starCanvas, aura);
  var sky = starCanvas.getContext('2d');
  var stars = [];
  var particleColours = ['255,213,133', '255,242,215', '151,185,255', '187,157,255', '243,158,156'];
  var cosmicFrame = 0;
  var cosmicLast = 0;
  var cosmicUntil = 0;
  var cosmicPoint = { x: 0, y: 0, targetX: 0, targetY: 0 };
  var cosmicWidth = 1;
  var cosmicHeight = 1;
  function drawCosmos(now, energy) {
    if (!sky) return;
    sky.clearRect(0, 0, cosmicWidth, cosmicHeight);
    stars.forEach(function (star) {
      var speed = Math.hypot(star.vx, star.vy);
      var displaced = Math.min(1, Math.hypot(star.x - star.homeX, star.y - star.homeY) / 45);
      var angle = speed > .05 ? Math.atan2(star.vy, star.vx) : star.angle;
      var length = star.size + Math.min(5, speed * .7) + displaced * 1.8;
      sky.strokeStyle = 'rgba(' + star.colour + ',' + (.22 + displaced * .5) + ')';
      sky.lineWidth = star.size;
      sky.lineCap = 'round';
      sky.beginPath();
      sky.moveTo(star.x, star.y);
      sky.lineTo(star.x + Math.cos(angle) * length, star.y + Math.sin(angle) * length);
      sky.stroke();
    });
  }
  function cosmicTick(now) {
    var delta = Math.min(2, (now - cosmicLast) / 16.667 || 1);
    cosmicLast = now;
    cosmicPoint.x += (cosmicPoint.targetX - cosmicPoint.x) * .18;
    cosmicPoint.y += (cosmicPoint.targetY - cosmicPoint.y) * .18;
    var energy = paused ? 0 : Math.max(0, Math.min(1, (cosmicUntil - now) / 700));
    aura.style.translate = cosmicPoint.x + 'px ' + cosmicPoint.y + 'px';
    aura.style.opacity = energy * .18;
    stars.forEach(function (star) {
      var dx = star.x - cosmicPoint.x;
      var dy = star.y - cosmicPoint.y;
      var distance = Math.max(1, Math.hypot(dx, dy));
      var force = Math.pow(Math.max(0, 1 - distance / 230), 2) * energy * 3.5;
      // Radial repulsion plus a gentle tangential force gives the lifting swirl.
      star.vx += ((dx / distance - dy / distance * .65) * force + (star.homeX - star.x) * .035) * delta;
      star.vy += ((dy / distance + dx / distance * .65) * force + (star.homeY - star.y) * .035) * delta;
      var damping = Math.pow(.8, delta);
      star.vx *= damping; star.vy *= damping;
      star.x += star.vx * delta; star.y += star.vy * delta;
    });
    if (!energy) {
      stars.forEach(function (star) { star.x = star.homeX; star.y = star.homeY; star.vx = 0; star.vy = 0; });
    }
    drawCosmos(now, energy);
    cosmicFrame = energy > 0 ? requestAnimationFrame(cosmicTick) : 0;
  }
  function stopCosmos() {
    cancelAnimationFrame(cosmicFrame); cosmicFrame = 0;
    cosmicUntil = 0; aura.style.opacity = 0;
    stars.forEach(function (star) { star.x = star.homeX; star.y = star.homeY; star.vx = 0; star.vy = 0; });
    drawCosmos(performance.now(), 0);
  }
  function sizeCosmos() {
    var box = hero.getBoundingClientRect();
    cosmicWidth = box.width; cosmicHeight = box.height;
    // A jittered field, not a visible grid. Density scales with the hero size.
    stars = [];
    for (var y = 12; y < cosmicHeight; y += 34) {
      for (var x = 12; x < cosmicWidth; x += 34) {
        var homeX = x + (Math.random() - .5) * 28;
        var homeY = y + (Math.random() - .5) * 28;
        stars.push({ homeX: homeX, homeY: homeY, x: homeX, y: homeY, vx: 0, vy: 0,
          size: .6 + Math.random() * .65, angle: Math.random() * Math.PI * 2,
          colour: particleColours[Math.floor(Math.random() * particleColours.length)] });
      }
    }
    var ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    starCanvas.width = Math.round(box.width * ratio); starCanvas.height = Math.round(box.height * ratio);
    if (sky) sky.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawCosmos(performance.now(), 0);
  }
  sizeCosmos();
  if ('ResizeObserver' in window) new ResizeObserver(sizeCosmos).observe(hero);
  else window.addEventListener('resize', sizeCosmos);
  hero.addEventListener('pointermove', function (event) {
    if (paused || event.pointerType !== 'mouse') return;
    var box = hero.getBoundingClientRect();
    var now = performance.now();
    cosmicPoint.targetX = event.clientX - box.left;
    cosmicPoint.targetY = event.clientY - box.top;
    if (!cosmicFrame) { cosmicPoint.x = cosmicPoint.targetX; cosmicPoint.y = cosmicPoint.targetY; cosmicLast = now; }
    cosmicUntil = now + 1500;
    if (!cosmicFrame) cosmicFrame = requestAnimationFrame(cosmicTick);
  });
  hero.addEventListener('pointerleave', function () { cosmicUntil = Math.min(cosmicUntil, performance.now() + 550); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) stopCosmos(); });
  move(copy, [1, 0, 22, 0, 1], [1, 0, 0, 0, 1], 1000);
  move(products[0], [0, 70, 30, 8, .94], [1, 0, 0, 0, 1], 1300);
  schedule();
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.remove('is-waiting'); observer.unobserve(entry.target); } }); }, { threshold: .08 });
    reveals.forEach(function (item) { item.classList.add('is-waiting'); observer.observe(item); });
    setTimeout(function () { reveals.forEach(function (item) { item.classList.remove('is-waiting'); }); }, 4500);
  }
  document.querySelectorAll('[data-filter]').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('[data-filter]').forEach(function (tab) { tab.setAttribute('aria-pressed', String(tab === button)); });
      document.querySelectorAll('.menu-item').forEach(function (item) {
        item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter;
        if (!item.hidden) move(item, [0, 0, 16, 0, 1], [1, 0, 0, 0, 1], 500);
      });
    });
  });
  var catalogue = { espresso: { name: 'House espresso', price: 450 }, matcha: { name: 'Iced matcha', price: 600 }, croissant: { name: 'Butter croissant', price: 380 } };
  var bag = {};
  try {
    var stored = JSON.parse(localStorage.getItem('mellow-bag') || '{}');
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
    enquiry.href = 'mailto:hello@mellow.example?subject=' + encodeURIComponent('Mellow menu enquiry') + '&body=' + encodeURIComponent('Hello! I would like to enquire about:\n' + lines.join('\n') + '\nSample total: ' + money(total) + '\nPlease confirm availability and collection details.');
    try { localStorage.setItem('mellow-bag', JSON.stringify(bag)); } catch (error) { /* Memory-only fallback. */ }
  }
  var toastTimer;
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
    if (event.key !== 'mellow-bag') return;
    try { var data = JSON.parse(event.newValue || '{}'); bag = {}; Object.keys(catalogue).forEach(function (key) { if (Number.isInteger(data[key]) && data[key] > 0) bag[key] = Math.min(99, data[key]); }); updateBag(); } catch (error) { /* Ignore malformed entries. */ }
  });
  updateBag();
}());
