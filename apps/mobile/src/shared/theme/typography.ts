export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 34,
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const typography = {
  // Display
  displayLarge: { fontSize: fontSize['3xl'], fontWeight: fontWeight.bold, lineHeight: fontSize['3xl'] * 1.2 },
  displaySmall: { fontSize: fontSize['2xl'], fontWeight: fontWeight.bold, lineHeight: fontSize['2xl'] * 1.2 },

  // Headings
  h1: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, lineHeight: fontSize.xl * 1.3 },
  h2: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, lineHeight: fontSize.lg * 1.3 },
  h3: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, lineHeight: fontSize.md * 1.4 },

  // Body
  bodyLarge: { fontSize: fontSize.base, fontWeight: fontWeight.regular, lineHeight: fontSize.base * 1.5 },
  body: { fontSize: fontSize.sm, fontWeight: fontWeight.regular, lineHeight: fontSize.sm * 1.5 },

  // UI
  label: { fontSize: fontSize.sm, fontWeight: fontWeight.medium, lineHeight: fontSize.sm * 1.4 },
  caption: { fontSize: fontSize.xs, fontWeight: fontWeight.regular, lineHeight: fontSize.xs * 1.4 },
  button: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, lineHeight: fontSize.base * 1.2 },
} as const;
