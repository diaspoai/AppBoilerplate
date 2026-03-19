import { v } from 'convex/values';
import { internalQuery } from '../_generated/server';

/**
 * Internal query — returns the stored Expo push token for a user.
 * Used by `notifications/actions.ts` before dispatching a push.
 * Not exposed publicly; only callable from other Convex functions via
 * `ctx.runQuery(internal.notifications.queries.getPushToken, { userId })`.
 */
export const getPushToken = internalQuery({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    const profile = await ctx.db
      .query('userProfiles')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .unique();

    return profile?.pushToken ?? null;
  },
});
