/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {

        animation: {
          'fade-in': 'fadeIn 1s ease-in-out',
          'slide-up': 'slideUp 0.8s ease-out',
          'scale-in': 'scaleIn 0.6s ease-out',
          'float': 'float 6s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0',transform: 'translateY(20px)', },
            '100%': { opacity: '1', transform: 'translateY(0)', },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          scaleIn: {
            '0%': { transform: 'scale(0.95)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        },
      },
    },
    plugins: [],
  }
  