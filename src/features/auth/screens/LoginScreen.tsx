import {
  loginSchema,
  type LoginFormData,
} from "@/features/auth/schemas/login.schema";
import { useLogin } from "@/features/auth/hooks";
import { BackButton } from "@/shared/components/BackButton";
import { SafeAreaWrapper } from "@/shared/components/SafeAreaWrapper";
import { FormField } from "@/shared/components/form";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { HStack } from "@/shared/components/ui/hstack";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { useForm } from "react-hook-form";

export default function LoginScreen() {
  const loginMutation = useLogin();

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await loginMutation.mutateAsync(data);

    if (result.user) {
      router.replace("/(tabs)");
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
            Gym Hero
          </Text>
          <Text size="md" className="text-center text-text-body">
            Sua jornada fitness começa aqui
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

          <VStack space="sm">
            <FormField
              control={control}
              name="password"
              label="Senha"
              placeholder="********"
              icon={Lock}
              secureTextEntry
            />
            <Button
              variant="link"
              onPress={() => router.push("/forgot-password")}
              size="xs"
              className="self-end"
            >
              <ButtonText className="text-xs text-text-span">
                Esqueci minha senha
              </ButtonText>
            </Button>
          </VStack>

          <Button
            onPress={handleSubmit(onSubmit)}
            className="mt-2 bg-brand"
            disabled={loginMutation.isPending}
          >
            <ButtonText className="text-white">
              {loginMutation.isPending ? "Entrando..." : "Entrar"}
            </ButtonText>
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
    </SafeAreaWrapper>
  );
}
