/* Scroll World damping and request-coalescing, adapted for the existing WebP sequence.
   Reference: https://github.com/oso95/scroll-world (MIT). No video generation required. */
(() => {
  'use strict';
  const root = document.querySelector('.apartment');
  const stage = root.querySelector('.apartment__stage');
  const canvas = root.querySelector('canvas');
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) return;
  const status = root.querySelector('.apartment__status');
  const COUNT = 240;
  const RADIUS = 10;
  const DAMPING_MS = 140;
  const MAX_FRAMES_PER_SECOND = 96;
  const assets = new Map();
  const decoded = new Map();
  const pending = new Map();
  const downloads = new Map();
  const queue = [];
  let activeDownloads = 0;
  let target = 0;
  let position = 0;
  let wanted = 0;
  let lastPaint = -1;
  let lastTime = 0;
  let animation = 0;
  let rendering = false;
  let running = true;
  let paused = false;
  let dirty = true;
  const controls = root.querySelector('.apartment__controls');
  controls.hidden = false;
  const pauseButton = document.querySelector('.apartment__pause');
  pauseButton.hidden = false;
  pauseButton.addEventListener('click', () => {
    paused = !paused;
    pauseButton.setAttribute('aria-pressed', String(paused));
    pauseButton.setAttribute('aria-label', paused ? 'Tiếp tục chuyển cảnh' : 'Tạm dừng chuyển cảnh');
    pauseButton.querySelector('span').textContent = paused ? '▶' : 'Ⅱ';
    cancelAnimationFrame(animation);
    animation = 0;
    lastTime = 0;
    if (!paused) { dirty = true; read(); }
  });
  const panels = [...root.querySelectorAll('.story-panel')];
  const chapterLinks = [...document.querySelectorAll('[data-chapter]')];
  const chapterNames = ['Cửa vào', 'Phòng khách & bếp', 'Phòng ngủ', 'Kết nối'];
  const caption = root.querySelector('.scene-caption');
  root.classList.add('is-enhanced');
  function story() {
    const progress = position / (COUNT - 1);
    const scene = progress < .22 ? 0 : progress < .58 ? 1 : progress < .90 ? 2 : 3;
    const starts = [0, .22, .58, .90];
    const ends = [.22, .58, .90, 1.05];
    panels.forEach((panel, index) => {
      const active = index === scene;
      panel.dataset.active = String(active);
      panel.inert = !active;
      panel.setAttribute('aria-hidden', String(!active));
      const entry = index === 0 ? 1 : Math.min(1, (progress - starts[index]) / .025);
      const exit = index === 3 ? 1 : Math.min(1, (ends[index] - progress) / .025);
      const opacity = active ? Math.max(0, Math.min(entry, exit)) : 0;
      // rAF writes opacity/transform directly, including when CSS motion is disabled.
      panel.style.opacity = String(opacity);
      panel.style.transform = `translateY(${(1 - opacity) * 12}px)`;
    });
    chapterLinks.forEach(link => {
      if (Number(link.dataset.chapter) === scene) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    root.querySelector('.scene-number').textContent = `${String(scene + 1).padStart(2, '0')} / 04`;
    root.querySelector('.scene-name').textContent = chapterNames[scene];
    caption.dataset.hidden = String(scene !== 0);
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const anchor = document.querySelector(link.getAttribute('href'));
    if (!anchor || !anchor.hasAttribute('data-progress')) return;
    link.addEventListener('click', event => {
      event.preventDefault();
      const distance = Math.max(1, root.offsetHeight - stage.offsetHeight);
      const top = root.getBoundingClientRect().top + scrollY + Number(anchor.dataset.progress) * distance;
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', link.getAttribute('href'));
    });
  });
  const dialog = document.querySelector('.contact-dialog');
  let dialogOpener;
  document.querySelector('[data-open-contact]').addEventListener('click', event => {
    dialogOpener = event.currentTarget;
    dialog.showModal();
  });
  dialog.querySelectorAll('[data-close-contact]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('close', () => dialogOpener?.focus());
  story();
  const path = i => `assets/frames/frame-${String(i + 1).padStart(4, '0')}.webp`;

  // Compressed images are prefetched with four workers (~11MB total), while decoded
  // full-HD images stay in a bounded window rather than consuming ~2GB for all frames.
  function download(i, urgent = false) {
    if (assets.has(i)) return Promise.resolve(assets.get(i));
    if (downloads.has(i)) {
      if (urgent) {
        const slot = queue.findIndex(item => item.i === i);
        if (slot >= 0) queue.unshift(queue.splice(slot, 1)[0]);
      }
      return downloads.get(i);
    }
    let resolve;
    const promise = new Promise(done => { resolve = done; });
    downloads.set(i, promise);
    const task = { i, resolve };
    urgent ? queue.unshift(task) : queue.push(task);
    runDownloads();
    return promise;
  }
  function runDownloads() {
    while (running && activeDownloads < 4 && queue.length) {
      const task = queue.shift();
      activeDownloads++;
      // Local file mode uses image paths; fetch is not supported for file://.
      const request = location.protocol === 'file:' ? Promise.resolve(path(task.i))
        : fetch(path(task.i)).then(response => {
          if (!response.ok) throw new Error('Image unavailable');
          return response.blob();
        }).then(blob => URL.createObjectURL(blob)).catch(() => path(task.i));
      request.then(url => {
        if (!running) { if (url.startsWith('blob:')) URL.revokeObjectURL(url); return; }
        assets.set(task.i, url);
        task.resolve(url);
      }).finally(() => { activeDownloads--; runDownloads(); });
    }
  }
  function image(i) {
    if (decoded.has(i)) return Promise.resolve(decoded.get(i));
    if (pending.has(i)) return pending.get(i);
    const promise = download(i, true).then(url => new Promise((resolve, reject) => {
      const picture = new Image();
      picture.onload = async () => {
        try { if (picture.decode) await picture.decode(); } catch (_) {}
        if (running && Math.abs(i - wanted) <= RADIUS) decoded.set(i, picture);
        resolve(picture);
      };
      picture.onerror = reject;
      picture.src = url;
    })).finally(() => pending.delete(i));
    pending.set(i, promise);
    return promise;
  }
  function trim() {
    for (const key of decoded.keys()) if (Math.abs(key - wanted) > RADIUS) decoded.delete(key);
  }
  function draw(picture) {
    const scale = Math.max(canvas.width / picture.width, canvas.height / picture.height);
    context.globalAlpha = 1;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.drawImage(picture, (canvas.width - picture.width * scale) / 2,
      (canvas.height - picture.height * scale) / 2, picture.width * scale, picture.height * scale);
    context.globalAlpha = 1;
  }
  async function paint() {
    if (rendering || !running) return; // Coalesce input while decoding, then use latest position.
    rendering = true;
    const sample = position;
    const low = Math.round(sample);
    wanted = low;
    try {
      const picture = await image(low);
      if (!running || paused) return;
      // Paint the resolved sample, then coalesce straight to the latest position.
      // Discarding every intermediate decode would freeze during fast scrolling.
      // One actual source frame per paint. Blending moving edges creates blur/ghosting.
      draw(picture);
      lastPaint = sample;
      canvas.dataset.frame = String(Math.round(sample) + 1);
      canvas.dataset.position = sample.toFixed(3);
      root.classList.add('is-ready');
      dirty = false;
      trim();
      const direction = target >= position ? 1 : -1;
      for (let offset = 1; offset <= 3; offset++) {
        const nearby = low + direction * offset;
        if (nearby >= 0 && nearby < COUNT) image(nearby).catch(() => {});
      }
      const label = target >= COUNT - 1 ? 'Cuộn lên để quay lại' : 'Cuộn để khám phá căn hộ';
      if (status.textContent !== label) status.textContent = label;
    } catch (_) {
      status.textContent = 'Không tải được ảnh nền. Thử tải lại trang.';
      lastPaint = position; // Do not retry forever on a missing asset.
      dirty = false;
    } finally {
      rendering = false;
      if (running && (dirty || Math.abs(lastPaint - position) > 0.015)) wake();
    }
  }
  function tick(now) {
    animation = 0;
    if (!running || paused || document.hidden) return;
    const elapsed = Math.min(50, Math.max(1, now - (lastTime || now - 16.67)));
    lastTime = now;
    const eased = (target - position) * (1 - Math.exp(-elapsed / DAMPING_MS));
    const limit = MAX_FRAMES_PER_SECOND * elapsed / 1000;
    position += Math.max(-limit, Math.min(limit, eased));
    if (Math.abs(target - position) < 0.015) position = target;
    story();
    if (dirty || Math.abs(lastPaint - position) > 0.015) paint();
    if (position !== target) animation = requestAnimationFrame(tick);
    else lastTime = 0; // Finite loop: stop when the camera settles.
  }
  function wake() {
    if (running && !paused && !animation && !document.hidden) animation = requestAnimationFrame(tick);
  }
  function read() {
    const distance = Math.max(1, root.offsetHeight - stage.offsetHeight);
    target = Math.round(Math.max(0, Math.min(1, -root.getBoundingClientRect().top / distance)) * (COUNT - 1));
    download(Math.round(target), true);
    wake();
  }
  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * ratio);
    canvas.height = Math.round(canvas.clientHeight * ratio);
    dirty = true;
    read();
  }
  window.addEventListener('scroll', read, { passive: true });
  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  root.querySelector('.apartment__replay').addEventListener('click', () => {
    window.scrollTo({ top: root.getBoundingClientRect().top + scrollY, behavior: 'instant' });
    read();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(animation); animation = 0; lastTime = 0; }
    else read();
  });
  window.addEventListener('pagehide', event => {
    if (event.persisted) return;
    running = false;
    cancelAnimationFrame(animation);
    observer.disconnect();
    window.removeEventListener('scroll', read);
    for (const url of assets.values()) if (url.startsWith('blob:')) URL.revokeObjectURL(url);
    decoded.clear();
  }, { once: true });
  read();
  // Restore the current chapter immediately on reload rather than replaying from zero.
  position = target;
  story();
  for (let i = 0; i < COUNT; i++) download(i);
})();
