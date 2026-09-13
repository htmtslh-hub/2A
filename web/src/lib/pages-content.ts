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
      'Chúng tôi làm giao diện web dựng sẵn — những bộ template hoàn chỉnh, chuyển động mượt, sẵn sàng dùng cho dự án thương mại.',
    sections: [
      {
        h: 'Chúng tôi làm gì',
        p: [
          'Mỗi giao diện là một bản dựng hoàn chỉnh chứ không phải bản phác thảo: bố cục, chuyển động, quy tắc responsive và nội dung mẫu đều đã xong. Bạn tải về, thay chữ và ảnh, rồi đưa lên hosting.',
          'Chúng tôi tin rằng một trang web tốt không cần bắt đầu từ con số không mỗi lần. Phần lớn thời gian của một dự án web bị tiêu vào những thứ đã được giải quyết hàng nghìn lần — chúng tôi giải sẵn phần đó.',
        ],
      },
      {
        h: 'Cách chúng tôi làm',
        p: [
          'Mỗi mẫu được thiết kế trước trên canvas, sau đó chuyển thành mã nguồn qua quy trình tự động của chúng tôi. Nhờ vậy bản chạy thật giống hệt bản thiết kế, không bị "dịch sai" như khi chuyển tay.',
          'Chúng tôi kiểm thử trên desktop, tablet và điện thoại thật — không chỉ thu nhỏ cửa sổ trình duyệt rồi coi là xong.',
          'Mã nguồn viết sạch, có chú thích, không phụ thuộc plugin lạ. Đội kỹ thuật của bạn đọc được và ghép vào hệ thống sẵn có.',
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
      'We build ready-made website templates — finished designs with real motion, made to ship on commercial projects.',
    sections: [
      {
        h: 'What we do',
        p: [
          'Every template is a finished build rather than a mockup: layout, motion, responsive rules and sample content are all done. You download it, swap the words and images, and put it live.',
          'We think a good website should not have to start from nothing every time. Most of a web project goes into problems that have been solved a thousand times already — we solve that part in advance.',
        ],
      },
      {
        h: 'How we work',
        p: [
          'Each template is designed on a canvas first, then turned into source code through our own automated pipeline. That means what ships looks exactly like what was designed, without the drift that hand-translation introduces.',
          'We test on real desktops, tablets and phones — not by shrinking a browser window and calling it responsive.',
          'The code is clean, commented and free of unusual plugin dependencies. Your developers can read it and wire it into what you already run.',
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
    intro: '我们制作预先做好的网站模板——完成度高、动效真实、可直接用于商业项目。',
    sections: [
      {
        h: '我们做什么',
        p: [
          '每套模板都是成品而非草稿：版式、动效、响应式规则和示例内容都已完成。你只需下载、替换文字与图片，然后上线。',
          '我们认为好网站不必每次都从零开始。一个网站项目的大部分时间都花在早已被解决过上千次的问题上——这部分我们提前替你解决。',
        ],
      },
      {
        h: '我们怎么做',
        p: [
          '每套模板先在画布上完成设计，再通过我们自建的自动化流程转成源代码。因此上线效果与设计稿完全一致，不会出现手工转换造成的偏差。',
          '我们在真实的桌面端、平板和手机上测试，而不是把浏览器窗口缩小就算响应式。',
          '代码整洁、有注释，不依赖冷门插件。你的开发团队看得懂，也能接入现有系统。',
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
