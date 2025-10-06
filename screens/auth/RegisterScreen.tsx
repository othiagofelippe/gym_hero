import { useState } from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { router } from 'expo-router';
import { User, Mail, Lock, LockKeyhole, Eye, EyeOff } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '@/schemas/auth/register.schema';

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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Register:', data);
    // Aqui criaria a conta
    router.push('/verify-email');
  };

  return (
    <VStack className="flex-1 justify-center p-6" space="xl">
      <VStack space="xs">
        <Text size="3xl" bold className="text-center">
          Criar Conta
        </Text>
        <Text size="md" className="text-center opacity-70">
          Cadastre-se para começar
        </Text>
      </VStack>

      <VStack space="lg" className="mt-4">
        <VStack space="sm">
          <Text size="sm" bold>
            Nome
          </Text>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input className={errors.name ? 'border-red-500' : ''}>
                <InputSlot className="pl-3">
                  <InputIcon as={User} />
                </InputSlot>
                <InputField
                  placeholder="Seu nome completo"
                  {...field}
                  onChangeText={field.onChange}
                  autoCapitalize="words"
                />
              </Input>
            )}
          />
          {errors.name && (
            <Text size="xs" className="text-red-500">
              {errors.name.message}
            </Text>
          )}
        </VStack>

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
                  placeholder="Mínimo 6 caracteres"
                  {...field}
                  onChangeText={field.onChange}
                  type={showPassword ? 'text' : 'password'}
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
        </VStack>

        <VStack space="sm">
          <Text size="sm" bold>
            Confirmar Senha
          </Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Input className={errors.confirmPassword ? 'border-red-500' : ''}>
                <InputSlot className="pl-3">
                  <InputIcon as={LockKeyhole} />
                </InputSlot>
                <InputField
                  placeholder="Digite a senha novamente"
                  {...field}
                  onChangeText={field.onChange}
                  type={showConfirmPassword ? 'text' : 'password'}
                />
                <InputSlot className="pr-3" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <InputIcon as={showConfirmPassword ? Eye : EyeOff} />
                </InputSlot>
              </Input>
            )}
          />
          {errors.confirmPassword && (
            <Text size="xs" className="text-red-500">
              {errors.confirmPassword.message}
            </Text>
          )}
        </VStack>

        <Button onPress={handleSubmit(onSubmit)} className="mt-2">
          <ButtonText>Cadastrar</ButtonText>
        </Button>

        <Button variant="link" onPress={() => router.push('/login')}>
          <ButtonText>Já tem conta? Faça login</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
