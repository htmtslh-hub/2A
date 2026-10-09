import { SubtitleCue } from '../types/subtitle';
import { TranslationConfig, TranslationProgress } from '../types/translation';

/**
 * Clean subtitle text before sending to translation
 */
export function cleanSubtitleLine(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/\{[^}]*\}/g, '') // remove ASS/SSA override tags like {\an8}
    .trim();
}

/**
 * Translate a single sentence using Google Translate (Free endpoint)
 */
export async function translateSingleWithGoogle(
  text: string,
  sourceLang: string = 'en',
  targetLang: string = 'vi'
): Promise<string> {
  const clean = cleanSubtitleLine(text);
  if (!clean) return '';

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
    sourceLang
  )}&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(clean)}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Google Translate HTTP error: ${res.status}`);
  }

  const data = await res.json();
  if (Array.isArray(data) && Array.isArray(data[0])) {
    return data[0].map((item: any) => item[0] || '').join('').trim();
  }
  return clean;
}

/**
 * Translate a batch of sentences using Google Translate
 */
export async function translateBatchWithGoogle(
  lines: string[],
  sourceLang: string = 'en',
  targetLang: string = 'vi'
): Promise<string[]> {
  if (lines.length === 0) return [];
  if (lines.length === 1) {
    const single = await translateSingleWithGoogle(lines[0], sourceLang, targetLang);
    return [single];
  }

  // Join lines with delimiter
  const joinedText = lines.map(cleanSubtitleLine).join('\n');
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
    sourceLang
  )}&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(joinedText)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Google Translate error: ${res.status}`);

    const data = await res.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const fullTranslated = data[0].map((item: any) => item[0] || '').join('');
      const translatedLines = fullTranslated.split('\n').map((l: string) => l.trim());

      // If split matches input length, return cleanly
      if (translatedLines.length === lines.length) {
        return translatedLines;
      }
    }
  } catch (err) {
    console.warn('Batch translation mismatch or network glitch, falling back to sequential lines:', err);
  }

  // Fallback: translate line-by-line if batch split mismatched
  const results: string[] = [];
  for (const line of lines) {
    try {
      const res = await translateSingleWithGoogle(line, sourceLang, targetLang);
      results.push(res);
    } catch {
      results.push(line);
    }
  }
  return results;
}

/**
 * Translate a batch using OpenAI / DeepSeek / Custom Chat Completions API
 */
export async function translateBatchWithChatCompletions(
  lines: string[],
  config: TranslationConfig,
  sourceLang: string = 'en',
  targetLang: string = 'vi'
): Promise<string[]> {
  const endpoint =
    config.customEndpoint ||
    (config.provider === 'deepseek'
      ? 'https://api.deepseek.com/chat/completions'
      : 'https://api.openai.com/v1/chat/completions');

  const model =
    config.model || (config.provider === 'deepseek' ? 'deepseek-chat' : 'gpt-4o-mini');

  const systemPrompt = `You are a professional subtitle translator.
Translate the provided JSON array of subtitle lines from ${sourceLang} to ${targetLang}.
Preserve tone, humor, natural conversational flow, and conciseness for video display.
IMPORTANT: Respond ONLY with a valid JSON array of strings containing the exact same number of items (${lines.length}) in the identical order. Do not wrap in markdown or backticks.`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey || ''}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify(lines.map(cleanSubtitleLine)) }
      ],
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText.slice(0, 150)}`);
  }

  const json = await response.json();
  const rawContent = json.choices?.[0]?.message?.content || '[]';
  const cleanJson = rawContent
    .replace(/^```json/i, '')
    .replace(/^```/i, '')
    .replace(/```$/i, '')
    .trim();

  const parsed = JSON.parse(cleanJson);
  if (Array.isArray(parsed) && parsed.length === lines.length) {
    return parsed.map(String);
  }

  throw new Error(`LLM returned unexpected item count: got ${parsed?.length}, expected ${lines.length}`);
}

/**
 * Translate a batch using Google Gemini API
 */
export async function translateBatchWithGemini(
  lines: string[],
  config: TranslationConfig,
  sourceLang: string = 'en',
  targetLang: string = 'vi'
): Promise<string[]> {
  const model = config.model || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`;

  const prompt = `You are a professional subtitle translator.
Translate the following JSON array of subtitle sentences from ${sourceLang} to ${targetLang}.
Maintain natural speech suitable for video subtitles.
Input: ${JSON.stringify(lines.map(cleanSubtitleLine))}
Output ONLY a JSON array of strings with exactly ${lines.length} items.`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini Error (${response.status}): ${errorText.slice(0, 150)}`);
  }

  const json = await response.json();
  const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
  const parsed = JSON.parse(rawText.trim());

  if (Array.isArray(parsed) && parsed.length === lines.length) {
    return parsed.map(String);
  }

  throw new Error(`Gemini returned invalid array size: got ${parsed?.length}, expected ${lines.length}`);
}

/**
 * Unified batch translator that selects the appropriate provider
 */
