import { SubtitleCue, SubtitleTrack } from '../types/subtitle';

/**
 * Sanitize text to prevent XSS attacks from untrusted subtitle files (Mục XIII Plan v4.1)
 */
export function sanitizeSubtitleText(raw: string): string {
  if (!raw) return '';
  // 1. Remove dangerous HTML tags & scripts
  let cleaned = raw
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:[^"']*/gi, '');

  // 2. Strip standard formatting tags like <i>, <b>, <u>, <font color="...">, {\an8}
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  cleaned = cleaned.replace(/\{[^}]+\}/g, ''); // ASS/SSA style tags like {\b1}, {\pos(..)}

  // 3. Decode common HTML entities
  cleaned = cleaned
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  return cleaned.trim();
}

/**
 * Converts timestamp strings (00:01:23,456 or 00:01:23.456) to seconds
 */
export function timeToSeconds(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.trim().replace(',', '.').split(':');
  if (parts.length === 3) {
    const hours = parseFloat(parts[0]) || 0;
    const minutes = parseFloat(parts[1]) || 0;
    const seconds = parseFloat(parts[2]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    const minutes = parseFloat(parts[0]) || 0;
    const seconds = parseFloat(parts[1]) || 0;
    return minutes * 60 + seconds;
  }
  return 0;
}

/**
 * Detect language of a subtitle line
 */
function detectLineLanguage(text: string): string {
  // Vietnamese diacritics
  const vnPattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  if (vnPattern.test(text)) return 'vi';

  // Japanese Kana / Kanji
  const jaPattern = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/;
  if (jaPattern.test(text)) return 'ja';

  // Korean Hangul
  const koPattern = /[\uac00-\ud7af]/;
  if (koPattern.test(text)) return 'ko';

  // Chinese
  const zhPattern = /[\u4e00-\u9fa5]/;
  if (zhPattern.test(text)) return 'zh';

  return 'en';
}

/**
 * Parser for LRC lyric/audio script files ([mm:ss.xx] format)
 */
export function parseLRC(content: string): SubtitleCue[] {
  if (!content) return [];
  let cleanContent = content;
  if (cleanContent.charCodeAt(0) === 0xFEFF) {
    cleanContent = cleanContent.slice(1);
  }
  const lines = cleanContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const lrcRegex = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\](.*)/;

  interface LrcEntry {
    time: number;
    text: string;
  }
  const entries: LrcEntry[] = [];

  for (const line of lines) {
    const match = line.match(lrcRegex);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const frac = match[3] ? parseFloat('0.' + match[3]) : 0;
      const time = minutes * 60 + seconds + frac;
      const text = sanitizeSubtitleText(match[4] || '');
      if (text) {
        entries.push({ time, text });
      }
    }
  }

  if (entries.length === 0) return [];

  // Sort by time
  entries.sort((a, b) => a.time - b.time);

  // Group entries with same or near timestamp as bilingual lines
  const cues: SubtitleCue[] = [];
  let idCounter = 1;

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const nextEntry = entries[i + 1];

    let textEn = '';
    let textVn: string | undefined = undefined;
    const tracks: SubtitleTrack[] = [];

    const lang1 = detectLineLanguage(entry.text);
    tracks.push({ language: lang1, text: entry.text, isSource: true });
    if (lang1 === 'vi') textVn = entry.text;
    else textEn = entry.text;

    if (nextEntry && Math.abs(nextEntry.time - entry.time) < 0.25) {
      const lang2 = detectLineLanguage(nextEntry.text);
      tracks.push({ language: lang2, text: nextEntry.text, isSource: false });
      if (lang2 === 'vi') textVn = nextEntry.text;
      else if (!textEn) textEn = nextEntry.text;
      i++; // skip next entry since grouped
    }

    const nextAfter = entries[i + 1];
    const endTime = nextAfter ? nextAfter.time : entry.time + 4.0;

    cues.push({
      id: idCounter++,
      startTime: entry.time,
      endTime: Math.max(entry.time + 0.5, endTime),
      tracks,
      textEn: textEn || entry.text,
      textVn
    });
  }

  return cues;
}

/**
 * Robust parser for SRT, VTT, and LRC subtitle files
 */
export function parseSRTorVTT(content: string): SubtitleCue[] {
  if (!content) return [];

  // Check if content is LRC format (commonly used with MP3/audio files)
  if (!content.includes('-->') && /\[\d{1,2}:\d{2}/.test(content)) {
    return parseLRC(content);
  }

  // Remove UTF-8 BOM if present
  let cleanContent = content;
  if (cleanContent.charCodeAt(0) === 0xFEFF) {
    cleanContent = cleanContent.slice(1);
  }

  // Normalize line endings
  const normalized = cleanContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const blocks = normalized.split(/\n\n+/);
  const cues: SubtitleCue[] = [];
  let idCounter = 1;

  for (const block of blocks) {
    const rawLines = block.trim().split('\n');
    if (rawLines.length < 2) continue;

    // Find the timestamp line
    let timeLineIdx = -1;
    for (let i = 0; i < rawLines.length; i++) {
      if (rawLines[i].includes('-->')) {
        timeLineIdx = i;
        break;
      }
    }

    if (timeLineIdx === -1) continue;

    const timeParts = rawLines[timeLineIdx].split('-->');
    if (timeParts.length < 2) continue;

    const startStr = timeParts[0].trim().split(' ')[0];
    const endStr = timeParts[1].trim().split(' ')[0];
    const startTime = timeToSeconds(startStr);
    const endTime = timeToSeconds(endStr);

    if (isNaN(startTime) || isNaN(endTime) || endTime <= startTime) continue;

    const textLines = rawLines.slice(timeLineIdx + 1).filter(l => l.trim().length > 0);
    if (textLines.length === 0) continue;

    const tracks: SubtitleTrack[] = [];
    let textEn = '';
    let textVn: string | undefined = undefined;

    if (textLines.length === 1) {
      const sanitized = sanitizeSubtitleText(textLines[0]);
      if (sanitized) {
        const lang = detectLineLanguage(sanitized);
        tracks.push({ language: lang, text: sanitized, isSource: true });
        if (lang === 'vi') textVn = sanitized;
        else textEn = sanitized;
      }
    } else {
      // Multiple lines (potential bilingual tracks)
      textLines.forEach((rawLine, idx) => {
        const sanitized = sanitizeSubtitleText(rawLine);
        if (!sanitized) return;

        const lang = detectLineLanguage(sanitized);
        const isSource = idx === 0; // First line is conventionally primary
        tracks.push({ language: lang, text: sanitized, isSource });

        if (lang === 'vi') {
          textVn = textVn ? `${textVn} ${sanitized}` : sanitized;
        } else {
          textEn = textEn ? `${textEn} ${sanitized}` : sanitized;
        }
      });
    }

    if (tracks.length === 0) continue;

    // Fallbacks
    if (!textEn && tracks.length > 0) textEn = tracks[0].text;

    cues.push({
      id: idCounter++,
      startTime,
      endTime,
      tracks,
      textEn,
      textVn
    });
  }

  return cues;
}
