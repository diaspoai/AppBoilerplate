module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // Must be last — disables rules that conflict with Prettier
  ],
  rules: {
    // Enforce consistent import ordering
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    // Allow unused vars prefixed with _ (convention for intentionally unused)
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    // Allow explicit any sparingly — tighten per workspace if needed
    '@typescript-eslint/no-explicit-any': 'warn',
    // Enforce hook rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  env: {
    es2022: true,
    node: true,
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.expo/',
    'convex/_generated/',
    '*.config.js',
    'babel.config.js',
  ],
};
