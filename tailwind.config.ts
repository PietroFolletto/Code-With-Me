import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#121126",
        panel: "#1D1840",
        panelLight: "#D9D9D9",
        line: "#302559",
        textPrimary: "#F1F0F7",
        textMuted: "#A9A6C4",
        textOnLight: "#1B1830",
        accent: "#30BF62",
        accentDim: "#1E8E47",
        trail: "#30BF62",
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
