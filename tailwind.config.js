/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBg: {
          100: '#585a5d',
          200: '#3f4245',
          300: '#282a2d',
          400: '#202124',
          500: '#1e1f21',
          600: '#1c1d1f',
          700: '#1a1b1d',
          800: '#18191b',
          900: '#161718',
        },
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
        'cloud-right': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },

        'cloud-up-down': {
          '0%': {
            transform: 'translate(0px, 0px)',
          },
          '25%': {
            transform: 'translate(-20px, 20px)',
          },
          '50%': {
            transform: 'translate(-10px, 0px)',
          },
          '75%': {
            transform: 'translate(-40px, 20px)',
          },
          '100%': {
            transform: 'translate(0px, 0px)',
          },
        },

        'cloud-up-down-reverse': {
          '0%': {
            transform: 'translate(0px, 0px)',
          },
          '25%': {
            transform: 'translate(20px, 20px)',
          },
          '50%': {
            transform: 'translate(10px, 0px)',
          },
          '75%': {
            transform: 'translate(40px, 20px)',
          },
          '100%': {
            transform: 'translate(0px, 0px)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-out-up': 'fade-out-up 0.5s ease-out',
        'fade-in-left': 'fade-in-left 0.5s ease-out',
        cloud: 'cloud-up-down 10s linear infinite',
        'cloud-reverse': 'cloud-up-down-reverse 10s linear infinite',
      },
      gridTemplateColumns: {
        main: '4fr 12fr 4fr',
      },
    },
  },
  plugins: [],
}
