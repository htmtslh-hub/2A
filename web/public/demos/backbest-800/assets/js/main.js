/* BackBest 800 — finite timelines, local configuration and no backend. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const finishes = [
    { name: 'Black', image: 'assets/img/headphone-black.webp', swatch: '#2b292a' },
    { name: 'White', image: 'assets/img/headphone-white.webp', swatch: '#ece8e6' },
    { name: 'Red', image: 'assets/img/headphone-red.webp', swatch: '#c91f28' },
  ];
  const information = {
    cage: ['40mm dynamic acoustic drivers', 'Concentric-grooved outer earcup shells house custom 40mm dynamic transducers tuned for deep sub-bass and crisp studio separation. All imagery is original generated artwork; acoustic tolerances are illustrative.'],
    air: ['Memory-foam leather ear cushions', 'Plush pleated leather cushions form a passive acoustic seal around the ear for extended studio sessions. Material descriptions and comfort ratings are demonstration copy, not manufacturer-verified data.'],
    shank: ['Precision folding metal hinge', 'Reinforced metal hinge plates with triple-rivet anchoring fold smoothly for travel cases. This template is an independent visual study, not an official retail listing.'],
    mesh: ['Contoured headband arch', 'Balanced clamping geometry distributes weight evenly across the padded inner headband arch. Black, White and Red are conceptual finishes, not live stock options.'],
  };
  let current = 0, size = '', motion = true, colourFrame = 0, scrollFrame = 0, actionFrame = 0, toastTimer = 0;
  const finiteFrames = new Map(), openers = new WeakMap(), bag = [];
  const shoe = $('#shoe-image'), wrapper = $('.headphone-motion');
  finishes.forEach(finish => { const image = new Image(); image.src = finish.image; });
  function finite(element, duration, paint, done = () => {}) {
    cancelAnimationFrame(finiteFrames.get(element));
    if (!motion) { paint(1); done(); return; }
    const start = performance.now();
    const frame = time => {
      const progress = Math.min(1, (time - start) / duration);
      paint(progress);
      if (progress < 1) finiteFrames.set(element, requestAnimationFrame(frame));
      else { finiteFrames.delete(element); done(); }
    };
    finiteFrames.set(element, requestAnimationFrame(frame));
  }
  function notify(text) {
    clearTimeout(toastTimer);
    $('#status-message').textContent = text;
    $('#status-message').classList.add('is-visible');
    toastTimer = setTimeout(() => $('#status-message').classList.remove('is-visible'), 3200);
  }
  function summary() {
    $('#configuration-summary').textContent = `${finishes[current].name} / ${size || 'Select a fit'}`;
    $('#finish-select').value = String(current);
    $('.swatch').style.background = finishes[current].swatch;
    $('#slide-number').textContent = String(current + 1).padStart(2, '0');
    $$('[data-color]').forEach(btn => {
      const active = Number(btn.dataset.color) === current;
      btn.classList.toggle('is-selected', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }
  function paintFinish() {
    shoe.src = finishes[current].image;
    shoe.alt = `${finishes[current].name} BackBest 800 wireless over-ear headphone in three-quarter right-facing profile`;
    $('.headphone-stage').setAttribute('aria-label', `${finishes[current].name} headphone design preview`);
    summary();
  }
  function setFinish(requested, direction = 1) {
    cancelAnimationFrame(colourFrame);
    cancelAnimationFrame(finiteFrames.get(wrapper)); finiteFrames.delete(wrapper);
    current = (requested + finishes.length) % finishes.length;
    const start = performance.now(); let painted = false;
    const frame = time => {
      const p = motion ? Math.min(1, (time - start) / 720) : 1;
      if (p < .44) {
        const t = p / .44;
        wrapper.style.transform = `translateX(${-direction * 65 * t}px)`;
        wrapper.style.opacity = String(1 - t * .94);
      } else {
        if (!painted) { paintFinish(); painted = true; }
        const t = (p - .44) / .56, eased = 1 - (1 - t) ** 3;
        wrapper.style.transform = `translateX(${direction * 65 * (1 - eased)}px)`;
        wrapper.style.opacity = String(.06 + .94 * eased);
      }
      if (p < 1) colourFrame = requestAnimationFrame(frame);
      else { colourFrame = 0; wrapper.style.opacity = '1'; wrapper.style.transform = 'none'; }
    };
    colourFrame = requestAnimationFrame(frame);
  }
  $('#finish-select').addEventListener('change', event => setFinish(Number(event.target.value), Number(event.target.value) >= current ? 1 : -1));
  $$('[data-color]').forEach(button => button.addEventListener('click', () => {
    const target = Number(button.dataset.color);
    setFinish(target, target >= current ? 1 : -1);
  }));
  $$('[data-step]').forEach(button => button.addEventListener('click', () => setFinish(current + Number(button.dataset.step), Number(button.dataset.step))));
  $('#size-select').addEventListener('change', event => {
    size = event.target.value;
    $('#selection-feedback').textContent = size ? `${finishes[current].name} / ${size} selected.` : '';
    summary();
  });
  $('.headphone-stage').setAttribute('tabindex', '0');
  $('.headphone-stage').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); const direction = event.key === 'ArrowRight' ? 1 : -1;
    setFinish(current + direction, direction);
  });
  let pointer = null;
  $('.headphone-stage').addEventListener('pointerdown', event => {
    if (event.target.closest('button') || event.button !== 0) return;
    pointer = { x: event.clientX, y: event.clientY, id: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  });
  $('.headphone-stage').addEventListener('pointerup', event => {
    if (!pointer || event.pointerId !== pointer.id) return;
    const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
    pointer = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      const direction = dx < 0 ? 1 : -1; setFinish(current + direction, direction);
    }
  });
  $('.headphone-stage').addEventListener('pointercancel', () => { pointer = null; });
  function closeMenu(restore = false) {
    $('#main-nav').classList.remove('is-open');
    $('.menu-toggle').setAttribute('aria-expanded', 'false');
    $('.menu-toggle').setAttribute('aria-label', 'Open menu');
    if (restore) $('.menu-toggle').focus();
  }
  $('.menu-toggle').addEventListener('click', event => {
    const open = event.currentTarget.getAttribute('aria-expanded') !== 'true';
    $('#main-nav').classList.toggle('is-open', open);
    event.currentTarget.setAttribute('aria-expanded', String(open));
    event.currentTarget.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  $('#main-nav').querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && $('#main-nav').classList.contains('is-open')) closeMenu(true);
  });
  function openDialog(dialog) {
    closeMenu();
    if (typeof dialog.showModal !== 'function') { location.hash = 'contact'; return; }
    const opener = document.activeElement;
    $$('dialog[open]').forEach(item => item.close());
    openers.set(dialog, opener); dialog.showModal();
  }
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); dialog.close(); } });
    dialog.addEventListener('close', () => {
      if (dialog.id === 'action-dialog') stopAction();
      requestAnimationFrame(() => { if (!$('dialog[open]')) openers.get(dialog)?.focus(); });
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
  });
  $$('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  $$('[data-dismiss]').forEach(link => link.addEventListener('click', () => link.closest('dialog').close()));
  $$('[data-info]').forEach(button => button.addEventListener('click', () => {
    const entry = information[button.dataset.info];
    $('#info-title').textContent = entry[0]; $('#info-body').textContent = entry[1];
    openDialog($('#info-dialog'));
  }));
  $('#search-open').addEventListener('click', () => openDialog($('#search-dialog')));
  $('#model-search').addEventListener('input', event => {
    const query = event.target.value.toLowerCase().trim();
    const match = 'plantronic backbest 800 series wireless headphone black white red audio studio'.includes(query);
    $('#search-result').hidden = !match; $('#search-empty').hidden = match;
  });
  function renderBag() {
    const list = $('#bag-items'); list.replaceChildren();
    bag.forEach((item, index) => {
      const row = document.createElement('div'); row.className = 'bag-row';
      const copy = document.createElement('div'), title = document.createElement('h3'), description = document.createElement('p');
      title.textContent = 'BackBest 800'; description.textContent = `${item.finish} / ${item.size} · $199 illustrative price`;
      copy.append(title, description);
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'Remove';
      remove.setAttribute('aria-label', `Remove ${item.finish} ${item.size}`);
      remove.addEventListener('click', () => { bag.splice(index, 1); renderBag(); $('#bag-dialog .dialog-close').focus(); });
      row.append(copy, remove); list.append(row);
    });
    $('#bag-count').textContent = String(bag.length);
    $('.bag-open').setAttribute('aria-label', `Open enquiry bag, ${bag.length} items`);
    $('#bag-empty').hidden = bag.length > 0; $('#bag-email').hidden = !bag.length;
    const text = bag.map(item => `BackBest 800 Series: ${item.finish} / ${item.size} / $199 illustrative price`).join('\n');
    $('#bag-email').href = `mailto:hello@backbest800.example?subject=${encodeURIComponent('BackBest 800 purchase enquiry')}&body=${encodeURIComponent(text + '\nThis is a local concept enquiry, not a live retail order. Please confirm fit, availability and pricing separately.')}`;
  }
  function addSelectedToBag() {
    if (!size) {
      $('#selection-feedback').textContent = 'Choose a cushion fit option to prepare your purchase enquiry.';
      $('#size-select').focus(); notify('Please select a cushion fit first.'); return;
    }
    const finish = finishes[current].name;
    if (bag.some(item => item.finish === finish && item.size === size)) { notify('This edition is already in your enquiry bag.'); return; }
    bag.push({ finish, size }); renderBag(); notify(`${finish} / ${size} added to your enquiry bag.`);
  }
  $('.bag-open').addEventListener('click', () => { renderBag(); openDialog($('#bag-dialog')); });
  $('#add-to-bag').addEventListener('click', addSelectedToBag);
  $('#build-add-to-bag').addEventListener('click', addSelectedToBag);
  function stopAction() { cancelAnimationFrame(actionFrame); actionFrame = 0; }
  function playAction() {
    stopAction(); const start = performance.now(); let previous = -1;
    const image = $('#action-image');
    const frame = time => {
      const progress = motion ? Math.min(1, (time - start) / 4200) : 1;
      const segment = Math.min(2, Math.floor(progress * 3));
      if (segment !== previous) {
        image.src = finishes[segment].image;
        $('#action-caption').textContent = ['01 / Stealth Black studio edition.', '02 / Pearl White acoustic finish.', '03 / Crimson Red anodized edition.'][segment];
        previous = segment;
      }
      const local = (progress * 3) % 1;
      image.style.transform = `translateX(${(local - .5) * 20}px) scale(${1 + Math.sin(local * Math.PI) * .035})`;
      $('.action-progress span').style.width = `${progress * 100}%`;
      if (progress < 1) actionFrame = requestAnimationFrame(frame);
      else { actionFrame = 0; image.style.transform = 'none'; $('#action-caption').textContent = 'Sequence complete. Replay or explore the acoustic details.'; }
    };
    actionFrame = requestAnimationFrame(frame);
  }
  $('#action-open').addEventListener('click', () => { openDialog($('#action-dialog')); playAction(); });
  $('#action-replay').addEventListener('click', playAction);
  const revealed = new WeakSet();
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting || revealed.has(entry.target)) return;
    revealed.add(entry.target); observer.unobserve(entry.target);
    finite(entry.target, 650, p => { const eased = 1 - (1 - p) ** 3; entry.target.style.opacity = '1'; entry.target.style.transform = `translateY(${24 * (1 - eased)}px)`; });
  }), { threshold: .1 }) : null;
  function updateScroll() {
    scrollFrame = 0;
    const scene = $('.engineering'), box = scene.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (innerHeight - box.top) / (innerHeight + box.height)));
    scene.style.setProperty('--scene', String(progress));
    $('.engineering-visual img').style.transform = `translateX(${-4 + (motion ? progress * 8 : 0)}%)`;
  }
  function scheduleScroll() { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }
  addEventListener('scroll', scheduleScroll, { passive: true });
  addEventListener('resize', () => { closeMenu(); scheduleScroll(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopAction(); });
  $('#motion-toggle').addEventListener('click', event => {
    motion = !motion; event.currentTarget.textContent = motion ? 'Pause motion' : 'Resume motion';
    event.currentTarget.setAttribute('aria-pressed', String(!motion));
    if (!motion) {
      cancelAnimationFrame(colourFrame); colourFrame = 0; stopAction();
      finiteFrames.forEach(id => cancelAnimationFrame(id)); finiteFrames.clear(); paintFinish();
      wrapper.style.opacity = '1'; wrapper.style.transform = 'none';
      $$('[data-reveal]').forEach(element => { element.style.opacity = '1'; element.style.transform = 'none'; });
      $('#action-image').style.transform = 'none';
    }
    scheduleScroll();
  });
  document.body.classList.add('js'); summary(); renderBag();
  $$('[data-reveal]').forEach(element => { element.style.opacity = '1'; if (observer) observer.observe(element); else element.style.transform = 'none'; });
  finite(wrapper, 900, p => { const eased = 1 - (1 - p) ** 3; wrapper.style.opacity = String(.15 + .85 * eased); wrapper.style.transform = `translateX(${-48 * (1 - eased)}px)`; });
  scheduleScroll();
})();
