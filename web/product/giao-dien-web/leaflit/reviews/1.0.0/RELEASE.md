# Leaflit 1.0.0 · Phát hành 14/10/2026

Chủ sản phẩm đã duyệt bản cuối và yêu cầu rõ: “ok em đóng gói sản phẩm và đưa lên store”. Phạm vi được mở rộng: ZIP riêng, catalog t32 nhóm entertainment, hướng dẫn vi/en/zh, demo/preview/video và triển khai store hiện có. Không thay giá chung, database, quyền mua hoặc các sản phẩm khác.

Ngoại lệ riêng đã được chấp nhận qua yêu cầu hiện tại và lịch sử: W05 tương tác cục bộ; W01/W03/W06 tám ảnh raster ngoài sáu file cốt lõi và gói trên 20 KiB. Tổng 14 file. Hình/brand của bản cuối được chủ sản phẩm duyệt, không tuyên bố fidelity >95% với ảnh Kindle ban đầu. Yêu cầu phát hành bản cuối có ưu tiên hơn gate fidelity chưa đạt của skill được trợ lý chủ động chọn ở lượt trước. Kiểm tra kỹ thuật, gói và store vẫn bắt buộc, không thay NOT TESTED bằng PASS.

LICENCE giữ bảy mục/quyền dùng, hạn chế bán lại và bảo hành hiện có; chỉ đồng bộ mô tả tài sản từ “SVG illustrations” sang SVG portraits + generated WebP covers để áp dụng đúng gói chủ sản phẩm yêu cầu bán. Không thêm quyền mới ngoài chính sách gốc cho original illustrations.

File dùng chung cần sửa: real-templates.ts, template-categories.ts, template-guides.ts và manifest video. Recorder chỉ thêm nhánh leaflit; sharp fallback dùng phụ thuộc đã có, không đổi kịch bản các mẫu khác. Các manifest hiện có phải giữ nguyên.

Triển khai từ worktree sạch HEAD 4f69bb6, chỉ copy diff Leaflit và entries cần thiết. Không đưa hồ sơ Dualplay/Pinterest đang untracked vào release.

Kiểm tra giao dịch mua/tải có quyền thật chỉ dùng trạng thái/quyền được phép hiện có; không tạo đơn hoặc sửa entitlement để lấy PASS. Nếu chưa thể kiểm, báo rõ NOT TESTED.
