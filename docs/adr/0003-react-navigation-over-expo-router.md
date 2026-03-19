# ADR-0003: Use React Navigation over Expo Router

## Status

Accepted

## Context

The mobile app needs a navigation system supporting stack navigation (auth flow), bottom tabs (main app), and deep linking. Two viable options exist in the Expo ecosystem: React Navigation (imperative, component-based) and Expo Router (file-based, inspired by Next.js).

## Decision Drivers

* Must support stack + tab navigators with typed params
* Must support deep linking and universal links
* Should have a mature, stable API
* Should be familiar to a wide range of React Native developers
* Should work cleanly with `expo-dev-client` (not Expo Go-only)

## Considered Options

### Option 1: React Navigation v7
- **Pros**: Industry standard, component-based routing gives full control, TypeScript-first param lists, mature ecosystem, works with any React Native setup
- **Cons**: More boilerplate than file-based routing, manual route registration

### Option 2: Expo Router
- **Pros**: File-system routing (less config), automatic deep link generation, web support built-in
- **Cons**: Opinionated directory structure, tighter coupling to Expo's conventions, less control over navigator composition, newer and still evolving

## Decision

We will use **React Navigation v7** with native stack and bottom tab navigators.

## Rationale

React Navigation is the de facto standard for React Native navigation. Its component-based approach gives teams full control over navigator composition, which is important for a boilerplate that will be extended in unpredictable ways. Typed param lists (`RootStackParamList`, `MainTabParamList`) provide compile-time route safety. The deep linking config (`linking.ts`) is explicit and easy to extend.

Expo Router's file-system convention, while elegant, imposes a directory structure that may conflict with the Flat Feature Modules architecture we chose (ADR-0005).

## Consequences

### Positive
- Full control over navigator hierarchy and screen composition
- TypeScript param lists catch route/param errors at compile time
- Large community, abundant documentation and tutorials
- Deep linking config is explicit — easy to audit and extend

### Negative
- More boilerplate than file-based routing (navigator files, type definitions)
- Deep link paths must be manually kept in sync with navigator structure
- No automatic web routing (not a concern for this mobile-only boilerplate)

## Related Decisions

- [ADR-0005](./0005-flat-feature-modules.md) — Feature module structure influences routing
- [ADR-0012](./0012-deep-linking-universal-app-links.md) — Deep link config lives in `linking.ts`
