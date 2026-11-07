import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FBF6EC",
        ink: "#2C2A26",
        blue: "#3E92CC",
        "blue-dark": "#2C6E9B",
        yellow: "#F4B942",
        coral: "#E8664D",
        green: "#5BAE6A",
        muted: "#6B6660",
        line: "#E7DFCE",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "Noto Sans SC",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 2px 0 0 rgba(44,42,38,0.08)",
        "card-hover": "0 8px 24px -8px rgba(44,42,38,0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
