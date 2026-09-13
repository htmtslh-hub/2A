import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/company';
import { LEGAL_PATHS, PAGE_PATHS } from '@/lib/legal';
import { TAB_KEYS, TPL_META } from '@/generated/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.siteUrl.replace(/\/$/, '');
  const now = new Date();

  // Các tab của trang chủ là state chứ không phải route riêng, nhưng mỗi tab
  // có URL chia sẻ được (?tab=…) nên vẫn nên khai để công cụ tìm kiếm biết.
  const tabs = TAB_KEYS.filter((k: string) => k !== 'home').map((k: string) => ({
    url: `${base}/?tab=${k}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const templates = TPL_META.map((m: { id: string }) => ({
    url: `${base}/?mau=${m.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const staticPages = [PAGE_PATHS.about, PAGE_PATHS.contact, ...Object.values(LEGAL_PATHS)].map(
    (p) => ({
      url: `${base}${p}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })
  );

  // Trang dịch vụ và case study không khai ở đây: chúng thuộc web riêng
  // dichvu.forgezone.store, còn forgezone.store chỉ bán template.
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...tabs,
    ...templates,
    ...staticPages,
  ];
}
