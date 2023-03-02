/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  mode:"jit",
//the purgr property is used to remove unused css from the final build

  content: [
    "./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("flowbite")
  ],
  theme: {
    extend: {
      colors: {
        mainColor:"#22546D",
        themeColor:"#54A2C9",
        hoverColor:'#cee4ef',
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
        gray: colors.neutral
      },
      width:{
        '568':'142rem'
      }
    },
  },
  plugins: [],
}
