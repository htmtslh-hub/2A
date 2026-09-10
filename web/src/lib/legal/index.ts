import type { LangCode } from '@/generated/data';
import type { LegalKey, LegalPack } from './types';
import { LEGAL_VI } from './vi';
import { LEGAL_EN } from './en';
import { LEGAL_ZH } from './zh';

export * from './types';

export const LEGAL: Record<LangCode, LegalPack> = {
  vi: LEGAL_VI,
  en: LEGAL_EN,
  zh: LEGAL_ZH,
};

/** Nhãn của từng văn bản, dùng cho link ở footer. */
export const LEGAL_LABELS: Record<LangCode, Record<LegalKey, string>> = {
  vi: {
    terms: 'Điều khoản',
    privacy: 'Bảo mật',
    refund: 'Hoàn tiền',
    license: 'Giấy phép',
  },
  en: {
    terms: 'Terms',
    privacy: 'Privacy',
    refund: 'Refunds',
    license: 'Licence',
  },
  zh: {
    terms: '服务条款',
    privacy: '隐私政策',
    refund: '退款政策',
    license: '许可条款',
  },
};

/** Nhãn cho hai trang nội dung, cũng nằm ở footer. */
export const PAGE_LABELS: Record<LangCode, { about: string; contact: string }> = {
  vi: { about: 'Về chúng tôi', contact: 'Liên hệ' },
  en: { about: 'About', contact: 'Contact' },
  zh: { about: '关于我们', contact: '联系我们' },
};

export const PAGE_PATHS = {
  about: '/gioi-thieu',
  contact: '/lien-he',
} as const;
