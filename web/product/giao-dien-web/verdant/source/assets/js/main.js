/* Verdant: self-contained, finite product motion and scroll choreography. */
(() => {
  'use strict';
  document.body.classList.add('js');
  const products = [
    { name: 'Matcha Cream', price: '$28.00', colour: '#087849', text: '#08633e', className: '', description: 'A perfectly swirled Matcha Cream, offering a balanced blend of earthy matcha, smooth milk and a cloud of freshly whipped cream.' },
    { name: 'Mango Cloud', price: '$26.00', colour: '#bb8619', text: '#79520e', className: 'drink--mango', description: 'A golden Mango Cloud, blending bright mango with smooth milk and a soft swirl of freshly whipped cream. A sunny little escape in every sip.' },
    { name: 'Berry Blush', price: '$27.00', colour: '#b74460', text: '#953149', className: 'drink--berry', description: 'A sweet Berry Blush, bringing strawberry, smooth milk and a cloud of whipped cream together. Bright, creamy and made for a little joy.' }
  ];
  const cup = document.querySelector('.hero__cup');
  const heroDrink = document.querySelector('#hero-drink');
  const stage = document.querySelector('.hero__stage');
  const status = document.querySelector('#product-status');
  let selected = 0;
  let motion = true;
  let animation = 0;
  let opener;
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => 1 - Math.pow(1 - value, 3);
  function render(index) {
    selected = index;
    const product = products[index];
    heroDrink.className = `drink ${product.className}`;
    document.querySelector('#hero-image').alt = `${product.name} drink with whipped cream and a green straw`;
    document.querySelector('#hero-description').textContent = product.description;
    document.querySelector('#hero-price').textContent = product.price;
    document.querySelector('.hero').style.setProperty('--accent', product.colour);
    document.querySelector('.hero').style.setProperty('--accent-text', product.text);
    document.querySelector('#product-count').textContent = `0${index + 1} / 03`;
    document.querySelectorAll('[data-product]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.product) === index)));
    status.textContent = `${product.name} selected. ${product.price}.`;
  }
  function switchProduct(index, direction) {
    const next = (index + products.length) % products.length;
    cancelAnimationFrame(animation);
    cup.style.opacity = '1';
    cup.style.transform = 'rotate(-8deg)';
    if (!motion || next === selected) { render(next); return; }
    const start = performance.now();
    let replaced = false;
    function frame(now) {
      const progress = clamp((now - start) / 850);
      if (progress < .45) {
        const t = ease(progress / .45);
        cup.style.transform = `translate(${direction * -130 * t}px, ${-45 * t}px) rotate(${-8 - direction * 18 * t}deg) scale(${1 - .12 * t})`;
        cup.style.opacity = String(1 - t);
      } else {
        if (!replaced) { render(next); replaced = true; }
        const t = ease((progress - .45) / .55);
        cup.style.transform = `translate(${direction * 130 * (1 - t)}px, ${-45 * (1 - t)}px) rotate(${-8 + direction * 18 * (1 - t)}deg) scale(${.88 + .12 * t})`;
        cup.style.opacity = String(t);
      }
      if (progress < 1) animation = requestAnimationFrame(frame);
      else { cup.style.transform = 'rotate(-8deg)'; cup.style.opacity = '1'; animation = 0; }
    }
    animation = requestAnimationFrame(frame);
  }
  document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.product);
    switchProduct(index, index >= selected ? 1 : -1);
  }));
  document.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('click', () => switchProduct(selected + Number(button.dataset.direction), Number(button.dataset.direction))));
  document.querySelectorAll('[data-size]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-size]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    status.textContent = `${button.dataset.size} size selected for ${products[selected].name}. Menu prices are illustrative.`;
  }));
  document.querySelector('.hero').addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      switchProduct(selected + direction, direction);
    }
  });
  let touchStart = null;
  stage.addEventListener('dragstart', event => event.preventDefault());
  stage.addEventListener('pointerdown', event => {
    touchStart = { x: event.clientX, y: event.clientY };
    if (stage.setPointerCapture) stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointerup', event => {
    if (!touchStart) return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      const direction = dx < 0 ? 1 : -1;
      switchProduct(selected + direction, direction);
    }
    touchStart = null;
  });
  stage.addEventListener('pointercancel', () => { touchStart = null; });
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('#navigation');
  function closeMenu(returnFocus = false) {
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true); });
  const dialog = document.querySelector('.drink-dialog');
  document.querySelectorAll('[data-details]').forEach(button => button.addEventListener('click', () => {
    const product = products[Number(button.dataset.details)];
    document.querySelector('#dialog-title').textContent = product.name;
    document.querySelector('#dialog-description').textContent = product.description;
    document.querySelector('#dialog-price').textContent = `${product.price} · Illustrative menu price`;
    opener = button;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else document.querySelector('#contact').scrollIntoView();
  }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });
  const reveal = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    reveal.forEach(element => observer.observe(element));
  } else reveal.forEach(element => element.classList.add('is-visible'));
  const craft = document.querySelector('.craft');
  const craftCup = document.querySelector('.craft__cup');
  const craftBean = document.querySelector('.craft__bean');
  const progressBar = document.querySelector('.craft__progress');
  let scrollFrame = 0;
  function updateScroll() {
    scrollFrame = 0;
    if (!motion) return;
    const box = craft.getBoundingClientRect();
    const progress = clamp(-box.top / Math.max(1, craft.offsetHeight - innerHeight));
    craftCup.style.transform = `translateY(${-48 * progress}px) rotate(${-12 + 24 * progress}deg) scale(${1 + .05 * progress})`;
    craftBean.style.transform = `translateY(${-90 * progress}px) rotate(${50 + 70 * progress}deg)`;
    progressBar.style.transform = `scaleX(${progress})`;
  }
  function scheduleScroll() { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }
  addEventListener('scroll', scheduleScroll, { passive: true });
  addEventListener('resize', () => { if (innerWidth > 760) closeMenu(); scheduleScroll(); });
  const motionToggle = document.querySelector('.motion-toggle');
  motionToggle.addEventListener('click', () => {
    motion = !motion;
    document.body.classList.toggle('motion-paused', !motion);
    motionToggle.textContent = motion ? 'Pause motion' : 'Resume motion';
    motionToggle.setAttribute('aria-pressed', String(!motion));
    if (!motion) {
      cancelAnimationFrame(animation);
      cup.style.transform = 'rotate(-8deg)'; cup.style.opacity = '1';
      craftCup.style.transform = 'rotate(-8deg)';
      craftBean.style.transform = 'rotate(50deg)';
      reveal.forEach(element => element.classList.add('is-visible'));
    } else scheduleScroll();
  });
  render(0);
  scheduleScroll();
})();
