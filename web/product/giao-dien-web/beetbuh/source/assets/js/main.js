/* BeetBuh: finite view transitions and scroll reveals, no idle animation loop. */
(() => {
  'use strict';
  const root = document.documentElement;
  const menu = document.querySelector('#navigation');
  const menuButton = document.querySelector('.nav-toggle');
  const jobs = new Map();
  let paused = false;
  const setMenu = open => { menu.classList.toggle('is-open', open); menuButton.setAttribute('aria-expanded', String(open)); };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { setMenu(false); menuButton.focus(); }
  });
  matchMedia('(min-width: 951px)').addEventListener('change', () => setMenu(false));
  function animate(element, duration, distance = 35) {
    const old = jobs.get(element);
    if (old) cancelAnimationFrame(old);
    const finish = () => { element.style.removeProperty('transform'); element.style.removeProperty('opacity'); jobs.delete(element); };
    if (paused) { finish(); return; }
    const start = performance.now();
    const frame = now => {
      const progress = Math.min(1, (now - start) / duration);
      const ease = 1 - (1 - progress) ** 3;
      element.style.transform = `translate3d(${distance * (1 - ease)}px,0,0)`;
      element.style.opacity = String(.2 + .8 * ease);
      if (progress < 1 && !paused) jobs.set(element, requestAnimationFrame(frame));
      else finish();
    };
    jobs.set(element, requestAnimationFrame(frame));
  }
  // Contour lines are decorative paths, never a substitute for product artwork.
  const contours = document.querySelector('.contours__lines');
  for (let i = 0; i < 30; i++) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const scale = 1 - i * .017;
    path.setAttribute('d', 'M425 35C580 40 560 105 690 130S850 240 775 370S710 540 770 680S760 900 610 870S480 710 340 700S100 690 150 535S260 390 290 270S280 70 425 35Z');
    path.setAttribute('transform', 'translate(410 450) scale(' + scale + ') translate(-410 -450)');
    contours.append(path);
  }
  const stage = document.querySelector('[data-carousel]');
  const image = document.querySelector('[data-hero-image]');
  image.draggable = false;
  const assetBase = new URL('../../', document.currentScript.src);
  const views = [
    { src: 'assets/img/headphone-hero.webp', alt: 'Sculptural orange over-ear headphones, upright three-quarter view' },
    { src: 'assets/img/headphone-angle.webp', alt: 'Sculptural orange headphones, open angled view' },
    { src: 'assets/img/headphone-angle.webp', alt: 'Close-up of the orange lattice earcup concept' }
  ];
  let index = 0;
  function select(next, direction) {
    index = (next + views.length) % views.length;
    image.src = new URL(views[index].src, assetBase).href;
    image.alt = views[index].alt;
    stage.classList.toggle('is-detail', index === 2);
    stage.dataset.currentView = String(index);
    document.querySelector('[data-view-count]').textContent = String(index + 1).padStart(2, '0');
    document.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.view) === index)));
    animate(image, 620, direction * 65);
  }
  document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => { const step = Number(button.dataset.step); select(index + step, step); }));
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => { const next = Number(button.dataset.view); select(next, next >= index ? 1 : -1); }));
  stage.addEventListener('keydown', event => { if (['ArrowLeft','ArrowRight'].includes(event.key)) { event.preventDefault(); const step = event.key === 'ArrowRight' ? 1 : -1; select(index + step, step); } });
  let pointer = null;
  stage.addEventListener('pointerdown', event => { stage.setPointerCapture(event.pointerId); pointer = { x: event.clientX, y: event.clientY }; });
  stage.addEventListener('pointerup', event => {
    if (!pointer) return;
    const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) { const step = dx < 0 ? 1 : -1; select(index + step, step); }
    pointer = null;
  });
  stage.addEventListener('pointercancel', () => { pointer = null; });
  const dialog = document.querySelector('#image-dialog');
  const expand = document.querySelector('.expand-button');
  expand.addEventListener('click', () => dialog.showModal());
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => expand.focus());
  const motionButton = document.querySelector('.motion-toggle');
  motionButton.addEventListener('click', () => {
    paused = !paused;
    jobs.forEach((frame, element) => { cancelAnimationFrame(frame); element.style.removeProperty('transform'); element.style.removeProperty('opacity'); });
    jobs.clear();
    motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
    motionButton.setAttribute('aria-pressed', String(paused));
    root.style.scrollBehavior = paused ? 'auto' : '';
  });
  root.classList.add('js-ready');
  document.querySelectorAll('[data-entry]').forEach(element => animate(element, 750, -25));
  animate(image, 900, 55);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { animate(entry.target, 700); entry.target.dataset.revealed = 'true'; observer.unobserve(entry.target); }
    }), { threshold: .16 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
  }
  window.addEventListener('pagehide', () => { jobs.forEach(frame => cancelAnimationFrame(frame)); jobs.clear(); }, { once: true });
})();
