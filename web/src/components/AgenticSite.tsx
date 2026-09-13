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
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { HTML_LANG } from '@/lib/lang';
import { AUTH_ERRORS, FORGOT_STRINGS } from '@/lib/i18n-extra';
import Toast from './Toast';



export default function AgenticSite({
  defaultTab = 'home',
  initialLang = 'vi',
}: {
  defaultTab?: string;
  /** Ngôn ngữ đọc từ cookie ở server. Dựng sẵn đúng ngôn ngữ ngay từ HTML
   *  đầu tiên, thay vì dựng tiếng Việt rồi đổi sau khi mount — khách chọn
   *  tiếng Anh sẽ không còn thấy chớp một nhịp tiếng Việt. */
  initialLang?: LangCode;
}) {
  const [state, setStateRaw] = useState<State>(() => ({
    ...INITIAL_STATE,
    lang: initialLang,
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
      // Cookie để các trang dựng ở server (vd. /don-hang) biết ngôn ngữ —
      // localStorage chỉ trình duyệt đọc được.
      document.cookie = `agentic-lang=${code}; path=/; max-age=31536000; samesite=lax`;
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
        // Thường trùng với cookie server đã đọc. Chỉ lệch khi cookie bị chặn
        // hoặc hết hạn, khi đó localStorage là nguồn đúng hơn.
        if (saved !== initialLang) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setState({ lang: saved });
        }
        applyLang(saved);
        return;
      }
    } catch {}
    // Chưa từng chọn thì KHÔNG ghi cookie hay localStorage — cookie phải là dấu
    // hiệu khách đã tự chọn thứ tiếng. Ghi sẵn ngôn ngữ đoán từ trình duyệt ở
    // đây thì nó thành "đã chọn" vĩnh viễn, và trước kia khi mặc định còn là
    // 'vi' thì người duyệt Paddle đi từ trang chủ sang điều khoản bị khoá ở
    // tiếng Việt. Xem readLang().
    document.documentElement.lang = HTML_LANG[initialLang] || 'vi';
  }, [applyLang, setState, initialLang]);

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

    // Xoay ngang điện thoại thì video nền phải đổi sang bản cắt khác khung,
    // mà việc chọn bản nằm trong syncDom nên phải chạy lại khi khung nhìn đổi.
    const onResize = () => syncDom(state);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, [state]);

  const { data: session } = useSession();
  const router = useRouter();

  // Nút Google chỉ hiện khi server thật sự có provider đó. Auth.js chỉ đăng ký
  // Google khi có AUTH_GOOGLE_ID/SECRET, nên đây là nguồn tin cậy duy nhất.
  const [googleEnabled, setGoogleEnabled] = useState(false);
  useEffect(() => {
    let alive = true;
    fetch('/api/auth/providers')
      .then((r) => r.json())
      .then((p) => {
        if (alive && p && typeof p === 'object' && 'google' in p) setGoogleEnabled(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const onGoogleSignIn = useCallback(() => {
    signIn('google', { callbackUrl: '/' });
  }, []);

  /* --- form CTA: lưu email + gửi mẫu miễn phí --- */
  const onEmailSubmit = useCallback(
    (email: string, lang: LangCode) => {
      const err = AUTH_ERRORS[lang];
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang }),
      })
        .then(async (r) => {
          if (r.ok) {
            setState({ submitted: true });
            return;
          }
          const data = await r.json().catch(() => null);
          setState({ toast: data?.error || err.generic });
        })
        .catch(() => setState({ toast: err.network }));
    },
    [setState]
  );

  /* --- đăng nhập bằng email + mật khẩu --- */
  const onAuthLogin = useCallback(
    (email: string, password: string) => {
      const err = AUTH_ERRORS[state.lang];
      signIn('credentials', { email, password, redirect: false })
        .then((res) => {
          if (res?.error) setState({ authDone: false, authError: err.badCredentials });
          else setState({ authDone: true, authError: null, authOpen: false });
        })
        .catch(() => setState({ authDone: false, authError: err.network }));
    },
    [setState, state.lang]
  );

  /* --- tạo tài khoản rồi đăng nhập luôn --- */
  const onAuthRegister = useCallback(
    (email: string, password: string) => {
      const err = AUTH_ERRORS[state.lang];
      if (password.length < 8) {
        setState({ authError: err.shortPassword });
        return;
      }
      fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
        .then(async (r) => {
          if (r.ok) {
            onAuthLogin(email, password);
            return;
          }
          setState({
            authError: r.status === 409 ? err.emailTaken : (await r.json()).error || err.generic,
          });
        })
        .catch(() => setState({ authError: err.network }));
    },
    [setState, onAuthLogin, state.lang]
  );

  /* --- gửi link đặt lại mật khẩu --- */
  const onForgotPassword = useCallback(
    (email: string) => {
      const err = AUTH_ERRORS[state.lang];
      fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang: state.lang }),
      })
        .then((r) => {
          if (!r.ok) {
            setState({ authError: err.generic });
            return;
          }
          // Cố tình không nói email có tồn tại hay không, tránh lộ danh sách
          // tài khoản. Đóng modal và báo bằng toast.
          setState({ authOpen: false, authMode: 'login', toast: FORGOT_STRINGS[state.lang].sent });
        })
        .catch(() => setState({ authError: err.network }));
    },
    [setState, state.lang]
  );

  const goAccount = useCallback(() => {
    router.push('/don-hang');
  }, [router]);


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
          else setState({ toast: data.error || AUTH_ERRORS[state.lang].generic });
        })
        .catch((err) => {
          console.error('[checkout]', err);
          setState({ toast: AUTH_ERRORS[state.lang].network });
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
      onAuthRegister,
      onForgotPassword,
      goAccount,
      onGoogleSignIn,
      startCheckout,
    }),
    [
      push,
      setState,
      bumpCopy,
      applyLang,
      syncUrl,
      onEmailSubmit,
      onAuthLogin,
      onAuthRegister,
      onForgotPassword,
      goAccount,
      onGoogleSignIn,
      startCheckout,
    ]
  );

  const vm = useMemo(
    // Chỉ truyền bản thân ref object xuống, không đọc .current lúc render.
    // eslint-disable-next-line react-hooks/refs
    () => buildView(state, { copyRef, botRef }, imperative, {
        signedIn: Boolean(session?.user),
        googleEnabled,
      }),
    [state, imperative, session, googleEnabled]
  );

  return (
    <>
      <AgenticMarkup vm={vm} />
      <Toast message={state.toast} onClose={() => setState({ toast: null })} />
    </>
  );
}
