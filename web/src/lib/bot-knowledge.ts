import { I18N, type LangCode } from '@/generated/data';
import { PRICE_USD as PRICE_CENTS } from './catalog';
import { MEMBERSHIP_PRICES } from './membership-policy';

const PRICE_USD = {
  single: PRICE_CENTS.single / 100,
  pro: MEMBERSHIP_PRICES.PRO / 100,
  ultra: MEMBERSHIP_PRICES.ULTRA / 100,
};
import { FAQ_NO_CODE, ORDERS_STRINGS } from './i18n-extra';
import { MEMBERSHIP_COPY } from './membership-copy';
import { COMPANY } from './company';
import { REAL_TEMPLATES } from './real-templates';
import { WEB_CATEGORY_LABELS, type WebCategory } from './template-categories';
import { isFreeProduct, requiresPremium, canBuyIndividually } from './product-policy';

export interface BotAction {
  label: string;
  kind: 'tab' | 'template' | 'url';
  target: string;
  badge?: string;
}

export interface BotReply {
  text: string;
  bullets?: string[];
  actions?: BotAction[];
}

export interface BotTopicChip {
  id: string;
  label: string;
  question: string;
}

export interface BotUiCopy {
  botName: string;
  status: string;
  subtitle: string;
  welcome: string;
  welcomeBullets: string[];
  quickTitle: string;
  inputPlaceholder: string;
  sendLabel: string;
  resetLabel: string;
  closeLabel: string;
  buttonAriaLabel: string;
  buttonTooltip: string;
}

export const BOT_UI_COPY: Record<LangCode, BotUiCopy> = {
  vi: {
    botName: 'Trợ lý Forge Bot',
    status: 'Trực tuyến • Trả lời tự động từ dữ liệu web',
    subtitle: 'Hỏi bất kỳ thông tin nào về giao diện, bảng giá, cách chỉnh sửa, cài đặt hoặc chính sách trên Forge Zone.',
    welcome:
      'Xin chào! Mình là Forge Bot — trợ lý tự động của Forge Zone. Bạn có thể chọn nhanh chủ đề bên dưới hoặc nhập câu hỏi bất kỳ (ví dụ: tìm mẫu portfolio, mẫu miễn phí, giá gói Premium, cách sửa chữ/ảnh, hoàn tiền...).',
    welcomeBullets: [
      `Kho hiện có ${Object.keys(REAL_TEMPLATES).length}+ sản phẩm thật kèm bản xem thử trực tiếp`,
      `Gói thành viên: Miễn phí ($0) • Premium ($${PRICE_USD.pro}/tháng) • Ultra ($${PRICE_USD.ultra}/năm) • Mua lẻ ($${PRICE_USD.single})`,
      'Thanh toán một lần qua Paddle, không tự động gia hạn, kèm hướng dẫn CUSTOMISE.md & giấy phép thương mại',
    ],
    quickTitle: 'Câu hỏi thường gặp',
    inputPlaceholder: 'Nhập câu hỏi của bạn (VD: Giá gói Premium, tìm mẫu AI, cách sửa chữ...)',
    sendLabel: 'Gửi',
    resetLabel: 'Làm mới',
    closeLabel: 'Đóng hộp thoại',
    buttonAriaLabel: 'Mở trợ lý hỏi đáp Forge Bot',
    buttonTooltip: 'Hỏi Forge Bot',
  },
  en: {
    botName: 'Forge Bot Assistant',
    status: 'Online • Instant answers from site data',
    subtitle: 'Ask anything about templates, pricing plans, customisation, setup, or policies on Forge Zone.',
    welcome:
      'Hi there! I am Forge Bot — your automated Forge Zone assistant. Pick a quick topic below or type any question (e.g. free templates, portfolio designs, Premium pricing, how to edit text/images, refund policy...).',
    welcomeBullets: [
      `${Object.keys(REAL_TEMPLATES).length}+ live products with interactive demos`,
      `Plans: Free ($0) • Premium ($${PRICE_USD.pro}/month) • Ultra ($${PRICE_USD.ultra}/year) • Single ($${PRICE_USD.single})`,
      'One-time payment via Paddle, no auto-renewal, ships with CUSTOMISE.md & commercial licence',
    ],
    quickTitle: 'Popular questions',
    inputPlaceholder: 'Ask a question (e.g. Premium price, free templates, how to customize...)',
    sendLabel: 'Send',
    resetLabel: 'Reset',
    closeLabel: 'Close assistant',
    buttonAriaLabel: 'Open Forge Bot Q&A assistant',
    buttonTooltip: 'Ask Forge Bot',
  },
  zh: {
    botName: 'Forge Bot 智能助手',
    status: '在线 • 基于网站实时数据自动解答',
    subtitle: '欢迎询问有关模板库、会员价格、修改教程、部署步骤或退款与授权政策的任何问题。',
    welcome:
      '你好！我是 Forge Zone 的自动问答助手 Forge Bot。你可以点击下方快捷问题，或直接输入想了解的内容（例如：免费模板、作品集模板、Premium 价格、如何修改文字图片、退款政策等）。',
    welcomeBullets: [
      `现已上架 ${Object.keys(REAL_TEMPLATES).length}+ 款真实产品，均支持在线预览`,
      `方案：免费 ($0) • Premium ($${PRICE_USD.pro}/月) • Ultra ($${PRICE_USD.ultra}/年) • 单买 ($${PRICE_USD.single})`,
      '通过 Paddle 一次性付款，绝不自动续费，附带 CUSTOMISE.md 修改清单与商用授权',
    ],
    quickTitle: '常见问题快捷入口',
    inputPlaceholder: '输入你的问题（例如：会员价格、免费模板、如何修改代码…）',
    sendLabel: '发送',
    resetLabel: '重置',
    closeLabel: '关闭助手',
    buttonAriaLabel: '打开 Forge Bot 问答助手',
    buttonTooltip: '询问 Forge Bot',
  },
};

