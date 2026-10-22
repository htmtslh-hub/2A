'use client';
import React from 'react';

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
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
      stroke="#34d399"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
      }}
    >
      <title>{title}</title>
      <path d="M12 3.5v11.5" />
      <path d="m7.5 11 4.5 4.5 4.5-4.5" />
      <path d="M4.5 17v1.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V17" />
    </svg>
  );
}
