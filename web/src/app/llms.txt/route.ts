import { NextResponse } from 'next/server';
import { COMPANY } from '@/lib/company';
import { REAL_TEMPLATES } from '@/lib/real-templates';
import { WEB_CATEGORY_KEYS, WEB_CATEGORY_LABELS } from '@/lib/template-categories';
import { isFreeProduct } from '@/lib/product-policy';

export function GET() {
  const base = COMPANY.siteUrl.replace(/\/$/, '');
  const entries = Object.entries(REAL_TEMPLATES).filter(([, tpl]) => !tpl.previewOnly);
  const freeCount = entries.filter(([id]) => isFreeProduct(id)).length;
  const premiumCount = entries.length - freeCount;

  const byCategory = WEB_CATEGORY_KEYS.map((cat) => {
    const label = WEB_CATEGORY_LABELS.en[cat] ?? cat;
    const items = entries.filter(([, tpl]) => tpl.cat === cat).slice(0, 8);
    const lines = items.map(([id, tpl]) => {
      const c = tpl.copy.en ?? tpl.copy.vi;
      const tier = isFreeProduct(id) ? 'Free' : 'Premium';
      return `- [${c.name}](${base}/?mau=${id}) ([Live Demo](${base}/demos/${tpl.slug}/index.html)) [${tier}]: ${c.desc}`;
    });
    return `### ${label}\n${lines.join('\n')}`;
  }).join('\n\n');

  const body = `# ${COMPANY.brand} (${base})

> ${COMPANY.brand} is a digital storefront offering ${entries.length}+ ready-made, high-craft website templates (HTML5, CSS3, Vanilla ES6+ JavaScript, 3D/GSAP/Scroll animations) and digital tools with an unlimited commercial licence. Download, customize with AI or any code editor, and launch immediately.

## Key Facts & Summary
- **Website:** ${base}
- **Languages Supported:** Vietnamese (\`?hl=vi\`), English (\`?hl=en\`), Simplified Chinese (\`?hl=zh\`)
- **Total Ready-Made Templates:** ${entries.length} (${freeCount} Free downloads, ${premiumCount} Premium/Commercial templates)
- **Tech Stack of Templates:** Zero-build dependency-free HTML5, CSS3 (\`@property\`, Grid/Flexbox, \`clamp()\`), Vanilla JS (\`requestAnimationFrame\`, \`IntersectionObserver\`), verified across 4 viewports (1440px, 1024px, 768px, 375px).
- **Refund Policy:** ${COMPANY.refundDays}-day refund policy (${base}/hoan-tien)
- **Support & Legal Contact:** ${COMPANY.email} (${COMPANY.legalName}, ${COMPANY.address}, ${COMPANY.country})

## Core Documentation & Machine-Readable Endpoints
- [Full Product Catalog for LLMs (All ${entries.length} Templates)](${base}/llms-full.txt)
- [Structured Pricing & Licensing Guide](${base}/pricing.md)
- [Template Library](${base}/?tab=library)
- [Customization Workflow (3 Steps)](${base}/?tab=process)
- [Pricing & Membership Plans](${base}/?tab=pricing)
- [Frequently Asked Questions (FAQ)](${base}/?tab=faq)
- [Customer Guide & AI Prompts](${base}/huong-dan)
- [Commercial Licence Terms](${base}/giay-phep)
- [Terms of Service](${base}/dieu-khoan)
- [Privacy Policy](${base}/bao-mat)

## Featured Templates by Category
${byCategory}
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
