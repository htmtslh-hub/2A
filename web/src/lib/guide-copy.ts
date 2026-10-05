import type { LangCode } from '@/generated/data';

type GuideCopy = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string; locale: string };
  skip: string; library: string; orders: string; navAria: string;
  eyebrow: string; heroFirst: string; heroSecond: string; heroBody: string;
  routeTitle: string; routeAria: string; supportQuestion: string; supportLink: string;
  tabsAria: string; stepsTab: string; promptsTab: string; templateTab: string; mobileToc: string;
  selectorLabel: string; selectorGeneral: string; apply: string; selected: (name: string) => string;
  selectorHint: string; unknownTemplate: string; stepLabel: (step: number) => string;
  promptHeading: string; promptIntro: string; promptNotice: string;
  startUnzip: string; viewProduct: string; templateNotice: string; nextLabel: string;
  chooseNextPrompt: string; originalGuide: string; emptyTitle: string; emptyBody: string; purchased: string;
  imageAlt: (name: string) => string; footerTitle: string; support: string; licence: string; store: string;
  promptWord: string; copyPrompt: string; copied: string; promptHint: string; viewPrompt: string;
  copiedStatus: string; manualStatus: string; manualLabel: string;
  searchLabel: string; searchPlaceholder: string; resultCount: (visible: number, total: number) => string;
  noResultTitle: string; noResultBody: string; viewAll: string; tableAria: string;
};

