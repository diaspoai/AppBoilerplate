# ADR-0007: Zustand for Client-Side State

## Status

Accepted

## Context

The app needs client-side state management for user preferences (theme, language) that persist across sessions. Server state (items, user data) is handled by Convex's real-time queries. We need a solution for the remaining local/client-only state.

## Decision Drivers

* Must support persistence to `AsyncStorage` for cross-session state
* Should be lightweight — server state is already handled by Convex
* Should have a simple API with minimal boilerplate
* Should be easy to test without rendering React components

## Considered Options

### Option 1: Zustand
- **Pros**: Tiny bundle (~1 KB), hook-based API, `persist` middleware for AsyncStorage, testable via `getState()` without React rendering
- **Cons**: Less structure than Redux (could be a pro)

### Option 2: Redux Toolkit
- **Pros**: Industry standard, excellent DevTools, structured patterns (slices, reducers)
- **Cons**: Heavyweight for the small amount of client state we manage, more boilerplate (slices, store config, Provider)

### Option 3: React Context + useReducer
- **Pros**: No external dependency, built into React
- **Cons**: No built-in persistence, re-renders all consumers on any state change, harder to test

## Decision

We will use **Zustand** with the `persist` middleware backed by `AsyncStorage`.

## Rationale

Since Convex handles all server state with real-time subscriptions, the only client-side state is user preferences (color scheme, language). Zustand's `persist` middleware provides automatic AsyncStorage serialisation with zero config. The store is testable by calling `getState()` / `setState()` directly — no `renderHook` or React test renderer needed.

## Consequences

### Positive
- `useSettingsStore()` hook provides `colorScheme` and `language` with setters
- `persist` middleware auto-saves to AsyncStorage — survives app restarts
- Tests use `getState()` directly — fast, no React rendering overhead
- Adding a new persisted value = one line in the store

### Negative
- No Redux DevTools (Zustand has its own devtools middleware if needed)
- Less enforced structure — developers must self-organise stores

## Implementation Notes

- `src/shared/store/useSettingsStore.ts` — persists `colorScheme` + `language`
- `ThemeProvider` reads `colorScheme` from the store
- `I18nProvider` syncs `language` from the store to `i18next`

## Related Decisions

- [ADR-0002](./0002-convex-as-backend.md) — Convex handles server state, Zustand handles client state
