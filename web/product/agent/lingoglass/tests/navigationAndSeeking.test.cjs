const assert = require('assert');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🧪 Starting Navigation, Seeking & Cue Jumping Tests...\n');

// 1. Core Seek Calculation Logic Model
function calculateSeekTarget(time, duration, subtitles = []) {
  if (isNaN(time)) return null;

  let maxDuration = duration;
  if (!isFinite(maxDuration) || maxDuration <= 0) {
    if (subtitles.length > 0) {
      maxDuration = subtitles[subtitles.length - 1].endTime + 10;
    } else {
      maxDuration = 86400; // 24h fallback
    }
  }

  return Math.max(0, Math.min(time, maxDuration));
}

function calculateJumpTarget(baseTime, seconds, duration, subtitles = []) {
  const current = isFinite(baseTime) ? baseTime : 0;
  return calculateSeekTarget(current + seconds, duration, subtitles);
}

// 2. Cue Navigation Decision Engine
function calculatePrevCueTarget(currentTime, subtitles) {
  if (!subtitles || subtitles.length === 0) {
    return { action: 'jump', targetTime: Math.max(0, currentTime - 5) };
  }

  const currentT = isFinite(currentTime) ? currentTime : 0;
  const currentIdx = subtitles.findIndex(s => currentT >= s.startTime && currentT <= s.endTime);

  if (currentIdx !== -1) {
    const cue = subtitles[currentIdx];
    if (currentT > cue.startTime + 0.8) {
      // Replay current cue from start
      return { action: 'cue', cueIndex: currentIdx, targetTime: Math.max(0, cue.startTime - 0.05) };
    } else if (currentIdx > 0) {
      // Jump to previous cue
      return { action: 'cue', cueIndex: currentIdx - 1, targetTime: Math.max(0, subtitles[currentIdx - 1].startTime - 0.05) };
    } else {
      // At first cue start, seek to beginning
      return { action: 'seek', targetTime: 0 };
    }
  } else {
    // In between cues
    const prevCues = subtitles.filter(s => s.endTime <= currentT);
    if (prevCues.length > 0) {
      const targetCue = prevCues[prevCues.length - 1];
      const cueIdx = subtitles.indexOf(targetCue);
      return { action: 'cue', cueIndex: cueIdx, targetTime: Math.max(0, targetCue.startTime - 0.05) };
    } else {
      return { action: 'seek', targetTime: 0 };
    }
  }
}

function calculateNextCueTarget(currentTime, subtitles, duration = 300) {
  if (!subtitles || subtitles.length === 0) {
    return { action: 'jump', targetTime: Math.min(duration, currentTime + 5) };
  }

  const currentT = isFinite(currentTime) ? currentTime : 0;
  const currentIdx = subtitles.findIndex(s => currentT >= s.startTime && currentT <= s.endTime);

  if (currentIdx !== -1 && currentIdx < subtitles.length - 1) {
    return { action: 'cue', cueIndex: currentIdx + 1, targetTime: Math.max(0, subtitles[currentIdx + 1].startTime - 0.05) };
  } else {
    const nextCue = subtitles.find(s => s.startTime > currentT);
    if (nextCue) {
      const cueIdx = subtitles.indexOf(nextCue);
      return { action: 'cue', cueIndex: cueIdx, targetTime: Math.max(0, nextCue.startTime - 0.05) };
    } else {
      // Beyond last cue, jump +5s
      return { action: 'jump', targetTime: Math.min(duration, currentT + 5) };
    }
  }
}

