# Melt Muse — thương mại 1.1.0

Ngày 09/10/2026. Yêu cầu: “đóng gói thành sản phẩm thương mại mà”, tiếp nối yêu cầu tạo giao diện giống ảnh, tạo ảnh mới và push/deploy.

Hoàn tất ZIP giao khách, giấy phép thương mại theo chính sách bảy mục hiện có, catalog t17/portfolio đủ vi/en/zh và hướng dẫn sau mua. Chủ thể Văn Triển đối chiếu licence thương mại Apartment Flow hiện có. Ba ảnh tạo riêng cho sản phẩm được giao kèm để dùng trên website cá nhân, thương mại và khách hàng; không bán lại template hoặc ảnh stock riêng. Không thay chính sách chung, backend, giá, schema hoặc sản phẩm khác.

WEB-STATIC-1 v1.2 với ngoại lệ W01/W03/W06 theo yêu cầu ảnh: sáu file chính + ba WebP, ZIP dưới 1 MiB, mỗi ảnh dưới 300 KB. Không tự áp dụng hồ sơ IMG còn đề xuất. Giá theo catalog hiện có: 1.900.000 VND / 79 USD.

Giao diện và assets không đổi so với 1.0.0. Phiên bản minor bổ sung giấy phép hoàn chỉnh và tích hợp bán hàng. Đọc lại và thử bản giải nén cuối. Luồng tải thử bằng handler thực với fixture auth/purchase cô lập, không tạo thanh toán hoặc ghi database production. Công bố rõ phần thanh toán và tải có entitlement trên production chưa thử nếu không có phiên khách đã mua.