export const BOT_TOPIC_CHIPS: Record<LangCode, BotTopicChip[]> = {
  vi: [
    { id: 'pricing', label: '💰 Bảng giá & Gói thành viên', question: 'Bảng giá và các gói thành viên trên web như thế nào?' },
    { id: 'free', label: '🎁 Mẫu miễn phí ($0)', question: 'Web hiện có những sản phẩm và giao diện miễn phí nào?' },
    { id: 'library', label: '🎨 Kho giao diện & Danh mục', question: 'Kho giao diện hiện có bao nhiêu mẫu và gồm những ngành nào?' },
    { id: 'customise', label: '🛠️ Cách sửa chữ, ảnh & cài đặt', question: 'Tôi không rành code thì chỉnh sửa và đưa web lên mạng bằng cách nào?' },
    { id: 'process', label: '⚡ Quy trình mua & tải file', question: 'Quy trình mua và tải file .zip hoạt động như thế nào?' },
    { id: 'licence', label: '📜 Bản quyền & Hoàn tiền 14 ngày', question: 'Chính sách bản quyền thương mại và hoàn tiền 14 ngày ra sao?' },
    { id: 'account', label: '👤 Tài khoản, Giỏ hàng & Hỗ trợ', question: 'Cách quản lý tài khoản, tải lại đơn hàng và liên hệ hỗ trợ?' },
  ],
  en: [
    { id: 'pricing', label: '💰 Pricing & Memberships', question: 'How do pricing and membership plans work?' },
    { id: 'free', label: '🎁 Free Products ($0)', question: 'Which free templates and products are available right now?' },
    { id: 'library', label: '🎨 Template Library & Categories', question: 'How many templates are in the library and what categories exist?' },
    { id: 'customise', label: '🛠️ How to Edit & Publish', question: 'Do I need coding skills to customize and publish a template?' },
    { id: 'process', label: '⚡ Buying & Download Process', question: 'How does the buying and .zip download process work?' },
    { id: 'licence', label: '📜 Commercial Licence & Refunds', question: 'What are the commercial licence and 14-day refund rules?' },
    { id: 'account', label: '👤 Account, Cart & Support', question: 'How do accounts, re-downloading orders, and customer support work?' },
  ],
  zh: [
    { id: 'pricing', label: '💰 价格与会员方案', question: '网站的价格和会员方案是怎么计算的？' },
    { id: 'free', label: '🎁 免费模板与产品 ($0)', question: '目前有哪些可以免费下载的模板和产品？' },
    { id: 'library', label: '🎨 模板库与分类', question: '模板库目前有多少款产品？包含哪些行业分类？' },
    { id: 'customise', label: '🛠️ 修改内容与上线教程', question: '不会写代码可以修改文字图片并部署上线吗？' },
    { id: 'process', label: '⚡ 购买与下载流程', question: '购买和下载 .zip 压缩包的流程是什么？' },
    { id: 'licence', label: '📜 商用授权与14天退款', question: '商用授权许可和 14 天退款政策是什么？' },
    { id: 'account', label: '👤 账户、购物车与客服支持', question: '如何管理账户订单、重新下载或联系客服？' },
  ],
};

