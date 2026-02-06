/** @type {import('tailwindcss').Config} */
module.exports = {
  // Sprawdź, czy ścieżki pasują do Twojej struktury folderów!
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./<ewentualny-inny-folder>/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
