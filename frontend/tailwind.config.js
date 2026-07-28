/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // Keeps your existing custom CSS safe from being broken
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}