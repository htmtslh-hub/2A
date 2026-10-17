# Motion Map — FitClub Food 1.0.0

Tuân thủ quy tắc animation của chủ sản phẩm ngày 05/10/2026:
- **Mặc định bật (Default ON)** trên mọi trình duyệt (Chromium, Firefox, Microsoft Edge, Cốc Cốc), kể cả khi hệ điều hành bật `prefers-reduced-motion: reduce` hoặc có trạng thái lưu cũ.
- **Không dùng vòng lặp vô hạn**: Mọi chuyển động đều hữu hạn, dùng `requestAnimationFrame` điều khiển `transform` và `opacity` với thời lượng xác định (320ms–720ms), tự động hủy lượt cũ (`cancelAnimationFrame`) khi có thao tác mới và dọn sạch inline style khi kết thúc (`progress === 1`).
- **Tạm dừng trong phiên**: Nút `[data-motion-toggle]` ("Pause motion" / "Resume motion") ở chân trang cho phép người xem chủ động tắt/bật hiệu ứng trong phiên đang mở; tải lại trang mặc định bật lại.

## Danh sách hiệu ứng chuyển động & cuộn

| Hiệu ứng | Phần tử áp dụng | Trigger | Thời lượng / Cơ chế | Dự phòng & Dọn dẹp |
|---|---|---|---|---|
| Hero Entry Reveal | `.hero__copy` (`[data-entry]`), `.hero__platter` | Khi khởi tạo JS | `requestAnimationFrame` hữu hạn 420ms, easing bậc 3 (`1 - (1 - t)^3`), dịch chuyển `translate3d` và `opacity` về trạng thái chuẩn | Tự gỡ `transform`/`opacity` ngay khi hoàn tất (`t = 1`) |
| Chuyển đổi khay thực phẩm 2 chiều (3 Platters) | `.hero__platter`, `[data-hero-desc]`, `[data-platter-kcal]`, `[data-platter-protein]` | Bấm thẻ chọn khay (`[data-view="0|1|2"]`), nút tiến/lùi, phím `ArrowLeft`/`ArrowRight` hoặc vuốt ngang trên `.hero__stage` | `requestAnimationFrame` hữu hạn 340ms theo hướng chuyển (`direction * 36px` + xoay nhẹ `direction * 4deg`), đổi ảnh WebP tách nền và đồng bộ thông tin xuống bảng đặt món `#order` | Hủy ngay frame cũ nếu bấm nhanh liên tiếp; hỗ trợ wrap hai chiều (`0 ↔ 2`) |
| Scroll-linked Reveal & Concentric Ring Parallax | Các khối `[data-reveal]` ở `#bowls`, `#nutrition`, `#plans`, `#order` và `.hero__rings` | `IntersectionObserver` (`threshold: 0.14`) + sự kiện cuộn thực tế | `requestAnimationFrame` hữu hạn 380ms (`translate3d(0, 24px, 0)` → `0`, `opacity: 0.18` → `1`), đánh dấu `data-revealed="true"` và `unobserve` | Khi tắt JS, toàn bộ `[data-reveal]` vẫn hiển thị `opacity: 1` đầy đủ |
| Chọn khẩu phần (`Standard`, `Athlete`, `Plant Plus`) | `[data-portion]` và bảng tóm tắt đơn `#order` | Click hoặc phím Enter/Space trên nút chọn khẩu phần | Đổi trạng thái `aria-pressed="true"`, chạy phản hồi nhịp ngắn 280ms trên thẻ tóm tắt đơn và cập nhật liên kết `mailto:` | Đồng bộ ngay lượng kcal, giá minh họa và nội dung email đặt món |
