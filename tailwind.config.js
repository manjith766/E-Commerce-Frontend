/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cinema-bg': '#101114',
        'cinema-surface': '#191A1E',
        'cinema-deep': '#0B0C0E',
        'cinema-card': '#1C1D22',
        'cinema-orange': '#E87532',
        'cinema-orange-dark': '#C95E24',
        'cinema-orange-rust': '#A64F27',
        'cinema-cream': '#F5F0E8',
        'cinema-cream-light': '#FAF6F0',
        'cinema-muted': '#A6A29B',
        'cinema-light': '#F4F0E9',
        'primary-color': '#E87532',
        'secondary-color': '#C95E24',
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        editorial: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 35px -5px rgba(232, 117, 50, 0.35)',
        'glow-subtle': '0 0 25px rgba(232, 117, 50, 0.15)',
        'cinema-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'cinema-radial': 'radial-gradient(ellipse at top, rgba(232, 117, 50, 0.15) 0%, rgba(16, 17, 20, 0) 70%)',
        'orange-gradient': 'linear-gradient(135deg, #E87532 0%, #C95E24 50%, #A64F27 100%)',
      }
    },
  },
  plugins: [],
}