'use client';
import { useEffect, useRef, useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { templateName } from '@/lib/catalog';
import styles from './admin.module.css';
import Icon from './icons';
import { createAdminMotion, type AdminMotion } from './motion';

type Section = 'overview' | 'users' | 'orders' | 'traffic' | 'audit';
type UserRow = { id: string; name: string | null; email: string; createdAt: string; suspendedAt: string | null; admin: boolean; _count: { orders: number; purchases: number; savedTemplates: number } };
type OrderRow = { id: string; buyerEmail: string; buyerName: string | null; amount: number; currency: string; status: string; provider: string; kind: string; templateId: string | null; description: string; adminNote: string; createdAt: string; paidAt: string | null; payosOrderCode: string | null; paddleTxnId: string | null; items: { templateId: string; amount: number }[]; _count: { purchases: number } };
type AuditRow = { id: string; actorId: string; action: string; targetId: string; detail: string; createdAt: string };
type Summary = { days: number; accounts: number; newAccounts: number; orders: number; pending: number; views: number; sessions: number; tracking: boolean; revenue: { currency: string; _sum: { amount: number | null }; _count: number }[]; chart: { day: string; views: number; sessions: number }[]; paths: { path: string; _count: number }[]; sources: { referrer: string; _count: number }[]; devices: { device: string; _count: number }[] };
type List<T> = { total: number; page: number; rows: T[] };
type Payload = Summary | List<UserRow | OrderRow | AuditRow>;
const sections: { id: Section; name: string; icon: string }[] = [
  { id: 'overview', name: 'Tổng quan', icon: '01' }, { id: 'users', name: 'Tài khoản', icon: '02' },
  { id: 'orders', name: 'Đơn hàng', icon: '03' }, { id: 'traffic', name: 'Truy cập', icon: '04' }, { id: 'audit', name: 'Nhật ký', icon: '05' },
];
const statuses: Record<string, string> = { PENDING: 'Chờ thanh toán', PAID: 'Đã thanh toán', CANCELLED: 'Đã hủy', FAILED: 'Thất bại', REFUNDED: 'Đã hoàn tiền' };
const integer = (n: number) => new Intl.NumberFormat('vi-VN').format(n);
const date = (s: string | null) => s ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date(s)) : '—';
const money = (amount: number, currency: string) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(currency === 'USD' ? amount / 100 : amount);
const vnd = (value: number) => money(value, 'VND');
const usd = (value: number) => money(value, 'USD');
const product = (o: OrderRow) => o.kind === 'CART' ? o.items.map(i => templateName(i.templateId)).join(', ') : o.kind === 'BUNDLE' ? 'Trọn bộ thư viện' : o.templateId ? templateName(o.templateId) : o.description;

