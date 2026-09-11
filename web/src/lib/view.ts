/* Port của renderVals() trong Agentic.dc.html sang React.
   Giữ nguyên tên trường để markup sinh tự động dùng được không đổi. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RefObject } from 'react';
import { REGISTER_STRINGS, FORGOT_STRINGS, NAV_ACCOUNT } from './i18n-extra';
import { LEGAL_LABELS, LEGAL_PATHS, PAGE_LABELS, PAGE_PATHS } from './legal';
import { COMPANY } from './company';
import { bgPoster } from './media';
import { HERO_SERVICE_CTA, SERVICE, SERVICE_PATH } from './service-content';
import { CASE_PATH, CASE_STUDY } from './case-study';
import {
  I18N,
  IDS,
  POSTERS,
  TAB_KEYS,
  CAT_KEYS,
  TPL_META,
  THEME_SETS,
  TIER_STYLE,
  type LangCode,
} from '@/generated/data';

export type TabKey = 'home' | 'library' | 'process' | 'pricing' | 'faq' | 'cta' | 'detail';

export interface State {
  active: number;
  menuOpen: boolean;
  submitted: boolean;
  lang: LangCode;
  filter: string;
  openFaq: number;
  tab: TabKey;
  island: boolean;
  authOpen: boolean;
  authDone: boolean;
  /** Modal đang ở chế độ đăng nhập hay tạo tài khoản. */
  authMode: 'login' | 'register' | 'forgot';
  /** Lỗi hiện trong modal; null là không có. */
  authError: string | null;
  /** Thông báo nổi ở góc màn hình; null là không hiện. */
  toast: string | null;
  detail: string | null;
}

export const INITIAL_STATE: State = {
  active: 0,
  menuOpen: false,
  submitted: false,
  lang: 'vi',
  filter: 'all',
  openFaq: 0,
  tab: 'home',
  island: false,
  authOpen: false,
  authDone: false,
  authMode: 'login',
  authError: null,
  toast: null,
  detail: null,
};

/** Các thao tác DOM mệnh lệnh mà view cần gọi (do AgenticSite cung cấp). */
export interface Imperative {
  push: (patch: Partial<State>, extra?: () => void) => void;
  setState: (patch: Partial<State>) => void;
  bumpCopy: () => void;
  bindReveal: () => void;
  syncPreviews: () => void;
  syncMobile: () => void;
  applyLang: (code: LangCode) => void;
  syncUrl: (tab: string, detail: string | null) => void;
  /** Gửi email ở form CTA lên /api/lead. */
  onEmailSubmit: (email: string, lang: LangCode) => void;
  /** Đăng nhập bằng email + mật khẩu. */
  onAuthLogin: (email: string, password: string) => void;
  /** Tạo tài khoản rồi đăng nhập luôn. */
  onAuthRegister: (email: string, password: string) => void;
  /** Gửi link đặt lại mật khẩu. */
  onForgotPassword: (email: string) => void;
  /** Mở trang đơn hàng của tài khoản đang đăng nhập. */
  goAccount: () => void;
  /** Mở trang đặt làm agent, chọn sẵn loại khách vừa bấm. */
  goService: (kind?: string) => void;
  /** Đăng nhập bằng Google. */
  onGoogleSignIn: () => void;
  /** Bắt đầu thanh toán: mở PayOS, hoặc yêu cầu đăng nhập trước. */
  startCheckout: (kind: 'TEMPLATE' | 'BUNDLE', templateId?: string) => void;
}

export interface Refs {
  copyRef: RefObject<HTMLDivElement | null>;
  botRef: RefObject<HTMLDivElement | null>;
}

export type View = Record<string, any>;

/* Chữ chỉ dành cho trình đọc màn hình và công cụ tìm kiếm — không hiện trên
   giao diện nên không lấy từ bộ chữ của bản thiết kế. */
