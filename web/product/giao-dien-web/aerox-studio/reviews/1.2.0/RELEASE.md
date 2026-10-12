# Aerox Studio — demo release 12/10/2026

Chủ sản phẩm yêu cầu push và deploy bản 1.2.0. Phạm vi phát hành: source/hồ sơ Aerox Studio, demo công khai và ảnh preview trên hosting Forge Zone đang có. Không đưa Galaxy Edge, không đổi catalog/giá/payment/database hoặc bật bán/tải thương mại. Gói candidate ở reviews vẫn nội bộ, không public ZIP. Yêu cầu phát hành demo mới nhất thay thế giả định local-only trước đó; đây không phải chứng nhận >95% fidelity hoặc giấy phép thương mại đã hoàn tất.

Demo public/demos/aerox-studio/index.html có base trỏ chính index.html để anchor/gallery assets hoạt động sau redirect và meta phiên bản1.2.0; assets byte-identical nguồn. Preview chụp từ mã1396×1047 rồi xuất698×524. Local demo smoke PASS: chọn Classic tải ảnh đủ, anchor Gallery giữ đúngindex.html, không pageerror.

Chromium/Firefox: product-checks và deployment-check. Edge155.0.4283.45/Cốc Cốc152.0.7977.124: native-release-checks PASS cho chuyển hai chiều, frame giữa, wrap, thao tác nhanh khi OSreduce và motion off cũ. Giữ báo cáo raw ngoại lệ external-link từ checker, URL hãng đã kiểmHTTP200.

Git và deployment URL sẽ được ghi sau khi thực hiện; không tuyên bố hoàn thành trước xác minh online.
