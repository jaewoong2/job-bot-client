module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'rgb(185, 228, 244)',
          200: 'rgb(165, 219, 244)',
          300: 'rgb(146, 210, 244)',
          base: 'rgb(127, 201, 244 )',
          400: 'rgb(108, 192, 244)',
          500: 'rgb(89, 183, 244 )',
          600: 'rgb(70, 174, 244 )',
          700: 'rgb(51, 165, 244 )',
          800: 'rgb(32, 156, 244 )',
          900: 'rgb(13, 147, 244 )',
        },
      },
      keyframes: {
        'fade-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-up': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-out-up': 'fade-out-up 0.5s ease-out',
        'fade-in-left': 'fade-in-left 0.5s ease-out',
      },
      gridTemplateColumns: {
        main: '4fr 12fr 4fr',
      },
    },
  },
  plugins: [],
}
