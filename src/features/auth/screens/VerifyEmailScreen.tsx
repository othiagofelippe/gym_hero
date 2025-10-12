import { useState } from 'react';
import { VStack } from '@/shared/components/ui/vstack';
import { Text } from '@/shared/components/ui/text';
import { Button, ButtonText } from '@/shared/components/ui/button';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <VStack className="flex-1 justify-center p-6 bg-background-primary" space="xl">
      <VStack space="xs">
        <Text size="3xl" bold className="text-center text-text-headline">
          Verifique seu Email
        </Text>
        <Text size="md" className="text-center text-text-body">
          Enviamos um link de verificação para seu email
        </Text>
      </VStack>

      <VStack space="lg" className="mt-4">
        <VStack space="md" className="items-center">
          <Text size="sm" className="text-center text-text-body">
            Clique no link enviado para verificar sua conta e começar a usar o Gym Hero
          </Text>

          <Text size="xs" className="text-center text-text-span">
            Não recebeu o email? Verifique sua caixa de spam
          </Text>
        </VStack>

        <Button
          onPress={handleResendEmail}
          variant="outline"
          className="mt-2"
          disabled={isResending}
        >
          <ButtonText className="text-brand">{isResending ? 'Enviando...' : 'Reenviar Email'}</ButtonText>
        </Button>

        <Button variant="link" onPress={() => router.push('/login')}>
          <ButtonText className="text-text-body">Voltar ao login</ButtonText>
        </Button>
      </VStack>
    </VStack>
    </SafeAreaView>
  );
}
