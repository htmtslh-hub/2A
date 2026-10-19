import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';

export interface ShinyTextProps {
  text: string;
  className?: string;
  baseColor?: string;
  shineColor?: string;
  speed?: number;
  spread?: number;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className = '',
  baseColor = '#64CEFB',
  shineColor = '#ffffff',
  speed = 3,
  spread = 100,
}) => {
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);

  useAnimationFrame((_, delta) => {
    const durationMs = Math.max(0.2, speed) * 1000;
    elapsedRef.current = (elapsedRef.current + delta) % durationMs;
    progress.set((elapsedRef.current / durationMs) * 100);
  });

  // Sweeps the white highlight continuously from left to right across the text
  const backgroundPosition = useTransform(progress, (p) => `${120 - p * 1.4}% center`);

  return (
    <motion.span
      id="shiny-heading-text"
      data-base-color={baseColor}
      data-shine-color={shineColor}
      data-speed={speed}
      data-spread={spread}
      className={`inline-block ${className}`}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${baseColor} 0%, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`,
        backgroundSize: '200% auto',
        backgroundPosition,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
