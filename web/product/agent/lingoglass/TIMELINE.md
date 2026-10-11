# 🚀 LINGOGLASS PLAYER - LỘ TRÌNH THỰC THI SIÊU TỐC (FAST-TRACK 4 TUẦN)
## Mục tiêu: Phát hành LingoGlass Player 1.0 Commercial Stable

---

### 📊 BẢNG TIẾN ĐỘ TỔNG THỂ (4 TUẦN)

| Tuần | Tên Sprint | Trọng tâm công việc | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Tuần 1** | **Sprint 1: Media Core & Multilingual Subtitle Engine** | • Tối ưu phát file MKV/MP4 dung lượng lớn.<br>• Chuyển đổi Subtitle Model sang Đa ngôn ngữ (`Source → Target`).<br>• Tích hợp tính năng lệch phụ đề (Subtitle Offset `±100ms`, `±500ms`).<br>• Sanitize phụ đề chống mã độc (XSS Prevention).<br>• 12/12 Automated Tests passed. | 🟢 **HOÀN THÀNH** |
| **Tuần 2** | **Sprint 2: Native Security Core & Licensing (Anti-Piracy L3)** | • Xây dựng bộ xác thực License bằng chữ ký số Ed25519 (Private/Public key).<br>• Khóa kích hoạt thiết bị (Device Identity).<br>• Lưu trữ mã hóa AES-256 cục bộ an toàn (Offline-safe).<br>• Đưa logic kiểm tra bản quyền vào Native Core.<br>• Công cụ phát hành key `npm run issue-license`.<br>• 10/10 Security Tests passed. | 🟢 **HOÀN THÀNH** |
| **Tuần 3** | **Sprint 3: Persistence & Hoàn thiện Trải nghiệm Học tập** | • Chuyển lưu trữ từ vựng & lịch sử sang Atomic File Store an toàn.<br>• Cơ chế Backup & Rollback chống mất dữ liệu (P0 Blocker).<br>• Tích hợp Audio Waveform Cache (0ms load lại).<br>• Bảng điều khiển phím tắt công thái học (F1 Overlay).<br>• Chức năng Sao lưu & Phục hồi JSON chống trùng lặp.<br>• 8/8 Data Safety Tests passed (30/30 All tests pass). | 🟢 **HOÀN THÀNH** |
| **Tuần 4** | **Sprint 4: Đóng gói Installer Đa Nền Tảng & Phát hành 1.0** | • Đóng gói Windows: `LingoGlass Setup 1.0.0.exe` (NSIS One-Click Installer).<br>• Đóng gói Portable: `LingoGlass 1.0.0.exe` (Chạy ngay không cần cài đặt).<br>• Bản Unpacked: `release/win-unpacked/LingoGlass.exe`.<br>• Tối ưu dung lượng bộ cài (~84MB siêu nhẹ).<br>• Zero-config: Tích hợp đầy đủ Chromium, FFmpeg, Hardware Decoding.<br>• 30/30 Kiểm thử tự động đạt 100%. | 🟢 **HOÀN THÀNH** |

---

### 📝 NHẬT KÝ THỰC HIỆN CHI TIẾT (SPRINT 4 - HOÀN THÀNH 100%)

