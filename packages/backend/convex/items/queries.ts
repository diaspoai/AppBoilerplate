// Note: './_generated/server' is created by running `npx convex dev`.
// Run `pnpm dev` from packages/backend before type-checking this file.
import { v } from 'convex/values';

import { query } from '../_generated/server';
import { requireAuthUserId } from '../_utils/auth';

/**
 * List all items belonging to the authenticated user.
 * Real-time: any mutation to the `items` table will automatically
 * re-run this query and push updated results to all subscribers.
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireAuthUserId(ctx);
    return ctx.db
      .query('items')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .order('desc')
      .collect();
  },
});

/**
 * Get a single item by ID.
 * Returns null if the item doesn't exist or belongs to another user.
 */
export const getById = query({
  args: { id: v.id('items') },
  handler: async (ctx, { id }) => {
    const userId = await requireAuthUserId(ctx);
    const item = await ctx.db.get(id);
    if (!item || item.userId !== userId) return null;
    return item;
  },
});
