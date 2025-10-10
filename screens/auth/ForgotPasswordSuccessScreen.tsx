import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordSuccessScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <VStack className="flex-1 justify-center p-6 bg-background-primary" space="xl">
      <VStack space="xs">
        <Text size="3xl" bold className="text-center text-text-headline">
          Email Enviado
        </Text>
        <Text size="md" className="text-center text-text-body">
          Verifique sua caixa de entrada
        </Text>
      </VStack>

      <VStack space="lg" className="mt-4">
        <VStack space="md" className="items-center">
          <Text size="sm" className="text-center text-text-body">
            Enviamos um link para redefinir sua senha. Clique no link para criar uma nova senha.
          </Text>

          <Text size="xs" className="text-center text-text-span">
            O link é válido por 24 horas
          </Text>

          <Text size="xs" className="text-center text-text-span">
            Não recebeu o email? Verifique sua caixa de spam
          </Text>
        </VStack>

        <Button onPress={() => router.push('/login')} className="mt-2 bg-brand">
          <ButtonText className="text-white">Voltar ao Login</ButtonText>
        </Button>

        <Button variant="link" onPress={() => router.push('/forgot-password')}>
          <ButtonText className="text-text-body">Tentar outro email</ButtonText>
        </Button>
      </VStack>
    </VStack>
    </SafeAreaView>
  );
}
