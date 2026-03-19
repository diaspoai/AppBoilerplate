/**
 * STUB — do not edit manually.
 *
 * Provides minimal types before `convex dev` generates the real file.
 * See apps/mobile/convex/_generated/api.d.ts for more context.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Id<T extends string> = string & { __tableName: T };
export type Doc<T extends string> = Record<string, unknown> & { _id: Id<T>; _creationTime: number };