function stripDiacritics(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

function getCatalogStats() {
  const entries = Object.entries(REAL_TEMPLATES);
  const total = entries.length;
  const freeEntries = entries.filter(([id]) => isFreeProduct(id));
  const premiumEntries = entries.filter(([id]) => requiresPremium(id));
  const individualEntries = entries.filter(([id]) => canBuyIndividually(id));

  const byCategory: Record<WebCategory, number> = {
    commerce: 0,
    portfolio: 0,
    education: 0,
    entertainment: 0,
    communication: 0,
  };

  for (const [, tpl] of entries) {
    if (!tpl.group || tpl.group === 'web') {
      byCategory[tpl.cat] = (byCategory[tpl.cat] || 0) + 1;
    }
  }

  return { total, freeEntries, premiumEntries, individualEntries, byCategory };
}

function buildPricingReply(lang: LangCode): BotReply {
  const m = MEMBERSHIP_COPY[lang];
  if (lang === 'vi') {
    return {
      text: `Forge Zone áp dụng mô hình trả một lần cho kỳ đã chọn, KHÔNG tự động gia hạn (${m.pricingIntro}):`,
      bullets: [
        `Miễn phí ($0): Tải ngay các sản phẩm gắn nhãn Miễn phí (bao gồm mẫu web Free Sample và LingoGlass Player).`,
        `Gói Premium ($${PRICE_USD.pro} / 1 tháng): Mở khóa và tải không giới hạn toàn bộ Giao diện web và Kỹ năng / Prompt trong 30 ngày.`,
        `Gói Ultra ($${PRICE_USD.ultra} / 1 năm): Mở khóa toàn bộ Giao diện web + Kỹ năng / Prompt suốt 365 ngày, tiết kiệm $${PRICE_USD.pro * 12 - PRICE_USD.ultra} so với mua từng tháng và nhận toàn bộ mẫu mới ra mắt trong năm.`,
        `Mua lẻ ($${PRICE_USD.single} / sản phẩm): Áp dụng cho các sản phẩm thuộc nhóm Agent hoặc mua từng sản phẩm riêng lẻ qua giỏ hàng.`,
        `Sau khi hết hạn gói, các file .zip bạn đã tải về máy vẫn được phép sử dụng thương mại vĩnh viễn.`,
      ],
      actions: [
        { label: 'Xem Bảng giá chi tiết →', kind: 'tab', target: 'pricing' },
        { label: 'Khám phá Thư viện →', kind: 'tab', target: 'library' },
      ],
    };
  }
  if (lang === 'zh') {
    return {
      text: `Forge Zone 采用一次性付款模式，绝不自动续费（${m.pricingIntro}）：`,
      bullets: [
        `免费方案 ($0)：直接下载标有“免费”的产品（如 Free Sample 网页模板与 LingoGlass 播放器）。`,
        `Premium 方案 ($${PRICE_USD.pro} / 1个月)：30 天内无限量解锁并下载所有网站模板与技能 / 提示词。`,
        `Ultra 方案 ($${PRICE_USD.ultra} / 1年)：365 天内解锁全部网站模板与技能 / 提示词，比按月购买立省 $${PRICE_USD.pro * 12 - PRICE_USD.ultra}，包含全年新增模板。`,
        `单品购买 ($${PRICE_USD.single} / 款)：适用于智能体 (Agent) 产品或通过购物车单独结算。`,
        `会员到期后，已下载到本地的 .zip 文件仍可永久用于商业项目。`,
      ],
      actions: [
        { label: '查看价格表 →', kind: 'tab', target: 'pricing' },
        { label: '浏览模板库 →', kind: 'tab', target: 'library' },
      ],
    };
  }
  return {
    text: `Forge Zone uses transparent one-time payments for your chosen period with NO auto-renewal (${m.pricingIntro}):`,
    bullets: [
      `Free ($0): Instant access to all products marked Free (including the Free Sample web template and LingoGlass Player).`,
      `Premium Plan ($${PRICE_USD.pro} / 1 month): Unlimited downloads across all Web Templates and Skills / Prompts for 30 days.`,
      `Ultra Plan ($${PRICE_USD.ultra} / 1 year): Full access to all Web Templates + Skills / Prompts for 365 days — save $${PRICE_USD.pro * 12 - PRICE_USD.ultra} vs. monthly and get every new release all year.`,
      `Individual Purchase ($${PRICE_USD.single} / item): Available for Agent products or individual cart checkout.`,
      `Files you download remain yours forever under the commercial licence, even after your membership window ends.`,
    ],
    actions: [
      { label: 'Open Pricing →', kind: 'tab', target: 'pricing' },
      { label: 'Browse Library →', kind: 'tab', target: 'library' },
    ],
  };
}

function buildFreeReply(lang: LangCode): BotReply {
  const { freeEntries } = getCatalogStats();
  const actions: BotAction[] = freeEntries.slice(0, 5).map(([id, tpl]) => ({
    label: `${tpl.copy[lang]?.name || tpl.slug}`,
    kind: 'template',
    target: id,
    badge: lang === 'vi' ? 'Miễn phí' : lang === 'zh' ? '免费' : 'Free',
  }));
  actions.push({
    label: lang === 'vi' ? 'Xem toàn bộ Thư viện →' : lang === 'zh' ? '浏览全部模板库 →' : 'Browse full Library →',
    kind: 'tab',
    target: 'library',
  });

  if (lang === 'vi') {
    return {
      text: `Hiện tại trên Forge Zone có ${freeEntries.length} sản phẩm Miễn phí ($0) để bạn tải về và trải nghiệm ngay cấu trúc file thực tế:`,
      bullets: freeEntries.map(
        ([, tpl]) => `${tpl.copy.vi.name}: ${tpl.copy.vi.desc}`
      ),
      actions,
    };
  }
  if (lang === 'zh') {
    return {
      text: `目前 Forge Zone 提供 ${freeEntries.length} 款免费产品 ($0)，你可以直接体验完整的文件结构：`,
      bullets: freeEntries.map(
        ([, tpl]) => `${tpl.copy.zh.name}：${tpl.copy.zh.desc}`
      ),
      actions,
    };
  }
  return {
    text: `Forge Zone currently offers ${freeEntries.length} Free products ($0) so you can inspect our real deliverables right away:`,
    bullets: freeEntries.map(
      ([, tpl]) => `${tpl.copy.en.name}: ${tpl.copy.en.desc}`
    ),
    actions,
  };
}

function buildLibraryReply(lang: LangCode): BotReply {
  const { total, freeEntries, premiumEntries, individualEntries, byCategory } = getCatalogStats();
  const catLabels = WEB_CATEGORY_LABELS[lang];
  const newest = Object.entries(REAL_TEMPLATES).slice(0, 4);

  const actions: BotAction[] = newest.map(([id, tpl]) => ({
    label: tpl.copy[lang]?.name || tpl.slug,
    kind: 'template',
    target: id,
    badge: isFreeProduct(id)
      ? lang === 'vi' ? 'Miễn phí' : lang === 'zh' ? '免费' : 'Free'
      : 'Premium',
  }));
  actions.push({
    label: lang === 'vi' ? 'Mở Thư viện giao diện →' : lang === 'zh' ? '打开模板库 →' : 'Open Template Library →',
    kind: 'tab',
    target: 'library',
  });

  if (lang === 'vi') {
    return {
      text: `Kho sản phẩm Forge Zone hiện có tổng cộng ${total} sản phẩm thật đang hoạt động (${premiumEntries.length} mẫu Premium, ${freeEntries.length} mẫu Miễn phí, ${individualEntries.length} sản phẩm Agent):`,
      bullets: [
        `${catLabels.commerce}: ${byCategory.commerce} mẫu (bán hàng, SaaS, AI, công nghệ, dịch vụ, booking...)`,
        `${catLabels.portfolio}: ${byCategory.portfolio} mẫu (studio sáng tạo, hồ sơ cá nhân, agency, 3D showcase...)`,
        `${catLabels.education}: ${byCategory.education} mẫu • ${catLabels.entertainment}: ${byCategory.entertainment} mẫu • ${catLabels.communication}: ${byCategory.communication} mẫu`,
        `Mỗi mẫu giao diện đều có bản xem thử trực tiếp (Live Demo) trên Desktop / Tablet / Mobile và video quay thao tác thật.`,
      ],
      actions,
    };
  }
  if (lang === 'zh') {
    return {
      text: `Forge Zone 目前共有 ${total} 款真实产品在线（${premiumEntries.length} 款 Premium 模板、${freeEntries.length} 款免费产品、${individualEntries.length} 款 Agent 产品）：`,
      bullets: [
        `${catLabels.commerce}：${byCategory.commerce} 款（电商、SaaS、AI、科技、预订服务等）`,
        `${catLabels.portfolio}：${byCategory.portfolio} 款（创意工作室、个人作品集、设计机构等）`,
        `${catLabels.education}：${byCategory.education} 款 • ${catLabels.entertainment}：${byCategory.entertainment} 款 • ${catLabels.communication}：${byCategory.communication} 款`,
        `每套模板均支持桌面 / 平板 / 手机三端在线预览与真实录屏演示。`,
      ],
      actions,
    };
  }
  return {
    text: `The Forge Zone catalog currently features ${total} live products (${premiumEntries.length} Premium templates, ${freeEntries.length} Free products, ${individualEntries.length} Agent products):`,
    bullets: [
      `${catLabels.commerce}: ${byCategory.commerce} templates (e-commerce, SaaS, AI, techwear, booking, services...)`,
      `${catLabels.portfolio}: ${byCategory.portfolio} templates (creative studios, personal portfolios, agencies, 3D showcases...)`,
      `${catLabels.education}: ${byCategory.education} • ${catLabels.entertainment}: ${byCategory.entertainment} • ${catLabels.communication}: ${byCategory.communication}`,
      `Every web template includes an interactive Desktop / Tablet / Mobile live preview and real screen recording.`,
    ],
    actions,
  };
}

function buildCustomiseReply(lang: LangCode): BotReply {
  const noCode = FAQ_NO_CODE[lang];
  const install = ORDERS_STRINGS[lang].install;
  return {
    text: `${noCode.a} ${install.intro}`,
    bullets: [
      ...install.included.slice(0, 4),
      ...install.steps.map((s, idx) => `${idx + 1}. ${s.title}: ${s.body}`),
    ],
    actions: [
      {
        label: lang === 'vi' ? 'Mở Hướng dẫn & Kho Prompt AI →' : lang === 'zh' ? '打开修改指南与 AI 提示词库 →' : 'Open Customisation Guide & AI Prompts →',
        kind: 'url',
        target: '/huong-dan',
      },
      {
        label: lang === 'vi' ? 'Xem Quy trình →' : lang === 'zh' ? '查看流程 →' : 'View Process →',
        kind: 'tab',
        target: 'process',
      },
    ],
  };
}

function buildProcessReply(lang: LangCode): BotReply {
  const copy = I18N[lang];
  return {
    text: `${copy.howTitle} — ${copy.howIntro}`,
    bullets: [
      ...copy.steps.map((s, idx) => `${idx + 1}. ${s.title}: ${s.desc}`),
      `${copy.incTitle}: ${copy.includes.map((inc) => inc.title).join(', ')}.`,
    ],
    actions: [
      {
        label: lang === 'vi' ? 'Mở trang Quy trình →' : lang === 'zh' ? '打开流程页面 →' : 'Open Process Tab →',
        kind: 'tab',
        target: 'process',
      },
      {
        label: lang === 'vi' ? 'Xem Thư viện mẫu →' : lang === 'zh' ? '浏览模板库 →' : 'Browse Templates →',
        kind: 'tab',
        target: 'library',
      },
    ],
  };
}

function buildLicenceAndRefundReply(lang: LangCode): BotReply {
  const licenceFaq = I18N[lang].faqs[1];
  if (lang === 'vi') {
    return {
      text: `Chính sách Bản quyền thương mại và Hoàn tiền ${COMPANY.refundDays} ngày tại ${COMPANY.brand}:`,
      bullets: [
        `Bản quyền thương mại (${licenceFaq?.q || 'Giấy phép'}): ${licenceFaq?.a || 'Toàn bộ mẫu kèm giấy phép thương mại cho dự án cá nhân và khách hàng, không giới hạn số trang.'}`,
        `Không được phép đóng gói lại file nguồn để bán lại hoặc phân phối như một mẫu giao diện cạnh tranh.`,
        `Chính sách hoàn tiền ${COMPANY.refundDays} ngày: Bạn có thể yêu cầu hoàn tiền trong vòng ${COMPANY.refundDays} ngày kể từ ngày thanh toán qua email ${COMPANY.email} (nêu rõ mã đơn hàng / email mua hàng).`,
      ],
      actions: [
        { label: 'Xem Chính sách hoàn tiền →', kind: 'url', target: '/hoan-tien' },
        { label: 'Xem Điều khoản sử dụng →', kind: 'url', target: '/dieu-khoan' },
      ],
    };
  }
  if (lang === 'zh') {
    return {
      text: `${COMPANY.brand} 商用授权与 ${COMPANY.refundDays} 天退款政策说明：`,
      bullets: [
        `商用授权（${licenceFaq?.q || '商用许可'}）：${licenceFaq?.a || '所有模板均附带商用授权，可用于个人或客户商业项目。'}`,
        `禁止将源文件直接重新打包转售或作为模板公开分发。`,
        `${COMPANY.refundDays} 天退款保障：自付款之日起 ${COMPANY.refundDays} 天内，可发送邮件至 ${COMPANY.email} 申请退款。`,
      ],
      actions: [
        { label: '查看退款政策 →', kind: 'url', target: '/hoan-tien' },
        { label: '查看使用条款 →', kind: 'url', target: '/dieu-khoan' },
      ],
    };
  }
  return {
    text: `Commercial Licence and ${COMPANY.refundDays}-Day Refund Policy at ${COMPANY.brand}:`,
    bullets: [
      `Commercial Licence (${licenceFaq?.q || 'Licence'}): ${licenceFaq?.a || 'Every template includes a commercial licence for personal and client projects.'}`,
      `You may not resell or redistribute the raw template files as a competing template product.`,
      `${COMPANY.refundDays}-Day Refund Policy: You can request a refund within ${COMPANY.refundDays} days of purchase by emailing ${COMPANY.email} with your order details.`,
    ],
    actions: [
      { label: 'Read Refund Policy →', kind: 'url', target: '/hoan-tien' },
      { label: 'Read Terms of Use →', kind: 'url', target: '/dieu-khoan' },
    ],
  };
}

function buildAccountAndSupportReply(lang: LangCode): BotReply {
  if (lang === 'vi') {
    return {
      text: `Thông tin về Tài khoản, Giỏ hàng, Đơn hàng đã mua và Liên hệ hỗ trợ:`,
      bullets: [
        `Đăng nhập / Đăng ký: Bạn có thể đăng nhập nhanh bằng Google hoặc tạo tài khoản bằng Email + mật khẩu ngay trên thanh điều hướng.`,
        `Lưu mẫu yêu thích (♥) & Giỏ hàng: Bấm biểu tượng trái tim trên thẻ mẫu để lưu vào danh sách yêu thích, hoặc thêm sản phẩm mua lẻ vào giỏ hàng.`,
        `Tải lại không giới hạn: Mọi sản phẩm đã mua hoặc tải trong thời hạn gói đều được quản lý tại trang Tài khoản (/tai-khoan).`,
        `Liên hệ hỗ trợ: Gửi email trực tiếp tới ${COMPANY.email} — đội ngũ ${COMPANY.brand} phản hồi trong 1–2 ngày làm việc.`,
      ],
      actions: [
        { label: 'Mở trang Tài khoản →', kind: 'url', target: '/tai-khoan' },
        { label: 'Trang Liên hệ →', kind: 'url', target: '/lien-he' },
      ],
    };
  }
  if (lang === 'zh') {
    return {
      text: `关于账户管理、购物车、订单下载与客服支持：`,
      bullets: [
        `登录 / 注册：支持在顶部导航栏使用 Google 账号一键登录或邮箱密码注册。`,
        `收藏模板 (♥) 与购物车：点击模板卡片上的爱心即可收藏，单买产品可加入购物车统一结算。`,
        `无限次重新下载：所有已购产品和会员权限均可在“我的账户” (/tai-khoan) 页面查看并随时重新下载。`,
        `联系客服：请发邮件至 ${COMPANY.email}，我们在 1–2 个工作日内回复。`,
      ],
      actions: [
        { label: '打开我的账户 →', kind: 'url', target: '/tai-khoan' },
        { label: '联系我们 →', kind: 'url', target: '/lien-he' },
      ],
    };
  }
  return {
    text: `Here is how Accounts, Cart, Orders, and Support work on ${COMPANY.brand}:`,
    bullets: [
      `Sign in / Register: Use Google one-click sign-in or Email + password from the top navigation bar.`,
      `Saved Templates (♥) & Cart: Click the heart icon on any card to bookmark it, or add individual items to your cart.`,
      `Unlimited Re-downloads: Manage your membership and re-download purchased packages anytime from your Account page (/tai-khoan).`,
      `Customer Support: Email ${COMPANY.email} — we respond within 1–2 business days.`,
    ],
    actions: [
      { label: 'Go to Account →', kind: 'url', target: '/tai-khoan' },
      { label: 'Contact Page →', kind: 'url', target: '/lien-he' },
    ],
  };
}

function searchTemplatesByQuery(query: string, lang: LangCode): Array<{ id: string; score: number }> {
  const qNorm = stripDiacritics(query.trim());
  if (!qNorm || qNorm.length < 2) return [];

  const stopWords = new Set([
    'tim', 'mau', 'giao', 'dien', 'web', 'website', 'cho', 'minh', 'hoi', 'co', 'khong',
    'nhung', 'nao', 'la', 'gi', 've', 'cua', 'tren', 'trong', 'xem', 'muon', 'can', 'mot',
    'find', 'show', 'me', 'template', 'templates', 'site', 'what', 'which', 'how', 'the', 'and', 'for', 'with',
  ]);

  const tokens = qNorm
    .split(/[^a-z0-9\u4e00-\u9fa5]+/)
    .filter((t) => t.length >= 2 && !stopWords.has(t));

  let targetCategory: WebCategory | null = null;
  if (/(portfolio|blog|ca nhan|ho so|studio|agency|art director|cv|作品集|博客)/.test(qNorm)) {
    targetCategory = 'portfolio';
  } else if (/(thuong mai|ban hang|shop|store|ecommerce|e-commerce|saas|booking|fashion|thoi trang|电商|商店)/.test(qNorm)) {
    targetCategory = 'commerce';
  } else if (/(giao duc|hoc|dao tao|khoa hoc|academy|education|course|school|教育|培训)/.test(qNorm)) {
    targetCategory = 'education';
  } else if (/(giai tri|game|music|phim|cinema|entertainment|娱乐|游戏)/.test(qNorm)) {
    targetCategory = 'entertainment';
  } else if (/(ket noi|giao tiep|chat|social|communication|连接|社交)/.test(qNorm)) {
    targetCategory = 'communication';
  }

  let targetGroup: 'web' | 'skill-prompt' | 'agent' | null = null;
  if (/(lingoglass|agent|ung dung|extension|player|tuyen)/.test(qNorm)) {
    targetGroup = 'agent';
  } else if (/(skill|prompt|masterprompt|ky nang)/.test(qNorm)) {
    targetGroup = 'skill-prompt';
  }

  const scored: Array<{ id: string; score: number }> = [];

  for (const [id, tpl] of Object.entries(REAL_TEMPLATES)) {
    let score = 0;
    const copy = tpl.copy[lang] || tpl.copy.vi;
    const nameNorm = stripDiacritics(copy.name);
    const slugNorm = stripDiacritics(tpl.slug);
    const descNorm = stripDiacritics(copy.desc + ' ' + tpl.copy.en.desc);
    const tagsNorm = stripDiacritics((copy.tags || []).join(' ') + ' ' + (tpl.copy.en.tags || []).join(' '));

    if (targetCategory && tpl.cat === targetCategory) {
      score += 4;
    }
    if (targetGroup && tpl.group === targetGroup) {
      score += 8;
    }

    if (nameNorm.includes(qNorm) || slugNorm.includes(qNorm)) {
      score += 15;
    }

    for (const tk of tokens) {
      if (nameNorm.includes(tk) || slugNorm.includes(tk)) score += 6;
      if (tagsNorm.includes(tk)) score += 4;
      if (descNorm.includes(tk)) score += 2;
    }

    if (score > 0) {
      scored.push({ id, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5);
}

export function answerBotQuestion(rawQuery: string, lang: LangCode, topicId?: string): BotReply {
  // 1. Direct topic chip match
  if (topicId === 'pricing') return buildPricingReply(lang);
  if (topicId === 'free') return buildFreeReply(lang);
  if (topicId === 'library') return buildLibraryReply(lang);
  if (topicId === 'customise') return buildCustomiseReply(lang);
  if (topicId === 'process') return buildProcessReply(lang);
  if (topicId === 'licence') return buildLicenceAndRefundReply(lang);
  if (topicId === 'account') return buildAccountAndSupportReply(lang);

  const q = rawQuery.trim();
  const qNorm = stripDiacritics(q);

  // 2. Check if user is asking about a specific FAQ in I18N[lang].faqs
  const faqs = [...I18N[lang].faqs, FAQ_NO_CODE[lang]];
  for (const item of faqs) {
    const faqNorm = stripDiacritics(item.q);
    if (qNorm.length >= 6 && (faqNorm.includes(qNorm) || qNorm.includes(faqNorm))) {
      return {
        text: item.a,
        actions: [
          {
            label: lang === 'vi' ? 'Mở mục Câu hỏi (FAQ) →' : lang === 'zh' ? '打开常见问题 →' : 'Open FAQ Tab →',
            kind: 'tab',
            target: 'faq',
          },
        ],
      };
    }
  }

  // 3. Intent classification by keywords
  if (/(mien phi|free|\$0|0d|khong mat tien|dung thu|sample|免费)/.test(qNorm)) {
    return buildFreeReply(lang);
  }

  if (/(gia|bang gia|bao nhieu tien|chi phi|goi|premium|ultra|mua le|thanh vien|membership|price|pricing|cost|plan|subscription|gia han|auto renew|paddle|\$20|\$200|价格|会员|多少钱|续费)/.test(qNorm)) {
    return buildPricingReply(lang);
  }

  if (/(hoan tien|doi tra|refund|money back|14 ngay|ban quyen|thuong mai|giay phep|licen[cs]e|dieu khoan|chinh sach|退款|授权|商用|版权)/.test(qNorm)) {
    return buildLicenceAndRefundReply(lang);
  }

  if (/(code|lap trinh|chinh sua|sua chu|doi anh|doi mau|cai dat|deploy|hosting|vercel|netlify|cloudflare|customise|customize|readme|huong dan|npx serve|up len mang|dua len mang|代码|修改|部署|上线|安装)/.test(qNorm)) {
    return buildCustomiseReply(lang);
  }

  if (/(quy trinh|cach mua|mua nhu the nao|tai ve|tai file|file zip|nhan file|bao gom gi|process|how to buy|download|流程|怎么买|下载)/.test(qNorm)) {
    return buildProcessReply(lang);
  }

  if (/(tai khoan|dang nhap|dang ky|quen mat khau|gio hang|yeu thich|tim|tai lai|lien he|ho tro|email|support|contact|account|login|cart|账户|登录|购物车|联系|客服)/.test(qNorm)) {
    return buildAccountAndSupportReply(lang);
  }

  // 4. Template / Category search in REAL_TEMPLATES
  const matches = searchTemplatesByQuery(q, lang);
  if (matches.length > 0) {
    const actions: BotAction[] = matches.map(({ id }) => {
      const tpl = REAL_TEMPLATES[id];
      const name = tpl.copy[lang]?.name || tpl.slug;
      const tierBadge = isFreeProduct(id)
        ? lang === 'vi' ? 'Miễn phí' : lang === 'zh' ? '免费' : 'Free'
        : canBuyIndividually(id)
          ? `$${PRICE_USD.single}`
          : 'Premium';
      return {
        label: name,
        kind: 'template',
        target: id,
        badge: tierBadge,
      };
    });
    actions.push({
      label: lang === 'vi' ? 'Xem toàn bộ Thư viện →' : lang === 'zh' ? '查看全部模板库 →' : 'View All in Library →',
      kind: 'tab',
      target: 'library',
    });

    const bullets = matches.map(({ id }) => {
      const tpl = REAL_TEMPLATES[id];
      const copy = tpl.copy[lang] || tpl.copy.vi;
      const catLabel = WEB_CATEGORY_LABELS[lang][tpl.cat];
      return `${copy.name} (${catLabel}): ${copy.desc}`;
    });

    if (lang === 'vi') {
      return {
        text: `Mình tìm thấy ${matches.length} sản phẩm phù hợp nhất trên Forge Zone cho từ khóa "${q}". Bạn có thể bấm trực tiếp vào tên mẫu bên dưới để xem bản chạy thử (Live Demo):`,
        bullets,
        actions,
      };
    }
    if (lang === 'zh') {
      return {
        text: `根据“${q}”，我在 Forge Zone 找到了 ${matches.length} 款最匹配的产品。点击下方按钮即可直接打开详情与在线预览：`,
        bullets,
        actions,
      };
    }
    return {
      text: `I found ${matches.length} matching products on Forge Zone for "${q}". Click any item below to open its live demo and details:`,
      bullets,
      actions,
    };
  }

  // 5. General catalog / count question
  if (/(bao nhieu mau|kho giao dien|thu vien|danh muc|nganh nao|tat ca mau|library|catalog|all templates|多少款|模板库)/.test(qNorm)) {
    return buildLibraryReply(lang);
  }

  // 6. Friendly fallback with overview + quick navigation
  const { total } = getCatalogStats();
  if (lang === 'vi') {
    return {
      text: `Trên Forge Zone hiện có ${total} sản phẩm (Giao diện web tĩnh HTML/CSS/JS, Kỹ năng/Prompt và Agent) kèm gói Miễn phí ($0), Premium ($${PRICE_USD.pro}/tháng) và Ultra ($${PRICE_USD.ultra}/năm). Bạn có thể chọn nhanh một chủ đề dưới đây hoặc gõ tên ngành/mẫu muốn tìm (ví dụ: "portfolio", "thương mại", "AI", "miễn phí", "cách chỉnh sửa") nhé!`,
      bullets: [
        `Hỏi về giá & gói thành viên: Gõ "Bảng giá" hoặc "Gói Premium"`,
        `Tìm mẫu theo ngành: Gõ "Portfolio", "Bán hàng", "Giáo dục", "AI", "3D"...`,
        `Hỗ trợ trực tiếp qua email: ${COMPANY.email}`,
      ],
      actions: [
        { label: 'Mở Thư viện giao diện →', kind: 'tab', target: 'library' },
        { label: 'Xem Bảng giá →', kind: 'tab', target: 'pricing' },
        { label: 'Xem Câu hỏi thường gặp →', kind: 'tab', target: 'faq' },
      ],
    };
  }
  if (lang === 'zh') {
    return {
      text: `Forge Zone 目前提供 ${total} 款产品（包含静态网页模板、技能/提示词与 Agent），支持免费 ($0)、Premium ($${PRICE_USD.pro}/月) 与 Ultra ($${PRICE_USD.ultra}/年) 方案。你可以点击上方快捷标签，或输入行业关键词（如“作品集”、“电商”、“AI”、“免费”、“如何修改”）进行查询！`,
      bullets: [
        `查询价格与会员：输入“价格”或“Premium”`,
        `按行业搜索模板：输入“Portfolio”、“电商”、“教育”、“AI”、“3D”等`,
        `人工客服邮箱：${COMPANY.email}`,
      ],
      actions: [
        { label: '浏览模板库 →', kind: 'tab', target: 'library' },
        { label: '查看价格表 →', kind: 'tab', target: 'pricing' },
        { label: '查看常见问题 →', kind: 'tab', target: 'faq' },
      ],
    };
  }
  return {
    text: `Forge Zone currently hosts ${total} products (static HTML/CSS/JS Web Templates, Skills/Prompts, and Agents) across Free ($0), Premium ($${PRICE_USD.pro}/month), and Ultra ($${PRICE_USD.ultra}/year) plans. Try clicking a quick topic chip or typing a keyword like "portfolio", "commerce", "AI", "free", or "how to edit"!`,
    bullets: [
      `Pricing & Plans: Ask about "Pricing", "Premium", or "Ultra"`,
      `Search Templates: Type "Portfolio", "E-commerce", "Education", "AI", "3D"...`,
      `Direct Support Email: ${COMPANY.email}`,
    ],
    actions: [
      { label: 'Browse Library →', kind: 'tab', target: 'library' },
      { label: 'View Pricing →', kind: 'tab', target: 'pricing' },
      { label: 'Open FAQ →', kind: 'tab', target: 'faq' },
    ],
  };
}
