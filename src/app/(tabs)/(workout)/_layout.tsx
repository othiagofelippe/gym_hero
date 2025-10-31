import { Stack } from "expo-router";

export default function WorkoutLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="create" />
      <Stack.Screen name="[muscleGroup]" />
      <Stack.Screen name="configure" />
      <Stack.Screen name="name" />
      <Stack.Screen name="details/[id]" />
    </Stack>
  );
}
