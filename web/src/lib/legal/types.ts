/* Cấu trúc chung cho các văn bản pháp lý. Nội dung từng thứ tiếng nằm ở
   vi.ts / en.ts / zh.ts, cùng một khuôn để trang hiển thị dùng lại được. */

export interface LegalSection {
  /** Tiêu đề mục. */
  h: string;
  /** Các đoạn văn. Cho phép thẻ HTML đơn giản như <b>, <a>. */
  p: string[];
}

export interface LegalDoc {
  title: string;
  /** Đoạn mở đầu, in nhạt dưới tiêu đề. */
  intro: string;
  sections: LegalSection[];
}

/** Bốn văn bản Paddle yêu cầu (giấy phép là bổ sung cho sản phẩm số). */
export type LegalKey = 'terms' | 'privacy' | 'refund' | 'license';

export type LegalPack = Record<LegalKey, LegalDoc>;

/** Đường dẫn của từng văn bản. Dùng chung cho footer, sitemap và liên kết chéo. */
export const LEGAL_PATHS: Record<LegalKey, string> = {
  terms: '/dieu-khoan',
  privacy: '/bao-mat',
  refund: '/hoan-tien',
  license: '/giay-phep',
};
