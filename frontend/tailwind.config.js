/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#12233D',
          light: '#1B3357',
          soft: '#324966',
        },
        sand: {
          DEFAULT: '#F6F1E7',
          dark: '#EDE4D3',
        },
        amber: {
          DEFAULT: '#E8871E',
          dark: '#C46E12',
          light: '#F4A94D',
        },
        slate: {
          DEFAULT: '#5B6472',
        },
        verified: '#2F7D5E',
        rust: '#C24914',
      },
      fontFamily: {
        display: ['"Archivo"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'crate-lines': 'repeating-linear-gradient(135deg, rgba(18,35,61,0.035) 0px, rgba(18,35,61,0.035) 1px, transparent 1px, transparent 12px)',
      },
    },
  },
  plugins: [],
}
