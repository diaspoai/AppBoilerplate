import * as dotenv from 'dotenv';
import * as path from 'path';
import { ExpoConfig, ConfigContext } from 'expo/config';

// Load the environment file matching APP_ENV (defaults to development).
// EAS Build sets APP_ENV per build profile via eas.json.
// Local dev: set APP_ENV in your shell or use the env:* scripts.
const appEnv = (process.env.APP_ENV ?? 'development') as 'development' | 'staging' | 'production';
dotenv.config({ path: path.resolve(__dirname, `.env.${appEnv}`) });

const appNames: Record<typeof appEnv, string> = {
  development: 'AppBoilerplate (Dev)',
  staging: 'AppBoilerplate (Staging)',
  production: 'AppBoilerplate',
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: appNames[appEnv],
  slug: 'app-boilerplate',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.appboilerplate.app',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.appboilerplate.app',
  },
  plugins: ['expo-dev-client', 'expo-splash-screen'],
  extra: {
    appEnv,
    convexUrl: process.env.CONVEX_URL ?? '',
    eas: {
      projectId: process.env.EAS_PROJECT_ID ?? '',
    },
  },
  updates: {
    url: `https://u.expo.dev/${process.env.EAS_PROJECT_ID ?? ''}`,
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
});
