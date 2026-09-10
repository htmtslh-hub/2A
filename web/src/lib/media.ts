/* Mỗi ảnh và video có nhiều bản kích thước khác nhau, sinh bởi tools/media.mjs.
   Chọn đúng bản cho từng chỗ hiển thị là khoản tiết kiệm lớn nhất của trang
   chủ: thẻ trong dải hero chỉ rộng 240px (75px trên điện thoại) nên không có
   lý do gì tải bản 1280px vào đó. */

/** Video 480px cho thẻ nhỏ trong dải hero. */
export const cardVideo = (src: string) => src.replace(/\.mp4$/, '-sm.mp4');

/** Poster 480px WebP cho thẻ nhỏ. */
export const cardPoster = (src: string) => src.replace(/\.jpg$/, '-sm.webp');

/** Poster 960px WebP cho video nền toàn màn hình. */
export const bgPoster = (src: string) => src.replace(/\.jpg$/, '-bg.webp');

/** Video nền đã cắt sẵn khung 9:16 cho điện thoại dọc. */
export const portraitVideo = (src: string) => src.replace(/\.mp4$/, '-mob.mp4');

/** Chọn video nền theo khung nhìn hiện tại.
 *
 *  Màn hình dọc hẹp áp object-fit:cover lên video ngang thì chỉ thấy một dải
 *  hẹp ở giữa, lại còn bị phóng to — vừa nặng vừa mờ. Bản cắt sẵn 480x854
 *  đúng bằng thứ màn hình hiển thị nên nét hơn mà file nhỏ hơn 40%.
 *
 *  Chỉ đổi khi vừa hẹp vừa dọc: máy tính bảng nằm ngang hay cửa sổ trình
 *  duyệt hẹp vẫn phải dùng bản ngang, không thì khung hình bị cắt sai. */
export function heroVideo(src: string, w: number, h: number) {
  return w < 720 && h > w ? portraitVideo(src) : src;
}

/** Ảnh chờ của video nền, chọn theo khung nhìn.
 *  Nó chỉ hiện trong khoảnh khắc trước khi video giải mã xong, nên trên
 *  điện thoại không đáng tải bản 960px. */
export function heroPoster(src: string, w: number, h: number) {
  return w < 720 && h > w ? cardPoster(src) : bgPoster(src);
}
