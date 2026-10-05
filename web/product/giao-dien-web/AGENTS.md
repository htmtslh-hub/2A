## Bắt buộc đọc rules trước khi sửa nguồn

Đọc và làm theo [rules chung của dự án](../../../AGENTS.md) trước mọi thay đổi nguồn: xác định rõ phạm vi được phép thao tác và bảo toàn hoạt động của các file/sản phẩm khác. Đồng thời đọc đầy đủ rules ở file này và các tài liệu bắt buộc được dẫn tới.

# Quy tắc cho AI sửa hoặc tạo giao diện web Forge Zone

## Phạm vi

Áp dụng cho các mẫu thương mại trong `web/product/giao-dien-web/<slug>/`. Mỗi mẫu có mã nguồn gốc ở `source/`, ZIP bàn giao ở `<slug>.zip`, hồ sơ riêng ở `reviews/` và thiết kế riêng ở `design/` nếu có. Giao diện **cửa hàng** trong `web/src/` có quy tắc khác ở `web/AGENTS.md`; không áp giới hạn sáu file của mẫu bán lên cửa hàng.

## Đọc trước khi viết hoặc sửa mã

1. Đọc toàn bộ `docs/product-standards.md` và `docs/instruction-product.txt`. Đây là nguồn quy chuẩn của hồ sơ `WEB-STATIC-1`; file này chỉ hướng dẫn quy trình và không thay thế chúng.
2. Đọc bản `docs/customer-guide.md`, `docs/customer-guide.en.md` hoặc `docs/customer-guide.zh.md` khớp ngôn ngữ tài liệu khách hàng. Nếu sửa nội dung cốt lõi của hướng dẫn chung, đối chiếu cả ba bản.
3. Với mẫu đã có, đọc `<slug>/README.md`, `<slug>/source/README.md`, `CUSTOMISE.md`, `LICENCE.txt`, mã HTML/CSS/JS và hồ sơ `reviews/` mới nhất nếu tồn tại. Xem bản thiết kế trong `design/` khi việc sửa liên quan đến hình ảnh hoặc bố cục.
4. Đọc yêu cầu và brief mới nhất của chủ sản phẩm. Trước khi sửa, nêu mẫu nào sẽ sửa, các file dự kiến thay đổi và những giới hạn chính vừa đọc. Nếu không truy cập được tài liệu bắt buộc, yêu cầu cung cấp nội dung; không giả vờ đã đọc.

Thứ tự ưu tiên: yêu cầu rõ ràng mới nhất của chủ sản phẩm > `docs/product-standards.md` > `docs/instruction-product.txt` > mã và mẫu tham khảo. Ngoại lệ so với chuẩn phải được ghi rõ cùng ảnh hưởng trong hồ sơ bàn giao.

## Khi thực hiện

- Sửa bản gốc trong `<slug>/source/`. Không sửa trực tiếp ZIP, `web/public/demos/` hoặc ảnh preview rồi coi đó là mã nguồn cuối.
- Giữ đúng hồ sơ `WEB-STATIC-1` khi chưa được chủ sản phẩm đổi phạm vi: HTML/CSS/JS thuần, sáu file trong ZIP, đường dẫn tương đối, mở được qua `file://`, không framework, thư viện JS, backend hay hành vi giả. Đọc chuẩn để biết đầy đủ giới hạn và ngưỡng byte.
- Giữ CTA, menu, bàn phím, responsive, trạng thái không JS, giảm chuyển động và nội dung demo đúng như sản phẩm thực có. Không bịa tính năng, lời chứng thực, quyền sử dụng tài sản hoặc kết quả kiểm tra.
- Khi mã hoặc nội dung thay đổi, cập nhật `source/README.md` và `source/CUSTOMISE.md` nếu hướng dẫn khách hàng bị ảnh hưởng; không tự đổi điều khoản `LICENCE.txt`.
- Nếu phạm vi có cửa hàng, đồng bộ demo/preview và nội dung catalog theo sản phẩm đã nghiệm thu. File công khai ở `web/public/` giữ URL cửa hàng; mã gốc và hồ sơ vẫn nằm trong thư mục sản phẩm.

