/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryPink: '#e59494',
        secondaryPink: '#ffc8c8',
        beige: '#ede9e3',
        grey: '#9b9b9b',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        fontTitle: ['x', 'y'],
        fontNav: ['x', 'y'],
        fontParra: ['x', 'y'] // Hay que importarlas en el postcss.config
      }
    },
  },
  plugins: [],
}