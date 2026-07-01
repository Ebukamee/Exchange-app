import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Paycryptt brand — red on near-black, Cardtonic-style clean fintech.
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Accent red — refined, cleaner than the flat logo red. Used sparingly.
        brand: {
          50: { value: "#fff1f2" },
          100: { value: "#ffe0e2" },
          200: { value: "#ffc6ca" },
          300: { value: "#ff9ba3" },
          400: { value: "#fb5f6c" },
          500: { value: "#ef2b3a" }, // primary accent red
          600: { value: "#d81829" },
          700: { value: "#b51121" },
          800: { value: "#921120" },
          900: { value: "#7a1420" },
          950: { value: "#43050c" },
        },
        // Deep navy — the real base colour (text, buttons, dark surfaces).
        ink: {
          50: { value: "#f5f6fb" },
          100: { value: "#e7e9f2" },
          200: { value: "#d1d5e6" },
          300: { value: "#a7adcb" },
          400: { value: "#727aa1" },
          500: { value: "#535b83" },
          600: { value: "#3d4568" },
          700: { value: "#2c3352" },
          800: { value: "#1a2140" },
          900: { value: "#111634" },
          950: { value: "#0a0e24" },
        },
      },
      fonts: {
        heading: { value: "'Bricolage Grotesque', system-ui, sans-serif" },
        body: { value: "'Plus Jakarta Sans', system-ui, sans-serif" },
      },
      radii: {
        l1: { value: "12px" },
        l2: { value: "20px" },
        l3: { value: "32px" },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "white" },
          fg: { value: "{colors.brand.600}" },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.50}" },
          emphasized: { value: "{colors.brand.600}" },
          focusRing: { value: "{colors.brand.500}" },
        },
        // Navy palette so `colorPalette="ink"` gives dark pill buttons.
        ink: {
          solid: { value: "{colors.ink.950}" },
          contrast: { value: "white" },
          fg: { value: "{colors.ink.900}" },
          muted: { value: "{colors.ink.100}" },
          subtle: { value: "{colors.ink.50}" },
          emphasized: { value: "{colors.ink.800}" },
          focusRing: { value: "{colors.ink.900}" },
        },
        // App surfaces
        page: { value: "{colors.white}" },
        surface: { value: "{colors.white}" },
        panel: { value: "{colors.ink.50}" },
      },
    },
  },
  globalCss: {
    "html, body": {
      bg: "white",
      color: "ink.900",
      fontFamily: "body",
    },
    "*::selection": {
      bg: "brand.100",
    },
  },
});

export const system = createSystem(defaultConfig, config);
