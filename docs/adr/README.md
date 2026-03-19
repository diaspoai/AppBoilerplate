# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for **AppBoilerplate**.

ADRs capture the context, decision, and consequences of significant technical choices made during the design and implementation of this boilerplate. They serve as living documentation for contributors and teams who fork this template.

## Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [0001](./0001-expo-dev-client-over-bare-rn.md) | Use Expo with Development Builds over Bare React Native | Accepted | 2026-03-19 |
| [0002](./0002-convex-as-backend.md) | Use Convex as the Backend Platform | Accepted | 2026-03-19 |
| [0003](./0003-react-navigation-over-expo-router.md) | Use React Navigation over Expo Router | Accepted | 2026-03-19 |
| [0004](./0004-turborepo-pnpm-monorepo.md) | Turborepo + pnpm Monorepo Structure | Accepted | 2026-03-19 |
| [0005](./0005-flat-feature-modules.md) | Flat Feature Modules Architecture | Accepted | 2026-03-19 |
| [0006](./0006-convex-auth.md) | Convex Auth for Authentication | Accepted | 2026-03-19 |
| [0007](./0007-zustand-client-state.md) | Zustand for Client-Side State | Accepted | 2026-03-19 |
| [0008](./0008-svg-first-asset-pipeline.md) | SVG-First Asset Pipeline | Accepted | 2026-03-19 |
| [0009](./0009-testing-strategy.md) | Testing Strategy — Jest + RNTL + Vitest + Maestro | Accepted | 2026-03-19 |
| [0010](./0010-github-actions-ci.md) | GitHub Actions for CI/CD | Accepted | 2026-03-19 |
| [0011](./0011-push-notifications-expo.md) | Expo Notifications for Push | Accepted | 2026-03-19 |
| [0012](./0012-deep-linking-universal-app-links.md) | Deep Linking with Universal Links and App Links | Accepted | 2026-03-19 |
| [0013](./0013-template-repo-over-cli.md) | Template Repo over Interactive CLI | Accepted | 2026-03-19 |

## Creating a New ADR

1. Copy the next available number: `NNNN-title-with-dashes.md`
2. Fill in the sections: Status, Context, Decision, Consequences
3. Submit a PR for review
4. Update this index after approval

## ADR Status Definitions

- **Proposed** — Under discussion, not yet decided
- **Accepted** — Decision made, implemented or implementing
- **Deprecated** — No longer relevant to the current architecture
- **Superseded** — Replaced by a newer ADR (linked)
- **Rejected** — Considered but not adopted
