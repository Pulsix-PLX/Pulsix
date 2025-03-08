/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "*.{js,ts,jsx,tsx,mdx}", "app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        s: { max: '640px' }, // Breakpoint per schermi fino a 640px
        l: { min: '1024px' }, // Breakpoint per schermi da 1024px in su
      },
      spacing: {
        // Aggiungi valori incrementali fino a 500
        ...Array.from({ length: 2001 }, (_, i) => ({ [i]: `${i}px` })).reduce(
          (acc, cur) => ({ ...acc, ...cur }),
          {}
        ),
      },
      fontSize: {
        s: "var(--FontS)",
        m: "var(--FontM)",
        l: "var(--FontL)",
        xl: "var(--FontXL)"
      },

    },
  },
  plugins: [require("tailwindcss-animate")],
}

