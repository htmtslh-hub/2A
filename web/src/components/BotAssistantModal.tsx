'use client';

import { useEffect, useRef, useState } from 'react';
import type { LangCode } from '@/generated/data';
import {
  BOT_TOPIC_CHIPS,
  BOT_UI_COPY,
  answerBotQuestion,
  type BotAction,
  type BotReply,
} from '@/lib/bot-knowledge';
import styles from './bot-assistant.module.css';

interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  text: string;
  bullets?: string[];
  actions?: BotAction[];
}

interface ParsedBullet {
  step: string | null;
  title: string | null;
  body: string;
}

function parseStructuredBullet(raw: string): ParsedBullet {
  const trimmed = raw.trim();

  // Pattern 1: "1. Title: Body" or "Bước 1: Body"
  const stepMatch = trimmed.match(/^(?:Bước\s+)?(\d+)[.)\s-]+(.+)$/i);
  if (stepMatch) {
    const stepNum = stepMatch[1];
    const rest = stepMatch[2].trim();
    const colonIdx = rest.indexOf(':');
    if (colonIdx > 0 && colonIdx < 70) {
      return {
        step: stepNum,
        title: rest.slice(0, colonIdx).trim(),
        body: rest.slice(colonIdx + 1).trim(),
      };
    }
    return {
      step: stepNum,
      title: null,
      body: rest,
    };
  }

  // Pattern 2: "Title: Body" (where Title is concise, e.g. "Miễn phí ($0): Tải ngay...")
  const colonIdx = trimmed.indexOf(':');
  if (colonIdx > 0 && colonIdx < 68 && !trimmed.slice(0, colonIdx).includes('http')) {
    return {
      step: null,
      title: trimmed.slice(0, colonIdx).trim(),
      body: trimmed.slice(colonIdx + 1).trim(),
    };
  }

  return {
    step: null,
    title: null,
    body: trimmed,
  };
}

