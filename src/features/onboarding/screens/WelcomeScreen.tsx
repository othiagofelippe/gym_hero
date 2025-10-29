import { FlexMascot } from "@/shared/components/FlexMascot";
import { SafeAreaWrapper } from "@/shared/components/SafeAreaWrapper";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { router } from "expo-router";
import { View } from "react-native";
import { SocialButton } from "../components/SocialButton";
import { setOnboardingCompleted } from "../services/onboardingStorage";

export default function WelcomeScreen() {
  const handleAppleLogin = async () => {
    await setOnboardingCompleted();
    console.log("Apple login");
  };

  const handleGoogleLogin = async () => {
    await setOnboardingCompleted();
    console.log("Google login");
  };

  const handleFacebookLogin = async () => {
    await setOnboardingCompleted();
    console.log("Facebook login");
  };

  const handleEmailLogin = async () => {
    await setOnboardingCompleted();
    router.push("/login");
  };

  const handleRegister = async () => {
    await setOnboardingCompleted();
    router.push("/register");
  };

  return (
    <SafeAreaWrapper>
      <VStack className="flex-1 bg-background-primary dark:bg-dark-background-primary p-6 justify-between">
        <VStack className="flex-1 justify-center items-center" space="2xl">
          <FlexMascot variant="neutral-standing" size="xlarge" />
          <VStack space="md" className="items-center">
            <Text size="4xl" bold className="text-text-headline dark:text-dark-text-headline">
              Gym Hero
            </Text>
            <Text size="md" className="text-text-body dark:text-dark-text-body text-center">
              Sua jornada fitness começa aqui
            </Text>
          </VStack>
        </VStack>

        <VStack space="lg" className="pb-12">
          <VStack space="md">
            <SocialButton
              provider="apple"
              label="Continuar com Apple"
              onPress={handleAppleLogin}
              backgroundColor="bg-black"
              textColor="text-white"
              iconColor="#FFFFFF"
            />

            <SocialButton
              provider="google"
              label="Continuar com Google"
              onPress={handleGoogleLogin}
              backgroundColor="bg-background-secondary border-2 border-border-primary"
              textColor="text-text-heading"
              iconColor="#DB4437"
            />

            <SocialButton
              provider="facebook"
              label="Continuar com Facebook"
              onPress={handleFacebookLogin}
              backgroundColor="bg-[#1877F2]"
              textColor="text-white"
              iconColor="#FFFFFF"
            />
          </VStack>

          <HStack space="md" className="items-center">
            <View className="flex-1 h-[1px] bg-border-primary dark:bg-dark-border-primary" />
            <Text size="sm" className="text-text-span dark:text-dark-text-span">
              ou
            </Text>
            <View className="flex-1 h-[1px] bg-border-primary dark:bg-dark-border-primary" />
          </HStack>

          <SocialButton
            provider="mail"
            label="Continuar com Email"
            onPress={handleEmailLogin}
            backgroundColor="bg-accent-brand"
            textColor="text-white"
            iconColor="#FFFFFF"
          />

          <HStack space="xs" className="justify-center items-center">
            <Text size="sm" className="text-text-body dark:text-dark-text-body">
              Não tem conta?
            </Text>
            <Button variant="link" onPress={handleRegister} size="sm">
              <ButtonText className="text-accent-brand font-bold">
                Cadastre-se
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </SafeAreaWrapper>
  );
}
