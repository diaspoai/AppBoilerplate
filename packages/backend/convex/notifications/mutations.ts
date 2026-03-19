import { v } from 'convex/values';
import { mutation } from '../_generated/server';
import { requireAuthUserId } from '../_utils/auth';

/**
 * Persists (or updates) the Expo push token for the authenticated user.
 * Called automatically by `useNotifications()` in the mobile app when the
 * user grants notification permission.
 */
export const savePushToken = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const userId = await requireAuthUserId(ctx);

    const profile = await ctx.db
      .query('userProfiles')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .unique();

    if (profile) {
      await ctx.db.patch(profile._id, { pushToken: token });
    } else {
      await ctx.db.insert('userProfiles', { userId, pushToken: token });
    }
  },
});
