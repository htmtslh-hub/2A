/* Galaxy Edge: navigation, scroll depth and finite reveals. */
(() => {
  'use strict';
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('#navigation');
  const mobile = window.matchMedia('(max-width: 780px)');
  function closeMenu(returnFocus = false) {
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  mobile.addEventListener('change', () => closeMenu());
  document.documentElement.classList.add('js');

  // One frame per scroll/resize burst; no perpetual animation loop.
  const hero = document.querySelector('.hero');
  const scene = document.querySelector('.galaxy-scene');
  let scrollFrame = 0;
  function updateDepth() {
    scrollFrame = 0;
    const bounds = hero.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -bounds.top / bounds.height));
    const travel = mobile.matches ? 22 : 55;
    scene.style.transform = 'translateY(' + (progress * travel).toFixed(2) + 'px) scale(' + (1 + progress * .045).toFixed(4) + ')';
  }
  function requestDepth() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateDepth);
  }
  window.addEventListener('scroll', requestDepth, { passive: true });
  window.addEventListener('resize', requestDepth);
  window.addEventListener('pageshow', requestDepth);
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
    scene.style.removeProperty('transform');
  }, { once: true });
  requestDepth();

  // RAF is the primary motion path, independent of CSS animation support.
  // Visible content is never hidden before intersection, preserving failure safety.
  if ('IntersectionObserver' in window) {
    const active = new Map();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const element = entry.target;
        const start = performance.now();
        function frame(now) {
          const progress = Math.min(1, (now - start) / 650);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.style.opacity = String(.35 + eased * .65);
          element.style.transform = `translateY(${(1 - eased) * 28}px)`;
          if (progress < 1) active.set(element, requestAnimationFrame(frame));
          else {
            element.style.removeProperty('opacity');
            element.style.removeProperty('transform');
            active.delete(element);
          }
        }
        active.set(element, requestAnimationFrame(frame));
      });
    }, { threshold: .1 });
    document.querySelectorAll('[data-reveal], .packages article, .worlds__details article, .flight-panel').forEach(element => observer.observe(element));
    window.addEventListener('pagehide', () => {
      observer.disconnect();
      active.forEach((id, element) => {
        cancelAnimationFrame(id);
        element.style.removeProperty('opacity');
        element.style.removeProperty('transform');
      });
      active.clear();
    }, { once: true });
  }
})();
