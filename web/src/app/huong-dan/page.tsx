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
import { guideHref, TOOL_GUIDE_BY_SLUG } from '@/lib/guide-links';
import { GUIDE_COPY } from '@/lib/guide-copy';
import { readLang } from '@/lib/server-lang';
import { HTML_LANG } from '@/lib/lang';
import { buildAlternates } from '@/lib/seo-schema';

export async function generateMetadata(): Promise<Metadata> {
  const meta = GUIDE_COPY[await readLang()].meta;
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates('/huong-dan'),
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
  const isAgentTool = template?.group === 'agent';
  const viewQuery = Array.isArray(query.view) ? query.view[0] : query.view;
  const view = viewQuery === 'prompts' || viewQuery === 'template' || viewQuery === 'steps'
    ? viewQuery
    : (isAgentTool ? 'template' : 'steps');
  const templateName = template?.copy[lang].name;
  const context = templateName ? {
    vi: `Tôi đang dùng ${isAgentTool ? 'công cụ' : 'mẫu'} ${templateName} của Forge Zone. Hãy đọc các file phiên bản hiện tại tôi gửi; không giả định chúng còn giống bản gốc.`,
    en: `I am using the ${templateName} ${isAgentTool ? 'tool' : 'template'} from Forge Zone. Read the current files I send and do not assume they still match the original version.`,
    zh: `我正在使用 Forge Zone 的 ${templateName} ${isAgentTool ? '工具' : '模板'}。请读取我发送的最新文件，不要假设它们仍与原始版本相同。`,
  }[lang] : '';
  const href = (target: 'steps' | 'prompts' | 'template') => guideHref(slug, target);
  const steps = guide.sections.filter(section => section.step);
  const trouble = guide.sections.find(section => section.id === 'xu-ly-loi');
  const checklist = guide.sections.find(section => section.id === 'checklist');

  const toolHeadings = isAgentTool && slug && TEMPLATE_GUIDES[slug]
    ? Array.from(TEMPLATE_GUIDES[slug][lang].notes.matchAll(/^###\s+(.+)$/gm)).map((m, idx) => ({
        no: String(idx + 1).padStart(2, '0'),
        title: displayTitle(m[1].trim()),
      }))
    : [];

  const nav = isAgentTool && toolHeadings.length > 0 ? (
    <nav className={styles.sideLinks} aria-label={copy.routeAria}>
      {toolHeadings.map((h) => (
        <a key={h.no} href={href('template')}>
          <span className={styles.stepNo}>{h.no}</span>
          <span>{h.title}</span>
        </a>
      ))}
      {slug === 'film-studio' && (
        <Link href="/kich-hoat">
          <span className={styles.stepNo}>🔑</span>
          <span>{{ vi: 'Cấp mã kích hoạt Mã Máy', en: 'Machine ID Activation Portal', zh: '机器码激活中心' }[lang]}</span>
        </Link>
      )}
    </nav>
  ) : (
    <nav className={styles.sideLinks} aria-label={copy.routeAria}>
      {steps.map(section => <a key={section.id} href={`${href('steps')}#${section.id}`}><span className={styles.stepNo}>{String(section.step).padStart(2, '0')}</span><span>{displayTitle(section.title)}</span></a>)}
      {trouble && <a href={`${href('steps')}#xu-ly-loi`}>{trouble.title}</a>}
      {checklist && <a href={`${href('steps')}#checklist`}>{checklist.title}</a>}
    </nav>
  );

  const toolHeroCopy = isAgentTool && templateName ? {
    vi: {
      eyebrow: 'Hướng dẫn sử dụng Tool / Agent',
      first: templateName,
      second: slug === 'film-studio' ? 'Cài đặt 1-Click, Kích hoạt Mã Máy & Kết nối MCP.' : 'Cài đặt, Khởi chạy & Vận hành trên Máy tính.',
      body: (slug && TEMPLATE_GUIDES[slug]?.[lang]?.intro) || copy.heroBody,
      notice: slug && TOOL_GUIDE_BY_SLUG[slug]?.[lang]?.flow
        ? `Quy trình chuẩn: ${TOOL_GUIDE_BY_SLUG[slug][lang].flow}`
        : 'Hướng dẫn dưới đây áp dụng riêng cho bộ công cụ Desktop bạn đã chọn.',
    },
    en: {
      eyebrow: 'Tool / Agent User Guide',
      first: templateName,
      second: slug === 'film-studio' ? '1-Click Setup, Machine ID Activation & MCP Server.' : 'Desktop Setup, Launch & Workflow Guide.',
      body: (slug && TEMPLATE_GUIDES[slug]?.[lang]?.intro) || copy.heroBody,
      notice: slug && TOOL_GUIDE_BY_SLUG[slug]?.[lang]?.flow
        ? `Standard workflow: ${TOOL_GUIDE_BY_SLUG[slug][lang].flow}`
        : 'The instructions below are tailored specifically for your selected Desktop tool.',
    },
    zh: {
      eyebrow: '工具与智能体使用指南',
      first: templateName,
      second: slug === 'film-studio' ? '一键安装、机器码激活与 MCP 协议连接。' : '桌面端安装、启动与使用指南。',
      body: (slug && TEMPLATE_GUIDES[slug]?.[lang]?.intro) || copy.heroBody,
      notice: slug && TOOL_GUIDE_BY_SLUG[slug]?.[lang]?.flow
        ? `标准流程：${TOOL_GUIDE_BY_SLUG[slug][lang].flow}`
        : '以下说明专门适用于您所选的桌面端工具。',
    },
  }[lang] : null;

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: toolHeroCopy ? `${toolHeroCopy.first} — ${toolHeroCopy.second}` : `${copy.heroFirst} ${copy.heroSecond}`,
    description: toolHeroCopy ? toolHeroCopy.body : copy.heroBody,
    step: steps.map((s) => ({
      '@type': 'HowToStep',
      position: s.step,
      name: displayTitle(s.title),
      url: `https://forgezone.store/huong-dan#${s.id}`,
    })),
  };

  return <div className={styles.shell} lang={HTML_LANG[lang]}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    <a className={styles.skip} href="#noi-dung">{copy.skip}</a>
    <header className={styles.header}>
      <Link className={styles.brand} href="/">FORGE ZONE</Link>
      <nav className={styles.headerNav} aria-label={copy.navAria}>
        <Link href={isAgentTool ? '/?tab=agent' : '/?tab=library'}>{copy.library}</Link>
        <Link href="/don-hang">{copy.orders}</Link>
        <GuideLanguageSwitcher lang={lang} />
      </nav>
    </header>
    <div className={styles.hero}>
      <p className={styles.eyebrow}>{toolHeroCopy ? toolHeroCopy.eyebrow : copy.eyebrow}</p>
      <h1>{toolHeroCopy ? toolHeroCopy.first : copy.heroFirst}<br />{toolHeroCopy ? toolHeroCopy.second : copy.heroSecond}</h1>
      <p>{toolHeroCopy ? toolHeroCopy.body : copy.heroBody}</p>
    </div>
    <div className={styles.layout}>
      <aside className={styles.sidebar}><p className={styles.sidebarTitle}>{copy.routeTitle}</p>{nav}<div className={styles.support}>{copy.supportQuestion}<br /><Link href="/lien-he">{copy.supportLink}</Link></div></aside>
      <main id="noi-dung" className={styles.main}>
        {!isAgentTool && (
          <nav className={styles.tabs} aria-label={copy.tabsAria}>
            <Link href={href('steps')} aria-current={view === 'steps' ? 'page' : undefined}>{copy.stepsTab}</Link>
            <Link href={href('prompts')} aria-current={view === 'prompts' ? 'page' : undefined}>{copy.promptsTab}</Link>
            <Link href={href('template')} aria-current={view === 'template' ? 'page' : undefined}>{copy.templateTab}</Link>
          </nav>
        )}
        <details className={styles.mobileToc}><summary>{copy.mobileToc}</summary>{nav}</details>
        <form action="/huong-dan" className={styles.selector}>
          <label htmlFor="guide-template">{{ vi: 'Chọn sản phẩm (Giao diện Web hoặc Tool / Agent):', en: 'Select product (Web Template or Tool / Agent):', zh: '选择产品（网页模板或工具 / Agent）：' }[lang]}</label>
          <div className={styles.selectorRow}>
            <input type="hidden" name="view" value={view} />
            <select name="template" id="guide-template" defaultValue={slug ?? ''}><option value="">{copy.selectorGeneral}</option>{templates.map(([id, item]) => <option key={id} value={item.slug}>{item.group === 'agent' ? `[Tool/Agent] ${item.copy[lang].name}` : item.copy[lang].name}</option>)}</select>
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
          <div className={styles.resourceLinks}>
            {isAgentTool && slug === 'film-studio' ? (
              <Link className={styles.primary} href="/kich-hoat">🔑 {{ vi: 'Cấp mã kích hoạt Mã Máy (/kich-hoat)', en: 'Machine ID Activation Portal (/kich-hoat)', zh: '机器码激活中心 (/kich-hoat)' }[lang]}</Link>
            ) : !isAgentTool ? (
              <Link className={styles.primary} href={`${href('steps')}#buoc-1`}>{copy.startUnzip}</Link>
            ) : null}
            <Link className={styles.secondary} href={`/?mau=${selected![0]}`}>{copy.viewProduct}</Link>
          </div>
          <div className={styles.notice}>{toolHeroCopy ? toolHeroCopy.notice : copy.templateNotice}</div>
          <GuideMarkdown source={TEMPLATE_GUIDES[slug][lang].notes} lang={lang} />
          {!isAgentTool && (
            <>
              <PromptBox prompt={guide.prompts[0]} context={context} lang={lang} />
              <p className={styles.muted}>{copy.nextLabel} <Link href={href('prompts')}>{copy.chooseNextPrompt}</Link></p>
            </>
          )}
          {slug in data.templates && <details className={styles.original}><summary>{copy.originalGuide}</summary><div lang="en"><GuideMarkdown source={data.templates[slug as keyof typeof data.templates]} lang="en" /></div></details>}
        </section> : <section className={styles.empty}><h2 className={styles.panelTitle}>{copy.emptyTitle}</h2><p>{copy.emptyBody}</p><Link className={styles.secondary} href="/don-hang">{copy.purchased}</Link></section>)}
      </main>
    </div>
    <footer className={styles.footer}><span>{copy.footerTitle}</span><div><Link href="/lien-he">{copy.support}</Link> · <Link href="/giay-phep">{copy.licence}</Link> · <Link href="/">{copy.store}</Link></div></footer>
  </div>;
}
