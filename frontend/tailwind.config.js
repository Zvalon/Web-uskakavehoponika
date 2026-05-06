/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:          '#1F3A2E',
        'ink-soft':   '#3A5346',
        parchment:    '#F5EFE0',
        'parchment-2':'#EFE6D2',
        'parchment-3':'#E9DEC0',
        honey:        '#E8A23C',
        'honey-soft': '#F4C77B',
        'honey-deep': '#C7842A',
        'dark-wood':  '#110a04',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['"Outfit"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
