import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor="#4285F4" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="product/[id]" />
      </Stack>
    </Provider>
  );
}