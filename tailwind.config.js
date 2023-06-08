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
    },
  },
  plugins: [],
};
