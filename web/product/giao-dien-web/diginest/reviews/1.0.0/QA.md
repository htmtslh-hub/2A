# DigiNest 1.0.0 — QA

Ngày 06/10/2026 · Windows · quy chuẩn 1.2 · WEB-STATIC-1 với ngoại lệ ghi trong BRIEF.md.

## Kết quả

Giao diện và giỏ hàng hoàn thành trong phạm vi yêu cầu. Kiểm tra tự động cuối: không còn failure. Chưa phát hành thương mại: chủ sở hữu bản quyền và điều khoản ảnh raster cần chủ sản phẩm hoàn thiện. Không triển khai hoặc sửa catalog.

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 | PASS theo ngoại lệ W01/W03 | Sáu file lõi và ba ảnh WebP; không thư viện/API/CDN trong ZIP. checks.json.files |
| Q02 | PASS | Chromium + Firefox 1440×900, 820×1180, 375×812, 320×740 không tràn ngang; ảnh toàn trang và menu trong screenshots/ |
| Q03 | PASS theo ngoại lệ W05 | Menu, link, search/filter; cart-checks.json và desktop-browser-checks.json: thêm/xoá, quantity, bundle, tiền và shipping, persistence, review demo |
| Q04 | PASS | Skip link/Tab/Shift+Tab/focus/menu ẩn trong checks.json; cart-accessibility.json và Escape/focus-return trong cart-checks.json |
| Q05 | PASS | Landmark, một h1, heading, SVG/ID/names; axe không vi phạm ở trang và cart mở |
| Q06 | PASS | checks.json.contrast gồm số đo CSS và pixels nền ảnh, hover/focus; evidence-summary.json. Đã nhìn hero/banner trên desktop/tablet/mobile sau tăng chữ và lớp phủ teal |
| Q07 | PASS | Zoom 200%, reduced-motion setting, file://, noJS/offline/font fallback trong checks.json; localStorage bị từ chối vẫn dùng giỏ trong desktop-browser-checks.json |
| Q08 | PASS trong phạm vi đã thử | Chromium 153.0.8010.12, Firefox 155.0; Edge 154.0.4258.62 và Cốc Cốc 152.0.7977.124 thử cart/menu ở 375px. Safari/iPhone thật NOT TESTED, không tuyên bố đã thử |
| Q09 | PASS | Không console/network errors ở các lượt ghi; đã cuộn và thao tác qua Playwright; ba ảnh tổng 413274 bytes, không vòng rAF/scroll listener |
| Q10 | FAIL trước phát hành thương mại | Docs 10 bước/12 prompt và edit-map đúng; không font tải ngoài. Copyright owner và quyền ảnh raster chưa được cung cấp; đã ghi rõ trong LICENCE.txt |
| Q11 | PASS theo ngoại lệ W06 | ZIP 436822 bytes, đọc lại khớp source; kiểm tra bản giải nén HTTP/file://. SHA-256 dưới đây |
| Q12 | N/A | Không được giao tích hợp vào Forge Zone/deploy/thanh toán hay luồng tải sau mua |
| Q13 | PASS | D01–D08 dưới đây; đã xem screenshots của trang và giỏ |

## Thiết kế

| Mục | Trạng thái | Nhận xét |
|---|---|---|
| D01 | PASS | Hero nói thiết bị cho work/play/create/connect, CTA vào nhóm mua sắm |
| D02 | PASS | Hero ảnh desk teal/cam rộng; nền kem bo cong nối khu workspace và catalog. Atlas sáu ảnh gốc thống nhất tỷ lệ |
| D03 | PASS | Workspace: nhu cầu; promos: tình huống dùng; categories: loại; catalog: mua; benefits/policies: thông tin; cart: lựa chọn |
| D04 | PASS | Token màu/font/spacing, nút dùng chung; font hệ thống |
| D05 | PASS | Đã xem desktop/tablet/mobile và cart; không chữ chồng, quan trọng giữ ảnh thiết bị rõ |
| D06 | PASS | Tiếng Anh phù hợp ngành, không lorem ipsum hoặc rating/testimonial giả |
| D07 | PASS | Nội dung và ảnh giả định đã ghi trong catalog note, demo info và docs |
| D08 | PASS | Giá card/data/cart khớp; bundle $179.98 = $129.99 + $49.99; chính sách shipping thống nhất |

## Bảng tương tác

| Thành phần | Hành vi | Demo | Kết quả |
|---|---|---|---|
| Header/menu/hero/footer | Link section; menu Escape, đóng sau chọn, reset khi resize | Không | PASS |
| Workspace/category/View all | Lọc category, cuộn đến catalog; không JS dùng anchor xem toàn bộ | Không | PASS |
| Search/Clear | Lọc tên/type, empty state, reset | Không | PASS |
| Add to cart/Audio duo | Thêm đúng sản phẩm và cập nhật badge, không tự mở drawer | Không | PASS |
| Open/close cart | Dialog modal; Escape/backdrop/close/continue, trả focus | Không | PASS |
| Quantity/Remove | 1–99, integer cents, remove, empty state, không mất focus điều khiển | Không | PASS |
| Storage | Reload; hai tab; giá trị lạ bỏ; denied storage vẫn dùng visit cart | Không | PASS |
| Review Order/Back | Tổng đơn minh bạch; không gửi đơn/thu tiền | Có, ghi rõ | PASS |
| Newsletter | Vô hiệu hoá, “Demo only” rõ ràng | Có | PASS |
| Policy links/details | Mở đúng details và cuộn tới | Nội dung mẫu | PASS |

## Phạm vi, tài sản và hạn chế

- Chỉ tạo source, ảnh, docs, ZIP và reviews trong diginest; không chạm novatrend hoặc sản phẩm khác.
- Nguồn ảnh/prompt chính xác tại IMAGE-PROMPTS.md; bản gốc giữ trong generated_images.
- Ngoại lệ W01/W03/W05/W06 trực tiếp phục vụ brief ecommerce và ảnh tham chiếu; không tuyên bố đạt nguyên hồ sơ SVG sáu-file/20KB.
- Không backend, stock, taxes, account, newsletter service hoặc payment. Checkout là review demo và không tạo trạng thái đã đặt hàng.
- Không có animation liên tục hoặc chuyển cảnh quan trọng; các kiểm tra wrap/frame motion N/A.
- Tài liệu đã đối chiếu file, đường dẫn, literal count và prompt đầu vào/nhiệm vụ/đầu ra. Chưa thử các prompt bằng một AI khác.
- Safari, iPhone thật, checkout thật và triển khai công khai chưa thử/ngoài phạm vi.

ZIP SHA-256: 9028bc3382efeb802e72acaa94c20b162b37ff72e1ef16e55882a1ff3bf0de1d
