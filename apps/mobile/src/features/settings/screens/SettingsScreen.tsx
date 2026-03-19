import { useAuthActions } from '@convex-dev/auth/react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/shared/theme/ThemeProvider';

export function SettingsScreen() {
  const { colors, typography, spacing } = useTheme();
  const { t } = useTranslation();
  const { signOut } = useAuthActions();

  function handleSignOut() {
    Alert.alert(t('auth.signOut'), t('auth.signOutConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('auth.signOut'),
        style: 'destructive',
        onPress: () => signOut(),
      },
    ]);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <Text style={[typography.h1, { color: colors.textPrimary, marginBottom: spacing.lg }]}>
        {t('settings.title')}
      </Text>

      <TouchableOpacity
        style={[styles.signOutButton, { borderColor: colors.error }]}
        onPress={handleSignOut}
      >
        <Text style={[typography.body, { color: colors.error }]}>{t('auth.signOut')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  signOutButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
});
