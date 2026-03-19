import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/shared/theme/ThemeProvider';

import type { Id } from 'convex/_generated/dataModel';

interface ItemRowProps {
  id: Id<'items'>;
  title: string;
  description?: string;
  completed: boolean;
  onToggle: (id: Id<'items'>) => void;
  onDelete: (id: Id<'items'>) => void;
}

export function ItemRow({ id, title, description, completed, onToggle, onDelete }: ItemRowProps) {
  const { colors, typography, spacing } = useTheme();
  const { t } = useTranslation();

  function confirmDelete() {
    Alert.alert(t('common.delete'), t('home.deleteItemConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: () => onDelete(id) },
    ]);
  }

  return (
    <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <TouchableOpacity
        style={[styles.checkbox, { borderColor: colors.primary, backgroundColor: completed ? colors.primary : 'transparent' }]}
        onPress={() => onToggle(id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: completed }}
      />

      <View style={styles.textWrap}>
        <Text
          style={[
            typography.body,
            { color: completed ? colors.textSecondary : colors.textPrimary },
            completed && styles.strikethrough,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {description ? (
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2 }]} numberOfLines={1}>
            {description}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={{ paddingHorizontal: spacing.sm }}
        onPress={confirmDelete}
        accessibilityLabel={t('common.delete')}
      >
        <Text style={[typography.body, { color: colors.error }]}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
  },
  textWrap: { flex: 1 },
  strikethrough: { textDecorationLine: 'line-through' },
});
