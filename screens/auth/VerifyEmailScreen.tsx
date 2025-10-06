import { useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';

export default function VerifyEmailScreen() {
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = () => {
    setIsResending(true);
    console.log('Resending verification email...');
    // Aqui reenviaria o email de verificação
    setTimeout(() => {
      setIsResending(false);
    }, 2000);
  };

  return (
    <VStack className="flex-1 justify-center p-6" space="xl">
      <VStack space="xs">
        <Text size="3xl" bold className="text-center">
          Verifique seu Email
        </Text>
        <Text size="md" className="text-center opacity-70">
          Enviamos um link de verificação para seu email
        </Text>
      </VStack>

      <VStack space="lg" className="mt-4">
        <VStack space="md" className="items-center">
          <Text size="sm" className="text-center">
            Clique no link enviado para verificar sua conta e começar a usar o Gym Hero
          </Text>

          <Text size="xs" className="text-center opacity-60">
            Não recebeu o email? Verifique sua caixa de spam
          </Text>
        </VStack>

        <Button
          onPress={handleResendEmail}
          variant="outline"
          className="mt-2"
          disabled={isResending}
        >
          <ButtonText>{isResending ? 'Enviando...' : 'Reenviar Email'}</ButtonText>
        </Button>

        <Button variant="link" onPress={() => router.push('/login')}>
          <ButtonText>Voltar ao login</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
