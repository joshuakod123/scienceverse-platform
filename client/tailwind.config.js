// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'dutch-white': '#EFDFBB',
          'wine': '#722F37',
          'space-blue': '#0B1026',
          'space-blue-light': '#1A2348',
          'space-purple': '#1E0538',
          'accent-orange': '#E85A4F',
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
          mono: ['Orbitron', 'monospace'],
        },
        boxShadow: {
          card: '0 4px 10px rgba(0, 0, 0, 0.1)',
          hover: '0 10px 20px rgba(0, 0, 0, 0.15)',
        },
        transitionProperty: {
          'height': 'height',
          'spacing': 'margin, padding',
        }
      },
    },
    plugins: [],
  }