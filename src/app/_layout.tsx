import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { setSessionFromUrl } from "@/features/auth/services/authService";
import { useAuthStore } from "@/features/auth/store";
import { queryClient } from "@/lib/react-query";
import { GluestackUIProvider } from "@/shared/components/ui/gluestack-ui-provider";
import { ConfirmDialogProvider } from "@/shared/hooks";
import { QueryClientProvider } from "@tanstack/react-query";
import "../global.css";
import "@/i18n/config"; // Inicializa o i18n

export const unstable_settings = {
  anchor: "(auth)",
};

export default function RootLayout() {
  const router = useRouter();
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    const subscription = Linking.addEventListener("url", (event) => {
      handleDeepLink(event.url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleDeepLink = async (url: string) => {
    console.log("🔗 Deep link detectado:", url);

    if (url.includes("verify-email")) {
      await handleAuthLink(
        url,
        "verificação de email",
        "/email-verified" as any
      );
    } else if (url.includes("magic-link")) {
      await handleAuthLink(url, "magic link", "/" as any);
    } else if (url.includes("invite")) {
      await handleAuthLink(url, "convite", "/" as any);
    } else if (url.includes("change-email")) {
      await handleAuthLink(url, "mudança de email", "/" as any);
    } else if (url.includes("reset-password")) {
      await handlePasswordReset(url);
    } else {
      console.log("⚠️ Tipo de deep link não reconhecido");
    }
  };

  const handleAuthLink = async (
    url: string,
    linkType: string,
    successRoute: any
  ) => {
    console.log(`📧 Processando ${linkType}...`);

    const { user, error } = await setSessionFromUrl(url);

    if (error) {
      console.error(`❌ Erro ao processar ${linkType}:`, error);
      router.push("/login");
      return;
    }

    if (user) {
      console.log(`✅ ${linkType} processado com sucesso!`, user);
      router.push(successRoute);
    }
  };

  const handlePasswordReset = async (url: string) => {
    console.log("🔑 Processando reset de senha...");

    const { user, error } = await setSessionFromUrl(url);

    if (error) {
      console.error("❌ Erro ao processar reset de senha:", error);
      router.push("/login");
      return;
    }

    if (user) {
      console.log("✅ Token de reset validado!");
      router.push("/reset-password");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <GluestackUIProvider mode="dark">
            <ConfirmDialogProvider>
              <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
                <Stack.Screen name="index" options={{ animation: "none" }} />
                <Stack.Screen name="(onboarding)" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(profile)" />
              </Stack>
              <StatusBar style="dark" />
            </ConfirmDialogProvider>
          </GluestackUIProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
