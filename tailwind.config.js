/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const forms = require('@tailwindcss/forms');
const lineClamp = require('@tailwindcss/line-clamp');

/**
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: [
    './src/components/**/*.@(tsx|ts)',
    './src/containers/**/*.@(tsx|ts)',
    './src/pages/**/*.tsx',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      100: '#fff9d4',
      200: '#fff3a9',
      300: '#ffed7e',
      400: '#ffe753',
      500: '#ffe229',
      600: '#ccb420',
      700: '#998718',
      800: '#665a10',
      900: '#332d08',
      'light-gray': '#EDECEF',
      'middle-gray': '#CCCCCC',
      green: '#2BA4A0',
    },
    fontSize: {
      '2xs': '0.625rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '3rem',
      '4xl': '4rem',
      '5xl': '5rem',
    },
    fontFamily: {
      sans: 'Inter, sans-serif',
      serif: 'Baskerville, serif',
    },
    borderRadius: {
      none: '0',
      xs: '0.0625rem',
      sm: '0.125rem',
      default: '0.3125rem',
      lg: '0.5rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      full: '9999px',
    },
    dropShadow: {
      yellow: '0 0 10px #ffe229',
    },
    extend: {
      animation: {
        fade: 'fadeInOut 1.5s ease-in-out',
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: 0, transform: 'translateY(100%)' },
          '25%': { opacity: 1, transform: 'translateY(0)' },
          '75%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [forms, lineClamp],
};
