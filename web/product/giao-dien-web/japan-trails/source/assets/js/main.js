/* Progressive enhancement: navigation and reveal only. */
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const mobile = window.matchMedia('(max-width: 950px)');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (toggle && nav) {
    const close = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) close();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        close();
        toggle.focus();
      }
    });
    mobile.addEventListener('change', close);
    root.classList.add('menu-ready');
  }

  const items = [...document.querySelectorAll('[data-reveal]')];
  if (!items.length || motion.matches || !('IntersectionObserver' in window)) return;
  let observer;
  const showAll = () => {
    root.classList.remove('reveal-ready');
    items.forEach(item => item.classList.add('is-visible'));
    observer?.disconnect();
  };
  try {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach(item => observer.observe(item));
    root.classList.add('reveal-ready');
    motion.addEventListener('change', showAll, { once: true });
    // The page never stays blank if an observer fails to deliver callbacks.
    window.setTimeout(showAll, 4500);
  } catch {
    showAll();
  }
})();