const NAV_ARIA: Record<string, string> = {
  vi: 'Điều hướng chính',
  en: 'Main navigation',
  zh: '主导航',
};

/** H1 thật của trang. Phần nhìn thấy ở hero là tên danh mục đang chọn nên
 *  không dùng làm tiêu đề cấp một được — Google sẽ đọc trang chủ thành
 *  "Về Tôi". H1 này ẩn về mặt hình ảnh nhưng vẫn là tiêu đề của tài liệu. */
const PAGE_H1: Record<string, string> = {
  vi: 'Agentic — giao diện web cao cấp dựng sẵn, kèm giấy phép thương mại',
  en: 'Agentic — premium ready-made website templates with a commercial licence',
  zh: 'Agentic — 高端预制网站模板，含商用授权',
};

export function buildView(
  state: State,
  refs: Refs,
  im: Imperative,
  ctx: { signedIn: boolean; googleEnabled: boolean } = { signedIn: false, googleEnabled: false }
): View {
  const lang: LangCode = (I18N as any)[state.lang] ? state.lang : 'vi';
  const base = (I18N as any)[lang];

  // Modal dùng chung một bộ markup cho cả đăng nhập lẫn đăng ký, nên đổi chữ
  // ngay trong `t` thay vì phải sửa file markup sinh tự động.
  const registering = state.authMode === 'register';
  const forgetting = state.authMode === 'forgot';
  const modeStrings = registering
    ? REGISTER_STRINGS[lang]
    : forgetting
      ? FORGOT_STRINGS[lang]
      : null;
  const t = {
    ...base,
    // Nhãn cho landmark <nav> và H1 ẩn — chỉ trình đọc màn hình và công cụ
    // tìm kiếm thấy, nên không nằm trong bộ chữ của bản thiết kế.
    navAria: NAV_ARIA[lang],
    ...(modeStrings
      ? {
          authTitle: modeStrings.title,
          authSub: modeStrings.sub,
          authSubmit: modeStrings.submit,
          authNoAcc: modeStrings.noAcc,
          authSignup: modeStrings.signup,
        }
      : null),
    // Đã đăng nhập thì nút ở thanh nav dẫn sang trang đơn hàng.
    ...(ctx.signedIn ? { navCta: NAV_ACCOUNT[lang] } : null),
  };
  const n = t.services.length;
  const active = Math.min(state.active, n - 1);
  const s = t.services[active];
  const { filter, tab } = state;

  const langOptions = (
    [
      { code: 'vi', label: 'VI', aria: 'Tiếng Việt' },
      { code: 'en', label: 'EN', aria: 'English' },
      { code: 'zh', label: '中', aria: '中文' },
    ] as const
  ).map((o) => ({
    code: o.code,
    label: o.label,
    aria: o.aria,
    onSelect: () => {
      im.applyLang(o.code as LangCode);
      im.push({ lang: o.code as LangCode }, () => {
        im.bumpCopy();
        im.bindReveal();
      });
    },
  }));

  const filters = [{ key: 'all', label: t.catAll }]
    .concat(CAT_KEYS.map((k: string) => ({ key: k, label: t.cats[k] })))
    .map((f) => ({
      key: f.key,
      label: f.label,
      onSelect: () => im.push({ filter: f.key }, () => im.bindReveal()),
    }));

  const templates = TPL_META.map((m: any, i: number) => ({
    ...m,
    ...t.templates[i],
    catLabel: t.cats[m.cat],
    badge: m.badge || '',
  }))
    .filter((m: any) => filter === 'all' || m.cat === filter)
    .map((m: any) => ({ ...m, onDetail: () => openDetail(m.id) }));

  const marqueeSet = t.marquee.map((label: string) => ({ label, color: '#eceef1' }));

  const allTpl = TPL_META.map((m: any, i: number) => ({
    ...m,
    ...t.templates[i],
    catLabel: t.cats[m.cat],
    badge: m.badge || '',
    idx: i,
  }));

  const dIdx = allTpl.findIndex((m: any) => m.id === state.detail);
  const d = dIdx >= 0 ? allTpl[dIdx] : null;
  const detail = d
    ? {
        ...d,
        slotId: 'agentic-tpl-' + d.id,
        views: (t.dViewNames || []).map((name: string, i: number) => ({
          name,
          slotId: 'agentic-tpl-' + d.id,
          w: ['100%', '62%', '30%'][i],
          ratio: ['16/10', '3/4', '9/16'][i],
        })),
        specs: (t.dSpecRows || []).map((r: string[]) => ({ k: r[0], v: r[1] })),
        related: allTpl
          .filter((m: any) => m.cat === d.cat && m.id !== d.id)
          .concat(allTpl.filter((m: any) => m.cat !== d.cat && m.id !== d.id))
          .slice(0, 3)
          .map((m: any) => ({ ...m, onSelect: () => openDetail(m.id) })),
      }
    : null;

  function openDetail(id: string) {
    im.syncUrl('detail', id);
    im.push({ tab: 'detail', detail: id, menuOpen: false, island: false }, () => {
      try {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } catch {
        window.scrollTo(0, 0);
      }
      im.bindReveal();
      im.syncPreviews();
    });
  }

  function goTab(key: TabKey) {
    if (state.tab === key && !state.menuOpen) return;
    im.syncUrl(key, null);
    im.push({ tab: key, menuOpen: false, island: false, detail: null }, () => {
      try {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } catch {
        window.scrollTo(0, 0);
      }
      im.bindReveal();
      im.syncMobile();
      if (key === 'home') im.bumpCopy();
    });
  }

  return {
    t,
    // Địa chỉ thật lấy từ company.ts; bản thiết kế ghi cứng một email không
    // tồn tại nên convert.mjs thay mọi chỗ bằng biến này.
    contactEmail: COMPANY.email,
    pageH1: tab === 'detail' && detail ? `${detail.name} — ${COMPANY.brand}` : PAGE_H1[lang],
    langOptions,
    filters,
    templates,
    marqueeItems: marqueeSet.concat(marqueeSet),
    tabs: TAB_KEYS.slice(0, 5).map((k: string, i: number) => ({
      key: k,
      label: t.nav[i],
      onSelect: () => goTab(k as TabKey),
    })),
    detail,
    isDetail: tab === 'detail' && !!detail,
    closeDetail: () => goTab('library'),
    isHome: tab === 'home',
    isLibrary: tab === 'library',
    isProcess: tab === 'process',
    isPricing: tab === 'pricing',
    isFaq: tab === 'faq',
    isCta: tab === 'cta',
    homeThemeTitle: s.title,
    homeThemeKicker: s.kicker,
    homeTemplates: (THEME_SETS[active] || THEME_SETS[0]).map((i: number) => ({
      ...TPL_META[i],
      ...t.templates[i],
      catLabel: t.cats[TPL_META[i].cat],
      badge: TPL_META[i].badge || '',
      onDetail: () => openDetail(TPL_META[i].id),
    })),
    showFooter: true,
    goHome: () => goTab('home'),
    goLibrary: () => goTab('library'),
    goProcess: () => goTab('process'),
    goPricing: () => goTab('pricing'),
    goCta: () => goTab('cta'),
    authOpen: state.authOpen,
    authDone: state.authDone,
    openAuth: () => {
      if (ctx.signedIn) {
        im.setState({ menuOpen: false });
        im.goAccount();
        return;
      }
      im.setState({ authOpen: true, menuOpen: false, authMode: 'login', authError: null });
    },
    closeAuth: () =>
      im.setState({ authOpen: false, authDone: false, authError: null, authMode: 'login' }),
    authError: state.authError,
    // Chế độ quên mật khẩu chỉ cần email, nên giấu ô mật khẩu đi.
    showPassword: !forgetting,
    showForgotLink: state.authMode === 'login',
    startForgot: () =>
      im.setState({ authMode: 'forgot', authError: null, authDone: false }),
    googleEnabled: ctx.googleEnabled,
    onGoogleSignIn: () => im.onGoogleSignIn(),
    toast: state.toast,
    closeToast: () => im.setState({ toast: null }),
    toggleAuthMode: () =>
      im.setState({
        // Từ 'forgot' hay 'register' đều quay về đăng nhập; từ đăng nhập thì
        // sang đăng ký.
        authMode: state.authMode === 'login' ? 'register' : 'login',
        authError: null,
        authDone: false,
      }),
    goPricingFromAuth: () => {
      im.setState({ authOpen: false, authDone: false });
      goTab('pricing');
    },
    stopProp: (e: any) => e.stopPropagation(),
    onAuthSubmit: (e: any) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const email = (form.querySelector('input[type="email"]') as HTMLInputElement | null)?.value ?? '';
      const pass = (form.querySelector('input[type="password"]') as HTMLInputElement | null)?.value ?? '';
      im.setState({ authError: null });
      if (forgetting) im.onForgotPassword(email);
      else if (registering) im.onAuthRegister(email, pass);
      else im.onAuthLogin(email, pass);
    },
    authSubmitLabel: state.authDone ? '✓' : t.authSubmit,
    botRef: refs.botRef,
    copyRef: refs.copyRef,
    ledOn: (e: any) => {
      const c = e.currentTarget as HTMLElement;
      const l = c.querySelector('[data-led]') as HTMLElement | null;
      if (l) l.style.opacity = '1';
      im.syncPreviews();
      const sc = c.querySelector('[data-scroller]') as HTMLElement | null;
      const slot = sc?.querySelector('[data-image-slot]') as HTMLElement | null;
      if (
        sc &&
        slot?.hasAttribute('data-filled') &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        sc.style.transition = 'transform 3.6s cubic-bezier(.33,0,.25,1)';
        sc.style.transform = 'translateY(-45%)';
      }
      const bar = c.querySelector('[data-scrollbar]') as HTMLElement | null;
      if (bar && slot?.hasAttribute('data-filled')) bar.style.opacity = '1';
    },
    ledOff: (e: any) => {
      const c = e.currentTarget as HTMLElement;
      const l = c.querySelector('[data-led]') as HTMLElement | null;
      if (l) l.style.opacity = '0';
      const sc = c.querySelector('[data-scroller]') as HTMLElement | null;
      if (sc) {
        sc.style.transition = 'transform 1s cubic-bezier(.22,1,.36,1)';
        sc.style.transform = 'translateY(0)';
      }
      const bar = c.querySelector('[data-scrollbar]') as HTMLElement | null;
      if (bar) bar.style.opacity = '0';
    },
    // Thẻ đầu ("Về Tôi") là giới thiệu người bán nên vẫn dẫn sang thư viện
    // giao diện. Bốn thẻ sau là agent — hàng đặt làm, không tải về được —
    // nên dẫn thẳng sang trang gửi yêu cầu, chọn sẵn đúng loại.
    heroCtaLabel: active === 0 ? t.heroCta1 : HERO_SERVICE_CTA[lang],
    heroCta: () => (active === 0 ? goTab('library') : im.goService(IDS[active])),
    langCode: ({ vi: 'VI', en: 'EN', zh: '中' } as Record<string, string>)[lang] || 'VI',
    activeTabLabel:
      tab === 'detail' && detail ? detail.name : t.nav[Math.max(0, TAB_KEYS.indexOf(tab))],
    openIsland: () => im.push({ island: true }),
    closeIsland: () => im.push({ island: false }),
    toggleIsland: () => im.push({ island: !state.island }),
    // Poster của video nền để trống ở đây: sync.ts gán cho đúng ảnh đang
    // hiện. Nếu khai sẵn thì trình duyệt tải cả 5 ảnh nền dù 4 ảnh vô hình.
    heroBgs: t.services.map((_sv: any, i: number) => ({ id: IDS[i], poster: undefined })),
    cards: t.services.map((sv: any, i: number) => ({
      id: IDS[i],
      poster: bgPoster(POSTERS[i]),
      kicker: sv.kicker,
      title: sv.title,
      no: String(i + 1).padStart(2, '0'),
      onSelect: () => {
        if (state.active === i) return;
        im.push({ active: i }, () => {
          im.bumpCopy();
          im.bindReveal();
        });
      },
    })),
    activeKicker: s.kicker,
    activeTitle: s.title,
    activeBlurb: s.blurb,
    indexLabel: String(active + 1).padStart(2, '0'),
    totalLabel: String(n).padStart(2, '0'),
    prev: () => im.push({ active: (active - 1 + n) % n }, () => im.bumpCopy()),
    next: () => im.push({ active: (active + 1) % n }, () => im.bumpCopy()),
    menuOpen: state.menuOpen,
    toggleMenu: () => im.setState({ menuOpen: !state.menuOpen }),
    navLinks: t.nav.slice(0, 6).map((label: string, i: number) => ({
      no: String(i + 1).padStart(2, '0'),
      label,
      onSelect: () => goTab(TAB_KEYS[i] as TabKey),
    })),
    footerLinks: [1, 2, 3, 4].map((i) => ({
      label: t.nav[i],
      onSelect: () => goTab(TAB_KEYS[i] as TabKey),
    })),
    // Paddle yêu cầu Điều khoản / Bảo mật / Hoàn tiền truy cập được từ
    // navigation, nên các link này nằm cố định ở footer.
    legalLinks: [
      { href: SERVICE_PATH, label: SERVICE[lang].navLabel },
      { href: CASE_PATH, label: CASE_STUDY[lang].navLabel },
      { href: PAGE_PATHS.about, label: PAGE_LABELS[lang].about },
      { href: PAGE_PATHS.contact, label: PAGE_LABELS[lang].contact },
      ...(['terms', 'privacy', 'refund', 'license'] as const).map((k) => ({
        href: LEGAL_PATHS[k],
        label: LEGAL_LABELS[lang][k],
      })),
    ],
    steps: t.steps.map((st2: any, i: number) => ({
      no: String(i + 1).padStart(2, '0'),
      title: st2.title,
      desc: st2.desc,
    })),
    stats: t.stats,
    includes: t.includes.map((inc: any, i: number) => ({
      no: String(i + 1).padStart(2, '0'),
      title: inc.title,
      desc: inc.desc,
    })),
    // Gói 0 = một giao diện (phải chọn mẫu trước), 1 = trọn bộ (mua ngay),
    // 2 = thiết kế riêng (liên hệ, không thanh toán tự động).
    tiers: t.tiers.map((tr: any, i: number) => ({
      ...TIER_STYLE[i],
      ...tr,
      onCta: () => {
        if (i === 0) goTab('library');
        else if (i === 1) im.startCheckout('BUNDLE');
        // Gói "Thiết kế riêng — Liên hệ" là dịch vụ, trước đây chỉ nhảy
        // xuống ô thu email chung chung.
        else im.goService('custom');
      },
    })),
    quotes: t.quotes,
    faqs: t.faqs.map((f: any, i: number) => ({
      q: f.q,
      a: f.a,
      onToggle: () => im.push({ openFaq: state.openFaq === i ? -1 : i }),
    })),
    buyDetail: () => {
      if (state.detail) im.startCheckout('TEMPLATE', state.detail);
    },
    submitLabel: state.submitted ? t.formSent : t.formSubmit,
    onSubmit: (e: any) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const email = (form.querySelector('input[type="email"]') as HTMLInputElement | null)?.value ?? '';
      im.onEmailSubmit(email, lang);
    },
  };
}
