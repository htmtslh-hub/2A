# Kiểm tra nền Apartment Flow 0.1.0

## Glass theo ảnh tham chiếu của chủ sản phẩm, 08/10/2026

Đổi từ kính sáng .88 sang kính khói trong hơn với blur, viền trắng mảnh;
hero chữ sans trắng đặt trực tiếp trên nền, header trong suốt, nút capsule
trắng, hai thẻ nổi có ảnh từ frame-0080/frame-0144. Room/contact/dialog/journey
dùng cùng vật liệu kính khói. Không sửa file ảnh, canvas renderer hoặc camera.

Đã nhìn trực tiếp in-app browser 1242×764: các thẻ không chồng nhau,
scrollWidth=clientWidth=1227 (scrollbar 15px); hero bottom 631, footer top 678.
Tried viewport overrides 1440/820/375/320 but the current browser kept reporting
1242×764, so new responsive measurements are NOT TESTED; do not use the old
four-viewport results to claim this reference style was retested on mobile.
Reference screenshots named reference-*.png all capture that actual viewport.
Final proof: glass-reference-final.png. Old contrast ratios refer to the earlier
light-glass version; white text on new smoke glass needs full scene contrast QA
before commercial release. CSS mobile layout is present, not independently verified.

## Giao diện căn hộ glass, 08/10/2026

Thêm header một hàng, brand mẫu Lumière Residence, hero, living/kitchen,
bedroom, contact; journey rail bốn chặng, nút về đầu, dialog tư vấn. Giữ
240 frame và single-frame renderer. Bốn story panel đổi theo camera đã làm
mượt; panel không hoạt động có inert + aria-hidden. Font Cambria cho tiêu đề
tiếng Việt, Georgia chỉ cho wordmark, Segoe UI cho thân bài, không tải font mạng.

Đã thử in-app browser trên Windows qua HTTP:
- Click chapter sống/bếp, phòng ngủ và liên hệ điều khiển camera và đổi nội dung.
- Dialog tư vấn mở bằng nút, Escape đóng, focus trả về nút Thông tin tư vấn.
- Bốn viewport 1440×900 / 820×1180 / 375×812 / 320×740: clientWidth và scrollWidth
  lần lượt 1425 / 805 / 360 / 305 (15px scrollbar), không tràn ngang.
- Một h1 và một active panel. Inactive panel phản chiếu thuộc tính inert thật.
- Đã nhìn ảnh desktop và mobile, sửa wrap tiêu đề và dấu tiếng Việt.
- Bằng chứng: glass-1440.png, glass-820.png, glass-375.png, glass-320.png,
  glass-living-mobile.png. Bản living-mobile là ảnh trước đổi font Cambria.
- JS syntax PASS. Tương phản tính bảo thủ trên glass .88 chồng nền đen:
  ink 10,69:1, soft 6,13:1; chữ trắng trên nút 14,89:1.

Chưa thử các engine Firefox/Edge/Cốc Cốc/Safari, no-JS trực tiếp, zoom 200%,
offline và audit bàn phím toàn trang. Không gắn trạng thái đạt phát hành thương mại.
Không có contact thật: dialog nêu rõ hình AI và dữ liệu minh họa, không thu thập
hoặc gửi form. Tên/địa chỉ/giá/diện tích cần xác nhận trước phát hành. Phạm vi
thay đổi chỉ sản phẩm apartment-flow; không sửa nguồn cửa hàng hay database.

## Loại bỏ mờ do trộn frame, 08/10/2026

Đã nhìn frame-0144.webp: video nguồn có độ mềm/motion blur cục bộ. Renderer
trước trộn hai ảnh kề nhau tạo thêm bóng kép trên viền cửa/đèn. Bản mới chỉ
vẽ một frame nguồn gần nhất, giữ damping và speed cap; DPR canvas tăng từ
giới hạn 1,5 lên 2, dùng imageSmoothingQuality high. Không thay đổi hoặc tạo
chi tiết giả trong 240 ảnh, không khẳng định phục hồi được chi tiết mất trong
nguồn 720p đã upscale. Bằng chứng blend trong các mục trước là lịch sử.

## Làm mượt theo Scroll World, 08/10/2026

