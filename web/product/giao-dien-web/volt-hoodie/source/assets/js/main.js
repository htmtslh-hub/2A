(() => {
  document.documentElement.classList.add('js');
  const SLIDES = [
    {
      name: 'Volt Yellow / Carbon',
      shortColor: 'Volt Yellow',
      image: 'assets/img/hoodie-volt.webp',
      alt: 'Volt Yellow and Matte Carbon athletic hoodie with geometric sleeve linework and front V-chevron panel',
      desc: 'Engineered brushed fleece hoodie built with articulated geometric sleeves, structured storm hood and high-contrast chevron panelling.',
      price: 'Rs. 1559/-',
      railTop: '10%'
    },
    {
      name: 'Cyber Mint / Carbon',
      shortColor: 'Cyber Mint',
      image: 'assets/img/hoodie-mint.webp',
      alt: 'Cyber Mint and Matte Carbon athletic hoodie with geometric sleeve linework and front V-chevron panel',
      desc: 'Cool mint-teal panelling paired with charcoal constellation sleeve print, breathable brushed fleece interior and braided drawcords.',
      price: 'Rs. 1559/-',
      railTop: '38%'
    },
    {
      name: 'Arctic White / Carbon',
      shortColor: 'Arctic White',
      image: 'assets/img/hoodie-arctic.webp',
      alt: 'Arctic White and Matte Carbon athletic hoodie with geometric sleeve linework and front V-chevron panel',
      desc: 'Crisp glacial white V-chevron block balanced with deep pitch-black sleeves, reinforced welt pockets and recovery ribbed cuffs.',
      price: 'Rs. 1559/-',
      railTop: '66%'
    }
  ];

  const SIZE_INFO = {
    S: 'S (Chest 42 in / 107 cm)',
    M: 'M (Chest 44 in / 112 cm)',
    L: 'L (Chest 46.5 in / 118 cm)'
  };

  let currentView = 0;
  let currentSize = 'S';
  let motionPaused = false;
  const activeRafs = new WeakMap();
  const bootTime = performance.now();

  const carousel = document.querySelector('[data-carousel]');
  const heroImage = document.querySelector('[data-hero-image]');
  const heroDesc = document.querySelector('[data-hero-desc]');
  const heroPrice = document.querySelector('[data-hero-price]');
  const heroCopy = document.querySelector('[data-entry]');
  const railThumb = document.querySelector('[data-rail-thumb]');
  const heroStage = document.querySelector('.hero__stage');

  const selectedColourEl = document.querySelector('[data-selected-colour]');
  const selectedSizeEl = document.querySelector('[data-selected-size]');
  const selectedPriceEl = document.querySelector('[data-selected-price]');
  const orderMailtoEl = document.querySelector('[data-order-mailto]');

  const swatchButtons = Array.from(document.querySelectorAll('.color-picker__swatch[data-view]'));
  const dotButtons = Array.from(document.querySelectorAll('.hero__dot[data-view]'));
  const cardViewButtons = Array.from(document.querySelectorAll('.card-action[data-view]'));
  const sizeButtons = Array.from(document.querySelectorAll('.size-picker__btn[data-size]'));
  const tableSizeButtons = Array.from(document.querySelectorAll('.table-size-btn[data-size]'));

  function cancelElementRaf(el) {
    if (!el) return;
    const id = activeRafs.get(el);
    if (id) {
      cancelAnimationFrame(id);
      activeRafs.delete(el);
    }
  }

  function animateTransform(el, fromY, fromScale, durationMs = 560, animateOpacity = false) {
    if (!el) return;
    cancelElementRaf(el);
    if (motionPaused) {
      el.style.removeProperty('transform');
      el.style.removeProperty('opacity');
      return;
    }
    const start = performance.now();
    const step = (now) => {
      if (motionPaused) {
        el.style.removeProperty('transform');
        el.style.removeProperty('opacity');
        activeRafs.delete(el);
        return;
      }
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const y = fromY * (1 - eased);
      const s = fromScale + (1 - fromScale) * eased;
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
      if (animateOpacity) {
        const alpha = 0.25 + 0.75 * eased;
        el.style.opacity = alpha.toFixed(3);
      }
      if (progress < 1) {
        activeRafs.set(el, requestAnimationFrame(step));
      } else {
        el.style.removeProperty('transform');
        el.style.removeProperty('opacity');
        activeRafs.delete(el);
      }
    };
    activeRafs.set(el, requestAnimationFrame(step));
  }

  function updateOrderSummary() {
    const slide = SLIDES[currentView] || SLIDES[0];
    const sizeLabel = SIZE_INFO[currentSize] || SIZE_INFO.S;
    if (selectedColourEl) selectedColourEl.textContent = slide.name;
    if (selectedSizeEl) selectedSizeEl.textContent = sizeLabel;
    if (selectedPriceEl) selectedPriceEl.textContent = slide.price;
    if (orderMailtoEl) {
      const subject = encodeURIComponent(`Order Enquiry - Volt Hoodie (${slide.shortColor}, Size ${currentSize})`);
      const body = encodeURIComponent(
        `Hello Volt Studio,\n\nI would like to order the 2024 Hoodie (${slide.name}, Size ${currentSize}, ${slide.price}).`
      );
      orderMailtoEl.setAttribute('href', `mailto:orders@volthoodie.example?subject=${subject}&body=${body}`);
    }
  }

  function setView(index, shouldAnimate = true) {
    const normalized = ((Number(index) % SLIDES.length) + SLIDES.length) % SLIDES.length;
    currentView = normalized;
    const slide = SLIDES[normalized];

    if (carousel) {
      carousel.setAttribute('data-current-view', String(normalized));
    }

    swatchButtons.forEach((btn) => {
      const active = Number(btn.getAttribute('data-view')) === normalized;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    dotButtons.forEach((btn) => {
      const active = Number(btn.getAttribute('data-view')) === normalized;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (heroImage) {
      heroImage.setAttribute('src', slide.image);
      heroImage.setAttribute('alt', slide.alt);
    }
    if (heroDesc) {
      heroDesc.textContent = slide.desc;
    }
    if (heroPrice) {
      heroPrice.textContent = slide.price;
    }
    if (railThumb) {
      railThumb.style.top = slide.railTop;
    }

    updateOrderSummary();

    if (shouldAnimate) {
      animateTransform(heroImage, 16, 0.95, 540, false);
      animateTransform(heroCopy, 12, 0.985, 500, false);
    }
  }

  function setSize(sizeCode) {
    if (!SIZE_INFO[sizeCode]) return;
    currentSize = sizeCode;
    sizeButtons.forEach((btn) => {
      const active = btn.getAttribute('data-size') === sizeCode;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    updateOrderSummary();
  }

  swatchButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setView(Number(btn.getAttribute('data-view')), true);
    });
  });

  dotButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setView(Number(btn.getAttribute('data-view')), true);
    });
  });

  cardViewButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setView(Number(btn.getAttribute('data-view')), true);
      const homeEl = document.getElementById('home');
      if (homeEl) {
        homeEl.scrollIntoView({ behavior: motionPaused ? 'auto' : 'smooth' });
      }
    });
  });

  sizeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setSize(btn.getAttribute('data-size') || 'S');
    });
  });

  tableSizeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setSize(btn.getAttribute('data-size') || 'S');
      const orderEl = document.getElementById('order');
      if (orderEl) {
        orderEl.scrollIntoView({ behavior: motionPaused ? 'auto' : 'smooth' });
      }
    });
  });

  if (heroStage) {
    heroStage.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setView(currentView + 1, true);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setView(currentView - 1, true);
      }
    });

    let pointerStartX = null;
    heroStage.addEventListener('pointerdown', (event) => {
      pointerStartX = event.clientX;
    });
    heroStage.addEventListener('pointerup', (event) => {
      if (pointerStartX === null) return;
      const deltaX = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(deltaX) > 36) {
        setView(deltaX < 0 ? currentView + 1 : currentView - 1, true);
      }
    });
  }

  /* ==========================================================================
     Mobile Navigation Menu (.menu-toggle + #navigation)
     ========================================================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.getElementById('navigation');

  function closeMobileMenu(restoreFocus = false) {
    if (!menuToggle || !siteNav) return;
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) {
      menuToggle.focus();
    }
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu(false);
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
        event.preventDefault();
        closeMobileMenu(true);
      }
    });

    const desktopMedia = window.matchMedia('(min-width: 861px)');
    const handleViewportChange = (e) => {
      if (e.matches) {
        closeMobileMenu(false);
      }
    };
    if (typeof desktopMedia.addEventListener === 'function') {
      desktopMedia.addEventListener('change', handleViewportChange);
    }
  }

  /* ==========================================================================
     Dialogs (#search-dialog, #account-dialog, #guide-dialog)
     ========================================================================== */
  const accountHeading = document.querySelector('[data-account-heading]');

  document.querySelectorAll('[data-open-dialog]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const dialogId = trigger.getAttribute('data-open-dialog');
      const authMode = trigger.getAttribute('data-auth-mode');
      if (authMode && accountHeading) {
        accountHeading.textContent = `${authMode} — Member Access (Demo Only)`;
      }
      const dialog = dialogId ? document.getElementById(dialogId) : null;
      if (!dialog) return;
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
    });
  });

  document.querySelectorAll('[data-close-dialog]').forEach((closer) => {
    closer.addEventListener('click', () => {
      const dialog = closer.closest('dialog');
      if (!dialog) return;
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    });
  });

  document.querySelectorAll('dialog.modal').forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        if (typeof dialog.close === 'function') {
          dialog.close();
        } else {
          dialog.removeAttribute('open');
        }
      }
    });
  });

  document.querySelectorAll('[data-dialog-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const viewIndex = Number(btn.getAttribute('data-dialog-view'));
      setView(viewIndex, true);
      const dialog = btn.closest('dialog');
      if (dialog) {
        if (typeof dialog.close === 'function') {
          dialog.close();
        } else {
          dialog.removeAttribute('open');
        }
      }
      const homeEl = document.getElementById('home');
      if (homeEl) {
        homeEl.scrollIntoView({ behavior: motionPaused ? 'auto' : 'smooth' });
      }
    });
  });

  /* ==========================================================================
     Finite requestAnimationFrame Scroll Reveal & Motion Toggle
     ========================================================================== */
  const revealItems = Array.from(document.querySelectorAll('[data-reveal]'));
  const revealedSet = new WeakSet();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !revealedSet.has(entry.target)) {
            revealedSet.add(entry.target);
            const afterInitialSettle = performance.now() - bootTime > 480;
            animateTransform(entry.target, 24, 0.985, 620, afterInitialSettle);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealItems.forEach((el) => observer.observe(el));
  }

  const motionToggleBtn = document.querySelector('.motion-toggle');
  if (motionToggleBtn) {
    motionToggleBtn.addEventListener('click', () => {
      motionPaused = !motionPaused;
      motionToggleBtn.setAttribute('aria-pressed', motionPaused ? 'true' : 'false');
      motionToggleBtn.textContent = motionPaused ? 'Resume motion' : 'Pause motion';
    });
  }

  // Initial hero entrance choreography via finite requestAnimationFrame
  animateTransform(heroImage, 18, 0.965, 640, false);
  animateTransform(heroCopy, 14, 0.985, 580, false);
})();
