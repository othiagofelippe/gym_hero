import { useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function EditProfileScreen() {
  // Dados mockados - depois virá de um context/state
  const [name, setName] = useState('João Silva');
  const [age, setAge] = useState('25');
  const [goal, setGoal] = useState('Ganhar massa muscular');

  const handleSave = () => {
    console.log('Save profile:', { name, age, goal });
    // Aqui salvaria os dados
    router.back();
  };

  const handleChangeAvatar = () => {
    console.log('Change avatar');
    // Aqui abriria o seletor de imagem
  };

  return (
    <VStack className="flex-1 p-6" space="xl">
      {/* Header com botão voltar */}
      <VStack space="md" className="pt-4">
        <Button variant="link" onPress={() => router.back()} className="self-start">
          <ButtonText>← Voltar</ButtonText>
        </Button>

        <Text size="2xl" bold>
          Editar Perfil
        </Text>
      </VStack>

      {/* Avatar */}
      <VStack space="md" className="items-center">
        <View className="w-24 h-24 rounded-full bg-gray-700 items-center justify-center">
          <Text size="3xl" bold>
            {name.charAt(0)}
          </Text>
        </View>
        <Button variant="link" onPress={handleChangeAvatar} size="sm">
          <ButtonText>Alterar foto</ButtonText>
        </Button>
      </VStack>

      {/* Formulário */}
      <VStack space="lg">
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
            Idade
          </Text>
          <Input>
            <InputField
              placeholder="Sua idade"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
            />
          </Input>
        </VStack>

        <VStack space="sm">
          <Text size="sm" bold>
            Meta
          </Text>
          <Input>
            <InputField
              placeholder="Qual seu objetivo?"
              value={goal}
              onChangeText={setGoal}
            />
          </Input>
        </VStack>

        <Button onPress={handleSave} className="mt-4">
          <ButtonText>Salvar Alterações</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
