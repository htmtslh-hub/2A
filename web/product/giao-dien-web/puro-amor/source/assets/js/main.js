/* Puro Amor: menu and finite reveal animation only. */
(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('navigation');
  const desktop = matchMedia('(min-width: 821px)');
  function closeMenu(returnFocus = false) {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  desktop.addEventListener('change', () => closeMenu());
  document.documentElement.classList.add('js');
  // Finite RAF reveal also works when CSS/WAAPI animations are unavailable.
  const running = new Map();
  function reveal(element, distance = 30, duration = 750) {
    if (running.has(element)) cancelAnimationFrame(running.get(element));
    const start = performance.now();
    function frame(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.style.opacity = String(.2 + eased * .8);
      element.style.transform = `translateY(${distance * (1 - eased)}px)`;
      if (progress < 1) running.set(element, requestAnimationFrame(frame));
      else {
        element.style.removeProperty('opacity');
        element.style.removeProperty('transform');
        running.delete(element);
      }
    }
    running.set(element, requestAnimationFrame(frame));
  }
  reveal(document.querySelector('.hero__copy'), 24, 700);
  reveal(document.querySelector('.hero__product'), 40, 1100);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
  }
  window.addEventListener('pagehide', () => {
    running.forEach((id, element) => {
      cancelAnimationFrame(id);
      element.style.removeProperty('opacity');
      element.style.removeProperty('transform');
    });
    running.clear();
  });
})();
