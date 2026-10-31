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

export interface ToolHelpCopy {
  guide: string;
  included: string;
  scope: string;
  flow: string;
  custom: string;
  activateLabel?: string;
  activateHref?: string;
}

export const TOOL_GUIDE_BY_SLUG: Record<string, Record<LangCode, ToolHelpCopy>> = {
  'film-studio': {
    vi: {
      guide: 'Hướng dẫn sử dụng Film Studio Pro',
      included: 'Trong gói: Bộ phần mềm Desktop Python (11 phân hệ), MCP Server tích hợp (:3100), 4 file chạy & kết nối AI 1-Click (.bat) và tài liệu hướng dẫn.',
      scope: 'Phần mềm sản xuất phim & video AI chạy trực tiếp trên Windows 10/11, kích hoạt bản quyền theo Mã Máy (FS-XXXX-XXXX-XXXX-XXXX) đồng bộ thời hạn gói trên Web.',
      flow: 'Tải về → Giải nén → Chạy CAI_DAT_THU_VIEN.bat → Kích hoạt Mã Máy (/kich-hoat) → Chạy CHAY_FILM_STUDIO.bat & Kết nối MCP 1-Click',
      custom: 'Hướng dẫn cài đặt, kích hoạt & kết nối MCP',
      activateLabel: 'Cấp mã kích hoạt Mã Máy',
      activateHref: '/kich-hoat',
    },
    en: {
      guide: 'Film Studio Pro User Guide',
      included: 'Includes: Full Python Desktop Studio (11 modules), built-in MCP Server (:3100), 4 one-click launch & AI connector scripts (.bat), and documentation.',
      scope: 'Desktop AI video production suite for Windows 10/11, secured by Hardware Machine ID (FS-XXXX-XXXX-XXXX-XXXX) synced with your Web plan duration.',
      flow: 'Download → Unzip → Run CAI_DAT_THU_VIEN.bat → Activate Machine ID (/kich-hoat) → Launch CHAY_FILM_STUDIO.bat & 1-Click MCP',
      custom: 'Setup, Activation & MCP Connection Guide',
      activateLabel: 'Machine ID Activation Portal',
      activateHref: '/kich-hoat',
    },
    zh: {
      guide: 'Film Studio Pro 使用指南',
      included: '包含：完整 Python 桌面工作站（11 大模块）、内置 MCP 服务器 (:3100)、4 个一键启动与 AI 接入脚本 (.bat) 及说明文档。',
      scope: '运行于 Windows 10/11 的桌面端 AI 影视制作套件，采用硬件机器码 (FS-XXXX-XXXX-XXXX-XXXX) 绑定并与网站套餐时长同步。',
      flow: '下载 → 解压 → 运行 CAI_DAT_THU_VIEN.bat → 激活机器码 (/kich-hoat) → 启动 CHAY_FILM_STUDIO.bat 与一键连接 MCP',
      custom: '安装、机器码激活与 MCP 连接指南',
      activateLabel: '机器码激活中心',
      activateHref: '/kich-hoat',
    },
  },
  lingoglass: {
    vi: {
      guide: 'Hướng dẫn sử dụng LingoGlass Player',
      included: 'Trong gói: Mã nguồn ứng dụng Desktop (Electron · React · TypeScript), giao diện kính mờ đã dựng sẵn, README.md và USER_GUIDE.md.',
      scope: 'Ứng dụng máy tính học ngoại ngữ qua video & podcast (Phụ đề tương tác, lặp đoạn A-B Repeat, tra từ điển và luyện nói Shadowing) trên Windows / macOS.',
      flow: 'Tải về → Giải nén → Cài Node.js → Chạy npm install & npm run electron:dev (hoặc đóng gói bằng npm run electron:build)',
      custom: 'Hướng dẫn khởi chạy & sử dụng LingoGlass',
    },
    en: {
      guide: 'LingoGlass Player User Guide',
      included: 'Includes: Desktop app source code (Electron · React · TypeScript), pre-built glass interface, README.md, and USER_GUIDE.md.',
      scope: 'Desktop language-learning player for videos & podcasts (Interactive subtitles, A-B Repeat, dictionary lookup, and Shadowing) on Windows / macOS.',
      flow: 'Download → Unzip → Install Node.js → Run npm install & npm run electron:dev (or build installer via npm run electron:build)',
      custom: 'LingoGlass Setup & Learning Guide',
    },
    zh: {
      guide: 'LingoGlass 播放器使用指南',
      included: '包含：桌面应用完整源码（Electron · React · TypeScript）、毛玻璃界面、README.md 与 USER_GUIDE.md。',
      scope: '适用于 Windows / macOS 的视频与播客外语学习桌面应用（支持交互字幕、A-B 复读、查词与跟读练习）。',
      flow: '下载 → 解压 → 安装 Node.js → 运行 npm install 与 npm run electron:dev（或使用 npm run electron:build 打包）',
      custom: 'LingoGlass 安装与外语学习指南',
    },
  },
};

export function guideHref(slug?: string, view?: 'steps' | 'prompts' | 'template') {
  const query = new URLSearchParams();
  if (slug) query.set('template', slug);
  if (view && view !== 'steps') query.set('view', view);
  return '/huong-dan' + (query.size ? `?${query}` : '');
}
