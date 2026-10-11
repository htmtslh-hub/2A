/**
 * THE YELLOW BEAST — 2018 Porsche 911 Turbo S Exclusive Series
 * Interactive Showroom Script
 */

(function () {
  'use strict';

  // Mark document as JS ready for progressive enhancement
  document.documentElement.classList.add('js-ready');

  // -------------------------------------------------------------------------
  // DOM Elements
  // -------------------------------------------------------------------------
  const siteHeader = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const motionToggle = document.getElementById('motion-toggle');
  const motionLabel = document.getElementById('motion-label');
  
  const stageViews = Array.from(document.querySelectorAll('.hero__stage-view'));
  const heroThumbs = Array.from(document.querySelectorAll('.hero__thumb'));
  const btnNextView = document.getElementById('btn-next-view');
  const heroArrowNext = document.getElementById('hero-arrow-next');
  
  const btnRevEngine = document.getElementById('btn-rev-engine');
  const tachoNeedle = document.getElementById('tacho-needle');
  const tachoArc = document.querySelector('.tacho-arc');
  const rpmReadout = document.getElementById('rpm-readout');
  
  const swatches = Array.from(document.querySelectorAll('.swatch'));
  const colorGlow = document.getElementById('color-glow');
  const selectedColorName = document.getElementById('selected-color-name');
  
  const btnSoundToggle = document.getElementById('btn-sound-toggle');
  const soundWave = document.getElementById('sound-wave');
  const soundBtnText = document.getElementById('sound-btn-text');
  
  const enquiryForm = document.getElementById('enquiry-form');
  const formSuccess = document.getElementById('form-success');
  const btnResetForm = document.getElementById('btn-reset-form');
  const successRef = document.getElementById('success-ref');

  // -------------------------------------------------------------------------
  // State


  const VIEW_KEYS = ['side', 'front', 'inside'];
  let currentViewIndex = 1; // default index for 'front'

  const COLOR_MAP = {
    gold: {
      name: 'Golden Yellow Metallic (Standard Exclusive)',
      glow: 'rgba(245, 179, 0, 0.45)'
    },
    red: {
      name: 'Guards Red',
      glow: 'rgba(212, 32, 39, 0.45)'
    },
    silver: {
      name: 'GT Silver Metallic',
      glow: 'rgba(196, 200, 204, 0.45)'
    },
    black: {
      name: 'Jet Black Metallic',
      glow: 'rgba(30, 32, 38, 0.7)'
    }
  };

  // -------------------------------------------------------------------------
  // 1. Header Scroll & Mobile Navigation
  // -------------------------------------------------------------------------
  function handleScroll() {
    if (window.scrollY > 40) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('is-open');
    });

    // Close on navigation link click
    navMenu.querySelectorAll('.site-nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 2. Motion Toggle (Default: ON across all browsers)
  // -------------------------------------------------------------------------
  if (motionToggle && motionLabel) {
    motionToggle.addEventListener('click', () => {
      const isPaused = document.body.classList.toggle('motion-paused');
      motionToggle.setAttribute('aria-pressed', String(!isPaused));
      motionLabel.textContent = isPaused ? 'Motion: PAUSED' : 'Motion: ON';
    });
  }

  // -------------------------------------------------------------------------
  // 3. Interactive Camera Views (Hero Stage)
  // -------------------------------------------------------------------------
  const stageBadgeText = document.getElementById('stage-badge-text');
  const VIEW_LABELS = {
    front: '2018 PORSCHE 911 TURBO S EXCLUSIVE SERIES — FRONT FASIA',
    side: '2018 PORSCHE 911 TURBO S EXCLUSIVE SERIES — SIDE AERODYNAMICS',
    inside: '2018 PORSCHE 911 TURBO S EXCLUSIVE SERIES — BESPOKE GT COCKPIT'
  };

  function switchCarView(viewKey) {
    if (!VIEW_KEYS.includes(viewKey)) return;

    // Update thumbnail highlights and ARIA states
    heroThumbs.forEach((thumb) => {
      const isMatch = thumb.getAttribute('data-view') === viewKey;
      thumb.classList.toggle('is-active', isMatch);
      thumb.setAttribute('aria-pressed', String(isMatch));
    });

    // Seamlessly transition the hero stage views with cinematic crossfade
    stageViews.forEach((view) => {
      const isMatch = view.getAttribute('data-stage') === viewKey;
      view.classList.toggle('is-active', isMatch);
    });

    // Update perspective badge text
    if (stageBadgeText && VIEW_LABELS[viewKey]) {
      stageBadgeText.textContent = VIEW_LABELS[viewKey];
    }

    // Sync index
    const foundIdx = VIEW_KEYS.indexOf(viewKey);
    if (foundIdx !== -1) currentViewIndex = foundIdx;
  }

  heroThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const viewKey = thumb.getAttribute('data-view');
      switchCarView(viewKey);
    });
  });

  if (btnNextView) {
    btnNextView.addEventListener('click', () => {
      currentViewIndex = (currentViewIndex + 1) % VIEW_KEYS.length;
      switchCarView(VIEW_KEYS[currentViewIndex]);
    });
  }

  if (heroArrowNext) {
    heroArrowNext.addEventListener('click', () => {
      const target = document.getElementById('performance');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Keyboard navigation on thumbnail region
  const thumbsRegion = document.querySelector('.hero__thumbs-group');
  if (thumbsRegion) {
    thumbsRegion.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        currentViewIndex = (currentViewIndex + 1) % VIEW_KEYS.length;
        switchCarView(VIEW_KEYS[currentViewIndex]);
        heroThumbs[currentViewIndex]?.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        currentViewIndex = (currentViewIndex - 1 + VIEW_KEYS.length) % VIEW_KEYS.length;
        switchCarView(VIEW_KEYS[currentViewIndex]);
        heroThumbs[currentViewIndex]?.focus();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 4. Scroll Reveal & Animated Number Counters
  // -------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  const countUpElements = document.querySelectorAll('.stat-counter');

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target') || '0');
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const duration = 1600; // ms
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = (target * ease).toFixed(decimals);
      el.textContent = currentVal;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    }

    requestAnimationFrame(updateCount);
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    countUpElements.forEach((el) => counterObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('is-visible'));
    countUpElements.forEach((el) => {
      const target = el.getAttribute('data-target') || '0';
      el.textContent = target;
    });
  }

  // -------------------------------------------------------------------------
  // 5. Tachometer Needle & Rev Simulation
  // -------------------------------------------------------------------------
  let isRevving = false;

  if (btnRevEngine && tachoNeedle && rpmReadout) {
    btnRevEngine.addEventListener('click', () => {
      if (isRevving) return;
      isRevving = true;

      // Needle revs from -120deg (idle) to +85deg (7,200 RPM)
      tachoNeedle.style.transform = 'rotate(85deg)';
      if (tachoArc) tachoArc.style.strokeDashoffset = '80';
      rpmReadout.textContent = 'PEAK · 7,200 RPM';

      // Brief engine sound trigger if audio is enabled
      playThrottleBlip();

      setTimeout(() => {
        tachoNeedle.style.transform = 'rotate(-120deg)';
        if (tachoArc) tachoArc.style.strokeDashoffset = '240';
        rpmReadout.textContent = 'IDLE · 850 RPM';
        isRevving = false;
      }, 1200);
    });
  }

  // -------------------------------------------------------------------------
  // 6. Interactive Configurator Colorways
  // -------------------------------------------------------------------------
  swatches.forEach((swatch) => {
    swatch.addEventListener('click', () => {
      const colorKey = swatch.getAttribute('data-color');
      const data = COLOR_MAP[colorKey];
      if (!data) return;

      // Update swatch state
      swatches.forEach((s) => {
        const isMatch = s === swatch;
        s.classList.toggle('is-active', isMatch);
        s.setAttribute('aria-checked', String(isMatch));
      });

      // Update label
      if (selectedColorName) selectedColorName.textContent = data.name;

      // Update ambient glow
      if (colorGlow) {
        colorGlow.style.background = `radial-gradient(circle, ${data.glow} 0%, transparent 70%)`;
      }
    });
  });

  // -------------------------------------------------------------------------
  // 7. Synthetic Audio Engine Simulator (Web Audio API)
  // -------------------------------------------------------------------------
  let audioCtx = null;
  let isPlayingSound = false;
  let rumbleOsc = null;
  let rumbleGain = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
  }

  function startEngineRumble() {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    rumbleOsc = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    rumbleGain = audioCtx.createGain();

    // Low rumble boxer frequency
    rumbleOsc.type = 'sawtooth';
    rumbleOsc.frequency.setValueAtTime(55, audioCtx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, audioCtx.currentTime);

    rumbleGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    rumbleGain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.3);

    rumbleOsc.connect(filter);
    filter.connect(rumbleGain);
    rumbleGain.connect(audioCtx.destination);

    rumbleOsc.start();
    isPlayingSound = true;

    if (soundWave) soundWave.classList.add('is-playing');
    if (soundBtnText) soundBtnText.textContent = 'STOP EXHAUST SOUND';
    if (btnSoundToggle) btnSoundToggle.setAttribute('aria-pressed', 'true');
  }

  function stopEngineRumble() {
    if (rumbleGain && audioCtx) {
      rumbleGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
      setTimeout(() => {
        if (rumbleOsc) {
          rumbleOsc.stop();
          rumbleOsc.disconnect();
          rumbleOsc = null;
        }
      }, 250);
    }
    isPlayingSound = false;

    if (soundWave) soundWave.classList.remove('is-playing');
    if (soundBtnText) soundBtnText.textContent = 'PLAY EXHAUST SOUND';
    if (btnSoundToggle) btnSoundToggle.setAttribute('aria-pressed', 'false');
  }

  function playThrottleBlip() {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const blipOsc = audioCtx.createOscillator();
    const blipGain = audioCtx.createGain();
    const blipFilter = audioCtx.createBiquadFilter();

    blipOsc.type = 'sawtooth';
    blipOsc.frequency.setValueAtTime(80, audioCtx.currentTime);
    blipOsc.frequency.exponentialRampToValueAtTime(260, audioCtx.currentTime + 0.35);
    blipOsc.frequency.exponentialRampToValueAtTime(70, audioCtx.currentTime + 0.9);

    blipFilter.type = 'lowpass';
    blipFilter.frequency.setValueAtTime(320, audioCtx.currentTime);

    blipGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    blipGain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 0.2);
    blipGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.1);

    blipOsc.connect(blipFilter);
    blipFilter.connect(blipGain);
    blipGain.connect(audioCtx.destination);

    blipOsc.start();
    blipOsc.stop(audioCtx.currentTime + 1.2);
  }

  if (btnSoundToggle) {
    btnSoundToggle.addEventListener('click', () => {
      if (isPlayingSound) {
        stopEngineRumble();
      } else {
        startEngineRumble();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 8. VIP Enquiry Form Validation & Submission
  // -------------------------------------------------------------------------
  if (enquiryForm && formSuccess && btnResetForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('client-name');
      const emailInput = document.getElementById('client-email');

      let isValid = true;

      // Validate name
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group')?.classList.add('has-error');
        isValid = false;
      } else {
        nameInput.closest('.form-group')?.classList.remove('has-error');
      }

      // Validate email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.closest('.form-group')?.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.closest('.form-group')?.classList.remove('has-error');
      }

      if (isValid) {
        // Generate random chassis reference
        const randomChassis = String(Math.floor(Math.random() * 450) + 50).padStart(3, '0');
        if (successRef) successRef.textContent = `TURBO-S-EXCL-#${randomChassis}`;

        enquiryForm.hidden = true;
        formSuccess.hidden = false;
      }
    });

    btnResetForm.addEventListener('click', () => {
      enquiryForm.reset();
      formSuccess.hidden = true;
      enquiryForm.hidden = false;
      document.getElementById('client-name')?.focus();
    });
  }
})();
