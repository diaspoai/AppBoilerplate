import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useConvexAuth } from 'convex/react';

import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * RootNavigator gates navigation based on Convex Auth session state.
 *
 * - isLoading: splash is still visible (handled in app.tsx), render nothing
 * - isAuthenticated: show the main app (tabs)
 * - not authenticated: show the auth stack (login/register)
 */
export function RootNavigator() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
