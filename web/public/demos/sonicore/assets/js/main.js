(() => {
  const root = document.documentElement;
  root.classList.add("js-enabled");
  root.setAttribute("data-motion", "ready");

  let motionPaused = false;
  const activeRafs = new Map();

  function cancelTrackedRaf(key) {
    const id = activeRafs.get(key);
    if (id !== undefined) {
      cancelAnimationFrame(id);
      activeRafs.delete(key);
    }
  }

  function cancelAllRafs() {
    activeRafs.forEach((id) => cancelAnimationFrame(id));
    activeRafs.clear();
  }

  function animateTransform(key, element, fromState, toState, durationMs = 240) {
    if (!element) {
      return;
    }
    cancelTrackedRaf(key);

    if (motionPaused || durationMs <= 0) {
      element.style.opacity = "1";
      element.style.transform = "";
      return;
    }

    const start = performance.now();
    const fx = fromState.x || 0;
    const fy = fromState.y || 0;
    const fs = fromState.scale !== undefined ? fromState.scale : 0.96;
    const fr = fromState.rotate || 0;
    const fo = fromState.opacity !== undefined ? fromState.opacity : 0.55;

    const tx = toState.x || 0;
    const ty = toState.y || 0;
    const ts = toState.scale !== undefined ? toState.scale : 1;
    const tr = toState.rotate || 0;
    const to = toState.opacity !== undefined ? toState.opacity : 1;

    function step(now) {
      const progress = Math.min(1, Math.max(0, (now - start) / durationMs));
      const eased = 1 - Math.pow(1 - progress, 3);
      const cx = fx + (tx - fx) * eased;
      const cy = fy + (ty - fy) * eased;
      const cs = fs + (ts - fs) * eased;
      const cr = fr + (tr - fr) * eased;
      const co = fo + (to - fo) * eased;

      if (progress < 1 && !motionPaused) {
        element.style.opacity = co.toFixed(3);
        element.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0) scale(${cs.toFixed(4)}) rotate(${cr.toFixed(2)}deg)`;
        activeRafs.set(key, requestAnimationFrame(step));
      } else {
        activeRafs.delete(key);
        element.style.opacity = "1";
        element.style.transform = "";
      }
    }

    element.style.opacity = fo.toFixed(3);
    element.style.transform = `translate3d(${fx.toFixed(2)}px, ${fy.toFixed(2)}px, 0) scale(${fs.toFixed(4)}) rotate(${fr.toFixed(2)}deg)`;
    activeRafs.set(key, requestAnimationFrame(step));
  }

  /* 1. Responsive Navigation Drawer */
  const navToggle = document.querySelector(".nav-toggle, [data-nav-toggle]");
  const siteNav = document.getElementById("navigation") || document.getElementById("site-nav");

  function setNavOpen(open) {
    if (!navToggle || !siteNav) {
      return;
    }
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    siteNav.classList.toggle("is-open", open);
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setNavOpen(!isOpen);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNavOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setNavOpen(false);
        navToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 950 && navToggle.getAttribute("aria-expanded") === "true") {
        setNavOpen(false);
      }
    });
  }

  /* 2. Spatial Mode & Hero Soundstage Switcher */
  const soundModes = [
    {
      code: "01",
      name: "CINEMA",
      stageLabel: "CINEMA 360°",
      offset: { x: -16, y: 10, scale: 0.965, rotate: -1.2 },
      eqHeights: [20, 28, 38, 48, 54, 46, 34, 26, 32, 40, 30, 22, 27, 37, 47, 56, 50, 40, 32, 24, 36, 46, 52, 44, 34, 26, 20, 28, 40, 48, 42, 32, 24, 18, 14]
    },
    {
      code: "02",
      name: "STUDIO",
      stageLabel: "STUDIO MASTER",
      offset: { x: 16, y: -8, scale: 0.965, rotate: 1.2 },
      eqHeights: [30, 34, 38, 40, 42, 40, 38, 36, 38, 42, 44, 42, 40, 38, 40, 44, 46, 44, 42, 40, 38, 40, 42, 40, 38, 36, 34, 36, 38, 40, 38, 36, 32, 28, 24]
    },
    {
      code: "03",
      name: "GAMING",
      stageLabel: "GAMING ARENA",
      offset: { x: 18, y: 10, scale: 0.96, rotate: 1.5 },
      eqHeights: [46, 52, 44, 30, 22, 28, 42, 54, 48, 34, 24, 32, 48, 56, 46, 30, 22, 34, 50, 56, 44, 28, 22, 36, 50, 44, 30, 24, 38, 52, 48, 36, 28, 22, 18]
    }
  ];

  let activeModeIndex = 0;
  const heroImage = document.querySelector("[data-hero-main]");
  const spatialImage = document.querySelector("[data-spatial-image]");
  const viewCountEl = document.querySelector("[data-view-count]");
  const stageLabelEl = document.querySelector("[data-stage-label]");
  const modeNameEl = document.querySelector("[data-mode-name]");
  const modeButtons = Array.from(document.querySelectorAll("[data-mode]"));
  const eqRects = Array.from(document.querySelectorAll("[data-eq-bars] rect"));

  function animateEqBars(targetHeights) {
    if (!eqRects.length) {
      return;
    }
    cancelTrackedRaf("eq-bars");
    const baseline = 62;
    if (motionPaused) {
      eqRects.forEach((rect, i) => {
        const h = targetHeights[i % targetHeights.length];
        rect.setAttribute("height", String(h));
        rect.setAttribute("y", String(baseline - h));
      });
      return;
    }

    const startHeights = eqRects.map((rect) => parseFloat(rect.getAttribute("height") || "24"));
    const start = performance.now();
    const duration = 240;

    function step(now) {
      const p = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - p, 3);
      eqRects.forEach((rect, i) => {
        const fromH = startHeights[i];
        const toH = targetHeights[i % targetHeights.length];
        const curH = fromH + (toH - fromH) * eased;
        rect.setAttribute("height", curH.toFixed(1));
        rect.setAttribute("y", (baseline - curH).toFixed(1));
      });
      if (p < 1 && !motionPaused) {
        activeRafs.set("eq-bars", requestAnimationFrame(step));
      } else {
        activeRafs.delete("eq-bars");
      }
    }

    activeRafs.set("eq-bars", requestAnimationFrame(step));
  }

  function setSpatialMode(nextIndex) {
    activeModeIndex = ((nextIndex % soundModes.length) + soundModes.length) % soundModes.length;
    const mode = soundModes[activeModeIndex];

    if (viewCountEl) {
      viewCountEl.textContent = mode.code;
    }
    if (stageLabelEl) {
      stageLabelEl.textContent = mode.stageLabel;
    }
    if (modeNameEl) {
      modeNameEl.textContent = mode.name;
    }
    if (heroImage) {
      heroImage.setAttribute("data-current-mode", String(activeModeIndex));
    }

    modeButtons.forEach((btn, idx) => {
      btn.setAttribute("aria-pressed", idx === activeModeIndex ? "true" : "false");
    });

    animateTransform(
      "hero-image",
      heroImage,
      {
        x: mode.offset.x,
        y: mode.offset.y,
        scale: mode.offset.scale,
        rotate: mode.offset.rotate,
        opacity: 0.55
      },
      { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
      440
    );

    animateTransform(
      "spatial-image",
      spatialImage,
      { x: mode.offset.x * 0.6, y: 8, scale: 0.97, rotate: 0, opacity: 0.65 },
      { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
      240
    );

    animateEqBars(mode.eqHeights);
  }

  const heroNextBtn = document.getElementById("hero-next");
  if (heroNextBtn) {
    heroNextBtn.addEventListener("click", () => {
      setSpatialMode(activeModeIndex + 1);
    });
  }

  document.querySelectorAll("[data-sound-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.id === "hero-next") {
        return;
      }
      const delta = parseInt(btn.getAttribute("data-sound-step") || "1", 10);
      setSpatialMode(activeModeIndex + delta);
    });
  });

  const modeCycleBtn = document.querySelector("[data-mode-cycle]");
  if (modeCycleBtn) {
    modeCycleBtn.addEventListener("click", () => {
      setSpatialMode(activeModeIndex + 1);
    });
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-mode") || "0", 10);
      setSpatialMode(idx);
    });
  });

  /* 3. Exploded Hardware Component Callout Selector */
  const partDescriptions = [
    "Selected component: Protein Leather — memory-foam acoustic seal with breathable micro-grain finish.",
    "Selected component: Dynamic Driver — 50mm titanium-coated diaphragm engineered for ultra-low distortion.",
    "Selected component: Hi-Res Audio Chip — custom 24-bit / 192kHz DSP core with real-time room calibration.",
    "Selected component: Acoustic Chamber — precision-tuned internal cavity eliminating standing wave resonance.",
    "Selected component: Neodymium Magnet — N52-grade high-flux magnetic circuit for lightning transient response.",
    "Selected component: Spatial Processing — 360° head-tracking gyroscope array locked at sub-2ms latency."
  ];

  const partOffsets = [
    { x: 14, y: -4, scale: 0.975 },
    { x: 8, y: -6, scale: 0.975 },
    { x: -10, y: -5, scale: 0.975 },
    { x: 10, y: 6, scale: 0.975 },
    { x: -8, y: 6, scale: 0.975 },
    { x: -14, y: 4, scale: 0.975 }
  ];

  let activePartIndex = 0;
  const partButtons = Array.from(document.querySelectorAll("[data-part]"));
  const partStatusEl = document.querySelector("[data-part-status]");
  const explodedImage = document.querySelector("[data-exploded-image]");

  function setExplodedPart(nextIndex) {
    activePartIndex = ((nextIndex % partButtons.length) + partButtons.length) % partButtons.length;
    const nextOffset = partOffsets[activePartIndex] || { x: 10, y: 4, scale: 0.975 };

    partButtons.forEach((btn, idx) => {
      btn.setAttribute("aria-pressed", idx === activePartIndex ? "true" : "false");
    });

    if (explodedImage) {
      explodedImage.setAttribute("data-current-part", String(activePartIndex));
    }

    if (partStatusEl && partDescriptions[activePartIndex]) {
      partStatusEl.textContent = partDescriptions[activePartIndex];
    }

    animateTransform(
      "exploded-image",
      explodedImage,
      { x: nextOffset.x, y: nextOffset.y, scale: nextOffset.scale, opacity: 0.65 },
      { x: 0, y: 0, scale: 1, opacity: 1 },
      240
    );
  }

  partButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-part") || "0", 10);
      setExplodedPart(idx);
    });
  });

  /* Keyboard, Touch & Pointer Swipe Support on Stage Carousels */
  function attachStageNavigation(selector, onDelta) {
    const stage = document.querySelector(selector);
    if (!stage) {
      return;
    }

    stage.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onDelta(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onDelta(-1);
      }
    });

    let startX = null;
    stage.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches && event.touches.length === 1) {
          startX = event.touches[0].clientX;
        }
      },
      { passive: true }
    );

    stage.addEventListener(
      "touchend",
      (event) => {
        if (startX === null || !event.changedTouches || !event.changedTouches.length) {
          return;
        }
        const deltaX = event.changedTouches[0].clientX - startX;
        startX = null;
        if (Math.abs(deltaX) >= 36) {
          onDelta(deltaX < 0 ? 1 : -1);
        }
      },
      { passive: true }
    );

    let mouseStartX = null;
    stage.addEventListener("dragstart", (event) => {
      event.preventDefault();
    });
    stage.addEventListener("mousedown", (event) => {
      mouseStartX = event.clientX;
    });
    stage.addEventListener("mouseup", (event) => {
      if (mouseStartX === null) {
        return;
      }
      const deltaX = event.clientX - mouseStartX;
      mouseStartX = null;
      if (Math.abs(deltaX) >= 36) {
        onDelta(deltaX < 0 ? 1 : -1);
      }
    });
  }

  attachStageNavigation('[data-carousel="hero"]', (delta) => setSpatialMode(activeModeIndex + delta));
  attachStageNavigation('[data-carousel="exploded"]', (delta) => setExplodedPart(activePartIndex + delta));

  /* 4. Review Card Highlight Dots */
  const reviewDots = Array.from(document.querySelectorAll("[data-review-dot]"));
  const reviewCards = Array.from(document.querySelectorAll("[data-review-card]"));

  function setReviewHighlight(dotIndex) {
    reviewDots.forEach((btn, idx) => {
      btn.setAttribute("aria-pressed", idx === dotIndex ? "true" : "false");
    });

    reviewCards.forEach((card, idx) => {
      const isHighlighted = dotIndex === 3 || idx === dotIndex;
      card.classList.toggle("is-highlighted", isHighlighted);
      if (isHighlighted) {
        animateTransform(
          `review-card-${idx}`,
          card,
          { x: 0, y: 6, scale: 0.98, opacity: 0.72 },
          { x: 0, y: 0, scale: 1, opacity: 1 },
          240
        );
      } else {
        card.style.transform = "";
        card.style.opacity = "1";
      }
    });
  }

  reviewDots.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-review-dot") || "0", 10);
      setReviewHighlight(idx);
    });
  });

  /* 5. Scroll-Triggered Section Reveal (IntersectionObserver) */
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  if ("IntersectionObserver" in window && revealItems.length) {
    const viewportH = window.innerHeight || 900;
    const pendingItems = new Set();

    revealItems.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > viewportH * 0.98) {
        pendingItems.add(el);
      } else {
        el.dataset.revealed = "true";
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && pendingItems.has(entry.target)) {
            pendingItems.delete(entry.target);
            entry.target.dataset.revealed = "true";
            animateTransform(
              `reveal-${revealItems.indexOf(entry.target)}`,
              entry.target,
              { x: 0, y: 18, scale: 0.985, opacity: 0.45 },
              { x: 0, y: 0, scale: 1, opacity: 1 },
              240
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    pendingItems.forEach((el) => observer.observe(el));
  }

  /* 6. Session-only Pause Motion Toggle */
  const motionToggle = document.querySelector(".motion-toggle, [data-motion-toggle]");
  if (motionToggle) {
    motionToggle.addEventListener("click", () => {
      motionPaused = !motionPaused;
      motionToggle.setAttribute("aria-pressed", motionPaused ? "true" : "false");
      motionToggle.textContent = motionPaused ? "Resume motion" : "Pause motion";
      root.setAttribute("data-motion", motionPaused ? "paused" : "ready");
      if (motionPaused) {
        cancelAllRafs();
        if (heroImage) {
          heroImage.style.transform = "";
          heroImage.style.opacity = "1";
        }
        if (explodedImage) {
          explodedImage.style.transform = "";
          explodedImage.style.opacity = "1";
        }
      }
    });
  }
})();
