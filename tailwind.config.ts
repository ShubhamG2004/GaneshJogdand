import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#182230",
        clinic: {
          blue: "#1266E3",
          teal: "#0F9F8F",
          mint: "#DDF7F1",
          sun: "#F5B84B",
          rose: "#E85D75"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(18, 102, 227, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
