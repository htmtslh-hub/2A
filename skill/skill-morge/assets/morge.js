/* skill-morge: reusable motion starter, no external dependencies. */
(() => {
  'use strict';
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = value => { const p = clamp(value); return p * p * (3 - 2 * p); };
  window.Morge = { mount(root, options = {}) {
    if (!root) throw new Error('Morge.mount requires a root element.');
    const duration = Math.max(0, options.duration ?? 1050);
    const travel = options.travel ?? 65;
    const key = options.storageKey ?? 'skill-morge-motion';
    const minHeight = options.minHeight ?? 420;
    const find = selector => root.querySelector(selector);
    const slides = [...root.querySelectorAll('[data-morge-slide]')];
    const visual = find('[data-morge-visual]');
    const controls = find('[data-morge-controls]');
    const count = find('[data-morge-count]');
    const motionButton = find('[data-morge-motion]');
    const story = find('[data-morge-story]');
    const scenes = [...root.querySelectorAll('[data-morge-scene]')];
    if (scenes.length > 3) throw new Error('The starter timeline supports up to three scenes.');
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const listeners = [];
    let selected = 0, preference = null, dead = false, touch = null;
    let carouselFrame = 0, carouselTimer = 0, paintFrame = 0, scrollFrame = 0;
    let position = null, lastPaint = 0;
    const listen = (element, event, handler, settings) => {
      if (!element) return;
      element.addEventListener(event, handler, settings);
      listeners.push(() => element.removeEventListener(event, handler, settings));
    };
    try {
      const saved = localStorage.getItem(key);
      if (saved === 'on' || saved === 'off') preference = saved === 'on';
    } catch { /* Component must work with storage blocked. */ }
    const query = new URLSearchParams(location.search).get('motion');
    if (query === 'on' || query === 'off') {
      preference = query === 'on';
      try { localStorage.setItem(key, query); } catch { /* URL remains effective. */ }
    }
    const allowed = () => preference ?? !media.matches;
    const pinned = () => allowed() && innerHeight >= minHeight && scenes.length > 1;
    const inactive = (element, value) => {
      if (value && element.contains(document.activeElement)) {
        if (motionButton) motionButton.focus({ preventScroll: true });
        else { root.tabIndex = -1; root.focus({ preventScroll: true }); }
      }
      element.setAttribute('aria-hidden', String(value)); element.inert = value;
    };
    const place = (slide, slot) => {
      const x = slot === 0 ? 0 : slot === 1 ? travel : travel * 1.69;
      slide.style.transform = `translate3d(${x}%,0,0) rotate(${slot ? 12 : -8}deg) scale(${slot === 0 ? 1 : slot === 1 ? .46 : .32})`;
      slide.style.opacity = String(slot === 0 ? 1 : slot === 1 ? .46 : .25);
      slide.style.zIndex = String(slot === 0 ? 3 : slot === 1 ? 2 : 1);
    };
    const cancelCarousel = () => {
      clearTimeout(carouselTimer); cancelAnimationFrame(carouselFrame);
      carouselTimer = carouselFrame = 0;
    };
    const settle = () => {
      cancelCarousel();
      slides.forEach((slide, index) => {
        slide.style.transition = 'none';
        place(slide, (index - selected + slides.length) % slides.length);
        inactive(slide, index !== selected);
      });
      if (visual) void visual.offsetWidth;
      slides.forEach(slide => { slide.style.transition = ''; });
    };
    const select = (requested, direction = requested < selected ? -1 : 1) => {
      if (dead || !Number.isInteger(requested) || !slides.length) return;
      const previous = selected;
      selected = (requested % slides.length + slides.length) % slides.length;
      const sign = direction < 0 ? -1 : 1;
      cancelCarousel();
      if (allowed() && duration > 0 && selected !== previous) {
        const outgoing = slides[previous], incoming = slides[selected];
        const current = getComputedStyle(outgoing);
        const start = { transform: current.transform, opacity: current.opacity };
        slides.forEach((slide, index) => {
          slide.style.transition = 'none';
          if (index !== previous && index !== selected) place(slide, (index - selected + slides.length) % slides.length);
          inactive(slide, index !== selected);
        });
        Object.assign(outgoing.style, start, { zIndex: '2' });
        Object.assign(incoming.style, {
          transform: `translate3d(${sign * travel}%,0,0) rotate(${sign * 12}deg) scale(.46)`, opacity: '.46', zIndex: '3'
        });
        if (visual) void visual.offsetWidth;
        carouselFrame = requestAnimationFrame(() => {
          carouselFrame = 0;
          slides.forEach(slide => { slide.style.transition = ''; });
          place(incoming, 0);
          outgoing.style.transform = `translate3d(${-sign * travel}%,0,0) rotate(${-sign * 12}deg) scale(.46)`;
          outgoing.style.opacity = '0';
          carouselTimer = setTimeout(settle, duration + 60);
        });
      } else settle();
      if (count) count.textContent = `${String(selected + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      root.dataset.morgeSelected = String(selected);
      options.onSelect?.(selected);
    };
    const stopScroll = () => { cancelAnimationFrame(scrollFrame); scrollFrame = 0; };
    const stopPaint = () => { cancelAnimationFrame(paintFrame); paintFrame = 0; lastPaint = 0; };
    const targetProgress = () => {
      const rect = story.getBoundingClientRect();
      return clamp(-rect.top / Math.max(1, rect.height - innerHeight));
    };
    const paint = now => {
      paintFrame = 0;
      if (dead || !story || !pinned()) return;
      const target = targetProgress(), rect = story.getBoundingClientRect();
      const dt = lastPaint ? Math.min(32, Math.max(1, now - lastPaint)) : 16;
      lastPaint = now;
      position = position === null || rect.bottom < 0 || rect.top > innerHeight ? target : position + (target - position) * (1 - Math.exp(-dt / 70));
      if (Math.abs(position - target) < .0002) position = target;
      const a = smooth((position - .12) / .3), b = scenes.length > 2 ? smooth((position - .62) / .3) : 0;
      const states = [
        { x: -a * 70, y: 0, opacity: 1 - a, scale: 1 - a * .14 },
        { x: (1 - a) * 80, y: -b * 80, opacity: a * (1 - b), scale: .86 + a * .14 - b * .12 },
        { x: 0, y: (1 - b) * 90, opacity: b, scale: .88 + b * .12 }
      ];
      scenes.forEach((scene, index) => {
        const state = states[index];
        scene.style.transform = `translate3d(${state.x}%,${state.y}%,0) scale(${state.scale})`;
        scene.style.opacity = String(state.opacity);
        inactive(scene, state.opacity < .98);
      });
      root.dataset.morgeActiveScene = b > .5 ? '2' : a > .5 ? '1' : '0';
      root.dataset.morgeProgress = position.toFixed(4);
      if (position !== target) schedule();
    };
    function schedule() { if (!dead && story && pinned() && !paintFrame) paintFrame = requestAnimationFrame(paint); }
    const goToScene = index => {
      if (dead || !story || !Number.isInteger(index) || index < 0 || index >= scenes.length) return;
      stopScroll();
      if (!pinned()) { scenes[index].scrollIntoView({ behavior: 'instant', block: 'start' }); return; }
      const start = scrollY;
      const target = story.getBoundingClientRect().top + scrollY + (story.offsetHeight - innerHeight) * index / Math.max(1, scenes.length - 1);
      const distance = target - start;
      if (Math.abs(distance) < 1) return;
      const started = performance.now(), length = Math.min(1400, Math.max(700, Math.abs(distance) * .65));
      const step = now => {
        scrollFrame = 0;
        if (dead || !pinned()) return;
        const p = clamp((now - started) / length);
        window.scrollTo({ top: start + distance * smooth(p), behavior: 'instant' }); schedule();
        if (p < 1) scrollFrame = requestAnimationFrame(step);
      };
      scrollFrame = requestAnimationFrame(step);
    };
    const configure = () => {
      stopScroll(); stopPaint(); position = null;
      root.classList.toggle('morge-motion', pinned()); root.classList.toggle('morge-paused', !allowed());
      if (motionButton) {
        motionButton.textContent = allowed() ? 'Tạm dừng animation' : 'Bật animation';
        motionButton.setAttribute('aria-pressed', String(allowed()));
      }
      if (!allowed()) settle();
      if (!pinned()) scenes.forEach(scene => {
        scene.style.transform = ''; scene.style.opacity = ''; inactive(scene, false);
      });
      schedule();
    };
    const setMotion = enabled => {
      if (dead) return;
      preference = Boolean(enabled);
      try { localStorage.setItem(key, preference ? 'on' : 'off'); } catch { /* Optional persistence. */ }
      try {
        const url = new URL(location.href); url.searchParams.delete('motion');
        history.replaceState(history.state, '', url.href);
      } catch { /* file:// browsers can reject replaceState. */ }
      configure();
    };
    root.style.setProperty('--morge-duration', `${duration}ms`); root.classList.add('morge-ready');
    listen(find('[data-morge-next]'), 'click', () => select(selected + 1, 1));
    listen(find('[data-morge-prev]'), 'click', () => select(selected - 1, -1));
    listen(controls, 'keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); select(selected + (event.key === 'ArrowRight' ? 1 : -1)); }
    });
    listen(visual, 'touchstart', event => {
      const point = event.touches[0]; touch = point ? { x: point.clientX, y: point.clientY } : null;
    }, { passive: true });
    listen(visual, 'touchend', event => {
      const point = event.changedTouches[0];
      if (touch && point) {
        const dx = point.clientX - touch.x, dy = point.clientY - touch.y;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) select(selected + (dx < 0 ? 1 : -1));
      }
      touch = null;
    }, { passive: true });
    listen(visual, 'touchcancel', () => { touch = null; }, { passive: true });
    listen(motionButton, 'click', () => setMotion(!allowed()));
    root.querySelectorAll('[data-morge-scene-to]').forEach(button => listen(button, 'click', () => goToScene(Number(button.dataset.morgeSceneTo))));
    listen(window, 'scroll', schedule, { passive: true }); listen(window, 'resize', configure, { passive: true });
    listen(window, 'wheel', stopScroll, { passive: true }); listen(window, 'touchstart', stopScroll, { passive: true });
    listen(window, 'keydown', event => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) stopScroll();
    });
    listen(media, 'change', configure); select(0); configure();
    return {
      next: () => select(selected + 1, 1), previous: () => select(selected - 1, -1), select, setMotion, goToScene,
      destroy() {
        if (dead) return;
        dead = true; cancelCarousel(); stopScroll(); stopPaint(); listeners.forEach(remove => remove());
        root.classList.remove('morge-ready', 'morge-motion', 'morge-paused'); root.style.removeProperty('--morge-duration');
        slides.concat(scenes).forEach(element => {
          ['transform', 'opacity', 'z-index', 'transition'].forEach(property => element.style.removeProperty(property));
          element.removeAttribute('aria-hidden'); element.inert = false;
        });
        ['morgeSelected', 'morgeActiveScene', 'morgeProgress'].forEach(key => { delete root.dataset[key]; });
      }
    };
  } };
})();
