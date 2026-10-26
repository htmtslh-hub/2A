/* Những mẫu ĐÃ DỰNG THẬT, gắn vào các ô trong danh mục.
   ---------------------------------------------------------------------------
   Bản thiết kế sinh ra 18 ô t1…t18 với tên và mô tả bịa để lấp chỗ. Bảng này
   ghi đè những ô đã có mẫu thật.

   MỘT BẢNG CHO BA THỨ, cố ý: tên hiển thị, file khách tải về, và ảnh preview
   đều suy ra từ `slug`. Trước đây định tách thành ba bảng riêng, nhưng ba bảng
   thì lệch nhau lúc nào không biết — mà lệch nghĩa là khách xem ảnh mẫu này
   rồi tải về mẫu khác.

   Thêm mẫu mới:
     1. Dựng mã nguồn ở  web/product/giao-dien-web/<slug>/source/
     2. Đóng gói          node web/product/giao-dien-web/tools/dong-goi.mjs <slug>
     3. Chụp ảnh          node web/product/giao-dien-web/tools/anh-preview.mjs <slug>
     4. Thêm mục catalog, quay hoạt động thật với tools/quay-preview.mjs <slug>.
        Manifest tự cấp revision MP4; npm run previews:check trước build.

   Đổi thứ tự hiển thị = đổi mã ô (t1, t2, …). Ô nào không khai ở đây thì giữ
   nguyên nội dung bịa của bản thiết kế. */
import type { LangCode } from '@/generated/data';
import { TEMPLATE_CATEGORIES, type WebCategory } from './template-categories';
import PREVIEW_RECORDINGS from './preview-recordings.json';

export interface TemplateCopy {
  name: string;
  desc: string;
  tags: string[];
}

export interface RealTemplate {
  /** Tên thư mục sản phẩm trong product/giao-dien-web, tên file .zip và tên ảnh .webp. */
  slug: string;
  /** Website niche, shared with the store filters. */
  cat: WebCategory;
  /** Product family; existing templates default to web. */
  previewOnly?: boolean;
  badge?: string;
  group?: 'web' | 'skill-prompt' | 'agent';
  access?: 'free';
  /** Video quay từ chính mẫu giao, chỉ dùng tại cửa hàng. */
  video?: boolean;
  /** Revision for refreshing public demo and preview assets. */
  version?: string;
  specs?: Record<LangCode, string[][]>;
  copy: Record<LangCode, TemplateCopy>;
}

