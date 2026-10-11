# Velora 1.1.0

Ngày 10/10/2026. WEB-STATIC-1 quy chuẩn 1.2 + ngoại lệ W05.
Chủ sản phẩm yêu cầu bổ sung chuyển sản phẩm, animation và kiểm tra thông tin
khi xem sản phẩm như video. Đây là ủy quyền tương tác cần thiết, ưu tiên hơn W05.
Phạm vi: Velora source/index.html, assets/css/style.css, assets/js/main.js,
README/CUSTOMISE, ZIP và reviews riêng. Không đổi LICENCE, cửa hàng, DB, deploy.
Giữ sáu file, ZIP <20480 byte, không JS library, offline/file://, SVG nội tuyến.
Luồng: carousel gallery → selected bike details → overview/specifications →
configure Wheels/Frame/Saddle/Handlebar → quay lại hoặc enquiry đúng cấu hình.
Giữ cùng SVG qua chuyển cảnh. Next cũ thoát trái, mới vào phải; Previous đảo chiều.
Wrap cuối→đầu trực tiếp, không đưa model thứ ba qua giữa; cancel rAF khi bấm nhanh.
Phím, swipe, pause, resize, no-JS fallback đầy đủ. Motion mặc định bật theo AGENTS.
Tên/giá/thông số đều demo, không là sản phẩm thật hoặc xác nhận của nhà sản xuất.
Không checkout/cart, không giả gửi mail. Skill-morge được dùng làm choreography;
rAF hữu hạn là đường chính nên không phụ thuộc CSS/WAAPI.
