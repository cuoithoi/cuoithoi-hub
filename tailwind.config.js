/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
    colors: {
      main: '#91ADA3',
      white: '#fff',
      second: '#F38723',
      text: '#585858',
      'main-bg': 'rgba(167, 189, 181, 0.15)',
      'bg-appear': 'rgba(0, 0, 0, 0.1',
    },
    screens: {
      xs: '450px',
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}
