# Aeris 1.0.0 — QA và bàn giao

Ngày: 04/10/2026, Asia/Bangkok. Chuẩn WEB-STATIC-1 v1.2 với ngoại lệ theo yêu cầu trực tiếp của chủ sản phẩm (ảnh tự tạo, chuyển cảnh, slideshow tự chuyển). Trạng thái: **Đạt theo ngoại lệ**. Không gắn nhãn sáu file dưới 20 KiB.

## Gói và ngoại lệ

- ZIP `aeris.zip`: **169.849 byte**, SHA-256 `ace56f1a499446f7838865cf095484ab3776ef3df191a35065a5811594d78b23` (cập nhật 05/10/2026 11:00 hoàn thiện chuyển động sản phẩm 3D carousel theo `skill-morge`).
- Mười file: index.html, assets/css/style.css, assets/js/main.js, bốn ảnh trong assets/images/, README.md, CUSTOMISE.md, LICENCE.txt. `dong-goi.mjs --ngoai-le` đọc lại từng file khớp byte với source; checker chạy trên bản giải nén.
- **W01/W03:** bốn WebP cục bộ — aeris-pearl.webp 26.852 byte, aeris-midnight.webp 36.406 byte, aeris-blush.webp 29.282 byte, aeris-detail.webp 45.228 byte (tổng 137.768 byte). Không hotlink, không base64.
- **W05:** JS ngoài menu + reveal: slider ba màu, slideshow tự chuyển, story ghim theo cuộn, parallax chuột. **W06:** ZIP > 20.480 byte.
- **Chuyển động tự chạy > 5 giây (mục 101 product-standards):** slideshow đổi màu mỗi 6 s và thanh tiến trình chạy liên tục khi hero trên màn hình, theo yêu cầu người dùng lúc 10:46. Giảm thiểu: nút Pause/Play luôn hiện cạnh thanh tiến trình (WCAG 2.2.2), tự giữ khi rê chuột lên cụm điều khiển, khi focus bàn phím trong hero, khi hero khuất màn hình hoặc tab ẩn; reduced motion mặc định tắt. Checker ghi `motionAfter5s: []` vì lúc đo trang đã cuộn khỏi hero (slideshow đang giữ) — **không** coi đó là bằng chứng trang đứng yên ở đầu trang.
- Ảnh tạo bằng công cụ tạo ảnh AI (generate_image) trên nền trắng tinh, xem lại rồi chuyển WebP q90 bằng sharp (`_design/aeris-reference/prepare-images.mjs`). Tai nghe giả định, không logo thương hiệu thật. JPG gốc ở `_design/aeris-reference/`.
- LICENCE.txt theo điều khoản thương mại của các mẫu trước; agent không đổi điều khoản. Font League Spartan qua Google Fonts (OFL 1.1).

## Q01–Q13

| Mã | Kết quả | Bằng chứng / giới hạn |
|---|---|---|
| Q01 | PASS theo ngoại lệ | Mười file, không framework/library/CDN script/backend/secret. |
| Q02 | PASS | Chromium 153.0.8010.12 và Firefox 155.0: 1440×900, 820×1180, 375×812, 320×740; scrollWidth = clientWidth; không vùng chạm nhỏ theo checker. Nút Pause 44×44. |
| Q03 | PASS | Fragment đúng đích; menu mở/đóng, Escape, chọn link, resize; CTA email minh bạch. |
| Q04 | PASS | Skip link, Tab/Shift+Tab, menu ẩn không nhận Tab, Escape trả focus. Phím ←/→ khi focus ở nút slider. |
| Q05 | PASS nội bộ | Một h1, đủ landmark, không trùng ID, heading không nhảy; axe 0 violations ở hai browser. Không tuyên bố chứng nhận trợ năng. |
| Q06 | PASS nội bộ | 17 cặp màu checker đo, không lỗi ở trạng thái thường/hover. |
| Q07 | PASS theo ngoại lệ | Reduced motion: 0 animation chạy, nội dung hiện đủ, slideshow tắt. No-JS + mất font 320px: nội dung và nav hiện. file://, offline, reflow 720×450 density 2 không tràn. Slideshow > 5 s là ngoại lệ ở trên. |
| Q08 | PASS trong phạm vi | Chromium, Firefox, Microsoft Edge và Cốc Cốc trên Windows; HTTP và file://. Safari và điện thoại vật lý **NOT TESTED**. |
| Q09 | PASS | Console/network sạch; ảnh cục bộ. Motion dùng transform/opacity, rAF theo cuộn với bộ làm mượt blend exp, một setTimeout cho slideshow (dừng khi giữ/tạm dừng). |
| Q10 | PASS | CUSTOMISE: edit map đếm literal (có AUTO_MS), 10 bước, 12 prompt, mục Slideshow nói cách đổi thời gian hoặc bỏ hẳn. README nêu dữ liệu giả và giới hạn. |
| Q11 | PASS | ZIP giải nén khớp byte source; file:// và offline đã chạy. |
| Q12 | PASS hiển thị; NOT TESTED mua thực | Production: t5 hiện Aeris ở vi/en/zh, demo + preview 200, tải ẩn danh 401. Chưa thanh toán thật hay tải bằng tài khoản đã mua. |
| Q13 | PASS | Đã xem hero 1440 (khớp bố cục tham chiếu), chuyển cảnh, ba chặng story, 820/375/320, cụm điều khiển 320/375, ảnh preview và khung hình video. |

