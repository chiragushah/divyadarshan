import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          50:  '#FFF5F5',
          100: '#FFE0E0',
          200: '#FFC5C5',
          300: '#FF9494',
          400: '#FF5757',
          500: '#FF2323',
          600: '#C00',
          700: '#8B0000',
          800: '#5C0F0F',
          900: '#3D0808',
          950: '#1A0303',
        },
        gold: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#9A7535',
          600: '#7C5F2A',
          700: '#5C4520',
          light: '#EDD9A3',
          dark:  '#7C5F2A',
        },
        ivory: {
          DEFAULT: '#FAF7F2',
          50:  '#FDFCFA',
          100: '#FAF7F2',
          200: '#F5EFE4',
          300: '#EDE3D0',
        },
        parchment: '#F5EFE4',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Outfit', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'card':  '0 1px 3px rgba(18,10,6,.06), 0 1px 2px rgba(18,10,6,.04)',
        'card-hover': '0 4px 16px rgba(18,10,6,.10), 0 2px 6px rgba(18,10,6,.06)',
        'nav':   '0 2px 8px rgba(18,10,6,.15)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      backgroundImage: {
        'crimson-gradient': 'linear-gradient(135deg, #3D0808 0%, #5C0F0F 100%)',
        'gold-gradient': 'linear-gradient(135deg, #9A7535 0%, #7C5F2A 100%)',
      },
      animation: {
        'fade-in': 'fadeIn .2s ease-out',
        'slide-up': 'slideUp .25s ease-out',
        'pulse-live': 'pulseLive 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:   { from: { transform: 'translateY(8px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        pulseLive: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.5' } },
      },
    },
  },
  plugins: [],
}

export default config
