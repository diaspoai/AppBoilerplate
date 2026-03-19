/**
 * items/queries — unit tests
 *
 * Prerequisite: run `pnpm dev` in packages/backend to generate convex/_generated/
 * Tests are automatically skipped if the generated directory is not found.
 */
import { existsSync } from 'fs';
import { join } from 'path';

import { convexTest } from 'convex-test';
import { expect, test, describe } from 'vitest';

import schema from '../../schema';

const generatedExists = existsSync(join(__dirname, '../../_generated'));

describe.skipIf(!generatedExists)('items queries', () => {
  async function setupWithItems() {
    const t = convexTest(schema);

    const userId = await t.run(async (ctx) =>
      ctx.db.insert('users', { name: 'Query User', email: 'query@example.com' })
    );
    const asUser = t.withIdentity({ subject: userId });

    // Seed two items
    const id1 = await asUser.mutation('items/mutations:create', { title: 'First item' });
    const id2 = await asUser.mutation('items/mutations:create', { title: 'Second item' });

    return { t, userId, asUser, id1, id2 };
  }

  describe('list', () => {
    test('returns all items for the authenticated user', async () => {
      const { asUser } = await setupWithItems();
      const items = await asUser.query('items/queries:list');
      expect(items).toHaveLength(2);
    });

    test('does not return items belonging to other users', async () => {
      const { t, asUser } = await setupWithItems();

      // Create item for a different user
      const otherId = await t.run(async (ctx) =>
        ctx.db.insert('users', { name: 'Other', email: 'other@example.com' })
      );
      const asOther = t.withIdentity({ subject: otherId });
      await asOther.mutation('items/mutations:create', { title: 'Other user item' });

      // Original user should still see only their 2 items
      const items = await asUser.query('items/queries:list');
      expect(items).toHaveLength(2);
    });

    test('returns empty array when user has no items', async () => {
      const t = convexTest(schema);
      const userId = await t.run(async (ctx) =>
        ctx.db.insert('users', { name: 'Empty User', email: 'empty@example.com' })
      );
      const asUser = t.withIdentity({ subject: userId });

      const items = await asUser.query('items/queries:list');
      expect(items).toHaveLength(0);
    });
  });

  describe('getById', () => {
    test('returns the item when it belongs to the user', async () => {
      const { asUser, id1 } = await setupWithItems();
      const item = await asUser.query('items/queries:getById', { id: id1 });
      expect(item).not.toBeNull();
      expect(item?.title).toBe('First item');
    });

    test('returns null for an item owned by another user', async () => {
      const { t, id1 } = await setupWithItems();

      const otherId = await t.run(async (ctx) =>
        ctx.db.insert('users', { name: 'Other', email: 'other@example.com' })
      );
      const asOther = t.withIdentity({ subject: otherId });

      const item = await asOther.query('items/queries:getById', { id: id1 });
      expect(item).toBeNull();
    });
  });
});
