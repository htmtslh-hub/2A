(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const PLATTERS = [
    {
      name: "Club Harvest Platter",
      src: "assets/img/platter-club.webp",
      alt: "Overhead healthy club platter with a white ceramic salad bowl of crisp lettuce, blackberries, cherry tomatoes, chickpeas, orange and cucumber slices, a dark ceramic walnut and granola bowl, a white ramekin of pomegranate seeds, strawberries, and half an avocado",
      desc: "Freshly prepared macro bowls crafted with organic greens, roasted nuts, and seasonal berries for everyday training recovery.",
      macros: "520 kcal · 24g Protein · 14g Fibre",
      basePrice: "$14 / bowl"
    },
    {
      name: "Protein Macro Platter",
      src: "assets/img/platter-protein.webp",
      alt: "Overhead protein macro platter with double roasted chickpeas, toasted California walnuts, almonds, crisp greens, and fresh avocado",
      desc: "High-protein post-workout platter with slow-roasted chickpeas, toasted California walnuts, sprouted oat clusters, and herb avocado.",
      macros: "640 kcal · 34g Protein · 16g Fibre",
      basePrice: "$16 / bowl"
    },
    {
      name: "Berry Vitality Platter",
      src: "assets/img/platter-berry.webp",
      alt: "Overhead berry vitality platter with blackberries, wild blueberries, ruby pomegranate seeds, orchard strawberries, and citrus greens",
      desc: "Antioxidant recovery platter pairing wild blackberries, blueberries, ruby pomegranate arils, orchard strawberries, and baby greens.",
      macros: "460 kcal · 19g Protein · 15g Fibre",
      basePrice: "$15 / bowl"
    }
  ];

  const bootTime = performance.now();
  let motionPaused = false;
  let currentView = 0;
  let currentPortion = "Standard (520 kcal)";
  let currentPortionRate = "";
  const activeRafs = new Set();

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function cancelAllRafs() {
    for (const cancel of activeRafs) {
      cancel();
    }
    activeRafs.clear();
  }

  function animateValue(duration, onStep, onDone) {
    if (motionPaused || duration <= 0) {
      onStep(1);
      if (onDone) onDone();
      return () => {};
    }

    const start = performance.now();
    let rafId = 0;
    let stopped = false;

    const cancel = () => {
      if (stopped) return;
      stopped = true;
      if (rafId) cancelAnimationFrame(rafId);
      activeRafs.delete(cancel);
    };

    const tick = (now) => {
      if (stopped) return;
      if (motionPaused) {
        onStep(1);
        cancel();
        if (onDone) onDone();
        return;
      }
      const raw = Math.min(1, (now - start) / duration);
      onStep(easeOutCubic(raw));
      if (raw < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        activeRafs.delete(cancel);
        if (onDone) onDone();
      }
    };

    activeRafs.add(cancel);
    rafId = requestAnimationFrame(tick);
    return cancel;
  }

  // Preload platter cutouts so interactive switching is instant
  PLATTERS.forEach((item) => {
    const img = new Image();
    img.src = item.src;
  });

  const heroShell = document.querySelector("[data-carousel]");
  const heroImage = document.querySelector("[data-hero-image]");
  const heroDesc = document.querySelector("[data-hero-desc]");
  const heroEntry = document.querySelector("[data-entry]");
  const heroStage = document.querySelector(".hero__stage");
  const parallaxRings = document.querySelector("[data-parallax-rings]");
  const viewButtons = Array.from(document.querySelectorAll(".feature-item__btn[data-view]"));
  const cardViewButtons = Array.from(document.querySelectorAll(".card-action[data-view]"));
  const portionButtons = Array.from(document.querySelectorAll("[data-portion]"));

  const selectedPlatterEl = document.querySelector("[data-selected-platter]");
  const selectedPortionEl = document.querySelector("[data-selected-portion]");
  const selectedMacrosEl = document.querySelector("[data-selected-macros]");
  const selectedPriceEl = document.querySelector("[data-selected-price]");
  const orderMailto = document.getElementById("order-mailto");

  function syncOrderSummary() {
    const item = PLATTERS[currentView] || PLATTERS[0];
    const displayRate = currentPortionRate || item.basePrice;

    if (selectedPlatterEl) selectedPlatterEl.textContent = item.name;
    if (selectedPortionEl) selectedPortionEl.textContent = currentPortion;
    if (selectedMacrosEl) selectedMacrosEl.textContent = item.macros;
    if (selectedPriceEl) selectedPriceEl.textContent = `${displayRate} (Demo rate)`;

    if (orderMailto) {
      const subject = encodeURIComponent(`FitClub Bowl Enquiry - ${item.name}`);
      const body = encodeURIComponent(
        `Hello FitClub Kitchen,\n\nI would like to enquire about ordering:\n- Platter: ${item.name}\n- Portion: ${currentPortion}\n- Macros: ${item.macros}\n- Indicative Rate: ${displayRate}\n`
      );
      orderMailto.setAttribute("href", `mailto:kitchen@fitclubfood.example?subject=${subject}&body=${body}`);
    }
  }

  let cancelPlatterAnim = null;

  function setView(nextIndex, animate = true) {
    const normalized = ((nextIndex % PLATTERS.length) + PLATTERS.length) % PLATTERS.length;
    currentView = normalized;
    const item = PLATTERS[normalized];

    if (heroShell) {
      heroShell.setAttribute("data-current-view", String(normalized));
    }

    viewButtons.forEach((btn) => {
      const idx = Number(btn.getAttribute("data-view"));
      btn.setAttribute("aria-pressed", String(idx === normalized));
    });

    if (heroDesc) {
      heroDesc.textContent = item.desc;
    }

    if (heroImage) {
      heroImage.setAttribute("src", item.src);
      heroImage.setAttribute("alt", item.alt);

      if (cancelPlatterAnim) cancelPlatterAnim();
      if (animate && !motionPaused) {
        cancelPlatterAnim = animateValue(
          360,
          (progress) => {
            const dy = (1 - progress) * 14;
            const scale = 0.95 + progress * 0.05;
            const rot = (1 - progress) * -3.5;
            const opacity = 0.84 + progress * 0.16;
            heroImage.style.transform = `translate3d(0, ${dy.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`;
            heroImage.style.opacity = opacity.toFixed(3);
          },
          () => {
            heroImage.style.transform = "translate3d(0, 0px, 0) scale(1) rotate(0deg)";
            heroImage.style.opacity = "1";
          }
        );
      } else {
        heroImage.style.transform = "translate3d(0, 0px, 0) scale(1) rotate(0deg)";
        heroImage.style.opacity = "1";
      }
    }

    syncOrderSummary();
  }

  // Feature strip platter buttons
  viewButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.hasAttribute("data-step")) {
        setView(currentView + 1, true);
      } else {
        const target = Number(btn.getAttribute("data-view") || "0");
        setView(target, true);
      }
    });
  });

  // Platter card preview buttons
  cardViewButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = Number(btn.getAttribute("data-view") || "0");
      setView(target, true);
      const homeEl = document.getElementById("home");
      if (homeEl) {
        homeEl.scrollIntoView({ behavior: motionPaused ? "auto" : "smooth" });
      }
    });
  });

  // Keyboard & pointer swipe on hero stage
  if (heroStage) {
    heroStage.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setView(currentView + 1, true);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setView(currentView - 1, true);
      }
    });

    let startX = null;
    heroStage.addEventListener("pointerdown", (event) => {
      startX = event.clientX;
    });
    heroStage.addEventListener("pointerup", (event) => {
      if (startX === null) return;
      const dx = event.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 36) {
        setView(dx < 0 ? currentView + 1 : currentView - 1, true);
      }
    });
  }

  // Portion selector
  portionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPortion = btn.getAttribute("data-portion") || "Standard (520 kcal)";
      currentPortionRate = btn.getAttribute("data-portion-price") || "";
      portionButtons.forEach((other) => {
        other.setAttribute("aria-pressed", String(other === btn));
      });
      syncOrderSummary();
    });
  });

  // Initial entry choreography (completes within 380ms so settle state is clean by 450ms)
  if (!motionPaused) {
    if (heroEntry) {
      animateValue(
        360,
        (progress) => {
          const dy = (1 - progress) * 16;
          heroEntry.style.transform = `translate3d(0, ${dy.toFixed(2)}px, 0)`;
        },
        () => {
          heroEntry.style.transform = "translate3d(0, 0px, 0)";
        }
      );
    }
    if (heroImage) {
      animateValue(
        380,
        (progress) => {
          const dx = (1 - progress) * 18;
          const scale = 0.96 + progress * 0.04;
          heroImage.style.transform = `translate3d(${dx.toFixed(2)}px, 0, 0) scale(${scale.toFixed(4)})`;
        },
        () => {
          heroImage.style.transform = "translate3d(0, 0px, 0) scale(1)";
        }
      );
    }
  }

  // Scroll-driven reveal for below-the-fold sections
  const revealNodes = Array.from(document.querySelectorAll("[data-reveal]"));
  const revealedSet = new WeakSet();

  function triggerReveal(node) {
    if (revealedSet.has(node)) return;
    revealedSet.add(node);

    if (motionPaused) {
      node.style.transform = "translate3d(0, 0px, 0)";
      node.style.opacity = "1";
      return;
    }

    const animateOpacity = performance.now() - bootTime > 480;
    animateValue(
      420,
      (progress) => {
        const dy = (1 - progress) * 20;
        node.style.transform = `translate3d(0, ${dy.toFixed(2)}px, 0)`;
        node.style.opacity = animateOpacity ? (0.28 + progress * 0.72).toFixed(3) : "1";
      },
      () => {
        node.style.transform = "translate3d(0, 0px, 0)";
        node.style.opacity = "1";
      }
    );
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerReveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => triggerReveal(node));
  }

  // Scroll-coupled backdrop ring parallax + guarantee reveal on scroll
  let currentRingY = 0;
  let cancelRingAnim = null;

  window.addEventListener(
    "scroll",
    () => {
      const sy = window.scrollY || window.pageYOffset || 0;
      revealNodes.forEach((node) => {
        if (!revealedSet.has(node)) {
          const rect = node.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.92) {
            triggerReveal(node);
          }
        }
      });

      if (parallaxRings && !motionPaused) {
        const targetY = Math.min(28, sy * 0.08);
        const fromY = currentRingY;
        if (cancelRingAnim) cancelRingAnim();
        cancelRingAnim = animateValue(180, (progress) => {
          currentRingY = fromY + (targetY - fromY) * progress;
          parallaxRings.setAttribute("transform", `translate(0 ${currentRingY.toFixed(2)})`);
        });
      }
    },
    { passive: true }
  );

  // Mobile navigation toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.getElementById("navigation");

  if (menuToggle && siteNav) {
    const closeMenu = (restoreFocus = false) => {
      if (!siteNav.classList.contains("is-open")) return;
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      if (restoreFocus && typeof menuToggle.focus === "function") {
        menuToggle.focus();
      }
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu(false);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
        event.preventDefault();
        closeMenu(true);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 620 && siteNav.classList.contains("is-open")) {
        closeMenu(false);
      }
    });
  }

  // Accessible modal dialogs
  let lastTrigger = null;

  document.querySelectorAll("[data-open-dialog]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-open-dialog");
      const dialog = id ? document.getElementById(id) : null;
      if (!dialog) return;
      lastTrigger = btn;
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    });
  });

  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === "function" && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
    if (lastTrigger && typeof lastTrigger.focus === "function") {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  document.querySelectorAll(".club-dialog").forEach((dialog) => {
    dialog.querySelectorAll("[data-close-dialog]").forEach((btn) => {
      btn.addEventListener("click", () => closeDialog(dialog));
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        closeDialog(dialog);
      }
    });
    dialog.addEventListener("close", () => {
      if (lastTrigger && typeof lastTrigger.focus === "function") {
        lastTrigger.focus();
        lastTrigger = null;
      }
    });
  });

  // Pause motion session control
  const motionToggle = document.querySelector("[data-motion-toggle]");
  if (motionToggle) {
    motionToggle.addEventListener("click", () => {
      motionPaused = !motionPaused;
      document.documentElement.dataset.motion = motionPaused ? "paused" : "active";
      motionToggle.setAttribute("aria-pressed", String(motionPaused));
      motionToggle.textContent = motionPaused ? "Resume motion" : "Pause motion";

      if (motionPaused) {
        cancelAllRafs();
        if (heroEntry) heroEntry.style.transform = "translate3d(0, 0px, 0)";
        if (heroImage) {
          heroImage.style.transform = "translate3d(0, 0px, 0) scale(1) rotate(0deg)";
          heroImage.style.opacity = "1";
        }
        revealNodes.forEach((node) => {
          node.style.transform = "translate3d(0, 0px, 0)";
          node.style.opacity = "1";
        });
      }
    });
  }

  syncOrderSummary();
})();
