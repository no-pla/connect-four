/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        darkPurple: "#5c2dd5",
        purple: "#7945ff",
        red: "#fd6687",
        white: "#ffffff",
        yellow: "#ffce67",
      },
      fontSize: {
        headingL: ["56px", "71px"],
        headingM: ["24px", "31px"],
        headingS: ["20px", "26px"],
        headingXS: ["16px", "21px"],
        body: ["16px", "21px"],
      },
    },
  },
  plugins: [],
};
