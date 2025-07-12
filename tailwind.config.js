/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'chat-blue': '#007AFF',
        'chat-gray': '#F2F2F7',
        'chat-text': '#000000',
        'chat-secondary': '#8E8E93',
      },
    },
  },
  plugins: [],
}