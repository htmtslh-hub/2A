'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { REAL_TEMPLATES } from '@/lib/real-templates';
import { currencyForProvider, formatMoney, priceOf, providerForLang, type Lang } from '@/lib/catalog';
import styles from './cart.module.css';

const copy = {
  vi: { cart: 'Giỏ hàng', empty: 'Giỏ hàng của bạn đang trống.', browse: 'Tiếp tục xem sản phẩm', remove: 'Xóa', total: 'Tổng cộng', checkout: 'Thanh toán', working: 'Đang tạo đơn…', close: 'Đóng giỏ hàng', count: 'sản phẩm' },
  en: { cart: 'Cart', empty: 'Your cart is empty.', browse: 'Keep browsing', remove: 'Remove', total: 'Total', checkout: 'Checkout', working: 'Creating order…', close: 'Close cart', count: 'items' },
  zh: { cart: '购物车', empty: '购物车还是空的。', browse: '继续浏览', remove: '移除', total: '合计', checkout: '结账', working: '正在创建订单…', close: '关闭购物车', count: '件商品' },
} as const;

export default function CartDrawer({ ids, count, lang, open, busy, error, pulse, onOpen, onClose, onRemove, onCheckout }: {
  ids: string[]; count: number; lang: Lang; open: boolean; busy: boolean; error: string; pulse: number;
  onOpen: () => void; onClose: () => void; onRemove: (id: string) => void; onCheckout: () => void;
}) {
  const t = copy[lang];
  const currency = currencyForProvider(providerForLang(lang));
  const items = ids.filter((id) => REAL_TEMPLATES[id]);
  const total = items.reduce((sum, id) => sum + priceOf('TEMPLATE', currency, id), 0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!pulse || !fabRef.current) return;
    const fab = fabRef.current;
    fab.classList.remove(styles.bump);
    void fab.offsetWidth;
    fab.classList.add(styles.bump);
  }, [pulse]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onClose(); fabRef.current?.focus(); }
      if (event.key !== 'Tab' || !drawerRef.current) return;
      const controls = Array.from(drawerRef.current.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled)'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return <>
    <button ref={fabRef} data-cart-fab="" type="button" className={styles.fab} onClick={onOpen} aria-label={`${t.cart}: ${count} ${t.count}`}>
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 4h2l2 12h12l2-9H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
      <span>{count}</span>
    </button>
    {open ? <div className={styles.layer}>
      <button type="button" className={styles.backdrop} onClick={onClose} aria-label={t.close} />
      <aside ref={drawerRef} className={styles.drawer} role="dialog" aria-modal="true" aria-label={t.cart}>
        <header className={styles.header}><div><span>FORGE ZONE / CART</span><h2>{t.cart} <small>{items.length}</small></h2></div><button ref={closeRef} type="button" onClick={onClose} aria-label={t.close}>×</button></header>
        <div className={styles.list}>
          {items.length ? items.map((id) => {
            const item = REAL_TEMPLATES[id];
            return <div className={styles.item} key={id}>
              <Image src={`/previews/${item.slug}.webp`} alt="" width={105} height={78} />
              <div><strong>{item.copy[lang].name}</strong><span>{formatMoney(priceOf('TEMPLATE', currency, id), currency, lang)}</span><button type="button" onClick={() => onRemove(id)}>{t.remove}</button></div>
            </div>;
          }) : <div className={styles.empty}><p>{t.empty}</p><button type="button" onClick={onClose}>{t.browse} →</button></div>}
        </div>
        {items.length ? <footer className={styles.footer}>
          <div><span>{t.total}</span><strong>{formatMoney(total, currency, lang)}</strong></div>
          {error ? <p role="alert">{error}</p> : null}
          <button type="button" onClick={onCheckout} disabled={busy}>{busy ? t.working : `${t.checkout} →`}</button>
        </footer> : null}
      </aside>
    </div> : null}
  </>;
}
