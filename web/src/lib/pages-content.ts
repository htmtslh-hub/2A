/* Nội dung trang "Về chúng tôi" và "Liên hệ", ba thứ tiếng.

   Nội dung ở đây là bản nháp hợp lý để trang không trống — anh thay bằng câu
   chuyện thật của mình khi có. Thông tin doanh nghiệp lấy từ src/lib/company.ts */
import type { LangCode } from '@/generated/data';
import type { LegalSection } from '@/lib/legal';

export interface StaticPage {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export const ABOUT: Record<LangCode, StaticPage> = {
  vi: {
    title: 'Về chúng tôi',
    intro:
      'Forge Zone bán template website dựng sẵn dưới dạng file số tải về. Mỗi sản phẩm có demo, file nguồn, tài liệu và giấy phép sử dụng.',
    sections: [
      {
        h: 'Chúng tôi làm gì',
        p: [
          'Mỗi giao diện là một bản dựng hoàn chỉnh chứ không phải bản phác thảo: bố cục, chuyển động, quy tắc responsive và nội dung mẫu đều đã xong. Bạn tải về, thay chữ và ảnh, rồi đưa lên hosting.',
          'Thanh toán trên forgezone.store chỉ mua file template có sẵn. Đơn hàng không bao gồm thiết kế, lập trình, tư vấn hoặc cài đặt theo yêu cầu.',
        ],
      },
      {
        h: 'Cách chúng tôi làm',
        p: [
          'Mỗi mẫu được thiết kế trước trên canvas, sau đó chuyển thành mã nguồn qua quy trình tự động của chúng tôi. Nhờ vậy bản chạy thật giống hệt bản thiết kế, không bị "dịch sai" như khi chuyển tay.',
          'Chúng tôi kiểm thử trên desktop, tablet và điện thoại thật — không chỉ thu nhỏ cửa sổ trình duyệt rồi coi là xong.',
          'Mã nguồn viết sạch, có chú thích và không phụ thuộc plugin lạ. Bạn có thể chỉnh sửa và tự lưu trữ trên nền tảng phù hợp.',
        ],
      },
      {
        h: 'Sản phẩm và giao hàng',
        p: [
          'Danh mục hiện có sáu sản phẩm tải về: Kinetiq, Tidal, Keystead, Solenne, Aeris và VYBE. Chúng tôi chỉ hiển thị những mẫu đã có file giao thực tế.',
          'Mỗi file ZIP gồm website HTML/CSS/JS hoàn chỉnh, README, hướng dẫn CUSTOMISE và giấy phép. Hệ thống tự mở quyền tải trong tài khoản sau khi thanh toán thành công.',
        ],
      },
      {
        h: 'Chúng tôi không làm gì',
        p: [
          'Không bán template dựng vội cho đủ số lượng. Thà ít mẫu mà mỗi mẫu dùng được ngay.',
          'Không thu phí thuê bao. Trả một lần, dùng vĩnh viễn, cập nhật miễn phí.',
          'Không khoá bạn vào nền tảng của chúng tôi. File là của bạn, deploy ở đâu tuỳ ý.',
        ],
      },
    ],
  },
  en: {
    title: 'About us',
    intro:
      'Forge Zone sells ready-made website templates as downloadable digital files. Each product has a demo, source package, documentation and licence.',
    sections: [
      {
        h: 'What we do',
        p: [
          'Every template is a finished build rather than a mockup: layout, motion, responsive rules and sample content are all done. You download it, swap the words and images, and put it live.',
          'A payment on forgezone.store buys an existing template package only. Orders do not include custom design, development, consulting or installation.',
        ],
      },
      {
        h: 'How we work',
        p: [
          'Each template is designed on a canvas first, then turned into source code through our own automated pipeline. That means what ships looks exactly like what was designed, without the drift that hand-translation introduces.',
          'We test on real desktops, tablets and phones — not by shrinking a browser window and calling it responsive.',
          'The code is clean, commented and free of unusual plugin dependencies. You can edit it and host it independently on a compatible platform.',
        ],
      },
      {
        h: 'Products and delivery',
        p: [
          'The current catalogue has six downloadable products: Kinetiq, Tidal, Keystead, Solenne, Aeris and VYBE. We show only templates that have a real delivery package.',
          'Each ZIP contains a complete HTML/CSS/JS website, README, CUSTOMISE guide and licence. Successful payment automatically unlocks the download in the customer account.',
        ],
      },
      {
        h: 'What we do not do',
        p: [
          'We do not pad the catalogue with templates built in a hurry. Fewer templates, each one usable on day one.',
          'No subscriptions. Pay once, keep it forever, updates included.',
          'No lock-in. The files are yours; deploy them wherever you like.',
        ],
      },
    ],
  },
  zh: {
    title: '关于我们',
    intro: 'Forge Zone 销售可下载的现成网站模板。每个产品均包含演示、源文件、文档和使用许可。',
    sections: [
      {
        h: '我们做什么',
        p: [
          '每套模板都是成品而非草稿：版式、动效、响应式规则和示例内容都已完成。你只需下载、替换文字与图片，然后上线。',
          '在 forgezone.store 付款只购买现有模板文件，不包含定制设计、开发、咨询或安装。',
        ],
      },
      {
        h: '我们怎么做',
        p: [
          '每套模板先在画布上完成设计，再通过我们自建的自动化流程转成源代码。因此上线效果与设计稿完全一致，不会出现手工转换造成的偏差。',
          '我们在真实的桌面端、平板和手机上测试，而不是把浏览器窗口缩小就算响应式。',
          '代码整洁、有注释，不依赖冷门插件，可自行修改并托管到兼容平台。',
        ],
      },
      {
        h: '产品与交付',
        p: [
          '目前目录中有六个可下载产品：Kinetiq、Tidal、Keystead、Solenne、Aeris 和 VYBE。我们只展示已有真实交付文件的模板。',
          '每个 ZIP 包含完整的 HTML/CSS/JS 网站、README、CUSTOMISE 指南和许可。付款成功后，系统会自动在客户账户中开放下载。',
        ],
      },
      {
        h: '我们不做什么',
        p: [
          '不为了凑数量而赶工上架模板。宁可少一些，但每一套都能立刻投入使用。',
          '不做订阅制。一次付费，永久使用，更新免费。',
          '不绑定平台。文件归你所有，想部署到哪里都可以。',
        ],
      },
    ],
  },
};

export const CONTACT: Record<LangCode, StaticPage> = {
  vi: {
    title: 'Hỗ trợ khách hàng',
    intro: 'Có câu hỏi về sản phẩm hay đơn hàng? Cứ viết cho chúng tôi.',
    sections: [
      {
        h: 'Hỗ trợ khách hàng',
        p: [
          'Thắc mắc về đơn hàng, link tải, hoàn tiền hoặc lỗi kỹ thuật.',
          'Chúng tôi trả lời trong vòng <b>1–2 ngày làm việc</b>. Nếu là vấn đề về đơn hàng, gửi kèm email đã dùng khi mua và mã đơn để xử lý nhanh hơn.',
        ],
      },
      {
        h: 'Trước khi viết thư',
        p: [
          'Nhiều câu hỏi thường gặp đã có sẵn câu trả lời ở mục Câu hỏi trên trang chủ — về giấy phép, cách deploy, chính sách cập nhật và hoàn tiền.',
        ],
      },
    ],
  },
  en: {
    title: 'Customer support',
    intro: 'Questions about a product or an order? Just write to us.',
    sections: [
      {
        h: 'Customer support',
        p: [
          'For questions about orders, download links, refunds or technical faults.',
          'We reply within <b>1–2 business days</b>. For order issues, include the email you bought with and your order reference so we can move faster.',
        ],
      },
      {
        h: 'Before you write',
        p: [
          'Many common questions are already answered in the FAQ on the home page — licensing, deployment, updates and refunds.',
        ],
      },
    ],
  },
  zh: {
    title: '客户支持',
    intro: '对产品或订单有疑问？直接写信给我们。',
    sections: [
      {
        h: '客户支持',
        p: [
          '关于订单、下载链接、退款或技术故障的问题。',
          '我们会在 <b>1–2 个工作日</b>内回复。若是订单问题，请附上购买时使用的邮箱和订单编号，以便我们更快处理。',
        ],
      },
      {
        h: '写信之前',
        p: ['首页的常见问题里已经回答了不少疑问——授权、部署、更新与退款等。'],
      },
    ],
  },
};
