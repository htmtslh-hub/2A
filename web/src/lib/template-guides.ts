import type { LangCode } from '@/generated/data';

type TemplateGuide = { intro: string; notes: string };

export const TEMPLATE_GUIDES: Record<string, Record<LangCode, TemplateGuide>> = {
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
    vi: { intro: 'Portfolio điện ảnh cho studio nội thất, dùng 24 frame theo cuộn với nội dung HTML phủ theo từng chương.', notes: '### Thương hiệu và dự án\nTìm Astra Atelier trong index.html; thay metadata, tên đọc logo và footer. Casa Lume, Rua Nova và Maré House là dự án giả định. Thay tên, địa điểm, năm và nhãn canvas bằng dữ liệu có quyền công bố.\n\n### Chuỗi 24 frame và liên hệ\nSprite 6×4 được nhúng trong #sequence-source; không cắt hoặc format riêng đoạn base64. data-stage điều khiển bốn chương và data-still chọn ba ảnh dự án. Thay mọi hello@astraatelier.example. CTA email không gửi form tự động.\n\n### Hướng dẫn đầy đủ\nCUSTOMISE.md có bảng chuỗi đã đếm, 10 bước, 12 prompt AI và quy trình thay sequence an toàn cho Astra Interior.' },
    en: { intro: 'A cinematic interior-studio portfolio with 24 scroll-controlled frames and staged live HTML copy.', notes: '### Brand and projects\nSearch Astra Atelier in index.html and update metadata, accessible logo names and footer. Casa Lume, Rua Nova and Maré House are fictional. Replace their names, locations, years and canvas labels with work you may publish.\n\n### 24-frame sequence and contact\nThe 6×4 sprite is embedded in #sequence-source. Do not truncate or reformat its base64 value. data-stage controls four copy chapters and data-still selects three project views. Replace every hello@astraatelier.example. Email CTAs do not submit a form.\n\n### Complete instructions\nCUSTOMISE.md includes a counted edit map, ten steps, twelve AI prompts and the safe sequence-replacement workflow for Astra Interior.' },
    zh: { intro: '面向室内设计工作室的电影感作品集，以 24 帧滚动序列配合分段 HTML 文案。', notes: '### 品牌与项目\n在 index.html 中搜索 Astra Atelier，更新元数据、Logo 无障碍名称和页脚。Casa Lume、Rua Nova 与 Maré House 均为虚构项目，请换成有权发布的名称、地点、年份和画布标签。\n\n### 24 帧序列与联系\n6×4 精灵图嵌入在 #sequence-source 中，请勿截断或重新格式化 base64 数据。data-stage 控制四段文案，data-still 选择三张项目画面。替换全部 hello@astraatelier.example。邮件入口不会自动提交表单。\n\n### 完整说明\nCUSTOMISE.md 提供精确搜索表、10 个步骤、12 个 AI 提示词及安全替换序列的流程。' },
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
