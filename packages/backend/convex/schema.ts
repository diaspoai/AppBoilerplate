import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

/**
 * Database schema.
 *
 * `authTables` adds the tables required by Convex Auth:
 *   users, authAccounts, authSessions, authVerificationCodes,
 *   authVerifiers, authRateLimits
 *
 * The `users` table from authTables includes:
 *   name, email, image, emailVerificationTime, phone,
 *   phoneVerificationTime, isAnonymous
 *
 * App-specific user fields (e.g. pushToken) live in `userProfiles`
 * to avoid conflicts with authTables.
 */
export default defineSchema({
  ...authTables,

  /**
   * Extended user profile — one-to-one with `users`.
   * Stores app-specific fields not managed by Convex Auth.
   */
  userProfiles: defineTable({
    userId: v.id('users'),
    /** Expo push token — populated in Phase 12 (Push Notifications). */
    pushToken: v.optional(v.string()),
  }).index('by_user', ['userId']),

  /**
   * Sample CRUD entity — demonstrates queries, mutations, and real-time subscriptions.
   * Replace or extend this with your domain models.
   */
  items: defineTable({
    userId: v.id('users'),
    title: v.string(),
    description: v.optional(v.string()),
    completed: v.boolean(),
  }).index('by_user', ['userId']),
});
