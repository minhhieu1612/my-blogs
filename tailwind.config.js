module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: (theme) => ({
        primary: theme.colors.lime
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
