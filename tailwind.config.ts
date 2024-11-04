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
        color1: "#171010",
        color2: "#2B2B2B",
        color3: "#423F3E",
        color4: "#362222",
      },
      screens: {
        "desktop-2": "1200px",
        "desktop-1": "1024px",
        "tablet": "768px",
        "mobile-2": "480px",
        "mobile-1": "320px",
      }
    },
  },
  plugins: [],
};
export default config;
