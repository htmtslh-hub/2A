# Motion Map — Volt Hoodie 1.0.0

Tuân thủ quy tắc animation của chủ sản phẩm ngày 05/10/2026:
- **Mặc định bật (Default ON)** trên mọi trình duyệt (Chromium, Firefox, Microsoft Edge, Cốc Cốc), kể cả khi hệ điều hành bật `prefers-reduced-motion: reduce` hoặc có trạng thái lưu cũ.
- **Không dùng vòng lặp vô hạn**: Mọi chuyển động đều hữu hạn, dùng `requestAnimationFrame` điều khiển `transform` và `opacity` với thời lượng xác định (620ms–850ms), tự động hủy lượt cũ (`cancelAnimationFrame`) khi có thao tác mới và dọn sạch inline style khi kết thúc (`progress === 1`).
- **Tạm dừng trong phiên**: Nút `.motion-toggle` ("Pause motion" / "Resume motion") ở chân trang cho phép người xem chủ động tắt/bật hiệu ứng trong phiên đang mở; tải lại trang mặc định bật lại.

## Danh sách hiệu ứng chuyển động & cuộn

| Hiệu ứng | Phần tử áp dụng | Trigger | Thời lượng / Cơ chế | Dự phòng & Dọn dẹp |
|---|---|---|---|---|
| Hero Entry Reveal | `.hero__product`, `.hero__copy` (`[data-entry]`) | Ngay khi trang khởi tạo JS | `requestAnimationFrame` hữu hạn 720ms–880ms, easing bậc 3 (`1 - (1 - t)^3`), dịch chuyển `translate3d` và `opacity` từ `0.25` → `1` | Tự gỡ `transform`/`opacity` khi hoàn tất; không dùng CSS `@keyframes` kéo dài quá 5 giây |
| Chuyển đổi phối màu / Slide 2 chiều | `.hero__product`, `.hero__price`, `.hero__rail-thumb`, `.hero__watermark` | Bấm 3 chấm `Color`, 3 chấm đáy `.hero__dots`, phím `ArrowLeft`/`ArrowRight`, hoặc vuốt ngang trên `.hero__product-stage` | `requestAnimationFrame` hữu hạn 640ms theo hướng chuyển (`direction * 48px`), cập nhật ảnh WebP, giá/nhãn phối màu và vị trí thanh trượt dọc `.hero__rail-thumb` | Hủy ngay frame cũ nếu bấm nhanh liên tiếp; hỗ trợ wrap hai chiều (`0 ↔ 2`) |
| Scroll-linked Reveal & Watermark Shift | Các khối `[data-reveal]` ở `#shop`, `#kids`, `#sports`, `#support`, `#order` | `IntersectionObserver` (`threshold: 0.15`) khi cuộn xuống/lên | `requestAnimationFrame` hữu hạn 680ms (`translate3d(0, 28px, 0)` → `0`, `opacity: 0.2` → `1`), đánh dấu `data-revealed="true"` và `unobserve` | Khi tắt JS, toàn bộ `[data-reveal]` vẫn hiển thị `opacity: 1` đầy đủ |
| Chọn kích cỡ (`S`, `M`, `L`) | `.size-picker button`, `[data-selected-size]` | Click hoặc phím Enter/Space trên nút `S`, `M`, `L` | Đổi trạng thái `aria-pressed="true"`, chạy phản hồi nhịp ngắn 320ms trên thẻ tóm tắt cấu hình tại `#order` | Đồng bộ ngay tên size và số đo ngực/dài áo tương ứng |
