import type { LangCode } from '@/generated/data';

type TemplateGuide = { intro: string; notes: string };

export const TEMPLATE_GUIDES: Record<string, Record<LangCode, TemplateGuide>> = {
  'astro-armor': {
  "vi": {
    "intro": "Giao diện sản phẩm áo khoác nền kem, điểm nhấn cam và bố cục ba cột theo ảnh mẫu. Có chọn size, bốn phối màu, bảng size và giỏ demo trong phiên; không có thanh toán hay backend.",
    "notes": "Giải nén đủ 9 file rồi mở index.html cạnh assets/. CUSTOMISE.md gồm 10 bước, 12 prompt AI và bảng sửa đã đếm. Ảnh mẫu JPEG được giữ nguyên và hiển thị qua vùng cắt CSS; hai WebP dùng cho phối màu bổ sung. Độ nét ảnh beige/thumbnail giới hạn bởi ảnh tham chiếu. Có chọn size, màu, yêu thích và giỏ trong phiên với xóa/tổng tiền, bảng size, tìm một sản phẩm và hộp thông tin tài khoản. Không có đăng nhập, tồn kho, nhận đơn hay thanh toán thật. Thay thông tin demo, email và ảnh theo quyền của bạn; xem LICENCE.txt. Motion mặc định bật, có nút tạm dừng trong phiên."
  },
  "en": {
    "intro": "An ivory-and-orange puffer product page with a reference-led three-column composition. Includes size selection, four colour previews, a size guide and a page-session demo bag; no checkout or backend.",
    "notes": "Extract all 9 files and open index.html beside assets/. CUSTOMISE.md includes ten steps, twelve AI prompts and counted edits. The unchanged supplied JPEG is shown through CSS image-region crops; two WebP files provide alternate colour concepts. Beige and thumbnail resolution is limited to the reference. Size/colour selection, favourite and session bag with removal/subtotal, size guide, single-item search and account information dialog work locally. No login, inventory, order processing or live checkout. Replace demo details, email and artwork with permitted content; read LICENCE.txt. Motion starts enabled with a session pause control."
  },
  "zh": {
    "intro": "奶油白与橙色羽绒服产品页面，采用参考图的三栏布局。包含尺码选择、四种配色预览、尺码表和会话内购物袋演示；无支付或后端。",
    "notes": "解压全部9个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条AI提示词及精确修改表。原始JPEG通过CSS局部裁切显示，两个WebP用于额外配色概念。米色主图和缩略图清晰度受参考图限制。本地支持尺码/颜色选择、收藏、可删除并计算小计的会话购物袋、尺码表、单品搜索及账户说明。无登录、库存、订单处理或真实结账。请替换演示资料、邮箱及具有使用权限的图片，并阅读LICENCE.txt。动画默认开启，可在当前会话暂停。"
  }
},
  'chain-warden': {
    vi: {
      intro: 'Landing page giới thiệu tướng giả tưởng đen tối và bộ kỹ năng tương tác theo ảnh tham chiếu.',
      notes: '### Bắt đầu\nGiải nén đủ 10 file và mở index.html cạnh assets/. CUSTOMISE.md gồm 10 bước, 12 prompt AI và bảng sửa đã đếm chính xác. Không cần cài đặt hay build.\n\n### Ảnh và nội dung\nBốn ảnh WebP cục bộ trong assets/img/: warden-classic.webp, warden-darkstar.webp, warden-highnoon.webp và sprite UI warden-ui.webp. Thay LEAGUE OF LEGENDS, THE CHAIN WARDEN, Thresh, thông số kỹ năng P/Q/W/E/R, tên 4 ngoại trang và press@shadowwarden-studio.example bằng nhân vật/thương hiệu riêng trước khi phát hành thương mại. Google Fonts (Syne và Plus Jakarta Sans) tùy chọn; font hệ thống hoạt động bình thường khi offline.\n\n### Tương tác\nBốn ngoại trang (Classic, Dark Star, High Noon, FPX) điều khiển bằng bệ tượng ở hero, nút Prev/Next Skin, thẻ bộ sưu tập, phím mũi tên Trái/Phải hoặc vuốt ngang. Năm kỹ năng (P, Q, W, E, R) đồng bộ giữa hero và ma trận kỹ năng. Ba hộp thoại dialog cho cốt truyện đầy đủ, hoạt cảnh tiêu điểm và thông báo bản dựng (Demo only). Hỗ trợ menu mobile đóng bằng Escape và nút Pause motion trong phiên.\n\n### Phạm vi\nGiao diện tĩnh, không kèm bộ cài game, máy chủ đăng nhập tài khoản hay ghép trận trực tuyến. Đọc kỹ LICENCE.txt; không phân phối lại template hoặc bán ảnh riêng.',
    },
    en: {
      intro: 'A dark-fantasy spectral champion and interactive ability kit showcase inspired by the reference design.',
      notes: '### Start\nExtract all 10 files and open index.html beside assets/. CUSTOMISE.md contains 10 steps, 12 complete AI prompts and a counted literal edit map. No install or build required.\n\n### Artwork and content\nFour local WebP assets in assets/img/: warden-classic.webp, warden-darkstar.webp, warden-highnoon.webp, and the warden-ui.webp sprite. Replace LEAGUE OF LEGENDS, THE CHAIN WARDEN, Thresh, the P/Q/W/E/R ability telemetry, 4 skin titles and press@shadowwarden-studio.example with your own original character and studio branding before commercial publication. Google Fonts (Syne and Plus Jakarta Sans) are optional; system fallbacks work offline.\n\n### Interaction\nFour skins (Classic, Dark Star, High Noon, FPX) controlled via hero pedestals, Prev/Next Skin buttons, archive cards, Left/Right arrow keys or horizontal swipe. Five abilities (P, Q, W, E, R) stay synchronized between the hero panel and tactical matrix. Three native dialog modals for full lore, spotlight preview and build info (Demo only). Escape-aware mobile menu and session-only Pause motion.\n\n### Scope\nStatic showcase with no game client installer, account authentication or live matchmaking backend. Read LICENCE.txt; no template redistribution or standalone image resale.',
    },
    zh: {
      intro: '暗黑奇幻幽魂典狱长英雄与技能交互展示模板。',
      notes: '### 开始\n完整解压10个文件，在assets/旁打开index.html。CUSTOMISE.md包含10个步骤、12条完整AI提示词和精确修改计数表。无需安装或构建。\n\n### 图像与内容\nassets/img/中包含四张本地WebP资源：warden-classic.webp、warden-darkstar.webp、warden-highnoon.webp及warden-ui.webp精灵图。正式商用发布前，请将LEAGUE OF LEGENDS、THE CHAIN WARDEN、Thresh、P/Q/W/E/R技能参数、4款皮肤名称及press@shadowwarden-studio.example替换为您自己的原创角色与工作室品牌。Google Fonts (Syne 与 Plus Jakarta Sans) 可选，离线时自动使用系统字体。\n\n### 交互\n支持通过首屏底座、Prev/Next Skin按钮、皮肤档案卡片、左右方向键或横向滑动切换四款皮肤（Classic、Dark Star、High Noon、FPX）。五项技能（P、Q、W、E、R）在首屏面板与技能矩阵间实时同步。内置三个原生dialog对话框（完整背景故事、聚光灯预览与Demo only构建说明）、支持Escape的移动菜单及仅限当前会话的Pause motion。\n\n### 范围\n纯静态展示页，不含游戏客户端下载、账户登录或实时匹配后端。请阅读LICENCE.txt；禁止重新分发模板或单独转售图像。',
    },
  },
  'fitclub-food': {
    vi: {
      intro: 'Landing page câu lạc bộ ẩm thực lành mạnh và tô dinh dưỡng thể hình nền tím mận tối theo ảnh tham chiếu.',
      notes: '### Bắt đầu\nGiải nén đủ 9 file và mở index.html cạnh assets/. CUSTOMISE.md gồm 10 bước, 12 prompt AI và bảng sửa đã đếm chính xác. Không cần cài đặt hay build.\n\n### Ảnh và nội dung\nBa ảnh WebP nền trong suốt trong assets/img/: platter-club.webp, platter-protein.webp, platter-berry.webp. Thay FitClub, giá mẫu $14–$16 / bowl, chỉ số dinh dưỡng minh họa, [YOUR STUDIO ADDRESS] và kitchen@fitclubfood.example. Cụm chữ FFIFEET CTUB và Fitreess & giữ nguyên theo ảnh tham chiếu và có hướng dẫn đổi trong CUSTOMISE.md. Google Fonts (Plus Jakarta Sans) tùy chọn; font hệ thống hoạt động bình thường khi offline.\n\n### Tương tác\nBa khay món điều khiển bằng ba nút tròn ở thanh tính năng dưới đáy, nút Preview on Stage trên thẻ món, phím mũi tên Trái/Phải hoặc vuốt ngang trên sân khấu. Chọn khẩu phần cập nhật ngay tóm tắt đơn và liên kết mailto. Hai hộp thoại dialog cho thông báo giao hộp lạnh (Demo only) và bảng tham chiếu dinh dưỡng. Hỗ trợ menu mobile đóng bằng Escape và nút Pause motion trong phiên.\n\n### Phạm vi\nGiao diện tĩnh, không kèm backend, cổng thanh toán trực tuyến hay hệ thống điều phối giao hàng. Đọc kỹ LICENCE.txt; không phân phối lại template hoặc bán ảnh riêng.',
    },
    en: {
      intro: 'A dark-plum fitness and healthy club bowl landing page inspired by the reference design.',
      notes: '### Start\nExtract all 9 files and open index.html beside assets/. CUSTOMISE.md contains 10 steps, 12 complete AI prompts and a counted literal edit map. No install or build required.\n\n### Artwork and content\nThree transparent WebP platter cutouts in assets/img/: platter-club.webp, platter-protein.webp, and platter-berry.webp. Replace FitClub, the illustrative $14–$16 / bowl prices, sample macro figures, [YOUR STUDIO ADDRESS] and kitchen@fitclubfood.example. The wordmark FFIFEET CTUB and eyebrow Fitreess & preserve the reference lettering and are documented in CUSTOMISE.md. Google Fonts (Plus Jakarta Sans) is optional; system sans-serif fallbacks work offline.\n\n### Interaction\nThree platters controlled via the bottom feature circles, card Preview on Stage buttons, Left/Right arrow keys or horizontal swipe. Portion tier buttons update the live order summary and mailto link. Native dialog modals for chilled delivery details (Demo only) and macro comparison. Escape-aware mobile menu and session-only Pause motion.\n\n### Scope\nStatic showcase with no backend database, payment processor or live courier dispatch. Read LICENCE.txt; no template redistribution or standalone image resale.',
    },
    zh: {
      intro: '深梅紫健身与健康俱乐部营养碗展示模板。',
      notes: '### 开始\n完整解压9个文件，在assets/旁打开index.html。CUSTOMISE.md包含10个步骤、12条完整AI提示词和精确修改计数表。无需安装或构建。\n\n### 图像与内容\nassets/img/中包含三张透明背景WebP餐盘图：platter-club.webp、platter-protein.webp与platter-berry.webp。请替换FitClub、示例价格$14–$16 / bowl、营养参数、[YOUR STUDIO ADDRESS]及kitchen@fitclubfood.example。顶部FFIFEET CTUB与Fitreess &保留了参考图拼写，可在CUSTOMISE.md中查看修改位置。Google Fonts (Plus Jakarta Sans) 可选，离线时自动使用系统无衬线字体。\n\n### 交互\n支持通过底部圆形图标按钮、卡片预览按钮、左右方向键或横向滑动切换三款餐盘。份量档位按钮实时同步至底部订餐摘要与mailto邮件链接。内置原生dialog对话框（Demo only冷链配送说明与营养对照表）、支持Escape的移动菜单及仅限当前会话的Pause motion。\n\n### 范围\n纯静态展示页，不含后端数据库、在线支付或实时配送系统。请阅读LICENCE.txt；禁止重新分发模板或单独转售图像。',
    },
  },
  'volt-hoodie': {
    vi: {
      intro: 'Showroom áo hoodie streetwear phối mảng chéo vàng volt và đen carbon theo ảnh tham chiếu.',
      notes: '### Bắt đầu\nGiải nén đủ 9 file và mở index.html cạnh assets/. CUSTOMISE.md gồm 10 bước, 12 prompt AI và bảng sửa đã đếm chính xác. Không cần cài đặt hay build.\n\n### Ảnh và nội dung\nBa ảnh WebP nền trong suốt tự tạo trong assets/img/: hoodie-volt.webp, hoodie-mint.webp, hoodie-arctic.webp. Thay Volt Hoodie, giá mẫu Rs. 1559/-, bảng size và orders@volthoodie.example. Nhãn nút Sing Up giữ nguyên theo ảnh tham chiếu và có hướng dẫn đổi trong CUSTOMISE.md. Google Fonts (Poppins) tùy chọn; font hệ thống hoạt động bình thường khi offline.\n\n### Tương tác\nBa phối màu điều khiển bằng nút chọn màu bên trái, chấm phân trang dưới đáy, thẻ sản phẩm, phím mũi tên Trái/Phải hoặc vuốt ngang. Chọn size S/M/L cập nhật ngay tóm tắt đơn và liên kết mailto. Ba hộp thoại dialog cho tìm kiếm nhanh, thông báo tài khoản (Demo only) và hướng dẫn nhanh. Hỗ trợ menu mobile đóng bằng Escape và nút Pause motion trong phiên.\n\n### Phạm vi\nGiao diện tĩnh, không kèm backend, giỏ hàng lưu cơ sở dữ liệu, tài khoản hay thanh toán trực tuyến. Đọc kỹ LICENCE.txt; không phân phối lại template hoặc bán ảnh riêng.',
    },
    en: {
      intro: 'A diagonal volt-yellow and matte-carbon streetwear hoodie showcase inspired by the reference design.',
      notes: '### Start\nExtract all 9 files and open index.html beside assets/. CUSTOMISE.md contains 10 steps, 12 complete AI prompts and a counted literal edit map. No install or build required.\n\n### Artwork and content\nThree original transparent WebP cutouts in assets/img/: hoodie-volt.webp, hoodie-mint.webp, and hoodie-arctic.webp. Replace Volt Hoodie, the illustrative Rs. 1559/- price, size chart and orders@volthoodie.example. The header button label Sing Up preserves the reference spelling and is documented in CUSTOMISE.md. Google Fonts (Poppins) is optional; system sans-serif fallbacks work offline.\n\n### Interaction\nThree colourways controlled via left colour swatches, bottom pagination dots, product cards, Left/Right arrow keys or horizontal swipe. S/M/L size selection updates the live order summary and mailto link. Native dialog modals for quick lookup, member access (Demo only) and capsule guide. Escape-aware mobile menu and session-only Pause motion.\n\n### Scope\nStatic showcase with no backend database, live inventory, user authentication or payment checkout. Read LICENCE.txt; no template redistribution or standalone image resale.',
    },
    zh: {
      intro: '电光黄与哑光碳黑斜切街头连帽衫展示模板。',
      notes: '### 开始\n完整解压9个文件，在assets/旁打开index.html。CUSTOMISE.md包含10个步骤、12条完整AI提示词和精确修改计数表。无需安装或构建。\n\n### 图像与内容\nassets/img/中包含三张原创透明背景WebP服装图：hoodie-volt.webp、hoodie-mint.webp与hoodie-arctic.webp。请替换Volt Hoodie、示例价格Rs. 1559/-、尺码表及orders@volthoodie.example。顶部Sing Up按钮保留了参考图拼写，可在CUSTOMISE.md中查看修改位置。Google Fonts (Poppins) 可选，离线时自动使用系统无衬线字体。\n\n### 交互\n支持通过左侧色卡、底部分页圆点、配色卡片、左右方向键或横向滑动切换三种配色。S/M/L尺码按钮实时同步至底部订购摘要与mailto邮件链接。内置原生dialog对话框（快速检索、Demo only会员提示与尺码指南）、支持Escape的移动菜单及仅限当前会话的Pause motion。\n\n### 范围\n纯静态展示页，不含后端数据库、实时库存、账户系统或在线支付。请阅读LICENCE.txt；禁止重新分发模板或单独转售图像。',
    },
  },
  "fresh-reddy": {
  "vi": {
    "intro": "Giao diện dịch vụ cà phê văn phòng nền than, cụm ba cốc PNG trong suốt, nội dung dịch vụ và liên hệ.",
    "notes": "Giải nén đủ 7 file và mở index.html cạnh assets/. CUSTOMISE.md có 10 bước, 12 prompt AI và bảng sửa đã đếm. Ảnh PNG nền trong suốt được lưu local. Menu mobile hỗ trợ Escape, các nút dẫn section và hiệu ứng reveal hữu hạn. Không có backend, thanh toán hoặc đăng ký tài khoản. Thay email mẫu và nội dung trước khi dùng. Đọc LICENCE.txt: giấy phép không cấp quyền thương hiệu bên thứ ba."
  },
  "en": {
    "intro": "A charcoal workplace-coffee landing page with three transparent cup renders, service sections and contact anchors.",
    "notes": "Extract all 7 files and open index.html beside assets/. CUSTOMISE.md contains ten steps, twelve AI prompts and counted edits. Transparent PNG artwork is local. Escape-aware mobile menu, section links and finite scroll reveals. No backend, checkout or account system. Replace the sample email and copy. Read LICENCE.txt; third-party trademark rights are not granted."
  },
  "zh": {
    "intro": "炭黑色办公室咖啡服务页面，含三个透明咖啡杯图像、服务介绍及联系入口。",
    "notes": "解压全部7个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条AI提示词和精确修改表。本地透明PNG图像；支持Escape的移动菜单、版块链接和有限滚动动画。无后端、支付或账户系统。请替换示例邮箱和文案，并阅读LICENCE.txt；不授予第三方商标权。"
  }
},
  "puro-amor": {
  "vi": {
    "intro": "Concept cà phê trắng–xanh đậm, cốc cà phê bắn nước và nội dung tiếng Bồ Đào Nha.",
    "notes": "Giải nén đủ 7 file và mở index.html cạnh assets/. CUSTOMISE.md có 10 bước, 12 prompt AI và bảng sửa đã đếm. Ảnh PNG nền trong suốt được lưu local. Menu mobile hỗ trợ Escape, các nút dẫn section và hiệu ứng reveal hữu hạn. Không có backend, thanh toán hoặc đăng ký tài khoản. Thay email mẫu và nội dung trước khi dùng. Đọc LICENCE.txt: giấy phép không cấp quyền thương hiệu bên thứ ba."
  },
  "en": {
    "intro": "A white-and-teal coffee concept with a coffee splash hero and Portuguese editorial content.",
    "notes": "Extract all 7 files and open index.html beside assets/. CUSTOMISE.md contains ten steps, twelve AI prompts and counted edits. Transparent PNG artwork is local. Escape-aware mobile menu, section links and finite scroll reveals. No backend, checkout or account system. Replace the sample email and copy. Read LICENCE.txt; third-party trademark rights are not granted."
  },
  "zh": {
    "intro": "白色与深青色咖啡概念页，含咖啡飞溅主视觉及葡萄牙语内容。",
    "notes": "解压全部7个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条AI提示词和精确修改表。本地透明PNG图像；支持Escape的移动菜单、版块链接和有限滚动动画。无后端、支付或账户系统。请替换示例邮箱和文案，并阅读LICENCE.txt；不授予第三方商标权。"
  }
},
  "nourish-bowl": {
  "vi": {
    "intro": "Landing page thực phẩm nền xanh đêm với hai ảnh tô trái cây, mục nguyên liệu mở rộng và hướng dẫn chuẩn bị.",
    "notes": "Giải nén đủ 8 file và mở index.html cạnh assets/. CUSTOMISE.md có 10 bước, 12 prompt AI và bảng sửa đã đếm. Ảnh PNG nền trong suốt được lưu local. Menu mobile hỗ trợ Escape, các nút dẫn section và hiệu ứng reveal hữu hạn. Không có backend, thanh toán hoặc đăng ký tài khoản. Thay email mẫu và nội dung trước khi dùng. Đọc LICENCE.txt: giấy phép không cấp quyền thương hiệu bên thứ ba."
  },
  "en": {
    "intro": "A navy-and-cyan food landing page with two fruit bowl cutouts, expandable ingredients and preparation ideas.",
    "notes": "Extract all 8 files and open index.html beside assets/. CUSTOMISE.md contains ten steps, twelve AI prompts and counted edits. Transparent PNG artwork is local. Escape-aware mobile menu, section links and finite scroll reveals. No backend, checkout or account system. Replace the sample email and copy. Read LICENCE.txt; third-party trademark rights are not granted."
  },
  "zh": {
    "intro": "深蓝与青色健康饮食页面，含两张水果餐盘图像、可展开食材及制作建议。",
    "notes": "解压全部8个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条AI提示词和精确修改表。本地透明PNG图像；支持Escape的移动菜单、版块链接和有限滚动动画。无后端、支付或账户系统。请替换示例邮箱和文案，并阅读LICENCE.txt；不授予第三方商标权。"
  }
},
  'manganresto': {
    "vi": {
      "intro": "Landing page nhà hàng ẩm thực cao cấp phối màu đen và vàng hổ phách theo ảnh mẫu.",
      "notes": "### Bắt đầu\nGiải nén đủ 9 file và mở index.html cạnh assets/. CUSTOMISE.md gồm 10 bước, 12 prompt AI và bảng sửa chính xác. Không cần build.\n\n### Ảnh và nội dung\nBa ảnh WebP tự tạo: đĩa mì Ý tôm mực đen, bữa sáng trứng chần và salad khai vị. Thay tên nhà hàng, thực đơn, đầu bếp và thông số minh họa. Google Fonts tùy chọn; font hệ thống hoạt động bình thường offline.\n\n### Tương tác\nLọc danh mục món ăn (Breakfast, Appetizer, Main, Desserts), tìm kiếm món live theo tên/mô tả, form đặt bàn trải nghiệm gắn nhãn (Demo only). Hỗ trợ hiệu ứng đĩa nghiêng 3D theo con trỏ chuột và nút Pause motion trong phiên.\n\n### Phạm vi\nKhông kèm backend lưu trữ cơ sở dữ liệu thực, xử lý thanh toán hay đặt bàn qua mạng. Đọc LICENCE.txt; không phân phối lại template hoặc bán ảnh riêng."
    },
    "en": {
      "intro": "A gourmet dining and fine culinary landing page in charcoal and warm amber gold.",
      "notes": "### Start\nExtract all 9 files and open index.html beside assets/. CUSTOMISE.md contains 10 steps, 12 complete AI prompts and verified edit counts. No build required.\n\n### Artwork and content\nThree original WebP images: centerpiece seafood squid ink pasta plate, artisan poached egg toast and burrata fig salad. Replace restaurant name, menu items, chefs and illustrative stats. Google Fonts are optional; system fonts work offline.\n\n### Interaction\nCategory filtering (Breakfast, Appetizer, Main, Desserts), live menu search dialog, and reservation enquiry form labeled (Demo only). Hero plate kinetic tilt and session-only Pause motion.\n\n### Scope\nNo backend database, online payment processing, or live booking engine. Read LICENCE.txt; no template redistribution or standalone image resale."
    },
    "zh": {
      "intro": "黑金双色高级美食品鉴餐厅展示页。",
      "notes": "### 开始\n完整解压9个文件，在assets/旁打开index.html。CUSTOMISE.md包含10个步骤、12条AI提示词及精确修改表。无需构建。\n\n### 图像与内容\n三张原创WebP图像：墨鱼汁海鲜意面餐盘、早午餐水波蛋吐司及无花果布拉塔沙拉。替换餐厅名称、菜单项、名厨及示例参数。Google Fonts可选，离线系统字体正常显示。\n\n### 交互\n菜单分类筛选（早餐、开胃菜、主菜、甜点）、实时菜品搜索对话框及标注(Demo only)的订座咨询表单。支持餐盘3D微动视角及本次会话暂定动画功能。\n\n### 范围\n不含后端数据库、在线支付或实时预订引擎。请阅读LICENCE.txt；不可重新分发模板或单独转售图像。"
    }
  },
  'beetbuh': {
  "vi": {
    "intro": "Landing page tai nghe concept màu cam trên nền ivory theo ảnh tham chiếu.",
    "notes": "### Bắt đầu\nGiải nén đủ 9 file và mở index.html cạnh assets/. CUSTOMISE.md gồm 10 bước, 12 prompt AI và bảng sửa chính xác. Không cần build.\n\n### Ảnh và nội dung\nBa ảnh WebP tự tạo: hai góc tai nghe và người mẫu giả định. Thay BeetBuh, hello@beetbuh.example và thông số minh họa. Google Fonts tùy chọn; font hệ thống hoạt động offline nhưng khác hình thức.\n\n### Tương tác\nBa trạng thái gồm hai góc và một crop chi tiết, không phải 3D. Nút/phím/vuốt, hộp phóng to ảnh, menu Escape, thông số native và reveal khi cuộn. Pause motion chỉ trong phiên. Shop Now dẫn tới email, không đặt hàng.\n\n### Phạm vi\nKhông backend, âm thanh, tồn kho, tài khoản hay thanh toán. Đọc LICENCE.txt; không phân phối lại template hoặc bán ảnh riêng."
  },
  "en": {
    "intro": "An ivory-and-orange sculptural headphone concept landing page.",
    "notes": "### Start\nExtract all 9 files and open index.html beside assets/. CUSTOMISE.md contains 10 steps, 12 complete AI prompts and counted edits. No build required.\n\n### Artwork and content\nThree original WebP images: two headphone angles and a fictional campaign model. Replace BeetBuh, hello@beetbuh.example and illustrative specifications. Google Fonts are optional; offline system fonts differ visually.\n\n### Interaction\nThree states are two angles and an earcup crop, not 3D. Buttons/keys/swipe, image dialog, Escape menu, native specifications and scroll reveals. Pause motion is session-only. Shop Now leads to email enquiry without ordering.\n\n### Scope\nNo backend, audio engine, stock, accounts or checkout. Read LICENCE.txt; no template redistribution or standalone image resale."
  },
  "zh": {
    "intro": "象牙白与橙色的雕塑感耳机概念展示页。",
    "notes": "### 开始\n完整解压9个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条完整AI提示词和精确修改表。无需构建。\n\n### 图像与内容\n三张原创WebP图像：两个耳机角度和虚构模特。替换BeetBuh、hello@beetbuh.example和示例参数。Google Fonts可选，离线系统字体外观不同。\n\n### 交互\n三种视图为两个角度及耳罩裁剪细节，并非3D。支持按钮、方向键、滑动、放大对话框、Escape菜单、原生参数和滚动渐显。Pause motion仅用于本次访问。Shop Now前往邮件咨询，不下单。\n\n### 范围\n无后端、音频、库存、账户或支付。请阅读LICENCE.txt；不可重新分发模板或单独转售图像。"
  }
},
  'sonicore': {
  "vi": {
    "intro": "Showroom tai nghe âm thanh không gian Sonicore X1 nền tối ánh tím với sơ đồ tách lớp linh kiện, âm trường 360° và so sánh thông số.",
    "notes": "### Bắt đầu\nGiải nén đủ 10 file và mở index.html cạnh assets/. CUSTOMISE.md có 10 bước, 12 prompt AI và bảng sửa đã đếm. HTML/CSS/JS thuần, không build hay font mạng.\n\n### Nội dung và ảnh\nThay Sonicore / Sonicore X1, giải thưởng và trích dẫn minh họa, giá $349, thông số mẫu, hello@sonicore.example. Bốn ảnh WebP trong assets/img/ là ảnh render concept tự tạo, không phải ảnh hãng hay mô hình 3D thời gian thực.\n\n### Tương tác\nBa chế độ sân khấu âm thanh ở hero, 6 điểm linh kiện tách lớp, 3 preset không gian và bảng so sánh X1 / Studio; điều khiển bằng nút, phím mũi tên hoặc vuốt. Hỗ trợ dùng thử không gian 4.2 giây, mục thông số mở rộng bằng details, menu mobile hỗ trợ Escape, và Pause motion trong phiên.\n\n### Phạm vi\nKhông backend, tồn kho, tài khoản, xử lý DSP âm thanh thật hoặc thanh toán. Đặt trước chỉ mở ứng dụng email. Đọc LICENCE.txt trước khi dùng; không phân phối lại template hoặc bán ảnh riêng."
  },
  "en": {
    "intro": "A dark-violet spatial audio headphone showcase for Sonicore X1 with an interactive exploded diagram, 360° soundstage presets and specification comparison.",
    "notes": "### Start\nExtract all 10 files and open index.html beside assets/. CUSTOMISE.md contains 10 steps, 12 complete AI prompts and counted edits. Plain HTML/CSS/JS, no build or network fonts.\n\n### Content and artwork\nReplace Sonicore / Sonicore X1, illustrative award badges and press quotes, $349 sample price, specifications and hello@sonicore.example. The four WebP files in assets/img/ are original generated concept renders, not manufacturer photography or a live WebGL 3D model.\n\n### Interaction\nThree hero soundstages, 6 exploded hardware callouts, 3 spatial presets and an X1 / Studio comparison toggle controlled by buttons, arrow keys or swipe. Includes a 4.2-second visual soundstage tour, native details specifications, Escape-aware mobile menu and session-only Pause motion.\n\n### Scope\nNo backend, stock, accounts, live audio DSP or checkout. Pre-order actions only open a mail app. Read LICENCE.txt; no template redistribution or standalone image resale."
  },
  "zh": {
    "intro": "深紫光效 Sonicore X1 空间音频耳机展示页，含交互式硬件拆解图、360°声场预设与参数对比。",
    "notes": "### 开始\n完整解压10个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条完整AI提示词和精确修改表。原生HTML/CSS/JS，无需构建或网络字体。\n\n### 内容与图像\n替换Sonicore / Sonicore X1、示例奖项与媒体评语、$349示例价格、参数及hello@sonicore.example。assets/img/中的4张WebP为原创AI概念图，并非官方摄影或实时3D模型。\n\n### 交互\n首屏3种声场、6个硬件拆解热点、3种空间预设及X1 / Studio对比切换，支持按钮、方向键和滑动。含4.2秒视觉声场预览、原生参数展开、支持Escape的移动菜单以及仅限本次会话的Pause motion。\n\n### 范围\n无后端、库存、账户、实时音频DSP或支付。预订仅打开邮件应用。请阅读LICENCE.txt；不可重新分发模板或单独转售图像。"
  }
},
  'firepower': {
  "vi": {
    "intro": "Landing page chuột gaming theo ảnh tham chiếu Logitech, nền than đen và điểm nhấn cyan.",
    "notes": "### Bắt đầu\nGiải nén đủ 7 file và mở index.html cạnh assets/. CUSTOMISE.md có 10 bước, 12 prompt AI và bảng sửa đã đếm. HTML/CSS/JS thuần, không build hay font mạng.\n\n### Nội dung và ảnh\nThay Firepower, tên/nhãn Logitech và G604, thông số minh họa, hello@firepower.example. mouse-views.webp là sheet 3×2 ảnh chuột concept tự tạo, không phải ảnh hãng hay mô hình 3D. Không có liên kết hoặc quyền thương hiệu Logitech.\n\n### Tương tác\nNăm góc xem ở hero và gallery; nút, phím mũi tên, vuốt và trạng thái hiện tại. Thông số dùng details; menu hỗ trợ Escape. Reveal hữu hạn khi cuộn, motion mặc định bật và Pause motion chỉ cho phiên hiện tại. BUY dẫn đến mục email, không đặt hàng.\n\n### Phạm vi\nKhông backend, tồn kho, tài khoản hoặc thanh toán. Email chỉ mở ứng dụng. Đọc LICENCE.txt trước khi dùng; không phân phối lại template hoặc bán ảnh riêng."
  },
  "en": {
    "intro": "A reference-inspired gaming mouse landing page in charcoal and cyan.",
    "notes": "### Start\nExtract all 7 files and open index.html beside assets/. CUSTOMISE.md contains 10 steps, 12 complete AI prompts and counted edits. Plain HTML/CSS/JS, no build or network fonts.\n\n### Content and artwork\nReplace Firepower, Logitech/G604 references, illustrative specifications and hello@firepower.example. mouse-views.webp is a 3×2 sheet of original generated concept renders, not manufacturer photos or a 3D model. No manufacturer affiliation or trademark rights.\n\n### Interaction\nFive hero and gallery views with buttons, arrow keys, swipe and current state. Native specifications; mobile menu supports Escape. Finite scroll reveals, motion ON by default, session-only Pause motion. BUY leads to an email enquiry section without placing an order.\n\n### Scope\nNo backend, stock, accounts or checkout. Email only opens a mail app. Read LICENCE.txt; no template redistribution or standalone image resale."
  },
  "zh": {
    "intro": "参考游戏鼠标展示页，采用炭黑与青色视觉。",
    "notes": "### 开始\n完整解压7个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条完整AI提示词和精确修改表。原生HTML/CSS/JS，无需构建或网络字体。\n\n### 内容与图像\n替换Firepower、Logitech/G604名称、示例参数和hello@firepower.example。mouse-views.webp是3×2原创AI概念图，不是官方摄影或3D模型。无厂家关联或商标授权。\n\n### 交互\n主视觉与图集支持五个视角、按钮、方向键、滑动和当前状态。原生参数展开，移动菜单支持Escape。有限滚动渐显，动态默认开启，Pause motion仅用于本次访问。BUY前往邮件咨询区域，不会下单。\n\n### 范围\n无后端、库存、账户或支付。邮件仅打开应用。请阅读LICENCE.txt；不可重新分发模板或单独转售图像。"
  }
},
  'backbest-800': {
  "vi": {
    "intro": "Showroom tai nghe không dây nền đen đỏ với vòng đồng tâm phát sáng, ba phối màu tự tạo, hotspot và giỏ tư vấn trong phiên.",
    "notes": "### Bắt đầu\nGiải nén đủ 9 file; mở index.html cạnh assets/. CUSTOMISE.md có 10 bước, 12 prompt AI và bảng sửa đã đếm. Không framework, build hoặc font mạng.\n\n### Nội dung và hình ảnh\nThay BackBest 800/Plantronic, tên dòng BACKBEST 800 SERIES, giá $199 ($239 gạch ngang), mô tả màng loa 40mm/khớp gập và email hello@backbest800.example. Ba ảnh headphone-black/white/red.webp là cùng một mẫu tai nghe tự tạo với ba phối màu concept, không phải ảnh chụp chính thức của hãng. Không có liên kết với nhà sản xuất.\n\n### Tương tác\nNút/phím/vuốt chuyển hai chiều, chọn 6 kiểu đệm tai, xem chi tiết bộ phận qua hotspot, tìm kiếm một mẫu tai nghe, giỏ tư vấn thêm/xóa trong phiên và email. Sound preview là hoạt cảnh phối màu 4.2 giây, không phải luồng âm thanh hay video quay thật. Chuyển động mặc định bật; Pause motion chỉ áp dụng trang đang mở. Email chỉ mở ứng dụng.\n\n### Phạm vi và giấy phép\nKhông có bán lẻ trực tiếp, thanh toán, tài khoản, đo tai hoặc tồn kho thực. Đọc LICENCE.txt; ảnh dùng trong website hoàn chỉnh, không bán lại template hoặc ảnh riêng lẻ."
  },
  "en": {
    "intro": "An obsidian-and-crimson wireless headphone showroom with glowing concentric target rings, three original finishes, hotspots and a session enquiry bag.",
    "notes": "### Start\nExtract all 9 files; open index.html beside assets/. CUSTOMISE.md has 10 steps, 12 AI prompts and counted edits. No framework, build or network fonts.\n\n### Content and artwork\nReplace BackBest 800/Plantronic, the model line BACKBEST 800 SERIES, $199 ($239 compare-at), sample 40mm driver/hinge descriptions and hello@backbest800.example. headphone-black/white/red.webp depict one original generated concept in three finishes, not official manufacturer photography. No manufacturer affiliation.\n\n### Interaction\nButtons/keys/swipe switch both ways; 6 example cushion-fit options, component hotspot details, one-model search, session add/remove enquiry bag and email. Sound preview is a 4.2-second colourway sequence, not audio/video stream footage. Motion defaults ON; Pause motion applies to this visit. Email opens an app only.\n\n### Scope and licence\nNo live retail checkout, payment, account, acoustic measurement or inventory. Read LICENCE.txt; artwork is allowed in finished sites, not template redistribution or standalone stock resale."
  },
  "zh": {
    "intro": "黑红配色无线耳机展厅，含发光同心圆环、三种原创配色、热点和会话咨询袋。",
    "notes": "### 开始\n完整解压9个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条AI提示词和精确修改表。无需框架、构建或网络字体。\n\n### 内容与图像\n替换BackBest 800/Plantronic、型号名BACKBEST 800 SERIES、$199（原价$239）、示例40mm驱动单元/铰链说明及hello@backbest800.example。headphone-black/white/red.webp为同一原创概念耳机的三种配色，并非品牌官方摄影。无厂家关联。\n\n### 交互\n按钮/按键/滑动双向切换，6种示例耳垫规格、部件热点详情、单型号搜索、会话添加/移除咨询袋与邮件。Sound preview为4.2秒配色动画，非实拍音视频。动态默认开启，Pause motion仅限本次访问。邮件仅打开应用。\n\n### 范围与授权\n无零售结账、支付、账户、声学测量或库存。阅读LICENCE.txt；图像可用于成品网站，不可重新分发模板或单独作为素材转售。"
  }
},
  'airmax-plus': {
  "vi": {
    "intro": "Showroom giày thể thao nền tối với dải sóng lưới cam 3D, ba phối màu tự tạo, hotspot và giỏ tư vấn trong phiên.",
    "notes": "### Bắt đầu\nGiải nén đủ 9 file; mở index.html cạnh assets/. CUSTOMISE.md có 10 bước, 12 prompt AI và bảng sửa đã đếm. Không framework, build hoặc font mạng.\n\n### Nội dung và hình ảnh\nThay AirMax Plus/Nike, tên mẫu Air Max Plus, giá $249,99, mô tả đệm Tuned Air/khung TPU và email hello@airmaxplus.example. Ba ảnh shoe-sunset/volt/crimson.webp là cùng một mẫu giày tự tạo với ba phối màu concept, không phải ảnh chụp chính thức của hãng. Không có liên kết với nhà sản xuất.\n\n### Tương tác\nNút/phím/vuốt chuyển hai chiều, chọn 6 cỡ US, xem chi tiết bộ phận qua hotspot, tìm kiếm một mẫu giày, giỏ tư vấn đặt trước thêm/xóa trong phiên và email. Watch preview là hoạt cảnh phối màu 4.2 giây, không phải video quay thật. Chuyển động mặc định bật; Pause motion chỉ áp dụng trang đang mở. Email chỉ mở ứng dụng.\n\n### Phạm vi và giấy phép\nKhông có bán lẻ trực tiếp, thanh toán, tài khoản, đo chân hoặc tồn kho thực. Đọc LICENCE.txt; ảnh dùng trong website hoàn chỉnh, không bán lại template hoặc ảnh riêng lẻ."
  },
  "en": {
    "intro": "A dark sneaker showroom with a 3D orange wireframe ribbon, three original finishes, hotspots and a session enquiry bag.",
    "notes": "### Start\nExtract all 9 files; open index.html beside assets/. CUSTOMISE.md has 10 steps, 12 AI prompts and counted edits. No framework, build or network fonts.\n\n### Content and artwork\nReplace AirMax Plus/Nike, the model name Air Max Plus, $249,99, sample Tuned Air/TPU descriptions and hello@airmaxplus.example. shoe-sunset/volt/crimson.webp depict one original generated concept in three finishes, not official manufacturer photography. No manufacturer affiliation.\n\n### Interaction\nButtons/keys/swipe switch both ways; 6 example US sizes, component hotspot details, one-model search, session add/remove enquiry bag and email. Watch preview is a 4.2-second colourway sequence, not video footage. Motion defaults ON; Pause motion applies to this visit. Email opens an app only.\n\n### Scope and licence\nNo live retail checkout, payment, account, foot measurement or inventory. Read LICENCE.txt; artwork is allowed in finished sites, not template redistribution or standalone stock resale."
  },
  "zh": {
    "intro": "深色运动鞋展厅，含3D橙色线框波浪、三种原创配色、热点和会话咨询袋。",
    "notes": "### 开始\n完整解压9个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条AI提示词和精确修改表。无需框架、构建或网络字体。\n\n### 内容与图像\n替换AirMax Plus/Nike、鞋款名Air Max Plus、$249,99、示例Tuned Air/TPU说明及hello@airmaxplus.example。shoe-sunset/volt/crimson.webp为同一原创概念鞋款的三种配色，并非品牌官方摄影。无厂家关联。\n\n### 交互\n按钮/按键/滑动双向切换，6个示例美码、部件热点详情、单鞋款搜索、会话添加/移除咨询袋与邮件。Watch preview为4.2秒配色动画，非实拍录像。动态默认开启，Pause motion仅限本次访问。邮件仅打开应用。\n\n### 范围与授权\n无零售结账、支付、账户、脚型测量或库存。阅读LICENCE.txt；图像可用于成品网站，不可重新分发模板或单独作为素材转售。"
  }
},
  'aerosix': {
  "vi": {
    "intro": "Showroom xe đạp nền tối với ba màu xe tự tạo, hotspot và giỏ tư vấn trong phiên.",
    "notes": "### Bắt đầu\nGiải nén đủ 9 file; mở index.html cạnh assets/. CUSTOMISE.md có10 bước,12 prompt AI và bảng sửa đã đếm. Không framework,build hoặc font mạng.\n\n### Nội dung và hình ảnh\nThay AeroSix/cannondale,tên xe,giá $11,000,cấu hình minh họa,email hello@aerosix.example và câu giao hàng. Ba ảnh bike-black/green/chalk.webp là cùng một mẫu xe tự tạo với ba màu concept,không phải màu sơn chuẩn của hãng. Không có liên kết với nhà sản xuất.\n\n### Tương tác\nNút/phím/vuốt chuyển hai chiều,chọn6 cỡ,xem linh kiện,tìm một mẫu xe,giỏ tư vấn thêm/xóa trong phiên và email. See it in action là hoạt cảnh thiết kế4.2 giây,không phải footage. Chuyển động mặc định bật;Pause motion chỉ áp dụng trang đang mở. Email chỉ mở ứng dụng.\n\n### Phạm vi và giấy phép\nKhông có bán xe,thanh toán,tài khoản,tính fit hoặc tồn kho. Điều khoản giao hàng mẫu phải thay trước khi xuất bản. Đọc LICENCE.txt;ảnh dùng trong website hoàn chỉnh,không bán lại template hoặc ảnh riêng lẻ."
  },
  "en": {
    "intro": "A dark bicycle showroom with three original finishes,hotspots and a session enquiry bag.",
    "notes": "### Start\nExtract all9 files;open index.html beside assets/. CUSTOMISE.md has10 steps,12 AI prompts and counted edits. No framework,build or network fonts.\n\n### Content and artwork\nReplace AeroSix/cannondale,the model,$11,000,sample equipment,hello@aerosix.example and the shipping line. bike-black/green/chalk.webp depict one original generated concept in three finishes,not verified factory paint. No manufacturer affiliation.\n\n### Interaction\nButtons/keys/swipe switch both ways;6 example sizes,component details,one-model search,session add/remove bag and email. See it in action is a4.2-second design sequence,not footage. Motion defaults ON;Pause motion applies to this visit. Email opens an app only.\n\n### Scope and licence\nNo bicycle sales,payment,account,fit calculation or inventory. Replace sample shipping terms before publication. Read LICENCE.txt;artwork is allowed in finished sites,not template redistribution or standalone stock resale."
  },
  "zh": {
    "intro": "深色自行车展厅，含三种原创配色、热点和会话咨询袋。",
    "notes": "### 开始\n完整解压9个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条AI提示词和精确修改表。无需框架、构建或网络字体。\n\n### 内容与图像\n替换AeroSix/cannondale、车型、$11,000、示例配置、hello@aerosix.example及配送文字。bike-black/green/chalk.webp为同一原创概念车型的三种配色，并非厂家认证漆色。无厂家关联。\n\n### 交互\n按钮/按键/滑动双向切换，6个示例尺码、部件详情、单车型搜索、会话添加/移除咨询袋与邮件。See it in action为4.2秒设计动画，非骑行录像。动态默认开启，Pause motion仅限本次访问。邮件仅打开应用。\n\n### 范围与授权\n无自行车销售、支付、账户、适配计算或库存。发布前替换示例配送条款。阅读LICENCE.txt；图像可用于成品网站，不可重新分发模板或单独作为素材转售。"
  }
},
  'motora': {
  "vi": {
    "intro": "Showroom ô tô nền sáng với xe vàng chân thực, 5 màu và các điểm xem chi tiết.",
    "notes": "### Bắt đầu\nGiải nén đủ 8 file; mở index.html cạnh assets/. CUSTOMISE.md có 10 bước, 12 prompt AI và bảng sửa đã đếm. Không framework, build hoặc font mạng.\n\n### Nội dung và hình ảnh\nThay Car./Motora, tên xe, thông số minh họa và hello@motora.example. coupe.webp là xe nền trong suốt; interior.webp là nội thất tự tạo. Không có liên kết với hãng xe hoặc số liệu được chứng nhận.\n\n### Tương tác\n5 màu dùng bộ lọc ảnh, không phải mô hình 3D hoặc màu sơn chuẩn của hãng. Mâm chỉ đổi nội dung tư vấn. Cấu hình và lưu trong phiên, tìm một mẫu xe, hotspot, menu và Escape hoạt động. Email chỉ mở ứng dụng. Chuyển động mặc định bật; Pause motion chỉ áp dụng trang đang mở.\n\n### Phạm vi và giấy phép\nKhông có bán xe, thanh toán hoặc backend. Đọc LICENCE.txt; ảnh dùng trong website hoàn chỉnh, không bán lại template hoặc ảnh riêng lẻ."
  },
  "en": {
    "intro": "A light automotive showroom with a photoreal gold coupe, five finishes and detail hotspots.",
    "notes": "### Start\nExtract all 8 files; open index.html beside assets/. CUSTOMISE.md includes 10 steps, 12 AI prompts and counted edits. No framework, build or network fonts.\n\n### Content and artwork\nReplace Car./Motora, vehicle names, illustrative figures and hello@motora.example. coupe.webp is a transparent car; interior.webp is original cabin artwork. No manufacturer affiliation or verified specifications.\n\n### Interaction\nFive finishes use image filters, not 3D or factory-accurate paint. Wheels change enquiry text only. Local configuration, session save, one-model search, hotspots, keyboard menu and Escape work. Email opens an app only. Motion defaults ON; Pause motion applies to the current page visit.\n\n### Scope and licence\nNo vehicle sales, payment or backend. Read LICENCE.txt; use artwork in finished sites, not template redistribution or standalone stock resale."
  },
  "zh": {
    "intro": "浅色汽车展厅，含写实金色轿跑、五种视觉配色与细节热点。",
    "notes": "### 开始\n完整解压8个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条AI提示词与精确修改表。无需框架、构建或网络字体。\n\n### 内容与图像\n替换Car./Motora、车型名称、示例数据和hello@motora.example。coupe.webp为透明汽车，interior.webp为原创内饰图。无厂家关联或认证参数。\n\n### 交互\n五种配色使用图像滤镜，并非3D或厂家准确漆色；轮毂仅更改咨询文字。支持本地配置、会话保存、单车型搜索、热点、键盘菜单和Escape。邮件仅打开应用。动态默认开启，Pause motion仅适用于本次页面访问。\n\n### 范围与授权\n无车辆销售、支付或后端。阅读LICENCE.txt；图像可用于成品网站，不可重新分发模板或单独作为素材转售。"
  }
},
  'semaan': {
  "vi": {
    "intro": "Portfolio designer với hero cam-trắng, chữ CREATE cao và chân dung tự tạo.",
    "notes": "### Bắt đầu\nGiải nén đủ 9 file, mở index.html cạnh assets/. CUSTOMISE.md có bảng sửa chính xác, 10 bước và 12 prompt AI. Không framework, build hoặc font mạng.\n\n### Nội dung và ảnh\nThay Alexis Semaan, email hello@semaan.example, availability, ba tác phẩm concept và sample client note. Không bỏ nhãn mẫu mà giữ lời chứng thực hư cấu. portrait.webp là chân dung nền trong suốt; work.webp là sheet 3 cột; people.webp là sheet 2×2 nhân vật hư cấu.\n\n### Tương tác\nMenu mobile dùng bàn phím/Escape; desktop có liên kết Work. Chi tiết tác phẩm và dịch vụ dùng details, hoạt động không JS. Reveal hữu hạn 620ms mặc định bật kể cả OS giảm chuyển động. Email chỉ mở ứng dụng, không tự gửi. Không backend hoặc booking.\n\n### Giấy phép\nĐọc LICENCE.txt. Ảnh dùng trong website hoàn chỉnh theo giấy phép thương mại hiện có; không bán lại template hoặc ảnh riêng lẻ."
  },
  "en": {
    "intro": "A designer portfolio with an orange/white hero, tall CREATE type and an original cinematic portrait.",
    "notes": "### Start\nExtract all 9 files and open index.html beside assets/. CUSTOMISE.md includes counted edits, 10 steps and 12 complete AI prompts. No framework, build or network fonts.\n\n### Content and images\nReplace Alexis Semaan, hello@semaan.example, availability, three concept studies and the sample client note. Never remove only the sample disclosure while keeping invented claims. portrait.webp is transparent; work.webp is a 3-column sheet; people.webp contains a 2×2 sheet of fictional people.\n\n### Interaction\nMobile keyboard/Escape menu, desktop work shortcut. Native work/service details function without JS. Finite 620ms scroll reveals default ON under OS reduced motion. Email opens a mail app only; no delivery, booking or backend.\n\n### Licence\nRead LICENCE.txt. Existing commercial policy permits artwork in finished websites, not template redistribution or standalone stock resale."
  },
  "zh": {
    "intro": "设计师作品集，含橙白主视觉、高挑CREATE字体与原创电影感肖像。",
    "notes": "### 开始\n完整解压9个文件，在assets/旁打开index.html。CUSTOMISE.md含精确修改表、10个步骤与12个完整AI提示词。无需框架、构建或网络字体。\n\n### 内容与图像\n替换Alexis Semaan、hello@semaan.example、工作状态、三项概念作品与示例客户评价。不得仅删除示例标记却保留虚构评价。portrait.webp为透明肖像；work.webp为3列作品图；people.webp为2×2虚构人物图。\n\n### 交互\n移动菜单支持键盘与Escape，桌面有作品快捷链接。原生作品/服务details在禁用JS时仍可用。620毫秒有限渐显默认开启，包括系统减少动态。邮件仅打开应用，无自动发送、预约或后端。\n\n### 授权\n阅读LICENCE.txt。现有商业授权允许图像用于成品网站，不允许重新分发模板或单独作为素材转售。"
  }
},
  'ais-folio': {
  "vi": {
    "intro": "Portfolio cyan và xanh đen với nhân vật anime tự tạo và sáu poster.",
    "notes": "### Bắt đầu\nGiải nén đủ 8 file, mở index.html cạnh assets/. CUSTOMISE.md có bảng sửa, 10 bước và 12 prompt AI. Không framework, build hay font mạng.\n\n### Nội dung và ảnh\nThay tên Ais, các handle, mô tả và email hello@aisfolio.example. Nội dung cá nhân và dự án đều minh họa. character.webp là nhân vật nền trong suốt; projects.webp là ảnh 3 cột × 2 hàng, CSS chọn từng poster.\n\n### Tương tác\nMenu hỗ trợ Escape và bàn phím. Mô tả dự án dùng details, hoạt động khi tắt JS. Scroll reveal hữu hạn 620ms, mặc định bật kể cả OS giảm chuyển động. Email chỉ mở ứng dụng, không gửi tự động. Không backend.\n\n### Giấy phép\nĐọc LICENCE.txt. Ảnh dùng trong website hoàn chỉnh theo giấy phép; không bán lại template hoặc ảnh riêng lẻ."
  },
  "en": {
    "intro": "A cyan and navy portfolio with an original anime character and six posters.",
    "notes": "### Start\nExtract all 8 files and open index.html beside assets/. CUSTOMISE.md includes exact edits, 10 steps and 12 AI prompts. No framework, build or network fonts.\n\n### Content and images\nReplace Ais, handles, copy and hello@aisfolio.example. Persona and projects are illustrative. character.webp is transparent; projects.webp is a 3-column × 2-row sheet selected by CSS.\n\n### Interaction\nKeyboard menu and Escape. Native details descriptions work without JS. Finite 620ms scroll reveals default on under OS reduced motion. Email opens an app only, with no delivery service or backend.\n\n### Licence\nRead LICENCE.txt. Artwork is licensed for finished websites, not standalone stock resale or template redistribution."
  },
  "zh": {
    "intro": "青色与深蓝作品集，含原创动漫角色和六张海报。",
    "notes": "### 开始\n完整解压8个文件，在assets/旁打开index.html。CUSTOMISE.md包含修改表、10个步骤和12个AI提示词。无需框架、构建或网络字体。\n\n### 内容与图片\n替换Ais、昵称、文案和hello@aisfolio.example。人物与项目均为示例。character.webp为透明角色；projects.webp为3列×2行海报图，通过CSS显示各格。\n\n### 交互\n菜单支持键盘与Escape。原生details作品描述在禁用JS时可用。620毫秒有限滚动渐显默认开启，包括系统减少动态。邮件仅打开应用，不含发送服务或后端。\n\n### 授权\n阅读LICENCE.txt。图像可按授权用于成品网站，不得单独作为素材转售或重新分发模板。"
  }
},
  leaflit: {
    vi: { intro: 'Thư viện sách cá nhân với tám bìa tự tạo và các tương tác chạy cục bộ.', notes: '### Bắt đầu\nGiải nén đủ 14 file, mở index.html cạnh assets/. Đọc CUSTOMISE.md: bảng sửa, 10 bước và 12 prompt AI. Không framework hoặc build.\n\n### Bìa sách\nTám ảnh WebP trong assets/img/. Đổi tên sách cần đổi chữ trong ảnh cùng caption và mô tả HTML. Giữ tỷ lệ 2:3 và alt. Sách, tác giả và số liệu là mẫu giả định; không có nội dung ebook.\n\n### Tương tác\nTìm theo tên/tác giả, lọc thể loại, lưu/bỏ lưu, đổi tên hồ sơ. localStorage chỉ trên cùng trình duyệt/origin; các tab cùng origin đồng bộ. Nếu bị chặn, thông báo nói rõ chỉ lưu trong phiên. Không tài khoản, cloud sync, backend hoặc thanh toán. Motion mặc định bật, hiệu ứng hữu hạn.\n\n### Giấy phép\nĐọc LICENCE.txt trước xuất bản. Mã và ảnh dùng trong website cá nhân/khách hàng theo giấy phép; không bán lại file hoặc ảnh riêng lẻ.' },
    en: { intro: 'A personal book library with eight original covers and browser-local interactions.', notes: '### Start\nExtract all 14 files and open index.html beside assets/. CUSTOMISE.md includes counted edits, ten steps and twelve AI prompts. No framework or build.\n\n### Covers\nEight WebP images live in assets/img/. Renaming a book requires updating the image text, HTML caption and description together. Keep the 2:3 ratio and accurate alt text. Books, authors and statistics are fictional samples; no full ebook content is included.\n\n### Interactions\nSearch title/author, filter genres, save/remove books and edit your display name. localStorage is per browser and origin; same-origin tabs sync. Blocked storage falls back to the current session with a notice. No accounts, cloud sync, backend or payments. Motion defaults on with finite effects.\n\n### Licence\nRead LICENCE.txt before publishing. Use code and artwork in personal/client websites under the licence; no resale of template files or separate images.' },
    zh: { intro: '个人书库模板，含八张原创封面与浏览器本地交互。', notes: '### 开始\n完整解压14个文件，在assets/旁打开index.html。CUSTOMISE.md包含精确修改表、十个步骤和十二个AI提示词。无需框架或构建。\n\n### 封面\n八张WebP位于assets/img/。更改书名时，同步更新图片文字、HTML标题和描述。保留2:3比例及准确alt。书籍、作者和数据均为虚构示例，不含完整电子书。\n\n### 交互\n支持书名/作者搜索、类型筛选、收藏和昵称编辑。localStorage按浏览器和来源隔离，同源标签页同步。存储被阻止时，仅在当前会话保留并提示。不含账户、云同步、后端或支付。动画默认开启且有结束时间。\n\n### 授权\n发布前阅读LICENCE.txt。按授权将代码和图像用于个人/客户网站，不得转售模板文件或单独图像。' },
  },
  chronoform: {
    vi: { intro: 'Showroom đồng hồ với chuyển mẫu, xoay WebGL, thư viện lọc và giỏ tư vấn trong phiên.', notes: '### Bắt đầu\nGiải nén đủ 24 file. Mở index.html cạnh assets/. CUSTOMISE.md có bảng sửa, 10 bước và 12 prompt AI. Không framework hoặc build.\n\n### Ảnh và mô hình\n17 ảnh WebP ở assets/img/: 5 mặt số, 1 ảnh editorial ba phần và 11 ảnh đồng hồ dựng từ mô hình. Sửa PRODUCTS, FEATURED và các thẻ HTML đồng bộ. watch3d.js dựng vỏ, núm, dây và xoay. file:// hoặc WebGL bị chặn dùng ảnh 2D dự phòng; chạy HTTP để xem mô hình có texture.\n\n### Tương tác\n4 mẫu hero, mũi tên/phím, xoay hữu hạn, kéo, trước/sau, lọc chức năng/size/chất liệu, tìm kiếm và giỏ cục bộ. Pause motion chỉ trong phiên; mở mới luôn bật. Giá, thuế và thông số minh họa. Request a consultation mở mailto, không đặt hàng/thanh toán. Thay email .example; không backend, tài khoản hoặc tồn kho.' },
    en: { intro: 'A watch showroom with model transitions, WebGL rotation, filtered collection and a session enquiry bag.', notes: '### Start\nExtract all 24 files. Open index.html beside assets/. CUSTOMISE.md includes counted edits, ten steps and twelve AI prompts. No framework or build.\n\n### Images and model\n17 WebP files in assets/img/: five dials, one three-panel editorial image and eleven rendered watch thumbnails. Keep PRODUCTS, FEATURED and HTML cards consistent. watch3d.js builds the case, crown, strap and rotation. file:// or blocked WebGL uses a 2D photograph fallback; use HTTP for textured 3D.\n\n### Interactions\nFour hero models, arrows/keyboard, finite spin, drag, front/back, family/size/material filters, search and local bag. Pause motion lasts only in this session; new loads default ON. Prices, tax and specifications are illustrative. Request a consultation opens mailto, not an order or payment. Replace the .example email. No backend, account or inventory.' },
    zh: { intro: '腕表展厅，含型号切换、WebGL 旋转、筛选系列与会话咨询袋。', notes: '### 开始\n完整解压 24 个文件，在 assets/ 旁打开 index.html。CUSTOMISE.md 包含精确修改表、10 个步骤和 12 个 AI 提示词。无需框架或构建。\n\n### 图片与模型\nassets/img/ 含 17 张 WebP：五张表盘、一张三栏 editorial 图和十一张模型缩略图。同步修改 PRODUCTS、FEATURED 与 HTML 卡片。watch3d.js 构建表壳、表冠、表带与旋转。file:// 或 WebGL 被阻止时使用 2D 图片备用；通过 HTTP 查看带纹理的 3D。\n\n### 交互\n四款主展示、箭头/键盘、有限旋转、拖动、正反面、功能/尺寸/材质筛选、搜索及本地咨询袋。暂停仅限当前会话，新打开默认启用。价格、税与规格为示例。咨询入口打开邮件，不下单或付款。替换 .example 邮箱。不含后端、账户或库存。' },
  },
  shopluxe: {
    vi: { intro: 'Giao diện cửa hàng phong cách sống với hero carousel, 7 danh mục, giỏ hàng trong phiên và 3 thẻ ưu đãi.', notes: '### Bắt đầu\nGiải nén đủ 20 file, mở index.html cạnh assets/. CUSTOMISE.md có 10 bước, 12 prompt AI và bảng Edit Map đã đếm chính xác. Không framework, font mạng hay build.\n\n### Nội dung và ảnh\nSửa thương hiệu, thông tin liên hệ và catalog sản phẩm trong HTML và main.js. 14 ảnh WebP tối ưu nằm trong assets/img/ (gồm ảnh hero, 7 thẻ danh mục, 5 sản phẩm và avatar khách hàng). Thay email support@shopluxe.example và số điện thoại trước khi xuất bản.\n\n### Tương tác\nHero carousel hỗ trợ nút Trước/Sau; dải 7 danh mục bo góc điều hướng tới các bộ sưu tập; nút Add To Cart cập nhật số đếm giỏ hàng trong phiên và hiện thông báo toast; ngăn kéo tìm kiếm mở đóng mượt mà bằng phím Escape. Không có backend, lưu đơn hoặc thanh toán.' },
    en: { intro: 'A modern lifestyle storefront template with hero carousel, 7 categories, in-session cart and 3 offer cards.', notes: '### Start\nExtract all 20 files. Open index.html beside assets/. CUSTOMISE.md includes 10 steps, 12 AI prompts and counted Edit Map. No framework, remote fonts or build required.\n\n### Content and images\nUpdate branding, contact details and product catalog in HTML and main.js. 14 optimized WebP images live in assets/img/ (hero products, 7 category cards, 5 products and customer avatars). Replace support@shopluxe.example and phone number before publishing.\n\n### Interaction\nHero carousel with Prev/Next buttons; 7 category pills navigation; Add To Cart buttons update session cart badge and display toast alerts; search drawer opens and closes with Escape key. No backend, order storage or payments included.' },
    zh: { intro: '现代生活方式独立站模板，含 Hero 轮播、7 大分类、会话购物车与 3 大特色优惠卡片。', notes: '### 开始\n完整解压 20 个文件，在 assets/ 旁打开 index.html。CUSTOMISE.md 包含 10 个步骤、12 个 AI 提示词和精确修改表。无需框架、网络字体或构建。\n\n### 内容与图片\n在 HTML 和 main.js 中同步修改品牌、联系方式与商品信息。assets/img/ 包含 14 张优化 WebP 图片（Hero 商品组、7 个分类、5 个热门商品及客户头像）。发布前请替换 support@shopluxe.example 与客服电话。\n\n### 交互\nHero 轮播支持上一个/下一个切换；7 大圆角分类卡片直达集合；Add To Cart 按钮更新会话购物车角标并弹出提示；搜索抽屉支持 Escape 键快速关闭。不含后端、订单存储或支付系统。' },
  },
  'orbit-academy': {
    vi: { intro: 'Giao diện giáo dục thiên văn với ba cảnh vũ trụ, bài học và câu hỏi ôn tập cục bộ.', notes: '### Bắt đầu\nGiải nén đủ 10 file, mở index.html cạnh assets/. CUSTOMISE.md có bảng sửa, 10 bước và 12 prompt AI. Không framework, font mạng hoặc build.\n\n### Nội dung và ảnh\nSửa brand, mô tả bài học trong HTML cùng mảng worlds/lessons trong main.js. Bốn ảnh concept nằm ở assets/img/. objects.webp gồm Earth, planet, meteor theo ba phần bằng nhau. Ảnh là minh họa tưởng tượng, không ảnh lưu trữ NASA hay mô hình đúng tỷ lệ. Xác minh kiến thức và đáp án qua nguồn khoa học trước khi sửa.\n\n### Học và chuyển động\n01–03, mũi tên, phím và vuốt chuyển cảnh. Tìm kiếm chỉ lọc ba bài tại trang. Open lesson mở dialog; quiz có phản hồi và tiến độ chỉ trong phiên, Reset checks xóa tiến độ. Menu mở ở mọi khổ. Pause motion chỉ trong trang, mở mới mặc định bật kể cả OS reduce. Không tài khoản, LMS, chứng chỉ, backend hoặc theo dõi học sinh. Email .example cần thay.' },
    en: { intro: 'An astronomy learning interface with three cinematic worlds, local lessons and knowledge checks.', notes: '### Start\nExtract all 10 files. Open index.html beside assets/. CUSTOMISE.md includes counted edits, ten steps and twelve AI prompts. No framework, remote fonts or build.\n\n### Content and art\nUpdate HTML and worlds/lessons in main.js together. Four concept images live in assets/img/. objects.webp contains equal thirds for Earth, planet and meteor. Artwork is imaginative, not NASA archival imagery or scientific scale models. Verify statements and answer indexes against scientific sources before editing.\n\n### Learning and motion\n01–03, arrows, keyboard and swipe switch worlds. Search filters only three on-page lessons. Lesson dialogs provide answer feedback and session-only progress; Reset checks clears it. Menu expands at every width. Pause motion is page-only; new loads default ON even under OS reduce. No accounts, LMS, certificates, backend or student tracking. Replace the .example email.' },
    zh: { intro: '天文学习界面，含三个电影感场景、本地课程和知识测验。', notes: '### 开始\n完整解压10个文件，在assets/旁打开index.html。CUSTOMISE.md含精确修改表、10个步骤及12个AI提示词。无需框架、网络字体或构建。\n\n### 内容与图片\n同步修改HTML和main.js的worlds/lessons。assets/img/含四张概念图；objects.webp依次显示地球、行星、流星各三分之一。图片是想象插图，不是NASA历史照片或准确比例模型。修改知识及答案索引前核对科学来源。\n\n### 学习与动态\n01–03、箭头、键盘和滑动切换场景。搜索仅筛选当前三门课程。弹窗测验提供反馈和会话进度，Reset checks重置。菜单在所有尺寸展开。暂停仅当前页面有效，重新打开默认开启，包括系统减少动态。不含账户、LMS、证书、后台或学生跟踪。需替换.example邮箱。' },
  },
  verdant: {
    vi: { intro: 'Mẫu café nền kem và xanh matcha với ba đồ uống, ảnh tự tạo và carousel chuyển hai chiều.', notes: '### Bắt đầu\nGiải nén đủ 8 file, mở index.html cạnh assets/. CUSTOMISE.md có 10 bước, 12 prompt AI và bảng sửa đã đếm. Không framework, font mạng hoặc build.\n\n### Nội dung và ảnh\nSửa thương hiệu, giá và mô tả trong HTML cùng mảng products của main.js. assets/img/drinks.webp là ảnh ba ly theo thứ tự matcha, mango, berry; CSS hiển thị từng phần ba. bean.webp là hạt trang trí. Thay toàn bộ email hello@verdant.example và xác minh thành phần/allergen trước xuất bản.\n\n### Tương tác\nThẻ vị, nút mũi tên, phím trái/phải và vuốt chuyển sản phẩm. Size là lựa chọn minh họa, không đổi giá. Discover mở dialog; Escape đóng. Scroll chuyển động ly ở Our craft. Pause motion chỉ áp dụng trang hiện tại; mở mới mặc định bật, kể cả hệ thống giảm chuyển động. Không có backend, giỏ hoặc thanh toán đồ uống.' },
    en: { intro: 'A cream and matcha-green café template with three original drinks and a directional carousel.', notes: '### Start\nExtract all 8 files. Open index.html beside assets/. CUSTOMISE.md includes ten steps, twelve AI prompts and counted edits. No framework, remote fonts or build.\n\n### Content and images\nEdit HTML and the products array in main.js together. assets/img/drinks.webp contains three cups ordered matcha, mango, berry; CSS displays equal thirds. bean.webp is decorative. Replace hello@verdant.example and verify ingredients and allergens before publishing.\n\n### Interaction\nThumbnails, arrows, keyboard and swipe switch flavours. Size is a demonstration preference and does not change price. Discover opens a detail dialog; Escape closes it. Our craft animates a cup with scroll. Pause motion is session-only; new loads default ON even with OS reduced motion. No drink ordering, cart, backend or payments are included.' },
    zh: { intro: '奶油白与抹茶绿咖啡馆模板，含三款原创饮品图和双向轮播。', notes: '### 开始\n完整解压8个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12个AI提示词和精确修改表。无需框架、网络字体或构建。\n\n### 内容与图片\n同步修改HTML与main.js的products数组。drinks.webp依次包含抹茶、芒果、草莓三杯，CSS显示各三分之一；bean.webp为装饰。发布前替换hello@verdant.example并确认配料与过敏原。\n\n### 交互\n缩略图、箭头、键盘和滑动切换口味。尺寸仅为演示偏好，不改变价格。Discover打开详情弹窗，Escape关闭。滚动控制Our craft饮品场景。暂停仅限当前页面，重新打开默认启用，包括系统减少动态设置。不含饮品下单、购物车、后台或支付。' },
  },
  dualplay: {
  "vi": {
    "intro": "Showroom tay cầm concept với Genshin Impact số 1 và chuyển động vòng tròn thủ công.",
    "notes": "### Bắt đầu\nGiải nén đủ 9 file, mở index.html và giữ assets/ cạnh trang. CUSTOMISE.md có 10 bước, 12 prompt AI và bảng sửa đã đếm.\n\n### Nội dung\nThứ tự editions trong assets/js/main.js: Genshin Impact, God of War, 007 First Light. Sửa cả hero ban đầu và collection trong HTML khi thay dữ liệu. Ba ảnh WebP tự tạo nằm ở assets/img/. Tên game, nhãn hiệu, giá và thông số là dữ liệu demo; thay bằng nội dung bạn có quyền sử dụng.\n\n### Tương tác\nBấm hoặc vuốt để quay ba vị trí, 1,3 giây mỗi lượt. Thẻ bên phải là mẫu kế tiếp và mẫu sau nữa. Nút play mở cảnh sản phẩm hữu hạn sáu giây, không phải video gameplay. Escape đóng dialog. Giỏ chỉ lưu trong phiên, không gửi đơn hay xử lý thanh toán.\n\n### Giấy phép\nĐọc LICENCE.txt: mã và ảnh dùng trong website cá nhân/khách hàng; không bán lại file hoặc ảnh riêng lẻ. Không cấp quyền nhãn hiệu hoặc xác nhận sản phẩm chính hãng. Không framework, API key, font mạng hoặc build."
  },
  "en": {
    "intro": "A concept controller showroom with Genshin Impact first and a manual circular carousel.",
    "notes": "### Start\nExtract all 9 files. Open index.html beside assets/. CUSTOMISE.md includes ten steps, twelve AI prompts and counted edits.\n\n### Content\nThe editions array is ordered Genshin Impact, God of War, 007 First Light. Update the initial HTML hero and collection when editing the data. Three generated WebP assets are local in assets/img/. Game names, marks, price and specifications are illustrative; use content you are authorised to publish.\n\n### Interaction\nClick or swipe for a 1.3-second circular move. Right cards show the next and following models. Play opens a finite six-second product scene, not gameplay footage. Escape closes dialogs. The cart is session-only, with no order submission or payments.\n\n### Licence\nRead LICENCE.txt for personal/client website use. No template resale, separate image distribution, trademark rights or manufacturer endorsement. No framework, API key, remote fonts or build."
  },
  "zh": {
    "intro": "概念游戏手柄展厅，原神设计为第一款，支持手动环形轮播。",
    "notes": "### 开始\n完整解压9个文件，打开index.html并保留assets/。CUSTOMISE.md包含十个步骤、十二个AI提示词和精确修改表。\n\n### 内容\nmain.js的editions顺序为原神、战神、007。修改数据时同步更新初始首屏与产品列表。三张原创生成WebP图片位于assets/img/。游戏名称、标记、价格和规格均为演示内容；请替换为您获准使用的内容。\n\n### 交互\n点击或滑动触发1.3秒环形移动。右侧卡片展示接下来两款产品。播放按钮打开有限六秒产品场景，并非游戏视频。Escape关闭对话框。购物车仅在当前会话保存，不提交订单或处理支付。\n\n### 授权\n按LICENCE.txt用于个人/客户网站，不得转售模板或单独分发图片。不授予商标权或厂商背书。无需框架、API密钥、远程字体或构建。"
  }
},
  "galaxy-edge": {
  "vi": {
    "intro": "Landing page du lịch thiên hà với nền điện ảnh tự tạo và parallax.",
    "notes": "### Bắt đầu\nGiải nén đủ 7 file, mở index.html và giữ assets/ cạnh trang. Đọc CUSTOMISE.md cho 10 bước, 12 prompt AI và bảng sửa đã đếm.\n\n### Nội dung và ảnh\nThay Galaxy Edge, các điểm đến và gói du lịch minh hoạ. Ảnh nền nằm ở assets/img/galaxy-hero.webp.\n\n### Tương tác\nMenu, liên kết section, hover, parallax và reveal hữu hạn. Preview và nút tròn là liên kết, không phải video/carousel. Không kèm đặt vé hoặc thanh toán.\n\n### Giấy phép\nMã và ảnh tự tạo được dùng trong website cá nhân/khách hàng theo LICENCE.txt của Forge zone; không bán lại file mẫu hoặc ảnh riêng lẻ. Motion mặc định bật; không framework, API key hoặc build."
  },
  "en": {
    "intro": "A galactic travel landing page with original cinematic artwork and parallax.",
    "notes": "### Start\nExtract all 7 files. Open index.html beside assets/. CUSTOMISE.md has ten steps, twelve prompts and counted edits.\n\n### Content and images\nReplace the brand, fictional destinations and illustrative travel packages. The local hero image is assets/img/galaxy-hero.webp.\n\n### Interaction\nSection links, menu, hover, parallax and finite reveals. The preview and circle buttons link to sections; no video player, carousel, booking or payments.\n\n### Licence\nForge zone permits personal/client website use of the code and self-created images under LICENCE.txt. No template resale or standalone image distribution. Motion defaults on. No framework, API key or build."
  },
  "zh": {
    "intro": "具有原创电影感背景与视差的银河旅行页面。",
    "notes": "### 开始\n完整解压7个文件，打开index.html并保留assets/。CUSTOMISE.md含十个步骤、十二个提示词与精确修改表。\n\n### 内容与图片\n替换品牌、虚构目的地和示例套餐。背景位于assets/img/galaxy-hero.webp。\n\n### 交互\n菜单、区块链接、悬停、视差与有限渐显。预览与圆形按钮链接页面区块，不含视频播放器、轮播、预订或支付。\n\n### 授权\n按Forge zone的LICENCE.txt将源码与原创图片用于个人/客户网站，不得转售模板或单独分发图片。动画默认开启，无框架、API密钥或构建要求。"
  }
},
  "aerox-studio": {
  "vi": {
    "intro": "Showroom xe máy với 5 lựa chọn xe/màu và carousel thủ công.",
    "notes": "### Bắt đầu\nGiải nén đủ 13 file, mở index.html và giữ assets/ cạnh trang. Đọc CUSTOMISE.md cho 10 bước, 12 prompt AI và bảng sửa đã đếm.\n\n### Nội dung và ảnh\nSửa products trong assets/js/main.js và metadata HTML đồng thời. Bảy ảnh WebP cục bộ; Graphite là mô phỏng grayscale. Mẫu mới là concept, không phải dữ liệu hãng đã xác minh. Thay nhận diện bên thứ ba trước khi dùng cho doanh nghiệp.\n\n### Tương tác\nCarousel trượt vòng lặp 1,1 giây chỉ chạy khi bấm. Gallery có phím mũi tên và dialog phóng lớn; Escape đóng ảnh. Không đặt xe, tồn kho hoặc thanh toán.\n\n### Giấy phép\nMã và ảnh tự tạo được dùng trong website cá nhân/khách hàng theo LICENCE.txt của Forge zone; không bán lại file mẫu hoặc ảnh riêng lẻ. Motion mặc định bật; không framework, API key hoặc build."
  },
  "en": {
    "intro": "A five-choice motorcycle showroom with a manual carousel.",
    "notes": "### Start\nExtract all 13 files. Open index.html beside assets/. CUSTOMISE.md has ten steps, twelve prompts and counted edits.\n\n### Content and images\nEdit products in assets/js/main.js together with HTML metadata. Seven local WebP images; Graphite is grayscale. New models are illustrative concepts, not verified manufacturer data. Replace third-party branding for your business.\n\n### Interaction\nManual looping 1.1-second carousel, gallery arrow keys and enlarged-image dialog. Escape closes the image. No vehicle ordering, stock or payments.\n\n### Licence\nForge zone permits personal/client website use of the code and self-created images under LICENCE.txt. No template resale or standalone image distribution. Motion defaults on. No framework, API key or build."
  },
  "zh": {
    "intro": "五种车型/颜色选择与手动轮播的摩托车展厅。",
    "notes": "### 开始\n完整解压13个文件，打开index.html并保留assets/。CUSTOMISE.md含十个步骤、十二个提示词与精确修改表。\n\n### 内容与图片\n同步修改main.js的products与HTML元数据。七张本地WebP图片；Graphite为灰度模拟。车型为概念示例，非已核实的厂家数据。使用前替换第三方品牌。\n\n### 交互\n手动1.1秒循环轮播、图库方向键与放大图片对话框。Escape关闭图片。不含订车、库存或支付。\n\n### 授权\n按Forge zone的LICENCE.txt将源码与原创图片用于个人/客户网站，不得转售模板或单独分发图片。动画默认开启，无框架、API密钥或构建要求。"
  }
},

  lingoglass: {
    vi: { intro: 'LingoGlass là ứng dụng học ngoại ngữ trên máy tính, không phải giao diện website tĩnh.', notes: '### Bắt đầu\nGiải nén ZIP LingoGlass và đọc README.md cùng USER_GUIDE.md. Gói khôi phục gồm mã nguồn, bản dựng giao diện và tài liệu; không bao gồm bộ cài Windows/macOS.\n\n### Chạy ứng dụng từ mã nguồn\nCài Node.js, mở terminal trong thư mục lingoglass, chạy npm install rồi npm run electron:dev. Để đóng gói bản cài, dùng npm run electron:build theo README.\n\n### Học tập và bản quyền\nMở video hoặc podcast và phụ đề tương ứng; dùng A-B Repeat, tra từ và Shadowing. Bản desktop có cơ chế kích hoạt riêng: đọc USER_GUIDE.md và liên hệ nhà phát hành nếu cần mã kích hoạt. Demo trình duyệt chỉ là bản xem trước. Đọc THIRD_PARTY_NOTICES.md trước khi phân phối.' },
    en: { intro: 'LingoGlass is a desktop language-learning app, not a static website template.', notes: '### Start\nExtract the LingoGlass ZIP and read README.md and USER_GUIDE.md. The restored package contains source, a built interface and documentation; Windows/macOS installers are not included.\n\n### Run from source\nInstall Node.js, open a terminal in the lingoglass folder, run npm install and then npm run electron:dev. Use npm run electron:build to package an installer as described in README.\n\n### Learning and activation\nOpen a video or podcast and its subtitles; use A-B Repeat, dictionary and Shadowing. Desktop activation is separate: read USER_GUIDE.md and contact the publisher if an activation key is needed. The browser demo is a preview. Read THIRD_PARTY_NOTICES.md before distributing.' },
    zh: { intro: 'LingoGlass 是桌面外语学习应用，并非静态网站模板。', notes: '### 开始\n解压 LingoGlass ZIP，阅读 README.md 和 USER_GUIDE.md。恢复的文件包包含源码、已构建的界面和文档，不含 Windows/macOS 安装程序。\n\n### 从源码运行\n安装 Node.js，在 lingoglass 文件夹中打开终端，运行 npm install，然后 npm run electron:dev。按 README 使用 npm run electron:build 打包安装程序。\n\n### 学习与激活\n打开视频或播客及字幕，使用 A-B 复读、查词和跟读。桌面版采用独立激活机制，请阅读 USER_GUIDE.md，如需激活码请联系发行方。浏览器演示仅供预览。分发前请阅读 THIRD_PARTY_NOTICES.md。' },
  },
  "music-app": {
  "vi": {
    "intro": "Giao diện âm nhạc retro với ảnh tự tạo và trình phát demo cục bộ.",
    "notes": "### Bắt đầu\nGiải nén đủ 12 file, mở index.html và giữ assets/ bên cạnh. CUSTOMISE.md có bảng sửa đã đếm, 10 bước và 12 prompt AI.\n\n### Nội dung và âm thanh\nSửa nhãn HTML và tracks trong assets/js/main.js đồng thời. Tên nghệ sĩ và thời lượng danh sách là hư cấu; mọi lựa chọn phát cùng assets/audio/demo.wav dài 3:09. Thay bằng bản ghi được phép dùng trước khi tạo catalog thật.\n\n### Ảnh và tương tác\nNăm WebP ở assets/img/. Giấy phép Forge zone cho dùng ảnh trong website cá nhân/khách hàng, không bán hay phân phối ảnh riêng lẻ. Yêu thích và theo dõi chỉ trong phiên. Không tài khoản hoặc streaming. Token màu/font ở đầu CSS; không cần mạng. Reveal mặc định bật và hữu hạn."
  },
  "en": {
    "intro": "A retro music interface with original artwork and a local demo player.",
    "notes": "### Start\nExtract all 12 files, open index.html and keep assets/ beside it. CUSTOMISE.md contains a counted edit map, ten steps and twelve AI prompts.\n\n### Content and audio\nEdit HTML labels and the tracks array in assets/js/main.js together. Artist names and list durations are fictional; every selection plays the same 3:09 assets/audio/demo.wav. Replace it with an authorised recording before offering a real catalogue.\n\n### Images and interaction\nFive WebP images live in assets/img/. Forge zone permits personal/client website use, prohibiting standalone image resale or redistribution. Favourites/follow last for the page session. No accounts or streaming. Colour/font tokens start the CSS; no network dependency. Finite reveals default on."
  },
  "zh": {
    "intro": "复古音乐界面，包含原创图片与本地示例播放器。",
    "notes": "### 开始\n完整解压 12 个文件，打开 index.html 并保留旁边的 assets/。CUSTOMISE.md 包含精确修改表、十个步骤与十二个 AI 提示词。\n\n### 内容与音频\n同步修改 HTML 标签与 assets/js/main.js 的 tracks。艺人和列表时长为虚构；所有选择播放同一个 3:09 assets/audio/demo.wav。发布真实目录前换成获许可录音。\n\n### 图片与交互\n五张 WebP 位于 assets/img/。Forge zone 许可用于个人与客户网站，禁止独立出售或分发图片。收藏与关注仅在当前会话有效。不含账号或流媒体。颜色与字体位于 CSS 开头；无需网络。有限渐显默认开启。"
  }
},


  laila: {
    vi: { intro: 'Portfolio developer sáng tạo hồng neon và xanh đen với một chân dung AI gốc.', notes: '### Bắt đầu\nGiải nén toàn bộ 7 file, mở index.html và giữ assets/ bên cạnh. CUSTOMISE.md có bảng sửa đã đếm, 10 bước và 12 prompt AI.\n\n### Nội dung và ảnh\nThay Laila, LAILA, email và các mục giới thiệu, lộ trình, kỹ năng, learning và concept dự án. Nội dung là minh họa, không phải chứng nhận hoặc dự án khách hàng đã xác minh. Ảnh 800×1200 nằm ở assets/img/portrait.webp, được dùng trên website hoàn chỉnh theo LICENCE.txt.\n\n### Tương tác\nLearning và dự án dùng details/summary, mở được cả khi tắt JS. View résumé dẫn tới lộ trình, không tải PDF. Email mở ứng dụng thư, không tự gửi. Menu hỗ trợ Escape và bàn phím. Reveal 620ms mặc định bật, không lặp vô hạn.\n\n### Màu và xuất bản\nToken màu/font ở :root trong assets/css/style.css. Dùng font hệ thống, không cần mạng. Cập nhật query phiên bản trên CSS/JS/ảnh khi phát hành thay đổi. Bản quyền Forge Zone; đọc giấy phép trước khi dùng.' },
    en: { intro: 'A pink and navy creative developer portfolio with one original AI portrait.', notes: '### Start\nExtract all seven files and open index.html beside assets/. CUSTOMISE.md includes a counted edit map, ten steps and twelve AI prompts.\n\n### Content and portrait\nReplace Laila, LAILA, the sample email, about, journey, skills, learning and project concepts. Content is illustrative, not verified certifications or delivered client projects. The 800×1200 portrait is assets/img/portrait.webp and may be used on finished websites under LICENCE.txt.\n\n### Interaction\nLearning and projects use native details/summary, including without JS. View résumé jumps to the journey, not a PDF. Email opens a mail app without sending. Menu supports keyboard and Escape. Finite 620ms reveals default on with no perpetual loop.\n\n### Colour and publication\nColour/font tokens start assets/css/style.css. System fonts need no network. Update the CSS/JS/image version queries when publishing changes. Copyright Forge Zone; read the licence before use.' },
    zh: { intro: '粉色与深蓝的创意开发者作品集，包含一张原创 AI 肖像。', notes: '### 开始\n完整解压七个文件，打开 index.html 并保留旁边的 assets/。CUSTOMISE.md 包含精确修改表、十个步骤与十二个 AI 提示词。\n\n### 内容与肖像\n替换 Laila、LAILA、示例邮箱、个人介绍、历程、技能、学习与项目概念。内容为示例，并非已验证证书或真实客户项目。800×1200 肖像位于 assets/img/portrait.webp，可按 LICENCE.txt 用于成品网站。\n\n### 交互\n学习与项目使用原生 details/summary，关闭 JS 仍可展开。View résumé 跳转至历程，不下载 PDF。邮件仅打开应用，不自动发送。菜单支持键盘与 Escape。620 毫秒渐显默认开启，没有无限循环。\n\n### 颜色与发布\n颜色和字体位于 assets/css/style.css 的 :root，系统字体无需联网。发布更新时同步 CSS/JS/图片的版本参数。版权归 Forge Zone，使用前请阅读许可。' },
  },


  velora: {
    vi: { intro: 'Showroom xe đạp gấp với ba mẫu xe, sáu màu khung và cấu hình riêng từng xe.', notes: '### Bắt đầu\nGiải nén đủ sáu file và mở index.html cạnh assets/. CUSTOMISE.md có edit map, 10 bước và 12 prompt AI. Không cần build hoặc mạng.\n\n### Nội dung và màu xe\nThay Velora, tên xe, giá, thông số và hello@example.com trong HTML và models của JS cùng nhau. Nội dung là demo. Sáu màu nằm trong finishes của main.js, radio Frame trong HTML và colour-swatch của CSS; sửa đồng bộ ba nơi.\n\n### Chuyển động và cấu hình\nPrevious/Next, phím và vuốt ngang đổi xe. View bike mở cùng hình xe; Back/Escape quay lại. Wheels/Frame/Saddle/Handlebar giữ lựa chọn riêng từng xe trong phiên. Motion mặc định bật, Pause chỉ tạm dừng phiên; reload bật lại.\n\n### Liên hệ và giấy phép\nEmail chứa cấu hình hiện tại nhưng không tự gửi. Không có thanh toán, tồn kho hoặc backend. SVG tự vẽ và font hệ thống; bản quyền Forge Zone, đọc LICENCE.txt trước khi sử dụng.' },
    en: { intro: 'A folding-bike showroom with three models, six frame finishes and per-bike configuration.', notes: '### Start\nExtract all six files and open index.html beside assets/. CUSTOMISE.md has the edit map, ten steps and twelve AI prompts. No build or network required.\n\n### Content and finishes\nReplace Velora, model names, prices, specifications and hello@example.com together in HTML and JS models. All content is illustrative. Finish data is in main.js finishes, HTML Frame radios and CSS colour-swatch rules; update all three together.\n\n### Motion and configuration\nPrevious/Next, arrow keys and horizontal swipe switch bikes. View bike moves the same image into details; Back/Escape returns. Wheels/Frame/Saddle/Handlebar retain separate choices per bike this visit. Motion starts on; Pause lasts this visit and reload enables it.\n\n### Contact and licence\nEnquiry opens an email client containing the configuration; it does not send automatically. No checkout, inventory or backend. Original SVG and system fonts; copyright Forge Zone. Read LICENCE.txt before use.' },
    zh: { intro: '折叠自行车展厅，包含三款车辆、六种车架配色和每辆车独立的配置。', notes: '### 开始\n完整解压六个文件，打开 index.html 并保留旁边的 assets/。CUSTOMISE.md 包含修改表、十个步骤与十二个 AI 提示词。无需构建或联网。\n\n### 内容与配色\n同时修改 HTML 与 JS models 中的 Velora、车型、价格、规格和 hello@example.com。内容均为示例。配色分别位于 main.js finishes、HTML Frame 单选框和 CSS colour-swatch；修改时同步三处。\n\n### 动画与配置\nPrevious/Next、方向键和水平滑动切换车辆。View bike 将同一图形移动到详情；Back/Escape 返回。每辆车分别保留车轮、车架、坐垫和车把配置，本次访问结束后重置。动画默认开启，Pause 仅暂停本次访问，刷新后恢复。\n\n### 联系与许可\n咨询按钮打开含当前配置的邮件应用，不会自动发送。不含支付、库存或后端。原创 SVG 与系统字体，版权归 Forge Zone。使用前请阅读 LICENCE.txt。' },
  },

  novatrend: {
    vi: { intro: 'Mẫu cửa hàng thương mại điện tử phong cách sống NovaTrend với giỏ hàng trên thiết bị, tìm kiếm, lọc danh mục và animation phong phú.', notes: '### Nội dung và ảnh\nSửa tên sản phẩm, giá bán và nhãn danh mục trong index.html. 15 ảnh WebP gốc nằm trong assets/img/ gồm hero, danh mục, sản phẩm nổi bật và banner khuyến mãi.\n\n### Giỏ hàng và animation\nGiỏ hàng lưu trên thiết bị (localStorage), hỗ trợ thêm/xóa/đổi số lượng và tính tổng tiền tự động. Tìm kiếm tức thì, lọc danh mục theo tab. Hiệu ứng cuộn scroll reveal, modal xem nhanh và drawer giỏ hàng mở trượt mượt mà.\n\n### Tuỳ chỉnh và tài liệu\nBảng màu và font chữ đặt tại :root trong assets/css/style.css. Logic giỏ hàng và dữ liệu sản phẩm trong assets/js/main.js. CUSTOMISE.md kèm 10 bước hướng dẫn và 12 prompt AI chi tiết.' },
    en: { intro: 'Modern lifestyle e-commerce storefront NovaTrend with a persistent local cart, real-time search, category filters and rich micro-interactions.', notes: '### Content and imagery\nEdit product titles, prices and category labels directly in index.html. 15 local WebP images in assets/img/ cover the hero showcase, category tiles, featured products and promotional banners.\n\n### Cart and interactions\nDevice-persistent cart (localStorage) with add, remove, quantity adjustments and live subtotal calculations. Instant product search and category filtering tabs. Scroll reveal animations, quick view modal and slide-in drawer cart are enabled by default.\n\n### Customisation and docs\nDesign tokens and typography in assets/css/style.css (:root). Cart logic and catalog definitions in assets/js/main.js. CUSTOMISE.md includes 10-step customisation guide and 12 AI prompts.' },
    zh: { intro: 'NovaTrend 现代生活方式电商商店模板，支持本地购物车、实时搜索、分类筛选及丰富动画交互。', notes: '### 内容与图片\n在 index.html 中修改商品标题、价格和分类标签。assets/img/ 包含 15 张原创 WebP 图片，涵盖首屏海报、品类卡片、热门商品和促销横幅。\n\n### 购物车与动画\n本地持久化购物车（localStorage），支持添加、移除、调整数量及实时计算小计。支持即时搜索与品类筛选。默认启用滚动渐显、快捷预览模态窗与滑动购物车抽屉。\n\n### 自定义与指南\n设计变量与字体位于 assets/css/style.css 的 :root。购物车逻辑与商品数据在 assets/js/main.js。CUSTOMISE.md 包含 10 个步骤与 12 个 AI 提示词。' },
  },
  diginest: {
    vi: { intro: 'Mẫu cửa hàng công nghệ DigiNest với giỏ hàng trên thiết bị và animation.', notes: '### Nội dung và ảnh\nSửa tên sản phẩm, giá hiển thị và data-price theo cent trong index.html. Ba ảnh WebP ở assets/img/.\n\n### Giỏ hàng và chuyển động\nTìm kiếm, lọc, tăng giảm số lượng và giỏ localStorage hoạt động. Thẻ bay, drawer và hover mặc định bật; chỉnh thời lượng trong assets/js/main.js. Checkout chỉ xem lại đơn, newsletter chưa kết nối.\n\n### Tuỳ chỉnh\nMàu/font ở assets/css/style.css; phí giao và ngưỡng miễn phí trong assets/js/main.js. CUSTOMISE.md có 10 bước, 12 prompt và edit map.' },
    en: { intro: 'The DigiNest technology storefront template with a local cart and motion.', notes: '### Content and imagery\nEdit names, visible prices and integer-cent data-price attributes in index.html. Three local WebP images are in assets/img/.\n\n### Cart and motion\nSearch, filters, quantities and localStorage cart work locally. Flying cards, drawer and hover motion start enabled; durations are in assets/js/main.js. Checkout only reviews a selection; newsletter is unconnected.\n\n### Customisation\nPalette/font are in assets/css/style.css; shipping rules in assets/js/main.js. CUSTOMISE.md includes ten steps, twelve prompts and an edit map.' },
    zh: { intro: 'DigiNest 科技商店模板，包含本地购物车和动画。', notes: '### 内容与图片\n在 index.html 同步修改商品名称、显示价格和以分计的 data-price。三张 WebP 位于 assets/img/。\n\n### 购物车与动画\n搜索、筛选、数量和 localStorage 购物车在本地运行。商品飞入、抽屉和悬浮动画默认开启，时长位于 assets/js/main.js。结算仅预览，订阅未连接。\n\n### 自定义\n颜色与字体在 assets/css/style.css，运费规则在 assets/js/main.js。CUSTOMISE.md 含10步骤、12提示词和编辑表。' },
  },
  soniq: {
    vi: { intro: 'Mẫu bán tai nghe Soniq nền pastel xanh–tím–hồng với ba màu và chuyển cảnh có hướng.', notes: '### Nội dung và ảnh\nSửa thương hiệu, ba màu, giá $149 và thông số minh họa trong index.html; đồng bộ catalogue giá theo cent trong assets/js/main.js. Ba ảnh WebP trong suốt ở assets/img/.\n\n### Tương tác\nMũi tên, thumbnail, phím trái/phải trên hero và vuốt ngang đổi màu. Hero Add to bag thêm màu đang chọn. Giỏ chỉ lưu trên thiết bị, có số lượng và tổng. Motion mặc định bật; pause chỉ cho lần mở hiện tại.\n\n### Liên hệ và hướng dẫn\nThay hello@soniq.example trong HTML và JS. Email chỉ mở thư hỏi sản phẩm; không thanh toán hay quản lý tồn kho. CUSTOMISE.md có 10 bước, 12 prompt và bảng sửa đã đếm.' },
    en: { intro: 'A pastel blue–violet–pink Soniq headphone storefront with three colourways and directional transitions.', notes: '### Content and images\nEdit the brand, three colours, $149 price and illustrative specs in index.html; synchronise integer-cent prices in the JS catalogue. Three transparent WebP images are local in assets/img/.\n\n### Interaction\nUse arrows, thumbnails, keyboard arrows on the hero or horizontal swipe. Hero Add to bag adds the selected colour. The local device bag supports quantities and totals. Motion starts enabled; pause applies to this visit only.\n\n### Contact and guide\nReplace hello@soniq.example in HTML and JS. Email opens an enquiry; no payments or inventory backend. CUSTOMISE.md includes ten steps, twelve prompts and a counted edit map.' },
    zh: { intro: '蓝紫粉渐变 Soniq 耳机店模板，三种配色与方向转场。', notes: '### 内容与图片\n在 index.html 修改品牌、配色、$149 价格和示例规格，并同步 JS 中以分为单位的价格。三张透明 WebP 位于 assets/img/。\n\n### 交互\n通过箭头、缩略图、首屏方向键或横向滑动切换。首屏购物袋按钮添加当前配色。购物袋仅保存在设备，支持数量和总价。动画默认开启，暂停只影响本次访问。\n\n### 联系与指南\n替换 HTML 和 JS 中的 hello@soniq.example。邮件用于咨询，不含支付或库存后端。CUSTOMISE.md 包含十个步骤、十二个提示词和精确修改表。' },
  },
  auralis: {
    vi: { intro: 'Mẫu giới thiệu tai nghe nền sáng tím–cyan với ảnh gốc và ba chặng animation theo cuộn.', notes: '### Nội dung và ảnh\nSửa Auralis, EvoBuds One, giá và thông số trong index.html. Ảnh gốc nằm ở assets/images/earbuds.webp, và ba ảnh còn lại cùng thư mục. Các nút tròn, phím trái/phải hoặc vuốt ngang chuyển ba mẫu tai nghe. Các thông số và giá là minh họa, cần thay bằng dữ liệu thật.\n\n### Hiệu ứng và liên hệ\nMàu ở :root trong assets/css/style.css. assets/js/main.js điều khiển menu, reveal và story ghim. Hero giữ cùng khung khi chuyển từ chi tiết sang hộp sạc rồi AirBuds. Nút Enable transitions/Pause transitions luôn hiện và nhớ lựa chọn trên trình duyệt. Khi giảm chuyển động, bấm Enable transitions để bật. Tắt JS sẽ hiện toàn bộ nội dung. Thay hello@auralis.example; CTA email không đặt hàng hay thanh toán.\n\n### Hướng dẫn\nCUSTOMISE.md có bảng sửa đã đếm, 10 bước và 12 prompt AI.' },
    en: { intro: 'A light violet–cyan earbud showcase with original art and a three-chapter scroll story.', notes: '### Content and image\nEdit Auralis, EvoBuds One, pricing and specs in index.html. assets/images/earbuds.webp is bundled with three other images in the same folder. Circular buttons, arrow keys or horizontal swipe switch the three models. All hardware claims and prices are illustrative.\n\n### Motion and contact\nColours are in CSS :root. main.js controls menu, reveal and pinning. The pinned hero moves continuously from details to the charging kit and AirBuds. Reduced motion defaults to static. The visible Enable transitions/Pause transitions control remembers your choice in this browser. No JS shows the full story. Replace hello@auralis.example; email does not order or charge.\n\n### Guide\nCUSTOMISE.md includes the counted edit map, ten steps and twelve AI prompts.' },
    zh: { intro: '浅紫青色耳机展示模板，采用原创产品图与三段滚动动画。', notes: '### 内容与图片\n在 index.html 修改 Auralis、EvoBuds One、价格与规格。assets/images/earbuds.webp 与另外三张图片位于同一文件夹。圆形按钮、方向键或横向滑动切换三个型号。价格和硬件参数均为示例。\n\n### 动画与联系\n颜色位于 CSS :root。main.js 控制菜单、渐显和固定滚动叙事。固定首屏连续切换详情、充电盒与 AirBuds 场景。减少动态默认静态，始终显示 Enable transitions/Pause transitions 按钮并保存浏览器中的选择。关闭 JS 将显示全部内容。替换 hello@auralis.example；邮件不下单或收费。\n\n### 指南\nCUSTOMISE.md 包含精确修改表、10 个步骤与 12 个 AI 提示词。' },
  },
  'japan-trails': {
    vi: { intro: 'Mẫu du lịch Nhật Bản phong cách điện ảnh với ảnh Phú Sĩ, phố Kyoto và thẻ kính mờ.', notes: '### Nội dung và ảnh\nSửa tên Japan Trails, hành trình và email trong index.html. Hai ảnh gốc nằm ở assets/img/fuji.webp và kyoto.webp. Màu và font nằm trong :root ở assets/css/style.css.\n\n### Liên hệ\nThay mọi hello@example.com. CTA mở email, không phải hệ thống đặt tour hay thanh toán. CUSTOMISE.md có hướng dẫn đầy đủ.' },
    en: { intro: 'A cinematic Japan travel template with Fuji and Kyoto photography and frosted-glass cards.', notes: '### Content and images\nEdit Japan Trails, journeys and email links in index.html. Local artwork is in assets/img/fuji.webp and kyoto.webp. Colour and type tokens are in :root in assets/css/style.css.\n\n### Contact\nReplace every hello@example.com. Links open email, not a booking or payment system. See CUSTOMISE.md for complete instructions.' },
    zh: { intro: '电影感日本旅行模板，采用富士山和京都图片及磨砂玻璃卡片。', notes: '### 内容与图片\n在 index.html 修改品牌、行程及邮箱。图片位于 assets/img/fuji.webp 和 kyoto.webp，颜色和字体位于 CSS 的 :root。\n\n### 联系\n替换 hello@example.com。按钮打开邮件，不包含预订或支付系统。完整说明见 CUSTOMISE.md。' },
  },
  solenne: {
    vi: { intro: 'Mẫu studio chăm sóc da tông lilac, chữ serif mềm và minh họa botanical tự tạo.', notes: '### Nội dung và dịch vụ\nTìm Solenne và solenne trong index.html; thay cả metadata, tên đọc của logo và footer. Sửa The Reset, The Restore, The Conversation cùng thời lượng và nhãn hỏi lịch tương ứng.\n\n### Liên hệ và hình minh họa\nThay hello@example.com ở mọi nơi. Nút email không tự đặt lịch. Màu ở :root của assets/css/style.css; SVG hero dùng class ritual-art.\n\n### Hướng dẫn đầy đủ\nCUSTOMISE.md trong gói tải có bảng tìm chuỗi đã đếm, 10 bước và 12 prompt AI cho riêng Solenne.' },
    en: { intro: 'A lilac skin-studio template with soft serif type and original botanical SVG artwork.', notes: '### Brand and rituals\nSearch Solenne and solenne in index.html. Update metadata, the accessible logo name and footer. Replace The Reset, The Restore and The Conversation together with their durations and enquiry labels.\n\n### Contact and artwork\nReplace every hello@example.com. Email links do not book an appointment. Colours are in :root in assets/css/style.css; the hero SVG uses ritual-art.\n\n### Complete instructions\nThe downloaded CUSTOMISE.md includes a counted edit map, ten steps and twelve Solenne-specific AI prompts.' },
    zh: { intro: '淡紫色护肤工作室模板，采用柔和衬线字与原创植物 SVG 插画。', notes: '### 品牌与服务\n在 index.html 中搜索 Solenne 和 solenne，修改元数据、Logo 无障碍名称和页脚。同步替换三项服务、时长和咨询标签。\n\n### 联系方式与插画\n替换全部 hello@example.com。邮件链接不会自动预约。颜色位于 assets/css/style.css 的 :root，主视觉 SVG 使用 ritual-art。\n\n### 完整说明\n下载包中的 CUSTOMISE.md 包含精确搜索表、10 个步骤和 12 个专用 AI 提示词。' },
  },
  aeris: {
    vi: { intro: 'Mẫu quảng bá tai nghe chụp tai nền pastel xanh–hồng, slider ba màu tự chuyển và chương âm thanh ghim theo cuộn.', notes: '### Nội dung và ảnh\nSửa Aeris, Aeris One, ba tên màu, giá $179 và thông số trong index.html. Ảnh nằm ở assets/images/: aeris-pearl.webp, aeris-midnight.webp, aeris-blush.webp và aeris-detail.webp, nền trắng để hoà vào nền pastel. Giá và thông số là minh họa, cần thay bằng dữ liệu thật.\n\n### Slider và hiệu ứng\nSlider tự đổi màu mỗi 6 giây (AUTO_MS trong assets/js/main.js); nút Tạm dừng/Phát nằm cạnh thanh tiến trình. Nút mũi tên, phím trái/phải hoặc vuốt ngang cũng đổi màu. Khi bật giảm chuyển động, slider mặc định đứng yên. Màu ở :root trong assets/css/style.css. Tắt JS vẫn hiện toàn bộ nội dung.\n\n### Liên hệ và hướng dẫn\nThay hello@aeris.example; CTA email không đặt hàng hay thanh toán. CUSTOMISE.md có bảng sửa đã đếm, 10 bước và 12 prompt AI.' },
    en: { intro: 'A pastel blue–pink over-ear headphone showcase with a self-advancing three-colour slider and a pinned scroll sound story.', notes: '### Content and images\nEdit Aeris, Aeris One, the three colour names, the $179 price and specs in index.html. Images are in assets/images/: aeris-pearl.webp, aeris-midnight.webp, aeris-blush.webp and aeris-detail.webp, shot on white so they blend into the pastel background. Prices and specs are illustrative.\n\n### Slider and motion\nThe slider changes colour every 6 seconds (AUTO_MS in assets/js/main.js); the Pause/Play button sits next to the progress bars. Arrow buttons, left/right keys or a horizontal swipe also switch colours. With reduced motion the slider starts paused. Colours are in :root in assets/css/style.css. With JS off, all content stays visible.\n\n### Contact and guide\nReplace hello@aeris.example; email does not order or charge. CUSTOMISE.md includes the counted edit map, ten steps and twelve AI prompts.' },
    zh: { intro: '粉蓝渐变头戴式耳机展示模板，三种配色自动轮播，并有随滚动固定的声音章节。', notes: '### 内容与图片\n在 index.html 修改 Aeris、Aeris One、三个配色名称、$179 价格与规格。图片位于 assets/images/：aeris-pearl.webp、aeris-midnight.webp、aeris-blush.webp 与 aeris-detail.webp，白底拍摄以融入粉彩背景。价格和规格均为示例。\n\n### 轮播与动画\n轮播每 6 秒切换一次配色（assets/js/main.js 中的 AUTO_MS），暂停/播放按钮位于进度条旁。箭头按钮、左右方向键或横向滑动也可切换。开启减少动态时轮播默认暂停。颜色位于 assets/css/style.css 的 :root。关闭 JS 仍显示全部内容。\n\n### 联系与指南\n替换 hello@aeris.example；邮件不下单或收费。CUSTOMISE.md 包含精确修改表、10 个步骤与 12 个 AI 提示词。' },
  },
  vybe: {
    vi: { intro: 'Mẫu bán áo streetwear coral với năm ảnh người mẫu và chuyển cảnh Morge.', notes: '### Sản phẩm và ảnh\nSửa index.html và mảng products trong assets/js/main.js đồng thời. Năm ảnh WebP ở assets/img/.\n\n### Tương tác\nMũi tên, nút chọn mẫu và vuốt ngang đổi sản phẩm. Giỏ hàng chỉ lưu trên thiết bị; không thanh toán hoặc quản lý tồn kho. Thay hello@example.com. CUSTOMISE.md có 10 bước và 12 prompt.' },
    en: { intro: 'A coral streetwear store with five model images and directional Morge transitions.', notes: '### Products and artwork\nUpdate index.html and the products array in assets/js/main.js together. Five local WebP cutouts live in assets/img/.\n\n### Interaction\nArrows, product picks and horizontal swipes switch products. The bag is local to this device; no payments or inventory backend. Replace hello@example.com. CUSTOMISE.md includes ten steps and twelve prompts.' },
    zh: { intro: '珊瑚色街头服饰模板，包含五张模特图片与 Morge 转场。', notes: '### 产品和图片\n同步修改 index.html 与 assets/js/main.js 的 products。五张 WebP 位于 assets/img/。\n\n### 交互\n箭头、产品按钮与横向滑动切换产品。购物袋仅保存在本设备，不含支付或库存。替换 hello@example.com。CUSTOMISE.md 含十个步骤与十二个提示词。' },
  },
  'astra-interior': {
    vi: { intro: 'Mellow Coffee thay Astra Interior: giao diện cà phê, matcha và bánh với hero chuyển cảnh và giỏ món trên thiết bị.', notes: '### Nội dung và ảnh\nSửa Mellow Coffee, tên món và giá trong index.html; đồng bộ catalogue giá theo cent trong assets/js/main.js. Ba ảnh WebP có nền trong suốt ở assets/img/.\n\n### Chuyển cảnh và giỏ\nNút số, mũi tên, phím trái/phải khi focus hero hoặc vuốt ngang đổi cảnh. Chuyển động mặc định bật; Pause motion tạm dừng trong lần mở hiện tại. Giỏ lưu tại thiết bị, có số lượng và tổng. Thay hello@mellow.example trong HTML và JS; email chỉ mở thư hỏi món, không thanh toán hoặc gửi đơn tự động.\n\n### Hướng dẫn\nCUSTOMISE.md có 10 bước, 12 prompt và bảng sửa đã đếm.' },
    en: { intro: 'Mellow Coffee replaces Astra Interior with a café, matcha and bakery storefront, directional hero and local device bag.', notes: '### Content and images\nEdit brand, menu and visible prices in index.html; synchronise integer-cent prices in the JS catalogue. Three transparent WebP assets live in assets/img/.\n\n### Motion and bag\nUse numbered controls, arrows, keyboard arrows on the focused hero or swipe. Motion starts enabled; Pause motion applies to this visit only. Bag quantities and totals stay on this device. Replace hello@mellow.example in HTML and JS. Email opens an enquiry, not payment or automatic order submission.\n\n### Guide\nCUSTOMISE.md contains ten steps, twelve prompts and a counted edit map.' },
    zh: { intro: 'Mellow Coffee 替换 Astra Interior，提供咖啡、抹茶和烘焙店界面、方向转场与本地购物袋。', notes: '### 内容与图片\n在 index.html 修改品牌、菜单和价格，并同步 JS 中以分为单位的价格。三张透明 WebP 图片位于 assets/img/。\n\n### 动画与购物袋\n使用编号、箭头、聚焦首屏后的方向键或滑动切换。动画默认开启，暂停仅限当前访问。购物袋保存在当前设备。替换 HTML 和 JS 中的 hello@mellow.example，邮件仅用于咨询，不含支付或自动下单。\n\n### 指南\nCUSTOMISE.md 包含 10 个步骤、12 个提示词和精确修改表。' },
  },
  kinetiq: {
    vi: {
      intro: 'Mẫu dành cho kỹ thuật và sản xuất, với tiêu đề lớn, dải chữ chạy và lưới sản phẩm.',
      notes: `### Thay thông tin thương hiệu
Mở index.html. Tìm tên đầy đủ \`Kinetiq Systems GmbH\` trước, rồi tìm \`Kinetiq\`. Thay cả tên trên tab trình duyệt, phần đầu trang và footer. Kiểm tra lại \`Bremen, Germany\` và \`hello@example.com\`.

### Tiêu đề và dải chữ chạy
Tiêu đề nằm trong các phần tử \`hero__line\`. Giữ câu ngắn để vừa màn hình nhỏ. Dải chữ chạy lặp nội dung bốn lần; hãy sửa cả bốn bản để không bị giật khi lặp.

### Thẻ sản phẩm và số liệu
Tìm \`card__title\`, \`card__text\` và \`stat__num\`. Thay dịch vụ và số liệu bằng thông tin thật. Muốn bớt một thẻ, bỏ cả khối li của thẻ đó; đừng chỉ xoá chữ bên trong.

### Màu, font và minh hoạ
Màu đặt tại \`:root\` trong assets/css/style.css. Kiểm tra riêng màu nền nút và màu chữ nhấn sau khi đổi. Font hiện tại là Archivo và Archivo Black. Hình cơ khí là SVG có class \`assembly\`; nếu thay ảnh, giữ khung bên ngoài và xem lại trên điện thoại.

### Liên hệ
Thay các liên kết \`mailto:hello@example.com\` bằng email hoặc URL liên hệ của bạn. Nút mở email không tự gửi thư.`,
    },
    en: {
      intro: 'An engineering and manufacturing template with oversized headlines, a moving text strip, and a product grid.',
      notes: `### Replace the brand details
Open index.html. Search for the full name \`Kinetiq Systems GmbH\` first, then search for \`Kinetiq\`. Replace the browser title, header, and footer. Also review \`Bremen, Germany\` and \`hello@example.com\`.

### Headline and moving text strip
The main headline uses elements with the \`hero__line\` class. Keep each line short enough for small screens. The moving strip repeats its content four times; update all four copies so the loop remains smooth.

### Product cards and statistics
Search for \`card__title\`, \`card__text\`, and \`stat__num\`. Use real services and verified figures. To remove a card, remove its complete li block instead of deleting only the text.

### Colours, fonts, and illustration
Colours are defined in \`:root\` inside assets/css/style.css. After changing them, check button backgrounds and accent text separately. The current fonts are Archivo and Archivo Black. The mechanical SVG uses the \`assembly\` class; if you replace it with an image, keep the outer container and test it on mobile.

### Contact links
Replace every \`mailto:hello@example.com\` link with your real email address or contact URL. An email link opens the visitor's email app; it does not send a message automatically.`,
    },
    zh: {
      intro: '面向工程与制造企业的模板，采用超大标题、滚动文字条和产品网格。',
      notes: `### 替换品牌信息
打开 index.html。先搜索完整名称 \`Kinetiq Systems GmbH\`，再搜索 \`Kinetiq\`。替换浏览器标题、页头和页脚中的名称，并检查 \`Bremen, Germany\` 与 \`hello@example.com\`。

### 标题与滚动文字条
主标题位于带有 \`hero__line\` class 的元素中。保持句子简短，以便适应小屏幕。滚动文字条重复四次相同内容；请修改全部四份，以保持循环流畅。

### 产品卡片与数据
搜索 \`card__title\`、\`card__text\` 和 \`stat__num\`。使用真实服务与经过确认的数据。需要删除卡片时，请删除完整的 li 区块，不要只清空文字。

### 颜色、字体与插图
颜色定义在 assets/css/style.css 的 \`:root\` 中。修改后分别检查按钮背景和强调文字。当前字体为 Archivo 和 Archivo Black。机械 SVG 使用 \`assembly\` class；如果换成图片，请保留外层容器并测试手机视图。

### 联系链接
将所有 \`mailto:hello@example.com\` 替换为真实邮箱或联系网址。邮件链接只会打开访客的邮件应用，不会自动发送邮件。`,
    },
  },
  tidal: {
    vi: {
      intro: 'Mẫu nền tối cho dự án nghiên cứu và tổ chức phi lợi nhuận, với minh hoạ rùa và các khối chương trình.',
      notes: `### Thay thông tin thương hiệu
Mở index.html. Tìm \`Tidal Reef Trust\` trước, rồi tìm \`Tidal\`. Kiểm tra logo ở đầu và cuối trang, metadata và \`hello@example.com\`.

### Điền hai thông tin còn trống
Tìm \`[YOUR PRICE]\` để thay mức tài trợ và \`[YOUR NUMBER]\` để thay mã đăng ký phù hợp. Nếu không có thông tin thật, bỏ phần đó thay vì tạo số giả.

### Tiêu đề, chương trình và tác động
Tiêu đề nằm trong \`hero__title\`; đoạn có \`grad-text\` dùng màu chuyển sắc. Các số liệu chương trình ở \`programme__stat\`. Thay bằng số liệu được xác nhận hoặc nội dung mô tả không dùng số.

### Màu, font và hình rùa
Tại \`:root\`, màu chính là \`--cyan\`, \`--violet\` và \`--deep\`. Đổi từng màu rồi kiểm tra chữ trên nền tối và nút. Font hiện tại là Space Grotesk và Manrope. SVG hình rùa có class \`turtle\`; giữ \`hero__figure\` nếu thay bằng ảnh để không làm hỏng vị trí thẻ nổi.

### Hiệu ứng và nút tài trợ
Không thêm quá nhiều khối kính mờ vì có thể làm cuộn chậm. Nút tài trợ cần liên kết thật của bạn; mẫu không tự xử lý quyên góp hay thanh toán.`,
    },
    en: {
      intro: 'A dark research and nonprofit template with a turtle illustration and programme sections.',
      notes: `### Replace the brand details
Open index.html. Search for \`Tidal Reef Trust\` first, then search for \`Tidal\`. Review the logo in the header and footer, the metadata, and \`hello@example.com\`.

### Complete the two placeholders
Search for \`[YOUR PRICE]\` and replace it with a verified donation amount. Replace \`[YOUR NUMBER]\` with the correct registration number. If you do not have verified information, remove the item instead of inventing a value.

### Headline, programmes, and impact
The main headline is in \`hero__title\`; the text with \`grad-text\` uses the gradient. Programme figures use \`programme__stat\`. Replace them with verified data or descriptive copy that does not rely on a number.

### Colours, fonts, and turtle
In \`:root\`, the main colours are \`--cyan\`, \`--violet\`, and \`--deep\`. Change one at a time and check text on dark backgrounds and buttons. The current fonts are Space Grotesk and Manrope. The turtle SVG uses the \`turtle\` class; keep \`hero__figure\` when replacing it so the floating cards keep their position.

### Effects and donation button
Avoid adding many glass effects because they may slow scrolling. Connect the donation button to your real donation page. The template does not process donations or payments by itself.`,
    },
    zh: {
      intro: '适合研究项目和非营利组织的深色模板，带有海龟插图和项目区块。',
      notes: `### 替换品牌信息
打开 index.html。先搜索 \`Tidal Reef Trust\`，再搜索 \`Tidal\`。检查页头和页脚中的 Logo、元数据，以及 \`hello@example.com\`。

### 填写两个占位内容
搜索 \`[YOUR PRICE]\`，替换为经过确认的捐赠金额；将 \`[YOUR NUMBER]\` 替换为正确的注册编号。如果没有真实信息，请删除该项，不要编造数值。

### 标题、项目与影响力
主标题位于 \`hero__title\`；带有 \`grad-text\` 的文字使用渐变色。项目数据使用 \`programme__stat\`。请替换为已确认的数据，或改成不依赖数字的描述。

### 颜色、字体与海龟插图
在 \`:root\` 中，主要颜色是 \`--cyan\`、\`--violet\` 和 \`--deep\`。每次修改一种颜色，并检查深色背景上的文字和按钮。当前字体为 Space Grotesk 和 Manrope。海龟 SVG 使用 \`turtle\` class；替换图片时保留 \`hero__figure\`，避免浮动卡片错位。

### 效果与捐赠按钮
不要加入过多玻璃效果，以免滚动变慢。捐赠按钮必须连接到真实捐赠页面；模板本身不会处理捐赠或付款。`,
    },
  },
  keystead: {
    vi: {
      intro: 'Mẫu cho thuê nhà và căn hộ với hero ảnh phố, thanh duyệt nhanh, sáu tin nhà có ảnh và CTA đặt lịch xem qua email.',
      notes: `### Thương hiệu và khu vực
Mở index.html. Tìm \`Keystead\` và \`Northbank\`; thay cả metadata, logo, các khu vực và footer. Địa chỉ \`14 Quay Street\` và giờ mở cửa là dữ liệu mẫu.

### Tin nhà
Mỗi tin nằm trong khối \`article\` có class \`listing\`: ảnh, tên, giá thuê, thông số, ngày trống và link email. Thay bằng nhà thật và ảnh thật; khi thêm/bớt tin, sửa luôn số đếm ở thanh duyệt, dòng hero và các khu vực.

### Thanh duyệt không phải tìm kiếm
Thanh dưới hero chỉ gồm liên kết tới các mục trên trang. Mẫu không có bộ lọc, cơ sở dữ liệu hay lịch đặt xem. Muốn tìm kiếm thật, cần lập trình viên tích hợp vào bản của bạn.

### Màu, font và ảnh
Màu nằm tại \`:root\` trong assets/css/style.css (\`--ink\`, \`--accent\`, \`--bg\`). Font là Plus Jakarta Sans. Bảy ảnh WebP trong assets/img là ảnh AI minh hoạ; giữ lớp phủ tối trên hero để chữ trắng dễ đọc. CUSTOMISE.md có bảng sửa đã đếm, 10 bước và 12 prompt.`,
    },
    en: {
      intro: 'A homes and rentals template with a street-photo hero, a quick browse bar, six photo listings and an email viewing CTA.',
      notes: `### Brand and neighbourhoods
Open index.html. Search for \`Keystead\` and \`Northbank\`, and update metadata, the logo, neighbourhoods and footer. The \`14 Quay Street\` address and opening hours are sample content.

### Listings
Each home is an \`article\` with the \`listing\` class: photo, name, rent, details, availability and an email link. Use real homes and real photos; when you add or remove one, update the counts in the browse bar, hero pill and neighbourhood cards.

### The browse bar is not a search
The bar under the hero only links to sections on the page. The template has no filters, listings database or viewing calendar. A real search has to be added to your copy by a developer.

### Colours, font and photos
Colours are in \`:root\` in assets/css/style.css (\`--ink\`, \`--accent\`, \`--bg\`). The font is Plus Jakarta Sans. The seven WebP photos in assets/img are AI-generated illustrations; keep the dark overlay on the hero so the white text stays readable. CUSTOMISE.md has the counted edit map, ten steps and twelve prompts.`,
    },
    zh: {
      intro: '房屋与公寓租赁模板，包含街景首屏、快速浏览栏、六个带照片的房源和邮件预约看房入口。',
      notes: `### 品牌与街区
打开 index.html，搜索 \`Keystead\` 和 \`Northbank\`，修改元数据、Logo、街区和页脚。\`14 Quay Street\` 地址和营业时间是示例内容。

### 房源
每个房源是带 \`listing\` class 的 \`article\` 区块：照片、名称、租金、参数、可入住日期和邮件链接。请换成真实房源和真实照片；增删房源时同步修改浏览栏、首屏标签和街区卡片中的数量。

### 浏览栏不是搜索
首屏下方的浏览栏只是页面内各版块的链接。模板不含筛选、房源数据库或看房日历。如需真实搜索，需要开发者在你的副本中集成。

### 颜色、字体与照片
颜色位于 assets/css/style.css 的 \`:root\`（\`--ink\`、\`--accent\`、\`--bg\`）。字体为 Plus Jakarta Sans。assets/img 中的七张 WebP 是 AI 生成的示意图；请保留首屏深色遮罩，让白色文字清晰可读。CUSTOMISE.md 提供精确搜索表、10 个步骤和 12 个提示词。`,
    },
  },
};

