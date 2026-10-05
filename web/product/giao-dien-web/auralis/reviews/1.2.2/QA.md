# Auralis 1.2.2 — real input and intermediate frames

04/10/2026, Asia/Bangkok. WEB-STATIC-1 v1.2, ngoại lệ W01/W03/W05/W06 từ yêu cầu ảnh tự tạo/animation được giữ. Bốn WebP, LICENCE, concept specs/price và checkout scope không đổi.

## Lỗi tái hiện và phạm vi truy cập

Windows Computer Use tìm thấy cửa sổ Auralis — Cốc Cốc, nhưng helper dừng vì URL policy chưa hỗ trợ browser đó. Không đọc hoặc điều khiển cửa sổ/profile này bằng phương tiện thay thế. Người dùng không tiện cung cấp video; tiếp tục tự kiểm tra mã thuộc workspace trong phiên headless riêng của executable Cốc Cốc đã cài sẵn.

`before-scroll.json`: với media reduce + motion=on, bấm Discover đạt cảnh detail nhưng có **0 frame opacity trung gian**. Native smooth off cũng 0 frame. Test 1.2.1 chỉ kiểm tra endpoint nên không phát hiện. Với font24, resize gate có thể tắt motion và base href khiến fallback anchor chuyển document sang short URL, mất sampler. Đây là lỗi được tái hiện trong cấu hình thử, không khẳng định đã đọc cấu hình profile của người dùng.

## Sửa

- Ba scene links chạy scroll tween hữu hạn bằng requestAnimationFrame/instant scroll. Không phụ thuộc browser native smooth scroll sau explicit opt-in.
- paint interpolate wheel/key/scrollbar input. Cap delta 32ms để wheel đầu tiên sau idle không snap ngay. Dừng frame khi chênh progress <.0002; không perpetual loop.
- Wheel/touch/navigation keys hủy tween của scene link. Không preventDefault wheel/touch, không scroll lock.
- Explicit motion choice vượt gate default font lớn; automatic enlarged/reduced vẫn static. Viewport dưới420px cao giữ fallback.
- Public Auralis dùng asset URLs tuyệt đối thay base href: bare demo URL vẫn tải đúng CSS/JS/images, fragment link không đổi document hoặc bỏ query. ZIP giữ relative paths/file://. Sync tool giữ thay đổi khi sinh demo lại.
- CSS/JS/demo/preview revision 1.2.2; docs và ZIP cập nhật. Không thêm dependency/backend vào template.

## Gói cuối

ZIP **347.016 byte**, SHA-256 `0a5dd8a83edbfa1a8e14d7fec23685f27f2f300206927874aebff80844cc0099`. Mười file, đọc lại khớp source. **release/checks.json** là checker trên ZIP cuối; final/checks.json là bằng chứng trước idle fix, không phải hash bàn giao.

## Bằng chứng kiểm tra

- `release/checks.json`: PASS Chromium153/Firefox155, bốn khổ chuẩn, keyboard/menu/contrast/axe/no-JS/file/offline/reduced/reflow/docs/source-vs-ZIP.
- `scroll-validation.json`: PASS Cốc Cốc152, Cốc Cốc152 font24, Edge154, 1366×768, reduced motion + explicit opt-in + native smooth disabled. Click detail có9 frame opacity trung gian; kit12–15; AirBuds16–17; coarse wheel sau idle11 frame. Stage pinned top0, đúng scene cuối, không pageerror. Pause/fallback giữ cùng document + #sound.
- `native-motion.json`: PASS Edge/Cốc Cốc với 1440×900 và375×812 normal motion,414×582 reduced/opt-in. Reload bật/tắt, URL override, storage bị chặn, mid-scene và overflow đều qua.
- `input-validation.json`: PASS. Wheel trong tween hủy chuyển cảnh: scrollY32 giữ32; sau settle requestAnimationFrame counter48 giữ48 trong500ms; PageDown cuộn đến1393px/cảnh kit.
- Video `coccoc-actual-scroll.webm` và MP4 proof quay từ rendering của Cốc Cốc trong phiên thử; bao gồm click ba scene và wheel. Preview public từ bản quay này, dài11,8 giây; không phải ghép ảnh để giả animation. Đã xem frame đầu và screenshot cảnh cuối. Thử source case dùng profile tạm, không mở history/cookies/settings.
- `npm run typecheck` và `npm run build`: PASS. Vercel production build: PASS, deployment READY.

## Q01–Q13

