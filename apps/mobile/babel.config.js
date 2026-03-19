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
            // Points to the local stub folder at apps/mobile/convex/_generated.
            // When `pnpm dev` is run in packages/backend, copy or symlink the real
            // _generated files here, or update this alias to point to the backend directly.
            'convex/_generated': './convex/_generated',
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      ],
    ],
  };
};
