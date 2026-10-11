/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          canvas: '#FCEFEF',
          paper: '#FFFDF9',
          cream: '#FAF7F2',
          subtle: '#F4EFEA',
          ink: '#1E1E24',
          'ink-muted': '#52525B',
          'ink-light': '#8E8E93',
          pink: '#F472B6',
          'pink-light': '#FCE7F3',
          'pink-deep': '#BE185D',
          purple: '#DDD6FE',
          'purple-deep': '#7C3AED',
          yellow: '#FEF08A',
          'yellow-deep': '#B45309',
          mint: '#D1FAE5',
          'mint-deep': '#047857'
        },
        cly: {
          bg: '#FAF7F2',
          card: '#FFFDF9',
          panel: '#FAF7F2',
          border: '#1E1E24',
          'border-highlight': '#1E1E24',
          cyan: '#BE185D',
          indigo: '#7C3AED',
          violet: '#A855F7',
          amber: '#D97706',
          emerald: '#059669',
          rose: '#E11D48'
        }
      },
      boxShadow: {
        'retro-xs': '1.5px 1.5px 0px #1E1E24',
        'retro-sm': '2px 2px 0px #1E1E24',
        'retro': '3px 3px 0px #1E1E24',
        'retro-md': '4px 4px 0px #1E1E24',
        'retro-lg': '6px 6px 0px #1E1E24',
        'retro-xl': '8px 8px 0px #1E1E24',
        'cly-card': '4px 4px 0px #1E1E24',
        'cly-glow-cyan': '2px 2px 0px #1E1E24',
        'cly-glow-indigo': '2px 2px 0px #1E1E24',
        'cly-ai-orb': '3px 3px 0px #1E1E24'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