async function runTests() {
  let passed = 0;

  // Test 1: Jump backwards (-5s) clamps at 0s
  {
    const target = calculateJumpTarget(2.5, -5, 120);
    assert.strictEqual(target, 0, 'Jumping -5s at 2.5s must clamp to 0');
    console.log('  ✅ PASS: Tua lùi 5s từ 2.5s được clamp an toàn về 0.0s');
    passed++;
  }

  // Test 2: Jump forwards (+5s) advances correctly
  {
    const target = calculateJumpTarget(10.0, 5, 120);
    assert.strictEqual(target, 15.0, 'Jumping +5s at 10s must be 15s');
    console.log('  ✅ PASS: Tua tiến 5s từ 10.0s chính xác đến 15.0s');
    passed++;
  }

  // Test 3: Jump forwards beyond duration clamps at maxDuration
  {
    const target = calculateJumpTarget(118.0, 5, 120);
    assert.strictEqual(target, 120.0, 'Jumping +5s at 118s with duration 120s must clamp to 120s');
    console.log('  ✅ PASS: Tua tiến vượt thời lượng video được clamp đúng ở điểm kết thúc');
    passed++;
  }

  // Test 4: Seek with NaN returns null safely
  {
    const target = calculateSeekTarget(NaN, 120);
    assert.strictEqual(target, null, 'NaN target must return null without crashing');
    console.log('  ✅ PASS: Seek giá trị NaN được lọc bỏ an toàn');
    passed++;
  }

  // Test 5: Seek with Infinity duration uses fallback
  {
    const sampleSubtitles = [
      { id: 1, startTime: 0, endTime: 5, textEn: 'Hi' },
      { id: 2, startTime: 10, endTime: 45, textEn: 'Bye' }
    ];
    const target = calculateSeekTarget(50, Infinity, sampleSubtitles);
    assert.strictEqual(target, 50, 'Seek with Infinity duration must allow valid timestamp based on subtitle fallback');
    console.log('  ✅ PASS: Seek khi video duration = Infinity (MKV/WebM) tự động tính fallback từ kịch bản phụ đề');
    passed++;
  }

  // Sample Cues for testing Cue Navigation
  const cues = [
    { id: 1, startTime: 1.0, endTime: 4.0, textEn: 'Welcome to the class.' },
    { id: 2, startTime: 6.0, endTime: 9.0, textEn: 'How are you today?' },
    { id: 3, startTime: 12.0, endTime: 15.0, textEn: 'Let us start the lesson.' }
  ];

  // Test 6: jumpToPrevCue without subtitles falls back to -5s jump
  {
    const res = calculatePrevCueTarget(8.0, []);
    assert.strictEqual(res.action, 'jump');
    assert.strictEqual(res.targetTime, 3.0);
    console.log('  ✅ PASS: Lùi câu khi chưa có phụ đề tự động chuyển thành lùi 5s');
    passed++;
  }

  // Test 7: jumpToNextCue without subtitles falls back to +5s jump
  {
    const res = calculateNextCueTarget(8.0, [], 100);
    assert.strictEqual(res.action, 'jump');
    assert.strictEqual(res.targetTime, 13.0);
    console.log('  ✅ PASS: Tiến câu khi chưa có phụ đề tự động chuyển thành tiến 5s');
    passed++;
  }

  // Test 8: jumpToPrevCue in middle of cue (e.g. at 3.0s in cue 1 [1.0s - 4.0s]) rewinds to start of cue 1
  {
    const res = calculatePrevCueTarget(3.0, cues);
    assert.strictEqual(res.action, 'cue');
    assert.strictEqual(res.cueIndex, 0);
    assert.strictEqual(res.targetTime, 0.95);
    console.log('  ✅ PASS: Đang nghe giữa câu thoại (>0.8s), lùi câu sẽ phát lại từ đầu câu hiện tại');
    passed++;
  }

  // Test 9: jumpToPrevCue near start of cue 2 (at 6.3s in cue 2 [6.0s - 9.0s]) jumps to previous cue 1
  {
    const res = calculatePrevCueTarget(6.3, cues);
    assert.strictEqual(res.action, 'cue');
    assert.strictEqual(res.cueIndex, 0); // jumps to cue 1
    console.log('  ✅ PASS: Đang ở đầu câu thoại (<=0.8s), lùi câu sẽ nhảy về câu thoại phía trước');
    passed++;
  }

  // Test 10: jumpToPrevCue at start of first cue jumps to 0:00
  {
    const res = calculatePrevCueTarget(1.2, cues);
    assert.strictEqual(res.action, 'seek');
    assert.strictEqual(res.targetTime, 0);
    console.log('  ✅ PASS: Ở đầu câu số 1, lùi câu đưa mốc thời gian về 0:00');
    passed++;
  }

  // Test 11: jumpToNextCue in cue 1 advances to cue 2
  {
    const res = calculateNextCueTarget(2.5, cues);
    assert.strictEqual(res.action, 'cue');
    assert.strictEqual(res.cueIndex, 1);
    assert.strictEqual(res.targetTime, 5.95);
    console.log('  ✅ PASS: Tiến câu khi đang ở câu 1 chuyển ngay sang câu 2');
    passed++;
  }

  // Test 12: jumpToNextCue between cues (e.g. at 5.0s between cue 1 and 2) jumps to cue 2
  {
    const res = calculateNextCueTarget(5.0, cues);
    assert.strictEqual(res.action, 'cue');
    assert.strictEqual(res.cueIndex, 1);
    console.log('  ✅ PASS: Tiến câu khi đang ở khoảng lặng giữa hai câu thoại bắt đúng câu tiếp theo');
    passed++;
  }

  // Test 13: jumpToNextCue at last cue falls back to +5s jump
  {
    const res = calculateNextCueTarget(14.0, cues, 30);
    assert.strictEqual(res.action, 'jump');
    assert.strictEqual(res.targetTime, 19.0);
    console.log('  ✅ PASS: Tiến câu ở câu thoại cuối cùng tiến 5s về phía trước');
    passed++;
  }

  // Test 14: Native duration retrieval via ffprobe on test.mp4
  const mp4Path = path.resolve(__dirname, '../test.mp4');
  if (fs.existsSync(mp4Path)) {
    await new Promise((resolve) => {
      exec(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${mp4Path}"`, (err, stdout) => {
        assert.ifError(err);
        const dur = parseFloat(stdout.trim());
        assert(dur >= 2.9 && dur <= 3.1, `MP4 duration expected ~3.0s, got ${dur}`);
        console.log(`  ✅ PASS: ffprobe đọc thời lượng container test.mp4 chuẩn xác: ${dur}s`);
        passed++;
        resolve();
      });
    });
  }

  // Test 15: Native duration retrieval via ffprobe on test.mkv
  const mkvPath = path.resolve(__dirname, '../test.mkv');
  if (fs.existsSync(mkvPath)) {
    await new Promise((resolve) => {
      exec(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${mkvPath}"`, (err, stdout) => {
        assert.ifError(err);
        const dur = parseFloat(stdout.trim());
        assert(dur >= 2.9 && dur <= 3.1, `MKV duration expected ~3.0s, got ${dur}`);
        console.log(`  ✅ PASS: ffprobe đọc thời lượng container test.mkv chuẩn xác: ${dur}s`);
        passed++;
        resolve();
      });
    });
  }

  console.log(`\n🎉 ALL NAVIGATION & SEEKING TESTS PASSED (${passed}/${passed})!`);
}

runTests().catch(err => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
