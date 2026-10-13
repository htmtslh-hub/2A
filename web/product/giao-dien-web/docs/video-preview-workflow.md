# Quy trình preview hoạt động — yêu cầu chủ sản phẩm 13/10/2026

Áp dụng cho mọi sản phẩm đang có trong `REAL_TEMPLATES`, gồm giao diện web và demo agent. Đây là tài nguyên trưng bày của cửa hàng; không đưa MP4 vào ZIP khách mua, không sửa source hoặc tăng version ZIP chỉ để thêm clip.

## Quy trình bắt buộc

1. Hoàn thành và kiểm tra sản phẩm; đồng bộ bản demo đúng bản nguồn đã nghiệm thu. Kiểm tra tên, ảnh bìa và demo cùng sản phẩm.
2. Quay **trang thật đang chạy trong trình duyệt**. Không tạo video bằng zoom/pan ảnh tĩnh, mockup AI hoặc clip không phản ánh bản giao. Không giả lập thành công thanh toán, gửi form hoặc chức năng chưa có.
3. Chọn cảnh cho từng sản phẩm: giữ hero khoảng 2 giây, thao tác chuyển sản phẩm/màu/tab nếu có, hover, cuộn thấy nội dung và reveal, trở lại hero. Trang không có carousel phải quay cuộn/thao tác có thật, không thêm tính năng chỉ để quay.
4. Chạy từ gốc repo: `node web/product/giao-dien-web/tools/quay-preview.mjs <slug>`. Bỏ slug để quay toàn catalog. Công cụ dùng Playwright và FFmpeg, ghi H.264 MP4, 960×600, 30 fps, 15 giây, không âm thanh, faststart. Máy cần `_design/.tooling` (playwright/esbuild/sharp), Chromium trong `_design/.browsers`, ffmpeg/ffprobe trên PATH. Chỉ là công cụ phát triển, không thêm phụ thuộc cho template.
5. Xem clip và bốn frame hero/interaction/scroll/return tại `reviews/video-previews/screenshots/`. Kiểm tra không trắng, không loading kéo dài, không cắt phần chính, không lỗi demo/asset. Đối chiếu click/scroll trong JSON từng slug. Nếu clip chưa thể hiện đúng sản phẩm, sửa kịch bản quay trong công cụ và quay lại.
6. MP4 công khai ở `web/public/previews/<slug>.mp4`; ảnh WebP hiện tại là poster/dự phòng. Manifest `web/src/lib/preview-recordings.json` lưu version sản phẩm, revision theo SHA-256 video, hash HTML demo, byte, kích thước và thời lượng. Không sửa hash bằng tay để bỏ qua việc quay.
7. Chạy `npm --prefix web run previews:check` (hoặc `node web/product/giao-dien-web/tools/quay-preview.mjs --check`). Mọi sản phẩm catalog phải có recording khớp version/hash/toàn bộ demo, gồm CSS/JS/ảnh. `npm run build` tự chạy kiểm tra này trước build và từ chối thiếu/stale clip. Thêm hoặc đổi sản phẩm phải quay lại clip sau đồng bộ demo; không dùng video cũ khác giao diện chỉ vì tên file trùng. `--resume` chỉ giữ clip đã hoàn thành và còn khớp hash/version.
8. Kiểm tra cửa hàng: tự phát không tiếng khi khung xuất hiện, không cần hover; điện thoại và bàn phím có nút phát/dừng ngoài liên kết thẻ; trang chi tiết có phát/dừng/toàn màn hình. Bấm thẻ vẫn mở chi tiết, Ctrl/click vẫn giữ link; nút phát không thêm giỏ/lưu hoặc điều hướng. Các preview đang nhìn thấy cùng phát; rời viewport/ẩn tab phải dừng. Chỉ tải MP4 cho khung vào viewport, không tải toàn thư viện ngay khi mở. Lỗi video vẫn còn poster và link demo.
9. Kiểm tra desktop/tablet/phone và Chromium/Firefox/Edge/Cốc Cốc thực, kể cả OS reduced motion. Preview mặc định tự phát khi nhìn thấy theo quy tắc motion của chủ sản phẩm; không lưu trạng thái tắt sang phiên khác. Clip lặp bằng video native khi nhìn thấy, dừng khi offscreen/ẩn tab, không thêm vòng lặp JS/RAF. Nút pause giữ lựa chọn trong trang hiện tại; hover không bật lại; mở mới mặc định phát.
10. Typecheck/build và kiểm diff phạm vi. Chỉ push/deploy khi đã được ủy quyền; sau deploy kiểm URL, video hash/revision, phát thực, poster và điều hướng. Ghi browser/phiên bản/kết quả thực tế, không tuyên bố Safari hoặc thiết bị thật nếu chưa thử.

## Checklist phát hành preview

- [ ] Toàn catalog có clip từ demo đúng version, không bỏ qua nhóm agent.
- [ ] Clip có hoạt động thật; cảnh chuyển/click/scroll đúng chức năng thực tế.
- [ ] Xem clip/contact sheet từng sản phẩm, không blank hoặc missing asset.
- [ ] MP4 H.264, yuv420p, faststart, không audio, khoảng 12–18 giây; kiểm byte và thời lượng bằng ffprobe. Mục tiêu ≤3 MiB/clip; nếu vượt cần tối ưu hoặc ghi lý do.
- [ ] Poster giữ nguyên bố cục khung nổi; không thêm button bên trong link thẻ.
- [ ] Lazy autoplay theo viewport, pause/cleanup/offscreen/error fallback hoạt động.
- [ ] Nút/nhãn vi/en/zh và focus 44×44; điều hướng, lưu và giỏ vẫn hoạt động.
- [ ] Manifest check/typecheck/build và kiểm bản online nếu deploy.

Các file raw WebM/screenshot là bằng chứng nội bộ, không đưa vào hosting. Video mới không thay thế nghiệm thu source, license hay luồng download của sản phẩm.

Kiểm chính sách autoplay bằng `node web/product/giao-dien-web/reviews/video-previews/check-autoplay.mjs` từ gốc repo sau khi mở production server local. Đặt `PREVIEW_QA_URL` theo URL cần thử (mặc định localhost:4354), `PREVIEW_QA_OUTPUT` theo tên báo cáo nếu kiểm online. Công cụ đo tự phát nhiều thẻ, lazy load, pause, offscreen, loop và bốn viewport trên Chromium/Firefox/Edge/Cốc Cốc thật. `check-store.mjs` là bằng chứng của bản hover cũ.

Chính sách phát cập nhật theo yêu cầu chủ sản phẩm 13/10/2026: tự chạy, không cần hover. Quy định hover/single-active trong hồ sơ kiểm cũ chỉ mô tả bản cũ.
