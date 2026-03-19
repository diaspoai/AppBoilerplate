# Product Vision & Strategy

## Mission

Eliminate the weeks of boilerplate configuration that stand between a product idea and a shipped React Native app with a real-time backend.

## Vision Statement

**For** mobile development teams and solo developers
**Who** need to ship production-grade React Native apps quickly,
**AppBoilerplate is** a fork-and-build monorepo template
**That** provides a fully wired, tested, CI-ready starting point with Expo + Convex.
**Unlike** bare `npx create-expo-app` or scattered tutorials,
**Our product** ships auth, real-time data, navigation, theming, i18n, push notifications, deep linking, testing, and CI out of the box — so teams focus on features, not plumbing.

## North Star Metric

**Time from fork to first custom feature deployed** — the faster a team goes from cloning the repo to shipping their own feature, the more value the boilerplate delivers.

### Supporting Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| **Setup success rate** | % of users who complete Getting Started without errors | > 90% |
| **Time to first `pnpm dev`** | Minutes from clone to running app on simulator | < 15 min |
| **Fork-to-feature time** | Time from fork to first custom screen committed | < 1 day |
| **CI pass rate on fork** | % of forked repos where CI passes on first run | > 95% |
| **GitHub stars** | Community traction signal | Track monthly |
| **Issues opened** | Proxy for adoption + friction points | Track weekly |

## Target Users

### Primary: Solo Developer / Small Team (2–5)

- Building an MVP or side project
- Familiar with React Native basics but doesn't want to wire auth, navigation, CI from scratch
- Values speed over customisation
- Likely using Convex for the first time

### Secondary: Agency / Consultancy

- Delivers multiple mobile apps per year
- Needs a standardised starting point across projects
- Values consistency, testability, and maintainability
- Will extend the boilerplate heavily

### Tertiary: Open-Source Learner

- Studying how a production React Native + Convex app is structured
- Reads ADRs and code to learn architectural patterns
- May contribute improvements back

## Competitive Landscape

| Alternative | Strengths | Weaknesses vs Us |
|-------------|-----------|------------------|
| `create-expo-app` | Official, minimal | No auth, no backend, no CI, no testing |
| [voltrn-cli](https://github.com/IronTony/voltrn-cli) | Inspiration for this project, CLI scaffolding | No Convex integration, less opinionated backend |
| [T3 Stack](https://create.t3.gg/) | Excellent for web (Next.js + tRPC) | Web-only, no React Native |
| Ignite (Infinite Red) | Mature RN boilerplate, MobX-State-Tree | No Convex, opinionated state layer, heavier |
| Roll your own | Full control | Weeks of config, inconsistent across projects |

## Differentiation

1. **Convex-native** — real-time by default, not bolted on
2. **Monorepo** — backend and mobile in one repo with shared types
3. **Decision-documented** — 13 ADRs explain every "why"
4. **Self-hosted ready** — Convex runs locally via Docker, no cloud account required
5. **CI from day one** — lint, type-check, test, E2E on every PR

## Product Principles

1. **Batteries included, not batteries forced** — Ship everything, make it easy to remove what you don't need
2. **Document the why** — Every architectural choice gets an ADR
3. **CI-first** — If it's not tested in CI, it's not done
4. **Type-safe end-to-end** — TypeScript from database schema to UI component
5. **Convention over configuration** — Sensible defaults, escape hatches when needed
