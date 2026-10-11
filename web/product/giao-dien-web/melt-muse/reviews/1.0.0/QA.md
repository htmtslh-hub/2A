# Melt Muse — QA 1.0.0

Cập nhật sau yêu cầu push/deploy: demo đã online ngày09/10/2026. Xem `DEPLOYMENT.md` và `production-checks.json` cho trạng thái publication hiện tại; các dòng “chưa deploy” phía dưới mô tả phạm vi kiểm tra local trước yêu cầu đó. Chưa đăng bán/catalog và chưa tự đổi licence.

Ngày: 09/10/2026. Chuẩn: product-standards 1.2 / WEB-STATIC-1 + ngoại lệ ảnh riêng theo brief. Kết quả: **bản review hoàn tất về mã và kiểm tra kỹ thuật; chưa phát hành thương mại** vì licence còn chủ thể bản quyền/điều khoản ảnh cần chủ sản phẩm chốt. Không tuyên bố đạt nguyên hồ sơ sáu file / 20.480 byte.

## Phạm vi và giả định

Tạo riêng sản phẩm `melt-muse`, public demo và preview cùng slug. Không sửa catalog, sản phẩm khác, cấu hình chung, database hay deployment. Các thay đổi sẵn có trong workspace được giữ nguyên.

Brief ở BRIEF.md. Chọn portfolio thời trang và studio sáng tạo, demo tiếng Anh, email example.com. Ảnh tham chiếu chỉ định bố cục/mood; ba ảnh gốc được tạo mới. Không lấy ảnh cá nhân trong screenshot để đóng ZIP. Ảnh mới thể hiện nhân vật người trưởng thành giả định, không khách hàng hay bằng chứng kinh doanh thật.

## Ngoại lệ

- W01/W03/W06: yêu cầu mới nhất “tạo ảnh cho giống” cho phép ba ảnh raster cục bộ thay vì chỉ SVG. Giữ sáu file bắt buộc, thêm đúng ba WebP. Không sửa hay tự duyệt hồ sơ IMG toàn dự án.
- `assets/img/soft-focus.webp`: 71.304 byte, 900×1200.
- `assets/img/damn-right.webp`: 38.072 byte, 900×1200.
- `assets/img/heart-pose.webp`: 35.210 byte, 900×1200.
- ZIP 161.264 byte (<1 MiB theo mục tiêu riêng của brief); mọi ảnh <300 KB.
- Motion theo rules 05/10: mặc định bật kể cả OS giảm chuyển động. Reveal là translate 12px trong 280ms, không làm ẩn chữ, không loop, không timer vô hạn. Không carousel/player giả. Không cần fallback chuyển cảnh sản phẩm vì mẫu không có chuyển cảnh/carousel; nếu CSS transition bị vô hiệu, nội dung và hành vi vẫn đầy đủ.
- Licence giữ cấu trúc/chính sách bảy mục; quyền ảnh không tự cấp thêm. Đây là bản nháp chờ xác nhận chủ thể/điều khoản trước khi bán.

## Bằng chứng gói cuối

- ZIP: `melt-muse.zip`.
- Byte: **161264**.
- SHA-256: `cb5ac1c8599816331e4f496e86f354630a2e593104044f0ca12f52efbeb7c122`.
- 9 file, đường dẫn ZIP dùng `/`, đọc lại khớp byte source. PNG concept/ảnh gốc, prompt và QA không nằm trong ZIP.
- `release/checks.json`: bản ZIP cuối giải nén, Chromium + Firefox, tất cả kiểm tra tự động PASS, `failures: []`.
- `extra-checks.json`: Edge thực, bốn khổ, ảnh, menu, thiếu ảnh, chuyển động khi reduced motion.
- `demo-sync.json`: HTML demo khớp source sau bỏ base tag, tất cả CSS/JS/WebP khớp byte.
- `checks.json`: lượt đầu có lỗi cú pháp path spiral; đã sửa. `final/checks.json`: lượt sửa spiral PASS. Sau nhìn ảnh ở 320px, tăng khoảng cách chữ MUSE để không bị thẻ che; `release/checks.json` là bằng chứng cuối cùng áp dụng cho ZIP bàn giao.

