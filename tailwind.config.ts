import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F46A21",
          hover: "#DD5B15",
          light: "#FEF0E7",
        },
        surface: {
          DEFAULT: "#F7F8FA",
          card: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#1F2937",
          secondary: "#6B7280",
          faint: "#9CA3AF",
        },
        border: {
          DEFAULT: "#E5E7EB",
          strong: "#D1D5DB",
        },
        success: {
          DEFAULT: "#15803D",
          bg: "#ECFDF3",
          border: "#BBF7D0",
        },
        warning: {
          DEFAULT: "#B45309",
          bg: "#FFF7ED",
          border: "#FED7AA",
        },
        danger: {
          DEFAULT: "#B91C1C",
          bg: "#FEF2F2",
          border: "#FECACA",
        },
        info: {
          DEFAULT: "#1D4ED8",
          bg: "#EFF6FF",
          border: "#BFDBFE",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        xs: ["11.5px", { lineHeight: "16px" }],
        sm: ["12.5px", { lineHeight: "18px" }],
        base: ["13.5px", { lineHeight: "20px" }],
        md: ["14.5px", { lineHeight: "21px" }],
        lg: ["16px", { lineHeight: "24px" }],
        xl: ["19px", { lineHeight: "26px" }],
        "2xl": ["24px", { lineHeight: "30px" }],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
        panel: "0 4px 6px -2px rgba(16, 24, 40, 0.05), 0 12px 16px -4px rgba(16, 24, 40, 0.08)",
        drawer: "-4px 0 24px -4px rgba(16, 24, 40, 0.12)",
        popover: "0 4px 6px -2px rgba(16,24,40,0.05), 0 10px 15px -3px rgba(16,24,40,0.08)",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "toast-in": {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.22s cubic-bezier(0.32, 0.72, 0, 1)",
        "fade-in": "fade-in 0.15s ease-out",
        "toast-in": "toast-in 0.2s cubic-bezier(0.32, 0.72, 0, 1)",
        shimmer: "shimmer 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
