'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const REFRESH_INTERVAL_MS = 3_000;
const MAX_ATTEMPTS = 60;

export default function PendingPaymentRefresh() {
  const router = useRouter();

  useEffect(() => {
    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;
      router.refresh();
      if (attempts >= MAX_ATTEMPTS) window.clearInterval(interval);
    }, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [router]);

  return null;
}
