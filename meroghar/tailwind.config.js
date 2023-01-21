/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:"jit",
//the purgr property is used to remove unused css from the final build
  content: [
    './src/app/**/*.tsx',
    // add more paths
    './src/components/**/*.tsx',
],


  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
        gray: colors.neutral
      }
    },
  },
  plugins: [],
}
