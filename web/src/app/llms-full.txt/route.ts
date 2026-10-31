import { NextResponse } from 'next/server';
import { COMPANY } from '@/lib/company';
import { REAL_TEMPLATES } from '@/lib/real-templates';
import { WEB_CATEGORY_LABELS } from '@/lib/template-categories';
import { isFreeProduct, requiresPremium } from '@/lib/product-policy';

export function GET() {
  const base = COMPANY.siteUrl.replace(/\/$/, '');
  const entries = Object.entries(REAL_TEMPLATES).filter(([, tpl]) => !tpl.previewOnly);

  const catalogLines = entries.map(([id, tpl], idx) => {
    const en = tpl.copy.en ?? tpl.copy.vi;
    const vi = tpl.copy.vi ?? en;
    const catEn = WEB_CATEGORY_LABELS.en[tpl.cat] ?? tpl.cat;
    const catVi = WEB_CATEGORY_LABELS.vi[tpl.cat] ?? tpl.cat;
    const tier = isFreeProduct(id)
      ? 'Free ($0 / 0 VND — instant download)'
      : requiresPremium(id)
        ? 'Premium (Included in Premium $10/mo, Ultra $79/yr, or Ultra Lifetime $200)'
        : 'Single Purchase ($20 USD / 500,000 VND)';

    return `### ${idx + 1}. ${en.name} (\`${id}\` / \`${tpl.slug}\`)
- **Category:** ${catEn} (${catVi})
- **Tier & Pricing:** ${tier}
- **Product URL:** ${base}/?mau=${id}
- **Live Interactive Demo:** ${base}/demos/${tpl.slug}/index.html
- **Preview Image:** ${base}/previews/${tpl.slug}.webp
- **Tags:** ${(en.tags ?? []).join(', ')}
- **Description (EN):** ${en.desc}
- **Description (VI):** ${vi.desc}`;
  });

  const body = `# ${COMPANY.brand} — Full Product Catalog & Technical Reference (${base})

> Complete machine-readable catalog of all ${entries.length} ready-made website templates and digital products available on ${COMPANY.brand}. Updated automatically from the live storefront registry.

- **Storefront:** ${base}
- **Pricing Details:** ${base}/pricing.md
- **Summary Index:** ${base}/llms.txt

---

## Complete Template Catalog (${entries.length} Products)

${catalogLines.join('\n\n')}
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
