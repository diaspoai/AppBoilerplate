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
            // Points to apps/mobile/convex/_generated — tracked stubs that allow Metro
            // to bundle on a fresh clone. TypeScript paths (tsconfig.json) prefer the
            // real generated files from packages/backend/convex/_generated when
            // `convex dev` has been run. The runtime stubs use anyApi (a Proxy) which
            // is functionally identical to the real generated api.js.
            'convex/_generated': './convex/_generated',
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      ],
    ],
  };
};
