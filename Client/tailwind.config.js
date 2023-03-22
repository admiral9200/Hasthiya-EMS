/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'screen-2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
  
        'screen-xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }
  
        'screen-lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
  
        'screen-md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }
  
        'screen-sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
      }
    },
  },
  plugins: [],
}