export const REAL_TEMPLATES: Record<string, RealTemplate> = {
  t118: {
    slug: 'geospace-canvas',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Fohse Craft",
        desc: "Giao diện Hero UI Fohse Craft (đạt 97% tiêu chuẩn thị giác) với vật thể 3D Pop-out lấn khung, thẻ kính mờ Glassmorphism, cuộn thị sai Parallax, ghim cố định Sticky Scrub 001-003 và hiệu ứng sóng chất lỏng.",
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      en: {
        name: "Fohse Craft",
        desc: "Interactive Fohse Craft Desktop Hero UI (97% criteria match) — featuring 3D pop-out subject layering, Glassmorphism & pill cutout cards, sticky scroll-scrubbed 001-003 telemetry, and liquid wave hover distortion.",
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      zh: {
        name: "Fohse Craft",
        desc: "Fohse Craft 桌面级 3D 视觉英雄界面（符合 97% 严选标准），融合 3D 破界悬浮主体、毛玻璃胶囊卡片、001-003 粘性滚动擦除与流体波纹交互。",
        tags: ['3D 破界视觉', '毛玻璃卡片', '滚动视差与流体']
      }
    }
  },

  t117: {
    slug: 'launch-video',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Sticky Boundaries",
        desc: "Giao diện Hero UI Sticky Boundaries (đạt 100% tiêu chuẩn thị giác) với vật thể 3D Pop-out lấn khung, thẻ kính mờ Glassmorphism, cuộn thị sai Parallax, ghim cố định Sticky Scrub 001-003 và hiệu ứng sóng chất lỏng.",
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      en: {
        name: "Sticky Boundaries",
        desc: "Interactive Sticky Boundaries Desktop Hero UI (100% criteria match) — featuring 3D pop-out subject layering, Glassmorphism & pill cutout cards, sticky scroll-scrubbed 001-003 telemetry, and liquid wave hover distortion.",
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      zh: {
        name: "Sticky Boundaries",
        desc: "Sticky Boundaries 桌面级 3D 视觉英雄界面（符合 100% 严选标准），融合 3D 破界悬浮主体、毛玻璃胶囊卡片、001-003 粘性滚动擦除与流体波纹交互。",
        tags: ['3D 破界视觉', '毛玻璃卡片', '滚动视差与流体']
      }
    }
  },

  t116: {
    slug: 'break-code',
    cat: 'portfolio',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Espn Signature",
        desc: "Giao diện Hero UI Espn Signature (đạt 100% tiêu chuẩn thị giác) với vật thể 3D Pop-out lấn khung, thẻ kính mờ Glassmorphism, cuộn thị sai Parallax, ghim cố định Sticky Scrub 001-003 và hiệu ứng sóng chất lỏng.",
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      en: {
        name: "Espn Signature",
        desc: "Interactive Espn Signature Desktop Hero UI (100% criteria match) — featuring 3D pop-out subject layering, Glassmorphism & pill cutout cards, sticky scroll-scrubbed 001-003 telemetry, and liquid wave hover distortion.",
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      zh: {
        name: "Espn Signature",
        desc: "Espn Signature 桌面级 3D 视觉英雄界面（符合 100% 严选标准），融合 3D 破界悬浮主体、毛玻璃胶囊卡片、001-003 粘性滚动擦除与流体波纹交互。",
        tags: ['3D 破界视觉', '毛玻璃卡片', '滚动视差与流体']
      }
    }
  },

  t115: {
    slug: 'startup-devkit',
    cat: 'portfolio',
    access: 'free',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Gluckauf WebVR",
        desc: "Giao diện Hero UI Gluckauf WebVR (đạt 96% tiêu chuẩn thị giác) với vật thể 3D Pop-out lấn khung, thẻ kính mờ Glassmorphism, cuộn thị sai Parallax, ghim cố định Sticky Scrub 001-003 và hiệu ứng sóng chất lỏng.",
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      en: {
        name: "Gluckauf WebVR",
        desc: "Interactive Gluckauf WebVR Desktop Hero UI (96% criteria match) — featuring 3D pop-out subject layering, Glassmorphism & pill cutout cards, sticky scroll-scrubbed 001-003 telemetry, and liquid wave hover distortion.",
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      zh: {
        name: "Gluckauf WebVR",
        desc: "Gluckauf WebVR 桌面级 3D 视觉英雄界面（符合 96% 严选标准），融合 3D 破界悬浮主体、毛玻璃胶囊卡片、001-003 粘性滚动擦除与流体波纹交互。",
        tags: ['3D 破界视觉', '毛玻璃卡片', '滚动视差与流体']
      }
    }
  },

  t114: {
    slug: 'forest-pulse',
    cat: 'commerce',
    access: 'free',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Sarto Bikes",
        desc: "Giao diện Hero UI Sarto Bikes (đạt 100% tiêu chuẩn thị giác) với vật thể 3D Pop-out lấn khung, thẻ kính mờ Glassmorphism, cuộn thị sai Parallax, ghim cố định Sticky Scrub 001-003 và hiệu ứng sóng chất lỏng.",
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      en: {
        name: "Sarto Bikes",
        desc: "Interactive Sarto Bikes Desktop Hero UI (100% criteria match) — featuring 3D pop-out subject layering, Glassmorphism & pill cutout cards, sticky scroll-scrubbed 001-003 telemetry, and liquid wave hover distortion.",
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      zh: {
        name: "Sarto Bikes",
        desc: "Sarto Bikes 桌面级 3D 视觉英雄界面（符合 100% 严选标准），融合 3D 破界悬浮主体、毛玻璃胶囊卡片、001-003 粘性滚动擦除与流体波纹交互。",
        tags: ['3D 破界视觉', '毛玻璃卡片', '滚动视差与流体']
      }
    }
  },

  t113: {
    slug: 'vex-ventures',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "VEX Ventures",
        desc: "Giao diện web VEX Ventures tự chứa trong một file HTML duy nhất với kiến trúc Hero Section, hiệu ứng tương tác thời gian thực và hộp thoại thông số.",
        tags: ["Hero Section", 'Responsive HTML5', 'Motion UI']
      },
      en: {
        name: "VEX Ventures",
        desc: "Single-file self-contained VEX Ventures web experience featuring Hero Section architecture, real-time interactive state, and an accessible modal dialog.",
        tags: ["Hero Section", 'Responsive HTML5', 'Motion UI']
      },
      zh: {
        name: "VEX Ventures",
        desc: "单文件自包含 VEX Ventures 网页模板，配备实时交互组件与详情弹窗。",
        tags: ['交互组件', '响应式设计', '动态视觉']
      }
    }
  },

  t112: {
    slug: 'interactive-discovery',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Interactive Discovery",
        desc: "Giao diện web Interactive Discovery tự chứa trong một file HTML duy nhất với kiến trúc Hero, hiệu ứng tương tác thời gian thực và hộp thoại thông số.",
        tags: ["Hero", 'Responsive HTML5', 'Motion UI']
      },
      en: {
        name: "Interactive Discovery",
        desc: "Single-file self-contained Interactive Discovery web experience featuring Hero architecture, real-time interactive state, and an accessible modal dialog.",
        tags: ["Hero", 'Responsive HTML5', 'Motion UI']
      },
      zh: {
        name: "Interactive Discovery",
        desc: "单文件自包含 Interactive Discovery 网页模板，配备实时交互组件与详情弹窗。",
        tags: ['交互组件', '响应式设计', '动态视觉']
      }
    }
  },

  t111: {
    slug: 'prisma-creative-studio',
    cat: 'commerce',
    access: 'free',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Prisma Creative Studio",
        desc: "Giao diện web Prisma Creative Studio tự chứa trong một file HTML duy nhất với kiến trúc Landing Page, hiệu ứng tương tác thời gian thực và hộp thoại thông số.",
        tags: ["Landing Page", 'Responsive HTML5', 'Motion UI']
      },
      en: {
        name: "Prisma Creative Studio",
        desc: "Single-file self-contained Prisma Creative Studio web experience featuring Landing Page architecture, real-time interactive state, and an accessible modal dialog.",
        tags: ["Landing Page", 'Responsive HTML5', 'Motion UI']
      },
      zh: {
        name: "Prisma Creative Studio",
        desc: "单文件自包含 Prisma Creative Studio 网页模板，配备实时交互组件与详情弹窗。",
        tags: ['交互组件', '响应式设计', '动态视觉']
      }
    }
  },

  t110: {
    slug: 'price-calculator',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Price Calculator",
        desc: "Công cụ tính chi phí dự án tương tác 2 cột (Project Estimation Calculator) với thanh trượt số trang 1–30, tuỳ chọn dịch vụ/tiến độ và 3 thẻ so sánh giá thời gian thực.",
        tags: ['Pricing Calculator', 'Interactive Slider', 'SaaS Estimator']
      },
      en: {
        name: "Price Calculator",
        desc: "Interactive 2-column project estimation calculator featuring a 1–30 page range slider, service and timeline toggles, and real-time Agency vs. Freelancer vs. Studio cost cards.",
        tags: ['Pricing Calculator', 'Interactive Slider', 'SaaS Estimator']
      },
      zh: {
        name: "Price Calculator",
        desc: "双栏交互式项目预算计算器，配备 1–30 页滑块、服务与周期切换及实时价格对比卡片。",
        tags: ['价格计算器', '交互滑块', 'SaaS 报价']
      }
    }
  },

  t109: {
    slug: 'kresna-footer',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Kresna Footer",
        desc: "Chân trang SaaS Kresna hai thẻ đối xứng với thẻ video nền bên trái, khối lập phương 3D 'Feeling lucky?', chữ viết tay Caveat, ô đăng ký email và watermark SVG tràn viền.",
        tags: ['SaaS Footer', '3D Lucky Cube', 'SVG Watermark']
      },
      en: {
        name: "Kresna Footer",
        desc: "Dual-card Kresna AI sales-automation footer featuring a looping video brand card, floating 3D rotated lucky cube, Caveat handwritten accents, and fluid getBBox() SVG watermark.",
        tags: ['SaaS Footer', '3D Lucky Cube', 'SVG Watermark']
      },
      zh: {
        name: "Kresna Footer",
        desc: "Kresna AI 销售自动化双卡片页脚组件，配备循环视频品牌卡、3D 旋转幸运方块、手写字体点缀与自适应 SVG 水印。",
        tags: ['SaaS 页脚', '3D 幸运方块', '自适应水印']
      }
    }
  },

  t108: {
    slug: 'glow-features',
    cat: 'commerce',
    access: 'free',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Glow Features",
        desc: "Bộ 3 thẻ tính năng nền tối (#0A0A0B) với viền chuyển sắc 8px (background-clip border-box), quầng sáng mờ 45px, bộ chuyển đổi bảng màu và thanh tinh chỉnh độ nhoè trực tiếp.",
        tags: ['Gradient Border', 'Ambient Glow', 'Features Grid']
      },
      en: {
        name: "Glow Features",
        desc: "Dark-themed 3-card feature showcase (#0A0A0B) using 8px background-clip border-box gradients, 45px blurred ambient halos, live palette presets, and a CSS border inspector.",
        tags: ['Gradient Border', 'Ambient Glow', 'Features Grid']
      },
      zh: {
        name: "Glow Features",
        desc: "深色霓虹光晕三卡特性展示组件，采用 8px 渐变裁剪边框、45px 模糊光晕与实时配色调节器。",
        tags: ['渐变边框', '氛围光晕', '特性网格']
      }
    }
  },

  t107: {
    slug: 'designer-portfolio',
    cat: 'portfolio',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Designer Portfolio",
        desc: "Giao diện web Designer Portfolio lấy cảm hứng từ thiết kế website design với lưới Bento hiện đại, hiệu ứng nghiêng 3D theo chuột, cuộn parallax mượt mà và bảng màu trích xuất tự động (#fafafa, #4353ff).",
        tags: ['UI/UX Design', '3D Hover & Scroll', 'Bento Layout']
      },
      en: {
        name: "Designer Portfolio",
        desc: "Interactive Designer Portfolio web template inspired by website design visual direction — featuring a responsive Bento grid, 3D magnetic hover tilt, scroll-linked parallax, and extracted palette tokens (#fafafa, #4353ff).",
        tags: ['UI/UX Design', '3D Hover & Scroll', 'Bento Layout']
      },
      zh: {
        name: "Designer Portfolio",
        desc: "源自 website design 视觉灵感的 Designer Portfolio 响应式网页模板，配备 Bento 网格布局、3D 鼠标悬停倾斜、滚动视差与自动提取配色系统。",
        tags: ['UI/UX 设计', '3D 悬停与视差', 'Bento 布局']
      }
    }
  },

  t106: {
    slug: 'flexible-spark',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Flexible Spark",
        desc: "Giao diện web Flexible Spark lấy cảm hứng từ thiết kế website design với lưới Bento hiện đại, hiệu ứng nghiêng 3D theo chuột, cuộn parallax mượt mà và bảng màu trích xuất tự động (#fafafa, #e24919).",
        tags: ['UI/UX Design', '3D Hover & Scroll', 'Bento Layout']
      },
      en: {
        name: "Flexible Spark",
        desc: "Interactive Flexible Spark web template inspired by website design visual direction — featuring a responsive Bento grid, 3D magnetic hover tilt, scroll-linked parallax, and extracted palette tokens (#fafafa, #e24919).",
        tags: ['UI/UX Design', '3D Hover & Scroll', 'Bento Layout']
      },
      zh: {
        name: "Flexible Spark",
        desc: "源自 website design 视觉灵感的 Flexible Spark 响应式网页模板，配备 Bento 网格布局、3D 鼠标悬停倾斜、滚动视差与自动提取配色系统。",
        tags: ['UI/UX 设计', '3D 悬停与视差', 'Bento 布局']
      }
    }
  },

  t105: {
    slug: 'lawyer-justicia',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Lawyer Justicia",
        desc: "Giao diện web Lawyer Justicia lấy cảm hứng từ thiết kế website design với lưới Bento hiện đại, hiệu ứng nghiêng 3D theo chuột, cuộn parallax mượt mà và bảng màu trích xuất tự động (#12141c, #4353ff).",
        tags: ['UI/UX Design', '3D Hover & Scroll', 'Bento Layout']
      },
      en: {
        name: "Lawyer Justicia",
        desc: "Interactive Lawyer Justicia web template inspired by website design visual direction — featuring a responsive Bento grid, 3D magnetic hover tilt, scroll-linked parallax, and extracted palette tokens (#12141c, #4353ff).",
        tags: ['UI/UX Design', '3D Hover & Scroll', 'Bento Layout']
      },
      zh: {
        name: "Lawyer Justicia",
        desc: "源自 website design 视觉灵感的 Lawyer Justicia 响应式网页模板，配备 Bento 网格布局、3D 鼠标悬停倾斜、滚动视差与自动提取配色系统。",
        tags: ['UI/UX 设计', '3D 悬停与视差', 'Bento 布局']
      }
    }
  },

  t104: {
    slug: 'ecommerce-omorfia',
    cat: 'portfolio',
    access: 'free',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Ecommerce Omorfia",
        desc: "Giao diện web Ecommerce Omorfia lấy cảm hứng từ thiết kế website design với lưới Bento hiện đại, hiệu ứng nghiêng 3D theo chuột, cuộn parallax mượt mà và bảng màu trích xuất tự động (#f8f8f8, #4353ff).",
        tags: ['UI/UX Design', '3D Hover & Scroll', 'Bento Layout']
      },
      en: {
        name: "Ecommerce Omorfia",
        desc: "Interactive Ecommerce Omorfia web template inspired by website design visual direction — featuring a responsive Bento grid, 3D magnetic hover tilt, scroll-linked parallax, and extracted palette tokens (#f8f8f8, #4353ff).",
        tags: ['UI/UX Design', '3D Hover & Scroll', 'Bento Layout']
      },
      zh: {
        name: "Ecommerce Omorfia",
        desc: "源自 website design 视觉灵感的 Ecommerce Omorfia 响应式网页模板，配备 Bento 网格布局、3D 鼠标悬停倾斜、滚动视差与自动提取配色系统。",
        tags: ['UI/UX 设计', '3D 悬停与视差', 'Bento 布局']
      }
    }
  },

  t103: {
    slug: 'amazing-agency',
    cat: 'portfolio',
    access: 'free',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Amazing Agency",
        desc: "Giao diện web Amazing Agency lấy cảm hứng từ thiết kế website design với lưới Bento hiện đại, hiệu ứng nghiêng 3D theo chuột, cuộn parallax mượt mà và bảng màu trích xuất tự động (#12141c, #88614b).",
        tags: ['UI/UX Design', '3D Hover & Scroll', 'Bento Layout']
      },
      en: {
        name: "Amazing Agency",
        desc: "Interactive Amazing Agency web template inspired by website design visual direction — featuring a responsive Bento grid, 3D magnetic hover tilt, scroll-linked parallax, and extracted palette tokens (#12141c, #88614b).",
        tags: ['UI/UX Design', '3D Hover & Scroll', 'Bento Layout']
      },
      zh: {
        name: "Amazing Agency",
        desc: "源自 website design 视觉灵感的 Amazing Agency 响应式网页模板，配备 Bento 网格布局、3D 鼠标悬停倾斜、滚动视差与自动提取配色系统。",
        tags: ['UI/UX 设计', '3D 悬停与视差', 'Bento 布局']
      }
    }
  },

  t102: {
    slug: 'vize-footer',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Vize Footer",
        desc: "Giao diện web Vize Footer tự chứa trong một file HTML duy nhất với nền video lặp mượt, bề mặt kính mờ, bảng điều khiển tương tác và hộp thoại thông số.",
        tags: ['Motion Video', 'Liquid Glass', 'Interactive Hero']
      },
      en: {
        name: "Vize Footer",
        desc: "Single-file self-contained Vize Footer landing experience featuring looping background video, glassmorphic UI, interactive telemetry, and an accessible modal dialog.",
        tags: ['Motion Video', 'Liquid Glass', 'Interactive Hero']
      },
      zh: {
        name: "Vize Footer",
        desc: "单文件自包含 Vize Footer 着陆页模板，配备自动循环背景视频、毛玻璃交互组件与详情弹窗。",
        tags: ['动态视频', '毛玻璃', '交互首屏']
      }
    }
  },

  t101: {
    slug: 'haul',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "HAUL!",
        desc: "Giao diện web HAUL! tự chứa trong một file HTML duy nhất với nền video lặp mượt, bề mặt kính mờ, bảng điều khiển tương tác và hộp thoại thông số.",
        tags: ['Motion Video', 'Liquid Glass', 'Interactive Hero']
      },
      en: {
        name: "HAUL!",
        desc: "Single-file self-contained HAUL! landing experience featuring looping background video, glassmorphic UI, interactive telemetry, and an accessible modal dialog.",
        tags: ['Motion Video', 'Liquid Glass', 'Interactive Hero']
      },
      zh: {
        name: "HAUL!",
        desc: "单文件自包含 HAUL! 着陆页模板，配备自动循环背景视频、毛玻璃交互组件与详情弹窗。",
        tags: ['动态视频', '毛玻璃', '交互首屏']
      }
    }
  },

  t100: {
    slug: 'lumina',
    cat: 'commerce',
    access: 'free',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: "Lumina",
        desc: "Giao diện web Lumina tự chứa trong một file HTML duy nhất với nền video lặp mượt, bề mặt kính mờ, bảng điều khiển tương tác và hộp thoại thông số.",
        tags: ['Motion Video', 'Liquid Glass', 'Interactive Hero']
      },
      en: {
        name: "Lumina",
        desc: "Single-file self-contained Lumina landing experience featuring looping background video, glassmorphic UI, interactive telemetry, and an accessible modal dialog.",
        tags: ['Motion Video', 'Liquid Glass', 'Interactive Hero']
      },
      zh: {
        name: "Lumina",
        desc: "单文件自包含 Lumina 着陆页模板，配备自动循环背景视频、毛玻璃交互组件与详情弹窗。",
        tags: ['动态视频', '毛玻璃', '交互首屏']
      }
    }
  },

  t99: {
    slug: 'rivr',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: 'RIVR',
        desc: 'Hero dashboard DeFi Fluid Staking tự chứa trong một file HTML duy nhất với khung video 3rem nền sóng lỏng 3D, góc cắt lõm phải dưới kèm hai mặt nạ SVG 56×56, thẻ 5.2K Active Yielders kính mờ, bộ chuyển chiến lược Smart Vault trực tiếp (stRIVR, NFT Floor, Delta-Neutral) và hộp thoại đặt lịch demo tổ chức.',
        tags: [
          'DeFi Staking',
          'Smart Vaults',
          'Glassmorphism'
        ]
      },
      en: {
        name: 'RIVR',
        desc: 'A single-file glassmorphic DeFi Fluid Staking dashboard hero featuring a 3rem rounded 3D fluid video stage, a bottom-right faux-cutout corner with dual 56×56 concave SVG masks, a frosted 5.2K Active Yielders card, an interactive Smart Vault strategy switcher (stRIVR, NFT Floor, Delta-Neutral), and an institutional demo modal.',
        tags: [
          'DeFi Staking',
          'Smart Vaults',
          'Glassmorphism'
        ]
      },
      zh: {
        name: 'RIVR 流动质押',
        desc: '单文件自包含 DeFi 流动质押与智能金库首屏仪表盘，配备 3rem 圆角 3D 流体视频舞台、带双 56×56 内凹 SVG 遮罩的右下角挖空文档角标、5.2K 活跃收益者毛玻璃卡片、实时智能金库策略切换器及机构演示预约弹窗。',
        tags: [
          'DeFi 质押',
          '智能金库',
          '毛玻璃美学'
        ]
      }
    },
    specs: {
      vi: [
        ['Định dạng', 'Single-file HTML5 / CSS3 / Vanilla JS'],
        ['Gói tải', '4 files · Single-file self-contained (11 KB ZIP)'],
        ['Tương tác', 'Smart Vault Switcher · Faux-Cutout SVG Masks · Institutional Modal'],
        ['Phạm vi', 'Dashboard DeFi Fluid Staking · không cần bước build']
      ],
      en: [
        ['Format', 'Single-file HTML5 / CSS3 / Vanilla JS'],
        ['Package', '4 files · Single-file self-contained (11 KB ZIP)'],
        ['Interactions', 'Smart Vault Switcher · Faux-Cutout SVG Masks · Institutional Modal'],
        ['Scope', 'DeFi Fluid Staking hero · zero build step required']
      ],
      zh: [
        ['格式', 'Single-file HTML5 / CSS3 / 原生 JS'],
        ['交付包', '4 个文件 · 单文件自包含架构（11 KB ZIP）'],
        ['交互特性', '智能金库切换 · 双 56×56 内凹 SVG 遮罩 · 机构预约弹窗'],
        ['适用场景', 'DeFi 流动质押首屏 · 无需编译即开即用']
      ]
    }
  },
  t98: {
    slug: 'digital-epoch',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: 'Digital Epoch',
        desc: 'Landing page nền tảng web phi tập trung tự chứa trong một file HTML duy nhất với khung Hero bo tròn 48px nền video 3D sáng, thanh điều hướng kính mờ nổi ở đáy, băng chuyền vô tận 8 thương hiệu đối tác chuyển màu gradient khi di chuột, trình khám phá kiến trúc 3 tầng (Core Protocol, Builder SDK, Enterprise Mesh) và hộp thoại đối tác.',
        tags: [
          'Decentralized Web',
          'Infinite Marquee',
          'Enterprise SDK'
        ]
      },
      en: {
        name: 'Digital Epoch',
        desc: 'A single-file decentralized web foundation landing page featuring a 48px rounded video hero container, a floating frosted bottom navbar, a seamless 8-brand CSS marquee with hover gradient cards, a 3-layer modular architecture & SDK inspector, and an enterprise inquiry dialog.',
        tags: [
          'Decentralized Web',
          'Infinite Marquee',
          'Enterprise SDK'
        ]
      },
      zh: {
        name: 'Digital Epoch 数字纪元',
        desc: '单文件自包含去中心化网络基金会着陆页，配备 48px 圆角 3D 视频首屏容器、底部悬浮毛玻璃胶囊导航栏、悬停呈现多彩渐变的 8 品牌无缝跑马灯、三层模块化架构与 SDK 检视器以及企业合作咨询弹窗。',
        tags: [
          '去中心化网络',
          '无缝跑马灯',
          '企业级 SDK'
        ]
      }
    },
    specs: {
      vi: [
        ['Định dạng', 'Single-file HTML5 / CSS3 / Vanilla JS'],
        ['Gói tải', '4 files · Single-file self-contained (13 KB ZIP)'],
        ['Tương tác', 'Seamless Gradient Marquee · 3-Layer SDK Inspector · Partner Modal'],
        ['Phạm vi', 'Landing page hệ sinh thái Web3 & doanh nghiệp · không cần bước build']
      ],
      en: [
        ['Format', 'Single-file HTML5 / CSS3 / Vanilla JS'],
        ['Package', '4 files · Single-file self-contained (13 KB ZIP)'],
        ['Interactions', 'Seamless Gradient Marquee · 3-Layer SDK Inspector · Partner Modal'],
        ['Scope', 'Decentralized web & enterprise showcase · zero build step required']
      ],
      zh: [
        ['格式', 'Single-file HTML5 / CSS3 / 原生 JS'],
        ['交付包', '4 个文件 · 单文件自包含架构（13 KB ZIP）'],
        ['交互特性', '无缝渐变跑马灯 · 三层架构与 SDK 检视器 · 合作伙伴弹窗'],
        ['适用场景', '去中心化生态与企业平台 · 无需编译即开即用']
      ]
    }
  },
  t97: {
    slug: 'aetheris-voyage',
    cat: 'portfolio',
    access: 'free',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: 'Aetheris Voyage',
        desc: 'Mẫu giao diện không gian điện ảnh với hai phân đoạn toàn màn hình Hero & Capabilities nền video độ phân giải cao, giao diện kính mờ Liquid Glass, hiệu ứng xuất hiện BlurText mượt mà, thanh viền trạng thái âm thanh trực tiếp và hộp thoại điều phối chuyến bay quỹ đạo tương tác.',
        tags: [
          'Cinematic Space',
          'Liquid Glass',
          'Video Crossfade'
        ]
      },
      en: {
        name: 'Aetheris Voyage',
        desc: 'A cinematic space-travel landing page with looping background videos, custom requestAnimationFrame crossfades, a shared liquid-glass design system, word-by-word blur-in typography, interactive audio telemetry, and an orbital flight dispatch dialog.',
        tags: [
          'Cinematic Space',
          'Liquid Glass',
          'Video Crossfade'
        ]
      },
      zh: {
        name: 'Aetheris Voyage 太空探索',
        desc: '电影级太空探索着陆页，配备高清循环背景视频与 rAF 渐变转场、液态毛玻璃 Liquid Glass 设计系统、逐词高斯模糊淡入排版、实时太空遥测音频指示器以及交互式轨道飞船预约弹窗。',
        tags: [
          '电影级航天',
          '液态毛玻璃',
          '视频平滑转场'
        ]
      }
    },
    specs: {
      vi: [
        ['Định dạng', 'Single-file HTML5 / CSS3 / Vanilla JS'],
        ['Gói tải', '4 files · Single-file self-contained (8 KB ZIP)'],
        ['Tương tác', 'Fading Video · Liquid Glass · Telemetry Visualizer · Orbital Dialog'],
        ['Phạm vi', 'Landing page không gian điện ảnh · không cần bước build']
      ],
      en: [
        ['Format', 'Single-file HTML5 / CSS3 / Vanilla JS'],
        ['Package', '4 files · Single-file self-contained (8 KB ZIP)'],
        ['Interactions', 'Fading Video · Liquid Glass · Telemetry Visualizer · Orbital Dialog'],
        ['Scope', 'Cinematic space-travel showcase · zero build step required']
      ],
      zh: [
        ['格式', 'Single-file HTML5 / CSS3 / 原生 JS'],
        ['交付包', '4 个文件 · 单文件自包含架构（8 KB ZIP）'],
        ['交互特性', 'Fading Video · 液态毛玻璃 · 实时音频电台 · 预定弹窗'],
        ['适用场景', '电影级深空着陆页 · 无需编译即开即用']
      ]
    }
  },
  t96: {
    "slug": "atlas",
    "cat": "education",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Atlas Ocean Log",
        "desc": "Tạp chí thám hiểm đại dương & hải dương học chia hai tầng mặt nước \"01 / OCEAN LOG — Small Stories / Vast Oceans\" với 4 tranh minh họa WebP tự tạo (cá voi đỏ thẫm cõng thuyền buồm đỏ dưới trăng tròn và ngọn hải đăng, cá voi hoàng hôn và cá voi biển sâu), thanh tọa độ 25.2048° N 55.2708° E | ONLINE kèm sóng âm, thước đo độ sâu thẳng đứng 0 m → 10,000 m, đoạn văn Scroll Word sáng dần từng chữ theo cuộn (#journey), băng chuyền nhật ký chuyển hướng hai chiều skill-morge (#archive) và hồ sơ la bàn PEOPLE · PLACES · OCEANS · IDEAS viền sáng xoay neon-orbit-border (#stories).",
        "tags": [
          "Oceanographic Journal",
          "Scroll Word & Morge",
          "Original WebP Art"
        ]
      },
      "en": {
        "name": "Atlas Ocean Log",
        "desc": "An editorial split-waterline maritime expedition and oceanographic storytelling template (\"01 / OCEAN LOG — Small Stories / Vast Oceans\") featuring 4 original WebP illustrations (crimson whale & red-sailed boat beneath a full moon and coastal lighthouse, twilight finback, and abyssal pelagic whale), live 25.2048° N 55.2708° E | ONLINE telemetry, an interactive 0 m → 10,000 m vertical depth ruler, a 49-word Scroll Word illumination manifesto (#journey), a directional skill-morge expedition archive carousel (#archive), and PEOPLE · PLACES · OCEANS · IDEAS field dossiers with a rotating neon-orbit-border (#stories).",
        "tags": [
          "Oceanographic Journal",
          "Scroll Word & Morge",
          "Original WebP Art"
        ]
      },
      "zh": {
        "name": "Atlas Ocean Log",
        "desc": "双层海平面海洋科考与叙事专题模板《01 / OCEAN LOG — Small Stories / Vast Oceans》，配备 4 张原创 WebP 插画（满月与海岸灯塔下托起红帆木船的绯红巨鲸、暮色长须鲸与深海鲸群）、25.2048° N 55.2708° E | ONLINE 遥测顶栏、0 m 至 10,000 m 垂直深度标尺、49 词随滚动逐词点亮的 Scroll Word 宣言（#journey）、skill-morge 双向科考档案轮播（#archive）及带 neon-orbit-border 流光边框的 PEOPLE · PLACES · OCEANS · IDEAS 指南针档案（#stories）。",
        "tags": [
          "海洋科考日志",
          "逐词滚动与双向轮播",
          "原创 WebP 插画"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "HTML5 / CSS3 / Vanilla JS thuần"
        ],
        [
          "Gói tải",
          "10 files · 4 ảnh WebP tự tạo (518 KB ZIP)"
        ],
        [
          "Tương tác",
          "Thước độ sâu 0–10,000 m · Scroll Word · Morge carousel · Neon Orbit"
        ],
        [
          "Phạm vi",
          "Tạp chí hải dương học & nhật ký thám hiểm · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Plain HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Package",
          "10 files · 4 original WebP plates (518 KB ZIP)"
        ],
        [
          "Interaction",
          "0–10,000 m depth ruler · Scroll Word · Morge carousel · Neon Orbit"
        ],
        [
          "Scope",
          "Oceanographic journal & field archive · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "原生 HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "下载包",
          "10 个文件 · 4 张原创 WebP 插画（518 KB ZIP）"
        ],
        [
          "交互",
          "0–10,000 m 深度标尺 · 逐词点亮 · Morge 轮播 · 流光边框"
        ],
        [
          "范围",
          "海洋科考与故事专题 · 零构建步骤"
        ]
      ]
    }
  },
  t95: {
    "slug": "lauberhorn-ridge",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Lauberhorn Ridge",
        "desc": "Dashboard hướng dẫn cung đường leo núi một màn hình tự chứa trong một file HTML duy nhất cho cung đường \"Lauberhorn Ridge\" (trên Interlaken, Thụy Sĩ) dưới góc nhìn của người leo núi \"Mira Holt\": ảnh nền 16:10 (1728×1080) rừng thông rụng lá vàng cùng hồ băng ngọc lam dưới đỉnh núi tuyết, chồng khít bởi video flycam 10 giây lặp mượt (width 111.11%, left -5.556%, tự hiện dần 0.8s), khung tọa độ 1440×900 (--u), phông Inter Tight 300/400 + JetBrains Mono 500 viết hoa kèm tiền tố \"::\", các thẻ kính kem mờ rgba(244,240,233,.94) (blur 14px, không đổ bóng) gồm ô logo hoa thị 6 cánh (15, 14), viên thuốc Mira Holt (62, 14), tiêu đề 96px (20, 86), thẻ tìm kiếm \"Hey, Mira!\" (15, 462), bản đồ 16 đường đồng mức ::POINTS OF INTEREST (15, 612), thẻ ảnh 211 Photos (383, 612), biểu đồ ::ALTITUDE 4 tab (728, 612), đồng hồ ::WEATHER 19° (1126, 12), 3 ô ::TRAIL INFO (1126, 402) và hoạt ảnh Web Animations 2.8 giây.",
        "tags": [
          "Alpine Trail Dashboard",
          "Cream Glass Telemetry",
          "Single-File HTML"
        ]
      },
      "en": {
        "name": "Lauberhorn Ridge",
        "desc": "A self-contained single-file, one-screen hiking trail guide dashboard hero for the fictional Swiss alpine trail \"Lauberhorn Ridge\" (above Interlaken) seen by signed-in hiker \"Mira Holt\": a full-bleed 16:10 golden larch valley and turquoise glacial lake plate (1728×1080) overlaid by a seamless 10s forward/reverse drone glide video (laid at 111.11% width, left -5.556% with a 0.8s fade-in), a 1440×900 coordinate frame (--u), Inter Tight 300/400 and uppercase JetBrains Mono 500 typography with tight \"::\" prefixes, and shadow-free cream glass widgets (rgba(244,240,233,.94), 14px blur) including a six-spoke logo tile (15, 14), Mira Holt user pill (62, 14), 96px title (20, 86), \"Hey, Mira!\" search card (15, 462), 16-contour ::POINTS OF INTEREST map (15, 612), 211 Photos card (383, 612), 4-tab ::ALTITUDE chart (728, 612), ::WEATHER 19° semicircle gauge (1126, 12), ::TRAIL INFO stack (1126, 402), and a 2.8s Web Animations timeline.",
        "tags": [
          "Alpine Trail Dashboard",
          "Cream Glass Telemetry",
          "Single-File HTML"
        ]
      },
      "zh": {
        "name": "Lauberhorn Ridge",
        "desc": "瑞士因特拉肯上方《Lauberhorn Ridge》高山徒步路线指南仪表盘单文件自包含单屏首屏模板（登录徒步者 Mira Holt 视角）：16:10 金秋落叶松峡谷与碧绿冰川湖满版底图（1728×1080）叠加 0.8 秒淡入的 10 秒正反向无缝航拍视频（宽 111.11%、左偏移 -5.556%），基于 1440×900 坐标帧（--u），采用 Inter Tight 300/400 与带紧凑“::”前缀的 JetBrains Mono 500 大写排版，配备无投影奶油色毛玻璃卡片（rgba(244,240,233,.94)、14px 模糊），涵盖六辐星号标志块（15, 14）、Mira Holt 状态胶囊（62, 14）、96px 主标题（20, 86）、“Hey, Mira!”搜索卡（15, 462）、16 条等高线 ::POINTS OF INTEREST 地形图（15, 612）、211 Photos 照片卡（383, 612）、四标签 ::ALTITUDE 折线图（728, 612）、::WEATHER 19° 半圆仪表盘（1126, 12）、三栏 ::TRAIL INFO 信息卡（1126, 402）及 2.8 秒 Web Animations 入场动画。",
        "tags": [
          "徒步路线仪表盘",
          "奶油毛玻璃组件",
          "单文件 HTML"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Gói tải",
          "4 files · 20.4 KB ZIP"
        ],
        [
          "Phạm vi",
          "Trail guide dashboard hero 1 màn hình (1440×900) · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Package",
          "4 files · 20.4 KB ZIP"
        ],
        [
          "Scope",
          "One-screen trail guide dashboard hero (1440×900) · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML5 / CSS3 / 原生 JS"
        ],
        [
          "下载包",
          "4 files · 20.4 KB ZIP"
        ],
        [
          "范围",
          "单屏徒步路线仪表盘首屏（1440×900）· 零构建步骤"
        ]
      ]
    }
  },
  t94: {
    "slug": "vaultra",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Vaultra",
        "desc": "Hero tài chính crypto một màn hình tự chứa trong một file HTML duy nhất cho nền tảng \"Vaultra\" (\"Innovative Crypto Financial Solutions / For Any Investment Challenge\"): bầu trời đêm đen (#030208) với quả cầu hạt chấm bi khổng lồ phát sáng viền đỏ, xanh lam và magenta xoay chậm liên tục qua luồng video 4 giây tự hiện dần (0.85s) khớp khít trên ảnh tĩnh 1672×941, mặt nạ làm mờ hai bên trên màn hình siêu rộng và làm mờ đỉnh trên điện thoại, tiêu đề Inter Display 300 (~66px) trắng ở giữa chuyển sang gradient hồng-tím (#f49cd4 → #deb6ff) ở hai đầu, phông Poppins 400/500, thanh điều hướng kèm logo hai nét chéo \"//\", nút viên thuốc \"Sign up\" và \"Log In\", 4 chip đồng xu kính mờ (₿, Ξ, ₮, Hex) nằm trên đường sáng chéo, gợi ý cuộn chuột kèm nhãn cong \"USDT\"/\"ETH\", cùng bộ chọn tiền tệ EN · USD / EUR / JPY và hộp thoại kính mờ 3 chế độ.",
        "tags": [
          "Crypto Finance Hero",
          "Spinning Particle Globe",
          "Single-File HTML"
        ]
      },
      "en": {
        "name": "Vaultra",
        "desc": "A self-contained single-file, one-screen crypto finance landing hero for \"Vaultra\" (\"Innovative Crypto Financial Solutions / For Any Investment Challenge\"): a black night canvas (#030208) with a huge dotted particle globe rising from the bottom whose red, blue and magenta rim glows shimmer as it slowly spins via a seamless 4s video loop fading in (0.85s) over an identical 1672×941 still plate, ultra-wide side and phone top feather masks, an Inter Display 300 (~66px) headline with soft pink-to-lilac gradient ends (#f49cd4 → #deb6ff), Poppins 400/500 UI and body copy, a top navbar with a double-slash \"//\" mark, \"Sign up\" and \"Log In\" pills, four round glass coin chips (₿, Ξ, ₮, Hex) riding the diagonal light lines, a bottom mouse-scroll hint with curved \"USDT\" and \"ETH\" labels, plus an interactive EN · USD / EUR / JPY selector and 3-mode glassmorphic modal.",
        "tags": [
          "Crypto Finance Hero",
          "Spinning Particle Globe",
          "Single-File HTML"
        ]
      },
      "zh": {
        "name": "Vaultra",
        "desc": "加密金融平台《Vaultra》（\"Innovative Crypto Financial Solutions / For Any Investment Challenge\"）单文件自包含单屏首屏模板：深邃夜空背景（#030208）下巨型点状粒子地球从底部升起，红、蓝、洋红边缘辉光随 4 秒无缝循环视频缓慢旋转并在 1672×941 同构静帧上以 0.85 秒平滑淡入，配超宽屏两侧与手机端顶部羽化遮罩、中心纯白向两端粉紫渐变（#f49cd4 → #deb6ff）的 Inter Display 300（约 66px）主标题、Poppins 400/500 导航与正文、双斜杠“//”标志、\"Sign up\" 与 \"Log In\" 胶囊按钮、沿斜向光线分布的 4 枚圆形毛玻璃代币徽章（₿、Ξ、₮、Hex）、底部弧形“USDT”/“ETH”滚轮提示，以及 EN · USD / EUR / JPY 汇率切换菜单与三模式毛玻璃弹窗。",
        "tags": [
          "加密金融首屏",
          "旋转粒子地球",
          "单文件 HTML"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Gói tải",
          "4 files · 20.3 KB ZIP"
        ],
        [
          "Phạm vi",
          "Landing hero tài chính crypto 1 màn hình · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Package",
          "4 files · 20.3 KB ZIP"
        ],
        [
          "Scope",
          "One-screen crypto finance landing hero · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML5 / CSS3 / 原生 JS"
        ],
        [
          "下载包",
          "4 files · 20.3 KB ZIP"
        ],
        [
          "范围",
          "单屏加密金融着陆页首屏 · 零构建步骤"
        ]
      ]
    }
  },
  t93: {
    "slug": "gridwork-co",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Gridwork Co",
        "desc": "Hero onboarding tạo tài khoản một màn hình tự chứa trong một file HTML duy nhất cho sàn việc làm freelance \"Gridwork Co\" (\"What tools do you use? — We’ll connect you with the best jobs.\"): tỉ lệ artboard 1447×1087 (--u), thẻ ảnh nhà kính 55% bên trái kết hợp luồng video chuyển động lặp 10 giây tự hiện dần (0.8s), họa tiết 4×4 ô 61u ở góc trên-trái (ô cắt màu nền #FDFEFD tại (0,0) và 6 ô kính mờ blur 8u), dải kính mờ đáy 360u (blur 22u) kèm trích dẫn Sofia Hernández và 2 nút mũi tên tròn 59u, cùng biểu mẫu 432u bên phải gồm biểu trưng hai chiếc lá xanh rừng (#1F4D37), lưới 2×3 thẻ công cụ (Figma, Framer, Adobe XD, Webflow, Relume, Canva), nút viên thuốc \"Create account\" (#20513A) và hoạt ảnh xuất hiện ~2 giây bằng Web Animations API.",
        "tags": [
          "Freelance Marketplace",
          "Botanical Onboarding",
          "Single-File HTML"
        ]
      },
      "en": {
        "name": "Gridwork Co",
        "desc": "A self-contained single-file, one-screen create-account onboarding hero for the \"Gridwork Co\" freelance marketplace (\"What tools do you use? — We’ll connect you with the best jobs.\"): 1447×1087 artboard-proportional scale (--u), a 55% sunlit greenhouse photo card on the left overlaid by a 0.8s fade-in 10s camera-orbit video loop, a top-left 61u 4×4 corner tile pattern (#FDFEFD cut-out at (0,0) + six 8u-blur frosted tiles), a 360u bottom frosted forest-tint glass band with Sofia Hernández’s testimonial and two 59u outline arrow buttons, and a centred 432u form on the right with a two-leaf forest-green wordmark (#1F4D37), a 2×3 tool grid (Figma, Framer, Adobe XD, Webflow, Relume, Canva), a \"Create account\" pill (#20513A), and a ~2s Web Animations entrance timeline.",
        "tags": [
          "Freelance Marketplace",
          "Botanical Onboarding",
          "Single-File HTML"
        ]
      },
      "zh": {
        "name": "Gridwork Co",
        "desc": "自由职业市集《Gridwork Co》（\"What tools do you use? — We’ll connect you with the best jobs.\"）单文件自包含单屏注册引导首屏模板：基于 1447×1087 画布比例单位（--u），左侧 55% 阳光温室照片卡片叠加 0.8 秒淡入的 10 秒无缝环绕视频循环、左上角 61u 4×4 网格拼贴图案（(0,0) 处 #FDFEFD 镂空切角与 6 个 8u 磨砂玻璃方块）、底部 360u 森林绿渐变磨砂玻璃带及 Sofia Hernández 客户评价与双 59u 圆形箭头按钮；右侧居中 432u 表单配备双叶森林绿标志（#1F4D37）、2×3 真实工具图标网格（Figma、Framer、Adobe XD、Webflow、Relume、Canva）、\"Create account\" 胶囊按钮（#20513A）及约 2 秒 Web Animations 入场时间线。",
        "tags": [
          "自由职业市集",
          "植物风注册引导",
          "单文件 HTML"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Gói tải",
          "4 files"
        ],
        [
          "Phạm vi",
          "Create-account onboarding hero 1 màn hình · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Package",
          "4 files"
        ],
        [
          "Scope",
          "One-screen create-account onboarding hero · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML5 / CSS3 / 原生 JS"
        ],
        [
          "下载包",
          "4 files"
        ],
        [
          "范围",
          "单屏注册引导首屏 · 零构建步骤"
        ]
      ]
    }
  },
  t92: {
    "slug": "targo",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Targo",
        "desc": "Trang đích một trang hai phân đoạn (Hero + About) tự chứa trong một file HTML duy nhất cho hạ tầng kiểm thử phần mềm \"Targo\" (\"Scaling The Platform For Your Business\"): phông chữ Quantico (400 + 700), nền xám sáng #F2F1F0 chuyển mượt sang #F7F6F8, điểm nhấn xanh cyan #15BCDF (hover #3fd0ef, viền #0fa3c2), tiêu đề 6 bậc thang (SCALING / THE / PLATFORM / FOR / YOUR / BUSINESS), các nút vát góc clip-path polygon kèm vạch ngang 22×1px, hai luồng video tự động phát lại mỗi 1 giây kèm lớp phủ scrim bên trái trên desktop (Hero) và lớp phủ nhuộm màu #15BCDF mix-blend-mode: hue sát mép phải (About), cùng thanh điều hướng đáp ứng <= 700px.",
        "tags": [
          "Testing Infrastructure",
          "Chamfered Cyan UI",
          "Single-File HTML"
        ]
      },
      "en": {
        "name": "Targo",
        "desc": "A self-contained single-file, two-section (Hero + About) landing page for the \"Targo\" software testing infrastructure platform (\"Scaling The Platform For Your Business\"): Quantico (400 + 700) typography, #F2F1F0 to #F7F6F8 studio light-grey canvas, #15BCDF cyan accents (hover #3fd0ef, border #0fa3c2), a 6-line staircase hero headline (SCALING / THE / PLATFORM / FOR / YOUR / BUSINESS), chamfered clip-path polygon CTAs with a trailing 22×1px rule, dual autoplay-resilient videos with a desktop left scrim (Hero) and a flush-right #15BCDF mix-blend-mode: hue tint overlay (About), and a <= 700px responsive mobile menu.",
        "tags": [
          "Testing Infrastructure",
          "Chamfered Cyan UI",
          "Single-File HTML"
        ]
      },
      "zh": {
        "name": "Targo",
        "desc": "软件测试基础设施平台《Targo》（\"Scaling The Platform For Your Business\"）单文件自包含双章节（Hero + About）落地页模板：采用 Quantico（400 + 700）字体、#F2F1F0 至 #F7F6F8 浅灰渐变画布、#15BCDF 青色点缀（悬停 #3fd0ef、边框 #0fa3c2）、六行阶梯式主标题（SCALING / THE / PLATFORM / FOR / YOUR / BUSINESS）、带 22×1px 尾线的切角多边形按钮、每秒自动重试播放的双视频（首屏配桌面端左侧渐变遮罩，关于屏配右对齐 #15BCDF mix-blend-mode: hue 色相染色层），以及 <= 700px 响应式移动端导航菜单。",
        "tags": [
          "测试基础设施",
          "切角青色科技风",
          "单文件 HTML"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Gói tải",
          "4 files"
        ],
        [
          "Phạm vi",
          "Landing page 2 phân đoạn (Hero + About) · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Package",
          "4 files"
        ],
        [
          "Scope",
          "Two-section landing page (Hero + About) · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML5 / CSS3 / 原生 JS"
        ],
        [
          "下载包",
          "4 files"
        ],
        [
          "范围",
          "双章节落地页（Hero + About）· 零构建步骤"
        ]
      ]
    }
  },
  t91: {
    "slug": "vanguard",
    "cat": "portfolio",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "VANGUARD",
        "desc": "Hero trang đích toàn màn hình một khung nhìn (h-screen) cho creative agency \"VANGUARD\" (\"World-Class Digital Collective — Design. Disrupt. Conquer.\") xây dựng bằng React 18, TypeScript, Tailwind CSS, Vite 6 và Lucide React (ArrowUpRight, Award, Crown, X): video nền lặp tự động toàn màn hình (object-cover), phông chữ trưng bày \"FSP DEMO - PODIUM Sharp 4.11\" (font-podium) kết hợp \"Inter\" (font-inter), tiêu đề 3 dòng cỡ clamp(2.8rem,8vw,7rem) xuất hiện phân tầng theo hoạt ảnh @keyframes fade-up (0s → 0.8s), huy hiệu Top-Rated Brand Studio, 3 chỉ số uy tín (250+ Brands Transformed · 95% Client Retention · 10+ Years in the Game), lớp phủ menu di động toàn màn hình (bg-black/95 backdrop-blur-sm) và hộp thoại Selected Works & Start a Brief tương tác.",
        "tags": [
          "Creative Agency",
          "React + Tailwind + Vite",
          "PODIUM Sharp & Video Hero"
        ]
      },
      "en": {
        "name": "VANGUARD",
        "desc": "A fullscreen single-viewport (h-screen) hero landing page for the \"VANGUARD\" creative agency (\"World-Class Digital Collective — Design. Disrupt. Conquer.\") built with React 18, TypeScript, Tailwind CSS, Vite 6, and Lucide React (ArrowUpRight, Award, Crown, X): a looping object-cover background video, \"FSP DEMO - PODIUM Sharp 4.11\" (font-podium) display typography paired with \"Inter\" (font-inter), a three-line clamp(2.8rem,8vw,7rem) headline with staggered @keyframes fade-up entrance delays (0s → 0.8s), a Top-Rated Brand Studio badge, three agency telemetry stats (250+ Brands Transformed · 95% Client Retention · 10+ Years in the Game), a fullscreen staggered mobile menu overlay (bg-black/95 backdrop-blur-sm), and an interactive Selected Works & Start a Brief dossier modal.",
        "tags": [
          "Creative Agency",
          "React + Tailwind + Vite",
          "PODIUM Sharp & Video Hero"
        ]
      },
      "zh": {
        "name": "VANGUARD",
        "desc": "创意设计机构《VANGUARD》（\"World-Class Digital Collective — Design. Disrupt. Conquer.\"）全屏单视口（h-screen）首屏落地页模板，基于 React 18、TypeScript、Tailwind CSS、Vite 6 与 Lucide React（ArrowUpRight、Award、Crown、X）构建：配备全屏 object-cover 循环背景视频、\"FSP DEMO - PODIUM Sharp 4.11\"（font-podium）展示字体搭配 \"Inter\"（font-inter）无衬线字体、带 @keyframes fade-up 阶梯式延迟（0s → 0.8s）的三行 clamp(2.8rem,8vw,7rem) 主标题、Top-Rated Brand Studio 荣誉徽章、三项核心数据（250+ Brands Transformed · 95% Client Retention · 10+ Years in the Game）、全屏毛玻璃移动端菜单（bg-black/95 backdrop-blur-sm），以及交互式作品集与项目简报弹窗。",
        "tags": [
          "创意设计机构",
          "React + Tailwind + Vite",
          "全屏视频首屏"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "React 18 / TypeScript / Tailwind CSS / Vite 6"
        ],
        [
          "Gói tải",
          "16 files (kèm bản dựng tĩnh built/)"
        ],
        [
          "Phạm vi",
          "Fullscreen Agency Hero · Responsive Mobile Menu & Dossier Modal"
        ]
      ],
      "en": [
        [
          "Format",
          "React 18 / TypeScript / Tailwind CSS / Vite 6"
        ],
        [
          "Package",
          "16 files (includes prebuilt built/ bundle)"
        ],
        [
          "Scope",
          "Fullscreen Agency Hero · Responsive Mobile Menu & Dossier Modal"
        ]
      ],
      "zh": [
        [
          "格式",
          "React 18 / TypeScript / Tailwind CSS / Vite 6"
        ],
        [
          "下载包",
          "16 files（含预构建 built/ 静态包）"
        ],
        [
          "范围",
          "全屏创意机构首屏 · 响应式移动菜单与作品集弹窗"
        ]
      ]
    }
  },
  t90: {
    "slug": "cast-and-render",
    "cat": "portfolio",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Cast & Render",
        "desc": "Trang đích cuộn tua từng khung hình video tự chứa trong một file HTML duy nhất cho studio đối tượng 3D \"Cast & Render — 3D Object Studio\": tông màu thạch cao ấm #f2f0ec và mực than #0d0c0b, bộ nạp trước toàn bộ video MP4 241 khung hình all-intra vào bộ nhớ Blob (URL.createObjectURL) kèm thanh tiến trình LOADING %, thuật toán nội suy khung hình mượt (seekAt += gap * 0.115), 3 tấm nội dung chuyển cảnh Hermite smoothstep có vùng nghỉ hình tự nhiên (CUES dead zones), thanh HUD nhảy chương & đọc mã khung hình trực tiếp (FRM 001 / 241) cùng bảng thông tin Studio Sheet 3 tab tương tác (Morning Board · Studio & Farm · Start a Brief).",
        "tags": [
          "3D Object Studio",
          "Scroll-Scrubbed Video",
          "Single-File HTML"
        ]
      },
      "en": {
        "name": "Cast & Render",
        "desc": "A self-contained single-file scroll-scrubbed video landing page for the \"Cast & Render — 3D Object Studio\": warm plaster #f2f0ec and charcoal ink #0d0c0b palette, full-blob MP4 preloader (241 all-intra frames via fetch + URL.createObjectURL) with a live LOADING % bar, rAF frame-seeking interpolation (seekAt += gap * 0.115), three cross-fading editorial panels with Hermite smoothstep ramps and video-only dead zones (CUES), a live frame & chapter scrubber HUD (FRM 001 / 241), and an interactive 3-tab Studio Sheet modal (Morning Board · Studio & Farm · Start a Brief).",
        "tags": [
          "3D Object Studio",
          "Scroll-Scrubbed Video",
          "Single-File HTML"
        ]
      },
      "zh": {
        "name": "Cast & Render",
        "desc": "《Cast & Render — 3D Object Studio》单文件自包含滚动逐帧视频擦除落地页：采用暖石膏白 #f2f0ec 与炭墨黑 #0d0c0b 配色，配备将 241 帧全帧内（all-intra）MP4 完整预加载为本地 Blob（URL.createObjectURL）的 LOADING % 进度屏、rAF 平滑帧寻址插值（seekAt += gap * 0.115）、带纯视频留白区（CUES dead zones）的三段 Hermite 平滑渐变文案面板、实时帧号与章节跳转 HUD（FRM 001 / 241），以及包含 Morning Board、Studio & Farm 与 Start a Brief 的三标签交互式工作室面板。",
        "tags": [
          "3D 艺术工作室",
          "滚动逐帧视频",
          "单文件 HTML"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Gói tải",
          "4 files"
        ],
        [
          "Phạm vi",
          "Landing page tua khung hình video theo cuộn · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Package",
          "4 files"
        ],
        [
          "Scope",
          "Scroll-scrubbed video landing page · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML5 / CSS3 / 原生 JS"
        ],
        [
          "下载包",
          "4 files"
        ],
        [
          "范围",
          "滚动逐帧视频落地页 · 零构建步骤"
        ]
      ]
    }
  },
  t89: {
    "slug": "reelmark",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Reelmark",
        "desc": "Hero trang đích một màn hình tự chứa trong một file HTML duy nhất cho chợ nhà sáng tạo video ngắn \"Reelmark\" (\"Captivate Crowds with Snackable Reels\") theo phong cách Soft Mint Studio (#F5F8EF nền trắng ngà ấm, #08482D xanh rừng đậm, #DAE7C7 huy hiệu bạc hà, #101410 tiêu đề đen đậm): khung 1440×1080 căn giữa (--u = min(100vw/1440, 100vh/1080)), tiêu đề Inter Tight 700 (88u / 92u), ghi chú vẽ tay Caveat 600 (\"Be seen / with clips\", \"Zero cost\") kèm mũi tên và nét gạch \"//\" tự vẽ, cùng băng chuyền 10 thẻ video cao uốn cong như mặt trong hình trụ (tự động trôi phải → trái 50u/s, kéo 1:1 và vẩy quán tính giảm tốc 95%/s) hiển thị đồng bộ 10 ô sản phẩm từ một lưới video MP4 + ảnh tĩnh WebP 5×2 duy nhất.",
        "tags": [
          "Creator Marketplace",
          "Curved Video Carousel",
          "Soft Mint Studio"
        ]
      },
      "en": {
        "name": "Reelmark",
        "desc": "A self-contained single-file, one-screen HTML landing hero for the \"Reelmark\" short-form video creator marketplace (\"Captivate Crowds with Snackable Reels\") in a soft mint studio aesthetic (#F5F8EF warm off-white, #08482D forest green, #DAE7C7 mint badge, #101410 headline): a centred 1440×1080 frame (--u = min(100vw/1440, 100vh/1080)), 88u / 92u Inter Tight 700 display typography, Caveat 600 handwritten notes (\"Be seen / with clips\", \"Zero cost\") with self-drawing SVG arrows and \"//\" strokes, and a curved cylindrical 10-card video carousel (50u/s right-to-left drift, 1:1 pointer drag, and 95%/s momentum decay) playing 10 cover-fitted product clips from a single synced 5×2 MP4 + WebP grid.",
        "tags": [
          "Creator Marketplace",
          "Curved Video Carousel",
          "Soft Mint Studio"
        ]
      },
      "zh": {
        "name": "Reelmark",
        "desc": "《Reelmark》短视频创作者市集（\"Captivate Crowds with Snackable Reels\"）单文件自包含单屏 HTML 首屏模板，采用柔和薄荷绿工作室风格（#F5F8EF 暖白底色、#08482D 深森林绿、#DAE7C7 薄荷绿徽章、#101410 墨黑主标题）：配备居中 1440×1080 画布（--u = min(100vw/1440, 100vh/1080)）、88u / 92u Inter Tight 700 标题排印、带自绘制 SVG 箭头与 \"//\" 笔触的 Caveat 600 手写批注（\"Be seen / with clips\"、\"Zero cost\"），以及如同圆柱内壁般弯曲的 10 卡片视频轮播（50u/s 从右向左平滑漂移、1:1 指针拖拽与 95%/s 惯性衰减），由单一同步的 5×2 MP4 + WebP 网格呈现 10 段不同产品短片。",
        "tags": [
          "短视频创作者市集",
          "曲面圆柱视频轮播",
          "薄荷绿工作室风"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Gói tải",
          "4 files"
        ],
        [
          "Phạm vi",
          "Hero một màn hình · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Package",
          "4 files"
        ],
        [
          "Scope",
          "One-screen hero · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML5 / CSS3 / 原生 JS"
        ],
        [
          "下载包",
          "4 files"
        ],
        [
          "范围",
          "单屏首屏模板 · 零构建步骤"
        ]
      ]
    }
  },
  t88: {
    "slug": "melli",
    "cat": "education",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Melli",
        "desc": "Trang đích 5 phân đoạn điều khiển theo cuộn tự chứa trong một file HTML duy nhất cho khóa học nghệ thuật 3D \"Melli — Master 3D Artistry\" với chú ong mật 3D (BEE_GLB) bay lượn qua toàn trang dựng bằng Three.js 0.160.0: font Poppins (300–800), thanh điều hướng và huy hiệu Made by Melli cố định tự động đổi màu chữ trắng khi cuộn qua Section 02 nền bokeh tím đậm (body.on-dark), 4 bông hoa PNG tách nền hiệu ứng parallax (.flower--cosmos, .flower--hang, .flower--iris, .flower--passion) nghiêng và trôi theo cuộn, đôi cánh trước và cánh sau 3 lớp nhòe chuyển động tạo từ kết cấu WING_TEX vẽ trên canvas 1024×576, ánh sáng môi trường RoomEnvironment PMREM và đường bay nội suy mượt 5 điểm mốc theo cuộn (tự động chuyển sang quỹ đạo dọc riêng trên màn hình < 760px).",
        "tags": [
          "Khóa học 3D Artistry",
          "Three.js 0.160.0",
          "Ong mật 3D bay theo cuộn"
        ]
      },
      "en": {
        "name": "Melli",
        "desc": "A self-contained single-file, five-section scroll-driven HTML landing page for \"Melli — Master 3D Artistry\" featuring an interactive 3D honeybee (BEE_GLB) rendered in Three.js 0.160.0: Poppins (300–800) typography, a fixed navbar and Made by Melli badge that automatically invert to white over the dark violet macro-bokeh Section 02 (body.on-dark), four transparent botanical flower PNGs (.flower--cosmos, .flower--hang, .flower--iris, .flower--passion) with scroll-driven parallax drift and rotation, three-layer motion-blurred forewings and hindwings generated from a 1024×576 canvas-extracted WING_TEX alpha texture, a procedural RoomEnvironment PMREM light rig, and a five-keyframe cubic-eased flight path with dedicated desktop and < 760px mobile trajectories.",
        "tags": [
          "3D Artistry Course",
          "Three.js 0.160.0",
          "Scroll-Driven 3D Honeybee"
        ]
      },
      "zh": {
        "name": "Melli",
        "desc": "《Melli — Master 3D Artistry》3D 艺术大师课单文件自包含五屏滚动驱动 HTML 着陆页模板，内置基于 Three.js 0.160.0 渲染的 3D 蜜蜂（BEE_GLB）：采用 Poppins（300–800）字体排印、在滚入深紫微距散景第二屏（body.on-dark）时自动反色为纯白的固定顶栏与 Made by Melli 徽章、4 朵随滚动视差漂移旋转的透明花卉 PNG（.flower--cosmos、.flower--hang、.flower--iris、.flower--passion）、由 1024×576 Canvas 提取透明通道的 3 层运动模糊前后翅、RoomEnvironment PMREM 环境光照，以及包含桌面端与 < 760px 移动端专属轨迹的五关键帧平滑飞行路径。",
        "tags": [
          "3D 艺术课程",
          "Three.js 0.160.0",
          "滚动驱动 3D 蜜蜂"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Single-file HTML5 / CSS3 / Three.js 0.160.0"
        ],
        [
          "Gói tải",
          "4 files"
        ],
        [
          "Phạm vi",
          "Trang đích 3D 5 phân đoạn điều khiển theo cuộn · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Single-file HTML5 / CSS3 / Three.js 0.160.0"
        ],
        [
          "Package",
          "4 files"
        ],
        [
          "Scope",
          "Five-section scroll-driven 3D landing page · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML5 / CSS3 / Three.js 0.160.0"
        ],
        [
          "下载包",
          "4 files"
        ],
        [
          "范围",
          "五屏滚动驱动 3D 着陆页 · 零构建步骤"
        ]
      ]
    }
  },
  t87: {
    "slug": "iris",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Iris",
        "desc": "Hero nền tối tự chứa trong một file HTML duy nhất cho trợ lý AI thông minh \"Iris\" (\"Introducing a / Smart AI Assistant\") với linh vật robot 3D tương tác dựng bằng Three.js r169: nền đen tuyền #0b0b11, thanh điều hướng kính mờ rgba(18,19,26,0.86), chữ Figtree (400–800), nút viên thuốc tím #8f66ff → #7c4dff, mô hình đầu cầu nối ăng-ten (HEAD_GLB) và hai cánh tay nổi (ARM_GLB) phủ vật liệu MeshPhysicalMaterial cùng viền sáng Fresnel tím oải hương, kính che mặt cong chia lưới cầu (bezel + glass), đôi mắt tím phát sáng theo dõi con trỏ chuột và chớp mắt tự nhiên mỗi 2.5–6 giây, môi trường studio PMREM 6 hộp sáng cầu và hậu kỳ UnrealBloomPass.",
        "tags": [
          "Trợ lý AI 3D",
          "Three.js r169",
          "Linh vật Robot tương tác"
        ]
      },
      "en": {
        "name": "Iris",
        "desc": "A self-contained single-file dark-mode HTML landing hero for the \"Iris\" AI assistant (\"Introducing a / Smart AI Assistant\") featuring an interactive 3D robot mascot rendered in Three.js r169: a #0b0b11 canvas, a blurred rgba(18,19,26,0.86) navbar, Figtree (400–800) typography, a #8f66ff → #7c4dff pill CTA, a spherical head (HEAD_GLB) and two floating arms (ARM_GLB) shaded with MeshPhysicalMaterial and lavender Fresnel rim shells, a tessellated spherical visor (bezel + glass), cursor-tracking violet eyes that blink every 2.5–6s, a six-sphere PMREM dark studio environment, and UnrealBloomPass post-processing.",
        "tags": [
          "3D AI Assistant",
          "Three.js r169",
          "Interactive Robot Mascot"
        ]
      },
      "zh": {
        "name": "Iris",
        "desc": "智能 AI 助手《Iris》（\"Introducing a / Smart AI Assistant\"）单文件自包含暗色模式 HTML 首屏模板，内置基于 Three.js r169 渲染的交互式 3D 机器人吉祥物：采用 #0b0b11 暗黑背景、rgba(18,19,26,0.86) 毛玻璃顶栏、Figtree（400–800）字体与 #8f66ff → #7c4dff 渐变胶囊按钮；球形头部（HEAD_GLB）与双悬浮手臂（ARM_GLB）配备 MeshPhysicalMaterial 材质与薰衣草紫 Fresnel 边缘光着色器、球面细分护目镜（bezel + glass）、实时跟随光标并在 2.5–6 秒间自然眨眼的紫色发光双眼、六球体 PMREM 暗房柔光箱环境及 UnrealBloomPass 辉光后处理。",
        "tags": [
          "3D AI 助手",
          "Three.js r169",
          "交互式机器人吉祥物"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Single-file HTML5 / CSS3 / Three.js r169"
        ],
        [
          "Gói tải",
          "4 files"
        ],
        [
          "Phạm vi",
          "Giao diện 3D tương tác một màn hình · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Single-file HTML5 / CSS3 / Three.js r169"
        ],
        [
          "Package",
          "4 files"
        ],
        [
          "Scope",
          "One-screen interactive 3D hero · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML5 / CSS3 / Three.js r169"
        ],
        [
          "下载包",
          "4 files"
        ],
        [
          "范围",
          "单屏交互式 3D 首屏 · 零构建步骤"
        ]
      ]
    }
  },
  t86: {
    "slug": "wander-far",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Wander Far",
        "desc": "Hero đặt chỗ du lịch biên tập một màn hình tự chứa trong một file HTML duy nhất cho trang du lịch hư cấu \"Wander far. Rest easy.\" trên nền trắng sạch #FEFEFE: bố cục tham chiếu 1446×1088 (--u = min(100vw/1446, max(100dvh/1088, .78px))), tiêu đề hai dòng 90u bằng Inter Display 700 (opsz 32, tracking -0.035em) kết hợp đoạn mở đầu căn phải #727274, 3 tab chuyển đổi có gạch chân xanh navy #0A2A72 (Stays · Flights · Experiences), thanh tìm kiếm 4 ô viền mảnh #E6E6E7 (Where to? · Molde | Dates · Jun 18 – Jun 24 | Travelers · 3 travelers | nút Search xanh vịnh #00286E) và khung ảnh toàn chiều rộng góc vuông chiếm phần cao còn lại của màn hình với ảnh tĩnh 16:9 cùng video lặp 5 giây cảnh vịnh hẹp Na Uy giờ xanh và nhãn vị trí \"Geirangerfjord, Norge · 62.10° N\".",
        "tags": [
          "Đặt chỗ du lịch",
          "Single-File HTML",
          "Vịnh hẹp Na Uy & Thanh tìm kiếm 4 ô"
        ]
      },
      "en": {
        "name": "Wander Far",
        "desc": "A self-contained single-file, one-screen editorial travel-booking landing hero for \"Wander far. Rest easy.\" on a clean #FEFEFE canvas: authored at 1446×1088 (--u = min(100vw/1446, max(100dvh/1088, .78px))), a 90u two-line Inter Display 700 headline (opsz 32, -0.035em tracking) paired with a right-aligned #727274 lede, three line-icon tabs with a #0A2A72 active underline (Stays · Flights · Experiences), a hairline-bordered #E6E6E7 four-cell search bar (Where to? · Molde | Dates · Jun 18 – Jun 24 | Travelers · 3 travelers | #00286E fjord-navy Search button), and a square-cornered full-width photo panel absorbing spare viewport height with a 16:9 blue-hour Norwegian fjord still, a 5s looping video overlay, and a bottom-left location chip (\"Geirangerfjord, Norge · 62.10° N\").",
        "tags": [
          "Travel Booking",
          "Single-File HTML",
          "Norwegian Fjord & 4-Cell Search Bar"
        ]
      },
      "zh": {
        "name": "Wander Far",
        "desc": "《Wander far. Rest easy.》单文件自包含单屏杂志风旅行预订首屏模板，采用纯净 #FEFEFE 白底与 1446×1088 参考比例缩放（--u = min(100vw/1446, max(100dvh/1088, .78px))）：配备 90u 双行 Inter Display 700 紧凑大标题（opsz 32，字距 -0.035em）与右对齐 #727274 导语、带 #0A2A72 激活下划线的三项线性图标标签页（Stays · Flights · Experiences）、#E6E6E7 细线分隔四格搜索栏（Where to? · Molde | Dates · Jun 18 – Jun 24 | Travelers · 3 travelers | #00286E 峡湾深蓝 Search 按钮），以及自动填充剩余视口高度的直角全宽摄影面板（含 16:9 挪威峡湾蓝调时刻底图、5 秒静音循环视频叠加层与左下角 \"Geirangerfjord, Norge · 62.10° N\" 坐标铭牌）。",
        "tags": [
          "旅行预订",
          "单文件 HTML",
          "挪威峡湾视频与四格搜索栏"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Gói tải",
          "4 files"
        ],
        [
          "Phạm vi",
          "Giao diện tĩnh một màn hình · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Package",
          "4 files"
        ],
        [
          "Scope",
          "One-screen static interface · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML5 / CSS3 / 原生 JS"
        ],
        [
          "下载包",
          "4 files"
        ],
        [
          "范围",
          "单屏静态界面 · 零构建步骤"
        ]
      ]
    }
  },
  t85: {
    "slug": "murmur",
    "cat": "entertainment",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "murmur",
        "desc": "Hero trang đích một màn hình tự chứa trong một file HTML duy nhất cho chương trình podcast hàng ngày \"murmur\" (\"Daily Murmur Podcast\") với khung cảnh giờ xanh (blue hour) nhìn qua khung cửa sổ căn hộ đẫm mưa, đường chân trời thành phố mờ ảo sắc tím-hồng và tán lá monstera ở hai góc dưới: khung hình 1440×900 co giãn phủ kín màn hình (--u = max(100vw/1440, 100vh/900)), tấm ảnh nền 16:10 khớp chính xác với video lặp 16:9 đệm gương hai bên (rộng 111.11%, left -5.556%) cùng 2 lớp ánh sáng hòa trộn screen (quầng sáng thành phố thở 5.2s và vệt đèn xe quét ngang 7s), chữ tiêu đề Newsreader 500 139px kết hợp Inter 400/500 và IBM Plex Mono 400, thẻ trình phát kính xanh navy 623.5×190 với 62 thanh sóng âm chuyển sắc #5560FF → #86A2FF → #A083FF và hàng 4 biểu tượng nền tảng podcast.",
        "tags": [
          "Podcast hàng ngày",
          "Single-File HTML",
          "Cửa sổ mưa & Sóng âm 62 thanh"
        ]
      },
      "en": {
        "name": "murmur",
        "desc": "A self-contained single-file, one-screen HTML landing hero for the daily podcast \"murmur\" (\"Daily Murmur Podcast\") set at blue hour through a rain-streaked apartment window with a violet-pink city skyline, warm bokeh lights, and lower-corner monstera leaves: authored on a 1440×900 cover-scaled frame (--u = max(100vw/1440, 100vh/900)), a 16:10 background plate aligned with a mirror-padded 16:9 looping video (111.11% width, left -5.556%) and two screen-blended lighting layers (5.2s breathing city bloom and 7s diagonal headlight sweep), a 139px Newsreader 500 wordmark paired with Inter 400/500 and IBM Plex Mono 400, a 623.5×190 deep navy glass player card with a 62-bar breathing waveform (#5560FF → #86A2FF → #A083FF), and a four-icon podcast directory row.",
        "tags": [
          "Daily Podcast",
          "Single-File HTML",
          "Rainy Window & 62-Bar Waveform"
        ]
      },
      "zh": {
        "name": "murmur",
        "desc": "每日播客节目《murmur》（\"Daily Murmur Podcast\"）单文件自包含单屏 HTML 首屏模板，呈现蓝调时刻透过雨痕公寓窗户望向紫粉城市天际线、温暖散景灯光与底角龟背竹叶的静谧电影感：采用 1440×900 覆盖缩放画布（--u = max(100vw/1440, 100vh/900)）、16:10 背景底图与两侧镜像填充 16:9 循环视频精确重合（宽 111.11%、left -5.556%）及两层滤色混合光效（5.2 秒呼吸城市霓虹光晕与 7 秒斜向扫光）、139px Newsreader 500 衬线字标搭配 Inter 400/500 与 IBM Plex Mono 400、623.5×190 深海军蓝毛玻璃播放器卡片（含 #5560FF → #86A2FF → #A083FF 渐变 62 条呼吸音频波形）以及四枚通用播客平台图标栏。",
        "tags": [
          "每日播客",
          "单文件 HTML",
          "雨窗视频与 62 轨音频波形"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Gói tải",
          "4 files"
        ],
        [
          "Phạm vi",
          "Giao diện tĩnh một màn hình · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Package",
          "4 files"
        ],
        [
          "Scope",
          "One-screen static interface · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML5 / CSS3 / 原生 JS"
        ],
        [
          "下载包",
          "4 files"
        ],
        [
          "范围",
          "单屏静态界面 · 零构建步骤"
        ]
      ]
    }
  },
  t84: {
    "slug": "eclipsio",
    "cat": "portfolio",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Eclipsio",
        "desc": "Hero trang đích một khung nhìn tự chứa trong một file HTML duy nhất cho trình tạo trang thương hiệu cá nhân Eclipsio (\"Launch a Personal Brand That Outshines Every Résumé\") trên nền không gian đen tuyệt đối #000000 với nhật thực toàn phần rực sáng vành nhật hoa cam hổ phách: hệ tỷ lệ tham chiếu 1448×1086 (--u = min(100vw/1448, 100dvh/1086)), tấm ảnh nền 1448×1086 neo đáy khớp tuyệt đối với video lặp 1280×720 đệm gương hai bên (aspect-ratio 1930/1086), huy hiệu kính ấm 43.9u viền cam chiếu sáng từ góc dưới trái kèm chấm đào #f7c69b, tiêu đề hai dòng Inter 750 78.8u/81u, bộ đôi nút CTA 55.4u (#f28a2a → #ec7a1c) và dải kính mờ 892×56u chạy marquee vô tận 46 giây với 5 logo đối tác hư cấu dùng Poppins 600.",
        "tags": [
          "Thương hiệu cá nhân",
          "Single-File HTML",
          "Nhật thực & Marquee Kính mờ"
        ]
      },
      "en": {
        "name": "Eclipsio",
        "desc": "A self-contained single-file, one-screen HTML landing hero for the personal-website builder Eclipsio (\"Launch a Personal Brand That Outshines Every Résumé\") set in pure black #000000 space above a blazing amber-orange total solar eclipse: authored on a 1448×1086 reference (--u = min(100vw/1448, 100dvh/1086)) with a bottom-anchored 1448×1086 eclipse plate aligned with a mirror-padded 1280×720 looping video (aspect-ratio 1930/1086), a 43.9u warm-glass badge with a #f7c69b peach dot and lower-left orange rim, a two-line 78.8u/81u Inter 750 headline, 55.4u dual CTA pills (#f28a2a → #ec7a1c), and an 892×56u frosted-glass 46s infinite marquee of five fictional partner logos in Poppins 600.",
        "tags": [
          "Personal Website Builder",
          "Single-File HTML",
          "Solar Eclipse & Glass Marquee"
        ]
      },
      "zh": {
        "name": "Eclipsio",
        "desc": "Eclipsio 个人品牌建站工具（\"Launch a Personal Brand That Outshines Every Résumé\"）单文件自包含单屏 HTML 首屏模板，呈现纯黑 #000000 太空与底部升起的琥珀橙日全食日冕：采用 1448×1086 参考比例（--u = min(100vw/1448, 100dvh/1086)）、底部锚定的 1448×1086 日食底图与两侧镜像填充 1280×720 循环视频精确对齐（aspect-ratio 1930/1086）、带 #f7c69b 发光桃色圆点与左下橙色描边的 43.9u 暖色玻璃徽章、78.8u/81u 双行 Inter 750 主标题、55.4u 双胶囊按钮（#f28a2a → #ec7a1c）以及 892×56u 磨砂玻璃 46 秒无限滚动 Poppins 600 虚构合作伙伴标志条。",
        "tags": [
          "个人品牌建站",
          "单文件 HTML",
          "日全食视频与磨砂跑马灯"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Gói tải",
          "4 files"
        ],
        [
          "Phạm vi",
          "Giao diện tĩnh một màn hình · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Package",
          "4 files"
        ],
        [
          "Scope",
          "One-screen static interface · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML5 / CSS3 / 原生 JS"
        ],
        [
          "下载包",
          "4 files"
        ],
        [
          "范围",
          "单屏静态界面 · 零构建步骤"
        ]
      ]
    }
  },
  t83: {
    "slug": "meadowbell",
    "cat": "entertainment",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Meadowbell",
        "desc": "Hero trang đích tự chứa trong một file HTML duy nhất cho loạt phim hoạt hình nông trại thiếu nhi \"Hollyoak's Plucky Sprout Squad\" của xưởng phim Meadowbell theo phong cách anime vẽ tay nắng chiều: khung hình 1440×1280 (tỷ lệ 9:8, --u = 100vw/1440), ảnh nền đồi cỏ 2160×1920 khớp chính xác với video lặp vuông 960×960 đệm gương (rộng 100%, cao 112.5%, top -6.25%), chữ tiêu đề tròn trịa Grandstander 900 trắng kết hợp Inter 400/500 và nút xanh lá #5b875c, chuỗi hoạt ảnh vào trang bằng Web Animations API, cùng dải 3 thẻ tập phim CHAPTERS mở hộp thoại xem trước tương tác.",
        "tags": [
          "Hoạt hình thiếu nhi",
          "Single-File HTML",
          "Video 9:8 & Web Animations"
        ]
      },
      "en": {
        "name": "Meadowbell",
        "desc": "A self-contained single-file HTML landing hero for the animated kids' farming series \"Hollyoak's Plucky Sprout Squad\" from Meadowbell Studio with a hand-painted sunny anime hillside aesthetic: a 1440×1280 (9:8) frame (--u = 100vw/1440), a 2160×1920 hillside plate aligned pixel-for-pixel with a mirror-padded 960×960 looping video (100% width, 112.5% height, top -6.25%), white Grandstander 900 display type paired with Inter 400/500 and #5b875c button green, a one-shot Web Animations entrance timeline, and a three-card CHAPTERS row with interactive preview modals.",
        "tags": [
          "Animated Kids' Series",
          "Single-File HTML",
          "9:8 Video & Web Animations"
        ]
      },
      "zh": {
        "name": "Meadowbell",
        "desc": "Meadowbell 动画工作室儿童农场动画剧集《Hollyoak's Plucky Sprout Squad》单文件自包含 HTML 首屏模板，呈现阳光手绘吉卜力风山坡午后景致：采用 1440×1280（9:8，--u = 100vw/1440）比例画布、2160×1920 山坡底图与镜像填充 960×960 循环视频精确对齐（宽 100%、高 112.5%、top -6.25%）、纯白 Grandstander 900 标题字体搭配 Inter 400/500 与 #5b875c 绿字胶囊按钮、一次性 Web Animations 入场时间线，以及带交互预览弹窗的三卡片 CHAPTERS 剧集栏。",
        "tags": [
          "儿童农场动画",
          "单文件 HTML",
          "9:8 视频与 Web Animations"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Gói tải",
          "4 files"
        ],
        [
          "Phạm vi",
          "Giao diện tĩnh · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Package",
          "4 files"
        ],
        [
          "Scope",
          "Static interface · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML5 / CSS3 / 原生 JS"
        ],
        [
          "下载包",
          "4 files"
        ],
        [
          "范围",
          "静态界面 · 无需构建步骤"
        ]
      ]
    }
  },
  t82: {
    "slug": "oceanpulse",
    "cat": "education",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "OceanPulse",
        "desc": "Hero toàn màn hình (100svh, không thanh cuộn) tự chứa trong một file HTML duy nhất cho tổ chức phi lợi nhuận bảo tồn biển OceanPulse với phông Plus Jakarta Sans: bố cục 2 cột đồng bộ thứ tự DOM đặc biệt (.hero__media đứng trước .hero__left không tạo stacking context để nút burger z-index 70 nổi trên ngăn kéo menu z-index 60), tiêu đề Saving Oceans, Uniting The Coastline với chữ Oceans, phủ ảnh mặt nước biển xanh sâu, thẻ video rạn san hô từ trên cao kèm 2 điểm chú thích Pure Waters & Coral Bed, cụm mạng xã hội khuyết góc dưới phải và ngăn kéo menu trượt bất đối xứng tự đo độ tương phản nút đóng X.",
        "tags": [
          "Bảo tồn đại dương",
          "Single-File HTML",
          "Video & Menu trượt"
        ]
      },
      "en": {
        "name": "OceanPulse",
        "desc": "A self-contained single-file HTML full-viewport hero (100svh, zero scroll) for the OceanPulse ocean-conservation nonprofit set in Plus Jakarta Sans: a two-column grid with deliberate DOM ordering (.hero__media before stacking-context-free .hero__left so the z-index 70 burger rises above the z-index 60 nav sheet), a Saving Oceans, Uniting The Coastline headline with an image-filled Oceans, highlight, an aerial reef video card with Pure Waters and Coral Bed callout markers, a notched bottom-right social pill and an asymmetric slide-in menu sheet with live burger contrast detection.",
        "tags": [
          "Ocean Conservation",
          "Single-File HTML",
          "Video & Slide Sheet"
        ]
      },
      "zh": {
        "name": "OceanPulse",
        "desc": "采用 Plus Jakarta Sans 字体的 OceanPulse 海洋保护非营利组织单文件自包含 HTML 全屏首屏（100svh 零滚动）：双列网格配合刻意设计的 DOM 顺序（.hero__media 置于不创建层叠上下文的 .hero__left 之前，使 z-index 70 汉堡按钮浮于 z-index 60 导航抽屉之上）、带深海图像填充“Oceans,”高亮的 Saving Oceans, Uniting The Coastline 主标题、含 Pure Waters 与 Coral Bed 标注点的珊瑚礁航拍视频卡片、右下角内凹社交胶囊，以及具备实时 X 按钮对比度检测的非对称侧滑菜单抽屉。",
        "tags": [
          "海洋保护公益",
          "单文件 HTML",
          "航拍视频与侧滑菜单"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Gói tải",
          "4 files"
        ],
        [
          "Phạm vi",
          "Giao diện tĩnh · không cần bước build"
        ]
      ],
      "en": [
        [
          "Format",
          "Single-file HTML5 / CSS3 / Vanilla JS"
        ],
        [
          "Package",
          "4 files"
        ],
        [
          "Scope",
          "Static interface · zero build step"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML5 / CSS3 / 原生 JS"
        ],
        [
          "下载包",
          "4 files"
        ],
        [
          "范围",
          "静态界面 · 无需构建步骤"
        ]
      ]
    }
  },
  t81: {
    "slug": "synapsex",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "SynapseX",
        "desc": "Trang đích đa phân đoạn cho giao diện thần kinh AI tương lai SynapseX trên nền đen #000000 với chữ trắng toàn bộ bằng font Space Mono (kèm chữ chìm TRANSCENDENCE bằng Anton SC), dựng bằng React 18, TypeScript, Vite 6, Tailwind CSS v4 và Framer Motion: video Hero tua tiến/lùi theo chuột ngang (seeked-chained, độ nhạy 0.8), 4 phân đoạn video lặp toàn màn hình, hiệu ứng giải mã ký tự ScrambleIn / ScrambleText (Brain / And Body — One / Network), logo đối xứng xoay 4 chiều SynapseXLogo, thanh điều hướng viên thuốc mở rộng lò xo (48px → 290px), đoạn văn 3D perspective (rotateX 24deg), lưới Performance Metrics (2.4ms, 99.7%, 140B), Adaptive Intelligence 4 cột và Architecture 3 tầng.",
        "tags": [
          "Neural-AI Interface",
          "Mouse-Scrub Video",
          "Space Mono + Motion"
        ]
      },
      "en": {
        "name": "SynapseX",
        "desc": "A multi-section futuristic neural-AI interface landing site for SynapseX on pure black #000000 with Space Mono typography (and an Anton SC TRANSCENDENCE watermark), built with React 18, TypeScript, Vite 6, Tailwind CSS v4 and Framer Motion: a mouse-scrubbed hero video (seeked-chained delta scrubbing at 0.8 sensitivity), four full-viewport looping video sections, ScrambleIn / ScrambleText character decoding (Brain / And Body — One / Network), a 4-fold rotationally symmetric SynapseXLogo, a spring-expanding menu pill (48px → 290px), scroll-driven 3D perspective text (rotateX 24deg), Performance Metrics (2.4ms, 99.7%, 140B), a 4-column Adaptive Intelligence grid and a 3-layer Architecture stack.",
        "tags": [
          "Neural-AI Interface",
          "Mouse-Scrub Video",
          "Space Mono + Motion"
        ]
      },
      "zh": {
        "name": "SynapseX",
        "desc": "基于 React 18、TypeScript、Vite 6、Tailwind CSS v4 与 Framer Motion 构建的未来感神经 AI 接口（SynapseX）纯黑 #000000 多章节着陆页，全站采用 Space Mono 等宽字体与 Anton SC 巨幅 TRANSCENDENCE 径向水印：涵盖鼠标横向拖拽首屏视频（0.8 灵敏度 seeked 链式寻帧）、四段全屏循环视频章节、ScrambleIn / ScrambleText 字符解码标题（Brain / And Body — One / Network）、四重旋转对称 SynapseXLogo、弹簧伸缩菜单胶囊（48px → 290px）、滚动驱动 3D 透视文字（rotateX 24deg）、性能指标（2.4ms、99.7%、140B）、四列自适应智能网格与三层架构卡片。",
        "tags": [
          "神经AI接口",
          "鼠标拖拽视频",
          "Space Mono + 动效"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Framer Motion (kèm built/)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "14 file · 114.4 KB ZIP"
        ],
        [
          "Tương tác & Bố cục",
          "Video Hero tua chuột · ScrambleIn/ScrambleText · 5 phân đoạn + Footer video"
        ]
      ],
      "en": [
        [
          "Format",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Framer Motion (includes built/)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "14 files · 114.4 KB ZIP"
        ],
        [
          "Interaction & Layout",
          "Mouse-scrub hero video · ScrambleIn/ScrambleText · 5 sections + video footer"
        ]
      ],
      "zh": [
        [
          "格式",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Framer Motion（含 built/）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "14 个文件 · 114.4 KB ZIP"
        ],
        [
          "交互与布局",
          "鼠标拖拽首屏视频 · ScrambleIn/ScrambleText · 五大章节 + 视频页脚"
        ]
      ]
    }
  },
  t80: {
    "slug": "cozypaws",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "CozyPaws",
        "desc": "Hero cửa hàng thú cưng CozyPaws một khung nhìn (h-screen, không cuộn) dựng bằng React 18, TypeScript, Vite 6, Tailwind CSS v4, Lucide React và bộ đôi font DM Serif Display + Inter trên nền xanh bạc hà #EFFDF0, xanh đậm #1a3d1a và cam #E86A10: 3 bố cục đáp ứng chuyên biệt (mobile <md, tablet md–lg, desktop lg+), tiêu đề Everything / Your Pets Love nhảy từng từ (.animate-word-pop), thẻ sản phẩm Cozy Cat House ($49.99), thẻ video đánh giá TikTok/YouTube, cụm 3 ảnh thú cưng đáy (flex-1 / flex-[1.265] / flex-1) kèm lớp phủ 98K+, nút Explore Products và điểm 4.6★.",
        "tags": [
          "Pet Store Hero",
          "3-Tier Responsive",
          "Staggered Animations"
        ]
      },
      "en": {
        "name": "CozyPaws",
        "desc": "A viewport-height (h-screen, no scroll) CozyPaws pet store hero built with React 18, TypeScript, Vite 6, Tailwind CSS v4, Lucide React and Google Fonts DM Serif Display + Inter on a light mint #EFFDF0 canvas with #1a3d1a dark green and #E86A10 orange accents: three dedicated responsive layouts (mobile <md, tablet md–lg, desktop lg+), staggered .animate-word-pop Everything / Your Pets Love typography, a floating Cozy Cat House ($49.99) product card, a TikTok/YouTube review video card, and a 3-panel bottom pet gallery (flex-1 / flex-[1.265] / flex-1) with 98K+, Explore Products and 4.6★ overlays.",
        "tags": [
          "Pet Store Hero",
          "3-Tier Responsive",
          "Staggered Animations"
        ]
      },
      "zh": {
        "name": "CozyPaws",
        "desc": "基于 React 18、TypeScript、Vite 6、Tailwind CSS v4、Lucide React 与 Google Fonts DM Serif Display + Inter 构建的 CozyPaws 宠物商店单屏（h-screen 无滚动）首屏：采用 #EFFDF0 浅薄荷绿背景、#1a3d1a 深绿与 #E86A10 活力橙配色，涵盖移动（<md）、平板（md–lg）与桌面（lg+）三套响应式布局、Everything / Your Pets Love 逐词弹跳标题（.animate-word-pop）、Cozy Cat House ($49.99) 商品卡、TikTok/YouTube 测评视频卡，以及带 98K+、Explore Products 与 4.6★ 浮层的底部三栏宠物画廊（flex-1 / flex-[1.265] / flex-1）。",
        "tags": [
          "宠物商店首屏",
          "三端响应式布局",
          "错峰关键帧动效"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Lucide React (kèm built/)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "14 file · 68.0 KB ZIP"
        ],
        [
          "Bố cục & Hoạt ảnh",
          "3 bố cục lg+/md/<md · 9 lớp keyframe 100ms–1200ms · hộp thoại giỏ hàng"
        ]
      ],
      "en": [
        [
          "Format",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Lucide React (includes built/)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "14 files · 68.0 KB ZIP"
        ],
        [
          "Layout & Motion",
          "3 breakpoints lg+/md/<md · 9 keyframes 100ms–1200ms · quick-shop modals"
        ]
      ],
      "zh": [
        [
          "格式",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Lucide React（含 built/）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "14 个文件 · 68.0 KB ZIP"
        ],
        [
          "布局与动效",
          "lg+/md/<md 三端布局 · 9 组 100ms–1200ms 关键帧 · 快速加购弹窗"
        ]
      ]
    }
  },
  t79: {
    "slug": "securify",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "securify",
        "desc": "Hero trang đích SaaS bảo mật dữ liệu (data-security SaaS) toàn màn hình dựng bằng React 18, TypeScript, Vite 6, Tailwind CSS v4 và font Readex Pro (300–700): video nền lặp toàn khung nhìn kèm dải chuyển sắc đen đáy (h-48), thanh điều hướng viên thuốc nổi bg-neutral-900/90 backdrop-blur với logo SVG 4 góc phần tư trắng 256×256 + chữ thường securify, 4 liên kết trung tâm (platform, solutions, company, support) và nút get started trắng, ba chữ tiêu đề khổng lồ xếp lệch toàn chữ thường protect / your / data (.hero-title 14vw/13vw, tracking -0.04em, line-height 0.95) cùng 3 cụm thống kê vạch chéo (+65k startups use, +1.5b gb data was protected, +300k downloads).",
        "tags": [
          "Data Security SaaS",
          "Staggered Typography",
          "Monochrome Video Hero"
        ]
      },
      "en": {
        "name": "securify",
        "desc": "A fullscreen data-security SaaS landing page hero built with React 18, TypeScript, Vite 6, Tailwind CSS v4 and Google Font Readex Pro (300–700): a looping full-viewport background video with a bottom black fade gradient (h-48), floating bg-neutral-900/90 backdrop-blur navbar pills with a custom 256×256 4-quadrant white SVG mark + lowercase securify brand, four desktop nav links (platform, solutions, company, support) and a white get started pill, three giant staggered lowercase .hero-title words (protect / your / data at 14vw/13vw, -0.04em tracking, 0.95 line-height) and three diagonal-divider stat blocks (+65k startups use, +1.5b gb data was protected, +300k downloads).",
        "tags": [
          "Data Security SaaS",
          "Staggered Typography",
          "Monochrome Video Hero"
        ]
      },
      "zh": {
        "name": "securify",
        "desc": "基于 React 18、TypeScript、Vite 6、Tailwind CSS v4 与 Google Font Readex Pro（300–700）构建的全屏数据安全 SaaS 着陆页首屏：配备全屏循环背景视频与底部黑色渐变遮罩（h-48）、bg-neutral-900/90 backdrop-blur 悬浮胶囊导航栏（含 256×256 四象限纯白 SVG 标志与小写 securify 品牌名、platform / solutions / company / support 导航项及白色 get started 按钮）、三组巨幅错落全小写 .hero-title 主标题（protect / your / data，14vw/13vw，字距 -0.04em，行高 0.95）以及三组带 ±20° 斜线分隔的数据指标块（+65k startups use、+1.5b gb data was protected、+300k downloads）。",
        "tags": [
          "数据安全 SaaS",
          "错落大字排印",
          "黑白视频首屏"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Readex Pro (kèm built/)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "14 file · 63.6 KB ZIP"
        ],
        [
          "Bố cục & Tương tác",
          "Tiêu đề xếp lệch protect/your/data · 3 khối số liệu vạch chéo · hộp thoại đơn sắc"
        ]
      ],
      "en": [
        [
          "Format",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Readex Pro (includes built/)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "14 files · 63.6 KB ZIP"
        ],
        [
          "Layout & Interaction",
          "Staggered protect/your/data type · 3 diagonal stat blocks · monochrome modals"
        ]
      ],
      "zh": [
        [
          "格式",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Readex Pro（含 built/）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "14 个文件 · 63.6 KB ZIP"
        ],
        [
          "布局与交互",
          "protect/your/data 错落大字 · 三组斜线统计块 · 单色交互弹窗"
        ]
      ]
    }
  },
  t78: {
    "slug": "lumora",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Lumora",
        "desc": "Hero ứng dụng chánh niệm và tập trung (Mindfulness & Focus) điện ảnh toàn màn hình dựng bằng React 18, TypeScript, Vite 6, Tailwind CSS v4, Lucide React và font Instrument Serif (ital@0;1): 4 video nền lặp toàn khung nhìn (Golden Hour, Still Water, Deep Woods, Quiet Dawn) chuyển cảnh crossfade 1000ms kèm khóa chống bấm dồn 1000ms, lớp phủ PNG cửa sổ tàu hỏa lắc nhẹ liên tục (train-bob 3s, scale 1.03), bề mặt kính lỏng .liquid-glass viền 1.4px, chế độ chữ tối #182C41 tự động khi chọn Deep Woods, ô nhập email Get Early Access, menu di động phân tầng và dải thống kê đáy.",
        "tags": [
          "Mindfulness & Focus",
          "4-Video Crossfade",
          "Liquid Glass UI"
        ]
      },
      "en": {
        "name": "Lumora",
        "desc": "A fullscreen cinematic mindfulness and focus app hero built with React 18, TypeScript, Vite 6, Tailwind CSS v4, Lucide React and Google Font Instrument Serif (ital@0;1): four stacked looping background videos (Golden Hour, Still Water, Deep Woods, Quiet Dawn) with 1000ms crossfade switching and cooldown locking, a continuous train-bob transparent PNG window overlay (3s, scale 1.03), 1.4px masked .liquid-glass pills, automatic 700ms #182C41 dark text mode on Deep Woods, an inline Get Early Access email pill, a staggered mobile overlay menu and bottom community stats.",
        "tags": [
          "Mindfulness & Focus",
          "4-Video Crossfade",
          "Liquid Glass UI"
        ]
      },
      "zh": {
        "name": "Lumora",
        "desc": "基于 React 18、TypeScript、Vite 6、Tailwind CSS v4、Lucide React 与 Google Font Instrument Serif（ital@0;1）构建的全屏电影级正念与专注应用首屏：配备四段全屏循环视频（Golden Hour、Still Water、Deep Woods、Quiet Dawn）1000ms 交叉渐变与冷却防抖锁、持续 3s 轻柔浮动的 train-bob 透明车窗 PNG 叠加层（scale 1.03）、1.4px 遮罩边框 .liquid-glass 液态玻璃胶囊、Deep Woods 场景 700ms #182C41 深色文字模式、Get Early Access 邮箱胶囊、错峰移动端全屏菜单及底部统计栏。",
        "tags": [
          "正念与专注",
          "四视频交叉渐变",
          "液态玻璃界面"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Instrument Serif (kèm built/)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "14 file · 66.9 KB ZIP"
        ],
        [
          "Tương tác",
          "Chuyển 4 cảnh video 1000ms · lớp phủ train-bob · chữ #182C41 ở Deep Woods · menu z-50"
        ]
      ],
      "en": [
        [
          "Format",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Instrument Serif (includes built/)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "14 files · 66.9 KB ZIP"
        ],
        [
          "Interaction",
          "4-scene 1000ms video switcher · train-bob PNG overlay · #182C41 Deep Woods mode · z-50 menu"
        ]
      ],
      "zh": [
        [
          "格式",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Instrument Serif（含 built/）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "14 个文件 · 66.9 KB ZIP"
        ],
        [
          "交互",
          "四场景 1000ms 视频切换 · train-bob 叠加层 · Deep Woods #182C41 模式 · 全屏菜单"
        ]
      ]
    }
  },
  t77: {
    "slug": "neuralkinetics",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "NeuralKinetics",
        "desc": "Hero thẻ ngân hàng số toàn cầu và hệ thống sinh học thần kinh thích ứng tối giản đen-trắng (#ffffff / #000000) dựng bằng React 19, Vite 6, Framer Motion (motion/react), Lucide React, CSS thuần và font Inter (300–600): video nền toàn khung nhìn (80% căn giữa trên mobile, 100% trên desktop 768px+), thanh điều hướng cố định kèm logo SVG hai hình chữ nhật bo góc xoay -35deg, nút Menu viên thuốc đen với icon Plus, cặp nhãn Advanced Bionics / Cognitive AI, cụm Adaptive Systems 4 chấm, tiêu đề hai dòng One Card, Zero / Limits. Worldwide. trên nền gradient trắng, dải telemetry đồng bộ Neuromorphic / AGI / Cybernetics và hộp thoại tương tác See Features & How It Works.",
        "tags": [
          "Digital Banking Card",
          "React 19 + Motion",
          "Minimal Black & White"
        ]
      },
      "en": {
        "name": "NeuralKinetics",
        "desc": "A minimal black-and-white (#ffffff / #000000) global digital banking card and adaptive bionics hero built with React 19, Vite 6, Framer Motion (motion/react), Lucide React, plain CSS and Google Font Inter (300–600): a full-viewport background video (80% centered on mobile, 100% on desktop 768px+), fixed top navbar with a custom -35deg dual-rectangle SVG logo, black Menu pill with Plus icon, Advanced Bionics / Cognitive AI tags pill, 4-dot Adaptive Systems HUD, two-line One Card, Zero / Limits. Worldwide. typography over a white fade-up gradient, live Neuromorphic / AGI / Cybernetics telemetry and interactive See Features & How It Works modals.",
        "tags": [
          "Digital Banking Card",
          "React 19 + Motion",
          "Minimal Black & White"
        ]
      },
      "zh": {
        "name": "NeuralKinetics",
        "desc": "基于 React 19、Vite 6、Framer Motion（motion/react）、Lucide React、纯 CSS 与 Inter（300–600）字体构建的极简黑白（#ffffff / #000000）全球数字银行卡与自适应仿生首屏：配备全屏背景视频（移动端 80% 居中、桌面端 768px+ 100% 铺满）、带 -35deg 双圆角矩形 SVG 标志的固定顶栏、黑色 Menu 胶囊按钮、Advanced Bionics / Cognitive AI 标签胶囊、四点矩阵 Adaptive Systems 面板、白色渐变底栏上的双行 One Card, Zero / Limits. Worldwide. 标题、Neuromorphic / AGI / Cybernetics 实时遥测条及 See Features 与 How It Works 交互弹窗。",
        "tags": [
          "数字银行卡",
          "React 19 + Motion",
          "极简黑白风"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "React 19 + TypeScript + Vite 6 + Framer Motion + Plain CSS (kèm built/)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "14 file · 135.8 KB ZIP"
        ],
        [
          "Tương tác",
          "Chuyển động motion/react [0.16,1,0.3,1] · Menu & Adaptive HUD · 2 Modal + Telemetry"
        ]
      ],
      "en": [
        [
          "Format",
          "React 19 + TypeScript + Vite 6 + Framer Motion + Plain CSS (includes built/)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "14 files · 135.8 KB ZIP"
        ],
        [
          "Interaction",
          "motion/react [0.16,1,0.3,1] choreography · Menu & Adaptive HUD · 2 Modals + Telemetry"
        ]
      ],
      "zh": [
        [
          "格式",
          "React 19 + TypeScript + Vite 6 + Framer Motion + 纯 CSS（含 built/）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "14 个文件 · 135.8 KB ZIP"
        ],
        [
          "交互",
          "motion/react [0.16,1,0.3,1] 动效 · Menu 与自适应面板 · 双弹窗 + 实时遥测"
        ]
      ]
    }
  },
  t76: {
    "slug": "sellix",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Sellix",
        "desc": "Hero tài chính xuyên biên giới (Cross-border finance) một file HTML độc lập trên nền đen #000000: hai thẻ video địa cầu ma trận điểm tím xoay giữa bầu trời sao tự động cross-fade 0.9s mượt mà tại điểm lặp 10s, hệ quy chiếu pixel tham chiếu 1280×800 co giãn tỷ lệ --u, tiêu đề Plus Jakarta Sans 500 hai dòng che mặt nạ (lineRise), cặp nút pill trắng & kính mờ, menu di động góc trên phải và chuỗi hoạt ảnh vào trang tự tháo gỡ sau 1.67s.",
        "tags": [
          "Cross-border Finance",
          "Dual-Video Crossfade",
          "Standalone HTML"
        ]
      },
      "en": {
        "name": "Sellix",
        "desc": "A standalone single-file cross-border finance hero on pure black #000000: two stacked violet dot-matrix Earth videos seamlessly cross-fading over 0.9s at the 10s loop point, a 1280×800 reference-pixel --u proportional scaling system, a two-line masked Plus Jakarta Sans 500 headline (lineRise), paired white and frosted-glass CTA pills, a top-right mobile menu panel and a self-detaching 1.67s entrance sequence.",
        "tags": [
          "Cross-border Finance",
          "Dual-Video Crossfade",
          "Standalone HTML"
        ]
      },
      "zh": {
        "name": "Sellix",
        "desc": "纯黑 #000000 单文件跨境金融（Cross-border finance）全屏首屏模板：双层紫色点阵地球星空视频在 10 秒循环点自动进行 0.9 秒无缝交叉淡入淡出，采用 1280×800 参考像素 --u 比例缩放系统、Plus Jakarta Sans 500 双行遮罩上浮主标题（lineRise）、纯白与磨砂玻璃双胶囊按钮、右上角移动端磨砂菜单及 1.67 秒完成后自动卸载的入场动效。",
        "tags": [
          "跨境金融",
          "双视频无缝循环",
          "单文件 HTML"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "1 file index.html độc lập (HTML5 + CSS --u + 3 khối JS inline)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "4 file · 11.5 KB ZIP"
        ],
        [
          "Tương tác",
          "Cross-fade 2 video 0.9s · chuỗi entrance 1.67s tự tháo gỡ · menu <=1160px"
        ]
      ],
      "en": [
        [
          "Format",
          "Single standalone index.html (HTML5 + CSS --u + 3 inline JS blocks)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "4 files · 11.5 KB ZIP"
        ],
        [
          "Interaction",
          "0.9s dual-video loop crossfade · self-detaching 1.67s entrance · <=1160px menu"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件独立 index.html（HTML5 + CSS --u + 3 段内联 JS）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "4 个文件 · 11.5 KB ZIP"
        ],
        [
          "交互",
          "0.9s 双视频循环渐变 · 1.67s 自动清理入场动效 · <=1160px 移动菜单"
        ]
      ]
    }
  },
  t75: {
    "slug": "camper",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Camper",
        "desc": "Hero trại qua đêm mùa đông dưới ánh trăng một file HTML độc lập: sân khấu video lặp 1280×960 tự co giãn tỷ lệ --u qua 3 chế độ JS (exact, tablet, compact), tiêu đề serif Gelasio 700 hai tầng Overnight / Camp, hệ chữ Outfit trắng, gạch chân mục đang chọn #7e80d7, nút Sign up viền vuông, CTA Explore màu cam #ec4f30, ngăn kéo mờ bên phải trên tablet/mobile và chuỗi hoạt ảnh vào trang bằng Web Animations API.",
        "tags": [
          "Overnight Camp",
          "3-Mode Stage --u",
          "Standalone HTML"
        ]
      },
      "en": {
        "name": "Camper",
        "desc": "A standalone single-file overnight camp hero section: a 1280×960 moonlit winter camp video stage scaled proportionally via --u across three JS layout modes (exact, tablet, compact), stacked Gelasio 700 Overnight / Camp serif typography, white Outfit UI, a #7e80d7 active nav underline, square-bordered Sign up button, #ec4f30 orange Explore CTA, frosted right drawer on tablet/mobile and a one-shot Web Animations API entrance.",
        "tags": [
          "Overnight Camp",
          "3-Mode Stage --u",
          "Standalone HTML"
        ]
      },
      "zh": {
        "name": "Camper",
        "desc": "单文件月夜冬季露营全屏首屏模板：基于 JS 三模式（exact、tablet、compact）与 --u 比例缩放的 1280×960 篝火雪山木屋循环视频舞台，搭配 Gelasio 700 双行衬线标题 Overnight / Camp、白色 Outfit 界面、#7e80d7 激活导航下划线、直角边框 Sign up 按钮、#ec4f30 橙色 Explore 按钮、平板/移动端右侧磨砂抽屉及 Web Animations API 入场动效。",
        "tags": [
          "过夜露营",
          "三模式比例缩放",
          "单文件 HTML"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "1 file index.html độc lập (HTML5 + CSS --u + Vanilla JS WAAPI)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "4 file · 11.0 KB ZIP"
        ],
        [
          "Tương tác",
          "3 chế độ exact/tablet/compact · ngăn kéo mờ · WAAPI entrance"
        ]
      ],
      "en": [
        [
          "Format",
          "Single standalone index.html (HTML5 + CSS --u + Vanilla JS WAAPI)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "4 files · 11.0 KB ZIP"
        ],
        [
          "Interaction",
          "3-mode exact/tablet/compact engine · frosted drawer · WAAPI entrance"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件独立 index.html（HTML5 + CSS --u + 原生 JS WAAPI）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "4 个文件 · 11.0 KB ZIP"
        ],
        [
          "交互",
          "exact/tablet/compact 三模式引擎 · 右侧磨砂抽屉 · WAAPI 入场"
        ]
      ]
    }
  },
  t74: {
    "slug": "viktor",
    "cat": "portfolio",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Viktor.",
        "desc": "Hero portfolio sáng tạo toàn màn hình dựng bằng React 18, TypeScript, Vite 6, Tailwind CSS v4 và font Figtree: ba video nền lặp xếp chồng chuyển cảnh crossfade 1200ms kèm nạp trước blob URL, thanh điều hướng đánh số 01–04 với gạch chân trượt từ phải, đồng hồ 24h CUP trực tiếp, chấm trạng thái phát sáng hồng #F598F2 / trắng theo cảnh, chữ Viktor. khổng lồ 200px và nút start a project điền màu hồng từ dưới lên.",
        "tags": [
          "Creative Portfolio",
          "3-Video Crossfade",
          "React + Tailwind v4"
        ]
      },
      "en": {
        "name": "Viktor.",
        "desc": "A full-screen creative portfolio hero section built with React 18, TypeScript, Vite 6, Tailwind CSS v4 and Google Font Figtree: three stacked looping background videos with 1200ms crossfade switching and blob URL preloading, an indexed 01–04 navbar with right-origin scaleX underlines, a live 24-hour CUP clock, a scene-synced #F598F2 pink/white pulsing availability badge, 200px Viktor. typography and a bottom-fill start a project button.",
        "tags": [
          "Creative Portfolio",
          "3-Video Crossfade",
          "React + Tailwind v4"
        ]
      },
      "zh": {
        "name": "Viktor.",
        "desc": "基于 React 18、TypeScript、Vite 6、Tailwind CSS v4 与 Figtree 字体构建的全屏创意作品集首屏：三段全屏循环视频叠加支持 1200ms 交叉淡入淡出切换与 Blob URL 预加载，配备 01–04 编号导航与右侧滑入下划线、实时 24 小时 CUP 时钟、随场景切换 #F598F2 粉色/白色光晕的脉冲状态圆点、200px Viktor. 巨幅标题与自下而上填充粉色的 start a project 按钮。",
        "tags": [
          "创意作品集",
          "三视频交叉渐变",
          "React + Tailwind v4"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Figtree (kèm built/)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "16 file · 67.1 KB ZIP"
        ],
        [
          "Tương tác",
          "Chuyển 3 cảnh video 1200ms · đồng hồ CUP 24h · menu Grid 0fr/1fr · nút fill #F598F2"
        ]
      ],
      "en": [
        [
          "Format",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Figtree (includes built/)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "16 files · 67.1 KB ZIP"
        ],
        [
          "Interaction",
          "3-video 1200ms crossfade · live 24h CUP clock · 0fr/1fr Grid menu · #F598F2 fill CTA"
        ]
      ],
      "zh": [
        [
          "格式",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Figtree（含 built/）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "16 个文件 · 67.1 KB ZIP"
        ],
        [
          "交互",
          "三视频 1200ms 交叉切换 · 24h 实时时钟 · 0fr/1fr 移动菜单 · #F598F2 填充按钮"
        ]
      ]
    }
  },
  t73: {
    "slug": "cinematic",
    "cat": "entertainment",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Cinematic",
        "desc": "Hero phim ảnh & streaming toàn màn hình dựng bằng React 18, TypeScript, Vite 6, Tailwind CSS v4 và Lucide React: nền video lặp tự động cố định ở z-index 0 kèm lớp phủ làm mờ đáy backdrop-blur-xl dùng mặt nạ tuyến tính (linear-gradient to top 0%–45%, không phủ tối màu), hệ nút kính lỏng .liquid-glass với viền sáng 1.4px mask-composite, hoạt ảnh .animate-blur-fade-up phân tầng 0ms–900ms, menu thả xuống di động và bộ nút Previous / Next chuyển tác phẩm.",
        "tags": [
          "Phim & Streaming",
          "Liquid Glass",
          "React + Tailwind v4"
        ]
      },
      "en": {
        "name": "Cinematic",
        "desc": "A full-viewport movie and streaming hero section built with React 18, TypeScript, Vite 6, Tailwind CSS v4 and Lucide React: a fixed looping video background at z-index 0 paired with a bottom-masked backdrop-blur-xl overlay (linear-gradient to top 0%–45%, no dark gradient), .liquid-glass buttons with a 1.4px mask-composite glowing stroke, staggered 0ms–900ms .animate-blur-fade-up reveals, a mobile dropdown and interactive Previous / Next showcase switching.",
        "tags": [
          "Movie & Streaming",
          "Liquid Glass",
          "React + Tailwind v4"
        ]
      },
      "zh": {
        "name": "Cinematic",
        "desc": "基于 React 18、TypeScript、Vite 6、Tailwind CSS v4 与 Lucide React 构建的全屏电影流媒体首屏：z-index 0 固定全屏循环视频搭配底部 0%–45% 线性遮罩的 backdrop-blur-xl 模糊层（无暗化渐变），配备带 1.4px mask-composite 发光描边的 .liquid-glass 液态玻璃按钮、0ms–900ms 阶梯式 .animate-blur-fade-up 模糊上浮动画、移动端下拉菜单与 Previous / Next 剧集切换。",
        "tags": [
          "影视流媒体",
          "液态玻璃",
          "React + Tailwind v4"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Lucide React (kèm built/)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "15 file · 83.7 KB ZIP"
        ],
        [
          "Tương tác",
          "Nút .liquid-glass · blurFadeUp 0ms–900ms · Previous/Next · menu di động <lg"
        ]
      ],
      "en": [
        [
          "Format",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Lucide React (includes built/)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "15 files · 83.7 KB ZIP"
        ],
        [
          "Interaction",
          ".liquid-glass pills · 0ms–900ms blurFadeUp · Previous/Next · mobile menu <lg"
        ]
      ],
      "zh": [
        [
          "格式",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Lucide React（含 built/）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "15 个文件 · 83.7 KB ZIP"
        ],
        [
          "交互",
          ".liquid-glass 液态玻璃 · 0ms–900ms blurFadeUp · Previous/Next · <lg 移动菜单"
        ]
      ]
    }
  },
  t72: {
    "slug": "designpro",
    "cat": "education",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "DesignPro",
        "desc": "Hero toàn màn hình cho nền tảng đào tạo thiết kế sản phẩm dựng bằng React 18, TypeScript, Vite 6, Tailwind CSS v4, Framer Motion và Lucide React: nền video lặp tự động trên nền đen #000000, logo tròn viền trắng 2px kèm thanh điều hướng viên thuốc (border-gray-700), khối giới thiệu 2 cột (8000+ Talented Designers Launched !), tiêu đề lớn Inter (text-5xl tới xl:text-9xl, leading-[0.85]) kết hợp component ShinyText quét dải sáng #64CEFB → #ffffff góc 100° chu kỳ 3 giây và hộp thoại đăng ký khóa học.",
        "tags": [
          "Đào tạo Thiết kế",
          "ShinyText + Framer Motion",
          "React + Tailwind v4"
        ]
      },
      "en": {
        "name": "DesignPro",
        "desc": "A full-screen hero section for a product design education platform built with React 18, TypeScript, Vite 6, Tailwind CSS v4, Framer Motion and Lucide React: a looping full-bleed video background on #000000, a 2px white circular brand mark and rounded pill navbar (border-gray-700), a two-column mission & 8000+ alumni sub-header, an oversized Inter headline (text-5xl to xl:text-9xl, leading-[0.85]) with a continuous 3s 100° ShinyText sweep (#64CEFB to #ffffff) and an interactive enrollment dialog.",
        "tags": [
          "Design Education",
          "ShinyText + Framer Motion",
          "React + Tailwind v4"
        ]
      },
      "zh": {
        "name": "DesignPro",
        "desc": "基于 React 18、TypeScript、Vite 6、Tailwind CSS v4、Framer Motion 与 Lucide React 构建的产品设计教育平台全屏首屏：纯黑 #000000 背景搭配全屏自动循环视频、2px 白色双环标志与胶囊导航栏（border-gray-700）、双列使命与 8000+ 学员数据副标、配备 3 秒 100° 连续左向右流光渐变组件 ShinyText（#64CEFB 至 #ffffff）的超大号 Inter 主标题及报名弹窗。",
        "tags": [
          "设计教育平台",
          "ShinyText + Framer Motion",
          "React + Tailwind v4"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Framer Motion + Lucide React (kèm built/)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "16 file · 127.8 KB ZIP"
        ],
        [
          "Tương tác",
          "ShinyText 100° 3s liên tục · hộp thoại đăng ký khóa học · menu di động <lg"
        ]
      ],
      "en": [
        [
          "Format",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Framer Motion + Lucide React (includes built/)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "16 files · 127.8 KB ZIP"
        ],
        [
          "Interaction",
          "Continuous 3s 100° ShinyText sweep · enrollment modal · mobile menu <lg"
        ]
      ],
      "zh": [
        [
          "格式",
          "React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Framer Motion + Lucide React（含 built/）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "16 个文件 · 127.8 KB ZIP"
        ],
        [
          "交互",
          "3 秒 100° ShinyText 流光渐变 · 课程报名弹窗 · <lg 移动菜单"
        ]
      ]
    }
  },
  t71: {
    "slug": "prmpt",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "prmpt",
        "desc": "Landing page thời trang lưu trữ (archive fashion) toàn màn hình điều khiển theo cuộn dựng bằng React 19, TypeScript, Vite 6, Tailwind CSS v4, GSAP 3.15 ScrollTrigger và Motion 12: giai đoạn Hero với hai video chân dung đối xứng tua theo tọa độ chuột ngang (kèm vùng đệm ±50px ở tâm), con trỏ tùy chỉnh cùng chữ mix-blend-mode: exclusion, tấm nền đen trượt lên mở lưới 10 ảnh sản phẩm rải rác co giãn theo khung nhìn và màn kết trắng với nút view.",
        "tags": [
          "Thời trang Archive",
          "GSAP ScrollTrigger",
          "React 19 + Tailwind v4"
        ]
      },
      "en": {
        "name": "prmpt",
        "desc": "A full-screen scroll-driven fashion archive landing page built with React 19, TypeScript, Vite 6, Tailwind CSS v4, GSAP 3.15 ScrollTrigger and Motion 12: a dual-video Hero phase scrubbed horizontally by cursor position (with a ±50px center dead zone), exclusion-blended SVG wordmark, custom cursor and randomized symbol badge, a sliding black gallery panel with 10 deterministic scattered product cards scaling on enter/exit, and a white outro overlay with a view CTA.",
        "tags": [
          "Fashion Archive",
          "GSAP ScrollTrigger",
          "React 19 + Tailwind v4"
        ]
      },
      "zh": {
        "name": "prmpt",
        "desc": "基于 React 19、TypeScript、Vite 6、Tailwind CSS v4、GSAP 3.15 ScrollTrigger 与 Motion 12 构建的全屏滚动驱动先锋时装档案着陆页：首屏搭载随鼠标水平位置双向拖拽的双人物视频（含中心 ±50px 缓冲死区）、exclusion 差值混合 SVG 标志、自定义光标与随机符号徽章，向下滚动升起黑色画廊面板呈现 10 张交错进出缩放单品卡片，并以白色谢幕遮罩与 view 按钮收尾。",
        "tags": [
          "时装档案",
          "GSAP ScrollTrigger",
          "React 19 + Tailwind v4"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + GSAP 3.15 + Motion 12 (kèm built/)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "15 file · 198.0 KB ZIP"
        ],
        [
          "Tương tác",
          "Tua 2 video theo chuột X (±50px dead zone) · lưới 10 ảnh GSAP ScrollTrigger · màn kết outro"
        ]
      ],
      "en": [
        [
          "Format",
          "React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + GSAP 3.15 + Motion 12 (includes built/)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "15 files · 198.0 KB ZIP"
        ],
        [
          "Interaction",
          "Dual-video X-axis cursor scrub (±50px dead zone) · 10-card GSAP gallery · outro reveal"
        ]
      ],
      "zh": [
        [
          "格式",
          "React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + GSAP 3.15 + Motion 12（含 built/）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "15 个文件 · 198.0 KB ZIP"
        ],
        [
          "交互",
          "双视频鼠标横向拖拽（±50px 死区）· 10 卡 GSAP 滚动缩放画廊 · 谢幕转场"
        ]
      ]
    }
  },
  t70: {
    "slug": "halden",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Halden",
        "desc": "Hero thương hiệu du lịch thám hiểm tự chứa trong một file HTML duy nhất (CSS + JS thuần, không bước build): thanh điều hướng 76px với hộp thả xuống kính mờ biến hình kích thước mượt (Discover 664×358, Journeys 446×308, Regions 232×218), lưới ảnh thám hiểm tự đổi khi di chuột, cảnh bình minh băng giá toàn màn hình và ngăn kéo điều hướng di động.",
        "tags": [
          "Du lịch thám hiểm",
          "Morphing Dropdown",
          "HTML / CSS / JS thuần"
        ]
      },
      "en": {
        "name": "Halden",
        "desc": "A standalone single-file expedition travel hero (vanilla HTML, CSS and JS, no build step): a 76px top bar with a dimension-morphing glassmorphic dropdown (Discover 664×358, Journeys 446×308, Regions 232×218), hover-swapping photography previews, a full-bleed glacial sunrise backdrop and a responsive mobile drawer.",
        "tags": [
          "Expedition Travel",
          "Morphing Dropdown",
          "Vanilla HTML / CSS / JS"
        ]
      },
      "zh": {
        "name": "Halden",
        "desc": "单文件自包含探险旅行品牌首屏（原生 HTML、CSS 与 JS，无需构建）：配备 76px 顶栏与尺寸平滑变形毛玻璃下拉菜单（Discover 664×358、Journeys 446×308、Regions 232×218）、悬停切换探险摄影预览、满版冰川日出主视觉及响应式移动抽屉菜单。",
        "tags": [
          "探险旅行",
          "变形下拉菜单",
          "原生 HTML / CSS / JS"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "Một file index.html tự chứa (HTML + CSS + JS thuần, không cần build)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "4 file · 13.7 KB ZIP"
        ],
        [
          "Tương tác",
          "Hộp thả xuống biến hình 3 khung · đổi ảnh khi hover · ngăn kéo mobile <=860px"
        ]
      ],
      "en": [
        [
          "Format",
          "Single self-contained index.html (inline CSS + JS, no build step)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "4 files · 13.7 KB ZIP"
        ],
        [
          "Interaction",
          "3-panel morphing dropdown · hover photo swap · mobile sheet <=860px"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件自包含 index.html（内联 CSS + JS，无需构建）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "4 个文件 · 13.7 KB ZIP"
        ],
        [
          "交互",
          "三面板变形下拉框 · 悬停换图 · <=860px 移动抽屉"
        ]
      ]
    }
  },
  t69: {
    "slug": "vectrus-energy",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Vectrus Energy",
        "desc": "Landing page điện ảnh một trang điều khiển video theo vị trí cuộn (500vh sticky scene) dựng bằng React 18, TypeScript, Vite, Tailwind CSS và MP4Box WebCodecs: giải mã khung hình vào bộ nhớ đệm LRU 24 ImageBitmap trên canvas 1920×1080 kèm nội suy LERP mượt, 3 phân cảnh chữ tuần tự (Helvetica Neue ME), thanh điều hướng tự đảo màu tại p > 0.55 và menu di động toàn màn hình.",
        "tags": [
          "WebCodecs + MP4Box",
          "Scroll-Tied Video",
          "React + Vite"
        ]
      },
      "en": {
        "name": "Vectrus Energy",
        "desc": "A standalone scroll-tied video landing page (500vh sticky scene) built with React 18, TypeScript, Vite, Tailwind CSS and MP4Box WebCodecs: frame-bank decoding into a 24-slot ImageBitmap LRU cache painted onto a 1920×1080 canvas with exponential LERP scrubbing, three sequential Helvetica Neue ME text sections, a p > 0.55 adaptive navbar and a full-screen mobile menu.",
        "tags": [
          "WebCodecs + MP4Box",
          "Scroll-Tied Video",
          "React + Vite"
        ]
      },
      "zh": {
        "name": "Vectrus Energy",
        "desc": "基于 React 18、TypeScript、Vite、Tailwind CSS 与 MP4Box WebCodecs 构建的滚动驱动视频单页（500vh 粘性视口）：将视频帧解码至 24 槽位 ImageBitmap LRU 缓存并配合指数 LERP 平滑绘制到 1920×1080 画布，包含三段顺序渐隐 Helvetica Neue ME 文案、p > 0.55 自动反色导航栏及全屏移动端菜单。",
        "tags": [
          "WebCodecs + MP4Box",
          "滚动驱动视频",
          "React + Vite"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "React 18 + TypeScript + Vite + Tailwind CSS + mp4box + lucide-react (kèm built/)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "19 file · 132.5 KB ZIP"
        ],
        [
          "Cơ chế cuộn",
          "500vh sticky track · WebCodecs + MP4Box frame bank · LERP_TAU = 8"
        ]
      ],
      "en": [
        [
          "Format",
          "React 18 + TypeScript + Vite + Tailwind CSS + mp4box + lucide-react (with built/)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "19 files · 132.5 KB ZIP"
        ],
        [
          "Scroll engine",
          "500vh sticky track · WebCodecs + MP4Box frame bank · LERP_TAU = 8"
        ]
      ],
      "zh": [
        [
          "格式",
          "React 18 + TypeScript + Vite + Tailwind CSS + mp4box + lucide-react（附 built/）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "19 个文件 · 132.5 KB ZIP"
        ],
        [
          "滚动引擎",
          "500vh 粘性轨道 · WebCodecs + MP4Box 帧缓存 · LERP_TAU = 8"
        ]
      ]
    }
  },
  t68: {
    "slug": "toonhub",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "TOONHUB",
        "desc": "Hero trưng bày mô hình nhân vật 3D toàn màn hình dựng bằng React 18, TypeScript, Vite, Tailwind CSS và lucide-react: vòng xoay 4 vị trí có độ sâu trường ảnh (center, left, right, back), nền đổi màu đồng bộ 650ms (#F4845F, #6BBF7A, #E882B4, #6EB5FF), chữ nền khổng lồ 3D SHAPE (Anton) và lớp phủ hạt phim SVG.",
        "tags": [
          "React + Vite",
          "3D Figurine",
          "Depth Carousel"
        ]
      },
      "en": {
        "name": "TOONHUB",
        "desc": "A full-viewport 3D character figurine carousel hero built with React 18, TypeScript, Vite, Tailwind CSS and lucide-react: four-role depth-of-field staging (center, left, right, back), synchronized 650ms palette transitions (#F4845F, #6BBF7A, #E882B4, #6EB5FF), giant Anton 3D SHAPE backdrop and SVG fractal-noise grain.",
        "tags": [
          "React + Vite",
          "3D Figurine",
          "Depth Carousel"
        ]
      },
      "zh": {
        "name": "TOONHUB",
        "desc": "基于 React 18、TypeScript、Vite、Tailwind CSS 与 lucide-react 构建的全屏 3D 潮玩手办轮播首屏：四位置景深舞台（center、left、right、back）、650ms 同步背景色切换（#F4845F、#6BBF7A、#E882B4、#6EB5FF）、Anton 巨型 3D SHAPE 背景字与 SVG 颗粒遮罩。",
        "tags": [
          "React + Vite",
          "3D 手办",
          "景深轮播"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "React 18 + TypeScript + Vite + Tailwind CSS + lucide-react (kèm built/)"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "17 file · 87.8 KB ZIP"
        ],
        [
          "Chuyển động",
          "Xoay 4 vị trí (center/left/right/back) · 650ms cubic-bezier(0.4,0,0.2,1)"
        ]
      ],
      "en": [
        [
          "Format",
          "React 18 + TypeScript + Vite + Tailwind CSS + lucide-react (with built/)"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "17 files · 87.8 KB ZIP"
        ],
        [
          "Motion",
          "4-role depth carousel · 650ms cubic-bezier(0.4,0,0.2,1)"
        ]
      ],
      "zh": [
        [
          "格式",
          "React 18 + TypeScript + Vite + Tailwind CSS + lucide-react（附 built/）"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "17 个文件 · 87.8 KB ZIP"
        ],
        [
          "动态",
          "四位置景深轮播 · 650ms cubic-bezier(0.4,0,0.2,1)"
        ]
      ]
    }
  },
  t67: {
    "slug": "nexlayer",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "NexLayer",
        "desc": "Landing page hạ tầng AI tối màu theo lưới tham chiếu 1487×1058: biểu tượng tia chớp SVG chuyển sắc kim loại, chữ Manrope sắc nét, video cổng ánh sáng toàn khung nhìn kèm lớp mờ đáy/cạnh, cặp CTA pill trắng và dải 4 logo đối tác. Một file HTML tự chứa kèm menu kính mờ trên di động.",
        "tags": [
          "HTML tự chứa",
          "AI Infrastructure",
          "Looping Video"
        ]
      },
      "en": {
        "name": "NexLayer",
        "desc": "A dark cinematic AI-infrastructure landing page locked to a 1487×1058 reference grid: metallic angular S-bolt SVG mark, Manrope typography, full-bleed portal video with measured bottom and letterbox fades, white pill CTAs and a four-mark partner strip. Self-contained single HTML with a frosted mobile menu.",
        "tags": [
          "Single HTML",
          "AI Infrastructure",
          "Looping Video"
        ]
      },
      "zh": {
        "name": "NexLayer",
        "desc": "基于 1487×1058 参考画布构建的深色电影感 AI 基础设施着陆页：金属渐变闪电 S 标志、Manrope 字体排印、带底部与两侧渐变的满版光门循环视频、白色胶囊按钮及四枚合作伙伴标志。单文件自包含 HTML，配备移动端毛玻璃菜单。",
        "tags": [
          "单文件HTML",
          "AI 基础设施",
          "循环视频"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "1 file HTML tự chứa · CSS/JS nội tuyến · không cần build"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "4 file · 12.2 KB ZIP"
        ],
        [
          "Hệ tọa độ",
          "Khung 1487×1058 (--u / --h) + bố cục dọc portrait (--m)"
        ]
      ],
      "en": [
        [
          "Format",
          "Single HTML · inline CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "4 files · 12.2 KB ZIP"
        ],
        [
          "Grid",
          "1487×1058 (--u / --h) desktop + portrait flow (--m)"
        ]
      ],
      "zh": [
        [
          "格式",
          "单文件 HTML · 内联 CSS/JS · 无需构建"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "4 个文件 · 12.2 KB ZIP"
        ],
        [
          "网格系统",
          "1487×1058 (--u / --h) 桌面端 + 竖屏流式布局 (--m)"
        ]
      ]
    }
  },
  t66: {
    "slug": "aethera",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Aethera",
        "desc": "Hero điện ảnh một trang với chữ Instrument Serif + Inter, hiệu ứng fade-rise tuần tự, nền video lặp mượt bằng requestAnimationFrame (fade-in/fade-out 0.5s, nghỉ 100ms khi ended), lớp phủ chuyển sắc trắng và hộp thoại đăng ký kính mờ. Dựng bằng React + Vite + Tailwind CSS + TypeScript kèm bản dựng sẵn trong built/.",
        "tags": [
          "React + TypeScript",
          "Looping Video Hero",
          "Instrument Serif"
        ]
      },
      "en": {
        "name": "Aethera",
        "desc": "A single-page cinematic hero pairing Instrument Serif and Inter typography, staggered fade-rise animations, a custom requestAnimationFrame fade-in/fade-out video loop (0.5s fades, 100ms reset on ended), white gradient overlays and a glassmorphic inquiry modal. Built with React + Vite + Tailwind CSS + TypeScript with a prebuilt snapshot in built/.",
        "tags": [
          "React + TypeScript",
          "Looping Video Hero",
          "Instrument Serif"
        ]
      },
      "zh": {
        "name": "Aethera",
        "desc": "单页电影感首屏模板，采用 Instrument Serif 与 Inter 字体排印、阶梯式 fade-rise 动效、基于 requestAnimationFrame 的自定义淡入淡出循环视频（0.5 秒过渡、播放结束 100 毫秒重置）、白色渐变遮罩与毛玻璃咨询弹窗。基于 React + Vite + Tailwind CSS + TypeScript 构建，附带 built/ 预构建静态文件。",
        "tags": [
          "React + TypeScript",
          "循环视频首屏",
          "Instrument Serif"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Định dạng",
          "React 18 · Vite · Tailwind CSS · TypeScript"
        ],
        [
          "Phiên bản",
          "1.0.0"
        ],
        [
          "Gói tải",
          "19 file · nguồn + built/ · 89 KB ZIP"
        ],
        [
          "Hiệu ứng",
          "Loop video fade 0.5s · fade-rise · modal kính mờ"
        ]
      ],
      "en": [
        [
          "Format",
          "React 18 · Vite · Tailwind CSS · TypeScript"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Package",
          "19 files · source + built/ · 89 KB ZIP"
        ],
        [
          "Motion",
          "0.5s fade video loop · fade-rise · glass modal"
        ]
      ],
      "zh": [
        [
          "格式",
          "React 18 · Vite · Tailwind CSS · TypeScript"
        ],
        [
          "版本",
          "1.0.0"
        ],
        [
          "下载包",
          "19 个文件 · 源码 + built/ · 89 KB ZIP"
        ],
        [
          "动效",
          "0.5秒淡入淡出视频循环 · fade-rise · 毛玻璃弹窗"
        ]
      ]
    }
  },
  t65: {
    "slug": "cyber-ronin",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Cyber Ronin",
        "desc": "Hero cyberpunk cam/kem với spotlight theo chuột hoặc cảm ứng để hé lộ cảnh thay thế, chữ xuất hiện tuần tự, thẻ sản phẩm kính mờ và thông số. Một HTML tự chứa; ảnh/font tải ngoài. Reserve Now và các nút icon là giao diện demo.",
        "tags": [
          "HTML tự chứa",
          "Spotlight Reveal",
          "Cyberpunk"
        ]
      },
      "en": {
        "name": "Cyber Ronin",
        "desc": "An orange-and-cream cyberpunk hero with mouse/touch spotlight revealing an alternate scene, staggered type, glass product card and specs. One self-contained HTML; remote images/fonts. Reserve Now and icon controls are presentation-only.",
        "tags": [
          "Single HTML",
          "Spotlight Reveal",
          "Cyberpunk"
        ]
      },
      "zh": {
        "name": "Cyber Ronin",
        "desc": "橙色与奶油色赛博朋克首屏，鼠标/触摸聚光灯揭示另一场景，搭配逐词动画、玻璃产品卡及参数。单个HTML；图片与字体从外部加载。Reserve Now和图标按钮仅作展示。",
        "tags": [
          "单文件HTML",
          "聚光灯揭示",
          "赛博朋克"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Format",
          "Single HTML · inline CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Assets",
          "Remote images and fonts"
        ],
        [
          "Scope",
          "Hero cyberpunk cam/kem với spotlight theo chuột hoặc cảm ứng để hé lộ cảnh thay thế, chữ xuất hiện tuần tự, thẻ sản phẩm kính mờ và thông số. Một HTML tự chứa; ảnh/font tải ngoài. Reserve Now và các nút icon là giao diện demo."
        ]
      ],
      "en": [
        [
          "Format",
          "Single HTML · inline CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Assets",
          "Remote images and fonts"
        ],
        [
          "Scope",
          "An orange-and-cream cyberpunk hero with mouse/touch spotlight revealing an alternate scene, staggered type, glass product card and specs. One self-contained HTML; remote images/fonts. Reserve Now and icon controls are presentation-only."
        ]
      ],
      "zh": [
        [
          "Format",
          "Single HTML · inline CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Assets",
          "Remote images and fonts"
        ],
        [
          "Scope",
          "橙色与奶油色赛博朋克首屏，鼠标/触摸聚光灯揭示另一场景，搭配逐词动画、玻璃产品卡及参数。单个HTML；图片与字体从外部加载。Reserve Now和图标按钮仅作展示。"
        ]
      ]
    }
  },
  t64: {
    "slug": "veyra",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "VEYRA",
        "desc": "Design study xe điện tương tác theo release v1.0.0 của Amir Mušić: video mở nắp capo/reveal pin, hai cutaway, năm màu sơn và ba kiểu bánh. React/TypeScript/Vite, nguồn MIT và 18 media gốc kèm built/. Giữ các hạn chế focus và chạm chú thích của bản gốc.",
        "tags": [
          "React + TypeScript",
          "Video Hotspots",
          "MIT Source"
        ]
      },
      "en": {
        "name": "VEYRA",
        "desc": "Amir Mušić’s v1.0.0 electric-vehicle design study: hood/battery hover films, two cutaways, five paints and three wheels. React/TypeScript/Vite, MIT source, 18 original media files and built/ output. Preserves upstream focus and phone annotation limits.",
        "tags": [
          "React + TypeScript",
          "Video Hotspots",
          "MIT Source"
        ]
      },
      "zh": {
        "name": "VEYRA",
        "desc": "Amir Mušić 的v1.0.0电动车交互设计研究：引擎盖/电池悬停视频、两个剖视图、五种车色与三款轮毂。React/TypeScript/Vite，MIT源码、18个原始媒体及built/版本。保留原版焦点及手机注释点击限制。",
        "tags": [
          "React + TypeScript",
          "视频热点",
          "MIT源码"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Format",
          "React 18 · TypeScript · Vite · pnpm 10.15.1"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Assets",
          "18 bundled original media · Google Font"
        ],
        [
          "Scope",
          "Design study xe điện tương tác theo release v1.0.0 của Amir Mušić: video mở nắp capo/reveal pin, hai cutaway, năm màu sơn và ba kiểu bánh. React/TypeScript/Vite, nguồn MIT và 18 media gốc kèm built/. Giữ các hạn chế focus và chạm chú thích của bản gốc."
        ]
      ],
      "en": [
        [
          "Format",
          "React 18 · TypeScript · Vite · pnpm 10.15.1"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Assets",
          "18 bundled original media · Google Font"
        ],
        [
          "Scope",
          "Amir Mušić’s v1.0.0 electric-vehicle design study: hood/battery hover films, two cutaways, five paints and three wheels. React/TypeScript/Vite, MIT source, 18 original media files and built/ output. Preserves upstream focus and phone annotation limits."
        ]
      ],
      "zh": [
        [
          "Format",
          "React 18 · TypeScript · Vite · pnpm 10.15.1"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Assets",
          "18 bundled original media · Google Font"
        ],
        [
          "Scope",
          "Amir Mušić 的v1.0.0电动车交互设计研究：引擎盖/电池悬停视频、两个剖视图、五种车色与三款轮毂。React/TypeScript/Vite，MIT源码、18个原始媒体及built/版本。保留原版焦点及手机注释点击限制。"
        ]
      ]
    }
  },
  t63: {
    "slug": "vertex-shops",
    "cat": "commerce",
    "version": "1.0.0",
    "video": true,
    "copy": {
      "vi": {
        "name": "Vertex Shops",
        "desc": "Hero SaaS nền tối với vòng 37 thẻ 3D chuyển động, bộ căn chữ theo font, nút sáng cyan và mô phỏng cửa hàng skincare phía trước. Một HTML tự chứa; ảnh/font cần mạng. CTA và cửa hàng là demo, chưa có checkout hay tạo shop.",
        "tags": [
          "HTML tự chứa",
          "Carousel 3D",
          "SaaS Hero"
        ]
      },
      "en": {
        "name": "Vertex Shops",
        "desc": "A dark SaaS hero with a rotating 37-card 3D ring, measured typography, cyan-foot buttons and foreground skincare storefront mock. One self-contained HTML; remote images/fonts. Demo CTAs/storefront, without checkout or shop onboarding.",
        "tags": [
          "Single HTML",
          "3D Carousel",
          "SaaS Hero"
        ]
      },
      "zh": {
        "name": "Vertex Shops",
        "desc": "深色 SaaS 首屏，含37张卡片的3D旋转环、字体测量排版、青色发光按钮及前景护肤店铺示意。单个HTML；图片与字体需联网。CTA与店铺仅为演示，不含结账或开店后台。",
        "tags": [
          "单文件HTML",
          "3D轮播",
          "SaaS首屏"
        ]
      }
    },
    "specs": {
      "vi": [
        [
          "Format",
          "Single HTML · inline CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Assets",
          "Remote images and fonts"
        ],
        [
          "Scope",
          "Hero SaaS nền tối với vòng 37 thẻ 3D chuyển động, bộ căn chữ theo font, nút sáng cyan và mô phỏng cửa hàng skincare phía trước. Một HTML tự chứa; ảnh/font cần mạng. CTA và cửa hàng là demo, chưa có checkout hay tạo shop."
        ]
      ],
      "en": [
        [
          "Format",
          "Single HTML · inline CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Assets",
          "Remote images and fonts"
        ],
        [
          "Scope",
          "A dark SaaS hero with a rotating 37-card 3D ring, measured typography, cyan-foot buttons and foreground skincare storefront mock. One self-contained HTML; remote images/fonts. Demo CTAs/storefront, without checkout or shop onboarding."
        ]
      ],
      "zh": [
        [
          "Format",
          "Single HTML · inline CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.0"
        ],
        [
          "Assets",
          "Remote images and fonts"
        ],
        [
          "Scope",
          "深色 SaaS 首屏，含37张卡片的3D旋转环、字体测量排版、青色发光按钮及前景护肤店铺示意。单个HTML；图片与字体需联网。CTA与店铺仅为演示，不含结账或开店后台。"
        ]
      ]
    }
  },

  t62: {
    slug: 'monoframe',
    cat: 'commerce',
    access: 'free',
    version: '1.0.0',
    video: true,
    specs: {
      vi: [
        ['Format', 'React 18 · TypeScript · Vite · Tailwind CSS'],
        ['Version', '1.0.0'],
        ['Assets', 'Bundled H.264 + remote media/fonts'],
        ['Scope', 'Hero creative agency toàn màn hình với video 3D tua theo chuyển động chuột ngang (SENSITIVITY = 0.8, hàng đợi onSeeked), nhãn giới thiệu A.R.I.A làm mờ, thông điệp gõ chữ useTypewriter kèm con trỏ nhấp nháy, nhóm 5 nút pill (kèm copy email hello@monoframe.co) và menu mobile. Kèm cả mã nguồn React và bản dựng sẵn built/.'],
      ],
      en: [
        ['Format', 'React 18 · TypeScript · Vite · Tailwind CSS'],
        ['Version', '1.0.0'],
        ['Assets', 'Bundled H.264 + remote media/fonts'],
        ['Scope', 'A full-screen creative agency hero with horizontal mouse-scrubbed 3D video (SENSITIVITY = 0.8 with queued onSeeked seeks), blurred A.R.I.A intro label, custom useTypewriter prompt with blinking cursor, 5 action pill buttons (including clipboard email copy for hello@monoframe.co) and mobile menu overlay. Includes editable React source and prebuilt built/ output.'],
      ],
      zh: [
        ['Format', 'React 18 · TypeScript · Vite · Tailwind CSS'],
        ['Version', '1.0.0'],
        ['Assets', 'Bundled H.264 + remote media/fonts'],
        ['Scope', '全屏创意机构首屏，支持随水平鼠标移动逐帧拖拽的 3D 视频背景（SENSITIVITY = 0.8，含 onSeeked 队列防抖）、A.R.I.A 模糊引导语、带闪烁光标的 useTypewriter 打字机文案、5 个胶囊操作按钮（含一键复制 hello@monoframe.co）及移动端全屏菜单。同时附带可编辑 React 源码与 built/ 预构建版本。'],
      ],
    },
    copy: {
      vi: {
        name: 'Monoframe',
        desc: 'Hero creative agency toàn màn hình dựng bằng React, TypeScript, Vite và Tailwind CSS: video nhân vật 3D tua mượt theo chuột ngang, dòng giới thiệu A.R.I.A làm mờ, hiệu ứng gõ chữ useTypewriter kèm con trỏ nhấp nháy và 5 nút pill tương tác (copy nhanh hello@monoframe.co). Gói ZIP kèm cả mã nguồn và bản dựng sẵn built/.',
        tags: ['React + TypeScript', 'Mouse-Scrub Video', 'Creative Agency'],
      },
      en: {
        name: 'Monoframe',
        desc: 'A full-screen creative agency hero built with React, TypeScript, Vite and Tailwind CSS featuring a horizontal mouse-scrubbed 3D character video, blurred A.R.I.A intro label, custom useTypewriter effect with blinking cursor, and 5 interactive action pills with one-click email copy. ZIP includes both editable source and prebuilt built/ files.',
        tags: ['React + TypeScript', 'Mouse-Scrub Video', 'Creative Agency'],
      },
      zh: {
        name: 'Monoframe',
        desc: '基于 React、TypeScript、Vite 与 Tailwind CSS 构建的全屏创意机构首屏：支持鼠标横向拖拽控制 3D 角色视频进度、A.R.I.A 模糊引导标签、带闪烁光标的 useTypewriter 打字机动效及 5 个交互胶囊按钮（含一键复制邮箱）。ZIP 内含可编辑源码与 built/ 预构建静态文件。',
        tags: ['React + TypeScript', '鼠标拖拽视频', '创意机构'],
      },
    },
  },
  t61: {
    slug: 'solaris-gate',
    cat: 'education',
    access: 'free',
    version: '1.0.0',
    video: true,
    specs: {
      vi: [
        ['Format', 'HTML/CSS/JS · no build'],
        ['Version', '1.0.0'],
        ['Assets', 'Remote media (CloudFront)'],
        ['Scope', 'Landing page cổng không gian 3D một khung nhìn với chuỗi preloader đếm 0–100%, logo thu về góc trái, cổng vòm 3D nghiêng theo chuột trên canvas 2D và hành trình chuyển qua Mars → Earth → Venus kèm bảng 4 thông số thiên văn. Một file HTML tự chứa; tài nguyên video/ảnh tải qua mạng, các liên kết header là demo.'],
      ],
      en: [
        ['Format', 'HTML/CSS/JS · no build'],
        ['Version', '1.0.0'],
        ['Assets', 'Remote media (CloudFront)'],
        ['Scope', 'A single-viewport 3D space portal landing experience featuring a 0–100% video preloader, docking SVG mark, pointer-tilted 3D rounded portal rendered on 2D canvas, and an interactive Mars → Earth → Venus travel chain with four planetary fact rows. Single self-contained HTML; media loads over the network and header links are demo placeholders.'],
      ],
      zh: [
        ['Format', 'HTML/CSS/JS · no build'],
        ['Version', '1.0.0'],
        ['Assets', 'Remote media (CloudFront)'],
        ['Scope', '单屏 3D 太空传送门着陆页，配备 0–100% 视频预加载、归位 SVG 标志、基于 2D Canvas 透视投影的鼠标倾斜 3D 圆角传送门，以及 Mars → Earth → Venus 星际切换与四行天文参数。单文件自包含 HTML；媒体素材需联网加载，顶部导航为演示入口。'],
      ],
    },
    copy: {
      vi: {
        name: 'Solaris Gate',
        desc: 'Trải nghiệm cổng không gian 3D một khung nhìn với preloader đếm 0–100%, cổng vòm 3D nghiêng theo chuột trên canvas, con trỏ quỹ đạo tùy chỉnh và hành trình du hành Mars → Earth → Venus kèm bảng thông số hành tinh. Một HTML tự chứa; tài nguyên video/ảnh tải qua mạng.',
        tags: ['Cổng không gian 3D', 'Canvas Portal', 'Hành trình hành tinh'],
      },
      en: {
        name: 'Solaris Gate',
        desc: 'A full-viewport 3D space portal experience with a 0–100% video preloader, pointer-tilted 3D canvas portal, custom orbital cursor, and interactive Mars → Earth → Venus planetary travel with four-row fact tables. Single self-contained HTML; remote media assets.',
        tags: ['3D Space Portal', 'Canvas Portal', 'Planetary Journey'],
      },
      zh: {
        name: 'Solaris Gate',
        desc: '全屏 3D 太空传送门互动体验，含 0–100% 视频预加载、随鼠标倾斜的 3D Canvas 传送门、自定义轨道光标及 Mars → Earth → Venus 星际穿越与行星参数表。单文件 HTML；远程媒体素材。',
        tags: ['3D 太空传送门', 'Canvas 透视', '星际探索'],
      },
    },
  },
  t60: {
  "slug": "jack-3d",
  "cat": "portfolio",
  "access": "free",
  "version": "1.0.0",
  "video": true,
  "copy": {
    "vi": {
      "name": "Jack — 3D Creator",
      "desc": "Portfolio 3D nền tối với chân dung magnetic, hai hàng GIF chuyển động theo cuộn, giới thiệu hiện từng ký tự, năm dịch vụ và ba project card xếp chồng. React + TypeScript, cần Node.js và build. Contact/Live Project mở hộp demo; chưa nối email hay website thật. Tài nguyên tải qua mạng; một GIF Celestia nguồn bị 404 có ô thay thế.",
      "tags": [
        "React + TypeScript",
        "Framer Motion",
        "3D Portfolio"
      ]
    },
    "en": {
      "name": "Jack — 3D Creator",
      "desc": "A dark 3D creator portfolio with a magnetic portrait, two scroll-driven GIF rows, character-reveal biography, five services and three stacking project cards. React + TypeScript; Node.js and a build required. Contact/Live Project open demo dialogs, with no real email or project destinations. Media requires internet; one unavailable Celestia GIF has a fallback tile.",
      "tags": [
        "React + TypeScript",
        "Framer Motion",
        "3D Portfolio"
      ]
    },
    "zh": {
      "name": "Jack — 3D Creator",
      "desc": "深色3D创作者作品集，包含磁吸人像、双行滚动GIF、逐字显现介绍、五项服务及三张叠放项目卡。React + TypeScript，需要Node.js和构建。Contact/Live Project仅打开演示弹窗，未连接真实邮箱或项目地址。素材需联网；一个Celestia GIF源返回404，显示替代状态。",
      "tags": [
        "React + TypeScript",
        "Framer Motion",
        "3D Portfolio"
      ]
    }
  },
  "specs": {
    "vi": [
      [
        "Format",
        "React 18 · TypeScript · Vite"
      ],
      [
        "Version",
        "1.0.0"
      ],
      [
        "Dependencies",
        "Tailwind CSS · Framer Motion · Lucide"
      ],
      [
        "Setup",
        "Node.js · npm ci · npm run build"
      ],
      [
        "Scope",
        "Portfolio 3D nền tối với chân dung magnetic, hai hàng GIF chuyển động theo cuộn, giới thiệu hiện từng ký tự, năm dịch vụ và ba project card xếp chồng. React + TypeScript, cần Node.js và build. Contact/Live Project mở hộp demo; chưa nối email hay website thật. Tài nguyên tải qua mạng; một GIF Celestia nguồn bị 404 có ô thay thế."
      ]
    ],
    "en": [
      [
        "Format",
        "React 18 · TypeScript · Vite"
      ],
      [
        "Version",
        "1.0.0"
      ],
      [
        "Dependencies",
        "Tailwind CSS · Framer Motion · Lucide"
      ],
      [
        "Setup",
        "Node.js · npm ci · npm run build"
      ],
      [
        "Scope",
        "A dark 3D creator portfolio with a magnetic portrait, two scroll-driven GIF rows, character-reveal biography, five services and three stacking project cards. React + TypeScript; Node.js and a build required. Contact/Live Project open demo dialogs, with no real email or project destinations. Media requires internet; one unavailable Celestia GIF has a fallback tile."
      ]
    ],
    "zh": [
      [
        "Format",
        "React 18 · TypeScript · Vite"
      ],
      [
        "Version",
        "1.0.0"
      ],
      [
        "Dependencies",
        "Tailwind CSS · Framer Motion · Lucide"
      ],
      [
        "Setup",
        "Node.js · npm ci · npm run build"
      ],
      [
        "Scope",
        "深色3D创作者作品集，包含磁吸人像、双行滚动GIF、逐字显现介绍、五项服务及三张叠放项目卡。React + TypeScript，需要Node.js和构建。Contact/Live Project仅打开演示弹窗，未连接真实邮箱或项目地址。素材需联网；一个Celestia GIF源返回404，显示替代状态。"
      ]
    ]
  }
},
  t54: {
    "slug": "spaceedu",
    "cat": "education",
    "access": "free",
    "version": "1.0.1",
    "video": true,
    "specs": {
      "vi": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Remote media"
        ],
        [
          "Scope",
          "Hero thiên văn với video Earth/Venus/Mars, chuyển hành tinh bằng hai nút cạnh và menu mobile. Một HTML có CSS/JS nội tuyến; tài nguyên hành tinh tải qua mạng. CTA khoá học là demo, chưa có đăng ký hay backend."
        ]
      ],
      "en": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Remote media"
        ],
        [
          "Scope",
          "A planetary video hero featuring Earth, Venus and Mars, side-planet switching and a mobile menu. One HTML with inline CSS/JS; planetary media requires a network connection. Course links are demo placeholders; no enrolment backend."
        ]
      ],
      "zh": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Remote media"
        ],
        [
          "Scope",
          "Earth、Venus、Mars 行星视频首屏，支持两侧切换与移动菜单。单个 HTML 内嵌 CSS/JS，行星素材需要联网。课程入口为演示，不含报名后台。"
        ]
      ]
    },
    "copy": {
      "vi": {
        "name": "SpaceEdu",
        "desc": "Hero thiên văn với video Earth/Venus/Mars, chuyển hành tinh bằng hai nút cạnh và menu mobile. Một HTML có CSS/JS nội tuyến; tài nguyên hành tinh tải qua mạng. CTA khoá học là demo, chưa có đăng ký hay backend.",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      },
      "en": {
        "name": "SpaceEdu",
        "desc": "A planetary video hero featuring Earth, Venus and Mars, side-planet switching and a mobile menu. One HTML with inline CSS/JS; planetary media requires a network connection. Course links are demo placeholders; no enrolment backend.",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      },
      "zh": {
        "name": "SpaceEdu",
        "desc": "Earth、Venus、Mars 行星视频首屏，支持两侧切换与移动菜单。单个 HTML 内嵌 CSS/JS，行星素材需要联网。课程入口为演示，不含报名后台。",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      }
    }
  },
  t55: {
    "slug": "mostar-city",
    "cat": "portfolio",
    "access": "free",
    "version": "1.0.1",
    "video": true,
    "specs": {
      "vi": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Local Ogg + remote PNG"
        ],
        [
          "Scope",
          "Trang kể chuyện Mostar theo cuộn: cầu Stari Most, phố cổ và slider địa danh lặp hai chiều. PNG nhiều lớp, font Ogg đi kèm và ba file HTML/CSS/JS. Nội dung du lịch demo; không có đặt tour."
        ]
      ],
      "en": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Local Ogg + remote PNG"
        ],
        [
          "Scope",
          "A layered Mostar scroll story with Stari Most, the old town and an infinite sights slider. Includes the Ogg font and separate HTML/CSS/JS. Travel presentation only; no booking backend."
        ]
      ],
      "zh": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Local Ogg + remote PNG"
        ],
        [
          "Scope",
          "Mostar 多层图片滚动叙事，展示古桥、老城与无限景点滑块。附 Ogg 字体及独立 HTML/CSS/JS。旅游展示模板，不含预订后台。"
        ]
      ]
    },
    "copy": {
      "vi": {
        "name": "Mostar City",
        "desc": "Trang kể chuyện Mostar theo cuộn: cầu Stari Most, phố cổ và slider địa danh lặp hai chiều. PNG nhiều lớp, font Ogg đi kèm và ba file HTML/CSS/JS. Nội dung du lịch demo; không có đặt tour.",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Scroll story"
        ]
      },
      "en": {
        "name": "Mostar City",
        "desc": "A layered Mostar scroll story with Stari Most, the old town and an infinite sights slider. Includes the Ogg font and separate HTML/CSS/JS. Travel presentation only; no booking backend.",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Scroll story"
        ]
      },
      "zh": {
        "name": "Mostar City",
        "desc": "Mostar 多层图片滚动叙事，展示古桥、老城与无限景点滑块。附 Ogg 字体及独立 HTML/CSS/JS。旅游展示模板，不含预订后台。",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Scroll story"
        ]
      }
    }
  },
  t56: {
    "slug": "fennec",
    "cat": "commerce",
    "access": "free",
    "version": "1.0.1",
    "video": true,
    "specs": {
      "vi": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Bundled H.264"
        ],
        [
          "Scope",
          "Hero AI automation tông cam với cáo GLB 3D, parallax theo chuột và menu clip-path từ pill thương hiệu. Video H.264 đi kèm; Three.js và GLB cần mạng. Liên kết mở thông tin demo; chưa có dịch vụ AI hay billing."
        ]
      ],
      "en": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Bundled H.264"
        ],
        [
          "Scope",
          "A warm AI automation hero with a GLB fox, pointer parallax and a pill-origin clip-path menu. Includes H.264 video; Three.js and the model require a network connection. Links show demo information; no AI service or billing backend."
        ]
      ],
      "zh": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Bundled H.264"
        ],
        [
          "Scope",
          "暖橙色 AI 自动化首屏，含 GLB 狐狸、鼠标视差与胶囊展开菜单。附 H.264 视频；Three.js 与模型需要联网。链接展示演示信息，不含 AI 服务或计费后台。"
        ]
      ]
    },
    "copy": {
      "vi": {
        "name": "FENNEC",
        "desc": "Hero AI automation tông cam với cáo GLB 3D, parallax theo chuột và menu clip-path từ pill thương hiệu. Video H.264 đi kèm; Three.js và GLB cần mạng. Liên kết mở thông tin demo; chưa có dịch vụ AI hay billing.",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      },
      "en": {
        "name": "FENNEC",
        "desc": "A warm AI automation hero with a GLB fox, pointer parallax and a pill-origin clip-path menu. Includes H.264 video; Three.js and the model require a network connection. Links show demo information; no AI service or billing backend.",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      },
      "zh": {
        "name": "FENNEC",
        "desc": "暖橙色 AI 自动化首屏，含 GLB 狐狸、鼠标视差与胶囊展开菜单。附 H.264 视频；Three.js 与模型需要联网。链接展示演示信息，不含 AI 服务或计费后台。",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      }
    }
  },
  t57: {
    "slug": "riverine-ai",
    "cat": "education",
    "access": "free",
    "version": "1.0.1",
    "video": true,
    "specs": {
      "vi": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Remote media"
        ],
        [
          "Scope",
          "Hero regenerative AI trên nền video dòng sông, logo cây và bướm SVG, menu responsive và entrance WAAPI một lượt. Một HTML; font RV chưa cung cấp nên dùng fallback. Các liên kết neo là demo, không có section đích hoặc âm thanh thật."
        ]
      ],
      "en": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Remote media"
        ],
        [
          "Scope",
          "A regenerative AI river-video hero with tree-and-moth SVG branding, responsive navigation and a single WAAPI entrance. One HTML; RV fonts are not included and use the specified fallbacks. Anchor links and sound control are visual demo elements."
        ]
      ],
      "zh": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Remote media"
        ],
        [
          "Scope",
          "河流视频上的再生 AI 首屏，树与蝴蝶 SVG 标识、响应式导航和一次性 WAAPI 入场。单个 HTML；未附 RV 字体，使用指定后备字体。锚点与声音按钮为视觉演示。"
        ]
      ]
    },
    "copy": {
      "vi": {
        "name": "riverine.ai",
        "desc": "Hero regenerative AI trên nền video dòng sông, logo cây và bướm SVG, menu responsive và entrance WAAPI một lượt. Một HTML; font RV chưa cung cấp nên dùng fallback. Các liên kết neo là demo, không có section đích hoặc âm thanh thật.",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      },
      "en": {
        "name": "riverine.ai",
        "desc": "A regenerative AI river-video hero with tree-and-moth SVG branding, responsive navigation and a single WAAPI entrance. One HTML; RV fonts are not included and use the specified fallbacks. Anchor links and sound control are visual demo elements.",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      },
      "zh": {
        "name": "riverine.ai",
        "desc": "河流视频上的再生 AI 首屏，树与蝴蝶 SVG 标识、响应式导航和一次性 WAAPI 入场。单个 HTML；未附 RV 字体，使用指定后备字体。锚点与声音按钮为视觉演示。",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      }
    }
  },
  t58: {
    "slug": "freight-axis",
    "cat": "commerce",
    "access": "free",
    "version": "1.0.1",
    "video": true,
    "specs": {
      "vi": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Remote media"
        ],
        [
          "Scope",
          "Hero logistics video tàu hàng từ trên cao, headline condensed và hai khối nội dung căn đối xứng qua trục đường ray. Một HTML không JS, entrance CSS một lượt, reflow portrait/phone. Font condensed dùng local(), cần mạng cho video."
        ]
      ],
      "en": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Remote media"
        ],
        [
          "Scope",
          "An aerial freight-video hero with condensed headlines and two rail-axis feature blocks. One HTML without JavaScript, a single CSS entrance and portrait/phone reflow. Uses locally installed condensed fonts and remote video."
        ]
      ],
      "zh": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Remote media"
        ],
        [
          "Scope",
          "货运列车航拍视频首屏，窄体标题与沿铁轨轴对称的信息区。单个 HTML、无 JavaScript、一次 CSS 入场和竖屏重排。使用本机窄体字体，视频需要联网。"
        ]
      ]
    },
    "copy": {
      "vi": {
        "name": "Freight Axis",
        "desc": "Hero logistics video tàu hàng từ trên cao, headline condensed và hai khối nội dung căn đối xứng qua trục đường ray. Một HTML không JS, entrance CSS một lượt, reflow portrait/phone. Font condensed dùng local(), cần mạng cho video.",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      },
      "en": {
        "name": "Freight Axis",
        "desc": "An aerial freight-video hero with condensed headlines and two rail-axis feature blocks. One HTML without JavaScript, a single CSS entrance and portrait/phone reflow. Uses locally installed condensed fonts and remote video.",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      },
      "zh": {
        "name": "Freight Axis",
        "desc": "货运列车航拍视频首屏，窄体标题与沿铁轨轴对称的信息区。单个 HTML、无 JavaScript、一次 CSS 入场和竖屏重排。使用本机窄体字体，视频需要联网。",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      }
    }
  },
  t59: {
    "slug": "meridian",
    "cat": "communication",
    "access": "free",
    "version": "1.0.1",
    "video": true,
    "specs": {
      "vi": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Bundled H.264"
        ],
        [
          "Scope",
          "Footer một viewport màu sage với la bàn SVG, Fraunces/Inter và video cầu cạn khắc nét có xe ngựa chạy qua. Video H.264 đi kèm, blend multiply, nav desktop/tablet/mobile và năm tự cập nhật. Các liên kết # chưa nối trang thật."
        ]
      ],
      "en": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Bundled H.264"
        ],
        [
          "Scope",
          "A sage viewport footer with a compass SVG, Fraunces/Inter and an engraved viaduct coach video. Includes H.264 video, multiply blending, responsive footer navigation and the current year. Hash links are not connected to full pages."
        ]
      ],
      "zh": [
        [
          "Format",
          "HTML/CSS/JS · no build"
        ],
        [
          "Version",
          "1.0.1"
        ],
        [
          "Assets",
          "Bundled H.264"
        ],
        [
          "Scope",
          "鼠尾草色全屏页脚，含罗盘 SVG、Fraunces/Inter 与马车驶过高架桥的版画视频。附 H.264 视频、正片叠底、响应式导航及动态年份。# 链接尚未连接实际页面。"
        ]
      ]
    },
    "copy": {
      "vi": {
        "name": "Meridian",
        "desc": "Footer một viewport màu sage với la bàn SVG, Fraunces/Inter và video cầu cạn khắc nét có xe ngựa chạy qua. Video H.264 đi kèm, blend multiply, nav desktop/tablet/mobile và năm tự cập nhật. Các liên kết # chưa nối trang thật.",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      },
      "en": {
        "name": "Meridian",
        "desc": "A sage viewport footer with a compass SVG, Fraunces/Inter and an engraved viaduct coach video. Includes H.264 video, multiply blending, responsive footer navigation and the current year. Hash links are not connected to full pages.",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      },
      "zh": {
        "name": "Meridian",
        "desc": "鼠尾草色全屏页脚，含罗盘 SVG、Fraunces/Inter 与马车驶过高架桥的版画视频。附 H.264 视频、正片叠底、响应式导航及动态年份。# 链接尚未连接实际页面。",
        "tags": [
          "HTML/CSS/JS",
          "Responsive",
          "Video"
        ]
      }
    }
  },

  t53: {
    slug: 'atrium-mtl',
    cat: 'portfolio',
    access: 'free',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: 'ATRIUM MTL',
        desc: 'Landing page bảo tàng và kho lưu trữ nhiếp ảnh kiến trúc Brutalist một khung nhìn trên nền giấy kem #f5f4ef: thẻ header trắng nổi bo góc dưới 22px, tiêu đề Archivo 900 4 dòng cỡ lớn (An archive / of light / cast in / stone), lưới mosaic 3–6 cột cuộn ngược chiều vô tận 14,6 giây kết hợp 4 ảnh kiến trúc đen trắng cùng các ô màu hạt film và chuỗi chuyển động WAAPI 2,1 giây.',
        tags: ['Bảo tàng & Lưu trữ', 'Mosaic cuộn vô tận', 'Brutalist Editorial'],
      },
      en: {
        name: 'ATRIUM MTL',
        desc: 'An editorial museum and brutalist architectural photography archive landing page on warm off-white paper (#f5f4ef): floating white header card with 22px bottom corners, four-line Archivo 900 uppercase display headline (An archive / of light / cast in / stone), a 3-to-6-column opposing infinite mosaic (14.6s loop) of monochrome photography and grain-textured primary color blocks, and a 2.1s WAAPI entrance choreography.',
        tags: ['Museum & Archive', 'Infinite Mosaic', 'Brutalist Editorial'],
      },
      zh: {
        name: 'ATRIUM MTL',
        desc: '暖白纸感（#f5f4ef）野兽派建筑摄影博物馆与档案单屏展示页：22px 下圆角悬浮白色页头、Archivo 900 四行超大标题（An archive / of light / cast in / stone）、3至6列反向无限循环马赛克网格（14.6秒循环，含四张黑白建筑摄影与胶片颗粒色块）及 2.1 秒 WAAPI 入场动效。',
        tags: ['博物馆与档案', '无限循环马赛克', '野兽派杂志风'],
      },
    },
    specs: {
      vi: [
        ['Định dạng', '1 file index.html tự chứa (inline CSS · SVG · JS)'],
        ['Gói tải', '13 file · 2 font biến thiên WOFF2 + 4 ảnh WebP + 1 SVG hạt'],
        ['Tương tác', '5 chế độ responsive (desk · tab-l · tab-p · mob-l · mob) · Menu drawer'],
        ['Chuyển động', 'WAAPI 2,1s bàn giao mượt sang marquee 14,6s ngược chiều'],
        ['Phạm vi', 'Showcase triển lãm & lưu trữ kiến trúc · không backend'],
      ],
      en: [
        ['Format', 'Self-contained index.html (inline CSS · SVG · JS)'],
        ['Package', '13 files · 2 variable WOFF2 fonts + 4 WebP photos + 1 grain SVG'],
        ['Interaction', '5 responsive modes (desk · tab-l · tab-p · mob-l · mob) · Menu drawer'],
        ['Motion', '2.1s WAAPI entrance with seamless 14.6s opposing marquee handoff'],
        ['Scope', 'Architectural archive & museum showcase · no backend'],
      ],
      zh: [
        ['格式', '单文件自包含 index.html（内联 CSS · SVG · JS）'],
        ['文件包', '13 个文件 · 2 个可变 WOFF2 字体 + 4 张 WebP + 1 个颗粒 SVG'],
        ['交互', '5 种响应式模式（desk · tab-l · tab-p · mob-l · mob）· 展开式菜单'],
        ['动态', '2.1 秒 WAAPI 入场无缝衔接 14.6 秒反向无限滚动'],
        ['范围', '建筑档案与展览展示页 · 无后端'],
      ],
    },
  },
  t52: {
    slug: 'maldives-escape',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: 'Maldives Escape',
        desc: 'Trang khám phá khu nghỉ dưỡng và biệt thự trên biển Maldives toàn màn hình lúc hoàng hôn với hồ bơi vô cực ánh sao, vòm kính mờ tròn bên trái chứa 2 thẻ dọc xem trước resort kèm nút viên thuốc trắng Book Now, chữ tiêu đề MALDIVES thanh mảnh cỡ lớn, 4 chấm phân trang đáy và bộ lọc 4 khu bảo tồn san hô.',
        tags: ['Khu nghỉ dưỡng Maldives', 'Vòm kính & 2 thẻ dọc', 'Hoàng hôn trên biển'],
      },
      en: {
        name: 'Maldives Escape',
        desc: 'A full-bleed Maldives overwater resort and island travel showcase featuring a sunset starlit infinity-pool deck hero, a circular frosted dome overlay framing two vertical resort preview cards with a white Book Now pill button, oversized thin geometric MALDIVES typography, 4 pagination dots and interactive atoll sanctuary filtering.',
        tags: ['Maldives Resort', 'Circular Dome & Cards', 'Overwater Villas'],
      },
      zh: {
        name: 'Maldives Escape',
        desc: '马尔代夫水上别墅与海岛度假全屏展示模板，配备日落星光无边泳池甲板主视觉、左侧圆形磨砂玻璃穹顶与双纵向度假村预览卡片、白色胶囊 Book Now 按钮、超大几何 MALDIVES 标题、底部四点分页及环礁别墅分类筛选。',
        tags: ['马尔代夫度假村', '圆形磨砂穹顶卡片', '水上别墅'],
      },
    },
    specs: {
      vi: [
        ['Định dạng', 'HTML / CSS / JavaScript thuần'],
        ['Gói tải', '10 file · 4 ảnh resort WebP tự tạo'],
        ['Tương tác', 'Mũi tên < / > · 2 thẻ dọc · 4 chấm đáy · lọc khu bảo tồn · nhảy cảnh'],
        ['Chuyển động', 'Crossfade cảnh nền · nhịp chuyển rAF hữu hạn · Pause motion'],
        ['Phạm vi', 'Showcase resort & du lịch biển đảo · liên hệ email/tel · không backend'],
      ],
      en: [
        ['Format', 'Plain HTML / CSS / JavaScript'],
        ['Package', '10 files · 4 original resort WebP photos'],
        ['Interaction', '< / > arrows · 2 vertical cards · 4 bottom dots · atoll filter · stage jump'],
        ['Motion', 'Hero crossfade · finite rAF card settle · Pause motion'],
        ['Scope', 'Resort & island travel showcase · email/tel enquiry · no backend'],
      ],
      zh: [
        ['格式', '纯 HTML / CSS / JavaScript'],
        ['文件包', '10 个文件 · 4 张原创度假村 WebP 照片'],
        ['交互', '< / > 箭头 · 双纵向卡片 · 4 个底部圆点 · 环礁筛选 · 主视觉预览'],
        ['动态', '主视觉淡入淡出 · 有限 rAF 卡片过渡 · 会话内暂停控制'],
        ['范围', '海岛度假村展示页 · 邮件/电话咨询 · 无后端'],
      ],
    },
  },
  t51: {
  "slug": "beyond-voyages",
  "cat": "commerce",
  "version": "1.0.0",
  "video": true,
  "copy": {
    "vi": {
      "name": "Beyond Voyages",
      "desc": "Trang khám phá điểm đến và hành trình du lịch cao cấp với sân khấu phong cảnh toàn màn hình, vòng cung 5 điểm đến tương tác bên phải (Cameo Island, Koh Phi Phi Don, Lago di Braies, Cinque Terre, Grand Canal), bộ lọc vùng địa lý, 3 gói lịch trình mẫu và liên hệ concierge trực tiếp.",
      "tags": [
        "Du lịch & Điểm đến",
        "Vòng cung 5 cảnh",
        "Kính mờ / Hoàng hôn"
      ]
    },
    "en": {
      "name": "Beyond Voyages",
      "desc": "A luxury travel and destination discovery showcase with a full-bleed scenic hero stage, an interactive 5-destination curved orbital selector (Cameo Island, Koh Phi Phi Don, Lago di Braies, Cinque Terre, Grand Canal), regional atlas filtering, three bespoke itinerary packages and direct concierge enquiry links.",
      "tags": [
        "Travel & Destinations",
        "5-scene orbital arc",
        "Frosted glass"
      ]
    },
    "zh": {
      "name": "Beyond Voyages",
      "desc": "高端旅行与目的地探索展示页，采用全屏风景主视觉、右侧五目的地弧形轨道切换器（Cameo Island、Koh Phi Phi Don、Lago di Braies、Cinque Terre、Grand Canal）、区域筛选图鉴、三套定制行程方案及礼宾邮件咨询。",
      "tags": [
        "旅行与目的地",
        "5景弧形轨道",
        "磨砂玻璃"
      ]
    }
  },
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript thuần"
      ],
      [
        "Gói tải",
        "11 file · 5 ảnh phong cảnh WebP tự tạo"
      ],
      [
        "Tương tác",
        "Vòng cung 5 điểm đến · 5 chấm phân trang · lọc vùng · nhảy cảnh"
      ],
      [
        "Chuyển động",
        "Crossfade cảnh nền · nhịp chuyển rAF hữu hạn · Pause motion"
      ],
      [
        "Phạm vi",
        "Showcase du lịch & điểm đến · liên hệ email/tel · không backend"
      ]
    ],
    "en": [
      [
        "Format",
        "Plain HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "11 files · 5 original scenic WebP photos"
      ],
      [
        "Interaction",
        "5-destination orbital arc · 5 slide dots · region filter · stage jump"
      ],
      [
        "Motion",
        "Scenic crossfade · finite rAF copy pulse · session Pause motion"
      ],
      [
        "Scope",
        "Travel & destination showcase · mailto/tel concierge · no backend"
      ]
    ],
    "zh": [
      [
        "格式",
        "原生 HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "11个文件 · 5张原创风景 WebP 图像"
      ],
      [
        "交互",
        "5目的地弧形轨道 · 5个分页点 · 区域筛选 · 舞台跳转"
      ],
      [
        "动态",
        "背景渐变切换 · 有限 rAF 动效 · 会话内暂停动画"
      ],
      [
        "范围",
        "旅行与目的地展示页 · 邮件/电话礼宾咨询 · 无后端"
      ]
    ]
  }
},
  t50: {
  "slug": "vesper-ai",
  "cat": "commerce",
  "access": "free",
  "version": "1.0.0",
  "copy": {
    "vi": {
      "name": "Vesper.ai",
      "desc": "Landing page hạ tầng AI vận hành một khung nhìn nền đen tuyền #000000: video nền 3D điện ảnh, thanh điều hướng liquid-metal, nút liquid-glass quét sáng 115°, tiêu đề H1 hai dòng cắt mặt nạ với chữ Instrument Serif nghiêng và chuỗi chuyển động 9-keyframe spring-settle.",
      "tags": [
        "Hạ tầng AI",
        "Liquid-metal & Glass",
        "Đen tuyền / Video"
      ]
    },
    "en": {
      "name": "Vesper.ai",
      "desc": "A single-viewport operational AI infrastructure landing page on pure black #000000 with a full-bleed cinematic hero video, liquid-metal navigation pills, 115° specular liquid-glass buttons, a two-line masked H1 with Instrument Serif italic accent and 9-keyframe spring-settle choreography.",
      "tags": [
        "AI infrastructure",
        "Liquid-metal & Glass",
        "Pure black / Video"
      ]
    },
    "zh": {
      "name": "Vesper.ai",
      "desc": "纯黑 #000000 单屏 AI 运营基础设施着陆页：全屏电影级背景视频、液态金属导航胶囊、115° 流光液态玻璃按钮、Instrument Serif 斜体双行遮罩主标题及 9 关键帧弹簧入场动效。",
      "tags": [
        "AI 基础设施",
        "液态金属与玻璃",
        "纯黑 / 视频"
      ]
    }
  },
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript thuần"
      ],
      [
        "Gói tải",
        "9 file · 2 font WOFF2 + video H.264 cục bộ"
      ],
      [
        "Tương tác",
        "Liquid-metal nav · Liquid-glass CTA · Menu mobile · Pause motion"
      ],
      [
        "Chuyển động",
        "Chuỗi 9-keyframe spring-settle · H1 line-mask · Video nền lặp"
      ],
      [
        "Phạm vi",
        "Landing page hạ tầng AI · tĩnh · không backend"
      ]
    ],
    "en": [
      [
        "Format",
        "Plain HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "9 files · 2 local WOFF2 fonts + H.264 hero video"
      ],
      [
        "Interaction",
        "Liquid-metal nav · Liquid-glass CTAs · Mobile menu · Pause motion"
      ],
      [
        "Motion",
        "9-keyframe spring-settle · H1 line-mask · Looping hero video"
      ],
      [
        "Scope",
        "AI infrastructure landing page · static · no backend"
      ]
    ],
    "zh": [
      [
        "格式",
        "原生 HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "9个文件 · 2个本地 WOFF2 字体 + H.264 视频"
      ],
      [
        "交互",
        "液态金属导航 · 液态玻璃按钮 · 移动菜单 · 会话内暂停动画"
      ],
      [
        "动态",
        "9关键帧弹簧入场 · H1 遮罩滑入 · 循环主视觉视频"
      ],
      [
        "范围",
        "AI 基础设施着陆页 · 静态 · 无后端"
      ]
    ]
  }
},
  t47: {
  "slug": "astro-armor",
  "cat": "commerce",
  "version": "1.0.0",
  "copy": {
    "vi": {
      "name": "ASTRO Armor",
      "desc": "Giao diện sản phẩm áo khoác nền kem, điểm nhấn cam và bố cục ba cột theo ảnh mẫu. Có chọn size, bốn phối màu, bảng size và giỏ demo trong phiên; không có thanh toán hay backend.",
      "tags": [
        "Thời trang",
        "Áo khoác",
        "Giỏ demo"
      ]
    },
    "en": {
      "name": "ASTRO Armor",
      "desc": "An ivory-and-orange puffer product page with a reference-led three-column composition. Includes size selection, four colour previews, a size guide and a page-session demo bag; no checkout or backend.",
      "tags": [
        "Fashion",
        "Outerwear",
        "Demo bag"
      ]
    },
    "zh": {
      "name": "ASTRO Armor",
      "desc": "奶油白与橙色羽绒服产品页面，采用参考图的三栏布局。包含尺码选择、四种配色预览、尺码表和会话内购物袋演示；无支付或后端。",
      "tags": [
        "时尚",
        "外套",
        "购物袋演示"
      ]
    }
  },
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript"
      ],
      [
        "Gói tải",
        "9 file · ảnh cục bộ"
      ],
      [
        "Phạm vi",
        "Giao diện tĩnh · giỏ demo"
      ]
    ],
    "en": [
      [
        "Format",
        "HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "9 files · local artwork"
      ],
      [
        "Scope",
        "Static template · demo bag"
      ]
    ],
    "zh": [
      [
        "格式",
        "HTML / CSS / JavaScript"
      ],
      [
        "文件包",
        "9个文件 · 本地图像"
      ],
      [
        "范围",
        "静态模板 · 购物袋演示"
      ]
    ]
  }
},
  t43: {
  "slug": "fresh-reddy",
  "cat": "commerce",
  "version": "1.0.0",
  "copy": {
    "vi": {
      "name": "Fresh & Reddy",
      "desc": "Giao diện dịch vụ cà phê văn phòng nền than, cụm ba cốc PNG trong suốt, nội dung dịch vụ và liên hệ.",
      "tags": [
        "Ẩm thực",
        "Ảnh trong suốt",
        "Responsive"
      ]
    },
    "en": {
      "name": "Fresh & Reddy",
      "desc": "A charcoal workplace-coffee landing page with three transparent cup renders, service sections and contact anchors.",
      "tags": [
        "Food & drink",
        "Transparent imagery",
        "Responsive"
      ]
    },
    "zh": {
      "name": "Fresh & Reddy",
      "desc": "炭黑色办公室咖啡服务页面，含三个透明咖啡杯图像、服务介绍及联系入口。",
      "tags": [
        "餐饮",
        "透明图像",
        "自适应"
      ]
    }
  },
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript"
      ],
      [
        "Gói tải",
        "7 files"
      ],
      [
        "Phạm vi",
        "Giao diện tĩnh · không backend"
      ]
    ],
    "en": [
      [
        "Format",
        "HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "7 files"
      ],
      [
        "Scope",
        "Static interface · no backend"
      ]
    ],
    "zh": [
      [
        "格式",
        "HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "7 files"
      ],
      [
        "范围",
        "静态界面 · 无后端"
      ]
    ]
  }
},
  t44: {
  "slug": "puro-amor",
  "cat": "commerce",
  "version": "1.0.0",
  "copy": {
    "vi": {
      "name": "Puro Amor",
      "desc": "Concept cà phê trắng–xanh đậm, cốc cà phê bắn nước và nội dung tiếng Bồ Đào Nha.",
      "tags": [
        "Ẩm thực",
        "Ảnh trong suốt",
        "Responsive"
      ]
    },
    "en": {
      "name": "Puro Amor",
      "desc": "A white-and-teal coffee concept with a coffee splash hero and Portuguese editorial content.",
      "tags": [
        "Food & drink",
        "Transparent imagery",
        "Responsive"
      ]
    },
    "zh": {
      "name": "Puro Amor",
      "desc": "白色与深青色咖啡概念页，含咖啡飞溅主视觉及葡萄牙语内容。",
      "tags": [
        "餐饮",
        "透明图像",
        "自适应"
      ]
    }
  },
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript"
      ],
      [
        "Gói tải",
        "7 files"
      ],
      [
        "Phạm vi",
        "Giao diện tĩnh · không backend"
      ]
    ],
    "en": [
      [
        "Format",
        "HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "7 files"
      ],
      [
        "Scope",
        "Static interface · no backend"
      ]
    ],
    "zh": [
      [
        "格式",
        "HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "7 files"
      ],
      [
        "范围",
        "静态界面 · 无后端"
      ]
    ]
  }
},
  t45: {
  "slug": "nourish-bowl",
  "cat": "commerce",
  "version": "1.0.0",
  "copy": {
    "vi": {
      "name": "Nourish Bowl",
      "desc": "Landing page thực phẩm nền xanh đêm với hai ảnh tô trái cây, mục nguyên liệu mở rộng và hướng dẫn chuẩn bị.",
      "tags": [
        "Ẩm thực",
        "Ảnh trong suốt",
        "Responsive"
      ]
    },
    "en": {
      "name": "Nourish Bowl",
      "desc": "A navy-and-cyan food landing page with two fruit bowl cutouts, expandable ingredients and preparation ideas.",
      "tags": [
        "Food & drink",
        "Transparent imagery",
        "Responsive"
      ]
    },
    "zh": {
      "name": "Nourish Bowl",
      "desc": "深蓝与青色健康饮食页面，含两张水果餐盘图像、可展开食材及制作建议。",
      "tags": [
        "餐饮",
        "透明图像",
        "自适应"
      ]
    }
  },
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript"
      ],
      [
        "Gói tải",
        "8 files"
      ],
      [
        "Phạm vi",
        "Giao diện tĩnh · không backend"
      ]
    ],
    "en": [
      [
        "Format",
        "HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "8 files"
      ],
      [
        "Scope",
        "Static interface · no backend"
      ]
    ],
    "zh": [
      [
        "格式",
        "HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "8 files"
      ],
      [
        "范围",
        "静态界面 · 无后端"
      ]
    ]
  }
},
  t42: {
    slug: 'manganresto',
    cat: 'commerce',
    version: '1.0.0',
    video: true,
    specs: {
      vi: [
        ['Định dạng', 'HTML / CSS / JavaScript thuần'],
        ['Gói tải', '9 file · 3 ảnh WebP món ăn tự tạo'],
        ['Tương tác', 'Lọc danh mục món · tìm kiếm live · đặt bàn demo'],
        ['Chuyển động', 'Hiệu ứng đĩa nghiêng 3D · sóng nền cong · bật mặc định'],
        ['Phạm vi', 'Landing page nhà hàng ẩm thực · không backend']
      ],
      en: [
        ['Format', 'Plain HTML / CSS / JavaScript'],
        ['Package', '9 files · 3 original local food WebP images'],
        ['Interaction', 'Menu category filters · live search · table booking demo'],
        ['Motion', 'Hero plate kinetic tilt · curved split backdrop · default ON'],
        ['Scope', 'Gourmet restaurant landing page · no backend']
      ],
      zh: [
        ['格式', '原生 HTML / CSS / JavaScript'],
        ['下载包', '9个文件 · 3张原创本地美食WebP图像'],
        ['交互', '菜单分类筛选 · 实时搜索 · 订座演示'],
        ['动态', '主厨餐盘微动视角 · 流线双色背景 · 默认开启'],
        ['范围', '高级美食品鉴餐厅展示页 · 无后端']
      ]
    },
    copy: {
      vi: {
        name: 'Manganresto',
        desc: 'Landing page nhà hàng ẩm thực cao cấp phối màu đen và vàng hổ phách, đĩa mì Ý hải sản mực đen nổi bật, thẻ thực đơn bữa sáng/khai vị và huy hiệu đầu bếp.',
        tags: ['Nhà hàng', 'Ẩm thực cao cấp', 'Đen & Vàng hổ phách']
      },
      en: {
        name: 'Manganresto',
        desc: 'A gourmet dining and fine culinary landing page in charcoal and warm amber gold, featuring a centerpiece seafood squid ink pasta plate, breakfast/appetizer cards and chef accolades.',
        tags: ['Restaurant', 'Fine dining', 'Charcoal & Amber gold']
      },
      zh: {
        name: 'Manganresto',
        desc: '黑金色调高级美食餐厅展示页，配有标志性墨鱼汁海鲜意面餐盘、早午餐/开胃菜卡片及名厨勋章。',
        tags: ['餐厅', '精致餐饮', '黑金双色']
      }
    }
  },
  t41: {
  "slug": "beetbuh",
  "cat": "commerce",
  "version": "1.0.0",
  "video": true,
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript thuần"
      ],
      [
        "Gói tải",
        "9 file · 3 ảnh WebP cục bộ tự tạo"
      ],
      [
        "Tương tác",
        "3 trạng thái xem · nút/phím/vuốt · phóng to ảnh"
      ],
      [
        "Chuyển động",
        "Chuyển góc hữu hạn · reveal khi cuộn · tạm dừng trong phiên"
      ],
      [
        "Phạm vi",
        "Concept tai nghe · liên hệ email · không thanh toán"
      ]
    ],
    "en": [
      [
        "Format",
        "Plain HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "9 files · 3 original local WebP images"
      ],
      [
        "Interaction",
        "3 view states · buttons/keys/swipe · image expansion"
      ],
      [
        "Motion",
        "Finite view transitions · scroll reveals · session pause"
      ],
      [
        "Scope",
        "Headphone concept · email enquiry · no checkout"
      ]
    ],
    "zh": [
      [
        "格式",
        "原生 HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "9个文件 · 3张原创本地WebP图像"
      ],
      [
        "交互",
        "3种视图 · 按钮/按键/滑动 · 图像放大"
      ],
      [
        "动态",
        "有限视角切换 · 滚动渐显 · 会话内暂停"
      ],
      [
        "范围",
        "耳机概念 · 邮件咨询 · 无支付"
      ]
    ]
  },
  "copy": {
    "vi": {
      "name": "BeetBuh",
      "desc": "Landing page tai nghe màu cam trên nền ivory, chữ tiêu đề lớn, ảnh lifestyle và ba trạng thái xem sản phẩm có chuyển động.",
      "tags": [
        "Tai nghe",
        "3 trạng thái xem",
        "Ivory / cam"
      ]
    },
    "en": {
      "name": "BeetBuh",
      "desc": "An ivory-and-orange headphone landing page with oversized condensed type, lifestyle artwork and three animated product view states.",
      "tags": [
        "Headphones",
        "3 view states",
        "Ivory / orange"
      ]
    },
    "zh": {
      "name": "BeetBuh",
      "desc": "象牙白与橙色耳机展示页，配有大型窄体标题、生活方式图像及三种动态产品视图。",
      "tags": [
        "耳机",
        "3种视图",
        "象牙白 / 橙色"
      ]
    }
  }
},
  t40: {
  "slug": "sonicore",
  "cat": "commerce",
  "version": "1.0.0",
  "video": true,
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript thuần"
      ],
      [
        "Gói tải",
        "10 file · 4 ảnh WebP tai nghe tự tạo"
      ],
      [
        "Tương tác",
        "3 sân khấu âm thanh · 6 linh kiện tách lớp · 3 không gian · so sánh thông số"
      ],
      [
        "Chuyển động",
        "10 lớp hiệu ứng Vesper · vòng sao chổi · liquid-glass · sóng nhạc 35 cột"
      ],
      [
        "Phạm vi",
        "Showroom concept tai nghe · đặt trước qua email · không thanh toán"
      ]
    ],
    "en": [
      [
        "Format",
        "Plain HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "10 files · 4 original headphone WebP renders"
      ],
      [
        "Interaction",
        "3 soundstages · 6 exploded parts · 3 spatial presets · spec comparison"
      ],
      [
        "Motion",
        "10 Vesper effect layers · comet rings · liquid-glass · 35-bar equalizer"
      ],
      [
        "Scope",
        "Headphone concept showroom · email pre-order enquiry · no checkout"
      ]
    ],
    "zh": [
      [
        "格式",
        "原生 HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "10个文件 · 4张原创耳机 WebP 渲染图"
      ],
      [
        "交互",
        "3种声场 · 6个拆解部件 · 3种空间预设 · 参数对比"
      ],
      [
        "动态",
        "10层 Vesper 动效 · 彗星光环 · 液态玻璃 · 35段动态频谱"
      ],
      [
        "范围",
        "概念耳机展厅 · 邮件预订咨询 · 无支付"
      ]
    ]
  },
  "copy": {
    "vi": {
      "name": "Sonicore",
      "desc": "Showroom tai nghe âm thanh không gian nâng cấp hệ hiệu ứng Vesper: tai nghe lơ lửng 3D, vòng sao chổi ngược chiều, nút liquid-metal/liquid-glass quét sáng 115°, sơ đồ tách lớp phát sóng sonar và phổ nhạc 35 cột.",
      "tags": [
        "Tai nghe 3D",
        "Hiệu ứng Vesper",
        "Liquid Glass"
      ]
    },
    "en": {
      "name": "Sonicore",
      "desc": "A spatial-audio headphone showcase upgraded with the Vesper motion system: 3D headphone levitation, counter-rotating comet rings, 115° liquid-metal and liquid-glass shine sweeps, sonar-pulsing exploded hardware and a 35-bar dancing equalizer.",
      "tags": [
        "Spatial headphones",
        "Vesper motion",
        "Liquid Glass"
      ]
    },
    "zh": {
      "name": "Sonicore",
      "desc": "升级 Vesper 动效系统的空间音频耳机展示页：3D 悬浮耳机、反向旋转彗星光环、115° 液态金属与液态玻璃扫光、声呐脉冲六部件拆解图及 35 段跃动频谱。",
      "tags": [
        "空间音频耳机",
        "Vesper 动效",
        "液态玻璃"
      ]
    }
  }
},
  t39: {
  "slug": "firepower",
  "cat": "commerce",
  "version": "1.0.0",
  "video": true,
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript thuần"
      ],
      [
        "Gói tải",
        "7 file · ảnh chuột cục bộ tự tạo"
      ],
      [
        "Tương tác",
        "5 góc xem · nút/phím/vuốt · thông số mở rộng"
      ],
      [
        "Chuyển động",
        "Chuyển góc hai chiều · reveal khi cuộn · tạm dừng trong phiên"
      ],
      [
        "Phạm vi",
        "Concept chuột gaming · liên hệ email · không thanh toán"
      ]
    ],
    "en": [
      [
        "Format",
        "Plain HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "7 files · original local mouse artwork"
      ],
      [
        "Interaction",
        "5 views · buttons/keys/swipe · native specifications"
      ],
      [
        "Motion",
        "Two-way view transitions · scroll reveals · session pause"
      ],
      [
        "Scope",
        "Gaming mouse concept · email enquiry · no checkout"
      ]
    ],
    "zh": [
      [
        "格式",
        "原生 HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "7个文件 · 原创本地鼠标图像"
      ],
      [
        "交互",
        "5个视角 · 按钮/按键/滑动 · 原生参数展开"
      ],
      [
        "动态",
        "双向视角切换 · 滚动渐显 · 会话内暂停"
      ],
      [
        "范围",
        "游戏鼠标概念 · 邮件咨询 · 无支付"
      ]
    ]
  },
  "copy": {
    "vi": {
      "name": "Firepower",
      "desc": "Showroom chuột gaming nền than đen, điểm nhấn cyan, ảnh sản phẩm lớn và thư viện năm góc xem điều khiển bằng nút, phím hoặc vuốt.",
      "tags": [
        "Chuột gaming",
        "5 góc xem",
        "Đen / cyan"
      ]
    },
    "en": {
      "name": "Firepower",
      "desc": "A charcoal-and-cyan gaming mouse showcase with oversized product imagery and five detail views controlled by buttons, arrow keys or swipe.",
      "tags": [
        "Gaming mouse",
        "5 product views",
        "Dark / cyan"
      ]
    },
    "zh": {
      "name": "Firepower",
      "desc": "炭黑与青色游戏鼠标展示页，配有大型产品图像和五个细节视角，支持按钮、方向键和滑动切换。",
      "tags": [
        "游戏鼠标",
        "5个视角",
        "深色 / 青色"
      ]
    }
  }
},
  t38: {
  "slug": "backbest-800",
  "cat": "commerce",
  "version": "1.0.0",
  "video": true,
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript thuần"
      ],
      [
        "Gói tải",
        "9 file · 3 ảnh WebP tự tạo"
      ],
      [
        "Tương tác",
        "3 phối màu · 6 cỡ đệm tai · hotspot · giỏ tư vấn trong phiên"
      ],
      [
        "Chuyển động",
        "Chuyển hai chiều · vuốt/phím · cảnh cuộn"
      ],
      [
        "Phạm vi",
        "Showroom concept · email · không bán hàng/thanh toán"
      ]
    ],
    "en": [
      [
        "Format",
        "Plain HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "9 files · 3 original WebP images"
      ],
      [
        "Interaction",
        "3 finishes · 6 cushion fits · hotspots · session enquiry bag"
      ],
      [
        "Motion",
        "Two-way transitions · swipe/keys · scroll scene"
      ],
      [
        "Scope",
        "Concept showroom · email · no retail sales/payments"
      ]
    ],
    "zh": [
      [
        "格式",
        "原生 HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "9 个文件 · 3 张原创 WebP"
      ],
      [
        "交互",
        "3 种配色 · 6 种耳垫规格 · 热点 · 会话咨询袋"
      ],
      [
        "动态",
        "双向切换 · 滑动/按键 · 滚动场景"
      ],
      [
        "范围",
        "概念展厅 · 邮件 · 无零售销售或支付"
      ]
    ]
  },
  "copy": {
    "vi": {
      "name": "BackBest 800",
      "desc": "Showroom tai nghe không dây nền đen đỏ với các vòng đồng tâm phát sáng và ba ảnh tai nghe tách nền tự tạo. Chọn phối màu Đen/Trắng/Đỏ và kiểu đệm tai, xem chi tiết màng loa 40mm và khớp gập qua hotspot, giỏ tư vấn trong phiên, email và cảnh kỹ thuật cuộn. Chuyển hai chiều bằng nút, phím hoặc vuốt; Sound preview là hoạt cảnh phối màu 4.2 giây, không phải luồng âm thanh hay video quay thật. Giá và thông số minh họa; không có thanh toán hoặc backend.",
      "tags": [
        "Showroom tai nghe",
        "3 phối màu chân thực",
        "Chuyển hai chiều"
      ]
    },
    "en": {
      "name": "BackBest 800",
      "desc": "An obsidian-and-crimson wireless headphone showroom with glowing concentric target rings and three original photoreal finish cutouts. Colourway and cushion-fit selection, 40mm driver and hinge hotspots, a session purchase enquiry bag, email and a scroll-linked acoustic engineering scene. Directional buttons, keys and swipe; Sound preview is a 4.2-second colourway sequence, not audio/video stream footage. Illustrative price and specs; no retail checkout, payments or backend.",
      "tags": [
        "Headphone showroom",
        "3 photoreal finishes",
        "Directional transitions"
      ]
    },
    "zh": {
      "name": "BackBest 800",
      "desc": "黑红配色无线耳机展厅，含发光同心圆环与三张原创写实配色切图。支持黑/白/红配色与耳垫规格选择、40mm驱动单元与折叠铰链热点、会话购买咨询袋、邮件与滚动声学工程场景。按钮、按键或滑动双向切换；Sound preview为4.2秒配色动画而非实拍音视频。价格与参数为示例，无零售结账、支付或后端。",
      "tags": [
        "无线耳机展厅",
        "3 种写实配色",
        "双向切换"
      ]
    }
  }
},
  t37: {
  "slug": "airmax-plus",
  "cat": "commerce",
  "version": "1.0.0",
  "video": true,
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript thuần"
      ],
      [
        "Gói tải",
        "9 file · 3 ảnh WebP tự tạo"
      ],
      [
        "Tương tác",
        "3 phối màu · 6 cỡ US · hotspot · giỏ tư vấn trong phiên"
      ],
      [
        "Chuyển động",
        "Chuyển hai chiều · vuốt/phím · cảnh cuộn"
      ],
      [
        "Phạm vi",
        "Showroom concept · email · không bán hàng/thanh toán"
      ]
    ],
    "en": [
      [
        "Format",
        "Plain HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "9 files · 3 original WebP images"
      ],
      [
        "Interaction",
        "3 finishes · 6 US sizes · hotspots · session enquiry bag"
      ],
      [
        "Motion",
        "Two-way transitions · swipe/keys · scroll scene"
      ],
      [
        "Scope",
        "Concept showroom · email · no retail sales/payments"
      ]
    ],
    "zh": [
      [
        "格式",
        "原生 HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "9 个文件 · 3 张原创 WebP"
      ],
      [
        "交互",
        "3 种配色 · 6 个美码 · 热点 · 会话咨询袋"
      ],
      [
        "动态",
        "双向切换 · 滑动/按键 · 滚动场景"
      ],
      [
        "范围",
        "概念展厅 · 邮件 · 无零售销售或支付"
      ]
    ]
  },
  "copy": {
    "vi": {
      "name": "AirMax Plus",
      "desc": "Showroom giày thể thao nền tối với dải sóng lưới cam 3D và ba ảnh giày tách nền tự tạo. Chọn phối màu/cỡ US, xem chi tiết đệm Tuned Air và khung TPU, giỏ tư vấn đặt trước trong phiên, email và cảnh kỹ thuật cuộn. Chuyển hai chiều bằng nút, phím hoặc vuốt; Watch preview là hoạt cảnh phối màu 4.2 giây, không phải video quay thật. Giá và thông số minh họa; không có thanh toán hoặc backend.",
      "tags": [
        "Showroom giày thể thao",
        "3 phối màu chân thực",
        "Chuyển hai chiều"
      ]
    },
    "en": {
      "name": "AirMax Plus",
      "desc": "A dark sneaker showroom with a 3D orange wireframe ribbon wave and three original photoreal finish cutouts. Colourway/US size selection, Tuned Air and TPU cage hotspots, a session pre-order enquiry bag, email and a scroll-linked engineering scene. Directional buttons, keys and swipe; Watch preview is a 4.2-second colourway sequence, not video footage. Illustrative price and specs; no retail checkout, payments or backend.",
      "tags": [
        "Sneaker showroom",
        "3 photoreal finishes",
        "Directional transitions"
      ]
    },
    "zh": {
      "name": "AirMax Plus",
      "desc": "深色运动鞋展厅，含3D橙色线框波浪与三张原创写实配色切图。支持配色/美码选择、Tuned Air与TPU骨架热点、会话预订咨询袋、邮件与滚动工程场景。按钮、按键或滑动双向切换；Watch preview为4.2秒配色动画而非实拍视频。价格与参数为示例，无零售结账、支付或后端。",
      "tags": [
        "运动鞋展厅",
        "3 种写实配色",
        "双向切换"
      ]
    }
  }
},
  t36: {
  "slug": "aerosix",
  "cat": "commerce",
  "version": "1.0.0",
  "video": true,
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript thuần"
      ],
      [
        "Gói tải",
        "9 file · 3 ảnh WebP tự tạo"
      ],
      [
        "Tương tác",
        "3 màu · 6 cỡ · hotspot · giỏ tư vấn trong phiên"
      ],
      [
        "Chuyển động",
        "Chuyển hai chiều · vuốt/phím · cảnh cuộn"
      ],
      [
        "Phạm vi",
        "Showroom concept · email · không bán xe/thanh toán"
      ]
    ],
    "en": [
      [
        "Format",
        "Plain HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "9 files · 3 original WebP images"
      ],
      [
        "Interaction",
        "3 finishes · 6 sizes · hotspots · session enquiry bag"
      ],
      [
        "Motion",
        "Two-way transitions · swipe/keys · scroll scene"
      ],
      [
        "Scope",
        "Concept showroom · email · no bicycle sales/payments"
      ]
    ],
    "zh": [
      [
        "格式",
        "原生 HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "9 个文件 · 3 张原创 WebP"
      ],
      [
        "交互",
        "3 种配色 · 6 个尺码 · 热点 · 会话咨询袋"
      ],
      [
        "动态",
        "双向切换 · 滑动/按键 · 滚动场景"
      ],
      [
        "范围",
        "概念展厅 · 邮件 · 无自行车销售或支付"
      ]
    ]
  },
  "copy": {
    "vi": {
      "name": "AeroSix",
      "desc": "Showroom xe đạp khí động học nền tối, chữ FASTER EVERYWHERE lớn sau xe và ba ảnh xe chân thực tự tạo. Chọn màu/cỡ, xem chi tiết linh kiện, giỏ tư vấn trong phiên, email và cảnh chuyển động theo cuộn. Chuyển hai chiều bằng nút, phím hoặc vuốt; See it in action là hoạt cảnh thiết kế, không phải footage. Giá, cấu hình và điều khoản giao hàng minh họa; không có bán xe, thanh toán hoặc backend.",
      "tags": [
        "Showroom xe đạp",
        "3 màu chân thực",
        "Chuyển hai chiều"
      ]
    },
    "en": {
      "name": "AeroSix",
      "desc": "A dark aero-bicycle showroom with oversized FASTER EVERYWHERE type and three original photoreal finish images. Finish/size selection, component hotspots, a session enquiry bag, email and a scroll-linked scene. Directional buttons, keys and swipe; See it in action is a design sequence, not riding footage. Illustrative prices, equipment and shipping terms; no bicycle sales, payments or backend.",
      "tags": [
        "Bicycle showroom",
        "3 photoreal finishes",
        "Directional transitions"
      ]
    },
    "zh": {
      "name": "AeroSix",
      "desc": "深色空气动力自行车展厅，含大型FASTER EVERYWHERE文字与三张原创写实配色图。支持配色/尺码、部件热点、会话咨询袋、邮件与滚动场景。按钮、按键或滑动双向切换；See it in action为设计动画而非骑行录像。价格、配置与配送条款为示例，无自行车销售、支付或后端。",
      "tags": [
        "自行车展厅",
        "3 种写实配色",
        "双向切换"
      ]
    }
  }
},
  t35: {
  "slug": "motora",
  "cat": "commerce",
  "version": "1.0.0",
  "video": true,
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript thuần"
      ],
      [
        "Gói tải",
        "8 file · 2 ảnh WebP tự tạo"
      ],
      [
        "Tương tác",
        "5 màu · hotspot · cấu hình trong phiên"
      ],
      [
        "Chuyển động",
        "Đổi màu hai chiều · ảnh nội thất theo cuộn"
      ],
      [
        "Phạm vi",
        "Showroom concept · email · không bán xe/thanh toán"
      ]
    ],
    "en": [
      [
        "Format",
        "Plain HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "8 files · 2 original WebP images"
      ],
      [
        "Interaction",
        "5 finishes · hotspots · session configuration"
      ],
      [
        "Motion",
        "Directional finishes · scroll-linked cabin"
      ],
      [
        "Scope",
        "Concept showroom · email · no vehicle sales/payments"
      ]
    ],
    "zh": [
      [
        "格式",
        "原生 HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "8 个文件 · 2 张原创 WebP"
      ],
      [
        "交互",
        "5 种配色 · 热点 · 会话配置"
      ],
      [
        "动态",
        "双向配色切换 · 随滚动移动的内饰图"
      ],
      [
        "范围",
        "概念展厅 · 邮件 · 无车辆销售或支付"
      ]
    ]
  },
  "copy": {
    "vi": {
      "name": "Motora",
      "desc": "Showroom ô tô nền sáng với coupe vàng chân thực tự tạo, 5 màu ngoại thất, các điểm xem chi tiết và thẻ thông số. Cấu hình cục bộ, lưu trong phiên, tìm mẫu xe, menu bàn phím và ảnh nội thất chuyển động theo cuộn. Màu dùng bộ lọc ảnh; lựa chọn mâm chỉ đổi nội dung tư vấn. Dữ liệu minh họa, không có bán xe, thanh toán hoặc backend.",
      "tags": [
        "Showroom ô tô",
        "5 màu ngoại thất",
        "Cấu hình concept"
      ]
    },
    "en": {
      "name": "Motora",
      "desc": "A light automotive showroom with an original photoreal gold coupe, five visual finishes, detail hotspots and specification cards. Local configuration, session save, model search, keyboard menu and a scroll-linked cabin image. Finishes use image filters; wheel preferences update the enquiry text. Illustrative data, no vehicle sales, payments or backend.",
      "tags": [
        "Automotive showroom",
        "5 visual finishes",
        "Concept configuration"
      ]
    },
    "zh": {
      "name": "Motora",
      "desc": "浅色汽车展厅，含原创写实金色轿跑、五种视觉配色、细节热点和参数卡片。本地配置、会话保存、车型搜索、键盘菜单与随滚动移动的内饰图。配色使用图像滤镜；轮毂偏好仅更新咨询文字。数据为示例，无车辆销售、支付或后端。",
      "tags": [
        "汽车展厅",
        "5 种视觉配色",
        "概念配置"
      ]
    }
  }
},
  t34: {
  "slug": "semaan",
  "cat": "portfolio",
  "version": "1.0.0",
  "video": true,
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript thuần"
      ],
      [
        "Gói tải",
        "9 file · 3 ảnh WebP tự tạo"
      ],
      [
        "Tương tác",
        "Menu · chi tiết tác phẩm/dịch vụ · scroll reveal"
      ],
      [
        "Phạm vi",
        "Portfolio tĩnh · email · không backend"
      ]
    ],
    "en": [
      [
        "Format",
        "Plain HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "9 files · 3 original WebP images"
      ],
      [
        "Interaction",
        "Menu · work/service details · scroll reveals"
      ],
      [
        "Scope",
        "Static portfolio · email · no backend"
      ]
    ],
    "zh": [
      [
        "格式",
        "原生 HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "9 个文件 · 3 张原创 WebP"
      ],
      [
        "交互",
        "菜单 · 作品/服务描述 · 滚动渐显"
      ],
      [
        "范围",
        "静态作品集 · 邮件 · 无后端"
      ]
    ]
  },
  "copy": {
    "vi": {
      "name": "Semaan",
      "desc": "Portfolio designer với hero chia đôi cam và trắng, chữ CREATE cao và chân dung đeo kính phản chiếu ánh cam tự tạo. Ba tác phẩm concept, giới thiệu, dịch vụ mở rộng và liên hệ email. Menu bàn phím, scroll reveal hữu hạn; lời chứng thực được ghi rõ là nội dung mẫu. HTML/CSS/JS thuần, không backend.",
      "tags": [
        "Portfolio designer",
        "Chân dung tự tạo",
        "Cam / trắng"
      ]
    },
    "en": {
      "name": "Semaan",
      "desc": "A designer portfolio with an orange/white split hero, tall CREATE typography and an original amber-lit mirrored-sunglasses portrait. Three concept studies, about, expandable services and email contact. Keyboard menu and finite scroll reveals; testimonial clearly labelled as sample content. Plain HTML/CSS/JS, no backend.",
      "tags": [
        "Designer portfolio",
        "Original portrait",
        "Orange / white"
      ]
    },
    "zh": {
      "name": "Semaan",
      "desc": "设计师作品集，含橙白分屏主视觉、高挑 CREATE 字体与原创暖橙镜面墨镜肖像。包含三项概念作品、个人介绍、可展开服务与邮件联系。支持键盘菜单和有限滚动渐显；客户评价明确标注为示例内容。原生 HTML/CSS/JS，无后端。",
      "tags": [
        "设计师作品集",
        "原创肖像",
        "橙色 / 白色"
      ]
    }
  }
},
  t33: {
  "slug": "ais-folio",
  "cat": "portfolio",
  "version": "1.0.0",
  "video": true,
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML / CSS / JavaScript thuần"
      ],
      [
        "Gói tải",
        "8 file · nhân vật và 6 poster tự tạo"
      ],
      [
        "Tương tác",
        "Menu · mô tả tác phẩm · scroll reveal"
      ],
      [
        "Phạm vi",
        "Portfolio tĩnh · email · không backend"
      ]
    ],
    "en": [
      [
        "Format",
        "Plain HTML / CSS / JavaScript"
      ],
      [
        "Package",
        "8 files · original character and 6 posters"
      ],
      [
        "Interaction",
        "Menu · artwork descriptions · scroll reveals"
      ],
      [
        "Scope",
        "Static portfolio · email · no backend"
      ]
    ],
    "zh": [
      [
        "格式",
        "原生 HTML / CSS / JavaScript"
      ],
      [
        "下载包",
        "8 个文件 · 原创角色与6张海报"
      ],
      [
        "交互",
        "菜单 · 作品描述 · 滚动渐显"
      ],
      [
        "范围",
        "静态作品集 · 邮件 · 无后端"
      ]
    ]
  },
  "copy": {
    "vi": {
      "name": "AIS Folio",
      "desc": "Portfolio sáng tạo tông cyan và xanh đen với nhân vật anime mặc hijab tự tạo, nền lưới, bảng giới thiệu, kinh nghiệm, sáu poster và cột công cụ. Menu bàn phím, mô tả tác phẩm mở bằng details và hiệu ứng hiện khi cuộn. Nội dung cá nhân là minh họa; liên hệ mở ứng dụng email, không có backend.",
      "tags": [
        "Portfolio anime",
        "Ảnh tự tạo",
        "Cyan / navy"
      ]
    },
    "en": {
      "name": "AIS Folio",
      "desc": "A cyan and navy creative portfolio with an original hijab anime character, grid backdrop, profile, experience, six posters and a software column. Keyboard navigation, native expandable artwork descriptions and finite scroll reveals. Illustrative personal content; contact opens an email app. No backend.",
      "tags": [
        "Anime portfolio",
        "Original artwork",
        "Cyan / navy"
      ]
    },
    "zh": {
      "name": "AIS Folio",
      "desc": "青色与深蓝创意作品集，含原创戴头巾动漫角色、网格背景、个人介绍、经历、六张海报与工具栏。支持键盘菜单、原生作品描述展开和有限滚动渐显。个人内容为示例；联系打开邮件应用，不含后端。",
      "tags": [
        "动漫作品集",
        "原创图像",
        "青色 / 深蓝"
      ]
    }
  }
},
  t32: {
    slug: 'leaflit', cat: 'entertainment', version: '1.0.0',
    specs: {
      vi: [['Định dạng', 'HTML / CSS / JavaScript thuần'], ['Gói tải', '14 file · 8 bìa WebP tự tạo'], ['Thư viện', 'Tìm tên/tác giả · lọc thể loại'], ['Lưu trữ', 'Sách đã lưu · hồ sơ · localStorage'], ['Phạm vi', 'Chạy cục bộ · không ebook hoặc backend']],
      en: [['Format', 'Plain HTML / CSS / JavaScript'], ['Package', '14 files · 8 original WebP covers'], ['Library', 'Title/author search · genre filters'], ['Storage', 'Saved books · profile · localStorage'], ['Scope', 'Browser-local · no ebooks or backend']],
      zh: [['格式', '原生 HTML / CSS / JavaScript'], ['下载包', '14 个文件 · 8 张原创 WebP 封面'], ['书库', '书名/作者搜索 · 类型筛选'], ['存储', '收藏图书 · 昵称 · localStorage'], ['范围', '浏览器本地 · 不含电子书或后端']],
    },
    copy: {
      vi: { name: 'Leaflit', desc: 'Giao diện thư viện sách nền sáng với sidebar, sách đọc gần đây, kệ sách mới và tác giả. Tám bìa minh họa chân thực tự tạo; tìm theo tên/tác giả, lọc thể loại, lưu/bỏ lưu sách và đổi tên hồ sơ. Dữ liệu lưu cục bộ, đồng bộ giữa tab cùng trình duyệt. Không kèm nội dung ebook, tài khoản hoặc backend.', tags: ['Thư viện sách', 'Bìa ảnh gốc', 'Tìm kiếm & lưu sách'] },
      en: { name: 'Leaflit', desc: 'A light personal book library with a sidebar, recent reads, new releases and authors. Eight original realistic illustrated covers, title/author search, genre filters, saved books and editable display name. Browser-local persistence and same-origin tab sync. No full ebooks, accounts or backend.', tags: ['Book library', 'Original cover art', 'Search & saved books'] },
      zh: { name: 'Leaflit', desc: '浅色个人书库界面，含侧边栏、最近阅读、新书与作者。八张原创写实封面，支持书名/作者搜索、类型筛选、收藏和昵称编辑。数据保存在本地浏览器，并在同源标签页间同步。不含完整电子书、账户或后端。', tags: ['个人书库', '原创封面', '搜索与收藏'] },
    },
  },
  t31: {
    slug: 'chronoform', cat: 'commerce', version: '1.0.1', video: true,
    specs: {
      vi: [['Định dạng', 'HTML / CSS / JavaScript · WebGL thuần'], ['Gói tải', '28 file · 21 ảnh WebP gốc'], ['Bộ sưu tập', '11 mẫu · bộ lọc · chi tiết trước/sau'], ['Chuyển động', '4 mẫu hero · xoay 3D · cảnh cuộn'], ['Phạm vi', 'Giỏ tư vấn trong phiên · không thanh toán']],
      en: [['Format', 'HTML / CSS / JavaScript · native WebGL'], ['Package', '28 files · 21 original WebP images'], ['Collection', '11 models · filters · front/back detail'], ['Motion', '4 featured models · 3D rotation · scroll scene'], ['Scope', 'Session enquiry bag · no payments']],
      zh: [['格式', 'HTML / CSS / JavaScript · 原生 WebGL'], ['下载包', '28 个文件 · 21 张原创 WebP'], ['系列', '11 款 · 筛选 · 正反面详情'], ['动态', '4 款主展示 · 3D 旋转 · 滚动场景'], ['范围', '会话咨询袋 · 无支付']],
    },
    copy: {
      vi: { name: 'Chronoform', desc: 'Showroom đồng hồ cơ theo phong cách điện ảnh: 4 mẫu hero chuyển hai chiều, đồng hồ WebGL xoay và xem trước/sau, thư viện 11 mẫu với bộ lọc, trang chi tiết và giỏ tư vấn trong phiên. Ảnh gốc tự tạo; ảnh dự phòng khi WebGL bị chặn. Giá và thông số minh họa, không có thanh toán hoặc backend.', tags: ['Đồng hồ 3D', 'Chuyển mẫu', 'Thư viện & bộ lọc'] },
      en: { name: 'Chronoform', desc: 'A cinematic mechanical-watch showroom: four directional hero models, native WebGL rotation and front/back inspection, an eleven-model filtered collection, detail views and a session enquiry bag. Original artwork with image fallback when WebGL is blocked. Illustrative prices/specs; no payment or backend.', tags: ['3D watches', 'Model transitions', 'Collection & filters'] },
      zh: { name: 'Chronoform', desc: '电影感机械腕表展厅：四款双向主展示、原生 WebGL 旋转与正反面查看、十一款筛选系列、详情页和会话咨询袋。原创图像，WebGL 被阻止时使用图片备用。价格与规格为示例，不含支付或后端。', tags: ['3D 腕表', '型号切换', '系列与筛选'] },
    },
  },
  t30: {
    slug: 'shopluxe', cat: 'commerce', version: '1.0.0', video: true,
    specs: {
      vi: [['Định dạng', 'HTML / CSS / JavaScript'], ['Gói tải', '20 file · 14 ảnh WebP tối ưu'], ['Tính năng', 'Carousel hero · 7 danh mục · giỏ hàng phiên'], ['Tương tác', 'Bộ lọc · tìm kiếm · toast thông báo'], ['Phạm vi', 'Giao diện tĩnh · demo only · không backend']],
      en: [['Format', 'HTML / CSS / JavaScript'], ['Package', '20 files · 14 optimized WebP images'], ['Features', 'Hero carousel · 7 categories · in-session cart'], ['Interactions', 'Filters · search drawer · toast alerts'], ['Scope', 'Static template · demo only · no backend']],
      zh: [['格式', 'HTML / CSS / JavaScript'], ['下载包', '20 个文件 · 14 张优化 WebP'], ['功能', 'Hero 轮播 · 7 大分类 · 会话购物车'], ['交互', '筛选 · 搜索抽屉 · 提示通知'], ['范围', '静态模板 · 仅限演示 · 无后端']],
    },
    copy: {
      vi: { name: 'Shopluxe', desc: 'Giao diện cửa hàng phong cách sống và thương mại điện tử hiện đại. Khẩu hiệu "Everything For Everyone", carousel sản phẩm nổi bật hai chiều, dải 7 danh mục bo góc, lưới sản phẩm thịnh hành với đánh giá sao, tính năng thêm giỏ hàng có số đếm động trong phiên, 3 thẻ ưu đãi và khối bản tin tin cậy.', tags: ['Thương mại điện tử', 'Lifestyle shop', 'Carousel'] },
      en: { name: 'Shopluxe', desc: 'A modern e-commerce and lifestyle storefront template. Tagline "Everything For Everyone", dual-direction hero carousel, 7 rounded category cards, trending product grid with star ratings, in-session dynamic cart badge, 3 value cards and customer trust social proof.', tags: ['E-commerce', 'Lifestyle shop', 'Carousel'] },
      zh: { name: 'Shopluxe', desc: '现代生活方式与电子商务独立站模板。标语“Everything For Everyone”，支持双向 Hero 轮播、7 大精选圆角分类卡片、带星级评价的热门商品网格、动态会话购物车角标、3 大优惠特色卡片及真实客户信任展示。', tags: ['电子商务', '生活商店', '轮播展示'] },
    },
  },
  t29: {
    slug: 'orbit-academy', cat: 'education', version: '1.0.0', video: true,
    specs: {
      vi: [['Định dạng', 'HTML / CSS / JavaScript'], ['Gói tải', '10 file · 4 ảnh WebP tự tạo'], ['Học tập', '3 chủ đề · quiz · tiến độ trong phiên'], ['Chuyển động', 'Carousel 3 cảnh · scroll parallax'], ['Phạm vi', 'Không LMS, tài khoản hoặc chứng chỉ']],
      en: [['Format', 'HTML / CSS / JavaScript'], ['Package', '10 files · 4 original WebP images'], ['Learning', '3 topics · quizzes · session progress'], ['Motion', '3-world carousel · scroll parallax'], ['Scope', 'No LMS, accounts or certificates']],
      zh: [['格式', 'HTML / CSS / JavaScript'], ['下载包', '10 个文件 · 4 张原创 WebP'], ['学习', '3 个主题 · 测验 · 会话进度'], ['动态', '3 场景轮播 · 滚动视差'], ['范围', '不含 LMS、账户或证书']],
    },
    copy: {
      vi: { name: 'Orbit Academy', desc: 'Giao diện giáo dục thiên văn với cảnh phi hành gia và hành tinh tự tạo. Ba lộ trình Trái Đất, hành tinh và thiên thạch, tìm kiếm chủ đề cục bộ, bài học dạng dialog, câu hỏi ôn tập có phản hồi và tiến độ trong phiên. Carousel hai chiều, vuốt và cảnh cuộn; kiến thức kèm nguồn NASA, không liên kết hay được NASA bảo trợ. Không kèm LMS hoặc chứng chỉ.', tags: ['Giáo dục thiên văn', 'Quiz', 'Scroll animation'] },
      en: { name: 'Orbit Academy', desc: 'An astronomy education interface with original astronaut and planetary concept art. Three Earth, planet and meteor learning paths, local topic search, lesson dialogs, feedback quizzes and session progress. Directional carousel, swipe and scroll storytelling; NASA reading sources, no affiliation or endorsement. No LMS or certificates.', tags: ['Astronomy education', 'Quizzes', 'Scroll animation'] },
      zh: { name: 'Orbit Academy', desc: '天文教育界面，含原创宇航员与行星概念图。提供地球、行星、流星三个学习路径、本地主题搜索、课程弹窗、反馈测验和会话进度。支持双向轮播、滑动和滚动叙事，附 NASA 科学阅读来源，不代表合作或背书。不含 LMS 或证书。', tags: ['天文教育', '测验', '滚动动画'] },
    },
  },
  t28: {
    slug: 'verdant', cat: 'commerce', version: '1.0.0', video: true,
    specs: {
      vi: [['Định dạng', 'HTML / CSS / JavaScript'], ['Gói tải', '8 file · 2 ảnh WebP tự tạo'], ['Tương tác', '3 vị · carousel · cảnh cuộn'], ['Phụ thuộc', 'Không framework, API hoặc build'], ['Liên hệ', 'Email · không đặt hàng/thanh toán']],
      en: [['Format', 'HTML / CSS / JavaScript'], ['Package', '8 files · 2 original WebP images'], ['Interactions', '3 flavours · carousel · scroll scene'], ['Dependencies', 'No framework, API or build'], ['Contact', 'Email · no orders or payments']],
      zh: [['格式', 'HTML / CSS / JavaScript'], ['下载包', '8 个文件 · 2 张原创 WebP'], ['交互', '3 种口味 · 轮播 · 滚动场景'], ['依赖', '无需框架、API 或构建'], ['联系', '邮件 · 不含下单或支付']],
    },
    copy: {
      vi: { name: 'Verdant', desc: 'Giao diện café nền kem và xanh matcha, ảnh đồ uống tự tạo với ba vị matcha, mango và strawberry. Chuyển sản phẩm theo hai hướng, vuốt và phím; chọn size, dialog chi tiết và cảnh ly chuyển động theo cuộn. Liên hệ qua email, không kèm đặt hàng hoặc thanh toán.', tags: ['Café & đồ uống', 'Carousel', 'Scroll animation'] },
      en: { name: 'Verdant', desc: 'A cream and matcha-green café showcase with original imagery and three flavours: matcha, mango and strawberry. Directional product transitions, swipe and keyboard controls, size preferences, detail dialogs and a scroll-driven drink scene. Email enquiry; no ordering or payment service.', tags: ['Café & drinks', 'Carousel', 'Scroll animation'] },
      zh: { name: 'Verdant', desc: '奶油白与抹茶绿咖啡馆展示页面，含原创饮品图及抹茶、芒果、草莓三种口味。支持双向轮播、滑动与键盘、尺寸偏好、详情弹窗和滚动饮品场景。通过邮件联系，不含下单或支付服务。', tags: ['咖啡与饮品', '轮播', '滚动动画'] },
    },
  },
  t27: {
  "slug": "dualplay",
  "cat": "commerce",
  "version": "1.0.0",
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML · CSS · JS"
      ],
      [
        "Gói tải",
        "6 file chính + 3 ảnh WebP"
      ],
      [
        "Chuyển động",
        "Carousel vòng tròn thủ công · 1,3 giây"
      ],
      [
        "Giỏ hàng",
        "Giỏ demo trong phiên · Không thanh toán"
      ],
      [
        "Hướng dẫn",
        "10 bước · 12 prompt AI"
      ],
      [
        "Giấy phép",
        "Website cá nhân/khách hàng; không cấp quyền nhãn hiệu"
      ]
    ],
    "en": [
      [
        "Format",
        "HTML · CSS · JS"
      ],
      [
        "Package",
        "6 core files + 3 WebP images"
      ],
      [
        "Motion",
        "Manual circular carousel · 1.3 seconds"
      ],
      [
        "Cart",
        "Session demo cart · No checkout"
      ],
      [
        "Guide",
        "10 steps · 12 AI prompts"
      ],
      [
        "Licence",
        "Personal/client websites; no trademark rights"
      ]
    ],
    "zh": [
      [
        "格式",
        "HTML · CSS · JS"
      ],
      [
        "下载包",
        "6个核心文件 + 3张WebP图片"
      ],
      [
        "动画",
        "手动环形轮播 · 1.3秒"
      ],
      [
        "购物车",
        "会话内演示购物车 · 无支付"
      ],
      [
        "指南",
        "10个步骤 · 12个AI提示词"
      ],
      [
        "授权",
        "个人/客户网站使用；不授予商标权"
      ]
    ]
  },
  "copy": {
    "vi": {
      "name": "Dualplay",
      "desc": "Showroom tay cầm với ba thiết kế concept, Genshin Impact hiển thị đầu tiên. Carousel vòng tròn khi bấm hoặc vuốt, nền đổi màu, hover, scroll reveal và màn xem sản phẩm sáu giây. Giỏ demo trong phiên; không đặt hàng hay thanh toán. Không phải sản phẩm chính thức của hãng.",
      "tags": [
        "Tay cầm",
        "Carousel vòng tròn",
        "3 ảnh AI"
      ]
    },
    "en": {
      "name": "Dualplay",
      "desc": "A three-concept controller showroom with Genshin Impact first. Manual circular carousel, changing themes, hover, scroll reveals and a six-second product preview. Session demo cart only; no orders or payments. Independent concept, not an official manufacturer product.",
      "tags": [
        "Controllers",
        "Circular carousel",
        "3 AI images"
      ]
    },
    "zh": {
      "name": "Dualplay",
      "desc": "三款概念游戏手柄展厅，默认首先展示原神设计。支持点击或滑动的环形轮播、主题变色、悬停、滚动渐显与六秒产品预览。仅含会话演示购物车，不含下单或支付；非厂商官方产品。",
      "tags": [
        "游戏手柄",
        "环形轮播",
        "3张AI图片"
      ]
    }
  }
},
  t25: {
  "cat": "commerce",
  "version": "1.2.1",
  "badge": "",
  "slug": "galaxy-edge",
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML · CSS · JS"
      ],
      [
        "Gói tải",
        "6 file chính + 1 ảnh WebP"
      ],
      [
        "Tương tác",
        "Hover · Parallax · Scroll reveal"
      ],
      [
        "Nội dung",
        "Điểm đến thiên hà hư cấu"
      ],
      [
        "Hướng dẫn",
        "10 bước · 12 prompt AI"
      ],
      [
        "Giấy phép",
        "Website cá nhân và khách hàng"
      ]
    ],
    "en": [
      [
        "Format",
        "HTML · CSS · JS"
      ],
      [
        "Package",
        "6 core files + 1 WebP image"
      ],
      [
        "Interaction",
        "Hover · Parallax · Scroll reveals"
      ],
      [
        "Content",
        "Fictional galactic destination"
      ],
      [
        "Guide",
        "10 steps · 12 AI prompts"
      ],
      [
        "Licence",
        "Personal and client websites"
      ]
    ],
    "zh": [
      [
        "格式",
        "HTML · CSS · JS"
      ],
      [
        "文件包",
        "6个核心文件 + 1张WebP图片"
      ],
      [
        "交互",
        "悬停 · 视差 · 滚动渐显"
      ],
      [
        "内容",
        "虚构银河目的地"
      ],
      [
        "指南",
        "10步骤 · 12个AI提示词"
      ],
      [
        "授权",
        "个人与客户网站"
      ]
    ]
  },
  "copy": {
    "vi": {
      "name": "Galaxy Edge",
      "desc": "Landing page du lịch thiên hà với ảnh điện ảnh tự tạo, tiêu đề lớn, ánh động cơ cyan, hover và parallax khi cuộn. Nội dung điểm đến và gói du lịch là minh hoạ; các CTA dẫn tới mục thật trên trang, không có đặt vé hay thanh toán. HTML/CSS/JS thuần, hướng dẫn 10 bước và 12 prompt AI.",
      "tags": [
        "Du lịch",
        "Điện ảnh",
        "Parallax"
      ]
    },
    "en": {
      "name": "Galaxy Edge",
      "desc": "A cinematic galactic travel landing page with original AI artwork, oversized type, cyan engine glow, hover and scroll parallax. Fictional destinations and illustrative packages; working section links with no booking or payment service. Plain HTML/CSS/JS, ten setup steps and twelve AI prompts.",
      "tags": [
        "Travel",
        "Cinematic",
        "Parallax"
      ]
    },
    "zh": {
      "name": "Galaxy Edge",
      "desc": "电影感银河旅行页面，包含原创AI背景、大字标题、青色引擎光效、悬停与滚动视差。目的地和旅行套餐为示例；按钮链接真实页面区块，不含预订或支付服务。纯HTML/CSS/JS，附十个设置步骤与十二个AI提示词。",
      "tags": [
        "旅行",
        "电影感",
        "视差"
      ]
    }
  }
},
  t26: {
  "cat": "commerce",
  "version": "1.2.1",
  "badge": "",
  "slug": "aerox-studio",
  "specs": {
    "vi": [
      [
        "Định dạng",
        "HTML · CSS · JS"
      ],
      [
        "Gói tải",
        "6 file chính + 7 ảnh WebP"
      ],
      [
        "Showroom",
        "5 lựa chọn · 3 kiểu xe concept"
      ],
      [
        "Chuyển cảnh",
        "Carousel thủ công · 1,1 giây"
      ],
      [
        "Hướng dẫn",
        "10 bước · 12 prompt AI"
      ],
      [
        "Giấy phép",
        "Website cá nhân và khách hàng"
      ]
    ],
    "en": [
      [
        "Format",
        "HTML · CSS · JS"
      ],
      [
        "Package",
        "6 core files + 7 WebP images"
      ],
      [
        "Showroom",
        "5 choices · 3 concept bike styles"
      ],
      [
        "Transition",
        "Manual carousel · 1.1 seconds"
      ],
      [
        "Guide",
        "10 steps · 12 AI prompts"
      ],
      [
        "Licence",
        "Personal and client websites"
      ]
    ],
    "zh": [
      [
        "格式",
        "HTML · CSS · JS"
      ],
      [
        "文件包",
        "6个核心文件 + 7张WebP图片"
      ],
      [
        "展厅",
        "5种选择 · 3款概念车型"
      ],
      [
        "转场",
        "手动循环轮播 · 1.1秒"
      ],
      [
        "指南",
        "10步骤 · 12个AI提示词"
      ],
      [
        "授权",
        "个人与客户网站"
      ]
    ]
  },
  "copy": {
    "vi": {
      "name": "Aerox Studio",
      "desc": "Showroom xe máy xanh đen với 5 lựa chọn xe/màu, ảnh tự tạo tách nền và carousel trượt vòng lặp 1,1 giây chỉ chạy khi bấm. Có gallery, phóng lớn ảnh, hover và scroll reveal. Giá và mẫu xe là concept minh hoạ; không có đặt xe hoặc thanh toán. Nhận diện bên thứ ba cần thay theo thương hiệu của khách.",
      "tags": [
        "Xe máy",
        "Showroom",
        "Carousel"
      ]
    },
    "en": {
      "name": "Aerox Studio",
      "desc": "A dark green motorcycle showroom with five bike/colour choices, original cutout artwork and a looping 1.1-second manual carousel. Gallery, image zoom, hover and scroll reveals. Illustrative concept models and prices; no vehicle ordering or payments. Replace third-party branding for your own business.",
      "tags": [
        "Motorcycles",
        "Showroom",
        "Carousel"
      ]
    },
    "zh": {
      "name": "Aerox Studio",
      "desc": "深绿色摩托车展厅，含五种车型/颜色、原创透明背景图片及1.1秒手动循环轮播。提供图库、图片放大、悬停和滚动渐显。车型与价格为概念示例，不含订车或支付；使用前更换第三方品牌标识。",
      "tags": [
        "摩托车",
        "展厅",
        "轮播"
      ]
    }
  }
},

  t13: {
    slug: 'crimson-folio', cat: 'portfolio', version: '1.0.2',
    badge: '',
    specs: {
      vi: [['Định dạng', 'HTML · CSS · JS thuần'], ['Trong gói', '6 file chính + 2 ảnh WebP'], ['Khổ đã kiểm tra', '320 · 375 · 820 · 1440 px'], ['Tài liệu', '10 bước · 12 prompt AI'], ['Giấy phép', 'Website cá nhân và khách hàng'], ['Liên hệ trong mẫu', 'Email và QR; không gửi form']],
      en: [['Format', 'Plain HTML · CSS · JS'], ['Package', '6 core files + 2 WebP images'], ['Tested widths', '320 · 375 · 820 · 1440 px'], ['Documentation', '10 steps · 12 AI prompts'], ['Licence', 'Personal and client websites'], ['Template contact', 'Email and QR; no form submission']],
      zh: [['格式', '纯 HTML · CSS · JS'], ['文件包', '6 个核心文件 + 2 张 WebP 图片'], ['已测试宽度', '320 · 375 · 820 · 1440 px'], ['文档', '10 个步骤 · 12 个 AI 提示词'], ['授权', '个人与客户网站'], ['模板联系', '邮件和二维码；不含表单提交']],
    },
    copy: {
      vi: { name: 'Crimson Folio', desc: 'Giao diện portfolio cho designer độc lập: hero đỏ rượu vang với chân dung chồng chữ lớn, giới thiệu, quy trình sáu bước, bốn concept dự án và liên hệ email với QR. HTML/CSS/JS thuần, hai ảnh WebP cục bộ, menu mobile và hiệu ứng hiện dần. Không kèm backend hay gửi form.', tags: ['Portfolio', 'Designer', 'Editorial'] },
      en: { name: 'Crimson Folio', desc: 'An independent designer portfolio with a burgundy portrait-and-type hero, about section, six-step process, four project concepts and email contact with QR codes. Plain HTML/CSS/JS, two local WebP images, mobile navigation and finite scroll reveals. No backend or form submission.', tags: ['Portfolio', 'Designer', 'Editorial'] },
      zh: { name: 'Crimson Folio', desc: '独立设计师作品集模板：酒红色肖像与大字首屏、个人介绍、六步流程、四个概念项目及带二维码的邮件联系。纯 HTML/CSS/JS、两张本地 WebP 图片、移动导航与有限时长渐显动画。不含后端或表单提交。', tags: ['作品集', '设计师', '杂志风'] },
    },
  },
  t16: {
    slug: 'mint-atlas', cat: 'portfolio', version: '1.0.0', badge: '',
    specs: {
      vi: [['Định dạng', 'HTML · CSS · JS thuần'], ['Trong gói', '6 file chính + 3 ảnh WebP original'], ['Thiết kế', 'Xanh bạc hà · Nhân vật nổi khỏi banner'], ['Tương tác', 'Kỹ năng mở rộng · Xem artwork · Menu mobile'], ['Tài liệu', '10 bước · 12 prompt AI · Giấy phép thương mại'], ['Nội dung', 'Nhân vật và chỉ số hư cấu; không backend']],
      en: [['Format', 'Plain HTML · CSS · JS'], ['Package', '6 core files + 3 original WebP images'], ['Design', 'Mint palette · Layered character hero'], ['Interactions', 'Expandable abilities · Full artwork · Mobile menu'], ['Documentation', '10 steps · 12 AI prompts · Commercial licence'], ['Content', 'Fictional character and scores; no backend']],
      zh: [['格式', '纯 HTML · CSS · JS'], ['文件包', '6 个核心文件 + 3 张原创 WebP 图片'], ['设计', '薄荷绿 · 突出边框的角色首屏'], ['交互', '可展开技能 · 完整插画 · 移动菜单'], ['文档', '10 个步骤 · 12 个 AI 提示词 · 商业许可'], ['内容', '虚构角色与数值；不含后端']],
    },
    copy: {
      vi: { name: 'Mint Atlas', desc: 'Giao diện hồ sơ nhân vật anime xanh bạc hà với nhân vật original nổi khỏi banner, ba kỹ năng mở rộng, bảng chỉ số và thư viện artwork nhà kính/đêm sao. Ba ảnh AI WebP cục bộ, HTML/CSS/JS dễ sửa, hướng dẫn 10 bước và 12 prompt AI, giấy phép dùng website thương mại. Nhân vật và chỉ số hư cấu; không kèm backend, đăng nhập hoặc game service.', tags: ['Hồ sơ nhân vật', 'Anime original', 'Artwork'] },
      en: { name: 'Mint Atlas', desc: 'A mint-and-slate anime character dossier with an original explorer rising above the hero, three expandable abilities, concept statistics and glasshouse/starlight artwork. Three local AI WebP images, editable HTML/CSS/JS, ten setup steps, twelve AI prompts and a commercial website licence. Fictional character and scores; no backend, accounts or game services.', tags: ['Character dossier', 'Original anime', 'Artwork'] },
      zh: { name: 'Mint Atlas', desc: '薄荷绿与深灰配色的动漫角色档案：突出首屏边框的原创探险者、三个可展开技能、概念属性图表及温室/星夜插画。包含三张本地 AI WebP 图片、可编辑的 HTML/CSS/JS、十个设置步骤、十二个 AI 提示词和商业网站许可。角色与数值为虚构内容，不含后端、账号或游戏服务。', tags: ['角色档案', '原创动漫', '插画'] },
    },
  },
  t17: {
    slug: 'melt-muse', cat: 'portfolio', version: '1.1.0', badge: '',
    specs: {
      vi: [['Định dạng', 'HTML · CSS · JS thuần'], ['Trong gói', '6 file chính + 3 ảnh WebP'], ['Thiết kế', 'Editorial · Trắng xám · Đỏ cherry'], ['Tài liệu', '10 bước · 12 prompt AI'], ['Giấy phép', 'Website cá nhân, thương mại và khách hàng'], ['Liên hệ', 'Email; không backend hoặc gửi form']],
      en: [['Format', 'Plain HTML · CSS · JS'], ['Package', '6 core files + 3 WebP images'], ['Design', 'Editorial · Paper white · Cherry red'], ['Documentation', '10 steps · 12 AI prompts'], ['Licence', 'Personal, commercial and client websites'], ['Contact', 'Email; no backend or form submission']],
      zh: [['格式', '纯 HTML · CSS · JS'], ['文件包', '6 个核心文件 + 3 张 WebP 图片'], ['设计', '杂志风 · 纸白色 · 樱桃红'], ['文档', '10 个步骤 · 12 个 AI 提示词'], ['授权', '个人、商业与客户网站'], ['联系', '邮件；不含后端或表单提交']],
    },
    copy: {
      vi: { name: 'Melt Muse', desc: 'Portfolio thời trang và studio sáng tạo với chữ lớn, thẻ tim đỏ, nét vẽ tay và collage chân dung nghiêng. Ba ảnh AI WebP cục bộ, menu mobile, hiệu ứng hiện dần hữu hạn và liên hệ email. Kèm mã nguồn dễ sửa, giấy phép thương mại, 10 bước hướng dẫn và 12 prompt AI. Không kèm backend hay gửi form.', tags: ['Portfolio', 'Thời trang', 'Editorial'] },
      en: { name: 'Melt Muse', desc: 'A fashion and creative studio portfolio with oversized typography, a red heart note, hand-drawn details and tilted portrait collages. Three local AI WebP images, mobile navigation, finite entrance motion and email contact. Includes editable source, a commercial licence, ten setup steps and twelve AI prompts. No backend or form submission.', tags: ['Portfolio', 'Fashion', 'Editorial'] },
      zh: { name: 'Melt Muse', desc: '时尚与创意工作室作品集，包含大字排版、红心卡片、手绘细节和倾斜肖像拼贴。三张本地 AI WebP 图片、移动导航、有限时长渐显动画与邮件联系。附可编辑源码、商业许可、十个设置步骤和十二个 AI 提示词。不含后端或表单提交。', tags: ['作品集', '时尚', '杂志风'] },
    },
  },
  t18: {
    slug: 'apartment-flow', cat: 'commerce', version: '1.0.0', badge: '',
    specs: {
      vi: [['Định dạng', 'HTML · CSS · JS thuần'], ['Background', '240 frame WebP · 1920×1080'], ['Tương tác', 'Cuộn hai chiều · 4 chương'], ['Thiết kế', 'Glass · Lumière Residence'], ['Nội dung', 'Căn hộ AI minh họa'], ['Trong gói', '247 file · 10 bước · 12 prompt AI']],
      en: [['Format', 'Plain HTML · CSS · JS'], ['Background', '240 WebP frames · 1920×1080'], ['Interaction', 'Two-way scrolling · 4 chapters'], ['Design', 'Glass · Lumière Residence'], ['Content', 'Illustrative AI apartment'], ['Package', '247 files · 10 steps · 12 AI prompts']],
      zh: [['格式', '纯 HTML · CSS · JS'], ['背景', '240 帧 WebP · 1920×1080'], ['交互', '双向滚动 · 4 个章节'], ['设计', '毛玻璃 · Lumière Residence'], ['内容', 'AI 公寓示意'], ['文件包', '247 个文件 · 10 个步骤 · 12 个 AI 提示词']],
    },
    copy: {
      vi: { name: 'Apartment Flow', desc: 'Giao diện giới thiệu căn hộ Lumière Residence với thẻ glass và camera đi từ cửa vào phòng khách, bếp, phòng ngủ theo cuộn. Chuỗi 240 frame từ video AI, điều hướng 4 chương và dialog thông tin demo. Không kèm đặt lịch hay backend. Kèm giấy phép thương mại và hướng dẫn tùy chỉnh.', tags: ['Căn hộ', 'Glass', 'Scroll animation'] },
      en: { name: 'Apartment Flow', desc: 'A glass apartment presentation for Lumière Residence. Scroll through a continuous entrance, living room, kitchen and bedroom camera journey with 240 AI video frames, four chapters and a demo information dialog. No booking or backend. Includes a commercial licence and customisation guide.', tags: ['Apartment', 'Glass', 'Scroll animation'] },
      zh: { name: 'Apartment Flow', desc: 'Lumière Residence 公寓毛玻璃展示页面：随滚动连续游览入口、客厅、厨房和卧室。包含 AI 视频生成的 240 帧、四个章节与演示说明弹窗。不含预约或后端。包含商业许可与定制指南。', tags: ['公寓', '毛玻璃', '滚动动画'] },
    },
  },
  t14: {
    slug: 'lingoglass', cat: 'education', group: 'agent', version: '1.0.1',
    specs: {
      vi: [['Định dạng', 'Ứng dụng Electron · React · TypeScript'], ['Nền tảng', 'Windows / macOS'], ['Học tập', 'A-B Repeat · Tra từ · Shadowing'], ['Trong gói', 'Mã nguồn và tài liệu LingoGlass']],
      en: [['Format', 'Electron app · React · TypeScript'], ['Platform', 'Windows / macOS'], ['Learning', 'A-B Repeat · Dictionary · Shadowing'], ['Package', 'LingoGlass source and documentation']],
      zh: [['格式', 'Electron 应用 · React · TypeScript'], ['平台', 'Windows / macOS'], ['学习', 'A-B 复读 · 查词 · 跟读'], ['文件包', 'LingoGlass 源码和文档']],
    },
    copy: {
      vi: { name: 'LingoGlass Player', desc: 'Ứng dụng học ngoại ngữ qua video và podcast: phụ đề tương tác, lặp câu A-B, tra từ điển và luyện nói Shadowing. Giao diện kính mờ, trình phát nổi và lưu dữ liệu học tập cục bộ. Kèm mã nguồn và hướng dẫn ứng dụng.', tags: ['Desktop App', 'Học ngoại ngữ', 'A-B Repeat'] },
      en: { name: 'LingoGlass Player', desc: 'A desktop language-learning player for videos and podcasts, with interactive subtitles, A-B repeat, dictionary lookup and shadowing practice. Glass interface, floating player controls and local learning storage. Includes app source and documentation.', tags: ['Desktop App', 'Language learning', 'A-B Repeat'] },
      zh: { name: 'LingoGlass 播放器', desc: '用于视频与播客外语学习的桌面播放器，支持交互字幕、A-B 复读、查词和跟读练习。毛玻璃界面、悬浮播放器控件与本地学习记录，附应用源码和文档。', tags: ['桌面应用', '外语学习', 'A-B 复读'] },
    },
  },
  t21: {
    slug: 'music-app', cat: 'entertainment', version: '1.0.0',
    specs: {
      vi: [['Định dạng', 'HTML/CSS/JavaScript thuần'], ['Trong gói', '12 file, 5 ảnh WebP và 1 WAV gốc'], ['Âm thanh', 'Một bản demo tổng hợp 3:09 cho mọi bài'], ['Tương tác', 'Tìm kiếm, phát, seek, volume, yêu thích và theo dõi trong phiên'], ['Tài liệu', '10 bước, 12 prompt AI, giấy phép Forge zone'], ['Phạm vi', 'Không tài khoản, backend hoặc streaming']],
      en: [['Format', 'Plain HTML/CSS/JavaScript'], ['Package', '12 files, 5 WebP images and 1 original WAV'], ['Audio', 'One original 3:09 synthesized demo for every selection'], ['Interaction', 'Search, playback, seek, volume, session favourites and follow'], ['Documentation', '10 steps, 12 AI prompts, Forge zone licence'], ['Scope', 'No accounts, backend or streaming']],
      zh: [['格式', '纯 HTML/CSS/JavaScript'], ['文件包', '12 个文件、5 张 WebP 与 1 个原创 WAV'], ['音频', '所有选择播放同一个 3:09 原创合成示例'], ['交互', '搜索、播放、进度、音量、会话收藏与关注'], ['文档', '10 个步骤、12 个 AI 提示词与 Forge zone 许可'], ['范围', '不含账号、后端或流媒体']],
    },
    copy: {
      vi: { name: 'Music App', desc: 'Giao diện âm nhạc retro nền kem, coral và cobalt: playlist, album, hồ sơ nghệ sĩ, trình phát và thư viện. Năm ảnh tự tạo; âm thanh demo gốc 3:09, tìm kiếm cục bộ, yêu thích và theo dõi trong phiên. Reveal theo cuộn hữu hạn; không backend, tài khoản hoặc streaming.', tags: ['Âm nhạc', 'Retro', 'Ảnh tự tạo'] },
      en: { name: 'Music App', desc: 'A cream, coral and cobalt retro music interface with playlist, album, artist, player and library cards. Five original generated images, a 3:09 original audio demo, local search and session favourites/follow. Finite scroll reveals; no backend, accounts or streaming.', tags: ['Music', 'Retro', 'Original imagery'] },
      zh: { name: 'Music App', desc: '奶油白、珊瑚色与钴蓝复古音乐界面，包含播放列表、专辑、艺人、播放器与音乐库。五张原创生成图片、3:09 原创示例音频、本地搜索及会话收藏与关注。有限滚动渐显，不含后端、账号或流媒体。', tags: ['音乐', '复古', '原创图片'] },
    },
  },

  t20: {
    slug: 'laila', cat: 'portfolio', version: '1.0.0',
    specs: {
      vi: [['Định dạng', 'HTML, CSS và JavaScript thuần'], ['Trong gói', '6 file chính và 1 ảnh WebP gốc'], ['Thiết kế', 'Hồng neon, xanh đen, chân dung kimono'], ['Tương tác', 'Menu mobile, dự án mở rộng, reveal hữu hạn'], ['Tài liệu', '10 bước, 12 prompt AI, giấy phép thương mại'], ['Liên hệ', 'Email; không backend hoặc gửi form']],
      en: [['Format', 'Plain HTML, CSS and JavaScript'], ['Package', '6 core files and 1 original WebP portrait'], ['Design', 'Neon pink, navy and kimono portrait'], ['Interactions', 'Mobile menu, expandable projects, finite reveal'], ['Documentation', '10 steps, 12 AI prompts, commercial licence'], ['Contact', 'Email; no backend or form submission']],
      zh: [['格式', '纯 HTML、CSS 与 JavaScript'], ['文件包', '6 个核心文件与 1 张原创 WebP 肖像'], ['设计', '霓虹粉、深蓝与和服肖像'], ['交互', '移动菜单、可展开项目、有限渐显动画'], ['文档', '10 个步骤、12 个 AI 提示词与商业许可'], ['联系', '邮件；不含后端或表单提交']],
    },
    copy: {
      vi: { name: 'Laila', desc: 'Portfolio cho developer và designer sáng tạo theo phong cách hồng neon và xanh đen: chân dung kimono tự tạo, quạt hồng, hoa trang trí, giới thiệu, lộ trình, kỹ năng và ba concept dự án mở rộng. Menu mobile, reveal hữu hạn mặc định bật và liên hệ email. Mã HTML/CSS/JS dễ sửa, 10 bước hướng dẫn và 12 prompt AI; không backend, gửi form hoặc tải CV PDF.', tags: ['Portfolio', 'Hồng neon', 'Chân dung gốc'] },
      en: { name: 'Laila', desc: 'A pink and navy creative developer portfolio with an original kimono portrait, folding fan, blossom details, about, journey, skills and three expandable project concepts. Mobile navigation, finite entrances and email contact. Editable HTML/CSS/JS, ten setup steps and twelve AI prompts; no backend, form submission or PDF résumé download.', tags: ['Portfolio', 'Neon pink', 'Original portrait'] },
      zh: { name: 'Laila', desc: '粉色与深蓝的创意开发者作品集，包含原创和服肖像、折扇、花朵装饰、个人介绍、学习历程、技能和三个可展开项目概念。移动导航、有限渐显动画与邮件联系。可编辑 HTML/CSS/JS、十个设置步骤和十二个 AI 提示词；不含后端、表单提交或 PDF 简历下载。', tags: ['作品集', '霓虹粉', '原创肖像'] },
    },
  },


  t19: {
    slug: 'velora', cat: 'commerce', version: '1.3.0',
    specs: {
      vi: [['Định dạng', 'HTML · CSS · JS thuần'], ['Trong gói', '9 file · SVG nội tuyến'], ['Sản phẩm', '3 mẫu xe · 6 màu khung'], ['Tương tác', 'Carousel · Chi tiết · Cấu hình riêng từng xe'], ['Tài liệu', '10 bước · 12 prompt AI · Giấy phép thương mại'], ['Liên hệ', 'COD sau cấu hình; không kèm tồn kho']],
      en: [['Format', 'Plain HTML · CSS · JS'], ['Package', '9 files · Inline SVG'], ['Products', '3 bikes · 6 frame finishes'], ['Interactions', 'Carousel · Details · Per-bike configuration'], ['Documentation', '10 steps · 12 AI prompts · Commercial licence'], ['Contact', 'COD setup; no inventory backend']],
      zh: [['格式', '纯 HTML · CSS · JS'], ['文件包', '6 个文件 · 内联 SVG'], ['产品', '3 款车辆 · 6 种车架配色'], ['交互', '轮播 · 详情 · 每辆车独立配置'], ['文档', '10 个步骤 · 12 个 AI 提示词 · 商业许可'], ['联系', 'COD 配置；不含库存后台']],
    },
    copy: {
      vi: { name: 'Velora', desc: "Showroom xe đạp gấp, ba mẫu, sáu màu khung và cấu hình riêng từng xe. Có giỏ, thông tin giao hàng và COD khi chủ shop kết nối dịch vụ nhận đơn. Kèm hướng dẫn thanh toán online bằng tài khoản riêng; không kèm tồn kho hoặc tài khoản cổng thanh toán.", tags: ['Xe đạp', 'Chuyển sản phẩm', '6 màu khung'] },
      en: { name: 'Velora', desc: "A folding-bike showroom with three models, six finishes and per-bike configuration. Includes a bag, delivery details and COD after the shop connects its order service. Includes guidance for online payments with the merchant’s own account; no inventory backend or gateway account is bundled.", tags: ['Bicycles', 'Product transitions', '6 finishes'] },
      zh: { name: 'Velora', desc: "折叠自行车展示店，含三款车型、六种颜色与独立配置。 包含购物袋、配送信息与 COD；店主连接订单服务后可接单。附自有账户在线支付接入说明，不含库存后台或支付账户。", tags: ['自行车', '产品转场', '6种配色'] },
    },
  },

  t22: {
    slug: 'kinetiq', cat: TEMPLATE_CATEGORIES.kinetiq,
    access: 'free',
    copy: {
      vi: { name: 'Kinetiq', desc: 'Giao diện giới thiệu hệ truyền động và linh kiện robot công nghiệp: minh họa cơ khí, danh mục hệ thống và CTA liên hệ. Không kèm thanh toán hoặc quản lý đơn hàng.', tags: ['Công nghiệp', 'Linh kiện', 'Giới thiệu sản phẩm'] },
      en: { name: 'Kinetiq', desc: 'An industrial actuation and robotics component showcase with mechanical illustrations, system listings and an enquiry CTA. No checkout or order backend.', tags: ['Industrial', 'Components', 'Product showcase'] },
      zh: { name: 'Kinetiq', desc: '工业传动与机器人零件展示模板，包含机械插图、系统列表与联系入口。不含支付或订单后台。', tags: ['工业', '零件', '产品展示'] },
    },
  },
  t23: {
    slug: 'watchroom', cat: TEMPLATE_CATEGORIES.watchroom, version: '1.3.0',
    copy: {
      vi: { name: 'Watchroom', desc: "Showroom đồng hồ nền tối, ba mẫu và carousel chuyển động. Có giỏ, thông tin giao hàng và COD khi chủ shop kết nối dịch vụ nhận đơn. Kèm hướng dẫn thanh toán online bằng tài khoản riêng; không kèm tồn kho hoặc tài khoản cổng thanh toán.", tags: ['Đồng hồ', 'Showroom', 'Carousel'] },
      en: { name: 'Watchroom', desc: "A dark watch showroom with three models and an animated carousel. Includes a bag, delivery details and COD after the shop connects its order service. Includes guidance for online payments with the merchant’s own account; no inventory backend or gateway account is bundled.", tags: ['Watches', 'Showroom', 'Carousel'] },
      zh: { name: 'Watchroom', desc: "深色腕表展示店，含三款腕表与动画轮播。 包含购物袋、配送信息与 COD；店主连接订单服务后可接单。附自有账户在线支付接入说明，不含库存后台或支付账户。", tags: ['手表', '展厅', '轮播'] },
    },
  },
  t15: {
    slug: 'shirtline', cat: TEMPLATE_CATEGORIES.shirtline,
 version: '1.2.0',
    copy: {
      vi: { name: 'Shirtline', desc: "Showroom năm mẫu sơ mi, vòng quay oval tự động và chọn size. Có giỏ, thông tin giao hàng và COD khi chủ shop kết nối dịch vụ nhận đơn. Kèm hướng dẫn thanh toán online bằng tài khoản riêng; không kèm tồn kho hoặc tài khoản cổng thanh toán.", tags: ['Áo sơ mi', 'Showroom', 'Carousel'] },
      en: { name: 'Shirtline', desc: "A five-shirt showroom with an automatic oval orbit and size selection. Includes a bag, delivery details and COD after the shop connects its order service. Includes guidance for online payments with the merchant’s own account; no inventory backend or gateway account is bundled.", tags: ['Shirts', 'Showroom', 'Carousel'] },
      zh: { name: 'Shirtline', desc: "五款衬衫展示店，含自动椭圆轮播与尺码选择。 包含购物袋、配送信息与 COD；店主连接订单服务后可接单。附自有账户在线支付接入说明，不含库存后台或支付账户。", tags: ['衬衫', '展厅', '轮播'] },
    },
  },
  t24: {
    slug: 'yellow-beast', cat: TEMPLATE_CATEGORIES['yellow-beast'], version: '1.0.0',
    copy: {
      vi: { name: 'The Yellow Beast', desc: 'Showroom siêu xe 2018 Porsche 911 Turbo S Exclusive Series: phối màu vàng kim loại ấn tượng, chuyển đổi 3 góc nhìn camera mượt mà, đồng hồ đo vòng tua tương tác, mô phỏng âm thanh động cơ Flat-6 và đăng ký VIP allocation. Đầy đủ animation chuyển cảnh và scroll.', tags: ['Siêu xe', 'Porsche', 'Animation', 'Showroom'] },
      en: { name: 'The Yellow Beast', desc: 'A bespoke 2018 Porsche 911 Turbo S Exclusive Series supercar showroom: Golden Yellow Metallic styling, smooth 3-perspective camera switcher, interactive revving tachometer, synthetic Flat-6 exhaust audio, and VIP allocation pre-order. Complete with scroll animations and cinematic transitions.', tags: ['Supercar', 'Porsche', 'Animation', 'Showroom'] },
      zh: { name: 'The Yellow Beast', desc: '2018 保时捷 911 Turbo S Exclusive Series 专属定制超级跑车展厅：耀眼金属金黄配色、丝滑三视角相机切换、交互式转速表轰油门、合成水平对置六缸排气声浪及 VIP 预订。具备完整的滚动渐显与电影级转场动效。', tags: ['超级跑车', '保时捷', '动画', '展厅'] },
    },
  },
  t12: {
    slug: 'novatrend', cat: TEMPLATE_CATEGORIES['novatrend'], version: '1.2.0',
    copy: {
      vi: { name: 'NovaTrend', desc: "Cửa hàng đa ngành với tìm kiếm, lọc và giỏ lưu trên thiết bị. Có giỏ, thông tin giao hàng và COD khi chủ shop kết nối dịch vụ nhận đơn. Kèm hướng dẫn thanh toán online bằng tài khoản riêng; không kèm tồn kho hoặc tài khoản cổng thanh toán.", tags: ['E-Commerce', 'Thời trang', 'Giỏ hàng', 'Animation'] },
      en: { name: 'NovaTrend', desc: "A multi-category storefront with search, filters and a persistent local cart. Includes a bag, delivery details and COD after the shop connects its order service. Includes guidance for online payments with the merchant’s own account; no inventory backend or gateway account is bundled.", tags: ['E-Commerce', 'Fashion', 'Cart', 'Animation'] },
      zh: { name: 'NovaTrend', desc: "多品类商店，含搜索、筛选与本地购物车。 包含购物袋、配送信息与 COD；店主连接订单服务后可接单。附自有账户在线支付接入说明，不含库存后台或支付账户。", tags: ['电子商务', '时尚', '购物车', '动画'] },
    },
  },
  t11: {
    slug: 'diginest', cat: TEMPLATE_CATEGORIES['diginest'], version: '1.3.0',
    copy: {
      vi: { name: 'DigiNest', desc: "Cửa hàng công nghệ tông teal–kem–cam, sáu sản phẩm và giỏ chuyển động. Có giỏ, thông tin giao hàng và COD khi chủ shop kết nối dịch vụ nhận đơn. Kèm hướng dẫn thanh toán online bằng tài khoản riêng; không kèm tồn kho hoặc tài khoản cổng thanh toán.", tags: ['Cửa hàng công nghệ', 'Giỏ hàng', 'Animation'] },
      en: { name: 'DigiNest', desc: "A teal, cream and orange technology store with six products and an animated cart. Includes a bag, delivery details and COD after the shop connects its order service. Includes guidance for online payments with the merchant’s own account; no inventory backend or gateway account is bundled.", tags: ['Technology store', 'Local cart', 'Animation'] },
      zh: { name: 'DigiNest', desc: "青绿、奶油和橙色科技商店，含六款产品与动画购物车。 包含购物袋、配送信息与 COD；店主连接订单服务后可接单。附自有账户在线支付接入说明，不含库存后台或支付账户。", tags: ['科技商店', '本地购物车', '动画'] },
    },
  },
  t10: {
    slug: 'soniq', cat: TEMPLATE_CATEGORIES['soniq'], video: true, version: '1.1.0',
    copy: {
      vi: { name: 'Soniq', desc: "Cửa hàng tai nghe pastel, chọn màu và carousel chuyển hai chiều. Có giỏ, thông tin giao hàng và COD khi chủ shop kết nối dịch vụ nhận đơn. Kèm hướng dẫn thanh toán online bằng tài khoản riêng; không kèm tồn kho hoặc tài khoản cổng thanh toán.", tags: ['Tai nghe', 'Pastel', 'Giỏ chọn màu'] },
      en: { name: 'Soniq', desc: "A pastel headphone store with colour selection and a directional carousel. Includes a bag, delivery details and COD after the shop connects its order service. Includes guidance for online payments with the merchant’s own account; no inventory backend or gateway account is bundled.", tags: ['Headphones', 'Pastel', 'Colour picker'] },
      zh: { name: 'Soniq', desc: "柔和色耳机商店，含配色选择与双向轮播。 包含购物袋、配送信息与 COD；店主连接订单服务后可接单。附自有账户在线支付接入说明，不含库存后台或支付账户。", tags: ['耳机', '粉彩', '配色选择'] },
    },
  },
  t9: {
    slug: 'auralis', cat: TEMPLATE_CATEGORIES['auralis'], video: true, version: '1.3.0',
    copy: {
      vi: { name: 'Auralis', desc: "Showroom tai nghe tím–cyan với carousel ba mẫu và chuyển cảnh theo cuộn. Có giỏ, thông tin giao hàng và COD khi chủ shop kết nối dịch vụ nhận đơn. Kèm hướng dẫn thanh toán online bằng tài khoản riêng; không kèm tồn kho hoặc tài khoản cổng thanh toán.", tags: ['Tai nghe', 'Scroll animation', 'Ảnh tự tạo'] },
      en: { name: 'Auralis', desc: "A violet–cyan earbud showroom with a three-model carousel and scroll transitions. Includes a bag, delivery details and COD after the shop connects its order service. Includes guidance for online payments with the merchant’s own account; no inventory backend or gateway account is bundled.", tags: ['Audio', 'Scroll animation', 'Original imagery'] },
      zh: { name: 'Auralis', desc: "紫青色耳机展示店，含三款轮播与滚动转场。 包含购物袋、配送信息与 COD；店主连接订单服务后可接单。附自有账户在线支付接入说明，不含库存后台或支付账户。", tags: ['耳机', '滚动动画', '原创图片'] },
    },
  },
  t1: {
    slug: 'japan-trails', cat: TEMPLATE_CATEGORIES['japan-trails'],
    access: 'free',
    copy: {
      vi: { name: 'Japan Trails', desc: 'Giao diện du lịch Nhật Bản phong cách điện ảnh: ảnh Phú Sĩ và chùa lúc bình minh, thẻ kính mờ, hành trình và phố Kyoto. CTA liên hệ qua email.', tags: ['Du lịch Nhật Bản', 'Cinematic', 'Kính mờ'] },
      en: { name: 'Japan Trails', desc: 'A cinematic Japan travel template with Fuji sunrise photography, frosted-glass cards, journey ideas, Kyoto imagery and an email enquiry.', tags: ['Japan travel', 'Cinematic', 'Frosted glass'] },
      zh: { name: 'Japan Trails', desc: '电影感日本旅游模板：富士山日出照片、磨砂玻璃卡片、行程灵感、京都街景与邮件咨询入口。', tags: ['日本旅行', '电影感', '磨砂玻璃'] },
    },
  },
  t2: {
    slug: 'tidal',
    cat: TEMPLATE_CATEGORIES['tidal'],
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
    slug: 'keystead',
    cat: TEMPLATE_CATEGORIES['keystead'],
    copy: {
      vi: {
        name: 'Keystead',
        desc: 'Trang cho thuê nhà và căn hộ: hero ảnh phố lúc hoàng hôn, thanh duyệt nhanh dẫn tới từng mục, sáu tin nhà có ảnh, giá và ngày trống, khu vực, quy trình thuê và CTA đặt lịch xem qua email. Không có tìm kiếm hay cơ sở dữ liệu thật.',
        tags: ['Bất động sản', 'Cho thuê', 'Ảnh gốc'],
      },
      en: {
        name: 'Keystead',
        desc: 'A homes and rentals page: a dusk street-photo hero, a browse bar linking to each section, six photo listing cards with rent and availability, neighbourhoods, a renting guide and an email viewing CTA. No live search or listings database.',
        tags: ['Real estate', 'Rentals', 'Original imagery'],
      },
      zh: {
        name: 'Keystead',
        desc: '房屋与公寓租赁页面：黄昏街景首屏、链接到各版块的快速浏览栏、六个带照片、租金和入住日期的房源卡片、街区介绍、租房流程以及邮件预约看房入口。不含实时搜索或房源数据库。',
        tags: ['房地产', '租赁', '原创图片'],
      },
    },
  },
  t4: {
    slug: 'solenne', cat: TEMPLATE_CATEGORIES['solenne'],
 version: '2.1.0',
    copy: {
      vi: { name: 'Solenne', desc: "Giao diện skincare tông kem và hồng đất, ảnh sản phẩm gốc và bộ sưu tập. Có giỏ, thông tin giao hàng và COD khi chủ shop kết nối dịch vụ nhận đơn. Kèm hướng dẫn thanh toán online bằng tài khoản riêng; không kèm tồn kho hoặc tài khoản cổng thanh toán.", tags: ['Skincare', 'Editorial', 'Ảnh sản phẩm'] },
      en: { name: 'Solenne', desc: "An ivory and rose skincare store with original product imagery and a collection. Includes a bag, delivery details and COD after the shop connects its order service. Includes guidance for online payments with the merchant’s own account; no inventory backend or gateway account is bundled.", tags: ['Skincare', 'Editorial', 'Product photography'] },
      zh: { name: 'Solenne', desc: "奶油白与玫瑰色护肤商店，含原创产品图与产品系列。 包含购物袋、配送信息与 COD；店主连接订单服务后可接单。附自有账户在线支付接入说明，不含库存后台或支付账户。", tags: ['护肤', '杂志风', '产品摄影'] },
    },
  },
  t5: {
    slug: 'aeris', cat: TEMPLATE_CATEGORIES['aeris'], video: true, version: '1.4.0',
    copy: {
      vi: { name: 'Aeris', desc: "Showroom tai nghe pastel xanh–hồng, ba màu và chương âm thanh theo cuộn. Có giỏ, thông tin giao hàng và COD khi chủ shop kết nối dịch vụ nhận đơn. Kèm hướng dẫn thanh toán online bằng tài khoản riêng; không kèm tồn kho hoặc tài khoản cổng thanh toán.", tags: ['Tai nghe', 'Chuyển cảnh', 'Ảnh tự tạo'] },
      en: { name: 'Aeris', desc: "A pastel blue–pink headphone showroom with three colourways and a scroll sound story. Includes a bag, delivery details and COD after the shop connects its order service. Includes guidance for online payments with the merchant’s own account; no inventory backend or gateway account is bundled.", tags: ['Headphones', 'Transitions', 'Original imagery'] },
      zh: { name: 'Aeris', desc: "粉蓝色耳机展示店，含三种配色与滚动声音章节。 包含购物袋、配送信息与 COD；店主连接订单服务后可接单。附自有账户在线支付接入说明，不含库存后台或支付账户。", tags: ['耳机', '转场动画', '原创图片'] },
    },
  },
  t6: {
    slug: 'vybe', cat: TEMPLATE_CATEGORIES['vybe'], video: false,
 version: '1.1.0',
    copy: {
      vi: { name: 'VYBE', desc: "Cửa hàng streetwear coral với năm mẫu áo, chọn size và chuyển sản phẩm Morge. Có giỏ, thông tin giao hàng và COD khi chủ shop kết nối dịch vụ nhận đơn. Kèm hướng dẫn thanh toán online bằng tài khoản riêng; không kèm tồn kho hoặc tài khoản cổng thanh toán.", tags: ['Streetwear', 'Morge', '5 mẫu áo'] },
      en: { name: 'VYBE', desc: "A coral streetwear store with five pieces, size selection and Morge transitions. Includes a bag, delivery details and COD after the shop connects its order service. Includes guidance for online payments with the merchant’s own account; no inventory backend or gateway account is bundled.", tags: ['Streetwear', 'Morge', '5 pieces'] },
      zh: { name: 'VYBE', desc: "珊瑚色街头服饰店，含五款服饰、尺码选择与 Morge 转场。 包含购物袋、配送信息与 COD；店主连接订单服务后可接单。附自有账户在线支付接入说明，不含库存后台或支付账户。", tags: ['街头服饰', 'Morge', '5款服饰'] },
    },
  },
  t7: {
    slug: 'astra-interior', cat: TEMPLATE_CATEGORIES['astra-interior'], video: true, version: '2.1.0',
    copy: {
      vi: { name: 'Mellow Coffee', desc: "Cửa hàng cà phê và bánh tông hổ phách, lọc thực đơn và giỏ món. Có giỏ, thông tin giao hàng và COD khi chủ shop kết nối dịch vụ nhận đơn. Kèm hướng dẫn thanh toán online bằng tài khoản riêng; không kèm tồn kho hoặc tài khoản cổng thanh toán.", tags: ['Cà phê & bánh', 'Chuyển cảnh', 'Giỏ chọn món'] },
      en: { name: 'Mellow Coffee', desc: "An amber café and bakery storefront with menu filters and a local bag. Includes a bag, delivery details and COD after the shop connects its order service. Includes guidance for online payments with the merchant’s own account; no inventory backend or gateway account is bundled.", tags: ['Coffee & bakery', 'Motion', 'Local bag'] },
      zh: { name: 'Mellow Coffee', desc: "琥珀色咖啡与烘焙商店，含菜单筛选与购物袋。 包含购物袋、配送信息与 COD；店主连接订单服务后可接单。附自有账户在线支付接入说明，不含库存后台或支付账户。", tags: ['咖啡与烘焙', '动画转场', '本地购物袋'] },
    },
  },
  t8: {
    slug: 'pinehaven', cat: TEMPLATE_CATEGORIES['pinehaven'],
    copy: {
      vi: { name: 'Pinehaven', desc: 'Giao diện nghỉ dưỡng cabin giữa rừng sương: ảnh gốc tự tạo, tiêu đề lớn, thẻ lưu trú nổi và các mục giới thiệu cabin, khung cảnh, trải nghiệm. CTA dẫn đến liên hệ; không có hệ thống đặt phòng.', tags: ['Cabin retreat', 'Ảnh gốc', 'Nghỉ dưỡng'] },
      en: { name: 'Pinehaven', desc: 'A misty forest cabin retreat page with original generated photography, oversized type, a floating stay card and cabin, setting and experience sections. Enquiry CTA; no booking system.', tags: ['Cabin retreat', 'Original imagery', 'Travel'] },
      zh: { name: 'Pinehaven', desc: '森林雾景木屋度假网站模板：原创生成摄影、大标题、悬浮住宿卡片，以及木屋、环境和体验介绍。通过联系入口咨询，不含预订系统。', tags: ['森林木屋', '原创图片', '度假'] },
    },
  },
};