export default function Dashboard({ name }: { name: string }) {
  const [section, setSection] = useState<Section>('overview');
  const [days, setDays] = useState(30);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [provider, setProvider] = useState('');
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [payload, setPayload] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [updated, setUpdated] = useState('');
  const [sync, setSync] = useState('Đang kết nối');
  const dataSignature = useRef('');
  const [selected, setSelected] = useState<{ type: 'user'; row: UserRow } | { type: 'order'; row: OrderRow } | null>(null);
  const [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const writeAbort = useRef<AbortController | null>(null);
  const content = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLElement>(null);
  const activePill = useRef<HTMLSpanElement>(null);
  const quickSearch = useRef<HTMLInputElement>(null);
  const [motion] = useState(createAdminMotion);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const closing = useRef(false);
  const navPosition = useRef({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => { motion.setEnabled(motionEnabled); }, [motion, motionEnabled]);
  useEffect(() => {
    const nodes = loading ? [] : [...(content.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? [])];
    nodes.forEach((node, i) => motion.run(node, 480, p => {
      node.style.opacity = String(p);
      node.style.transform = `translateY(${(1 - p) * 18}px)`;
    }, () => { node.style.opacity = ''; node.style.transform = ''; }, Math.min(i, 6) * 55));
    return () => nodes.forEach(node => { motion.cancel(node); node.style.opacity = ''; node.style.transform = ''; });
  }, [section, loading, motion]);

  useEffect(() => {
    const pill = activePill.current;
    const position = () => {
      const button = nav.current?.querySelector<HTMLButtonElement>('[aria-current="page"]');
      if (!button || !pill) return;
      const target = { x: button.offsetLeft, y: button.offsetTop, width: button.offsetWidth, height: button.offsetHeight };
      const previous = navPosition.current.width ? { ...navPosition.current } : target;
      motion.run(pill, 360, p => {
        const next = { x: previous.x + (target.x - previous.x) * p, y: previous.y + (target.y - previous.y) * p,
          width: previous.width + (target.width - previous.width) * p, height: previous.height + (target.height - previous.height) * p };
        navPosition.current = next;
        pill.style.width = `${next.width}px`; pill.style.height = `${next.height}px`;
        pill.style.transform = `translate(${next.x}px,${next.y}px)`;
      });
    };
    position();
    const observer = new ResizeObserver(position);
    if (nav.current) observer.observe(nav.current);
    return () => { observer.disconnect(); if (pill) motion.cancel(pill); };
  }, [section, motion]);
  useEffect(() => {
    const shortcut = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); quickSearch.current?.focus(); } };
    const stop = () => motion.destroy();
    window.addEventListener('keydown', shortcut); window.addEventListener('pagehide', stop);
    return () => { window.removeEventListener('keydown', shortcut); window.removeEventListener('pagehide', stop); motion.destroy(); };
  }, [motion]);

  useEffect(() => {
    let stopped = false;
    let controller: AbortController | null = null;
    let timer: ReturnType<typeof setTimeout>;
    let failures = 0;
    const schedule = () => { clearTimeout(timer); if (!stopped) timer = setTimeout(() => void read(false), Math.min(30000, 5000 * 2 ** failures)); };
    const read = async (initial: boolean) => {
      if (stopped || controller) return;
      if (!initial && (document.hidden || !navigator.onLine || dialog.current?.open || writeAbort.current)) { schedule(); return; }
      controller = new AbortController();
      const request = controller;
      const deadline = setTimeout(() => request.abort(), 15000);
      if (initial) { setLoading(true); setError(''); }
      setSync('Đang đồng bộ');
      const params = new URLSearchParams({ section, days: String(days), q: search, status, provider, page: String(page) });
      try {
        const response = await fetch(`/api/admin?${params}`, { cache: 'no-store', signal: request.signal });
        const body = await response.json();
        if (stopped) return;
        if (response.status === 403 || response.status === 401) {
          stopped = true; dataSignature.current = ''; setPayload(null); setError('Phiên đăng nhập hoặc quyền quản trị đã hết hiệu lực. Vui lòng đăng nhập lại.'); setSync('Đã ngắt kết nối'); return;
        }
        if (!response.ok) throw new Error(body.error || 'Không thể đọc dữ liệu.');
        const signature = JSON.stringify(body);
        if (initial || signature !== dataSignature.current) { dataSignature.current = signature; setPayload(body); }
        failures = 0; setError(''); setUpdated(date(new Date().toISOString())); setSync('Tự đồng bộ mỗi 5 giây');
      } catch (err) {
        if (stopped) return;
        failures = Math.min(3, failures + 1);
        setSync(navigator.onLine ? 'Kết nối gián đoạn · đang thử lại' : 'Mất mạng · chờ kết nối');
        if (initial) { setPayload(null); setError(err instanceof Error && err.name !== 'AbortError' ? err.message : 'Kết nối quá thời gian. Vui lòng thử lại.'); }
      } finally {
        clearTimeout(deadline); controller = null;
        if (!stopped) { setLoading(false); schedule(); }
      }
    };
    const resume = () => {
      if (!navigator.onLine) { setSync('Mất mạng · chờ kết nối'); controller?.abort(); clearTimeout(timer); return; }
      if (document.hidden) { setSync('Tạm dừng khi ở tab khác'); clearTimeout(timer); return; }
      clearTimeout(timer); void read(false);
    };
    timer = setTimeout(() => void read(true), 0);
    window.addEventListener('online', resume); window.addEventListener('offline', resume); document.addEventListener('visibilitychange', resume);
    return () => { stopped = true; clearTimeout(timer); controller?.abort(); window.removeEventListener('online', resume); window.removeEventListener('offline', resume); document.removeEventListener('visibilitychange', resume); };
  }, [section, days, search, status, provider, page, reload]);

  useEffect(() => {
    const element = dialog.current;
    if (selected && element) {
      closing.current = false;
      if (!element.open) element.showModal();
      motion.run(element, 340, p => { element.style.opacity = String(p); element.style.transform = `translateY(${(1 - p) * 24}px) scale(${.97 + .03 * p})`; element.style.setProperty('--backdrop', String(.72 * p)); }, () => { element.style.opacity = ''; element.style.transform = ''; });
    }
    return () => { if (element) motion.cancel(element); };
  }, [selected, motion]);
  useEffect(() => () => writeAbort.current?.abort(), []);

  function navigate(id: Section) { setSection(id); setPayload(null); setLoading(true); setPage(1); setQuery(''); setSearch(''); setStatus(''); setProvider(''); setMessage(''); }
  function close() {
    const element = dialog.current;
    if (busy || !element || closing.current) return;
    closing.current = true;
    const startOpacity = Number(element.style.opacity || 1);
    motion.run(element, 220, p => { element.style.opacity = String(startOpacity * (1 - p)); element.style.transform = `translateY(${18 * p}px) scale(${1 - .025 * p})`; element.style.setProperty('--backdrop', String(.72 * (1 - p))); }, () => {
      element.close(); element.style.opacity = ''; element.style.transform = ''; setSelected(null); closing.current = false; opener.current?.focus();
    });
  }
  function inspect(value: NonNullable<typeof selected>, target: HTMLElement) { opener.current = target; setSelected(value); setMessage(''); }
  async function mutate(body: object) {
    setBusy(true); setMessage('');
    const controller = new AbortController(); writeAbort.current = controller;
    try {
      const response = await fetch('/api/admin', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: controller.signal });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Không thể lưu.');
      setMessage('Đã lưu thay đổi và ghi vào nhật ký.'); setReload(n => n + 1);
      dialog.current?.close(); setSelected(null); opener.current?.focus();
    } catch (err) { if (!controller.signal.aborted) setMessage(err instanceof Error ? err.message : 'Không thể lưu.'); }
    finally { writeAbort.current = null; if (!controller.signal.aborted) setBusy(false); }
  }

  const summary = payload && 'chart' in payload ? payload : null;
  const list = payload && 'rows' in payload ? payload : null;
  const totalPages = Math.max(1, Math.ceil((list?.total ?? 0) / 20));
  const firstName = name.includes('@') ? name.split('@')[0] : name;
  const initials = name.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase();
  return <div className={styles.shell} lang="vi">
    <a href="#admin-content" className={styles.skip}>Đến nội dung quản trị</a>
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.brand}><span className={styles.brandMark}>F</span><span>Forge Zone<small>Administration</small></span></Link>
      <p className={styles.navLabel}>KHÔNG GIAN LÀM VIỆC</p>
      <nav ref={nav} aria-label="Quản trị"><span ref={activePill} className={styles.activePill} aria-hidden="true" />{sections.map(item => <button key={item.id} aria-label={item.name} onClick={() => navigate(item.id)} aria-current={section === item.id ? 'page' : undefined} className={section === item.id ? styles.active : ''}><Icon name={item.id} />{item.name}</button>)}</nav>
      <div className={styles.sidebarBottom}><a href="/" target="_blank" rel="noopener"><Icon name="store" />Mở cửa hàng<Icon name="arrow" /></a><Link href="/tai-khoan"><Icon name="users" />Tài khoản của tôi</Link><div className={styles.secure}><span className={styles.dot} /><span>Chỉ dành cho quản trị viên</span></div></div>
    </aside>
    <div className={styles.workspace}>
      <header className={styles.topbar}><div className={styles.welcome}><p>Xin chào, <span>{firstName}</span></p><small>Không gian điều hành cửa hàng của anh.</small></div><div className={styles.headerActions}>
        <button className={styles.iconButton} aria-label={motionEnabled ? 'Tạm dừng animation' : 'Bật animation'} aria-pressed={!motionEnabled} onClick={() => setMotionEnabled(value => !value)}><Icon name={motionEnabled ? 'pause' : 'play'} /></button>
        <button className={styles.iconButton} aria-label="Đăng xuất" onClick={() => void signOut({ redirectTo: '/admin' })}><Icon name="exit" /></button>
        <Link href="/tai-khoan" className={styles.profile}><span className={styles.avatar} aria-hidden="true">{initials}</span><span className={styles.identity}><strong>{name}</strong><small>Quản trị viên</small></span></Link>
      </div></header>
      <main id="admin-content" className={styles.main}>
        <noscript><p className={styles.notice}>Bật JavaScript để xem và quản lý dữ liệu quản trị.</p></noscript>
        <div className={styles.heading}><div><p className={styles.eyebrow}>CỬA HÀNG / {sections.find(s => s.id === section)?.icon}</p><h1>{sections.find(s => s.id === section)?.name}</h1><p>{section === 'overview' ? 'Tài khoản, giao dịch và truy cập — cùng một góc nhìn.' : section === 'users' ? 'Quản lý hồ sơ và quyền truy cập của khách hàng.' : section === 'orders' ? 'Theo dõi giao dịch và quyền tải được cấp cho khách.' : section === 'traffic' ? 'Hiểu khách đang xem gì và đến từ đâu.' : 'Lịch sử các thao tác quản trị đã được ghi nhận.'}</p></div><div className={styles.actions}>
          {section !== 'users' && section !== 'audit' && <label className={styles.range}>Khoảng thời gian<select aria-label="Khoảng thời gian" value={days} onChange={e => { setDays(Number(e.target.value)); setPage(1); }}>{[7, 30, 90].map(d => <option value={d} key={d}>{d} ngày gần đây</option>)}</select></label>}
          <button aria-label="↻ Làm mới" className={styles.refresh} onClick={() => setReload(n => n + 1)} disabled={loading}><Icon name="refresh" />Làm mới</button>
        </div></div>
        <div className={styles.commandBar}><div className={styles.shortcuts}><button aria-label="Mở quản lý tài khoản" onClick={() => navigate('users')}>Tài khoản</button><button aria-label="Mở quản lý đơn hàng" onClick={() => navigate('orders')}>Đơn hàng</button><button aria-label="Mở thống kê truy cập" onClick={() => navigate('traffic')}>Truy cập</button></div><form className={styles.quickSearch} onSubmit={e => { e.preventDefault(); const value = query.trim(); navigate('users'); setQuery(value); setSearch(value); }}><Icon name="search" /><input ref={quickSearch} aria-label="Tìm tài khoản nhanh" value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm tên hoặc email tài khoản…" maxLength={120} /><button aria-label="Tìm kiếm tài khoản nhanh" type="submit"><Icon name="arrow" /></button></form></div>
        <div className={styles.meta}><span className={styles.dot} />{updated ? `Cập nhật ${updated} · Giờ Việt Nam` : 'Đang kết nối dữ liệu…'}<span aria-label="Trạng thái đồng bộ">{sync} · Biểu đồ theo ngày UTC</span></div>
        {message && !selected && <div role="status" className={styles.notice}>{message}</div>}
        {(section === 'users' || section === 'orders') && <form className={styles.filters} onSubmit={e => { e.preventDefault(); setSearch(query); setPage(1); }}>
          <label className={styles.search}>{section === 'users' ? 'Tìm tài khoản' : 'Tìm đơn hàng'}<input value={query} onChange={e => setQuery(e.target.value)} placeholder={section === 'users' ? 'Tên hoặc email…' : 'Mã đơn, tên hoặc email…'} maxLength={120} /></label>
          <label>Trạng thái<select aria-label="Trạng thái" value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}><option value="">Tất cả</option>{section === 'users' ? <><option value="active">Đang hoạt động</option><option value="locked">Đã khóa</option></> : Object.entries(statuses).map(([key, label]) => <option value={key} key={key}>{label}</option>)}</select></label>
          {section === 'orders' && <label>Cổng thanh toán<select aria-label="Cổng thanh toán" value={provider} onChange={e => { setProvider(e.target.value); setPage(1); }}><option value="">Tất cả</option><option>PAYOS</option><option>PADDLE</option></select></label>}
          <button className={styles.primary} type="submit">Tìm kiếm</button>
        </form>}
        <div ref={content} className={styles.content}>
        {error ? <section className={styles.empty} role="alert"><h2>Không thể tải dữ liệu</h2><p>{error}</p><button onClick={() => setReload(n => n + 1)}>Thử lại</button></section> : loading ? <section className={styles.loading} role="status" aria-live="polite"><p>Đang tải dữ liệu {sections.find(s => s.id === section)?.name.toLowerCase()}…</p><div className={styles.skeletons} aria-hidden="true"><span /><span /><span /></div></section> : summary ? <>
          {section === 'overview' ? <div className={styles.overviewGrid}>
            <div className={styles.leftStack}><section data-reveal className={styles.holding}><div><h2>Tổng tài khoản</h2><Icon name="users" /></div><AnimatedValue value={summary.accounts} format={integer} motion={motion} /><p>{integer(summary.newAccounts)} đăng ký trong {days} ngày</p><button aria-label="Xem danh sách tài khoản" onClick={() => navigate('users')}>Xem danh sách<Icon name="arrow" /></button></section>
              <section data-reveal className={styles.insight}><span className={styles.insightLabel}><Icon name="check" />Tình hình giao dịch</span><h2>{integer(summary.pending)} đơn đang chờ</h2><p>Kiểm tra trạng thái và hỗ trợ khách hoàn tất thanh toán.</p><button onClick={() => { navigate('orders'); setStatus('PENDING'); }} aria-label="Xem đơn chờ thanh toán">Kiểm tra đơn hàng<Icon name="arrow" /></button><div className={styles.orbit} aria-hidden="true" /></section></div>
            <Ranking title="Trang nổi bật" rows={summary.paths.slice(0, 4).map(p => [p.path, p._count])} compact navigate={value => { if (value.startsWith('/')) window.open(value, '_blank', 'noopener'); }} />
            <section data-reveal className={`${styles.panel} ${styles.businessPanel}`}><div className={styles.panelHeading}><h2>Hoạt động cửa hàng</h2><Icon name="store" /></div><div className={styles.businessMetrics}>
              <Metric label="Doanh thu VND" value={summary.revenue.find(r => r.currency === 'VND')?._sum.amount ?? 0} format={vnd} sub="Đơn PAID · Theo ngày thanh toán" motion={motion} icon="orders" />
              <Metric label="Doanh thu USD" value={summary.revenue.find(r => r.currency === 'USD')?._sum.amount ?? 0} format={usd} sub="Tách riêng tiền tệ · Chưa trừ phí" motion={motion} icon="store" />
              <Metric label="Đơn được tạo" value={summary.orders} sub={`${days} ngày gần đây`} motion={motion} icon="orders" />
              <Metric label="Lượt xem trang" value={summary.views} sub={`${integer(summary.sessions)} phiên ẩn danh`} motion={motion} icon="traffic" />
            </div></section>
          </div> : <div className={styles.metrics} data-reveal>
            <Metric label="Lượt xem trang" value={summary.views} sub={`${days} ngày gần đây`} motion={motion} icon="traffic" />
            <Metric label="Phiên truy cập" value={summary.sessions} sub="Mỗi tab là một phiên ẩn danh" motion={motion} icon="users" />
            <Metric label="Doanh thu VND" value={summary.revenue.find(r => r.currency === 'VND')?._sum.amount ?? 0} format={vnd} sub="Đơn PAID · Theo ngày thanh toán" motion={motion} icon="orders" />
            <Metric label="Doanh thu USD" value={summary.revenue.find(r => r.currency === 'USD')?._sum.amount ?? 0} format={usd} sub="Tách riêng tiền tệ · Chưa trừ phí" motion={motion} icon="store" />
          </div>}
          {!summary.tracking && <div className={styles.notice}>Thu thập truy cập đang tắt. Bật ANALYTICS_ENABLED sau khi áp dụng migration để bắt đầu ghi nhận dữ liệu.</div>}
          <section data-reveal className={`${styles.panel} ${styles.chartPanel}`}><div className={styles.panelHeading}><div><h2>Lưu lượng truy cập</h2><p>{integer(summary.views)} lượt xem · {integer(summary.sessions)} phiên / {days} ngày</p></div><div className={styles.chartControls}><span className={styles.legend}><i /> Lượt xem</span><div className={styles.periods} aria-label="Khoảng ngày biểu đồ">{[7,30,90].map(d => <button key={d} aria-label={`Biểu đồ ${d} ngày`} aria-pressed={days === d} onClick={() => { setDays(d); setPage(1); }}>{d}N</button>)}</div></div></div><TrafficChart data={summary.chart} motion={motion} />
            {summary.views === 0 && <p className={styles.chartEmpty}>Chưa có lượt xem được ghi nhận trong khoảng này.</p>}
          </section><div className={styles.twoColumns}><section data-reveal className={styles.panel}><div className={styles.panelHeading}><div><h2>Thiết bị</h2><p>Theo kích thước màn hình lúc xem</p></div><Icon name="monitor" /></div><div className={styles.deviceList}>{['desktop', 'mobile', 'tablet'].map(device => {
            const count = summary.devices.find(d => d.device === device)?._count ?? 0;
            const percent = summary.views ? Math.round(count / summary.views * 100) : 0;
            return <div key={device}><div><strong><Icon name={device === 'desktop' ? 'monitor' : device === 'mobile' ? 'mobile' : 'tablet'} />{{ desktop: 'Máy tính', mobile: 'Điện thoại', tablet: 'Máy tính bảng' }[device]}</strong><span>{percent}% <small>({integer(count)})</small></span></div><progress max={100} value={percent} aria-label={`Tỷ lệ ${device}`} /></div>;
          })}</div><p className={styles.footnote}>Không lưu IP, email hoặc cookie theo dõi. Tôn trọng Do Not Track và GPC.</p></section>
          <Ranking title="Nguồn truy cập" rows={summary.sources.map(p => [p.referrer === 'direct' ? 'Trực tiếp / không có nguồn' : p.referrer, p._count])} /></div>
          {section === 'traffic' && <Ranking title="Trang được xem nhiều" rows={summary.paths.map(p => [p.path, p._count])} />}
          <p className={styles.footnote}>Truy cập được ghi nhận từ JavaScript trên các trang công khai từ khi bật tính năng. Không phải số người duy nhất; trình chặn theo dõi, bot và các tab riêng có thể làm số liệu khác công cụ khác.</p>
        </> : list ? <section data-reveal className={styles.panel}>
          <div className={styles.panelHeading}><h2>{integer(list.total)} {section === 'users' ? 'tài khoản' : section === 'orders' ? 'đơn hàng' : 'thao tác'}</h2><span className={styles.dim}>20 bản ghi / trang</span></div>
          {!list.rows.length ? <div className={styles.empty}><h3>Chưa có dữ liệu phù hợp</h3><p>Thử đổi bộ lọc hoặc khoảng thời gian.</p></div> : <div className={styles.tableWrap} tabIndex={0} aria-label="Bảng dữ liệu, có thể cuộn ngang"><table>
            <thead><tr>{(section === 'users' ? ['Tài khoản', 'Trạng thái', 'Ngày đăng ký', 'Đơn / Quyền tải', 'Thao tác'] : section === 'orders' ? ['Đơn hàng', 'Khách hàng', 'Số tiền', 'Trạng thái', 'Ngày tạo', 'Thao tác'] : ['Thời gian', 'Người thực hiện', 'Thao tác', 'Đối tượng']).map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead>
            <tbody>{list.rows.map(row => section === 'users' ? <UserTableRow key={row.id} row={row as UserRow} open={target => inspect({ type: 'user', row: row as UserRow }, target)} /> : section === 'orders' ? <OrderTableRow key={row.id} row={row as OrderRow} open={target => inspect({ type: 'order', row: row as OrderRow }, target)} /> : <AuditTableRow key={row.id} row={row as AuditRow} />)}</tbody>
          </table></div>}
          <div className={styles.pagination}><span>Trang {page} / {totalPages}</span><div><button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>← Trước</button><button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>Sau →</button></div></div>
        </section> : null}
        </div>
        <footer className={styles.footer}>FORGE ZONE / ADMIN<span>Quyền quản trị được kiểm tra tại máy chủ</span></footer>
      </main>
    </div>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="admin-detail-title" onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) close(); }}>
      {selected && <div><header><div><p className={styles.eyebrow}>{selected.type === 'user' ? 'HỒ SƠ TÀI KHOẢN' : 'CHI TIẾT GIAO DỊCH'}</p><h2 id="admin-detail-title">{selected.type === 'user' ? selected.row.name || 'Khách hàng' : 'Thông tin đơn hàng'}</h2></div><button aria-label="Đóng chi tiết" disabled={busy} onClick={close}>×</button></header>
        {selected.type === 'user' ? <>
          <dl className={styles.details}><dt>Email</dt><dd>{selected.row.email}</dd><dt>Mã tài khoản</dt><dd><code>{selected.row.id}</code></dd><dt>Đăng ký</dt><dd>{date(selected.row.createdAt)}</dd><dt>Trạng thái</dt><dd>{selected.row.suspendedAt ? `Khóa từ ${date(selected.row.suspendedAt)}` : 'Đang hoạt động'}{selected.row.admin ? ' · Quản trị viên' : ''}</dd><dt>Sản phẩm đã lưu</dt><dd>{selected.row._count.savedTemplates}</dd><dt>Đơn / quyền tải</dt><dd>{selected.row._count.orders} / {selected.row._count.purchases}</dd></dl>
          <form className={styles.editForm} onSubmit={e => { e.preventDefault(); void mutate({ action: 'user-name', id: selected.row.id, name: new FormData(e.currentTarget).get('name') }); }}><label>Tên hiển thị<input name="name" defaultValue={selected.row.name ?? ''} required maxLength={60} disabled={busy} /></label><button type="submit" className={styles.primary} disabled={busy}>Lưu tên</button></form>
          {!selected.row.admin && <form className={styles.lockForm} onSubmit={e => { e.preventDefault(); void mutate({ action: 'user-lock', id: selected.row.id, locked: !selected.row.suspendedAt }); }}><p>{selected.row.suspendedAt ? 'Mở khóa để khách đăng nhập và tải lại sản phẩm đã mua.' : 'Khóa sẽ chặn đăng nhập, phiên hiện tại và link tải đã cấp. Đơn hàng và quyền sở hữu vẫn được giữ.'}</p><label><input type="checkbox" required disabled={busy} /> Tôi xác nhận {selected.row.suspendedAt ? 'mở khóa' : 'khóa'} tài khoản này</label><button type="submit" disabled={busy}>{selected.row.suspendedAt ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}</button></form>}
        </> : <>
          <dl className={styles.details}><dt>Mã đơn</dt><dd><code>{selected.row.id}</code></dd><dt>Khách hàng</dt><dd>{selected.row.buyerName || '—'}<br />{selected.row.buyerEmail}</dd><dt>Sản phẩm</dt><dd>{product(selected.row)}</dd><dt>Tổng tiền</dt><dd>{money(selected.row.amount, selected.row.currency)}</dd><dt>Trạng thái</dt><dd><Badge value={selected.row.status} /></dd><dt>Cổng thanh toán</dt><dd>{selected.row.provider}</dd><dt>Mã tại cổng</dt><dd><code>{selected.row.payosOrderCode || selected.row.paddleTxnId || 'Chưa có'}</code></dd><dt>Tạo / thanh toán</dt><dd>{date(selected.row.createdAt)}<br />{date(selected.row.paidAt)}</dd><dt>Quyền tải đã cấp</dt><dd>{selected.row._count.purchases}</dd></dl>
          <p className={styles.notice}>Thanh toán và hoàn tiền được đối soát bằng webhook. Thực hiện thao tác tài chính tại cổng thanh toán để trạng thái và quyền tải đồng bộ.</p>
          <form className={styles.editForm} onSubmit={e => { e.preventDefault(); void mutate({ action: 'order-note', id: selected.row.id, note: new FormData(e.currentTarget).get('note') }); }}><label>Ghi chú nội bộ<textarea name="note" defaultValue={selected.row.adminNote} maxLength={2000} rows={4} disabled={busy} placeholder="Nội dung xử lý, yêu cầu hỗ trợ…" /></label><button type="submit" className={styles.primary} disabled={busy}>Lưu ghi chú</button></form>
        </>}
        <p role="status" className={styles.footnote}>{busy ? 'Đang lưu…' : message}</p>
      </div>}
    </dialog>
  </div>;
}

