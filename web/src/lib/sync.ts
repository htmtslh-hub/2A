/* Port của sync() + hiệu ứng trong componentDidMount của Agentic.dc.html.
   Giữ nguyên cách thao tác DOM để đảm bảo giao diện giống hệt bản thiết kế. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACCENTS, IMAGES, POSTERS } from '@/generated/data';
import { bgPoster, cardVideo } from './media';
import type { State } from './view';

const $$ = (sel: string) => Array.from(document.querySelectorAll(sel));

/** Gán src lười cho video rồi phát.
 *  `src` truyền vào chứ không tra theo chỉ số, vì video nền dùng bản 1280px
 *  còn thẻ nhỏ dùng bản 480px — hai file khác nhau cho cùng một cảnh. */
export function playVid(
  el: HTMLVideoElement,
  src: string,
  isActive: () => boolean,
  poster?: string
) {
  el.muted = true;
  el.loop = true;
  const any = el as any;
  if (!any._wired) {
    any._wired = true;
    el.addEventListener('ended', () => {
      el.currentTime = 0;
      el.play().catch(() => {});
    });
    el.addEventListener('canplay', () => {
      if (isActive()) el.play().catch(() => {});
    });
  }
  if (!el.getAttribute('src')) {
    // Poster cũng gán lười: nếu để sẵn trong HTML thì cả năm ảnh nền đều tải
    // ngay lúc vào trang, trong khi chỉ một ảnh được nhìn thấy.
    if (poster && !el.getAttribute('poster')) el.setAttribute('poster', poster);
    el.setAttribute('preload', 'auto');
    el.setAttribute('src', src);
  }
  const p = el.play();
  if (p && p.catch) p.catch(() => {});
}

