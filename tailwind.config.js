/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#070707',
        'background-secondary': '#0f0f0f',
        'background-tertiary': '#181818',
        surface: '#121212',
        'surface-hover': '#1f1f1f',
        primary: '#bfa56a',
        'primary-hover': '#d8c894',
        accent: '#f1e4c8',
        'accent-secondary': '#73829c',
        text: '#f5f3ee',
        'text-secondary': '#bfb8a5',
        'text-muted': '#8f8a7d',
        border: '#2d2d2d',
        'border-light': '#3c3c3c',
      },
      fontFamily: {
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'pulse-slow': 'pulse 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}