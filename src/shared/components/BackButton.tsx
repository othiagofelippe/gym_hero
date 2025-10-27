import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, View } from "react-native";

export function BackButton() {
  const canGoBack = router.canGoBack();

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
            pressed ? "bg-background-secondary" : ""
          }`}
        >
          <ArrowLeft
            size={24}
            className="text-text-heading"
            color="rgb(32, 32, 36)"
          />
        </View>
      )}
    </Pressable>
  );
}
