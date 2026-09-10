import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { LEGAL } from '@/lib/legal';
import { readLang } from '@/lib/server-lang';
import { COMPANY } from '@/lib/company';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const doc = LEGAL[await readLang()].privacy;
  return { title: `${doc.title} — ${COMPANY.brand}`, description: doc.intro };
}

export default async function Page() {
  const lang = await readLang();
  const doc = LEGAL[lang].privacy;
  return <LegalPage lang={lang} title={doc.title} intro={doc.intro} sections={doc.sections} />;
}
