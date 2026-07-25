/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A2463',
          dark: '#06163F',
          light: '#1E3A8A'
        },
        accent: {
          DEFAULT: '#F59E0B',
          hover: '#D97706'
        }
      }
    },
  },
  plugins: [],
}
