/* Port của renderVals() trong Agentic.dc.html sang React.
   Giữ nguyên tên trường để markup sinh tự động dùng được không đổi. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RefObject } from 'react';
import {
  REGISTER_STRINGS,
  FORGOT_STRINGS,
  NAV_ACCOUNT,
  FAQ_NO_CODE,
  HOME_SHOWCASE,
  COMING_SOON,
} from './i18n-extra';
import { LEGAL_LABELS, LEGAL_PATHS, PAGE_LABELS, PAGE_PATHS } from './legal';
import { COMPANY } from './company';
import { bgPoster } from './media';
import { SERVICE, SERVICE_SITE_URL } from './service-content';
import { REAL_TEMPLATES } from './real-templates';
import {
  currencyForProvider,
  formatMoney,
  priceOf,
  providerForLang,
  type Lang,
} from './catalog';
import {
  I18N,
  IDS,
  POSTERS,
  TAB_KEYS,
  CAT_KEYS,
  TPL_META,
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
  /** Đăng nhập bằng Google. */
  onGoogleSignIn: () => void;
  /** Bắt đầu thanh toán: mở PayOS, hoặc yêu cầu đăng nhập trước. */
  startCheckout: (kind: 'TEMPLATE' | 'BUNDLE', templateId?: string) => void;
}

/* Thẻ nào trong dải hero chưa sẵn sàng thì khoá lại: hiện ổ khoá, bấm không
   vào được. Thêm số thứ tự (đếm từ 0) vào mảng này là khoá, không phải sửa chỗ
   nào khác. Năm thẻ hiện là năm nhóm mẫu đều đã có trong thư viện nên không
   khoá thẻ nào. */
