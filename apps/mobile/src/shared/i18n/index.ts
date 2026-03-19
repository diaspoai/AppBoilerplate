import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import fr from './locales/fr.json';

export const SUPPORTED_LANGUAGES = ['en', 'fr'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'English',
  fr: 'Français',
};

/**
 * Derive a supported language from the device locale.
 * Falls back to 'en' if the device locale is not supported.
 */
function getDeviceLanguage(): SupportedLanguage {
  const locales = getLocales();
  const tag = locales[0]?.languageCode ?? 'en';
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(tag)
    ? (tag as SupportedLanguage)
    : 'en';
}

export function initI18n(storedLanguage?: SupportedLanguage | null) {
  const lng = storedLanguage ?? getDeviceLanguage();

  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      lng,
      fallbackLng: 'en',
      resources: {
        en: { translation: en },
        fr: { translation: fr },
      },
      interpolation: {
        // React already escapes values
        escapeValue: false,
      },
      compatibilityJSON: 'v4',
    });
  }

  return i18n;
}

export { i18n };
