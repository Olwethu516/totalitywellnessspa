/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf8ef',
          100: '#f9edda',
          200: '#f0d9b5',
          300: '#e8c96a',
          400: '#d4b44e',
          500: '#C9A84C',
          600: '#b08f3a',
          700: '#8c712e',
          800: '#6b5623',
          900: '#4a3b18',
        },
        spa: {
          green: '#5a9e6a',
          'green-light': '#7ab88a',
          'green-dark': '#4a8e5a',
          dark: '#0e0e0e',
          darker: '#080808',
          cream: '#faf8f3',
        },
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'serif'],
        body: ['system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
