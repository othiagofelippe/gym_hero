import {
  registerSchema,
  type RegisterFormData,
} from "@/features/auth/schemas/register.schema";
import { useRegister } from "@/features/auth/hooks";
import { BackButton } from "@/shared/components/BackButton";
import { SafeAreaWrapper } from "@/shared/components/SafeAreaWrapper";
import { FormField } from "@/shared/components/form";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { HStack } from "@/shared/components/ui/hstack";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Lock, LockKeyhole, Mail, User } from "lucide-react-native";
import { useForm } from "react-hook-form";

export default function RegisterScreen() {
  const registerMutation = useRegister();

  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const result = await registerMutation.mutateAsync({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    if (result.user) {
      router.push({
        pathname: "/verify-email",
        params: { email: data.email },
      });
    }
  };

  return (
    <SafeAreaWrapper>
      <VStack
        className="flex-1 justify-center p-6 bg-background-primary"
        space="xl"
      >
        <BackButton />

        <VStack space="xs">
          <Text size="3xl" bold className="text-center text-text-headline">
            Criar Conta
          </Text>
          <Text size="md" className="text-center text-text-body">
            Cadastre-se para começar
          </Text>
        </VStack>

        <VStack space="lg" className="mt-4">
          <FormField
            control={control}
            name="name"
            label="Nome"
            placeholder="Seu nome completo"
            icon={User}
            autoCapitalize="words"
          />

          <FormField
            control={control}
            name="email"
            label="Email"
            placeholder="seu@email.com"
            icon={Mail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormField
            control={control}
            name="password"
            label="Senha"
            placeholder="Mínimo 6 caracteres"
            icon={Lock}
            secureTextEntry
          />

          <FormField
            control={control}
            name="confirmPassword"
            label="Confirmar Senha"
            placeholder="Digite a senha novamente"
            icon={LockKeyhole}
            secureTextEntry
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            className="mt-2 bg-brand"
            disabled={registerMutation.isPending}
          >
            <ButtonText className="text-white">
              {registerMutation.isPending ? "Cadastrando..." : "Cadastrar"}
            </ButtonText>
          </Button>

          <HStack space="xs" className="justify-center items-center">
            <Text size="sm" className="text-text-body">
              Já tem conta?
            </Text>
            <Button
              variant="link"
              onPress={() => router.replace("/login")}
              size="sm"
            >
              <ButtonText className="text-brand font-bold">
                Faça login
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </SafeAreaWrapper>
  );
}
