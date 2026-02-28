/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#812268',
        'primary-light': '#a63d8a',
        'primary-dark': '#5e1a4d',
        secondary: '#B8860B',
        'secondary-light': '#d4a017',
        cream: '#FFF8F0',
        'cream-dark': '#F5EDE3',
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
