/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [{
      mytheme: {
        
"primary": "#FF9933",
        
"secondary": "#FF7F00",
        
"accent": "#007BFF",
        
"neutral": "#999999",
        
"base-100": "#F7F7F7",
        
"info": "#007BFF",
        
"success": "#00CC66",
        
"warning": "#FFCC00",
        
"error": "#FF0000",
        },
      },],
  },
  plugins: [
    require('daisyui'),
  ],
}

