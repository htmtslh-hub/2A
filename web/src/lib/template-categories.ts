import type { LangCode } from '@/generated/data';

export const WEB_CATEGORY_KEYS = ['commerce', 'education', 'entertainment', 'portfolio', 'communication'] as const;
export type WebCategory = typeof WEB_CATEGORY_KEYS[number];

export const WEB_CATEGORY_LABELS: Record<LangCode, Record<WebCategory, string>> = {
  vi: { commerce: 'Thương mại điện tử', education: 'Giáo dục - đào tạo', entertainment: 'Giải trí', portfolio: 'Blog/portfolio', communication: 'Kết nối - giao tiếp' },
  en: { commerce: 'E-commerce', education: 'Education & training', entertainment: 'Entertainment', portfolio: 'Blog/portfolio', communication: 'Connection & communication' },
  zh: { commerce: '电子商务', education: '教育与培训', entertainment: '娱乐', portfolio: '博客/作品集', communication: '连接与交流' },
};

/** Classify by the website's purpose, including products awaiting store assets.
 * Commercial showcases and service enquiries belong to commerce; Tidal's
 * conservation programmes and public research belong to education.
 */
export const TEMPLATE_CATEGORIES = {
  'reelmark': 'commerce', 'melli': 'education', 'iris': 'commerce', 'wander-far': 'commerce', 'murmur': 'entertainment', 'eclipsio': 'portfolio', 'meadowbell': 'entertainment', 'oceanpulse': 'education', 'synapsex': 'commerce', 'cozypaws': 'commerce', 'securify': 'commerce', 'lumora': 'commerce', 'neuralkinetics': 'commerce', 'sellix': 'commerce', 'camper': 'commerce', 'viktor': 'portfolio', 'cinematic': 'entertainment', 'designpro': 'education', 'prmpt': 'commerce', 'halden': 'commerce', 'vectrus-energy': 'commerce', 'toonhub': 'commerce', 'nexlayer': 'commerce', 'aethera': 'commerce', 'vertex-shops': 'commerce', 'veyra': 'commerce', 'cyber-ronin': 'commerce',
  'leaflit': 'entertainment',
  'chronoform': 'commerce',
  'shopluxe': 'commerce',
  'orbit-academy': 'education',
  'verdant': 'commerce',
  'novatrend': 'commerce', 'diginest': 'commerce', 'soniq': 'commerce',
  'auralis': 'commerce', 'japan-trails': 'commerce', 'tidal': 'education',
  'keystead': 'commerce', 'solenne': 'commerce', 'aeris': 'commerce',
  'vybe': 'commerce', 'astra-interior': 'commerce', 'pinehaven': 'commerce',
  'kinetiq': 'commerce', 'watchroom': 'commerce', 'shirtline': 'commerce', 'yellow-beast': 'commerce', 'crimson-folio': 'portfolio',
  'free-sample': 'communication',
  'galaxy-edge': 'commerce', 'aerox-studio': 'commerce', 'dualplay': 'commerce',
  'backbest-800': 'commerce', 'firepower': 'commerce', 'sonicore': 'commerce', 'beetbuh': 'commerce', 'manganresto': 'commerce', 'vesper-ai': 'commerce', 'beyond-voyages': 'commerce', 'maldives-escape': 'commerce', 'atrium-mtl': 'portfolio', 'solaris-gate': 'education', 'monoframe': 'commerce',
} as const satisfies Record<string, WebCategory>;

export const EMPTY_CATEGORY_COPY: Record<LangCode, string> = {
  vi: 'Chưa có giao diện trong ngách này.',
  en: 'No templates in this niche yet.',
  zh: '此分类暂无模板。',
};
