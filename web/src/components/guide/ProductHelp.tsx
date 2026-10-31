import type { LangCode } from '@/generated/data';
import { GUIDE_LABELS, TOOL_GUIDE_LABELS, guideHref } from '@/lib/guide-links';
import { REAL_TEMPLATES } from '@/lib/real-templates';
import styles from './guide.module.css';

export default function ProductHelp({ lang, slug }: { lang: LangCode; slug: string }) {
  const isAgentTool = Object.values(REAL_TEMPLATES).some((tpl) => tpl.slug === slug && tpl.group === 'agent');
  if (isAgentTool) {
    const labels = TOOL_GUIDE_LABELS[lang];
    return (
      <section className={styles.productHelp} aria-label={labels.guide}>
        <p>{labels.included}</p>
        <p>{labels.scope}</p>
        <p>{labels.flow}</p>
        <a href="/kich-hoat">🔑 {labels.activate} →</a>
        <a href={guideHref(slug, 'template')}>{labels.custom} →</a>
      </section>
    );
  }
  const labels = GUIDE_LABELS[lang];
  return (
    <section className={styles.productHelp} aria-label={labels.guide}>
      <p>{labels.included}</p>
      <p>{labels.scope}</p>
      <p>{labels.flow}</p>
      <a href={guideHref(slug)}>{labels.guide} →</a>
      <a href={guideHref(slug, 'template')}>{labels.custom} →</a>
    </section>
  );
}
