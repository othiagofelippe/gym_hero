import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/features/auth/schemas/reset-password.schema";
import { useUpdatePassword } from "@/features/auth/hooks";
import { FormField } from "@/shared/components/form";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Lock, LockKeyhole } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { SafeAreaWrapper } from "@/shared/components/SafeAreaWrapper";
import { KeyboardAwareWrapper } from "@/shared/components/KeyboardAwareWrapper";

export default function ResetPasswordScreen() {
  const updatePasswordMutation = useUpdatePassword();

  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    const result = await updatePasswordMutation.mutateAsync({
      newPassword: data.password,
    });

    if (result.user) {
      router.replace("/login");
    }
  };

  return (
    <SafeAreaWrapper>
      <KeyboardAwareWrapper>
        <VStack
          className="flex-1 justify-center p-6 bg-background-primary dark:bg-dark-background-primary"
          space="xl"
        >
          <VStack space="xs">
            <Text size="3xl" bold className="text-center text-text-headline dark:text-dark-text-headline">
              Nova Senha
            </Text>
            <Text size="md" className="text-center text-text-body dark:text-dark-text-body">
              Digite sua nova senha
            </Text>
          </VStack>

          <VStack space="lg" className="mt-4">
            <FormField
              control={control}
              name="password"
              label="Nova Senha"
              placeholder="Mínimo 6 caracteres"
              icon={Lock}
              secureTextEntry
            />

            <FormField
              control={control}
              name="confirmPassword"
              label="Confirmar Nova Senha"
              placeholder="Digite a senha novamente"
              icon={LockKeyhole}
              secureTextEntry
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              className="mt-2 bg-accent-brand"
              disabled={updatePasswordMutation.isPending}
            >
              <ButtonText className="text-white">
                {updatePasswordMutation.isPending ? "Redefinindo..." : "Redefinir Senha"}
              </ButtonText>
            </Button>

            <Button variant="link" onPress={() => router.push("/login")}>
              <ButtonText className="text-text-body dark:text-dark-text-body">Voltar ao login</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </KeyboardAwareWrapper>
    </SafeAreaWrapper>
  );
}
