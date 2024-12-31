import withMT from "@material-tailwind/react/utils/withMT";
import plugin from "tailwindcss/plugin";

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
      },
      keyframes: {
        fadeFromColor3To2: {
          '0%, 100%': { 
            backgroundColor: "#423F3E",
          },
          '50%': { 
            backgroundColor: "#2B2B2B",
          },
        },
      },
      animation: {
        fadeFrom3To2: 'fadeFromColor3To2 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-fade-in-and-out': (value) => ({
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              backgroundColor: value,
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              opacity: '0',
              animation: `${theme('animation.fade')}`,
              borderRadius: 'inherit',
            },
          }),
        },
        {
          values: theme('colors'),
        }
      )
    })
  ],
});

export default config;
