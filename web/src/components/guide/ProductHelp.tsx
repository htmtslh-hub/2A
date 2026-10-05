import type { LangCode } from '@/generated/data';
import { GUIDE_LABELS, guideHref } from '@/lib/guide-links';
import styles from './guide.module.css';

export default function ProductHelp({ lang, slug }: { lang: LangCode; slug: string }) {
  const labels = GUIDE_LABELS[lang];
  return <section className={styles.productHelp} aria-label={labels.guide}>
    <p>{labels.included}</p>
    <p>{labels.scope}</p>
    <p>{labels.flow}</p>
    <a href={guideHref(slug)}>{labels.guide} →</a>
    <a href={guideHref(slug, 'template')}>{labels.custom} →</a>
  </section>;
}
