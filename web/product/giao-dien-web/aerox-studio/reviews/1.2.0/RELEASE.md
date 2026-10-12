# Aerox Studio — demo release 12/10/2026

Chủ sản phẩm yêu cầu push và deploy bản 1.2.0. Phạm vi phát hành: source/hồ sơ Aerox Studio, demo công khai và ảnh preview trên hosting Forge Zone đang có. Không đưa Galaxy Edge, không đổi catalog/giá/payment/database hoặc bật bán/tải thương mại. Gói candidate ở reviews vẫn nội bộ, không public ZIP. Yêu cầu phát hành demo mới nhất thay thế giả định local-only trước đó; đây không phải chứng nhận >95% fidelity hoặc giấy phép thương mại đã hoàn tất.

Demo public/demos/aerox-studio/index.html có base trỏ chính index.html để anchor/gallery assets hoạt động sau redirect và meta phiên bản1.2.0; assets byte-identical nguồn. Preview chụp từ mã1396×1047 rồi xuất698×524. Local demo smoke PASS: chọn Classic tải ảnh đủ, anchor Gallery giữ đúngindex.html, không pageerror.

Chromium/Firefox: product-checks và deployment-check. Edge155.0.4283.45/Cốc Cốc152.0.7977.124: native-release-checks PASS cho chuyển hai chiều, frame giữa, wrap, thao tác nhanh khi OSreduce và motion off cũ. Giữ báo cáo raw ngoại lệ external-link từ checker, URL hãng đã kiểmHTTP200.

Git và deployment URL sẽ được ghi sau khi thực hiện; không tuyên bố hoàn thành trước xác minh online.

## Kết quả phát hành

- Runtime commit: f1a7747da883669f3c335022ea9561ad35916077 trên GitHub master.
- Vercel: dpl_FTkY4fr816RoXNbA7gj6oqcbfaeq, READY, production build/TypeScript PASS.
- Deployment: https://web-d3xf5zfvd-htmtslh-hubs-projects.vercel.app
- Public demo: https://forgezone.store/demos/aerox-studio/index.html?v=1.2.0
- 10 tài nguyên demo khớp SHA-256 với bản đã push; preview khớp byte. Hai demo có sẵn (Auralis/Velora) giữ nội dung; home/guide trả 200. Candidate ZIP không public (404), tải anonymous bị chặn (401).
- Edge và Cốc Cốc online PASS: OS reduce/off cũ, frame giữa, wrap hai chiều, thao tác nhanh, ảnh và tiêu đề, anchor giữ đúng index.html, dialog, không overflow hoặc pageerror. online-http-checks.json và online-browser-checks.json ghi kết quả.
- Catalog và giá không đổi; chưa bật bán hoặc tải thương mại Aerox. Galaxy Edge không push/deploy.

Commit bổ sung báo cáo không thay runtime artifact; không cần triển khai lại chỉ vì hồ sơ đã được cập nhật.
