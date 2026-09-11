/* Nội dung trang case study (/du-an).
   Khách hỏi mua dịch vụ cần bằng chứng năng lực, mà bằng chứng mạnh nhất
   đang có lại là chính website này: nó tự nhận tiền của khách trong nước lẫn
   nước ngoài rồi tự giao hàng, không cần người trực.

   Hiện chỉ có một dự án nên đây là một trang đơn. Khi có dự án thứ hai thì
   tách thành /du-an (danh sách) + /du-an/<slug>.

   LƯU Ý VỀ TÍNH CHÍNH XÁC: mọi con số và khẳng định dưới đây phải đúng với
   thứ đang chạy thật. Chỗ nào chưa kiểm chứng được thì nói rõ là chưa, đừng
   viết cho kêu. Khách thuê dịch vụ kỹ thuật sẽ kiểm tra. */
import type { LangCode } from '@/generated/data';

export const CASE_PATH = '/du-an';

export interface CaseBlock {
  h: string;
  p?: string[];
  /** Danh sách gạch đầu dòng, dùng cho phần liệt kê hạng mục. */
  list?: string[];
}

export interface CaseDoc {
  navLabel: string;
  title: string;
  intro: string;
  /** Vài con số đặt ngay đầu trang cho dễ quét. */
  facts: { k: string; v: string }[];
  blocks: CaseBlock[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
}

export const CASE_STUDY: Record<LangCode, CaseDoc> = {
  vi: {
    navLabel: 'Dự án đã làm',
    title: 'Chính website này',
    intro:
      'Trang bạn đang xem là một cửa hàng hoàn chỉnh: khách tạo tài khoản, trả tiền bằng thẻ quốc tế hoặc chuyển khoản trong nước, rồi nhận link tải qua email — không có bước nào cần người xử lý tay.',
    facts: [
      { k: 'Ngôn ngữ', v: '3' },
      { k: 'Cổng thanh toán', v: '2' },
      { k: 'Giao hàng', v: 'Tự động' },
      { k: 'Nền tảng', v: 'Next.js' },
    ],
    blocks: [
      {
        h: 'Bắt đầu từ đâu',
        p: [
          'Điểm xuất phát là một bản thiết kế giao diện: bố cục, chuyển động, màu sắc, nội dung ba ngôn ngữ. Không có backend, không có cơ sở dữ liệu, các nút bấm chỉ chuyển tab.',
          'Việc phải làm là biến bản thiết kế đó thành một cửa hàng chạy thật mà không để giao diện xô lệch đi chỗ nào.',
        ],
      },
      {
        h: 'Cách giữ nguyên bản thiết kế',
        p: [
          'Giao diện không được chép tay sang mã nguồn. Thay vào đó là một bộ chuyển đổi tự động đọc file thiết kế rồi sinh ra mã: vòng lặp, điều kiện, hiệu ứng di chuột đều được dịch máy móc.',
          'Mọi chỗ cần nối vào chức năng thật đều khai báo rõ ràng và bắt buộc phải khớp — thiết kế đổi mà chỗ nối không còn thì bộ chuyển đổi dừng lại và báo, thay vì âm thầm làm mất một nút mua hàng.',
        ],
      },
      {
        h: 'Thanh toán',
        list: [
          'Khách Việt Nam trả bằng chuyển khoản và VietQR qua PayOS.',
          'Khách nước ngoài trả bằng thẻ qua Paddle, đơn vị đứng tên bán hàng nên tự lo thuế VAT từng nước.',
          'Chọn cổng theo ngôn ngữ khách đang xem, không bắt khách tự chọn.',
          'Webhook đối chiếu số tiền thực nhận với số tiền của đơn trước khi mở quyền tải — lệch một xu là không giao.',
          'Chống phát lại: mỗi thông báo thanh toán chỉ được xử lý một lần, kiểm chữ ký và giới hạn thời gian.',
        ],
      },
      {
        h: 'Phần còn lại',
        list: [
          'Tài khoản: đăng ký, đăng nhập, quên mật khẩu. Mật khẩu lưu dạng băm, link đặt lại chỉ lưu bản băm và có hạn dùng.',
          'Giao hàng: mở quyền tải trong tài khoản và gửi link qua email ngay khi nhận được xác nhận thanh toán.',
          'Ba ngôn ngữ Việt, Anh, Trung — dựng sẵn đúng ngôn ngữ ngay từ HTML đầu tiên, không chớp một nhịp rồi mới đổi.',
          'Bộ trang pháp lý đầy đủ: điều khoản, bảo mật, hoàn tiền, giấy phép sử dụng.',
          'SEO: sitemap, robots, ảnh hiển thị khi chia sẻ link.',
        ],
      },
      {
        h: 'Những chỗ đáng kể lại',
        p: [
          '<b>Đối chiếu tiền với Paddle.</b> Cách đọc số tiền đầu tiên chạy trơn tru mà vẫn sai: nó lấy tổng đã gồm thuế, trong khi đơn hàng lưu giá chưa thuế. Không có lỗi nào hiện ra — chỉ là mọi đơn quốc tế sẽ bị đánh dấu thất bại, khách trả tiền mà không nhận được hàng. Phải đối chiếu với một giao dịch thật mới tìm ra.',
          '<b>Ảnh nền tải hai lần.</b> Video nền và video trong thẻ dùng chung một file nhưng là hai thẻ riêng, nên trình duyệt tải cùng một thứ hai lượt. Nửa dung lượng trang chủ là bản sao thừa.',
          '<b>Khung hình trên điện thoại.</b> Màn hình dọc cắt video ngang còn một dải hẹp ở giữa. Cắt sẵn khung dọc từ bản gốc cho ra ảnh nét hơn mà file nhẹ hơn 60%.',
        ],
      },
      {
        h: 'Khả năng tiếp cận',
        p: [
          'Bản thiết kế gốc báo vị trí con trỏ bàn phím bằng hiệu ứng sáng lên, thực tế là gần như không nhìn thấy. Đã thay bằng viền rõ ràng.',
          'Thêm vào đó: thuộc tính ngôn ngữ đi theo ngôn ngữ khách chọn, có vùng mốc để trình đọc màn hình nhảy nhanh, tiêu đề trang mang đúng nội dung thay vì tên danh mục, và tương phản chữ đạt chuẩn WCAG AA.',
        ],
      },
    ],
    ctaTitle: 'Cần một hệ thống tương tự?',
    ctaText:
      'Website bán hàng, agent tư vấn, trợ lý nội bộ — xây theo nghiệp vụ của bạn và bàn giao khi đã chạy thật.',
    ctaButton: 'Trao đổi dự án →',
  },

  en: {
    navLabel: 'Case study',
    title: 'This website',
    intro:
      'The page you are reading is a complete store: customers create an account, pay by international card or by domestic bank transfer, and receive a download link by email — with no step that needs a human.',
    facts: [
      { k: 'Languages', v: '3' },
      { k: 'Payment providers', v: '2' },
      { k: 'Fulfilment', v: 'Automatic' },
      { k: 'Stack', v: 'Next.js' },
    ],
    blocks: [
      {
        h: 'The starting point',
        p: [
          'What existed was an interface design: layout, motion, colour, copy in three languages. No backend, no database; the buttons only switched tabs.',
          'The job was to turn that into a working store without the design drifting anywhere along the way.',
        ],
      },
      {
        h: 'Keeping the design intact',
        p: [
          'The interface was not retyped into code. A converter reads the design file and generates the code — loops, conditionals and hover states are translated mechanically.',
          'Every point where a real function has to be attached is declared explicitly and must match. If the design changes and a hook is no longer found, the converter stops and says so, rather than quietly dropping a buy button.',
        ],
      },
      {
        h: 'Payments',
        list: [
          'Vietnamese customers pay by bank transfer and VietQR through PayOS.',
          'International customers pay by card through Paddle, which acts as merchant of record and handles per-country VAT.',
          'The provider is chosen from the language the visitor is reading, not from a question put to them.',
          'The webhook reconciles the amount actually received against the order before unlocking the download — a cent off and nothing ships.',
          'Replay protection: each payment notification is processed once, with signature verification and a time window.',
        ],
      },
      {
        h: 'The rest of it',
        list: [
          'Accounts: sign-up, sign-in, password reset. Passwords are hashed; reset links are stored only as hashes and expire.',
          'Fulfilment: download rights open in the account and a link goes out by email the moment payment is confirmed.',
          'Three languages — Vietnamese, English, Chinese — rendered in the right one from the very first HTML, with no flash of the wrong language.',
          'A full set of legal pages: terms, privacy, refunds, licence.',
          'SEO: sitemap, robots, and a generated share image.',
        ],
      },
      {
        h: 'Worth recounting',
        p: [
          '<b>Reconciling amounts with Paddle.</b> The first way of reading the amount ran cleanly and was still wrong: it took a total that included tax, while orders store the pre-tax price. Nothing errored — every international order would simply have been marked failed, with customers paying and receiving nothing. It took comparing against a real transaction to find.',
          '<b>The background video downloaded twice.</b> The background and the card used the same file but as two separate elements, so the browser fetched it twice. Half the homepage was a duplicate.',
          '<b>Framing on phones.</b> A portrait screen crops a landscape video down to a narrow central strip. Cropping a portrait frame from the original gives a sharper picture in a file 60% smaller.',
        ],
      },
      {
        h: 'Accessibility',
        p: [
          'The original design signalled keyboard focus with a brightness change, which in practice was close to invisible. It now has a real focus ring.',
          'Alongside that: the language attribute follows the language chosen, landmarks let screen reader users skip ahead, the page heading carries the actual subject rather than a category name, and text contrast meets WCAG AA.',
        ],
      },
    ],
    ctaTitle: 'Need something like this?',
    ctaText:
      'A storefront, a sales agent, an internal copilot — built around how your business works and handed over running.',
    ctaButton: 'Discuss a project →',
  },

  zh: {
    navLabel: '项目案例',
    title: '本站本身',
    intro:
      '您正在浏览的这个站点就是一个完整的商店：顾客注册账号，用国际信用卡或本地转账付款，随后通过邮件收到下载链接——全程无需人工介入。',
    facts: [
      { k: '语言', v: '3 种' },
      { k: '支付渠道', v: '2 个' },
      { k: '发货', v: '全自动' },
      { k: '技术栈', v: 'Next.js' },
    ],
    blocks: [
      {
        h: '起点',
        p: [
          '起初只有一份界面设计稿：版式、动效、配色，以及三种语言的文案。没有后端，没有数据库，按钮只能切换标签页。',
          '要做的是把它变成真正能运转的商店，同时不让设计走样。',
        ],
      },
      {
        h: '如何保住设计原貌',
        p: [
          '界面没有靠人工誊写成代码，而是由一个转换器读取设计文件自动生成：循环、条件、悬停样式都由程序翻译。',
          '每一处需要接入真实功能的位置都明确声明且必须命中。设计一旦改动导致接入点失效，转换器会直接报错停下，而不是悄悄弄丢一个购买按钮。',
        ],
      },
      {
        h: '支付',
        list: [
          '越南本地顾客通过 PayOS 以转账与 VietQR 付款。',
          '海外顾客通过 Paddle 刷卡，由其作为名义销售方处理各国增值税。',
          '按访客当前语言自动选择渠道，不额外提问。',
          '发货前由 webhook 核对实收金额与订单金额，差一分钱都不发货。',
          '防重放：每条支付通知只处理一次，校验签名并限定时间窗口。',
        ],
      },
      {
        h: '其余部分',
        list: [
          '账号体系：注册、登录、找回密码。密码以哈希存储，重置链接仅存哈希且有有效期。',
          '发货：收到支付确认即在账号内开通下载权限，并通过邮件发出链接。',
          '中英越三语——从首屏 HTML 就渲染为正确语言，不会先闪一下再切换。',
          '完整的法律页面：条款、隐私、退款、授权。',
          'SEO：站点地图、robots，以及自动生成的分享图。',
        ],
      },
      {
        h: '值得一提的几处',
        p: [
          '<b>与 Paddle 的金额核对。</b>最初的取值方式运行顺畅却是错的：它取的是含税总额，而订单存的是税前价。没有任何报错——只是所有海外订单都会被标记为失败，顾客付了钱却收不到货。最后是比对一笔真实交易才查出来。',
          '<b>背景视频下载了两次。</b>背景与卡片用的是同一个文件，但分属两个元素，浏览器因此抓取了两遍，首页有一半流量是重复的。',
          '<b>手机上的构图。</b>竖屏会把横向视频裁成中间一条窄带。改为从原片裁出竖版画面后，画质更清晰，文件还小了六成。',
        ],
      },
      {
        h: '无障碍',
        p: [
          '原设计用变亮来提示键盘焦点，实际几乎看不出来，现已改为明确的焦点边框。',
          '此外：语言属性跟随所选语言，设置了地标区域便于读屏用户跳转，页面主标题改为真实主题而非栏目名称，文字对比度达到 WCAG AA。',
        ],
      },
    ],
    ctaTitle: '需要类似的系统吗？',
    ctaText: '销售型网站、导购智能体、内部助手——按贵司业务定制，交付时已在运行。',
    ctaButton: '洽谈项目 →',
  },
};
