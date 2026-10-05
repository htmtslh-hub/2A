/* Aeris 1.0.0 — mobile menu, reveal, hero colourway slider with a pausable
   slideshow, pinned story, scene-change effects, page progress line and
   pointer parallax. Plain JavaScript, no libraries. The slideshow is the only
   thing that moves on its own; it has a Pause button and is off by default
   with reduced motion. Everything else starts from a click, key, swipe,
   pointer or scroll, and each scene-change effect plays once. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var desktop = window.matchMedia('(min-width: 951px)');
  var SLIDE_MS = 1150; // keep equal to --slide in style.css
  var COLOURS = ['Pearl White', 'Midnight Navy', 'Blush Rose']; // hero order

  function onChange(mq, fn) {
    if (mq.addEventListener) mq.addEventListener('change', fn); else mq.addListener(fn);
  }
  function clamp(v) { return Math.min(1, Math.max(0, v)); }
  function smooth(v) { var p = clamp(v); return p * p * (3 - 2 * p); }
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  /* 0. Motion preference ------------------------------------------------
     Order: ?motion=on|off in the address → the choice saved from it → default ON for demo showcase. */
  var MOTION_KEY = 'aeris-motion';
  var preference = null;
  try {
    var saved = localStorage.getItem(MOTION_KEY);
    if (saved === 'on' || saved === 'off') preference = saved === 'on';
  } catch (err) { /* storage blocked: fall back to default */ }
  try {
    var asked = new URLSearchParams(location.search).get('motion');
    if (asked === 'on' || asked === 'off') {
      preference = asked === 'on';
      try { localStorage.setItem(MOTION_KEY, asked); } catch (err) { /* the address still applies */ }
    } else if (asked === 'auto') {
      preference = !reduce.matches;
      try { localStorage.removeItem(MOTION_KEY); } catch (err) { /* nothing saved */ }
    }
  } catch (err) { /* very old browsers: no URLSearchParams */ }
  function motionAllowed() { return preference === false ? false : true; }
  // CSS reads these: .motion-on ensures transitions run for showcase, .motion-off forces calm.
  var isMotionActive = motionAllowed();
  root.classList.toggle('motion-on', isMotionActive);
  root.classList.toggle('motion-off', !isMotionActive);

  /* 1. Mobile menu ------------------------------------------------------ */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  function setMenu(open, returnFocus) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (!open && returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  onChange(desktop, function () { setMenu(false); });

  /* 2. Reveal on scroll ------------------------------------------------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if (!motionAllowed() || !('IntersectionObserver' in window)) {
    each(reveals, function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    each(reveals, function (el) { io.observe(el); });
  }

  /* 3. Hero colourway carousel ------------------------------------------
     The hero shows three colours with real skill-morge product choreography:
     selected product rests in the spotlight; upcoming preview rests at
     x=60% scale=.46. Slide transitions smoothly glide products across
     the stage in the requested direction. Rapid clicks freeze the in-flight
     state without snapping, and direct looping (03 -> 01 and 01 -> 03)
     glides straight through without traversing intermediate products. */
  var hero = document.querySelector('.hero');
  var slides = hero.querySelectorAll('.slide');
  var products = hero.querySelectorAll('.product');
  var ghosts = hero.querySelectorAll('.hero__ghost');
  var washes = hero.querySelectorAll('.wash');
  var bars = hero.querySelectorAll('.hero__progress span');
  var dots = hero.querySelectorAll('.hero__dot');
  var lines = hero.querySelectorAll('.hero__line > span');
  var colourLabel = hero.querySelector('.hero__colour');
  var status = hero.querySelector('.hero__status');
  var current = 0;
  var cleanup = null;
  var travel = 60;
  var carouselFrame = 0;
  var carouselTimer = 0;

  function setHidden(el, hidden) {
    if (hidden) { el.setAttribute('aria-hidden', 'true'); el.setAttribute('inert', ''); }
    else { el.removeAttribute('aria-hidden'); el.removeAttribute('inert'); }
  }

  function placeProduct(slide, slot) {
    var x = slot === 0 ? 0 : slot === 1 ? travel : travel * 1.69;
    var rot = slot === 0 ? 0 : slot === 1 ? 12 : 16;
    var scale = slot === 0 ? 1 : slot === 1 ? 0.46 : 0.32;
    var opacity = slot === 0 ? 1 : slot === 1 ? 0.42 : 0.2;
    slide.style.transform = 'translate3d(' + x + '%,0,0) rotate(' + rot + 'deg) scale(' + scale + ')';
    slide.style.opacity = String(opacity);
    slide.style.filter = slot === 0 ? 'none' : 'blur(4px)';
    slide.style.zIndex = String(slot === 0 ? 3 : slot === 1 ? 2 : 1);
    slide.classList.toggle('is-active', slot === 0);
    slide.classList.remove('is-leaving');
    setHidden(slide, slot !== 0);
  }

  function cancelCarousel() {
    clearTimeout(carouselTimer);
    if (carouselFrame) cancelAnimationFrame(carouselFrame);
    carouselTimer = carouselFrame = 0;
  }

  function settleCarousel() {
    cancelCarousel();
    each(products, function (slide, i) {
      slide.style.transition = 'none';
      placeProduct(slide, (i - current + products.length) % products.length);
    });
    void hero.offsetWidth;
    each(products, function (slide) { slide.style.transition = ''; });
  }

  settleCarousel();

  // Send elements straight to their resting (hidden, start-side) state with
  // transitions switched off, so a recycled product never glides back across
  // the centre. One layout flush for the whole batch.
  function rest(list) {
    if (!list.length) return;
    list.forEach(function (el) { el.classList.add('is-staged'); el.classList.remove('is-leaving', 'is-active'); });
    void hero.offsetWidth;
    list.forEach(function (el) { el.classList.remove('is-staged'); });
  }

  function show(next, dir) {
    var count = slides.length;
    next = (next + count) % count;
    if (next === current) return;
    var prev = current;
    current = next;
    var sign = dir !== undefined ? (dir < 0 ? -1 : 1) : (next > prev ? 1 : -1);
    hero.setAttribute('data-dir', String(dir || (next > prev ? 1 : -1)));
    hero.setAttribute('data-slide', String(next));
    clearTimeout(cleanup);
    cancelCarousel();

    // Text slides and ghost numbers
    var stale = [];
    [slides, ghosts].forEach(function (list) {
      each(list, function (el, i) {
        if (i === next || (i !== prev && (el.classList.contains('is-leaving') || el.classList.contains('is-active')))) stale.push(el);
      });
    });
    rest(stale);

    [slides, ghosts].forEach(function (list) {
      list[prev].classList.remove('is-active');
      list[prev].classList.add('is-leaving');
      list[next].classList.add('is-active');
    });
    [washes, bars].forEach(function (list) {
      each(list, function (el, i) { el.classList.toggle('is-active', i === next); });
    });
    each(slides, function (s, i) { setHidden(s, i !== next); });
    each(dots, function (d) {
      if (Number(d.getAttribute('data-goto')) === next) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
    colourLabel.textContent = COLOURS[next];
    status.textContent = 'Aeris One, ' + COLOURS[next] + ', colour ' + (next + 1) + ' of ' + count;

    // Product carousel animation
    if (motionAllowed() && next !== prev) {
      var outgoing = products[prev];
      var incoming = products[next];
      var currentStyle = getComputedStyle(outgoing);
      var start = { transform: currentStyle.transform, opacity: currentStyle.opacity, filter: currentStyle.filter };

      each(products, function (slide, i) {
        slide.style.transition = 'none';
        slide.classList.remove('is-leaving');
        if (i !== next && i !== prev) {
          placeProduct(slide, (i - next + products.length) % products.length);
        }
      });

      Object.assign(outgoing.style, start, { zIndex: '2' });
      outgoing.classList.remove('is-active');
      outgoing.classList.add('is-leaving');

      incoming.style.transform = 'translate3d(' + (sign * travel) + '%,0,0) rotate(' + (sign * 12) + 'deg) scale(0.46)';
      incoming.style.opacity = '0.42';
      incoming.style.filter = 'blur(4px)';
      incoming.style.zIndex = '3';
      incoming.classList.add('is-active');
      incoming.removeAttribute('aria-hidden');
      incoming.removeAttribute('inert');

      void hero.offsetWidth;

      carouselFrame = requestAnimationFrame(function () {
        carouselFrame = 0;
        each(products, function (slide) { slide.style.transition = ''; });
        placeProduct(incoming, 0);
        outgoing.style.transform = 'translate3d(' + (-sign * travel) + '%,0,0) rotate(' + (-sign * 12) + 'deg) scale(0.46)';
        outgoing.style.opacity = '0';
        outgoing.style.filter = 'blur(4px)';
        carouselTimer = setTimeout(settleCarousel, SLIDE_MS + 60);
      });

      // Sweep band + sound-wave rings (CSS keyframes on .is-switching).
      replay(hero);
      if (lines[0].animate) {
        each(lines, function (line, i) {
          line.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(-108%)', opacity: 0, offset: 0.4 },
            { transform: 'translateY(108%)', opacity: 0, offset: 0.41 },
            { transform: 'translateY(0)', opacity: 1 }
          ], { duration: 1000, delay: i * 70, easing: 'cubic-bezier(.22, 1, .36, 1)' });
        });
        colourLabel.animate([
          { transform: 'translateY(14px)', opacity: 0 },
          { transform: 'none', opacity: 1 }
        ], { duration: 650, delay: 200, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' });
      }
    } else {
      settleCarousel();
    }

    // Recycle the outgoing colour without a transition once it has left
    // (60 ms after the slide so the last frame is never cut).
    cleanup = setTimeout(function () {
      rest([slides[prev], ghosts[prev]].filter(function (el) { return el.classList.contains('is-leaving'); }));
    }, SLIDE_MS + 60);
    restartCycle();
  }

  // Restart a one-shot CSS effect: drop the class, force a style flush, add it back.
  function replay(el) {
    el.classList.remove('is-switching');
    void el.offsetWidth;
    el.classList.add('is-switching');
  }

  hero.addEventListener('click', function (e) {
    var step = e.target.closest('[data-step]');
    var go = e.target.closest('[data-goto]');
    if (step) show(current + Number(step.getAttribute('data-step')), Number(step.getAttribute('data-step')));
    if (go) show(Number(go.getAttribute('data-goto')));
  });
  hero.addEventListener('keydown', function (e) {
    if (!e.target.closest('.hero__controls, .hero__dots')) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1, -1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1, 1); }
  });

  // Horizontal swipe on the product for touch screens. A mostly vertical
  // gesture is left to the page so scrolling never gets stuck.
  var visual = hero.querySelector('.hero__visual');
  var touchStart = null;
  visual.addEventListener('pointerdown', function (e) {
    touchStart = e.pointerType === 'mouse' ? null : { x: e.clientX, y: e.clientY };
  });
  visual.addEventListener('pointerup', function (e) {
    if (!touchStart) return;
    var dx = e.clientX - touchStart.x, dy = e.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) show(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  });
  visual.addEventListener('pointercancel', function () { touchStart = null; });

  /* 3b. Slideshow -------------------------------------------------------
     Changes colour every AUTO_MS. The Pause button stops it for good; it
     also holds (and resumes where it left off) while the pointer is over the
     hero, while keyboard focus is inside it, while the hero is off screen
     and while the tab is hidden. Off by default with reduced motion. */
  var AUTO_MS = 6000; // time on each colour, including the 1.15 s transition
  var playBtn = hero.querySelector('.hero__play');
  var autoOn = motionAllowed();
  var hovering = false, focusInside = false, onScreen = true;
  var autoTimer = 0, deadline = 0, remaining = AUTO_MS;
  hero.style.setProperty('--auto', AUTO_MS + 'ms');

  function canRun() { return autoOn && !hovering && !focusInside && onScreen && !document.hidden; }
  function syncAuto() {
    var run = canRun();
    hero.classList.toggle('is-held', !run);
    if (run && !autoTimer) {
      deadline = Date.now() + remaining;
      autoTimer = setTimeout(function () { autoTimer = 0; show(current + 1, 1); }, remaining);
    } else if (!run && autoTimer) {
      clearTimeout(autoTimer);
      autoTimer = 0;
      remaining = Math.max(0, deadline - Date.now());
    }
  }
  function restartCycle() {
    clearTimeout(autoTimer);
    autoTimer = 0;
    remaining = AUTO_MS;
    // Restart the progress-bar fill so it matches the new countdown.
    hero.classList.remove('is-auto');
    if (autoOn) { void hero.offsetWidth; hero.classList.add('is-auto'); }
    syncAuto();
  }
  function setAuto(on) {
    autoOn = on;
    hero.classList.toggle('is-stopped', !on);
    playBtn.setAttribute('aria-label', on ? 'Pause slideshow' : 'Play slideshow');
    // Announce colour changes only when the visitor is in control.
    status.setAttribute('aria-live', on ? 'off' : 'polite');
    restartCycle();
  }

  playBtn.addEventListener('click', function () {
    if (!autoOn) { focusInside = false; hovering = false; } // pressing Play means "run now"
    setAuto(!autoOn);
  });
  // The hero fills the screen, so only hovering the controls holds the timer.
  each(hero.querySelectorAll('.hero__controls, .hero__dots'), function (el) {
    el.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hovering = true; syncAuto(); } });
    el.addEventListener('pointerleave', function () { hovering = false; syncAuto(); });
  });
  // Keyboard focus inside the hero holds it; a mouse click on a button does not.
  hero.addEventListener('focusin', function (e) {
    var keyboard = true;
    try { keyboard = e.target.matches(':focus-visible'); } catch (err) { /* older browsers */ }
    if (keyboard) { focusInside = true; syncAuto(); }
  });
  hero.addEventListener('focusout', function (e) {
    if (!hero.contains(e.relatedTarget)) { focusInside = false; syncAuto(); }
  });
  document.addEventListener('visibilitychange', syncAuto);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
      syncAuto();
    }, { threshold: 0.35 }).observe(hero);
  }
  onChange(reduce, function () { if (!motionAllowed()) setAuto(false); });
  setAuto(autoOn);

  /* 4. Pointer parallax (desktop mouse only) ---------------------------- */
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var pointerFrame = 0;
  hero.addEventListener('pointermove', function (e) {
    if (!finePointer.matches || !motionAllowed() || pointerFrame) return;
    pointerFrame = requestAnimationFrame(function () {
      var box = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (((e.clientX - box.left) / box.width) * 2 - 1).toFixed(3));
      hero.style.setProperty('--my', (((e.clientY - box.top) / box.height) * 2 - 1).toFixed(3));
      pointerFrame = 0;
    });
  });
  hero.addEventListener('pointerleave', function () {
    hero.style.setProperty('--mx', '0');
    hero.style.setProperty('--my', '0');
  });

  /* 5. Scroll scenes: hero exit and pinned story -----------------------
     With coarse wheel/key input, smooth the render progress using
     blend = 1 - exp(-dt / 70) (from skill-morge). Stop RAF when error < .0002. */
  var story = document.querySelector('.story');
  var frames = story.querySelectorAll('.story__frame');
  var chapters = story.querySelectorAll('.chapter');
  var storyWashes = story.querySelectorAll('.story__washes span');
  var chapter = 0;
  var scrollFrame = 0;
  var lastPaint = 0;
  var smoothP = null;
  var smoothExit = null;

  function setChapter(index) {
    chapter = index;
    story.setAttribute('data-chapter', String(index));
    [frames, chapters, storyWashes].forEach(function (list) {
      each(list, function (el, i) {
        el.classList.toggle('is-active', i === index);
        el.classList.toggle('is-past', i < index);
      });
    });
  }

  function paint(now) {
    scrollFrame = 0;
    // Page progress line along the top edge (works with every motion setting).
    var room = root.scrollHeight - window.innerHeight;
    root.style.setProperty('--page', room > 0 ? clamp(window.scrollY / room).toFixed(4) : '0');
    if (!root.classList.contains('motion-ok')) return;

    var dt = lastPaint ? Math.min(32, Math.max(1, (now || performance.now()) - lastPaint)) : 16;
    lastPaint = now || performance.now();
    var blend = 1 - Math.exp(-dt / 70);

    var heroBox = hero.getBoundingClientRect();
    var targetExit = heroBox.bottom > 0 ? clamp(-heroBox.top / heroBox.height) : 1;
    if (smoothExit === null || heroBox.top >= 0) {
      smoothExit = targetExit;
    } else {
      smoothExit = smoothExit + (targetExit - smoothExit) * blend;
    }
    if (Math.abs(smoothExit - targetExit) < 0.0005) smoothExit = targetExit;
    if (heroBox.bottom > 0) hero.style.setProperty('--exit', smoothExit.toFixed(3));

    var box = story.getBoundingClientRect();
    var storyRoom = story.offsetHeight - window.innerHeight;
    var targetP = storyRoom > 0 ? clamp(-box.top / storyRoom) : 0;
    if (smoothP === null || box.bottom < 0 || box.top > window.innerHeight) {
      smoothP = targetP;
    } else {
      smoothP = smoothP + (targetP - smoothP) * blend;
    }
    if (Math.abs(smoothP - targetP) < 0.0002) smoothP = targetP;
    story.style.setProperty('--p', smoothP.toFixed(4));
    var index = Math.min(chapters.length - 1, Math.floor(smoothP * chapters.length));
    if (index !== chapter) {
      setChapter(index);
      replay(story); // ring kick + sound-wave rings in the new chapter colour
    }

    var needExit = heroBox.bottom > 0 && Math.abs(smoothExit - targetExit) >= 0.0005;
    var needStory = box.bottom >= 0 && box.top <= window.innerHeight && Math.abs(smoothP - targetP) >= 0.0002;
    if (needExit || needStory) {
      requestPaint();
    }
  }
  function requestPaint() { if (!scrollFrame) scrollFrame = requestAnimationFrame(paint); }

  // Pinning needs normal motion and enough height to show the whole scene.
  function updateMotion() {
    var ok = motionAllowed() && window.innerHeight >= 560;
    root.classList.toggle('motion-ok', ok);
    smoothP = null;
    smoothExit = null;
    lastPaint = 0;
    if (!ok) {
      hero.style.removeProperty('--exit');
      story.style.removeProperty('--p');
      setChapter(0);
    }
    requestPaint();
  }

  window.addEventListener('scroll', requestPaint, { passive: true });
  window.addEventListener('resize', function () { updateMotion(); });
  onChange(reduce, updateMotion);
  updateMotion();

  // Entrance: let the browser paint the start state, then play it once.
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { root.classList.add('is-loaded'); });
  });
})();