export const GUIDE_COPY: Record<LangCode, GuideCopy> = {
  vi: {
    meta: { title: 'Hướng dẫn sử dụng & prompt AI | Forge Zone', description: 'Từ mở mẫu đến xuất bản website: 10 bước rõ ràng, 12 prompt AI có thể sao chép và hướng dẫn riêng cho từng mẫu Forge Zone.', ogTitle: 'Hướng dẫn sử dụng | Forge Zone', ogDescription: 'Chỉnh sửa và xuất bản website của bạn, từng bước một.', locale: 'vi_VN' },
    skip: 'Đến nội dung hướng dẫn', library: 'Thư viện', orders: 'Đơn hàng', navAria: 'Điều hướng',
    eyebrow: 'Hướng dẫn dành cho khách hàng', heroFirst: 'Từ mẫu có sẵn.', heroSecond: 'Đến website của bạn.', heroBody: 'Làm từng bước, dùng prompt khi cần. Bạn luôn biết phải sửa gì và kiểm tra ở đâu.',
    routeTitle: 'LỘ TRÌNH SỬ DỤNG', routeAria: 'Các bước sử dụng', supportQuestion: 'Đang vướng ở một bước?', supportLink: 'Liên hệ hỗ trợ →',
    tabsAria: 'Nội dung hướng dẫn', stepsTab: 'Từng bước', promptsTab: '12 prompt AI', templateTab: 'Theo mẫu của bạn', mobileToc: 'Chọn bước bạn cần xem',
    selectorLabel: 'Bạn đang sử dụng mẫu nào?', selectorGeneral: 'Hướng dẫn chung cho mọi mẫu', apply: 'Áp dụng', selected: name => `Đã chọn ${name}. Prompt sẽ tự kèm tên mẫu của bạn.`, selectorHint: 'Chọn mẫu để xem đúng vị trí cần sửa và cá nhân hoá prompt.', unknownTemplate: 'Chưa có hướng dẫn cho mẫu này. Bạn vẫn có thể dùng hướng dẫn chung bên dưới.', stepLabel: step => `Bước ${step} / 10`,
    promptHeading: 'Chọn việc. Chép prompt. Bắt đầu.', promptIntro: 'Lần đầu sử dụng, hãy gửi file website và Prompt 01. Sau đó chọn prompt cho việc bạn muốn làm trong cùng cuộc trò chuyện.', promptNotice: 'AI cần file thực tế: index.html, style.css, main.js và tài liệu của mẫu. Đừng gửi mật khẩu hoặc khoá tài khoản. Khi mở chat mới, gửi lại file mới nhất và Prompt 01.',
    startUnzip: 'Bắt đầu từ giải nén', viewProduct: 'Xem sản phẩm', templateNotice: 'Hướng dẫn dưới đây dành cho bản mẫu gốc. Nếu đã chỉnh sửa, gửi bản file mới nhất cho AI và kiểm tra lại vị trí tương ứng.', nextLabel: 'Tiếp theo:', chooseNextPrompt: 'chọn prompt thay nội dung, ảnh hoặc màu sắc →', originalGuide: 'Đọc tài liệu CUSTOMISE gốc (tiếng Anh)', emptyTitle: 'Mở hướng dẫn đúng mẫu của bạn', emptyBody: 'Chọn tên mẫu ở phía trên rồi bấm “Áp dụng”. Bạn không cần đăng nhập để đọc hướng dẫn.', purchased: 'Xem mẫu đã mua',
    imageAlt: name => `Giao diện ${name}`, footerTitle: 'Forge Zone · Hướng dẫn sử dụng', support: 'Hỗ trợ', licence: 'Giấy phép', store: 'Về cửa hàng',
    promptWord: 'Prompt', copyPrompt: 'Sao chép prompt', copied: 'Đã sao chép ✓', promptHint: 'Gửi kèm file hiện tại. AI sẽ hỏi thông tin còn thiếu.', viewPrompt: 'Xem nội dung prompt', copiedStatus: 'Đã sao chép. Mở cuộc trò chuyện với AI và dán prompt.', manualStatus: 'Trình duyệt chưa cho phép sao chép. Chọn nội dung bên dưới rồi dùng Ctrl+C hoặc ⌘C.', manualLabel: 'Nội dung prompt để sao chép thủ công',
    searchLabel: 'Bạn muốn AI giúp việc gì?', searchPlaceholder: 'Tìm: đổi màu, thay ảnh, sửa lỗi…', resultCount: (visible, total) => `${visible} / ${total} prompt`, noResultTitle: 'Chưa tìm thấy prompt phù hợp', noResultBody: 'Thử từ ngắn hơn, ví dụ “ảnh” hoặc “nội dung”.', viewAll: 'Xem tất cả prompt', tableAria: 'Bảng hướng dẫn, có thể cuộn ngang',
  },
  en: {
    meta: { title: 'Website guide and AI prompts | Forge Zone', description: 'Go from opening your template to publishing it with 10 clear steps, 12 copy-ready AI prompts, and template-specific instructions.', ogTitle: 'Customer guide | Forge Zone', ogDescription: 'Customise and publish your website one clear step at a time.', locale: 'en_US' },
    skip: 'Skip to guide content', library: 'Library', orders: 'Orders', navAria: 'Main navigation',
    eyebrow: 'Customer guide', heroFirst: 'Start with a template.', heroSecond: 'Make it your website.', heroBody: 'Follow one step at a time and use a prompt when you need help. You will always know what to change and what to check.',
    routeTitle: 'YOUR ROUTE', routeAria: 'Guide steps', supportQuestion: 'Stuck on a step?', supportLink: 'Contact support →',
    tabsAria: 'Guide sections', stepsTab: 'Step by step', promptsTab: '12 AI prompts', templateTab: 'Your template', mobileToc: 'Choose a step',
    selectorLabel: 'Which template are you using?', selectorGeneral: 'General guide for every template', apply: 'Apply', selected: name => `${name} selected. Prompts will include your template name.`, selectorHint: 'Choose a template to see exact edit locations and personalise the prompts.', unknownTemplate: 'A specific guide is not available for this template. You can still use the general guide below.', stepLabel: step => `Step ${step} of 10`,
    promptHeading: 'Choose a task. Copy a prompt. Begin.', promptIntro: 'For your first session, send the website files with Prompt 01. Then use the prompt for your next task in the same conversation.', promptNotice: 'AI needs the real files: index.html, style.css, main.js, and the template documentation. Never send passwords or account keys. In a new chat, attach the latest files and Prompt 01 again.',
    startUnzip: 'Start with unzipping', viewProduct: 'View product', templateNotice: 'The instructions below refer to the original template. If you have edited it, send the latest files to AI and verify the matching location.', nextLabel: 'Next:', chooseNextPrompt: 'choose a prompt for copy, images, or colours →', originalGuide: 'Read the original CUSTOMISE document', emptyTitle: 'Open the guide for your template', emptyBody: 'Choose a template above and select “Apply”. You do not need to sign in to read the guide.', purchased: 'View purchased templates',
    imageAlt: name => `${name} template preview`, footerTitle: 'Forge Zone · Customer guide', support: 'Support', licence: 'Licence', store: 'Back to store',
    promptWord: 'Prompt', copyPrompt: 'Copy prompt', copied: 'Copied ✓', promptHint: 'Attach the current files. AI will ask for anything missing.', viewPrompt: 'View prompt text', copiedStatus: 'Copied. Open your AI conversation and paste the prompt.', manualStatus: 'Your browser blocked automatic copying. Select the text below and press Ctrl+C or ⌘C.', manualLabel: 'Prompt text for manual copying',
    searchLabel: 'What do you want AI to help with?', searchPlaceholder: 'Search: colours, image, publish, fix…', resultCount: (visible, total) => `${visible} of ${total} prompts`, noResultTitle: 'No matching prompt found', noResultBody: 'Try a shorter term, such as “image” or “content”.', viewAll: 'View all prompts', tableAria: 'Guide table, scroll horizontally if needed',
  },
  zh: {
    meta: { title: '网站使用指南与 AI 提示词 | Forge Zone', description: '通过 10 个清晰步骤、12 条可复制的 AI 提示词和模板专属说明，从打开模板到发布网站。', ogTitle: '客户使用指南 | Forge Zone', ogDescription: '按照清晰步骤修改并发布你的网站。', locale: 'zh_CN' },
    skip: '跳到指南内容', library: '模板库', orders: '订单', navAria: '主导航',
    eyebrow: '客户使用指南', heroFirst: '从现成模板开始。', heroSecond: '做成你的网站。', heroBody: '一次完成一个步骤，需要帮助时复制提示词。你会一直清楚该修改什么、检查什么。',
    routeTitle: '使用路线', routeAria: '使用步骤', supportQuestion: '某个步骤遇到问题？', supportLink: '联系支持 →',
    tabsAria: '指南内容', stepsTab: '分步指南', promptsTab: '12 条 AI 提示词', templateTab: '你的模板', mobileToc: '选择需要查看的步骤',
    selectorLabel: '你正在使用哪个模板？', selectorGeneral: '适用于全部模板的通用指南', apply: '应用', selected: name => `已选择 ${name}。提示词会自动包含模板名称。`, selectorHint: '选择模板即可查看准确的修改位置，并自动个性化提示词。', unknownTemplate: '暂时没有该模板的专属指南，你仍可使用下方通用指南。', stepLabel: step => `步骤 ${step} / 10`,
    promptHeading: '选择任务，复制提示词，然后开始。', promptIntro: '首次使用时，请发送网站文件和 Prompt 01。之后在同一对话中选择与你下一项任务对应的提示词。', promptNotice: 'AI 需要真实文件：index.html、style.css、main.js 和模板文档。不要发送密码或账户密钥。新建对话时，请重新发送最新文件和 Prompt 01。',
    startUnzip: '从解压开始', viewProduct: '查看商品', templateNotice: '以下说明对应原始模板。如果你已经修改过，请向 AI 发送最新文件，并重新核对相应位置。', nextLabel: '下一步：', chooseNextPrompt: '选择用于文案、图片或颜色的提示词 →', originalGuide: '阅读原始 CUSTOMISE 文档（英文）', emptyTitle: '打开你的模板专属指南', emptyBody: '在上方选择模板，然后点击“应用”。阅读指南无需登录。', purchased: '查看已购模板',
    imageAlt: name => `${name} 模板预览`, footerTitle: 'Forge Zone · 客户使用指南', support: '支持', licence: '许可', store: '返回商店',
    promptWord: 'Prompt', copyPrompt: '复制提示词', copied: '已复制 ✓', promptHint: '请附上当前文件，AI 会询问缺少的信息。', viewPrompt: '查看提示词内容', copiedStatus: '已复制。打开 AI 对话并粘贴提示词。', manualStatus: '浏览器未允许自动复制。请选择下方文字，然后按 Ctrl+C 或 ⌘C。', manualLabel: '用于手动复制的提示词内容',
    searchLabel: '你希望 AI 帮助完成什么？', searchPlaceholder: '搜索：颜色、图片、发布、修复…', resultCount: (visible, total) => `${visible} / ${total} 条提示词`, noResultTitle: '没有找到匹配的提示词', noResultBody: '请尝试更短的词，例如“图片”或“内容”。', viewAll: '查看全部提示词', tableAria: '指南表格，可横向滚动',
  },
};
