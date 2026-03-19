# ADR-0009: Testing Strategy — Jest + RNTL + Vitest + Maestro

## Status

Accepted

## Context

The boilerplate needs a testing strategy that covers unit tests (components, hooks, stores), backend server function tests, and end-to-end user journey tests. The test setup must work with pnpm's virtual store, Expo SDK 53, and Convex's edge runtime.

## Decision Drivers

* Must support React Native component testing
* Must support Convex server function testing
* Should include E2E testing for critical user flows
* Must work with pnpm's `.pnpm` virtual store + hoisted `node_modules`
* Each package should use the testing tool best suited to its runtime

## Considered Options

### Mobile Unit Tests

| Option | Pros | Cons |
|--------|------|------|
| **Jest + jest-expo + RNTL** | Standard for RN, Expo provides preset, RNTL encourages accessible queries | Version must match Expo SDK |
| Vitest | Faster, modern API | Poor React Native support, no equivalent to jest-expo |

### Backend Unit Tests

| Option | Pros | Cons |
|--------|------|------|
| **Vitest + convex-test** | `convex-test` is Convex's official testing library, Vitest supports `edge-runtime` environment | Requires `_generated/` directory from `convex dev` |
| Jest | Familiar | No `edge-runtime` environment, `convex-test` is designed for Vitest |

### E2E Tests

| Option | Pros | Cons |
|--------|------|------|
| **Maestro** | YAML-based flows, no test code to maintain, works with iOS Simulator and Android Emulator, great DX | Newer than Detox, smaller community |
| Detox | Mature, Gray-box testing, strong community | Complex setup, flaky on CI, requires native build integration |

## Decision

- **Mobile**: Jest 29 + `jest-expo@~53` + React Native Testing Library
- **Backend**: Vitest + `convex-test` with `edge-runtime` environment
- **E2E**: Maestro with YAML flow files

## Rationale

Each package uses the testing tool native to its ecosystem. `jest-expo` version is pinned to match Expo SDK 53 (critical compatibility requirement). Backend tests use Vitest because `convex-test` is designed for it and requires the `edge-runtime` environment. Maestro was chosen for E2E because its YAML flows are readable, maintainable, and run reliably on CI without the flakiness issues common with Detox.

## Key Compatibility Fixes

Several compatibility issues were resolved during implementation:

1. **`jest-expo` version**: Must match Expo SDK (`jest-expo@~53` for SDK 53, not `@55`)
2. **`jest` version**: `jest-expo@53` requires Jest 29 (not Jest 30)
3. **`react-test-renderer`**: Pinned to `19.0.0` to match React 19.0.0
4. **pnpm virtual store**: `transformIgnorePatterns` must include `\\.pnpm` in the negative lookahead so Jest transforms packages inside the virtual store
5. **AsyncStorage mock**: `moduleNameMapper` points to `@react-native-async-storage/async-storage/jest/async-storage-mock`
6. **Backend `_generated/`**: `describe.skipIf(!generatedExists)` pattern allows tests to exist and skip gracefully until `convex dev` generates the types
7. **`@edge-runtime/vm`**: Installed as a devDependency in backend for Vitest's `edge-runtime` environment

## Consequences

### Positive
- Each package uses idiomatic testing tools for its runtime
- Backend tests run in the same edge runtime as production Convex functions
- Maestro E2E flows are YAML — no test code to maintain
- `describe.skipIf` pattern prevents CI failures before Convex is initialised

### Negative
- Two test runners (Jest + Vitest) — developers must know both
- Maestro requires a built app + simulator/emulator (not suitable for PR CI)
- Backend tests are skipped until `convex dev` is run at least once

## Related Decisions

- [ADR-0004](./0004-turborepo-pnpm-monorepo.md) — pnpm compatibility impacts Jest config
- [ADR-0010](./0010-github-actions-ci.md) — CI runs unit tests on every PR; E2E runs nightly
