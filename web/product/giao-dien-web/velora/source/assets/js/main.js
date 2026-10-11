/* Velora 1.2: finite product choreography, based on skill-morge.
   Data and visual state are separate so wrap direction precedes modulo. */
(() => {
  'use strict';
  const menuButton = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  const closeMenu = () => { menuButton.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  document.documentElement.classList.add('js');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
  });
  matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

  const root = document.querySelector('.showroom');
  if (!root) return;
  const find = selector => root.querySelector(selector);
  const slides = [...root.querySelectorAll('[data-product]')];
  const visual = find('.product-visual');
  const panel = find('.product-panel');
  const heading = find('.product-heading');
  const price = find('.product-price');
  const info = find('.product-info');
  const galleryAction = find('.gallery-action');
  const stage = find('.stage');
  const motionButton = find('[data-motion]');
  const models = [
    { name: 'Metro', price: 2850, tagline: 'A little more freedom, every day.', description: 'A sculptural folding bike for city streets and everyday detours.', wheels: '26 inches', gears: '2 speeds', weight: '14 kg', finish: 'chalk', wheel: 'three' },
    { name: 'Onyx', price: 2450, tagline: 'An understated ride for the city.', description: 'A clean graphite finish and classic wheels for an understated city ride.', wheels: '24 inches', gears: '8 speeds', weight: '13 kg', finish: 'graphite', wheel: 'spokes' },
    { name: 'Loop', price: 2650, tagline: 'Your everyday route, reimagined.', description: 'A lavender finish and compact city setup for shorter everyday journeys.', wheels: '20 inches', gears: '3 speeds', weight: '12 kg', finish: 'lavender', wheel: 'spokes' }
  ];
  const finishes = { chalk: { label: 'Chalk', colour: '#f4f4f1' }, graphite: { label: 'Graphite', colour: '#42454c' }, lavender: { label: 'Lavender', colour: '#b7b5ce' }, coral: { label: 'Coral', colour: '#e46d65' }, ocean: { label: 'Ocean', colour: '#5e9fbd' }, sage: { label: 'Sage', colour: '#95ad8d' } };
  const labels = { three: 'Three-spoke', spokes: 'Classic', disc: 'Disc', slim: 'Slim', city: 'City', flat: 'Flat', rise: 'Rise' };
  const setups = models.map(model => ({ wheels: model.wheel, finish: model.finish, saddle: 'slim', handle: 'flat' }));
  const duration = 850;
  let selected = 0, view = 0, scene = 0, enabled = true;
  let carouselFrame = 0, sceneFrame = 0, configFrame = 0, scrollFrame = 0;
  let touchStart = null, outgoingIndex = -1;
  const points = slides.map(() => ({ x: 0, scale: 1, opacity: 1 }));
  const mod = value => (value % models.length + models.length) % models.length;
  const mobile = () => innerWidth <= 760;
  const travel = () => mobile() ? 275 : Math.min(stage.clientWidth * .36, 490);
  const ease = value => 1 - Math.pow(1 - value, 4);
  const progress = (now, start, length) => Math.max(0, Math.min(1, (now - start) / length));
  const interpolate = (a, b, p) => a + (b - a) * p;
  // Every new visit starts on. OS preferences and saved off states do not disable it.
  function slot(index) {
    if (index === selected) return { x: 0, scale: 1, opacity: 1 };
    const side = mod(index - selected) === 1 ? 1 : -1;
    return { x: side * travel(), scale: .62, opacity: .4 };
  }
  function render() {
    slides.forEach((slide, index) => {
      const point = points[index];
      slide.style.transform = `translate3d(${point.x}px,0,0) scale(${point.scale})`;
      slide.style.opacity = String(point.opacity * (index === selected || index === outgoingIndex ? 1 : 1 - scene));
      slide.style.zIndex = String(index === selected ? 3 : 1);
    });
  }
  function settleCarousel() {
    cancelAnimationFrame(carouselFrame); carouselFrame = 0; outgoingIndex = -1;
    slides.forEach((slide, index) => Object.assign(points[index], slot(index))); render();
  }
  function paintScene() {
    const shift = mobile() ? 0 : -stage.clientWidth * .22 * scene;
    const scale = interpolate(1, mobile() ? .92 : 1.15, scene);
    visual.style.transform = `translate3d(${shift}px,${(mobile() ? -45 : -50) * scene}px,0) scale(${scale})`;
    panel.style.transform = `translate3d(${shift}px,0,0) scale(${interpolate(1, mobile() ? 1.08 : 1.35, scene)},${interpolate(1, mobile() ? .90 : 1.2, scene)})`;
    heading.style.transform = `translate3d(${shift}px,0,0)`;
    price.style.transform = `translate3d(${shift}px,${(mobile() ? -15 : 100) * scene}px,0)`;
    info.style.opacity = String(scene); info.style.transform = `translate3d(${(1 - scene) * 55}px,0,0)`;
    galleryAction.style.opacity = String(1 - scene); root.dataset.sceneProgress = scene.toFixed(4); render();
  }
  function fitStage() {
    const height = view ? Math.max(mobile() ? 1130 : 710, info.offsetTop + info.scrollHeight + 115) : mobile() ? 590 : 670;
    stage.style.height = height + 'px';
  }
  function setView(detail, focus = true) {
    cancelAnimationFrame(sceneFrame); sceneFrame = 0;
    cancelAnimationFrame(configFrame); configFrame = 0;
    slides.forEach(slide => { slide.querySelector('.product-slide__art').style.transform = ''; });
    view = detail ? 1 : 0; root.dataset.view = detail ? 'detail' : 'gallery';
    info.inert = !detail; info.setAttribute('aria-hidden', String(!detail));
    galleryAction.inert = detail; galleryAction.setAttribute('aria-hidden', String(detail));
    slides.forEach((slide, index) => { slide.inert = detail && index !== selected; slide.querySelector('[data-select]').disabled = detail; slide.setAttribute('aria-hidden', String(detail && index !== selected)); });
    fitStage();
    if (focus) (detail ? find('[data-back]') : find('[data-open]')).focus({ preventScroll: true });
    const start = scene;
    if (!enabled) { scene = view; paintScene(); return; }
    const began = performance.now();
    const tick = now => {
      sceneFrame = 0;
      const p = progress(now, began, 950); scene = interpolate(start, view, ease(p)); paintScene();
      if (p < 1) sceneFrame = requestAnimationFrame(tick);
    };
    sceneFrame = requestAnimationFrame(tick);
  }
  function applySetup() {
    const model = models[selected], setup = setups[selected], slide = slides[selected];
    slide.dataset.wheels = setup.wheels; slide.dataset.saddle = setup.saddle; slide.dataset.handle = setup.handle;
    const paint = slide.querySelector('linearGradient[id$="-paint"]');
    [...paint.querySelectorAll('stop')].slice(0, 2).forEach(stop => stop.setAttribute('stop-color', finishes[setup.finish].colour));
    slide.querySelector('.bike__frame').setAttribute('stroke', setup.finish === 'graphite' ? '#555c66' : '#b4b9be');
    slide.querySelector('text').setAttribute('fill', setup.finish === 'graphite' ? '#f4f4f1' : '#3b414c');
    const summary = `${model.name} / ${finishes[setup.finish].label} / ${labels[setup.wheels]} / ${labels[setup.saddle]} / ${labels[setup.handle]}`;
    find('[data-finish]').textContent = finishes[setup.finish].label + ' / ' + labels[setup.wheels];
    find('[data-summary]').textContent = summary;
    find('[data-enquiry]').href = 'mailto:hello@example.com?subject=' + encodeURIComponent('Velora ' + model.name + ' enquiry') + '&body=' + encodeURIComponent('I would like to ask about: ' + summary + '. Sample displayed price: $' + model.price.toLocaleString('en-US'));
    slide.querySelector('.bike').setAttribute('aria-label', summary + ' folding bicycle');
  }
  function syncModel() {
    const model = models[selected], setup = setups[selected];
    find('[data-model-name]').textContent = model.name; find('[data-model-tagline]').textContent = model.tagline;
    find('[data-description]').textContent = model.description;
    find('[data-price]').textContent = '$' + model.price.toLocaleString('en-US');
    find('[data-count]').textContent = `${model.name} · ${selected + 1} of ${models.length}`;
    find('[data-spec-name]').textContent = model.name + ' specifications';
    find('[data-spec-wheel]').textContent = model.wheels; find('[data-spec-gears]').textContent = model.gears; find('[data-spec-weight]').textContent = model.weight;
    root.dataset.selected = String(selected); root.dataset.model = model.name;
    slides.forEach((slide, index) => { const button = slide.querySelector('[data-select]'); button.disabled = Boolean(view); button.tabIndex = index === selected ? 0 : -1; });
    info.querySelectorAll('input[type="radio"]').forEach(input => { input.checked = setup[input.name] === input.value; });
    applySetup(); fitStage();
  }
  function select(requested, direction = 1) {
    const target = mod(requested), outgoing = selected;
    if (target === selected) return;
    cancelAnimationFrame(carouselFrame); carouselFrame = 0;
    cancelAnimationFrame(configFrame); configFrame = 0;
    slides.forEach(slide => { slide.querySelector('.product-slide__art').style.transform = ''; });
    selected = target; outgoingIndex = outgoing; syncModel();
    slides.forEach((slide, index) => { slide.setAttribute('aria-hidden', String(Boolean(view && index !== selected))); slide.inert = Boolean(view && index !== selected); });
    if (!enabled) { settleCarousel(); return; }
    const sign = direction < 0 ? -1 : 1, distance = travel();
    // Outgoing keeps its last frame. Unrelated previews are recycled outside
    // the stage, never animated across the selected product's centre.
    if (points[target].x * sign <= 0) points[target] = { x: sign * distance, scale: .62, opacity: .4 };
    const third = slides.findIndex((_, index) => index !== outgoing && index !== target);
    if (third >= 0) points[third] = { x: sign * distance * 1.85, scale: .50, opacity: 0 };
    const starts = points.map(point => ({ ...point }));
    const ends = points.map((_, index) => index === outgoing ? { x: -sign * distance, scale: .62, opacity: view ? 0 : .4 } : slot(index));
    const began = performance.now(); root.dataset.direction = String(sign);
    const tick = now => {
      carouselFrame = 0;
      const p = progress(now, began, duration), eased = ease(p);
      points.forEach((point, index) => {
        for (const property of ['x', 'scale', 'opacity']) point[property] = interpolate(starts[index][property], ends[index][property], eased);
      });
      render();
      if (p < 1) carouselFrame = requestAnimationFrame(tick); else settleCarousel();
    };
    render(); carouselFrame = requestAnimationFrame(tick);
  }
  function changeSetup(event) {
    const input = event.target;
    if (!input.matches('input[type="radio"]')) return;
    setups[selected][input.name] = input.value; applySetup();
    cancelAnimationFrame(configFrame); configFrame = 0;
    const art = slides[selected].querySelector('.product-slide__art');
    if (!enabled) { art.style.transform = ''; return; }
    const started = performance.now();
    const tick = now => {
      configFrame = 0;
      const p = progress(now, started, 450); art.style.transform = `scale(${1 - .025 * Math.sin(p * Math.PI)})`;
      if (p < 1) configFrame = requestAnimationFrame(tick); else art.style.transform = '';
    };
    configFrame = requestAnimationFrame(tick);
  }
  function activateTab(button, group, attribute, panels) {
    group.querySelectorAll('[role="tab"]').forEach(tab => { const active = tab === button; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
    panels.forEach(id => { find('#' + id).hidden = button.getAttribute('aria-controls') !== id; });
    root.dataset[attribute + 'Active'] = button.dataset[attribute]; fitStage();
  }
  function wireTabs(selector, attribute, panels) {
    const group = find(selector);
    group.addEventListener('click', event => { const button = event.target.closest('[role="tab"]'); if (button) activateTab(button, group, attribute, panels); });
    group.addEventListener('keydown', event => {
      const tabs = [...group.querySelectorAll('[role="tab"]')], index = tabs.indexOf(document.activeElement);
      if (index < 0 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      tabs[nextIndex].focus(); activateTab(tabs[nextIndex], group, attribute, panels);
    });
  }
  function stopScroll() { cancelAnimationFrame(scrollFrame); scrollFrame = 0; }
  function scrollToShowroom() {
    stopScroll();
    const from = scrollY, target = root.getBoundingClientRect().top + scrollY - 20;
    if (!enabled) { scrollTo(0, target); return; }
    const started = performance.now();
    const tick = now => {
      scrollFrame = 0; const p = progress(now, started, 650); scrollTo(0, interpolate(from, target, ease(p)));
      if (p < 1) scrollFrame = requestAnimationFrame(tick);
    };
    scrollFrame = requestAnimationFrame(tick);
  }
  find('[data-prev]').addEventListener('click', () => select(selected - 1, -1));
  find('[data-next]').addEventListener('click', () => select(selected + 1, 1));
  find('.carousel-controls').addEventListener('keydown', event => {
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); const direction = event.key === 'ArrowRight' ? 1 : -1; select(selected + direction, direction); }
  });
  find('[data-open]').addEventListener('click', () => setView(true));
  slides.forEach((slide, index) => slide.querySelector('[data-select]').addEventListener('click', () => { if (index === selected) setView(true); else select(index, mod(index - selected) === 1 ? 1 : -1); }));
  find('[data-back]').addEventListener('click', () => setView(false));
  root.addEventListener('keydown', event => { if (event.key === 'Escape' && view) { event.preventDefault(); setView(false); } });
  info.addEventListener('change', changeSetup);
  wireTabs('.info-tabs', 'info', ['overview-panel', 'specs-panel']);
  wireTabs('.configure-tabs', 'category', ['wheels-panel', 'frame-panel', 'saddle-panel', 'handle-panel']);
  motionButton.addEventListener('click', () => {
    enabled = !enabled; motionButton.textContent = enabled ? 'Pause animation' : 'Resume animation'; motionButton.setAttribute('aria-pressed', String(enabled));
    if (!enabled) {
      settleCarousel(); cancelAnimationFrame(sceneFrame); sceneFrame = 0; cancelAnimationFrame(configFrame); configFrame = 0; stopScroll();
      slides.forEach(slide => { slide.querySelector('.product-slide__art').style.transform = ''; }); scene = view; paintScene();
    }
  });
  document.querySelectorAll('[data-explore]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault(); const index = Number(link.dataset.explore); select(index, index < selected ? -1 : 1); setView(true); scrollToShowroom();
  }));
  document.querySelectorAll('[data-gallery]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); setView(false, false); scrollToShowroom(); }));
  visual.addEventListener('touchstart', event => { const point = event.touches[0]; touchStart = point ? { x: point.clientX, y: point.clientY } : null; }, { passive: true });
  visual.addEventListener('touchend', event => {
    const point = event.changedTouches[0];
    if (touchStart && point) {
      const dx = point.clientX - touchStart.x, dy = point.clientY - touchStart.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) select(selected + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    }
    touchStart = null;
  }, { passive: true });
  visual.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
  ['wheel', 'touchstart'].forEach(event => window.addEventListener(event, stopScroll, { passive: true }));
  window.addEventListener('keydown', event => { if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) stopScroll(); });
  window.addEventListener('resize', () => { stopScroll(); cancelAnimationFrame(sceneFrame); sceneFrame = 0; scene = view; settleCarousel(); fitStage(); paintScene(); }, { passive: true });
  root.classList.add('ready'); document.body.classList.add('ready'); visual.style.transformOrigin = '50% 0';
  info.inert = true; info.setAttribute('aria-hidden', 'true'); syncModel(); settleCarousel(); paintScene();
})();
