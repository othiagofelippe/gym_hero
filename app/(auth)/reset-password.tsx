import { useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    console.log('Reset password:', password);
    // Aqui resetaria a senha e redirecionaria para login
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
          <Input>
            <InputField
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChangeText={setPassword}
              type="password"
            />
          </Input>
        </VStack>

        <VStack space="sm">
          <Text size="sm" bold>
            Confirmar Nova Senha
          </Text>
          <Input>
            <InputField
              placeholder="Digite a senha novamente"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              type="password"
            />
          </Input>
        </VStack>

        <Button onPress={handleResetPassword} className="mt-2">
          <ButtonText>Redefinir Senha</ButtonText>
        </Button>

        <Button variant="link" onPress={() => router.push('/login')}>
          <ButtonText>Voltar ao login</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
