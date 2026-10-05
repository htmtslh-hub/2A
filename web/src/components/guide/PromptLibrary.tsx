'use client';

import { useState } from 'react';
import type { LangCode } from '@/generated/data';
import { GUIDE_COPY } from '@/lib/guide-copy';
import PromptBox, { type Prompt } from './PromptBox';
import styles from './guide.module.css';

const normalise = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');

export default function PromptLibrary({ prompts, context, lang }: { prompts: Prompt[]; context: string; lang: LangCode }) {
  const [query, setQuery] = useState('');
  const copy = GUIDE_COPY[lang];
  const matches = prompts.filter(prompt => normalise(`${prompt.number} ${prompt.title} ${prompt.text}`).includes(normalise(query.trim())));
  return <>
    <label className={styles.searchLabel} htmlFor="prompt-search">{copy.searchLabel}</label>
    <input id="prompt-search" type="search" className={styles.search} placeholder={copy.searchPlaceholder} value={query} onChange={event => setQuery(event.target.value)} />
    <p className={styles.muted} role="status">{copy.resultCount(matches.length, prompts.length)}</p>
    {matches.length ? <div className={styles.promptList}>{matches.map(prompt => <PromptBox key={prompt.id} prompt={prompt} context={context} lang={lang} />)}</div> : <div className={styles.empty}><h3>{copy.noResultTitle}</h3><p>{copy.noResultBody}</p><button className={styles.secondary} onClick={() => setQuery('')}>{copy.viewAll}</button></div>}
  </>;
}
