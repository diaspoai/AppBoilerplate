import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/shared/theme/ThemeProvider';

import type { AuthStackParamList } from '../../../navigators/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { colors, typography, spacing } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <Text style={[typography.h1, { color: colors.textPrimary, marginBottom: spacing.sm }]}>
        {t('auth.signIn')}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary, marginTop: spacing.lg }]}
        onPress={() => {
          // TODO: wire up Convex Auth sign-in (Phase: Convex Auth)
        }}
      >
        <Text style={[typography.body, { color: '#fff' }]}>{t('auth.signIn')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: spacing.md }}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={[typography.caption, { color: colors.textSecondary }]}>
          {t('auth.noAccount')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
});
