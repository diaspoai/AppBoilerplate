import { LinkingOptions } from '@react-navigation/native';

import type { RootStackParamList } from './types';

/**
 * Deep link configuration.
 *
 * Supported URL schemes:
 *   - appboilerplate://          → resolves via prefixes below
 *   - https://appboilerplate.dev → universal links (configure in app.config.ts)
 *
 * Examples:
 *   appboilerplate://login       → AuthStack > Login
 *   appboilerplate://register    → AuthStack > Register
 *   appboilerplate://home        → MainTabs  > Home
 *   appboilerplate://profile     → MainTabs  > Profile
 *   appboilerplate://settings    → MainTabs  > Settings
 */
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['appboilerplate://', 'https://appboilerplate.dev'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          Register: 'register',
        },
      },
      Main: {
        screens: {
          Home: 'home',
          Profile: 'profile',
          Settings: 'settings',
        },
      },
    },
  },
};
