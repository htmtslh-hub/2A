# Đóng gói và triển khai

Đây là adapter môi trường; đọc trong bước 1 và 8. Invocation đầy đủ cho phép push/deploy đúng sản phẩm tới Git/hosting được cấu hình và thuộc yêu cầu hiện tại. Không mặc định cho phép đổi DNS, tạo dịch vụ có phí, force-push, sửa DB/quyền mua hoặc đăng nhập người khác. Không triển khai sản phẩm khi người dùng chỉ yêu cầu viết/cài quy trình.

## Ngoài Forge Zone

Đọc rules của dự án, giữ nền tảng/structure đang có. Nếu từ số 0, ưu tiên web tĩnh dễ sửa: index.html, assets/css/style.css, assets/js/main.js, assets/img nếu cần, README.md, CUSTOMISE.md, LICENCE.txt. File LICENSE chỉ nêu quyền thật và chủ thể được cung cấp; không bịa copyright owner. Có input ảnh thì không tự áp giới hạn 20KB của Forge Zone lên mọi dự án.

Gói chứa code/assets/documentation dùng được, không node_modules/cache/secrets/reference video. Hướng dẫn AI khác phải tự đầy đủ; không phụ thuộc lịch sử chat. Tách source và build, generate build từ source đúng phiên bản. Nếu framework có sẵn thì giao đúng structure/build instructions, không đổi sang static để làm vừa ZIP.

Git và hosting chưa cấu hình: làm xong source/test/gate, hỏi remote/đích triển khai hoặc chỉ rõ công cụ/quyền còn thiếu. Không hứa đã push/deploy bằng việc đưa vài lệnh cho người dùng. Tool bị chặn phải báo thao tác và lý do chặn; không tìm cách vượt giới hạn.

## Trong repository Forge Zone / 2A

Đọc live AGENTS.md ở root, web/ và product/giao-dien-web/, cùng docs chuẩn hiện tại. Snapshot đi kèm để AI ngoài repo hiểu hồ sơ, không thay thế live rules:

- [product-standards.md](forge-zone/product-standards.md), WEB-STATIC-1 v1.2.
- [instruction-product.txt](forge-zone/instruction-product.txt).
- [customer-guide.en.md](forge-zone/customer-guide.en.md), 10 bước/12 prompt dùng để viết CUSTOMISE cho từng mẫu.

WEB-STATIC-1 mặc định sáu file, inline SVG, ZIP<20480 byte, JS menu/reveal. Reference cần raster/scene/carousel/scroll ngoài hồ sơ thì không cắt chất lượng hoặc hành vi để giả đạt >95%. Xác định profile/ngoại lệ thật từ yêu cầu hiện tại và ủy quyền đã có, ghi W01/W03/W05/W06 bị tác động; nếu chưa có thì xin đúng ngoại lệ cần thiết trước phần phụ thuộc. Việc gọi ForgeFrame không tự sửa profile chung và không áp ngoại lệ một sản phẩm sang tất cả mẫu khác.

Animation theo live rules ngày 05/10/2026: default ON kể cả Edge/Cốc Cốc, OS reduce và saved off cũ; người xem có thể tạm dừng trong phiên nếu có điều khiển, reload bật lại; RAF hữu hạn fallback cho effect quan trọng. Mặc định của skill/thư viện không được vô hiệu hóa animation theo OS khi live rules yêu cầu bật.

Đường dẫn sản phẩm mới:

```text
web/product/giao-dien-web/<slug>/source/
web/product/giao-dien-web/<slug>/<slug>.zip
web/product/giao-dien-web/<slug>/reviews/<version>/
web/public/demos/<slug>/
web/public/previews/<slug>.webp
```

Không ghi đè slug/ô catalog đã có. Category lấy từ type/config live, không đoán category từ snapshot. Đọc real-templates.ts, template-guides.ts, catalog/price mapping, demo sync và download route trước đồng bộ. Chỉ thêm entry cần thiết, đủ vi/en/zh, giá theo chính sách hiện có; không sửa giá/payment để tiện phát hành. Preview phải chụp từ sản phẩm cuối, không concept khác; file tải đúng slug và riêng ngoài public.

Sau gate, chạy công cụ live của repo:

```text
node web/product/giao-dien-web/tools/dong-goi.mjs <slug>
node web/product/giao-dien-web/tools/check-template.mjs <slug> --version <version>
```

Chỉ thêm --ngoai-le khi có ngoại lệ đã được ủy quyền và ghi QA. Check-template kiểm ZIP giải nén; nó không đo đủ độ giống ảnh/video của ForgeFrame. Hai cửa này bổ sung nhau, không thay thế nhau. Đảm bảo preview không thay đổi candidate hoặc source; nếu đổi thì kiểm lại.

Nếu local có đổi chưa phát hành của người dùng, tìm production commit/deployment thực tế, dùng checkout/worktree sạch phù hợp và đưa **chỉ** sản phẩm mới cùng entries cần thiết vào đó. Không deploy toàn bộ local vì build xanh. Kiểm remote chưa đổi trước push, tránh tự động overwrite deploy từ người khác.

Build cửa hàng, kiểm chi tiết/thư viện/home/guide, preview và demo ở ba ngôn ngữ cùng desktop/mobile; không cho phần dùng chung bị lỗi. Stage/commit/push đúng diff. Dùng provider đang cấu hình (trong 2A hiện là Vercel) qua CLI/API sẵn có; đọc docs live/config trước các thay đổi cấu hình. Không ghim mã t20, slug Laila hoặc deployment cũ trong quy trình dùng lại.

## Sau deploy

Ghi source commit, deployment id/URL, alias, version và hashes. Fetch HTML/CSS/JS/images/preview online so byte/hash; test motion khi OS reduce/saved off trên Edge/Cốc Cốc nếu scope yêu cầu. Kiểm cache/version, các mẫu liên quan, route/download artifact tồn tại trong deployment/tracing và quyền chặn anonymous/direct ZIP.

Nếu cần kiểm tải sau mua, dùng quyền thử hiện có được ủy quyền. Không tạo Purchase, DownloadToken, sửa entitlement hoặc giao dịch thật tự phát để lấy PASS. Nếu chưa thể test quyền mua thật, ghi NOT TESTED cho luồng đó và bằng chứng artifact/guards đã thử, không gọi toàn bộ thanh toán đã qua. Gói thương mại không đặt công khai để né kiểm quyền.

Release lỗi thì kiểm nguyên nhân và sửa trong scope, không lặp publish cùng artifact hoặc chuyển sang provider mới để né lỗi. Bàn giao chỉ khi public UI/tài nguyên cần thiết đã đúng; phần bên ngoài scope chưa thử ghi chính xác.
