/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        pitch:  '#2C2C2C',   // dark surface
        goal:   '#12B968',   // primary green
        ball:   '#F48C06',   // accent orange
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans:    ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'slide-up':    'slideUp 0.6s cubic-bezier(0.16,1,0.3,1)',
        'fade-in':     'fadeIn 0.4s ease-out',
        'spin-slow':   'spinCW 35s linear infinite',
        'spin-medium': 'spinCW 22s linear infinite',
        'spin-fast':   'spinCW 14s linear infinite',
        'spin-rev':    'spinCCW 28s linear infinite',
        'pulse-glow':  'pulseGlow 3.5s ease-in-out infinite',
        'scan':        'scan 6s ease-in-out infinite',
      },
      keyframes: {
        slideUp:   { from: { opacity: '0', transform: 'translateY(28px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        spinCW:    { from: { transform: 'rotate(0deg)'   }, to: { transform: 'rotate(360deg)'  } },
        spinCCW:   { from: { transform: 'rotate(0deg)'   }, to: { transform: 'rotate(-360deg)' } },
        pulseGlow: { '0%,100%': { transform: 'scale(1)',    opacity: '0.7' }, '50%': { transform: 'scale(1.06)', opacity: '1'   } },
        scan:      { '0%,100%': { transform: 'translateY(-120px)', opacity: '0' }, '50%': { transform: 'translateY(120px)',  opacity: '0.6' } },
      },
    },
  },
  plugins: [],
}
