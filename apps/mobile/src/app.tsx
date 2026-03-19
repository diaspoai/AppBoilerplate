import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { NavigationContainer } from '@react-navigation/native';
import { ConvexReactClient } from 'convex/react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { env } from '@/shared/env';
import { I18nProvider } from '@/shared/i18n/I18nProvider';
import { ThemeProvider, useNavigationTheme, useTheme } from '@/shared/theme/ThemeProvider';
import { linking } from '@/navigators/linking';
import { RootNavigator } from '@/navigators/RootNavigator';

const convex = new ConvexReactClient(env.CONVEX_URL);

/**
 * Inner component: rendered inside all providers.
 * Hides the splash screen once the layout is ready.
 */
function AppContent() {
  const navigationTheme = useNavigationTheme();
  const { colors } = useTheme();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Perform any async initialisation here (fonts, assets, etc.)
    // then mark the app as ready.
    setAppReady(true);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <NavigationContainer theme={navigationTheme} linking={linking}>
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ConvexAuthProvider client={convex} storage={AsyncStorage}>
        <ThemeProvider>
          <I18nProvider>
            <AppContent />
          </I18nProvider>
        </ThemeProvider>
      </ConvexAuthProvider>
    </SafeAreaProvider>
  );
}
