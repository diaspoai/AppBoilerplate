/**
 * generate-assets.mjs
 *
 * Generates all required PNG assets from SVG sources.
 * Run with: pnpm generate:assets
 *
 * Source files (edit these):
 *   assets/source/icon.svg    — square icon, min 1024×1024 viewBox
 *   assets/source/splash.svg  — splash screen, 1242×2688 viewBox recommended
 *
 * Generated files (do not edit directly — re-run this script instead):
 *   assets/icon.png            — 1024×1024  (iOS + Android icon)
 *   assets/adaptive-icon.png   — 1024×1024  (Android adaptive icon foreground)
 *   assets/splash.png          — 1242×2688  (splash screen)
 */

import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const ICON_SRC   = resolve(root, 'assets/source/icon.svg');
const SPLASH_SRC = resolve(root, 'assets/source/splash.svg');

const targets = [
  // App icon — used by iOS and as the base Android icon
  {
    src: ICON_SRC,
    dest: resolve(root, 'assets/icon.png'),
    width: 1024,
    height: 1024,
    label: 'icon.png (1024×1024)',
  },
  // Android adaptive icon foreground layer
  {
    src: ICON_SRC,
    dest: resolve(root, 'assets/adaptive-icon.png'),
    width: 1024,
    height: 1024,
    label: 'adaptive-icon.png (1024×1024)',
  },
  // Splash screen
  {
    src: SPLASH_SRC,
    dest: resolve(root, 'assets/splash.png'),
    width: 1242,
    height: 2688,
    label: 'splash.png (1242×2688)',
  },
];

console.log('🎨 Generating assets from SVG sources…\n');

for (const { src, dest, width, height, label } of targets) {
  try {
    await sharp(src)
      .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(dest);
    console.log(`  ✅  ${label}`);
  } catch (err) {
    console.error(`  ❌  ${label} — ${err.message}`);
    process.exit(1);
  }
}

console.log('\n✨ Done. Commit the updated PNG files alongside your SVG sources.\n');
