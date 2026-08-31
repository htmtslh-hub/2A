/* Component gốc: giữ state, chạy các effect DOM và render markup sinh tự động. */
'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AgenticMarkup from '@/generated/markup';
import { INITIAL_STATE, buildView, type Imperative, type State } from '@/lib/view';
import {
  applyParallax,
  makeRevealBinder,
  startBot,
  syncDom,
  syncMobile,
  syncPreviews,
} from '@/lib/sync';
import { I18N, TAB_KEYS, type LangCode } from '@/generated/data';
import { useSession, signIn } from 'next-auth/react';

const HTML_LANG: Record<string, string> = { vi: 'vi', en: 'en', zh: 'zh-CN' };

export default function AgenticSite({ defaultTab = 'home' }: { defaultTab?: string }) {
  const [state, setStateRaw] = useState<State>(() => ({
    ...INITIAL_STATE,
    tab: (TAB_KEYS.includes(defaultTab) ? defaultTab : 'home') as State['tab'],
  }));

  const copyRef = useRef<HTMLDivElement | null>(null);
  const botRef = useRef<HTMLDivElement | null>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const bindRevealRef = useRef<() => void>(() => {});
  const afterPaintRef = useRef<(() => void) | null>(null);

  const setState = useCallback((patch: Partial<State>) => {
    setStateRaw((prev) => ({ ...prev, ...patch }));
  }, []);

  const push = useCallback(
    (patch: Partial<State>, extra?: () => void) => {
      if (extra) afterPaintRef.current = extra;
      setStateRaw((prev) => ({ ...prev, ...patch }));
    },
    []
  );

  const bumpCopy = useCallback(() => {
    const el = copyRef.current;
    if (!el) return;
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'riseIn .55s ease both';
  }, []);

  const applyLang = useCallback((code: LangCode) => {
    try {
      localStorage.setItem('agentic-lang', code);
    } catch {}
    document.documentElement.lang = HTML_LANG[code] || 'vi';
  }, []);

  /* --- đồng bộ tab với URL: chia sẻ được link, quay lại được bằng nút Back --- */
  useEffect(() => {
    const readUrl = () => {
      const p = new URLSearchParams(window.location.search);
      const tab = p.get('tab');
      const detail = p.get('mau');
      if (detail) {
        setState({ tab: 'detail', detail });
      } else if (tab && TAB_KEYS.includes(tab)) {
        setState({ tab: tab as State['tab'], detail: null });
      } else {
        setState({ tab: 'home', detail: null });
      }
    };
    readUrl();
    window.addEventListener('popstate', readUrl);
    return () => window.removeEventListener('popstate', readUrl);
  }, [setState]);

  // URL chỉ được ghi khi người dùng chuyển tab. Nếu ghi trong effect theo state
  // thì lần chạy đầu (state còn là 'home') sẽ xoá mất query của link chia sẻ —
  // và Strict Mode chạy effect hai lần khiến lần đọc thứ hai không còn gì để đọc.
  const syncUrl = useCallback((tab: string, detail: string | null) => {
    const p = new URLSearchParams();
    if (tab === 'detail' && detail) p.set('mau', detail);
    else if (tab !== 'home') p.set('tab', tab);
    const qs = p.toString();
    window.history.pushState(null, '', qs ? '?' + qs : window.location.pathname);
  }, []);

  /* --- khôi phục ngôn ngữ đã lưu --- */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('agentic-lang') as LangCode | null;
      if (saved && (I18N as Record<string, unknown>)[saved]) {
        // Ngôn ngữ chỉ biết được ở trình duyệt; server luôn dựng bản 'vi' nên
        // phải chỉnh lại sau khi mount, không thể đặt trong useState.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState({ lang: saved });
        applyLang(saved);
        return;
      }
    } catch {}
    applyLang('vi');
  }, [applyLang, setState]);

  /* --- observer cho hiệu ứng xuất hiện + lắng nghe cuộn/đổi kích thước --- */
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            el.dataset.revealDone = '1';
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.filter = 'none';
            el.style.transitionDelay = '0s';
            io?.unobserve(el);
          });
        },
        { threshold: 0, rootMargin: '0px 0px -12% 0px' }
      );
    }
    ioRef.current = io;
    bindRevealRef.current = makeRevealBinder(io);

    const bind = () => bindRevealRef.current();
    bind();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        applyParallax();
      });
    };
    const onResize = () => {
      bind();
      syncMobile();
    };

    window.addEventListener('scroll', bind, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const timers = [60, 260, 700, 1500].map((ms) =>
      window.setTimeout(() => {
        bind();
        syncPreviews();
        syncMobile();
      }, ms)
    );

    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', bind);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      timers.forEach(clearTimeout);
    };
  }, []);

  /* --- robot bay quanh thanh nav --- */
  useEffect(() => {
    const el = botRef.current;
    if (!el) return;
    const timer = startBot(el);
    return () => clearInterval(timer);
  }, []);

  /* --- đồng bộ DOM sau mỗi lần state đổi --- */
  useEffect(() => {
    syncDom(state);
    syncPreviews();
    const raf = requestAnimationFrame(() => {
      syncDom(state);
      bindRevealRef.current();
      const extra = afterPaintRef.current;
      if (extra) {
        afterPaintRef.current = null;
        extra();
      }
    });
    const t = window.setTimeout(() => syncDom(state), 80);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [state]);

  const { data: session } = useSession();

  /* --- form CTA: lưu email + gửi mẫu miễn phí --- */
  const onEmailSubmit = useCallback((email: string, lang: LangCode) => {
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, lang }),
    }).catch((err) => console.error('[lead]', err));
  }, []);

  /* --- đăng nhập bằng email + mật khẩu --- */
  const onAuthLogin = useCallback((email: string, password: string) => {
    signIn('credentials', { email, password, redirect: false }).then((res) => {
      if (res?.error) setState({ authDone: false });
    });
  }, [setState]);

  /* --- thanh toán: cần email nên phải đăng nhập trước --- */
  const startCheckout = useCallback(
    (kind: 'TEMPLATE' | 'BUNDLE', templateId?: string) => {
      const email = session?.user?.email;
      if (!email) {
        setState({ authOpen: true });
        return;
      }
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind,
          templateId,
          email,
          name: session?.user?.name ?? undefined,
          lang: state.lang,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.checkoutUrl) window.location.href = data.checkoutUrl;
          else alert(data.error || 'Không tạo được link thanh toán.');
        })
        .catch((err) => {
          console.error('[checkout]', err);
          alert('Không kết nối được cổng thanh toán.');
        });
    },
    [session, setState, state.lang]
  );

  const imperative: Imperative = useMemo(
    () => ({
      push,
      setState,
      bumpCopy,
      bindReveal: () => bindRevealRef.current(),
      syncPreviews,
      syncMobile,
      applyLang,
      syncUrl,
      onEmailSubmit,
      onAuthLogin,
      startCheckout,
    }),
    [push, setState, bumpCopy, applyLang, syncUrl, onEmailSubmit, onAuthLogin, startCheckout]
  );

  const vm = useMemo(
    // Chỉ truyền bản thân ref object xuống, không đọc .current lúc render.
    // eslint-disable-next-line react-hooks/refs
    () => buildView(state, { copyRef, botRef }, imperative),
    [state, imperative]
  );

  return <AgenticMarkup vm={vm} />;
}
