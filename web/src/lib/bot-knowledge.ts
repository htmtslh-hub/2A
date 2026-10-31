import { I18N, type LangCode } from '@/generated/data';
import { PRICE_USD as PRICE_CENTS } from './catalog';
import { MEMBERSHIP_PRICES } from './membership-policy';
import { FAQ_NO_CODE, ORDERS_STRINGS } from './i18n-extra';
import { MEMBERSHIP_COPY } from './membership-copy';
import { COMPANY } from './company';
import { REAL_TEMPLATES } from './real-templates';
import { WEB_CATEGORY_LABELS, type WebCategory } from './template-categories';
import { isFreeProduct, requiresPremium, canBuyIndividually } from './product-policy';

const PRICE_USD = {
  single: PRICE_CENTS.single / 100,
  pro: MEMBERSHIP_PRICES.PRO / 100,
  ultra: MEMBERSHIP_PRICES.ULTRA / 100,
  lifetime: MEMBERSHIP_PRICES.BUNDLE / 100,
};

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
    subtitle: 'Hỏi bất kỳ thông tin nào về giao diện, bảng giá, cách cài đặt, chỉnh sửa hoặc chính sách trên Forge Zone.',
    welcome:
      'Xin chào! Mình là Forge Bot — trợ lý tự động của Forge Zone. Bạn có thể chọn nhanh chủ đề bên dưới hoặc nhập câu hỏi bất kỳ (ví dụ: cài đặt và sử dụng giao diện như thế nào, mẫu miễn phí, giá gói Premium, tìm mẫu portfolio...).',
    welcomeBullets: [
      `Kho hiện có ${Object.keys(REAL_TEMPLATES).length}+ sản phẩm thật kèm bản xem thử trực tiếp`,
      `Gói thành viên: Miễn phí ($0) • Premium (269.000₫ / $${PRICE_USD.pro} / tháng) • Ultra (1.799.000₫ / $${PRICE_USD.ultra} / năm) • Ultra Lifetime (3.999.000₫ / $${PRICE_USD.lifetime} / trọn đời)`,
      'Thanh toán một lần qua VietQR (PayOS) tại Việt Nam hoặc thẻ quốc tế (Paddle), không tự động gia hạn, kèm giấy phép thương mại',
    ],
    quickTitle: 'Câu hỏi thường gặp',
    inputPlaceholder: 'Nhập câu hỏi (VD: Cài đặt giao diện thế nào, giá gói Premium, tìm mẫu AI...)',
    sendLabel: 'Gửi',
    resetLabel: 'Làm mới',
    closeLabel: 'Đóng hộp thoại',
    buttonAriaLabel: 'Mở trợ lý hỏi đáp Forge Bot',
    buttonTooltip: 'Hỏi Forge Bot',
  },
  en: {
    botName: 'Forge Bot Assistant',
    status: 'Online • Instant answers from site data',
    subtitle: 'Ask anything about templates, pricing plans, installation, customisation, or policies on Forge Zone.',
    welcome:
      'Hi there! I am Forge Bot — your automated Forge Zone assistant. Pick a quick topic below or type any question (e.g. how to install and use a template, free templates, Premium pricing, portfolio designs, refund policy...).',
    welcomeBullets: [
      `${Object.keys(REAL_TEMPLATES).length}+ live products with interactive demos`,
      `Plans: Free ($0) • Premium ($${PRICE_USD.pro}/month) • Ultra ($${PRICE_USD.ultra}/year) • Ultra Lifetime ($${PRICE_USD.lifetime} lifetime) • Single ($${PRICE_USD.single})`,
      'One-time payment via Paddle, no auto-renewal, ships with CUSTOMISE.md & commercial licence',
    ],
    quickTitle: 'Popular questions',
    inputPlaceholder: 'Ask a question (e.g. How to install a template, Premium price, free templates...)',
    sendLabel: 'Send',
    resetLabel: 'Reset',
    closeLabel: 'Close assistant',
    buttonAriaLabel: 'Open Forge Bot Q&A assistant',
    buttonTooltip: 'Ask Forge Bot',
  },
  zh: {
    botName: 'Forge Bot 智能助手',
    status: '在线 • 基于网站实时数据自动解答',
    subtitle: '欢迎询问有关模板安装使用、会员价格、修改教程、部署步骤或退款与授权政策的任何问题。',
    welcome:
      '你好！我是 Forge Zone 的自动问答助手 Forge Bot。你可以点击下方快捷问题，或直接输入想了解的内容（例如：如何安装和使用网页模板、免费模板、Premium 价格、作品集模板、退款政策等）。',
    welcomeBullets: [
      `现已上架 ${Object.keys(REAL_TEMPLATES).length}+ 款真实产品，均支持在线预览`,
      `方案：免费 ($0) • Premium ($${PRICE_USD.pro}/月) • Ultra ($${PRICE_USD.ultra}/年) • Ultra Lifetime ($${PRICE_USD.lifetime}/终身) • 单买 ($${PRICE_USD.single})`,
      '通过 Paddle 一次性付款，绝不自动续费，附带 CUSTOMISE.md 修改清单与商用授权',
    ],
    quickTitle: '常见问题快捷入口',
    inputPlaceholder: '输入你的问题（例如：如何安装使用模板、会员价格、免费模板…）',
    sendLabel: '发送',
    resetLabel: '重置',
    closeLabel: '关闭助手',
    buttonAriaLabel: '打开 Forge Bot 问答助手',
    buttonTooltip: '询问 Forge Bot',
  },
};

