import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '@/shared/theme/ThemeProvider';

import { ItemRow } from '../components/ItemRow';
import { useItems } from '../hooks/useItems';

/**
 * HomeScreen — demonstrates Convex real-time CRUD:
 *   - useQuery (list items, live subscription)
 *   - useMutation (create, toggle, delete)
 *
 * This screen is intentionally kept as a pattern reference.
 * Replace `items` with your own domain entities.
 */
export function HomeScreen() {
  const { colors, typography, spacing } = useTheme();
  const { t } = useTranslation();
  const { items, isLoading, createItem, toggleItem, removeItem } = useItems();

  const [title, setTitle] = useState('');

  async function handleAdd() {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTitle('');
    await createItem({ title: trimmed });
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      {/* Header */}
      <View style={{ padding: spacing.lg, paddingBottom: spacing.sm }}>
        <Text style={[typography.h1, { color: colors.textPrimary }]}>{t('home.title')}</Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
          {t('home.welcome')}
        </Text>
      </View>

      {/* Items list */}
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: spacing.xl }} color={colors.primary} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}
          renderItem={({ item }) => (
            <ItemRow
              id={item._id}
              title={item.title}
              description={item.description}
              completed={item.completed}
              onToggle={(id) => toggleItem({ id })}
              onDelete={(id) => removeItem({ id })}
            />
          )}
          ListEmptyComponent={
            <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl }]}>
              {t('home.noItems')}
            </Text>
          }
        />
      )}

      {/* Add item input */}
      <View style={[styles.inputRow, { borderTopColor: colors.border, backgroundColor: colors.surface, padding: spacing.md }]}>
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.textPrimary, backgroundColor: colors.background },
          ]}
          placeholder={t('home.itemTitlePlaceholder')}
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={handleAdd}
        >
          <Text style={[typography.body, { color: '#fff' }]}>{t('home.addItem')}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});
