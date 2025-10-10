import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { router } from "expo-router";
import { View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Mail } from "lucide-react-native";

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
          <Button
            onPress={handleAppleLogin}
            className="bg-black border-0"
            size="xl"
          >
            <HStack space="sm" className="items-center">
              <FontAwesome name="apple" size={20} color="#FFFFFF" />
              <ButtonText className="text-white text-base font-semibold">
                Continuar com Apple
              </ButtonText>
            </HStack>
          </Button>

          <Button
            onPress={handleGoogleLogin}
            variant="outline"
            className="border-border-primary bg-background-secondary"
            size="xl"
          >
            <HStack space="sm" className="items-center">
              <AntDesign name="google" size={20} color="#DB4437" />
              <ButtonText className="text-text-heading text-base font-semibold">
                Continuar com Google
              </ButtonText>
            </HStack>
          </Button>

          <Button
            onPress={handleFacebookLogin}
            className="bg-[#1877F2] border-0"
            size="xl"
          >
            <HStack space="sm" className="items-center">
              <FontAwesome name="facebook" size={20} color="#FFFFFF" />
              <ButtonText className="text-white text-base font-semibold">
                Continuar com Facebook
              </ButtonText>
            </HStack>
          </Button>
        </VStack>

        <HStack space="md" className="items-center">
          <View className="flex-1 h-[1px] bg-border-primary" />
          <Text size="sm" className="text-text-span">
            ou
          </Text>
          <View className="flex-1 h-[1px] bg-border-primary" />
        </HStack>

        <Button
          onPress={handleEmailLogin}
          className="bg-brand border-0"
          size="xl"
        >
          <HStack space="sm" className="items-center">
            <Mail size={20} color="#FFFFFF" />
            <ButtonText className="text-white text-base font-semibold">
              Continuar com Email
            </ButtonText>
          </HStack>
        </Button>

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
  );
}
