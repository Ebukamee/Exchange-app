// Powerpay brand palette. Kept as a small object for inline styles where
// Chakra tokens are inconvenient. Prefer theme tokens ("brand.500") in JSX.
export const Brand = {
  red: "#ed1c24",
  redDark: "#d20e16",
  ink: "#141418",
  bg: "#ffffff",
  muted: "#f6f6f7",
};

// Back-compat alias for older imports that referenced `Blue`.
export const Blue = { bg: "#fff1f1", p: Brand.red };

