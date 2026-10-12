# Chuyển động và tương tác

- Hover: đổi màu liên kết, CTA nâng 3 px, ảnh gallery nâng 6 px, thumbnail phóng 1.05 lần. CSS hữu hạn 250–300 ms.
- Menu: mở/đóng, chọn liên kết, Escape trả focus và reset khi resize qua 950 px. Nút desktop/mobile có cùng trạng thái ARIA.
- Đổi finish: RAF 450 ms, opacity và translateX 18 px; thao tác mới hủy lượt cũ. Graphite chỉ là bản mô phỏng grayscale, không phải mẫu xe đã xác minh.
- Gallery: ba ảnh, wrap cả hai chiều; RAF 450 ms, opacity/translateX 25 px/scale 1.025 về 1. Hỗ trợ bàn phím và thao tác nhanh.
- Ảnh lớn: dialog native, giữ focus, Escape đóng và trả focus về nút mở.
- Scroll: IntersectionObserver mỗi section 650 ms, unobserve sau lần đầu; RAF hữu hạn, dọn khi pagehide. Đã đo frame giữa/cuối và cuộn ngược trong scroll-checks.json.

Không autoplay, không vòng lặp khi idle. Theo policy dự án, motion mặc định bật kể cả khi OS yêu cầu giảm chuyển động.