export async function translateBatch(
  lines: string[],
  config: TranslationConfig,
  sourceLang: string = 'en',
  targetLang: string = 'vi'
): Promise<string[]> {
  if (config.provider === 'google' || !config.apiKey) {
    return translateBatchWithGoogle(lines, sourceLang, targetLang);
  }

  if (config.provider === 'gemini') {
    return translateBatchWithGemini(lines, config, sourceLang, targetLang);
  }

  if (config.provider === 'openai' || config.provider === 'deepseek' || config.provider === 'custom') {
    return translateBatchWithChatCompletions(lines, config, sourceLang, targetLang);
  }

  return translateBatchWithGoogle(lines, sourceLang, targetLang);
}

/**
 * Translate all subtitle cues in chunks with progress reporting and abort signal
 */
export async function translateAllSubtitleCues(
  cues: SubtitleCue[],
  config: TranslationConfig,
  sourceLang: string = 'en',
  targetLang: string = 'vi',
  onProgress?: (progress: TranslationProgress) => void,
  abortSignal?: AbortSignal
): Promise<SubtitleCue[]> {
  if (cues.length === 0) return [];

  const chunkSize = config.provider === 'google' ? 25 : 15;
  const chunks: SubtitleCue[][] = [];

  for (let i = 0; i < cues.length; i += chunkSize) {
    chunks.push(cues.slice(i, i + chunkSize));
  }

  const updatedCues = [...cues];
  let completedCount = 0;

  for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
    if (abortSignal?.aborted) {
      throw new Error('Translation aborted by user');
    }

    const currentChunk = chunks[chunkIdx];
    const linesToTranslate = currentChunk.map(c => c.textEn || '');

    onProgress?.({
      isTranslating: true,
      totalCues: cues.length,
      completedCues: completedCount,
      currentChunk: chunkIdx + 1,
      totalChunks: chunks.length,
      error: null
    });

    try {
      const translatedBatch = await translateBatch(linesToTranslate, config, sourceLang, targetLang);

      currentChunk.forEach((cue, idx) => {
        const globalIdx = updatedCues.findIndex(c => c.id === cue.id);
        if (globalIdx !== -1) {
          const transText = translatedBatch[idx] || cue.textVn || '';
          updatedCues[globalIdx] = {
            ...updatedCues[globalIdx],
            textVn: transText,
            tracks: [
              { language: sourceLang, text: cue.textEn, isSource: true },
              { language: targetLang, text: transText, isSource: false }
            ]
          };
        }
      });

      completedCount += currentChunk.length;
    } catch (err: any) {
      console.error(`Error translating chunk ${chunkIdx + 1}:`, err);
      // If AI fails, try falling back to Google
      if (config.provider !== 'google') {
        try {
          const fallbackBatch = await translateBatchWithGoogle(linesToTranslate, sourceLang, targetLang);
          currentChunk.forEach((cue, idx) => {
            const globalIdx = updatedCues.findIndex(c => c.id === cue.id);
            if (globalIdx !== -1) {
              const transText = fallbackBatch[idx] || '';
              updatedCues[globalIdx] = {
                ...updatedCues[globalIdx],
                textVn: transText
              };
            }
          });
          completedCount += currentChunk.length;
        } catch (fbErr) {
          console.error('Fallback translation also failed:', fbErr);
        }
      }
    }

    // Brief delay to prevent rate limiting
    if (chunkIdx < chunks.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  }

  onProgress?.({
    isTranslating: false,
    totalCues: cues.length,
    completedCues: cues.length,
    currentChunk: chunks.length,
    totalChunks: chunks.length,
    error: null
  });

  return updatedCues;
}

/**
 * Test connectivity for a given TranslationConfig
 */
export async function testTranslationConnection(config: TranslationConfig): Promise<{
  success: boolean;
  message: string;
  sample?: string;
}> {
  const testText = 'Hello! Welcome to LingoGlass Player.';
  try {
    const result = await translateBatch([testText], config, 'en', config.targetLanguage || 'vi');
    if (result && result.length > 0 && result[0]) {
      return {
        success: true,
        message: 'Kết nối API thành công!',
        sample: result[0]
      };
    }
    return {
      success: false,
      message: 'Không nhận được dữ liệu phản hồi từ máy chủ dịch thuật.'
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Lỗi kết nối API. Vui lòng kiểm tra lại Key hoặc Endpoint.'
    };
  }
}

/**
 * Format seconds to SRT timestamp: 00:01:23,456
 */
function toSrtTimestamp(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);

  const pad = (n: number, z = 2) => String(n).padStart(z, '0');
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)},${pad(ms, 3)}`;
}

/**
 * Export cues to standard SRT subtitle string
 */
export function exportSubtitlesToSRT(cues: SubtitleCue[], includeTranslation: boolean = true): string {
  return cues
    .map((cue, index) => {
      const idx = index + 1;
      const start = toSrtTimestamp(cue.startTime);
      const end = toSrtTimestamp(cue.endTime);
      let content = cue.textEn || '';
      if (includeTranslation && cue.textVn) {
        content += `\n${cue.textVn}`;
      }
      return `${idx}\n${start} --> ${end}\n${content}\n`;
    })
    .join('\n');
}