export function syncDom(st: State) {
  /* --- màu nhấn theo thẻ đang chọn --- */
  const acc = ACCENTS[st.active] || ACCENTS[0];
  const r = document.documentElement.style;
  r.setProperty('--acc', 'rgb(' + acc.rgb + ')');
  r.setProperty('--acc-hi', acc.hi);
  r.setProperty('--acc-soft', acc.soft);
  (
    [
      ['a00', 0],
      ['a08', 0.08],
      ['a14', 0.14],
      ['a18', 0.18],
      ['a45', 0.45],
      ['a50', 0.5],
      ['a55', 0.55],
    ] as [string, number][]
  ).forEach((p) => r.setProperty('--acc-' + p[0], 'rgba(' + acc.rgb + ',' + p[1] + ')'));

  /* --- hiệu ứng loé sáng chạy ngang nút --- */
  $$('[data-sheen]').forEach((el: any) => {
    if (el._sheenAnim || !el.animate) return;
    el._sheenAnim = el.animate(
      [
        { transform: 'translateX(-170%) skewX(-18deg)' },
        { transform: 'translateX(260%) skewX(-18deg)', offset: 0.55 },
        { transform: 'translateX(260%) skewX(-18deg)' },
      ],
      { duration: 6000, iterations: Infinity, easing: 'cubic-bezier(.33,0,.25,1)' }
    );
  });

  /* --- viền LED xoay --- */
  $$('[data-led-spin]').forEach((el: any) => {
    if (el._ledAnim || !el.animate) return;
    el._ledAnim = el.animate(
      [
        { transform: 'translate(-50%,-50%) rotate(0deg)' },
        { transform: 'translate(-50%,-50%) rotate(360deg)' },
      ],
      { duration: 1800, iterations: Infinity, easing: 'linear' }
    );
    try {
      el._ledAnim.startTime = 0;
    } catch {}
  });

  $$('[data-led-spin-rev]').forEach((el: any) => {
    if (el._ledAnim || !el.animate) return;
    el._ledAnim = el.animate(
      [
        { transform: 'translate(-50%,-50%) rotate(0deg)' },
        { transform: 'translate(-50%,-50%) rotate(-360deg)' },
      ],
      { duration: 2900, iterations: Infinity, easing: 'linear' }
    );
    try {
      el._ledAnim.startTime = 0;
    } catch {}
  });

  /* --- thanh điều hướng dạng dynamic island --- */
  const island = document.querySelector('[data-island]') as HTMLElement | null;
  if (island) {
    const open = !!st.island;
    island.style.maxHeight = open ? '128px' : '56px';
    island.style.borderRadius = open ? '28px' : '100px';
    const mini = island.querySelector('[data-island-mini]') as HTMLElement | null;
    const full = island.querySelector('[data-island-full]') as HTMLElement | null;
    const row2 = island.querySelector('[data-island-row2]') as HTMLElement | null;
    if (mini) {
      mini.style.maxWidth = open ? '0px' : '340px';
      mini.style.opacity = open ? '0' : '1';
      mini.style.padding = open ? '0' : '0 20px';
    }
    if (full) {
      full.style.maxWidth = open ? '920px' : '0px';
      full.style.opacity = open ? '1' : '0';
      full.style.padding = open ? '7px 9px' : '7px 0';
    }
    if (row2) {
      row2.style.transition =
        'opacity .55s cubic-bezier(.4,0,.2,1) .18s, max-width 1s cubic-bezier(.19,1,.22,1)';
      row2.style.overflow = 'hidden';
      row2.style.opacity = open ? '1' : '0';
      row2.style.maxWidth = open ? '920px' : '0px';
    }
    island.style.boxShadow = open
      ? 'inset 0 1px 0 rgba(255,255,255,.2), 0 26px 60px rgba(0,0,0,.6)'
      : 'inset 0 1px 0 rgba(255,255,255,.16), 0 18px 44px rgba(0,0,0,.5)';
  }

  /* --- pill tab đang chọn --- */
  $$('[data-tab-pill]').forEach((el: any) => {
    const on = el.getAttribute('data-tab-pill') === st.tab;
    el.style.background = on
      ? 'linear-gradient(180deg, rgba(255,255,255,.20) 0%, rgba(255,255,255,.09) 100%)'
      : 'transparent';
    el.style.borderColor = on ? 'rgba(255,255,255,.22)' : 'transparent';
    el.style.color = on ? '#fffdfa' : '#9aa2ac';
    el.style.boxShadow = on
      ? 'inset 0 -1px 0 rgba(255,255,255,.5), inset 0 1px 0 rgba(255,255,255,.24)'
      : 'none';
  });

  /* --- dải thẻ hero + video nền --- */
  const narrowStrip = (document.documentElement.clientWidth || window.innerWidth) < 720;
  $$('[data-hero-card]').forEach((el: any, i) => {
    el.style.flex = narrowStrip ? '0 0 auto' : i === st.active ? '1 1 44%' : '1 1 14%';
  });
  $$('[data-hero-bg]').forEach((el: any, i) => {
    const on = i === st.active;
    el.style.opacity = on ? '1' : '0';
    el.style.transform = on ? 'scale(1)' : 'scale(1.18)';
    el.style.filter = on ? 'blur(0px)' : 'blur(18px)';
    el.muted = true;
    if (on) playVid(el, IMAGES[i], () => i === st.active, bgPoster(POSTERS[i]));
    else el.pause();
  });
  $$('[data-hero-cardvid]').forEach((el: any, i) => {
    el.muted = true;
    if (i === st.active) playVid(el, cardVideo(IMAGES[i]), () => i === st.active);
    else el.pause();
  });

  /* --- pill ngôn ngữ --- */
  $$('[data-lang-pill]').forEach((el: any) => {
    const on = el.getAttribute('data-lang-pill') === st.lang;
    el.style.background = on
      ? 'linear-gradient(180deg, rgba(255,255,255,.42) 0%, rgba(255,255,255,.24) 100%)'
      : 'transparent';
    el.style.boxShadow = on
      ? 'inset 0 -1.5px 0 rgba(255,255,255,.85), inset 0 1px 0 rgba(255,255,255,.35)'
      : 'none';
    el.style.color = on ? '#fffdfa' : '#c8ced6';
  });

  /* --- chip lọc danh mục --- */
  $$('[data-filter-chip]').forEach((el: any) => {
    const on = el.getAttribute('data-filter-chip') === st.filter;
    el.style.background = on
      ? 'linear-gradient(180deg, rgba(255,255,255,.32) 0%, rgba(255,255,255,.16) 100%)'
      : 'rgba(255,255,255,.05)';
    el.style.boxShadow = on
      ? 'inset 0 -1.5px 0 rgba(255,255,255,.85), inset 0 1px 0 rgba(255,255,255,.3)'
      : 'none';
    el.style.color = on ? '#fffdfa' : '#c8ced6';
    el.style.borderColor = on ? 'rgba(255,255,255,.42)' : 'rgba(255,255,255,.2)';
    el.style.borderRadius = '14px';
  });

  /* --- accordion FAQ --- */
  $$('[data-faq-panel]').forEach((el: any, i) => {
    const on = st.openFaq === i;
    el.style.maxHeight = on ? '340px' : '0px';
    el.style.opacity = on ? '1' : '0';
  });
  $$('[data-faq-icon]').forEach((el: any, i) => {
    el.style.transform = st.openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)';
  });
}