// Current COD setup for the ten authorised physical-goods templates.
const COD_GUIDES: Record<LangCode, string> = {
  vi: '### Bắt đầu\nGiải nén toàn bộ ZIP, giữ assets/ cạnh index.html rồi mở trang. README.md và CUSTOMISE.md có hướng dẫn đổi thương hiệu, ảnh, sản phẩm, 10 bước và 12 prompt AI. Không cần build.\n\n### Nhận đơn COD\nMở assets/js/shop-config.js. Điền tên shop, phí giao hàng và orderEndpoint từ dịch vụ nhận đơn do anh sở hữu. CUSTOMISE.md → COD setup có từng bước với Formspree và cách kiểm tra hộp nhận đơn. Khi endpoint còn trống, checkout chỉ xem trước, không gửi đơn; giỏ vẫn giữ nguyên. Khi kết nối, chỉ xóa giỏ sau khi dịch vụ xác nhận nhận đơn. Shop cần kiểm tra tồn kho và xác nhận giao hàng.\n\n### Sản phẩm và USD\nGiá hàng mẫu khác giá mua template $20. Storefront dùng catalog hiện có trong HTML/main.js; showroom dùng products trong shop-config.js. Giá checkout và phí giao hàng tính bằng cent USD: 3800 = $38. Giữ giá hiển thị và catalog đồng bộ.\n\n### Thanh toán online\nDùng tài khoản cổng thanh toán riêng và server riêng để xác thực giá, tạo checkout và kiểm tra webhook. Hướng dẫn và hợp đồng JSON nằm trong CUSTOMISE.md. Không đặt khóa bí mật vào JavaScript; không kèm tài khoản thanh toán hoặc hệ thống tồn kho.',
  en: '### Start\nExtract the whole ZIP and keep assets/ beside index.html. README.md and CUSTOMISE.md explain branding, imagery, products, ten steps and twelve AI prompts. No build is needed.\n\n### Accept COD orders\nOpen assets/js/shop-config.js. Set your shop name, delivery fees and orderEndpoint from your own order service. CUSTOMISE.md → COD setup includes the Formspree walkthrough and inbox test. With an empty endpoint, checkout only previews orders and retains the bag. With a connection, the bag clears only after the service acknowledges receipt. Confirm stock and delivery manually.\n\n### Products and USD\nSample goods prices are separate from the $20 template download price. Storefronts use their existing HTML/main.js catalogue; showrooms use products in shop-config.js. Checkout and delivery amounts use integer USD cents: 3800 = $38. Keep displayed prices and the catalogue in sync.\n\n### Online payment\nConnect your own gateway account through your own server, which validates prices, creates checkout and verifies signed webhooks. CUSTOMISE.md contains the guide and JSON contract. Never place secret keys in browser JavaScript. No gateway account or inventory backend is bundled.',
  zh: '### 开始\n解压整个 ZIP，保持 assets/ 与 index.html 相邻。README.md 和 CUSTOMISE.md 包含品牌、图片、产品、十个步骤和十二条 AI 提示词。无需构建。\n\n### 接收 COD 订单\n打开 assets/js/shop-config.js，填写店名、配送费及自有订单服务的 orderEndpoint。CUSTOMISE.md 的 COD setup 章节包含 Formspree 配置与收件测试。地址为空时仅预览，不发送订单且保留购物袋。连接后，仅在服务确认收到订单时清空购物袋。店主需确认库存与配送。\n\n### 产品与美元\n示例商品价格与 $20 模板售价独立。商店沿用 HTML/main.js 商品目录；展示模板使用 shop-config.js 的 products。结账金额以美元分为单位：3800 = $38。同步展示价格与商品目录。\n\n### 在线支付\n使用自有支付账户和服务器，验证价格、创建结账并核验签名 webhook。CUSTOMISE.md 包含接入指南和 JSON 协议。浏览器 JavaScript 中不可放密钥；不附支付账户或库存后台。'
};
for (const slug of ['shirtline','novatrend','diginest','soniq','astra-interior','vybe','solenne','auralis','aeris','watchroom','velora']) {
  TEMPLATE_GUIDES[slug] ??= {
    vi: { intro: 'Giao diện thương mại với giỏ và COD sau cấu hình.', notes: '' },
    en: { intro: 'A commerce template with a bag and configurable COD checkout.', notes: '' },
    zh: { intro: '带购物袋与可配置 COD 的商店模板。', notes: '' }
  };
  for (const lang of ['vi','en','zh'] as const) {
    TEMPLATE_GUIDES[slug][lang].notes = COD_GUIDES[lang];
  }
}
