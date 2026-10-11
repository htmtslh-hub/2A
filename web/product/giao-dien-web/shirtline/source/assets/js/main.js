(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const looks = [
    ['assets/img/shirt-noir.webp', 'NOIR OXFORD', '$148', 'noir'],
    ['assets/img/shirt-cabernet.webp', 'CABERNET CAMP', '$142', 'cabernet'],
    ['assets/img/shirt-linen.webp', 'LINEN SAND', '$156', 'linen'],
    ['assets/img/shirt-olive.webp', 'OLIVE UTILITY', '$164', 'olive'],
    ['assets/img/shirt-white.webp', 'WHITE MANDARIN', '$152', 'white']
  ];
  const ROTATION_MS = 1600, AUTO_MS = 5600;
  const stage = document.querySelector('.hero-stage');
  const preview = document.querySelector('#next-preview');
  const dots = [...stage.querySelectorAll('.dot')];
  const orbit = document.createElement('div');
  orbit.className = 'shirt-orbit';
  const shadows = looks.map(() => {
    const shadow = document.createElement('span');
    shadow.className = 'shirt-ground-shadow';
    shadow.setAttribute('aria-hidden', 'true');
    orbit.append(shadow);
    return shadow;
  });
  const shirts = looks.map((look) => {
    const image = document.createElement('img');
    image.src = look[0];
    image.alt = look[1].toLowerCase() + ' shirt';
    image.draggable = false;
    orbit.append(image);
    return image;
  });
  document.querySelector('#hero-shirt').replaceWith(orbit);
  stage.setAttribute('aria-label', 'Rotating shirt collection');
  document.querySelector('#hero-no').setAttribute('aria-live', 'polite');
  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'orbit-pause';
  pauseButton.textContent = 'Ⅱ';
  pauseButton.setAttribute('aria-label', 'Pause automatic rotation');
  pauseButton.setAttribute('aria-pressed', 'false');
  stage.querySelector('.hero-controls').append(pauseButton);
  let position = 0, target = 0, selected = 0, raf = 0, timer = 0;
  let userPaused = false, hovered = false, focused = false;
  const normalise = (value) => ((value % looks.length) + looks.length) % looks.length;
  const paused = () => userPaused || hovered || focused || document.hidden;

  // All shirts remain on one oval; depth changes size, never image identity.
  function paint() {
    const radius = orbit.clientWidth * .30;
    shirts.forEach((image, index) => {
      const angle = (index - position) * Math.PI * 2 / looks.length;
      const depth = (Math.cos(angle) + 1) / 2;
      const x = Math.sin(angle) * radius;
      const y = -(1 - depth) * orbit.clientHeight * .28;
      const scale = .12 + .88 * Math.pow(depth, 5);
      shadows[index].style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y + orbit.clientHeight * .43 * scale}px, 0) scale(${scale})`;
      shadows[index].style.opacity = String(.45 + .55 * depth);
      image.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotateY(${-Math.sin(angle) * 24}deg) rotate(${-Math.sin(angle) * 5}deg) scale(${scale})`;
      image.style.opacity = String(.78 + .22 * depth);
      image.style.zIndex = String(Math.round(depth * 100));
    });
    orbit.dataset.position = position.toFixed(4);
  }
  function updateLabels() {
    const look = looks[selected], next = looks[normalise(selected + 1)];
    document.documentElement.dataset.look = look[3];
    document.querySelector('#hero-name').textContent = look[1];
    document.querySelector('#hero-price').textContent = look[2];
    document.querySelector('#hero-no').textContent = String(selected + 1).padStart(2, '0');
    shirts.forEach((image, index) => {
      image.removeAttribute('id');
      image.setAttribute('aria-hidden', String(index !== selected));
    });
    shirts[selected].id = 'hero-shirt';
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === selected);
      dot.setAttribute('aria-pressed', String(index === selected));
    });
    document.querySelector('#next-preview-img').src = next[0];
    document.querySelector('#next-preview-img').alt = next[1].toLowerCase() + ' preview';
    document.querySelector('#next-preview-name').textContent = next[1];
    preview.setAttribute('aria-label', 'Show ' + next[1]);
    orbit.dataset.selected = String(selected);
  }
  function schedule() {
    clearTimeout(timer);
    preview.classList.toggle('is-paused', paused() || Boolean(raf));
    preview.classList.add('is-resetting');
    void preview.offsetWidth;
    preview.classList.remove('is-resetting');
    if (!paused() && !raf) timer = setTimeout(() => rotateTo(target + 1), AUTO_MS);
  }
  function rotateTo(destination) {
    clearTimeout(timer);
    cancelAnimationFrame(raf);
    const from = position;
    target = destination;
    selected = normalise(target);
    updateLabels();
    const started = performance.now();
    orbit.dataset.animating = 'true';
    preview.classList.add('is-paused');
    function frame(now) {
      const progress = Math.min(1, (now - started) / ROTATION_MS);
      position = from + (target - from) * (1 - Math.cos(Math.PI * progress)) / 2;
      paint();
      if (progress < 1) raf = requestAnimationFrame(frame);
      else {
        raf = 0;
        orbit.dataset.animating = 'false';
        // Rebase complete turns after settling, without reversing either wrap.
        position = target = selected;
        paint();
        schedule();
      }
    }
    raf = requestAnimationFrame(frame);
  }
  document.querySelector('#hero-prev').addEventListener('click', () => rotateTo(target - 1));
  document.querySelector('#hero-next').addEventListener('click', () => rotateTo(target + 1));
  preview.addEventListener('click', () => rotateTo(target + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => {
    let distance = normalise(index - normalise(target));
    if (distance > looks.length / 2) distance -= looks.length;
    if (distance) rotateTo(target + distance);
  }));
  pauseButton.addEventListener('click', () => {
    userPaused = !userPaused;
    pauseButton.textContent = userPaused ? '▷' : 'Ⅱ';
    pauseButton.setAttribute('aria-pressed', String(userPaused));
    pauseButton.setAttribute('aria-label', userPaused ? 'Resume automatic rotation' : 'Pause automatic rotation');
    if (userPaused && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
      orbit.dataset.animating = 'false';
    } else if (!userPaused && Math.abs(position - target) > .001) rotateTo(target);
    schedule();
  });
  stage.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  stage.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  stage.addEventListener('focusin', () => { focused = true; schedule(); });
  stage.addEventListener('focusout', (event) => {
    if (!stage.contains(event.relatedTarget)) { focused = false; schedule(); }
  });
  stage.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      rotateTo(target + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let touchStart;
  orbit.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  orbit.addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x, dy = touch.clientY - touchStart.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) rotateTo(target + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });
  window.addEventListener('resize', paint);
  document.addEventListener('visibilitychange', schedule);
  updateLabels();
  paint();
  schedule();

  document.querySelector('#bag-count').dataset.fzCount = '';
  try {
    const saved = JSON.parse(localStorage.getItem('shirtline-commerce-v1') || '[]');
    if (Array.isArray(saved)) document.querySelector('#bag-count').textContent = saved
      .filter(item => window.ForgeShopConfig.products.some(product => product.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99 && typeof item.variant === 'string' && item.variant.length <= 180)
      .reduce((sum,item) => sum + item.quantity, 0);
  } catch { /* Bag still works without persistence. */ }
  document.querySelectorAll('.add').forEach((button, index) => {
    const product = window.ForgeShopConfig.products[index];
    const label = document.createElement('label'); label.className = 'shirtline-size';
    label.append(document.createTextNode('Size '));
    const size = document.createElement('select'); size.setAttribute('aria-label', product.name + ' size');
    product.variants.forEach(value => { const option = document.createElement('option'); option.value = option.textContent = value; size.append(option); });
    label.append(size);button.closest('.product-meta').append(label);
    button.addEventListener('click', () => window.ForgeCommerce.add(product.id, 'Size ' + size.value));
  });
  document.querySelector('#bag').addEventListener('click', () => window.ForgeCommerce.openBag());
  const menu = document.querySelector('#menu'), navigation = document.querySelector('.nav nav');
  menu.setAttribute('aria-controls', 'shirtline-navigation');menu.setAttribute('aria-expanded', 'false');
  navigation.id = 'shirtline-navigation';navigation.setAttribute('aria-label', 'Primary');
  function closeMenu() { navigation.classList.remove('open');menu.setAttribute('aria-expanded','false'); }
  menu.addEventListener('click', () => menu.setAttribute('aria-expanded',String(navigation.classList.toggle('open'))));
  navigation.addEventListener('click',event => { if(event.target.closest('a'))closeMenu(); });
  document.addEventListener('keydown',event => { if(event.key==='Escape' && navigation.classList.contains('open')) { closeMenu();menu.focus(); } });
  window.addEventListener('resize',()=>{if(window.innerWidth>760)closeMenu();});
})();
