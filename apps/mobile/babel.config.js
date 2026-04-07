module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            // Points to the real Convex-generated files produced by `npx convex dev`
            // (run from packages/backend). These files are gitignored and must exist
            // before starting the Metro bundler — run Step 3 (backend) first.
            'convex/_generated': '../../packages/backend/convex/_generated',
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      ],
    ],
  };
};
