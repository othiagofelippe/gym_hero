/**
 * Theme tokens - cores que podem ser usadas diretamente em componentes
 * que não suportam Tailwind (como ícones do Lucide)
 *
 * Sincronizado com global.css e tailwind.config.js
 */

export const COLORS = {
  // Brand
  brand: {
    DEFAULT: 'rgb(249, 115, 22)',
    dark: 'rgb(194, 65, 12)',
    light: 'rgb(251, 146, 60)',
  },

  // Text
  text: {
    headline: 'rgb(18, 18, 20)',      // Light mode
    heading: 'rgb(32, 32, 36)',
    body: 'rgb(41, 41, 46)',
    span: 'rgb(124, 124, 138)',
  },

  // Background
  background: {
    primary: 'rgb(255, 255, 255)',    // Light mode
    secondary: 'rgb(245, 245, 245)',
    tertiary: 'rgb(229, 229, 229)',
  },

  // Accent
  red: {
    DEFAULT: 'rgb(247, 90, 104)',
    dark: 'rgb(170, 40, 52)',
  },

  blue: {
    DEFAULT: 'rgb(90, 134, 247)',
    dark: 'rgb(40, 77, 170)',
  },

  // Neutral
  white: '#FFFFFF',
  black: '#000000',

  // Border
  border: {
    primary: 'rgb(229, 229, 229)',
  },
} as const;

// Dark mode colors (se precisar usar diretamente)
export const DARK_COLORS = {
  text: {
    headline: 'rgb(255, 255, 255)',
    heading: 'rgb(225, 225, 230)',
    body: 'rgb(196, 196, 204)',
    span: 'rgb(124, 124, 138)',
  },
  background: {
    primary: 'rgb(18, 18, 20)',
    secondary: 'rgb(32, 32, 36)',
    tertiary: 'rgb(41, 41, 46)',
  },
  border: {
    primary: 'rgb(61, 61, 61)',
  },
} as const;
