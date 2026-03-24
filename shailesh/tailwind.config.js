/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo
        secondary: "#9333EA", // Purple
        accent: "#F97316", // Orange
        highlight: "#EC4899", // Pink
        bg: {
          canvas: "#0F172A", // Deep Navy
          white: "#1E293B",  // Slate surface (cards)
        },
        text: {
          primary: "#F8FAFC", // White/Slate
          secondary: "#CBD5E1", // Muted Slate
          muted: "#64748B",
          white: "#FFFFFF",
        },
        border: "rgba(255, 255, 255, 0.1)",
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'inner-light': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
};