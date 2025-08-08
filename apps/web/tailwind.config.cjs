/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      colors: {
        // Added custom magenta so the class name `text-magenta-400` used in TeletextGrid works.
        magenta: {
          400: '#ff00ff', // classic teletext-style vivid magenta
        },
      },
    },
  },
  plugins: [],
};
