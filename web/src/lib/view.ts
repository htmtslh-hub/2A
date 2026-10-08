/* Port của renderVals() trong Agentic.dc.html sang React.
   Giữ nguyên tên trường để markup sinh tự động dùng được không đổi. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, type MouseEvent, type RefObject } from 'react';
import AccountNavContent from '@/components/AccountNavContent';
import {
  REGISTER_STRINGS,
  FORGOT_STRINGS,
  NAV_ACCOUNT,
  FAQ_NO_CODE,
  HOME_SHOWCASE,
} from './i18n-extra';
import { LEGAL_LABELS, LEGAL_PATHS, PAGE_LABELS, PAGE_PATHS } from './legal';
import { COMPANY } from './company';
import { bgPoster } from './media';
import { REAL_TEMPLATES } from './real-templates';
import { GUIDE_LABELS, guideHref } from './guide-links';
import { HTML_LANG, langFromBrowser } from './lang';
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
  toggleSaved: (templateId: string) => void;
  addToCart: (templateId: string, origin?: { x: number; y: number }) => void;
  /** Đăng nhập bằng Google. */
  onGoogleSignIn: () => void;
  /** Bắt đầu thanh toán: mở PayOS, hoặc yêu cầu đăng nhập trước. */
  startCheckout: (kind: 'TEMPLATE' | 'BUNDLE', templateId?: string) => void;
}

/** Keep coming-soon hero cards 04–05 visible, but unavailable to select. */
export const LOCKED_CARDS: number[] = [3, 4];

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

const PRODUCT_GROUP_COPY: Record<LangCode, {
  labels: [string, string, string];
  groupAria: string;
  browse: [string, string, string];
  titles: [string, string];
  intros: [string, string];
  pending: string;
  empty: string;
  slots: [[string, string], [string, string]];
}> = {
  vi: {
    labels: ['Giao diện web', 'Skill / Prompt', 'Agent / Tool'],
    groupAria: 'Nhóm sản phẩm',
    browse: ['Xem toàn bộ giao diện →', 'Xem Skill / Prompt →', 'Xem Agent / Tool →'],
    titles: ['Skill và Prompt', 'Agent và Tool'],
    intros: ['Bộ sưu tập Skill/Prompt đang được chuẩn bị. Hai ô bên dưới dành cho các sản phẩm sẽ thêm sau.', 'Bộ sưu tập Agent/Tool đang được chuẩn bị. Hai ô bên dưới dành cho các sản phẩm sẽ thêm sau.'],
    pending: 'ĐANG CHUẨN BỊ',
    empty: 'Vị trí dành cho sản phẩm mới',
    slots: [['Skill', 'Prompt'], ['Agent', 'Tool']],
  },
  en: {
    labels: ['Web interfaces', 'Skill / Prompt', 'Agent / Tool'],
    groupAria: 'Product groups',
    browse: ['Explore web interfaces →', 'Explore Skill / Prompt →', 'Explore Agent / Tool →'],
    titles: ['Skills and Prompts', 'Agents and Tools'],
    intros: ['The Skill/Prompt collection is being prepared. These two spaces are reserved for future products.', 'The Agent/Tool collection is being prepared. These two spaces are reserved for future products.'],
    pending: 'COMING SOON',
    empty: 'Space for a future product',
    slots: [['Skill', 'Prompt'], ['Agent', 'Tool']],
  },
  zh: {
    labels: ['网页界面', '技能 / 提示词', '智能体 / 工具'],
    groupAria: '产品分类',
    browse: ['浏览全部网页界面 →', '浏览技能 / 提示词 →', '浏览智能体 / 工具 →'],
    titles: ['技能与提示词', '智能体与工具'],
    intros: ['技能与提示词系列正在准备中。下方两个位置留给未来的产品。', '智能体与工具系列正在准备中。下方两个位置留给未来的产品。'],
    pending: '即将推出',
    empty: '预留给未来产品的位置',
    slots: [['技能', '提示词'], ['智能体', '工具']],
  },
};

