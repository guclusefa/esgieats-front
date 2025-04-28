/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      ...defaultTheme.screens,
      xxxs: '256px',
      xxs: '320px',
      xs: '484px'
    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      DEFAULT: '3px'
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        white: {
          DEFAULT: '#ffffff',
          darkend: '#f2f2f2',
          darker: '#e5e5e5',
          darkest: '#d8d8d8'
        },
        black: {
          lightest: '#262626',
          lighter: '#191919',
          lightend: '#0c0c0c',
          DEFAULT: '#000000'
        },
        primary: {
          lightest: '#fac524',
          lighter: '#fac217',
          lightend: '#fabe0a',
          DEFAULT: '#F2B705',
          darkend: '#e6ae05',
          darker: '#daa505',
          darkest: '#ce9c04'
        },
        danger: {
          lightest: '#f45353',
          lighter: '#f34949',
          lightend: '#f33f3f',
          DEFAULT: '#F23535',
          darkend: '#f12727',
          darker: '#f01919',
          darkest: '#ec0f0f'
        },
      }
    }
  }
};