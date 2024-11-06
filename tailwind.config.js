/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        customCin: ["Cinzel"],
        customAnt: ["Anton SC"]
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

