/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundImage: {
      emailing: "url('./image/email.png')",
    },
    fontFamily: {
      poppins: ["Poppins"],
      roboto: ["Roboto"],
    },
    animation: {
      spin: "spin 1s linear infinite",
      runOutOfTime: "runOutOfTime 4.5s linear forwards",
    },
    keyframes: {
      runOutOfTime: {
        "0%": { width: "100%" },
        "100%": { width: "0%" },
      },
      spin: {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
    },
  },
  plugins: [],
};
