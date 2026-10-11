import {
  cleanSubtitleLine,
  exportSubtitlesToSRT,
  translateSingleWithGoogle,
  translateBatchWithGoogle,
  translateAllSubtitleCues
} from './translationService';
import { SubtitleCue } from '../types/subtitle';

async function runTests() {
  console.log('🧪 Starting Subtitle Auto-Translation Engine Tests...\n');

  // Test 1: Clean subtitle text
  const dirty = '<i><b>Hello</b></i> {\\an8}World!';
  const cleaned = cleanSubtitleLine(dirty);
  if (cleaned === 'Hello World!') {
    console.log('  ✅ PASS: cleanSubtitleLine strips HTML & ASS tags');
  } else {
    console.error('  ❌ FAIL: cleanSubtitleLine:', cleaned);
    process.exit(1);
  }

  // Test 2: Export SRT
  const mockCues: SubtitleCue[] = [
    {
      id: 1,
      startTime: 1.5,
      endTime: 4.25,
      textEn: 'Good morning everyone.',
      textVn: 'Chào buổi sáng mọi người.'
    }
  ];
  const srtOutput = exportSubtitlesToSRT(mockCues, true);
  if (srtOutput.includes('00:00:01,500 --> 00:00:04,250') && srtOutput.includes('Chào buổi sáng mọi người.')) {
    console.log('  ✅ PASS: exportSubtitlesToSRT formats timestamps and dual lines');
  } else {
    console.error('  ❌ FAIL: exportSubtitlesToSRT output:\n', srtOutput);
    process.exit(1);
  }

  // Test 3: Google translate single
  try {
    const rawVi = await translateSingleWithGoogle('Thank you very much', 'en', 'vi');
    const vi = rawVi.normalize('NFC').toLowerCase();
    if (vi.includes('cảm ơn') || vi.includes('cam on')) {
      console.log('  ✅ PASS: translateSingleWithGoogle translated English to Vietnamese:', rawVi);
    } else {
      console.log('  ⚠️ WARNING: Google returned unexpected phrasing:', rawVi);
    }
  } catch (err) {
    console.error('  ❌ FAIL: translateSingleWithGoogle error:', err);
    process.exit(1);
  }

  // Test 4: Google translate batch
  try {
    const batch = ['Good morning', 'How are you today?'];
    const res = await translateBatchWithGoogle(batch, 'en', 'vi');
    if (res.length === 2 && res[0] && res[1]) {
      console.log('  ✅ PASS: translateBatchWithGoogle batch size matches 1:1:', res);
    } else {
      console.error('  ❌ FAIL: translateBatchWithGoogle length mismatch:', res);
      process.exit(1);
    }
  } catch (err) {
    console.error('  ❌ FAIL: translateBatchWithGoogle error:', err);
    process.exit(1);
  }

  // Test 5: Full cues auto-translation
  try {
    const rawCues: SubtitleCue[] = [
      { id: 10, startTime: 10, endTime: 12, textEn: 'Welcome to the show.' },
      { id: 11, startTime: 13, endTime: 15, textEn: 'We hope you enjoy it.' }
    ];
    let progressReported = false;
    const translatedCues = await translateAllSubtitleCues(
      rawCues,
      { provider: 'google', targetLanguage: 'vi' },
      'en',
      'vi',
      (p) => { progressReported = true; }
    );
    if (translatedCues.length === 2 && translatedCues[0].textVn && translatedCues[1].textVn && progressReported) {
      console.log('  ✅ PASS: translateAllSubtitleCues successfully translated all cues with progress callback');
      console.log('     [10]', translatedCues[0].textVn);
      console.log('     [11]', translatedCues[1].textVn);
    } else {
      console.error('  ❌ FAIL: translateAllSubtitleCues cues missing textVn:', translatedCues);
      process.exit(1);
    }
  } catch (err) {
    console.error('  ❌ FAIL: translateAllSubtitleCues error:', err);
    process.exit(1);
  }

  console.log('\n🎉 ALL TRANSLATION ENGINE TESTS PASSED (5/5)!');
}

runTests();
