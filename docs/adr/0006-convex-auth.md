# ADR-0006: Convex Auth for Authentication

## Status

Accepted

## Context

The app needs authentication with email/password at minimum, with the ability to add OAuth providers later. Since the backend is Convex (ADR-0002), we evaluated whether to use Convex's native auth solution or integrate a third-party auth provider.

## Decision Drivers

* Must support email/password authentication
* Should support OAuth providers (Google, Apple) without major refactoring
* Should integrate tightly with the database layer for session management
* Should work with React Native (session persistence via AsyncStorage)

## Considered Options

### Option 1: Convex Auth (`@convex-dev/auth`)
- **Pros**: First-party Convex integration, session stored in Convex DB, `useConvexAuth()` hook for auth gating, `Password` provider built-in, OAuth-ready
- **Cons**: Younger than established providers, less community content

### Option 2: Clerk
- **Pros**: Polished UI components, multi-factor auth, user management dashboard
- **Cons**: External dependency, requires syncing user data between Clerk and Convex, additional cost

### Option 3: Firebase Auth
- **Pros**: Mature, large community, many providers
- **Cons**: Requires a Firebase project alongside Convex, token validation boilerplate, two auth systems to maintain

## Decision

We will use **Convex Auth** with the `Password` provider.

## Rationale

Using Convex Auth keeps the entire auth flow within the Convex ecosystem. Sessions are stored in the Convex database alongside application data, eliminating sync issues. `useConvexAuth()` provides `isLoading` and `isAuthenticated` state that directly gates the navigator (auth stack vs. main tabs). Adding OAuth later is a one-line provider addition in `auth.ts`.

For React Native, `ConvexAuthProvider` accepts an `AsyncStorage` adapter for session persistence across app restarts.

## Consequences

### Positive
- Single system for auth + data — no external auth provider to manage
- `useConvexAuth()` integrates directly with `RootNavigator` for auth gating
- `useAuthActions().signIn/signOut` for login/register/logout
- Adding OAuth = adding a provider to `convexAuth({ providers: [Password, Google] })`

### Negative
- Convex Auth is less mature than Clerk or Firebase Auth
- No pre-built UI components — login/register screens are hand-built
- Password reset flow requires custom implementation

## Implementation Notes

- `packages/backend/convex/auth.ts` exports `{ auth, signIn, signOut, store }`
- `ConvexAuthProvider` wraps the app in `app.tsx` with `storage={AsyncStorage}`
- `RootNavigator` uses `useConvexAuth()` to switch between Auth and Main stacks
- `authTables` are spread into `schema.ts`; app-specific user data lives in `userProfiles`

## Related Decisions

- [ADR-0002](./0002-convex-as-backend.md) — Backend choice determines auth options
- [ADR-0011](./0011-push-notifications-expo.md) — Push token is stored in `userProfiles` alongside auth
