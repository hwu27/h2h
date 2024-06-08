/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1128px",
      },
      height: {
        "screen-75": "75vh",
        "screen-full": "100vh",
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(90deg, #5de0e6, #004aad)',
      },
      animation: {
        'dropdown': 'dropdown 0.5s ease-in-out'
      },
    },
  },
  plugins: [],
};
