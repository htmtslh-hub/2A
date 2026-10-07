// Only public routes and known catalog keys are stored. Never passwords/tokens.
const publicPaths = new Set(['/', '/huong-dan', '/gioi-thieu', '/lien-he', '/dieu-khoan', '/bao-mat', '/giay-phep', '/hoan-tien']);
const tabs = new Set(['home', 'library', 'process', 'pricing', 'faq']);
export function trafficPath(value: string) {
  try {
    const url = new URL(value, 'https://traffic.invalid');
    if (url.origin !== 'https://traffic.invalid' || !publicPaths.has(url.pathname)) return null;
    if (url.pathname !== '/') return url.pathname;
    const template = url.searchParams.get('mau');
    if (template && /^t\d{1,3}$/.test(template)) return `/?mau=${template}`;
    const tab = url.searchParams.get('tab');
    return tab && tabs.has(tab) ? `/?tab=${tab}` : '/';
  } catch { return null; }
}

export function referrerHost(value: string) {
  if (!value) return 'direct';
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.hostname.slice(0, 200) : 'direct';
  } catch { return 'direct'; }
}
