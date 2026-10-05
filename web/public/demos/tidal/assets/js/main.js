/* ==========================================================================
   TIDAL — page behaviour
   Two small things only: the mobile menu, and a reveal-on-scroll effect.
   No dependencies, no build step.
   ========================================================================== */

(function () {
  'use strict';

  // CSS hides the mobile menu and the reveal content only under .js, so a
  // visitor without JavaScript still gets every section and the menu links.
  document.documentElement.classList.add('js');

  /* ---- mobile menu -------------------------------------------------- */

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    var close = function () {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    // Tapping a link closes the menu again.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });

    // Escape closes it and puts focus back on the button.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        close();
        toggle.focus();
      }
    });

    // Crossing the 960px breakpoint (same as the CSS) resets the menu.
    var mobile = window.matchMedia('(max-width: 960px)');
    if (mobile.addEventListener) mobile.addEventListener('change', close);
  }

  /* ---- reveal on scroll ---------------------------------------------- */

  var targets = document.querySelectorAll('[data-reveal]');

  // Someone who asked their system for less motion gets everything at once.
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!targets.length) return;

  if (still || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

  targets.forEach(function (el) { io.observe(el); });
})();
