# DigiNest 1.2.0 — QA

Ngày 06/10/2026 · Windows · quy chuẩn 1.2 · WEB-STATIC-1 với ngoại lệ ghi trong BRIEF.md.

## Kết quả

Giao diện và giỏ hàng hoàn thành trong phạm vi yêu cầu. Kiểm tra tự động cuối: không còn failure. Chưa phát hành thương mại: chủ sở hữu bản quyền và điều khoản ảnh raster cần chủ sản phẩm hoàn thiện. Không triển khai hoặc sửa catalog.

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 | PASS theo ngoại lệ W01/W03 | Sáu file lõi và ba ảnh WebP; không thư viện/API/CDN trong ZIP. checks.json.files |
| Q02 | PASS | Chromium + Firefox 1440×900, 820×1180, 375×812, 320×740 không tràn ngang; ảnh toàn trang và menu trong screenshots/ |
| Q03 | PASS theo ngoại lệ W05 | Menu, link, search/filter; ../1.1.0/cart-checks.json (baseline) và ../1.0.0/desktop-browser-checks.json: thêm/xoá, quantity, bundle, tiền và shipping, persistence, review demo |
| Q04 | PASS | Skip link/Tab/Shift+Tab/focus/menu ẩn trong checks.json; ../1.0.0/cart-accessibility.json và Escape/focus-return trong ../1.1.0/cart-checks.json (baseline) |
| Q05 | PASS | Landmark, một h1, heading, SVG/ID/names; axe không vi phạm ở trang và cart mở |
| Q06 | PASS | checks.json.contrast gồm số đo CSS và pixels nền ảnh, hover/focus; evidence-summary.json. Đã nhìn hero/banner trên desktop/tablet/mobile sau tăng chữ và lớp phủ teal |
| Q07 | PASS | Zoom 200%, reduced-motion setting, file://, noJS/offline/font fallback trong checks.json; localStorage bị từ chối vẫn dùng giỏ trong desktop-browser-checks.json |
| Q08 | PASS trong phạm vi đã thử | Chromium 153.0.8010.12, Firefox 155.0; Edge 154.0.4258.62 và Cốc Cốc 152.0.7977.124 thử cart/menu ở 375px. Safari/iPhone thật NOT TESTED, không tuyên bố đã thử |
| Q09 | PASS | Không console/network errors ở các lượt ghi; đã cuộn và thao tác qua Playwright; ba ảnh tổng 413274 bytes, rAF hữu hạn tối đa 1090ms cho thẻ bay/pulse; không vòng lặp liên tục hoặc scroll listener |
| Q10 | FAIL trước phát hành thương mại | Docs 10 bước/12 prompt và edit-map đúng; không font tải ngoài. Copyright owner và quyền ảnh raster chưa được cung cấp; đã ghi rõ trong LICENCE.txt |
| Q11 | PASS theo ngoại lệ W06 | ZIP 439377 bytes, đọc lại khớp source; kiểm tra bản giải nén HTTP/file://. SHA-256 dưới đây |
| Q12 | PASS trong phạm vi demo deploy mới | Người dùng đã yêu cầu push/deploy sau nghiệm thu. Public demo trên Forge Zone đã kiểm tra; không thêm catalog bán hàng, không giao thanh toán hoặc luồng tải sau mua |
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
- Không có animation liên tục hoặc carousel; wrap hai chiều N/A. Chuyển động thẻ bay đã đo frame giữa, thu nhỏ, đích giỏ, cleanup và bấm nhanh trên bốn browser, xem ../1.1.0/flight-checks.json.
- Tài liệu đã đối chiếu file, đường dẫn, literal count và prompt đầu vào/nhiệm vụ/đầu ra. Chưa thử các prompt bằng một AI khác.
- Safari, iPhone thật, checkout thật và triển khai công khai chưa thử/ngoài phạm vi.

ZIP SHA-256: e175312bdc9f5057e074b5c32f8ae6dd62f14f1e8488d093d042280b010ceabe

## Phạm vi cập nhật 1.1.0

Theo yêu cầu: một thẻ ảnh/tên/giá bay vào giỏ khi thêm sản phẩm hoặc bundle, theo đường cong 850ms; giỏ nảy 240ms. Sticky header giữ đích trong viewport. Tạm dừng/huỷ flight cũ khi bấm mới hoặc mở cart, không ảnh hưởng dữ liệu số lượng. Thẻ pointer-events:none, aria-hidden; không lấy focus. rAF chạy mặc định kể cả reduced-motion và motion=off lưu cũ; hoạt động khi CSS animation và WAAPI bị vô hiệu hoá. Đã nhìn ảnh giữa chuyển động ở mobile.

