import type { Metadata, Viewport } from 'next';
import { Unbounded, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import { COMPANY } from '@/lib/company';
import Providers from './providers';
import { readLang } from '@/lib/server-lang';
import { HTML_LANG } from '@/lib/lang';

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

export const metadata: Metadata = {
  // Cần metadataBase thì Next mới dựng được URL tuyệt đối cho ảnh OG.
  metadataBase: new URL(COMPANY.siteUrl),
  title: 'Agentic — Giao diện web cao cấp, dựng sẵn để bán',
  description:
    'Thư viện giao diện web dựng sẵn: layout, chuyển động, responsive và nội dung mẫu. Tải về, thay chữ, lên sóng.',
  openGraph: {
    title: 'Agentic — Giao diện web cao cấp, dựng sẵn để bán',
    description:
      'Mỗi giao diện là một file hoàn chỉnh. Mua một lần, dùng vĩnh viễn, kèm giấy phép thương mại.',
    type: 'website',
    url: COMPANY.siteUrl,
    siteName: COMPANY.brand,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic — Giao diện web cao cấp, dựng sẵn để bán',
    description: 'Tải về, thay chữ, lên sóng. Giấy phép thương mại không giới hạn.',
  },
};

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
