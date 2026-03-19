# ADR-0011: Expo Notifications for Push

## Status

Accepted

## Context

The app needs push notification support to notify users of events (e.g., shared items, reminders). The notification system must handle permission requests, token management, foreground display, and background tap handling. Notifications are sent from the Convex backend.

## Decision Drivers

* Must work with Expo development builds
* Must support both iOS (APNs) and Android (FCM) via a single API
* Should handle token registration and storage automatically
* Should integrate with the Convex backend for server-initiated pushes

## Considered Options

### Option 1: `expo-notifications` + Expo Push API
- **Pros**: Unified API for iOS and Android, Expo Push API abstracts APNs/FCM, no Firebase project needed, config plugin for `app.config.ts`
- **Cons**: Depends on Expo's push service as a relay

### Option 2: React Native Firebase Messaging
- **Pros**: Direct FCM integration, large community, fine-grained control
- **Cons**: Requires a Firebase project, separate APNs config for iOS, more native setup

### Option 3: OneSignal
- **Pros**: Dashboard for campaigns, segmentation, A/B testing
- **Cons**: External service dependency, SDK adds complexity, overkill for a boilerplate

## Decision

We will use **`expo-notifications`** with the **Expo Push API** for sending.

## Rationale

`expo-notifications` provides a single, cross-platform API for permission handling, token acquisition, and notification listeners. The Expo Push API (`https://exp.host/--/api/v2/push/send`) abstracts away APNs vs. FCM differences — the backend sends a single HTTP request with the Expo push token. No Firebase project or APNs certificate management is required during development.

## Consequences

### Positive
- Single API for both platforms — no platform-specific code
- Token registration is automatic (one `getExpoPushTokenAsync()` call)
- `setNotificationHandler` controls foreground display behaviour
- Backend `sendPushNotification` action is a simple `fetch` to the Expo Push API

### Negative
- Expo Push API is a relay — adds a hop between backend and APNs/FCM
- No offline/deferred push queue (Expo Push API is fire-and-forget)
- Production apps with high volume may want direct APNs/FCM integration

## Implementation Notes

- **Mobile**: `useNotifications()` hook in `shared/notifications/useNotifications.ts`
  - Registers on first authenticated mount
  - Saves token to Convex via `notifications.mutations.savePushToken`
  - Attaches foreground + response listeners (stubbed for extension)
- **Backend**: `packages/backend/convex/notifications/`
  - `mutations.savePushToken` — upserts token into `userProfiles`
  - `queries.getPushToken` — internal query for token lookup
  - `actions.sendPushNotification` — calls Expo Push API
- **Config**: `app.config.ts` includes `expo-notifications` plugin with Android channel + brand colour
- **iOS**: `UIBackgroundModes: ['remote-notification']` in `infoPlist`

## Related Decisions

- [ADR-0001](./0001-expo-dev-client-over-bare-rn.md) — Dev client required for native notification module
- [ADR-0002](./0002-convex-as-backend.md) — Backend sends notifications via Convex action
- [ADR-0006](./0006-convex-auth.md) — Push token is saved after authentication
