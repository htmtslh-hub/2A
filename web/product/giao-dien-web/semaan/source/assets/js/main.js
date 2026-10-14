/* Semaan: mobile navigation and finite scroll entrances. */
(() => {
  'use strict';
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('#navigation');
  const narrow = matchMedia('(max-width: 650px)');
  function setMenu(open) {
    navigation.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  }
  function resetMenu() {
    navigation.hidden = narrow.matches;
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', () => setMenu(navigation.hidden));
  navigation.addEventListener('click', event => {
    if (event.target.closest('a') && narrow.matches) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && narrow.matches && !navigation.hidden) {
      setMenu(false);
      toggle.focus();
    }
  });
  narrow.addEventListener('change', resetMenu);
  document.documentElement.classList.add('js');
  resetMenu();
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      let start;
      // Finite RAF also works when CSS animations or WAAPI are unavailable.
      function frame(time) {
        start ??= time;
        const progress = Math.min(1, (time - start) / 620);
        const eased = 1 - Math.pow(1 - progress, 3);
        entry.target.style.opacity = String(.4 + .6 * eased);
        entry.target.style.transform = `translateY(${(1 - eased) * 24}px)`;
        if (progress < 1) requestAnimationFrame(frame);
        else {
          entry.target.style.removeProperty('opacity');
          entry.target.style.removeProperty('transform');
        }
      }
      requestAnimationFrame(frame);
    });
  }, { threshold: .12 });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
})();
