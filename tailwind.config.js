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
        backdrop: "rgba(0, 0, 0, 0.5)",
      },
      fontSize: {
        headingL: ["56px", "71px"],
        headingM: ["24px", "31px"],
        headingS: ["20px", "26px"],
        headingXS: ["16px", "21px"],
        body: ["16px", "21px"],
      },
      boxShadow: {
        container: "0 10px 0px 0 rgba(0, 0, 0)",
        hoverContainer: "0 10px 0px 0 #5c2dd5",
      },
    },
    screens: {
      mini: { max: "374px" },
      mobile: { max: "670px", min: "375px" },
      tablet: { max: "768px", min: "671px" },
      laptop: { max: "1024px", min: "769px" },
      desktop: { max: "1440px", min: "1025px" },
    },
  },
  plugins: [],
};
