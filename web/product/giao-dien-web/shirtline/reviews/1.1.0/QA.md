# Shirtline 1.1.0 — sửa carousel vòng quay

Ngày: 07/10/2026. Chuẩn tham chiếu WEB-STATIC-1 v1.2. Phạm vi: main.js, motion.css, hướng dẫn riêng; demo, preview và ZIP Shirtline. Không sửa NovaTrend, catalog, cấu hình chung hay triển khai.

Brief đã chốt: năm áo cùng tồn tại trên một vòng tròn phối cảnh, lướt theo quỹ đạo oval, thu nhỏ ở phía sau; tự chạy, nút trước/sau, preview sản phẩm kế tiếp và theme theo áo. Giữ dữ liệu, ảnh và giỏ hiện có. Yêu cầu hiện tại ưu tiên choreography vòng quay thay cho slide/fade của starter Morge. Motion mặc định bật theo rules dự án, không đọc trạng thái off cũ hoặc tự tắt theo hệ điều hành.

## Bằng chứng trong phạm vi sửa

`check-orbit.cjs` và `orbit-checks.json`: trình duyệt cài thật chạy headless với profile test riêng, Windows; Edge 154.0.4258.62 và Cốc Cốc 152.0.7977.124. Không dùng profile cá nhân. Các frame giữa được đo từ transform và vị trí vòng quay; kiểm tra cả năm node không thay src và đều có opacity > 0.

PASS trên cả hai browser: previous 0 → 4 và next 4 → 0, frame giữa tiến đúng chiều, next/next/prev/next liên tiếp, counter đồng bộ, RAF kết thúc, tự chạy, tạm dừng, phím trái/phải, giỏ thêm/mở/đóng, trạng thái reduced-motion + storage off cũ, CSS animation/transition tắt, file://, không JS vẫn có áo hero và năm sản phẩm. Không có pageerror.

1440×900, 820×1180, 375×812, 320×740: scrollWidth bằng viewport trên cả hai browser. Đã nhìn ảnh desktop, frame giữa và mobile. Sau khi tăng vùng bấm dot lên 44×44, kiểm tra lại ảnh 320px (`final-320.png`) và control group rộng 264px nằm trong stage. Chưa thử điện thoại thật và swipe thực.

Demo HTTP localhost:4372 có đúng năm ảnh orbit. Toàn bộ file demo khớp byte source. ZIP cuối giải nén ở `package/shirtline/`, mở bằng Edge file:// và chuyển sang áo 02 thành công. `node --check` PASS. Preview sinh từ source cuối, không dùng mockup.

## Q01–Q13 trong lần sửa này

| Mục | Trạng thái | Phạm vi |
|---|---|---|
| Q01 | PASS theo ngoại lệ | 15 file; raster và CSS riêng theo yêu cầu Shirtline |
| Q02 | PASS phần sửa | Bốn viewport, ảnh và đo overflow; chưa nghiệm thu toàn bộ menu |
| Q03 | PASS phần sửa | Carousel, preview, pause, bag; swipe thật NOT TESTED |
| Q04 | PASS phần sửa | Phím trái/phải và focus carousel; toàn bộ thứ tự Tab NOT TESTED |
| Q05 | PASS phần sửa | Một hero-shirt id, aria-pressed dots/pause, aria-hidden áo phụ |
| Q06 | NOT TESTED | Chưa đo đầy đủ tương phản toàn trang |
| Q07 | PASS phần sửa | Không JS, reduced motion bật theo yêu cầu, CSS motion tắt; offline toàn bộ và zoom NOT TESTED |
| Q08 | PASS phần sửa | Edge/Cốc Cốc thực, headless, không suy ra Safari/thiết bị thật |
| Q09 | PASS phần sửa | Không pageerror, RAF hữu hạn, không thư viện mới |
| Q10 | NOT TESTED | README/CUSTOMISE đã cập nhật orbit; hướng dẫn cũ chưa đủ chuẩn 10 bước/12 prompt; LICENCE giữ nguyên |
| Q11 | PASS | ZIP khớp source, giải nén mở và chuyển áo; hash bên dưới |
| Q12 | PASS phần sửa | Demo và preview đã đồng bộ; tải sau thanh toán/deploy NOT TESTED |
| Q13 | PASS phần sửa | D05 vòng quay và controls nhìn ảnh desktop/mobile; D01–D04/D06–D08 giữ nội dung cũ, chưa nghiệm thu lại |

Ngoại lệ W01/W03/W05/W06 theo các yêu cầu trước và hiện tại của chủ sản phẩm: năm ảnh raster tạo riêng, các file CSS bổ sung, carousel/giỏ, ZIP lớn hơn 20.480 byte. Không tự sửa licence hoặc áp hồ sơ ảnh đề xuất chưa duyệt. Đây là nghiệm thu sửa motion, không tuyên bố toàn sản phẩm đạt phát hành WEB-STATIC-1.

ZIP cuối: `shirtline.zip`, **510190 byte**, SHA-256 `d71583d9ead66c85602e8351d4981c5e441c83dde2365d935eda9412c4c64827`.

Lệnh chuẩn `check-template.mjs shirtline --version 1.1.0 --ngoai-le --out standard` chạy thêm trên bản ZIP trước lần tăng vùng bấm dot; bằng chứng của nó không thay bằng chứng ZIP cuối hoặc xem như đạt nghiệm thu toàn bộ. Các vấn đề tài liệu/menu/axe ngoài phạm vi motion phải được xem riêng khi phát hành.

Kết quả lệnh chuẩn: Chromium 153.0.8010.12 và Firefox 155.0, exit 1, 26 cảnh báo FAIL trên ZIP 510197 byte. Dot 28px đã sửa thành 44px trong ZIP cuối. Các mục khác gồm tài liệu thiếu 10 bước/12 prompt, thiếu skip link, vùng bấm navigation/bag/menu nhỏ, focus CTA tương phản thấp, drawer ẩn còn focus và navigation mobile khi không JS. Hai nhóm reduced-motion/animation sau 5 giây mâu thuẫn yêu cầu chủ sản phẩm bật motion mặc định nên không dùng để tắt vòng quay. Đây không phải toàn bộ sản phẩm đạt chuẩn phát hành; xem `standard/checks.json` để có dữ liệu đầy đủ. Không mở rộng sửa các phần này trong yêu cầu carousel hiện tại.
