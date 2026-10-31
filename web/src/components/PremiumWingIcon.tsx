'use client';
import React from 'react';

export interface PremiumWingIconProps {
  size?: number | string;
  variant?: 'blue' | 'gold';
  className?: string;
  title?: string;
}

function WingGeometry({ prefix, isGold }: { prefix: string; isGold: boolean }) {
  const id = (name: string) => `${prefix}-${name}`;
  return (
    <>
      <ellipse cx="64" cy="47" rx="22" ry="18" fill={`url(#${id('aura')})`} />
      <path d="M54 29 L82 40 L89 65 L73 58 L54 45 Z" fill={`url(#${id('cyan-covert')})`} />

      <g stroke={isGold ? '#f0ad28' : '#68bcff'} strokeWidth="0.55" strokeLinejoin="round">
        <path d="M89.2 64 C90.6 70.5 91.2 77 91.2 82.5 C88.8 76.8 86.8 71 85.2 65 Z" fill={`url(#${id('ice-tail')})`} />
        <path d="M88.5 63.5 C87.2 71.5 85.6 79.2 83.8 85.8 C83.5 77.8 83.6 70 84.5 63 Z" fill={`url(#${id('ice-tail')})`} />
        <path d="M86.2 62.5 C83 73 79 82.2 74.5 90.2 C76.5 80 79.2 70.5 81.8 61.5 Z" fill={`url(#${id('ice-tail')})`} />
        <path d="M84 59.5 C77.8 73 69.8 86 60.8 97 C65 83.5 70.8 69.8 77 57.5 Z" fill={`url(#${id('ice-tail')})`} />
        <path d="M81 56.5 C76.8 64.2 71.8 71.5 66.8 78 C70 69.5 73.8 61.8 77.5 54.5 Z" fill={`url(#${id('ice-tail')})`} />
        <path d="M64 49 C56 55.5 47.8 61.8 40.2 67 C45.8 59.5 53.5 52.5 61 47 Z" fill={`url(#${id('ice-mid')})`} />
        <path d="M71 49 C60.5 58.2 48.8 66.2 36.8 71.8 C46 62 56.8 52.8 67 45.5 Z" fill={`url(#${id('ice-outer')})`} />
        <path d="M74 50.5 C66.8 58.5 58.8 65.2 50.5 70.5 C57.2 61.5 64.5 53.2 71 47.5 Z" fill={`url(#${id('ice-outer')})`} />
        <path d="M68 46.5 C53.5 51.5 38 56.2 22.5 59.5 C36.5 62.2 52 59.2 68.5 51.5 Z" fill={`url(#${id('ice-outer')})`} />
        <path d="M8.5 40.5 C26.5 45.2 46.5 47.2 67 46.5 L66 52.8 C44.5 54.2 24 49.5 8.5 40.5 Z" fill={`url(#${id('ice-outer')})`} />
        <path d="M1.5 21 C19.5 30.8 41.5 37.2 65 40 L63 47.5 C38 45.5 16.5 35.8 1.5 21 Z" fill={`url(#${id('ice-outer')})`} />
        <path d="M16 24 C31.5 31.8 48.5 36.8 66 39.2 L64 44.5 C46.5 42.2 29.2 34.8 16 24 Z" fill={`url(#${id('ice-mid')})`} />
        <path d="M2.5 1.5 C19.5 16.5 40.5 26.2 64 31 L60.5 38.2 C37 32.8 16.5 19.8 2.5 1.5 Z" fill={`url(#${id('ice-outer')})`} />
        <path d="M26 10.5 C39.5 20.5 53.5 26.5 67.5 30.2 L64 36.8 C49.5 32.5 36.5 23.5 26 10.5 Z" fill={`url(#${id('ice-mid')})`} />
      </g>

      <g stroke={isGold ? '#e69b14' : '#56baff'} strokeWidth="0.52" strokeLinejoin="round">
        <path d="M18.5 36 C33.5 41.2 49.5 44.2 66 45 L64.5 49.5 C47.5 48.8 31.5 44 18.5 36 Z" fill={`url(#${id('ice-mid')})`} />
        <path d="M35 25.5 C47 30.8 58.5 33.8 69.5 35.5 L67 39.8 C55.5 37.8 44.5 32.8 35 25.5 Z" fill={`url(#${id('cyan-covert')})`} />
        <path d="M38.5 32.5 C50 36.8 60.5 39 70.5 40.2 L68 43.8 C57.5 42.5 47.2 38.5 38.5 32.5 Z" fill={`url(#${id('cyan-covert')})`} />
        <path d="M43.5 35.8 C53.8 39.5 63 41.2 71.5 42 L69 45.2 C60 44.5 51 41.2 43.5 35.8 Z" fill={`url(#${id('cyan-covert')})`} />
        <path d="M45.8 46.8 C55 46 64 44.8 72 43.8 L70.5 48 C62 49 53.5 48.5 45.8 46.8 Z" fill={`url(#${id('cyan-covert')})`} />
        <path d="M42.8 52.5 C53.5 51.2 63.5 49 72.5 46.5 L70.5 52.2 C61.2 55 51.8 55.2 42.8 52.5 Z" fill={`url(#${id('cyan-covert')})`} />
        <path d="M75.5 50 C70 56.8 63.8 62.5 57.5 67.2 C62 59.8 67 53.2 72 47.8 Z" fill={`url(#${id('cyan-covert')})`} />
        <path d="M78.5 53 C73.2 60.5 67.5 66.8 61.5 72.5 C66.2 64.5 71.2 57 75.8 50.8 Z" fill={`url(#${id('cyan-covert')})`} />
      </g>

      <g stroke={isGold ? '#f5b82e' : '#5ec8ff'} strokeWidth="0.45" strokeLinejoin="round" opacity="0.95">
        <path d="M61.5 40.5 C66 40 70.5 39.8 74.5 40 L72.5 43.5 C68.5 43 64.8 42 61.5 40.5 Z" fill={`url(#${id('cyan-covert')})`} />
        <path d="M63.5 44.2 C68 43.2 72 42.5 75.8 42.2 L74 46.2 C70 46 66.5 45.5 63.5 44.2 Z" fill={`url(#${id('cyan-covert')})`} />
        <path d="M65.5 49.5 C69.8 47.8 73.8 46.2 77.2 45.2 L75.5 49.8 C72 50.2 68.5 50.2 65.5 49.5 Z" fill={`url(#${id('cyan-covert')})`} />
        <path d="M67.2 52.8 C71.5 50.5 75.5 48.5 78.8 47.2 L76.8 52.5 C73.5 53.2 70.2 53.2 67.2 52.8 Z" fill={`url(#${id('cyan-covert')})`} />
        <path d="M70.2 55.2 C74.2 52.5 77.8 50.2 80.5 49 L78.8 54.5 C75.8 55.2 72.8 55.5 70.2 55.2 Z" fill={`url(#${id('cyan-covert')})`} />
        <path d="M79 65.2 C81.2 61.2 83 57.8 84.5 55.5 L83.8 63.8 C82 64.5 80.5 65 79 65.2 Z" fill={`url(#${id('cyan-covert')})`} />
        <path d="M81.8 66.8 C83.8 62.8 85.5 59.5 86.8 57.2 L86 65.5 C84.5 66.2 83.2 66.5 81.8 66.8 Z" fill={`url(#${id('cyan-covert')})`} />
      </g>

      <path d="M64 39.2 C71.5 38.8 79.5 41.2 83.5 46.5 C78.5 48.8 71.5 46.8 64 39.2 Z" fill={`url(#${id('aqua-core')})`} />
      <path d="M67.5 40.5 C73.8 40.2 79.8 42.2 82.8 46 C78.5 47.4 72.8 45.5 67.5 40.5 Z" fill={isGold ? '#fff9c4' : '#c4feff'} opacity="0.96" />

      <g>
        <path d="M51.8 18.2 C60.5 24 72.5 29.5 81.5 34.5 C88 38.2 91.2 43.5 91.6 51.2 C89.6 48.6 88 47.8 86.6 48.6 C85.2 49.8 85.2 53.5 86.8 57.8 C88.5 61.8 91.5 64 95 65 C96.5 65.6 97.2 67.5 97.4 69.5 C95.2 67.6 92.8 66.4 90.5 66.2 C90.2 67.2 89.2 67.8 87.8 67.8 C88.2 66.2 88.2 64.5 87.2 63 C85.2 60.2 82.2 58.5 79.8 56.5 L82.2 54.5 C83 53.2 83 51.5 81.8 50.2 C76.5 48.2 71.2 46 66.8 44.2 C70.8 44.2 75 45.5 78.2 47.5 C79.8 46.8 81.5 46.2 83.5 46.5 C83.2 42.8 79.2 40.2 71.5 39.8 C65.8 39.5 61 36.8 56.5 32.8 C59.8 33.5 63.5 34.2 67 34.5 C61.2 31 55.8 25.5 51.8 18.2 Z" fill={`url(#${id('chrome-dark')})`} />
        <path d="M51.8 18.2 C60.5 24 72.5 29.5 81.5 34.5 C88 38.2 91.2 43.5 91.6 51.2 C89.8 48.8 88.2 47.8 86.8 48.2 C86.5 42.2 83 37.5 75.5 33.8 C67 29.5 58.5 25 51.8 18.2 Z" fill={`url(#${id('chrome-light')})`} stroke={isGold ? '#6b4205' : '#475569'} strokeWidth="0.45" />
        <path d="M51.8 18.2 C58.5 23.5 68.5 29 77.5 33.8 C79 34.8 80 36 80.2 37.2 C72.5 34.2 63.5 30 57.5 25.5 C55 23.2 53.2 20.8 51.8 18.2 Z" fill={`url(#${id('chrome-light')})`} stroke={isGold ? '#6b4205' : '#475569'} strokeWidth="0.45" />
        <path d="M56.5 32.8 C63.5 34.2 71.5 35.8 78.8 38.2 C74.5 39 68.2 38.2 62.5 36.2 C59.8 35.2 57.8 34 56.5 32.8 Z" fill={`url(#${id('chrome-light')})`} stroke={isGold ? '#6b4205' : '#475569'} strokeWidth="0.45" />
        <path d="M63.8 37.5 C69.5 37.8 75.2 38.8 80.2 40.8 C75.8 41.2 70.2 40.5 63.8 37.5 Z" fill={`url(#${id('chrome-light')})`} stroke={isGold ? '#6b4205' : '#475569'} strokeWidth="0.42" />
        <path d="M66.8 44.2 C71.2 44.2 75.5 45.8 78.5 48 C80.5 47 82.5 46.2 84.5 46.5 C84.5 43.2 82.8 40 79.5 37.5 C83.8 39.8 86.2 43.5 86.5 47.8 C85 49.5 84.8 53.5 86.8 58 C88.5 61.8 91.5 64 95 65 C96.4 65.5 97.1 67.2 97.4 69.5 C95 67.4 92.6 66.2 90.2 66 C89.8 67 89 67.6 87.8 67.8 C88.3 66 88.2 64.2 87 62.8 C85 60 82 58.2 79.8 56.5 L82.2 54.5 C83.2 53.2 83.2 51.2 81.5 50 C76.5 48 71.2 46 66.8 44.2 Z" fill={`url(#${id('chrome-stem')})`} stroke={isGold ? '#5c3804' : '#3e4c59'} strokeWidth="0.48" />
        <path d="M53.2 19.5 C62 25.5 73 30.5 81.5 35.5 C86.5 38.5 89.5 42.8 90.5 48.5" stroke={isGold ? '#fffef5' : '#ffffff'} strokeWidth="0.85" strokeLinecap="round" opacity="0.92" />
        <path d="M58.5 33.4 C65 34.8 72 36.2 77.8 38" stroke={isGold ? '#fffef5' : '#ffffff'} strokeWidth="0.65" strokeLinecap="round" opacity="0.88" />
        <path d="M69 44.8 C74 45.8 78.5 48 82.5 50.5" stroke={isGold ? '#fffef5' : '#ffffff'} strokeWidth="0.7" strokeLinecap="round" opacity="0.88" />
        <path d="M84.2 51.5 C83.8 55.8 86 60.2 90.5 63.5 C92.8 65 94.8 65.5 96.2 66.8" stroke={isGold ? '#fffef5' : '#ffffff'} strokeWidth="0.75" strokeLinecap="round" opacity="0.85" />
      </g>
    </>
  );
}

