/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        copper: 'var(--copper)',
        'copper-dark': 'var(--copper-dark)',
        'copper-light': 'var(--copper-light)',
        sand: 'var(--sand)',
        paper: 'var(--paper)',
        line: 'var(--line)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}