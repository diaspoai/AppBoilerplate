import { Auth } from 'convex/server';

/**
 * Get the authenticated user's identity.
 * Throws if the user is not authenticated.
 *
 * Usage: const identity = await requireAuth(ctx.auth);
 *
 * Note: In Phase 9, this will integrate with Convex Auth's
 * `getAuthUserId` helper. For now it demonstrates the pattern
 * all protected functions will follow.
 */
export async function requireAuth(auth: Auth) {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error('Unauthenticated: must be logged in');
  }
  return identity.subject;
}
