/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#FFFFFF",
          secondary: "#F5F5F5",
          tertiary: "#E5E5E5",
        },
        text: {
          headline: "#121214",
          heading: "#202024",
          body: "#29292E",
          span: "#7C7C8A",
        },
        accent: {
          brand: "#F97316",
          "brand-dark": "#C2410C",
          "brand-light": "#FB923C",
          red: "#F75A68",
          "red-dark": "#AA2834",
          blue: "#5A86F7",
          "blue-dark": "#284DAA",
        },
        border: {
          primary: "#E5E5E5",
        },
        dark: {
          background: {
            primary: "#121214",
            secondary: "#202024",
            tertiary: "#29292E",
          },
          text: {
            headline: "#FFFFFF",
            heading: "#E1E1E6",
            body: "#C4C4CC",
            span: "#7C7C8A",
          },
          border: {
            primary: "#3D3D3D",
          },
        },
      },
    },
  },
};
