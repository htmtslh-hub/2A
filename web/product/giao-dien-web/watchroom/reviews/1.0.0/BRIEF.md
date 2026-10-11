# Watchroom 1.0.0

Ngày: 06/10/2026. Loại: web-template. Chuẩn WEB-STATIC-1 v1.2, mở rộng W05 theo yêu cầu chuyển động và quy tắc animation ngày 05/10/2026.

Chủ sản phẩm yêu cầu tiếp tục tạo giao diện theo ảnh đồng hồ, chú trọng hiệu ứng, animation và chiều sâu. Không coi chữ lorem ipsum trong ảnh là nội dung cần dùng.

Tên demo: Watchroom. Slug: watchroom. Người mua: studio/agency và thương hiệu đồng hồ độc lập. Người xem: người khám phá bộ sưu tập, chọn mẫu và liên hệ showroom.

Thiết kế: navy #040f1e, peach #edbc9f; đồng hồ chronograph SVG gốc nhiều lớp kim loại; vòng quỹ đạo, ánh sáng xuyên tâm, bóng đổ, hotspot. Layout bất đối xứng theo ảnh, thanh hành động peach bên phải desktop và hàng ngang mobile. Typography condensed hệ thống. DESIGN_VARIANCE 7, MOTION_INTENSITY 8, VISUAL_DENSITY 3. HTML/CSS/JS thuần theo chuẩn repository, ưu tiên hơn stack và tài sản raster mặc định của skill.

Hiệu ứng: carousel ba mẫu chuyển có hướng, wrap trực tiếp hai chiều; transform/opacity được điều khiển requestAnimationFrame hữu hạn, không phụ thuộc CSS animation hoặc WAAPI. Parallax theo chuột, intro tối đa 4.8 giây, reveal, hover sản phẩm. Motion mặc định bật khi mở mới, không đọc trạng thái off cũ; có pause chủ động cho phiên hiện tại.

Các tương tác bổ sung: bộ lọc All/Women/Men, tìm kiếm cục bộ, shortlist localStorage có fallback bộ nhớ và dialog native. Mua/liên hệ dùng mailto, không có thanh toán hoặc gửi đơn. Dữ liệu và giá đều giả định, không dùng tên hoặc logo Quantum như một thương hiệu thực. SVG vẽ mới bằng mã, không nhúng ảnh tham chiếu.

Phạm vi: thư mục sản phẩm mới, ZIP, public/demos/watchroom, public/previews/watchroom.webp, hồ sơ và preview local. Không sửa catalog, backend, cơ sở dữ liệu, cấu hình chung hoặc triển khai. Các thay đổi admin/auth có sẵn được giữ nguyên.

Ngôn ngữ: giao diện và tài liệu khách hàng tiếng Anh. Sáu file, không network font, không thư viện, mục tiêu ZIP dưới 20480 byte.
