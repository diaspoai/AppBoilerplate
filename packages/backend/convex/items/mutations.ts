// Note: './_generated/server' is created by running `npx convex dev`.
// Run `pnpm dev` from packages/backend before type-checking this file.
import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { requireAuthUserId } from '../_utils/auth';

/**
 * Create a new item for the authenticated user.
 * Returns the ID of the newly created item.
 */
export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, { title, description }) => {
    const userId = await requireAuthUserId(ctx);
    return ctx.db.insert('items', {
      userId,
      title,
      description,
      completed: false,
    });
  },
});

/**
 * Toggle the `completed` flag on an item.
 * No-ops if the item doesn't exist or belongs to another user.
 */
export const toggleCompleted = mutation({
  args: { id: v.id('items') },
  handler: async (ctx, { id }) => {
    const userId = await requireAuthUserId(ctx);
    const item = await ctx.db.get(id);
    if (!item || item.userId !== userId) return;
    await ctx.db.patch(id, { completed: !item.completed });
  },
});

/**
 * Update an item's title and/or description.
 * No-ops if the item doesn't exist or belongs to another user.
 */
export const update = mutation({
  args: {
    id: v.id('items'),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, { id, title, description }) => {
    const userId = await requireAuthUserId(ctx);
    const item = await ctx.db.get(id);
    if (!item || item.userId !== userId) return;
    await ctx.db.patch(id, {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
    });
  },
});

/**
 * Delete an item.
 * No-ops if the item doesn't exist or belongs to another user.
 */
export const remove = mutation({
  args: { id: v.id('items') },
  handler: async (ctx, { id }) => {
    const userId = await requireAuthUserId(ctx);
    const item = await ctx.db.get(id);
    if (!item || item.userId !== userId) return;
    await ctx.db.delete(id);
  },
});
