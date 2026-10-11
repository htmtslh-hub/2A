type IconName = 'overview' | 'users' | 'orders' | 'traffic' | 'audit' | 'search' | 'arrow' | 'refresh' | 'pause' | 'play' | 'exit' | 'store' | 'monitor' | 'mobile' | 'tablet' | 'check';
const paths: Record<IconName, React.ReactNode> = {
  overview: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m3 10v-3a6 6 0 0 0-2-4" /></>,
  orders: <><rect x="4" y="7" width="16" height="14" rx="3" /><path d="M8 8V6a4 4 0 0 1 8 0v2M9 13h6M9 17h3" /></>,
  traffic: <><path d="M4 3v17h17M7 15l4-5 4 3 5-8" /><path d="M16 5h4v4" /></>,
  audit: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 2v4M15 2v4M9 11h6M9 15h6" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M6 6a8 8 0 0 1 14 6M18 18A8 8 0 0 1 4 12" /></>,
  pause: <><path d="M8 5v14M16 5v14" /></>,
  play: <path d="m8 4 12 8-12 8Z" />,
  exit: <><path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4M9 12h12m-4-4 4 4-4 4" /></>,
  store: <><path d="m4 3-2 6a3 3 0 0 0 5 2 3 3 0 0 0 5 0 3 3 0 0 0 5 0 3 3 0 0 0 5-2l-2-6ZM4 12v9h16v-9M9 21v-6h6v6" /></>,
  monitor: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M12 17v4M7 21h10" /></>,
  mobile: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 5h4M11 19h2" /></>,
  tablet: <><rect x="3" y="2" width="18" height="20" rx="3" /><path d="M11 19h2" /></>,
  check: <path d="m5 12 4 4L19 6" />,
};
export default function Icon({ name }: { name: IconName }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
