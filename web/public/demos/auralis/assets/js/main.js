/* Auralis: menu, reveal and a scroll-driven product story. No dependencies. */
(() => {
  'use strict';
  const root = document.documentElement;
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav__links');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = window.matchMedia('(max-width: 950px)');
  const preferenceKey = 'auralis-motion';
  let userMotion = null;
  try {
    const saved = localStorage.getItem(preferenceKey);
    if (saved === 'on' || saved === 'off') userMotion = saved === 'on';
  } catch { /* Private/offline browsers may not allow storage. */ }
  const requestedMotion = new URLSearchParams(location.search).get('motion');
  if (requestedMotion === 'on' || requestedMotion === 'off') {
    userMotion = requestedMotion === 'on';
    try { localStorage.setItem(preferenceKey, requestedMotion); } catch { /* The URL still works without storage. */ }
  }
  const motionAllowed = () => userMotion === null ? !motion.matches : userMotion;
  const motionSettings = document.querySelector('.motion-settings');
  const motionToggle = document.querySelector('.motion-toggle');
  root.classList.add('js-ready');
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    links.classList.remove('is-open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    links.classList.toggle('is-open', open);
  });
  links.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  narrow.addEventListener('change', closeMenu);
  if ('IntersectionObserver' in window && motionAllowed()) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    root.classList.add('reveal-ready');
  }
  const hero = document.querySelector('.hero');
  const heroVisual = document.querySelector('.hero__visual');
  const heroCopy = document.querySelector('.hero__copy');
  const heroDetail = document.querySelector('.hero__detail');
  const kitScene = document.querySelector('.scene-panel--kit');
  const nextScene = document.querySelector('.scene-panel--next');
  const slides = [...document.querySelectorAll('[data-product]')];
  const models = [
    { name: 'EvoBuds One', edition: 'VIOLET EDITION', word: 'EVO', description: 'Meet EvoBuds One. Immersive wireless sound, in a form that feels like nothing else.', detail: 'Sculpted in pearl and violet. A precision fit that makes room for the music, and nothing else.', battery: '8 hours', noise: 'Adaptive ANC', driver: '11 mm' },
    { name: 'StudioBuds Pro', edition: 'GRAPHITE EDITION', word: 'PRO', description: 'Meet StudioBuds Pro. A quieter space for a deeper listen, finished in sculpted graphite.', detail: 'A compact graphite shell. Balanced sound and considered noise control for your daily listening ritual.', battery: '9 hours', noise: 'Hybrid ANC', driver: '12 mm' },
    { name: 'AirBuds Lite', edition: 'PEARL EDITION', word: 'AIR', description: 'Meet AirBuds Lite. A lighter way to listen, with an effortless fit and a clean pearl finish.', detail: 'Soft pearl-white forms. A lightweight stem design that keeps your everyday soundtrack close.', battery: '6 hours', noise: 'Transparency', driver: '10 mm' },
  ];
  let selected = 0;
  let copyTimer;
  let carouselTimer;
  let carouselFrame = 0;
  let touchStart = null;
  const placeSlide = (slide, distance) => {
      slide.classList.toggle('is-selected', distance === 0);
      slide.setAttribute('aria-hidden', String(distance !== 0));
      const x = [0, 65, 110][distance];
      const scale = [1, .46, .32][distance];
      slide.style.transform = `translate3d(${x}%, 0, ${-distance * 150}px) rotate(${distance ? 12 : -8}deg) scale(${scale})`;
      slide.style.opacity = distance === 0 ? '1' : distance === 1 ? '.46' : '.25';
      slide.style.filter = distance ? `blur(${distance * 5}px)` : 'blur(0px)';
      slide.style.zIndex = String(3 - distance);
  };
  const cancelCarousel = () => {
    clearTimeout(carouselTimer);
    if (carouselFrame) cancelAnimationFrame(carouselFrame);
    carouselFrame = 0;
  };
  const settleCarousel = () => {
    cancelCarousel();
    slides.forEach((slide, i) => {
      // Recycle the departed image behind the upcoming previews without crossing the center.
      slide.style.transition = 'none';
      placeSlide(slide, (i - selected + slides.length) % slides.length);
    });
    void heroVisual.offsetWidth;
    slides.forEach(slide => { slide.style.transition = ''; });
  };
  const showProduct = (index, animateCopy = true) => {
    const previous = selected;
    const direction = index < previous ? -1 : 1;
    selected = (index % slides.length + slides.length) % slides.length;
    const model = models[selected];
    cancelCarousel();
    if (animateCopy && motionAllowed() && selected !== previous) {
      const outgoing = slides[previous];
      const incoming = slides[selected];
      // Freeze the outgoing image at its current position if the visitor clicks rapidly.
      const current = getComputedStyle(outgoing);
      const start = { transform: current.transform, opacity: current.opacity, filter: current.filter };
      slides.forEach((slide, i) => {
        slide.style.transition = 'none';
        if (i !== selected && i !== previous) placeSlide(slide, (i - selected + slides.length) % slides.length);
        slide.classList.toggle('is-selected', i === selected);
        slide.setAttribute('aria-hidden', String(i !== selected));
      });
      Object.assign(outgoing.style, start, { zIndex: '2' });
      // The incoming model starts on the requested side, including 3→1 and 1→3.
      incoming.style.transform = `translate3d(${direction * 65}%, 0, -150px) rotate(${direction * 12}deg) scale(.46)`;
      incoming.style.opacity = '.46';
      incoming.style.filter = 'blur(5px)';
      incoming.style.zIndex = '3';
      void heroVisual.offsetWidth;
      carouselFrame = requestAnimationFrame(() => {
        carouselFrame = 0;
        slides.forEach(slide => { slide.style.transition = ''; });
        placeSlide(incoming, 0);
        outgoing.style.transform = `translate3d(${-direction * 65}%, 0, -150px) rotate(${-direction * 12}deg) scale(.46)`;
        outgoing.style.opacity = direction > 0 ? '0' : '.46';
        outgoing.style.filter = 'blur(5px)';
        // Match the 1.05s transform transition; the finite timer also works in background tabs.
        carouselTimer = setTimeout(settleCarousel, 1100);
      });
    } else settleCarousel();
    document.querySelector('.product-count').textContent = `0${selected + 1} / 03`;
    document.querySelector('.hero__product-label').textContent = `${model.name.toUpperCase()} / WIRELESS EARBUDS`;
    clearTimeout(copyTimer);
    if (animateCopy && motionAllowed()) heroCopy.classList.add('is-changing');
    const updateCopy = () => {
      document.querySelector('.hero__model').textContent = `${model.name.toUpperCase()} / ${model.edition}`;
      document.querySelector('.hero__description').textContent = model.description;
      document.querySelector('.hero__word').textContent = model.word;
      const title = document.querySelector('.hero__detail-title');
      title.firstChild.textContent = model.name;
      document.querySelector('.hero__detail-description').textContent = model.detail;
      const values = document.querySelectorAll('.hero__detail-specs dd');
      [model.battery, model.noise, model.driver].forEach((value, i) => { values[i].textContent = value; });
      heroCopy.classList.remove('is-changing');
    };
    if (animateCopy && motionAllowed()) copyTimer = setTimeout(updateCopy, 200);
    else updateCopy();
  };
  document.querySelectorAll('[data-direction]').forEach(button => {
    button.addEventListener('click', () => showProduct(selected + Number(button.dataset.direction)));
  });
  document.querySelector('.product-controls').addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      showProduct(selected + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  heroVisual.addEventListener('touchstart', event => { touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }, { passive: true });
  heroVisual.addEventListener('touchend', event => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) showProduct(selected + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });
  heroVisual.style.touchAction = 'pan-y';
  showProduct(0, false);
  const story = document.querySelector('.story');
  const visual = document.querySelector('.story__visual');
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  const frames = [...document.querySelectorAll('[data-frame]')];
  const counter = document.querySelector('.story__counter');
  const progress = document.querySelector('.story__progress span');
  let scheduled = false;
  let renderFrame = 0;
  let sceneScrollFrame = 0;
  let heroPosition = null;
  let storyPosition = null;
  let lastPaintTime = 0;
  let active = -1;
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = value => { const p = clamp(value); return p * p * (3 - 2 * p); };
  const setInactive = (element, hidden) => {
    element.setAttribute('aria-hidden', String(hidden));
    element.inert = hidden;
  };
  const stopSceneScroll = () => { if (sceneScrollFrame) cancelAnimationFrame(sceneScrollFrame); sceneScrollFrame = 0; };
  const scrollToScene = fraction => {
    stopSceneScroll();
    const start = window.scrollY;
    const target = hero.offsetTop + (hero.offsetHeight - innerHeight) * fraction;
    const distance = target - start;
    if (Math.abs(distance) < 1) return;
    const duration = Math.min(1400, Math.max(700, Math.abs(distance) * .65));
    const started = performance.now();
    const step = now => {
      sceneScrollFrame = 0;
      if (!motionAllowed() || !root.classList.contains('motion-ready')) return;
      const p = clamp((now - started) / duration);
      // Native smooth scrolling may be disabled by the browser even after an explicit motion opt-in.
      window.scrollTo({ top: start + distance * smooth(p), behavior: 'instant' });
      if (p < 1) sceneScrollFrame = requestAnimationFrame(step);
    };
    sceneScrollFrame = requestAnimationFrame(step);
  };
  const paint = (now = performance.now()) => {
    scheduled = false;
    renderFrame = 0;
    if (!motionAllowed() || !root.classList.contains('motion-ready')) return;
    const deltaTime = lastPaintTime ? Math.min(32, Math.max(1, now - lastPaintTime)) : 16;
    lastPaintTime = now;
    const blend = 1 - Math.exp(-deltaTime / 70);
    const heroRect = hero.getBoundingClientRect();
    const heroTarget = clamp(-heroRect.top / Math.max(1, heroRect.height - innerHeight));
    heroPosition = heroPosition === null || heroRect.bottom < 0 || heroRect.top > innerHeight ? heroTarget : heroPosition + (heroTarget - heroPosition) * blend;
    if (Math.abs(heroTarget - heroPosition) < .0002) heroPosition = heroTarget;
    const heroProgress = heroPosition;
    const move = smooth((heroProgress - .025) / .23);
    const copyOut = smooth((heroProgress - .025) / .13);
    const detailIn = smooth((heroProgress - .14) / .1);
    const toKit = smooth((heroProgress - .37) / .18);
    const toNext = smooth((heroProgress - .72) / .18);
    const compact = innerHeight < 650;
    const mobile = innerWidth <= 650;
    heroCopy.style.opacity = String(1 - copyOut);
    heroCopy.style.transform = `translate3d(${-copyOut * 80}px, ${-copyOut * 25}px, 0)`;
    setInactive(heroCopy, copyOut > .98);
    heroVisual.style.left = `${mobile ? 0 : 38}%`;
    heroVisual.style.width = `${mobile ? (compact ? 82 : 100) : 60}%`;
    heroVisual.style.top = `${mobile ? (compact ? 71 : 65) : 50}%`;
    // The entire hero-to-detail move uses composited transforms, not animated layout.
    const travelX = -innerWidth * (mobile ? .12 : .43) * move - toKit * innerWidth * .65;
    const travelY = mobile ? innerHeight * .06 * move : 0;
    const scale = 1 - move * (mobile ? .24 : 1 / 6);
    heroVisual.style.transform = `translate3d(${travelX}px, calc(-50% + ${travelY}px), 0) rotate(${move * 8}deg) scale(${scale})`;
    heroVisual.style.opacity = String(1 - toKit);
    heroVisual.style.filter = `blur(${toKit * 9}px)`;
    const productControls = document.querySelector('.product-controls');
    productControls.style.opacity = String(1 - toKit);
    setInactive(productControls, toKit > .02);
    heroVisual.classList.toggle('is-detail', heroProgress > .10);
    setInactive(heroVisual, toKit > .98);
    heroDetail.style.opacity = String(detailIn * (1 - toKit));
    heroDetail.style.transform = mobile ? `translate3d(${-toKit * innerWidth}px, ${(1 - detailIn) * 35}px, 0)` : `translate3d(${(1 - detailIn) * 70 - toKit * innerWidth}px, -50%, 0)`;
    heroDetail.classList.toggle('is-open', detailIn > .98 && toKit < .02);
    setInactive(heroDetail, detailIn < .98 || toKit > .02);
    // Whole-scene choreography: copy, object, depth and wash move on one timeline.
    kitScene.style.opacity = String(toKit * (1 - toNext));
    kitScene.style.transform = `translate3d(${(1 - toKit) * innerWidth * .9}px, ${-toNext * innerHeight * .8}px, 0) scale(${.82 + toKit * .18 - toNext * .12})`;
    kitScene.style.filter = `blur(${(1 - toKit + toNext) * 8}px)`;
    nextScene.style.opacity = String(toNext);
    nextScene.style.transform = `translate3d(0, ${(1 - toNext) * innerHeight * .95}px, 0) scale(${.88 + toNext * .12})`;
    nextScene.style.filter = `blur(${(1 - toNext) * 8}px)`;
    setInactive(kitScene, toKit < .98 || toNext > .02);
    setInactive(nextScene, toNext < .98);
    const halo = document.querySelector('.hero__halo');
    halo.style.transform = `translate3d(${-toKit * 18 + toNext * 22}%, 0, 0) scale(${1 + toKit * .25})`;
    document.querySelector('.hero__product-label').textContent = toNext > .5 ? 'AIRBUDS LITE / A NEW PERSPECTIVE' : toKit > .5 ? 'EVOBUDS ONE / SET INCLUDES' : `${models[selected].name.toUpperCase()} / WIRELESS EARBUDS`;
    hero.dataset.scene = toNext > .5 ? 'next' : toKit > .5 ? 'kit' : move > .5 ? 'detail' : 'intro';
    const rect = story.getBoundingClientRect();
    const storyTarget = clamp(-rect.top / Math.max(1, rect.height - innerHeight));
    storyPosition = storyPosition === null || rect.bottom < 0 || rect.top > innerHeight ? storyTarget : storyPosition + (storyTarget - storyPosition) * blend;
    if (Math.abs(storyTarget - storyPosition) < .0002) storyPosition = storyTarget;
    const p = storyPosition;
    const next = Math.min(2, Math.floor(p * 3));
    if (next !== active) {
      active = next;
      frames.forEach((frame, index) => {
        frame.classList.toggle('is-leaving', frame.classList.contains('is-current') && index !== next);
        frame.classList.toggle('is-current', index === next);
        frame.setAttribute('aria-hidden', String(index !== next));
      });
      chapters.forEach((chapter, index) => {
        chapter.classList.toggle('is-active', index === next);
        chapter.setAttribute('aria-hidden', String(index !== next));
      });
      counter.textContent = `0${next + 1} / 03`;
    }
    const phase = (p * 3) % 1;
    visual.style.transform = `translate3d(${mobile ? 0 : Math.sin(phase * Math.PI) * 24}px, ${Math.sin(phase * Math.PI) * -15}px, 0) rotate(${next === 2 ? 0 : -6 + phase * 12}deg) scale(${next === 2 ? .9 : 1 + phase * .08})`;
    progress.style.width = `${(p * .85 + .15) * 100}%`;
    // Settle coarse wheel/key/scrollbar input, then stop requesting frames.
    if (heroPosition !== heroTarget || storyPosition !== storyTarget) schedule();
  };
  const schedule = () => { if (!scheduled && motionAllowed() && root.classList.contains('motion-ready')) { scheduled = true; renderFrame = requestAnimationFrame(paint); } };
  const configure = () => {
    if (!motionAllowed()) settleCarousel();
    stopSceneScroll();
    if (renderFrame) cancelAnimationFrame(renderFrame);
    renderFrame = 0; scheduled = false; heroPosition = null; storyPosition = null; lastPaintTime = 0;
    // Pinning is disabled for enlarged text/reflow and very short viewports.
    const layoutFits = innerHeight >= 420 && (userMotion === true || parseFloat(getComputedStyle(root).fontSize) <= 20);
    const enabled = motionAllowed() && layoutFits;
    root.classList.toggle('motion-ready', enabled);
    root.classList.toggle('short-viewport', innerHeight < 650);
    root.classList.toggle('motion-opt-in', userMotion === true);
    motionSettings.hidden = false;
    motionToggle.disabled = !layoutFits;
    motionToggle.setAttribute('aria-pressed', String(enabled));
    motionToggle.textContent = !layoutFits ? 'Static view' : enabled ? 'Pause transitions' : 'Enable transitions';
    motionSettings.querySelector('p').textContent = !layoutFits ? 'Enlarge the window or reset text size to view transitions.' : enabled ? 'Scroll to see the scene transitions.' : userMotion === false ? 'Transitions paused. Enable them to view the animated demo.' : 'Your device reduces motion. Enable transitions to view the animated demo.';
    active = -1;
    if (enabled) paint();
    else {
      visual.style.transform = '';
      heroVisual.style.left = ''; heroVisual.style.top = ''; heroVisual.style.width = ''; heroVisual.style.transform = '';
      heroVisual.classList.remove('is-detail');
      heroVisual.style.opacity = ''; heroVisual.style.filter = ''; setInactive(heroVisual, false);
      document.querySelector('.product-controls').style.opacity = ''; setInactive(document.querySelector('.product-controls'), false);
      [kitScene, nextScene].forEach(scene => { scene.style.opacity = ''; scene.style.transform = ''; scene.style.filter = ''; setInactive(scene, true); });
      document.querySelector('.hero__halo').style.transform = '';
      heroCopy.style.opacity = ''; heroCopy.style.transform = ''; setInactive(heroCopy, false);
      heroDetail.style.opacity = ''; heroDetail.style.transform = ''; heroDetail.classList.remove('is-open'); setInactive(heroDetail, true);
      chapters.forEach(chapter => { chapter.classList.remove('is-active'); chapter.removeAttribute('aria-hidden'); });
      frames.forEach((frame, i) => { frame.classList.toggle('is-current', i === 0); frame.classList.remove('is-leaving'); frame.setAttribute('aria-hidden', String(i !== 0)); });
      document.querySelectorAll('[data-reveal]').forEach(element => element.classList.add('is-visible'));
    }
  };
  document.querySelectorAll('.hero__copy .text-link, .hero__explore').forEach(link => {
    link.addEventListener('click', event => {
      if (!root.classList.contains('motion-ready')) return;
      event.preventDefault();
      scrollToScene(.30);
    });
  });
  document.querySelector('.scene-inside').addEventListener('click', event => {
    if (!root.classList.contains('motion-ready')) return;
    event.preventDefault();
    scrollToScene(.62);
  });
  document.querySelector('.scene-continue').addEventListener('click', event => {
    if (!root.classList.contains('motion-ready')) return;
    event.preventDefault();
    scrollToScene(.96);
  });
  motionToggle.addEventListener('click', () => {
    userMotion = !motionAllowed();
    try { localStorage.setItem(preferenceKey, userMotion ? 'on' : 'off'); } catch { /* Keep the choice for this page if storage is blocked. */ }
    // A later pause must take precedence over a link that explicitly enabled motion.
    try { const url = new URL(location.href); url.searchParams.delete('motion'); history.replaceState(null, '', url); } catch { /* file:// may restrict history changes. */ }
    configure();
  });
  // Input and finite settling share one scheduled frame; no perpetual animation loop.
  window.addEventListener('scroll', () => { if (root.classList.contains('motion-ready')) schedule(); }, { passive: true });
  window.addEventListener('resize', configure);
  window.addEventListener('wheel', stopSceneScroll, { passive: true });
  window.addEventListener('touchstart', stopSceneScroll, { passive: true });
  document.addEventListener('keydown', event => { if (['PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown', ' '].includes(event.key)) stopSceneScroll(); });
  motion.addEventListener('change', configure);
  configure();
})();
