// Note: './_generated/server' is created by running `npx convex dev`.
// Run `pnpm dev` from packages/backend before type-checking this file.
import { query } from '../_generated/server';

import { requireAuthUserId } from '../_utils/auth';

/**
 * Returns the currently authenticated user's record from the `users` table.
 * The `users` table is managed by Convex Auth and populated on first sign-in.
 */
export const getMe = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireAuthUserId(ctx);
    return ctx.db.get(userId);
  },
});
