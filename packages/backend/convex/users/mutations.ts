// Note: './_generated/server' is created by running `npx convex dev`.
// Run `pnpm dev` from packages/backend before type-checking this file.
import { v } from 'convex/values';
import { mutation } from '../_generated/server';

import { requireAuthUserId } from '../_utils/auth';

/**
 * Update the authenticated user's display name.
 * Only patches the `name` field managed by Convex Auth's users table.
 */
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuthUserId(ctx);
    await ctx.db.patch(userId, {
      ...(args.name !== undefined && { name: args.name }),
    });
  },
});
