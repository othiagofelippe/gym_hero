import {
  loginSchema,
  type LoginFormData,
} from "@/features/auth/schemas/login.schema";
import { loginUser } from "@/features/auth/services/authService";
import { BackButton } from "@/shared/components/BackButton";
import { FormField } from "@/shared/components/form";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    try {
      const { user, error } = await loginUser(data.email, data.password);

      if (error) {
        Alert.alert("Erro ao fazer login", error.message);
        return;
      }

      if (user) {
        router.replace("/(tabs)");
      }
    } catch (err) {
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
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
            disabled={loading}
          >
            <ButtonText className="text-white">
              {loading ? "Entrando..." : "Entrar"}
            </ButtonText>
          </Button>

          <Button variant="link" onPress={() => router.push("/register")}>
            <ButtonText className="text-text-body">
              Não tem conta? Cadastre-se
            </ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
