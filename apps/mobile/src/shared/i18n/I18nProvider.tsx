import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import { useSettingsStore } from '@/shared/store/useSettingsStore';

import { initI18n, type SupportedLanguage } from './index';

interface I18nProviderProps {
  children: React.ReactNode;
}

/**
 * Initialises i18next with the user's stored language preference
 * (or falls back to the device locale) and re-initialises whenever
 * the preference changes.
 */
export function I18nProvider({ children }: I18nProviderProps) {
  const language = useSettingsStore((s) => s.language) as SupportedLanguage | null;
  const [i18nInstance] = useState(() => initI18n(language));

  useEffect(() => {
    if (language && i18nInstance.language !== language) {
      i18nInstance.changeLanguage(language);
    }
  }, [language, i18nInstance]);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
