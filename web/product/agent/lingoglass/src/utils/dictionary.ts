import { DictionaryWord } from '../types/subtitle';
import { cleanWord } from './formatters';

// Rich offline vocabulary database for instant lookup
const OFFLINE_DICTIONARY: Record<string, Omit<DictionaryWord, 'cleanWord'>> = {
  hello: {
    word: 'hello',
    ipa: '/həˈloʊ/',
    type: 'exclamation, n',
    meaning: 'xin chào, lời chào hỏi',
    example: 'Hello, how have you been?'
  },
  english: {
    word: 'english',
    ipa: '/ˈɪŋ.ɡlɪʃ/',
    type: 'noun, adj',
    meaning: 'tiếng Anh; người Anh, thuộc về nước Anh',
    example: 'He speaks English fluently.'
  },
  learning: {
    word: 'learning',
    ipa: '/ˈlɝː.nɪŋ/',
    type: 'noun',
    meaning: 'sự học tập, kiến thức thu thập được',
    example: 'Language learning takes regular practice.'
  },
  player: {
    word: 'player',
    ipa: '/ˈpleɪ.ɚ/',
    type: 'noun',
    meaning: 'người chơi, máy/trình phát (video, nhạc)',
    example: 'A modern video player for language learners.'
  },
  practice: {
    word: 'practice',
    ipa: '/ˈpræk.tɪs/',
    type: 'noun, verb',
    meaning: 'luyện tập, thực hành; thói quen',
    example: 'Practice makes perfect.'
  },
  listen: {
    word: 'listen',
    ipa: '/ˈlɪs.ən/',
    type: 'verb',
    meaning: 'lắng nghe, chú ý lắng nghe',
    example: 'Listen carefully to the native accent.'
  },
  speak: {
    word: 'speak',
    ipa: '/spiːk/',
    type: 'verb',
    meaning: 'nói, phát biểu',
    example: 'Can you speak a little louder?'
  },
  shadowing: {
    word: 'shadowing',
    ipa: '/ˈʃæd.oʊ.ɪŋ/',
    type: 'noun',
    meaning: 'kỹ thuật luyện nói nhại giọng theo bản xứ ngay lập tức',
    example: 'Shadowing improves pronunciation and rhythm dramatically.'
  },
  repeat: {
    word: 'repeat',
    ipa: '/rɪˈpiːt/',
    type: 'verb, noun',
    meaning: 'lặp lại, nhắc lại',
    example: 'Repeat after me.'
  },
  subtitle: {
    word: 'subtitle',
    ipa: '/ˈsʌbˌtaɪ.t̬əl/',
    type: 'noun',
    meaning: 'phụ đề phim, lời thuyết minh bên dưới',
    example: 'Dual subtitles help bridge listening comprehension.'
  },
  understand: {
    word: 'understand',
    ipa: '/ˌʌn.dɚˈstænd/',
    type: 'verb',
    meaning: 'hiểu, nắm rõ ý nghĩa',
    example: 'Do you understand what they said?'
  },
  vocabulary: {
    word: 'vocabulary',
    ipa: '/voʊˈkæb.jə.ler.i/',
    type: 'noun',
    meaning: 'từ vựng, vốn từ',
    example: 'Expand your active vocabulary daily.'
  },
  accent: {
    word: 'accent',
    ipa: '/ˈæk.sənt/',
    type: 'noun',
    meaning: 'giọng điệu, âm hưởng phát âm',
    example: 'She has a natural American accent.'
  },
  fluent: {
    word: 'fluent',
    ipa: '/ˈfluː.ənt/',
    type: 'adjective',
    meaning: 'lưu loát, trôi chảy',
    example: 'He wants to become fluent in English.'
  },
  sentence: {
    word: 'sentence',
    ipa: '/ˈsen.təns/',
    type: 'noun',
    meaning: 'câu văn, lời nói trọn ý',
    example: 'Snap to sentence repeat mode.'
  },
  movie: {
    word: 'movie',
    ipa: '/ˈmuː.vi/',
    type: 'noun',
    meaning: 'bộ phim điện ảnh',
    example: 'Learning English through popular movies.'
  },
  pronunciation: {
    word: 'pronunciation',
    ipa: '/prəˌnʌn.siˈeɪ.ʃən/',
    type: 'noun',
    meaning: 'cách phát âm, ngữ âm',
    example: 'Compare your pronunciation with native speakers.'
  },
  remember: {
    word: 'remember',
    ipa: '/rɪˈmem.bɚ/',
    type: 'verb',
    meaning: 'ghi nhớ, nhớ lại',
    example: 'Remember to practice every single day.'
  },
  friend: {
    word: 'friend',
    ipa: '/frend/',
    type: 'noun',
    meaning: 'bạn bè, người bạn',
    example: 'A friend in need is a friend indeed.'
  },
  world: {
    word: 'world',
    ipa: '/wɝːld/',
    type: 'noun',
    meaning: 'thế giới, nhân loại',
    example: 'Open the door to the English-speaking world.'
  }
};

export async function lookupWord(raw: string): Promise<DictionaryWord> {
  const cleaned = cleanWord(raw);
  if (!cleaned) {
    throw new Error('Từ không hợp lệ');
  }

  // 1. Check offline dictionary first
  if (OFFLINE_DICTIONARY[cleaned]) {
    const entry = OFFLINE_DICTIONARY[cleaned];
    return {
      word: raw,
      cleanWord: cleaned,
      ipa: entry.ipa,
      type: entry.type,
      meaning: entry.meaning,
      example: entry.example
    };
  }

  // 2. Fetch online dictionary API for instant real-world lookup
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleaned)}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];
        let ipa = item.phonetic || '';
        if (!ipa && item.phonetics?.length) {
          const phWithText = item.phonetics.find((p: any) => p.text);
          if (phWithText) ipa = phWithText.text;
        }

        let audio = '';
        if (item.phonetics?.length) {
          const phWithAudio = item.phonetics.find((p: any) => p.audio && p.audio.length > 0);
          if (phWithAudio) audio = phWithAudio.audio;
        }

        const meanings = item.meanings || [];
        const primaryMeaning = meanings[0];
        const partOfSpeech = primaryMeaning?.partOfSpeech || 'word';
        const def = primaryMeaning?.definitions?.[0]?.definition || '';
        const example = primaryMeaning?.definitions?.[0]?.example || '';

        return {
          word: raw,
          cleanWord: cleaned,
          ipa: ipa || `/${cleaned}/`,
          type: partOfSpeech,
          meaning: def || 'Tra từ điển trực tuyến thành công',
          example: example,
          audio: audio
        };
      }
    }
  } catch (err) {
    console.warn('Online dictionary lookup failed, fallback to heuristic', err);
  }

  // 3. Fallback heuristic
  return {
    word: raw,
    cleanWord: cleaned,
    ipa: `/${cleaned}/`,
    type: 'Từ tiếng Anh',
    meaning: `Nghĩa của từ "${cleaned}" (Bấm nút phát âm để nghe đọc)`,
    example: `Context: "${raw}" in sentence.`
  };
}

export function speakEnglish(text: string): void {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9; // Slightly slower for clear language learning

  // Try to find a high quality US or UK native voice
  const voices = window.speechSynthesis.getVoices();
  const nativeVoice = voices.find(v => (v.lang === 'en-US' || v.lang === 'en-GB') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Siri') || v.name.includes('Samantha')));
  if (nativeVoice) {
    utterance.voice = nativeVoice;
  }

  window.speechSynthesis.speak(utterance);
}
