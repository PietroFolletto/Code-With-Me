import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12151C",
        panel: "#1A1F29",
        panelLight: "#F5F3EE",
        line: "#2A3140",
        textPrimary: "#EDEFF3",
        textMuted: "#8B93A3",
        textOnLight: "#1B1F27",
        accent: "#F2A65A",
        accentDim: "#B97C3D",
        trail: "#7EC9A6",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        code: ["var(--font-code)"],
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
