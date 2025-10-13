import { Button, ButtonText } from "@/shared/components/ui/button";
import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Animated, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ONBOARDING_STEPS } from "../constants";
import { DotIndicator } from "../components";

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateTransition = (callback: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      callback();

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNext = () => {
    animateTransition(() => {
      if (currentStep < ONBOARDING_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        router.replace("/welcome");
      }
    });
  };

  const handleBack = () => {
    animateTransition(() => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    });
  };

  const step = ONBOARDING_STEPS[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <VStack className="flex-1 bg-background-primary">
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
          }}
        >
          <VStack
            className="flex-1 justify-center items-center px-8"
            space="2xl"
          >
            <View className="items-center justify-center">
              <Icon size={120} color={step.color} strokeWidth={1.5} />
            </View>

            <VStack space="md" className="items-center">
              <Text size="3xl" bold className="text-text-headline text-center">
                {step.title}
              </Text>
              <Text
                size="lg"
                className="text-text-body text-center leading-relaxed"
              >
                {step.description}
              </Text>
            </VStack>
          </VStack>
        </Animated.View>

        <VStack space="xl" className="px-6 pb-12">
          <HStack space="sm" className="justify-center">
            {ONBOARDING_STEPS.map((_, index) => {
              const isActive = index === currentStep;
              return <DotIndicator key={index} isActive={isActive} />;
            })}
          </HStack>

          <HStack space="md">
            <Button
              onPress={handleBack}
              variant="outline"
              className={`flex-1 ${currentStep === 0 ? "opacity-40" : ""}`}
              size="xl"
              disabled={currentStep === 0}
            >
              <ButtonText
                className={`text-lg font-bold ${
                  currentStep === 0 ? "opacity-40" : ""
                }`}
              >
                Voltar
              </ButtonText>
            </Button>

            <Button onPress={handleNext} className="bg-brand flex-1" size="xl">
              <ButtonText className="text-white text-lg font-bold">
                {isLastStep ? "Começar" : "Próximo"}
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