export default function BotAssistantModal({
  open,
  lang,
  onClose,
  onNavigateTab,
  onOpenTemplate,
  onNavigateUrl,
}: {
  open: boolean;
  lang: LangCode;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
  onOpenTemplate: (templateId: string) => void;
  onNavigateUrl: (url: string) => void;
}) {
  const ui = BOT_UI_COPY[lang] || BOT_UI_COPY.vi;
  const chips = BOT_TOPIC_CHIPS[lang] || BOT_TOPIC_CHIPS.vi;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const listRef = useRef<HTMLDivElement | null>(null);
  const latestUserRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Sync welcome message when language changes if no user messages yet
  useEffect(() => {
    setMessages((prev) => {
      const hasUserMsg = prev.some((m) => m.role === 'user');
      if (hasUserMsg && prev.length > 0) return prev;
      return [
        {
          id: 'welcome',
          role: 'bot',
          text: ui.welcome,
          bullets: ui.welcomeBullets,
        },
      ];
    });
  }, [lang, ui.welcome, ui.welcomeBullets]);

  // Scroll latest question into view so the user immediately sees the start of the new answer
  useEffect(() => {
    if (!open) return;
    if (messages.length <= 1) {
      if (listRef.current) listRef.current.scrollTop = 0;
    } else if (latestUserRef.current) {
      latestUserRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);
    return () => window.clearTimeout(timer);
  }, [open, messages.length]);

  // Escape key to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const appendQa = (questionText: string, reply: BotReply) => {
    const now = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: `u-${now}`,
        role: 'user',
        text: questionText,
      },
      {
        id: `b-${now + 1}`,
        role: 'bot',
        text: reply.text,
        bullets: reply.bullets,
        actions: reply.actions,
      },
    ]);
  };

  const handleChipClick = (topicId: string, questionText: string) => {
    const reply = answerBotQuestion(questionText, lang, topicId);
    appendQa(questionText, reply);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    const reply = answerBotQuestion(trimmed, lang);
    appendQa(trimmed, reply);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'bot',
        text: ui.welcome,
        bullets: ui.welcomeBullets,
      },
    ]);
    setInput('');
    inputRef.current?.focus();
  };

  const handleActionClick = (action: BotAction) => {
    onClose();
    if (action.kind === 'tab') {
      onNavigateTab(action.target);
    } else if (action.kind === 'template') {
      onOpenTemplate(action.target);
    } else if (action.kind === 'url') {
      onNavigateUrl(action.target);
    }
  };

  // Find index of the last user message for scroll anchoring
  let lastUserIdx = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'user') {
      lastUserIdx = i;
      break;
    }
  }

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-bot-modal=""
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="forge-bot-title"
      >
        <div className={styles.header}>
          <div className={styles.brandRow}>
            <div className={styles.botAvatar} aria-hidden="true">
              <svg style={{ width: '32px', height: '32px', display: 'block', overflow: 'visible' }} viewBox="0 0 100 100">
                <ellipse cx="24" cy="62" rx="17" ry="8" transform="rotate(-24 24 62)" fill="#f2f5fb" stroke="#1b2a6b" strokeWidth="4" />
                <ellipse cx="76" cy="58" rx="17" ry="8" transform="rotate(22 76 58)" fill="#f2f5fb" stroke="#1b2a6b" strokeWidth="4" />
                <path d="M30 22 L26 8 L34 6 L38 20 Z" fill="#2fb8f5" stroke="#1b2a6b" strokeWidth="4" strokeLinejoin="round" />
                <path d="M70 22 L74 8 L66 6 L62 20 Z" fill="#2fb8f5" stroke="#1b2a6b" strokeWidth="4" strokeLinejoin="round" />
                <rect x="42" y="52" width="16" height="34" rx="8" fill="#f2f5fb" stroke="#1b2a6b" strokeWidth="4" />
                <ellipse cx="50" cy="66" rx="27" ry="24" fill="#ffffff" stroke="#1b2a6b" strokeWidth="4" />
                <path d="M38 62 h24 a12 12 0 0 1 -24 0 z" fill="#2fb8f5" stroke="#1b2a6b" strokeWidth="4" strokeLinejoin="round" />
                <ellipse cx="50" cy="36" rx="32" ry="28" fill="#ffffff" stroke="#1b2a6b" strokeWidth="4" />
                <ellipse cx="50" cy="35" rx="23" ry="17" fill="#16267e" stroke="#1b2a6b" strokeWidth="3" />
                <path d="M38 36 q4 -6 8 0" fill="none" stroke="#2fe0f5" strokeWidth="4" strokeLinecap="round" />
                <path d="M54 36 q4 -6 8 0" fill="none" stroke="#2fe0f5" strokeWidth="4" strokeLinecap="round" />
                <rect x="44" y="2" width="12" height="10" rx="5" fill="#ffffff" stroke="#1b2a6b" strokeWidth="4" />
              </svg>
              <span className={styles.onlineDot} />
            </div>
            <div className={styles.titleGroup}>
              <h2 id="forge-bot-title" className={styles.title}>
                <span>{ui.botName}</span>
                <span className={styles.badgeAi}>Q&amp;A</span>
              </h2>
              <p className={styles.status}>{ui.status}</p>
            </div>
          </div>

          <div className={styles.headerActions}>
            {messages.length > 1 && (
              <button
                type="button"
                className={styles.resetBtn}
                onClick={handleReset}
              >
                {ui.resetLabel}
              </button>
            )}
            <button
              type="button"
              className={styles.closeBtn}
              aria-label={ui.closeLabel}
              onClick={onClose}
              data-bot-close=""
            >
              ✕
            </button>
          </div>
        </div>

        <div className={styles.messages} ref={listRef} data-bot-messages="">
          {messages.map((msg, idx) => (
            <div
              key={msg.id}
              ref={idx === lastUserIdx ? latestUserRef : undefined}
              className={`${styles.msgRow} ${msg.role === 'user' ? styles.msgUser : styles.msgBot}`}
            >
              {msg.role === 'bot' && idx > 0 && (
                <div className={styles.botHeader}>
                  <span className={styles.botMiniIcon} aria-hidden="true">✦</span>
                  <span>{ui.botName}</span>
                </div>
              )}

              <div className={styles.bubble}>
                <p className={msg.role === 'bot' ? styles.leadText : undefined} style={msg.role === 'user' ? { margin: 0 } : undefined}>
                  {msg.text}
                </p>

                {msg.bullets && msg.bullets.length > 0 && (
                  <div className={styles.cardList}>
                    {msg.bullets.map((rawBullet, bIdx) => {
                      const parsed = parseStructuredBullet(rawBullet);
                      return (
                        <div key={bIdx} className={styles.cardItem}>
                          {parsed.step ? (
                            <span className={styles.stepBadge}>{parsed.step}</span>
                          ) : (
                            <span className={styles.dotBadge} aria-hidden="true">✦</span>
                          )}
                          <div className={styles.cardContent}>
                            {parsed.title && (
                              <span className={styles.cardTitle}>{parsed.title}</span>
                            )}
                            <span>{parsed.body}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {msg.actions && msg.actions.length > 0 && (
                  <div className={styles.actionRow}>
                    {msg.actions.map((act, aIdx) => (
                      <button
                        key={`${act.kind}-${act.target}-${aIdx}`}
                        type="button"
                        className={`${styles.actionBtn} ${aIdx === 0 ? styles.actionBtnPrimary : ''}`}
                        onClick={() => handleActionClick(act)}
                      >
                        <span>{act.label}</span>
                        {act.badge && <span className={styles.actionBadge}>{act.badge}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {messages.length === 1 && (
            <div className={styles.topicGridBlock}>
              <p className={styles.topicGridLabel}>{ui.quickTitle}</p>
              <div className={styles.topicGrid}>
                {chips.map((chip) => (
                  <button
                    key={`grid-${chip.id}`}
                    type="button"
                    className={styles.topicCard}
                    onClick={() => handleChipClick(chip.id, chip.question)}
                  >
                    <span>{chip.label}</span>
                    <span className={styles.topicCardArrow} aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.quickSection}>
          <p className={styles.quickTitle}>{ui.quickTitle}:</p>
          <div className={styles.chipStrip}>
            {chips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                className={styles.chip}
                onClick={() => handleChipClick(chip.id, chip.question)}
                data-bot-chip={chip.id}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <form className={styles.inputBar} onSubmit={handleSubmit}>
          <div className={styles.inputShell}>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={ui.inputPlaceholder}
              aria-label={ui.inputPlaceholder}
              data-bot-input=""
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={!input.trim()}
              data-bot-send=""
            >
              {ui.sendLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
