/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",
        ink: "#20202F",
        muted: "#89899B",
        primary: "#635BFF",
      },
    },
  },
  plugins: [],
};
