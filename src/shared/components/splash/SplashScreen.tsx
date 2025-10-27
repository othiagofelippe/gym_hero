import { Animated } from "react-native";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";
import { FlexMascot } from "@/shared/components/FlexMascot";

interface SplashScreenProps {
  onFinish?: () => void;
  shouldFadeOut?: boolean;
}

export function SplashScreen({ onFinish, shouldFadeOut = false }: SplashScreenProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  useEffect(() => {
    if (shouldFadeOut) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish?.();
      });
    }
  }, [shouldFadeOut, fadeAnim, onFinish]);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <VStack className="flex-1 bg-background-primary">
          <VStack className="flex-1 justify-center items-center px-8" space="2xl">
            <Animated.View
              style={{
                transform: [{ scale: pulseAnim }],
              }}
              className="items-center justify-center"
            >
              <FlexMascot variant="neutral-standing" size="xlarge" />
            </Animated.View>

            <VStack space="md" className="items-center">
              <Text size="3xl" bold className="text-text-headline text-center">
                Gym Hero
              </Text>
              <Text
                size="lg"
                className="text-text-body text-center leading-relaxed"
              >
                Sua jornada fitness começa aqui
              </Text>
            </VStack>
          </VStack>
        </VStack>
      </SafeAreaView>
    </Animated.View>
  );
}
