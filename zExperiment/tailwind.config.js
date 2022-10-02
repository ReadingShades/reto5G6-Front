/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./views/**/*.{html,js}",
    "./js/**/*.{html,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}