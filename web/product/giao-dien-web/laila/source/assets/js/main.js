/* Laila 1.0.0. All reveal animation is finite and defaults to enabled. */
(() => {
  'use strict';
  const header = document.querySelector('.header');
  const button = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#navigation');
  const narrow = window.matchMedia('(max-width:950px)');
  header.classList.add('is-ready');
  function close(returnFocus = false) {
    nav.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    if (returnFocus) button.focus();
  }
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) close(true);
  });
  narrow.addEventListener('change', () => close());
  if (!('IntersectionObserver' in window)) return;
  const frames = new Set();
  function reveal(element) {
    let start;
    function step(now) {
      if (start === undefined) start = now;
      const progress = Math.min((now - start) / 620, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.style.opacity = String(.25 + eased * .75);
      element.style.transform = `translateY(${22 * (1 - eased)}px)`;
      if (progress < 1) {
        const next = requestAnimationFrame(time => { frames.delete(next); step(time); });
        frames.add(next);
      } else {
        element.style.removeProperty('opacity');
        element.style.removeProperty('transform');
      }
    }
    const first = requestAnimationFrame(time => { frames.delete(first); step(time); });
    frames.add(first);
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        reveal(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
  window.addEventListener('pagehide', () => {
    observer.disconnect();
    frames.forEach(frame => cancelAnimationFrame(frame));
    document.querySelectorAll('[data-reveal]').forEach(element => {
      element.style.removeProperty('opacity');
      element.style.removeProperty('transform');
    });
  }, { once: true });
})();
