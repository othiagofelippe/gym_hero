import { Redirect } from "expo-router";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useState, useEffect } from "react";
import { hasCompletedOnboarding } from "@/features/onboarding/services/onboardingStorage";
import { SplashScreen } from "@/shared/components/splash";

export default function Index() {
  const { user, loading: authLoading } = useAuth();
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const completed = await hasCompletedOnboarding();
      setOnboardingCompleted(completed);

      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsReady(true);
    };
    initialize();
  }, []);

  if (authLoading || !isReady) {
    return <SplashScreen />;
  }

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href={onboardingCompleted ? "/(onboarding)/welcome" : "/(onboarding)"} />;
}
