/* Mỗi ảnh và video có nhiều bản, sinh bởi tools/media.mjs. Chọn đúng bản cho
   từng chỗ hiển thị.

   LƯU Ý khi thêm bản mới: thẻ trong dải hero là khung DỌC (301x376 khi mở
   rộng). object-fit:cover lấy chiều nào thiếu làm chuẩn, nên với khung dọc
   thì chiều cao quyết định chứ không phải chiều rộng. Đưa một file ngang
   480x270 vào đó là bị phóng to 1,4 lần và mờ — đã mắc một lần rồi. */

/** Poster 960px WebP. Dùng cho cả video nền lẫn thẻ: cùng một file nên tải
 *  một lần, và 960px đủ nét cho thẻ 301x376 kể cả trên màn hình Retina. */
export const bgPoster = (src: string) => src.replace(/\.jpg$/, '-bg.webp');

/** Video nền đã cắt sẵn khung 9:16 cho điện thoại dọc. */
export const portraitVideo = (src: string) => src.replace(/\.mp4$/, '-mob.mp4');

/** Chọn video nền theo khung nhìn.
 *
 *  Màn hình dọc hẹp áp object-fit:cover lên video ngang thì chỉ thấy một dải
 *  hẹp ở giữa, lại còn bị phóng to — vừa nặng vừa mờ. Bản cắt sẵn 480x854
 *  đúng bằng thứ màn hình hiển thị nên nét hơn mà file nhỏ hơn 60%.
 *
 *  Chỉ đổi khi vừa hẹp vừa dọc: máy tính bảng nằm ngang hay cửa sổ trình
 *  duyệt hẹp vẫn phải dùng bản ngang, không thì khung hình bị cắt sai. */
export function heroVideo(src: string, w: number, h: number) {
  return w < 720 && h > w ? portraitVideo(src) : src;
}
