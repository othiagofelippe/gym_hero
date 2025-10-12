import { VStack } from '@/shared/components/ui/vstack';
import { HStack } from '@/shared/components/ui/hstack';
import { Text } from '@/shared/components/ui/text';
import { Button, ButtonText } from '@/shared/components/ui/button';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function ProfileScreen() {
  // Dados mockados - depois virá de um context/state
  const user = {
    name: 'João Silva',
    email: 'joao@email.com',
    age: 25,
    goal: 'Ganhar massa muscular',
  };

  const handleLogout = () => {
    console.log('Logout');
    router.replace('/login');
  };

  return (
    <VStack className="flex-1 p-6" space="xl">
      {/* Header */}
      <VStack space="md" className="items-center pt-8">
        {/* Avatar placeholder */}
        <View className="w-24 h-24 rounded-full bg-gray-700 items-center justify-center">
          <Text size="3xl" bold>
            {user.name.charAt(0)}
          </Text>
        </View>

        <VStack space="xs" className="items-center">
          <Text size="2xl" bold>
            {user.name}
          </Text>
          <Text size="sm" className="opacity-70">
            {user.email}
          </Text>
        </VStack>
      </VStack>

      {/* Informações */}
      <VStack space="lg" className="mt-4">
        <VStack space="md">
          <Text size="lg" bold>
            Informações Pessoais
          </Text>

          <VStack space="sm" className="bg-gray-900 p-4 rounded-lg">
            <HStack className="justify-between">
              <Text className="opacity-70">Idade</Text>
              <Text bold>{user.age} anos</Text>
            </HStack>
          </VStack>

          <VStack space="sm" className="bg-gray-900 p-4 rounded-lg">
            <HStack className="justify-between">
              <Text className="opacity-70">Meta</Text>
              <Text bold>{user.goal}</Text>
            </HStack>
          </VStack>
        </VStack>

        {/* Ações */}
        <VStack space="md" className="mt-4">
          <Button onPress={() => router.push('/(tabs)/(profile)/edit-profile')}>
            <ButtonText>Editar Perfil</ButtonText>
          </Button>

          <Button variant="outline" onPress={handleLogout}>
            <ButtonText>Sair</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
}
