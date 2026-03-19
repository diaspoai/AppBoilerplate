# ADR-0004: Turborepo + pnpm Monorepo Structure

## Status

Accepted

## Context

The project contains a mobile app (`apps/mobile`) and a backend (`packages/backend`) that share a schema and types. We need a monorepo tool to manage dependencies, run tasks across packages, and cache build outputs. The workspace manager must be compatible with React Native and Metro bundler.

## Decision Drivers

* Must support React Native + Metro (some workspace managers break Metro's module resolution)
* Must provide task orchestration with dependency-aware ordering
* Should support build caching for CI performance
* Should be lightweight and fast

## Considered Options

### Option 1: Turborepo + pnpm
- **Pros**: Fast task runner with content-aware caching, pnpm is disk-efficient, `turbo.json` is simple, Vercel-backed
- **Cons**: pnpm's symlink structure requires `node-linker=hoisted` for React Native compatibility

### Option 2: Nx + pnpm
- **Pros**: Powerful dependency graph, affected-based testing, rich plugin ecosystem
- **Cons**: Heavier setup, more complex config (`nx.json`, project.json per package), overkill for a 2-package monorepo

### Option 3: Yarn Workspaces (Classic or Berry)
- **Pros**: Mature, widely used in React Native projects
- **Cons**: Yarn Berry's PnP mode is incompatible with React Native, Classic Yarn lacks built-in task caching

## Decision

We will use **Turborepo** for task orchestration and **pnpm** as the package manager.

## Rationale

Turborepo + pnpm provides the best balance of simplicity and performance for a 2-package monorepo. The `turbo.json` config is minimal (4 task definitions), and pnpm's disk efficiency reduces `node_modules` bloat. The key compatibility requirement — `node-linker=hoisted` in `.npmrc` — ensures Metro and Jest can resolve modules through pnpm's virtual store.

## Consequences

### Positive
- `pnpm turbo lint/build/test` runs all packages with dependency ordering
- Content-aware caching speeds up CI (unchanged packages are skipped)
- pnpm's strict dependency resolution catches phantom dependencies
- Simple config: `turbo.json` + `pnpm-workspace.yaml`

### Negative
- `node-linker=hoisted` is required in `.npmrc` — without it, Metro and Jest fail to resolve modules through pnpm's `.pnpm` virtual store
- Jest `transformIgnorePatterns` must include `\\.pnpm` in the negative lookahead to enter the virtual store directory

## Implementation Notes

- `.npmrc` contains `node-linker=hoisted` (critical for React Native)
- `pnpm-workspace.yaml` defines `apps/*` and `packages/*`
- `turbo.json` defines `dev`, `build`, `lint`, `test` tasks
- Jest's `transformIgnorePatterns` includes `.pnpm` to handle pnpm's virtual store path structure

## Related Decisions

- [ADR-0002](./0002-convex-as-backend.md) — Backend is a separate workspace package
- [ADR-0009](./0009-testing-strategy.md) — Jest config must account for pnpm's module structure
