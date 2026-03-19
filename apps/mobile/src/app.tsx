import { NavigationContainer } from '@react-navigation/native';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { env } from '@/shared/env';
import { I18nProvider } from '@/shared/i18n/I18nProvider';
import { ThemeProvider, useNavigationTheme } from '@/shared/theme/ThemeProvider';
import { linking } from '@/navigators/linking';
import { RootNavigator } from '@/navigators/RootNavigator';

const convex = new ConvexReactClient(env.CONVEX_URL);

/**
 * Inner component: has access to ThemeProvider context,
 * so it can pass the React Navigation theme down.
 */
function AppContent() {
  const navigationTheme = useNavigationTheme();

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer theme={navigationTheme} linking={linking}>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ConvexProvider client={convex}>
        <ThemeProvider>
          <I18nProvider>
            <AppContent />
          </I18nProvider>
        </ThemeProvider>
      </ConvexProvider>
    </SafeAreaProvider>
  );
}
