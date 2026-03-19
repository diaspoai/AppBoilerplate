import { v } from 'convex/values';
import { action } from '../_generated/server';
import { internal } from '../_generated/api';

const EXPO_PUSH_API = 'https://exp.host/--/api/v2/push/send';

/**
 * Sends a push notification to a single user via the Expo Push API.
 *
 * Usage (from another Convex mutation or action):
 *   await ctx.runAction(internal.notifications.actions.sendPushNotification, {
 *     userId,
 *     title: 'New item shared!',
 *     body: 'Someone shared an item with you.',
 *     data: { screen: 'home' },
 *   });
 *
 * The mobile app's `useNotifications` response listener receives `data` on tap,
 * enabling deep navigation into the correct screen.
 *
 * No-op if the user has not granted notification permission (no token stored).
 */
export const sendPushNotification = action({
  args: {
    userId: v.id('users'),
    title: v.string(),
    body: v.string(),
    /** Optional key/value payload forwarded to the app's notification-tap handler. */
    data: v.optional(v.record(v.string(), v.string())),
  },
  handler: async (ctx, { userId, title, body, data }) => {
    // Fetch the stored push token — returns null if user never granted permission.
    const token = await ctx.runQuery(internal.notifications.queries.getPushToken, { userId });
    if (!token) return null;

    const message = {
      to: token,
      title,
      body,
      data: data ?? {},
      sound: 'default',
      // Increment the app badge count by 1.
      badge: 1,
    };

    const response = await fetch(EXPO_PUSH_API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Expo Push API error: ${response.status} ${response.statusText}`);
    }

    const result = (await response.json()) as { data: { status: string; message?: string } };
    return result.data;
  },
});
