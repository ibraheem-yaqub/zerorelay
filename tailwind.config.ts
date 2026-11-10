import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-instrument-sans)", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "pulse-soft": "pulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
