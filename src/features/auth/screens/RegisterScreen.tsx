import {
  registerSchema,
  type RegisterFormData,
} from "@/features/auth/schemas/register.schema";
import { BackButton } from "@/shared/components/BackButton";
import { FormField } from "@/shared/components/form";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Lock, LockKeyhole, Mail, User } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register:", data);
    // Aqui criaria a conta
    router.push("/verify-email");
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
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

          <Button onPress={handleSubmit(onSubmit)} className="mt-2 bg-brand">
            <ButtonText className="text-white">Cadastrar</ButtonText>
          </Button>

          <Button variant="link" onPress={() => router.push("/login")}>
            <ButtonText className="text-text-body">
              Já tem conta? Faça login
            </ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