/* ===== hiệu ứng xuất hiện khi cuộn ===== */
const EASE = 'cubic-bezier(.22,.72,.24,1)';
const FROM: Record<string, string> = {
  up: 'translate3d(0,28px,0)',
  left: 'translate3d(-34px,0,0)',
  right: 'translate3d(34px,0,0)',
  scale: 'translate3d(0,20px,0) scale(.955)',
  fade: 'none',
};

const reveal = (el: HTMLElement) => {
  el.style.opacity = '1';
  el.style.transform = 'none';
  el.style.filter = 'none';
  el.style.transitionDelay = '0s';
};

export function autoTag() {
  $$('section').forEach((sec: any) => {
    if (sec.dataset.autoTagged === '1') return;
    sec.dataset.autoTagged = '1';
    const inner = sec.querySelector(':scope > div');
    if (!inner) return;
    [...inner.children].forEach((child: any, i) => {
      if (child.hasAttribute('data-reveal') || child.getAttribute('aria-hidden') === 'true') return;
      if (child.querySelector('[data-reveal]')) {
        [...child.children].forEach((gc: any) => {
          if (gc.hasAttribute('data-reveal') || gc.querySelector('[data-reveal]')) return;
          gc.setAttribute('data-reveal', i === 0 ? 'left' : 'up');
        });
        return;
      }
      child.setAttribute('data-reveal', i === 0 ? 'left' : 'up');
    });
  });
}

export function makeRevealBinder(io: IntersectionObserver | null) {
  return function bindReveal() {
    autoTag();
    tagGlows();
    $$('[data-reveal]').forEach((el: any) => {
      if (el.dataset.revealDone === '1') return;
      const kind = el.getAttribute('data-reveal') || 'up';
      const sibs = [...el.parentElement.children].filter((c: any) => c.hasAttribute('data-reveal'));
      const idx = Math.max(0, sibs.indexOf(el));
      el.style.transition =
        'opacity .78s ' + EASE + ', transform .78s ' + EASE + ', filter .78s ' + EASE;
      el.style.transitionDelay = Math.min(idx * 0.07, 0.42) + 's';
      el.style.willChange = 'opacity, transform';
      const rect = el.getBoundingClientRect();
      const inView = rect.top < (window.innerHeight || 0) * 0.92 && rect.bottom > 0;
      if (!io || inView) {
        el.dataset.revealDone = '1';
        reveal(el);
        return;
      }
      el.style.opacity = '0';
      el.style.transform = FROM[kind] || FROM.up;
      el.style.filter = 'blur(6px)';
      io.observe(el);
    });
  };
}

