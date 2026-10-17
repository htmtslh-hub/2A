/* Chain Warden — Interactive Champion Showcase Controller */
(function () {
  'use strict';

  document.documentElement.classList.add('has-js');

  try {
    localStorage.removeItem('motion');
    localStorage.removeItem('forgezone-motion');
    sessionStorage.removeItem('motion');
  } catch (_) {}

  var motionPaused = false;
  var activeRaf = 0;
  var abilityRaf = 0;

  var ABILITIES = [
    {
      name: 'Damnation',
      key: '(P)',
      stat1Label: 'Passive Souls:',
      stat1Val: '+1.0 Armor & AP per Soul Collected',
      stat2Label: 'Cooldown:',
      stat2Val: 'Passive (Permanent Stacking)',
      desc: 'Thresh harvests the souls of enemies that die near him,<br>permanently granting him <strong class="ability-detail__em">armor</strong> and ability power.'
    },
    {
      name: 'Death Sentence',
      key: '(Q)',
      stat1Label: 'Magic Damage:',
      stat1Val: '80 / 120 / 160 / 200 / 240 (+ 50% AP)',
      stat2Label: 'Cooldown:',
      stat2Val: '20 / 18 / 16 / 14 / 12',
      desc: 'Thresh binds an enemy in chains and pulls them toward him.<br>Activating this ability a <strong class="ability-detail__em">second</strong> time pulls Thresh to the enemy.'
    },
    {
      name: 'Dark Passage',
      key: '(W)',
      stat1Label: 'Shield Absorption:',
      stat1Val: '60 / 90 / 120 / 150 / 180 (+ 2 per Soul)',
      stat2Label: 'Cooldown:',
      stat2Val: '22 / 20.5 / 19 / 17.5 / 16',
      desc: 'Thresh throws out a lantern that shields nearby allied Champions.<br>Allies can click the lantern to <strong class="ability-detail__em">dash</strong> to Thresh.'
    },
    {
      name: 'Flay',
      key: '(E)',
      stat1Label: 'Magic Damage:',
      stat1Val: '75 / 110 / 145 / 180 / 215 (+ 60% AP)',
      stat2Label: 'Cooldown:',
      stat2Val: '13 / 12.25 / 11.5 / 10.75 / 10',
      desc: 'Thresh winds up his chains, knocking all enemies in the<br>direction of the blows and <strong class="ability-detail__em">slowing</strong> them briefly.'
    },
    {
      name: 'The Box',
      key: '(R)',
      stat1Label: 'Magic Damage:',
      stat1Val: '250 / 400 / 550 (+ 100% AP)',
      stat2Label: 'Cooldown:',
      stat2Val: '140 / 120 / 100',
      desc: 'A prison of spectral walls that slow by 99% and deal heavy<br>magic damage if <strong class="ability-detail__em">broken</strong> by an enemy champion.'
    }
  ];

  var SKINS = [
    {
      name: 'Classic',
      code: '01 / 04',
      src: 'assets/img/warden-classic.webp',
      alt: 'Thresh, The Chain Warden, in spectral emerald armor wielding a curved hooked scythe and glowing soul lantern'
    },
    {
      name: 'Dark Star',
      code: '02 / 04',
      src: 'assets/img/warden-darkstar.webp',
      alt: 'Dark Star Thresh wreathed in cosmic violet singularity flames with a gravity event-horizon lantern'
    },
    {
      name: 'High Noon',
      code: '03 / 04',
      src: 'assets/img/warden-highnoon.webp',
      alt: 'High Noon Thresh in frontier brimstone armor wielding an infernal ember lasso scythe and hellfire lamp'
    },
    {
      name: 'FPX',
      code: '04 / 04',
      src: 'assets/img/warden-highnoon.webp',
      alt: 'FPX Championship Thresh in crimson and gold phoenix armor with a blazing trophy lantern'
    }
  ];

  var currentSkin = 0;
  var currentAbility = 1;

  function cancelActiveAnimations() {
    if (activeRaf) {
      cancelAnimationFrame(activeRaf);
      activeRaf = 0;
    }
    if (abilityRaf) {
      cancelAnimationFrame(abilityRaf);
      abilityRaf = 0;
    }
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /* 1. Mobile Navigation */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('primary-nav');

  function closeMenu(returnFocus) {
    if (!toggle || !nav) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeMenu(false);
      } else {
        nav.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    var navLinks = nav.querySelectorAll('a');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        closeMenu(false);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu(true);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 825 && nav.classList.contains('is-open')) {
        closeMenu(false);
      }
    });
  }

  /* 2. Ability Selection */
  var abilityBtns = document.querySelectorAll('.ability-btn');
  var matrixCards = document.querySelectorAll('[data-ability-card]');
  var abilityDetail = document.getElementById('ability-detail');
  var abilityNameEl = document.getElementById('ability-name');
  var abilityKeyEl = document.getElementById('ability-key');
  var stat1El = document.getElementById('ability-stat-1');
  var stat2El = document.getElementById('ability-stat-2');
  var descEl = document.getElementById('ability-desc');

  function selectAbility(index, animate) {
    var idx = ((index % ABILITIES.length) + ABILITIES.length) % ABILITIES.length;
    currentAbility = idx;
    var data = ABILITIES[idx];

    for (var i = 0; i < abilityBtns.length; i++) {
      var isMatch = Number(abilityBtns[i].getAttribute('data-ability')) === idx;
      abilityBtns[i].classList.toggle('is-active', isMatch);
      abilityBtns[i].setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    }

    for (var j = 0; j < matrixCards.length; j++) {
      var cardMatch = Number(matrixCards[j].getAttribute('data-ability-card')) === idx;
      matrixCards[j].classList.toggle('is-selected', cardMatch);
    }

    if (abilityNameEl) abilityNameEl.textContent = data.name;
    if (abilityKeyEl) abilityKeyEl.textContent = data.key;
    if (stat1El) {
      stat1El.innerHTML = '<strong class="ability-detail__stat-label">' + data.stat1Label + '</strong> <span id="ability-stat-1-val">' + data.stat1Val + '</span>';
    }
    if (stat2El) {
      stat2El.innerHTML = '<strong class="ability-detail__stat-label">' + data.stat2Label + '</strong> <span id="ability-stat-2-val">' + data.stat2Val + '</span>';
    }
    if (descEl) descEl.innerHTML = data.desc;

    if (!abilityDetail) return;
    if (abilityRaf) {
      cancelAnimationFrame(abilityRaf);
      abilityRaf = 0;
    }

    if (!animate || motionPaused) {
      abilityDetail.style.opacity = '1';
      abilityDetail.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    var start = performance.now();
    var duration = 280;
    function stepAbility(now) {
      var p = Math.min(1, (now - start) / duration);
      var eased = easeOutCubic(p);
      var ty = (1 - eased) * 8;
      abilityDetail.style.opacity = String((0.28 + eased * 0.72).toFixed(3));
      abilityDetail.style.transform = 'translate3d(0, ' + ty.toFixed(2) + 'px, 0)';
      if (p < 1) {
        abilityRaf = requestAnimationFrame(stepAbility);
      } else {
        abilityDetail.style.opacity = '1';
        abilityDetail.style.transform = 'translate3d(0, 0, 0)';
        abilityRaf = 0;
      }
    }
    abilityRaf = requestAnimationFrame(stepAbility);
  }

  var allAbilityTriggers = document.querySelectorAll('[data-ability]');
  for (var a = 0; a < allAbilityTriggers.length; a++) {
    allAbilityTriggers[a].addEventListener('click', function () {
      var targetIdx = Number(this.getAttribute('data-ability'));
      selectAbility(targetIdx, true);
    });
  }

  /* 3. Skin Stage Selection & Directional Transitions */
  var stageImg = document.getElementById('hero-stage-img');
  var stageStatus = document.getElementById('stage-status');
  var skinBtns = document.querySelectorAll('.skin-btn');

  function selectSkin(index, direction, animate) {
    var total = SKINS.length;
    var nextIdx = ((index % total) + total) % total;
    var dir = direction || (nextIdx >= currentSkin ? 1 : -1);
    currentSkin = nextIdx;
    var skin = SKINS[nextIdx];

    for (var i = 0; i < skinBtns.length; i++) {
      var active = Number(skinBtns[i].getAttribute('data-skin')) === nextIdx;
      skinBtns[i].classList.toggle('is-active', active);
      skinBtns[i].setAttribute('aria-pressed', active ? 'true' : 'false');
    }

    if (stageStatus) {
      stageStatus.textContent = 'Skin ' + skin.code + ' · ' + skin.name;
    }

    if (!stageImg) return;
    stageImg.setAttribute('src', skin.src);
    stageImg.setAttribute('alt', skin.alt);

    if (activeRaf) {
      cancelAnimationFrame(activeRaf);
      activeRaf = 0;
    }

    if (!animate || motionPaused) {
      stageImg.style.opacity = '1';
      stageImg.style.transform = 'translate3d(0, 0, 0) scale(1)';
      return;
    }

    var start = performance.now();
    var duration = 420;
    var startX = dir * 28;
    function stepStage(now) {
      var p = Math.min(1, (now - start) / duration);
      var eased = easeOutCubic(p);
      var tx = (1 - eased) * startX;
      var sc = 0.965 + eased * 0.035;
      var op = 0.22 + eased * 0.78;
      stageImg.style.opacity = String(op.toFixed(3));
      stageImg.style.transform = 'translate3d(' + tx.toFixed(2) + 'px, 0, 0) scale(' + sc.toFixed(4) + ')';
      if (p < 1) {
        activeRaf = requestAnimationFrame(stepStage);
      } else {
        stageImg.style.opacity = '1';
        stageImg.style.transform = 'translate3d(0, 0, 0) scale(1)';
        activeRaf = 0;
      }
    }
    activeRaf = requestAnimationFrame(stepStage);
  }

  var allSkinTriggers = document.querySelectorAll('[data-skin]');
  for (var s = 0; s < allSkinTriggers.length; s++) {
    allSkinTriggers[s].addEventListener('click', function () {
      var targetSkin = Number(this.getAttribute('data-skin'));
      var dir = targetSkin >= currentSkin ? 1 : -1;
      selectSkin(targetSkin, dir, true);
    });
  }

  var stepBtns = document.querySelectorAll('[data-step]');
  for (var b = 0; b < stepBtns.length; b++) {
    stepBtns[b].addEventListener('click', function () {
      var step = Number(this.getAttribute('data-step')) || 1;
      selectSkin(currentSkin + step, step >= 0 ? 1 : -1, true);
    });
  }

  /* Keyboard left/right & touch swipe on hero */
  var heroSection = document.querySelector('.hero');
  if (heroSection) {
    var touchStartX = null;
    heroSection.addEventListener('touchstart', function (e) {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    heroSection.addEventListener('touchend', function (e) {
      if (touchStartX === null || !e.changedTouches || !e.changedTouches.length) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(dx) > 40) {
        selectSkin(currentSkin + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1, true);
      }
    }, { passive: true });
  }

  document.addEventListener('keydown', function (e) {
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight') {
      selectSkin(currentSkin + 1, 1, true);
    } else if (e.key === 'ArrowLeft') {
      selectSkin(currentSkin - 1, -1, true);
    }
  });

  /* 4. Session Motion Toggle */
  var motionBtn = document.getElementById('motion-toggle');
  if (motionBtn) {
    motionBtn.addEventListener('click', function () {
      motionPaused = !motionPaused;
      motionBtn.setAttribute('aria-pressed', motionPaused ? 'true' : 'false');
      motionBtn.textContent = motionPaused ? 'Resume motion' : 'Pause motion';
      if (motionPaused) {
        cancelActiveAnimations();
        if (stageImg) {
          stageImg.style.opacity = '1';
          stageImg.style.transform = 'translate3d(0, 0, 0) scale(1)';
        }
        if (abilityDetail) {
          abilityDetail.style.opacity = '1';
          abilityDetail.style.transform = 'translate3d(0, 0, 0)';
        }
      }
    });
  }

  /* 5. Accessible Dialog Modals */
  function wireModal(modalId, openIds, closeId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    var lastTrigger = null;

    for (var i = 0; i < openIds.length; i++) {
      var btn = document.getElementById(openIds[i]);
      if (btn) {
        btn.addEventListener('click', function () {
          lastTrigger = this;
          if (typeof modal.showModal === 'function') {
            modal.showModal();
          } else {
            modal.setAttribute('open', '');
          }
        });
      }
    }

    var closeBtn = document.getElementById(closeId);
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        if (typeof modal.close === 'function') {
          modal.close();
        } else {
          modal.removeAttribute('open');
        }
        if (lastTrigger) lastTrigger.focus();
      });
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        if (typeof modal.close === 'function') {
          modal.close();
        } else {
          modal.removeAttribute('open');
        }
        if (lastTrigger) lastTrigger.focus();
      }
    });
  }

  wireModal('lore-modal', ['lore-open-btn'], 'lore-close-btn');
  wireModal('spotlight-modal', ['spotlight-open-btn', 'lore-banner-modal-btn'], 'spotlight-close-btn');

  /* 6. Scroll Reveal & Scroll-linked Progress */
  var reveals = document.querySelectorAll('[data-reveal]');
  for (var r = 0; r < reveals.length; r++) {
    reveals[r].classList.add('is-visible');
  }

  var scrollScene = document.querySelector('[data-scroll-scene]');
  var progressBar = document.getElementById('lore-progress-bar');

  function updateScrollScene() {
    if (!scrollScene) return;
    if (motionPaused) {
      scrollScene.style.setProperty('--scroll-progress', '0.5');
      if (progressBar) progressBar.style.transform = 'scaleX(0.625)';
      return;
    }
    var rect = scrollScene.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight || 800;
    var raw = (vh - rect.top) / (vh + rect.height);
    var clamped = Math.max(0, Math.min(1, raw));
    scrollScene.style.setProperty('--scroll-progress', clamped.toFixed(3));
    if (progressBar) {
      var scale = 0.25 + clamped * 0.75;
      progressBar.style.transform = 'scaleX(' + scale.toFixed(3) + ')';
    }
  }

  window.addEventListener('scroll', updateScrollScene, { passive: true });
  window.addEventListener('resize', updateScrollScene);
  updateScrollScene();
})();
