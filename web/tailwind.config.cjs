/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 10.08%, #43E7AD 65.94%, #E1D55D 100%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
        'arrow-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) -5%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0) 105%)',
        'arrow-gradient-hover': 'linear-gradient(180deg, rgba(55, 55, 55, 0) 0%, rgba(55, 55, 55, 0.6) 50%, rgba(55, 55, 55, 0) 100%)'
      }
    },
  },
  plugins: [],
}
