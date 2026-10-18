(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var motionPaused = false;
  var activeRaf = 0;

  var scenes = [
    {
      caption: 'Cameo Island — Zakynthos, Greece',
      kicker: 'Ionian Turquoise Causeway',
      lede: 'Cross the timber footbridge over translucent Ionian shallows at first light, then sail by wooden caique along Zakynthos limestone sea caves.'
    },
    {
      caption: 'Koh Phi Phi Don — Islands, Thailand',
      kicker: 'Andaman Karst Sanctuary',
      lede: 'Set out ahead of day-boat crowds in a private ribboned longtail boat framed by towering emerald limestone cliffs and quiet coral gardens.'
    },
    {
      caption: 'Lago di Braies — Dolomites, Italy',
      kicker: 'Travel Beyond Expectations',
      lede: 'Explore extraordinary places, compare travel options, and uncover experiences that match your travel style. Travel smarter, discover more, and make every moment count.'
    },
    {
      caption: 'Cinque Terre — Vernazza, Italy',
      kicker: 'Ligurian Cliffside Harbours',
      lede: 'Walk historic dry-stone vineyard paths between Monterosso and Vernazza, then board a wooden gozzo boat as sunset gilds the Ligurian cliffs.'
    },
    {
      caption: 'Grand Canal — Venice, Italy',
      kicker: 'Venetian Lagoon Twilight',
      lede: 'Glide past Gothic palazzos and artisan boatyards by private wooden launch as rose-gold evening reflections settle across the Grand Canal.'
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

  /* 2. Session-only Motion Toggle (Default ON across browsers) */
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

  /* 3. Orbital Hero Destination Switcher */
  var sceneImgs = document.querySelectorAll('[data-scene-img]');
  var sceneBtns = document.querySelectorAll('[data-scene-btn]');
  var sceneDots = document.querySelectorAll('[data-scene-dot]');
  var captionEl = document.querySelector('[data-hero-caption]');
  var kickerEl = document.querySelector('[data-hero-kicker]');
  var ledeEl = document.querySelector('[data-hero-lede]');
  var heroCopy = document.querySelector('.hero__copy');
  var currentScene = 2;

  function animateCopyPulse() {
    if (motionPaused || !heroCopy || typeof requestAnimationFrame !== 'function') return;
    if (activeRaf) cancelAnimationFrame(activeRaf);
    var start = performance.now();
    var duration = 380;

    function tick(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      var offset = (1 - eased) * 10;
      heroCopy.style.transform = 'translate3d(0, ' + offset.toFixed(2) + 'px, 0)';
      if (t < 1 && !motionPaused) {
        activeRaf = requestAnimationFrame(tick);
      } else {
        heroCopy.style.transform = '';
        activeRaf = 0;
      }
    }

    activeRaf = requestAnimationFrame(tick);
  }

  function setScene(index) {
    var total = scenes.length;
    var nextIndex = ((index % total) + total) % total;
    currentScene = nextIndex;

    for (var i = 0; i < sceneImgs.length; i++) {
      sceneImgs[i].classList.toggle('is-active', i === nextIndex);
    }

    var previewTarget = (nextIndex + 1) % total;
    for (var j = 0; j < sceneBtns.length; j++) {
      var isBtnActive = j === nextIndex;
      sceneBtns[j].classList.toggle('is-active', isBtnActive);
      sceneBtns[j].setAttribute('aria-pressed', String(isBtnActive));
      if (j === previewTarget) {
        sceneBtns[j].setAttribute('data-next-preview', '');
      } else {
        sceneBtns[j].removeAttribute('data-next-preview');
      }
    }

    for (var k = 0; k < sceneDots.length; k++) {
      var isDotActive = k === nextIndex;
      sceneDots[k].classList.toggle('is-active', isDotActive);
      sceneDots[k].setAttribute('aria-pressed', String(isDotActive));
    }

    var data = scenes[nextIndex];
    if (data) {
      if (captionEl) captionEl.textContent = data.caption;
      if (kickerEl) kickerEl.textContent = data.kicker;
      if (ledeEl) ledeEl.textContent = data.lede;
    }

    animateCopyPulse();
  }

  for (var b = 0; b < sceneBtns.length; b++) {
    sceneBtns[b].addEventListener('click', function () {
      var idx = Number(this.getAttribute('data-scene-btn'));
      setScene(idx);
    });
  }

  for (var d = 0; d < sceneDots.length; d++) {
    sceneDots[d].addEventListener('click', function () {
      var idx = Number(this.getAttribute('data-scene-dot'));
      setScene(idx);
    });
  }

  var stageJumps = document.querySelectorAll('[data-stage-jump]');
  for (var s = 0; s < stageJumps.length; s++) {
    stageJumps[s].addEventListener('click', function () {
      var idx = Number(this.getAttribute('data-stage-jump'));
      setScene(idx);
      var topEl = document.getElementById('top');
      if (topEl) {
        topEl.scrollIntoView({ behavior: motionPaused ? 'auto' : 'smooth' });
      }
    });
  }

  /* Keyboard arrow support inside hero arc */
  var heroArc = document.querySelector('.hero-arc');
  if (heroArc) {
    heroArc.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        setScene(currentScene + 1);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        setScene(currentScene - 1);
      }
    });
  }

  /* Touch swipe support on hero */
  var heroSection = document.querySelector('.hero');
  var touchStartX = 0;
  var touchStartY = 0;
  if (heroSection) {
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

  /* 4. Destination Region Filter */
  var filterPills = document.querySelectorAll('[data-region-filter]');
  var destCards = document.querySelectorAll('.dest-card[data-region]');

  for (var f = 0; f < filterPills.length; f++) {
    filterPills[f].addEventListener('click', function () {
      var region = this.getAttribute('data-region-filter');
      for (var p = 0; p < filterPills.length; p++) {
        var active = filterPills[p] === this;
        filterPills[p].classList.toggle('is-active', active);
        filterPills[p].setAttribute('aria-pressed', String(active));
      }
      for (var c = 0; c < destCards.length; c++) {
        var cardRegion = destCards[c].getAttribute('data-region');
        var show = region === 'all' || cardRegion === region;
        if (show) {
          destCards[c].removeAttribute('hidden');
        } else {
          destCards[c].setAttribute('hidden', '');
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
