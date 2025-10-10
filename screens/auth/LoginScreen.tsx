import { BackButton } from "@/components/BackButton";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { loginSchema, type LoginFormData } from "@/schemas/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login:", data);
    // Navega para o app (tabs)
    router.replace("/(tabs)");
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
          <VStack space="sm">
            <Text size="sm" bold className="text-text-heading">
              Email
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  className={
                    errors.email
                      ? "border-red"
                      : "border-border-primary bg-background-secondary"
                  }
                >
                  <InputSlot className="pl-3">
                    <InputIcon as={Mail} className="text-text-span" />
                  </InputSlot>
                  <InputField
                    placeholder="seu@email.com"
                    {...field}
                    onChangeText={field.onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="text-text-body"
                  />
                </Input>
              )}
            />
            {errors.email && (
              <Text size="xs" className="text-red">
                {errors.email.message}
              </Text>
            )}
          </VStack>

          <VStack space="sm">
            <Text size="sm" bold className="text-text-heading">
              Senha
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  className={
                    errors.password
                      ? "border-red"
                      : "border-border-primary bg-background-secondary"
                  }
                >
                  <InputSlot className="pl-3">
                    <InputIcon as={Lock} className="text-text-span" />
                  </InputSlot>
                  <InputField
                    placeholder="********"
                    {...field}
                    onChangeText={field.onChange}
                    type={showPassword ? "text" : "password"}
                    className="text-text-body"
                  />
                  <InputSlot
                    className="pr-3"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <InputIcon
                      as={showPassword ? Eye : EyeOff}
                      className="text-text-span"
                    />
                  </InputSlot>
                </Input>
              )}
            />
            {errors.password && (
              <Text size="xs" className="text-red">
                {errors.password.message}
              </Text>
            )}
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

          <Button onPress={handleSubmit(onSubmit)} className="mt-2 bg-brand">
            <ButtonText className="text-white">Entrar</ButtonText>
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
