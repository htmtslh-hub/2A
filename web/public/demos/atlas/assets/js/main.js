(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const LOG_SCENES = [
    {
      eyebrow: '01 / OCEAN LOG',
      code: 'LOG 01 · SURFACE COMPANIONSHIP',
      counter: '01 / 03 · CRIMSON LEVIATHAN',
      title: 'Crimson Leviathan & The Red Sloop',
      summaryName: '01 / Ocean Log · Crimson Leviathan & Red Sloop',
      image: 'assets/img/hero-ocean-01.webp',
      alt: 'Surreal split-level ocean illustration showing a giant crimson whale at the waterline carrying a tiny red-sailed wooden boat with two explorers beneath a full moon and coastal lighthouse, with sunbeams illuminating its pleated underwater belly.',
      coordsHeader: '25.2048° N   55.2708° E',
      coordsLat: '25.2048° N',
      coordsLon: '55.2708° E',
      coordsInline: '25.2048° N · 55.2708° E',
      scale: '1 : 14.5 (Sloop to Whale)',
      desc: 'Two observers aboard a 4.8-meter wooden sloop keep station above a solitary crimson-backed whale. As moonlight meets the coastal lighthouse beam, volumetric rays reveal the whale’s calm buoyancy above the reef.',
      stanza: [
        'A tiny boat.',
        'A giant companion.',
        'Different scales.',
        'The same curiosity.'
      ]
    },
    {
      eyebrow: '02 / TWILIGHT DRIFT',
      code: 'LOG 02 · MESOPELAGIC DUSK',
      counter: '02 / 03 · TWILIGHT FINBACK',
      title: 'Twilight Ochre Finback & Lantern Skiff',
      summaryName: '02 / Twilight Drift · Ochre Finback & Lantern Skiff',
      image: 'assets/img/hero-ocean-02.webp',
      alt: 'Twilight amber ocean cross-section showing an ochre-backed whale and lantern skiff drifting across warm dusk waters with refracted golden rays below.',
      coordsHeader: '34.6937° N   135.5023° E',
      coordsLat: '34.6937° N',
      coordsLon: '135.5023° E',
      coordsInline: '34.6937° N · 135.5023° E',
      scale: '1 : 16.0 (Skiff to Finback)',
      desc: 'As the coastal headland fades into amber dusk, the companion finback slows its fluke beat to three strokes per minute, letting the wooden skiff drift silently along the thermocline.',
      stanza: [
        'Amber horizon.',
        'A lantern on deck.',
        'Slowing the drift.',
        'Listening downward.'
      ]
    },
    {
      eyebrow: '03 / ABYSSAL SOUND',
      code: 'LOG 03 · PELAGIC RESONANCE',
      counter: '03 / 03 · ABYSSAL PELAGIC',
      title: 'Abyssal Pelagic Whale & Research Yawl',
      summaryName: '03 / Abyssal Sound · Pelagic Whale & Research Yawl',
      image: 'assets/img/hero-ocean-03.webp',
      alt: 'Deep pelagic ocean cross-section showing a whale and double-sailed wooden yawl beneath a starry moonlit sky and bioluminescent underwater rays.',
      coordsHeader: '64.1466° N   21.9426° W',
      coordsLat: '64.1466° N',
      coordsLon: '21.9426° W',
      coordsInline: '64.1466° N · 21.9426° W',
      scale: '1 : 18.2 (Yawl to Leviathan)',
      desc: 'In high-latitude swells, low-frequency 18 Hz calls travel across submarine ridges while the two-person crew logs acoustic echoes without disturbing the surface calm.',
      stanza: [
        'Starlight above.',
        'Eighteen hertz below.',
        'Across the ridge.',
        'An unbroken chord.'
      ]
    }
  ];

  const DEPTH_STRATA = {
    '0': {
      markerPct: 2,
      zone: 'ZONE 01 · EPIPELAGIC SURFACE (0 m – 200 m)',
      title: 'Where the Red Sloop Drifts Above the Leviathan',
      desc: 'Sunlight penetrates the turquoise swell at 25.2048° N, 55.2708° E, casting diagonal shafts across the whale’s pleated slate belly while coastal lighthouse beacons mark the distant horizon.',
      pressure: '1.0 ATM · SURFACE',
      temp: '21.4 °C · SUNLIT',
      acoustic: '18 Hz – 42 Hz · WHALE SONG',
      heroDepth: 'DEPTH UNKNOWN',
      heroLife: 'LIFE EVERYWHERE',
      summary: '0 m · Epipelagic Surface (1.0 ATM)'
    },
    '200': {
      markerPct: 32,
      zone: 'ZONE 02 · TWILIGHT THERMOCLINE (200 m – 1,000 m)',
      title: 'The Silver Boundary Where Daylight Dissolves',
      desc: 'Below 200 meters, photosynthesis ceases and temperature drops sharply across the thermocline. Lanternfish and reef schools begin their nightly vertical migration toward the surface.',
      pressure: '21.0 ATM · MESOPELAGIC',
      temp: '11.8 °C · THERMOCLINE',
      acoustic: '28 Hz · SOFAR CHANNEL ENTRY',
      heroDepth: 'DEPTH 200 M',
      heroLife: 'TWILIGHT MIGRATION',
      summary: '200 m · Twilight Thermocline (21.0 ATM)'
    },
    '1000': {
      markerPct: 55,
      zone: 'ZONE 03 · MIDNIGHT BIOLUMINESCENCE (1,000 m – 4,000 m)',
      title: 'In Total Darkness, Living Light Replaces the Sun',
      desc: 'At 1,000 meters no solar photon remains. Deep-diving cetaceans navigate by echolocation clicks while bioluminescent siphonophores trace silent constellations through the cold column.',
      pressure: '101.0 ATM · BATHYPELAGIC',
      temp: '4.1 °C · APHOTIC',
      acoustic: '14 Hz – 22 Hz · DEEP ECHO',
      heroDepth: 'DEPTH 1,000 M',
      heroLife: 'BIOLUMINESCENT',
      summary: '1,000 m · Midnight Bioluminescence (101.0 ATM)'
    },
    '4000': {
      markerPct: 77,
      zone: 'ZONE 04 · ABYSSAL PLAIN (4,000 m – 6,000 m)',
      title: 'Basalt Canyons and the Slow Rain of Marine Snow',
      desc: 'Across the abyssal plain, currents move at a whisper over volcanic ridges. Every sound from the surface is filtered into a vast, resonant stillness.',
      pressure: '401.0 ATM · ABYSSAL',
      temp: '2.4 °C · BASALT FLOOR',
      acoustic: '9 Hz · INFRASONIC DRIFT',
      heroDepth: 'DEPTH 4,000 M',
      heroLife: 'BENTHIC SILENCE',
      summary: '4,000 m · Abyssal Plain (401.0 ATM)'
    },
    '10000': {
      markerPct: 96,
      zone: 'ZONE 05 · HADAL TRENCH (6,000 m – 10,000 m)',
      title: 'Ten Kilometers Down, Life Still Answers Back',
      desc: 'Even at the bottom of the hadal trench under more than a thousand atmospheres of pressure, amphipods and piezophilic microbes thrive in quiet defiance of scale.',
      pressure: '1,086 ATM · HADAL FLOOR',
      temp: '1.9 °C · TRENCH AXIS',
      acoustic: '6 Hz · TECTONIC HUM',
      heroDepth: 'DEPTH 10,000 M',
      heroLife: 'LIFE EVERYWHERE',
      summary: '10,000 m · Hadal Trench (1,086 ATM)'
    }
  };

  let currentScene = 0;
  let currentDepth = '0';
  let motionPaused = false;
  let markerCurrentPct = 2;
  let markerRafId = 0;
  const activeRafs = new WeakMap();
  const bootTime = performance.now();

  /* ==========================================================================
     Finite requestAnimationFrame Helpers (Owner Rule 05/10/2026)
     ========================================================================== */
  function cancelElementRaf(el) {
    if (!el) return;
    const id = activeRafs.get(el);
    if (id) {
      cancelAnimationFrame(id);
      activeRafs.delete(el);
    }
  }

  function animateTransform(el, fromX, fromY, fromScale, durationMs = 540, animateOpacity = false) {
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
      const x = fromX * (1 - eased);
      const y = fromY * (1 - eased);
      const s = fromScale + (1 - fromScale) * eased;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
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

  /* ==========================================================================
     DOM References
     ========================================================================== */
  const heroImage = document.querySelector('[data-hero-image]');
  const heroStage = document.querySelector('[data-hero-stage]');
  const heroEyebrow = document.querySelector('[data-hero-eyebrow]');
  const heroStanza = document.querySelector('[data-hero-stanza]');
  const heroEntry = document.querySelector('[data-entry]');
  const headerCoords = document.querySelector('[data-header-coords]');
  const sonarCoords = document.querySelector('[data-sonar-coords]');
  const heroDepthReadout = document.querySelector('[data-hero-depth-readout]');
  const heroLifeReadout = document.querySelector('[data-hero-life-readout]');
  const depthMarker = document.querySelector('[data-depth-marker]');

  const morgeStage = document.querySelector('[data-morge-visual]');
  const morgeSlides = Array.from(document.querySelectorAll('[data-morge-slide]'));
  const morgePrev = document.querySelector('[data-morge-prev]');
  const morgeNext = document.querySelector('[data-morge-next]');
  const morgeCount = document.querySelector('[data-morge-count]');
  const morgeThumbs = Array.from(document.querySelectorAll('[data-morge-select]'));

  const archiveCode = document.querySelector('[data-archive-code]');
  const archiveTitle = document.querySelector('[data-archive-title]');
  const archiveDesc = document.querySelector('[data-archive-desc]');
  const archiveCoords = document.querySelector('[data-archive-coords]');
  const archiveScale = document.querySelector('[data-archive-scale]');

  const summaryCompanion = document.querySelector('[data-summary-companion]');
  const summaryDepth = document.querySelector('[data-summary-depth]');
  const summarySaved = document.querySelector('[data-summary-saved]');
  const dispatchMailto = document.querySelector('[data-dispatch-mailto]');

  function updateSummaryAndMailto() {
    const scene = LOG_SCENES[currentScene] || LOG_SCENES[0];
    const stratum = DEPTH_STRATA[currentDepth] || DEPTH_STRATA['0'];
    const savedCount = document.querySelectorAll('[data-bookmark-btn][aria-pressed="true"]').length;

    if (summaryCompanion) summaryCompanion.textContent = scene.summaryName;
    if (summaryDepth) summaryDepth.textContent = stratum.summary;
    if (summarySaved) {
      summarySaved.textContent = `${savedCount} ${savedCount === 1 ? 'story' : 'stories'} bookmarked in current session`;
    }
    if (dispatchMailto) {
      const subject = encodeURIComponent(`ATLAS Ocean Log Enquiry (${scene.eyebrow} - ${currentDepth}m)`);
      const body = encodeURIComponent(
        `Hello ATLAS Editorial Desk,\n\nI am exploring ${scene.summaryName} at depth stratum ${stratum.summary} (${scene.coordsInline}).`
      );
      dispatchMailto.setAttribute('href', `mailto:dispatch@atlas-ocean.example?subject=${subject}&body=${body}`);
    }
  }

  /* ==========================================================================
     Skill-Morge Directional Carousel & Hero Stage Sync
     ========================================================================== */
  function selectScene(requestedIndex, explicitDirection = null, shouldAnimate = true) {
    const count = LOG_SCENES.length;
    const rawIndex = Number(requestedIndex);
    if (Number.isNaN(rawIndex)) return;

    // Determine direction BEFORE modulo normalization (skill-morge requirement #2)
    let direction = explicitDirection;
    if (direction === null) {
      if (rawIndex > currentScene) direction = 1;
      else if (rawIndex < currentScene) direction = -1;
      else direction = 1;
    }

    const normalized = ((rawIndex % count) + count) % count;
    currentScene = normalized;
    const scene = LOG_SCENES[normalized];

    // Update slides with direct wrap and inert/aria-hidden management
    morgeSlides.forEach((slide, idx) => {
      const isSelected = idx === normalized;
      slide.classList.toggle('is-selected', isSelected);
      slide.setAttribute('aria-hidden', isSelected ? 'false' : 'true');
      if (isSelected) {
        slide.removeAttribute('inert');
        if (shouldAnimate) {
          animateTransform(slide, direction * 52, 0, 0.975, 560, false);
        }
      } else {
        slide.setAttribute('inert', '');
        cancelElementRaf(slide);
        slide.style.removeProperty('transform');
      }
    });

    morgeThumbs.forEach((btn) => {
      const active = Number(btn.getAttribute('data-morge-select')) === normalized;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (morgeCount) morgeCount.textContent = scene.counter;
    if (archiveCode) archiveCode.textContent = scene.code;
    if (archiveTitle) archiveTitle.textContent = scene.title;
    if (archiveDesc) archiveDesc.textContent = scene.desc;
    if (archiveCoords) archiveCoords.textContent = scene.coordsInline;
    if (archiveScale) archiveScale.textContent = scene.scale;

    // Sync Hero Stage
    if (heroImage) {
      heroImage.setAttribute('src', scene.image);
      heroImage.setAttribute('alt', scene.alt);
      if (shouldAnimate) {
        animateTransform(heroImage, direction * 28, 0, 0.985, 540, false);
      }
    }
    if (heroEyebrow) heroEyebrow.textContent = scene.eyebrow;
    if (headerCoords) headerCoords.textContent = scene.coordsHeader;
    if (sonarCoords) {
      const spans = sonarCoords.querySelectorAll('span');
      if (spans[0]) spans[0].textContent = scene.coordsLat;
      if (spans[1]) spans[1].textContent = scene.coordsLon;
    }
    if (heroStanza) {
      const spans = heroStanza.querySelectorAll('span');
      scene.stanza.forEach((line, idx) => {
        if (spans[idx]) spans[idx].textContent = line;
      });
    }

    updateSummaryAndMailto();
  }

  if (morgePrev) {
    morgePrev.addEventListener('click', () => {
      selectScene(currentScene - 1, -1, true);
    });
  }

  if (morgeNext) {
    morgeNext.addEventListener('click', () => {
      selectScene(currentScene + 1, 1, true);
    });
  }

  morgeThumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetIdx = Number(btn.getAttribute('data-morge-select'));
      const dir = targetIdx >= currentScene ? 1 : -1;
      selectScene(targetIdx, dir, true);
    });
  });

  function attachStageNavigation(stageEl) {
    if (!stageEl) return;
    stageEl.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        selectScene(currentScene + 1, 1, true);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        selectScene(currentScene - 1, -1, true);
      }
    });

    let pointerStartX = null;
    let pointerStartY = null;
    stageEl.addEventListener('pointerdown', (event) => {
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
    });
    stageEl.addEventListener('pointerup', (event) => {
      if (pointerStartX === null || pointerStartY === null) return;
      const dx = event.clientX - pointerStartX;
      const dy = event.clientY - pointerStartY;
      pointerStartX = null;
      pointerStartY = null;
      if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) selectScene(currentScene + 1, 1, true);
        else selectScene(currentScene - 1, -1, true);
      }
    });
  }

  attachStageNavigation(morgeStage);
  attachStageNavigation(heroStage);

  /* ==========================================================================
     Interactive 5-Stratum Depth Scale (Hero Ruler + Section #journey)
     ========================================================================== */
  const depthStopBtns = Array.from(document.querySelectorAll('[data-depth-stop]'));
  const stratumBtns = Array.from(document.querySelectorAll('[data-stratum-btn]'));
  const stratumPanel = document.querySelector('[data-stratum-panel]');
  const stratumZone = document.querySelector('[data-stratum-zone]');
  const stratumTitle = document.querySelector('[data-stratum-title]');
  const stratumDesc = document.querySelector('[data-stratum-desc]');
  const stratumPressure = document.querySelector('[data-stratum-pressure]');
  const stratumTemp = document.querySelector('[data-stratum-temp]');
  const stratumAcoustic = document.querySelector('[data-stratum-acoustic]');

  function animateDepthMarkerTo(targetPct) {
    if (!depthMarker) return;
    if (markerRafId) {
      cancelAnimationFrame(markerRafId);
      markerRafId = 0;
    }
    if (motionPaused) {
      markerCurrentPct = targetPct;
      depthMarker.style.top = `${targetPct}%`;
      return;
    }
    const startPct = markerCurrentPct;
    const start = performance.now();
    const duration = 440;
    const tick = (now) => {
      if (motionPaused) {
        markerCurrentPct = targetPct;
        depthMarker.style.top = `${targetPct}%`;
        markerRafId = 0;
        return;
      }
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      markerCurrentPct = startPct + (targetPct - startPct) * eased;
      depthMarker.style.top = `${markerCurrentPct.toFixed(2)}%`;
      if (p < 1) {
        markerRafId = requestAnimationFrame(tick);
      } else {
        markerCurrentPct = targetPct;
        depthMarker.style.top = `${targetPct}%`;
        markerRafId = 0;
      }
    };
    markerRafId = requestAnimationFrame(tick);
  }

  function selectDepth(depthKey, shouldAnimate = true) {
    const key = String(depthKey);
    const data = DEPTH_STRATA[key];
    if (!data) return;
    currentDepth = key;

    depthStopBtns.forEach((btn) => {
      const active = btn.getAttribute('data-depth-stop') === key;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    stratumBtns.forEach((btn) => {
      const active = btn.getAttribute('data-stratum-btn') === key;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (heroDepthReadout) heroDepthReadout.textContent = data.heroDepth;
    if (heroLifeReadout) heroLifeReadout.textContent = data.heroLife;
    if (stratumZone) stratumZone.textContent = data.zone;
    if (stratumTitle) stratumTitle.textContent = data.title;
    if (stratumDesc) stratumDesc.textContent = data.desc;
    if (stratumPressure) stratumPressure.textContent = data.pressure;
    if (stratumTemp) stratumTemp.textContent = data.temp;
    if (stratumAcoustic) stratumAcoustic.textContent = data.acoustic;

    animateDepthMarkerTo(data.markerPct);
    if (shouldAnimate && stratumPanel) {
      animateTransform(stratumPanel, 0, 14, 0.99, 440, false);
    }

    updateSummaryAndMailto();
  }

  depthStopBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectDepth(btn.getAttribute('data-depth-stop') || '0', true);
    });
  });

  stratumBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectDepth(btn.getAttribute('data-stratum-btn') || '0', true);
    });
  });

  /* ==========================================================================
     Scroll Word Choreography (Smooth Word-by-Word Illumination on Scroll)
     ========================================================================== */
  const scrollWordStage = document.querySelector('[data-scroll-words]');
  const scrollWordEls = Array.from(document.querySelectorAll('.scroll-word[data-word]'));
  const scrollWordBar = document.querySelector('[data-scroll-word-bar]');
  const scrollWordReadout = document.querySelector('[data-scroll-word-readout]');
  const wordPresetBtns = Array.from(document.querySelectorAll('[data-word-preset]'));
  let lastLitCount = 6;

  function applyScrollWordProgress(progress, animateNewlyLit = true) {
    if (!scrollWordEls.length) return;
    const clamped = Math.max(0.12, Math.min(1, progress));
    const total = scrollWordEls.length;
    const litCount = Math.max(1, Math.round(clamped * total));

    scrollWordEls.forEach((wordEl, idx) => {
      const shouldLight = idx < litCount;
      const wasLit = wordEl.classList.contains('is-lit');
      wordEl.classList.toggle('is-lit', shouldLight);
      if (shouldLight && !wasLit && animateNewlyLit && !motionPaused && Math.abs(litCount - lastLitCount) <= 18) {
        animateTransform(wordEl, 0, 8, 0.97, 340, false);
      }
    });

    lastLitCount = litCount;
    const pct = Math.round(clamped * 100);
    if (scrollWordBar) {
      scrollWordBar.style.width = `${pct}%`;
    }
    if (scrollWordReadout) {
      scrollWordReadout.textContent = `SCROLL PROGRESS · ${pct}% ACTIVE`;
    }
  }

  function computeScrollWordFromViewport() {
    if (!scrollWordStage) return;
    const rect = scrollWordStage.getBoundingClientRect();
    const vh = window.innerHeight || 900;
    const startY = vh * 0.86;
    const endY = vh * 0.22;
    const raw = (startY - rect.top) / Math.max(1, startY - endY);
    if (raw > 0.05) {
      applyScrollWordProgress(raw, true);
    }
  }

  let scrollTickQueued = false;
  function onScrollOrResize() {
    if (scrollTickQueued) return;
    scrollTickQueued = true;
    requestAnimationFrame(() => {
      scrollTickQueued = false;
      computeScrollWordFromViewport();
    });
  }

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);

  wordPresetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-word-preset');
      if (preset === 'surface') applyScrollWordProgress(0.28, true);
      else if (preset === 'twilight') applyScrollWordProgress(0.64, true);
      else applyScrollWordProgress(1.0, true);
    });
  });

  /* ==========================================================================
     04 / Compass Story Index Filter, Bookmarks & Neon-Orbit-Border Selection
     ========================================================================== */
  const topicFilterBtns = Array.from(document.querySelectorAll('[data-topic-btn]'));
  const storyCards = Array.from(document.querySelectorAll('[data-story-card]'));
  const indexLinks = Array.from(document.querySelectorAll('[data-index-topic]'));
  const bookmarkBtns = Array.from(document.querySelectorAll('[data-bookmark-btn]'));
  const selectCardBtns = Array.from(document.querySelectorAll('[data-select-card]'));

  function filterStories(topic) {
    const normalized = topic || 'all';
    topicFilterBtns.forEach((btn) => {
      const active = btn.getAttribute('data-topic-btn') === normalized;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    storyCards.forEach((card) => {
      const cardTopic = card.getAttribute('data-topic');
      const show = normalized === 'all' || cardTopic === normalized;
      if (show) {
        card.removeAttribute('hidden');
        animateTransform(card, 0, 14, 0.985, 420, false);
      } else {
        card.setAttribute('hidden', '');
      }
    });
  }

  topicFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterStories(btn.getAttribute('data-topic-btn') || 'all');
    });
  });

  indexLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const topic = link.getAttribute('data-index-topic') || 'all';
      filterStories(topic);
    });
  });

  bookmarkBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pressed = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', pressed ? 'false' : 'true');
      animateTransform(btn, 0, -4, 0.9, 320, false);
      updateSummaryAndMailto();
    });
  });

  selectCardBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetCard = btn.closest('[data-story-card]');
      storyCards.forEach((card) => {
        const isCurrent = card === targetCard;
        card.classList.toggle('is-active', isCurrent);
        const cardBtn = card.querySelector('[data-select-card]');
        if (cardBtn) {
          cardBtn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
          cardBtn.textContent = isCurrent ? 'Active Dossier' : 'Focus Dossier';
        }
      });
    });
  });

  /* ==========================================================================
     Soundwave Equalizer Toggle
     ========================================================================== */
  const soundToggleBtn = document.querySelector('[data-sound-toggle]');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const active = soundToggleBtn.getAttribute('aria-pressed') === 'true';
      soundToggleBtn.setAttribute('aria-pressed', active ? 'false' : 'true');
      animateTransform(soundToggleBtn, 0, -3, 0.92, 320, false);
    });
  }

  /* ==========================================================================
     Mobile Navigation Menu (.menu-toggle + #site-nav)
     ========================================================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.getElementById('site-nav');

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
     Dialogs (#map-dialog, #telemetry-dialog)
     ========================================================================== */
  document.querySelectorAll('[data-open-dialog]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const id = trigger.getAttribute('data-open-dialog');
      const dialog = id ? document.getElementById(id) : null;
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

  document.querySelectorAll('[data-dialog-scene], [data-dialog-depth]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sceneAttr = btn.getAttribute('data-dialog-scene');
      const depthAttr = btn.getAttribute('data-dialog-depth');
      if (sceneAttr !== null) {
        selectScene(Number(sceneAttr), 1, true);
      }
      if (depthAttr !== null) {
        selectDepth(depthAttr, true);
      }
      const dialog = btn.closest('dialog');
      if (dialog) {
        if (typeof dialog.close === 'function') {
          dialog.close();
        } else {
          dialog.removeAttribute('open');
        }
      }
    });
  });

  /* ==========================================================================
     Finite requestAnimationFrame Scroll Reveal & Session Motion Toggle
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
            animateTransform(entry.target, 0, 22, 0.985, 600, afterInitialSettle);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealItems.forEach((el) => observer.observe(el));
  }

  const motionToggleBtn = document.querySelector('[data-motion-toggle]');
  if (motionToggleBtn) {
    motionToggleBtn.addEventListener('click', () => {
      motionPaused = !motionPaused;
      motionToggleBtn.setAttribute('aria-pressed', motionPaused ? 'true' : 'false');
      motionToggleBtn.textContent = motionPaused ? 'Resume motion' : 'Pause motion';
    });
  }

  // Initial Hero entrance choreography via finite requestAnimationFrame
  animateTransform(heroImage, 0, 14, 0.98, 620, false);
  animateTransform(heroEntry, 0, 12, 0.99, 560, false);
})();
