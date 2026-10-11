# NovaTrend 1.1.0 — nhân vật nền trong suốt

Ngày: 07/10/2026. Phạm vi: hai ảnh hero, nền CSS tách lớp, chuyển lookbook thực, bố cục thẻ hero trên điện thoại, tài liệu, demo/preview và ZIP. Không sửa cửa hàng, admin hay database.

## Brief và tài sản
Theo yêu cầu chủ sản phẩm: tách nhân vật trong hai ảnh gửi kèm, loại bỏ nền và toàn bộ UI/thẻ chữ trong ảnh, thay vào NovaTrend. Fashion là ảnh mặc định; casual là ảnh thứ hai. Dùng built-in image_gen chế độ background-extraction với transparent_background=true, hai lần chỉnh sửa riêng. Prompt đầy đủ và PNG gốc: `../../design/IMAGE-PROMPTS.md`. Đây là ảnh chỉnh bằng AI từ nguồn chủ sản phẩm cung cấp; không khẳng định là phép tách pixel giữ nguyên tuyệt đối. Giữ crop chân vốn có, không dựng thêm bàn chân. Quyền thương mại vẫn theo các điều khoản chờ xác nhận của LICENCE, không tự sửa licence.

Ngoại lệ W01/W03/W05/W06 sẵn có tiếp tục áp dụng; yêu cầu mới cho phép hai cutout và chuyển lookbook bằng JS. Sáu file chuẩn + 16 WebP = 22 file. Không hotlink ảnh, thư viện runtime hoặc framework mới.

| Ảnh | Kích thước | Byte | Alpha |
|---|---|---:|---|
| hero-fashion.webp | 900×1350 | 135438 | min 0, max 255 |
| hero-casual.webp | 900×1350 | 95030 | min 0, max 255 |

## Kiểm tra phần thay đổi
`check-cutouts.mjs` và `local-checks.json`: Chromium 153.0.8010.12, Firefox 155.0, Edge 154.0.4258.62, Cốc Cốc 152.0.7977.124 trên Windows, headless thực. PASS cả bốn khổ 1440×900, 820×1180, 375×812, 320×740 không tràn ngang; hai ảnh tải đủ; đo opacity ở frame giữa 620ms; hai chiều wrap bằng phím; thao tác nhanh hủy frame cũ; RAF vẫn hoạt động khi CSS animation/transition bị vô hiệu hóa; system reduced-motion đang bật. Không trạng thái motion lưu cũ chi phối lookbook. Không JS vẫn hiện fashion và không tràn ngang. Search mở/đóng Escape và thêm giỏ qua thẻ hero đều PASS. Không pageerror. Hai PNG đầu ra, preview và ảnh desktop/mobile đã được nhìn trực tiếp; thẻ mobile chuyển dưới nhân vật để không che mặt.

| Nhóm | Trạng thái bản sửa | Phạm vi |
|---|---|---|
| Q01, Q11 | PASS theo ngoại lệ | Script đóng gói đọc lại so khớp byte, 22 file |
| Q02, Q03, Q04 | PASS phần hero | Kích thước, chuyển ảnh, bàn phím, search/cart smoke test |
| Q05 | PASS phần hero | Alt hai nhân vật, aria-hidden đúng ảnh ẩn, button aria-pressed/controls |
| Q06 | PASS phần hero bằng nhìn ảnh | Chữ thẻ vẫn có nền trắng độc lập; nhân vật không làm nền của nội dung chữ |
| Q07, Q08, Q09 | PASS phần hero | No JS, file://, CSS-disabled fallback, four browsers; finite RAF, zero runtime errors |
| Q10 | CHƯA NGHIỆM THU TOÀN BỘ | Hướng dẫn ảnh cập nhật; quyền ảnh/copyright cần chủ sản phẩm xác nhận như licence hiện tại |
| Q12 | PASS phần demo; tải trả tiền NOT TESTED | Demo/preview/ZIP đồng bộ; chưa thử luồng tải sau thanh toán mới |
| Q13 / D01–D08 | PASS phần thay ảnh | D01/D03/D04/D06/D08 nội dung giữ nguyên; D02/D05 nhân vật tách lớp và mobile không che mặt; D07 không bổ sung claim mới |

Không dùng kết quả sửa ảnh để chứng nhận lại toàn bộ template. Hồ sơ 1.0.0 có một số mô tả không khớp nguồn hiện tại (ví dụ điều khoản MIT và số byte ảnh); không kế thừa các tuyên bố đó. Các tính năng/nội dung cũ ngoài phần hero không được sửa trong nhiệm vụ này. Safari, tài khoản thanh toán thực, quyền phát hành thương mại: NOT TESTED/chờ xác nhận.

Preview 23564 byte. `dong-goi.mjs novatrend --ngoai-le` đọc lại khớp toàn bộ source. Bộ kiểm tra chung `checks.json` chạy trên ZIP 570399 byte trước lần bổ sung README cuối (layout/ảnh/JS cùng byte): Chromium và Firefox hoàn thành, chỉ phát hiện một lỗi số đếm tên thương hiệu Q10 (ghi 6 nhưng thực tế 5). Đã sửa thành 5 và kiểm tra lại số đếm trên tài liệu cuối. Đây là chỉnh tài liệu, không thay đổi mã đã thử. Byte/hash ZIP cuối ghi trong `package.json` của hồ sơ này.

## Production
GitHub implementation commit: `a1984c0`, pushed origin/master. Vercel `dpl_88p29f913VDk8rrfvTPSg6vSH5Vw` READY, alias https://forgezone.store, Next build/TypeScript PASS. Online demo https://forgezone.store/demos/novatrend/index.html?v=1.1.0: same scoped checks PASS in Chromium, Firefox, Edge and Cốc Cốc, see `online-checks.json`. HTML/CSS/JS hashes match after LF/CRLF normalization; both WebP match exact bytes. Screenshot Edge mobile online visually inspected. Preview, catalog t12, admin and Watchroom HTTP 200 smoke checks (not a full regression test). No database operation performed.
