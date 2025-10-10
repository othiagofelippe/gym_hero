import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { router } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { Dumbbell, Flame, Trophy } from "lucide-react-native";
import { View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ONBOARDING_STEPS = [
  {
    id: 1,
    icon: Dumbbell,
    title: "Treinar nunca foi tão simples",
    description: "Registre seus treinos em segundos e mantenha o foco",
    color: "rgb(249, 115, 22)",
  },
  {
    id: 2,
    icon: Flame,
    title: "Crie sua ofensiva",
    description: "Mantenha a consistência e não quebre a sequência",
    color: "rgb(249, 115, 22)",
  },
  {
    id: 3,
    icon: Trophy,
    title: "Conquiste seus objetivos",
    description: "Acompanhe seu progresso e celebre cada vitória",
    color: "rgb(249, 115, 22)",
  },
];

function DotIndicator({ isActive }: { isActive: boolean }) {
  const widthAnim = useRef(new Animated.Value(isActive ? 32 : 8)).current;
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0.3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(widthAnim, {
        toValue: isActive ? 32 : 8,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0.3,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive]);

  return (
    <Animated.View
      style={{
        width: widthAnim,
        height: 8,
        borderRadius: 4,
        backgroundColor: isActive ? 'rgb(249, 115, 22)' : 'rgb(229, 229, 229)',
        opacity: opacityAnim,
      }}
    />
  );
}

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
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <VStack className="flex-1 bg-background-primary">
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
          }}
        >
          <VStack className="flex-1 justify-center items-center px-8" space="2xl">
            <View className="items-center justify-center">
              <Icon size={120} color={step.color} strokeWidth={1.5} />
            </View>

            <VStack space="md" className="items-center">
              <Text
                size="3xl"
                bold
                className="text-text-headline text-center"
              >
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
            return (
              <DotIndicator key={index} isActive={isActive} />
            );
          })}
        </HStack>

        <HStack space="md">
          <Button
            onPress={handleBack}
            variant="outline"
            className={`flex-1 ${currentStep === 0 ? 'opacity-40' : ''}`}
            size="xl"
            disabled={currentStep === 0}
          >
            <ButtonText className={`text-lg font-bold ${currentStep === 0 ? 'opacity-40' : ''}`}>
              Voltar
            </ButtonText>
          </Button>

          <Button
            onPress={handleNext}
            className="bg-brand flex-1"
            size="xl"
          >
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
