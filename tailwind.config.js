
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
      fontFamily: {
        display: ['Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      extend: {
        fontSize: {
          14: '14px',
        },
        boxShadow: {
          'custom-inner-1': 'inset -3px -3px 8px rgba(71, 0, 255, 0.49)',
          'custom-inner-2': 'inset -3px 2px 8px rgba(0, 130, 163, 0.08)',
          'custom-drop': '0px 0px 0px 2px rgba(0, 130, 163, 0.2)',
        },
        backgroundColor: {
          'main-bg': '#FAFBFB',
          'main-dark-bg': '#20232A',
          'secondary-dark-bg': '#33373E',
          'light-gray': '#F7F7F7',
          'half-transparent': 'rgba(0, 0, 0, 0.5)',
        },
        borderWidth: {
          1: '1px',
        },
        borderColor: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        width: {
          400: '400px',
          760: '760px',
          780: '780px',
          800: '800px',
          1000: '1000px',
          1200: '1200px',
          1400: '1400px',
        },
        height: {
          80: '80px',
        },
        minHeight: {
          590: '590px',
        },
        backgroundImage: {
          'hero-pattern': "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
          'frame295': "/registration/Frame 295.png"
        },
      },
    },
    plugins: [],
  };
  