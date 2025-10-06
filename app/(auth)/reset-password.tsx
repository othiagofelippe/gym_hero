import { useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import { Lock, LockKeyhole, Eye, EyeOff } from 'lucide-react-native';

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            <InputSlot className="pl-3">
              <InputIcon as={Lock} />
            </InputSlot>
            <InputField
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChangeText={setPassword}
              type={showPassword ? "text" : "password"}
            />
            <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
              <InputIcon as={showPassword ? Eye : EyeOff} />
            </InputSlot>
          </Input>
        </VStack>

        <VStack space="sm">
          <Text size="sm" bold>
            Confirmar Nova Senha
          </Text>
          <Input>
            <InputSlot className="pl-3">
              <InputIcon as={LockKeyhole} />
            </InputSlot>
            <InputField
              placeholder="Digite a senha novamente"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              type={showConfirmPassword ? "text" : "password"}
            />
            <InputSlot className="pr-3" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <InputIcon as={showConfirmPassword ? Eye : EyeOff} />
            </InputSlot>
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
