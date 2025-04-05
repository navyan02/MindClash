module.exports = {
  variants: {
    extend: {
      textColor: ["selection"],
      backgroundColor: ["selection", "hover", "focus"],
      scale: ["active", "group-hover"],
      transform: ["hover", "focus"],
      opacity: ["disabled"],
    },
  },
  theme: {
    extend: {
      colors: {
        black: "#18001d",
        white: "#ffffff",
        crimson: "#d91c5c",
        indigo: "#310050",
        blueViolet: "#a922ff",
        orangeRed: "#f05a28",
        dark: "#1a1a1a",       // Added dark background color
        neonBlue: "#38bdf8",   // Neon Blue
        neonPink: "#ec4899",   // Neon Pink
      },
      fontFamily: {
        clash: ["Orbitron", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],  // Ensuring Orbitron is mapped correctly
      },
      scale: {
        105: "1.05",
        110: "1.1",
      },
    },
  },
  purge: {
    content: [
      "./public/**/*.html",
      "./src/**/*.html",
      "./src/**/*.jsx",
      "./src/**/*.js",
    ],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-selection-variant"),
  ],
}
