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
  title = 'Tải miễn phí',
}: FreeGiftIconProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const id = (name: string) => `dl-${rawId}-${name}`;

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
        filter: 'drop-shadow(0 2px 8px rgba(52, 211, 153, 0.36))',
      }}
    >
      <title>{title}</title>
      <defs>
        <radialGradient id={id('aura')} cx="50%" cy="52%" r="46%">
          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.55" />
          <stop offset="48%" stopColor="#10b981" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={id('arrow-left')} x1="22" y1="10" x2="50" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="22%" stopColor="#d1fae5" />
          <stop offset="58%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        <linearGradient id={id('arrow-right')} x1="50" y1="10" x2="78" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="35%" stopColor="#34d399" />
          <stop offset="75%" stopColor="#059669" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>

        <linearGradient id={id('arrow-stroke')} x1="22" y1="10" x2="78" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#a7f3d0" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>

        <linearGradient id={id('tray-top')} x1="14" y1="60" x2="86" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ecfdf5" />
          <stop offset="30%" stopColor="#6ee7b7" />
          <stop offset="70%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        <linearGradient id={id('tray-front')} x1="14" y1="76" x2="86" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>

        <radialGradient id={id('pool')} cx="50%" cy="74%" r="30%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#6ee7b7" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Glow */}
      <circle cx="50" cy="52" r="44" fill={`url(#${id('aura')})`} />

      {/* 3D Download Tray / Dock */}
      <path
        d="M14 64 C14 60.5 16.8 58 20.2 58 H25.8 C29.2 58 31.8 60.5 31.8 64 V72.5 C31.8 74.2 33.2 75.5 35 75.5 H65 C66.8 75.5 68.2 74.2 68.2 72.5 V64 C68.2 60.5 70.8 58 74.2 58 H79.8 C83.2 58 86 60.5 86 64 V79 C86 85.2 81.2 90 75 90 H25 C18.8 90 14 85.2 14 79 Z"
        fill={`url(#${id('tray-front')})`}
        stroke="#047857"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />

      <path
        d="M14 61 C14 57.7 16.7 55 20 55 H25.5 C28.8 55 31.5 57.7 31.5 61 V70 C31.5 72.2 33.3 74 35.5 74 H64.5 C66.7 74 68.5 72.2 68.5 70 V61 C68.5 57.7 71.2 55 74.5 55 H80 C83.3 55 86 57.7 86 61 V75 C86 81.1 81.1 86 75 86 H25 C18.9 86 14 81.1 14 75 Z"
        fill={`url(#${id('tray-top')})`}
        stroke="#a7f3d0"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />

      <ellipse cx="50" cy="75" rx="22" ry="4.2" fill={`url(#${id('pool')})`} />

      <path
        d="M17.5 57.5 H25 M75 57.5 H82.5 M24 83.2 H76"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.88"
      />

      <ellipse cx="50" cy="70.5" rx="11" ry="2.6" fill="#022c22" opacity="0.38" />

      {/* 3D Faceted Download Arrow */}
      <path
        d="M50 8 H41 C38.8 8 37 9.8 37 12 V36 H23.5 C20.8 36 19.4 39.2 21.3 41.2 L47.6 67.5 C48.3 68.2 49.1 68.6 50 68.6 Z"
        fill={`url(#${id('arrow-left')})`}
      />

      <path
        d="M50 8 H59 C61.2 8 63 9.8 63 12 V36 H76.5 C79.2 36 80.6 39.2 78.7 41.2 L52.4 67.5 C51.7 68.2 50.9 68.6 50 68.6 Z"
        fill={`url(#${id('arrow-right')})`}
      />

      <path
        d="M37 36 L50 48 L63 36 Z"
        fill="#ffffff"
        opacity="0.18"
      />
      <path
        d="M23.5 38.5 L50 65 L50 54.5 L39.5 44 V10.5 H37 V38.5 Z"
        fill="#ffffff"
        opacity="0.24"
      />

      <path
        d="M41 8 H59 C61.2 8 63 9.8 63 12 V36 H76.5 C79.2 36 80.6 39.2 78.7 41.2 L52.4 67.5 C51.1 68.8 48.9 68.8 47.6 67.5 L21.3 41.2 C19.4 39.2 20.8 36 23.5 36 H37 V12 C37 9.8 38.8 8 41 8 Z"
        stroke={`url(#${id('arrow-stroke')})`}
        strokeWidth="1.35"
        strokeLinejoin="round"
      />

      <path
        d="M50 9.2 V67.2"
        stroke="#ecfdf5"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.9"
      />

      <path
        d="M40 10.5 H50 M24 38.2 H37"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.95"
      />
    </svg>
  );
}
