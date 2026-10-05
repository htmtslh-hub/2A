'use client';

import { useEffect } from 'react';
import { CART_KEY, PENDING_CART_KEY } from '@/lib/cart-storage';

export default function ClearPaidCart({ orderId }: { orderId: string }) {
  useEffect(() => {
    try {
      const pending = JSON.parse(localStorage.getItem(PENDING_CART_KEY) || 'null');
      if (pending?.orderId !== orderId || !Array.isArray(pending.ids)) return;
      const current = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      if (Array.isArray(current)) localStorage.setItem(CART_KEY, JSON.stringify(current.filter((id: unknown) => !pending.ids.includes(id))));
      localStorage.removeItem(PENDING_CART_KEY);
    } catch {}
  }, [orderId]);
  return null;
}
