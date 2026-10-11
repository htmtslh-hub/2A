/* Ember Arcade: local demo interactions only. No remote services or game installs. */
(function () {
  'use strict';
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-menu');
  document.documentElement.classList.add('js-ready');
  const mobile = window.matchMedia('(max-width: 950px)');
  function closeMenu(focus) {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    if (focus) toggle.focus();
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
  mobile.addEventListener('change', function () { closeMenu(false); });

  const search = document.getElementById('game-search');
  const cards = Array.from(document.querySelectorAll('.game-card'));
  const status = document.getElementById('search-result');
  search.disabled = false;
  search.addEventListener('input', function () {
    const term = search.value.trim().toLowerCase();
    let found = 0;
    cards.forEach(function (card) {
      const matches = (card.dataset.name + ' ' + card.dataset.tags).toLowerCase().includes(term);
      card.hidden = !matches;
      if (matches) found += 1;
    });
    document.getElementById('empty-library').hidden = found > 0;
    status.textContent = term ? found + (found === 1 ? ' world found' : ' worlds found') : '';
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
      if (document.activeElement === search && search.value) {
        search.value = '';
        search.dispatchEvent(new Event('input'));
      }
    }
    const editing = event.target.closest('input,textarea,[contenteditable="true"]');
    if (event.key === '/' && !editing && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      search.focus();
    }
  });

  let saved = [];
  try {
    const value = JSON.parse(localStorage.getItem('ember-arcade-favourites') || '[]');
    if (Array.isArray(value)) saved = value.filter(function (id) { return id === 'moon' || id === 'ash'; });
  } catch (error) { saved = []; }
  document.querySelectorAll('[data-save]').forEach(function (button) {
    button.disabled = false;
    function render() {
      const active = saved.includes(button.dataset.save);
      const name = button.closest('.game-card').dataset.name;
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', (active ? 'Unsave ' : 'Save ') + name);
    }
    render();
    button.addEventListener('click', function () {
      const id = button.dataset.save;
      saved = saved.includes(id) ? saved.filter(function (value) { return value !== id; }) : saved.concat(id);
      try { localStorage.setItem('ember-arcade-favourites', JSON.stringify(saved)); } catch (error) {
        status.textContent = 'Saved for this visit. Device storage is unavailable.';
      }
      render();
    });
  });
  function openWorldNotes() {
    const target = document.getElementById(location.hash.slice(1));
    if (target && target.tagName === 'DETAILS') target.open = true;
  }
  window.addEventListener('hashchange', openWorldNotes);
  openWorldNotes();
  const sections = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    sections.forEach(function (section) { section.classList.add('is-visible'); });
    return;
  }
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });
  sections.forEach(function (section) { observer.observe(section); });
}());
