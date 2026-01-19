/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vehicle-dark': '#1a1a1a',
        'vehicle-gray': '#2a2a2a',
        'vehicle-blue': '#5B7FFF',
      }
    },
  },
  plugins: [],
}