| Browser | Phiên bản | Kết quả |
|---|---|---|
| Chromium | 153.0.8010.12 | PASS: frame giữa ở 1440/820/375/320, cleanup, 8 click nhanh, mở cart giữa flight, bundle, noCSS/WAAPI/reduced-motion |
| Firefox | 155.0 | PASS: frame giữa ở 1440/820/375/320, cleanup, 8 click nhanh, mở cart giữa flight, bundle, noCSS/WAAPI/reduced-motion |
| Edge | 154.0.4258.62 | PASS: frame giữa ở 1440/820/375/320, cleanup, 8 click nhanh, mở cart giữa flight, bundle, noCSS/WAAPI/reduced-motion |
| CocCoc | 152.0.7977.124 | PASS: frame giữa ở 1440/820/375/320, cleanup, 8 click nhanh, mở cart giữa flight, bundle, noCSS/WAAPI/reduced-motion |

Kiểm tra giỏ hồi quy Chromium/Firefox: ../1.1.0/cart-checks.json (baseline). Kiểm tra tổng thể bản ZIP giải nén: checks.json (0 failure). Kiểm tra Edge/Cốc Cốc bổ sung chỉ tập trung animation/cart; không gọi đó là kiểm toán đầy đủ cả trang. Quyền ảnh/bản quyền Q10 giữ trạng thái chưa phát hành thương mại của bản trước. Không sửa tài sản hoặc sản phẩm khác.

## Phạm vi cập nhật 1.2.0

Chủ sản phẩm đồng ý ba ưu tiên: hover sản phẩm, filter danh mục, và ngăn giỏ. Chỉ sửa CSS/JS, README/CUSTOMISE, root README, ZIP và hồ sơ DigiNest. Flight 1.1.0 được giữ. Drawer mở/đóng 340ms cùng fade backdrop; vẫn modal tới lúc đóng xong và trả focus. Hover/focus 200ms nâng 5px, ảnh scale 1.045. Filter 320ms dùng vị trí trước/sau và fade sản phẩm mới, cập nhật hidden/data ngay. Tất cả rAF hữu hạn, huỷ sequence cũ khi đổi nhanh, hoạt động khi CSS animation/WAAPI bị vô hiệu hoá và reduced-motion hoặc trạng thái motion=off cũ. Không thay điều khoản licence.

| Browser | Phiên bản | Bằng chứng |
|---|---|---|
| Chromium | 153.0.8010.12 | PASS 1440/820/375/320: frame drawer vào/ra, backdrop, filter hai chiều, hover vào/ra, cleanup, Escape/focus, số lượng giữ đúng; đổi nhanh và CSS/WAAPI disabled |
| Firefox | 155.0 | PASS 1440/820/375/320: frame drawer vào/ra, backdrop, filter hai chiều, hover vào/ra, cleanup, Escape/focus, số lượng giữ đúng; đổi nhanh và CSS/WAAPI disabled |
| Edge | 154.0.4258.62 | PASS 1440/820/375/320: frame drawer vào/ra, backdrop, filter hai chiều, hover vào/ra, cleanup, Escape/focus, số lượng giữ đúng; đổi nhanh và CSS/WAAPI disabled |
| CocCoc | 152.0.7977.124 | PASS 1440/820/375/320: frame drawer vào/ra, backdrop, filter hai chiều, hover vào/ra, cleanup, Escape/focus, số lượng giữ đúng; đổi nhanh và CSS/WAAPI disabled |

Bằng chứng hiện tại: motion-checks.json; ảnh screenshots/*-drawer-in.png đã nhìn. checks.json kiểm tra chính ZIP 1.2.0 trên Chromium/Firefox, không failure. Bằng chứng giỏ/flight của 1.1.0 được dẫn như baseline; kiểm tra hiện tại bổ sung số lượng khi thao tác mở/đóng. Không carousel nên last/first wrap N/A. Safari/iPhone thật chưa thử. Q10 bản quyền và ảnh raster vẫn cần chủ sản phẩm hoàn thiện trước phát hành thương mại.

## Deploy production — 06/10/2026

Theo yêu cầu mới của chủ sản phẩm: push GitHub và deploy. Source commit 9011a41 trên master, https://github.com/htmtslh-hub/2A. Vercel READY: dpl_CgLWyVX2HsKsZZRmcjic6eB8KzHq, https://web-k10msq94w-htmtslh-hubs-projects.vercel.app; domain https://forgezone.store.

Demo: https://forgezone.store/demos/diginest/index.html?v=1.2.0. Deploy từ git archive sạch, chỉ commit DigiNest và public demo; NovaTrend đang untracked không đưa vào deploy. Không thay biến môi trường, database, payment hoặc catalog chung. Next production build/TypeScript thành công; trang chủ trả 200 (smoke HTTP, không phải kiểm toán tất cả tính năng của cửa hàng).

deployment-checks.json: 6 tài nguyên trả 200, ảnh khớp byte; HTML/CSS/JS khớp nội dung sau chuẩn hoá CRLF/LF vì Git Windows export. Chromium 153.0.8010.12, Firefox 155.0, Edge 154.0.4258.62, Cốc Cốc 152.0.7977.124 thực: 375px online không tràn; flight, drawer frame giữa, Escape/focus, $55.98 cho một speaker và $99.98 cho hai speaker, persistence, review demo, filter và hover PASS. Không page error; đã xem ảnh deployed trong screenshots/. Không biến checkout demo thành thanh toán thật.
