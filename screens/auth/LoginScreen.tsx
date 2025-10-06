import { useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/schemas/auth/login.schema';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login:', data);
    // Navega para o app (tabs)
    router.replace('/(tabs)');
  };

  return (
    <VStack className="flex-1 justify-center p-6" space="xl">
      <VStack space="xs">
        <Text size="3xl" bold className="text-center">
          Gym Hero
        </Text>
        <Text size="md" className="text-center opacity-70">
          Entre para continuar
        </Text>
      </VStack>

      <VStack space="lg" className="mt-4">
        <VStack space="sm">
          <Text size="sm" bold>
            Email
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input className={errors.email ? 'border-red-500' : ''}>
                <InputSlot className="pl-3">
                  <InputIcon as={Mail} />
                </InputSlot>
                <InputField
                  placeholder="seu@email.com"
                  {...field}
                  onChangeText={field.onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Input>
            )}
          />
          {errors.email && (
            <Text size="xs" className="text-red-500">
              {errors.email.message}
            </Text>
          )}
        </VStack>

        <VStack space="sm">
          <Text size="sm" bold>
            Senha
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input className={errors.password ? 'border-red-500' : ''}>
                <InputSlot className="pl-3">
                  <InputIcon as={Lock} />
                </InputSlot>
                <InputField
                  placeholder="********"
                  {...field}
                  onChangeText={field.onChange}
                  type={showPassword ? "text" : "password"}
                />
                <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                  <InputIcon as={showPassword ? Eye : EyeOff} />
                </InputSlot>
              </Input>
            )}
          />
          {errors.password && (
            <Text size="xs" className="text-red-500">
              {errors.password.message}
            </Text>
          )}
          <Button variant="link" onPress={() => router.push('/forgot-password')} size="xs" className="self-end">
            <ButtonText className="text-xs">Esqueci minha senha</ButtonText>
          </Button>
        </VStack>

        <Button onPress={handleSubmit(onSubmit)} className="mt-2">
          <ButtonText>Entrar</ButtonText>
        </Button>

        <Button variant="link" onPress={() => router.push('/register')}>
          <ButtonText>Não tem conta? Cadastre-se</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