Nguồn skill do chủ sản phẩm cung cấp: https://github.com/oso95/scroll-world.
Đã đọc SKILL.md và phần damping/coalescing của references/scrub-engine.js.
Áp dụng có điều chỉnh cho 240 WebP sẵn có: damping theo thời gian 140ms,
giới hạn tốc độ 96 frame nguồn/giây, blend hai ảnh kề nhau trong chuyển động,
gộp cập nhật khi decode đang chạy, preload ảnh nén với bốn worker, cache giải mã
quanh 21 frame. requestAnimationFrame kết thúc khi tới đích; không tạo loop thường trực.
Không dùng bootstrap/generation/interview vì nhiệm vụ chỉ cải thiện nền đã tạo,
không tạo mới clip hoặc landing page đầy đủ. Không cài skill toàn cục.
NOTICE giữ bản MIT của nguồn tham khảo, không thay quyền đối với media.

Thử in-app browser: các vị trí nội suy khi cuộn xuống ghi nhận
26.560 → 29.738 → 37.403 → 42.808 → 45.141 → 46.756 → 47.815;
đảo chiều 27.206 → 19.219 → 16.003 → 12.806 → 7.953 → 3.455 → 0.515.
Đây là mẫu DOM qua thao tác cuộn thực, không phải phép đo fps toàn trình duyệt.
JS syntax PASS. Chưa benchmark CPU throttling hoặc chạy Edge/Cốc Cốc thực.
Kiểm tra lại bốn viewport 1440/820/375/320px: scrollWidth 1425/805/360/305px
(15px dành cho thanh cuộn dọc), không tràn ngang, nút cao 44px.
Ctrl+End dừng ở frame 240/position 239.000, log warning/error rỗng.
Ảnh bằng chứng cuối: scroll-world-smooth.png.
Hai ảnh blend có thể có bóng kép nhẹ khi camera đang di chuyển; tại điểm dừng
snap về frame nguyên, không giữ bóng kép. Không tạo thêm chi tiết/interpolated video bằng AI.

## Cập nhật nền theo cuộn, 08/10/2026

Thay chế độ tự chạy bằng native scroll, scene sticky cao 600vh. 24fps là
tần suất lấy mẫu ảnh; tốc độ hiển thị giờ phụ thuộc thao tác cuộn.
Đã thử trong in-app browser viewport 575×764: cuộn xuống y=1528 hiện frame 97,
cuộn lên y=764 hiện frame 49, Ctrl+End y=3820 hiện frame 240,
nút Về đầu trả y=0/frame 1. JS syntax PASS. Ảnh scroll-background.png.
Các bằng chứng autoplay bên dưới là lần thử trước thay đổi, không dùng để
kết luận chế độ cuộn. Chưa thử cuộn trên Edge/Cốc Cốc/Firefox/Safari thực.

Ngày 08/10/2026. Trạng thái: hoàn thành phạm vi nền; chưa nghiệm thu phát hành
thương mại. Chuẩn tham chiếu WEB-STATIC-1 v1.2 và rules animation 05/10/2026.

## Bằng chứng đã kiểm tra

- Nguồn: MP4 Flow 1920×1080, 24fps, 10 giây. SHA-256 ở frames.json.
- Python/OpenCV xuất đúng 240 frame liên tiếp frame-0001.webp…frame-0240.webp;
  Pillow đọc và xác nhận toàn bộ kích thước 1920×1080. 11.292.618 byte ảnh
  (khoảng 10,77 MiB). WebP quality 85, không tăng kích thước thêm.
- `node --check source/assets/js/main.js`: PASS.
- Codex in-app browser qua HTTP 127.0.0.1:8766 trên Windows: nền tự chạy,
  pause giữ frame 136; replay quay về frame 2 khi quan sát; cuối chuỗi giữ
  frame 240 và báo Đã kết thúc, nút tiếp tục bị vô hiệu đúng trạng thái.
- Log warning/error của tab trong lần kiểm tra: rỗng.
- Viewport 1440×900, 820×1180, 375×812, 320×740: scrollWidth đúng lần lượt
  1440, 820, 375, 320. Hai nút đều cao 44px, rộng 83,25px và 79,38px.
  Ảnh bằng chứng: 1440.png, 820.png, 375.png, 320.png. Đã nhìn ảnh 1440/320:
  không cắt nút, nền giữ tỷ lệ và crop giữa trên màn hình dọc.

