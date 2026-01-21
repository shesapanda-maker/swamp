const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        marsh: {
          black: '#0C0F0C',
          deep: '#1A3326',
          mist: '#415A4A',
          light: '#C4CEB4',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
      },
    },
  },

  plugins: [],
};

export default config;
