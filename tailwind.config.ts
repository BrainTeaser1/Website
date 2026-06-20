import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        base: "rgb(var(--base) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface-2) / <alpha-value>)",
        navy: "rgb(var(--navy) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accent2: "rgb(var(--accent-2) / <alpha-value>)",
        violet: "rgb(var(--violet) / <alpha-value>)",
        sky: "rgb(var(--sky) / <alpha-value>)",
        cyan: "rgb(var(--cyan) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        sub: "rgb(var(--sub) / <alpha-value>)",
      },
      maxWidth: {
        page: "80rem",
      },
      keyframes: {
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        pulseGlow: { "0%,100%": { opacity: "0.35" }, "50%": { opacity: "0.7" } },
        dash: { to: { "stroke-dashoffset": "-1000" } },
        drift: { "0%,100%": { transform: "translateY(0) rotate(var(--r,0deg))" }, "50%": { transform: "translateY(16px) rotate(var(--r,0deg))" } },
        bppulse: { "0%,100%": { opacity: "0.35" }, "50%": { opacity: "1" } },
        spotlight: { "0%": { opacity: "0", transform: "translate(-72%,-62%) scale(.5)" }, "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(28px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
        dash: "dash 18s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
