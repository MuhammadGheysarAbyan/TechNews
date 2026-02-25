import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
        mono:  ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "marquee":      "marquee 30s linear infinite",
        "fade-in":      "fadeIn .4s ease-out",
        "slide-up":     "slideUp .5s ease-out",
        "pulse-slow":   "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        marquee:  { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        fadeIn:   { from: { opacity: "0" },               to: { opacity: "1" } },
        slideUp:  { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      typography: {
        DEFAULT: {
          css: {
            color:           "#d1d5db",
            "h1,h2,h3,h4":  { color: "#fff" },
            a:               { color: "#10b981" },
            strong:          { color: "#fff" },
            code:            { color: "#10b981" },
            blockquote:      { borderLeftColor: "#10b981", color: "#9ca3af" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
export default config;
