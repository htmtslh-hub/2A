# Motion Map — Atlas 1.0.0

Tuân thủ quy tắc animation của chủ sản phẩm ngày 05/10/2026:
- **Mặc định bật (Default ON)** trên mọi trình duyệt (Chromium, Firefox, Microsoft Edge, Cốc Cốc), kể cả khi hệ điều hành bật `prefers-reduced-motion: reduce` hoặc có trạng thái tắt cũ trong `localStorage`.
- **Không dùng vòng lặp vô hạn**: Mọi hiệu ứng chuyển cảnh, Scroll Word, chọn tầng độ sâu và reveal đều dùng `requestAnimationFrame` hữu hạn (320ms–680ms), tự động hủy lượt cũ (`cancelAnimationFrame`) khi có thao tác mới và dọn sạch inline style khi kết thúc (`progress === 1`).
- **Tạm dừng trong phiên**: Nút `.motion-toggle` (`[data-motion-toggle]`, nhãn `"Pause motion"` / `"Resume motion"`) cho phép người xem chủ động tạm dừng hoặc bật lại hiệu ứng trong phiên đang mở; tải lại trang mặc định bật lại.

## 1. Các Skill được áp dụng
1. **`forgeframe`**: Phân tích tọa độ tham chiếu `940×530`, loại trừ 3 lớp phủ ứng dụng ngoài, tái tạo minh hoạ gốc tự tạo, đối chiếu điểm tương đồng >95% và kiểm định đa trình duyệt.
2. **`skill-morge`**: Điều phối chuyển cảnh hải trình hai chiều (`Next` / `Previous` / chọn trực tiếp chỉ số `0, 1, 2`), tính hướng `direction` trước khi modulo, hỗ trợ wrap trực tiếp `2 → 0` và `0 → 2` không đẩy cảnh trung gian qua tâm, hỗ trợ phím `ArrowLeft` / `ArrowRight` và vuốt ngang.
3. **`neon-orbit-border`**: Tạo đường viền gradient xoay quanh thẻ chủ đề đang chọn trong khu vực `#stories` (`People`, `Places`, `Oceans`, `Ideas`) và nút đánh dấu hải trình mà không làm thay đổi màu nền bên trong.
4. **Scroll Word Choreography**: Hiệu ứng chữ sáng và nổi dần từng từ (`[data-scroll-word]`) theo tiến độ cuộn thực tế của trang tại phân đoạn `#journey` (vẫn đảm bảo độ tương phản đạt chuẩn WCAG AA `>= 4.5:1` ở cả trạng thái chờ lẫn trạng thái kích hoạt).

## 2. Bảng chi tiết hiệu ứng chuyển động & cuộn

| Hiệu ứng | Phần tử áp dụng | Trigger | Thời lượng / Cơ chế | Dự phòng & Dọn dẹp |
|---|---|---|---|---|
| Hero Entrance Reveal | `.hero__editorial`, `.hero__scene-wrap`, `.hero__underwater-left`, `.depth-ruler` | Khi khởi tạo JS | `requestAnimationFrame` hữu hạn 620ms, easing bậc 3 (`1 - (1 - t)^3`), dịch chuyển `translate3d` về `0` | Tự gỡ `transform` khi hoàn tất; không ảnh hưởng độ mờ tĩnh ban đầu |
| Scroll Word (Từng từ sáng theo cuộn) | Các phần tử `.scroll-word` trong `#journey` (`[data-scroll-words]`) | Sự kiện `scroll` + `resize` hoặc bấm chọn tầng độ sâu | Tính tiến độ chuẩn hóa `p = clamp((viewportTrigger - rect.top) / span, 0, 1)`, nội suy mượt qua `requestAnimationFrame` hữu hạn (dừng ngay khi hội tụ `< 0.001`), cập nhật class `.is-lit` và `transform` nhẹ cho từng từ | Khi tắt JS hoặc tạm dừng motion, toàn bộ từ hiển thị rõ ràng với độ tương phản `>= 7.2:1` |
| Thước đo độ sâu (`0 m` → `10,000 m`) | `.depth-ruler__btn[data-depth]`, `.depth-ruler__marker`, `.stratum-card` | Click vào các mốc `0 m`, `200 m`, `1,000 m`, `4,000 m`, `10,000 m` hoặc cuộn qua `#journey` | `requestAnimationFrame` hữu hạn 480ms nội suy vị trí con chạy `.depth-ruler__marker` và cập nhật thông số áp suất/nhiệt độ/tọa độ | Hủy frame cũ khi bấm liên tiếp; đồng bộ `aria-pressed` |
| Chuyển cảnh Hải trình (`skill-morge`) | `[data-morge-slide]`, `.hero__scene-img`, `[data-morge-count]` | Nút `Previous` / `Next`, chấm chọn cảnh, phím `ArrowLeft` / `ArrowRight`, vuốt ngang | `requestAnimationFrame` hữu hạn 580ms dịch chuyển theo `direction * 44px` + scale, wrap thẳng `2 ↔ 0` | Hủy timer/RAF cũ khi bấm nhanh; cập nhật `aria-live="polite"` |
| Section Scroll Reveal | Các khối `[data-reveal]` tại `#journey`, `#archive`, `#stories`, `#about` | `IntersectionObserver` (`threshold: 0.14`) | `requestAnimationFrame` hữu hạn 600ms (`translate3d(0, 22px, 0)` → `0`), `unobserve` sau khi hiện | Mặc định `opacity: 1` khi không có JS hoặc trước khi cuộn |
