import { useAuthActions } from '@convex-dev/auth/react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '@/shared/theme/ThemeProvider';

import type { AuthStackParamList } from '../../../navigators/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { colors, typography, spacing } = useTheme();
  const { t } = useTranslation();
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!email || !password) return;
    setLoading(true);
    try {
      await signIn('password', { email, password, flow: 'signUp' });
      // RootNavigator will automatically switch to Main on auth state change
    } catch (err) {
      Alert.alert(t('common.error'), err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <Text style={[typography.h1, { color: colors.textPrimary, marginBottom: spacing.lg }]}>
        {t('auth.signUp')}
      </Text>

      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.textPrimary, backgroundColor: colors.surface }]}
        placeholder={t('auth.email')}
        placeholderTextColor={colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />

      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.textPrimary, backgroundColor: colors.surface, marginTop: spacing.sm }]}
        placeholder={t('auth.password')}
        placeholderTextColor={colors.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="new-password"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary, marginTop: spacing.lg }]}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={[typography.body, { color: '#fff' }]}>{t('auth.signUp')}</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: spacing.md }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={[typography.caption, { color: colors.textSecondary, textAlign: 'center' }]}>
          {t('auth.alreadyHaveAccount')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
});
