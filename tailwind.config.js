const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        GOLD_WHITE: "#FEFDE8",
        GOLD_MAIN: "#A06A08",
        GOLD_DARK: "#C89305",
        GOLD_BLACK: "#1F1503",
        BLACK: "#0C0B0A",
        WHITE: "#FFFFFF",
        GRAY_100: "#F5F5F5",
        GRAY_800: "#1B1917",
        GRAY_500: "#616161",
        GRAY_400: "#757575",
      },
      fontFamily: {
        display: '"Lato", sans-serif',
        body: '"Roboto", sans-serif',
      },
      fontSize: {
        sm10: "0.625rem",
        sm12: "0.75rem",
        sm14: "0.875rem",
        sub24: "1.5rem",
        sub32: "2rem",
        sub40: "2.5rem",
        sub48: "3rem",
        sub56: "3.5rem",
        caption16: "1rem",
        caption18: "1.125rem",
        body14: "0.875rem",
        body16: "1rem",
        body18: "1.125rem",
        body20: "1.25rem",
        button16: "1rem",
        button18: "1.125rem",
        head24: "1.5rem",
        head32: "2rem",
        head40: "2.5rem",
        head48: "3rem",
        head56: "3.5rem",
        head64: "4rem",
      },
      backgroundImage: {
        "auth-side-image": "url('../src/assets/side_image_auth.png')",
      },
    },
  },
});
