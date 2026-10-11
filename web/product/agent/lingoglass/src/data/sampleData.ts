import { SubtitleCue } from '../types/subtitle';

export const SAMPLE_SUBTITLES: SubtitleCue[] = [
  {
    id: 1,
    startTime: 1.0,
    endTime: 4.8,
    tracks: [
      { language: 'en', text: "Welcome to LingoGlass, your modern video player for mastering English!", isSource: true },
      { language: 'vi', text: "Chào mừng bạn đến với LingoGlass, trình phát video hiện đại giúp chinh phục tiếng Anh!", isSource: false }
    ],
    textEn: "Welcome to LingoGlass, your modern video player for mastering English!",
    textVn: "Chào mừng bạn đến với LingoGlass, trình phát video hiện đại giúp chinh phục tiếng Anh!"
  },
  {
    id: 2,
    startTime: 5.2,
    endTime: 9.6,
    tracks: [
      { language: 'en', text: "You can click on any word in the subtitle to check its meaning and pronunciation.", isSource: true },
      { language: 'vi', text: "Bạn có thể bấm vào bất kỳ từ nào trên phụ đề để tra nghĩa và cách phát âm.", isSource: false }
    ],
    textEn: "You can click on any word in the subtitle to check its meaning and pronunciation.",
    textVn: "Bạn có thể bấm vào bất kỳ từ nào trên phụ đề để tra nghĩa và cách phát âm."
  },
  {
    id: 3,
    startTime: 10.2,
    endTime: 14.5,
    tracks: [
      { language: 'en', text: "Press the 'R' key to instantly repeat the current sentence over and over.", isSource: true },
      { language: 'vi', text: "Nhấn phím 'R' để lặp lại câu thoại hiện tại một cách tức thì.", isSource: false }
    ],
    textEn: "Press the 'R' key to instantly repeat the current sentence over and over.",
    textVn: "Nhấn phím 'R' để lặp lại câu thoại hiện tại một cách tức thì."
  },
  {
    id: 4,
    startTime: 15.0,
    endTime: 19.8,
    tracks: [
      { language: 'en', text: "Shadowing mode helps you practice speaking by auto-pausing after each phrase.", isSource: true },
      { language: 'vi', text: "Chế độ Shadowing giúp bạn luyện nói bằng cách tự động dừng lại sau mỗi câu.", isSource: false }
    ],
    textEn: "Shadowing mode helps you practice speaking by auto-pausing after each phrase.",
    textVn: "Chế độ Shadowing giúp bạn luyện nói bằng cách tự động dừng lại sau mỗi câu."
  },
  {
    id: 5,
    startTime: 20.4,
    endTime: 25.0,
    tracks: [
      { language: 'en', text: "Use J and L to jump backward and forward 5 seconds, or Shift for 10 seconds.", isSource: true },
      { language: 'vi', text: "Sử dụng J và L để tua lùi và tiến 5 giây, hoặc giữ Shift để tua 10 giây.", isSource: false }
    ],
    textEn: "Use J and L to jump backward and forward 5 seconds, or Shift for 10 seconds.",
    textVn: "Sử dụng J và L để tua lùi và tiến 5 giây, hoặc giữ Shift để tua 10 giây."
  },
  {
    id: 6,
    startTime: 25.5,
    endTime: 30.0,
    tracks: [
      { language: 'en', text: "Consistent practice every day is the true secret to becoming fluent!", isSource: true },
      { language: 'vi', text: "Luyện tập đều đặn mỗi ngày chính là bí quyết thực sự để nói trôi chảy!", isSource: false }
    ],
    textEn: "Consistent practice every day is the true secret to becoming fluent!",
    textVn: "Luyện tập đều đặn mỗi ngày chính là bí quyết thực sự để nói trôi chảy!"
  }
];

// Open source demo video (MP4 format)
export const DEFAULT_DEMO_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
