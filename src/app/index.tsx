import { useRouter } from "expo-router";
import { useAuth } from "@/features/auth/hooks";
import { useState, useEffect } from "react";
import { hasCompletedOnboarding } from "@/features/onboarding/services/onboardingStorage";
import { SplashScreen } from "@/shared/components/splash";

export default function Index() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const completed = await hasCompletedOnboarding();
      setOnboardingCompleted(completed);

      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsReady(true);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (isReady && !authLoading) {
      setShouldFadeOut(true);
    }
  }, [isReady, authLoading]);

  const handleFadeComplete = () => {
    if (user) {
      router.replace("/(tabs)");
    } else {
      router.replace(onboardingCompleted ? "/(onboarding)/welcome" : "/(onboarding)");
    }
  };

  return <SplashScreen shouldFadeOut={shouldFadeOut} onFinish={handleFadeComplete} />;
}
