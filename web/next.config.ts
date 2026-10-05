import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Old bookmarks must load the current demo while preserving motion choices.
    return ['/demos/auralis', '/demos/auralis/index.html'].map(source => ({
      source,
      missing: [{ type: 'query' as const, key: 'v', value: '1\\.2\\.4' }],
      destination: '/demos/auralis/index.html?v=1.2.4',
      permanent: false,
    }));
  },
  async headers() {
    return [
      {
        source: '/demos/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/demos/vybe/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'X-Vybe-Version', value: '1.0.2' },
        ],
      },
      {
        source: '/demos/vybe',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'X-Vybe-Version', value: '1.0.2' },
        ],
      },
      {
        source: '/demos/auralis/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'X-Auralis-Version', value: '1.2.4' },
        ],
      },
    ];
  },
  /* File giao diện bán cho khách nằm ngoài public/ và chỉ được đọc lúc chạy,
     bằng đường dẫn ghép từ biến. Next dò phụ thuộc bằng cách đọc mã nguồn
     tĩnh nên không thấy chúng, và hàm /api/download sẽ được triển khai mà
     không có file nào — khách trả tiền xong bấm link tải là 404.
     Dòng dưới bắt Next mang theo cả thư mục. */
  outputFileTracingIncludes: {
    '/api/download': ['./product/giao-dien-web/*/*.zip'],
  },
};

export default nextConfig;