## Kiểm tra và bàn giao

1. Kiểm tra giao diện và tương tác ở 1440×900, 820×1180, 375×812 và 320×740, gồm menu, bàn phím, trạng thái không JS, giảm chuyển động, font dự phòng và console/network theo `docs/product-standards.md`.
2. Nếu tạo bản giao mới, chạy `node web/product/giao-dien-web/tools/dong-goi.mjs <slug>` từ gốc dự án. Script tự ghi ZIP bằng dấu `/`, kiểm tra sáu file, từ chối file ẩn/tạm, từ chối ZIP ≥ 20.480 byte hoặc file thừa, đọc lại so khớp byte với `source/` và in SHA-256. Chỉ thêm `--ngoai-le` khi ngoại lệ đã được chủ sản phẩm chấp nhận và ghi trong QA.md.
3. Chạy `node web/product/giao-dien-web/tools/check-template.mjs <slug> --version <x.y.z> [--ngoai-le]`. Script tự giải nén ZIP, kiểm tra tài liệu (10 bước, 12 prompt, số đếm edit map), rồi kiểm tra Chromium + Firefox: 4 khổ màn hình, vùng chạm, menu, bàn phím, tương phản (nền gradient/ảnh đo bằng điểm ảnh), axe, zoom 200%, giảm chuyển động, `file://`, không JS, offline. Bằng chứng ghi vào `<slug>/reviews/<version>/checks.json` và `screenshots/`. Kết quả tự động **không** thay việc nhìn ảnh chụp, kiểm tra chữ trên ảnh (`overImageNeedsManualCheck`), Safari/Edge và luồng tải sau thanh toán (Q12).
4. Ghi bằng chứng và trạng thái Q01–Q13, D01–D08 ở `<slug>/reviews/<version>/QA.md` khi nghiệm thu. Dùng `PASS`, `FAIL`, `NOT TESTED`, `N/A` đúng nghĩa; không tuyên bố phát hành đạt chuẩn nếu còn mục bắt buộc chưa kiểm tra.
5. Báo các file đã đổi, lệnh/thiết bị/trình duyệt đã kiểm tra, lỗi còn lại và phần chưa kiểm tra. Chỉ triển khai hoặc xuất bản nếu yêu cầu công việc bao gồm bước đó hoặc chủ sản phẩm đã ủy quyền.

Nếu công việc chỉ là sửa một chi tiết, kiểm tra phần bị ảnh hưởng ngay; trước khi phát hành vẫn phải hoàn thành các điều kiện nghiệm thu bắt buộc của bản cuối.

## Quy tắc animation — yêu cầu chủ sản phẩm ngày 05/10/2026

- Tất cả animation đã được tạo phải mặc định bật trên mọi trình duyệt, gồm Edge và Cốc Cốc. Không tự tắt theo prefers-reduced-motion, thiết lập hệ điều hành, nhận diện browser, hoặc trạng thái tắt đã lưu từ phiên bản cũ. Yêu cầu này ưu tiên hơn mặc định motion của skill và quy chuẩn cũ trong dự án.
- Vẫn cho phép người dùng chủ động tạm dừng ở trang đang mở; lần mở mới mặc định bật. Không yêu cầu query motion=on để animation thông thường hoạt động.
- Hiệu ứng quan trọng phải có đường chạy dự phòng khi CSS animation/transition hoặc Web Animations không hoạt động; dùng requestAnimationFrame hữu hạn điều khiển transform/opacity khi phù hợp. Dừng và hủy lượt cũ khi thao tác mới đến, không để vòng lặp chạy vô hạn.
- Khi kiểm tra, đo các frame giữa chuyển động, hai chiều wrap và thao tác nhanh trên Edge/Cốc Cốc thực bằng hồ sơ test riêng; kiểm tra cả khi hệ thống yêu cầu giảm chuyển động và khi còn trạng thái off cũ. Không tuyên bố mọi browser đã được thử nếu chỉ chạy một engine.
- Bản online phải được kiểm tra đúng phiên bản tài nguyên sau deploy, tránh cache CSS/JS cũ. Ghi rõ browser, phiên bản và phạm vi thực sự đã thử.
