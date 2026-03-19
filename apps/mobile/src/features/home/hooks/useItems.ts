import { useMutation, useQuery } from 'convex/react';

import { api } from 'convex/_generated/api';

/**
 * Encapsulates all Convex interactions for the items CRUD feature.
 *
 * `items` is undefined while loading, null when the query errors,
 * and an array (possibly empty) once the real-time subscription is live.
 *
 * All mutations are fire-and-forget — Convex handles optimistic updates
 * and server reconciliation automatically.
 */
export function useItems() {
  const items = useQuery(api.items.queries.list);
  const createItem = useMutation(api.items.mutations.create);
  const toggleItem = useMutation(api.items.mutations.toggleCompleted);
  const updateItem = useMutation(api.items.mutations.update);
  const removeItem = useMutation(api.items.mutations.remove);

  return {
    items,
    isLoading: items === undefined,
    createItem,
    toggleItem,
    updateItem,
    removeItem,
  };
}
