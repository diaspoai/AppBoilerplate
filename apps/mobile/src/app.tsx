import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { env } from '@/shared/env';
import { I18nProvider } from '@/shared/i18n/I18nProvider';
import { ThemeProvider, useTheme } from '@/shared/theme/ThemeProvider';

const convex = new ConvexReactClient(env.CONVEX_URL);

function AppContent() {
  const { colors, typography } = useTheme();
  const { t } = useTranslation();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[typography.h1, { color: colors.textPrimary }]}>{t('common.appName')}</Text>
      <Text style={[typography.body, { color: colors.textSecondary }]}>{t('home.welcome')}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <I18nProvider>
          <AppContent />
        </I18nProvider>
      </ThemeProvider>
    </ConvexProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
