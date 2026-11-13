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
            deep: "#192C17",
            light: "#2F502B",
            muted: "#3B6137",
          },
          olive: {
            DEFAULT: "#668B2E",
            dark: "#4B6820",
            text: "#4B6820",
            light: "#82A844",
            onDark: "#C5E096",
            subtle: "#EFF5E8",
          },
          stone: {
            50: "#FBFBF9",
            100: "#F4F3EE",
            200: "#E8E6DF",
            300: "#D5D2C7",
            400: "#B8B4A6",
            500: "#8F8B7D",
            600: "#656256",
            700: "#4A473E",
            800: "#2F2D27",
            900: "#1B1A16",
          },
          ink: {
            DEFAULT: "#1A2219",
            muted: "#424C40",
            subtle: "#566153",
          },
          gold: {
            DEFAULT: "#B8924A",
            text: "#7A5B20",
            onDark: "#E4C786",
            subtle: "#F9F4E8",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Noto Serif Armenian", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Noto Sans Armenian", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "architectural-grid":
          "linear-gradient(to right, rgba(255, 255, 255, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
      },
      backgroundSize: {
        "architectural-grid": "36px 36px",
      },
    },
  },
  plugins: [],
};

export default config;
