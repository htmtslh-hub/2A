const fs = require('fs');
const path = require('path');
const os = require('os');
const assert = require('assert');
const StorageManager = require('../electron/storageManager.cjs');

console.log('🧪 BẮT ĐẦU KIỂM THỬ TÍNH BẢO TOÀN DỮ LIỆU & STORAGE MANAGER (PLAN v4.1 MỤC XXXV)\n');

const testUserDataDir = path.join(os.tmpdir(), `lingoglass_test_${Date.now()}`);
let storage;

function runTests() {
  let passed = 0;
  let total = 0;

  function test(name, fn) {
    total++;
    try {
      fn();
      console.log(`  ✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ [FAIL] ${name}`);
      console.error('     Chi tiết:', err.message);
    }
  }

  // Test 1: Khởi tạo thư mục và file cơ sở
  test('Khởi tạo thư mục data, backups, waveforms', () => {
    storage = new StorageManager(testUserDataDir);
    assert.strictEqual(fs.existsSync(storage.dataDir), true);
    assert.strictEqual(fs.existsSync(storage.backupDir), true);
    assert.strictEqual(fs.existsSync(storage.waveformsDir), true);
    assert.strictEqual(fs.existsSync(storage.vocabFile), true);
    assert.strictEqual(fs.existsSync(storage.settingsFile), true);
  });

  // Test 2: Ghi file nguyên tử (Atomic Write)
  test('Atomic write ghi đúng định dạng và an toàn', () => {
    const testFile = path.join(testUserDataDir, 'data', 'atomic_test.json');
    const testData = { key: 'lingo', count: 42, active: true };
    const success = storage.atomicWrite(testFile, testData);
    assert.strictEqual(success, true);
    assert.strictEqual(fs.existsSync(testFile), true);
    const content = JSON.parse(fs.readFileSync(testFile, 'utf8'));
    assert.deepStrictEqual(content, testData);
  });

  // Test 3: Lưu và đọc từ vựng (Vocabulary persistence)
  test('Lưu danh sách từ vựng thành công và đọc lại chính xác', () => {
    const mockWords = [
      {
        cleanWord: 'resilient',
        displayWord: 'Resilient',
        phonetic: '/rɪˈzɪl.jənt/',
        definition: 'có khả năng phục hồi nhanh chóng',
        contextSentence: 'She is a resilient learner.',
        savedAt: Date.now()
      },
      {
        cleanWord: 'immersion',
        displayWord: 'Immersion',
        phonetic: '/ɪˈmɜː.ʃən/',
        definition: 'sự đắm chìm, phương pháp học nhúng',
        contextSentence: 'Language immersion accelerates fluency.',
        savedAt: Date.now()
      }
    ];

    const saved = storage.saveVocabulary(mockWords);
    assert.strictEqual(saved, true);

    const loaded = storage.getVocabulary();
    assert.strictEqual(loaded.length, 2);
    assert.strictEqual(loaded[0].cleanWord, 'resilient');
    assert.strictEqual(loaded[1].cleanWord, 'immersion');
  });

  // Test 4: Tự động tạo bản sao lưu (.bak) trước khi ghi đè
  test('Tự động tạo file sao lưu .bak trong thư mục backups/', () => {
    const backupFilesBefore = fs.readdirSync(storage.backupDir).filter(f => f.endsWith('.bak'));
    
    // Ghi đè từ vựng mới
    storage.saveVocabulary([
      { cleanWord: 'perseverance', displayWord: 'Perseverance', definition: 'sự kiên trì' }
    ]);

    const backupFilesAfter = fs.readdirSync(storage.backupDir).filter(f => f.endsWith('.bak'));
    assert.strictEqual(backupFilesAfter.length > backupFilesBefore.length, true, 'Phải sinh ra bản sao lưu mới');
  });

  // Test 5: Giới hạn số lượng backup cũ (Không gây phình đĩa)
  test('Tự động dọn dẹp giữ lại tối đa 10 bản sao lưu mới nhất', () => {
    for (let i = 0; i < 15; i++) {
      storage.saveVocabulary([{ cleanWord: `word_${i}`, displayWord: `Word ${i}`, definition: `Nghĩa ${i}` }]);
    }
    const backupFiles = fs.readdirSync(storage.backupDir).filter(f => f.startsWith('vocabulary') && f.endsWith('.bak'));
    assert.strictEqual(backupFiles.length <= 10, true, `Số backup hiện tại là ${backupFiles.length}, không được vượt quá 10`);
  });

  // Test 6: Tự động khôi phục từ bản backup khi file chính bị hỏng (Corruption Rollback)
  test('Khôi phục tự động (Auto-rollback) khi vocabulary.json bị lỗi cấu trúc / mất điện đột ngột', () => {
    // 1. Lưu dữ liệu hợp lệ đầu tiên
    const validData = [
      { cleanWord: 'safeguard', displayWord: 'Safeguard', definition: 'bảo vệ an toàn', savedAt: 12345 }
    ];
    storage.saveVocabulary(validData);

    // 2. Giả lập file chính bị hỏng (corrupted json)
    fs.writeFileSync(storage.vocabFile, '{ "corrupted": INVALID_JSON_SYNTAX...', 'utf8');

    // 3. StorageManager đọc lại -> phải tự động phục hồi từ bản sao lưu gần nhất
    const recovered = storage.getVocabulary();
    assert.strictEqual(Array.isArray(recovered), true);
    assert.strictEqual(recovered.length > 0, true);
    assert.strictEqual(recovered.some(w => w.cleanWord === 'safeguard'), true, 'Dữ liệu từ vựng phải được bảo vệ nguyên vẹn');
  });

  // Test 7: Lưu và đọc Waveform Cache (0ms reload)
  test('Lưu và đọc Waveform Cache theo media hash', () => {
    const mediaHash = 'big_buck_bunny_1080p_hash_abc123';
    const mockPeaks = [0.12, 0.45, 0.88, 0.95, 0.32, 0.15, 0.65];

    const saved = storage.saveWaveformCache(mediaHash, mockPeaks);
    assert.strictEqual(saved, true);

    const cached = storage.getWaveformCache(mediaHash);
    assert.notStrictEqual(cached, null);
    assert.strictEqual(cached.mediaHash, mediaHash);
    assert.deepStrictEqual(cached.peaks, mockPeaks);
  });

  // Test 8: Trả về null khi Waveform Cache không tồn tại
  test('Waveform Cache trả về null an toàn khi hash chưa có trong kho', () => {
    const cached = storage.getWaveformCache('non_existent_video_hash');
    assert.strictEqual(cached, null);
  });

  // Test 9: Lưu và đọc trạng thái xem video (Resume Position & Subtitle Offset)
  test('Lưu và đọc trạng thái xem video (Resume Position & Subtitle Offset)', () => {
    const mediaKey = 'friends_s01e01_1080p.mkv';
    const state = {
      resumePosition: 245,
      subtitleOffset: -0.2,
      playbackRate: 1.25,
      duration: 1320
    };

    const saved = storage.savePlaybackState(mediaKey, state);
    assert.strictEqual(saved, true);

    const loaded = storage.getPlaybackState(mediaKey);
    assert.notStrictEqual(loaded, null);
    assert.strictEqual(loaded.resumePosition, 245);
    assert.strictEqual(loaded.subtitleOffset, -0.2);
    assert.strictEqual(loaded.playbackRate, 1.25);
    assert.strictEqual(typeof loaded.lastWatchedAt, 'number');
  });

  // Test 10: Giới hạn số lượng media gần nhất (tối đa 50 items)
  test('Tự động cắt tỉa danh sách lịch sử xem không vượt quá 50 files', () => {
    for (let i = 0; i < 55; i++) {
      storage.savePlaybackState(`video_${i}.mp4`, { resumePosition: i * 10 });
    }
    const raw = fs.readFileSync(storage.recentMediaFile, 'utf8');
    const parsed = JSON.parse(raw);
    const keys = Object.keys(parsed.items);
    assert.strictEqual(keys.length <= 50, true, `Số lượng file lưu là ${keys.length}, không vượt quá 50`);
  });

  // Dọn dẹp môi trường test
  try {
    fs.rmSync(testUserDataDir, { recursive: true, force: true });
  } catch (_) {}

  console.log(`\n========================================`);
  console.log(`KẾT QUẢ: ${passed}/${total} TEST CASES ĐẠT CHUẨN AN TOÀN DỮ LIỆU`);
  console.log(`========================================\n`);

  if (passed !== total) {
    process.exit(1);
  }
}

runTests();
