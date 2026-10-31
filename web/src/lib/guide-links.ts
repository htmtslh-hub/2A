import type { LangCode } from '@/generated/data';

export const GUIDE_LABELS: Record<LangCode, { guide: string; start: string; included: string; scope: string; flow: string; custom: string }> = {
  vi: {
    guide: 'Hướng dẫn sử dụng', start: 'Bắt đầu sử dụng',
    included: 'Trong gói: HTML, CSS, JavaScript, hướng dẫn chỉnh sửa và giấy phép thương mại.',
    scope: 'Giao diện web tĩnh. Không bao gồm backend, thanh toán hay hệ thống gửi form.',
    flow: 'Tải về → Giải nén → Thay nội dung → Xuất bản', custom: 'Hướng dẫn riêng của mẫu',
  },
  en: {
    guide: 'User guide', start: 'Get started',
    included: 'Includes HTML, CSS, JavaScript, customisation instructions and a commercial licence.',
    scope: 'Static website template. Backend, payments and form submission systems are not included.',
    flow: 'Download → Unzip → Customise → Publish', custom: 'Template guide',
  },
  zh: {
    guide: '使用指南', start: '开始使用',
    included: '包含 HTML、CSS、JavaScript、自定义说明和商业许可。',
    scope: '静态网站模板，不包含后端、支付或表单提交系统。',
    flow: '下载 → 解压 → 修改内容 → 发布', custom: '模板指南',
  },
};

export const TOOL_GUIDE_LABELS: Record<LangCode, { guide: string; activate: string; included: string; scope: string; flow: string; custom: string }> = {
  vi: {
    guide: 'Hướng dẫn sử dụng',
    activate: 'Cấp mã kích hoạt Mã Máy',
    included: 'Trong gói: Bộ phần mềm Desktop đầy đủ, MCP Server tích hợp, kịch bản chạy 1-Click (.bat) và tài liệu hướng dẫn.',
    scope: 'Phần mềm công cụ (Tool / Agent) chạy trực tiếp trên máy tính, kích hoạt bản quyền theo Mã Máy.',
    flow: 'Tải về → Giải nén → Kích hoạt Mã Máy (/kich-hoat) → Chạy Tool & Kết nối MCP',
    custom: 'Hướng dẫn cài đặt & sử dụng Tool',
  },
  en: {
    guide: 'User guide',
    activate: 'Machine ID Activation Portal',
    included: 'Includes full Desktop software suite, built-in MCP Server, 1-click launchers (.bat) and documentation.',
    scope: 'Desktop software tool & automation agent running locally on your machine with Hardware Machine ID activation.',
    flow: 'Download → Unzip → Activate Machine ID (/kich-hoat) → Launch Tool & Connect MCP',
    custom: 'Tool setup & usage guide',
  },
  zh: {
    guide: '使用指南',
    activate: '机器码激活中心',
    included: '包含完整桌面端软件套件、内置 MCP 服务器、一键启动脚本 (.bat) 与使用文档。',
    scope: '在本地电脑运行的桌面软件工具与自动化智能体，支持硬件机器码绑定激活。',
    flow: '下载 → 解压 → 激活机器码 (/kich-hoat) → 启动工具与连接 MCP',
    custom: '工具安装与使用指南',
  },
};

export function guideHref(slug?: string, view?: 'steps' | 'prompts' | 'template') {
  const query = new URLSearchParams();
  if (slug) query.set('template', slug);
  if (view && view !== 'steps') query.set('view', view);
  return '/huong-dan' + (query.size ? `?${query}` : '');
}
