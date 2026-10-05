# VYBE 1.0.0 — QA
Ngày 05/10/2026. WEB-STATIC-1 v1.2 + ngoại lệ trực tiếp từ brief về ảnh người mẫu, carousel, giỏ local và dung lượng. Trạng thái: giao diện local hoàn thành; CHỜ KIỂM TRA phần phát hành thương mại.

## Bằng chứng cuối
- `verified/checks.json`: mọi kiểm tra tự động PASS từ ZIP giải nén, Chromium 153.0.8010.12 và Firefox 155.0 trên Windows.
- `interaction-checks.json`: wrap previous 01→05 / next 05→01; bấm nhanh 8 lần chỉ 1 slide visible, 0 animation chạy khi hoàn tất; size L, qty 1, subtotal $68; reload giữ giỏ; reduced motion 0 animation.
- Đã nhìn preview desktop, ảnh toàn trang desktop/mobile 320 và tablet Firefox, frame wrap giữa chuyển động. Màu chữ trên nền coral dùng ink đậm; edition đặt trên nền solid riêng. Không phủ chữ chính lên người mẫu.
- Build Next thành công, typecheck thành công, ESLint riêng file thay đổi thành công. Lint toàn repo FAIL do tài sản phân tích Astra có sẵn, không coi là lỗi VYBE.

| Mã | Trạng thái | Bằng chứng / giới hạn |
|---|---|---|
| Q01 | PASS theo ngoại lệ | 6 file bắt buộc + 5 WebP local, không CDN/framework |
| Q02 | PASS | Chromium/Firefox 1440×900, 820×1180, 375×812, 320×740, không tràn; vùng chạm 44px |
| Q03 | PASS | menu, anchors, carousel, size/add/remove, dialog Escape, enquiry mailto; không gửi mail thật |
| Q04 | PASS | skip link, Tab/Shift Tab/menu Escape; controls phím trái/phải |
| Q05 | PASS | 1 h1, landmarks, tên truy cập, axe không violation trong kiểm tra này |
| Q06 | PASS | checks.json contrast + nhìn ảnh desktop/tablet/phone; nhãn ảnh có nền solid |
| Q07 | PASS | file://, offline, no JS, reduced motion, zoom mô phỏng 200%; no JS xem tất cả sản phẩm và email, bag/carousel cần JS |
| Q08 | PASS | Chromium/Firefox thực; Safari/Edge/thiết bị vật lý NOT TESTED |
| Q09 | PASS | console/network không lỗi, không loop animation tự chạy, build/typecheck và lint phần đổi PASS |
| Q10 | NOT TESTED (phần licence raster) | 10 bước/12 prompt/số đếm PASS. Giữ chính sách licence Meridian, chỉ đổi tên tiêu đề. Nội dung giấy phép cũ về SVG/Manrope cần chủ sản phẩm rà soát cho ảnh raster; không tự thay quyền dùng ảnh. Template không tải font mạng. Nguồn ảnh: built-in ImageGen, xem design/image-prompts.md. Chưa thử prompt với AI khác. |
| Q11 | PASS | ZIP giải nén khớp từng byte source, kiểm tra HTTP/file:// |
| Q12 | PASS local / NOT TESTED production | t6/vybe/shop, copy vi/en/zh, source/demo/preview/ZIP đồng bộ. Meridian chuyển vào product/retired và bỏ khỏi public; archive bị .vercelignore loại. Chưa deploy hoặc thử tải bằng khách đã mua. Giữ t6 nên quyền mua hiện có sẽ trỏ sang VYBE theo yêu cầu thay sản phẩm. |
| Q13 | PASS | Các mục D dưới |

## Thiết kế D01–D08
PASS: hero nêu streetwear/drop và CTA shop; bố cục người mẫu trung tâm xuyên nền trắng/coral và headline hai bên; collection 5 mẫu, about, contact có vai trò riêng; tokens màu/chữ nhất quán; ảnh responsive đã xem; copy tiếng Anh cụ thể; không rating/review giả; dữ liệu giá/model khớp hero/cards/giỏ.

## Gói
Byte: 747238; SHA-256: `7d3fc0c29208aa862a2fa4f04a6aca6195bde7ea9aac5bf2dca910eb1404829a`.
Ảnh WebP: edge 122194, bloom 145010, noir 148144, wave 153284, solar 160218 byte. RGBA 1024×1536, alpha giữ nguyên, nguồn AI tự tạo; không bằng chứng tồn tại sản phẩm thật.
Ngoại lệ W01/W03/W05/W06: ảnh raster/11 file/carousel+local bag/ZIP >20 KiB, được brief người dùng yêu cầu trực tiếp. Không đổi chuẩn chung.

## Tương tác
Shop/Collections → #collection; About → #about; Contact → #contact; logo/skip → #main; 5 selectors/arrows/swipe → selected product; model cards → hero; Add → local bag theo size; Bag → native dialog; Remove → cập nhật subtotal; email enquiry → mail client, không tạo đơn hay thanh toán. Motion ưu tiên URL→storage→OS, có nút tạm dừng. Carousel không tự chạy.

## Còn lại trước phát hành
Rà soát giấy phép ảnh raster và mô tả font trong LICENCE.txt; kiểm tra production và luồng download có quyền; kết nối ecommerce thật nếu cần nhận đơn/thanh toán. Không tự sửa quyền thương mại, không deploy.

## Follow-up cuối
Sau kiểm tra toàn bộ PASS, chỉ giảm chiều cao stage tablet từ 710 xuống 650px để đầu người mẫu không che headline. Đóng gói lại (hash phía trên), chạy lại interaction-checks và kích thước Chromium bốn viewport, Firefox tablet/phone/narrow phone (layout-followup.json), nhìn lại ảnh Firefox 820. Mọi kích thước không tràn ngang; các kiểm tra khác không bị thay đổi bởi token này.

## Điều chỉnh điều khiển theo yêu cầu
Chỉ giữ hai nút mũi tên trái/phải ở giữa chiều cao hero, bộ đếm ẩn thị giác nhưng vẫn aria-live. Nút 56px desktop/46px phone, focus rõ, đặt ngoài slides để không trôi theo animation. Kiểm tra lại wrap, rapid click, bag/reduced motion và 4 viewport Chromium; Firefox 820/375/320 không tràn; nhìn ảnh phone 375. Demo, guide, ZIP và preview desktop đồng bộ.

Điều chỉnh cuối: hai tam giác CSS trái/phải, bỏ nền/viền tròn/shadow nút, vùng chạm và focus giữ nguyên. Interaction-checks chạy lại PASS, 4 viewport không tràn.

## Deploy được chủ sản phẩm yêu cầu
05/10/2026: Vercel production dpl_5TyTZhTN4XMTUZm7X7MHHCfYrrvA READY, alias https://forgezone.store. deployment-checks.json: VYBE HTML/CSS/JS/ảnh/preview 200; demo Meridian 404; catalog VYBE có, Meridian không; 2 tam giác, 2 animation đang chạy giữa transition, sản phẩm chuyển sang Bloom Tee, console không lỗi. Chưa thử download bằng tài khoản đã mua.

