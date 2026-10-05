# Auralis 1.2.1 — browser visibility correction

04/10/2026, Asia/Bangkok. Ngoại lệ W01/W03/W05/W06 tiếp tục theo yêu cầu ảnh tự tạo/animation. LICENCE và bốn WebP không đổi. Không dùng video hoặc brand assets tham khảo trong ZIP.

## Kết luận có bằng chứng

Baseline `native-baseline.json`: URL 1.2.0 chạy được trên executable Edge 154.0.4258.53 và Cốc Cốc 152.0.7977.124 với profile tạm/headless, 1440×900, no-preference; CTA tới detail có opacity 1, không lỗi. Không tái hiện được lỗi trong profile hằng ngày của người dùng và không khẳng định nguyên nhân là engine.

Đã xác nhận trong code: demo chỉ hiện control khi giảm chuyển động và không nhớ opt-in; URL chưa có revision đồng bộ; trang chi tiết render preview lớn với controls=false, nên người reduced-motion chỉ thấy still và không thể play. Video synchronise cũng bỏ qua lựa chọn Play khi vào lại viewport.

Sửa các điểm này: visible motion control; thông báo lý do static; guarded localStorage; ?motion=on/off chủ động bật/tắt và nhớ lựa chọn; Pause xóa query cũ để reload không bật lại; CSS/JS/demo/preview version 1.2.1. Reduced motion mặc định được giữ đến khi người xem chọn. Preview detail có nút play/pause, opt-in video được giữ qua scroll. Card links vẫn không chứa nút play. Converter thêm prop detail-control để lần sinh markup sau không mất nó. Không tuyên bố force được JavaScript/animation bị extension chặn.

## Gói và kiểm tra

ZIP **346.094 byte**, SHA-256 `06130e51123559543ebc9bbe7f3def52bc8ffc813bc085eda0f5a6b0db209071`, mười file khớp source/ZIP giải nén. `final/checks.json` không failures; 10 bước, 12 prompt, edit counts đúng.

`native-motion.json` và `production-native.json`: PASS Edge/Cốc Cốc cài thực tế, headless với profile tạm. Mỗi engine: 1440×900, 375×812 normal motion; 414×582 reduced motion. Control luôn thấy; reduced default off; chọn bật/reload vẫn on; pause/reload vẫn off; explicit motion URL on; pause xóa query và vẫn off khi reload; storage bị chặn vẫn bật được trong trang. Scene detail, kit giữa/đủ và AirBuds giữa/đủ thay đổi liên tục, không overflow hoặc pageerror. Trên URL công khai đã kiểm tra cùng các hành vi.

`native-video.json`, `production-video.json`: PASS hai engine, media reduce. Preview ban đầu paused, không tải video; click Play phát được, currentTime tăng; ra viewport pause; quay lại tự tiếp tục theo opt-in; pause thủ công giữ paused sau scroll ra/vào. URL video và popup demo đúng v=1.2.1. Thử local và production. Video 15 giây/666.036 byte quay từ source cuối. Đã xem desktop/mobile preview từ source mới, cảnh AirBuds native và khung video cửa hàng.

IAB thực: URL public ?v=1.2.1&motion=on có media reduce nhưng motion-ready=true; CSS/JS đúng revision; click Discover chuyển sang detail. Không sửa setting Windows hay browser profile của người dùng.

## Q01–Q13

| Mã | Kết quả | Bằng chứng / phạm vi |
|---|---|---|
| Q01 | PASS theo ngoại lệ | HTML/CSS/JS thuần + bốn ảnh local, không framework/backend/CDN trong template. |
| Q02 | PASS | Checker Chromium/Firefox bốn khổ chuẩn; Edge/Cốc Cốc ba khổ bổ sung, không tràn. |
| Q03 | PASS | Menu/anchors/Escape; scene CTA và chuyển cảnh; preview play/pause. |
| Q04 | PASS | Skip/Tab/focus/menu qua checker; inert panel/controls; motion button dùng bàn phím được. |
| Q05 | PASS nội bộ | Axe/landmark/headings không failures. |
| Q06 | PASS nội bộ | Contrast/focus/hover checker; xem chữ trên wash và banner mới. |
| Q07 | PASS trong phạm vi | Reduced default/opt-in/persist; blocked storage; no-JS/file/offline/reflow qua checker. |
| Q08 | PASS trong phạm vi | Chromium 153, Firefox 155, Edge 154 và Cốc Cốc 152 engine headless; IAB. Profile thường của người dùng/Safari/thiết bị vật lý NOT TESTED. |
| Q09 | PASS | Không pageerror; một animation frame mỗi batch scroll; không autoplay loop template. |
| Q10 | PASS | 10 bước/12 prompt/counts đúng; docs mô tả storage, URL opt-in và version assets. |
| Q11 | PASS | Đóng gói/đọc lại/so ZIP source; byte/hash ở trên. |
| Q12 | PASS hiển thị; giao dịch chưa thử | Production Auralis/t9 đúng; 11 assets HTTP 200; unauthenticated download 401; trace có ZIP. Không mua thật/tải có quyền. |
| Q13 | PASS | Source preview và video mới, native scene screenshots, store preview và IAB. |

D01–D08 PASS trong phạm vi đã nêu: giữ hero earbuds rõ, hệ thống màu/type nhất quán, scene choreography/section mục đích rõ, copy/spec concept trung thực, responsive và model-detail đồng bộ. Bản này thay đổi motion preference/preview controls, không tạo hướng thiết kế khác.

## Phát hành

`npm run typecheck`, `npm run build`, `node --check web/tools/convert.mjs`: PASS. Source/public demo/ZIP/catalog/guides/preview đồng bộ. Production **READY** `dpl_KQPEswMBR27FktcKVP1oJT866fCK`, alias https://forgezone.store. `production-checks.json` không errors. Link chủ động bật hiệu ứng: `https://forgezone.store/demos/auralis/index.html?v=1.2.1&motion=on`; trang sản phẩm `https://forgezone.store/?mau=t9`.

Giới hạn: chưa xác định cấu hình/profile gây phản hồi của người dùng; các kiểm tra engine dùng profile tạm, không truy cập history/cookies/settings cá nhân. Safari/thiết bị vật lý và giao dịch thực chưa thử. Không thêm checkout tai nghe; email .example phải thay trước khi dùng kinh doanh.
