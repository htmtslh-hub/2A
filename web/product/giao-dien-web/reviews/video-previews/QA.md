# Preview video toàn catalog — 13/10/2026

Yêu cầu: “ok em thực hiện đi, cho toàn bộ sản phẩm và thêm vào quy trình”. Phạm vi: 27 sản phẩm đang niêm yết, preview công khai, trình phát cửa hàng và quy trình phát hành. Không thay source template, demo, ZIP thương mại, giá, payment, tài khoản hoặc dữ liệu quyền mua. Các hồ sơ Dualplay chưa tracked từ trước được giữ nguyên.

## Kết quả

- 27/27 MP4 quay từ bản demo đang giao, 960×600, H.264 yuv420p, 30 fps, không audio, faststart, khoảng 15 giây. Tổng 12.740.059 byte (12,15 MiB); clip lớn nhất 753.324 byte. Không có clip từ ảnh tĩnh.
- Kịch bản: hero, hover, hai lần next ở mẫu có nút thật, cuộn/reveal, trở về hero. LingoGlass quay nút kịch bản mẫu và cài đặt; không dựng dữ liệu/media hoặc giả gửi form/thanh toán. Trang không carousel quay hover/cuộn thật.
- Xem frame **trích từ MP4 cuối** ở 0,5 / 4 / 9 / 14 giây cho toàn bộ 27 sản phẩm (`screenshots/actual-board-0/6/12/18/24.jpg`). Không trắng, không missing asset, nhận diện đúng sản phẩm; clip LingoGlass được quay lại để có thao tác thay cho màn hình chờ. Mẫu không có carousel giữ chức năng thực tế.
- JSON mỗi slug có actions, browser, duration, byte/hash và console/missing asset (đều rỗng). Manifest lưu hash toàn bộ cây demo; checker phát hiện CSS/JS/ảnh đổi dù HTML không đổi. Revision MP4 độc lập với version ZIP.
- Source/demos/ZIP không thay đổi qua `git diff --name-only` theo phạm vi tương ứng. Poster WebP giữ nguyên; Solenne/LingoGlass giữ contain và nền hiện có.

## Kiểm tra cửa hàng

`store-checks.json`: bản build production local tại localhost:4352; Windows, OS reduced-motion. Chromium 153.0.8010.12 kiểm 26 thẻ web; Firefox 155.0, Edge thật 155.0.4283.45, Cốc Cốc thật 152.0.7977.124 mỗi trình duyệt kiểm một thẻ và Dualplay ở 1440×900, 820×1180, 375×812, 320×740. Không tràn ngang, không lỗi pageerror. Đo currentTime tiến thật, hover, nút pause/play, offscreen, không tự điều hướng hoặc tải MP4 preview khi thư viện chưa tương tác. Video ambient có sẵn của homepage không nằm trong phép đo preload preview.

`supplemental.json` và `final-behaviour.json`: bản cuối localhost:4353 sau giữ poster contain; fullscreen thật VIDEO, play/pause cảm ứng Chromium mô phỏng 375px, vi/en/zh, lỗi MP4 vẫn có poster, no-JS poster, keyboard focus, single active, rapid hover, LingoGlass phát video thật. Nút playback qua portal ở ngoài link thẻ; các liên kết/giỏ/lưu không đổi. Clip hữu hạn, không loop; rời hover về poster, offscreen/hidden tab pause và cleanup khi unmount.

Typecheck, build và hai lệnh kiểm manifest PASS. Build tự chạy `prebuild` gate, từ chối catalog thiếu/stale/failed clip. `--resume` chỉ giữ clip còn khớp hash/version. Không cần browser hoặc FFmpeg trên hosting để chạy gate.

## Quy trình

`docs/video-preview-workflow.md`, standards 1.2.1, instruction-product và hai AGENTS.md cập nhật yêu cầu clip cho mọi sản phẩm; npm `previews:record`, `previews:check`, `prebuild` đã thêm. Video chỉ thuộc cửa hàng, không làm tăng dung lượng ZIP hoặc thay chính sách licence. Hướng dẫn khách hàng không đổi.

## Giới hạn

Không thử Safari, thiết bị cảm ứng vật lý hoặc giao dịch/thanh toán/download tài khoản đã mua; các luồng này không sửa trong yêu cầu. Chỉ kiểm playback/tương tác preview, không nghiệm thu lại toàn bộ 27 sản phẩm hoặc tự gắn chứng nhận thị giác >95%. Screenshot/raw recording là bằng chứng phát triển cục bộ, không đưa lên hosting.

Trạng thái: kiểm local PASS; cập nhật kết quả online sau deploy.
