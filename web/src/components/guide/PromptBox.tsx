'use client';

import { useRef, useState } from 'react';
import type { LangCode } from '@/generated/data';
import { GUIDE_COPY } from '@/lib/guide-copy';
import styles from './guide.module.css';

export type Prompt = { id: string; number: string; title: string; text: string; section: string };

export default function PromptBox({ prompt, context = '', lang }: { prompt: Prompt; context?: string; lang: LangCode }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'manual'>('idle');
  const field = useRef<HTMLTextAreaElement>(null);
  const value = context ? `${context}\n\n${prompt.text}` : prompt.text;
  const copy = GUIDE_COPY[lang];

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus('copied');
    } catch {
      setStatus('manual');
    }
  }

  return (
    <div className={styles.prompt} id={prompt.id}>
      <div className={styles.promptHeader}>
        <div><span className={styles.promptNumber}>{copy.promptWord} {prompt.number}</span><h3>{prompt.title}</h3></div>
        <button type="button" onClick={copyToClipboard} className={styles.copy} aria-label={`${copy.copyPrompt} ${prompt.number}: ${prompt.title}`}>
          {status === 'copied' ? copy.copied : copy.copyPrompt}
        </button>
      </div>
      <p className={styles.promptHint}>{copy.promptHint}</p>
      <details className={styles.promptDetails}>
        <summary>{copy.viewPrompt}</summary>
        <pre>{value}</pre>
      </details>
      <p role="status" className={status === 'idle' ? 'sr-only' : styles.copyStatus}>
        {status === 'copied' ? copy.copiedStatus : status === 'manual' ? copy.manualStatus : ''}
      </p>
      {status === 'manual' && <textarea ref={field} className={styles.fallback} aria-label={copy.manualLabel} value={value} readOnly autoFocus onFocus={event => event.currentTarget.select()} />}
    </div>
  );
}
