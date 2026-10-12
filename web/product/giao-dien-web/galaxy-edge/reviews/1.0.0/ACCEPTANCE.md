# Cửa nghiệm thu — Galaxy Edge 1.0.0

Trạng thái ForgeFrame: **NOT TESTED**, không công bố đạt >95%.

Chủ sản phẩm chọn giữ SVG và gói dưới 20 KB. Do đó đây là diễn giải tham chiếu theo WEB-STATIC-1: bố cục hero, chữ lớn hai dòng, subtitle lệch phải, CTA xanh, preview bên phải và điều hướng dưới hero. Logo/tên là giả định, ảnh thành phố thay bằng SVG nguyên bản, các nút tròn là anchor. Không có video, carousel hoặc backend.

Đối chiếu trực quan: reference-view.png (888 × 502), desktop-hero.png và ảnh final/screenshots. SVG khác rõ độ chi tiết, texture, ánh sáng và hình dáng tàu/thành phố; không tự chấm số để vượt cửa fidelity. Không có tham chiếu mobile.

Animation/scroll PASS trên Chromium: frame giữa opacity 0.623356, translateY 16.2247px; cuối opacity 1, transform none. Khi reduced motion: giữa 0.627925 / 16.0278px, cuối 1 / none. Phone scrollWidth 320 ở viewport 320. RAF hữu hạn, cleanup pagehide; không vòng lặp nền.

Kỹ thuật tự động PASS trên Chromium 153.0.8010.12 và Firefox 155.0. Đã xem ảnh bốn khổ và menu. Browser thực Edge/Cốc Cốc và Safari chưa kiểm tra.

ZIP là **candidate để kiểm tra**, không phải gói phát hành đã qua toàn bộ cửa. Nguồn và bản giải nén khớp byte. Chưa push/deploy/tích hợp cửa hàng. Cần hoàn thiện chủ thể bản quyền và kiểm tra browser còn thiếu trước phát hành thương mại.
