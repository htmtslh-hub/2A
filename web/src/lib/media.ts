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
