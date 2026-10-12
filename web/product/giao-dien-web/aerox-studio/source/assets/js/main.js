/* Aerox Studio: local presentation controls; no booking or data services. */
(() => {
  'use strict';
  const toggle = document.querySelector('.nav-toggle');
  const toggles = document.querySelectorAll('.nav-toggle, .desktop-toggle');
  let lastToggle = toggle;
  const navigation = document.querySelector('#navigation');
  const mobile = matchMedia('(max-width: 950px)');
  function closeMenu(focus = false) {
    toggles.forEach(button => button.setAttribute('aria-expanded', 'false'));
    navigation.classList.remove('is-open');
    if (focus) lastToggle.focus();
  }
  toggles.forEach(button => button.addEventListener('click', () => {
    lastToggle = button;
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggles.forEach(control => control.setAttribute('aria-expanded', String(open)));
    navigation.classList.toggle('is-open', open);
  }));
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu(toggle.getAttribute('aria-expanded') === 'true');
  });
  mobile.addEventListener('change', () => closeMenu());
  document.documentElement.classList.add('js');
  document.querySelectorAll('button[data-js]').forEach(button => { button.disabled = false; });

  // Every animation has one owner and a finite RAF fallback. New actions cancel old frames.
  const active = new Map();
  function animate(element, duration, render, easing = progress => 1 - Math.pow(1 - progress, 3)) {
    if (active.has(element)) cancelAnimationFrame(active.get(element));
    const start = performance.now();
    render(0);
    function frame(now) {
      const progress = Math.min(1, (now - start) / duration);
      render(easing(progress));
      if (progress < 1) active.set(element, requestAnimationFrame(frame));
      else active.delete(element);
    }
    active.set(element, requestAnimationFrame(frame));
  }
  const bike = document.querySelector('#hero-bike');
  const label = document.querySelector('.finish-label');
  const products = [
    { src: 'assets/img/scooter.webp', name: 'Aerox Silver', label: 'Silver / Gold', title: ['AEROX', 'CONNECTED', 'ABS'], graphite: false, alt: 'Silver black sport scooter with gold wheels', price: 'Rp 30,3 Juta' },
    { src: 'assets/img/scooter.webp', name: 'Aerox Graphite', label: 'Graphite', title: ['AEROX', 'CONNECTED', 'ABS'], graphite: true, alt: 'Graphite grayscale sport scooter concept', price: 'Rp 30,3 Juta' },
    { src: 'assets/img/sport-blue.webp', name: 'Aerox Racing Blue', label: 'Racing Blue / Gold', title: ['AEROX', 'CONNECTED', 'SPORT'], graphite: false, alt: 'Racing blue black sport scooter with gold wheels', price: 'Design concept' },
    { src: 'assets/img/touring-burgundy.webp', name: 'Urban Burgundy', label: 'Burgundy / Silver', title: ['URBAN', 'TOURING', 'GT'], graphite: false, alt: 'Burgundy touring scooter with tall windshield and silver wheels', price: 'Design concept' },
    { src: 'assets/img/classic-mint.webp', name: 'Classic Mint', label: 'Mint / Cream', title: ['CLASSIC', 'CITY', 'RETRO'], graphite: false, alt: 'Mint green retro scooter with brown seat and round headlight', price: 'Design concept' }
  ];
  products.forEach(product => { const preload = new Image(); preload.src = product.src; });
  let finish = 0;
  function setFinish(next, direction = 1) {
    if (next === finish) return;
    const startX = new DOMMatrix(getComputedStyle(bike).transform).m41;
    const startOpacity = Number(getComputedStyle(bike).opacity);
    const distance = bike.parentElement.clientWidth;
    finish = next;
    const product = products[finish];
    document.querySelector('#previous-product').textContent = products[(finish - 1 + products.length) % products.length].name;
    document.querySelector('#next-product').textContent = products[(finish + 1) % products.length].name;
    document.querySelectorAll('[data-finish]').forEach(button => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.finish) === finish));
    });
    let switched = false;
    animate(bike, 1100, progress => {
      if (progress < .5) {
        const outgoing = progress * 2;
        bike.style.opacity = String(startOpacity * (1 - outgoing));
        bike.style.transform = 'translateX(' + (startX - direction * distance * outgoing) + 'px)';
      } else {
        if (!switched) {
          bike.src = product.src;
          bike.alt = product.alt;
          bike.classList.toggle('is-graphite', product.graphite);
          label.textContent = product.label + ' · concept finish';
          document.querySelector('.product-name').textContent = product.title[0];
          document.querySelector('.product-range').textContent = product.title[1];
          document.querySelector('.product-trim').textContent = product.title[2];
          document.querySelector('#product-price').textContent = product.price;
          document.querySelector('#product-price-label').textContent = finish < 2 ? 'REFERENCE PRICE · DEMO' : 'ILLUSTRATIVE PRODUCT';
          switched = true;
        }
        const incoming = (progress - .5) * 2;
        bike.style.opacity = String(incoming);
        bike.style.transform = 'translateX(' + (direction * distance * (1 - incoming)) + 'px)';
      }
      if (progress === 1) {
        bike.style.removeProperty('opacity');
        bike.style.removeProperty('transform');
      }
    }, progress => .5 - Math.cos(Math.PI * progress) / 2);
  }
  document.querySelectorAll('.finish-control').forEach(button => button.addEventListener('click', () => {
    const direction = Number(button.dataset.step);
    setFinish((finish + direction + products.length) % products.length, direction);
  }));
  document.querySelectorAll('[data-finish]').forEach(button => button.addEventListener('click', () => {
    const next = Number(button.dataset.finish);
    setFinish(next, next > finish ? 1 : -1);
  }));

  const slides = [
    { src: 'assets/img/brake.webp', alt: 'Close-up of the gold alloy front wheel, silver fender and perforated brake disc', caption: 'SCULPTED TO STOP. DESIGNED TO MOVE.' },
    { src: 'assets/img/scooter.webp', alt: 'Full silver and black sport scooter with gold alloy wheels', caption: 'SILVER LINES. GOLD DETAILS.' },
    { src: 'assets/img/rider.webp', alt: 'Helmeted rider leaning over a dark sport motorcycle', caption: 'CONNECTED TO THE RIDE.' }
  ];
  let slide = 0;
  const image = document.querySelector('#gallery-image');
  const main = document.querySelector('.gallery__main');
  const dialog = document.querySelector('.lightbox');
  function changeSlide(direction) {
    slide = (slide + direction + slides.length) % slides.length;
    image.src = slides[slide].src;
    image.alt = slides[slide].alt;
    document.querySelector('#gallery-caption').textContent = slides[slide].caption;
    document.querySelector('#gallery-counter').textContent = `0${slide + 1} / 03`;
    main.setAttribute('aria-label', `Enlarge image: ${slides[slide].alt}`);
    document.querySelector('.gallery__side--left img').src = slides[(slide + 2) % 3].src;
    document.querySelector('.gallery__side--right img').src = slides[(slide + 1) % 3].src;
    animate(image, 450, progress => {
      image.style.opacity = String(.4 + .6 * progress);
      image.style.transform = `translateX(${(1 - progress) * direction * 25}px) scale(${1.025 - progress * .025})`;
      if (progress === 1) { image.style.removeProperty('opacity'); image.style.removeProperty('transform'); }
    });
  }
  document.querySelectorAll('.gallery-prev, .gallery__side--left').forEach(button => button.addEventListener('click', () => changeSlide(-1)));
  document.querySelectorAll('.gallery-next, .gallery__side--right').forEach(button => button.addEventListener('click', () => changeSlide(1)));
  main.addEventListener('click', () => {
    dialog.querySelector('img').src = slides[slide].src;
    dialog.querySelector('img').alt = slides[slide].alt;
    dialog.querySelector('p').textContent = slides[slide].caption;
    dialog.showModal();
  });
  document.querySelector('.lightbox__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.querySelector('.gallery').addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      changeSlide(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });

  let observer;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      animate(entry.target, 650, progress => {
        entry.target.style.opacity = String(.4 + .6 * progress);
        entry.target.style.transform = `translateY(${(1 - progress) * 25}px)`;
        if (progress === 1) { entry.target.style.removeProperty('opacity'); entry.target.style.removeProperty('transform'); }
      });
    }), { threshold: .08 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
  }
  window.addEventListener('pagehide', () => {
    observer?.disconnect();
    active.forEach((frame, element) => {
      cancelAnimationFrame(frame);
      element.style.removeProperty('opacity');
      element.style.removeProperty('transform');
    });
    active.clear();
  }, { once: true });
})();
