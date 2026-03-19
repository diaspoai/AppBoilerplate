import { getAuthUserId } from '@convex-dev/auth/server';
import type { MutationCtx, QueryCtx } from 'convex/server';

/**
 * Returns the authenticated user's ID.
 * Throws a descriptive error if the caller is not authenticated.
 *
 * Usage:
 *   export const myQuery = query({
 *     handler: async (ctx) => {
 *       const userId = await requireAuthUserId(ctx);
 *       // ctx.db.query('items').withIndex('by_user', q => q.eq('userId', userId))
 *     },
 *   });
 */
export async function requireAuthUserId(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new Error('Unauthenticated: must be logged in');
  }
  return userId;
}
