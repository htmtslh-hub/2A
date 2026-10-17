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
  t50: {
  "slug": "vesper-ai",
  "cat": "commerce",
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
  t49: {
    slug: 'chain-warden',
    cat: 'entertainment',
    version: '1.0.0',
    copy: {
      vi: {
        name: 'Chain Warden',
        desc: 'Landing page giới thiệu tướng giả tưởng đen tối và cai ngục xiềng xích theo ảnh tham chiếu: sân khấu linh hồn lục bảo, 5 kỹ năng P/Q/W/E/R tương tác, 4 ngoại trang đổi ánh sáng sân khấu và hộp thoại tiêu điểm.',
        tags: ['Game showcase', '5 kỹ năng', '4 ngoại trang'],
      },
      en: {
        name: 'Chain Warden',
        desc: 'A dark-fantasy spectral champion showcase inspired by the reference design, featuring an emerald soul-lantern stage, interactive 5-ability P/Q/W/E/R matrix, 4 skin realms and spotlight dialogs.',
        tags: ['Game showcase', '5 abilities', '4 skins'],
      },
      zh: {
        name: 'Chain Warden',
        desc: '暗黑奇幻幽魂典狱长英雄展示页，含翠绿魂灯舞台、P/Q/W/E/R五技能交互面板、四款皮肤领域切换及聚光灯预览对话框。',
        tags: ['游戏英雄展示', '5项技能', '4款皮肤'],
      },
    },
    specs: {
      vi: [
        ['Định dạng', 'HTML / CSS / JavaScript'],
        ['Gói tải', '10 files'],
        ['Phạm vi', 'Giao diện tĩnh · không backend'],
      ],
      en: [
        ['Format', 'HTML / CSS / JavaScript'],
        ['Package', '10 files'],
        ['Scope', 'Static interface · no backend'],
      ],
      zh: [
        ['格式', 'HTML / CSS / JavaScript'],
        ['下载包', '10 files'],
        ['范围', '静态界面 · 无后端'],
      ],
    },
  },
  t48: {
    slug: 'fitclub-food',
    cat: 'commerce',
    version: '1.0.0',
    copy: {
      vi: {
        name: 'FitClub Food',
        desc: 'Landing page câu lạc bộ ẩm thực lành mạnh và tô dinh dưỡng thể hình nền tím mận tối theo ảnh tham chiếu, ba khay món WebP trong suốt, chọn khẩu phần và đặt món qua email.',
        tags: ['Ẩm thực lành mạnh', '3 khay món', 'Ảnh trong suốt'],
      },
      en: {
        name: 'FitClub Food',
        desc: 'A dark-plum fitness and healthy club bowl landing page inspired by the reference design, featuring three transparent WebP platter cutouts, portion tiers and direct email enquiry.',
        tags: ['Healthy food', '3 platters', 'Transparent cutouts'],
      },
      zh: {
        name: 'FitClub Food',
        desc: '深梅紫健身与健康俱乐部营养碗展示页，含三款透明WebP餐盘切图、份量档位选择及邮件订餐咨询。',
        tags: ['健康轻食', '3款餐盘', '透明切图'],
      },
    },
    specs: {
      vi: [
        ['Định dạng', 'HTML / CSS / JavaScript'],
        ['Gói tải', '9 files'],
        ['Phạm vi', 'Giao diện tĩnh · không backend'],
      ],
      en: [
        ['Format', 'HTML / CSS / JavaScript'],
        ['Package', '9 files'],
        ['Scope', 'Static interface · no backend'],
      ],
      zh: [
        ['格式', 'HTML / CSS / JavaScript'],
        ['下载包', '9 files'],
        ['范围', '静态界面 · 无后端'],
      ],
    },
  },
  t46: {
    slug: 'volt-hoodie',
    cat: 'commerce',
    version: '1.0.0',
    copy: {
      vi: {
        name: 'Volt Hoodie',
        desc: 'Showroom áo hoodie streetwear phối mảng chéo vàng volt và đen carbon, ba phối màu WebP trong suốt, chọn size S/M/L và đặt hàng qua email.',
        tags: ['Thời trang', '3 phối màu', 'Ảnh tự tạo'],
      },
      en: {
        name: 'Volt Hoodie',
        desc: 'A diagonal volt-yellow and matte-carbon streetwear hoodie showcase with three transparent WebP colourways, S/M/L size selection and email order enquiry.',
        tags: ['Streetwear', '3 colourways', 'Original imagery'],
      },
      zh: {
        name: 'Volt Hoodie',
        desc: '电光黄与哑光碳黑斜切街头连帽衫展示页，含三款透明WebP配色、S/M/L尺码选择及邮件订购咨询。',
        tags: ['街头服饰', '3种配色', '原创图片'],
      },
    },
    specs: {
      vi: [
        ['Định dạng', 'HTML / CSS / JavaScript'],
        ['Gói tải', '9 files'],
        ['Phạm vi', 'Giao diện tĩnh · không backend'],
      ],
      en: [
        ['Format', 'HTML / CSS / JavaScript'],
        ['Package', '9 files'],
        ['Scope', 'Static interface · no backend'],
      ],
      zh: [
        ['格式', 'HTML / CSS / JavaScript'],
        ['下载包', '9 files'],
        ['范围', '静态界面 · 无后端'],
      ],
    },
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
    slug: 'shirtline', cat: TEMPLATE_CATEGORIES.shirtline, version: '1.2.0',
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
    slug: 'solenne', cat: TEMPLATE_CATEGORIES['solenne'], version: '2.1.0',
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
    slug: 'vybe', cat: TEMPLATE_CATEGORIES['vybe'], video: false, version: '1.1.0',
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
