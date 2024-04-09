/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        "dark-purple": "#081A51",
        "light-white": 'rgba(255, 255, 255, 0.18)',
        "blue-dark": '#222647',
        "blue-primary": '#007bff',
        "close-btn": '#5C636A'
      }
    },
  },
  plugins: [require("daisyui")],
}