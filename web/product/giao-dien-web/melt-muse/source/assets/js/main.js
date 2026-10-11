/* Melt Muse: progressive navigation and finite entrance motion. */
(function () {
  'use strict';
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-menu');
  if (!toggle || !nav) return;
  document.documentElement.classList.add('js-ready');
  const mobile = window.matchMedia('(max-width: 950px)');

  function closeMenu(returnFocus) {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  mobile.addEventListener('change', function () { closeMenu(false); });

  const sections = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    sections.forEach(function (section) { section.classList.add('is-visible'); });
    return;
  }
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  sections.forEach(function (section) { observer.observe(section); });
}());
