# aerox-studio — product package 1.2.1

Ngày 12/10/2026. Phạm vi mới do chủ sản phẩm yêu cầu: đóng gói, tích hợp cửa hàng và phát hành thương mại cả hai mẫu. Giữ hình/bố cục/chuyển động đã duyệt; áp dụng giấy phép Forge zone hiện có cho source và ảnh trong website. Không cấp quyền nhãn hiệu bên thứ ba. Ngoại lệ riêng: raster, số file, dung lượng và tương tác trình bày; không thay chuẩn chung.

| Mục | Kết quả và bằng chứng |
|---|---|
| Q01 | PASS theo ngoại lệ: 13 file, không dependency mới |
| Q02 | PASS: 1440/820/375/320 trên Chromium/Firefox; xem final/screenshots |
| Q03 | PASS kiểm bổ sung: menu/anchor; raw checker chỉ còn external-link null flags, URL Yamaha đã kiểm HTTP200; gallery/carousel được kiểm ở 1.2.0 và code không đổi |
| Q04 | PASS: skip link, Tab, Escape, focus/menu; no-JS |
| Q05 | PASS: landmark, h1, SVG/labels/ID; axe không lỗi |
| Q06 | PASS: pixel contrast bản cuối và xem screenshot |
| Q07 | PASS: offline, file://, no-JS, zoom200, font fallback; motion mặc định bật theo policy |
| Q08 | Chromium153/Firefox155 PASS; native Edge155/Cốc Cốc152 motion PASS. Safari/thiết bị thật NOT TESTED |
| Q09 | PASS: JS/console/network, không tracking/API/key mới |
| Q10 | PASS: license 7 mục, Forge zone, 10 bước/12 prompt/counts; không remote font. Không thử prompts với AI khác |
| Q11 | PASS: ZIP đọc lại, giải nén khớp byte source; mở HTTP/file:// từ ZIP |
| Q12 | Local PASS: catalog, 3 ngôn ngữ, detail, guides, cart tổng $40, native preview; ZIP có trong route tracing. Mocked download quyền có/không PASS 200/403/401. Thanh toán thật và tải bằng tài khoản đã mua thật NOT TESTED |
| Q13 | D01–D08 kiểm trực quan: hierarchy, copy, ảnh, responsive và demo disclosure phù hợp. Không chứng nhận fidelity >95% chưa đo |

ZIP: 951811 byte. SHA-256 5357a142e4ffee390865696f242a0bd7facecc271e67ba07e7ac68e001cd54e4. Mã t26, giá catalog $20 USD. ZIP đặt ngoài public, /api/download giữ kiểm quyền. 24 sản phẩm cũ giữ nguyên metadata và giá (catalog-checks.json). view.ts chỉ dùng bảng thông số mới cho hai slug này, không đổi logic legacy.

Lệnh: dong-goi.mjs aerox-studio --ngoai-le; check-template.mjs aerox-studio --version 1.2.1 --out final --ngoai-le; npm run typecheck; npm run build. Store checks: store-checks.json, mobile-store-checks.json và download-fixture-checks.json trong Aerox1.2.1. Source/docs sau lần kiểm cuối không đổi. Đã xem ảnh detail desktop/mobile.

Bản sản phẩm tham chiếu đã được chủ sản phẩm chỉ định phát hành; không diễn giải kết quả này là mọi browser hoặc mọi giao dịch đã qua kiểm thử. Online URL/commit/deployment được ghi vào RELEASE.md sau xác minh.
