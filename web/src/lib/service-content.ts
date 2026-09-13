/* Nội dung trang đặt làm agent (/dich-vu).
   Bốn thẻ agent ở màn hình đầu trước đây chỉ đổi ảnh nền rồi đẩy khách sang
   thư viện template — hứa agent mà giao giao diện. Trang này là chỗ bốn thẻ
   đó thật sự dẫn tới.

   Đây là DỊCH VỤ chứ không phải hàng tải về: sản phẩm được dựng và triển
   khai xong mới bàn giao, nên không có nút mua, chỉ có form gửi yêu cầu. */
import type { LangCode } from '@/generated/data';

export const SERVICE_PATH = '/dich-vu';

/** Web riêng của dịch vụ. Paddle từ chối duyệt forgezone.store (13/09/2026)
 *  vì trên đó có bán dịch vụ làm web — Paddle chỉ nhận sản phẩm số. Nên dịch
 *  vụ tách hẳn sang subdomain; src/proxy.ts chia đường dẫn theo tên miền. */
export const SERVICE_SITE_URL = 'https://dichvu.forgezone.store';

/** Khớp với IDS trong generated/data.ts, trừ 'me' (thẻ "Về Tôi"). */
export const SERVICE_KINDS = ['sales', 'ops', 'data', 'custom'] as const;
export type ServiceKind = (typeof SERVICE_KINDS)[number];

export interface ServiceItem {
  kind: ServiceKind;
  title: string;
  blurb: string;
  /** Việc cụ thể sẽ làm — để khách hình dung được phạm vi. */
  points: string[];
}

export interface ServiceDoc {
  navLabel: string;
  title: string;
  intro: string;
  /** Nói rõ đây là dịch vụ, không phải file tải về. */
  notice: string;
  items: ServiceItem[];
  howTitle: string;
  how: { step: string; text: string }[];
  /** Phần khách đọc kỹ nhất: rốt cuộc họ cầm về được cái gì. */
  deliverTitle: string;
  deliverIntro: string;
  deliverGroups: { h: string; items: string[] }[];
  formTitle: string;
  formIntro: string;
  f: {
    kind: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    budget: string;
    message: string;
    messagePlaceholder: string;
    optional: string;
    submit: string;
    sending: string;
    sent: string;
    sentNote: string;
    errRequired: string;
    errEmail: string;
    errNetwork: string;
  };
  budgets: string[];
}

