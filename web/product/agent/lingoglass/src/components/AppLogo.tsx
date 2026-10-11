import React from 'react';

interface AppLogoProps {
  size?: number;
  className?: string;
  variant?: 'crystal' | 'lens' | 'glasses' | 'bird';
  showShadow?: boolean;
}

/**
 * LingoGlass Official App Logo (Concept 4: Crystal Prism Monogram "LG")
 * 3D Faceted Diamond Crystal Prism Monogram on Radiant Sunset Squircle.
 */
export const AppLogo: React.FC<AppLogoProps> = ({
  size = 32,
  className = '',
  variant = 'crystal',
  showShadow = true
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Sunset Radiant Gradient */}
          <linearGradient id="c4SunsetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>

          {/* Crystal Prism Facet Gradients */}
          <linearGradient id="facetWhite" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F1F5F9" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="facetCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>

          <linearGradient id="facetPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#FCE7F3" />
          </linearGradient>

          <linearGradient id="facetAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>

          <linearGradient id="facetDeep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>

        {/* 1. Offset Hard Drop Shadow */}
        {showShadow && (
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="22"
            fill="#1E1E24"
          />
        )}

        {/* 2. Squircle Canvas Background */}
        <rect
          x="6"
          y="6"
          width="84"
          height="84"
          rx="22"
          fill="url(#c4SunsetGrad)"
          stroke="#1E1E24"
          strokeWidth="3.5"
        />

        {/* 3. Subtle Gloss Arc Highlight */}
        <path
          d="M 16 28 C 16 18, 24 14, 36 12 C 50 10, 72 10, 80 16"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* Concept 4: Crystal Prism Monogram "LG" */}
        {variant === 'crystal' && (
          <g>
            {/* --- Letter 'L' (3D Diamond Crystal Facets) --- */}
            {/* L Vertical Left Facet */}
            <polygon
              points="25,28 32,28 32,68 25,68"
              fill="url(#facetCyan)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            {/* L Vertical Main Front Facet */}
            <polygon
              points="32,28 37,33 37,63 32,68"
              fill="url(#facetWhite)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            {/* L Vertical Top Crown */}
            <polygon
              points="25,28 32,24 37,28 32,28"
              fill="#FFFFFF"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            {/* L Horizontal Base Foot - Top Facet */}
            <polygon
              points="32,68 37,63 49,63 45,68"
              fill="url(#facetAmber)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            {/* L Horizontal Base Foot - Front Facet */}
            <polygon
              points="25,68 45,68 49,74 25,74"
              fill="url(#facetPink)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            {/* L Corner Refraction Bevel */}
            <polygon
              points="32,68 37,63 37,68"
              fill="#FFFFFF"
              opacity="0.8"
            />

            {/* --- Letter 'G' (Faceted Crystalline Loop) --- */}
            {/* G Top-Left Curve Facets */}
            <polygon
              points="53,38 60,26 68,26 62,38"
              fill="url(#facetWhite)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            {/* G Top Right Crown Facet */}
            <polygon
              points="68,26 77,34 70,41 62,38"
              fill="url(#facetPink)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            {/* G Outer Right Arc Bevel */}
            <polygon
              points="77,34 77,46 70,45 70,41"
              fill="url(#facetCyan)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            {/* G Left Vertical Body Facet */}
            <polygon
              points="53,38 62,38 60,62 51,56"
              fill="url(#facetDeep)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            <polygon
              points="45,46 53,38 51,56 45,52"
              fill="url(#facetWhite)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            {/* G Bottom Curve Facets */}
            <polygon
              points="45,52 51,56 60,68 53,74"
              fill="url(#facetAmber)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            <polygon
              points="60,68 69,68 73,74 53,74"
              fill="url(#facetPink)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            <polygon
              points="69,68 76,60 78,66 73,74"
              fill="url(#facetCyan)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            {/* G Inner Shelf / Horizontal Crossbar */}
            <polygon
              points="64,52 77,52 77,58 64,58"
              fill="url(#facetWhite)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />
            <polygon
              points="73,58 77,58 76,66 72,66"
              fill="url(#facetDeep)"
              stroke="#1E1E24"
              strokeWidth="1.2"
            />

            {/* Specular Sparkle Stars (Prismatic Glints) */}
            <g transform="translate(73, 26)">
              <polygon points="0,-4 1,-1 4,0 1,1 0,4 -1,1 -4,0 -1,-1" fill="#FFFFFF" />
            </g>
            <g transform="translate(35, 30)">
              <polygon points="0,-3 1,-1 3,0 1,1 0,3 -1,1 -3,0 -1,-1" fill="#FFFFFF" />
            </g>
            <g transform="translate(68, 62)">
              <polygon points="0,-3 1,-1 3,0 1,1 0,3 -1,1 -3,0 -1,-1" fill="#FFFFFF" />
            </g>
          </g>
        )}

        {/* Fallback Variant: Lens */}
        {variant === 'lens' && (
          <g>
            <circle cx="45" cy="45" r="24" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="4" />
            <line x1="62" y1="62" x2="78" y2="78" stroke="#1E1E24" strokeWidth="7" strokeLinecap="round" />
            <polygon points="41,35 41,55 57,45" fill="#BE185D" stroke="#1E1E24" strokeWidth="2.5" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default AppLogo;
