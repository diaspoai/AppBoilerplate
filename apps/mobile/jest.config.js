/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterFramework: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    // pnpm uses a virtual store at node_modules/.pnpm/.../.
    // Adding \\.pnpm to the negative lookahead ensures Jest enters the virtual
    // store directory so the SECOND node_modules/ segment (which contains the
    // actual package name) can be matched and transformed correctly.
    'node_modules/(?!(\\.pnpm|(jest-)?react-native|@react-native(-community)?|@react-native/|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|i18next|react-i18next|convex|@convex-dev|zustand))',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^convex/_generated/(.*)$': '<rootDir>/convex/_generated/$1',
    // Use the built-in AsyncStorage mock to avoid native module errors in Jest
    '^@react-native-async-storage/async-storage$':
      '@react-native-async-storage/async-storage/jest/async-storage-mock',
  },
  testRegex: '.*\\.(test|spec)\\.(ts|tsx)$',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
};
