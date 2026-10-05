import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import data from '@/content/customer-guide.json';
import GuideLanguageSwitcher from '@/components/guide/GuideLanguageSwitcher';
import GuideMarkdown from '@/components/guide/GuideMarkdown';
import PromptLibrary from '@/components/guide/PromptLibrary';
import PromptBox from '@/components/guide/PromptBox';
import styles from '@/components/guide/guide.module.css';
import { REAL_TEMPLATES } from '@/lib/real-templates';
import { TEMPLATE_GUIDES } from '@/lib/template-guides';
import { guideHref } from '@/lib/guide-links';
import { GUIDE_COPY } from '@/lib/guide-copy';
import { readLang } from '@/lib/server-lang';
import { HTML_LANG } from '@/lib/lang';

export async function generateMetadata(): Promise<Metadata> {
  const meta = GUIDE_COPY[await readLang()].meta;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: '/huong-dan' },
    openGraph: { title: meta.ogTitle, description: meta.ogDescription, url: '/huong-dan', locale: meta.locale },
  };
}

type Query = { template?: string | string[]; view?: string | string[] };

const displayTitle = (title: string) => title.replace(/^(?:Bước|Step|步骤)\s*\d+\s*·\s*/, '');

export default async function GuidePage({ searchParams }: { searchParams: Promise<Query> }) {
  const [query, lang] = await Promise.all([searchParams, readLang()]);
  const copy = GUIDE_COPY[lang];
  const guide = data.locales[lang];
  const templates = Object.entries(REAL_TEMPLATES);
  const templateQuery = Array.isArray(query.template) ? query.template[0] : query.template;
  const selected = templates.find(([, item]) => item.slug === templateQuery);
  const slug = selected?.[1].slug;
  const template = selected?.[1];
  const viewQuery = Array.isArray(query.view) ? query.view[0] : query.view;
  const view = viewQuery === 'prompts' || viewQuery === 'template' ? viewQuery : 'steps';
  const templateName = template?.copy[lang].name;
  const context = templateName ? {
    vi: `Tôi đang dùng mẫu ${templateName} của Forge Zone. Hãy đọc các file phiên bản hiện tại tôi gửi; không giả định chúng còn giống bản demo gốc.`,
    en: `I am using the ${templateName} template from Forge Zone. Read the current files I send and do not assume they still match the original demo.`,
    zh: `我正在使用 Forge Zone 的 ${templateName} 模板。请读取我发送的最新文件，不要假设它们仍与原始演示版相同。`,
  }[lang] : '';
  const href = (target: 'steps' | 'prompts' | 'template') => guideHref(slug, target);
  const steps = guide.sections.filter(section => section.step);
  const trouble = guide.sections.find(section => section.id === 'xu-ly-loi');
  const checklist = guide.sections.find(section => section.id === 'checklist');
  const nav = <nav className={styles.sideLinks} aria-label={copy.routeAria}>
    {steps.map(section => <a key={section.id} href={`${href('steps')}#${section.id}`}><span className={styles.stepNo}>{String(section.step).padStart(2, '0')}</span><span>{displayTitle(section.title)}</span></a>)}
    {trouble && <a href={`${href('steps')}#xu-ly-loi`}>{trouble.title}</a>}
    {checklist && <a href={`${href('steps')}#checklist`}>{checklist.title}</a>}
  </nav>;

  return <div className={styles.shell} lang={HTML_LANG[lang]}>
    <a className={styles.skip} href="#noi-dung">{copy.skip}</a>
    <header className={styles.header}>
      <Link className={styles.brand} href="/">FORGE ZONE</Link>
      <nav className={styles.headerNav} aria-label={copy.navAria}>
        <Link href="/?tab=library">{copy.library}</Link>
        <Link href="/don-hang">{copy.orders}</Link>
        <GuideLanguageSwitcher lang={lang} />
      </nav>
    </header>
    <div className={styles.hero}>
      <p className={styles.eyebrow}>{copy.eyebrow}</p>
      <h1>{copy.heroFirst}<br />{copy.heroSecond}</h1>
      <p>{copy.heroBody}</p>
    </div>
    <div className={styles.layout}>
      <aside className={styles.sidebar}><p className={styles.sidebarTitle}>{copy.routeTitle}</p>{nav}<div className={styles.support}>{copy.supportQuestion}<br /><Link href="/lien-he">{copy.supportLink}</Link></div></aside>
      <main id="noi-dung" className={styles.main}>
        <nav className={styles.tabs} aria-label={copy.tabsAria}>
          <Link href={href('steps')} aria-current={view === 'steps' ? 'page' : undefined}>{copy.stepsTab}</Link>
          <Link href={href('prompts')} aria-current={view === 'prompts' ? 'page' : undefined}>{copy.promptsTab}</Link>
          <Link href={href('template')} aria-current={view === 'template' ? 'page' : undefined}>{copy.templateTab}</Link>
        </nav>
        <details className={styles.mobileToc}><summary>{copy.mobileToc}</summary>{nav}</details>
        <form action="/huong-dan" className={styles.selector}>
          <label htmlFor="guide-template">{copy.selectorLabel}</label>
          <div className={styles.selectorRow}>
            <input type="hidden" name="view" value={view} />
            <select name="template" id="guide-template" defaultValue={slug ?? ''}><option value="">{copy.selectorGeneral}</option>{templates.map(([id, item]) => <option key={id} value={item.slug}>{item.copy[lang].name}</option>)}</select>
            <button type="submit" className={styles.secondary}>{copy.apply}</button>
          </div>
          <p>{templateName ? copy.selected(templateName) : copy.selectorHint}</p>
          {templateQuery && !template && <p role="status">{copy.unknownTemplate}</p>}
        </form>

        {view === 'steps' && <article className={styles.article}>
          {guide.sections.map(section => <section key={section.id} id={section.id} className={styles.section}>
            {section.step && <span className={styles.sectionLabel}>{copy.stepLabel(section.step)}</span>}
            <h2>{displayTitle(section.title)}</h2>
            <GuideMarkdown source={section.body} prompts={guide.prompts} context={context} lang={lang} />
          </section>)}
        </article>}

        {view === 'prompts' && <section>
          <h2 className={styles.panelTitle}>{copy.promptHeading}</h2>
          <p className={styles.muted}>{copy.promptIntro}</p>
          <div className={styles.notice}>{copy.promptNotice}</div>
          <PromptLibrary prompts={guide.prompts} context={context} lang={lang} />
        </section>}

        {view === 'template' && (template && slug && TEMPLATE_GUIDES[slug] ? <section>
          <div className={styles.templateIntro}><Image src={`/previews/${slug}.webp`} alt={copy.imageAlt(templateName!)} width={698} height={524} /><div><h2>{templateName}</h2><p>{TEMPLATE_GUIDES[slug][lang].intro}</p></div></div>
          <div className={styles.resourceLinks}><Link className={styles.primary} href={`${href('steps')}#buoc-1`}>{copy.startUnzip}</Link><Link className={styles.secondary} href={`/?mau=${selected![0]}`}>{copy.viewProduct}</Link></div>
          <div className={styles.notice}>{copy.templateNotice}</div>
          <GuideMarkdown source={TEMPLATE_GUIDES[slug][lang].notes} lang={lang} />
          <PromptBox prompt={guide.prompts[0]} context={context} lang={lang} />
          <p className={styles.muted}>{copy.nextLabel} <Link href={href('prompts')}>{copy.chooseNextPrompt}</Link></p>
          {slug in data.templates && <details className={styles.original}><summary>{copy.originalGuide}</summary><div lang="en"><GuideMarkdown source={data.templates[slug as keyof typeof data.templates]} lang="en" /></div></details>}
        </section> : <section className={styles.empty}><h2 className={styles.panelTitle}>{copy.emptyTitle}</h2><p>{copy.emptyBody}</p><Link className={styles.secondary} href="/don-hang">{copy.purchased}</Link></section>)}
      </main>
    </div>
    <footer className={styles.footer}><span>{copy.footerTitle}</span><div><Link href="/lien-he">{copy.support}</Link> · <Link href="/giay-phep">{copy.licence}</Link> · <Link href="/">{copy.store}</Link></div></footer>
  </div>;
}