Lệnh đã chạy:

```text
node web/product/giao-dien-web/tools/dong-goi.mjs melt-muse --ngoai-le
node web/product/giao-dien-web/tools/check-template.mjs melt-muse --version 1.0.0 --ngoai-le --out release
node web/product/giao-dien-web/melt-muse/reviews/1.0.0/verify-extra.mjs
```

## Q01–Q13

| Mục | Kết quả | Bằng chứng / giới hạn |
|---|---|---|
| Q01 Cấu trúc | PASS theo ngoại lệ ảnh | Sáu file bắt buộc + đúng ba ảnh; không thư viện JS/build/backend. ZIP giải nén khớp source. |
| Q02 Responsive | PASS | 1440×900, 820×1180, 375×812, 320×740; Chromium, Firefox, Edge đều scrollWidth=viewport. Không vùng chạm độc lập <44px theo kiểm tra. Đã nhìn ảnh, sửa vị trí chữ MUSE ở màn hẹp. |
| Q03 Tương tác | PASS | Anchors hợp lệ, menu 950px, Escape trả focus, chọn link đóng menu, resize qua breakpoint reset ARIA. Email là mailto demo, không gửi dữ liệu. |
| Q04 Bàn phím | PASS | Skip link hiện và đưa vào main; Tab bỏ qua menu ẩn; Shift+Tab quay về toggle; outline 3px. |
| Q05 Cấu trúc trợ năng | PASS kiểm tra nội bộ | Một h1, đủ landmarks, không ID trùng/heading jump, SVG trang trí ẩn, ảnh có alt. Axe WCAG2A/AA/2.1AA: 0 violations ở cả Chromium/Firefox. Không coi đây là chứng nhận ngoài dự án. |
| Q06 Tương phản | PASS | Trắng trên đỏ #b5242c: 6,45:1; chữ mềm trên nền xám: 6,85:1; đỏ chữ trên xám: 7,31:1; focus 17,46:1. Hover không lỗi. Không đặt chữ thực lên ảnh; khung caption nền trắng/note đặc. |
| Q07 Dự phòng | PASS theo motion rule mới | file://, offline, mất font, không JS, zoom layout 720×450 ở density2 (mô phỏng 200%), reduced motion đều giữ nội dung/menu. 0 loop sau5s. Edge reduced preference=true: transform y12 → y2,04 ở frame giữa → y0 và 0 animation còn chạy. Chặn ảnh ở320px: vẫn có story/contact, không tràn. |
| Q08 Trình duyệt | PASS phạm vi đã thử | Windows, headless qua Playwright: Chromium153.0.8010.12, Firefox155.0; Microsoft Edge154.0.4258.62 từ binary cài trên máy. Chromium/Firefox thử HTTP và file://, Edge file:// + thiếu ảnh qua HTTP. Safari và Cốc Cốc NOT TESTED, không quảng cáo đã thử. |
| Q09 Kỹ thuật | PASS | Console/network cục bộ cuối: 0 lỗi; mọi ảnh tải đúng; đã cuộn, mở/đóng menu, theo anchors, quan sát screenshot. Không benchmark Lighthouse và không công bố điểm/khả năng chịu tải. |
| Q10 Tài liệu/quyền | NOT TESTED phần xác nhận quyền | Tài liệu/đếm: PASS 10 bước,12 prompt,0 count error,0 ô điền bắt buộc trong prompt. Prompt tự hỏi dữ liệu thiếu, có đầu vào/đầu ra. Font Archivo/Archivo Black OFL1.1 được đối chiếu nguồn chính thức. Copyright owner và quyền dùng/phân phối ảnh thương mại chưa được chủ sản phẩm xác nhận; chưa đủ điều kiện bán. Chưa thử prompt bằng một AI khác. |
| Q11 Gói cuối | PASS | Script đọc ZIP lại và so byte; checker thử bản giải nén qua file:// và HTTP, hash/byte ở trên. |
| Q12 Cửa hàng | N/A đăng bán/online | Phạm vi là sản phẩm review. Public demo riêng + preview 698×524 đã tạo; byte đồng bộ PASS. Không đăng catalog, không deploy, không thử tải sau thanh toán. |
| Q13 Thiết kế | PASS nội bộ | D01–D08 dưới đây, giữ hướng ảnh tham chiếu, ba ảnh original. |

