# Ember Arcade — brief 1.1.0

09/10/2026. Yêu cầu: tạo sản phẩm giao diện web tương tự screenshot gaming dashboard, tiếp nối yêu cầu trước về sản phẩm thương mại. Người mua: designer, cộng đồng game hoặc đội frontend cần dashboard catalogue/launcher UI tĩnh. Khách truy cập: người xem thư viện game mẫu. Mục tiêu: khám phá thế giới game và thấy rõ cấu trúc thư viện.

Slug ember-arcade, demo Anh. Tông burgundy/coral/kem, sidebar hai bên, banner nhân vật sci-fi, game cards, playtime ring và activity row theo screenshot. Tên game/nhân vật/logo/ảnh tạo riêng; không đóng các ảnh hay franchise từ screenshot. CTA chính Explore game mở ghi chú game, không chạy game giả.

Phạm vi: thư mục sản phẩm mới, ZIP thương mại, tài liệu, bản demo và preview cục bộ; đề xuất catalog vi/en/zh. Chưa đăng catalog, push/deploy hoặc thay sản phẩm/backend/cấu hình chung trong yêu cầu này. Chỉ bộ tài liệu/ảnh nguồn/QA được tạo trong phạm vi mới.

WEB-STATIC-1 v1.2 + ngoại lệ riêng theo dashboard ảnh: W01/W03/W06 cho ba WebP, ZIP mục tiêu <1MiB, mỗi ảnh <300KB. W05: search trên hai thẻ discovery, favourite localStorage và mở details theo hash là tương tác frontend hợp lý cho UI dashboard được yêu cầu. Không áp dụng hồ sơ IMG đang đề xuất hoặc đổi chuẩn chung. Không backend/auth/chat/download/payment; các dữ liệu đều demo rõ ràng. Motion finite mặc định bật theo rules05/10.

Licence giữ chính sách thương mại bảy mục đã có; chủ thể Văn Triển đối chiếu sản phẩm thương mại Melt Muse/Apartment Flow. Gói giao gồm ba ảnh original AI để dùng trên website, không bán riêng như stock.

Hai concept được tạo trước code: header/hero và library/stats/activity. Phân tích: grid chính tỷ lệ1.8:1, hai rail80px, khoảng cách24–26px, radius22–28px, copy48–56px và body16px. Các concept không phải ảnh nguyên trang thu nhỏ. Artwork riêng không chứa typography, chữ/UI viết bằng HTML. Đồ họa orbit viết CSS và icon inline SVG.

Revision 1.1.0: owner's new selected hero. Replace Rift artwork with seated courier and fox in canyon; two-line live title, transparent copy panel with contrast gradient, three image quick picks, header wordmark. Existing lower dashboard and interactions preserved. Sync product-only demo, preview and ZIP; no shared catalog, push or deploy.

