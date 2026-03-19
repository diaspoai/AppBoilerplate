// Note: './_generated/server' is created by running `npx convex dev`.
// Run `pnpm dev` from packages/backend before type-checking this file.
import { mutation } from './_generated/server';
import { v } from 'convex/values';
import { requireAuth } from '../_utils/auth';

/**
 * Update the authenticated user's profile fields.
 * Full implementation in Phase 9 when Convex Auth is wired.
 */
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, _args) => {
    await requireAuth(ctx.auth);
    // Full implementation in Phase 9.
  },
});
