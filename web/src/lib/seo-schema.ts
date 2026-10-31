import { COMPANY } from './company';
import { REAL_TEMPLATES } from './real-templates';
import { WEB_CATEGORY_LABELS } from './template-categories';
import { I18N, type LangCode } from '@/generated/data';
import { isFreeProduct, requiresPremium } from './product-policy';

/** Tạo bộ alternates (canonical + hreflang vi/en/zh-CN/x-default) chuẩn Google Search Central. */
export function buildAlternates(pathAndQuery: string): { canonical: string; languages: Record<'vi' | 'en' | 'zh-CN' | 'x-default', string> } {
  const base = COMPANY.siteUrl.replace(/\/$/, '');
  const clean = pathAndQuery.startsWith('/') ? pathAndQuery : `/${pathAndQuery}`;
  const sep = clean.includes('?') ? '&' : '?';
  const fullCanonical = `${base}${clean}`;
  return {
    canonical: fullCanonical,
    languages: {
      vi: `${fullCanonical}${sep}hl=vi`,
      en: `${fullCanonical}${sep}hl=en`,
      'zh-CN': `${fullCanonical}${sep}hl=zh`,
      'x-default': fullCanonical,
    },
  };
}

/** Resolve template ID (`t188`) hoặc slug (`o2-moonish-cosmic`) từ tham số `?mau=`. */
export function resolveTemplateParam(rawMau: string | null | undefined): string | null {
  if (!rawMau) return null;
  const trimmed = rawMau.trim();
  if (REAL_TEMPLATES[trimmed]) return trimmed;
  const found = Object.entries(REAL_TEMPLATES).find(([, tpl]) => tpl.slug === trimmed);
  return found ? found[0] : null;
}

/** Xây dựng cấu trúc Schema.org JSON-LD (@graph) phục vụ Google Rich Results & AI Search (GEO). */
export function buildStoreJsonLd(options: {
  lang: LangCode;
  tab?: string;
  detailId?: string | null;
}) {
  const { lang, tab = 'home', detailId } = options;
  const base = COMPANY.siteUrl.replace(/\/$/, '');
  const t = I18N[lang] ?? I18N.en;

  const orgNode = {
    '@type': 'Organization',
    '@id': `${base}/#organization`,
    name: COMPANY.brand,
    legalName: COMPANY.legalName,
    url: base,
    email: COMPANY.email,
    logo: `${base}/brand/forge-zone/web.webp`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address,
      addressCountry: 'VN',
    },
  };

  const websiteNode = {
    '@type': 'WebSite',
    '@id': `${base}/#website`,
    url: base,
    name: COMPANY.brand,
    publisher: { '@id': `${base}/#organization` },
    inLanguage: ['vi', 'en', 'zh-CN'],
  };

  const graph: Record<string, unknown>[] = [orgNode, websiteNode];

  if (detailId && REAL_TEMPLATES[detailId]) {
    const tpl = REAL_TEMPLATES[detailId];
    const copy = tpl.copy[lang] ?? tpl.copy.en ?? tpl.copy.vi;
    const catLabel = WEB_CATEGORY_LABELS[lang]?.[tpl.cat] ?? tpl.cat;
    const isFree = isFreeProduct(detailId);
    const isPrem = requiresPremium(detailId);
    const productUrl = `${base}/?mau=${detailId}`;
    const imageUrl = `${base}/previews/${tpl.slug}.webp`;

    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: COMPANY.brand,
          item: base,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: catLabel,
          item: `${base}/?tab=library`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: copy.name,
          item: productUrl,
        },
      ],
    });

    graph.push({
      '@type': 'Product',
      '@id': `${productUrl}#product`,
      name: copy.name,
      description: copy.desc,
      sku: detailId,
      mpn: tpl.slug,
      category: catLabel,
      image: [imageUrl],
      url: productUrl,
      brand: {
        '@type': 'Brand',
        name: COMPANY.brand,
      },
      keywords: (copy.tags ?? []).join(', '),
      offers: {
        '@type': 'Offer',
        url: productUrl,
        priceCurrency: 'USD',
        price: isFree ? '0.00' : '20.00',
        availability: 'https://schema.org/InStock',
        seller: { '@id': `${base}/#organization` },
        description: isFree
          ? 'Free commercial website template download'
          : isPrem
            ? 'Included with Forge Zone Premium ($10/month), Ultra ($79/year), or Ultra Lifetime ($200 one-time) membership'
            : 'One-time purchase with commercial licence',
      },
    });
  } else {
    // Trang chủ / Thư viện / Bảng giá / FAQ
    if (tab === 'home' || tab === 'faq') {
      const faqs = Array.isArray(t.faqs) ? t.faqs : [];
      if (faqs.length > 0) {
        graph.push({
          '@type': 'FAQPage',
          '@id': `${base}/${tab === 'faq' ? '?tab=faq' : ''}#faq`,
          mainEntity: faqs.map((f: { q: string; a: string }) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.a,
            },
          })),
        });
      }
    }

    if (tab === 'home' || tab === 'library') {
      const entries = Object.entries(REAL_TEMPLATES)
        .filter(([, tpl]) => !tpl.previewOnly)
        .slice(0, 24);
      graph.push({
        '@type': 'ItemList',
        '@id': `${base}/?tab=library#catalog`,
        name:
          lang === 'vi'
            ? 'Danh mục giao diện web dựng sẵn Forge Zone'
            : lang === 'zh'
              ? 'Forge Zone 现成网站模板目录'
              : 'Forge Zone Ready-Made Website Templates Catalog',
        numberOfItems: Object.keys(REAL_TEMPLATES).length,
        itemListElement: entries.map(([id, tpl], idx) => {
          const c = tpl.copy[lang] ?? tpl.copy.en;
          return {
            '@type': 'ListItem',
            position: idx + 1,
            url: `${base}/?mau=${id}`,
            name: c.name,
            image: `${base}/previews/${tpl.slug}.webp`,
          };
        }),
      });
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
