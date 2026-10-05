(() => {
  'use strict';
  const menu = document.querySelector('.navigation');
  const toggle = document.querySelector('.menu-toggle');
  if (menu && toggle) {
    const close = () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    menu.addEventListener('click', event => {
      if (event.target.closest('a')) close();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        close();
        toggle.focus();
      }
    });
    matchMedia('(max-width: 650px)').addEventListener('change', close);
    document.documentElement.classList.add('js');
  }
  // Finite frame-based reveal also works when CSS animation is unavailable.
  if (!('IntersectionObserver' in window) || !('requestAnimationFrame' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const start = performance.now();
      const frame = now => {
        const progress = Math.min(1, (now - start) / 550);
        const eased = 1 - (1 - progress) ** 3;
        entry.target.style.opacity = String(.65 + .35 * eased);
        entry.target.style.transform = `translateY(${12 * (1 - eased)}px)`;
        if (progress < 1) requestAnimationFrame(frame);
        else {
          entry.target.style.removeProperty('opacity');
          entry.target.style.removeProperty('transform');
        }
      };
      requestAnimationFrame(frame);
    });
  }, { threshold: .08 });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
})();
