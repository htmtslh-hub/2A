export type ShortcutCategory = 'playback' | 'learning' | 'audio' | 'system';

export interface ShortcutItem {
  id: string;
  name: string;
  description: string;
  category: ShortcutCategory;
  defaultKeys: string[]; // can support 1 or multiple default keys e.g. ['Space'] or ['j', 'ArrowLeft']
  currentKeys: string[]; // user configured keys
}

export const CATEGORY_LABELS: Record<ShortcutCategory, string> = {
  playback: 'Phát & Điều Hướng',
  learning: 'Học Ngoại Ngữ & Phụ Đề',
  audio: 'Âm Thanh & Tốc Độ',
  system: 'Hệ Thống & Bảng Điều Khiển'
};

export const DEFAULT_SHORTCUTS: ShortcutItem[] = [
  // Playback
  {
    id: 'playPause',
    name: 'Phát / Tạm dừng',
    description: 'Chuyển đổi trạng thái phát hoặc dừng video/audio',
    category: 'playback',
    defaultKeys: ['Space'],
    currentKeys: ['Space']
  },
  {
    id: 'jumpBackward',
    name: 'Tua lùi 5 giây',
    description: 'Lùi lại 5 giây trong video',
    category: 'playback',
    defaultKeys: ['ArrowLeft', 'j'],
    currentKeys: ['ArrowLeft', 'j']
  },
  {
    id: 'jumpForward',
    name: 'Tua tiến 5 giây',
    description: 'Tiến về phía trước 5 giây',
    category: 'playback',
    defaultKeys: ['ArrowRight', 'l'],
    currentKeys: ['ArrowRight', 'l']
  },
  {
    id: 'jumpBackward10s',
    name: 'Tua lùi 10 giây',
    description: 'Lùi lại 10 giây để nghe lại câu trước đó',
    category: 'playback',
    defaultKeys: ['Shift+ArrowLeft', 'Shift+j'],
    currentKeys: ['Shift+ArrowLeft', 'Shift+j']
  },
  {
    id: 'jumpForward10s',
    name: 'Tua tiến 10 giây',
    description: 'Tua nhanh về trước 10 giây',
    category: 'playback',
    defaultKeys: ['Shift+ArrowRight', 'Shift+l'],
    currentKeys: ['Shift+ArrowRight', 'Shift+l']
  },

  // Learning & Subtitles
  {
    id: 'prevCue',
    name: 'Nhảy về câu trước',
    description: 'Nhảy trực tiếp đến mốc thời gian câu thoại trước',
    category: 'learning',
    defaultKeys: ['ArrowUp'],
    currentKeys: ['ArrowUp']
  },
  {
    id: 'nextCue',
    name: 'Nhảy sang câu sau',
    description: 'Nhảy trực tiếp đến mốc thời gian câu thoại kế tiếp',
    category: 'learning',
    defaultKeys: ['ArrowDown'],
    currentKeys: ['ArrowDown']
  },
  {
    id: 'repeatCue',
    name: 'Lặp lại câu hiện tại (Snap A-B)',
    description: 'Ngay lập tức lặp lại câu phụ đề đang phát',
    category: 'learning',
    defaultKeys: ['r'],
    currentKeys: ['r']
  },
  {
    id: 'setPointA',
    name: 'Đặt mốc bắt đầu lặp A',
    description: 'Ghi nhận thời điểm A để bắt đầu đoạn lặp',
    category: 'learning',
    defaultKeys: ['a'],
    currentKeys: ['a']
  },
  {
    id: 'setPointB',
    name: 'Đặt mốc kết thúc B & Kích hoạt',
    description: 'Ghi nhận thời điểm B và kích hoạt vòng lặp A-B',
    category: 'learning',
    defaultKeys: ['b'],
    currentKeys: ['b']
  },
  {
    id: 'clearAB',
    name: 'Hủy bỏ đoạn lặp A-B',
    description: 'Thoát khỏi chế độ lặp A-B',
    category: 'learning',
    defaultKeys: ['Escape'],
    currentKeys: ['Escape']
  },
  {
    id: 'toggleShadowing',
    name: 'Bật / Tắt Shadowing',
    description: 'Kích hoạt chế độ luyện nói nhại và đếm ngược ghi âm',
    category: 'learning',
    defaultKeys: ['s'],
    currentKeys: ['s']
  },
  {
    id: 'subEarlier',
    name: 'Khớp phụ đề sớm (-0.1s)',
    description: 'Dịch chuyển mốc phụ đề sớm hơn 100ms',
    category: 'learning',
    defaultKeys: ['['],
    currentKeys: ['[']
  },
  {
    id: 'subLater',
    name: 'Khớp phụ đề trễ (+0.1s)',
    description: 'Dịch chuyển mốc phụ đề trễ hơn 100ms',
    category: 'learning',
    defaultKeys: [']'],
    currentKeys: [']']
  },
  {
    id: 'autoTranslate',
    name: 'Tự động dịch kịch bản (AI)',
    description: 'Kích hoạt chức năng AI dịch phụ đề toàn bài',
    category: 'learning',
    defaultKeys: ['t'],
    currentKeys: ['t']
  },
  {
    id: 'toggleSubtitles',
    name: 'Bật / Tắt phụ đề',
    description: 'Ẩn hoặc hiển thị phụ đề trên màn hình',
    category: 'learning',
    defaultKeys: ['c'],
    currentKeys: ['c']
  },
  {
    id: 'toggleDualSub',
    name: 'Bật / Tắt phụ đề song ngữ',
    description: 'Chuyển đổi hiển thị dòng dịch tiếng Việt',
    category: 'learning',
    defaultKeys: ['d'],
    currentKeys: ['d']
  },

  // Audio & Speed
  {
    id: 'speedDown',
    name: 'Giảm tốc độ phát (-0.1x)',
    description: 'Giảm tốc độ để nghe rõ phát âm',
    category: 'audio',
    defaultKeys: ['-'],
    currentKeys: ['-']
  },
  {
    id: 'speedUp',
    name: 'Tăng tốc độ phát (+0.1x)',
    description: 'Tăng tốc độ phát để luyện phản xạ nhanh',
    category: 'audio',
    defaultKeys: ['+', '='],
    currentKeys: ['+', '=']
  },
  {
    id: 'toggleMute',
    name: 'Bật / Tắt âm thanh (Mute)',
    description: 'Tắt tiếng hoặc bật lại âm lượng',
    category: 'audio',
    defaultKeys: ['m'],
    currentKeys: ['m']
  },

  // System
  {
    id: 'toggleShortcuts',
    name: 'Bật / Tắt bảng phím tắt',
    description: 'Mở cửa sổ danh sách phím tắt và cài đặt',
    category: 'system',
    defaultKeys: ['F1', '?'],
    currentKeys: ['F1', '?']
  }
];