export const LOCKED_CARDS: number[] = [];

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
  vi: 'Forge Zone — giao diện web cao cấp dựng sẵn, kèm giấy phép thương mại',
  en: 'Forge Zone — premium ready-made website templates with a commercial licence',
  zh: 'Forge Zone — 高端预制网站模板，含商用授权',
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
    // Câu FAQ đầu tiên hứa quá tay trong bản thiết kế — xem ghi chú ở
    // FAQ_NO_CODE. Thay tại chỗ để không phải sửa file sinh tự động.
    faqs: [FAQ_NO_CODE[lang], ...base.faqs.slice(1)],
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
  // Danh mục hiệu lực: ô nào đã có mẫu thật thì lấy tên, mô tả, thẻ và phân
  // loại từ REAL_TEMPLATES; ô còn lại giữ nội dung lấp chỗ của bản thiết kế.
  //
  // Giá của mẫu thật lấy từ catalog, theo đúng loại tiền khách sẽ trả — cùng
  // nguồn với số tiền gửi sang cổng thanh toán. Bản thiết kế ghi giá lấp chỗ
  // cho từng ô ($69–$99), nên Dune Pass từng hiện $89 trong khi thanh toán thu
  // $79, và khách xem tiếng Việt thấy giá đô dù trả bằng VNĐ.
  const currency = currencyForProvider(providerForLang(lang as Lang));
  const tplMeta = TPL_META.map((m: any, i: number) => {
    const real = REAL_TEMPLATES[m.id];
    return real
      ? {
          ...m,
          cat: real.cat,
          price: formatMoney(priceOf('TEMPLATE', currency, m.id), currency, lang as Lang),
          ...(real.copy[lang] ?? real.copy.vi),
        }
      : // Ô lấp chỗ chưa có file để giao: không hiện giá hay nhãn "Mới/Hot"
        // như thể đang bán, mà ghi rõ sắp ra mắt.
        { ...m, ...t.templates[i], price: COMING_SOON[lang].label, badge: '' };
  });

  const n = t.services.length;
  const active = Math.min(state.active, n - 1);
  const s = t.services[active];
  const { filter, tab } = state;

  // Mỗi thẻ hero là một nhóm mẫu (cùng thứ tự CAT_KEYS).
  const heroCat = CAT_KEYS[active] ?? CAT_KEYS[0];

  // Dải trưng bày ở trang chủ chỉ hiện mẫu THẬT — có ảnh, có demo, mua được.
  // Trước đây nó lấy theo nhóm của thẻ hero, nên đa số lần hiện ba ô lấp chỗ
  // với khung ảnh trống: trang trưng bày mà không có gì để xem. Mẫu cùng nhóm
  // với thẻ đang chọn xếp lên đầu; chưa đủ ba mẫu thật thì bù bằng ô còn lại.
  const isReal = (m: any) => Boolean(REAL_TEMPLATES[m.id]);
  const homeTpl = [
    ...tplMeta.filter((m: any) => isReal(m) && m.cat === heroCat),
    ...tplMeta.filter((m: any) => isReal(m) && m.cat !== heroCat),
    ...tplMeta.filter((m: any) => !isReal(m)),
  ].slice(0, 3);

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

  const templates = tplMeta
    .map((m: any) => ({ ...m, catLabel: t.cats[m.cat], badge: m.badge || '' }))
    .filter((m: any) => filter === 'all' || m.cat === filter)
    .map((m: any) => ({ ...m, onDetail: () => openDetail(m.id) }));

  const marqueeSet = t.marquee.map((label: string) => ({ label, color: '#eceef1' }));

  const allTpl = tplMeta.map((m: any, i: number) => ({
    ...m,
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

  /** `extra` đổi thêm state cùng lúc chuyển tab, vd. lọc sẵn nhóm mẫu. */
  function goTab(key: TabKey, extra: Partial<State> = {}) {
    if (state.tab === key && !state.menuOpen && Object.keys(extra).length === 0) return;
    im.syncUrl(key, null);
    im.push({ tab: key, menuOpen: false, island: false, detail: null, ...extra }, () => {
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

  // Trang chi tiết của ô lấp chỗ: nút mua ghi "Sắp ra mắt" và bỏ dòng "trả một
  // lần, dùng vĩnh viễn" cạnh giá, vì chưa có gì để trả tiền.
  const detailSoon = Boolean(d && !REAL_TEMPLATES[d.id]);

  return {
    t: detailSoon ? { ...t, pricingUnitOnce: '', dBuy: COMING_SOON[lang].label } : t,
    // Địa chỉ thật lấy từ company.ts; bản thiết kế ghi cứng một email không
    // tồn tại nên convert.mjs thay mọi chỗ bằng biến này.
    contactEmail: COMPANY.email,
    // Thanh địa chỉ giả trong ảnh mô phỏng trình duyệt ở trang chi tiết.
    siteHost: COMPANY.siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''),
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
    // Tiêu đề dải trưng bày. Bản thiết kế lặp lại đúng chữ của thẻ hero ngay
    // phía trên; giờ dải này luôn là mẫu đang bán nên nói thẳng điều đó.
    homeThemeTitle: HOME_SHOWCASE[lang].title,
    homeThemeKicker: HOME_SHOWCASE[lang].kicker,
    homeTemplates: homeTpl.map((m: any) => ({
      ...m,
      catLabel: t.cats[m.cat],
      badge: m.badge || '',
      onDetail: () => openDetail(m.id),
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
    // Nút chính mở thư viện đã lọc sẵn đúng nhóm mẫu của thẻ đang chọn.
    heroCtaLabel: t.heroCta1,
    heroCta: () => goTab('library', { filter: heroCat }),
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
      locked: LOCKED_CARDS.includes(i),
      onSelect: () => {
        // Khoá ở hai lớp: lớp phủ chặn chuột, và chặn luôn ở đây phòng khi
        // CSS không tải được. Bỏ một lớp là thẻ chưa làm xong lộ ra.
        if (LOCKED_CARDS.includes(i)) return;
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
      // Dịch vụ làm web / AI agent nằm ở web riêng: Paddle không nhận bán dịch
      // vụ trên tên miền bán template (bị từ chối duyệt ngày 13/09/2026).
      { href: SERVICE_SITE_URL, label: SERVICE[lang].navLabel },
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
    // Gói 0 = một giao diện (phải chọn mẫu trước), 1 = trọn bộ (mua ngay).
    // Gói "Thiết kế riêng" đã chuyển sang web dịch vụ riêng.
    tiers: t.tiers.map((tr: any, i: number) => ({
      ...TIER_STYLE[i],
      ...tr,
      onCta: () => (i === 0 ? goTab('library') : im.startCheckout('BUNDLE')),
    })),
    quotes: t.quotes,
    faqs: t.faqs.map((f: any, i: number) => ({
      q: f.q,
      a: f.a,
      onToggle: () => im.push({ openFaq: state.openFaq === i ? -1 : i }),
    })),
    buyDetail: () => {
      if (!state.detail) return;
      // Ô lấp chỗ chưa có file để giao — không cho sang bước thanh toán.
      // Máy chủ cũng chặn (templateExists), đây chỉ để báo khách cho rõ.
      if (!REAL_TEMPLATES[state.detail]) {
        im.setState({ toast: COMING_SOON[lang].toast });
        return;
      }
      im.startCheckout('TEMPLATE', state.detail);
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
