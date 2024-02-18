/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'h-12',
    'w-12',
    'h-24',
    'w-24',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

