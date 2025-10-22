import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/features/auth/schemas/forgot-password.schema";
import { FormField } from "@/shared/components/form";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Mail } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { resetPassword } from "@/features/auth/services/authService";
import { useState } from "react";
import { useToast } from "@/shared/hooks";

export default function ForgotPasswordScreen() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      const { error } = await resetPassword(data.email);

      if (error) {
        toast.error("Erro ao enviar email", error.message);
        return;
      }

      toast.success(
        "Email enviado!",
        `Enviamos as instruções de recuperação para ${data.email}. Verifique sua caixa de entrada.`
      );
      router.replace("/login");
    } catch (err) {
      toast.error("Erro", "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <VStack
        className="flex-1 justify-center p-6 bg-background-primary"
        space="xl"
      >
        <VStack space="xs">
          <Text size="3xl" bold className="text-center text-text-headline">
            Recuperar Senha
          </Text>
          <Text size="md" className="text-center text-text-body">
            Digite seu email para receber as instruções de recuperação
          </Text>
        </VStack>

        <VStack space="lg" className="mt-4">
          <FormField
            control={control}
            name="email"
            label="Email"
            placeholder="seu@email.com"
            icon={Mail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            className="mt-2 bg-brand"
            disabled={loading}
          >
            <ButtonText className="text-white">
              {loading ? "Enviando..." : "Enviar Instruções"}
            </ButtonText>
          </Button>

          <Button variant="link" onPress={() => router.back()}>
            <ButtonText className="text-text-body">Voltar ao login</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
