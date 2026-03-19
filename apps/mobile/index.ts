import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';

import App from './src/app';

// Keep the splash screen visible until App explicitly calls SplashScreen.hideAsync().
// This prevents a white flash while providers (Convex, Theme, i18n) initialise.
SplashScreen.preventAutoHideAsync();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately.
registerRootComponent(App);
