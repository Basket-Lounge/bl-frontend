import withMT from "@material-tailwind/react/utils/withMT";

const config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "sm": "360px",
      "md": "480px",
      "lg": "768px",
      "xl": "1024px",
      "2xl": "1200px",
    },
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
});

export default config;
