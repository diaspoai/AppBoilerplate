# ADR-0010: GitHub Actions for CI/CD

## Status

Accepted

## Context

The project needs automated CI to lint, type-check, and test on every push/PR, plus periodic E2E testing. We evaluated CI platforms based on cost, GitHub integration, and support for macOS runners (required for iOS Simulator E2E tests).

## Decision Drivers

* Must integrate with GitHub PRs (status checks, annotations)
* Must support macOS runners for Maestro E2E on iOS Simulator
* Should be free or low-cost for open-source / small teams
* Should not depend on EAS Build (keep CI self-contained)

## Considered Options

### Option 1: GitHub Actions
- **Pros**: Native GitHub integration, free macOS runners (limited minutes), YAML config, large action marketplace
- **Cons**: macOS runner minutes are expensive on paid plans, no persistent build cache across runs (mitigated by Turborepo caching)

### Option 2: CircleCI
- **Pros**: Powerful caching, macOS support, Docker layer caching
- **Cons**: Separate platform, config overhead, free tier is limited

### Option 3: EAS Build (Expo)
- **Pros**: Purpose-built for Expo, handles native builds
- **Cons**: Focused on app builds, not general CI (no lint/test), paid for team usage

## Decision

We will use **GitHub Actions** exclusively for CI/CD.

## Rationale

GitHub Actions provides the simplest integration with the GitHub-hosted repository. Two workflows cover all needs:

1. **`ci.yml`** — runs on every push/PR to `main`: lint → type-check → test (all via `pnpm turbo`)
2. **`e2e.yml`** — runs nightly at 02:00 UTC + manual dispatch: builds the Expo dev client, boots an iOS Simulator, and runs Maestro flows

The `concurrency` group in `ci.yml` cancels in-progress runs for the same ref, saving runner minutes.

## Consequences

### Positive
- Single CI platform — no context switching
- PR status checks block merge on lint/type/test failures
- Nightly E2E catches regressions without slowing PR feedback
- `workflow_dispatch` allows manual E2E runs for debugging

### Negative
- macOS runners are slower and more expensive than Linux
- No persistent build cache across workflow runs (Turborepo local cache helps within a run)
- E2E failures on nightly runs require manual investigation

## Implementation Notes

- `ci.yml`: ubuntu-latest, pnpm@9, node@22, `pnpm install --frozen-lockfile`, `pnpm turbo lint/build/test`
- `e2e.yml`: macos-latest, builds iOS dev client via `xcodebuild`, boots iPhone 16 simulator, runs `maestro test .maestro/`
- Maestro flows: `.maestro/auth/register.yaml`, `.maestro/auth/login.yaml`, `.maestro/home/browse-items.yaml`

## Related Decisions

- [ADR-0009](./0009-testing-strategy.md) — Test strategy determines what CI runs
- [ADR-0004](./0004-turborepo-pnpm-monorepo.md) — Turborepo caching speeds up CI
