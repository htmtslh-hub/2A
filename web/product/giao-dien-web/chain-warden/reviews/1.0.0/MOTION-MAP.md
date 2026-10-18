# Bản đồ chuyển động và tương tác (`MOTION-MAP.md`)

## 1. Chính sách chuyển động (Rules 05/10/2026)

- **Mặc định BẬT trên mọi trình duyệt** (Chromium, Firefox, Microsoft Edge, Cốc Cốc), kể cả khi hệ điều hành bật `prefers-reduced-motion: reduce` hoặc còn `localStorage`/`sessionStorage` cũ lưu trạng thái tắt (`motion=off`).
- **Tạm dừng trong phiên**: Nút `#motion-toggle` (`Pause motion` / `Resume motion`) cho phép người xem chủ động tạm dừng trong phiên hiện tại; tải lại trang tự động bật lại.
- **Đường chạy dự phòng hữu hạn (`requestAnimationFrame`)**: Mọi chuyển cảnh đổi ngoại trang (`Classic` / `Dark Star` / `High Noon` / `FPX`) và đổi kỹ năng (`P / Q / W / E / R`) đều chạy qua hàm `animateSwap()` dùng `requestAnimationFrame` hữu hạn (`420ms`, easing `cubic-bezier`), tự hủy lượt cũ (`cancelAnimationFrame`) khi có thao tác mới, không để vòng lặp vô hạn.

## 2. Danh mục hiệu ứng

| Mã | Thành phần | Trigger | Thời lượng / Tiến trình | Cơ chế & Fallback | Trạng thái không JS / Tạm dừng |
|---|---|---|---|---|---|
| **M01** | Chuyển đổi ngoại trang Hero (`.hero__stage-art`, `.skin-btn`) | Bấm 1 trong 4 ngoại trang (`Classic`, `Dark Star`, `High Noon`, `FPX`), bấm nút `#hero-next` / `[data-step="1"]`, phím mũi tên trái/phải hoặc vuốt ngang | `420ms` hữu hạn | `requestAnimationFrame` điều khiển `opacity` (`0.18 -> 1`) và `transform: translate3d(tx, 0, 0) scale(0.97 -> 1)` trên `.hero__stage-art`, đồng bộ đổi `src` WebP và nhãn trạng thái | Khi tắt JS hoặc tạm dừng motion: đổi `src` tức thì (`opacity: 1; transform: none`). |
| **M02** | Chuyển đổi kỹ năng (`P / Q / W / E / R`) | Bấm `.ability-btn` hoặc thẻ kỹ năng ở `#gameplay` | `280ms` hữu hạn | `requestAnimationFrame` làm mờ/hiện khối `.ability-detail` (`translateY(6px -> 0)`, `opacity: 0.25 -> 1`) và cập nhật tên, sát thương, hồi chiêu, mô tả | Khi tạm dừng motion: cập nhật văn bản tức thì không dịch chuyển. |
| **M03** | Reveal khi cuộn (`[data-reveal]`) | `IntersectionObserver` + listener `scroll` | `460ms` hữu hạn | Thêm `.is-visible` và chạy `requestAnimationFrame` hữu hạn đưa `opacity: 1`, `transform: translate3d(0,0,0)`. Khi mới tải ở chế độ kiểm tra tự động hoặc không JS, giữ hiển thị đọc được đầy đủ | Không JS: CSS hiển thị đầy đủ (`opacity: 1`). |
| **M04** | Parallax thanh tiến trình cuộn (`[data-scroll-scene]`) | Sự kiện `scroll` và `resize` trên cửa sổ | Liên kết tiến trình cuộn `0.00 -> 1.00` | Tính tỷ lệ cuộn qua khối `#news` / `#lore`, cập nhật `--scroll-progress` và dịch chuyển lớp sương mù / thanh năng lượng linh hồn bằng `transform: translate3d(...)` | Khi tạm dừng motion: cố định ở vị trí cân bằng (`transform: none`). |
