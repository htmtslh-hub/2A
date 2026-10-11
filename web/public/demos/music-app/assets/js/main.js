/* Music App — local interaction demo. No requests, storage or accounts. */
(() => {
  'use strict';
  const root = document.querySelector('.canvas');
  if (!root) return;
  document.documentElement.classList.add('js');
  const audio = document.getElementById('audio');
  const play = document.getElementById('play');
  const symbol = document.getElementById('play-symbol');
  const seek = document.getElementById('seek');
  const elapsed = document.getElementById('elapsed');
  const toast = document.getElementById('toast');
  const tracks = [
    { title: 'AURORA', artist: 'SOLARA', image: 'aurora', alt: 'Aurora: silver-haired woman in coral against a navy starry sky' },
    { title: 'EUPHORIA', artist: 'LUNA', image: 'luna', alt: 'Euphoria: woman with navy bob and closed eyes on lavender' },
    { title: 'SUMMER VIBES', artist: 'Summer Beat', image: 'summer', alt: 'Summer Vibes: woman in yellow on mint' },
    { title: 'THE STOPTH', artist: 'SOLARA - Art', image: 'aurora', alt: 'Silver-haired woman against a starry sky' }
  ];
  let current = 0;
  let shuffled = false;
  let toastTimer;
  let equalizerTimer;
  const announce = message => {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toastTimer = setTimeout(() => { toast.textContent = ''; }, 2600);
  };
  const formatTime = seconds => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  const bars = (container, count) => {
    for (let n = 0; n < count; n++) {
      const bar = document.createElement('i');
      bar.style.height = `${6 + ((n * 17 + n * n) % 31)}px`;
      container.append(bar);
    }
  };
  bars(document.querySelector('.equalizer'), 19);
  bars(document.querySelector('.waveform'), 39);
  const updatePlayback = () => {
    const playing = !audio.paused && !audio.ended;
    symbol.setAttribute('href', playing ? '#i-pause' : '#i-play');
    play.setAttribute('aria-label', playing ? 'Pause audio demo' : 'Play audio demo');
    document.getElementById('playing-state').textContent = playing ? 'PLAYING' : 'PAUSED';
    clearInterval(equalizerTimer);
    if (playing) {
      equalizerTimer = setInterval(() => {
        const phase = Math.floor(audio.currentTime * 5);
        document.querySelectorAll('.equalizer i').forEach((bar, n) => {
          bar.style.height = `${5 + ((n * 13 + phase * 7) % 31)}px`;
        });
      }, 180);
    }
  };
  const start = async () => {
    try { await audio.play(); }
    catch { announce('Audio could not start. Try the play button again.'); }
  };
  const selectTrack = index => {
    current = (index + tracks.length) % tracks.length;
    const track = tracks[current];
    document.getElementById('now-title').textContent = track.title;
    document.getElementById('now-artist').textContent = track.artist;
    const art = document.getElementById('now-art');
    art.src = `assets/img/${track.image}.webp`;
    art.alt = track.alt;
    audio.currentTime = 0;
    announce(`${track.title} · original audio demo`);
    start();
  };
  root.querySelectorAll('[data-track]').forEach(control => {
    control.addEventListener('click', () => selectTrack(Number(control.dataset.track)));
  });
  play.addEventListener('click', () => audio.paused ? start() : audio.pause());
  document.getElementById('next').addEventListener('click', () => selectTrack(shuffled ? (current + 1 + Math.floor(Math.random() * (tracks.length - 1))) : current + 1));
  document.getElementById('previous').addEventListener('click', () => selectTrack(current - 1));
  document.getElementById('shuffle').addEventListener('click', event => {
    shuffled = !shuffled;
    event.currentTarget.setAttribute('aria-pressed', String(shuffled));
    announce(shuffled ? 'Shuffle on' : 'Shuffle off');
  });
  document.getElementById('repeat').addEventListener('click', event => {
    audio.loop = !audio.loop;
    event.currentTarget.setAttribute('aria-pressed', String(audio.loop));
    announce(audio.loop ? 'Repeat on' : 'Repeat off');
  });
  audio.volume = Number(document.getElementById('volume').value);
  document.getElementById('volume').addEventListener('input', event => { audio.volume = Number(event.target.value); });
  seek.addEventListener('input', () => { audio.currentTime = Number(seek.value); });
  audio.addEventListener('loadedmetadata', () => { seek.max = String(audio.duration); });
  audio.addEventListener('timeupdate', () => {
    seek.value = String(audio.currentTime);
    elapsed.textContent = formatTime(audio.currentTime);
  });
  ['play', 'pause', 'ended'].forEach(name => audio.addEventListener(name, updatePlayback));
  audio.addEventListener('error', () => announce('Audio file unavailable. The rest of the interface is still usable.'));
  root.querySelectorAll('.favourite').forEach(button => {
    button.addEventListener('click', () => {
      const saved = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(saved));
      announce(saved ? 'Saved for this session' : 'Removed from favourites');
    });
  });
  document.getElementById('follow').addEventListener('click', event => {
    const button = event.currentTarget;
    const followed = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(followed));
    button.textContent = followed ? 'Following' : 'Follow';
    announce(followed ? 'Following Solara for this session' : 'Unfollowed Solara');
  });
  document.getElementById('search').addEventListener('input', event => {
    const query = event.target.value.trim().toLowerCase();
    let visible = 0;
    root.querySelectorAll('[data-search]').forEach(row => {
      row.hidden = !row.dataset.search.includes(query);
      if (!row.hidden) visible++;
    });
    document.getElementById('search-note').textContent = `${visible} tracks found${query ? ` for ${query}` : ''}.`;
  });
  document.getElementById('add').addEventListener('click', () => {
    const row = root.querySelector('[data-search="daylight summer beat"]');
    row.hidden = false;
    document.getElementById('search').value = '';
    root.querySelectorAll('[data-search]').forEach(item => { item.hidden = false; });
    row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    announce('Daylight is in your library');
  });
  document.getElementById('settings').addEventListener('click', () => document.getElementById('settings-dialog').showModal());

  // Finite RAF supplies the reveal even when CSS/WAAPI animations are disabled.
  const frames = new Map();
  const reveal = element => {
    const old = frames.get(element);
    if (old) cancelAnimationFrame(old);
    const started = performance.now();
    const frame = now => {
      const progress = Math.min(1, (now - started) / 420);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.style.opacity = String(eased);
      element.style.transform = `translateY(${12 * (1 - eased)}px)`;
      if (progress < 1) frames.set(element, requestAnimationFrame(frame));
      else { element.style.removeProperty('opacity'); element.style.removeProperty('transform'); frames.delete(element); }
    };
    frames.set(element, requestAnimationFrame(frame));
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { reveal(entry.target); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    root.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
  }
  window.addEventListener('pagehide', () => {
    audio.pause();
    clearInterval(equalizerTimer);
    clearTimeout(toastTimer);
    frames.forEach(id => cancelAnimationFrame(id));
    frames.clear();
  }, { once: true });
})();
