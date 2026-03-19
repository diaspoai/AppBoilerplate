import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { useSettingsStore } from '@/shared/store/useSettingsStore';
import { AppColors, darkColors, lightColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

interface ThemeContextValue {
  colors: AppColors;
  spacing: typeof spacing;
  typography: typeof typography;
  isDark: boolean;
  colorScheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const { colorScheme: userScheme } = useSettingsStore();

  const resolvedScheme = useMemo<'light' | 'dark'>(() => {
    if (userScheme === 'system') {
      return systemScheme === 'dark' ? 'dark' : 'light';
    }
    return userScheme;
  }, [userScheme, systemScheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: resolvedScheme === 'dark' ? darkColors : lightColors,
      spacing,
      typography,
      isDark: resolvedScheme === 'dark',
      colorScheme: resolvedScheme,
    }),
    [resolvedScheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Access the current theme (colors, spacing, typography, isDark).
 * Must be used inside ThemeProvider.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}

/**
 * Returns a React Navigation-compatible Theme object.
 * Pass this to NavigationContainer's `theme` prop.
 */
export function useNavigationTheme() {
  const { colors, isDark } = useTheme();
  const base = isDark ? DarkTheme : DefaultTheme;
  return {
    ...base,
    dark: isDark,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.textPrimary,
      border: colors.border,
      notification: colors.notification,
    },
  };
}
