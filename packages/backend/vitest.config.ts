import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use 'edge-runtime' for full Convex compatibility once @edge-runtime/vm is installed.
    // Requires: pnpm add -D @edge-runtime/vm (already added)
    // Also requires: run `pnpm dev` in this package first to generate convex/_generated/
    environment: 'edge-runtime',
    server: {
      deps: {
        inline: ['convex-test'],
      },
    },
  },
});
