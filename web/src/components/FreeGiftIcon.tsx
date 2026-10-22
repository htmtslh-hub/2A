'use client';
import React, { useId } from 'react';

export interface FreeGiftIconProps {
  size?: number | string;
  className?: string;
  title?: string;
}

export default function FreeGiftIcon({
  size = 30,
  className,
  title = 'Miễn phí',
}: FreeGiftIconProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const id = (name: string) => `fg-${rawId}-${name}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        filter: 'drop-shadow(0 2px 8px rgba(52, 211, 153, 0.34))',
      }}
    >
      <title>{title}</title>
      <defs>
        <radialGradient id={id('aura')} cx="50%" cy="54%" r="46%">
          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.65" />
          <stop offset="45%" stopColor="#10b981" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={id('box-left')} x1="16" y1="42" x2="50" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="28%" stopColor="#34d399" />
          <stop offset="70%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        <linearGradient id={id('facet-light')} x1="16" y1="42" x2="36" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={id('box-right')} x1="50" y1="42" x2="84" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="32%" stopColor="#10b981" />
          <stop offset="75%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>

        <linearGradient id={id('lid-top')} x1="18" y1="18" x2="82" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="28%" stopColor="#a7f3d0" />
          <stop offset="68%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        <linearGradient id={id('lid-left')} x1="12" y1="31" x2="50" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="45%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        <linearGradient id={id('lid-right')} x1="50" y1="31" x2="88" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>

        <linearGradient id={id('rib-sun')} x1="25" y1="15" x2="50" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="22%" stopColor="#fef9c3" />
          <stop offset="58%" stopColor="#fde047" />
          <stop offset="88%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        <linearGradient id={id('rib-shade')} x1="50" y1="18" x2="78" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#facc15" />
          <stop offset="78%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>

        <linearGradient id={id('bow-left')} x1="16" y1="8" x2="50" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#fef9c3" />
          <stop offset="65%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        <linearGradient id={id('bow-right')} x1="50" y1="8" x2="84" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="22%" stopColor="#fef08a" />
          <stop offset="62%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>

        <linearGradient id={id('bow-inner')} x1="24" y1="14" x2="76" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a16207" />
          <stop offset="50%" stopColor="#713f12" />
          <stop offset="100%" stopColor="#422006" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="54" r="44" fill={`url(#${id('aura')})`} />

      {/* 3D Crystal Box Body */}
      <path
        d="M16 40.5 L50 54.5 L50 93 L16 77.5 Z"
        fill={`url(#${id('box-left')})`}
        stroke="#a7f3d0"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <path d="M16 40.5 L28.2 45.5 L28.2 83.1 L16 77.5 Z" fill={`url(#${id('facet-light')})`} />
      <path d="M16 40.5 L50 54.5 L37.8 68 L16 56 Z" fill="#ffffff" opacity="0.12" />

      <path
        d="M50 54.5 L84 40.5 L84 77.5 L50 93 Z"
        fill={`url(#${id('box-right')})`}
        stroke="#34d399"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <path d="M71.8 45.5 L84 40.5 L84 77.5 L71.8 83.1 Z" fill="#022c22" opacity="0.26" />
      <path d="M50 54.5 L84 40.5 L84 55 L50 70 Z" fill="#a7f3d0" opacity="0.08" />

      {/* Vertical Ribbons on Box Body */}
      <path
        d="M28.2 45.5 L38.2 49.6 L38.2 87.6 L28.2 83.1 Z"
        fill={`url(#${id('rib-sun')})`}
        stroke="#ca8a04"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <path d="M29.4 46.2 L29.4 83.4" stroke="#ffffff" strokeWidth="0.75" opacity="0.8" />

      <path
        d="M61.8 49.6 L71.8 45.5 L71.8 83.1 L61.8 87.6 Z"
        fill={`url(#${id('rib-shade')})`}
        stroke="#854d0e"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <path d="M63 49.4 L63 86.8" stroke="#fef9c3" strokeWidth="0.65" opacity="0.65" />

      {/* Shadow under overhanging lid */}
      <path
        d="M16 40.2 L50 54.2 L84 40.2 L84 45.2 L50 59.5 L16 45.2 Z"
        fill="#022c22"
        opacity="0.52"
      />

      {/* 3D Gift Lid */}
      <path
        d="M50 17.5 L88 31.5 L50 46 L12 31.5 Z"
        fill={`url(#${id('lid-top')})`}
        stroke="#ecfdf5"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <path d="M50 17.5 L69 24.5 L50 31.7 L31 24.5 Z" fill="#ffffff" opacity="0.28" />

      <path
        d="M12 31.5 L50 46 L50 54.8 L12 40 Z"
        fill={`url(#${id('lid-left')})`}
        stroke="#a7f3d0"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      <path
        d="M50 46 L88 31.5 L88 40 L50 54.8 Z"
        fill={`url(#${id('lid-right')})`}
        stroke="#34d399"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Cross-Ribbons on Lid */}
      <path
        d="M27.5 37.4 L65.5 23.2 L75.5 26.9 L38 41.4 Z"
        fill={`url(#${id('rib-sun')})`}
        stroke="#ca8a04"
        strokeWidth="0.55"
        strokeLinejoin="round"
      />
      <path
        d="M34.5 23.2 L72.5 37.4 L62 41.4 L24.5 26.9 Z"
        fill={`url(#${id('rib-sun')})`}
        stroke="#ca8a04"
        strokeWidth="0.55"
        strokeLinejoin="round"
      />
      <path
        d="M27.5 37.4 L38 41.4 L38 50.1 L27.5 46 Z"
        fill={`url(#${id('rib-sun')})`}
        stroke="#ca8a04"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <path
        d="M62 41.4 L72.5 37.4 L72.5 46 L62 50.1 Z"
        fill={`url(#${id('rib-shade')})`}
        stroke="#854d0e"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />

      {/* Specular Rim Highlights */}
      <path
        d="M13 31.8 L50 46 L87 31.8"
        stroke="#ffffff"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
      <path
        d="M50 46 L50 92"
        stroke="#ecfdf5"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Sculpted 3D Bow */}
      <path
        d="M47.5 28.5 L32 39.5 L38 39.8 L40.5 44.8 L50 32.2 Z"
        fill={`url(#${id('rib-sun')})`}
        stroke="#a16207"
        strokeWidth="0.65"
        strokeLinejoin="round"
      />
      <path
        d="M52.5 28.5 L68 39.5 L62 39.8 L59.5 44.8 L50 32.2 Z"
        fill={`url(#${id('rib-shade')})`}
        stroke="#854d0e"
        strokeWidth="0.65"
        strokeLinejoin="round"
      />

      <path
        d="M49 28.5 C39.5 30 19 26.5 17.5 17 C16 8.2 30.5 5.5 41.5 13.5 C46 16.8 48.5 22.5 49.5 28 Z"
        fill={`url(#${id('bow-left')})`}
        stroke="#a16207"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
      <path
        d="M44.2 24.8 C37.2 25.2 25.5 22.5 24.5 17.2 C23.8 13 31.8 11.8 38.8 16.8 C41.8 19 43.5 22 44.2 24.8 Z"
        fill={`url(#${id('bow-inner')})`}
        opacity="0.88"
      />

      <path
        d="M51 28.5 C60.5 30 81 26.5 82.5 17 C84 8.2 69.5 5.5 58.5 13.5 C54 16.8 51.5 22.5 50.5 28 Z"
        fill={`url(#${id('bow-right')})`}
        stroke="#854d0e"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
      <path
        d="M55.8 24.8 C62.8 25.2 74.5 22.5 75.5 17.2 C76.2 13 68.2 11.8 61.2 16.8 C58.2 19 56.5 22 55.8 24.8 Z"
        fill={`url(#${id('bow-inner')})`}
        opacity="0.88"
      />

      <path
        d="M21 14.2 C25.5 9.2 34.5 10 42.5 16.2"
        stroke="#ffffff"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M79 14.2 C74.5 9.2 65.5 10 57.5 16.2"
        stroke="#ffffff"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.9"
      />

      <rect
        x="44.2"
        y="21.8"
        width="11.6"
        height="10.8"
        rx="4"
        fill={`url(#${id('rib-sun')})`}
        stroke="#92400e"
        strokeWidth="0.8"
      />
      <path
        d="M46.5 23.6 H53.5"
        stroke="#ffffff"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.96"
      />

      {/* Sparkles */}
      <path
        d="M10.5 17.5 L12.2 12.8 L16.8 11 L12.2 9.2 L10.5 4.5 L8.8 9.2 L4.2 11 L8.8 12.8 Z"
        fill="#ffffff"
      />
      <path
        d="M89.5 16.5 L90.9 12.8 L94.5 11.5 L90.9 10.2 L89.5 6.5 L88.1 10.2 L84.5 11.5 L88.1 12.8 Z"
        fill="#a7f3d0"
      />
      <path
        d="M50 2 L51.2 5.5 L54.8 6.7 L51.2 7.9 L50 11.5 L48.8 7.9 L45.2 6.7 L48.8 5.5 Z"
        fill="#fef08a"
      />
    </svg>
  );
}
