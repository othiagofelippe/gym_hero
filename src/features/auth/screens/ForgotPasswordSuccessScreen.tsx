import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { HStack } from "@/shared/components/ui/hstack";
import { FlexMascot } from "@/shared/components/FlexMascot";
import { router } from "expo-router";
import { SafeAreaWrapper } from "@/shared/components/SafeAreaWrapper";

export default function ForgotPasswordSuccessScreen() {
  return (
    <SafeAreaWrapper className="flex-1 bg-background-primary">
      <VStack className="flex-1 px-6 pt-8 pb-6" space="2xl">
        <VStack className="flex-1 items-center justify-center" space="xl">
          <FlexMascot variant="holding-water-bottle" size="large" />

          <VStack space="xs" className="items-center px-4">
            <Text size="3xl" bold className="text-center text-text-headline">
              Email enviado! ✅
            </Text>
            <Text size="md" className="text-center text-text-body">
              Verifique sua caixa de entrada.
            </Text>
          </VStack>

          <VStack space="md" className="items-center px-6">
            <Text size="sm" className="text-center text-text-body">
              Enviamos um link para redefinir sua senha. Clique nele para criar
              uma nova senha e garantir seu acesso.
            </Text>
            <Text size="xs" className="text-center text-text-span">
              O link é válido por 24 horas — e pode estar na caixa de spam.
            </Text>
          </VStack>
        </VStack>

        <VStack space="md">
          <Button className="bg-brand" onPress={() => router.push("/login")}>
            <ButtonText className="text-white text-lg">
              Voltar ao login
            </ButtonText>
          </Button>

          <HStack className="justify-center">
            <Button variant="link" onPress={() => router.push("/forgot-password")}>
              <ButtonText className="text-text-body">
                Tentar outro email
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </SafeAreaWrapper>
  );
}
