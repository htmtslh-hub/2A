import type { Metadata, Viewport } from 'next';
import { Unbounded, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import { COMPANY } from '@/lib/company';
import Providers from './providers';
import { readLang } from '@/lib/server-lang';
import { HTML_LANG } from '@/lib/lang';
import type { LangCode } from '@/generated/data';

// Chỉ nạp đúng những weight và bảng chữ trang thực sự dùng. Mỗi weight ×
// mỗi subset là một file .woff2 riêng, nên thừa một dòng ở đây là thừa vài
// chục KB ở mọi lần khách vào trang lần đầu.
const display = Unbounded({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const META: Record<LangCode, { title: string; description: string; og: string; short: string }> = {
  vi: {
    title: 'Forge Zone — Giao diện web cao cấp, dựng sẵn để bán',
    description:
      'Thư viện giao diện web dựng sẵn: layout, chuyển động, responsive và nội dung mẫu. Tải về, thay chữ, lên sóng.',
    og: 'Mỗi giao diện là một file hoàn chỉnh. Mua một lần, dùng vĩnh viễn, kèm giấy phép thương mại.',
    short: 'Tải về, thay chữ, lên sóng. Giấy phép thương mại không giới hạn.',
  },
  en: {
    title: 'Forge Zone — Premium ready-made website templates',
    description:
      'A library of ready-made website templates: layout, motion, responsive design and sample content. Download, change the words, go live.',
    og: 'Each template is a complete file. Buy once, use forever, with a commercial licence.',
    short: 'Download, change the words, go live. Unlimited commercial licence.',
  },
  zh: {
    title: 'Forge Zone — 高端现成网站模板',
    description: '现成网站模板库：布局、动效、响应式设计与示例内容。下载、替换文字，即可上线。',
    og: '每个模板都是完整文件。一次购买，永久使用，附商业许可。',
    short: '下载、替换文字，即可上线。无限商业许可。',
  },
};

// Theo ngôn ngữ khách đang xem. Để cứng tiếng Việt thì trang chủ đã hiện tiếng
// Anh mà thẻ trình duyệt vẫn ghi tiếng Việt — người duyệt Paddle thấy ngay.
export async function generateMetadata(): Promise<Metadata> {
  const m = META[await readLang()];
  return {
    // Cần metadataBase thì Next mới dựng được URL tuyệt đối cho ảnh OG.
    metadataBase: new URL(COMPANY.siteUrl),
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.og,
      type: 'website',
      url: COMPANY.siteUrl,
      siteName: COMPANY.brand,
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.short,
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#16181c',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Trình đọc màn hình chọn giọng theo thuộc tính này, nên nó phải đi theo
  // ngôn ngữ khách đang xem chứ không được để cứng tiếng Việt.
  const lang = HTML_LANG[await readLang()];
  return (
    <html lang={lang} data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
