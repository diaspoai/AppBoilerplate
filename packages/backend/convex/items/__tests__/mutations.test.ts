/**
 * items/mutations — unit tests
 *
 * Uses convex-test to run Convex functions against an in-memory database.
 * No real Convex deployment required — but `convex/_generated/` must exist.
 *
 * Prerequisite: run `pnpm dev` in packages/backend to generate convex/_generated/
 * Tests are automatically skipped if the generated directory is not found.
 */
import { existsSync } from 'fs';
import { join } from 'path';

import { convexTest } from 'convex-test';
import { expect, test, describe } from 'vitest';

const generatedExists = existsSync(join(__dirname, '../../_generated'));

import schema from '../../schema';

// convex-test auto-discovers all functions from the convex/ directory.
// We import the test helper and schema — the rest is wired automatically.

describe.skipIf(!generatedExists)('items mutations', () => {
  async function setupAuthenticatedTest() {
    const t = convexTest(schema);

    // Create a test user via Convex Auth's test helper
    const userId = await t.run(async (ctx) => {
      return ctx.db.insert('users', {
        name: 'Test User',
        email: 'test@example.com',
      });
    });

    // Create an authenticated context for this user
    const asUser = t.withIdentity({ subject: userId });
    return { t, userId, asUser };
  }

  describe('create', () => {
    test('creates an item for the authenticated user', async () => {
      const { t, userId, asUser } = await setupAuthenticatedTest();

      const itemId = await asUser.mutation('items/mutations:create', {
        title: 'Test item',
        description: 'A test description',
      });

      const item = await t.run(async (ctx) => ctx.db.get(itemId));
      expect(item).toMatchObject({
        title: 'Test item',
        description: 'A test description',
        completed: false,
        userId,
      });
    });

    test('creates item with completed defaulting to false', async () => {
      const { t, asUser } = await setupAuthenticatedTest();

      const itemId = await asUser.mutation('items/mutations:create', {
        title: 'No description',
      });

      const item = await t.run(async (ctx) => ctx.db.get(itemId));
      expect(item?.completed).toBe(false);
    });
  });

  describe('toggleCompleted', () => {
    test('toggles completed from false to true', async () => {
      const { t, asUser } = await setupAuthenticatedTest();

      const itemId = await asUser.mutation('items/mutations:create', { title: 'Toggle me' });
      await asUser.mutation('items/mutations:toggleCompleted', { id: itemId });

      const item = await t.run(async (ctx) => ctx.db.get(itemId));
      expect(item?.completed).toBe(true);
    });

    test('toggles completed from true back to false', async () => {
      const { t, asUser } = await setupAuthenticatedTest();

      const itemId = await asUser.mutation('items/mutations:create', { title: 'Toggle twice' });
      await asUser.mutation('items/mutations:toggleCompleted', { id: itemId });
      await asUser.mutation('items/mutations:toggleCompleted', { id: itemId });

      const item = await t.run(async (ctx) => ctx.db.get(itemId));
      expect(item?.completed).toBe(false);
    });
  });

  describe('remove', () => {
    test('deletes an item owned by the user', async () => {
      const { t, asUser } = await setupAuthenticatedTest();

      const itemId = await asUser.mutation('items/mutations:create', { title: 'Delete me' });
      await asUser.mutation('items/mutations:remove', { id: itemId });

      const item = await t.run(async (ctx) => ctx.db.get(itemId));
      expect(item).toBeNull();
    });

    test('does not delete an item owned by another user', async () => {
      const { t, asUser } = await setupAuthenticatedTest();

      // Create item as user A
      const itemId = await asUser.mutation('items/mutations:create', { title: 'Not mine' });

      // Try to delete as a different user
      const otherUserId = await t.run(async (ctx) =>
        ctx.db.insert('users', { name: 'Other User', email: 'other@example.com' })
      );
      const asOtherUser = t.withIdentity({ subject: otherUserId });
      await asOtherUser.mutation('items/mutations:remove', { id: itemId });

      // Original item should still exist
      const item = await t.run(async (ctx) => ctx.db.get(itemId));
      expect(item).not.toBeNull();
    });
  });
});
