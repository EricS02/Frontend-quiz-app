/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'rubik': ['Rubik', 'sans-serif'],
        },
        colors: {
          'custom-dark': "#313E51",
          'custom-grey': "#626C7F",
          'custom-light-grey': "#F4F6FA",
          'custom-orange': "#FFF5ED",
          'custom-light-green': "#E0FDEF",
          'custom-blue': "#EBF0FF",
          'custom-light-purple': "#F6E7FF",
          'custom-purple': "#A729F5",
          'custom-green': "#2FD887",
          'custom-red': "#EE5454",
        },
      },
    },
    plugins: [],
  }