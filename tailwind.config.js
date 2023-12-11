/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'header': ['Montserrat', 'sans-serif']
      }
    },
  },
  daisyui: {
    themes: ["halloween"],
  },
  plugins: [
    require("daisyui")
  ],
}

