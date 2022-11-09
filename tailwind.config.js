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
      cornflower: '#D4F8FB',
      gray: {
        100: '#F9F9F9',
        200: '#D2D1CE'
      }
    },
    extend: {}
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography')
  ]
}
