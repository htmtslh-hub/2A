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
     4. Thêm một mục vào bảng dưới đây. Xong.

   Đổi thứ tự hiển thị = đổi mã ô (t1, t2, …). Ô nào không khai ở đây thì giữ
   nguyên nội dung bịa của bản thiết kế. */
import type { LangCode } from '@/generated/data';
import { TEMPLATE_CATEGORIES, type WebCategory } from './template-categories';

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
  group?: 'web' | 'skill-prompt' | 'agent';
  /** Video quay từ chính mẫu giao, chỉ dùng tại cửa hàng. */
  video?: boolean;
  /** Revision for refreshing public demo and preview assets. */
  version?: string;
  specs?: Record<LangCode, string[][]>;
  copy: Record<LangCode, TemplateCopy>;
}

export const REAL_TEMPLATES: Record<string, RealTemplate> = {
  a1: {
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

  t13: {
    slug: 'kinetiq', cat: TEMPLATE_CATEGORIES.kinetiq,
    copy: {
      vi: { name: 'Kinetiq', desc: 'Giao diện giới thiệu hệ truyền động và linh kiện robot công nghiệp: minh họa cơ khí, danh mục hệ thống và CTA liên hệ. Không kèm thanh toán hoặc quản lý đơn hàng.', tags: ['Công nghiệp', 'Linh kiện', 'Giới thiệu sản phẩm'] },
      en: { name: 'Kinetiq', desc: 'An industrial actuation and robotics component showcase with mechanical illustrations, system listings and an enquiry CTA. No checkout or order backend.', tags: ['Industrial', 'Components', 'Product showcase'] },
      zh: { name: 'Kinetiq', desc: '工业传动与机器人零件展示模板，包含机械插图、系统列表与联系入口。不含支付或订单后台。', tags: ['工业', '零件', '产品展示'] },
    },
  },
  t14: {
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
  t16: {
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
  Object.entries(REAL_TEMPLATES).filter(([, t]) => t.video).flatMap(([id, t]) => [
    [`agentic-tpl-${id}`, `/previews/${t.slug}.mp4${t.version ? '?v=' + t.version : ''}`],
    [`agentic-home-${id}`, `/previews/${t.slug}.mp4${t.version ? '?v=' + t.version : ''}`],
  ])
);
