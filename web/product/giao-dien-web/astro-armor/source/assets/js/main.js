/* ASTRO Armor — finite motion and local concept-store interactions. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const jacket = document.querySelector('#jacket');
  const wrap = document.querySelector('.jacket-wrap');
  const status = document.querySelector('#selection-status');
  const bag = [];
  const frames = new Map();
  let colour = 'beige';
  let size = 'M';
  let paused = false;
  const capitalise = value => value.charAt(0).toUpperCase() + value.slice(1);

  // Finite RAF interpolation also works when CSS/WAAPI transitions are unavailable.
  function animate(element, from, to, duration, paint) {
    cancelAnimationFrame(frames.get(element));
    if (paused) { paint(to); return; }
    let start;
    function tick(now) {
      start ??= now;
      const progress = Math.min(1, (now - start) / duration);
      paint(from + (to - from) * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frames.set(element, requestAnimationFrame(tick));
      else frames.delete(element);
    }
    frames.set(element, requestAnimationFrame(tick));
  }
  function closeMenu(restore = false) {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (restore) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) closeMenu(true);
  });
  const mobile = matchMedia('(max-width: 950px)');
  mobile.addEventListener('change', () => closeMenu());

  const dialogs = document.querySelectorAll('dialog');
  document.querySelectorAll('[data-open]').forEach(button => {
    button.addEventListener('click', () => document.getElementById(button.dataset.open).showModal());
  });
  dialogs.forEach(dialog => {
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        dialog.close();
      }
    });
    dialog.addEventListener('click', event => {
      if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      }
      if (event.target.closest('[data-close-dialog]')) dialog.close();
    });
  });
  function announce() { status.textContent = `${capitalise(colour)}, size ${size} selected`; }
  document.querySelectorAll('[data-size]').forEach(button => {
    button.addEventListener('click', () => {
      size = button.dataset.size;
      document.querySelectorAll('[data-size]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      announce();
    });
  });
  document.querySelectorAll('[data-colour]').forEach(button => {
    button.addEventListener('click', () => {
      colour = button.dataset.colour;
      document.querySelectorAll('[data-colour]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      jacket.className = `jacket jacket--${colour}`;
      if (colour === 'beige') jacket.classList.add('jacket--reference');
      jacket.src = colour === 'beige' ? 'assets/img/armor-reference.jpg' : `assets/img/armor-${colour === 'red' ? 'red' : 'beige'}.webp`;
      jacket.alt = `${capitalise(colour)} oversized puffer jacket, colour concept preview with technical line drawings`;
      animate(jacket, 0, 1, 380, value => {
        jacket.style.opacity = String(.45 + .55 * value);
        jacket.style.transform = `translateY(${(1 - value) * 14}px) scale(${.97 + .03 * value})`;
      });
      announce();
    });
  });
  document.querySelector('#favourite').addEventListener('click', event => {
    const button = event.currentTarget;
    const saved = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(saved));
    button.textContent = saved ? 'Favorited ✓' : 'Favorite';
    status.textContent = saved ? 'Favourite saved for this visit' : 'Favourite removed';
  });
  function renderBag() {
    const list = document.querySelector('#bag-items');
    list.replaceChildren();
    if (!bag.length) {
      const empty = document.createElement('li');
      empty.textContent = 'Your bag is empty.';
      list.append(empty);
    }
    bag.forEach((item, index) => {
      const row = document.createElement('li');
      row.textContent = `Winter Armor II / ${capitalise(item.colour)} / ${item.size} — $560`;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', `Remove ${item.colour} size ${item.size}`);
      remove.addEventListener('click', () => { bag.splice(index, 1); renderBag(); document.querySelector('#bag-dialog .dialog-close').focus(); });
      row.append(remove);
      list.append(row);
    });
    const count = document.querySelector('#bag-count');
    count.textContent = String(bag.length);
    count.hidden = bag.length === 0;
    document.querySelector('#bag-total').textContent = `$${bag.length * 560}`;
  }
  document.querySelector('#add-bag').addEventListener('click', () => {
    bag.push({ colour, size });
    renderBag();
    status.textContent = `${capitalise(colour)} size ${size} added to demo bag. No order placed.`;
    document.querySelector('#bag-dialog').showModal();
  });
  document.querySelector('#product-search').addEventListener('input', event => {
    const query = event.target.value.trim().toLowerCase();
    const result = document.querySelector('#search-result');
    const match = !query || 'astro winter armor ii puffer jacket'.includes(query);
    result.replaceChildren();
    if (match) {
      const link = document.createElement('a');
      link.href = '#main';
      link.textContent = 'Winter Armor II — $560';
      link.dataset.closeDialog = '';
      result.append(link);
    } else result.textContent = 'No matching piece. Try “winter” or “armor”.';
  });
  document.querySelector('[data-motion-toggle]').addEventListener('click', event => {
    paused = !paused;
    event.currentTarget.textContent = paused ? 'Resume motion' : 'Pause motion';
    event.currentTarget.setAttribute('aria-pressed', String(paused));
    frames.forEach(frame => cancelAnimationFrame(frame));
    frames.clear();
    jacket.style.opacity = '1';
    jacket.style.transform = 'none';
    wrap.style.transform = 'none';
    document.querySelectorAll('[data-reveal]').forEach(element => { element.style.opacity = '1'; element.style.transform = 'none'; });
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animate(entry.target, 0, 1, 460, value => {
          entry.target.style.opacity = String(.3 + .7 * value);
          entry.target.style.transform = `translateY(${(1 - value) * 24}px)`;
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
  }
  let scrollFrame = 0;
  function scrollPaint() {
    scrollFrame = 0;
    if (paused) return;
    const progress = Math.min(1, Math.max(0, scrollY / 700));
    wrap.style.transform = `translateY(${progress * -20}px)`;
  }
  addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(scrollPaint);
  }, { passive: true });
  addEventListener('resize', scrollPaint);
  animate(jacket, 0, 1, 650, value => {
    jacket.style.opacity = String(.35 + .65 * value);
    jacket.style.transform = `translateY(${(1 - value) * 20}px)`;
  });
})();
