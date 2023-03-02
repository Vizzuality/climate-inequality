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
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
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
    },
    fontSize: {
      '2xs': '0.625rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
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
  },
  plugins: [forms, lineClamp],
};
