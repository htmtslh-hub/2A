/* Watchroom: finite frame-based motion, local-only shortlist, no dependencies. */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const products = [
    { name: 'QUANTUM ADG', price: 899, description: 'A sculptural chronograph. Midnight blue meets the warmth of rose gold.', strap: '#112c48', dial: '#163452', metal: '#e7b89b', case: 'Polished edges. A warm rose-gold finish.' },
    { name: 'ONYX GMT', price: 749, description: 'A darker expression. Brushed steel frames a dial in deep onyx.', strap: '#191d24', dial: '#1c242d', metal: '#bfc6cd', case: 'Polished edges. A cool brushed-steel finish.' },
    { name: 'SOLARIS 38', price: 829, description: 'Forest green, lit by champagne gold. A quieter statement on the wrist.', strap: '#123b33', dial: '#163d34', metal: '#dfc295', case: 'Polished edges. A soft champagne-gold finish.' },
  ];
  let current = 0;
  let paused = false;
  let slideFrame = 0;
  let pointerFrame = 0;
  let introFrame = 0;
  let lightFrame = 0;
  let sceneFrame = 0;
  let selected = 0;
  let saved = [];
  let category = 'all';
  let opener;
  try {
    const stored = JSON.parse(localStorage.getItem('watchroom-desired') || '[]');
    if (Array.isArray(stored)) saved = stored.filter((i) => Number.isInteger(i) && i >= 0 && i < products.length);
  } catch { /* Local file and private mode fall back to session memory. */ }
  const wrap = $('.watch-wrap');
  const copy = $('.hero__copy');
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const light = $('.stage__light');
  const images = $$('[data-watch]');
  const imagePoses = images.map((_, i) => ({ x: 0, rotation: -18, scale: 1, opacity: i === 0 ? 1 : 0 }));
  function paintImage(index, pose) {
    imagePoses[index] = pose;
    const image = images[index];
    image.style.transform = `translateX(${pose.x}px) rotate(${pose.rotation}deg) scale(${pose.scale})`;
    image.style.opacity = String(pose.opacity);
  }
  function settleImages(index) {
    images.forEach((image, i) => {
      image.classList.remove('is-moving');
      image.classList.toggle('is-active', i === index);
      image.setAttribute('aria-hidden', String(i !== index));
      paintImage(i, { x: 0, rotation: -18, scale: 1, opacity: i === index ? 1 : 0 });
    });
  }
  function animateLightFallback() {
    cancelAnimationFrame(lightFrame);
    if (paused || (light.getAnimations && light.getAnimations({ subtree: true }).some(a => a.playState === 'running'))) return;
    // A finite pulse covers browsers or stylesheets that disable CSS animations.
    const start = performance.now();
    const frame = (now) => {
      const t = Math.min(1, (now - start) / 4800);
      const pulse = Math.sin(t * Math.PI);
      light.style.setProperty('--glow-opacity', String(.45 + pulse * .5));
      light.style.setProperty('--glow-scale', String(.88 + pulse * .24));
      if (t < 1 && !paused) lightFrame = requestAnimationFrame(frame);
      else lightFrame = 0;
    };
    lightFrame = requestAnimationFrame(frame);
  }

  function saveState() {
    try { localStorage.setItem('watchroom-desired', JSON.stringify(saved)); } catch { /* Memory still works. */ }
    $('[data-save]').setAttribute('aria-pressed', String(saved.includes(current)));
    $('[data-save]').textContent = saved.includes(current) ? 'DESIRED ✓' : 'DESIRED';
    const list = $('.saved-items');
    list.replaceChildren();
    saved.forEach((index) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = products[index].name;
      link.href = 'mailto:hello@watchroom.example?subject=' + encodeURIComponent('Enquiry about ' + products[index].name);
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', 'Remove ' + products[index].name);
      remove.addEventListener('click', () => {
        saved = saved.filter((i) => i !== index);
        saveState();
        ($('.saved-items button') || $('[data-close-saved]')).focus();
      });
      item.append(link, remove);
      list.append(item);
    });
    $('.saved-empty').hidden = saved.length > 0;
  }

  function setProduct(index, settle = true) {
    current = index;
    const p = products[current];
    $('.showroom').dataset.tone = String(current);
    $('.hero__model-code').textContent = ['WR — 001 / CHRONOGRAPH', 'WR — 002 / GMT', 'WR — 003 / CHRONOGRAPH'][current];
    $('.hero__finish').textContent = ['ROSE GOLD / MIDNIGHT BLUE', 'BRUSHED STEEL / ONYX BLACK', 'CHAMPAGNE GOLD / FOREST GREEN'][current];
    $('.next-preview img').src = images[(current + 1) % images.length].getAttribute('src');
    $('.next-preview strong').textContent = products[(current + 1) % products.length].name;
    $('#hero-title').textContent = p.name;
    $('.hero__price').textContent = p.price + ' €';
    $('.hero__description').textContent = p.description;
    $('.hero__count').textContent = String(current + 1).padStart(2, '0') + ' / 03';
    $('.hero__index span').textContent = String(current + 1).padStart(2, '0');
    $('.hero__progress span').style.transform = `translateX(${current * 100}%)`;
    $('.current-enquiry').href = 'mailto:hello@watchroom.example?subject=' + encodeURIComponent('Enquiry about ' + p.name);
    $('#case-detail').lastChild.textContent = p.case;
    if (settle) settleImages(current);
    $('#slide-status').textContent = p.name + ', ' + p.price + ' euros';
    saveState();
  }

  function resetPose() {
    wrap.style.transform = '';
    wrap.style.opacity = '';
    copy.style.transform = '';
    copy.style.opacity = '';
  }

  function change(step) {
    animateLightFallback();
    cancelAnimationFrame(slideFrame);
    cancelAnimationFrame(pointerFrame);
    cancelAnimationFrame(introFrame);
    resetPose();
    const target = (selected + step + products.length) % products.length;
    selected = target;
    if (paused) { setProduct(target); return; }
    const travel = $('.stage').clientWidth * .72;
    images.forEach((image, i) => {
      if (i === target && imagePoses[i].opacity < .01) {
        paintImage(i, { x: step * travel, rotation: -18 + step * 24, scale: .78, opacity: 0 });
      }
      image.classList.add('is-moving');
      image.setAttribute('aria-hidden', String(i !== target));
    });
    const starts = imagePoses.map(p => ({ ...p }));
    const from = performance.now();
    let switched = false;
    const frame = (now) => {
      const t = Math.min(1, (now - from) / 1250);
      const progress = t * t * (3 - 2 * t);
      images.forEach((_, i) => {
        const end = i === target ? { x: 0, rotation: -18, scale: 1, opacity: 1 } : { x: -step * travel, rotation: -18 - step * 22, scale: .72, opacity: 0 };
        const pose = {};
        for (const key of Object.keys(end)) pose[key] = starts[i][key] + (end[key] - starts[i][key]) * progress;
        paintImage(i, pose);
      });
      if (t >= .22 && !switched) { setProduct(target, false); switched = true; }
      const amount = t < .22 ? t / .22 : 1 - ease(Math.min(1, (t - .22) / .6));
      copy.style.transform = `translateY(${amount * 24}px)`;
      copy.style.opacity = String(1 - amount);
      if (t < 1) slideFrame = requestAnimationFrame(frame);
      else { slideFrame = 0; setProduct(target); resetPose(); }
    };
    slideFrame = requestAnimationFrame(frame);
  }
  $$('[data-step]').forEach((button) => button.addEventListener('click', () => change(Number(button.dataset.step))));
  $('.hero').addEventListener('keydown', (event) => {
    if (event.target.closest('.hero__navigation') && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
      change(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  let touchStart = 0;
  $('.stage').addEventListener('touchstart', (event) => { touchStart = event.touches[0].clientX; }, { passive: true });
  $('.stage').addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 55) change(distance > 0 ? -1 : 1);
  }, { passive: true });

  function pose(x, y) {
    if (paused || slideFrame) return;
    cancelAnimationFrame(pointerFrame);
    cancelAnimationFrame(introFrame);
    const start = performance.now();
    const frame = (now) => {
      const t = Math.min(1, (now - start) / 220);
      const v = ease(t);
      wrap.style.transform = `rotateY(${x * 11 * v}deg) rotateX(${-y * 8 * v}deg) translate3d(${x * 9 * v}px, ${y * 7 * v}px, 15px)`;
      if (t < 1) pointerFrame = requestAnimationFrame(frame);
      else pointerFrame = 0;
    };
    pointerFrame = requestAnimationFrame(frame);
  }
  $('.stage').addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = $('.stage').getBoundingClientRect();
    pose((event.clientX - bounds.left) / bounds.width * 2 - 1, (event.clientY - bounds.top) / bounds.height * 2 - 1);
  });
  $('.stage').addEventListener('pointerleave', () => pose(0, 0));
  const introStart = performance.now();
  function intro(now) {
    const t = Math.min(1, (now - introStart) / 4800);
    wrap.style.transform = `translateY(${-Math.sin(t * Math.PI * 2) * 8}px) rotateY(${Math.sin(t * Math.PI * 2) * 4}deg)`;
    if (t < 1 && !paused) introFrame = requestAnimationFrame(intro);
    else { introFrame = 0; resetPose(); }
  }
  introFrame = requestAnimationFrame(intro);
  settleImages(0);
  $('[data-next-preview]').addEventListener('click', () => change(1));
  let sceneProgress = 0;
  function updateScene() {
    cancelAnimationFrame(sceneFrame);
    if (paused) return;
    const bounds = $('.showroom').getBoundingClientRect();
    const target = Math.max(0, Math.min(1, -bounds.top / bounds.height));
    const startValue = sceneProgress;
    const start = performance.now();
    const frame = (now) => {
      const t = Math.min(1, (now - start) / 260);
      sceneProgress = startValue + (target - startValue) * ease(t);
      $('.watch-stack').style.transform = `translateY(${-sceneProgress * 65}px) scale(${1 + sceneProgress * .12}) rotate(${sceneProgress * 9}deg)`;
      if (t < 1) sceneFrame = requestAnimationFrame(frame);
      else sceneFrame = 0;
    };
    sceneFrame = requestAnimationFrame(frame);
  }
  window.addEventListener('scroll', updateScene, { passive: true });
  window.addEventListener('resize', updateScene);
  animateLightFallback();
  $('.motion-toggle').addEventListener('click', () => {
    paused = !paused;
    document.body.classList.toggle('watchroom--paused', paused);
    $('.motion-toggle').setAttribute('aria-pressed', String(paused));
    $('.motion-toggle').textContent = paused ? 'RESUME MOTION ▷' : 'PAUSE MOTION Ⅱ';
    cancelAnimationFrame(introFrame);
    cancelAnimationFrame(pointerFrame);
    cancelAnimationFrame(slideFrame);
    cancelAnimationFrame(lightFrame);
    cancelAnimationFrame(sceneFrame);
    slideFrame = 0;
    setProduct(selected);
    resetPose();
    if (!paused) { animateLightFallback(); updateScene(); }
  });

  $$('.hotspot').forEach((button) => button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    $$('.hotspot').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    $$('.callout').forEach((c) => c.classList.remove('is-open'));
    button.setAttribute('aria-expanded', String(open));
    $('#' + button.getAttribute('aria-controls')).classList.toggle('is-open', open);
  }));

  function filter() {
    const term = $('.search input').value.trim().toLowerCase();
    let count = 0;
    $$('.product').forEach((card) => {
      const show = (category === 'all' || card.dataset.category === category) && card.dataset.name.includes(term);
      card.hidden = !show;
      if (show) count++;
    });
    $('.collection__results').textContent = count + (count === 1 ? ' watch' : ' watches');
    $('.empty-state').hidden = count !== 0;
  }
  $$('[data-filter]').forEach((link) => link.addEventListener('click', () => {
    category = link.dataset.filter;
    $$('[data-filter]').forEach((a) => {
      a.classList.toggle('is-selected', a === link);
      if (a === link) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    filter();
  }));
  $('.search input').addEventListener('input', filter);
  $('[data-save]').addEventListener('click', () => {
    if (saved.includes(current)) saved = saved.filter((i) => i !== current);
    else saved.push(current);
    saveState();
    $('#slide-status').textContent = saved.includes(current) ? 'Watch added to your desired collection.' : 'Watch removed from your desired collection.';
  });
  $('[data-open-saved]').addEventListener('click', (event) => {
    opener = event.currentTarget;
    $('#saved').showModal();
  });
  $('[data-close-saved]').addEventListener('click', () => $('#saved').close());
  $('#saved').addEventListener('close', () => opener?.focus());
  $('#saved').addEventListener('click', (event) => {
    const r = $('#saved').getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) $('#saved').close();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.remove('is-pending'); observer.unobserve(entry.target); }
      });
    }, { threshold: .1 });
    $$('.reveal').forEach((element) => { element.classList.add('is-pending'); observer.observe(element); });
    setTimeout(() => { $$('.reveal').forEach((e) => e.classList.remove('is-pending')); observer.disconnect(); }, 6000);
  }
  saveState();
  document.documentElement.classList.add('js');
})();
