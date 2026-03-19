/**
 * Spacing scale based on a 4px base unit.
 * Use these values for margin, padding, gap, and layout dimensions.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

export type SpacingKey = keyof typeof spacing;
