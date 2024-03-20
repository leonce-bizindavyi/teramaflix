/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode : 'class',
  theme: {
    extend: {
      fontFamily: {
        default: ['Poppins', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      colors : {
        "dark" :'#232A3C',
        "medium" : '#293245'
     },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
