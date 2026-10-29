/* ==========================================================================
   KINETIQ — page behaviour
   Mobile menu, session motion control (default ON per Owner Rule 05/10/2026),
   interactive assembly inspection, and finite requestAnimationFrame reveals.
   No dependencies, no build step.
   ========================================================================== */

(function () {
  'use strict';

  document.documentElement.classList.add('js');
  document.documentElement.dataset.motion = 'on';

  var motionPaused = false;
  var activeRafs = new Map();

  function cancelAllRafs() {
    activeRafs.forEach(function (id, el) {
      cancelAnimationFrame(id);
      el.style.removeProperty('opacity');
      el.style.removeProperty('transform');
    });
    activeRafs.clear();
  }

  /* ---- session motion toggle (default ON) ---------------------------- */

  var motionBtn = document.querySelector('[data-motion-toggle]');
  if (motionBtn) {
    motionBtn.addEventListener('click', function () {
      motionPaused = !motionPaused;
      document.documentElement.dataset.motion = motionPaused ? 'off' : 'on';
      motionBtn.setAttribute('aria-pressed', String(motionPaused));
      motionBtn.textContent = motionPaused ? 'Play motion' : 'Pause motion';
      if (motionPaused) cancelAllRafs();
    });
  }

  /* ---- mobile menu -------------------------------------------------- */

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  /* ---- finite requestAnimationFrame reveal on scroll ----------------- */

  var targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  function animateReveal(el) {
    el.classList.add('is-visible');
    if (motionPaused || typeof requestAnimationFrame !== 'function') return;
    var prev = activeRafs.get(el);
    if (prev) cancelAnimationFrame(prev);

    var start = performance.now();
    var duration = 560;
    function step(now) {
      if (motionPaused) {
        el.style.removeProperty('opacity');
        el.style.removeProperty('transform');
        activeRafs.delete(el);
        return;
      }
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      el.style.opacity = String((0.2 + 0.8 * eased).toFixed(3));
      el.style.transform = 'translate3d(0,' + ((1 - eased) * 18).toFixed(2) + 'px,0)';
      if (t < 1) {
        activeRafs.set(el, requestAnimationFrame(step));
      } else {
        el.style.removeProperty('opacity');
        el.style.removeProperty('transform');
        activeRafs.delete(el);
      }
    }
    activeRafs.set(el, requestAnimationFrame(step));
  }

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      animateReveal(entry.target);
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

  targets.forEach(function (el) { io.observe(el); });
})();
