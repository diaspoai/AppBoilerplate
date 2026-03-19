# ADR-0012: Deep Linking with Universal Links and App Links

## Status

Accepted

## Context

The app needs to respond to URLs — both custom scheme (`appboilerplate://`) for development and verified domain links (`https://appboilerplate.dev`) for production. Deep links must route to the correct screen within the React Navigation hierarchy.

## Decision Drivers

* Must support custom URL scheme for development/testing
* Must support iOS Universal Links and Android App Links for production
* Should integrate with React Navigation's linking system
* Should be configurable without native code changes

## Decision

We will use a **dual-scheme approach**:

1. **Custom scheme** (`appboilerplate://`) — works immediately, no server config needed
2. **Verified domain links** (`https://appboilerplate.dev`) — iOS Universal Links + Android App Links with `autoVerify`

Both are wired through React Navigation's `linking` configuration passed to `NavigationContainer`.

## Rationale

Custom schemes work out of the box for development and testing (e.g., `npx uri-scheme open appboilerplate://home`). Verified domain links are required for production — they bypass the browser disambiguation dialog and open the app directly. Both schemes map to the same route config in `linking.ts`, so no duplication is needed.

## Implementation Notes

- **`linking.ts`**: Defines `prefixes` and `config.screens` mapping URL paths to navigator screens
- **`app.config.ts`**:
  - iOS: `associatedDomains: ['applinks:appboilerplate.dev']`
  - iOS: `UIBackgroundModes: ['remote-notification']`
  - Android: `intentFilters` with `autoVerify: true` for `https://appboilerplate.dev/*`
- **Server requirement** (not in this repo): The domain `appboilerplate.dev` must serve:
  - `/.well-known/apple-app-site-association` (iOS)
  - `/.well-known/assetlinks.json` (Android)

### Route Map

| URL Path | Navigator | Screen |
|----------|-----------|--------|
| `/login` | Auth Stack | LoginScreen |
| `/register` | Auth Stack | RegisterScreen |
| `/home` | Main Tabs | HomeScreen |
| `/profile` | Main Tabs | ProfileScreen |
| `/settings` | Main Tabs | SettingsScreen |

## Consequences

### Positive
- Deep links work in development via custom scheme (no server needed)
- Production links use verified domains — no browser disambiguation
- Single `linking.ts` config handles both schemes
- Notification tap data can include a `screen` field for deep navigation

### Negative
- Universal Links / App Links require hosting verification files on the domain
- `autoVerify` on Android requires the domain to be reachable at install time
- Adding new screens requires updating both the navigator and `linking.ts`

## Related Decisions

- [ADR-0003](./0003-react-navigation-over-expo-router.md) — React Navigation provides the linking system
- [ADR-0011](./0011-push-notifications-expo.md) — Push notification taps can deep-link to screens
