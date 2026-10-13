/**
 * Shopluxe — Modern E-Commerce Storefront
 * main.js: Mobile navigation, scroll reveal, carousel and in-session cart actions.
 */
(function () {
  'use strict';

  // Mark JS initialized to enable clean reveals without flash
  document.documentElement.classList.add('js-ready');

  // ---- 1. Mobile Menu ----------------------------------------------------
  var navToggle = document.querySelector('.nav-toggle');
  var primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('nav--open', !expanded);
    });

    // Close when clicking any nav link
    var navLinks = primaryNav.querySelectorAll('.nav__link');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        if (primaryNav.classList.contains('nav--open')) {
          primaryNav.classList.remove('nav--open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.focus();
        }
      });
    }

    // Escape key closes navigation
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && primaryNav.classList.contains('nav--open')) {
        primaryNav.classList.remove('nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    // Reset navigation state when resizing across mobile breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth > 950 && primaryNav.classList.contains('nav--open')) {
        primaryNav.classList.remove('nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- 2. Quick Search Drawer --------------------------------------------
  var searchToggle = document.getElementById('search-toggle');
  var searchDrawer = document.getElementById('search-drawer');
  var searchInput = document.getElementById('site-search');

  if (searchToggle && searchDrawer) {
    searchToggle.addEventListener('click', function () {
      var isHidden = searchDrawer.hasAttribute('hidden');
      if (isHidden) {
        searchDrawer.removeAttribute('hidden');
        if (searchInput) searchInput.focus();
      } else {
        searchDrawer.setAttribute('hidden', '');
        searchToggle.focus();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !searchDrawer.hasAttribute('hidden')) {
        searchDrawer.setAttribute('hidden', '');
        searchToggle.focus();
      }
    });
  }

  // ---- 3. Hero Carousel (Supports #hero-next & #hero-prev) -----------------
  var heroNext = document.getElementById('hero-next');
  var heroPrev = document.getElementById('hero-prev');
  var heroDots = document.querySelectorAll('.hero__dot');
  var currentSlide = 0;
  var totalSlides = 3;

  function updateHeroSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    for (var d = 0; d < heroDots.length; d++) {
      var isActive = d === currentSlide;
      heroDots[d].classList.toggle('hero__dot--active', isActive);
      heroDots[d].setAttribute('aria-selected', String(isActive));
    }
  }

  if (heroNext) {
    heroNext.addEventListener('click', function () {
      updateHeroSlide(currentSlide + 1);
    });
  }
  if (heroPrev) {
    heroPrev.addEventListener('click', function () {
      updateHeroSlide(currentSlide - 1);
    });
  }
  for (var k = 0; k < heroDots.length; k++) {
    (function (dotIdx) {
      heroDots[dotIdx].addEventListener('click', function () {
        updateHeroSlide(dotIdx);
      });
    })(k);
  }

  // ---- 4. In-session Cart Additions --------------------------------------
  var cartCountEl = document.getElementById('cart-count');
  var cartTotalEl = document.getElementById('cart-total');
  var cartToast = document.getElementById('cart-toast');
  var toastMessage = document.getElementById('toast-message');
  var toastTimer = null;
  var cartCount = 1;
  var cartTotal = 59.98;

  function showToast(msg) {
    if (!cartToast) return;
    if (toastMessage) toastMessage.textContent = msg;
    cartToast.removeAttribute('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      cartToast.setAttribute('hidden', '');
    }, 2800);
  }

  var addButtons = document.querySelectorAll('.btn-add-cart');
  for (var b = 0; b < addButtons.length; b++) {
    addButtons[b].addEventListener('click', function () {
      var name = this.getAttribute('data-name') || 'Product';
      var price = parseFloat(this.getAttribute('data-price')) || 29.99;
      cartCount += 1;
      cartTotal += price;

      if (cartCountEl) cartCountEl.textContent = String(cartCount);
      if (cartTotalEl) cartTotalEl.textContent = '$' + cartTotal.toFixed(2);

      showToast('Added ' + name + ' to cart!');
    });
  }

  // ---- 5. Newsletter Form Feedback ---------------------------------------
  var newsletterForm = document.getElementById('newsletter-form');
  var newsletterFeedback = document.getElementById('newsletter-feedback');
  if (newsletterForm && newsletterFeedback) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('newsletter-email');
      if (input && input.value) {
        newsletterFeedback.removeAttribute('hidden');
        input.value = '';
      }
    });
  }

  // ---- 6. Scroll Reveal --------------------------------------------------
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) {
          entries[j].target.classList.add('is-visible');
          observer.unobserve(entries[j].target);
        }
      }
    }, { threshold: 0.1 });

    for (var r = 0; r < reveals.length; r++) {
      observer.observe(reveals[r]);
    }
  } else {
    for (var m = 0; m < reveals.length; m++) {
      reveals[m].classList.add('is-visible');
    }
  }
})();
