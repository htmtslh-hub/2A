/* Bảng giá dùng cho thanh toán.

   PayOS chỉ nhận VNĐ, nên giá tính tiền lấy theo bảng giá tiếng Việt trong
   thiết kế (mục `tiers` của I18N.vi): 1.9tr cho một giao diện, 9.9tr cho trọn
   bộ. Các mức $59–$109 hiển thị trên thẻ ở thư viện chỉ là giá tham khảo cho
   khách quốc tế; muốn tính tiền riêng từng mẫu thì khai báo trong
   TEMPLATE_PRICE_OVERRIDE bên dưới. */
import { TPL_META, I18N } from '@/generated/data';

export const PRICE_SINGLE_VND = 1_900_000;
export const PRICE_BUNDLE_VND = 9_900_000;

/** Giá riêng cho từng mẫu, nếu muốn khác giá chung. Ví dụ: { t18: 2_500_000 } */
export const TEMPLATE_PRICE_OVERRIDE: Record<string, number> = {};

export type Lang = 'vi' | 'en' | 'zh';

export function templateExists(id: string): boolean {
  return TPL_META.some((m: { id: string }) => m.id === id);
}

export function templateName(id: string, lang: Lang = 'vi'): string {
  const idx = TPL_META.findIndex((m: { id: string }) => m.id === id);
  if (idx < 0) return id;
  const dict = I18N[lang] ?? I18N.vi;
  return dict.templates[idx]?.name ?? id;
}

export function priceOf(kind: 'TEMPLATE' | 'BUNDLE', templateId?: string | null): number {
  if (kind === 'BUNDLE') return PRICE_BUNDLE_VND;
  if (templateId && TEMPLATE_PRICE_OVERRIDE[templateId]) {
    return TEMPLATE_PRICE_OVERRIDE[templateId];
  }
  return PRICE_SINGLE_VND;
}

/** PayOS giới hạn `description` 25 ký tự (nội dung chuyển khoản). */
export function shortDescription(kind: 'TEMPLATE' | 'BUNDLE', templateId?: string | null): string {
  const raw = kind === 'BUNDLE' ? 'Agentic tron bo' : `Agentic ${templateId ?? ''}`.trim();
  return raw.slice(0, 25);
}

/** orderCode của PayOS phải là số nguyên dương, duy nhất cho mỗi đơn. */
export function newOrderCode(): number {
  // Dạng: giây kể từ epoch (10 chữ số) + 3 số ngẫu nhiên, vẫn nằm dưới 2^53.
  return Number(`${Math.floor(Date.now() / 1000)}${Math.floor(Math.random() * 900 + 100)}`);
}
