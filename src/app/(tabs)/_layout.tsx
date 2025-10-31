import { Tabs, Redirect } from "expo-router";
import React from "react";
import { useColorScheme } from "nativewind";

import { IconSymbol } from "@/shared/components/ui/icon-symbol";
import { useAuth } from "@/features/auth/hooks";
import { SplashScreen } from "@/shared/components/splash";

export default function TabLayout() {
  const { user, loading } = useAuth();
  const { colorScheme } = useColorScheme();

  if (loading) {
    return <SplashScreen />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#121214" : "#FFFFFF",
          borderTopColor: isDark ? "#3D3D3D" : "#E5E5E5",
        },
        tabBarActiveTintColor: "#F97316",
        tabBarInactiveTintColor: isDark ? "#7C7C8A" : "#7C7C8A",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(workout)"
        options={{
          title: "Treino",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="figure.strengthtraining.traditional" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(history)"
        options={{
          title: "Histórico",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="clock.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
