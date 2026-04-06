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
    // Generated from assets/source/splash.svg — run `pnpm generate:assets` to regenerate.
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#0F172A',
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.appboilerplate.app',
    // Universal Links — configure APPLE_APP_ID in your server's apple-app-site-association file.
    associatedDomains: ['applinks:appboilerplate.dev'],
    infoPlist: {
      // Allow receiving remote push notifications while the app is in the background.
      UIBackgroundModes: ['remote-notification'],
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.appboilerplate.app',
    // Android App Links — auto-verify redirects https://appboilerplate.dev/* into the app.
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'https',
            host: 'appboilerplate.dev',
            pathPrefix: '/',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  plugins: [
    'expo-dev-client',
    'expo-splash-screen',
    'expo-localization',
    [
      'expo-notifications',
      {
        // Android: provide a white monochrome PNG at assets/notification-icon.png for best results.
        // icon: './assets/notification-icon.png',
        color: '#6366F1',
        defaultChannel: 'default',
      },
    ],
  ],
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
