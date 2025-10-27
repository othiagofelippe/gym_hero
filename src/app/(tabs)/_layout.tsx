import { Tabs, Redirect } from "expo-router";
import React from "react";

import { IconSymbol } from "@/shared/components/ui/icon-symbol";
import { useAuth } from "@/features/auth/hooks";
import { SplashScreen } from "@/shared/components/splash";

export default function TabLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
        name="history"
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
