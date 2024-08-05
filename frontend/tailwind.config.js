/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        fjalla: "Fjalla One",
      },
      backgroundImage: {
        "gif-background": "url('./src/assets/images/Background-2.gif')",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],
};
