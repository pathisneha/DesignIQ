/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#111827', // Deep Slate
        primary: '#6366F1', // Indigo
        primaryHover: '#4F46E5',
        accent: '#F59E0B', // Amber
        danger: '#EF4444', 
        warning: '#F59E0B', 
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 0% 0%, hsla(225,25%,15%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(245,45%,25%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(35,65%,20%,1) 0, transparent 50%)',
      },
    },
  },
  plugins: [],
}
