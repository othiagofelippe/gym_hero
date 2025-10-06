import { useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import { Mail } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    console.log('Reset password for:', email);
    // Aqui enviaria o email de recuperação
    router.push('/forgot-password-success');
  };

  return (
    <VStack className="flex-1 justify-center p-6" space="xl">
      <VStack space="xs">
        <Text size="3xl" bold className="text-center">
          Recuperar Senha
        </Text>
        <Text size="md" className="text-center opacity-70">
          Digite seu email para receber as instruções de recuperação
        </Text>
      </VStack>

      <VStack space="lg" className="mt-4">
        <VStack space="sm">
          <Text size="sm" bold>
            Email
          </Text>
          <Input>
            <InputSlot className="pl-3">
              <InputIcon as={Mail} />
            </InputSlot>
            <InputField
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Input>
        </VStack>

        <Button onPress={handleResetPassword} className="mt-2">
          <ButtonText>Enviar Instruções</ButtonText>
        </Button>

        <Button variant="link" onPress={() => router.back()}>
          <ButtonText>Voltar ao login</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
