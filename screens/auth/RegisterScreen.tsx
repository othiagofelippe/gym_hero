import { BackButton } from "@/components/BackButton";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/auth/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import {
  Eye,
  EyeOff,
  Lock,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
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
          <VStack space="sm">
            <Text size="sm" bold className="text-text-heading">
              Nome
            </Text>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  className={
                    errors.name
                      ? "border-red"
                      : "border-border-primary bg-background-secondary"
                  }
                >
                  <InputSlot className="pl-3">
                    <InputIcon as={User} className="text-text-span" />
                  </InputSlot>
                  <InputField
                    placeholder="Seu nome completo"
                    {...field}
                    onChangeText={field.onChange}
                    autoCapitalize="words"
                    className="text-text-body"
                  />
                </Input>
              )}
            />
            {errors.name && (
              <Text size="xs" className="text-red">
                {errors.name.message}
              </Text>
            )}
          </VStack>

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
                    placeholder="Mínimo 6 caracteres"
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
          </VStack>

          <VStack space="sm">
            <Text size="sm" bold className="text-text-heading">
              Confirmar Senha
            </Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <Input
                  className={
                    errors.confirmPassword
                      ? "border-red"
                      : "border-border-primary bg-background-secondary"
                  }
                >
                  <InputSlot className="pl-3">
                    <InputIcon as={LockKeyhole} className="text-text-span" />
                  </InputSlot>
                  <InputField
                    placeholder="Digite a senha novamente"
                    {...field}
                    onChangeText={field.onChange}
                    type={showConfirmPassword ? "text" : "password"}
                    className="text-text-body"
                  />
                  <InputSlot
                    className="pr-3"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <InputIcon
                      as={showConfirmPassword ? Eye : EyeOff}
                      className="text-text-span"
                    />
                  </InputSlot>
                </Input>
              )}
            />
            {errors.confirmPassword && (
              <Text size="xs" className="text-red">
                {errors.confirmPassword.message}
              </Text>
            )}
          </VStack>

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
