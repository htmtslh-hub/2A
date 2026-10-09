import { parseSRTorVTT, sanitizeSubtitleText, timeToSeconds } from './srtParser';
import { getCueSourceText, getCueTargetText } from '../types/subtitle';

export function runTests(): boolean {
  console.log('🧪 Starting Subtitle Engine & Security Tests...');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, desc: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${desc}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${desc}`);
      failed++;
    }
  }

  // Test 1: Sanitize malicious XSS payload (Mục XIII Plan v4.1)
  const maliciousInput = '<script>alert("hacked")</script><b>Hello</b> World <img src=x onerror=alert(1)>';
  const sanitized = sanitizeSubtitleText(maliciousInput);
  assert(!sanitized.includes('<script>') && !sanitized.includes('alert') && !sanitized.includes('<img'), 'Sanitizer removes malicious script and event handlers');
  assert(sanitized.includes('Hello World'), 'Sanitizer preserves clean text content');

  // Test 2: Timestamp conversion
  assert(Math.abs(timeToSeconds('00:01:23.500') - 83.5) < 0.001, 'Parse standard timestamp with dot');
  assert(Math.abs(timeToSeconds('00:02:10,250') - 130.25) < 0.001, 'Parse SRT timestamp with comma');
  assert(Math.abs(timeToSeconds('01:30') - 90) < 0.001, 'Parse mm:ss timestamp');

  // Test 3: Parse Multilingual SRT with XSS attempt
  const srtContent = `
1
00:00:01,000 --> 00:00:04,000
<i>Welcome</i> to LingoGlass! <script>bad()</script>
Chào mừng bạn đến với LingoGlass!

2
00:00:05,500 --> 00:00:08,200
Enjoy your learning journey.
Chúc bạn học vui vẻ.
`;

  const cues = parseSRTorVTT(srtContent);
  assert(cues.length === 2, 'Parsed 2 cues correctly');
  assert(cues[0].startTime === 1.0 && cues[0].endTime === 4.0, 'Cue 1 timestamps correct');
  assert(!cues[0].textEn.includes('<script>'), 'Cue 1 textEn has no script tag');
  assert(cues[0].textEn.includes('Welcome to LingoGlass!'), 'Cue 1 English text cleaned properly');
  assert(cues[0].textVn === 'Chào mừng bạn đến với LingoGlass!', 'Cue 1 Vietnamese text detected');

  // Test 4: Multilingual helper functions
  const src = getCueSourceText(cues[0], 'en');
  const tgt = getCueTargetText(cues[0], 'vi');
  assert(src.startsWith('Welcome'), 'getCueSourceText retrieves English source');
  assert(Boolean(tgt?.startsWith('Chào mừng')), 'getCueTargetText retrieves Vietnamese target');

  // Test 5: LRC Parsing (Audio script / Lyrics)
  const lrcContent = `
[00:00.50]Carlos buys a new car.
[00:00.50]Carlos mua một chiếc xe hơi mới.
[00:04.20]It's a very expensive car.
`;
  const lrcCues = parseSRTorVTT(lrcContent);
  assert(lrcCues.length === 2, 'Parsed 2 LRC cues correctly');
  assert(Math.abs(lrcCues[0].startTime - 0.5) < 0.01, 'LRC cue 1 start time is 0.5s');
  assert(Math.abs(lrcCues[0].endTime - 4.2) < 0.01, 'LRC cue 1 end time aligns with cue 2 start time');
  assert(lrcCues[0].textEn === 'Carlos buys a new car.', 'LRC cue 1 English source extracted');
  assert(lrcCues[0].textVn === 'Carlos mua một chiếc xe hơi mới.', 'LRC cue 1 Vietnamese translation extracted');

  console.log(`\n🎉 Results: ${passed} passed, ${failed} failed.`);
  return failed === 0;
}

// Auto-run if executed via Node
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('srtParser.test')) {
  runTests();
}
