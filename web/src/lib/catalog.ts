/* Bảng giá dùng cho thanh toán.

   Hai thị trường, hai cổng, hai loại tiền:
   - Khách Việt Nam  -> PayOS,  thu VNĐ, giá theo mục `tiers` của I18N.vi
   - Khách quốc tế   -> Paddle, thu USD, giá theo mục `tiers` của I18N.en

   Số tiền luôn tính bằng ĐƠN VỊ NHỎ NHẤT của loại tiền:
   VNĐ là đồng (1_900_000), USD là cent (7_900 = $79). Cả PayOS lẫn Paddle đều
   nhận số nguyên theo quy ước này. */
import { TPL_META, I18N } from '@/generated/data';
import { REAL_TEMPLATES, templateSlug } from './real-templates';

export type Lang = 'vi' | 'en' | 'zh';
export type Currency = 'VND' | 'USD';
export type Provider = 'PAYOS' | 'PADDLE';
export type Kind = 'TEMPLATE' | 'BUNDLE';

/* ---------- giá ---------- */

export const PRICE_VND = {
  single: 1_900_000,
  bundle: 9_900_000,
};

/** Cent. Khớp với bảng giá tiếng Anh trong thiết kế: $79 / $399. */
export const PRICE_USD = {
  single: 7_900,
  bundle: 39_900,
};

/** Giá riêng cho từng mẫu nếu muốn khác giá chung. VD: { t18: { VND: 2_500_000, USD: 10_900 } } */
export const TEMPLATE_PRICE_OVERRIDE: Record<string, Partial<Record<Currency, number>>> = {};

/* ---------- chọn cổng theo thị trường ---------- */

/** Khách xem tiếng Việt trả bằng VNĐ qua PayOS; còn lại trả USD qua Paddle. */
export function providerForLang(lang: Lang): Provider {
  return lang === 'vi' ? 'PAYOS' : 'PADDLE';
}

export function currencyForProvider(provider: Provider): Currency {
  return provider === 'PAYOS' ? 'VND' : 'USD';
}

/* ---------- tra cứu ---------- */

/** Tên file .zip chứa mẫu này. Mã danh mục là t1…t18 còn file đóng gói đặt
 *  theo tên mẫu (kinetiq.zip…), nên phải tra qua bảng REAL_TEMPLATES — cùng
 *  bảng quyết định tên hiển thị và ảnh preview. */
export function templateFile(id: string): string {
  return templateSlug(id);
}

export function templateExists(id: string): boolean {
  return TPL_META.some((m: { id: string }) => m.id === id);
}

export function templateName(id: string, lang: Lang = 'vi'): string {
  const real = REAL_TEMPLATES[id];
  if (real) return real.copy[lang]?.name ?? real.copy.vi.name;
  const idx = TPL_META.findIndex((m: { id: string }) => m.id === id);
  if (idx < 0) return id;
  const dict = I18N[lang] ?? I18N.vi;
  return dict.templates[idx]?.name ?? id;
}

export function priceOf(kind: Kind, currency: Currency, templateId?: string | null): number {
  if (kind === 'TEMPLATE' && templateId) {
    const override = TEMPLATE_PRICE_OVERRIDE[templateId]?.[currency];
    if (override) return override;
  }
  const table = currency === 'VND' ? PRICE_VND : PRICE_USD;
  return kind === 'BUNDLE' ? table.bundle : table.single;
}

/** Hiển thị tiền cho người đọc, dùng trong email và trang đơn hàng. */
export function formatMoney(amount: number, currency: Currency, lang: Lang = 'vi'): string {
  if (currency === 'VND') return amount.toLocaleString('vi-VN') + '₫';
  return new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);
}

export function productName(kind: Kind, templateId: string | null | undefined, lang: Lang): string {
  if (kind === 'BUNDLE') {
    return { vi: 'Trọn bộ thư viện', en: 'Full library', zh: '全部模板库' }[lang];
  }
  return templateName(templateId ?? '', lang);
}

/** Nội dung chuyển khoản gửi PayOS (`description`).
 *
 *  Tối đa 9 ký tự: tài liệu PayOS ghi rõ tài khoản ngân hàng không liên kết qua
 *  payOS chỉ nhận 9 ký tự, dài hơn thì không tạo được link — khách bấm mua là
 *  lỗi. Bản cũ "Forge Zone tron bo" dài 18. VD: "FZ T5", "FZ TRONBO". */
export function shortDescription(kind: Kind, templateId?: string | null): string {
  // Chỉ giữ chữ, số, khoảng trắng: ngân hàng hay tự bỏ ký tự đặc biệt khỏi nội
  // dung chuyển khoản, khiến nội dung trên sao kê lệch với cái mình gửi.
  const id = (templateId ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const raw = kind === 'BUNDLE' ? 'FZ TRONBO' : `FZ ${id}`.trim();
  return raw.slice(0, 9);
}

/** orderCode của PayOS phải là số nguyên dương, duy nhất cho mỗi đơn. */
export function newOrderCode(): number {
  // Dạng: giây kể từ epoch (10 chữ số) + 3 số ngẫu nhiên, vẫn nằm dưới 2^53.
  return Number(`${Math.floor(Date.now() / 1000)}${Math.floor(Math.random() * 900 + 100)}`);
}
