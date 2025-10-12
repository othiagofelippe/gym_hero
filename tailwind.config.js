/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: process.env.DARK_MODE ? process.env.DARK_MODE : "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  important: "html",
  safelist: [
    {
      pattern:
        /(bg|border|text)-(background|text|brand|red|blue|border)-(primary|secondary|tertiary|headline|heading|body|span|dark|light)/,
    },
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      black: "#000000",
      background: {
        primary: "rgb(var(--background-primary) / <alpha-value>)",
        secondary: "rgb(var(--background-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--background-tertiary) / <alpha-value>)",
      },
      text: {
        headline: "rgb(var(--text-headline) / <alpha-value>)",
        heading: "rgb(var(--text-heading) / <alpha-value>)",
        body: "rgb(var(--text-body) / <alpha-value>)",
        span: "rgb(var(--text-span) / <alpha-value>)",
      },
      brand: {
        DEFAULT: "rgb(var(--accent-brand) / <alpha-value>)",
        dark: "rgb(var(--accent-brand-dark) / <alpha-value>)",
        light: "rgb(var(--accent-brand-light) / <alpha-value>)",
      },
      red: {
        DEFAULT: "rgb(var(--accent-red) / <alpha-value>)",
        dark: "rgb(var(--accent-red-dark) / <alpha-value>)",
      },
      blue: {
        DEFAULT: "rgb(var(--accent-blue) / <alpha-value>)",
        dark: "rgb(var(--accent-blue-dark) / <alpha-value>)",
      },
      border: {
        primary: "rgb(var(--border-primary) / <alpha-value>)",
      },
    },
  },
};
