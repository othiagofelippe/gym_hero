import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { GluestackUIProvider } from "@/shared/components/ui/gluestack-ui-provider";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { ConfirmDialogProvider } from "@/shared/hooks";
import "../global.css";

export const unstable_settings = {
  anchor: "(auth)",
};

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <ConfirmDialogProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(profile)" />
          </Stack>
          <StatusBar style="auto" />
        </AuthProvider>
      </ConfirmDialogProvider>
    </GluestackUIProvider>
  );
}
