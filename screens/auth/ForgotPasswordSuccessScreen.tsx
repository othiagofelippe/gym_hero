import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';

export default function ForgotPasswordSuccessScreen() {
  return (
    <VStack className="flex-1 justify-center p-6" space="xl">
      <VStack space="xs">
        <Text size="3xl" bold className="text-center">
          Email Enviado
        </Text>
        <Text size="md" className="text-center opacity-70">
          Verifique sua caixa de entrada
        </Text>
      </VStack>

      <VStack space="lg" className="mt-4">
        <VStack space="md" className="items-center">
          <Text size="sm" className="text-center">
            Enviamos um link para redefinir sua senha. Clique no link para criar uma nova senha.
          </Text>

          <Text size="xs" className="text-center opacity-60">
            O link é válido por 24 horas
          </Text>

          <Text size="xs" className="text-center opacity-60">
            Não recebeu o email? Verifique sua caixa de spam
          </Text>
        </VStack>

        <Button onPress={() => router.push('/login')} className="mt-2">
          <ButtonText>Voltar ao Login</ButtonText>
        </Button>

        <Button variant="link" onPress={() => router.push('/forgot-password')}>
          <ButtonText>Tentar outro email</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
