import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/schemas/auth/reset-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Eye, EyeOff, Lock, LockKeyhole } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPasswordScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log("Reset password:", data);
    // Aqui resetaria a senha e redirecionaria para login
    router.push("/login");
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <VStack
        className="flex-1 justify-center p-6 bg-background-primary"
        space="xl"
      >
        <VStack space="xs">
          <Text size="3xl" bold className="text-center text-text-headline">
            Nova Senha
          </Text>
          <Text size="md" className="text-center text-text-body">
            Digite sua nova senha
          </Text>
        </VStack>

        <VStack space="lg" className="mt-4">
          <VStack space="sm">
            <Text size="sm" bold className="text-text-heading">
              Nova Senha
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
              Confirmar Nova Senha
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
            <ButtonText className="text-white">Redefinir Senha</ButtonText>
          </Button>

          <Button variant="link" onPress={() => router.push("/login")}>
            <ButtonText className="text-text-body">Voltar ao login</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
