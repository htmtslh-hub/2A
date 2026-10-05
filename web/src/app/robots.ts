import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/company';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Những đường dẫn chỉ có nghĩa với người đã đăng nhập hoặc đang thanh
      // toán — không có nội dung để lập chỉ mục, và không nên lộ ra tìm kiếm.
      disallow: [
        '/api/',
        '/don-hang',
        '/dat-lai-mat-khau',
        '/thanh-toan/',
        '/dich-vu',
        '/du-an',
      ],
    },
    sitemap: `${COMPANY.siteUrl}/sitemap.xml`,
  };
}
