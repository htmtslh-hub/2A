'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trafficPath, referrerHost } from '@/lib/traffic';

export default function TrafficTracker() {
  const pathname = usePathname();
  const params = useSearchParams();
  const query = params.toString();
  useEffect(() => {
    if (navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
    const path = trafficPath(pathname + (query ? `?${query}` : ''));
    if (!path) return;
    // StrictMode's first effect is cancelled; no cookies or persistent visitor id.
    const timer = window.setTimeout(() => {
      try {
        let sessionId = sessionStorage.getItem('forge-traffic-session');
        if (!sessionId) { sessionId = crypto.randomUUID(); sessionStorage.setItem('forge-traffic-session', sessionId); }
        void fetch('/api/traffic', { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true,
          body: JSON.stringify({ id: crypto.randomUUID(), sessionId, path, referrer: document.referrer ? `https://${referrerHost(document.referrer)}` : '', device: innerWidth < 768 ? 'mobile' : innerWidth < 1024 ? 'tablet' : 'desktop' }),
        }).catch(() => {});
      } catch { /* Blocked storage does not affect the store. */ }
    }, 250);
    return () => clearTimeout(timer);
  }, [pathname, query]);
  return null;
}
