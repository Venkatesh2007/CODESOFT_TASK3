module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'flow-border': 'flow 3s infinite',
      },
      keyframes: {
        flow: {
          '0%, 100%': { 
            'border-image-slice': 1, 
            'border-image-source': 'linear-gradient(90deg, transparent 50%, #0f0 50%)', 
            'border-image-width': '1rem' 
          },
          '50%': { 
            'border-image-slice': 1, 
            'border-image-source': 'linear-gradient(90deg, #0f0 50%, transparent 50%)', 
            'border-image-width': '1rem' 
          },
        },
      }
    },
  },
  plugins: [],
}
