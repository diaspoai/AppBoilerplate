# Contributing to AppBoilerplate

Thank you for your interest in improving this boilerplate! This guide covers everything you need to contribute effectively.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Architecture Decisions](#architecture-decisions)
- [Issue Guidelines](#issue-guidelines)

---

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/AppBoilerplate.git`
3. Follow the [Getting Started guide](README.md#getting-started) to set up your environment
4. Create a branch: `git checkout -b feat/my-feature` (see [branch naming](#branch-naming))

## Development Workflow

### Branch Naming

| Prefix | Use for | Example |
|--------|---------|---------|
| `feat/` | New features | `feat/password-visibility-toggle` |
| `fix/` | Bug fixes | `fix/bundle-id-mismatch` |
| `docs/` | Documentation only | `docs/accessibility-guide` |
| `refactor/` | Code restructuring (no behaviour change) | `refactor/extract-shared-button` |
| `test/` | Adding or fixing tests | `test/profile-screen-tests` |
| `chore/` | Tooling, CI, dependencies | `chore/update-expo-sdk` |

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `ci`

**Scopes**: `auth`, `home`, `profile`, `settings`, `navigation`, `theme`, `i18n`, `notifications`, `backend`, `ci`, `testing`

**Examples**:
```
feat(settings): add theme and language toggle UI
fix(auth): validate email format before submission
docs(adr): add ADR-0014 for shared component library
test(home): add ItemRow snapshot tests
chore(ci): add Android E2E workflow
```

### Running Checks Locally

Before pushing, always run the full pipeline:

```bash
pnpm lint && pnpm build && pnpm test
```

This mirrors what CI runs on every PR.

---

## Code Standards

### TypeScript

- Strict mode is enabled (`"strict": true` in tsconfig)
- No `any` unless absolutely necessary — prefer `unknown` and type guards
- Unused variables must be prefixed with `_` (enforced by ESLint)
- Use path aliases: `@/` for `src/`, `convex/_generated/` for stubs

### React Native / Expo

- Functional components only (no class components)
- Hooks for all state and side effects
- Prefer `StyleSheet.create()` over inline style objects
- Use theme values from `useTheme()` — never hardcode colours or spacing
- Use i18n keys from `useTranslation()` — never hardcode user-facing strings
- Add `testID` to every interactive element (buttons, inputs, checkboxes)
- Add `accessibilityLabel` to elements that lack visible text

### Convex Backend

- All queries and mutations must call `requireAuthUserId(ctx)` for authenticated endpoints
- Use indexes for filtered queries (never scan entire tables)
- Internal queries/actions use `internalQuery` / `internalAction` (not exposed to clients)
- Keep server functions small — extract shared logic into `_utils/`

### File Organisation

Follow the [Flat Feature Modules](docs/adr/0005-flat-feature-modules.md) pattern:

```
src/features/{feature}/
├── screens/        # Full-screen components
├── components/     # Feature-specific components
├── hooks/          # Feature-specific hooks
└── __tests__/      # Co-located tests
```

**Rules**:
- Features import from `shared/` — **never** from other features
- Shared utilities live in `src/shared/{category}/`
- Navigators live in `src/navigators/` (cross-cutting concern)

---

## Testing Requirements

Every PR must maintain or improve test coverage.

### What to Test

| Layer | Tool | What to cover |
|-------|------|---------------|
| **Components** | Jest + RNTL | Render, user interaction, accessibility |
| **Hooks** | Jest | State changes, side effects |
| **Stores** | Jest | `getState()` / `setState()` directly |
| **Backend queries** | Vitest + convex-test | Return values, auth gating, index usage |
| **Backend mutations** | Vitest + convex-test | State changes, ownership checks, validation |
| **User journeys** | Maestro | Happy-path flows (auth, CRUD) |

### Running Tests

```bash
# All tests
pnpm test

# Mobile only
cd apps/mobile && pnpm test

# Backend only
cd packages/backend && pnpm test

# Specific file
cd apps/mobile && pnpm test -- ItemRow

# E2E (requires built app + simulator)
maestro test .maestro/
```

### Test File Naming

- Unit/component tests: `{name}.test.ts(x)` in `__tests__/` directory
- E2E flows: `.maestro/{feature}/{flow}.yaml`

---

## Pull Request Process

### Before Submitting

- [ ] Branch is up to date with `main`
- [ ] All checks pass locally: `pnpm lint && pnpm build && pnpm test`
- [ ] New features have tests
- [ ] New user-facing strings are added to both `en.json` and `fr.json`
- [ ] New interactive elements have `testID` and `accessibilityLabel`
- [ ] If architectural: an ADR is included (see below)

### PR Description

Use this structure:

```markdown
## What

Brief description of the change.

## Why

Motivation — link to issue or improvement proposal (IMP-XXX).

## How

Implementation approach — what changed and why this approach.

## Screenshots (if UI change)

Before | After
```

### Review Process

1. CI must pass (lint + type-check + test)
2. At least one reviewer must approve
3. Reviewer checks:
   - Does the code follow the standards above?
   - Are tests sufficient?
   - Is the change scoped appropriately (one concern per PR)?
   - Are there any security implications?
4. Author merges after approval (squash merge preferred)

---

## Architecture Decisions

Significant architectural changes require an **Architecture Decision Record** (ADR).

### When to Write an ADR

| Write ADR | Skip ADR |
|-----------|----------|
| New library/framework adoption | Minor version bumps |
| New navigation pattern | Bug fixes |
| New state management approach | Styling changes |
| Schema changes | Adding a screen |
| CI/CD changes | Test additions |

### How to Write an ADR

1. Create `docs/adr/NNNN-title-with-dashes.md` (next available number)
2. Follow the [MADR format](docs/adr/README.md): Context → Options → Decision → Consequences
3. Cross-reference related ADRs
4. Include the ADR in the same PR as the implementation
5. Update `docs/adr/README.md` index

---

## Issue Guidelines

### Bug Reports

Include:
- **Steps to reproduce** (numbered)
- **Expected behaviour**
- **Actual behaviour**
- **Environment** (OS, Node version, Expo SDK, device/simulator)
- **Screenshots or logs** if applicable

### Feature Requests

Include:
- **Problem** you're trying to solve
- **Proposed solution**
- **Alternatives considered**
- Reference an [improvement proposal](docs/pm/IMPROVEMENTS.md) if one exists (IMP-XXX)

### Labels

| Label | Meaning |
|-------|---------|
| `bug` | Something is broken |
| `enhancement` | New feature or improvement |
| `documentation` | Docs only |
| `good first issue` | Suitable for new contributors |
| `help wanted` | Community contributions welcome |
| `P0` / `P1` / `P2` / `P3` | Priority level |

---

## Thank You

Every contribution makes this boilerplate better for the next team that forks it. We appreciate your time and effort.
