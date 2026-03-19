# ADR-0008: SVG-First Asset Pipeline

## Status

Accepted

## Context

The app needs an icon (1024×1024), adaptive icon (Android), and splash screen image. These assets are required in multiple resolutions. Maintaining separate PNGs for each resolution is error-prone — a single source of truth is preferable. This approach is inspired by [voltrn-cli](https://github.com/IronTony/voltrn-cli)'s asset generation strategy.

## Decision Drivers

* Should have a single source of truth for each asset
* Should generate all required resolutions automatically
* Should use a format that scales without quality loss
* Should be runnable locally without external services

## Considered Options

### Option 1: SVG source → PNG generation via `sharp`
- **Pros**: SVGs are the source of truth, `sharp` is fast and well-maintained, scriptable, no external dependencies
- **Cons**: Requires running `pnpm generate:assets` after editing an SVG

### Option 2: Maintain PNGs directly
- **Pros**: No build step, WYSIWYG
- **Cons**: Multiple files to update for each change, easy to have mismatched resolutions, no single source of truth

### Option 3: Figma export pipeline
- **Pros**: Designers work in Figma natively
- **Cons**: Requires Figma API access, external dependency, not self-contained in the repo

## Decision

We will use **SVG source files** in `assets/source/` with a `sharp`-based generation script (`scripts/generate-assets.mjs`).

## Rationale

SVGs are resolution-independent and diff-friendly in Git. The `generate-assets.mjs` script converts them to the exact PNG sizes Expo expects (`icon.png` at 1024×1024, `adaptive-icon.png` at 1024×1024, `splash.png` at 1242×2688). Generated PNGs are committed so the app works immediately after cloning — no generation step required for first-time setup. The script is re-run only when an SVG source changes.

## Consequences

### Positive
- Single source of truth: `assets/source/icon.svg` and `assets/source/splash.svg`
- Pixel-perfect output at any resolution
- SVG diffs are readable in PRs
- Generated PNGs are committed — no CI dependency on the generation step

### Negative
- `sharp` is a devDependency (~30 MB with native bindings)
- Developers must run `pnpm generate:assets` after editing SVGs (easy to forget)
- Binary PNGs in Git increase repo size slightly

## Implementation Notes

- Source SVGs: `apps/mobile/assets/source/icon.svg`, `splash.svg`
- Script: `apps/mobile/scripts/generate-assets.mjs`
- Output: `apps/mobile/assets/icon.png`, `adaptive-icon.png`, `splash.png`
- Run: `pnpm --filter mobile generate:assets`

## References

- [voltrn-cli asset generation](https://github.com/IronTony/voltrn-cli) — inspiration for SVG-first approach
- [sharp documentation](https://sharp.pixelplumbing.com/)
