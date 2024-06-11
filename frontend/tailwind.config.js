/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1128px',
      },
      height: {
        '0.5': '0.125rem',
        'screen-10': '10vh',
        'screen-15': '15vh',
        'screen-75': '75vh',
        'screen-85': '85vh',
        'screen-90': '90vh',
        'screen-full': '100vh',
        '140': '35rem',
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(90deg, #5de0e6, #004aad)',
      },
      animation: {
        'dropdown': 'dropdown 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
