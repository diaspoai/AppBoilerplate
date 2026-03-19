// Note: './_generated/server' is created by running `npx convex dev`.
// Run `pnpm dev` from packages/backend before type-checking this file.
import { query } from './_generated/server';
import { requireAuth } from '../_utils/auth';

/**
 * Get the currently authenticated user's record.
 * Full implementation in Phase 9 when Convex Auth is wired.
 */
export const getMe = query({
  args: {},
  handler: async (ctx) => {
    await requireAuth(ctx.auth);
    return null;
  },
});
