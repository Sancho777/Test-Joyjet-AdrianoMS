// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7aa4a9',       // background
        secondary: '#153f65',     // progress bar, highlights
        card: '#f1f2ec',           // buttons, quiz boxes
        success: '#968089',        // correct answers
        danger: '#ab4e6b',         // incorrect answers
        text: '#3a5336',           // quiz text color
      },
      fontFamily: {
        sans: ['"Roboto Slab"', 'serif'], // main font
      },
      spacing: {
        'button-height': '4em',
      },
      borderRadius: {
        sm: '3px',
      },
    },
  },
  plugins: [],
};
