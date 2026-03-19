import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { SupportedLanguage } from '@/shared/i18n';

type ColorScheme = 'light' | 'dark' | 'system';

interface SettingsState {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  /** null means "follow device locale" */
  language: SupportedLanguage | null;
  setLanguage: (lang: SupportedLanguage | null) => void;
}

/**
 * Persists user preferences (theme, language) across app restarts.
 */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      colorScheme: 'system',
      setColorScheme: (scheme) => set({ colorScheme: scheme }),
      language: null,
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'app-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
