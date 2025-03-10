module.exports = {
  theme: {
    extend: {
      screens: {
        '2xs': '320px',
        xs: '480px'
      },
      backgroundImage: {
        'mask-gradient':
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8))' // Gradient mask
      }
    }
  },
  plugins: [
    // Add any custom plugin if required for mask-image
  ]
};
