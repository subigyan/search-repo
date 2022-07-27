module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: '"Roboto", "sans-serif"',
        Anton: " 'Anton', 'san-serif'",
        Bebas: "'Bebas Neue', 'cursive'",
        Exo: "'Exo 2', 'san-serif'",
        Poppins: "'Poppins', 'san-serif'",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
