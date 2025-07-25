/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',   
        hover: '#2563eb',  
        background: '#F9FAFB', 
      },
    },
  },
  plugins: [],
};
