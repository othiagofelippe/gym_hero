import { useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import { Lock, LockKeyhole, Eye, EyeOff } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/schemas/auth/reset-password.schema';

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
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log('Reset password:', data);
    // Aqui resetaria a senha e redirecionaria para login
    router.push('/login');
  };

  return (
    <VStack className="flex-1 justify-center p-6" space="xl">
      <VStack space="xs">
        <Text size="3xl" bold className="text-center">
          Nova Senha
        </Text>
        <Text size="md" className="text-center opacity-70">
          Digite sua nova senha
        </Text>
      </VStack>

      <VStack space="lg" className="mt-4">
        <VStack space="sm">
          <Text size="sm" bold>
            Nova Senha
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
            Confirmar Nova Senha
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
          <ButtonText>Redefinir Senha</ButtonText>
        </Button>

        <Button variant="link" onPress={() => router.push('/login')}>
          <ButtonText>Voltar ao login</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