/** Shared SVG sprite rendered once at the document root to avoid duplicating 15 KB of gradients/paths across 100+ cards. */
export function PremiumWingSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={0}
      height={0}
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      <defs>
        <radialGradient id="pw-gold-aura" cx="65%" cy="46%" r="30%">
          <stop offset="0%" stopColor="#fff6b3" stopOpacity="0.95" />
          <stop offset="42%" stopColor="#f7b733" stopOpacity="0.7" />
          <stop offset="76%" stopColor="#d97706" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pw-gold-ice-outer" x1="6" y1="8" x2="72" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffefb0" />
          <stop offset="18%" stopColor="#fffdf0" />
          <stop offset="56%" stopColor="#ffe28a" />
          <stop offset="82%" stopColor="#f5b027" />
          <stop offset="100%" stopColor="#c97208" />
        </linearGradient>
        <linearGradient id="pw-gold-ice-mid" x1="16" y1="22" x2="74" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffea9f" />
          <stop offset="22%" stopColor="#fffbe6" />
          <stop offset="60%" stopColor="#ffd56b" />
          <stop offset="85%" stopColor="#eba018" />
          <stop offset="100%" stopColor="#b86306" />
        </linearGradient>
        <linearGradient id="pw-gold-ice-tail" x1="52" y1="90" x2="84" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffe89c" />
          <stop offset="24%" stopColor="#fff9db" />
          <stop offset="60%" stopColor="#f7c454" />
          <stop offset="84%" stopColor="#dc8812" />
          <stop offset="100%" stopColor="#9e4f04" />
        </linearGradient>
        <linearGradient id="pw-gold-cyan-covert" x1="36" y1="28" x2="78" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff3b8" />
          <stop offset="35%" stopColor="#ffd866" />
          <stop offset="72%" stopColor="#f2a218" />
          <stop offset="100%" stopColor="#b86005" />
        </linearGradient>
        <radialGradient id="pw-gold-aqua-core" cx="72%" cy="44%" r="18%">
          <stop offset="0%" stopColor="#fffff0" />
          <stop offset="48%" stopColor="#ffea85" />
          <stop offset="82%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pw-gold-chrome-light" x1="51" y1="18" x2="94" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="26%" stopColor="#fff4c2" />
          <stop offset="56%" stopColor="#e5b548" />
          <stop offset="84%" stopColor="#a87012" />
          <stop offset="100%" stopColor="#6b4205" />
        </linearGradient>
        <linearGradient id="pw-gold-chrome-dark" x1="54" y1="20" x2="96" y2="69" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b88420" />
          <stop offset="38%" stopColor="#85560a" />
          <stop offset="75%" stopColor="#523204" />
          <stop offset="100%" stopColor="#2e1a02" />
        </linearGradient>
        <linearGradient id="pw-gold-chrome-stem" x1="76" y1="40" x2="94" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d49e2a" />
          <stop offset="42%" stopColor="#fff1b8" />
          <stop offset="78%" stopColor="#a36b10" />
          <stop offset="100%" stopColor="#4d2c03" />
        </linearGradient>

        <radialGradient id="pw-blue-aura" cx="65%" cy="46%" r="30%">
          <stop offset="0%" stopColor="#a6fcff" stopOpacity="0.95" />
          <stop offset="42%" stopColor="#52c5ff" stopOpacity="0.7" />
          <stop offset="76%" stopColor="#487df2" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#487df2" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pw-blue-ice-outer" x1="6" y1="8" x2="72" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c2e9ff" />
          <stop offset="18%" stopColor="#eef9ff" />
          <stop offset="56%" stopColor="#cdeeff" />
          <stop offset="82%" stopColor="#7ec0ff" />
          <stop offset="100%" stopColor="#497ff0" />
        </linearGradient>
        <linearGradient id="pw-blue-ice-mid" x1="16" y1="22" x2="74" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#bce8ff" />
          <stop offset="22%" stopColor="#e8f8ff" />
          <stop offset="60%" stopColor="#b0e1ff" />
          <stop offset="85%" stopColor="#62b2ff" />
          <stop offset="100%" stopColor="#4276e6" />
        </linearGradient>
        <linearGradient id="pw-blue-ice-tail" x1="52" y1="90" x2="84" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#bae4ff" />
          <stop offset="24%" stopColor="#e5f5ff" />
          <stop offset="60%" stopColor="#9bc6ff" />
          <stop offset="84%" stopColor="#5e8bf2" />
          <stop offset="100%" stopColor="#3c61d6" />
        </linearGradient>
        <linearGradient id="pw-blue-cyan-covert" x1="36" y1="28" x2="78" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c8f6ff" />
          <stop offset="35%" stopColor="#8be7ff" />
          <stop offset="72%" stopColor="#4ab7ff" />
          <stop offset="100%" stopColor="#3b6fe3" />
        </linearGradient>
        <radialGradient id="pw-blue-aqua-core" cx="72%" cy="44%" r="18%">
          <stop offset="0%" stopColor="#ecffff" />
          <stop offset="48%" stopColor="#9efbff" />
          <stop offset="82%" stopColor="#48d4ff" />
          <stop offset="100%" stopColor="#3898ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pw-blue-chrome-light" x1="51" y1="18" x2="94" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="28%" stopColor="#eff5fa" />
          <stop offset="58%" stopColor="#b9c8d6" />
          <stop offset="84%" stopColor="#7c8d9e" />
          <stop offset="100%" stopColor="#4d5c6b" />
        </linearGradient>
        <linearGradient id="pw-blue-chrome-dark" x1="54" y1="20" x2="96" y2="69" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8fa0b0" />
          <stop offset="38%" stopColor="#5c6c7d" />
          <stop offset="75%" stopColor="#384553" />
          <stop offset="100%" stopColor="#212a34" />
        </linearGradient>
        <linearGradient id="pw-blue-chrome-stem" x1="76" y1="40" x2="94" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a8b8c8" />
          <stop offset="42%" stopColor="#e2eaf2" />
          <stop offset="78%" stopColor="#798999" />
          <stop offset="100%" stopColor="#3a4653" />
        </linearGradient>

        <symbol id="pw-symbol-gold" viewBox="0 0 100 100">
          <WingGeometry prefix="pw-gold" isGold={true} />
        </symbol>
        <symbol id="pw-symbol-blue" viewBox="0 0 100 100">
          <WingGeometry prefix="pw-blue" isGold={false} />
        </symbol>
      </defs>
    </svg>
  );
}

export default function PremiumWingIcon({
  size = 30,
  variant = 'blue',
  className,
  title,
}: PremiumWingIconProps) {
  const isGold = variant === 'gold';
  const label = title ?? (isGold ? 'Ultra' : 'Premium');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={label}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        filter: isGold
          ? 'drop-shadow(0 2px 9px rgba(245, 184, 61, 0.36))'
          : 'drop-shadow(0 2px 8px rgba(76, 195, 255, 0.28))',
      }}
    >
      <title>{label}</title>
      <use href={isGold ? '#pw-symbol-gold' : '#pw-symbol-blue'} />
    </svg>
  );
}
