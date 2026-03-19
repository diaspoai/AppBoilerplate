/**
 * useSettingsStore — unit tests
 *
 * Zustand stores are pure state machines — no React component needed.
 * We test directly through the store's getState/setState API.
 */
import { useSettingsStore } from '../useSettingsStore';

// Reset store state before each test
beforeEach(() => {
  useSettingsStore.setState({ colorScheme: 'system', language: null });
});

describe('useSettingsStore', () => {
  describe('colorScheme', () => {
    it('defaults to "system"', () => {
      expect(useSettingsStore.getState().colorScheme).toBe('system');
    });

    it('updates to "dark" when setColorScheme is called', () => {
      useSettingsStore.getState().setColorScheme('dark');
      expect(useSettingsStore.getState().colorScheme).toBe('dark');
    });

    it('updates to "light" when setColorScheme is called', () => {
      useSettingsStore.getState().setColorScheme('light');
      expect(useSettingsStore.getState().colorScheme).toBe('light');
    });

    it('resets back to "system"', () => {
      useSettingsStore.getState().setColorScheme('dark');
      useSettingsStore.getState().setColorScheme('system');
      expect(useSettingsStore.getState().colorScheme).toBe('system');
    });
  });

  describe('language', () => {
    it('defaults to null (follow device locale)', () => {
      expect(useSettingsStore.getState().language).toBeNull();
    });

    it('updates to "fr" when setLanguage is called', () => {
      useSettingsStore.getState().setLanguage('fr');
      expect(useSettingsStore.getState().language).toBe('fr');
    });

    it('can be reset to null', () => {
      useSettingsStore.getState().setLanguage('fr');
      useSettingsStore.getState().setLanguage(null);
      expect(useSettingsStore.getState().language).toBeNull();
    });
  });
});
