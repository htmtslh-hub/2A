(function () {
  'use strict';

  var root = document.documentElement;
  var menuButton = document.querySelector('.nav-toggle');
  var menu = document.getElementById('site-nav');
  var mobile = window.matchMedia('(max-width: 900px)');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  root.classList.add('js');

  function closeMenu(restoreFocus) {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (restoreFocus) menuButton.focus();
  }

  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      var open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open && mobile.matches);
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) closeMenu(true);
    });

    mobile.addEventListener('change', function (event) {
      if (!event.matches) closeMenu(false);
    });
  }

  var source = document.getElementById('sequence-source');
  var canvas = document.getElementById('sequence-canvas');
  var section = document.getElementById('experience');
  var count = document.getElementById('frame-count');
  var chapters = Array.from(document.querySelectorAll('[data-stage]'));
  var stills = Array.from(document.querySelectorAll('[data-still]'));
  var frameTotal = 24;
  var columns = 6;
  var rows = 4;
  var frameWidth = 640;
  var frameHeight = 360;
  var currentFrame = -1;
  var active = false;
  var animationId = 0;

  function drawCover(target, frame) {
    if (!source || !source.complete || !source.naturalWidth) return;
    var context = target.getContext('2d');
    var box = target.getBoundingClientRect();
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    var width = Math.max(1, Math.round(box.width * ratio));
    var height = Math.max(1, Math.round(box.height * ratio));

    if (target.width !== width || target.height !== height) {
      target.width = width;
      target.height = height;
    }

    var sourceRatio = frameWidth / frameHeight;
    var targetRatio = width / height;
    var cropWidth = frameWidth;
    var cropHeight = frameHeight;
    var offsetX = 0;
    var offsetY = 0;

    if (targetRatio > sourceRatio) {
      cropHeight = frameWidth / targetRatio;
      offsetY = (frameHeight - cropHeight) / 2;
    } else {
      cropWidth = frameHeight * targetRatio;
      offsetX = (frameWidth - cropWidth) / 2;
    }

    var column = frame % columns;
    var row = Math.floor(frame / columns) % rows;
    context.clearRect(0, 0, width, height);
    context.drawImage(source, column * frameWidth + offsetX, row * frameHeight + offsetY, cropWidth, cropHeight, 0, 0, width, height);
  }

  function setStage(progress) {
    var stage = progress < .2 ? 0 : progress < .47 ? 1 : progress < .73 ? 2 : 3;
    chapters.forEach(function (chapter) {
      chapter.classList.toggle('is-current', Number(chapter.dataset.stage) === stage);
    });
  }

  function updateSequence() {
    if (!active || !section || !canvas) return;
    var rect = section.getBoundingClientRect();
    var distance = Math.max(1, rect.height - window.innerHeight);
    var progress = Math.max(0, Math.min(1, -rect.top / distance));
    var frame = reduced.matches ? 0 : Math.round(progress * (frameTotal - 1));

    if (frame !== currentFrame) {
      currentFrame = frame;
      drawCover(canvas, frame);
      if (count) count.textContent = String(frame + 1).padStart(2, '0');
    }
    setStage(reduced.matches ? 0 : progress);
    animationId = window.requestAnimationFrame(updateSequence);
  }

  function drawAll() {
    if (canvas) drawCover(canvas, Math.max(0, currentFrame));
    stills.forEach(function (still) { drawCover(still, Number(still.dataset.still)); });
  }

  function startSequence() {
    window.cancelAnimationFrame(animationId);
    if (active) animationId = window.requestAnimationFrame(updateSequence);
  }

  if (source && canvas && section) {
    source.addEventListener('load', function () {
      currentFrame = -1;
      drawAll();
      startSequence();
    });
    if (source.complete) drawAll();

    new IntersectionObserver(function (entries) {
      active = entries[0].isIntersecting;
      startSequence();
    }, { rootMargin: '25% 0px' }).observe(section);

    new ResizeObserver(function () {
      currentFrame = -1;
      drawAll();
    }).observe(document.body);

    reduced.addEventListener('change', function () {
      currentFrame = -1;
      startSequence();
    });
  }

  var reveals = document.querySelectorAll('.reveal');
  if (reduced.matches || !('IntersectionObserver' in window)) {
    reveals.forEach(function (item) { item.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    reveals.forEach(function (item) { revealObserver.observe(item); });
    window.setTimeout(function () {
      reveals.forEach(function (item) { item.classList.add('is-visible'); });
    }, 1600);
  }
}());
