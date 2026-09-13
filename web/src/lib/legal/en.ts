import { COMPANY } from '@/lib/company';
import { LEGAL_PATHS, type LegalPack } from './types';

const C = COMPANY;
const link = (href: string, text: string) => `<a href="${href}">${text}</a>`;

export const LEGAL_EN: LegalPack = {
  /* ─────────────────────────── TERMS ─────────────────────────── */
  terms: {
    title: 'Terms and Conditions',
    intro: `These terms apply to every purchase and to your use of ${C.siteUrl}. By placing an order or creating an account you agree to them.`,
    sections: [
      {
        h: '1. Who we are',
        p: [
          `${C.brand} is operated by <b>${C.legalName}</b>${C.taxId ? `, tax registration number ${C.taxId}` : ''}.`,
          `Registered address: ${C.address}, ${C.country}. Contact: ${link(`mailto:${C.email}`, C.email)}${C.phone ? ` — ${C.phone}` : ''}.`,
        ],
      },
      {
        h: '2. What we sell',
        p: [
          'We sell pre-built website templates as digital products: HTML, CSS and JavaScript source files with sample content and a customisation guide.',
          'Products are delivered by download. There is no physical item and no shipping cost.',
          'Imagery and copy shown in the live demos illustrate the layout and may not be included in the delivered files where third-party rights apply.',
        ],
      },
      {
        h: '3. Your account',
        p: [
          'You need an account to buy and to re-download what you have bought. You are responsible for keeping your password confidential and for activity under your account.',
          'Please give us a valid email address — that is where download links and order information are sent.',
        ],
      },
      {
        h: '4. Orders and payment',
        p: [
          'The price shown on the pricing page at the time you order is the price that applies. Customers in Vietnam pay in VND; international customers pay in USD.',
          'For international orders, <b>Paddle.com Market Ltd</b> is the merchant of record and is responsible for collecting and remitting VAT/GST in your country. Your invoice and card statement will show Paddle.',
          'For orders inside Vietnam, payment is processed by PayOS via bank transfer.',
          'An order is complete only once we receive confirmation of successful payment from the payment provider.',
        ],
      },
      {
        h: '5. Delivery',
        p: [
          'As soon as payment succeeds, access is unlocked in your account and a download link is emailed to the address you registered.',
          'The emailed link is valid for 7 days. After that you can re-download from your account at any time, with no limit on the number of downloads.',
          'If nothing arrives within 30 minutes, please check your spam folder and then contact us.',
        ],
      },
      {
        h: '6. Your rights to use the product',
        p: [
          `Buying grants you a licence to use the product, not ownership of it. See the ${link(LEGAL_PATHS.license, 'Licence Terms')} for details.`,
          'We retain all intellectual property rights in the designs and source code.',
        ],
      },
      {
        h: '7. Refunds',
        p: [
          `We offer a ${C.refundDays}-day refund under the conditions set out in our ${link(LEGAL_PATHS.refund, 'Refund Policy')}.`,
        ],
      },
      {
        h: '8. What you must not do',
        p: [
          'Resell, rent, redistribute or publicly share the product files, even after modifying them.',
          'Upload the product to template marketplaces, file-sharing sites or peer-to-peer networks.',
          'Share your account or download links with anyone who has not purchased.',
          'Use the product for material that is unlawful in Vietnam or in your own country.',
          'Breaching any of the above may result in termination of your account and revocation of your licence without a refund.',
        ],
      },
      {
        h: '9. Limitation of liability',
        p: [
          'Products are provided "as is". We test on current browsers but do not warrant that a product will work in every environment, on every platform, or after modifications you make.',
          'To the extent permitted by law, our total liability in any circumstance will not exceed the amount you paid for the order in question.',
          'We are not liable for indirect losses such as lost revenue, lost data or business interruption.',
        ],
      },
      {
        h: '10. Changes to these terms',
        p: [
          'We may update these terms. The revised version takes effect when published on this website. Completed orders remain governed by the terms in force at the time of purchase.',
        ],
      },
      {
        h: '11. Governing law',
        p: [
          `These terms are governed by the laws of ${C.country}. Disputes will first be addressed through good-faith negotiation and, failing that, before the competent courts of ${C.country}.`,
        ],
      },
      {
        h: '12. Contact',
        p: [`Questions about these terms: ${link(`mailto:${C.email}`, C.email)}.`],
      },
    ],
  },

  /* ─────────────────────────── PRIVACY ─────────────────────────── */
  privacy: {
    title: 'Privacy Policy',
    intro:
      'This policy explains what personal data we collect, why we use it, who we share it with, and the rights you have over it.',
    sections: [
      {
        h: '1. Data controller',
        p: [
          `<b>${C.legalName}</b>, ${C.address}, ${C.country}, is the controller of the personal data described here. Contact: ${link(`mailto:${C.email}`, C.email)}.`,
        ],
      },
      {
        h: '2. What we collect',
        p: [
          '<b>When you create an account:</b> your email address, your name if you provide one, and a password. Passwords are stored as bcrypt hashes — we never store or see your actual password.',
          '<b>When you buy:</b> email, name, order details and payment status. <b>We never receive or store your card details</b> — those go directly to the payment provider.',
          '<b>When you request the free sample:</b> your email address and the language you were browsing in.',
          '<b>When you visit:</b> standard server logs such as IP address, browser type and time of request.',
        ],
      },
      {
        h: '3. Why we use it',
        p: [
          'To process orders, deliver products and unlock re-downloads.',
          'To authenticate you and keep you signed in.',
          'To send transactional email: order confirmations, download links, password resets.',
          'To send news about new templates and offers — only where you gave us your email for that purpose. Every such email includes an unsubscribe link.',
          'To provide customer support and handle complaints.',
        ],
      },
      {
        h: '4. Who we share it with',
        p: [
          'We rely on the following providers to run the service. Each receives only the data it needs:',
          '<b>Paddle.com Market Ltd</b> (United Kingdom) — processes international payments as merchant of record; receives your email and payment details.',
          '<b>PayOS</b> (Vietnam) — processes domestic bank-transfer payments.',
          '<b>Resend</b> (United States) — sends our transactional email; receives your address and message content.',
          '<b>Vercel</b> (United States) — hosts the website.',
          '<b>Neon</b> (United States) — hosts the database holding accounts and orders.',
          'We do not sell your personal data to anyone.',
        ],
      },
      {
        h: '5. International transfers',
        p: [
          'Several of the providers above operate servers outside Vietnam. Using the service means the data needed to fulfil your order is transferred to those systems.',
        ],
      },
      {
        h: '6. Cookies and browser storage',
        p: [
          'We use only cookies that are necessary for the site to work. We do not use advertising cookies and we do not track you across other websites.',
          '<b>Session cookie</b> — keeps you signed in.',
          '<b>Language cookie</b> (<code>agentic-lang</code>) — remembers the language you chose.',
          'Your browser also stores your language choice in localStorage. That stays on your device and is never sent to us.',
        ],
      },
      {
        h: '7. How long we keep it',
        p: [
          'Account and order data is kept while your account is active, and afterwards for as long as tax and accounting law requires us to retain transaction records.',
          'Marketing email addresses are kept until you unsubscribe.',
          'One-time download links and password reset tokens expire automatically, after 7 days and 1 hour respectively.',
        ],
      },
      {
        h: '8. Your rights',
        p: [
          'You may ask to access, correct or delete your personal data, and you may withdraw consent to marketing email at any time.',
          `Send requests to ${link(`mailto:${C.email}`, C.email)}. We respond within 30 days.`,
          'Note that deleting your account removes your ability to re-download past purchases. We must still retain transaction records where accounting law requires it.',
        ],
      },
      {
        h: '9. Security',
        p: [
          'The site runs entirely over HTTPS. Passwords are hashed with bcrypt. Password reset tokens are stored only as hashes. Payment webhooks are verified by cryptographic signature before being acted on.',
          'No system is perfectly secure. If a breach affects your data, we will notify you by email.',
        ],
      },
      {
        h: '10. Children',
        p: ['This service is not intended for anyone under 16, and we do not knowingly collect their data.'],
      },
      {
        h: '11. Changes to this policy',
        p: [
          'If we make a material change we will update the date at the top of this page, and email you where the change affects you directly.',
        ],
      },
    ],
  },

  /* ─────────────────────────── REFUND ─────────────────────────── */
  refund: {
    title: 'Refund Policy',
    intro: `A digital product cannot be "returned" the way a physical one can, so instead we offer a clear ${C.refundDays}-day refund.`,
    sections: [
      {
        h: `1. ${C.refundDays}-day refund`,
        p: [
          `If a template does not work out for your project, tell us within <b>${C.refundDays} days</b> of payment and we will refund you in full.`,
          'You do not owe us a long explanation, though telling us why genuinely helps us improve.',
        ],
      },
      {
        h: '2. When a refund applies',
        p: [
          'The product differs materially from its description or live demo.',
          'The files have a technical fault we cannot fix within a reasonable time.',
          'You bought the wrong product, or bought the same one twice.',
          'The product simply is not right for what you needed.',
        ],
      },
      {
        h: '3. When it does not',
        p: [
          `Requests made more than ${C.refundDays} days after payment.`,
          'The product has already been used in a project that is publicly live.',
          'There is evidence of a licence breach, such as redistributing the files.',
        ],
      },
      {
        h: '4. How to request one',
        p: [
          `Email ${link(`mailto:${C.email}`, C.email)} with the subject "Refund request", including the email address you bought with and your order reference.`,
          'We reply within 2 business days.',
        ],
      },
      {
        h: '5. How long it takes',
        p: [
          '<b>International customers</b> — Paddle refunds to your original payment method, typically 5–10 business days depending on your card issuer.',
          '<b>Customers in Vietnam</b> — we transfer back to the account you paid from, typically within 3–5 business days.',
          'Once refunded, your access is revoked and you must delete any copies you hold.',
        ],
      },
    ],
  },

  /* ─────────────────────────── LICENCE ─────────────────────────── */
  license: {
    title: 'Licence Terms',
    intro:
      'The short version: use the templates on your own and your clients’ projects as often as you like. The one thing you cannot do is resell the files themselves.',
    sections: [
      {
        h: '1. What you get',
        p: [
          'Your purchase grants a <b>perpetual, non-exclusive, worldwide commercial licence</b>.',
          'Perpetual means there is nothing to renew and it does not expire. Non-exclusive means we continue to sell the same template to others.',
        ],
      },
      {
        h: '2. You may',
        p: [
          'Use it for your own website or your company’s.',
          'Use it for client projects and charge those clients for your work.',
          'Modify anything: layout, colours, type, content, additional code.',
          'Reuse it across as many separate projects as you like.',
          'Use it on sites that make money: shops, memberships, advertising.',
        ],
      },
      {
        h: '3. You may not',
        p: [
          '<b>Resell, give away or redistribute the product files</b>, however heavily modified.',
          'Upload it to template marketplaces, file-sharing sites, or anywhere others can obtain the source.',
          'Bundle it into another template pack and sell that.',
          'Share your account or download links with people who have not bought.',
          'Claim to be the original author of the design.',
          'The simple test: you may sell <i>what you build with it</i>, not <i>the thing itself</i>.',
        ],
      },
      {
        h: '4. Single template vs full library',
        p: [
          '<b>Single template</b> — the licence covers the one template you bought, across unlimited projects.',
          '<b>Full library</b> — the licence covers every template in the library, including ones released later, on the same terms.',
        ],
      },
      {
        h: '5. Third-party images, fonts and libraries',
        p: [
          'Demo imagery is there to show the layout and <b>may not be licensed for you to use</b>. Replace it with your own images, or images you hold rights to, before publishing.',
          'Bundled fonts and open-source libraries remain under their own licences, which are listed in the accompanying documentation.',
        ],
      },
      {
        h: '6. Ownership',
        p: [
          `Copyright in the designs and source code remains with <b>${C.legalName}</b>. This licence grants you the right to use them, not ownership of them.`,
          'If you breach section 3 the licence terminates, and you must stop using the product and delete your copies.',
        ],
      },
      {
        h: '7. Not sure?',
        p: [
          `If your situation is not clearly covered above, just ask: ${link(`mailto:${C.email}`, C.email)}. We answer plainly, and the answer is usually yes.`,
        ],
      },
    ],
  },
};