## Phạm vi nghiệm thu

| Mục | Trạng thái | Ghi chú |
|---|---|---|
| Q01 | PASS theo phạm vi nền | Mã thuần và 240 ảnh; ngoại lệ số file theo brief |
| Q02 | PASS | Bốn viewport, không tràn ngang |
| Q03 | PASS | Pause và replay, giữ ảnh cuối |
| Q04 | NOT TESTED | Chưa thử toàn bộ Tab/Shift+Tab; nút native có focus CSS |
| Q05 | PASS qua đọc mã | main, một h1 ẩn cho tên cảnh, các nút có nhãn |
| Q06 | NOT TESTED đầy đủ | Chữ trắng trên nền đặc #18201f; chưa kiểm toán focus mọi trạng thái |
| Q07 | NOT TESTED trực tiếp | Poster/no-JS có trong mã; chưa thử tắt JS/offline/zoom |
| Q08 | PASS giới hạn | Chỉ in-app browser; chưa xác định phiên bản engine; chưa thử Edge/Cốc Cốc/Firefox/Safari |
| Q09 | PASS giới hạn | JS syntax, log và thao tác thực tế; chưa benchmark mạng chậm |
| Q10 | N/A bản giao bán | Tài liệu cho nền đã có; hướng dẫn khách 12 prompt và quyền phân phối chờ bản đầy đủ |
| Q11 | N/A | Chưa đóng ZIP thương mại |
| Q12 | N/A | Không tích hợp cửa hàng/deploy |
| Q13 | N/A nội dung | User sẽ bổ sung các thành phần sau; chưa có landing page để đánh giá D01–D08 |

Ngoại lệ W01/W03/W05/W06 về số file, ảnh, JS và dung lượng có căn cứ từ
yêu cầu trực tiếp của chủ sản phẩm. Không áp nhãn WEB-STATIC-IMG-1 vốn chưa duyệt.
Không cấp hoặc đổi licence thương mại cho video. Không sao chép video nguồn vào
web; manifest ghi provenance. Chỉ thư mục sản phẩm apartment-flow được tạo.

## Giới hạn thực tế

24fps là tần suất lấy mẫu. Cuộn nhanh có thể bỏ qua frame trung gian; đây là
ánh xạ vị trí cuộn, không phải phát theo thời gian. Cache ảnh giới hạn quanh
13 frame; trình duyệt vẫn có cache tài nguyên riêng. Chưa kiểm tra chống giảm motion
trên hệ điều hành hoặc trạng thái motion off cũ bằng các trình duyệt thực.

## 2A integration verification — 8 October 2026
Scope: public preview-only release of t18, not a commercial ZIP release.
Demo and preview are synchronized from the existing source/rendered screenshot.
No licence terms are invented. No order, account or database mutation is needed.
The previous standalone deployment was the wrong publication destination;
canonical product/detail/demo URLs are on forgezone.store.
- Local production Next.js build and TypeScript: PASS (27 routes, including admin/auth/traffic).
- Catalog regression: PASS; t18 cannot checkout, every existing real product remains purchasable, slug and vi/en/zh metadata match.
- In-app browser local detail: PASS; Apartment Flow image/specs/demo button rendered, no purchase/cart controls for t18. Existing related products retain cart controls.
- Current mobile, Firefox and full commercial Q01–Q13 checks remain NOT TESTED; preview release only.
- Scoped ESLint: PASS. Cloud build/TypeScript: PASS.
- Production deployment dpl_EL9c9hnnC8Ap6FP91YT1h7uhistV is READY on forgezone.store.
- Online SHA-256 checks: PASS for all 243 demo files (240 frames + HTML/CSS/JS).
- Production browser: detail, scroll frame 81, contact chapter, dialog, Escape/focus return, return frame 1: PASS; demo warning/error logs empty.
- Store and existing Shirtline/NovaTrend/Crimson Folio demo HTTP smoke checks: PASS.
- Full commercial qualification remains pending; canonical release is preview-only.
