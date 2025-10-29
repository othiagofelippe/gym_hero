import { useResendVerificationEmail } from "@/features/auth/hooks";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { useToast } from "@/shared/hooks";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaWrapper } from "@/shared/components/SafeAreaWrapper";

export default function VerifyEmailScreen() {
  const resendMutation = useResendVerificationEmail();
  const toast = useToast();
  const { email } = useLocalSearchParams<{ email?: string }>();

  const handleResendEmail = async () => {
    if (!email) {
      toast.error("Erro", "Email não encontrado");
      return;
    }

    await resendMutation.mutateAsync({ email });
  };

  return (
    <SafeAreaWrapper>
      <VStack
        className="flex-1 justify-center p-6 bg-background-primary dark:bg-dark-background-primary"
        space="xl"
      >
        <VStack space="xs">
          <Text size="3xl" bold className="text-center text-text-headline dark:text-dark-text-headline">
            Verifique seu Email
          </Text>
          <Text size="md" className="text-center text-text-body dark:text-dark-text-body">
            Enviamos um link de verificação para seu email
          </Text>
        </VStack>

        <VStack space="lg" className="mt-4">
          <VStack space="md" className="items-center">
            <Text size="sm" className="text-center text-text-body dark:text-dark-text-body">
              Clique no link enviado para verificar sua conta e começar a usar o
              Gym Hero
            </Text>

            <Text size="xs" className="text-center text-text-span dark:text-dark-text-span">
              Não recebeu o email? Verifique sua caixa de spam
            </Text>
          </VStack>

          <Button
            onPress={handleResendEmail}
            variant="outline"
            className="mt-2"
            disabled={resendMutation.isPending}
          >
            <ButtonText className="text-accent-brand">
              {resendMutation.isPending ? "Enviando..." : "Reenviar Email"}
            </ButtonText>
          </Button>

          <Button variant="link" onPress={() => router.replace("/login")}>
            <ButtonText className="text-text-body dark:text-dark-text-body">Voltar ao login</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaWrapper>
  );
}
