import { Fragment, type ReactNode } from 'react';
import type { LangCode } from '@/generated/data';
import { GUIDE_COPY } from '@/lib/guide-copy';
import PromptBox, { type Prompt } from './PromptBox';
import styles from './guide.module.css';

// Deliberately small renderer for our checked-in customer documents. Raw HTML is
// always escaped by React, and links are limited to web URLs and local anchors.
function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^\s)]+\))/g).map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link && /^(https?:\/\/|#|\/(?!\/))/.test(link[2])) return <a key={i} href={link[2]}>{link[1]}</a>;
    return part;
  });
}

export default function GuideMarkdown({ source, prompts = [], context = '', lang }: { source: string; prompts?: Prompt[]; context?: string; lang: LangCode }) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const nodes: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || /^---+$/.test(line)) { i++; continue; }
    const prompt = line.match(/^@@(prompt-\d+)@@$/);
    if (prompt) {
      const item = prompts.find(p => p.id === prompt[1]);
      if (item) nodes.push(<PromptBox key={i} prompt={item} context={context} lang={lang} />);
      i++; continue;
    }
    if (line.startsWith('```')) {
      const key = i++;
      const code = [];
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]);
      i++;
      nodes.push(<pre key={key} className={styles.code}><code>{code.join('\n')}</code></pre>);
      continue;
    }
    if (/^#{1,4} /.test(line)) {
      nodes.push(<h3 key={i}>{inline(line.replace(/^#+ /, ''))}</h3>); i++; continue;
    }
    if (line.startsWith('|')) {
      const key = i;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        const row = lines[i++].split('|').slice(1, -1).map(s => s.trim());
        if (!row.every(s => /^:?-+:?$/.test(s))) rows.push(row);
      }
      nodes.push(<div key={key} className={styles.tableWrap} tabIndex={0} role="region" aria-label={GUIDE_COPY[lang].tableAria}><table><thead><tr>{rows[0]?.map((cell, j) => <th key={j} scope="col">{inline(cell)}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }
    if (/^(\d+\. |- )/.test(line)) {
      const ordered = /^\d+\./.test(line);
      const key = i;
      const items = [];
      const pattern = ordered ? /^\d+\. / : /^- /;
      while (i < lines.length && pattern.test(lines[i])) {
        let item = lines[i++].replace(pattern, '');
        while (i < lines.length && /^ {2,}\S/.test(lines[i])) item += ` ${lines[i++].trim()}`;
        items.push(<li key={i}>{inline(item.replace(/^\[ \] /, ''))}</li>);
      }
      nodes.push(ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>);
      continue;
    }
    const key = i;
    const paragraph = [lines[i++]];
    while (i < lines.length && lines[i].trim() && !/^(#|\||```|@@|\d+\. |- )/.test(lines[i])) paragraph.push(lines[i++]);
    nodes.push(<p key={key}>{inline(paragraph.join(' '))}</p>);
  }
  return <div className={styles.prose}>{nodes.map((node, index) => <Fragment key={index}>{node}</Fragment>)}</div>;
}
