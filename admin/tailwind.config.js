/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#2B8C84',
        backgroundc: '#D5F1ED',
      }
    },
  },
  plugins: [],
}