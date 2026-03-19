import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    // Convex Auth populates this automatically
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    // Push notification token (Phase 12)
    pushToken: v.optional(v.string()),
  }),

  items: defineTable({
    // Owner reference
    userId: v.id('users'),
    title: v.string(),
    description: v.optional(v.string()),
    completed: v.boolean(),
  }).index('by_user', ['userId']),
});
