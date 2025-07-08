import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false, title: 'Dashboard' }} />
        <Stack.Screen name="details/[id]" options={{headerShown: false, title: 'Package Details' }} />
        <Stack.Screen name="update/[id]" options={{headerShown: false, title: 'Update Status' }} />
        <Stack.Screen name="settings" options={{headerShown: false, title: 'Settings' }} />
      </Stack>
      <Toast />
    </>
  );
}