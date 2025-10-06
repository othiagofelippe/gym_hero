import { useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { Pressable } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Login:', { email, password });
    // Navega para o app (tabs)
    router.replace('/(tabs)');
  };

  return (
    <VStack className="flex-1 justify-center p-6" space="xl">
      <VStack space="xs">
        <Text size="3xl" bold className="text-center">
          Gym Hero
        </Text>
        <Text size="md" className="text-center opacity-70">
          Entre para continuar
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

        <VStack space="sm">
          <Text size="sm" bold>
            Senha
          </Text>
          <Input>
            <InputSlot className="pl-3">
              <InputIcon as={Lock} />
            </InputSlot>
            <InputField
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              type={showPassword ? "text" : "password"}
            />
            <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
              <InputIcon as={showPassword ? Eye : EyeOff} />
            </InputSlot>
          </Input>
          <Button variant="link" onPress={() => router.push('/forgot-password')} size="xs" className="self-end">
            <ButtonText className="text-xs">Esqueci minha senha</ButtonText>
          </Button>
        </VStack>

        <Button onPress={handleLogin} className="mt-2">
          <ButtonText>Entrar</ButtonText>
        </Button>

        <Button variant="link" onPress={() => router.push('/register')}>
          <ButtonText>Não tem conta? Cadastre-se</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