## Kiểm tra slideshow (`_design/aeris-reference/test-autoplay.mjs`, Chromium)

16/16 OK: tự sang màu 2 sau ~6 s và màu 3 sau ~12 s; rê chuột lên nút điều khiển thì giữ; Pause dừng hẳn, nhãn đổi "Play slideshow", không còn animation chạy; Play chạy lại; bấm Next đếm lại từ đầu; hero khuất màn hình thì giữ; reduced motion mặc định không tự chuyển; 375/320 không tràn; không lỗi console. Firefox chỉ qua checker chung, chưa chạy script này. Chạy lại 05/10 sau khi thêm hiệu ứng: vẫn 16/16.

## Hiệu ứng chuyển cảnh & Choreography theo `skill-morge` (05/10/2026, `test-skill-morge.mjs`)

Đã áp dụng các kỹ thuật cốt lõi từ `skill-morge`:
1. **Chuyển sản phẩm & Direct looping:** Next (03 → 01) và Prev (01 → 03) đi thẳng theo hướng, sản phẩm trung gian không bao giờ trượt ngang qua tâm hay nháy sáng.
2. **Bấm nhanh liên tục (rapid clicking):** Next/Next/Prev/Next dồn dập được gom rest/staged ngay lập tức mà không giật ngược vị trí, không kẹt phần tử `.is-leaving`, kết thúc đúng chỉ số đích và 0 animation chạy ngầm.
3. **Làm mượt cuộn cảnh (exponential smoothing):** Render progress của sound story và hero exit áp dụng công thức `blend = 1 - Math.exp(-dt / 70)` từ `skill-morge`. Dừng rAF tự động khi sai số `< 0.0002`.
4. **Phân biệt thao tác vuốt:** Vuốt dọc/chéo (`|dy| > |dx|`) nhường hoàn toàn cho cuộn trang; chỉ vuốt ngang rõ rệt mới đổi màu.
5. **Cơ chế ghi đè Motion:** Hỗ trợ tham số `?motion=off` (chế độ tĩnh/calm) và `?motion=on` (bật hiệu ứng kể cả khi OS bật reduced-motion), đồng bộ qua `localStorage`.
6. **Kiểm tra trên 3 trình duyệt thực tế:**
   - **Chromium:** 10/10 OK
   - **Microsoft Edge:** 10/10 OK
   - **Cốc Cốc:** 10/10 OK
   - 0 lỗi console trên tất cả trình duyệt. Safari và thiết bị di động vật lý **NOT TESTED**.

## D01–D08

- D01 PASS: hero nêu tai nghe over-ear, tên Aeris One và màu.
- D02 PASS: tai nghe nổi trên wash pastel đổi theo màu; số 01/02/03 viền mảnh; ô thương hiệu navy + ô mũi tên periwinkle như tham chiếu.
- D03 PASS: hero → âm thanh (story ghim) → thiết kế → bộ sưu tập (giá demo + CTA) → thông số → liên hệ.
- D04 PASS: token thống nhất, League Spartan, hệ nút vuông bo 4px, navy/periwinkle xuyên trang.
- D05 PASS trong khổ đã thử; tablet giữ ba thẻ bộ sưu tập trên một hàng.
- D06 PASS: nội dung tiếng Anh cho thương hiệu giả định, không lorem ipsum.
- D07 PASS: bỏ icon mạng xã hội và "Sound Magazine" của ảnh tham chiếu (không link/đánh giá giả); thông số ghi rõ minh họa.
- D08 PASS: tên, $179, 40 mm, pin 40/30 giờ, 238 g đồng nhất; email .example có hướng dẫn thay.

## Tương tác

| Control | Hành vi |
|---|---|
| Logo / Back to top | #top |
| Headphones / ô mũi tên hero | #collection |
| Sound / Scroll | #sound |
| Design, Specs, Enquire | #design, #specs, #enquire |
| Nút ‹ › , số 01–03, ←/→, vuốt ngang | Đổi màu, chuyển cảnh theo hướng |
| Pause/Play | Dừng/chạy slideshow 6 s |
| Enquire about … / Email the Aeris team | Mở ứng dụng email với subject; .example phải thay |
| Menu (≤950px) | Mở/đóng, Escape, chọn link, resize |
| Story | Cuộn đổi chương/ảnh; reduced motion, no-JS, màn thấp hơn 560px dùng danh sách |

## Tích hợp cửa hàng (chưa phát hành)

