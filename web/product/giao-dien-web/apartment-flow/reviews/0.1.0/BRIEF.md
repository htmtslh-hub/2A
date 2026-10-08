# Brief

Yêu cầu bổ sung 08/10/2026: thêm thành phần trang giới thiệu căn hộ phong cách
glass. Tên demo Lumière Residence (chưa được cung cấp tên thật). Nội dung vi;
nav, hero, bếp/phòng khách, phòng ngủ, liên hệ, chapter rail và dialog thông tin.
Không có dữ liệu giá/diện tích/địa chỉ/liên hệ xác nhận, nên không bịa hoặc giả
chức năng đặt lịch. Giữ chuỗi frame, không deploy hoặc sửa sản phẩm khác.

Ngày: 08/10/2026. Chủ sản phẩm yêu cầu dùng video căn hộ vừa tạo để tách frame
24fps, làm background cho một sản phẩm giao diện web mới; các thành phần thêm sau.

Phạm vi: chỉ apartment-flow/source, tools xuất frame và hồ sơ sản phẩm này.
Tên apartment-flow là lựa chọn tạm có thể đổi. Không sửa cửa hàng, catalog,
database, cấu hình hoặc sản phẩm khác. Không deploy.

Đầu ra: 240 frame WebP 1920×1080, nền toàn màn hình HTML/CSS/JS thuần,
lớp nội dung trống. Theo yêu cầu bổ sung ngày 08/10/2026, nền chạy theo cuộn:
cuộn xuống tiến, cuộn lên lùi; cảnh sticky qua 600vh và có nút Về đầu.

Ngoại lệ theo yêu cầu mới nhất: W01/W03/W05/W06 của WEB-STATIC-1 về số file,
ảnh raster, JS sequence và dung lượng. Chuẩn reduced motion cũ được thay bởi
rules animation ngày 05/10/2026: mặc định bật, người xem chủ động tạm dừng.
Đây là nền đang phát triển, chưa nghiệm thu để bán; không tự mở rộng thành
landing page, bịa thương hiệu/diện tích/giá nhà hoặc cấp quyền bán lại video.

## Scope correction — 8 October 2026
The owner clarified that this belongs to the 2A website-template product catalog,
and explicitly requested finishing integration, Git push and production deploy.
Scope now includes apartment-flow, its public demo/preview, t18 catalog metadata,
and the small preview-only purchasing gates shared by store cards/checkout.
Other templates, database data and credentials remain outside the change.
Commercial licence is not drafted by the agent; this release is a public preview.
