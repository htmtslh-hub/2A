/* Pinehaven: mobile navigation only. The page remains readable without JS. */
document.documentElement.classList.add('js');

const menuButton = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__links');

function closeMenu(returnFocus = false) {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menu.classList.toggle('is-open', opening);
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu(true);
  }
});

const desktopMenu = window.matchMedia('(min-width: 701px)');
desktopMenu.addEventListener('change', () => closeMenu());
