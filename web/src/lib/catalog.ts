/* Bảng giá dùng cho thanh toán.

   New purchases use Paddle (USD) for international languages and PayOS (VND) for Vietnamese.
   Số tiền luôn tính bằng ĐƠN VỊ NHỎ NHẤT của loại tiền:
   VNĐ là đồng, USD là cent (2_000 = $20). Cả PayOS lẫn Paddle đều
   nhận số nguyên theo quy ước này. */
import { REAL_TEMPLATES, templateSlug } from './real-templates';
import { isMembershipPlan, MEMBERSHIP_PRICES, MEMBERSHIP_PRICES_VND } from './membership-policy';

export type Lang = 'vi' | 'en' | 'zh';
export type Currency = 'VND' | 'USD';
export type Provider = 'PAYOS' | 'PADDLE';
export type Kind = 'TEMPLATE' | 'BUNDLE' | 'PRO' | 'ULTRA';

/* ---------- giá ---------- */

export const PRICE_VND = {
  single: 500_000,
  bundle: 3_999_000,
};

/** Cent. All individual templates share the $20 price; Ultra Lifetime (BUNDLE) is $200. */
export const PRICE_USD = {
  single: 2_000,
  bundle: 20_000,
};

/** Giá riêng cho từng mẫu nếu muốn khác giá chung. VD: { t18: { VND: 2_500_000, USD: 10_900 } } */
export const TEMPLATE_PRICE_OVERRIDE: Record<string, Partial<Record<Currency, number>>> = {};

/* ---------- chọn cổng theo thị trường ---------- */

/** Display language selects PayOS (VND) for Vietnamese and Paddle (USD) otherwise. */
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

/** Chỉ mẫu có sản phẩm thật (có file .zip để giao) mới mua được. */
export function templateExists(id: string): boolean {
  return Boolean(REAL_TEMPLATES[id]) && !REAL_TEMPLATES[id].previewOnly;
}

export function templateName(id: string, lang: Lang = 'vi'): string {
  const real = REAL_TEMPLATES[id];
  if (real) return real.copy[lang]?.name ?? real.copy.vi.name;
  return id;
}

export function priceOf(kind: Kind, currency: Currency, templateId?: string | null): number {
  if (isMembershipPlan(kind)) {
    return currency === 'VND' ? MEMBERSHIP_PRICES_VND[kind] : MEMBERSHIP_PRICES[kind];
  }
  if (kind === 'BUNDLE') {
    return currency === 'VND' ? MEMBERSHIP_PRICES_VND.BUNDLE : MEMBERSHIP_PRICES.BUNDLE;
  }
  if (kind === 'TEMPLATE' && templateId) {
    const override = TEMPLATE_PRICE_OVERRIDE[templateId]?.[currency];
    if (override) return override;
  }
  const table = currency === 'VND' ? PRICE_VND : PRICE_USD;
  return table.single;
}

/** Hiển thị tiền cho người đọc, dùng trong email và trang đơn hàng. */
export function formatMoney(amount: number, currency: Currency, lang: Lang = 'vi'): string {
  if (currency === 'VND') return amount.toLocaleString('vi-VN') + '₫';
  return new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    // Giá chẵn đô thì hiện "$20", không phải "$20.00".
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
  }).format(amount / 100);
}

export function productName(kind: Kind, templateId: string | null | undefined, lang: Lang): string {
  if (kind === 'PRO') return { vi: 'Nâng cấp Premium · 1 tháng', en: 'Premium upgrade · 1 month', zh: 'Premium 升级 · 1个月' }[lang];
  if (kind === 'ULTRA') return { vi: 'Nâng cấp Ultra · 1 năm', en: 'Ultra upgrade · 1 year', zh: 'Ultra 升级 · 1年' }[lang];
  if (kind === 'BUNDLE') {
    return { vi: 'Nâng cấp Ultra Lifetime · Trọn đời', en: 'Ultra Lifetime upgrade · Lifetime', zh: 'Ultra Lifetime 升级 · 终身' }[lang];
  }
  return templateName(templateId ?? '', lang);
}

/** Nội dung chuyển khoản gửi PayOS (`description`), tối đa 9 ký tự. */
export function shortDescription(kind: Kind | 'CART', templateId?: string | null): string {
  const id = (templateId ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const raw =
    kind === 'PRO'
      ? 'FZ PREM'
      : kind === 'ULTRA'
        ? 'FZ ULTRA'
        : kind === 'BUNDLE'
          ? 'FZ ULTLT'
          : kind === 'CART'
            ? 'FZ GIOHNG'
            : `FZ ${id}`.trim();
  return raw.slice(0, 9);
}

/** orderCode của PayOS phải là số nguyên dương, duy nhất cho mỗi đơn. */
export function newOrderCode(): number {
  return Number(`${Math.floor(Date.now() / 1000)}${Math.floor(Math.random() * 900 + 100)}`);
}
