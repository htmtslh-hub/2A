# 🎬 LingoGlass Player 1.0 — Cross-Platform Language Learning Media Player

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com)
[![Platform](https://img.shields.io/badge/platform-Windows%2010%2F11%20%7C%20macOS-lightgrey.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-Commercial%20L3-emerald.svg)](https://github.com)
[![Tests](https://img.shields.io/badge/tests-32%2F32%20passed-brightgreen.svg)](https://github.com)

**LingoGlass Player** là trình phát đa phương tiện chuyên sâu dành cho việc học ngoại ngữ qua phim ảnh, video tài liệu và podcast trên **Windows 10/11** và **macOS**. Ứng dụng kết hợp giữa trải nghiệm xem phim chất lượng cao với các công cụ học tập thông minh: **Giao diện Glassmorphism (Glass UI/UX)**, **Smart A-B Repeat**, **Audio Waveform**, **Phụ đề đa ngôn ngữ tương tác**, **Luyện nói Shadowing**, **Chống vi phạm bản quyền L3 (Ed25519)** và **Lưu trữ dữ liệu học tập an toàn tuyệt đối**.

---

## 🌟 Triết Lý Sản Phẩm (Master Plan v4.1)

- **LIGHTWEIGHT BY DESIGN:** Tận dụng giải mã phần cứng (Hardware Decode), không tiêu hao CPU/RAM khi tạm dừng (CPU idle < 2%), bộ cài đặt chỉ **~84 MB**.
- **KEYBOARD-FIRST:** Thao tác 100% các tính năng học cốt lõi bằng bàn phím tiện lợi, kèm giao diện chuột trực quan cho người mới bắt đầu.
- **LOCAL-FIRST & SECURE:** Hoạt động hoàn toàn Offline, không gửi dữ liệu học tập hay bản ghi âm lên máy chủ nếu không có yêu cầu. Dữ liệu từ vựng được bảo toàn bằng cơ chế **Atomic Write** và **Auto-rollback**.
- **ANTI-PIRACY LEVEL 3:** Hệ thống bản quyền bất đối xứng **Ed25519** kết hợp định danh phần cứng (**Hardware Device Lock**) và mã hóa cục bộ **AES-256**.
- **ZERO-CONFIG:** Không cần cài đặt Python, Node.js, FFmpeg hay bất kỳ codec nào bên ngoài.

---

## ✨ Tính Năng Cốt Lõi

1. **Giao Diện Glass UI/UX Tinh Tế:**
   - Hỗ trợ hiệu ứng Mica (Windows 11) và Vibrancy (macOS).
   - Thanh điều khiển nổi (**Floating Control Island**) tự động ẩn mượt mà khi xem toàn màn hình.
   - Bảng phím tắt công thái học nổi (`F1` hoặc `?`).

2. **Smart A-B Repeat (Lặp Đoạn Bóc Tách Âm):**
   - **Snap-to-Sentence (Phím `R`):** Tự động phát hiện và lặp lại chính xác câu thoại hiện tại chỉ với 1 phím bấm.
   - Đặt mốc A (`A`), mốc B (`B`), hủy lặp (`Esc`).
   - Tinh chỉnh mốc thời gian vi mô `±0.2s`.
   - Lặp `3x`, `5x` hoặc `Vô hạn (∞)` rồi tự động phát tiếp.

3. **Học Qua Âm Thanh Thuần Túy (Audio-Only Learning):**
   - Phát mọi định dạng âm thanh: **MP3, M4A, FLAC, WAV, AAC, OGG, Opus** kết hợp với file phụ đề rời (`.srt`, `.vtt`) để học qua **Podcast** và **Audiobook**.

4. **Ghi Nhớ Vị Trí Phát Thông Minh (Smart Resume Position):**
   - Tự động ghi nhớ giây đang xem dở dang (`resumePosition`), độ trễ phụ đề (`subtitleOffset`) và tốc độ phát theo từng tệp.
   - Mở lại file cũ sẽ tự động tiếp tục phát đúng thời điểm trước đó.

5. **Đồng Bộ Độ Trễ Phụ Đề (Subtitle Offset):**
   - Tinh chỉnh phụ đề nhanh/chậm `±100ms`, `±500ms` với phím `[` và `]`.
   - Hiển thị trực tiếp chỉ số lệch thời gian trên thanh tiêu đề.

6. **Phụ Đề Tương Tác & Tra Từ Điển 1-Chạm:**
   - Click trực tiếp vào bất kỳ từ vựng nào để xem phiên âm IPA, từ loại, nghĩa ngữ cảnh và nghe phát âm.
   - **Chế độ làm mờ tiếng Việt (Blur Vietnamese):** Rê chuột mới hiện nghĩa dịch để ép não bộ tự nghe và suy đoán.
   - **Xuất từ vựng:** Xuất file `.csv` chuẩn UTF-8 BOM hiển thị chuẩn xác tiếng Việt trên Microsoft Excel và sẵn sàng import vào Anki Flashcards.
   - **Sao lưu an toàn:** Xuất/Nhập file `.json` với cơ chế khử trùng lặp từ vựng tự động.

7. **Luyện Nói Shadowing & Ghi Âm Đối Chiếu:**
   - Tự động dừng ở cuối mỗi câu thoại và đếm ngược thông minh.
   - Tích hợp ghi âm Microphone cục bộ, cho phép nghe lại giọng mình để so sánh trực tiếp với diễn viên bản xứ.

---

## ⌨️ Bảng Phím Tắt (Keyboard Cheatsheet)

| Phím Tắt | Thao Tác |
| :--- | :--- |
| `Space` | Phát / Tạm dừng video |
| `J` hoặc `←` | Tua lùi 5 giây (Giữ `Shift` để lùi 10s) |
| `L` hoặc `→` | Tua tiến 5 giây (Giữ `Shift` để tiến 10s) |
| `↑` (Arrow Up) | Nhảy về câu phụ đề phía trước |
| `↓` (Arrow Down) | Nhảy sang câu phụ đề kế tiếp |
| `R` | **Lặp lại câu thoại hiện tại (Snap A-B)** |
| `A` | Đặt mốc bắt đầu lặp A |
| `B` | Đặt mốc kết thúc lặp B |
| `Esc` | Hủy bỏ chế độ lặp A-B |
| `[` / `]` | Đồng bộ phụ đề sớm/trễ `±0.1s` (Giữ `Shift` để `±0.5s`) |
| `-` / `+` | Giảm tốc độ / Tăng tốc độ phát (`0.5x` - `2.0x`) |
| `S` | Bật / Tắt chế độ luyện nói Shadowing |
| `M` | Tắt / Bật tiếng (Mute) |
| `F1` hoặc `?` | Hiển thị bảng hướng dẫn phím tắt |

---

## 📦 Bản Cài Đặt Chính Thức (Thư mục `release/`)

Các bản phát hành đã được đóng gói sẵn sàng phân phối:
- **Bộ cài Windows 1-Click:** [`release/LingoGlass Setup 1.0.0.exe`](file:///d:/3.%20Agent/3-app/1-mkv/release/LingoGlass%20Setup%201.0.0.exe) (~83.9 MB)
- **Bản di động Portable:** [`release/LingoGlass 1.0.0.exe`](file:///d:/3.%20Agent/3-app/1-mkv/release/LingoGlass%201.0.0.exe) (~83.8 MB)
- **Bản giải nén Unpacked:** [`release/win-unpacked/LingoGlass.exe`](file:///d:/3.%20Agent/3-app/1-mkv/release/win-unpacked/LingoGlass.exe)

---

## 🛠️ Dành Cho Lập Trình Viên

### Cài đặt dependencies:
```bash
npm install
```

### Chạy chế độ phát triển (Electron + Vite HMR):
```bash
npm run electron:dev
```

### Chạy toàn bộ 32 bài kiểm thử tự động (Unit, Security, Persistence):
```bash
npm test
```

### Biên dịch và đóng gói bộ cài mới:
```bash
npm run electron:build
```

### Phát hành License Key mới cho khách hàng:
```bash
npm run issue-license khachhang@email.com LIFETIME
# hoặc gắn với mã thiết bị phần cứng cụ thể:
npm run issue-license khachhang@email.com LIFETIME DEV-8F2B9C01A2E3D4F5
```

---

## 📄 Bản Quyền & Giấy Phép
- Tài liệu hướng dẫn sử dụng: [USER_GUIDE.md](file:///d:/3.%20Agent/3-app/1-mkv/USER_GUIDE.md)
- Thông báo bản quyền phần mềm bên thứ ba: [THIRD_PARTY_NOTICES.md](file:///d:/3.%20Agent/3-app/1-mkv/THIRD_PARTY_NOTICES.md)
- Lộ trình thực thi chi tiết: [TIMELINE.md](file:///d:/3.%20Agent/3-app/1-mkv/TIMELINE.md)
- Kế hoạch tổng thể: [PLAN.md](file:///d:/3.%20Agent/3-app/1-mkv/PLAN.md)
