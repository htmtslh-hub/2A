(() => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('#site-menu');
  if (!toggle || !menu) return;
  document.documentElement.classList.add('js');
  const mobile = matchMedia('(max-width:950px)');
  const setOpen = (open, restoreFocus = false) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', event => {
    if (event.target.closest('a') && mobile.matches) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false, true);
  });
  const resetMenu = () => setOpen(false);
  if (mobile.addEventListener) mobile.addEventListener('change', resetMenu);
  else mobile.addListener(resetMenu);
})();
