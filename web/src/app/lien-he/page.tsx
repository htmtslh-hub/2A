import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { CONTACT } from '@/lib/pages-content';
import { readLang } from '@/lib/server-lang';
import { COMPANY } from '@/lib/company';
import type { LangCode } from '@/generated/data';

export const dynamic = 'force-dynamic';

const LABELS: Record<LangCode, { email: string; address: string; phone: string; company: string }> =
  {
    vi: { email: 'Email', address: 'Địa chỉ', phone: 'Điện thoại', company: 'Đơn vị vận hành' },
    en: { email: 'Email', address: 'Address', phone: 'Phone', company: 'Operated by' },
    zh: { email: '邮箱', address: '地址', phone: '电话', company: '运营方' },
  };

export async function generateMetadata(): Promise<Metadata> {
  const doc = CONTACT[await readLang()];
  return { title: `${doc.title} — ${COMPANY.brand}`, description: doc.intro };
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
