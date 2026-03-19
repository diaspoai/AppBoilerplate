import Constants from 'expo-constants';

type AppEnv = 'development' | 'staging' | 'production';

function getExtra<T>(key: string): T {
  const value = Constants.expoConfig?.extra?.[key];
  if (value === undefined || value === null || value === '') {
    throw new Error(
      `Missing env var: "${key}". ` +
        `Copy apps/mobile/.env.development.example to apps/mobile/.env.development and fill in values.`,
    );
  }
  return value as T;
}

/**
 * Typed, validated environment variables.
 * Values come from app.config.ts `extra`, which reads from .env.{APP_ENV}.
 *
 * Add new variables here as the project grows.
 */
export const env = {
  APP_ENV: getExtra<AppEnv>('appEnv'),
  CONVEX_URL: getExtra<string>('convexUrl'),
} as const;

export const isDev = env.APP_ENV === 'development';
export const isStaging = env.APP_ENV === 'staging';
export const isProd = env.APP_ENV === 'production';
