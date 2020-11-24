const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.vue'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        teal: colors.teal,
        blueGray: colors.blueGray
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
