import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/shared/theme/ThemeProvider';

export function SettingsScreen() {
  const { colors, typography, spacing } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <Text style={[typography.h1, { color: colors.textPrimary }]}>{t('settings.title')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
