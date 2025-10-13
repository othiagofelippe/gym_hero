import { VStack } from "@/shared/components/ui/vstack";
import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SocialButton } from "../components/SocialButton";

export default function WelcomeScreen() {
  const handleAppleLogin = () => {
    console.log("Apple login");
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login");
  };

  const handleEmailLogin = () => {
    router.push("/login");
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <VStack className="flex-1 bg-background-primary p-6 justify-between">
        <VStack className="flex-1 justify-center items-center" space="md">
        <Text size="4xl" bold className="text-text-headline">
          Gym Hero
        </Text>
        <Text size="md" className="text-text-body text-center">
          Sua jornada fitness começa aqui
        </Text>
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
          <View className="flex-1 h-[1px] bg-border-primary" />
          <Text size="sm" className="text-text-span">
            ou
          </Text>
          <View className="flex-1 h-[1px] bg-border-primary" />
        </HStack>

        <SocialButton
          provider="mail"
          label="Continuar com Email"
          onPress={handleEmailLogin}
          backgroundColor="bg-brand"
          textColor="text-white"
          iconColor="#FFFFFF"
        />

        <HStack space="xs" className="justify-center items-center">
          <Text size="sm" className="text-text-body">
            Não tem conta?
          </Text>
          <Button
            variant="link"
            onPress={() => router.push("/register")}
            size="sm"
          >
            <ButtonText className="text-brand font-bold">
              Cadastre-se
            </ButtonText>
          </Button>
        </HStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
