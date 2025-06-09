/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  important: true,
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        success: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'Segoe UI Variable',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        modern: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        4.5: '18px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities, addComponents }) {
      addUtilities({
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      });

      addComponents({
        '.glass-effect': {
          '@apply bg-white/80 backdrop-blur-xl border border-neutral-200/60': {},
          '.dark &': {
            '@apply bg-black/80 border-neutral-800/60': {},
          },
        },
        '.card-modern': {
          '@apply bg-white rounded-2xl shadow-soft border border-neutral-200/50 transition-all duration-300': {},
          '.dark &': {
            '@apply bg-neutral-950 border-neutral-800/50': {},
          },
          '&:hover': {
            '@apply shadow-medium': {},
          },
        },
        '.btn-primary': {
          '@apply bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-medium py-3 px-6 rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary-500/20':
            {},
        },
        '.btn-secondary': {
          '@apply bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium py-3 px-6 rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 ease-out':
            {},
          '.dark &': {
            '@apply bg-neutral-800 hover:bg-neutral-700 text-neutral-100': {},
          },
        },
        '.btn-ghost': {
          '@apply bg-transparent hover:bg-neutral-100 text-neutral-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 ease-out':
            {},
          '.dark &': {
            '@apply hover:bg-neutral-800 text-neutral-300': {},
          },
        },
      });
    }),
  ],
};
