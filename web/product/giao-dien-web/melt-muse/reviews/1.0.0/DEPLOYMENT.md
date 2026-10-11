# Melt Muse — production demo deployment

Ngày: 09/10/2026. Chủ sản phẩm yêu cầu “ok em push và deploy”. Phạm vi mở rộng: push mã và xuất bản demo; không thêm catalog bán hàng, không đổi licence hay dữ liệu production.

- Demo: https://forgezone.store/demos/melt-muse/index.html
- Preview: https://forgezone.store/previews/melt-muse.webp
- Source commit: `4f57913` — Add Melt Muse fashion portfolio template and public demo.
- Git push: `origin/master`, fast-forward từ `9d6a72e`.
- Vercel project: `htmtslh-hubs-projects/web`.
- Deployment: `dpl_DkRFVumjZhBHhxKQZs3KfqgyCukp`.
- Immutable deployment URL: https://web-45bvygls2-htmtslh-hubs-projects.vercel.app
- Alias: https://forgezone.store
- Trạng thái Vercel: READY / production. Cloud Next.js build và TypeScript PASS, 27 trang sinh thành công. Không chạy migration hay đổi môi trường/DB.

## Cách giữ phạm vi

Checkout gốc đang cũ hơn remote 23 commit và chứa thay đổi có sẵn. Đã tạo worktree riêng từ origin/master mới nhất, chỉ thêm thư mục sản phẩm/demo/preview Melt Muse. Các thay đổi admin, auth, các sản phẩm đã push trước đó được bảo toàn từ remote. Không push toàn bộ working tree cũ và không rollback file người khác.

## Kiểm tra sau deploy

`production-checks.json` và `verify-production.mjs` ghi bằng chứng:

- HTML, CSS, JS và ba WebP đều HTTP200, SHA-256 và byte khớp public demo đã kiểm tại máy; thêm query revision để kiểm cache.
- Preview HTTP200, 698×524.
- Microsoft Edge155.0.4283.45 thực, Windows, headless Playwright: 1440×900 và375×812 không tràn, ảnh tải đủ, title đúng, menu mobile/Escape PASS, không runtime error. Ảnh chụp trong `screenshots/production-edge-*.png` được giữ tại workspace và không commit theo gitignore.
- Trang chủ/tài khoản/admin HTTP200; API admin cho khách chưa đăng nhập HTTP403 như thiết kế.
- Apartment Flow, Shirtline, Watchroom và NovaTrend demo HTTP200. Đây là kiểm tra HTTP cơ bản, không phải kiểm lại toàn bộ chức năng các sản phẩm đó.
- `/dich-vu` HTTP410 là hành vi nghỉ dịch vụ có sẵn ở proxy. Đã đối chiếu deployment trước `web-nlkqff4h1` cũng410; không phải regression do Melt Muse.
- Không tạo đơn, thanh toán, gửi email, đổi tài khoản hoặc ghi dữ liệu test vào production. Chưa kiểm luồng mua/tải vì mẫu chưa đăng catalog và phạm vi chỉ xuất bản demo.

## Gói sản phẩm

ZIP không đổi:161264 byte, SHA-256 `cb5ac1c8599816331e4f496e86f354630a2e593104044f0ca12f52efbeb7c122`. Demo online đã được chủ sản phẩm cho phép. Copyright owner và điều khoản ảnh thương mại vẫn cần chốt trước khi mở bán; deployment không tự đổi quyền licence.

Hồ sơ QA.md mô tả lượt nghiệm thu local trước xuất bản; tài liệu này cập nhật riêng Q12 cho public demo thành PASS, luồng thương mại N/A.