export const SERVICE: Record<LangCode, ServiceDoc> = {
  vi: {
    navLabel: 'Liên hệ chúng tôi',
    title: 'Liên hệ chúng tôi',
    intro:
      'Agent được thiết kế, dựng và triển khai theo nghiệp vụ của bạn. Bàn giao khi đã chạy thật trên hạ tầng, không phải một thư mục mã nguồn để bạn tự xoay xở.',
    notice:
      'Đây là dịch vụ làm theo yêu cầu, không phải sản phẩm tải về. Mỗi việc bắt đầu bằng một buổi trao đổi để chốt phạm vi và báo giá.',
    items: [
      {
        kind: 'sales',
        title: 'Agent Bán Hàng',
        blurb:
          'Tư vấn sản phẩm, đề xuất gói phù hợp và dẫn khách tới bước thanh toán. Nhắc lại giỏ hàng và theo đuổi khách tiềm năng tự động.',
        points: [
          'Trả lời câu hỏi về sản phẩm dựa trên danh mục thật của bạn',
          'Gợi ý gói phù hợp theo nhu cầu khách mô tả',
          'Thu thông tin khách quan tâm và chuyển về nơi bạn theo dõi',
          'Nối vào cổng thanh toán sẵn có',
        ],
      },
      {
        kind: 'ops',
        title: 'Trợ Lý Nội Bộ',
        blurb:
          'Tra cứu tài liệu, tổng hợp báo cáo, soạn thảo và trả lời quy trình cho nhân viên, nối trực tiếp vào dữ liệu công ty.',
        points: [
          'Hỏi đáp trên kho tài liệu nội bộ, trả lời kèm trích dẫn nguồn',
          'Soạn thảo văn bản theo mẫu và giọng văn của công ty',
          'Phân quyền theo phòng ban',
          'Chạy trên hạ tầng bạn chỉ định nếu dữ liệu nhạy cảm',
        ],
      },
      {
        kind: 'data',
        title: 'Agent Phân Tích',
        blurb:
          'Hỏi đáp bằng ngôn ngữ tự nhiên trên dữ liệu kinh doanh, tự sinh biểu đồ và phát hiện bất thường.',
        points: [
          'Đặt câu hỏi bằng tiếng Việt thay vì viết truy vấn',
          'Tự dựng biểu đồ từ câu hỏi',
          'Cảnh báo khi số liệu lệch khỏi mức thường ngày',
          'Kết nối cơ sở dữ liệu hoặc bảng tính đang dùng',
        ],
      },
      {
        kind: 'custom',
        title: 'Agent Theo Yêu Cầu',
        blurb:
          'Agent chuyên biệt theo nghiệp vụ riêng: tích hợp API nội bộ, quy trình phê duyệt và tự động hóa đầu-cuối.',
        points: [
          'Khảo sát quy trình hiện tại trước khi đề xuất',
          'Tích hợp với hệ thống sẵn có qua API',
          'Chèn bước người duyệt ở những chỗ cần kiểm soát',
          'Bàn giao kèm tài liệu vận hành',
        ],
      },
    ],
    howTitle: 'Cách làm việc',
    how: [
      { step: '01', text: 'Bạn gửi yêu cầu ở form dưới, mô tả càng cụ thể càng tốt.' },
      { step: '02', text: 'Trao đổi để chốt phạm vi, thời gian và chi phí. Miễn phí.' },
      { step: '03', text: 'Dựng bản chạy được đầu tiên để bạn dùng thử và góp ý.' },
      { step: '04', text: 'Hoàn thiện, triển khai và bàn giao kèm tài liệu.' },
    ],
    deliverTitle: 'Bạn nhận được gì',
    deliverIntro:
      'Ba nhóm dưới đây có trong mọi dự án, không phụ thuộc quy mô hay ngân sách.',
    deliverGroups: [
      {
        h: 'Thứ chạy được',
        items: [
          'Agent hoạt động tại địa chỉ của bạn, đã nối vào dữ liệu thật chứ không phải dữ liệu mẫu.',
          'Tài khoản quản trị để xem lại lịch sử hội thoại và sửa câu trả lời mẫu.',
          'Bảng theo dõi: số lượt hỏi, chi phí phát sinh, và những câu agent trả lời sai.',
        ],
      },
      {
        h: 'Bàn giao',
        items: [
          'Toàn bộ mã nguồn của agent thuộc về bạn — giữ, sửa, mang đi đâu cũng được.',
          'Văn bản ghi rõ agent làm được gì và <b>không</b> làm được gì. Phần sau quan trọng hơn phần trước.',
          'Hướng dẫn tự cập nhật dữ liệu khi bảng giá hay sản phẩm thay đổi, không cần gọi tôi.',
          'Muốn chuyển sang bên khác lúc nào cũng được, mang theo cả mã nguồn lẫn dữ liệu. Không khoá chân.',
        ],
      },
      {
        h: 'Điều kiện nói trước',
        items: [
          'Chi phí vận hành — khoá API và nơi chạy agent — đều đứng tên bạn và thanh toán trực tiếp với nhà cung cấp, không qua tôi. Bạn thấy hoá đơn thật và tự đặt hạn mức chi.',
          'Bảo hành sửa lỗi miễn phí <b>một tháng</b> kể từ ngày bàn giao.',
          'Có sự cố thì tôi phản hồi trong vòng <b>24 giờ làm việc</b> — không tính cuối tuần và ngày lễ.',
          'Những thành phần dùng chung tôi viết sẵn từ trước dự án vẫn thuộc về tôi; bạn được dùng vĩnh viễn trong chính agent này.',
        ],
      },
    ],
    formTitle: 'Gửi yêu cầu',
    formIntro: 'Điền vào đây, tôi trả lời trong vòng 2 ngày làm việc.',
    f: {
      kind: 'Loại agent',
      name: 'Tên bạn',
      email: 'Email',
      phone: 'Số điện thoại',
      company: 'Công ty',
      budget: 'Ngân sách dự kiến',
      message: 'Bạn cần agent làm việc gì?',
      messagePlaceholder:
        'Ví dụ: trả lời khách hỏi về bảng giá và tình trạng còn hàng trên fanpage, lấy dữ liệu từ file Excel sản phẩm của công ty.',
      optional: 'không bắt buộc',
      submit: 'Gửi yêu cầu',
      sending: 'Đang gửi…',
      sent: 'Đã nhận yêu cầu của bạn',
      sentNote: 'Tôi sẽ liên hệ qua email trong vòng 2 ngày làm việc.',
      errRequired: 'Vui lòng điền các mục bắt buộc.',
      errEmail: 'Email chưa đúng định dạng.',
      errNetwork: 'Không gửi được, vui lòng thử lại.',
    },
    budgets: ['Chưa xác định', 'Dưới 20 triệu', '20 – 50 triệu', '50 – 100 triệu', 'Trên 100 triệu'],
  },

  en: {
    navLabel: 'Contact us',
    title: 'Contact us',
    intro:
      'An agent designed, built and deployed around how your business actually works. Handed over running on real infrastructure — not as a folder of source code for you to figure out.',
    notice:
      'This is bespoke work, not a download. Every project starts with a conversation to agree the scope and the price.',
    items: [
      {
        kind: 'sales',
        title: 'Sales Agent',
        blurb:
          'Answers product questions, recommends the right package and walks buyers to checkout. Recovers carts and follows up leads on its own.',
        points: [
          'Answers from your real product catalogue',
          'Recommends a package based on what the buyer describes',
          'Captures interested visitors into wherever you track them',
          'Hooks into your existing payment provider',
        ],
      },
      {
        kind: 'ops',
        title: 'Internal Copilot',
        blurb:
          'Looks things up, summarises reports, drafts documents and answers process questions for staff — wired straight into company data.',
        points: [
          'Question answering over internal documents, with sources cited',
          'Drafts documents in your house format and tone',
          'Per-department access control',
          'Runs on infrastructure you nominate when data is sensitive',
        ],
      },
      {
        kind: 'data',
        title: 'Analytics Agent',
        blurb:
          'Ask questions of your business data in plain language, get charts back, and get told when something looks wrong.',
        points: [
          'Ask in plain language instead of writing queries',
          'Builds the chart from the question',
          'Flags figures that drift from the usual range',
          'Connects to the database or spreadsheets you already use',
        ],
      },
      {
        kind: 'custom',
        title: 'Bespoke Agent',
        blurb:
          'An agent shaped around your own process: internal API integration, approval steps and end-to-end automation.',
        points: [
          'Your current process is mapped before anything is proposed',
          'Integrates with existing systems over their APIs',
          'Human approval inserted wherever control matters',
          'Delivered with operating documentation',
        ],
      },
    ],
    howTitle: 'How it works',
    how: [
      { step: '01', text: 'Send the form below, with as much detail as you can.' },
      { step: '02', text: 'We agree scope, timeline and cost. No charge for this.' },
      { step: '03', text: 'A first working version for you to try and react to.' },
      { step: '04', text: 'Finish, deploy and hand over with documentation.' },
    ],
    deliverTitle: 'What you get',
    deliverIntro: 'These three groups come with every project, whatever its size.',
    deliverGroups: [
      {
        h: 'The working thing',
        items: [
          'An agent running at your own address, wired into your real data rather than a sample set.',
          'An admin account for reading back conversations and correcting stock answers.',
          'A dashboard: how many questions, what it cost, and which answers were wrong.',
        ],
      },
      {
        h: 'Handover',
        items: [
          'The agent’s source code is yours — keep it, change it, take it anywhere.',
          'A document stating what the agent can and <b>cannot</b> do. The second half matters more than the first.',
          'Instructions for updating the data yourself when prices or products change, without calling me.',
          'You can move to another supplier whenever you like, taking the code and the data with you. No lock-in.',
        ],
      },
      {
        h: 'Stated up front',
        items: [
          'Running costs — the API key and wherever the agent runs — are in your name and paid straight to the provider, not through me. You see the real bill and set your own spending cap.',
          'Bugs are fixed free for <b>one month</b> from handover.',
          'If something breaks, I respond within <b>24 working hours</b> — weekends and public holidays not counted.',
          'Shared components I wrote before your project remain mine; you get a perpetual right to use them inside this agent.',
        ],
      },
    ],
    formTitle: 'Send a request',
    formIntro: 'Fill this in and I reply within 2 working days.',
    f: {
      kind: 'Type of agent',
      name: 'Your name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company',
      budget: 'Rough budget',
      message: 'What should the agent do?',
      messagePlaceholder:
        'For example: answer customer questions about pricing and stock on our Facebook page, using the product spreadsheet we keep internally.',
      optional: 'optional',
      submit: 'Send request',
      sending: 'Sending…',
      sent: 'Request received',
      sentNote: 'I will get back to you by email within 2 working days.',
      errRequired: 'Please fill in the required fields.',
      errEmail: 'That email address does not look right.',
      errNetwork: 'Could not send — please try again.',
    },
    budgets: ['Not sure yet', 'Under $800', '$800 – $2,000', '$2,000 – $4,000', 'Over $4,000'],
  },

  zh: {
    navLabel: '联系我们',
    title: '联系我们',
    intro:
      '按贵司实际业务流程设计、开发并部署的智能体。交付时已在真实环境中运行，而不是给您一份源代码自行摸索。',
    notice: '这是定制服务，并非可下载的产品。每个项目都从一次沟通开始，先确定范围与报价。',
    items: [
      {
        kind: 'sales',
        title: '销售智能体',
        blurb: '解答产品疑问、推荐合适方案并引导至付款。自动挽回购物车、跟进潜在客户。',
        points: [
          '依据贵司真实商品目录作答',
          '按客户描述的需求推荐方案',
          '收集有意向的访客并汇入您的跟进渠道',
          '对接现有支付渠道',
        ],
      },
      {
        kind: 'ops',
        title: '内部助手',
        blurb: '为员工查资料、汇总报表、起草文书、解答流程问题，直接连接公司数据。',
        points: [
          '基于内部文档问答，回答附来源出处',
          '按公司格式与文风起草文书',
          '按部门划分访问权限',
          '数据敏感时可部署在您指定的环境',
        ],
      },
      {
        kind: 'data',
        title: '分析智能体',
        blurb: '用日常语言询问经营数据，自动生成图表，并在数据异常时提醒。',
        points: [
          '用日常语言提问，无需编写查询语句',
          '根据问题自动生成图表',
          '数据偏离常态时发出提醒',
          '对接现有数据库或表格',
        ],
      },
      {
        kind: 'custom',
        title: '专属智能体',
        blurb: '围绕贵司特有流程定制：对接内部接口、审批环节与端到端自动化。',
        points: [
          '先梳理现有流程，再提出方案',
          '通过接口与现有系统集成',
          '在需要把关处保留人工审批',
          '交付时附带运维文档',
        ],
      },
    ],
    howTitle: '合作方式',
    how: [
      { step: '01', text: '填写下方表单，描述得越具体越好。' },
      { step: '02', text: '沟通确定范围、周期与费用，此环节免费。' },
      { step: '03', text: '先做出可运行的初版供您试用并反馈。' },
      { step: '04', text: '完善、部署并附文档交付。' },
    ],
    deliverTitle: '您将获得什么',
    deliverIntro: '以下三组内容每个项目都有，与规模和预算无关。',
    deliverGroups: [
      {
        h: '可运行的成品',
        items: [
          '智能体运行在贵司自己的地址上，接入的是真实数据而非样例数据。',
          '管理后台，可回看对话记录并修改标准答复。',
          '数据面板：提问次数、产生的费用，以及回答有误的条目。',
        ],
      },
      {
        h: '交付内容',
        items: [
          '该智能体的源代码归贵司所有——可保留、可修改、可带走。',
          '一份文档，写明智能体能做什么、<b>不能</b>做什么。后者比前者更重要。',
          '数据自助更新指南，价格或产品变动时无需联系我。',
          '随时可以更换服务方，源代码与数据一并带走，不做绑定。',
        ],
      },
      {
        h: '事先讲明',
        items: [
          '运行成本——API 密钥与智能体的运行环境——均以贵司名义申请，费用直接支付给服务商，不经我手。账单真实可见，额度由贵司自行设定。',
          '交付之日起<b>一个月</b>内免费修复缺陷。',
          '出现故障时，我会在 <b>24 个工作小时</b>内响应，周末与法定节假日不计入。',
          '项目开始前我已写好的通用组件仍归我所有；贵司获得在本智能体内的永久使用权。',
        ],
      },
    ],
    formTitle: '提交需求',
    formIntro: '填写后，我会在两个工作日内回复。',
    f: {
      kind: '智能体类型',
      name: '您的称呼',
      email: '邮箱',
      phone: '电话',
      company: '公司',
      budget: '预算范围',
      message: '希望智能体做什么？',
      messagePlaceholder: '例如：在公众号上回答客户关于价格和库存的提问，数据取自公司内部的商品表格。',
      optional: '选填',
      submit: '提交需求',
      sending: '提交中…',
      sent: '已收到您的需求',
      sentNote: '我会在两个工作日内通过邮件与您联系。',
      errRequired: '请填写必填项。',
      errEmail: '邮箱格式有误。',
      errNetwork: '提交失败，请重试。',
    },
    budgets: ['尚未确定', '2 万元以下', '2 万 – 5 万元', '5 万 – 10 万元', '10 万元以上'],
  },
};

