(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var motionPaused = false;
  var activeRaf = 0;

  var slides = [
    {
      img: 'assets/img/lagoon-slide-villa.webp',
      kicker: 'Noonu Atoll · Lagoon Water-Slide Reserve',
      sub: 'The sunny side of life',
      cardCaption: 'New Maldives Resort Comes With Water Slide',
      cardTag: 'Lagoon Slide'
    },
    {
      img: 'assets/img/aerial-pool-pavilion.webp',
      kicker: 'North Malé Atoll · Twin-Pool Reef Pavilion',
      sub: 'Private twin infinity plunge pools above the reef',
      cardCaption: 'Twin Infinity Pools Over Crystal Coral Reef',
      cardTag: 'Reef Pavilion'
    },
    {
      img: 'assets/img/underwater-atoll-dining.webp',
      kicker: 'Baa Atoll Biosphere · Subsea Coral Dome',
      sub: 'Six metres beneath the Indian Ocean lagoon',
      cardCaption: 'Panoramic Subsea Coral Dome & Twilight Cellar',
      cardTag: 'Subsea Dome'
    },
    {
      img: 'assets/img/sunset-pergola-deck.webp',
      kicker: 'Baa & North Malé Atolls · Sunset Pergola Reserve',
      sub: 'The sunny side of life',
      cardCaption: 'Starlit Fiber-Optic Pool & Sunset Pergola Deck',
      cardTag: 'Sunset Deck'
    }
  ];

  /* 1. Mobile Navigation Menu */
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('site-nav');

  function closeMenu() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('is-open', !expanded);
    });

    var navLinks = siteNav.querySelectorAll('a');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        closeMenu();
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        navToggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 920) {
        closeMenu();
      }
    });
  }

  /* 2. Session-only Motion Toggle */
  var motionBtn = document.querySelector('[data-motion-toggle]');
  if (motionBtn) {
    motionBtn.addEventListener('click', function () {
      motionPaused = !motionPaused;
      root.classList.toggle('motion-paused', motionPaused);
      motionBtn.setAttribute('aria-pressed', String(motionPaused));
      motionBtn.textContent = motionPaused ? 'Resume motion' : 'Pause motion';
      if (motionPaused && activeRaf) {
        cancelAnimationFrame(activeRaf);
        activeRaf = 0;
      }
    });
  }

  /* 3. Hero 4-Slide & Dual Vertical Card Switcher */
  var sceneImgs = document.querySelectorAll('[data-scene-img]');
  var sceneDots = document.querySelectorAll('[data-scene-dot]');
  var prevBtn = document.getElementById('hero-prev');
  var nextBtn = document.getElementById('hero-next');
  var primaryCard = document.querySelector('[data-primary-card]');
  var primaryImg = document.querySelector('[data-primary-card-img]');
  var primaryCaption = document.querySelector('[data-primary-card-caption]');
  var secondaryCard = document.querySelector('[data-secondary-card]');
  var secondaryImg = document.querySelector('[data-secondary-card-img]');
  var secondaryTag = document.querySelector('[data-secondary-card-tag]');
  var kickerEl = document.querySelector('[data-hero-kicker]');
  var subEl = document.querySelector('[data-hero-sub]');
  var numeralEl = document.querySelector('[data-hero-numeral]');
  var headlineBox = document.querySelector('.hero-headline');

  var currentScene = 3;

  function pulseHeadline() {
    if (motionPaused || !headlineBox || typeof requestAnimationFrame !== 'function') return;
    if (activeRaf) cancelAnimationFrame(activeRaf);
    var start = performance.now();
    var duration = 380;

    function tick(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      var y = (1 - eased) * 10;
      headlineBox.style.transform = 'translate3d(0, ' + y.toFixed(2) + 'px, 0)';
      if (t < 1 && !motionPaused) {
        activeRaf = requestAnimationFrame(tick);
      } else {
        headlineBox.style.transform = '';
        activeRaf = 0;
      }
    }

    activeRaf = requestAnimationFrame(tick);
  }

  function setScene(index) {
    var total = slides.length;
    var nextIndex = ((index % total) + total) % total;
    currentScene = nextIndex;

    for (var i = 0; i < sceneImgs.length; i++) {
      sceneImgs[i].classList.toggle('is-active', i === nextIndex);
    }

    for (var d = 0; d < sceneDots.length; d++) {
      var activeDot = d === nextIndex;
      sceneDots[d].classList.toggle('is-active', activeDot);
      sceneDots[d].setAttribute('aria-pressed', String(activeDot));
    }

    var activeSlide = slides[nextIndex];
    var card1Idx = (nextIndex + 1) % total;
    var card2Idx = (nextIndex + 2) % total;
    var card1 = slides[card1Idx];
    var card2 = slides[card2Idx];

    if (kickerEl) kickerEl.textContent = activeSlide.kicker;
    if (subEl) subEl.textContent = activeSlide.sub;
    if (numeralEl) numeralEl.textContent = String(nextIndex + 1);

    if (primaryImg) primaryImg.setAttribute('src', card1.img);
    if (primaryCaption) primaryCaption.textContent = card1.cardCaption;
    if (primaryCard) primaryCard.setAttribute('data-target-idx', String(card1Idx));

    if (secondaryImg) secondaryImg.setAttribute('src', card2.img);
    if (secondaryTag) secondaryTag.textContent = card2.cardTag;
    if (secondaryCard) secondaryCard.setAttribute('data-target-idx', String(card2Idx));

    pulseHeadline();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      setScene(currentScene - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      setScene(currentScene + 1);
    });
  }

  if (primaryCard) {
    primaryCard.setAttribute('data-target-idx', '0');
    primaryCard.addEventListener('click', function () {
      var idx = Number(this.getAttribute('data-target-idx') || 0);
      setScene(idx);
    });
  }

  if (secondaryCard) {
    secondaryCard.setAttribute('data-target-idx', '1');
    secondaryCard.addEventListener('click', function () {
      var idx = Number(this.getAttribute('data-target-idx') || 1);
      setScene(idx);
    });
  }

  for (var k = 0; k < sceneDots.length; k++) {
    sceneDots[k].addEventListener('click', function () {
      var idx = Number(this.getAttribute('data-scene-dot'));
      setScene(idx);
    });
  }

  var stageJumps = document.querySelectorAll('[data-stage-jump]');
  for (var j = 0; j < stageJumps.length; j++) {
    stageJumps[j].addEventListener('click', function () {
      var idx = Number(this.getAttribute('data-stage-jump'));
      setScene(idx);
      var topEl = document.getElementById('top');
      if (topEl) {
        topEl.scrollIntoView({ behavior: motionPaused ? 'auto' : 'smooth' });
      }
    });
  }

  /* Keyboard arrow support in hero */
  var heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setScene(currentScene + 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setScene(currentScene - 1);
      }
    });

    var touchStartX = 0;
    var touchStartY = 0;
    heroSection.addEventListener('touchstart', function (event) {
      if (!event.touches || !event.touches.length) return;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    }, { passive: true });

    heroSection.addEventListener('touchend', function (event) {
      if (!event.changedTouches || !event.changedTouches.length) return;
      var dx = event.changedTouches[0].clientX - touchStartX;
      var dy = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
        setScene(dx < 0 ? currentScene + 1 : currentScene - 1);
      }
    }, { passive: true });
  }

  /* 4. Atoll Category Filter */
  var filterPills = document.querySelectorAll('[data-atoll-filter]');
  var atollCards = document.querySelectorAll('.atoll-card[data-category]');

  for (var f = 0; f < filterPills.length; f++) {
    filterPills[f].addEventListener('click', function () {
      var cat = this.getAttribute('data-atoll-filter');
      for (var p = 0; p < filterPills.length; p++) {
        var active = filterPills[p] === this;
        filterPills[p].classList.toggle('is-active', active);
        filterPills[p].setAttribute('aria-pressed', String(active));
      }
      for (var c = 0; c < atollCards.length; c++) {
        var cardCat = atollCards[c].getAttribute('data-category');
        var show = cat === 'all' || cardCat === cat;
        if (show) {
          atollCards[c].removeAttribute('hidden');
        } else {
          atollCards[c].setAttribute('hidden', '');
        }
      }
    });
  }

  /* 5. Scroll Reveal via IntersectionObserver */
  var revealItems = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    for (var r = 0; r < revealItems.length; r++) {
      revealItems[r].classList.add('is-visible');
    }
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var e = 0; e < entries.length; e++) {
      if (entries[e].isIntersecting) {
        entries[e].target.classList.add('is-visible');
        observer.unobserve(entries[e].target);
      }
    }
  }, { threshold: 0.12 });

  for (var m = 0; m < revealItems.length; m++) {
    observer.observe(revealItems[m]);
  }
})();
