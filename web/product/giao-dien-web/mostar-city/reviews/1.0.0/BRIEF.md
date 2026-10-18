# Mostar City 1.0.0 — brief ngày 18/10/2026

Mẫu cinematic scroll du lịch, vanilla index.html/styles.css/script.js. Dùng đúng ảnh/font remote của prompt. Scroll rig 3700px, tách hai nửa cảnh, zoom cầu, hai story panel, slider 3 bộ/15 thẻ. Mục tiêu: giới thiệu Mostar qua hành trình thị giác. Khách dùng: trang giới thiệu điểm đến.

Phạm vi: tạo mẫu local và ZIP; chưa catalog, push hoặc deploy theo yêu cầu gom nhiều mẫu. Không sửa SpaceEdu và cấu hình chung.

Ngoại lệ đã có trong brief mới: 3 file thay chuẩn 6 file, ảnh/font hotlink, JS scroll/parallax/slider ngoài menu/reveal. Reduced motion giữ scrub nhưng bỏ inertia/pointer theo prompt mới. Không thay bằng thư viện. Giữ số đo, root và thứ tự layer yêu cầu.

Lựa chọn triển khai bổ sung: nav map hash vào các mốc scroll vì DOM yêu cầu không có section đích rời; dialog ghi chú và thông báo chỉ có English ngoài cinematic main; normalize slider có timeout dự phòng transitionend và bảo vệ range khi click nhanh. Không giả tính năng dịch/đặt tour. Ảnh/font do người dùng cung cấp URL; chưa xác minh quyền thương mại.
