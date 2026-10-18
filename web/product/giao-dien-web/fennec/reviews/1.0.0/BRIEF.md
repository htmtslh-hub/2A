# FENNEC 1.0.0 — brief 18/10/2026

Prompt người dùng: một index.html standalone, fictional AI automation, video nền cam, cáo 3D GLB dùng Three.js r160/import map, ánh sáng ấm và math bob/parallax chính xác; nav + menu clip-path từ brand pill, bố cục mobile.

Phạm vi: source/index.html và gói/bằng chứng riêng trong fennec/. Không sửa mẫu khác, cấu hình, DB/catalog. Chưa push/deploy theo yêu cầu gom nhiều mẫu.

Ngoại lệ WEB-STATIC-1 được brief mới chỉ rõ: một HTML, CDN Three.js/module, remote GLB/video/ảnh, JS WebGL và animation loop cần thiết cho bob. Reduced motion theo prompt mới bỏ time-based terms nhưng giữ parallax, không ẩn cáo/video. Runtime dừng render khi hidden. Giữ các số đo trừ max-width360px bổ sung co gap/font/brand để nút không cắt tại320px. Thêm dialog ngoài hero để các link chưa có URL thật phản hồi demo minh bạch; không bịa dịch vụ/account/checkout. Theme chỉ lưu trong phiên trang.

Tài sản chỉ dùng URL được cung cấp; chưa xác minh quyền thương mại. Mã giữ fallback poster khi video/WebGL không có.
