# Melt Muse 1.1.0 — triển khai thương mại

Ngày 09/10/2026. Deploy từ checkout riêng dựa trên origin/master, chỉ thay Melt Muse, catalog t17 và hướng dẫn riêng. Không đưa các thay đổi chưa commit ở workspace chính lên production.

- Production: https://forgezone.store/?mau=t17
- Demo: https://forgezone.store/demos/melt-muse/index.html?v=1.1.0
- Immutable deployment: https://web-isq56cqjc-htmtslh-hubs-projects.vercel.app
- Vercel: dpl_GQQt2JZQN5bcpxgQNmF2pT9EenJs, READY.
- Build Next16.3.3/TypeScript PASS;27 pages. Không migration, thay environment hoặc ghi database.

production-checks.json: Edge155.0.4283.45. Trang chi tiết Việt/Anh/Trung có đúng tên, specs, ảnh preview1.1.0 và nút mua/giỏ. Thêm giỏ chuyển “In cart”. Desktop1440 và mobile375 không tràn; lỗi runtime0. Thẻ thư viện/home có tên Melt Muse, giá79 USD và href ?mau=t17. Demo HTML/CSS/JS/ba WebP khớp byte checkout đã deploy. Tải chưa đăng nhập401; ZIP không public404. Admin/account và ba demo khác trả đúng200/403. /dich-vu410 là hành vi nghỉ dịch vụ có sẵn, giữ nguyên.

commerce-checks.json: handler thực với fixture auth/purchase cô lập, không database, anonymous401/unowned403/owned200/bundle200. Bytes161597/hash khớp ZIP cuối; private,no-store. outputFileTracingIncludes mang ZIP vào hàm tải, .vercelignore không loại ZIP.

Thanh toán tiền thật và tải bằng phiên tài khoản đã mua trên production: NOT TESTED. Không tạo đơn giả hoặc cấp entitlement trên database để tuyên bố đã thử. Không thay đổi cổng hoặc logic thanh toán.
