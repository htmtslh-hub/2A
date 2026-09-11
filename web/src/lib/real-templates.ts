/* Những mẫu ĐÃ DỰNG THẬT, gắn vào các ô trong danh mục.
   ---------------------------------------------------------------------------
   Bản thiết kế sinh ra 18 ô t1…t18 với tên và mô tả bịa để lấp chỗ. Bảng này
   ghi đè những ô đã có mẫu thật.

   MỘT BẢNG CHO BA THỨ, cố ý: tên hiển thị, file khách tải về, và ảnh preview
   đều suy ra từ `slug`. Trước đây định tách thành ba bảng riêng, nhưng ba bảng
   thì lệch nhau lúc nào không biết — mà lệch nghĩa là khách xem ảnh mẫu này
   rồi tải về mẫu khác.

   Thêm mẫu mới:
     1. Dựng mã nguồn ở  _design/templates/<slug>/
     2. Đóng gói          node _design/dong-goi.mjs <slug>
     3. Chụp ảnh          node _design/anh-preview.mjs <slug>
     4. Thêm một mục vào bảng dưới đây. Xong.

   Đổi thứ tự hiển thị = đổi mã ô (t1, t2, …). Ô nào không khai ở đây thì giữ
   nguyên nội dung bịa của bản thiết kế. */
import type { LangCode } from '@/generated/data';

export interface TemplateCopy {
  name: string;
  desc: string;
  tags: string[];
}

export interface RealTemplate {
  /** Tên thư mục trong _design/templates, tên file .zip và tên ảnh .webp. */
  slug: string;
  /** Một trong các khoá của CAT_KEYS: portfolio | saas | agency | shop | motion. */
  cat: string;
  copy: Record<LangCode, TemplateCopy>;
}

export const REAL_TEMPLATES: Record<string, RealTemplate> = {
  t1: {
    slug: 'kinetiq',
    cat: 'agency',
    copy: {
      vi: {
        name: 'Kinetiq',
        desc: 'Trang giới thiệu kiểu tạp chí cho công ty kỹ thuật và sản xuất: chữ tiêu đề rất lớn, dải chữ chạy ngang, lưới sản phẩm hai cột.',
        tags: ['Editorial', 'Dải chữ chạy', 'Thẻ tối'],
      },
      en: {
        name: 'Kinetiq',
        desc: 'An editorial landing page for engineering and manufacturing: outsize headline type, a scrolling strip, a two-column product grid.',
        tags: ['Editorial', 'Marquee', 'Dark card'],
      },
      zh: {
        name: 'Kinetiq',
        desc: '面向工程与制造企业的杂志风格落地页：超大标题字、横向滚动条、双栏产品网格。',
        tags: ['杂志风', '滚动条', '深色卡片'],
      },
    },
  },

  t2: {
    slug: 'tidal',
    cat: 'saas',
    copy: {
      vi: {
        name: 'Tidal',
        desc: 'Trang nền tối kính mờ cho tổ chức phi lợi nhuận và dự án nghiên cứu: viền neon, khối số liệu, thẻ chương trình.',
        tags: ['Kính mờ', 'Nền tối', 'Neon'],
      },
      en: {
        name: 'Tidal',
        desc: 'A dark, frosted-glass page for non-profits and research projects: neon edges, a figures panel, programme cards.',
        tags: ['Glassmorphism', 'Dark', 'Neon'],
      },
      zh: {
        name: 'Tidal',
        desc: '面向公益组织与研究项目的深色毛玻璃页面：霓虹描边、数据面板、项目卡片。',
        tags: ['毛玻璃', '深色', '霓虹'],
      },
    },
  },

  t3: {
    slug: 'dune-pass',
    cat: 'shop',
    copy: {
      vi: {
        name: 'Dune Pass',
        desc: 'Trang đặt tour tông ấm: hero minh hoạ isometric, thẻ nổi quanh hình, thanh tìm chuyến và lưới hành trình.',
        tags: ['Đặt chỗ', 'Isometric', 'Chữ có chân'],
      },
      en: {
        name: 'Dune Pass',
        desc: 'A warm travel-booking page: an isometric hero, cards floating over it, a trip search bar and a route grid.',
        tags: ['Booking', 'Isometric', 'Serif'],
      },
      zh: {
        name: 'Dune Pass',
        desc: '暖色调的旅行预订页面：等距插画主视觉、悬浮卡片、行程搜索栏与线路网格。',
        tags: ['预订', '等距插画', '衬线字'],
      },
    },
  },
};

/** Tên file .zip (không đuôi) chứa mẫu này. Mã chưa có mẫu thật thì tìm file
 *  trùng tên mã. */
export function templateSlug(id: string): string {
  return REAL_TEMPLATES[id]?.slug ?? id;
}

/** Ảnh preview theo id ô trong markup ('agentic-tpl-t1' → '/previews/kinetiq.webp'). */
export const REAL_TEMPLATE_PREVIEWS: Record<string, string> = Object.fromEntries(
  Object.entries(REAL_TEMPLATES).map(([id, t]) => [`agentic-tpl-${id}`, `/previews/${t.slug}.webp`])
);
