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
          rose: "#E85D75",
          cream: "#F8F4EC",
          sand: "#F3EEE4",
          deep: "#173B3A",
          coral: "#E86F4E",
          yellow: "#F4C95D"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(18, 102, 227, 0.12)",
        warm: "0 20px 50px rgba(23, 59, 58, 0.16)",
        coral: "0 12px 24px rgba(232, 111, 78, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
