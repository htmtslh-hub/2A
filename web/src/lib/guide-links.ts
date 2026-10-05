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

export function guideHref(slug?: string, view?: 'steps' | 'prompts' | 'template') {
  const query = new URLSearchParams();
  if (slug) query.set('template', slug);
  if (view && view !== 'steps') query.set('view', view);
  return '/huong-dan' + (query.size ? `?${query}` : '');
}
