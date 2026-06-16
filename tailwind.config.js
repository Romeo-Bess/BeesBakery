/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#7a5900", // Honey Gold (interactive / accents)
        "primary-container": "#f4b400", // Honey Gold accent color
        "primary-fixed-dim": "#fdbc13",
        "primary-fixed": "#ffdea3",
        "secondary": "#5f5e5e",
        "secondary-container": "#e2dfde",
        "secondary-fixed": "#e5e2e1",
        "secondary-fixed-dim": "#c8c6c5",
        "tertiary": "#735c00",
        "tertiary-container": "#e3bb36",
        "tertiary-fixed": "#ffe087",
        "tertiary-fixed-dim": "#ebc23e",
        "background": "#fff9ec", // Cream White (warm background)
        "surface": "#fff9ec",
        "surface-bright": "#fff9ec",
        "surface-dim": "#e0dac9",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#faf3e2", // Warm Beige secondary container
        "surface-container": "#f4eddd",
        "surface-container-high": "#eee8d7",
        "surface-container-highest": "#e9e2d2",
        "on-primary": "#ffffff",
        "on-primary-container": "#654800",
        "on-primary-fixed": "#261900",
        "on-primary-fixed-variant": "#5d4200",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#636262",
        "on-secondary-fixed": "#1b1b1c",
        "on-secondary-fixed-variant": "#474746",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#5f4b00",
        "on-tertiary-fixed": "#241a00",
        "on-tertiary-fixed-variant": "#574500",
        "on-background": "#1e1c12", // Charcoal Black for primary typography
        "on-surface": "#1e1c12",
        "on-surface-variant": "#504533",
        "inverse-surface": "#333025",
        "inverse-on-surface": "#f7f0df",
        "outline": "#827560",
        "outline-variant": "#d4c4ac",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "error-container": "#ffdad6",
        "surface-variant": "#e9e2d2",
        "surface-tint": "#7a5900",
      },
      borderRadius: {
        "DEFAULT": "0.125rem", // Soft roundedness for small buttons/inputs
        "lg": "0.25rem",
        "xl": "0.5rem", // Large feature cards / hero images
        "full": "9999px",
      },
      spacing: {
        "section-gap": "120px",
        "container-max": "1280px",
        "margin-desktop": "40px",
        "unit": "8px",
        "gutter": "24px",
        "margin-mobile": "16px",
      },
      fontFamily: {
        serif: ["EB Garamond", "serif"],
        sans: ["Manrope", "sans-serif"],
        "display-lg": ["EB Garamond", "serif"],
        "headline-lg": ["EB Garamond", "serif"],
        "headline-lg-mobile": ["EB Garamond", "serif"],
        "headline-md": ["EB Garamond", "serif"],
        "headline-sm": ["EB Garamond", "serif"],
        "body-lg": ["Manrope", "sans-serif"],
        "body-md": ["Manrope", "sans-serif"],
        "label-md": ["Manrope", "sans-serif"],
        "label-sm": ["Manrope", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["64px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "500" }],
        "headline-lg": ["48px", { "lineHeight": "1.2", "fontWeight": "500" }],
        "headline-lg-mobile": ["32px", { "lineHeight": "1.2", "fontWeight": "500" }],
        "headline-md": ["32px", { "lineHeight": "1.3", "fontWeight": "400" }],
        "headline-sm": ["24px", { "lineHeight": "1.4", "fontWeight": "600" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "label-md": ["14px", { "lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "label-sm": ["12px", { "lineHeight": "1.2", "fontWeight": "500" }],
      }
    },
  },
  plugins: [],
}
