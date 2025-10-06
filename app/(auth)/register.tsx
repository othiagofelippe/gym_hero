import { useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    console.log('Register:', { name, email, password, confirmPassword });
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
          <Input>
            <InputField
              placeholder="Seu nome completo"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </Input>
        </VStack>

        <VStack space="sm">
          <Text size="sm" bold>
            Email
          </Text>
          <Input>
            <InputField
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Input>
        </VStack>

        <VStack space="sm">
          <Text size="sm" bold>
            Senha
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
            Confirmar Senha
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

        <Button onPress={handleRegister} className="mt-2">
          <ButtonText>Cadastrar</ButtonText>
        </Button>

        <Button variant="link" onPress={() => router.push('/login')}>
          <ButtonText>Já tem conta? Faça login</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
