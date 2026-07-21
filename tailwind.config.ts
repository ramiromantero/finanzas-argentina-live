import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#050B18",
          900: "#081226",
          800: "#0C1B36",
          700: "#122547",
        },
        accent: {
          up: "#34d399",
          down: "#f87171",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "'Segoe UI'", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "'Cascadia Code'", "'SF Mono'", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
