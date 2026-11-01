# FILM STUDIO PRO v2.5.0 — BỘ CÀI ĐẶT PC WINDOWS (KÈM MCP SERVER :3100)
==========================================================================

Chúc mừng bạn đã sở hữu **Film Studio Pro v2.5.0** từ Forge Zone (https://forgezone.store)!
Toàn bộ phần mềm đã được đóng gói thành bộ cài đặt Windows `.exe` độc lập — **KHÔNG CẦN CÀI ĐẶT PYTHON**.

## 🚀 BƯỚC 1: CÀI ĐẶT TRÊN MÁY TÍNH (1-CLICK)
1. Bấm đúp chạy file **`Film_Studio_Pro_Setup_v2.5.0.exe`**.
2. Trong cửa sổ cài đặt:
   - Chọn thư mục cài đặt (Mặc định: `%LOCALAPPDATA%\Programs\FilmStudioPro`).
   - Giữ nguyên các ô tích:
     [x] Tạo biểu tượng Film Studio Pro ngoài màn hình Desktop
     [x] Tự động gắn kết nối MCP 1-Click vào Claude Desktop, Cursor, Windsurf
     [x] Khởi chạy Film Studio Pro ngay sau khi hoàn tất cài đặt
3. Nhấn nút **🚀 Bắt đầu cài đặt** -> Chờ thanh tiến trình chạy 100% -> Nhấn **Hoàn tất & Mở App**.

*(Lưu ý: Nếu Windows SmartScreen hiện bảng xanh hỏi xác nhận cho ứng dụng mới tải về, bấm **More info (Thêm thông tin)** -> **Run anyway (Vẫn chạy)**).*

---

## 🔑 BƯỚC 2: KÍCH HOẠT BẢN QUYỀN THEO MÃ MÁY (MACHINE ID)
1. Khi ứng dụng mở lên, ở bảng kích hoạt bản quyền (hoặc nút **🔑 Bản Quyền** góc dưới cột trái), bấm **📋 Sao chép Mã Máy** (Định dạng: `FS-XXXX-XXXX-XXXX-XXXX`).
2. Truy cập trang kích hoạt trực tuyến tại:
   👉 **https://forgezone.store/kich-hoat**
3. Đăng nhập tài khoản đã mua gói trên Forge Zone -> Dán **Mã Máy** vào ô -> Hệ thống sẽ cấp ngay mã **`FZKEY-...`** khớp thời hạn gói mua của bạn.
4. Dán mã `FZKEY-...` vào ứng dụng và bấm **✅ Kích Hoạt Bản Quyền** (hoặc chỉ cần bấm nút **🌐 Tự Động Kích Hoạt Qua Web** ngay trong ứng dụng).

---

## 🔌 BƯỚC 3: SỬ DỤNG 11 PHÂN HỆ & ĐIỀU KHIỂN QUA AI MCP (:3100)
- **Dùng trực tiếp trên giao diện đồ họa:**
  - Bước 1: Soạn kịch bản phân cảnh 8s chuẩn FlowKit, tách kịch bản từ video mẫu, làm sạch từ nhạy cảm.
  - Bước 2: Tạo ảnh đồng nhất nhân vật (`CHAR_01`, `CHAR_02`), quay video hàng loạt qua Google Flow / Veo 3.1 / Muse.ai.
  - Bước 3: Phòng thu giọng đọc AI đa nhân vật (Edge-TTS miễn phí & 23 giọng Google Vids) + Dựng hậu kỳ FFmpeg GPU 58 chuyển cảnh.
- **Điều khiển tự động bằng AI bên ngoài (Claude Desktop, Cursor, Windsurf, n8n):**
  - Trình cài đặt đã tự động cấu hình `FilmStudioMCP.exe --stdio` vào các phần mềm AI trên máy của bạn, đồng thời cổng HTTP/SSE luôn chạy tại `http://127.0.0.1:3100/sse` khi mở app.
  - Bạn chỉ cần mở Claude Desktop / Cursor và ra lệnh:
    *"Hãy dùng công cụ film_studio_auto_pipeline tạo cho tôi bộ phim hoạt hình 3D Pixar 5 phân cảnh về chú mèo máy thám hiểm rừng phát sáng"*.

---
💬 **Hỗ trợ kỹ thuật 24/7:**
- Nhóm CSKH Zalo: https://zalo.me/g/ghysgisxqd7jojoztf33
- Hướng dẫn chi tiết trên Web: https://forgezone.store/huong-dan?template=film-studio
