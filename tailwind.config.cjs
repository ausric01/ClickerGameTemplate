/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        enlarge1: {
          "0%": {
            transform: "scale(1)",
          },
          "33%": {
            transform: "scale(1.25) rotate(-5deg)",
          },
          "33%": {
            transform: "scale(1.25)",
          },
          "100%": {
            transform: "scale(1) rotate(5deg)",
          },
        },
      },
      animation: {
        enlarge1: "enlarge1 0.1s ease-in-out",
      },
    },
  },
  plugins: [],
};
