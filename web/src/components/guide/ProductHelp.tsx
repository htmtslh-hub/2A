import type { LangCode } from '@/generated/data';
import { GUIDE_LABELS, TOOL_GUIDE_BY_SLUG, guideHref } from '@/lib/guide-links';
import { REAL_TEMPLATES } from '@/lib/real-templates';
import styles from './guide.module.css';

export default function ProductHelp({ lang, slug }: { lang: LangCode; slug: string }) {
  const toolCopy = TOOL_GUIDE_BY_SLUG[slug]?.[lang];
  const isAgentTool = Boolean(toolCopy) || Object.values(REAL_TEMPLATES).some((tpl) => tpl.slug === slug && tpl.group === 'agent');
  if (isAgentTool) {
    const labels = toolCopy ?? TOOL_GUIDE_BY_SLUG['film-studio'][lang];
    return (
      <section className={styles.productHelp} aria-label={labels.guide}>
        <p>{labels.included}</p>
        <p>{labels.scope}</p>
        <p>{labels.flow}</p>
        {labels.activateHref && labels.activateLabel && (
          <a href={labels.activateHref}>🔑 {labels.activateLabel} →</a>
        )}
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
