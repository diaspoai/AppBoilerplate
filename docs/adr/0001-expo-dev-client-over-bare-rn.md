# ADR-0001: Use Expo with Development Builds over Bare React Native

## Status

Accepted

## Context

We needed to choose between bare React Native, Expo Go, or Expo with development builds (`expo-dev-client`) as the foundation for the mobile app. The boilerplate targets iOS 15+ and Android SDK 24+ and must support native modules (push notifications, splash screen, deep linking) while remaining approachable for teams of varying experience levels.

## Decision Drivers

* Must support custom native modules (not constrained to Expo Go's sandbox)
* Should minimise native build configuration burden
* Should provide a fast development loop (hot reload, dev tools)
* Team onboarding time matters — boilerplate will be forked by many teams

## Considered Options

### Option 1: Bare React Native
- **Pros**: Full control over native code, no Expo abstraction layer
- **Cons**: Manual Xcode/Gradle config, no managed OTA updates, steeper learning curve, more boilerplate to maintain

### Option 2: Expo Go
- **Pros**: Zero native build step during development, fastest onboarding
- **Cons**: Cannot use custom native modules, limited to Expo SDK modules, not suitable for production apps that need push notifications or custom linking schemes

### Option 3: Expo with `expo-dev-client` (Development Builds)
- **Pros**: Full native module access, managed config via `app.config.ts`, `expo prebuild` generates native projects on demand, EAS Build for cloud CI, OTA updates via `expo-updates`
- **Cons**: Requires an initial native build before development starts (longer first-run than Expo Go)

## Decision

We will use **Expo SDK 53 with `expo-dev-client`** (development builds).

## Rationale

Development builds give us the best of both worlds: the managed Expo ecosystem (config plugins, `expo prebuild`, OTA updates) with full native module access. The one-time cost of building a dev client is negligible compared to the ongoing reduction in native configuration work. Teams forking this boilerplate can add any native module without ejecting.

## Consequences

### Positive
- Native projects (`ios/`, `android/`) are generated from `app.config.ts` — single source of truth
- Any Expo or community native module can be used
- EAS Build available for cloud-based builds
- `expo-updates` enables OTA updates without app store review

### Negative
- First-time setup requires `expo prebuild` + a native build (~5 min)
- Developers need Xcode / Android Studio installed locally (or use EAS Build)
- Expo SDK updates may lag behind React Native releases by a few weeks

## Related Decisions

- [ADR-0002](./0002-convex-as-backend.md) — Backend choice is independent of this decision
- [ADR-0011](./0011-push-notifications-expo.md) — `expo-notifications` depends on dev client for native access
