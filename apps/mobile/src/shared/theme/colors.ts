export const palette = {
  // Brand
  primary: '#6366F1', // Indigo
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export const lightColors = {
  // Backgrounds
  background: palette.white,
  surface: palette.gray50,
  surfaceElevated: palette.white,

  // Text
  textPrimary: palette.gray900,
  textSecondary: palette.gray500,
  textDisabled: palette.gray300,
  textInverse: palette.white,

  // Brand
  primary: palette.primary,
  primaryLight: palette.primaryLight,

  // Borders
  border: palette.gray200,
  borderStrong: palette.gray300,

  // Semantic
  success: palette.success,
  warning: palette.warning,
  error: palette.error,
  info: palette.info,

  // Navigation (React Navigation theme)
  card: palette.white,
  notification: palette.error,
} as const;

export const darkColors = {
  // Backgrounds
  background: palette.gray900,
  surface: palette.gray800,
  surfaceElevated: palette.gray700,

  // Text
  textPrimary: palette.white,
  textSecondary: palette.gray400,
  textDisabled: palette.gray600,
  textInverse: palette.gray900,

  // Brand
  primary: palette.primaryLight,
  primaryLight: palette.primary,

  // Borders
  border: palette.gray700,
  borderStrong: palette.gray600,

  // Semantic
  success: palette.success,
  warning: palette.warning,
  error: palette.error,
  info: palette.info,

  // Navigation (React Navigation theme)
  card: palette.gray800,
  notification: palette.error,
} as const;

export type AppColors = {
  [K in keyof typeof lightColors]: string;
};
