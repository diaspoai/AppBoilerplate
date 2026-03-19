/**
 * Push notification registration and listener setup.
 *
 * Call `useNotifications()` once inside a component that is mounted after
 * authentication (e.g. AppContent). It will:
 *   1. Request permission and obtain the Expo push token.
 *   2. Persist the token to the Convex `userProfiles` table via the
 *      `notifications.mutations.savePushToken` mutation.
 *   3. Subscribe to foreground notification events and notification-tap
 *      (response) events for the lifetime of the component.
 *
 * Sending a notification from the backend:
 *   await ctx.runAction(internal.notifications.actions.sendPushNotification, {
 *     userId,
 *     title: 'Hello!',
 *     body: 'You have a new message.',
 *     data: { screen: 'home' },
 *   });
 */

import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useConvexAuth, useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';

// Show alerts / play sounds / set badge when a notification arrives while
// the app is in the foreground.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Requests permission and returns the Expo push token, or `null` if
 * the user denies permission or if running on a simulator / web.
 */
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  // Android requires a notification channel to be set up first.
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#6366F1',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  const tokenData = await Notifications.getExpoPushTokenAsync();
  return tokenData.data;
}

/**
 * Registers for push notifications and wires up foreground + response listeners.
 * Must be called inside a component that lives within `ConvexAuthProvider`.
 */
export function useNotifications() {
  const { isAuthenticated } = useConvexAuth();
  const savePushToken = useMutation(api.notifications.mutations.savePushToken);

  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Register and persist the push token to Convex.
    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) {
          savePushToken({ token }).catch(console.error);
        }
      })
      .catch(console.error);

    // Fired when a notification is received while the app is open.
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (_notification) => {
        // Extend here: update a badge counter, show an in-app banner, etc.
      },
    );

    // Fired when the user taps a notification (foreground or background).
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const _data = response.notification.request.content.data as
          | Record<string, string>
          | undefined;
        // Extend here: navigate to a specific screen based on `_data.screen`.
      },
    );

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [isAuthenticated, savePushToken]);
}
