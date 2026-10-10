/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ['Barlow Condensed', 'Arial Narrow', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        warhammer: {
          "primary": "#d1a94a",
          "primary-content": "#000000",
          "secondary": "#a31621",
          "secondary-content": "#ffffff",
          "accent": "#8a6a1f",
          "accent-content": "#ffffff",
          "neutral": "#1d2126",
          "neutral-content": "#e8e4da",
          "base-100": "#121417",
          "base-200": "#1d2126",
          "base-300": "#343a42",
          "base-content": "#e8e4da",
          "info": "#5d636c",
          "success": "#22c55e",
          "warning": "#d1a94a",
          "error": "#e0414b",
        },
        warhammerLight: {
          "primary": "#8a6a1f",
          "primary-content": "#ffffff",
          "secondary": "#a31621",
          "secondary-content": "#ffffff",
          "accent": "#d1a94a",
          "accent-content": "#000000",
          "neutral": "#e6e8eb",
          "neutral-content": "#16181c",
          "base-100": "#ffffff",
          "base-200": "#e6e8eb",
          "base-300": "#c9cdd3",
          "base-content": "#16181c",
          "info": "#5d636c",
          "success": "#22c55e",
          "warning": "#d1a94a",
          "error": "#a31621",
        },
      },
      "dark",
      "light",
    ],
    darkTheme: "warhammer",
  },
}
