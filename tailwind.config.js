/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
      },
      backgroundColor: {
        humrroBlue: "#007DB7",
        humrroNavy: "#003E74",
        humrroLimeGreen: "#96C121",
        humrroForestGreen: "#4C9C2E",
        humrroYellow: "#FFCD01",
        humrroOrange: "#FF8300",
      },
      textColor: {
        humrroBlue: "#007DB7",
        humrroNavy: "#003E74",
        humrroLimeGreen: "#96C121",
        humrroForestGreen: "#4C9C2E",
        humrroYellow: "#FFCD01",
        humrroOrange: "#FF8300",
      },
      borderColor: {
        humrroBlue: "#007DB7",
        humrroNavy: "#003E74",
        humrroLimeGreen: "#96C121",
        humrroForestGreen: "#4C9C2E",
        humrroYellow: "#FFCD01",
        humrroOrange: "#FF8300",
      },
    },
  },
  plugins: [],
};
