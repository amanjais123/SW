// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-left-bottom': {
          '0%': { opacity: '0', transform: 'translate(-60px, 60px)' },
          '100%': { opacity: '1', transform: 'translate(0, 0)' },
        },
      },
      animation: {
        'fade-in-left-bottom':
          'fade-in-left-bottom 1.2s cubic-bezier(.23,1.23,.59,.96) forwards',
      },
    },
  },
  plugins: [],
}