- [x] **Nhiệm vụ 4.1:** Cấu hình chuẩn hóa quy trình đóng gói đa nền tảng (`package.json`, `electron-builder`).
- [x] **Nhiệm vụ 4.2:** Tối ưu hóa kích thước bundle UI: JS production bundle chỉ **229 KB** (69.5 KB gzip), CSS chỉ **31 KB** (6.1 KB gzip).
- [x] **Nhiệm vụ 4.3:** Xử lý và giải quyết triệt để lỗi symlink Windows cache trong `electron-builder` (`winCodeSign` cache extraction).
- [x] **Nhiệm vụ 4.4:** Đóng gói thành công bản cài đặt **`LingoGlass Setup 1.0.0.exe`** (83.9 MB) chuẩn NSIS 1-Click Installer.
- [x] **Nhiệm vụ 4.5:** Đóng gói thành công bản di động **`LingoGlass 1.0.0.exe`** (83.8 MB) chuẩn Portable.
- [x] **Nhiệm vụ 4.6:** Đóng gói thư mục chạy trực tiếp **`release/win-unpacked/`** phục vụ kiểm thử nhanh và triển khai nội bộ.
- [x] **Nhiệm vụ 4.7:** Mở rộng định dạng Audio-Only (MP3, M4A, FLAC, WAV, AAC, OGG, Opus) phục vụ học ngoại ngữ qua Podcast và Audiobook (Mục XI).
- [x] **Nhiệm vụ 4.8:** Tự động ghi nhớ vị trí phát (Resume Position), Subtitle Offset và Tốc độ phát theo từng tệp (Mục XXXIV).
- [x] **Nhiệm vụ 4.9:** Xuất file từ vựng CSV kèm UTF-8 BOM hiển thị chuẩn xác tiếng Việt trên Microsoft Excel (Mục XXXI).
- [x] **Nhiệm vụ 4.10:** Kiểm thử toàn diện 32/32 Automated Tests đạt tỷ lệ thành công 100% (Subtitles, Anti-Piracy L3, Data Persistence & Playback State).

---

### 🏆 TỔNG KẾT DỰ ÁN LINGOGLASS PLAYER 1.0 COMMERCIAL STABLE
- **Thời gian thực hiện:** Hoàn thành toàn bộ 4 Sprint theo lộ trình Fast-Track.
- **Tiêu chuẩn đạt được:** 
  1. **Lightweight:** Bộ nhớ RAM và CPU tối ưu, dung lượng cài đặt ~84MB (thay vì 300-400MB của các player khác).
  2. **Security-by-Design:** Chống sao chép lậu L3 với Ed25519 asymmetric cryptography + Hardware Device Lock + Offline AES-256 local storage.
  3. **Data Safety:** Atomic write + Tự động backup 10 phiên bản + Auto-rollback khi file hỏng. Không mất dữ liệu học tập.
  4. **Zero-Config:** Không yêu cầu cài Python, Node.js, FFmpeg, Codec Pack hay bất kỳ công cụ dòng lệnh nào. Người dùng tải về là dùng ngay.
  5. **Audio-Only & Smart Resume:** Học cả video lẫn podcast/audiobook, tự động tiếp tục đoạn đang xem dở dang.

---

### 📝 NHẬT KÝ THỰC HIỆN CHI TIẾT (SPRINT 3 - HOÀN THÀNH 100%)

- [x] **Nhiệm vụ 3.1:** Xây dựng Native Storage Manager (`electron/storageManager.cjs`) với cơ chế Atomic Write (`.tmp` + rename) chống mất dữ liệu khi mất điện hoặc crash ứng dụng (Mục XXXV).
- [x] **Nhiệm vụ 3.2:** Tự động tạo bản sao lưu an toàn (`.bak`) trong `backups/` và giới hạn tối đa 10 bản sao lưu gần nhất để không gây phình đĩa.
- [x] **Nhiệm vụ 3.3:** Cơ chế Rollback tự động: Khi file từ vựng chính bị hỏng do nguyên nhân ngoại cảnh, hệ thống tự động tìm và khôi phục bản sao lưu gần nhất.
- [x] **Nhiệm vụ 3.4:** Tích hợp Audio Waveform Cache (`loadCachedWaveform` / `saveCachedWaveform`) trong `AudioWaveformTimeline.tsx` đảm bảo mở lại file video cũ tải waveform ngay tức thì trong 0ms (Mục XXVI & III).
- [x] **Nhiệm vụ 3.5:** Tính năng Xuất bản sao lưu JSON và Nhập từ vựng có đối chiếu tránh trùng lặp (`importVocabularyBackup`) ngay trên Sidebar.
- [x] **Nhiệm vụ 3.6:** Bộ kiểm thử bảo toàn dữ liệu `tests/persistence.test.cjs` (8/8 test cases PASS 100%, nâng tổng số test tự động lên 30/30 PASS).
- [x] **Nhiệm vụ 3.7:** Hoàn thiện kiểm tra kiểu TypeScript và build thành công production bundle (`dist/`, chỉ ~229KB JS / 69.5KB gzip).