function AnimatedValue({ value, format = integer, motion }: { value: number; format?: (value: number) => string; motion: AdminMotion }) {
  const number = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = number.current;
    if (!element) return;
    motion.run(element, 900, p => { element.textContent = format(Math.round(value * p)); });
    return () => { motion.cancel(element); element.textContent = format(value); };
  }, [value, format, motion]);
  return <strong className={styles.animatedValue}><span ref={number} aria-hidden="true">{format(value)}</span><span className="sr-only">{format(value)}</span></strong>;
}
function Metric({ label, value, format = integer, sub, motion, icon }: { label: string; value: number; format?: (value: number) => string; sub: string; motion: AdminMotion; icon: 'orders' | 'users' | 'store' | 'traffic' }) {
  return <section className={styles.metric}><div className={styles.metricHeading}><h2>{label}</h2><Icon name={icon} /></div><AnimatedValue value={value} format={format} motion={motion} /><p>{sub}</p></section>;
}
function Badge({ value }: { value: string }) { return <span className={`${styles.badge} ${value === 'PAID' || value === 'active' ? styles.good : value === 'PENDING' ? styles.waiting : styles.neutral}`}>{statuses[value] ?? (value === 'active' ? 'Hoạt động' : 'Đã khóa')}</span>; }
function UserTableRow({ row, open }: { row: UserRow; open: (target: HTMLElement) => void }) { return <tr><td><strong>{row.name || 'Chưa đặt tên'} {row.admin && <small className={styles.adminBadge}>ADMIN</small>}</strong><small>{row.email}</small></td><td><Badge value={row.suspendedAt ? 'locked' : 'active'} /></td><td>{date(row.createdAt)}</td><td>{row._count.orders} / {row._count.purchases}</td><td><button aria-label={`Quản lý ${row.email}`} onClick={e => open(e.currentTarget)}>Quản lý ↗</button></td></tr>; }
function OrderTableRow({ row, open }: { row: OrderRow; open: (target: HTMLElement) => void }) { return <tr><td><strong>{product(row)}</strong><small><code>{row.id}</code> · {row.provider}</small></td><td>{row.buyerName || '—'}<small>{row.buyerEmail}</small></td><td className={styles.amount}>{money(row.amount, row.currency)}</td><td><Badge value={row.status} /></td><td>{date(row.createdAt)}</td><td><button aria-label={`Xem đơn ${row.id}`} onClick={e => open(e.currentTarget)}>Chi tiết ↗</button></td></tr>; }
function AuditTableRow({ row }: { row: AuditRow }) { return <tr><td>{date(row.createdAt)}</td><td><code>{row.actorId}</code></td><td><strong>{row.detail}</strong><small>{row.action}</small></td><td><code>{row.targetId}</code></td></tr>; }
function Ranking({ title, rows, compact = false, navigate }: { title: string; rows: [string, number][]; compact?: boolean; navigate?: (path: string) => void }) {
  const max = Math.max(1, ...rows.map(r => r[1]));
  const pageLabel = (value: string) => value === '/' ? 'Trang chủ' : value === '/?tab=library' ? 'Thư viện giao diện' : value === '/huong-dan' ? 'Hướng dẫn sử dụng' : value.startsWith('/?mau=') ? templateName(value.split('=')[1]) : value;
  return <section data-reveal className={`${styles.panel} ${compact ? styles.compactRanking : ''}`}><div className={styles.panelHeading}><h2>{title}</h2><span className={styles.dim}>{compact ? 'Được xem nhiều' : 'Lượt xem'}</span></div>{rows.length ? <ol className={styles.ranking}>{rows.map(([label, count], i) => <li key={label}>
    {compact ? <span className={styles.pageIcon}><Icon name={label === '/' ? 'store' : 'traffic'} /></span> : <span className={styles.rank}>{String(i + 1).padStart(2, '0')}</span>}
    <div>{navigate ? <button onClick={() => navigate(label)} aria-label={`Mở ${pageLabel(label)}`}>{pageLabel(label)}<small>{label}</small></button> : <span>{pageLabel(label)}</span>}<progress max={max} value={count} aria-label={`Lượt xem ${label}`} /></div><strong>{integer(count)}<small>lượt xem</small></strong>
  </li>)}</ol> : <div className={styles.empty}>Chưa có dữ liệu truy cập.</div>}</section>;
}
function TrafficChart({ data, motion }: { data: Summary['chart']; motion: AdminMotion }) {
  const container = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setCompact(element.clientWidth < 600));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const line = useRef<SVGPathElement>(null);
  const area = useRef<SVGPathElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  useEffect(() => {
    const element = line.current; const fill = area.current;
    if (!element || !fill) return;
    const length = element.getTotalLength();
    element.style.strokeDasharray = String(length);
    motion.run(element, 1100, p => { element.style.strokeDashoffset = String(length * (1 - p)); fill.style.opacity = String(p); }, () => { element.style.strokeDasharray = ''; element.style.strokeDashoffset = ''; fill.style.opacity = ''; });
    return () => { motion.cancel(element); element.style.strokeDasharray = ''; element.style.strokeDashoffset = ''; fill.style.opacity = ''; };
  }, [data, motion, compact]);
  const max = Math.max(4, ...data.map(d => d.views));
  const width = compact ? 420 : 1100, height = compact ? 240 : 270;
  const points = data.map((d, i) => ({ x: 42 + i / Math.max(1, data.length - 1) * (width - 60), y: height - 32 - d.views / max * (height - 98) }));
  // Monotonic cubic segments smooth the reference's line without inventing data.
  const path = points.map((point, i) => {
    if (!i) return `M ${point.x},${point.y}`;
    const before = points[i - 1]; const middle = (point.x + before.x) / 2;
    return `C ${middle},${before.y} ${middle},${point.y} ${point.x},${point.y}`;
  }).join(' ');
  const index = Math.min(data.length - 1, hover ?? Math.floor(data.length * .56));
  const chosen = data[index]; const point = points[index];
  const tooltipX = point ? Math.min(width - 180, Math.max(50, point.x - 80)) : 50;
  const tooltipY = point ? Math.max(2, point.y - 78) : 0;
  return <div ref={container} className={styles.chart}><svg viewBox={`0 0 ${width} ${height}`} role="img" tabIndex={0} aria-label={`Biểu đồ lượt xem theo ngày: ${data.reduce((n, d) => n + d.views, 0)} lượt xem. Dùng phím mũi tên để xem từng ngày.`}
    onMouseMove={e => { const rect = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width * width; setHover(Math.max(0, Math.min(data.length - 1, Math.round((x - 42) / (width - 60) * (data.length - 1))))); }} onMouseLeave={() => setHover(null)}
    onKeyDown={e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); setHover(Math.max(0, Math.min(data.length - 1, index + (e.key === 'ArrowLeft' ? -1 : 1)))); } }}>
    <defs><linearGradient id="admin-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d4a6cc" stopOpacity=".4" /><stop offset="1" stopColor="#d4a6cc" stopOpacity="0" /></linearGradient></defs>
    {[0, 1, 2, 3, 4].map(i => { const y = height - 32 - i / 4 * (height - 98); return <g key={i}><line x1={42} y1={y} x2={width - 18} y2={y} stroke="#393239" /><text x={0} y={y + 4} fill="#bfb4bf" fontSize={12}>{Math.round(max * i / 4)}</text></g>; })}
    <path ref={area} d={`${path} L ${width - 18},${height - 32} L 42,${height - 32} Z`} fill="url(#admin-chart-fill)" />
    <path ref={line} data-chart-line d={path} fill="none" stroke="#d4a6cc" strokeWidth={2.7} strokeLinejoin="round" />
    {point && chosen && <g className={styles.chartMarker}><line x1={point.x} x2={point.x} y1={point.y} y2={height - 32} stroke="#a994a6" strokeDasharray="4 5" /><circle cx={point.x} cy={point.y} r={12} fill="#e5b9de" fillOpacity=".14" /><circle cx={point.x} cy={point.y} r={5} fill="#e5b9de" />
      <rect x={tooltipX} y={tooltipY} width={156} height={58} rx={9} fill="#302a31" stroke="#554a55" /><text x={tooltipX + 13} y={tooltipY + 20} fill="#e8e0e8" fontSize={11}>{chosen.day}</text><text x={tooltipX + 13} y={tooltipY + 43} fill="#f8f1f8" fontSize={15}>{chosen.views} lượt xem</text><text x={tooltipX + 143} y={tooltipY + 43} fill="#d4a6cc" fontSize={10} textAnchor="end">{chosen.sessions} phiên</text>
    </g>}
    {[0, 1, 2, 3, 4, 5].map((step) => { const i = Math.round(step / 5 * (data.length - 1)); return <text key={step} x={points[i]?.x} y={height - 5} fill="#bfb4bf" fontSize={12} textAnchor={step === 0 ? 'start' : step === 5 ? 'end' : 'middle'}>{data[i]?.day.slice(5).split('-').reverse().join('/')}</text>; })}
  </svg><p className="sr-only" aria-live="polite">{chosen ? `${chosen.day}: ${chosen.views} lượt xem, ${chosen.sessions} phiên` : 'Chưa có dữ liệu'}</p><details><summary>Dữ liệu biểu đồ</summary><div className={styles.tableWrap}><table><thead><tr><th scope="col">Ngày UTC</th><th scope="col">Lượt xem</th><th scope="col">Phiên</th></tr></thead><tbody>{data.map(d => <tr key={d.day}><td>{d.day}</td><td>{d.views}</td><td>{d.sessions}</td></tr>)}</tbody></table></div></details></div>;
}