export function buildView(
  state: State,
  refs: Refs,
  im: Imperative,
  ctx: { signedIn: boolean; authLoading: boolean; googleEnabled: boolean; savedIds: readonly string[]; saveCounts: Readonly<Record<string, number>>; cartIds: readonly string[]; accountName?: string; accountImage?: string | null } = { signedIn: false, authLoading: false, googleEnabled: false, savedIds: [], saveCounts: {}, cartIds: [] }
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
    // Đã đăng nhập thì nút ở thanh nav dẫn sang trang tài khoản.
    ...(ctx.signedIn ? { navCta: createElement(AccountNavContent, { name: ctx.accountName || NAV_ACCOUNT[lang], image: ctx.accountImage }) } : null),
  };
  // Danh mục hiệu lực: ô nào đã có mẫu thật thì lấy tên, mô tả, thẻ và phân
  // loại từ REAL_TEMPLATES; ô còn lại giữ nội dung lấp chỗ của bản thiết kế.
  //
  // Giá của mẫu thật lấy từ catalog, theo đúng loại tiền khách sẽ trả — cùng
  // nguồn với số tiền gửi sang cổng thanh toán. Bản thiết kế ghi giá lấp chỗ
  // cho từng ô ($69–$99), nên Dune Pass từng hiện $89 trong khi thanh toán thu
  // $79, và khách xem tiếng Việt thấy giá đô dù trả bằng VNĐ.
  const currency = currencyForProvider(providerForLang(lang as Lang));
  const tplMeta = TPL_META.flatMap((m: any) => {
    const real = REAL_TEMPLATES[m.id];
    return real
      ? [{
          ...m,
          cat: real.cat,
          previewOnly: Boolean(real.previewOnly),
          badge: real.badge ?? (real.video ? '' : m.badge),
          price: real.previewOnly ? { vi: 'Bản xem trước', en: 'Preview', zh: '预览' }[lang] : formatMoney(priceOf('TEMPLATE', currency, m.id), currency, lang as Lang),
          ...(real.copy[lang] ?? real.copy.vi),
        }]
      : [];
  });
  const saveCopy = {
    vi: { save: 'Lưu sản phẩm vào tài khoản', remove: 'Bỏ lưu sản phẩm', count: 'lượt lưu' },
    en: { save: 'Save product to account', remove: 'Remove saved product', count: 'saves' },
    zh: { save: '保存产品到账户', remove: '取消保存产品', count: '次收藏' },
  }[lang];
  const cartCopy = {
    vi: { add: 'Thêm vào giỏ hàng', added: 'Đã trong giỏ' },
    en: { add: 'Add to cart', added: 'In cart' },
    zh: { add: '加入购物车', added: '已在购物车' },
  }[lang];
  const withSave = (m: any) => {
    const saved = ctx.savedIds.includes(m.id);
    const inCart = ctx.cartIds.includes(m.id);
    const saveCount = ctx.saveCounts[m.id];
    return {
      ...m,
      saved,
      saveLabel: `${saved ? saveCopy.remove : saveCopy.save}${Number.isSafeInteger(saveCount) ? ` · ${saveCount} ${saveCopy.count}` : ''}`,
      saveCount: Number.isSafeInteger(saveCount) ? saveCount : '…',
      saveDisabled: ctx.authLoading,
      cartLabel: inCart ? cartCopy.added : cartCopy.add,
      inCart,
      onCart: (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        im.addToCart(m.id, {
          x: event.detail ? event.clientX : rect.left + rect.width / 2,
          y: event.detail ? event.clientY : rect.top + rect.height / 2,
        });
      },
      onSave: (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        im.toggleSaved(m.id);
      },
    };
  };

  const n = t.services.length;
  const active = Math.min(state.active, n - 1);
  const s = t.services[active];
  const { filter, tab } = state;
  const groupCopy = PRODUCT_GROUP_COPY[lang];
  const productGroup = Math.min(active, 2);
  const showWebProducts = productGroup === 0;
  const placeholderCards = showWebProducts ? [] : groupCopy.slots[productGroup - 1].map((type, i) => ({
    no: String(i + 1).padStart(2, '0'),
    type,
    title: groupCopy.pending,
    note: groupCopy.empty,
    aria: `${type} ${i + 1}: ${groupCopy.empty}`,
  }));

  // Dải trưng bày ở trang chủ hiện toàn bộ mẫu THẬT — có ảnh, có demo, mua được.
  // `tplMeta` đã loại các ô lấp chỗ chưa có file giao, nên không cần giới hạn
  // số lượng hay lọc thêm ở đây.
  const homeTpl = tplMeta;

  /** Thẻ hero kế tiếp theo hướng `dir`, bỏ qua thẻ khoá. Không còn thẻ mở nào
   *  khác thì đứng yên ở thẻ hiện tại. */
  const stepCard = (dir: 1 | -1) => {
    for (let k = 1; k < n; k++) {
      const i = (((active + dir * k) % n) + n) % n;
      if (!LOCKED_CARDS.includes(i)) return i;
    }
    return active;
  };

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

  const autoLangOption = {
    label: { vi: 'Tự động', en: 'Auto', zh: '自动' }[lang],
    onSelect: () => {
      try {
        localStorage.removeItem('agentic-lang');
        document.cookie = 'agentic-lang=; path=/; max-age=0; samesite=lax';
      } catch {}
      const detected = langFromBrowser(navigator.languages, navigator.language);
      document.documentElement.lang = HTML_LANG[detected];
      im.push({ lang: detected, menuOpen: false }, () => {
        im.bumpCopy();
        im.bindReveal();
      });
    },
  };

  const categoryKeys = Array.from(new Set(tplMeta.map((m: any) => m.cat))) as string[];
  const filters = [{ key: 'all', label: t.catAll }]
    .concat(categoryKeys.map((k: string) => ({ key: k, label: t.cats[k] })))
    .map((f) => ({
      key: f.key,
      label: f.label,
      onSelect: () => im.push({ filter: f.key }, () => im.bindReveal()),
    }));

  const templates = tplMeta
    .map((m: any) => ({ ...m, catLabel: t.cats[m.cat], badge: m.badge || '' }))
    .filter((m: any) => filter === 'all' || m.cat === filter)
    .map((m: any) => withSave({ ...m, href: `?mau=${m.id}`, onDetail: (event: MouseEvent<HTMLAnchorElement>) => followTemplateLink(event, m.id) }));

  const marqueeSet = t.marquee.map((label: string) => ({ label, color: '#eceef1' }));

  const allTpl = tplMeta.map((m: any, i: number) => ({
    ...m,
    catLabel: t.cats[m.cat],
    badge: m.badge || '',
    idx: i,
  }));

  const dIdx = allTpl.findIndex((m: any) => m.id === state.detail);
  const d = dIdx >= 0 ? allTpl[dIdx] : null;
  const demoPath = d ? `/demos/${REAL_TEMPLATES[d.id].slug}/index.html` : '';
  const demoVersion = d ? REAL_TEMPLATES[d.id]?.version : undefined;
  const demoUrl = demoPath + (demoVersion ? '?v=' + encodeURIComponent(demoVersion) : '');
  const detail = d
    ? {
        ...d,
        demoUrl,
        demoAddress: `${COMPANY.siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}${demoPath.replace(/\/index\.html$/, '')}`,
        demoTitle: `${d.name} — ${t.dLive}`,
        openDemo: () => {
          const popup = window.open(demoUrl, '_blank', 'noopener,noreferrer');
          if (popup) popup.opener = null;
        },
        slotId: 'agentic-tpl-' + d.id,
        views: (t.dViewNames || []).map((name: string, i: number) => ({
          name,
          slotId: REAL_TEMPLATES[d.id]?.video ? `agentic-view-${d.id}-${i}` : 'agentic-tpl-' + d.id,
          w: ['100%', '62%', '30%'][i],
          ratio: ['16/10', '3/4', '9/16'][i],
        })),
        specs: (REAL_TEMPLATES[d.id].specs?.[lang] ?? t.dSpecRows ?? []).map((r: string[]) => ({ k: r[0], v: r[1] })),
        related: allTpl
          .filter((m: any) => m.cat === d.cat && m.id !== d.id)
          .concat(allTpl.filter((m: any) => m.cat !== d.cat && m.id !== d.id))
          .slice(0, 3)
          .map((m: any) => withSave({ ...m, href: `?mau=${m.id}`, onSelect: (event: MouseEvent<HTMLAnchorElement>) => followTemplateLink(event, m.id) })),
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

  function followTemplateLink(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openDetail(id);
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

  return {
    t,
    guideLang: lang,
    guideLabel: GUIDE_LABELS[lang].guide,
    guideHref: guideHref(),
    guideSlug: state.detail && !REAL_TEMPLATES[state.detail]?.previewOnly ? REAL_TEMPLATES[state.detail]?.slug : undefined,
    // Địa chỉ thật lấy từ company.ts; bản thiết kế ghi cứng một email không
    // tồn tại nên convert.mjs thay mọi chỗ bằng biến này.
    contactEmail: COMPANY.email,
    pageH1: tab === 'detail' && detail ? `${detail.name} — ${COMPANY.brand}` : PAGE_H1[lang],
    langOptions,
    autoLangOption,
    filters,
    templates,
    productGroupAria: groupCopy.groupAria,
    productGroups: groupCopy.labels.map((label, i) => ({
      key: ['web', 'skill-prompt', 'agent-tool'][i],
      label,
      selected: productGroup === i,
      onSelect: () => im.push({ active: i, filter: 'all' }, () => {
        im.bumpCopy();
        im.bindReveal();
      }),
    })),
    showWebProducts,
    showProductPlaceholders: !showWebProducts,
    placeholderCards,
    libraryKicker: showWebProducts ? t.tplLabel : groupCopy.labels[productGroup],
    libraryTitle: showWebProducts ? t.tplTitle : groupCopy.titles[productGroup - 1],
    libraryIntro: showWebProducts ? t.tplIntro : groupCopy.intros[productGroup - 1],
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
    homeThemeTitle: showWebProducts ? HOME_SHOWCASE[lang].title : groupCopy.titles[productGroup - 1],
    homeThemeKicker: showWebProducts ? HOME_SHOWCASE[lang].kicker : groupCopy.labels[productGroup],
    homeBrowseLabel: groupCopy.browse[productGroup],
    homeTemplates: homeTpl.map((m: any) => withSave({
      ...m,
      catLabel: t.cats[m.cat],
      badge: m.badge || '',
      href: `?mau=${m.id}`,
      onDetail: (event: MouseEvent<HTMLAnchorElement>) => followTemplateLink(event, m.id),
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
      if (ctx.authLoading) return;
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
        !slot.hasAttribute('data-video-preview') &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        sc.style.transition = 'transform 3.6s cubic-bezier(.33,0,.25,1)';
        sc.style.transform = 'translateY(-45%)';
      }
      const bar = c.querySelector('[data-scrollbar]') as HTMLElement | null;
      if (bar && slot?.hasAttribute('data-filled') && !slot.hasAttribute('data-video-preview')) bar.style.opacity = '1';
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
    // The first three hero cards represent distinct product groups.
    heroCtaLabel: groupCopy.browse[productGroup],
    heroCta: () => goTab('library', { filter: 'all' }),
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
    // Mũi tên bỏ qua thẻ khoá. Trước đây chúng đi qua cả thẻ khoá, đưa khách
    // vào đúng nội dung mà việc khoá thẻ muốn giấu.
    prev: () => {
      const i = stepCard(-1);
      if (i !== active) im.push({ active: i }, () => im.bumpCopy());
    },
    next: () => {
      const i = stepCard(1);
      if (i !== active) im.push({ active: i }, () => im.bumpCopy());
    },
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
      { href: guideHref(), label: GUIDE_LABELS[lang].guide },
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
    faqs: t.faqs.map((f: any, i: number) => ({
      q: f.q,
      a: f.a,
      onToggle: () => im.push({ openFaq: state.openFaq === i ? -1 : i }),
    })),
    buyDetail: () => {
      if (!state.detail) return;
      if (!REAL_TEMPLATES[state.detail] || REAL_TEMPLATES[state.detail].previewOnly) return;
      im.startCheckout('TEMPLATE', state.detail);
    },
    addDetailToCart: (event: MouseEvent<HTMLButtonElement>) => {
      if (!state.detail) return;
      const rect = event.currentTarget.getBoundingClientRect();
      im.addToCart(state.detail, {
        x: event.detail ? event.clientX : rect.left + rect.width / 2,
        y: event.detail ? event.clientY : rect.top + rect.height / 2,
      });
    },
    detailCartLabel: state.detail && ctx.cartIds.includes(state.detail) ? cartCopy.added : cartCopy.add,
    submitLabel: state.submitted ? t.formSent : t.formSubmit,
    onSubmit: (e: any) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const email = (form.querySelector('input[type="email"]') as HTMLInputElement | null)?.value ?? '';
      im.onEmailSubmit(email, lang);
    },
  };
}
