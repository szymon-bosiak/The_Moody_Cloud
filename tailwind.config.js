/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
        "night": "#2C3543",
        "day": "#9DCBD2",
        "background": "#1F282F",
      },
      fontSize: {
        huge: '28rem',
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
      SquadaOne: ["Squada One, cursive"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
