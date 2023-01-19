/** @type {import('tailwindcss').Config} */
module.exports = {
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
    extend: {},
  },
  plugins: [],
}