export const BOT_TOPIC_CHIPS: Record<LangCode, BotTopicChip[]> = {
  vi: [
    { id: 'customise', label: '🛠️ Cách cài đặt & sử dụng giao diện', question: 'Cài đặt và sử dụng giao diện web như thế nào?' },
    { id: 'pricing', label: '💰 Bảng giá & Gói thành viên', question: 'Bảng giá và các gói thành viên trên web như thế nào?' },
    { id: 'free', label: '🎁 Mẫu miễn phí ($0)', question: 'Web hiện có những sản phẩm và giao diện miễn phí nào?' },
    { id: 'library', label: '🎨 Kho giao diện & Danh mục', question: 'Kho giao diện hiện có bao nhiêu mẫu và gồm những ngành nào?' },
    { id: 'process', label: '⚡ Quy trình mua & tải file', question: 'Quy trình mua và tải file .zip hoạt động như thế nào?' },
    { id: 'licence', label: '📜 Bản quyền & Hoàn tiền 14 ngày', question: 'Chính sách bản quyền thương mại và hoàn tiền 14 ngày ra sao?' },
    { id: 'account', label: '👤 Tài khoản, Giỏ hàng & Hỗ trợ', question: 'Cách quản lý tài khoản, tải lại đơn hàng và liên hệ hỗ trợ?' },
  ],
  en: [
    { id: 'customise', label: '🛠️ How to Install & Use Templates', question: 'How do I install, customize, and publish a web template?' },
    { id: 'pricing', label: '💰 Pricing & Memberships', question: 'How do pricing and membership plans work?' },
    { id: 'free', label: '🎁 Free Products ($0)', question: 'Which free templates and products are available right now?' },
    { id: 'library', label: '🎨 Template Library & Categories', question: 'How many templates are in the library and what categories exist?' },
    { id: 'process', label: '⚡ Buying & Download Process', question: 'How does the buying and .zip download process work?' },
    { id: 'licence', label: '📜 Commercial Licence & Refunds', question: 'What are the commercial licence and 14-day refund rules?' },
    { id: 'account', label: '👤 Account, Cart & Support', question: 'How do accounts, re-downloading orders, and customer support work?' },
  ],
  zh: [
    { id: 'customise', label: '🛠️ 模板安装与使用教程', question: '如何安装、修改并上线网站模板？' },
    { id: 'pricing', label: '💰 价格与会员方案', question: '网站的价格和会员方案是怎么计算的？' },
    { id: 'free', label: '🎁 免费模板与产品 ($0)', question: '目前有哪些可以免费下载的模板和产品？' },
    { id: 'library', label: '🎨 模板库与分类', question: '模板库目前有多少款产品？包含哪些行业分类？' },
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

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Whole-word / phrase matcher on normalized strings.
 * Prevents substring false-positives like "giao dien" matching "gia" or "tim mau" matching "tim".
 */
function hasWholePhrase(haystack: string, phrase: string): boolean {
  const p = phrase.trim().toLowerCase();
  if (!p) return false;
  // For CJK characters, substring match is fine
  if (/[\u4e00-\u9fa5]/.test(p)) {
    return haystack.includes(p);
  }
  const re = new RegExp(`(?:^|[^a-z0-9])${escapeRegex(p)}(?=$|[^a-z0-9])`, 'i');
  return re.test(haystack);
}

function scorePhrases(qRawLower: string, qNorm: string, phrases: Array<[string, number]>, rawPhrases?: Array<[string, number]>): number {
  let total = 0;
  for (const [phrase, weight] of phrases) {
    if (hasWholePhrase(qNorm, phrase)) {
      total += weight;
    }
  }
  if (rawPhrases) {
    for (const [phrase, weight] of rawPhrases) {
      if (hasWholePhrase(qRawLower, phrase)) {
        total += weight;
      }
    }
  }
  return total;
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
        `Miễn phí (0₫ / $0): Tải ngay các sản phẩm gắn nhãn Miễn phí (bao gồm mẫu web Free Sample, các mẫu miễn phí trong thư viện và LingoGlass Player).`,
        `Gói Premium (269.000₫ hoặc $${PRICE_USD.pro} / 1 tháng): Mở khóa và tải không giới hạn toàn bộ Giao diện web và Kỹ năng / Prompt trong 30 ngày.`,
        `Gói Ultra (1.799.000₫ hoặc $${PRICE_USD.ultra} / 1 năm): Mở khóa toàn bộ Giao diện web + Kỹ năng / Prompt suốt 365 ngày, nhận toàn bộ mẫu mới ra mắt trong năm.`,
        `Gói Ultra Lifetime (3.999.000₫ hoặc $${PRICE_USD.lifetime} / trọn đời): Mở khóa vĩnh viễn toàn bộ thư viện và mọi sản phẩm mới trong tương lai.`,
        `Mua lẻ (500.000₫ hoặc $${PRICE_USD.single} / sản phẩm): Áp dụng cho các sản phẩm thuộc nhóm Agent hoặc mua từng sản phẩm riêng lẻ qua giỏ hàng.`,
        `Cổng thanh toán: Khách Việt Nam chuyển khoản nhanh qua mã VietQR (PayOS - VNĐ); khách quốc tế thanh toán thẻ qua Paddle (USD). Sau khi hết hạn gói, file .zip đã tải vẫn được dùng thương mại vĩnh viễn.`,
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
        `Ultra Lifetime 方案 ($${PRICE_USD.lifetime} / 终身)：一次性付款，永久解锁全部产品与未来新增内容。`,
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
      `Ultra Lifetime Plan ($${PRICE_USD.lifetime} / lifetime): One-time payment for permanent lifetime access to all current and future products.`,
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
      bullets: freeEntries.slice(0, 8).map(
        ([, tpl]) => `${tpl.copy.vi.name}: ${tpl.copy.vi.desc}`
      ),
      actions,
    };
  }
  if (lang === 'zh') {
    return {
      text: `目前 Forge Zone 提供 ${freeEntries.length} 款免费产品 ($0)，你可以直接体验完整的文件结构：`,
      bullets: freeEntries.slice(0, 8).map(
        ([, tpl]) => `${tpl.copy.zh.name}：${tpl.copy.zh.desc}`
      ),
      actions,
    };
  }
  return {
    text: `Forge Zone currently offers ${freeEntries.length} Free products ($0) so you can inspect our real deliverables right away:`,
    bullets: freeEntries.slice(0, 8).map(
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

function buildCustomiseReply(lang: LangCode, qNorm = ''): BotReply {
  const noCode = FAQ_NO_CODE[lang];
  const install = ORDERS_STRINGS[lang].install;

  // Check if user is asking specifically about troubleshooting / errors
  if (
    hasWholePhrase(qNorm, 'loi') ||
    hasWholePhrase(qNorm, 'mat anh') ||
    hasWholePhrase(qNorm, 'khong hien') ||
    hasWholePhrase(qNorm, 'vo giao dien') ||
    hasWholePhrase(qNorm, 'chi co chu') ||
    hasWholePhrase(qNorm, 'broken') ||
    hasWholePhrase(qNorm, 'missing image')
  ) {
    if (lang === 'vi') {
      return {
        text: `Khi mở hoặc chỉnh sửa giao diện gặp lỗi hiển thị, bạn hãy kiểm tra nhanh các nguyên nhân phổ biến sau (trích từ Bảng xử lý nhanh tại /huong-dan):`,
        bullets: [
          `Trang chỉ có chữ, mất màu/bố cục: Do mở trực tiếp file trong .zip chưa giải nén, hoặc thiếu thư mục assets nằm cạnh index.html.`,
          `Mở file ra thấy toàn mã code: Nhấp chuột phải vào index.html → chọn Open with (Mở bằng) → chọn trình duyệt (Chrome, Edge, Safari...).`,
          `Ảnh không hiện khi đưa lên mạng: Kiểm tra đúng chữ hoa/thường trong tên file ảnh và đảm bảo thư mục assets đã được tải đầy đủ lên hosting.`,
          `Chữ tiếng Việt bị lỗi dấu: Đảm bảo lưu file với bảng mã UTF-8 và không dùng Word để sửa code.`,
          `Bạn có thể dùng Prompt 12 (Khôi phục và gỡ lỗi) trên trang Hướng dẫn để nhờ AI kiểm tra và sửa tự động.`,
        ],
        actions: [
          { label: 'Mở Bảng xử lý lỗi & 12 Prompt AI →', kind: 'url', target: '/huong-dan' },
        ],
      };
    }
  }

  // Check if user is asking specifically about using AI / Prompts to edit
  if (
    hasWholePhrase(qNorm, 'prompt') ||
    hasWholePhrase(qNorm, 'dung ai') ||
    hasWholePhrase(qNorm, 'nho ai') ||
    hasWholePhrase(qNorm, 'chatgpt') ||
    hasWholePhrase(qNorm, 'claude')
  ) {
    if (lang === 'vi') {
      return {
        text: `Forge Zone cung cấp sẵn bộ 12 Prompt AI chuyên dụng tại trang Hướng dẫn (/huong-dan) để bạn nhờ ChatGPT, Claude hoặc trình sửa mã AI cá nhân hóa toàn bộ giao diện mà không cần biết code:`,
        bullets: [
          `Bước 1: Giải nén file .zip và tạo một bản sao thư mục (ví dụ: website-dang-sua) để làm việc.`,
          `Bước 2: Đính kèm file ZIP hoặc gửi các file index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md và README.md vào cửa sổ chat của AI.`,
          `Bước 3: Sao chép Prompt 01 (Thiết lập trợ lý) và Prompt 02 (Cá nhân hóa toàn bộ nội dung) từ trang /huong-dan gửi cho AI; AI sẽ tự đọc file và hỏi thông tin thương hiệu của bạn bằng ngôn ngữ thông thường.`,
          `Bước 4: Dùng tiếp các Prompt 03–12 nếu muốn nối nút liên hệ (mailto/tel/form), đổi màu thương hiệu (:root), thay logo/ảnh, chuyển ngôn ngữ hoặc kiểm tra lỗi trước khi xuất bản.`,
        ],
        actions: [
          { label: 'Mở 12 Prompt AI tại trang Hướng dẫn →', kind: 'url', target: '/huong-dan' },
        ],
      };
    }
  }

  // Check if user is asking specifically about deploying / hosting / domain
  if (
    hasWholePhrase(qNorm, 'deploy') ||
    hasWholePhrase(qNorm, 'hosting') ||
    hasWholePhrase(qNorm, 'netlify') ||
    hasWholePhrase(qNorm, 'vercel') ||
    hasWholePhrase(qNorm, 'cloudflare') ||
    hasWholePhrase(qNorm, 'dua len mang') ||
    hasWholePhrase(qNorm, 'up len mang') ||
    hasWholePhrase(qNorm, 'xuat ban') ||
    hasWholePhrase(qNorm, 'ten mien') ||
    hasWholePhrase(qNorm, 'domain')
  ) {
    if (lang === 'vi') {
      return {
        text: `Mỗi giao diện của Forge Zone là một website tĩnh chuẩn (HTML/CSS/JS thuần), không cần máy chủ backend riêng nên bạn có thể đưa lên mạng miễn phí chỉ trong vài phút:`,
        bullets: [
          `1. Chuẩn bị thư mục xuất bản: Đảm bảo thư mục chứa trực tiếp file index.html và thư mục assets (không bị lồng thêm thư mục trung gian bên ngoài).`,
          `2. Đưa lên mạng nhanh nhất (Netlify Drop): Đăng nhập app.netlify.com/drop và kéo thả trực tiếp thư mục giao diện đã chỉnh sửa vào trang để nhận ngay đường link online (HTTPS).`,
          `3. Các nền tảng hỗ trợ khác: Tương thích 100% với Vercel, Cloudflare Pages, GitHub Pages hoặc bất kỳ hosting cPanel truyền thống nào.`,
          `4. Gắn tên miền riêng (Domain): Trong phần Domain Management của Netlify/Vercel, chọn Add a domain và trỏ bản ghi DNS theo hướng dẫn (xem Bước 8 & Bước 9 kèm Prompt 09–10 tại /huong-dan).`,
        ],
        actions: [
          { label: 'Xem Bước 8 & 9 (Xuất bản & Tên miền) →', kind: 'url', target: '/huong-dan' },
        ],
      };
    }
  }

  if (lang === 'vi') {
    return {
      text: `Cách cài đặt, chỉnh sửa và sử dụng giao diện web trên Forge Zone rất đơn giản (không bắt buộc biết lập trình):`,
      bullets: [
        `1. Tải & Giải nén file .zip: Tải gói giao diện từ trang mẫu hoặc mục Tài khoản (/tai-khoan), giải nén toàn bộ ra thư mục riêng (giữ nguyên cấu trúc thư mục assets cạnh file index.html).`,
        `2. Mở xem thử ngay trên máy: Nhấp đúp mở file index.html bằng trình duyệt bất kỳ (hoặc chạy npx serve . nếu muốn có địa chỉ local).`,
        `3. Xem danh sách vị trí cần sửa: Mở file CUSTOMISE.md và README.md đi kèm — tài liệu chỉ rõ từng dòng chữ, đường dẫn ảnh và mã màu thương hiệu (:root trong assets/css/style.css).`,
        `4. Tự sửa hoặc nhờ AI sửa hộ: Bạn có thể sửa trực tiếp bằng trình sửa văn bản thuần, HOẶC gửi file cho AI (ChatGPT/Claude) kèm bộ 12 Prompt AI dựng sẵn tại trang Hướng dẫn (/huong-dan) để AI thay toàn bộ nội dung giúp bạn.`,
        `5. Đưa website lên mạng (Deploy): Kéo thả thư mục chứa index.html và assets lên Netlify Drop, Vercel, Cloudflare Pages hoặc hosting cPanel bất kỳ và gắn tên miền riêng nếu cần.`,
      ],
      actions: [
        { label: 'Mở Hướng dẫn chi tiết & 12 Prompt AI →', kind: 'url', target: '/huong-dan' },
        { label: 'Xem Quy trình 3 bước →', kind: 'tab', target: 'process' },
      ],
    };
  }

  return {
    text: `${noCode.a} ${install.intro}`,
    bullets: [
      ...install.included.slice(0, 4),
      ...install.steps.map((s, idx) => `${idx + 1}. ${s.title}: ${s.body}`),
    ],
    actions: [
      {
        label: lang === 'zh' ? '打开修改指南与 AI 提示词库 →' : 'Open Customisation Guide & AI Prompts →',
        kind: 'url',
        target: '/huong-dan',
      },
      {
        label: lang === 'zh' ? '查看流程 →' : 'View Process →',
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
        label: lang === 'vi' ? 'Mở Hướng dẫn cài đặt →' : lang === 'zh' ? '打开安装指南 →' : 'Open Setup Guide →',
        kind: 'url',
        target: '/huong-dan',
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
    'cai', 'dat', 'su', 'dung', 'nhu', 'the', 'lam', 'sao', 'de', 'cach', 'huong', 'dan',
    'sua', 'chinh', 'doi', 'thay', 'anh', 'chu', 'mau', 'sac', 'code', 'file', 'zip',
    'gia', 'tien', 'bao', 'nhieu', 'goi', 'mua', 'tai', 've', 'up', 'len', 'mang',
    'find', 'show', 'me', 'template', 'templates', 'site', 'what', 'which', 'how', 'and', 'for', 'with', 'use', 'install', 'setup', 'edit',
  ]);

  const tokens = qNorm
    .split(/[^a-z0-9\u4e00-\u9fa5]+/)
    .filter((t) => t.length >= 2 && !stopWords.has(t));

  let targetCategory: WebCategory | null = null;
  if (
    hasWholePhrase(qNorm, 'portfolio') ||
    hasWholePhrase(qNorm, 'blog') ||
    hasWholePhrase(qNorm, 'ca nhan') ||
    hasWholePhrase(qNorm, 'ho so') ||
    hasWholePhrase(qNorm, 'studio') ||
    hasWholePhrase(qNorm, 'agency') ||
    hasWholePhrase(qNorm, 'art director') ||
    hasWholePhrase(qNorm, '作品集') ||
    hasWholePhrase(qNorm, '博客')
  ) {
    targetCategory = 'portfolio';
  } else if (
    hasWholePhrase(qNorm, 'thuong mai') ||
    hasWholePhrase(qNorm, 'ban hang') ||
    hasWholePhrase(qNorm, 'shop') ||
    hasWholePhrase(qNorm, 'store') ||
    hasWholePhrase(qNorm, 'ecommerce') ||
    hasWholePhrase(qNorm, 'e-commerce') ||
    hasWholePhrase(qNorm, 'saas') ||
    hasWholePhrase(qNorm, 'booking') ||
    hasWholePhrase(qNorm, 'fashion') ||
    hasWholePhrase(qNorm, 'thoi trang') ||
    hasWholePhrase(qNorm, '电商') ||
    hasWholePhrase(qNorm, '商店')
  ) {
    targetCategory = 'commerce';
  } else if (
    hasWholePhrase(qNorm, 'giao duc') ||
    hasWholePhrase(qNorm, 'dao tao') ||
    hasWholePhrase(qNorm, 'khoa hoc') ||
    hasWholePhrase(qNorm, 'academy') ||
    hasWholePhrase(qNorm, 'education') ||
    hasWholePhrase(qNorm, 'course') ||
    hasWholePhrase(qNorm, 'school') ||
    hasWholePhrase(qNorm, '教育') ||
    hasWholePhrase(qNorm, '培训')
  ) {
    targetCategory = 'education';
  } else if (
    hasWholePhrase(qNorm, 'giai tri') ||
    hasWholePhrase(qNorm, 'game') ||
    hasWholePhrase(qNorm, 'music') ||
    hasWholePhrase(qNorm, 'phim') ||
    hasWholePhrase(qNorm, 'cinema') ||
    hasWholePhrase(qNorm, 'entertainment') ||
    hasWholePhrase(qNorm, '娱乐') ||
    hasWholePhrase(qNorm, '游戏')
  ) {
    targetCategory = 'entertainment';
  } else if (
    hasWholePhrase(qNorm, 'ket noi') ||
    hasWholePhrase(qNorm, 'giao tiep') ||
    hasWholePhrase(qNorm, 'social') ||
    hasWholePhrase(qNorm, 'communication') ||
    hasWholePhrase(qNorm, '连接') ||
    hasWholePhrase(qNorm, '社交')
  ) {
    targetCategory = 'communication';
  }

  let targetGroup: 'web' | 'skill-prompt' | 'agent' | null = null;
  if (hasWholePhrase(qNorm, 'lingoglass') || hasWholePhrase(qNorm, 'film studio') || hasWholePhrase(qNorm, 'film-studio') || hasWholePhrase(qNorm, 'mcp') || hasWholePhrase(qNorm, 'agent') || hasWholePhrase(qNorm, 'player')) {
    targetGroup = 'agent';
  } else if (hasWholePhrase(qNorm, 'skill') || hasWholePhrase(qNorm, 'masterprompt')) {
    targetGroup = 'skill-prompt';
  }

  // If no meaningful search tokens, category, or group were requested, don't return random template matches
  if (tokens.length === 0 && !targetCategory && !targetGroup) {
    return [];
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
      score += 5;
    }
    if (targetGroup && tpl.group === targetGroup) {
      score += 10;
    }

    if (tokens.length > 0 && (hasWholePhrase(nameNorm, qNorm) || hasWholePhrase(slugNorm, qNorm))) {
      score += 18;
    }

    for (const tk of tokens) {
      if (hasWholePhrase(nameNorm, tk) || slugNorm.includes(tk)) score += 7;
      if (hasWholePhrase(tagsNorm, tk)) score += 5;
      if (hasWholePhrase(descNorm, tk)) score += 2;
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
  const qRawLower = q.toLowerCase();
  const qNorm = stripDiacritics(q);

  // 2. Check if user is asking about a specific FAQ in I18N[lang].faqs
  const faqs = [...I18N[lang].faqs, FAQ_NO_CODE[lang]];
  for (const item of faqs) {
    const faqNorm = stripDiacritics(item.q);
    if (qNorm.length >= 10 && (faqNorm === qNorm || faqNorm.includes(qNorm))) {
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

  // 3. Score each intent using whole-word / phrase boundaries (never raw substring inside another word!)
  const customiseScore = scorePhrases(
    qRawLower,
    qNorm,
    [
      ['cai dat', 14],
      ['su dung giao dien', 16],
      ['su dung mau', 14],
      ['cach su dung', 14],
      ['cach dung', 14],
      ['lam sao de dung', 14],
      ['mua xong lam gi', 14],
      ['huong dan cai dat', 16],
      ['huong dan su dung', 16],
      ['huong dan chinh sua', 16],
      ['huong dan', 8],
      ['chinh sua', 12],
      ['sua chu', 12],
      ['thay chu', 12],
      ['doi anh', 12],
      ['thay anh', 12],
      ['doi mau', 12],
      ['doi font', 12],
      ['thay logo', 12],
      ['biet code', 14],
      ['khong biet code', 16],
      ['lap trinh', 10],
      ['giai nen', 12],
      ['mo file', 10],
      ['index.html', 12],
      ['style.css', 12],
      ['customise.md', 14],
      ['readme.md', 12],
      ['npx serve', 14],
      ['deploy', 12],
      ['hosting', 12],
      ['vercel', 12],
      ['netlify', 12],
      ['cloudflare', 12],
      ['cpanel', 12],
      ['dua len mang', 14],
      ['up len mang', 14],
      ['xuat ban', 12],
      ['ten mien', 12],
      ['domain', 10],
      ['prompt ai', 12],
      ['dung ai', 12],
      ['sua giao dien', 14],
      ['loi hien thi', 12],
      ['mat anh', 12],
      ['vo giao dien', 12],
      ['install', 12],
      ['setup', 12],
      ['how to use', 14],
      ['how to edit', 14],
      ['customize', 12],
      ['customise', 12],
      ['publish', 10],
      ['安装', 12],
      ['使用', 10],
      ['修改', 12],
      ['部署', 12],
      ['上线', 12],
      ['代码', 10],
    ],
    [
      ['cài đặt', 6],
      ['sử dụng', 6],
      ['chỉnh sửa', 6],
    ]
  );

  const pricingScore = scorePhrases(
    qRawLower,
    qNorm,
    [
      ['bang gia', 16],
      ['gia bao nhieu', 16],
      ['bao nhieu tien', 16],
      ['chi phi', 12],
      ['goi thanh vien', 15],
      ['goi premium', 15],
      ['goi ultra', 15],
      ['premium', 10],
      ['ultra', 10],
      ['mua le', 14],
      ['gia han', 12],
      ['tu dong gia han', 15],
      ['auto renew', 14],
      ['paddle', 12],
      ['membership', 12],
      ['pricing', 14],
      ['price', 12],
      ['cost', 10],
      ['subscription', 12],
      ['$20', 12],
      ['$200', 12],
      ['价格', 14],
      ['多少钱', 14],
      ['会员', 12],
      ['续费', 12],
    ],
    [
      ['giá', 10],
      ['bảng giá', 8],
    ]
  );

  const freeScore = scorePhrases(
    qRawLower,
    qNorm,
    [
      ['mien phi', 16],
      ['mau mien phi', 18],
      ['free sample', 16],
      ['free', 14],
      ['$0', 14],
      ['0d', 12],
      ['khong mat tien', 14],
      ['dung thu', 12],
      ['免费', 16],
    ],
    [['miễn phí', 8]]
  );

  const licenceScore = scorePhrases(
    qRawLower,
    qNorm,
    [
      ['hoan tien', 16],
      ['doi tra', 14],
      ['14 ngay', 14],
      ['ban quyen', 15],
      ['giay phep', 15],
      ['giay phep thuong mai', 16],
      ['ban quyen thuong mai', 16],
      ['website thuong mai', 14],
      ['muc dich thuong mai', 14],
      ['du an thuong mai', 14],
      ['ban lai', 12],
      ['dieu khoan', 12],
      ['chinh sach', 10],
      ['refund', 16],
      ['money back', 14],
      ['licence', 14],
      ['license', 14],
      ['commercial', 12],
      ['退款', 16],
      ['授权', 14],
      ['商用', 12],
      ['版权', 14],
    ],
    [
      ['hoàn tiền', 8],
      ['bản quyền', 8],
      ['giấy phép', 8],
    ]
  );

  const processScore = scorePhrases(
    qRawLower,
    qNorm,
    [
      ['quy trinh', 15],
      ['cach mua', 14],
      ['mua nhu the nao', 14],
      ['thanh toan nhu the nao', 14],
      ['tai file', 12],
      ['file zip', 10],
      ['nhan file', 12],
      ['bao gom gi', 12],
      ['nhan duoc gi', 12],
      ['how to buy', 14],
      ['process', 12],
      ['流程', 14],
      ['怎么买', 14],
    ],
    [['quy trình', 8]]
  );

  const accountScore = scorePhrases(
    qRawLower,
    qNorm,
    [
      ['tai khoan', 15],
      ['dang nhap', 15],
      ['dang ky', 15],
      ['quen mat khau', 16],
      ['doi mat khau', 15],
      ['gio hang', 15],
      ['yeu thich', 14],
      ['luu mau', 14],
      ['tai lai', 14],
      ['don hang', 14],
      ['lien he', 15],
      ['ho tro', 12],
      ['email ho tro', 15],
      ['account', 14],
      ['login', 14],
      ['sign in', 14],
      ['cart', 14],
      ['support', 12],
      ['contact', 12],
      ['账户', 14],
      ['登录', 14],
      ['购物车', 14],
      ['联系', 14],
      ['客服', 14],
    ],
    [
      ['tài khoản', 8],
      ['đăng nhập', 8],
      ['giỏ hàng', 8],
      ['liên hệ', 8],
    ]
  );

  const libraryScore = scorePhrases(
    qRawLower,
    qNorm,
    [
      ['bao nhieu mau', 15],
      ['kho giao dien', 15],
      ['thu vien', 12],
      ['danh muc', 12],
      ['nganh nao', 14],
      ['tat ca mau', 14],
      ['all templates', 14],
      ['catalog', 12],
      ['多少款', 14],
      ['模板库', 12],
    ],
    [['thư viện', 6]]
  );

  const intentCandidates: Array<{ id: string; score: number; build: () => BotReply }> = [
    { id: 'customise', score: customiseScore, build: () => buildCustomiseReply(lang, qNorm) },
    { id: 'pricing', score: pricingScore, build: () => buildPricingReply(lang) },
    { id: 'free', score: freeScore, build: () => buildFreeReply(lang) },
    { id: 'licence', score: licenceScore, build: () => buildLicenceAndRefundReply(lang) },
    { id: 'process', score: processScore, build: () => buildProcessReply(lang) },
    { id: 'account', score: accountScore, build: () => buildAccountAndSupportReply(lang) },
    { id: 'library', score: libraryScore, build: () => buildLibraryReply(lang) },
  ];

  intentCandidates.sort((a, b) => b.score - a.score);
  const topIntent = intentCandidates[0];

  if (topIntent && topIntent.score >= 10) {
    return topIntent.build();
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

  // If a weaker intent matched (score > 0), return it
  if (topIntent && topIntent.score > 0) {
    return topIntent.build();
  }

  // 5. Friendly fallback with overview + quick navigation
  const { total } = getCatalogStats();
  if (lang === 'vi') {
    return {
      text: `Trên Forge Zone hiện có ${total} sản phẩm (Giao diện web tĩnh HTML/CSS/JS, Kỹ năng/Prompt và Agent) kèm gói Miễn phí ($0), Premium ($${PRICE_USD.pro}/tháng) và Ultra ($${PRICE_USD.ultra}/năm). Bạn có thể chọn nhanh một chủ đề dưới đây hoặc gõ câu hỏi cụ thể (ví dụ: "cài đặt giao diện thế nào", "bảng giá", "mẫu miễn phí", "portfolio", "AI") nhé!`,
      bullets: [
        `Cách cài đặt & sửa giao diện: Gõ "Cài đặt và sử dụng giao diện như thế nào"`,
        `Hỏi về giá & gói thành viên: Gõ "Bảng giá" hoặc "Gói Premium"`,
        `Tìm mẫu theo ngành: Gõ "Portfolio", "Bán hàng", "Giáo dục", "AI", "3D"...`,
        `Hỗ trợ trực tiếp qua email: ${COMPANY.email}`,
      ],
      actions: [
        { label: 'Hướng dẫn cài đặt & sửa web →', kind: 'url', target: '/huong-dan' },
        { label: 'Mở Thư viện giao diện →', kind: 'tab', target: 'library' },
        { label: 'Xem Bảng giá →', kind: 'tab', target: 'pricing' },
      ],
    };
  }
  if (lang === 'zh') {
    return {
      text: `Forge Zone 目前提供 ${total} 款产品（包含静态网页模板、技能/提示词与 Agent），支持免费 ($0)、Premium ($${PRICE_USD.pro}/月) 与 Ultra ($${PRICE_USD.ultra}/年) 方案。你可以点击上方快捷标签，或输入关键词（如“如何安装使用”、“价格”、“作品集”、“电商”、“AI”、“免费”）进行查询！`,
      bullets: [
        `模板安装与修改：输入“如何安装和使用模板”`,
        `查询价格与会员：输入“价格”或“Premium”`,
        `按行业搜索模板：输入“Portfolio”、“电商”、“教育”、“AI”、“3D”等`,
        `人工客服邮箱：${COMPANY.email}`,
      ],
      actions: [
        { label: '修改与部署指南 →', kind: 'url', target: '/huong-dan' },
        { label: '浏览模板库 →', kind: 'tab', target: 'library' },
        { label: '查看价格表 →', kind: 'tab', target: 'pricing' },
      ],
    };
  }
  return {
    text: `Forge Zone currently hosts ${total} products (static HTML/CSS/JS Web Templates, Skills/Prompts, and Agents) across Free ($0), Premium ($${PRICE_USD.pro}/month), and Ultra ($${PRICE_USD.ultra}/year) plans. Try clicking a quick topic chip or typing a question like "how to install and use a template", "pricing", "portfolio", "AI", or "free"!`,
    bullets: [
      `Install & Customize: Ask "How to install and edit a template"`,
      `Pricing & Plans: Ask about "Pricing", "Premium", or "Ultra"`,
      `Search Templates: Type "Portfolio", "E-commerce", "Education", "AI", "3D"...`,
      `Direct Support Email: ${COMPANY.email}`,
    ],
    actions: [
      { label: 'Setup & AI Prompts Guide →', kind: 'url', target: '/huong-dan' },
      { label: 'Browse Library →', kind: 'tab', target: 'library' },
      { label: 'View Pricing →', kind: 'tab', target: 'pricing' },
    ],
  };
}
