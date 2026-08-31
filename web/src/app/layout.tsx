import type { Metadata, Viewport } from 'next';
import { Unbounded, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const display = Unbounded({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const body = Be_Vietnam_Pro({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Agentic — Giao diện web cao cấp, dựng sẵn để bán',
  description:
    'Thư viện giao diện web dựng sẵn: layout, chuyển động, responsive và nội dung mẫu. Tải về, thay chữ, lên sóng.',
  openGraph: {
    title: 'Agentic — Giao diện web cao cấp, dựng sẵn để bán',
    description:
      'Mỗi giao diện là một file hoàn chỉnh. Mua một lần, dùng vĩnh viễn, kèm giấy phép thương mại.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#16181c',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
