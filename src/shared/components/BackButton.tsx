import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useColorScheme } from "nativewind";

export function BackButton() {
  const canGoBack = router.canGoBack();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#E1E1E6" : "#202024";

  if (!canGoBack) {
    return null;
  }

  return (
    <Pressable
      onPress={() => router.back()}
      className="self-start -ml-2 mb-6 active:opacity-60"
    >
      {({ pressed }) => (
        <View
          className={`p-2 rounded-full transition-all ${
            pressed
              ? "bg-background-secondary dark:bg-dark-background-secondary"
              : ""
          }`}
        >
          <ArrowLeft
            size={24}
            className="text-text-heading dark:text-dark-text-heading"
            color={iconColor}
          />
        </View>
      )}
    </Pressable>
  );
}