| Mã | Trạng thái | Bằng chứng / giới hạn |
|---|---|---|
| Q01 | PASS theo ngoại lệ | Thuần HTML/CSS/JS + bốn ảnh local; không runtime dependency/backend. |
| Q02 | PASS | Bốn khổ chuẩn, native mobile/reduced, default font24 opt-in; không tràn. |
| Q03 | PASS | Menu/anchors/carousel; CTA + wheel + keyboard; same-document fallback. |
| Q04 | PASS | Checker skip/Tab/focus/menu; panel inert; scroll keys hủy tween, không lock scroll. |
| Q05 | PASS nội bộ | Axe/heading/landmark/ID checker không failures. |
| Q06 | PASS nội bộ | Contrast/hover/focus checker; xem scene chữ trên wash. |
| Q07 | PASS trong phạm vi | Reduced mặc định; explicit opt-in; idle frames stop; no-JS/file/offline/zoom reflow. |
| Q08 | PASS trong phạm vi | Chromium153/Firefox155; Edge154/Cốc Cốc152 native executables, headless profiles riêng. Cửa sổ/profile người dùng bị policy chặn; Safari/thiết bị vật lý NOT TESTED. |
| Q09 | PASS | Không pageerror; finite RAF qua counter; script không autoplay. |
| Q10 | PASS | 10 bước/12 prompt/counts đúng; docs mô tả scene tween/input interruption/default font gate. |
| Q11 | PASS | ZIP cuối đọc lại/sourceMatchesExtracted true, hash/byte ở trên. |
| Q12 | PASS trong phạm vi | production-checks.json: t9 visible, 11 assets HTTP200, ZIP trong download trace, unauthenticated401; không mua thật/tải có quyền. |
| Q13 | PASS local/online | production-scroll.json và production-video.json PASS trên Edge/Cốc Cốc; intermediate frames, preview play/pause/return và URL1.2.2 đúng. |

D01–D08 PASS trong phạm vi trước: giữ cấu trúc/typography/palette/purpose/content/model sync; cải thiện motion hành vi, không đổi visual concept hoặc bịa hardware claims.

## Production

Deployment `dpl_EgieKfb7y9DxBM5Hhx8FX5RZWpcP` READY; alias https://forgezone.store. Demo cuối https://forgezone.store/demos/auralis/index.html?v=1.2.2&motion=on.

- production-scroll.json PASS: Cốc Cốc152, Cốc Cốc font24, Edge154; detail9 frame, kit15/15/17, AirBuds17, wheel11. Không errors/failures.
- production-video.json PASS: reduced default paused; user Play tăng currentTime, offscreen paused, return resumes opted-in, manual Pause giữ paused, popup version1.2.2; video11,8s. Hai engine đều qua.
- production-checks.json: t9 visible, 11 public assets HTTP200, unauthorized download401, final ZIP included in trace, không browser errors.
- Bare /demos/auralis?v=1.2.2&motion=on HTTP200, absolute asset references đúng và không base href.

Giới hạn truy cập cửa sổ Cốc Cốc thật của người dùng vẫn giữ; không tuyên bố đã kiểm tra profile đó. Không yêu cầu người dùng quay màn hình trong lần này.


## Follow-up: old open document / cache delivery

Người dùng báo vẫn không được. Tab IAB hiện tại thực sự đang giữ HTML1.2.1, stylesheet/script query1.2.1, base href cũ; trạng thái motion-ready nhưng chưa nhận mã tween1.2.2. Sau navigation1.2.2 trên cùng tab, CTA chuyển detail, scrollY705.5, stage top0, opacity1 tại viewport414×582. Đây là quan sát trên tab IAB, chưa chứng minh cấu hình Cốc Cốc của người dùng.

Chỉ sửa hosting trong web/next.config.ts: Auralis HTML/CSS/JS/assets no-store và X-Auralis-Version1.2.2; bookmarks thiếu/sai version chuyển307 sang1.2.2, giữ motion=on/off và các query khác. Không thay source/ZIP; SHA256 giữ nguyên. Không thể cập nhật mã của một document đã mở mà không tải lại.

Local build PASS, local-cache.json PASS. Production deployment dpl_5MZpikjaKUJGTJcrW1reXb3UTHUm READY, forgezone.store. production-cache.json PASS: old index1.2.1→1.2.2 giữ on; old bare1.2.0 giữ off; versionless redirects; latestHTML/old asset URLs trả200/no-store/version1.2.2. Cốc Cốc152 isolated headless reduced motion/native smooth disabled: old bookmark loads latestCSS/JS, motion-ready, CTA detail, reload giữ on, off được tôn trọng. production-cache.png là screenshot detail từ phiên thử. IAB mở lại chính URL1.2.1 được chuyển sang1.2.2 online. Giới hạn profile người dùng vẫn giữ.