/** Tên file .zip (không đuôi) chứa mẫu này. Mã chưa có mẫu thật thì tìm file
 *  trùng tên mã. */
export function templateSlug(id: string): string {
  return REAL_TEMPLATES[id]?.slug ?? id;
}

/** Ảnh preview theo id ô trong markup ('agentic-tpl-t1' → '/previews/kinetiq.webp').
 *
 *  Mỗi mẫu có hai ô: 'agentic-tpl-*' ở thư viện và trang chi tiết,
 *  'agentic-home-*' ở dải trưng bày trang chủ. Trước đây chỉ khai ô thư viện,
 *  nên mẫu thật đưa lên trang chủ vẫn hiện khung ảnh trống. */
export const REAL_TEMPLATE_PREVIEWS: Record<string, string> = Object.fromEntries(
  Object.entries(REAL_TEMPLATES).flatMap(([id, t]) => [
    [`agentic-tpl-${id}`, `/previews/${t.slug}.webp${t.version ? '?v=' + t.version : ''}`],
    [`agentic-home-${id}`, `/previews/${t.slug}.webp${t.version ? '?v=' + t.version : ''}`],
    ...(t.video ? [
      [`agentic-view-${id}-0`, `/previews/${t.slug}.webp${t.version ? '?v=' + t.version : ''}`],
      [`agentic-view-${id}-1`, `/previews/${t.slug}-tablet.webp${t.version ? '?v=' + t.version : ''}`],
      [`agentic-view-${id}-2`, `/previews/${t.slug}-mobile.webp${t.version ? '?v=' + t.version : ''}`],
    ] : []),
  ])
);

export const REAL_TEMPLATE_VIDEOS: Record<string, string> = Object.fromEntries(
  Object.entries(REAL_TEMPLATES).flatMap(([id, t]) => {
    const recording = (PREVIEW_RECORDINGS as Record<string, { revision: string; productVersion: string; status: string }>)[t.slug];
    // Recording revisions are independent of customer ZIP versions. Do not
    // enable device stills via t.video just because a desktop clip exists.
    if (!recording || recording.status !== 'recorded' || recording.productVersion !== (t.version ?? 'unversioned')) return [];
    const src = `/previews/${t.slug}.mp4?v=${recording.revision}`;
    return [[`agentic-tpl-${id}`, src], [`agentic-home-${id}`, src]];
  })
);
