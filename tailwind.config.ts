import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Verdana", "sans-serif"]
      },
      colors: {
        velvet: "#120a0e",
        felt: "#05392f",
        brass: "#d6a94a",
        ember: "#f15b2a",
        chalk: "#f5ead5",
        ink: "#07070a"
      },
      boxShadow: {
        casino: "0 24px 80px rgba(0, 0, 0, 0.45)",
        glow: "0 0 0 1px rgba(214, 169, 74, 0.28), 0 16px 40px rgba(214, 169, 74, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
