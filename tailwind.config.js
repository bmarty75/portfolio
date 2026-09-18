/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        navy: { DEFAULT: '#0F2A4A', dark: '#0A1D35' },
        accent: { DEFAULT: '#1D4ED8', light: '#60A5FA' },
        night: '#0B1222',
      },
    },
  },
  plugins: [],
}
