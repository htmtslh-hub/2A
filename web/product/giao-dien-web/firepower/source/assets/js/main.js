/* Firepower: finite view transitions, section reveals and accessible navigation. */
(() => {
  'use strict';
  const root = document.documentElement;
  const menuButton = document.querySelector('.nav-toggle');
  const menu = document.querySelector('#navigation');
  const motionButton = document.querySelector('.motion-toggle');
  const jobs = new Map();
  let paused = false;
  const setMenu = open => {
    menu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
  const breakpoint = matchMedia('(min-width: 951px)');
  breakpoint.addEventListener('change', () => setMenu(false));

  // Finite RAF also works when CSS animations or Web Animations are unavailable.
  function animate(element, duration, distance = 28) {
    const previous = jobs.get(element);
    if (previous) cancelAnimationFrame(previous);
    const finish = () => {
      element.style.removeProperty('transform');
      element.style.removeProperty('opacity');
      jobs.delete(element);
    };
    if (paused) { finish(); return; }
    const start = performance.now();
    const tick = now => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.style.opacity = String(.2 + .8 * eased);
      element.style.transform = `translate3d(${distance * (1 - eased)}px, 0, 0)`;
      if (progress < 1 && !paused) jobs.set(element, requestAnimationFrame(tick));
      else finish();
    };
    jobs.set(element, requestAnimationFrame(tick));
  }
  const views = [
    { key: 'top', label: 'Top view' },
    { key: 'wheel', label: 'Scroll wheel assembly' },
    { key: 'side', label: 'Side controls' },
    { key: 'underside', label: 'Circular control assembly' },
    { key: 'profile', label: 'Side profile assembly' }
  ];
  const wrap = value => (value + views.length) % views.length;
  function setImage(element, index) {
    views.forEach(view => element.classList.remove(`mouse-image--${view.key}`));
    element.classList.add(`mouse-image--${views[index].key}`);
    element.setAttribute('aria-label', `Black gaming mouse: ${views[index].label.toLowerCase()}`);
    element.dataset.currentView = String(index);
  }
  let heroIndex = 0;
  let galleryIndex = 0;
  const heroMain = document.querySelector('[data-hero-main]');
  const heroSide = document.querySelector('[data-hero-side]');
  const heroStage = document.querySelector('[data-carousel="hero"]');
  const gallery = document.querySelector('[data-carousel="gallery"]');
  const galleryItems = [...document.querySelectorAll('[data-gallery-position]')];
  function changeHero(step) {
    heroIndex = wrap(heroIndex + step);
    setImage(heroMain, heroIndex);
    setImage(heroSide, wrap(heroIndex + 2));
    animate(heroMain, 520, step * 60);
    animate(heroSide, 600, step * 35);
    document.querySelector('[data-view-count]').textContent = String(heroIndex + 1).padStart(2, '0');
  }
  function changeGallery(next, direction) {
    galleryIndex = wrap(next);
    galleryItems.forEach(item => {
      setImage(item, wrap(galleryIndex + Number(item.dataset.galleryPosition)));
      animate(item, 520, direction * 65);
    });
    document.querySelectorAll('[data-view]').forEach(button => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.view) === galleryIndex));
    });
    document.querySelector('[data-gallery-status]').textContent = `${views[galleryIndex].label}, ${galleryIndex + 1} of 5`;
  }
  document.querySelectorAll('[data-hero-step]').forEach(button => button.addEventListener('click', () => changeHero(Number(button.dataset.heroStep))));
  document.querySelectorAll('[data-gallery-step]').forEach(button => button.addEventListener('click', () => {
    const step = Number(button.dataset.galleryStep);
    changeGallery(galleryIndex + step, step);
  }));
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    const next = Number(button.dataset.view);
    changeGallery(next, next >= galleryIndex ? 1 : -1);
  }));
  function bindGestures(element, move) {
    let origin = null;
    element.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    element.addEventListener('pointerdown', event => { origin = { x: event.clientX, y: event.clientY }; });
    element.addEventListener('pointerup', event => {
      if (!origin || event.target.closest('button, a')) { origin = null; return; }
      const dx = event.clientX - origin.x;
      const dy = event.clientY - origin.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) move(dx < 0 ? 1 : -1);
      origin = null;
    });
    element.addEventListener('pointercancel', () => { origin = null; });
  }
  bindGestures(heroStage, changeHero);
  bindGestures(gallery, step => changeGallery(galleryIndex + step, step));
  motionButton.addEventListener('click', () => {
    paused = !paused;
    motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
    motionButton.setAttribute('aria-pressed', String(paused));
    jobs.forEach((frame, element) => {
      cancelAnimationFrame(frame);
      element.style.removeProperty('transform');
      element.style.removeProperty('opacity');
    });
    jobs.clear();
    root.style.scrollBehavior = paused ? 'auto' : '';
  });
  root.classList.add('js-ready');
  document.querySelectorAll('[data-entry]').forEach(element => animate(element, 720, -22));
  animate(heroMain, 850, 40);
  animate(heroSide, 950, 50);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target, 720, 34);
          entry.target.dataset.revealed = 'true';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .16 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
  }
  window.addEventListener('pagehide', () => {
    jobs.forEach(frame => cancelAnimationFrame(frame));
    jobs.clear();
  }, { once: true });
})();
