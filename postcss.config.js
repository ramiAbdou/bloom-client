const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

export default {
  plugins: [tailwindcss('./tailwind.config.js'), autoprefixer]
};
