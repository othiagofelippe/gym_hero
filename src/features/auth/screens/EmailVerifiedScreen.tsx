import { FlexMascot } from "@/shared/components/FlexMascot";
import { SafeAreaWrapper } from "@/shared/components/SafeAreaWrapper";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { router } from "expo-router";
import { useEffect } from "react";

export default function EmailVerifiedScreen() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/(tabs)");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaWrapper className="flex-1 bg-background-primary dark:bg-dark-background-primary">
      <VStack className="flex-1 px-6 pt-8 pb-6" space="2xl">
        <VStack className="flex-1 items-center justify-center" space="xl">
          <FlexMascot variant="with-medal" size="large" />

          <VStack space="xs" className="items-center px-4">
            <Text
              size="3xl"
              bold
              className="text-center text-text-headline dark:text-dark-text-headline"
            >
              Email verificado! 🎉
            </Text>
            <Text
              size="md"
              className="text-center text-text-body dark:text-dark-text-body"
            >
              Sua conta foi ativada com sucesso.
            </Text>
          </VStack>

          <VStack space="md" className="items-center px-6">
            <Text
              size="sm"
              className="text-center text-text-body dark:text-dark-text-body"
            >
              Bem-vindo ao Gym Hero! Agora você pode registrar treinos,
              acompanhar seu progresso e construir sua ofensiva.
            </Text>

            <Text
              size="xs"
              className="text-center text-text-span dark:text-dark-text-span"
            >
              Redirecionando em 3 segundos...
            </Text>
          </VStack>
        </VStack>

        <VStack space="md">
          <Button
            className="bg-accent-brand"
            onPress={() => router.replace("/(tabs)")}
          >
            <ButtonText className="text-white text-lg">
              Começar agora
            </ButtonText>
          </Button>

          <HStack className="justify-center">
            <Button variant="link" onPress={() => router.replace("/login")}>
              <ButtonText className="text-text-body dark:text-dark-text-body">
                Voltar ao login
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </SafeAreaWrapper>
  );
}
