import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter-tight)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        lime: { DEFAULT: "#C6F700", soft: "#f7fbe2", mid: "#e3f58c" },
        ink: "#1B170D",
      },
      animation: {
        "pulse-soft": "pulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
