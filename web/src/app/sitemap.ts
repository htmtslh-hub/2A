import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/company';
import { LEGAL_PATHS, PAGE_PATHS } from '@/lib/legal';
import { TAB_KEYS } from '@/generated/data';
import { REAL_TEMPLATES } from '@/lib/real-templates';
import { buildAlternates } from '@/lib/seo-schema';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.siteUrl.replace(/\/$/, '');
  const now = new Date();

  const withLangs = (pathAndQuery: string) => ({
    languages: buildAlternates(pathAndQuery).languages,
  });

  // Các tab của trang chủ là state chứ không phải route riêng, nhưng mỗi tab
  // có URL chia sẻ được (?tab=…) và được SSR riêng trên server.
  const tabs = TAB_KEYS.filter((k: string) => k !== 'home').map((k: string) => {
    const pq = `/?tab=${k}`;
    return {
      url: `${base}${pq}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: withLangs(pq),
    };
  });

  const templates = Object.keys(REAL_TEMPLATES).map((id) => {
    const pq = `/?mau=${id}`;
    return {
      url: `${base}${pq}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: withLangs(pq),
    };
  });

  const staticPages = ['/huong-dan', PAGE_PATHS.about, PAGE_PATHS.contact, ...Object.values(LEGAL_PATHS)].map(
    (p) => ({
      url: `${base}${p}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
      alternates: withLangs(p),
    })
  );

  // Các tệp chuẩn hóa GEO / AI-SEO dành cho LLM & AI Agents (ChatGPT, Perplexity, Claude)
  const aiGeoFiles = ['/llms.txt', '/llms-full.txt', '/pricing.md'].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  // Trang dịch vụ và case study không khai ở đây: chúng thuộc web riêng
  // dichvu.forgezone.store, còn forgezone.store chỉ bán template.
  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
      alternates: withLangs('/'),
    },
    ...tabs,
    ...templates,
    ...staticPages,
    ...aiGeoFiles,
  ];
}
