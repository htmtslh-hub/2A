import type { Metadata } from 'next';
import AgenticSite from '@/components/AgenticSite';
import { readLang } from '@/lib/server-lang';
import { REAL_TEMPLATES } from '@/lib/real-templates';
import { WEB_CATEGORY_LABELS } from '@/lib/template-categories';
import { COMPANY } from '@/lib/company';
import { TAB_KEYS, type LangCode } from '@/generated/data';
import { buildAlternates, buildStoreJsonLd, resolveTemplateParam } from '@/lib/seo-schema';

type SearchParams = Promise<{
  tab?: string | string[];
  mau?: string | string[];
  hl?: string | string[];
  lang?: string | string[];
}>;

const TAB_META: Record<
  string,
  Record<LangCode, { title: string; description: string }>
> = {
  library: {
    vi: {
      title: 'Thư viện giao diện web dựng sẵn — Forge Zone',
      description:
        'Khám phá toàn bộ thư viện giao diện web cao cấp dựng sẵn với hiệu ứng chuyển động mượt mà, responsive 4 khung nhìn và giấy phép thương mại.',
    },
    en: {
      title: 'Ready-Made Website Templates Library — Forge Zone',
      description:
        'Browse our full library of premium ready-made website templates featuring smooth motion choreography, responsive layouts, and a commercial licence.',
    },
    zh: {
      title: '现成网站模板库 — Forge Zone',
      description:
        '浏览完整的高端现成网站模板库，包含流畅动效、响应式布局与商业授权。',
    },
  },
  process: {
    vi: {
      title: 'Quy trình sử dụng & tùy biến giao diện — Forge Zone',
      description:
        '3 bước đưa giao diện Forge Zone lên sóng: tải gói mã nguồn chuẩn HTML/CSS/JS, thay nội dung bằng AI hoặc trình sửa code, và triển khai ngay.',
    },
    en: {
      title: 'How It Works & Customization Workflow — Forge Zone',
      description:
        '3 steps to launch with Forge Zone: download clean HTML/CSS/JS source code, customize copy with AI or your code editor, and deploy anywhere.',
    },
    zh: {
      title: '使用与定制流程 — Forge Zone',
      description:
        '三步上线 Forge Zone 模板：下载纯净 HTML/CSS/JS 源码、使用 AI 或编辑器替换内容、立即部署。',
    },
  },
  pricing: {
    vi: {
      title: 'Bảng giá & Gói thành viên Premium / Ultra — Forge Zone',
      description:
        'Tải miễn phí các mẫu Free, mua lẻ từng sản phẩm hoặc nâng cấp gói Premium (500.000₫/tháng) & Ultra (5.000.000₫/năm) kèm giấy phép thương mại.',
    },
    en: {
      title: 'Pricing & Premium / Ultra Membership Plans — Forge Zone',
      description:
        'Download Free templates, buy individual products, or unlock the full library with Premium ($20/month) and Ultra ($200/year) commercial plans.',
    },
    zh: {
      title: '价格与 Premium / Ultra 会员套餐 — Forge Zone',
      description:
        '免费下载开放模板，单品购买，或订阅 Premium ($20/月) 与 Ultra ($200/年) 商业授权套餐。',
    },
  },
  faq: {
    vi: {
      title: 'Câu hỏi thường gặp (FAQ) — Forge Zone',
      description:
        'Giải đáp chi tiết về giấy phép thương mại, cách chỉnh sửa giao diện không cần biết lập trình, chính sách hoàn tiền 14 ngày và hỗ trợ kỹ thuật.',
    },
    en: {
      title: 'Frequently Asked Questions (FAQ) — Forge Zone',
      description:
        'Answers on commercial licensing, no-code AI customization, 14-day refund policy, and technical support for Forge Zone templates.',
    },
    zh: {
      title: '常见问题解答 (FAQ) — Forge Zone',
      description:
        '关于商业授权、零代码 AI 修改教程、14 天退款政策与技术支持的详细解答。',
    },
  },
};

const firstParam = (v: string | string[] | undefined): string | null =>
  Array.isArray(v) ? (v[0] ?? null) : (v ?? null);

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const [params, lang] = await Promise.all([searchParams, readLang()]);
  const detailId = resolveTemplateParam(firstParam(params.mau));
  const rawTab = firstParam(params.tab);
  const tab = rawTab && TAB_KEYS.includes(rawTab) ? rawTab : 'home';

  if (detailId && REAL_TEMPLATES[detailId]) {
    const tpl = REAL_TEMPLATES[detailId];
    const copy = tpl.copy[lang] ?? tpl.copy.en ?? tpl.copy.vi;
    const catLabel = WEB_CATEGORY_LABELS[lang]?.[tpl.cat] ?? tpl.cat;
    const title = `${copy.name} — ${catLabel} | ${COMPANY.brand}`;
    const description = copy.desc;
    const previewUrl = `/previews/${tpl.slug}.webp`;
    const canonicalPath = `/?mau=${detailId}`;

    return {
      title,
      description,
      keywords: copy.tags,
      alternates: buildAlternates(canonicalPath),
      openGraph: {
        title,
        description,
        type: 'website',
        url: `${COMPANY.siteUrl}${canonicalPath}`,
        siteName: COMPANY.brand,
        images: [
          {
            url: previewUrl,
            width: 1280,
            height: 880,
            alt: copy.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [previewUrl],
      },
    };
  }

  if (tab !== 'home' && TAB_META[tab]) {
    const m = TAB_META[tab][lang] ?? TAB_META[tab].en;
    const canonicalPath = `/?tab=${tab}`;
    return {
      title: m.title,
      description: m.description,
      alternates: buildAlternates(canonicalPath),
      openGraph: {
        title: m.title,
        description: m.description,
        type: 'website',
        url: `${COMPANY.siteUrl}${canonicalPath}`,
        siteName: COMPANY.brand,
      },
      twitter: {
        card: 'summary_large_image',
        title: m.title,
        description: m.description,
      },
    };
  }

  return {
    alternates: buildAlternates('/'),
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [params, lang] = await Promise.all([searchParams, readLang()]);
  const detailId = resolveTemplateParam(firstParam(params.mau));
  const rawTab = firstParam(params.tab);
  const tab = detailId
    ? 'detail'
    : rawTab && TAB_KEYS.includes(rawTab)
      ? rawTab
      : 'home';

  const jsonLd = buildStoreJsonLd({ lang, tab, detailId });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgenticSite
        defaultTab={tab}
        initialDetail={detailId}
        initialLang={lang}
      />
    </>
  );
}
