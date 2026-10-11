# ForgeFrame — hướng dẫn sử dụng

Quy trình của Forge Zone để làm web từ ảnh/video, kiểm giao diện trên 95% theo rubric có bằng chứng, animation và scroll, rồi đóng gói, push và deploy.

## Gọi trong Codex

Đính kèm ảnh hoặc video và gửi:

> $forgeframe làm sản phẩm web từ ảnh/video này; kiểm tiêu chí rồi đóng gói, push và deploy vào dự án đã cấu hình.

Skill đã được cài vào `C:/Users/Lenovo/.codex/skills/forgeframe`. Nếu phiên đang mở chưa nhận skill mới, mở phiên mới. Trên máy khác, giải nén gói và đặt thư mục `forgeframe` vào thư mục skills của Codex trên máy đó.

## Gọi bằng AI khác

Gửi file `FORGEFRAME.md` một lần và yêu cầu AI dùng nội dung làm quy trình ForgeFrame. Sau đó đính kèm ảnh/video và gửi:

> ForgeFrame, làm sản phẩm web từ ảnh/video này, kiểm tiêu chí rồi đóng gói, push và deploy.

Nếu ứng dụng hỗ trợ hướng dẫn dự án/preset, lưu file vào đó để dùng lại. Nếu không lưu được qua các cuộc trò chuyện, gửi lại file khi mở chat mới. Chỉ tên quy trình sẽ không truyền được nội dung tới AI chưa từng nhận file.

AI cần công cụ sửa file, chạy trình duyệt, Git và hosting cùng quyền truy cập dự án để thực hiện tới deploy. Thiếu công cụ/quyền/đích triển khai thì phải báo đúng phần chưa hoàn thành, không tự nhận đã xuất bản. Các script Python trong ZIP là công cụ hỗ trợ, AI có thể dùng công cụ tương đương trong môi trường khác.

## Cửa kiểm tra áp chót

Mỗi trạng thái tham chiếu quan trọng phải có điểm **>95.00**, animation/scroll chạy thật, video có timeline/frame/component coverage. Điểm là rubric thiết kế có bằng chứng; điểm pixel tự động không thay thế nghiệm thu. Chưa đạt thì quay lại sửa. Sau PASS mới đóng ZIP, push và deploy; sau deploy kiểm URL và tài nguyên online.

Có thể giới hạn lần chạy bằng “chỉ preview, chưa push/deploy”. Quy trình không tự triển khai sản phẩm nào trong lúc được tạo hoặc cài đặt.
