import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#B565A7",
          50: "#FDF5FC",
          100: "#F9E6F7",
          200: "#F0C4EC",
          300: "#E49ADB",
          400: "#D370C6",
          500: "#B565A7",
          600: "#9B4F96",
          700: "#7A3E9D",
          800: "#5C2E77",
          900: "#3D1E50",
        },
        pink: {
          soft: "#E298D3",
          light: "#F5D0EA",
          rose: "#FF6B9D",
          blush: "#FFDDF0",
        },
        cream: "#FFF8FF",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #FFF0FA 0%, #F5D0EA 40%, #E298D3 100%)",
        "purple-gradient":
          "linear-gradient(135deg, #B565A7 0%, #9B4F96 50%, #7A3E9D 100%)",
        "pink-gradient":
          "linear-gradient(135deg, #E298D3 0%, #B565A7 100%)",
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "float-medium": "floatMedium 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
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
          "0%, 100%": { boxShadow: "0 0 20px rgba(181,101,167,0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(181,101,167,0.7)" },
        },
        slideUp: {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        purple: "0 10px 40px rgba(181,101,167,0.3)",
        "purple-lg": "0 20px 60px rgba(181,101,167,0.4)",
        "purple-xl": "0 30px 80px rgba(181,101,167,0.5)",
        glow: "0 0 40px rgba(181,101,167,0.6)",
        glass: "0 8px 32px rgba(181,101,167,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
