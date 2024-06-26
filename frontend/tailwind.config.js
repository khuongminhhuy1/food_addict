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
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],
};
