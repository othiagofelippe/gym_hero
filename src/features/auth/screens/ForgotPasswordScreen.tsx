import { VStack } from '@/shared/components/ui/vstack';
import { Text } from '@/shared/components/ui/text';
import { Input, InputField, InputSlot, InputIcon } from '@/shared/components/ui/input';
import { Button, ButtonText } from '@/shared/components/ui/button';
import { router } from 'expo-router';
import { Mail } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/features/auth/schemas/forgot-password.schema';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log('Reset password for:', data.email);
    // Aqui enviaria o email de recuperação
    router.push('/forgot-password-success');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <VStack className="flex-1 justify-center p-6 bg-background-primary" space="xl">
      <VStack space="xs">
        <Text size="3xl" bold className="text-center text-text-headline">
          Recuperar Senha
        </Text>
        <Text size="md" className="text-center text-text-body">
          Digite seu email para receber as instruções de recuperação
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
              <Input className={errors.email ? 'border-red' : 'border-border-primary bg-background-secondary'}>
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

        <Button onPress={handleSubmit(onSubmit)} className="mt-2 bg-brand">
          <ButtonText className="text-white">Enviar Instruções</ButtonText>
        </Button>

        <Button variant="link" onPress={() => router.back()}>
          <ButtonText className="text-text-body">Voltar ao login</ButtonText>
        </Button>
      </VStack>
    </VStack>
    </SafeAreaView>
  );
}
