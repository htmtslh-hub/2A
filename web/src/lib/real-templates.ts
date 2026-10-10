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

export interface TemplateCopy {
  name: string;
  desc: string;
  tags: string[];
}

export interface RealTemplate {
  /** Tên thư mục sản phẩm trong product/, tên file .zip và tên ảnh .webp. */
  slug: string;
  /** Một trong các khoá của CAT_KEYS: portfolio | saas | business | shop | motion. */
  cat: string;
  /** Nhóm sản phẩm: 'web' | 'skill-prompt' | 'agent'. Mặc định: 'web'. */
  group?: 'web' | 'skill-prompt' | 'agent';
  /** Video quay từ chính mẫu giao, chỉ dùng tại cửa hàng. */
  video?: boolean;
  /** Revision for refreshing public demo and preview assets. */
  version?: string;
  /** Public preview remains visible while commercial delivery is pending. */
  previewOnly?: boolean;
  badge?: string;
  specs?: Record<LangCode, string[][]>;
  copy: Record<LangCode, TemplateCopy>;
}

export const REAL_TEMPLATES: Record<string, RealTemplate> = {
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
    slug: 'velora', cat: 'shop', version: '1.2.1',
    specs: {
      vi: [['Định dạng', 'HTML · CSS · JS thuần'], ['Trong gói', '6 file · SVG nội tuyến'], ['Sản phẩm', '3 mẫu xe · 6 màu khung'], ['Tương tác', 'Carousel · Chi tiết · Cấu hình riêng từng xe'], ['Tài liệu', '10 bước · 12 prompt AI · Giấy phép thương mại'], ['Liên hệ', 'Email; không thanh toán hoặc tồn kho']],
      en: [['Format', 'Plain HTML · CSS · JS'], ['Package', '6 files · Inline SVG'], ['Products', '3 bikes · 6 frame finishes'], ['Interactions', 'Carousel · Details · Per-bike configuration'], ['Documentation', '10 steps · 12 AI prompts · Commercial licence'], ['Contact', 'Email; no checkout or inventory']],
      zh: [['格式', '纯 HTML · CSS · JS'], ['文件包', '6 个文件 · 内联 SVG'], ['产品', '3 款车辆 · 6 种车架配色'], ['交互', '轮播 · 详情 · 每辆车独立配置'], ['文档', '10 个步骤 · 12 个 AI 提示词 · 商业许可'], ['联系', '邮件；不含支付或库存']],
    },
    copy: {
      vi: { name: 'Velora', desc: 'Showroom xe đạp gấp với carousel chuyển hai chiều, chuyển cảnh xem chi tiết cùng xe, thông số theo mẫu và sáu màu khung. Tùy chọn bánh, yên, tay lái được giữ riêng từng xe; liên hệ email theo cấu hình. HTML/CSS/JS thuần, SVG tự vẽ; không kèm giỏ hàng, thanh toán hoặc tồn kho.', tags: ['Xe đạp', 'Chuyển sản phẩm', '6 màu khung'] },
      en: { name: 'Velora', desc: 'A folding-bike showroom with a directional carousel, continuous bike-to-detail transitions, model specifications and six frame finishes. Wheel, saddle and handlebar choices stay with each bike; email enquiries include the configuration. Plain HTML/CSS/JS and original inline SVG; no cart, checkout or inventory backend.', tags: ['Bicycles', 'Product transitions', '6 finishes'] },
      zh: { name: 'Velora', desc: '折叠自行车展厅：双向轮播、同一车辆连贯切换到详情、型号规格和六种车架配色。车轮、坐垫与车把配置按车辆保留，邮件咨询包含当前配置。纯 HTML/CSS/JS 与原创内联 SVG；不含购物车、支付或库存后端。', tags: ['自行车', '产品转场', '6种配色'] },
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
    slug: 'apartment-flow', cat: 'business', version: '1.0.0', badge: '',
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
  t15: {
    slug: 'shirtline', cat: 'shop', version: '1.1.3',
    copy: {
      vi: { name: 'Shirtline', desc: 'Showroom năm mẫu áo sơ mi với vòng quay phối cảnh, bóng mềm dưới áo, nền đổi màu theo sản phẩm và preview mẫu kế tiếp. Ảnh tự tạo, bộ sưu tập và túi hàng liên hệ email; không kèm thanh toán.', tags: ['Áo sơ mi', 'Showroom', 'Vòng quay sản phẩm'] },
      en: { name: 'Shirtline', desc: 'A five-shirt showroom with an orbiting product carousel, soft floor shadows, product-tinted backgrounds and a next-look preview. Original imagery, collection cards and an email enquiry bag; no payment backend.', tags: ['Shirts', 'Showroom', 'Product carousel'] },
      zh: { name: 'Shirtline', desc: '五款衬衫展厅，包含环形产品轮播、柔和地面阴影、随产品变化的背景色和下一款预览。原创图片、系列卡片和邮件咨询购物袋；不含支付后台。', tags: ['衬衫', '展厅', '环形轮播'] },
    },
  },
  t14: {
    slug: 'lingoglass', cat: 'motion', group: 'agent', version: '1.0.1', badge: 'Hot',
    specs: {
      vi: [
        ['Định dạng', 'Electron 33 · React 18 · TypeScript'],
        ['Nền tảng', 'Windows 10/11 · macOS'],
        ['Giao diện', 'Glassmorphism · Floating Island · Waveform'],
        ['Học tập', 'Smart A-B Repeat · 1-Touch Dict · Shadowing'],
        ['Bảo mật', 'Bản quyền L3 (Ed25519) · Atomic Write Rollback'],
        ['Trong gói', 'Bộ cài chạy ngay + Mã nguồn + Tài liệu hướng dẫn'],
      ],
      en: [
        ['Format', 'Electron 33 · React 18 · TypeScript'],
        ['Platform', 'Windows 10/11 · macOS'],
        ['Interface', 'Glassmorphism · Floating Island · Waveform'],
        ['Learning', 'Smart A-B Repeat · 1-Touch Dict · Shadowing'],
        ['Security', 'Anti-Piracy L3 (Ed25519) · Atomic Write Rollback'],
        ['Package', 'Ready-to-run app + Source code + Documentation'],
      ],
      zh: [
        ['格式', 'Electron 33 · React 18 · TypeScript'],
        ['平台', 'Windows 10/11 · macOS'],
        ['界面', '毛玻璃 · 悬浮控制岛 · 音频波形'],
        ['学习', '智能 A-B 复读 · 单击查词 · 跟读模式'],
        ['安全', 'L3 授权体系 (Ed25519) · 原子写入故障回滚'],
        ['文件包', '开箱即用程序 + 完整源码 + 开发与使用文档'],
      ],
    },
    copy: {
      vi: {
        name: 'LingoGlass Player',
        desc: 'Trình phát đa phương tiện cao cấp hỗ trợ học ngoại ngữ chuyên sâu qua video & podcast. Giao diện Glassmorphism tinh tế, chế độ lặp câu Snap-to-Sentence (phím R), tra từ điển 1-chạm, làm mờ tiếng Việt, luyện nói Shadowing kèm ghi âm đối chiếu. Tích hợp bản quyền chống crack Ed25519 và bảo toàn dữ liệu an toàn.',
        tags: ['Desktop App', 'Học ngoại ngữ', 'Glass UI', 'A-B Repeat'],
      },
      en: {
        name: 'LingoGlass Player',
        desc: 'A premium cross-platform media player designed for immersive language learning through videos & podcasts. Sleek Glassmorphism UI, Snap-to-Sentence repetition (key R), 1-touch interactive dictionary, blurred subtitles, and Shadowing mode with voice comparison. Built-in Ed25519 anti-piracy and atomic persistent storage.',
        tags: ['Desktop App', 'Language Learning', 'Glass UI', 'A-B Repeat'],
      },
      zh: {
        name: 'LingoGlass 播放器',
        desc: '专为沉浸式外语学习打造的高级跨平台媒体播放器。精致毛玻璃界面、Snap-to-Sentence 单句智能复读（R键）、单击即查词典、遮盖母语字幕、跟读对比录音模式。内置 Ed25519 防破解授权与原子化安全数据存储。',
        tags: ['桌面客户端', '外语学习', '毛玻璃', 'A-B复读'],
      },
    },
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
  t12: {
    slug: 'novatrend', cat: 'shop', version: '1.0.0',
    copy: {
      vi: { name: 'NovaTrend', desc: 'Giao diện thương mại điện tử hiện đại đa ngành: hero thời trang cao cấp, danh mục sản phẩm, flash sale đếm ngược, bộ sưu tập mùa hè, giỏ hàng popup trượt, tìm kiếm sản phẩm và newsletter. Đầy đủ animation cuộn trang, chuyển cảnh mượt mà và hiệu ứng hover tinh tế.', tags: ['E-Commerce', 'Thời trang', 'Giỏ hàng', 'Animation'] },
      en: { name: 'NovaTrend', desc: 'A modern multi-category lifestyle e-commerce storefront: editorial fashion hero, category carousel, flash sale countdown, summer collection banner, persistent slide-in cart, real-time product search and newsletter. Fully equipped with scroll animations, smooth transitions and micro-interactions.', tags: ['E-Commerce', 'Fashion', 'Cart', 'Animation'] },
      zh: { name: 'NovaTrend', desc: '现代多品类生活方式电商商店模板：杂志风时尚首屏、品类轮播、倒计时限时秒杀、夏季系列横幅、持久化滑动购物车、实时商品搜索与邮件订阅。具备完整的滚动渐显动画、丝滑转场与悬浮交互效果。', tags: ['电子商务', '时尚', '购物车', '动画'] },
    },
  },
  t11: {
    slug: 'diginest', cat: 'shop', version: '1.2.0',
    copy: {
      vi: { name: 'DigiNest', desc: 'Giao diện cửa hàng công nghệ tông xanh teal–kem–cam, ảnh tự tạo, nhóm workspace và sáu sản phẩm mẫu. Có tìm kiếm, lọc danh mục, giỏ lưu trên thiết bị, thẻ bay vào giỏ, ngăn giỏ trượt và hover sản phẩm. HTML/CSS/JS thuần; checkout xem lại đơn demo, không kèm backend thanh toán hay tồn kho.', tags: ['Cửa hàng công nghệ', 'Giỏ hàng', 'Animation'] },
      en: { name: 'DigiNest', desc: 'A teal, cream and orange technology store template with original imagery, workspace collections and six sample products. Includes search, category filters, a persistent local cart, flying product cards, an animated drawer and hover motion. Plain HTML/CSS/JS; review-only demo checkout, no payment or inventory backend.', tags: ['Technology store', 'Local cart', 'Animation'] },
      zh: { name: 'DigiNest', desc: '青绿、奶油与橙色的科技商店模板，包含原创图片、工作空间分类和六款示例产品。支持搜索、分类筛选、本地持久购物车、商品飞入购物车、滑动抽屉及悬浮动画。纯 HTML/CSS/JS；结算仅预览订单，不含支付或库存后端。', tags: ['科技商店', '本地购物车', '动画'] },
    },
  },
  t10: {
    slug: 'soniq', cat: 'shop', video: true, version: '1.0.0',
    copy: {
      vi: { name: 'Soniq', desc: 'Giao diện bán tai nghe nền pastel xanh–tím–hồng: ba ảnh tai nghe tự tạo, chuyển màu có hướng, hover theo chuột, chọn màu và giỏ lưu trên thiết bị. Có thiết kế, thông số minh họa và FAQ. Liên hệ email; không kèm thanh toán hoặc tồn kho.', tags: ['Tai nghe', 'Pastel', 'Giỏ chọn màu'] },
      en: { name: 'Soniq', desc: 'A blue–violet–pink headphone storefront with three original images, directional colour transitions, pointer hover, colour picks and a local device bag. Includes design, illustrative specifications and FAQ. Email enquiries; no payment or inventory backend.', tags: ['Headphones', 'Pastel', 'Colour picker'] },
      zh: { name: 'Soniq', desc: '蓝紫粉渐变耳机店模板：三张原创产品图、方向转场、鼠标悬浮、配色选择与本地购物袋。包含设计、示例规格及常见问题。通过邮件咨询，不含支付或库存后端。', tags: ['耳机', '粉彩', '配色选择'] },
    },
  },
  t9: {
    slug: 'auralis', cat: 'shop', video: true, version: '1.2.4',
    copy: {
      vi: { name: 'Auralis', desc: 'Mẫu tai nghe nền sáng tím–cyan: carousel ba sản phẩm trượt đổi mẫu, thu nhỏ và làm mờ mẫu bên cạnh; giữ khung và chuyển cả ảnh lẫn chữ từ hero sang chi tiết, hộp sạc rồi tai nghe trắng theo cuộn. Có nút bật chuyển cảnh khi giảm chuyển động. Bốn ảnh tự tạo. CTA email; không kèm giỏ hàng hay thanh toán tai nghe.', tags: ['Tai nghe', 'Scroll animation', 'Ảnh tự tạo'] },
      en: { name: 'Auralis', desc: 'A violet–cyan earbud showcase with a three-model sliding carousel, blurred neighboring products, continuous pinned transitions through details, the charging kit and white earbuds. Includes a reduced-motion opt-in control. Four original local assets. Email enquiry; no earbud cart or checkout.', tags: ['Audio', 'Scroll animation', 'Original imagery'] },
      zh: { name: 'Auralis', desc: '浅紫青耳机展示模板：三个型号滑动切换、相邻产品缩小模糊、在同一固定画面随滚动连续切换详情、充电盒与白色耳机场景，文字与图片同步移动。支持减少动态时手动开启动画。四张原创图片。通过邮件咨询，不含耳机购物车或支付。', tags: ['耳机', '滚动动画', '原创图片'] },
    },
  },
  t1: {
    slug: 'japan-trails', cat: 'business',
    copy: {
      vi: { name: 'Japan Trails', desc: 'Giao diện du lịch Nhật Bản phong cách điện ảnh: ảnh Phú Sĩ và chùa lúc bình minh, thẻ kính mờ, hành trình và phố Kyoto. CTA liên hệ qua email.', tags: ['Du lịch Nhật Bản', 'Cinematic', 'Kính mờ'] },
      en: { name: 'Japan Trails', desc: 'A cinematic Japan travel template with Fuji sunrise photography, frosted-glass cards, journey ideas, Kyoto imagery and an email enquiry.', tags: ['Japan travel', 'Cinematic', 'Frosted glass'] },
      zh: { name: 'Japan Trails', desc: '电影感日本旅游模板：富士山日出照片、磨砂玻璃卡片、行程灵感、京都街景与邮件咨询入口。', tags: ['日本旅行', '电影感', '磨砂玻璃'] },
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
    slug: 'keystead',
    cat: 'shop',
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
    slug: 'solenne', cat: 'business',
    copy: {
      vi: { name: 'Solenne', desc: 'Giao diện skincare cao cấp tông kem và hồng đất: ảnh sản phẩm gốc, hero editorial, bộ sưu tập, câu chuyện chăm sóc da và CTA email.', tags: ['Skincare', 'Editorial', 'Ảnh sản phẩm'] },
      en: { name: 'Solenne', desc: 'A premium ivory and rose skincare landing page with original product photography, an editorial hero, collection, care story and email enquiry.', tags: ['Skincare', 'Editorial', 'Product photography'] },
      zh: { name: 'Solenne', desc: '奶油白与玫瑰色的高端护肤页面，包含原创产品图片、杂志风首屏、产品系列、护理理念与邮件联系。', tags: ['护肤', '杂志风', '产品摄影'] },
    },
  },
  t5: {
    slug: 'aeris', cat: 'shop', video: true, version: '1.3.0',
    copy: {
      vi: { name: 'Aeris', desc: 'Mẫu quảng bá tai nghe chụp tai nền pastel xanh–hồng: slider ba màu tự chuyển 6 giây (có nút tạm dừng) với chuyển cảnh trượt, mờ, dải sáng quét và vòng sóng âm theo màu, đổi số 01/02/03; chương âm thanh ghim theo cuộn, thiết kế, bộ sưu tập và thông số. Bốn ảnh sản phẩm tự tạo. CTA email; không kèm giỏ hàng hay thanh toán.', tags: ['Tai nghe', 'Chuyển cảnh', 'Ảnh tự tạo'] },
      en: { name: 'Aeris', desc: 'A pastel blue–pink over-ear headphone showcase: a self-advancing three-colourway slider (6 s, with a pause button) using sliding, blurred transitions with a light sweep and colour-matched sound-wave rings, 01/02/03 counters, a pinned scroll sound story, design, collection and specs. Four original product images. Email enquiry; no cart or checkout.', tags: ['Headphones', 'Transitions', 'Original imagery'] },
      zh: { name: 'Aeris', desc: '粉蓝渐变头戴式耳机展示模板：三种配色每 6 秒自动轮播（可暂停），带滑动模糊过渡与 01/02/03 编号；随滚动固定的声音章节、设计、系列与规格。四张原创产品图。通过邮件咨询，不含购物车或支付。', tags: ['耳机', '转场动画', '原创图片'] },
    },
  },
  t6: {
    slug: 'vybe', cat: 'shop', video: false,
    copy: {
      vi: { name: 'VYBE', desc: 'Giao diện bán áo streetwear theo phong cách coral: 5 ảnh người mẫu tự tạo, đổi sản phẩm Morge có hướng, chọn size và giỏ hàng lưu trên thiết bị. Liên hệ qua email; chưa kết nối thanh toán hoặc tồn kho.', tags: ['Streetwear', 'Morge', '5 mẫu áo'] },
      en: { name: 'VYBE', desc: 'A coral streetwear storefront with five original generated model images, directional Morge product transitions, sizes and a local device bag. Email enquiries; no payment or inventory backend.', tags: ['Streetwear', 'Morge', '5 pieces'] },
      zh: { name: 'VYBE', desc: '珊瑚色街头服饰模板：五张原创生成模特图片、Morge 方向转场、尺码选择与本地购物袋。通过邮件咨询，不含支付或库存后端。', tags: ['街头服饰', 'Morge', '5款服饰'] },
    },
  },
  t7: {
    slug: 'astra-interior', cat: 'shop', video: true, version: '2.0.3',
    copy: {
      vi: { name: 'Mellow Coffee', desc: 'Giao diện cà phê và bánh tông hổ phách: ba ảnh sản phẩm tự tạo, hero chuyển cảnh có hướng, vuốt và phím mũi tên, lọc thực đơn và giỏ món lưu trên thiết bị. Liên hệ email; chưa có thanh toán hoặc quản lý đơn hàng.', tags: ['Cà phê & bánh', 'Chuyển cảnh', 'Giỏ chọn món'] },
      en: { name: 'Mellow Coffee', desc: 'An amber café and bakery storefront with three original product images, a directional hero, swipe and arrow controls, menu filters and a local device bag. Email enquiries; no checkout or order backend.', tags: ['Coffee & bakery', 'Motion', 'Local bag'] },
      zh: { name: 'Mellow Coffee', desc: '琥珀色咖啡与烘焙店模板：三张原创产品图、方向转场首屏、滑动与方向键、菜单筛选及本地购物袋。通过邮件咨询，不含支付或订单后台。', tags: ['咖啡与烘焙', '动画转场', '本地购物袋'] },
    },
  },
  t8: {
    slug: 'pinehaven', cat: 'business',
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
