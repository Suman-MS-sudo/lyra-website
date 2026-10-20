import type { Config } from "tailwindcss";

/**
 * Every colour scale the site uses is backed by CSS variables (defined in globals.css),
 * so `.dark` on <html> re-tones the whole site, including older pages written with plain
 * `bg-gray-50` / `text-slate-900` / `bg-primary-50` classes, without touching their markup.
 */
const STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const scale = (name: string) =>
  Object.fromEntries(STOPS.map((s) => [s, `rgb(var(--${name}-${s}) / <alpha-value>)`]));
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: scale("gray"),
        slate: scale("slate"),
        primary: { DEFAULT: "rgb(var(--primary-600) / <alpha-value>)", ...scale("primary") },
        blue: scale("blue"),
        sky: scale("sky"),
        teal: scale("teal"),
        green: scale("green"),
        emerald: scale("emerald"),
        amber: scale("amber"),
        red: scale("red"),
        orange: scale("orange"),
        yellow: scale("yellow"),
        cyan: scale("cyan"),
        rose: scale("rose"),
        indigo: scale("indigo"),

        // Semantic tokens for new UI.
        canvas: token("canvas"),
        surface: token("surface"),
        subtle: token("subtle"),
        elevated: token("elevated"),
        ink: token("ink"),
        body: token("body"),
        muted: token("muted"),
        line: token("line"),
        "line-strong": token("line-strong"),
        brand: { DEFAULT: token("brand"), strong: token("brand-strong"), soft: token("brand-soft") },
        night: "#070a10",

        // Legacy names kept for older pages (render as blue tints).
        pink: {
          soft: "rgb(var(--primary-400) / <alpha-value>)",
          light: "rgb(var(--primary-100) / <alpha-value>)",
          rose: "rgb(var(--primary-500) / <alpha-value>)",
          blush: "rgb(var(--primary-50) / <alpha-value>)",
        },
        cream: token("subtle"),
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.6rem, 6.2vw, 5.4rem)", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
        "display-lg": ["clamp(2rem, 3.4vw, 3rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(180deg, rgb(var(--subtle)) 0%, rgb(var(--canvas)) 60%)",
        "purple-gradient": "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
        "pink-gradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "float-medium": "floatMedium 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        floatMedium: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { transform: "scale(0.92)", opacity: "0.5" },
          "50%": { transform: "scale(1.08)", opacity: "0.9" },
        },
        slideUp: {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        "3xl": "0 35px 60px -12px rgba(0, 0, 0, 0.25)",
        glow: "0 0 20px rgba(37, 99, 235, 0.3)",
        card: "var(--shadow-sm)",
        "card-hover": "var(--shadow-lg)",
        lift: "var(--shadow-lift)",
        purple: "0 10px 40px rgba(37,99,235,0.28)",
        "purple-lg": "0 20px 60px rgba(37,99,235,0.35)",
        "purple-xl": "0 30px 80px rgba(37,99,235,0.45)",
        glass: "0 8px 32px rgba(37,99,235,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