- Ô **t5** (thay Forma), nhóm **shop**, mô tả vi/en/zh, hướng dẫn riêng trong template-guides.ts và customer-guide.json.
- Preview từ chính source (chụp lại 05/10 09:07 với hiệu ứng mới): `aeris.webp` 1396×1047 (51.022 byte), `aeris-tablet.webp` 820×1180 (33.588 byte), `aeris-mobile.webp` 375×812 (25.822 byte), `aeris.mp4` 1396×1048, 24 fps, 18,9 s, 1.395.232 byte (slideshow tự chuyển, bấm Next, cuộn story và bộ sưu tập). Tạo bằng `_design/aeris-reference/capture.mjs`.
- Demo `web/public/demos/aeris/` (index.html + assets, thêm `<base href="/demos/aeris/">`).
- Forma đã xoá: thư mục sản phẩm, demo, bốn preview, hai thư mục `_design/.qa-extracted/forma*`. Bằng chứng lịch sử `reviews/RELEASE-THREE.md`, `reviews/store-three/*.json` giữ nguyên (còn nhắc Forma).
- `npm run typecheck`: PASS. `npm run build`: PASS (04/10 11:00; chạy lại 05/10 09:09 sau khi cập nhật mô tả, CUSTOMISE trong customer-guide.json).

## Phát hành lại (05/10/2026 11:00 — hoàn thiện chuyển động sản phẩm 3D carousel theo `skill-morge`)

- `vercel deploy --prod --yes` từ `web/` (cây làm việc hiện tại). Deployment **READY** `dpl_2z1KXQYoRUzr4yupNnhcHePmF2kR`, alias `https://forgezone.store`.
- Triển khai đầy đủ choreography 3D carousel cho tai nghe theo chuẩn `skill-morge`:
  - Trạng thái nghỉ: sản phẩm đang chọn ở vị trí trung tâm (`scale(1)`, `rotate(0deg)`, `opacity(1)`, `z-index: 3`); sản phẩm tiếp theo chờ ở vị trí preview bên phải (`translate3d(60%, 0, 0)`, `scale(0.46)`, `rotate(12deg)`, `opacity(0.42)`, `z-index: 2`); sản phẩm thứ 3 ở xa (`101.4%`, `scale(0.32)`, `opacity(0.2)`).
  - Khi bấm Next/Prev: sản phẩm cũ trượt dứt khoát sang phía đối diện (`-sign * 60%`, `scale(0.46)`, `rotate(-sign * 12deg)`, mờ dần về 0); sản phẩm mới từ vị trí preview lướt mượt mà vào trung tâm phóng to lên `scale(1)`; sản phẩm thứ ba trượt vào vị trí preview.
  - Bấm nhanh liên tục: đóng băng vị trí hiện tại bằng computed style, không giật về đầu; direct looping (03 → 01 và 01 → 03) đi thẳng theo hướng; 0 animation kẹt khi dừng.
- Kiểm tra production trực tiếp qua Playwright: `https://forgezone.store/demos/aeris/index.html` và `https://forgezone.store/?mau=t5` trả về 200; `main.js` chứa `placeProduct` và `settleCarousel`; `style.css` chứa styling carousel mới; hoạt ảnh lướt tai nghe chạy mượt mà, 0 pageerror.
- Trước đó: bản 10:17 (`dpl_5xYUnQgmgABCkECDz1czZTqnh8ka`) và bản 09:23 (`dpl_6r5zJgpwEhhCNRhNJEkxkFx9TcT4`).



## Phát hành (04/10/2026 14:38 — bản trước khi thêm hiệu ứng)

- `vercel deploy --prod` từ `web/` (cây làm việc hiện tại, như các lần deploy trước). Deployment **READY** `dpl_2YDwgqBzTKNoWVTmCAFThF4tfPqK`, alias `https://forgezone.store`. Chi tiết: `https://forgezone.store/?mau=t5`; demo: `https://forgezone.store/demos/aeris/index.html`.
- `_design/aeris-reference/check-production.mjs` → `production-checks.json`, `production-detail-vi.png`, `production-demo.png`: demo + 7 asset + 4 preview trả 200; `/demos/forma/`, `forma.webp`, `forma.mp4` trả 404; `/api/download?id=t5` chưa đăng nhập trả 401; trang chi tiết t5 và thư viện ở vi/en/zh hiện Aeris, không còn chữ Forma; demo production tự chuyển sang màu 2 sau ~6 s; 0 pageerror.
- 3 mục script báo FAIL "ảnh tablet/mobile": trang chi tiết hiện tại của cửa hàng không render ảnh tablet/mobile cho **mọi** mẫu (đã đối chiếu t6 Meridian, t9 Auralis) — kỳ vọng của script đã cũ, không phải lỗi Aeris. Ảnh `aeris-tablet.webp`/`aeris-mobile.webp` vẫn có trên production (200).
- Q12: hiển thị và chặn tải ẩn danh PASS; **NOT TESTED** mua thật và tải bằng tài khoản đã mua.
