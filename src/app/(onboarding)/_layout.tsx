import { useAuth } from "@/features/auth/hooks";
import { SplashScreen } from "@/shared/components/splash";
import { Redirect, Stack } from "expo-router";

export default function OnboardingLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
    </Stack>
  );
}
