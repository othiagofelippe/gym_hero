import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

export const unstable_settings = {
  anchor: "(auth)",
};

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </GluestackUIProvider>
  );
}
