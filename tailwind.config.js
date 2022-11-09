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
        200: '#D2D1CE',
        500: '#6D6D6D',
      },
      green: {
        100: '#E2FBE8',
        500: '#3C7E44'
      },
      yellow: {
        100: '#FCF3CC'
      },
      brown: {
        100: '#A85923'
      },
      red: {
        100: '#F9E3E2',
        500: '#AA2E26'
      }
    },
    extend: {}
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography')
  ]
}
