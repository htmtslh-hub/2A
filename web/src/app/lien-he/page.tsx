import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { CONTACT } from '@/lib/pages-content';
import { readLang } from '@/lib/server-lang';
import { COMPANY } from '@/lib/company';
import { buildAlternates } from '@/lib/seo-schema';
import { ZaloIcon } from '@/components/ZaloSupportButton';
import type { LangCode } from '@/generated/data';

export const dynamic = 'force-dynamic';

const LABELS: Record<LangCode, { zalo: string; zaloAction: string; email: string; address: string; phone: string; company: string }> =
  {
    vi: { zalo: 'Nhóm CSKH Zalo', zaloAction: 'Tham gia nhóm Zalo hỗ trợ trực tiếp 24/7 →', email: 'Email', address: 'Địa chỉ', phone: 'Điện thoại', company: 'Đơn vị vận hành' },
    en: { zalo: 'Zalo Support Group', zaloAction: 'Join 24/7 Zalo Customer Support Group →', email: 'Email', address: 'Address', phone: 'Phone', company: 'Operated by' },
    zh: { zalo: 'Zalo 客服群', zaloAction: '加入 7×24 Zalo 官方客服支持群 →', email: '邮箱', address: '地址', phone: '电话', company: '运营方' },
  };

export async function generateMetadata(): Promise<Metadata> {
  const doc = CONTACT[await readLang()];
  return { title: `${doc.title} — ${COMPANY.brand}`, description: doc.intro, alternates: buildAlternates('/lien-he') };
}

export default async function Page() {
  const lang = await readLang();
  const doc = CONTACT[lang];
  const L = LABELS[lang];

  const row = (label: string, value: React.ReactNode) => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        padding: '14px 0',
        borderBottom: '1px solid rgba(236,238,241,.08)',
      }}
    >
      <span style={{ minWidth: 140, fontSize: 13, color: '#6f767f' }}>{label}</span>
      <span style={{ flex: 1, minWidth: 200, fontSize: 15, color: '#c3c9d1' }}>{value}</span>
    </div>
  );

  return (
    <LegalPage
      lang={lang}
      title={doc.title}
      intro={doc.intro}
      sections={doc.sections}
      showUpdated={false}
    >
      <section
        style={{
          marginTop: 8,
          padding: '10px 24px 22px',
          borderRadius: 20,
          background:
            'linear-gradient(152deg, rgba(255,255,255,.09) 0%, rgba(255,255,255,.04) 100%)',
          border: '1px solid rgba(236,238,241,.14)',
        }}
      >
        {row(
          L.zalo,
          <a
            href={COMPANY.zaloGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              color: '#68b5ff',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                width: 26,
                height: 26,
                borderRadius: 8,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <ZaloIcon size={26} />
            </span>
            <span>{L.zaloAction}</span>
          </a>
        )}
        {row(
          L.email,
          <a href={`mailto:${COMPANY.email}`} style={{ color: '#fff' }}>
            {COMPANY.email}
          </a>
        )}
        {COMPANY.phone ? row(L.phone, COMPANY.phone) : null}
        {row(L.company, COMPANY.legalName)}
        {row(L.address, `${COMPANY.address}, ${COMPANY.country}`)}
      </section>
    </LegalPage>
  );
}
