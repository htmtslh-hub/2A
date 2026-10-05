# Ba mẫu mới — WEB-STATIC-1

Ngày 28/09/2026. Chuẩn 1.2; sản phẩm 1.0.0.

Đã hoàn tất mã nguồn, đúng sáu file mỗi mẫu, hướng dẫn riêng 10 bước/12 prompt, licence, ZIP kiểm tra sau giải nén, WebP và video quay trang thật, catalog vi/en/zh, ảnh responsive tablet/mobile và tích hợp cửa hàng. Kỹ năng design-taste-frontend định hướng ba bố cục riêng; chuẩn của chủ sản phẩm ưu tiên SVG tự tạo và JavaScript native menu/reveal, không thư viện hay theme toggle.

## Bản triển khai kiểm tra

[Xem thư viện mới](https://web-cv6wv05s4-htmtslh-hubs-projects.vercel.app/?tab=library)

- Project: web, prj_A0GxjvTQMu6x2bRXIi8XG6BLiIKs.
- Deployment cuối: dpl_8WpqZHBagwsQdHyUbM4Tqk2rrXdC, READY. Bản này khôi phục thẻ hero 04–05 ở trạng thái khóa; nội dung gói sản phẩm và giá không đổi.
- Dùng production environment với `--skip-domain`. Domain chính forgezone.store và dichvu.forgezone.store chưa chuyển, đã kiểm lại bằng Vercel inspect.
- Không git push: repository hiện không có remote; phát hành dùng project Vercel đã liên kết. Không commit hoặc bỏ các thay đổi sẵn có của chủ sản phẩm.

## Sản phẩm

Giá cả ba dùng cấu hình hiện tại: 1.900.000₫/mẫu, USD $79. Giá trọn bộ không thay.

| Mẫu | Catalog | Ngành | Byte ZIP | Video byte |
|---|---|---|---:|---:|
| Solenne | t4 / business | Studio chăm sóc da / wellness | 18.560 | 478.267 |
| Forma | t5 / portfolio | Studio sáng tạo / branding | 18.180 | 398.711 |
| Meridian | t6 / business | Sourcing / xuất khẩu B2B | 19.431 | 574.188 |

SHA-256:

- solenne.zip: `4bbbc2f333abd4797009839576e3aa76ecc6bb0f7baf25de27495f2461e1d53d`
- forma.zip: `024a51eb9df2b44ddbba76791e5c3301ea2461c2bad9d88770407bbf5b40cbae`
- meridian.zip: `e0a2f51daa69717a4848adaeb1bafd0a8c39f43bb9def757cf927b26e2c2bfd6`

Source hiện tại: `web/product/giao-dien-web/{solenne,forma,meridian}/source/`.

Gói giao hiện tại: `web/product/giao-dien-web/<slug>/<slug>.zip` cho ba mẫu trên.

Preview: `web/public/previews/<slug>.webp` (698×524), `<slug>.mp4` (1396×1048), `<slug>-tablet.webp` và `<slug>-mobile.webp`. Video không đóng vào gói khách tải.

## Kiểm tra hoàn thành

- Actual Chromium 153.0.8010.12 và Firefox 155.0 trên Windows, HTTP và file:// từ ZIP đã giải nén; sáu file khớp byte với source.
- 1440×900, 820×1180, 375×812, 320×740; menu mở, Escape, Tab/Shift+Tab, reset quanh breakpoint 950px, không tràn ngang.
- Tương phản thường/hover/focus, semantic/SVG labels, no-JS, font bị chặn, offline file và layout zoom 200%; không console/network error ngoài ca font-abort cố ý; không axe violation trong cấu hình được chạy.
- `npm run lint`, `npm run typecheck`, `npm run build`: PASS. Vercel build: PASS.
- Cửa hàng ba ngôn ngữ: đúng tên/giá/catalog/guide, phát-dừng video, không kéo giãn/cuộn chồng video, reduced motion dùng still, ảnh responsive khác ảnh desktop.
- Preview public HTTP 200; anonymous `/api/download?id=t4|t5|t6` trả 401; URL private trực tiếp trả 404; output tracing local mang đủ ZIP mới.
- Không tuyên bố đã thử Safari/Edge/thiết bị vật lý hay chấm điểm Lighthouse. Không thử thanh toán/thu tiền hoặc gửi thư thật.

## Trạng thái và việc còn thiếu

**CHỜ KIỂM TRA**, không tuyên bố đạt đầy đủ để phát hành.

Q01–Q11, Q13: PASS theo hồ sơ từng mẫu. Q12 phần tải file được cấp quyền trên deployment: **NOT TESTED** vì chưa có tài khoản người mua để thử. Có ZIP tại máy và tracing chưa thay thế được bước này.

Cần chủ sản phẩm cung cấp phiên đăng nhập tài khoản đã có quyền trọn bộ (không gửi mật khẩu trong chat), kiểm tra tải t4/t5/t6 và đối chiếu hash, hoặc chấp nhận rõ ngoại lệ phát hành khi mục này chưa thử. Không tạo đơn giả hay thay quyền mua trong database để làm test pass. Sau đó mới promote deployment trên sang domain chính và kiểm tra domain lại.

Hồ sơ chi tiết: mỗi thư mục `<slug>/1.0.0/` có BRIEF.md, QA.md, checks.json, catalog-copy.md và screenshots/. Hồ sơ cửa hàng: store-three/deployment-checks.json. Raw recording phục vụ QA được gitignore; MP4 cuối giữ trong public/previews.
