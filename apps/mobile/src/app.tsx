import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { env } from '@/shared/env';

const convex = new ConvexReactClient(env.CONVEX_URL);

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <View style={styles.container}>
        <Text style={styles.text}>AppBoilerplate</Text>
        <StatusBar style="auto" />
      </View>
    </ConvexProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
