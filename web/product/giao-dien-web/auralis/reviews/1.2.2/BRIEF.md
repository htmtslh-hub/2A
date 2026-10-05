# Auralis 1.2.2 — visible movement regression

Người dùng tiếp tục báo không thấy hiệu ứng trong Cốc Cốc và không tiện gửi video. Native UI helper tìm thấy đúng cửa sổ Auralis nhưng bị dừng bởi URL policy chưa hỗ trợ browser này; không dùng công cụ khác để điều khiển/đọc profile đó. Tiếp tục phát triển và kiểm tra mã sản phẩm bằng các phiên headless riêng của engine Cốc Cốc cài sẵn, không đọc cookies/history/settings cá nhân.

Đã tái hiện lỗi có ý nghĩa mà test cũ bỏ sót: với media reduce và explicit motion=on, bấm Discover đến được detail nhưng có **0 frame detail opacity giữa 0 và 1**. Test cũ chỉ chứng minh endpoint, không chứng minh chuyển động. Thử cả normal/native smooth disabled. Font default 24px cũng có thể kích hoạt gate static; fallback anchor đi sang short demo URL vì base href.

Sửa: scene CTA dùng animation scroll hữu hạn bằng requestAnimationFrame thay cho native smooth scroll; render interpolate input chuột/phím/scrollbar rồi dừng. Lần thử tiếp bắt được idle delta quá lớn khiến wheel đầu tiên lại nhảy ngay; cap delta 32ms đã sửa và regression wheel qua. User input hủy scene-scroll; không preventDefault wheel/touch hoặc lock scroll. Explicit motion opt-in có hiệu lực với default font lớn, vẫn giữ fallback cho viewport cực thấp và automatic reduced/enlarged text. Public demo dùng absolute asset paths thay base href, để short URL tải đúng asset mà #links không navigate/reload tài liệu.

Native tests phải đo frame giữa, ảnh render, sticky stage, click ba CTA, wheel sau idle, font24 và native smooth off. Ghi lại video từ engine Cốc Cốc để cung cấp bằng chứng. Đồng bộ source/docs/ZIP/demo/catalog/preview/release, giữ ngoại lệ ảnh/animation và không đổi LICENCE/checkout scope.