Nguồn font đã kiểm: https://github.com/google/fonts/blob/main/ofl/archivo/OFL.txt và https://github.com/google/fonts/blob/main/ofl/archivoblack/OFL.txt (SIL OFL1.1). Font tải qua Google Fonts là phụ thuộc mạng tùy chọn, không bundle font và không hứa offline giống metric.

## D01–D08

| Mục | Kết quả | Nhận xét |
|---|---|---|
| D01 | PASS | Hero ghi fashion/portraits, CTA Explore the edit, contact email rõ ràng ở cuối. |
| D02 | PASS | Chữ display hai dòng sau thẻ tim đỏ và collage hai ảnh nghiêng với sticker vẽ tay là hai lựa chọn riêng. |
| D03 | PASS | Hero: studio làm gì; portrait/note: cách tiếp cận; story: cá tính; dịch vụ: phạm vi; contact: hành động tiếp theo. |
| D04 | PASS | Token màu/font/spacing tập trung root; hai font, CTA thống nhất. |
| D05 | PASS | Đã nhìn ảnh desktop/tablet/mobile, kiểm chữ MUSE hẹp, mặt và cổ áo không bị crop mất, stack không đè copy. Chữ hero là một phần trang trí sau note theo brief. |
| D06 | PASS | Nội dung Anh nhất quán studio/portfolio, không lorem ipsum hay fake backend. |
| D07 | PASS | Không logo khách thật/testimonial/thống kê bịa; README nói rõ studio và người trong ảnh là demo AI. |
| D08 | PASS | Không bảng giá/địa chỉ demo mâu thuẫn; email có một chỗ và nằm trong edit map. |

## Bảng tương tác

| Nhãn / vị trí | Loại / hành vi | Demo | Kết quả |
|---|---|---|---|
| Brand, footer arrow | Anchor #top | Không | PASS |
| The edit, Explore the edit | Anchor #edit | Không | PASS |
| My story, View story | Anchor #story | Không | PASS |
| Let's talk, Say hello, Start a conversation | Anchor #contact | Không | PASS |
| Email the studio | mailto:hello@example.com | Email cần thay; mở client, không tự gửi | PASS href, không gửi email thử |
| Menu mobile | Button toggle #site-menu | Không | PASS click/Escape/link/resize/focus |
| Plus, heart, thermometer, chat, drawing icons | Trang trí aria-hidden | Không giả làm control | PASS |
| Entrance | Reveal hữu hạn, chỉ transform | Mặc định bật | PASS CSS/class/frame/không loop |

## Việc còn lại trước phát hành

Chủ sản phẩm chốt copyright owner và điều khoản dùng/phân phối ảnh trong LICENCE.txt. Khi đó cần đóng ZIP và kiểm lại hash/tài liệu. Safari/Cốc Cốc chỉ cần thử nếu muốn công bố hỗ trợ; không tự suy ra từ Edge. Catalog và luồng tải trả tiền nằm ngoài yêu cầu lần này. Email mẫu phải thay trước khi khách xuất bản site riêng.

Không có lỗi kỹ thuật đang biết trong phạm vi đã thử. Chỉ sửa ba phạm vi mới: thư mục sản phẩm, demo và preview của melt-muse.
