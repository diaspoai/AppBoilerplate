import Constants from 'expo-constants';

/**
 * Typed environment variables exposed via app.config.ts `extra`.
 * All values are validated at module load time so missing config
 * fails early rather than at runtime.
 */
function getEnvVar(key: string): string {
  const value = Constants.expoConfig?.extra?.[key];
  if (!value || typeof value !== 'string') {
    throw new Error(
      `Missing environment variable: ${key}. ` +
        'Check your .env.development file and app.config.ts.',
    );
  }
  return value;
}

export const env = {
  CONVEX_URL: getEnvVar('convexUrl'),
} as const;