/* ===== parallax + thanh tiến độ cuộn ===== */
export function applyParallax() {
  const y = window.scrollY || window.pageYOffset || 0;
  const vh = window.innerHeight || 1;

  const hero = document.getElementById('hero-bg-wrap');
  if (hero) hero.style.transform = 'translate3d(0,' + (Math.min(y, vh * 1.2) * 0.1).toFixed(1) + 'px,0)';

  const bar = document.getElementById('scroll-progress');
  if (bar) {
    const max = Math.max(1, (document.documentElement.scrollHeight || 0) - vh);
    bar.style.transform = 'scaleX(' + Math.min(1, y / max) + ')';
  }

  $$('[data-glow]').forEach((el: any) => {
    const rect = el.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > vh + 200) return;
    const p = (rect.top + rect.height / 2 - vh / 2) / vh;
    el.style.transform =
      (el.dataset.glowBase || '') + ' translate3d(0,' + (-p * 42).toFixed(1) + 'px,0)';
  });
}

export function tagGlows() {
  $$('section [aria-hidden="true"]').forEach((el: any) => {
    if (el.dataset.glow || el.id === 'hero-bg-wrap') return;
    const cs = getComputedStyle(el);
    const m = /blur\((\d+(?:\.\d+)?)px\)/.exec(cs.filter || '');
    if (!m || parseFloat(m[1]) < 60) return;
    el.dataset.glow = '1';
    el.dataset.glowBase =
      (el.getAttribute('style') || '').indexOf('translateX(-50%)') > -1 ? 'translateX(-50%)' : '';
    el.style.willChange = 'transform';
    applyParallax();
  });
}

/* ===== dải thẻ hero trên màn hình hẹp ===== */
export function syncMobile() {
  const narrow = (document.documentElement.clientWidth || window.innerWidth) < 720;
  $$('[data-herostrip]').forEach((strip: any) => {
    strip.style.overflowX = narrow ? 'auto' : 'hidden';
    strip.style.scrollSnapType = narrow ? 'x mandatory' : '';
    strip.style.scrollbarWidth = 'none';
    strip.style.paddingBottom = narrow ? '2px' : '';
    Array.prototype.forEach.call(strip.children, (c: any) => {
      c.style.minWidth = narrow ? '72%' : '0';
      c.style.scrollSnapAlign = narrow ? 'start' : '';
    });
  });
}

/* ===== ô ảnh preview: cao hơn khung khi đã có ảnh để cuộn được ===== */
export function syncPreviews() {
  $$('[data-scroller]').forEach((sc: any) => {
    const slot = sc.querySelector('[data-image-slot]');
    const filled = slot && slot.hasAttribute('data-filled');
    sc.style.height = filled ? '182%' : '100%';
  });
}

/* ===== robot bay lởn vởn quanh thanh nav ===== */
export function startBot(el: HTMLElement) {
  let flip = 1;
  let botX = 0;
  const hop = () => {
    const island = document.querySelector('[data-island]');
    const w = island ? island.getBoundingClientRect().width : 320;
    const rx = Math.min(w / 2 + 60, window.innerWidth / 2 - 40);
    const x = (Math.random() * 2 - 1) * rx;
    const edge = Math.abs(x) > rx * 0.55;

    // Màn hình hẹp không có chỗ trống hai bên thanh nav, nên nếu để robot bay
    // xuống dải +68…+88 nó sẽ đè lên chữ của phần hero. Trên mobile giữ nó bám
    // sát thanh nav; desktop vẫn bay rộng như thiết kế gốc.
    const narrow = (document.documentElement.clientWidth || window.innerWidth) < 720;
    const y = narrow
      ? -26 + Math.random() * 30
      : edge
        ? -22 + Math.random() * 104
        : Math.random() < 0.5
          ? -22 + Math.random() * 12
          : 68 + Math.random() * 20;
    const next = x < botX ? -1 : 1;
    if (next !== flip) flip = next;
    botX = x;
    el.style.transitionDuration = (1.9 + Math.random() * 1.6).toFixed(2) + 's';
    el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
    const fl = el.querySelector('[data-bot-flip]') as HTMLElement | null;
    if (fl) fl.style.transform = 'scaleX(' + flip + ')';
  };
  hop();
  return window.setInterval(hop, 2600);
}
