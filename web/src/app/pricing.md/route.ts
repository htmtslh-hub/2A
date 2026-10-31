import { NextResponse } from 'next/server';
import { COMPANY } from '@/lib/company';
import { PRICE_USD, PRICE_VND } from '@/lib/catalog';
import { MEMBERSHIP_PRICES, MEMBERSHIP_PRICES_VND } from '@/lib/membership-policy';
import { REAL_TEMPLATES } from '@/lib/real-templates';
import { isFreeProduct } from '@/lib/product-policy';

export function GET() {
  const base = COMPANY.siteUrl.replace(/\/$/, '');
  const entries = Object.entries(REAL_TEMPLATES).filter(([, tpl]) => !tpl.previewOnly);
  const freeCount = entries.filter(([id]) => isFreeProduct(id)).length;

  const singleUsd = (PRICE_USD.single / 100).toFixed(0);
  const singleVnd = PRICE_VND.single.toLocaleString('vi-VN');
  const proUsd = (MEMBERSHIP_PRICES.PRO / 100).toFixed(0);
  const proVnd = MEMBERSHIP_PRICES_VND.PRO.toLocaleString('vi-VN');
  const ultraUsd = (MEMBERSHIP_PRICES.ULTRA / 100).toFixed(0);
  const ultraVnd = MEMBERSHIP_PRICES_VND.ULTRA.toLocaleString('vi-VN');

  const body = `# Pricing & Licensing — ${COMPANY.brand} (${base})

Last updated: ${new Date().toISOString().slice(0, 10)}

## 1. Free Tier
- **Price:** $0 USD / 0 VND (No sign-in required)
- **Included:** ${freeCount} ready-made website templates marked with the Free badge
- **Deliverables:** Full HTML5, CSS3, and Vanilla JS source code (\`.zip\`), \`README.md\`, and \`CUSTOMISE.md\`
- **Licence:** Commercial licence included

## 2. Premium Membership (Monthly — Plan ID: \`PRO\`)
- **Price:** $${proUsd} USD / month (via Paddle) | ${proVnd} VND / month (via PayOS VietQR)
- **Billing:** One-time 1-month pass (no forced auto-renewal)
- **Included:** Unlimited downloads across the entire ${entries.length}+ template library during the active month, including all newly added daily templates
- **Licence:** Perpetual commercial licence for all templates downloaded while active

## 3. Ultra Membership (Annual — Plan ID: \`ULTRA\`)
- **Price:** $${ultraUsd} USD / year (via Paddle) | ${ultraVnd} VND / year (via PayOS VietQR)
- **Billing:** One-time 1-year pass (Save 17% compared to monthly)
- **Included:** Unlimited access to all ${entries.length}+ website templates, upcoming Skill/Prompt packs, and Agent/Tool releases for 12 months
- **Support:** Priority technical & AI customization support via ${COMPANY.email}
- **Licence:** Perpetual commercial licence for all products downloaded while active

## 4. Individual Product / Template Purchase
- **Price:** $${singleUsd} USD (via Paddle) | ${singleVnd} VND (via PayOS VietQR)
- **Billing:** One-time purchase, lifetime access to the purchased item
- **Licence:** Unlimited commercial projects (use for yourself or client projects; resale/redistribution as a competing template library is prohibited)

## 5. Payment Methods & Refund Policy
- **International Customers (USD):** Paddle (Cards, PayPal, Apple Pay, Google Pay)
- **Vietnam Customers (VND):** PayOS (Instant VietQR bank transfer)
- **Refund Policy:** ${COMPANY.refundDays}-day refund policy (${base}/hoan-tien)
- **Pricing Page:** ${base}/?tab=pricing
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
