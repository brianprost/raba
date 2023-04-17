/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {},
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
  daisyui: {
    themes: [
      {
        2023: {
          primary: "#5E94C4",
          secondary: "#D03D45",
          accent: "#B3A5CE",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#5E94C4",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
