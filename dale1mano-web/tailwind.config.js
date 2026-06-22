/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de marca Dale1Mano
        brand: {
          blue:        '#0b31a8',
          'blue-dark': '#09278a',
          'blue-light':'#1e3a8a',
          orange:      '#e0531c',
          'orange-dark':'#c44618',
          'orange-light':'#f06732',
        },
      },
    },
  },
  plugins: [],
}