# Crimson Folio - brief

Ngày: 05/10/2026. Phiên bản: 1.0.0. Chuẩn tham chiếu: WEB-STATIC-1 v1.2.

- Sản phẩm: template portfolio UX/UI designer, slug crimson-folio.
- Người mua: designer độc lập; người xem: khách cần thiết kế website/branding.
- Mục tiêu: giới thiệu phong cách, dự án và dẫn khách tới liên hệ.
- CTA: xem dự án (#work), gửi email demo hello@example.com (cần thay trước xuất bản).
- Cấu trúc: hero, giới thiệu, quy trình, dự án web, dự án thương hiệu, liên hệ.
- Thị giác: tham chiếu ảnh người dùng gửi, đỏ rượu vang, typography serif lớn và sans đậm, chân dung trung tâm, bố cục biên tập. Không sao chép danh tính/claim trong ảnh.
- Nội dung tiếng Anh; tên nhân vật demo Mira Arden; dự án hoàn toàn hư cấu và không phải hợp đồng thực.
- Phạm vi: gói sản phẩm độc lập, không tích hợp catalog, không deploy, không đổi file dùng chung.
- Tài sản: chân dung AI cần tự tạo; không trích chân dung từ ảnh tham chiếu.
- Ngoại lệ W01/W03: người dùng yêu cầu tự tạo ảnh cần thiết, dùng ảnh raster cục bộ bổ sung sáu file. Chưa duyệt ngoại lệ dung lượng W06; phải đo gói cuối và báo nếu vượt 20.480 byte.
- Công cụ tạo ảnh tích hợp không được cung cấp trong phiên. Đã hỏi dùng CLI/API theo skill imagegen, đang chờ phản hồi.
- Animation theo AGENTS ngày 05/10/2026, mặc định bật; không tự tắt do prefers-reduced-motion. Reveal hữu hạn, không loop.
- Quyết định: thumbnail dự án dựng bằng HTML/CSS để giữ nét và tránh ảnh website không phản ánh nội dung demo.

## Bảng tương tác dự kiến

- Logo: #main.
- Work/About/Contact: #work/#about/#contact.
- Menu mobile: mở/đóng, Escape trả focus; chọn link đóng.
- View selected work: #work.
- Bốn dự án: #project-noir/#project-form/#project-atelier/#project-lumen.
- Email: mailto:hello@example.com, mở ứng dụng email; không mô phỏng gửi thành công.
- Back to top: #main.
