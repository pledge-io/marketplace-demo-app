/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/views/**/*.ejs'
  ],
  theme: {
    container: {
      center: true
    },
    colors: {
      white: '#fff',
      blue: '#0569FF',
      gray: {
        200: '#D2D1CE'
      }
    },
    extend: {}
  },
  plugins: []
}
