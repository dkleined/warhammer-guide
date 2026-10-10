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
          "primary": "#c9a227",
          "primary-content": "#1a1a1a",
          "secondary": "#b91c1c",
          "secondary-content": "#ffffff",
          "accent": "#6b7280",
          "accent-content": "#ffffff",
          "neutral": "#1f2937",
          "neutral-content": "#d1d5db",
          "base-100": "#111827",
          "base-200": "#1f2937",
          "base-300": "#374151",
          "base-content": "#e5e7eb",
          "info": "#3b82f6",
          "success": "#22c55e",
          "warning": "#eab308",
          "error": "#dc2626",
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
