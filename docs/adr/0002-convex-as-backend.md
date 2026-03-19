# ADR-0002: Use Convex as the Backend Platform

## Status

Accepted

## Context

The boilerplate needs a backend that provides authentication, a database, real-time subscriptions, and server-side logic. We evaluated Backend-as-a-Service (BaaS) options that minimise infrastructure management while providing a production-grade developer experience.

## Decision Drivers

* Must support real-time data subscriptions (live-updating UI)
* Must provide built-in authentication (or a first-party auth addon)
* Should have a TypeScript-first API for end-to-end type safety
* Should minimise operational overhead (no servers to manage)
* Should work well with React Native / Expo

## Considered Options

### Option 1: Convex
- **Pros**: TypeScript-first, real-time by default (all queries are live), built-in auth (`@convex-dev/auth`), server functions (queries/mutations/actions), automatic schema validation, zero infrastructure
- **Cons**: Younger ecosystem, vendor lock-in, less community content than Firebase

### Option 2: Supabase
- **Pros**: Open-source, PostgreSQL-based, real-time via channels, REST + GraphQL, self-hostable
- **Cons**: Real-time requires explicit channel subscriptions (not automatic), auth is separate from data layer, more boilerplate for type safety

### Option 3: Firebase
- **Pros**: Massive community, mature SDKs, Firestore real-time, Firebase Auth
- **Cons**: NoSQL limitations (no joins, weak querying), JavaScript SDK is large, vendor lock-in to Google, less type safety

## Decision

We will use **Convex** with moderate integration: auth provider, schema, CRUD sample module, and real-time subscriptions.

## Rationale

Convex's "every query is a live query" model eliminates the need for explicit subscription management — the UI automatically re-renders when data changes. Combined with TypeScript-first server functions and `@convex-dev/auth`, it provides the tightest developer experience for a real-time mobile app. The schema lives in code (`schema.ts`), providing a single source of truth for the data model.

## Consequences

### Positive
- Zero subscription boilerplate — `useQuery` automatically stays in sync
- End-to-end TypeScript from schema → server functions → React hooks
- Auth, database, and server logic in one platform
- `convex-test` enables unit testing server functions locally

### Negative
- Vendor lock-in — migrating away requires rewriting server functions
- `convex dev` must run locally to generate `_generated/` types
- Backend tests require `_generated/` directory (mitigated by `describe.skipIf` pattern)

## Implementation Notes

- Backend lives in `packages/backend/` in the monorepo
- Mobile app uses path alias `convex/_generated` pointing to committed type stubs for CI
- Real `_generated/` is produced at runtime by `npx convex dev`

## Related Decisions

- [ADR-0006](./0006-convex-auth.md) — Auth strategy built on Convex Auth
- [ADR-0004](./0004-turborepo-pnpm-monorepo.md) — Backend is a separate workspace package
