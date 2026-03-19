# ADR-0005: Flat Feature Modules Architecture

## Status

Accepted

## Context

We need a scalable directory structure for the mobile app that organises code by business domain rather than technical layer. The structure must be intuitive for new contributors and scale from the initial 4 features (auth, home, profile, settings) to many more without restructuring.

## Decision Drivers

* Should group related code (screens, components, hooks, tests) by feature
* Should be flat enough to avoid deep nesting
* Should make it obvious where new code belongs
* Should not require cross-feature imports for common utilities

## Considered Options

### Option 1: Flat Feature Modules
```
src/
├── features/
│   ├── auth/screens/
│   ├── home/screens/ + components/ + hooks/ + __tests__/
│   ├── profile/screens/
│   └── settings/screens/
├── shared/
│   ├── theme/
│   ├── i18n/
│   ├── store/
│   ├── env/
│   └── notifications/
└── navigators/
```
- **Pros**: Flat, predictable, easy to find code, shared code is explicit
- **Cons**: Features can't have sub-features without nesting

### Option 2: Layered Architecture (screens/ components/ hooks/)
- **Pros**: Traditional, familiar to web developers
- **Cons**: Related code is spread across directories, hard to delete a feature cleanly

### Option 3: Domain-Driven Modules (deeply nested)
- **Pros**: Very explicit boundaries, each module is self-contained
- **Cons**: Deep nesting, more boilerplate, overkill for a mobile app

## Decision

We will use **Flat Feature Modules** (Option 1).

## Rationale

Each feature directory (`features/{name}/`) contains everything related to that domain: screens, components, hooks, and tests. Shared utilities live in `src/shared/` with explicit subdirectories (theme, i18n, store, notifications). Navigators live in `src/navigators/` as a cross-cutting concern. This structure makes it trivial to add a new feature (create a directory) or remove one (delete the directory and its navigator reference).

## Consequences

### Positive
- Adding a feature = creating a directory + registering in a navigator
- Deleting a feature = removing the directory + navigator reference
- Tests live next to the code they test (`__tests__/` inside each feature)
- Shared code is explicit and auditable

### Negative
- Cross-feature dependencies must go through `shared/` — no direct feature-to-feature imports
- Navigator files are separate from features (trade-off for cleaner feature isolation)

## Related Decisions

- [ADR-0003](./0003-react-navigation-over-expo-router.md) — Navigation structure complements feature modules
