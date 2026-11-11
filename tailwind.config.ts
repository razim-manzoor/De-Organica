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
        brand: {
          forest: {
            DEFAULT: "#233D20",
            deep: "#1A2E17",
            light: "#2F502B",
            muted: "#3B6137",
          },
          olive: {
            DEFAULT: "#668B2E",
            dark: "#517024",
            light: "#82A844",
            subtle: "#EFF5E8",
          },
          stone: {
            50: "#FBFBF9",
            100: "#F4F3EE",
            200: "#EAE8E0",
            300: "#DCD9CE",
            400: "#BEB9AB",
            500: "#8C8677",
            600: "#635E53",
            700: "#454139",
            800: "#2B2822",
            900: "#161512",
          },
          ink: {
            DEFAULT: "#1A2219",
            muted: "#4A5448",
            subtle: "#768273",
          },
          gold: {
            DEFAULT: "#B8860B",
            light: "#D4AF37",
            subtle: "#FDF8EB",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Noto Serif Armenian", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Noto Sans Armenian", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
