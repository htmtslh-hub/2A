# 📖 LINGOGLASS PLAYER 1.0 — HƯỚNG DẪN SỬ DỤNG CHI TIẾT (USER MANUAL)

Chào mừng bạn đến với **LingoGlass Player** — Trình phát đa phương tiện thế hệ mới chuyên sâu cho việc học ngoại ngữ trên **Windows 10/11** và **macOS**.

---

## 📑 MỤC LỤC
1. [Cài đặt & Khởi động](#1-cài-đặt--khởi-động)
2. [Mở Media & Nạp Phụ Đề](#2-mở-media--nạp-phụ-đề)
3. [Luyện Nghe Chuyên Sâu với Smart A-B Repeat](#3-luyện-nghe-chuyên-sâu-với-smart-a-b-repeat)
4. [Đồng Bộ Độ Trễ Phụ Đề (Subtitle Offset)](#4-đồng-bộ-độ-trễ-phụ-đề-subtitle-offset)
5. [Tra Từ Điển 1-Chạm & Sổ Tay Từ Vựng](#5-tra-từ-điển-1-chạm--sổ-tay-từ-vựng)
6. [Luyện Nói Shadowing & Ghi Âm Đối Chiếu](#6-luyện-nói-shadowing--ghi-âm-đối-chiếu)
7. [Sao Lưu & Phục Hồi Dữ Liệu An Toàn](#7-sao-lưu--phục-hồi-dữ-liệu-an-toàn)
8. [Kích Hoạt Bản Quyền PRO](#8-kích-hoạt-bản-quyền-pro)
9. [Bảng Phím Tắt Công Thái Học](#9-bảng-phím-tắt-công-thái-học)

---

## 1. Cài Đặt & Khởi Động

LingoGlass Player được xây dựng theo triết lý **Zero-Config**: bạn không cần cài đặt thêm Python, Node.js, FFmpeg hay bất kỳ bộ giải mã (codec) nào khác.

### Đối với Windows:
- **Cách 1 (Khuyên dùng):** Kích đúp vào file `LingoGlass Setup 1.0.0.exe`. Trình cài đặt sẽ tự động thiết lập và tạo biểu tượng trên Desktop và Start Menu.
- **Cách 2 (Bản di động Portable):** Kích đúp vào file `LingoGlass 1.0.0.exe` để chạy ngay mà không cần cài đặt, thích hợp mang theo trên USB.

---

## 2. Mở Media & Nạp Phụ Đề

### Mở Video & Audio:
- Nhấn vào nút **"Mở Media"** trên thanh tiêu đề hoặc kéo thả trực tiếp file vào màn hình ứng dụng.
- **Định dạng Video hỗ trợ:** MP4, MKV, WebM, MOV, AVI, FLV, WMV, TS... (Hỗ trợ tăng tốc phần cứng Hardware Decoding cho H.264, HEVC, VP9, AV1).
- **Định dạng Audio-Only (Podcast & Audiobook):** MP3, M4A, FLAC, WAV, AAC, OGG, Opus.

### Nạp Phụ Đề:
- Nhấn nút **"Nạp Sub"** hoặc kéo thả file phụ đề vào cửa sổ.
- **Định dạng hỗ trợ:** SRT, VTT, ASS, SSA.
- *Lưu ý an toàn:* Toàn bộ phụ đề được tự động khử mã độc (XSS Sanitization) trước khi hiển thị.

### Ghi nhớ vị trí phát tự động (Smart Resume):
- Khi bạn tắt ứng dụng hoặc mở video khác, LingoGlass tự động ghi nhớ giây bạn đang xem dở dang. Lần tới khi mở lại, video sẽ tự động tiếp tục từ vị trí đó.

---

## 3. Luyện Nghe Chuyên Sâu với Smart A-B Repeat

A-B Repeat trên LingoGlass được thiết kế để phục vụ việc bóc tách âm thanh:

- **Lặp lại câu thoại hiện tại (Phím `R`):** Chỉ cần bấm phím `R`, ứng dụng sẽ tự động căn chuẩn thời gian bắt đầu và kết thúc của câu phụ đề hiện tại và lặp lại đoạn đó.
- **Đặt mốc A thủ công (Phím `A`):** Đánh dấu thời điểm bắt đầu đoạn cần nghe kỹ.
- **Đặt mốc B thủ công (Phím `B`):** Đánh dấu thời điểm kết thúc và lập tức kích hoạt vòng lặp.
- **Hủy lặp (Phím `Esc`):** Thoát khỏi chế độ lặp A-B và tiếp tục phát bình thường.
- **Tùy chỉnh số vòng lặp:** Bạn có thể chọn lặp `3 lần`, `5 lần` hoặc `Vô hạn (∞)` ngay trên thanh công cụ nổi.

---

## 4. Đồng Bộ Độ Trễ Phụ Đề (Subtitle Offset)

Nếu phụ đề bị chậm hoặc nhanh hơn giọng nhân vật trong phim:
- Nhấn phím `[` để phụ đề xuất hiện sớm hơn (`-0.1s`). Nhấn `Shift + [` để lùi `-0.5s`.
- Nhấn phím `]` để phụ đề xuất hiện trễ hơn (`+0.1s`). Nhấn `Shift + ]` để tiến `+0.5s`.
- Chỉ số độ trễ được hiển thị trực tiếp trên thanh tiêu đề (ví dụ: `Sub: +0.20s`). Bạn có thể bấm vào chỉ số này để đưa độ trễ về `0.00s`.

---

## 5. Tra Từ Điển 1-Chạm & Sổ Tay Từ Vựng

- **Tra từ tức thì:** Rê chuột và click trực tiếp vào bất kỳ từ nào trên dòng phụ đề. Cửa sổ từ điển kính mờ sẽ hiển thị:
  - Phiên âm chuẩn quốc tế (IPA).
  - Từ loại (Danh từ, Động từ, Tính từ...).
  - Định nghĩa tiếng Việt giải thích theo ngữ cảnh.
  - Câu ví dụ trích xuất từ chính đoạn phim đang xem.
- **Lưu từ mới:** Bấm nút **"Lưu Từ"** (hoặc biểu tượng ngôi sao) để lưu từ vào Sổ tay từ vựng.
- **Xuất dữ liệu học tập:**
  - **Xuất CSV (Anki / Excel):** Xuất toàn bộ từ vựng ra file `.csv` có mã hóa UTF-8 BOM hiển thị chuẩn tiếng Việt trên Microsoft Excel và sẵn sàng nạp vào Anki Flashcards.
  - **Xuất bản sao lưu JSON:** Tải file lưu trữ đầy đủ để chuyển sang máy tính khác.

---

## 6. Luyện Nói Shadowing & Ghi Âm Đối Chiếu

Phương pháp Shadowing giúp bạn chuẩn hóa phát âm và ngữ điệu:
1. Nhấn phím **`S`** hoặc chọn tab **"Shadowing"** trên Sidebar để bật chế độ.
2. Ứng dụng sẽ tự động dừng video sau khi kết thúc một câu phụ đề.
3. Đồng hồ đếm ngược thông minh sẽ dừng lại để bạn nhại lại câu thoại.
4. Bấm nút **"Ghi âm"** để ghi lại giọng của bạn qua Microphone.
5. Nghe lại bản ghi âm của mình và đối chiếu trực tiếp với giọng của diễn viên bản xứ.

---

## 7. Sao Lưu & Phục Hồi Dữ Liệu An Toàn

Theo nguyên tắc an toàn dữ liệu:
- Mọi thao tác lưu từ vựng đều được ghi bằng cơ chế **Atomic Write** (chống hỏng file khi sập nguồn).
- Hệ thống tự động duy trì **10 bản sao lưu xoay vòng (`.bak`)** trong thư mục lưu trữ cục bộ.
- Nếu file chính gặp sự cố, LingoGlass tự động phục hồi về bản sao lưu an toàn gần nhất.
- Bạn cũng có thể chủ động bấm **"Restore"** trên Sidebar và chọn file `.json` để khôi phục dữ liệu bất cứ lúc nào.

---

## 8. Kích Hoạt Bản Quyền PRO

LingoGlass Player hoạt động theo cơ chế **Offline-First** (không bắt buộc kết nối mạng liên tục):
1. Bấm vào biểu tượng **"TRIAL"** hoặc **"Kích hoạt PRO"** trên thanh tiêu đề.
2. Nhập mã bản quyền do nhà phát triển cung cấp.
3. Mã bản quyền được xác thực bằng **chữ ký số Ed25519** và khóa an toàn theo thiết bị (Hardware Device Lock).
4. Sau khi kích hoạt, huy hiệu chuyển sang **PRO** vĩnh viễn và bạn có thể sử dụng trọn đời hoàn toàn offline.

---

## 9. Bảng Phím Tắt Công Thái Học

| Phím Tắt | Thao Tác |
| :--- | :--- |
| `Space` | Phát / Tạm dừng video |
| `J` hoặc `←` | Tua lùi 5 giây (Giữ `Shift` để lùi 10s) |
| `L` hoặc `→` | Tua tiến 5 giây (Giữ `Shift` để tiến 10s) |
| `↑` (Arrow Up) | Nhảy về câu phụ đề phía trước |
| `↓` (Arrow Down) | Nhảy sang câu phụ đề tiếp theo |
| `R` | **Lặp lại câu thoại hiện tại (Snap A-B)** |
| `A` | Đặt mốc lặp A tại vị trí đang phát |
| `B` | Đặt mốc lặp B và bắt đầu lặp đoạn |
| `Esc` | Xóa bỏ chế độ lặp A-B |
| `[` / `]` | Đồng bộ phụ đề sớm hơn / trễ hơn `±0.1s` (Giữ `Shift` để `±0.5s`) |
| `-` / `+` | Giảm tốc độ / Tăng tốc độ phát (`0.5x` đến `2.0x`) |
| `S` | Bật / Tắt chế độ luyện nói Shadowing |
| `M` | Bật / Tắt âm thanh (Mute) |
| `F1` hoặc `?` | Bật / Tắt bảng hướng dẫn phím tắt nổi |
